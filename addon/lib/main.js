exports.main = function() {};

var widgets = require("widget");
var panels = require("panel");
var notifications = require("notifications");
var data = require("self").data;

var xpanel = panels.Panel({
    contentURL: "http://www.clockworkmod.com/ffdesktopsms/index.html",
    contentScriptFile: [data.url("jquery-1.6.1.min.js"), data.url("makeNot.js")],
    contentScriptWhen: "ready",
    onMessage:function(x){
        notifications.notify({
             title:'hahahaha',
             text:x
          });
         dSmsWid.content = parseInt(x) + 1;
    },
    height: 500,
    width: 350
});

var dSmsWid = widgets.Widget({
    id: "mouseover-effect",
    label: " ",
    width: 40,
    panel: xpanel,
    content: '<img src="http://www.bing.com/favicon.ico"> ' + String(0)
});

