exports.main = function() {};

var widgets = require("widget");
var panels = require("panel");
var notifications = require("notifications");
var data = require("self").data;

var newCount = 0;

var xpanel = panels.Panel({
    //contentURL:'file:///Users/arun/Documents/ffdesktopsms/index.html',
    contentURL: "http://www.clockworkmod.com/ffdesktopsms/index.html",
    //contentURL: "http://www.clockworkmod.com/desksms",
    contentScriptFile: [data.url("jquery-1.6.1.min.js"), data.url("makeNot.js")],
    contentScriptWhen: "ready",
    'background': 'white',
    color:'black',
    onMessage:function(data){
        console.log(JSON.stringify(data));
        for(i in data.messages)
        {
            notifications.notify({
                title:data.messages[i].number,
                text:data.messages[i].message
            });
         }

         if(data.count)
         {
             dSmsWid.width = 40;
             dSmsWid.content = '<img src='+String(data.url('desksms.png'))+'><span style="padding-left:4px;padding-right:4px;background-color:#F00;color:#FFF;">' + String(newCount+parseInt(data.count)) + '</span>';
             newCount+=parseInt(data.count);
         }
    },
    height: 475,
    width: 350
});

var dSmsWid = widgets.Widget({
    id: "DeskSMS",
    label: "DeskSMS for Firefox",
    width: 16,
    panel: xpanel,
    content: '<img src='+String(data.url('desksms.png'))+'><span style="padding-left:4px;padding-right:4px;">' + '' + '</span>',
    onClick:function(){
        this.content = '<img src='+String(data.url('desksms.png'))+'><span style="padding-left:4px;padding-right:4px;">' + '' + '</span>';
        newCount = 0;
    }
});
