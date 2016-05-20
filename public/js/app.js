var socket = io();

socket.on("connect", function(){
    
console.log("Successfully connected to server.");

});

socket.on("message", function(message){
    
console.log("New message: " + message.text);
    
})

//jQuery form handling

var $messageform = jQuery("#message-form")

$messageform.on("submit", function(event){
event.preventDefault();
   var message = $("input[name=\"message\"]")
   socket.emit("message", {
text: message.val()
})
  message.val(""); 

})