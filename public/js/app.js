var socket = io();

socket.on("connect", function(){
    
console.log("Successfully connected to server.");

});

socket.on("message", function(message){
    
console.log("New message: " + message.text);
    
})