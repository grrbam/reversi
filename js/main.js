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


$('#messages').append('<h4>' + getUrlParameters('username')+'</h4>');
