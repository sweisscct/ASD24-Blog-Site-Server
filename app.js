const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3001;
app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname});
});

app.post('/new-blog-post', (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    
})



