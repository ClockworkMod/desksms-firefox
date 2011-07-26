exports.main = function() {};

var widgets = require("widget");
var panels = require("panel");
var notifications = require("notifications");
var data = require("self").data;

var xpanel = panels.Panel({
    contentURL: "http://www.clockworkmod.com/ffdesktopsms/index.html",
    height: 500,
    width: 350
});

var modScript = 'self.port.on("myAddonEvent", function(newTxts) {' +
'notifications.notify({' +
'title:baldjkfa,' +
'text:newTxts' +
'});' +
'});';

var dSmsWid = widgets.Widget({
    id: "mouseover-effect",
    label: " ",
    width: 40,
    panel: xpanel,
    content: '<img src="http://www.bing.com/favicon.ico"> ' + String(0),
    contentScriptFile: [data.url("jquery-1.6.1.js"), data.url("makeNot.js")],
    contentScript: modScript,
    contentScriptWhen: "ready"
});

