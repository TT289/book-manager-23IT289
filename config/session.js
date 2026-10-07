const session = require("express-session");

const connectMongo = require("connect-mongo");
const MongoStore = connectMongo.default || connectMongo.MongoStore || connectMongo;

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: new MongoStore({
        mongoUrl: process.env.SESSION_URI,
        collectionName: "sessions"
    }),

    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
});

module.exports = sessionMiddleware;