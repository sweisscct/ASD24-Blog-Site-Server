const express = require("express");

// Express middleware
const bodyParser = require("body-parser");

// Authentication middleware/DB Connection
const session = require("express-session");
const passport = require("./passportConfig");
const MongoDBStore = require("connect-mongodb-session")(session);

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        mongoURL: "mongodb://127.0.0.1:27017",
        collection: "bestBlog"
    }, error => console.log(error))
}));

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;