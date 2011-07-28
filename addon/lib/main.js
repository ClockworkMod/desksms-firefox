exports.main = function() {};

var widgets = require("widget");
var panels = require("panel");
var notifications = require("notifications");
var data = require("self").data;

var newCount = 0;

var xpanel = panels.Panel({
    contentURL:'file:///Users/arun/Documents/ffdesktopsms/index.html',
    //contentURL: "http://www.clockworkmod.com/ffdesktopsms/index.html",
    contentScriptFile: [data.url("jquery-1.6.1.min.js"), data.url("makeNot.js")],
    contentScriptWhen: "ready",
    onMessage:function(data){
        console.log(JSON.stringify(data));
        for(i in data.messages)
        {
            notifications.notify({
                title:data.messages[i].number,
                text:data.messages[i].message
            });
         }

         dSmsWid.content = '<img src="http://www.bing.com/favicon.ico"> ' + String(newCount+parseInt(data.count));
    },
    height: 500,
    width: 350
});

var dSmsWid = widgets.Widget({
    id: "mouseover-effect",
    label: " ",
    width: 40,
    panel: xpanel,
    content: '<img src="http://www.bing.com/favicon.ico"> 0',
    onClick:function(){
        this.content = '<img src="http://www.bing.com/favicon.ico"> 0';
        newCount = 0;
    }
});

