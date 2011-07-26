var BASE_URL = "https://desksms.appspot.com";
var MESSAGE_URL = BASE_URL + "/message";
var REGISTER_URL = BASE_URL + "/register";
var AUTH_URL = BASE_URL + "/_ah/login";
var API_URL = BASE_URL + "/api/v1";
var USER_URL = API_URL + "/user/%s";
var SETTINGS_URL = USER_URL + "/settings";
var SMS_URL = USER_URL + "/sms";
var CALL_URL = USER_URL + "/call";
var OUTBOX_URL = USER_URL + "/outbox";
var LOGIN_URL = API_URL + "/user/whoami";
var CONTINUE_URL = AUTH_URL + "?continue=file%3A%2F%2F%2FUsers%2Farun%2FDocuments%2Fffdesktopsms%2Findex.html";

desksms = {};

desksms.login = function(){
    
};

desksms.sms = function(){
    
};

desksms.sendMessage = function(message, number){
    function(event)
    {
        var str = sprintf('{"data":[{"message": "%s", "number": "%s", "date": %s}]}',[message, number, (new Date).getDate()]);
        event.preventDefault();
        $.ajax({
           type:'GET',
           dataType:"jsonp",
           url: API_URL+ 'user/DSMS.clockwork@gmail.com/outbox?operation=POST&data='+encodeURIComponent(str),
           success: function(data) {
             console.log(data)
           },
           error: function(jqXHR, textStatus, errorThrown) {
             console.log(jqXHR);
           }
       });
};