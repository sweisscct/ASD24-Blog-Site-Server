const express = require("express");
const WebSocket = require("ws");

// Express middleware
const bodyParser = require("body-parser");

// Authentication middleware/DB Connection
const session = require("express-session");
const passport = require("./config/passportConfig");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);

// Routes
const loginRoutes = require("./routes/login");
const createAccountRoutes = require("./routes/create-accounts");
const blogPostsRoutes = require("./routes/blog-posts");

// Config
const { PORT } = require("./config/config");

/* Express config */
// Express setup
app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

// DB Setup
mongoose.connect("mongodb://127.0.0.1:27017/bestBlog")
.then(conn=> console.log(conn.models));

// Manage authentication and cookies
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

/* Express Config */

function makeDummyPosts(numPosts, blogPosts) {
    for (let i=0; i<numPosts; i++) {
        blogPosts.push({
            author: "Author: " + i,
            title: "test" + i,
            content: "Text",
            datetime: new Date().toLocaleString()
        })
    }
}
// makeDummyPosts(98, blogPosts);

app.get("/chat", (req, res) => {
    res.render("chat.ejs");
})

app.use("/", blogPostsRoutes);
app.use("/create-account", createAccountRoutes);
app.use("/login", loginRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const wsServer = new WebSocket.Server( {noServer: true} );

httpServer.on("upgrade", async ( request, socket, head )  => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit("connection", ws, request);
    });
});

wsServer.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(message);
        console.log(message.toLocaleString());
        console.log(JSON.parse(message.toLocaleString()))
        console.log(JSON.parse(message.toLocaleString()).newMessage)
    })
})

/*
    Data Models 
        - User
        - BlogPost
    Middleware Setup
    Configuration
    Test functions
    Server initialisation
    Routes
        - Blog posts
        - Create account
        - Login
*/

/*
    MVC - Model, View, Controller - Server architecture
    Model 
        - data
        - bridge between data and program
        - schemas.js
            - User, BlogPost
            - Create, Read, Update, Destroy (CRUD)
    View
        - UI
        - bridge between the client and the program
        - Routes

    Controller
        - Interatction between them
        - bridge between the model and the view
        - 
*/

/*
    Overall arctitecture
    Client-server
    - One server
    - Many clients
*/

/*
    Alternative atchitecture
    - Distributed system
        - Many clients
        - many servers
    - Parallel/distributed processing/computation
        - Many servers
        - One client
    - Peer-to-Peer
        - Torrent
*/

/*
    - David pays Gavan 50 btc
    - Gavan pays Amil 56 btc
    - Srecko mines for 0.5 btc
    - Timestamp
    - LastHash: xxxxxx

    - Current Hash: abs123
*/