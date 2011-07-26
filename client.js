desksms = {};


desksms.BASE_URL = "https://desksms.appspot.com";
desksms.MESSAGE_URL = BASE_URL + "/message";
REGISTER_URL = BASE_URL + "/register";
desksms.AUTH_URL = BASE_URL + "/_ah/login";
desksms.API_URL = BASE_URL + "/api/v1";
desksms.USER_URL = API_URL + "/user/%s";
desksms.SETTINGS_URL = USER_URL + "/settings";
desksms.SMS_URL = USER_URL + "/sms";
desksms.CALL_URL = USER_URL + "/call";
desksms.OUTBOX_URL = USER_URL + "/outbox";
desksms.LOGIN_URL = API_URL + "/user/whoami";
desksms.CONTINUE_URL = AUTH_URL + "?continue=file%3A%2F%2F%2FUsers%2Farun%2FDocuments%2Fffdesktopsms%2Findex.html";


desksms.login = function(callback){
    // on success
    desksms.email = data.email;
};

desksms.sms = function(callback){
    // null check email here.
   url = sprintf(desksms.SMS_URL, desksms.email);
      $.get(url,
        function(data,textStatus,jqXHR)
        {
             callback(null, data);

            }
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
           url: API_URL+ 'user/DSMS.clockwork@gmail.com/outbox?operation=POST&data='+encodeURIComponent(str),
           success: function(data) {
             console.log(data)
           },
           error: function(jqXHR, textStatus, errorThrown) {
             console.log(jqXHR);
           }
       });
};