const passport = require('passport');
const auth = {};

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

auth.google = require('./google');

module.exports = auth;
