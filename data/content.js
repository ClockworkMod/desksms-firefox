$(document).ready(function() {
  var curCount = 0;
  var firefoxExtensionData = $('#firefox-extension-data');
  var badgeLooper = function() {
    var count = 0;
    try {
      count = parseInt(firefoxExtensionData.text());
      if (isNaN(count))
        count = 0;
    }
    catch (e) {
    }
    firefoxExtensionData.text('');
    
    // we will keep counting up forever,
    // the addon needs to keep track of how badges have been shown.
    if (count > 0) {
      curCount += count;
      self.port.emit('badge', curCount);
    }
    
    setTimeout(badgeLooper, 1000);
  };
  
  badgeLooper();
});