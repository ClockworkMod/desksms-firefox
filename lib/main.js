exports.main = function() {};

var widgets = require("widget");
var panel = require("panel");
var notifications = require("notifications");
var data = require("self").data;
var newCount = 0;

console.log('sup');

var desksmsPanel = panel.Panel({
    contentURL: "http://localhost:3001/index.html#extension=firefox",
    contentScriptFile: [data.url("jquery-1.6.1.min.js"), data.url("content.js")],
    contentScriptWhen: "ready",
    height: 500,
    width: 640
});

var getBadgeText = function(show) {
  if (show) {
    return '<img src=' + String(data.url('desksms-notify.png')) + '></img>';
  }
  return '<img src=' + String(data.url('desksms.png')) + '></img>';
}

var desksmsWidget = widgets.Widget({
    id: "DeskSMS",
    label: "DeskSMS - Send and Receive Texts Messages",
    width: 16,
    panel: desksmsPanel,
    content: getBadgeText(''),
    onClick: function() {
        this.content = getBadgeText(false);
        newCount = 0;
    }
});

var badgeCount = 0;
desksmsPanel.port.on('badge', function(badge) {
  console.log('badge');
  console.log(badge);
  var badgeDiff = badge - badgeCount;
  badgeCount = badge;
  desksmsWidget.content = getBadgeText(true);
});
