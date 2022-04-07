import { Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Session = new Schema({
    refreshToken: {
        type: String
    }
});

const User = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    authStrategy: {
        type: String
    },
    points: {
        type: Number,
        default: 50
    },
    refreshToken: {
        type: [Session]
    }
});

User.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret.refreshToken;
        return ret;
    }
});

User.plugin(passportLocalMongoose);

module.exports = model("user", User);
