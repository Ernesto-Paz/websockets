var PORT = process.env.PORT || 3000;
var express = require("express");
var path = require('path');
var app = express();
var server = require("http").createServer(app); // creates server 
var io = require("socket.io").listen(server); // listens to server for requests.
var moment = require("moment");

app.locals.pretty = true;

app.set('views', __dirname + '/views');

app.set('view engine', 'pug');

app.use(express.static(__dirname + "/public"));

clientInfo = {};

io.on("connection", function (socket) {
    
    socket.on("joinroom", function(info){
    console.log(info);
    clientInfo[socket.id] = info;
    socket.join(info.room);
    io.to(info.room).emit("message", {
        time: moment().valueOf("X"),
        name: "Server",
        room:info.room,
        text: info.name + " has joined the room."

    })
    });
    console.log("SOCKET.IO: ", "User connected.");

    socket.on("message", function (message) {   
        io.to(clientInfo[socket.id].room).emit("message", {
            time: moment().utc().valueOf("X"), //outgoing message does have timestamp
            text: message.text,
            name: message.name,
            room: message.room
        });
        console.log(message); //message from client does not have timestamp;
    });

    /*io.emit("message", {
        time: moment().valueOf("X"),
        text: "A user has connected.",
        name: "Server"
    })*/

    socket.on("disconnect", function (info) {
        io.to(clientInfo[socket.id].room).emit("message", {
            time: moment().valueOf("X"),
            text: clientInfo[socket.id].name + " has disconnected.",
            name: "Server"
        })


    })

});


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

app.get("/chat.html", function (req, res) {
    res.render("chat", {
        info: {
            roomname: req.query.roomname

        }

    });


})