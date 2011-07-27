window.desksms = desksms = {};

desksms.BASE_URL = "https://desksms.appspot.com";
desksms.MESSAGE_URL = desksms.BASE_URL + "/message";
REGISTER_URL = desksms.BASE_URL + "/register";
desksms.AUTH_URL = desksms.BASE_URL + "/_ah/login";
desksms.API_URL = desksms.BASE_URL + "/api/v1";
desksms.USER_URL = desksms.API_URL + "/user/koush@koushikdutta.com";
desksms.SETTINGS_URL = desksms.USER_URL + "/settings";
desksms.SMS_URL = desksms.USER_URL + "/sms";
desksms.CALL_URL = desksms.USER_URL + "/call";
desksms.OUTBOX_URL = desksms.USER_URL + "/outbox";
desksms.LOGIN_URL = desksms.API_URL + "/user/whoami";
desksms.CONTINUE_URL = desksms.AUTH_URL + "?continue=%s";

desksms.login = function(){
    return sprintf(desksms.CONTINUE_URL, encodeURIComponent(window.location.url));
};

desksms.sms = function(callback){
    // null check email here.
   url = desksms.SMS_URL;
      $.get(url,
        function(data,textStatus,jqXHR)
        {
             callback(null, data);
        },
        'jsonp'
        ).error(function(err) {
            callback(err);
        });
};

desksms.sendMessage = function(message, number){
    function(event)
    {
        var str = sprintf('{"data":[{"message": "%s", "number": "%s", "date": %s}]}',[message, number, (new Date).getDate()]);
        event.preventDefault();
        $.ajax({
           type:'GET',
           dataType:"jsonp",
           url: sprintf(OUTBOX_URL+ '?operation=POST&data='+encodeURIComponent(str),desksms.email),
           success: function(data) {
             console.log(data)
           },
           error: function(jqXHR, textStatus, errorThrown) {
             console.log(jqXHR);
           }
       });
   }
};