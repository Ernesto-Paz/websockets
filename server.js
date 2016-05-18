var PORT = process.env.PORT || 3000;
var express = require("express");
var path = require('path');
var app = express();
var server = require("http").createServer(app); // creates server 
var io = require("socket.io").listen(server); // listens to server for requests.

app.locals.pretty = true;

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {

    console.log("SOCKET.IO: ", "User connected.");

    socket.on("message", function (message) {
        socket.broadcast.emit("message", {
            text: message.text
        });
        console.log("Server recieved: " + message.text)
    });

    socket.emit("message", {
        text: "Welcome to the chat application."
    })


})
app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

server.listen(PORT, function () {
    console.log("Server started.")
});

app.get("/", function (req, res) {
    res.render("index", {
        info: {
            teststuff: "A test string that got inputted by the server dynamically!"
        }
    });
});