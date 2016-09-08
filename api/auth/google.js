"use strict";
const express = require('express');
const passport = require('passport');
const db = require('../../db/');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const router = express.Router({
    mergeParams: true
});

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT = process.env.GOOGLE_REDIRECT || 'http://localhost:3000/api/auth/google/callback';

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_REDIRECT
    },
    (accessToken, refreshToken, profile, done) => {
        db.User.findOrCreate({
                googleId: profile.id
            }, {
                googleId: profile.id,
                email: profile.emails[0].value
            },
            (err, user) => {
                return done(err, user);
            }
        );
    }
));


router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        console.log('Google Authentication:', 'User Authenticated');
        res.redirect('/');
    });


module.exports = router;
