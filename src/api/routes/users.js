import { Router } from 'express';
import { validationResult, body } from 'express-validator';
import passport from 'passport';
import User from '../models/User';
import jwt from 'jsonwebtoken';

import { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } from '../utils/authenticate';

const router = Router();

router.post(
    "/signup",
    body("firstName").notEmpty().withMessage("First name is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("username").isEmail().withMessage("Email is required"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
            
        try {
            const user = await User.register(new User({ username: req.body.username }), req.body.password);

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            const token = getToken({ _id: user._id });
            const refreshToken = getRefreshToken({ _id: user._id });
            user.refreshToken.push({ refreshToken });
            await user.save();

            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.json({ success: true, token });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

router.post("/login", passport.authenticate("local"), async (req, res) => {
    const token = getToken({ _id: req.user._id });
    const refreshToken = getRefreshToken({ _id: req.user._id });

    try {
        const user = await User.findById(req.user._id);
        user.refreshToken.push({ refreshToken });

        await user.save();

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
        res.send({ success: true, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post("/refreshToken", async (req, res) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    try {
        if (refreshToken) {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const userId = payload._id;

            const user = await User.findById(userId);

            const tokenIndex = user.refreshToken.findIndex(item => item.refreshToken === refreshToken);

            if (tokenIndex === -1)
                return res.status(401).send("Unauthorized");

            const token = getToken({ _id: userId });
            const newRefreshToken = getRefreshToken({ _id: userId });
            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
            await user.save();

            res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
            res.json({ success: true, token });
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        console.log(error.message);
        res.status(401).send("Unauthorized");
    }
});

router.get("/me", verifyUser, (req, res) => {
    res.json(req.user);
});

router.get("/logout", verifyUser, async (req, res) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    try {
        const user = await User.findById(req.user._id);
        const tokenIndex = user.refreshToken.findIndex(item => item.refreshToken === refreshToken);

        if (tokenIndex !== -1)
            user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();

        await user.save();

        res.clearCookie("refreshToken", COOKIE_OPTIONS);
        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

export default router;
