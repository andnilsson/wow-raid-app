const passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var users = [];

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
    clientID: process.env.BNET_ID,
    clientSecret: process.env.BNET_SECRET,
    callbackURL: process.env.AUTHCALLBACK,
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