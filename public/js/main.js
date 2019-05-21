/* Functions for general use */


/* Returns value associated with 'whichParams' on the url */
function getUrlParameters(whichParams)
{
  var pageUrl = window.location.search.substring(1);
  var pageUrlVariables = pageUrl.split('&');
  for(var i = 0; i < pageUrlVariables.length; i++){
    var parameterName = pageUrlVariables[i].split('=');
    if(parameterName[0] == whichParams){
      return parameterName[1];
    }
  }
}
var username = getUrlParameters('username');
if('undefined' == typeof username || !username){
  username = 'Anonymous_'+Math.random();
}

var chat_room = 'One_Room';

/* Connect to the socket server */

var socket = io.connect();

socket.on('log',function(array){
  console.log.apply(console,array);
});

socket.on('join_room_response', function(payload){
  if(payload.result == 'fail'){
    alert(payload.message);
    return;
  }
  $('#messages').append('<p>New user has joined the room: '+payload.username+'</p>');
});

socket.on('send_message_response', function(payload){
  if(payload.result == 'fail'){
    alert(payload.message);
    return;
  }
  $('#messages').append('<p><b>'+payload.username+' says:</b> '+payload.message+'</p>');
});

function send_message(){
  var payload = {};
  payload.room = chat_room;
  payload.username = username;
  payload.message = $('#send_message_holder').val();
  console.log('*** Client Log Message: \'send_message\' payload: '+JSON.stringify(payload));
  socket.emit('send_message',payload);
}

$(function(){
  var payload = {};
  payload.room = chat_room;
  payload.username = username;

  console.log('*** Client Log Message: \'join_room\' payload: '+JSON.stringify(payload));
  socket.emit('join_room',payload);
});
