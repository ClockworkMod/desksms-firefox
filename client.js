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
desksms.LOGIN_URL = desksms.API_URL + "/user/login?continue=%s";
desksms.LOGOUT_URL = desksms.API_URL + "/user/logout?continue=%s";
desksms.WHOAMI_URL = desksms.API_URL + "/user/whoami";

var jsonp = function(url, cb, data) {
    $.get(url, data, function(data) {
        cb(null, data);
    },
    "jsonp").error(function(err) {
        cb(err);
    });
}

desksms.whoami = function(callback) {
    jsonp(desksms.WHOAMI_URL, callback);
}

desksms.getLoginUrl = function() {
    return sprintf(desksms.LOGIN_URL, window.location.href);
}

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