const repo = require('./config/mongo');
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const path = require('path')
const passport = require('passport')
const https = require('https')
const requireLogin = require('./middlewares/requireLogin');
const fs = require('fs')
var util = require('util');
require('./config/passport');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: 'wowapp',
    saveUninitialized: true,
    resave: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client/')));

console.log(`bnet id:${process.env.BNET_ID}`);
console.log(`bnet sercret:${process.env.BNET_SECRET}`);
console.log(`auth callback:${process.env.AUTHCALLBACK}`);
console.log(`port:${process.env.PORT}`);

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

app.get('/api/player', requireLogin, async (req, res) => {
    if (!req.user) throw "no user found";
    var player = await repo.getPlayer(req.user.id);
    res.send(player);
});

app.post('/api/player', requireLogin, async (req, res) => {
    if (!req.user) throw "no user found";
    if (!req.body) throw "no body"

    req.body.ownerid = req.user.id;
    req.body.ownername = req.user.battletag;
    await repo.saveplayer(req.body);
    res.send();
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('*', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});

// app.listen(process.env.PORT || 1337);

if (process.env.RUN_SELFSIGNED_HTTPS === "true") {
    const server = https.createServer({
        key: fs.readFileSync('./localhost.key'),
        cert: fs.readFileSync('./localhost.cert'),
        requestCert: false,
        rejectUnauthorized: false
    }, app).listen(process.env.PORT, () => {
        console.log(`app started on port ${process.env.PORT} with https`);
    })
} else {
    app.listen(process.env.PORT || 80);
}

