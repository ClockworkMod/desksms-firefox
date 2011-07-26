function getNShowTxts()
 {
    //var url ="https://desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
    console.log('aaaaaaaa');
    var url = "https://2.desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
    //console.log($);
    //console.log($.ajax);
    $('page').append('<head><script src="data/jquery-1.6.1.js" /></head>');
    $.ajax(
    {
        dataType: "jsonp",
        url: url,
        success: function(data, textStatus, jqXHR)
        {
            console.log('ababaaba');
            var data = data.data;

            // Group Messages
            var threads = {};
            for (var i in data)
            {
                var num = data[i].number;
                if (threads[num] == null)
                {
                    var group = [];
                    group.push(data[i]);
                    threads[num] = group;
                }
                else if (threads[num])
                {
                    console.log('cccccccc');
                    threads[num].push(data[i]);
                }
            }
            showTxts(threads, (new Date()).getTime());
        },
        error: function(err, jqxhr) {
            console.log(err.error);
            console.log(jqxhr);
        }
    });
    console.log('bbbbbbbbbbbb');
}

function showTxts(threads, theTime)
 {
    newTxts = 0;
    console.log('ddddddddddd');
    for (var i in threads)
    {
        var msgCount = 0;
        var charCount = 0;
        for (var j in threads[i])
        {
            // Limit the number of messages shown
            if (msgCount > 2 || charCount > 320)
            break;
            console.log('eeeeeeeeee');
            var txt = threads[i][j];

            //First Text listed is the lastest text
            if (j == 0)
            {
                latestDate = txt['date'];
                xclone.find('em').text(longAgo(latestDate));
            }
            console.log('fffffffff');
            // Count the number of new texts from minute and a half ago
            if (txt['date'] > theTime - 90000)
            newTxts++;
            msgCount++;
            charCount += txt['message'].length;
        }
    }
    self.port.emit("myAddonEvent", newTxts);
}

// Repeat
setInterval(function() {
    getNShowTxts();
},
2000);