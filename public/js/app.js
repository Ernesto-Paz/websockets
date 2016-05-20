var socket = io();

var messages = [];

socket.on("connect", function(){
    
console.log("Successfully connected to server.");

});

//handling recieved messages from server
socket.on("message", function(message){
    
console.log("New message: " + message.text);
//format UTC date from server to local time.
$(".message-log").append("<p>" + moment(message.time).format("h:mm a")+ " " + message.text + "</p>" )
    
})

//jQuery form handling messages sent out by client

var $messageform = jQuery("#message-form")

$messageform.on("submit", function(event){
event.preventDefault();
    
   var message = $("input[name=\"message\"]")
   socket.emit("message", {
text: message.val()
})
  message.val(""); 

})

//logging of recieved messages