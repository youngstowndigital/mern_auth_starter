import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/User';

passport.use(new Strategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
