require('dotenv').config();
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

passport.use(
    new Strategy(opts, function (jwt_payload, done) {
            User.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    })
);
