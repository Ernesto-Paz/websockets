var socket = io();

var messages = [];

socket.on("connect", function(){
    
console.log("Successfully connected to server.");

});

//handling recieved messages from server
socket.on("message", function(message){
    
console.log("New message: " + message.text);

$(".message-log").append("<p>" + message.text + "</p>" )
    
})

//jQuery form handling messages sent out by client

var $messageform = jQuery("#message-form")

$messageform.on("submit", function(event){
event.preventDefault();
    
   var message = $("input[name=\"message\"]")
   socket.emit("message", {
text: message.val()
})
$(".message-log").append("<p>" + message.val() + "</p>" )
  message.val(""); 

})

//logging of recieved messages