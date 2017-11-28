const passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var config = require('./keys');
var users = [];

if (!config.BNET_ID || config.BNET_SECRET) throw "Battle net keys not present in configuration";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
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
}, function (accessToken, refreshToken, profile, done) {
    // var existinguser = users[profile.id];
    // if (existinguser)
    //     return done(null, existinguser);

    // users[profile.id] = profile;
    // return done(null, profile);
    process.nextTick(function () {
        return done(null, profile);
    });
}));
