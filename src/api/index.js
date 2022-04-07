require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDb from './connectDb';

connectDb();

import "./strategies/JwtStrategy";
import "./strategies/LocalStrategy";
import "./utils/authenticate";

import users from './routes/users';
import passport from 'passport';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const whitelist = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(",") : []

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },

    credentials: true
}

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/users", users);

app.get('/', (req, res) => {
    res.json({ status: "success" });
});

const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App started at port: ${port}`);
});
