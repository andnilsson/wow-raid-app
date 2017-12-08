const passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var config = require('./keys');
var users = [];
var mongo = require('./mongo');

if (!config.BNET_ID || !config.BNET_SECRET) throw "Battle net keys not present in configuration";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async(obj, done) => {
    var player = await mongo.getPlayer(obj.id);
    if(player && player.isAdmin)
        obj.isAdmin = true;
    done(null, obj);
    // User.findById(id)
    //   .then(user => {
    //     done(null, user);
    //   })
    //   .catch(error => {
    //     console.log(`Error: ${error}`);
    //   });
});

passport.use(new BnetStrategy({
    clientID: config.BNET_ID,
    clientSecret: config.BNET_SECRET,
    callbackURL: config.AUTHCALLBACK,
    scope: "wow.profile profile",
}, async function (accessToken, refreshToken, profile, done) {
    
    process.nextTick(function () {
        return done(null, profile);
    });
}));
