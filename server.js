var PORT = process.env.PORT || 3000;
var express = require("express");
var path = require('path');
var app = express();
var server = require("http").createServer(app); // creates server 
var io = require("socket.io").listen(server);// listens to server for requests.
var moment = require("moment");

app.locals.pretty = true;

app.set('views', __dirname + '/views');

app.set('view engine', 'pug');

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {

    console.log("SOCKET.IO: ", "User connected.");

    socket.on("message", function (message) {
        io.emit("message", {
            time:moment().valueOf("X"),
            text: message.text
        });
        console.log("Server recieved: " + message.text)
        console.log(message);
    });

    socket.emit("message", {
        time: moment().valueOf("X"),
        text: "Welcome to the chat application."
    })


})

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