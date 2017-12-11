const repo = require('./config/mongo');
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon')
const path = require('path')
const passport = require('passport')
const https = require('https')
const requireLogin = require('./middlewares/requireLogin');
const requireAdmin = require('./middlewares/requireAdmin');
const fs = require('fs')
var util = require('util');
const config = require('./config/keys');
require('./config/passport');
var sanitize = require('mongo-sanitize');

const app = express()
app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(session({
//     secret: 'wowapp',
//     saveUninitialized: true,
//     resave: true
// }));

var sessionMiddleware = session({
    secret: 'wowapp',
    saveUninitialized: true,
    resave: true
});
var onlineusers = [];
var messages = [];
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client/')));

app.get('/auth/bnet', passport.authenticate('bnet'));

app.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/api/user', requireLogin, async (req, res) => {
    console.log(req.user ? req.user : 'ingen user finns, detta borde inte synas?');
    res.send(req.user);
})

app.get('/api/players', async (req, res) => {
    var players = await repo.getAllPlayers();
    res.send(players);
});

app.get('/api/player/:id', async (req, res) => {
    if (!req.params.id || req.params.id === "undefined") {
        res.status(400)
        res.send("No id given...")
        return;
    }

    var player = await repo.getPlayerById(req.params.id);
    if (!player) {
        res.status(404);
        res.send("not found")

    } else
        res.send(player);
})

app.get('/api/ownplayer', requireLogin, async (req, res) => {
    if (!req.user) throw "no user found";
    var player = await repo.getPlayer(req.user.id);
    if (!player) {
        res.send();
        return;
    }

    res.send(player);
});

app.get('/api/board', requireLogin, async (req, res) => {
    var page = req.query.page && req.query.page > 0 ? req.query.page : 1;

    var messages = await repo.getAllBoardMessages(page);
    res.send(messages);
});

app.delete('/api/board/:id', requireAdmin, async (req, res) => {
    var id = req.params.id;
    if (!id || id === "undefined") throw "id not passed";

    await repo.deleteBoardMessage(id);
    res.send();
});

app.delete('/api/player/:id', requireAdmin, async (req, res) => {
    var id = req.params.id;
    if (!id || id === "undefined") throw "id not passed";

    await repo.deletePlayer(id);
    res.send();
});


app.post('/api/board', requireLogin, async (req, res) => {
    if (!req.user) throw "no user found";
    if (!req.body) throw "no body"

    var message = req.body;
    message.text = sanitize(message.text);
    if (!message.text) throw "empty messages not allowed"
    var player = await repo.getPlayer(req.user.id);
    if (!player) throw "player not found"

    message.from = player;
    message.charid = player._id;
    message.createdOn = new Date();

    await repo.saveBoardMessage(message)
    res.send();
});

app.post('/api/player', requireLogin, async (req, res) => {
    if (!req.user) throw "no user found";
    if (!req.body) throw "no body"

    if (!req.user.isAdmin) {
        req.body.isAdmin = false;
        req.body.ownerid = req.user.id;
        req.body.ownername = req.user.battletag;

        var player = await repo.getPlayer(req.body.ownerid);
        if (!player) {
            player = {};
            player.createdOn = new Date();
            player.status = "Rookie"
        }

        Object.assign(player, req.body);
        
    } else {
        var player = await repo.getPlayerById(req.body._id);
        if (!player) {
            res.status = 500
            res.body(`player with id ${req.body._id} not found`)
            return;
        }
        Object.assign(player, req.body);
        if (player.ownerid == req.user.id)
            player.isAdmin = true;
    }

    await repo.saveplayer(player);
    res.send();
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/api/onlineusers', requireLogin, async (req, res) => {
    res.send(onlineusers);
})
app.get('/api/messages', requireLogin, async (req, res) => {
    res.send(messages.slice(Math.max(messages.length - 50, 1)));
})

app.get('*', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});


if (config.RUN_SELFSIGNED_HTTPS === "true") {
    var server = https.Server({
        key: fs.readFileSync('./localhost.key'),
        cert: fs.readFileSync('./localhost.cert'),
        requestCert: false,
        rejectUnauthorized: false
    }, app)
} else {
    var server = require('http').Server(app);
}

var io = require('socket.io')(server);



io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
})

io.on('connection', function (socket) {
    if (!socket.request.session.passport || !socket.request.session.passport.user) return;
    var user = socket.request.session.passport.user.battletag;

    console.log(user + ' connected');
    if (onlineusers.indexOf(user) < 0) {
        onlineusers.push(user);
        io.emit('went-online', user)
    }

    socket.on('disconnect', function () {
        console.log(user + ' disconnected');
        if (onlineusers.indexOf(user) > -1) {
            onlineusers.splice(onlineusers.indexOf(user));
            io.emit('went-offline', user);
        }
    });

    socket.on('chat-message', function (text) {
        var msg = {
            from: user,
            message: text,
            time: new Date()
        }
        messages.push(msg);
        io.emit('chat-message', msg);
    });
});

server.listen(config.PORT, () => {
    console.log(`app started on port ${config.PORT} with https`);
})
