var socket = io();

var messages = [];


function getQueryParams() {
    var urlParams;
    var match,
        pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams
}

var queryParams = getQueryParams();

var name = queryParams.name || "Anonymous";
var room = queryParams.room || "Public";

//connecting to the server
socket.on("connect", function () {

    console.log("Successfully connected to server.");

    socket.emit("joinroom", {
        name: name,
        room: room
    });

});

//handling recieved messages from server
socket.on("message", function (message) {
    console.log(message);
    console.log("New message: " + message.text);
    var $newmessage =$("<div class=\"list-group-item\"></div>")
    //format UTC date from server to local time.
    $newmessage.append("<p><strong>" + message.name + " @ " + moment(message.time).format("h:mm a") + "</strong></p>");
    $newmessage.append("<p>" + message.text + "</p>");
    $(".message-log").append($newmessage);
    var currentScroll = $(".message-log").scrollTop();
    var scrollHeight = $(".message-log").prop("scrollHeight") - $(".message-log").height();
    $(".message-log").scrollTop(scrollHeight);
})

//jQuery form handling messages sent out by client

var $messageform = jQuery("#message-form")

$messageform.on("submit", function (event) {
    event.preventDefault();
    var messageinput = $("input[name=\"message\"]");
    var message = messageinput.val();
    if(message.length > 256){
    message = message.slice(0,256);
    }
    if (message.trim() != "") {
        console.log(message.trim());
        socket.emit("message", {
            text: message,
            name: name,
            room: room
        })
    }
    messageinput.val("");
})

//logging of recieved messages