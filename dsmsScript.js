var newTxts = 0;
$(document).ready(function() {
    $('#inbox').click(
    function(event)
    {
        event.preventDefault();
        $('#sendListItem').removeClass("selected");
        $('#inboxListItem').addClass("selected");

        $('#txtStreamFrame').removeClass("hide");
        $('#containText').addClass("hide");
    }
    );

    $('#text').click(
    function(event)
    {
        event.preventDefault();
        $('#inboxListItem').removeClass("selected");
        $('#sendListItem').addClass("selected");

        $('#containText').removeClass("hide");
        $('#txtStreamFrame').addClass("hide");
    }
    );
    // Get texts, display texts
    window.desksms.sms(getNShowTxts);
});


function getNShowTxts(error, data)
 {
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
            threads[num].push(data[i]);
        }
    }

    showTxts(threads, (new Date()).getTime());

}

function realTime(utc)
 {
    var theDate = new Date(utc);
    var month = theDate.getMonth() + 1;
    var day = theDate.getDate();
    var year = theDate.getFullYear();
    var hour = theDate.getHours();
    var minute = theDate.getMinutes();
    var sec = theDate.getSeconds();
    theDate = hour + ':' + minute + ':' + sec + ',' + month + "/" + day + "/" + year;
    return theDate;
}

function longAgo(utc)
 {
    //ROUND!!!!
    var theDate = new Date(utc);
    var diff = (new Date()).getTime() - theDate.getTime();
    var dayCount = Math.floor(diff / 86400000);
    var howLong = '';

    if (dayCount >= 14)
    howLong = sprintf('%s %s ago.', Math.floor(dayCount / 7), 'weeks');
    else if (dayCount > 1)
    howLong = sprintf('%s %s ago.', dayCount, 'days');
    else if (dayCount == 1)
    howLong = '1 day ago.';
    else
    {
        //hours
        if (Math.floor(diff / 3600000) > 2)
        howLong = sprintf('%s %s ago.', Math.floor(diff / 3600000), 'hours');
        // More than an hour
        else if (diff / 3600000.0 > 1.5)
        howLong = 'More than an hour ago.';
        else if (Math.floor(diff / 3600000) == 1)
        howLong = '1 hour ago.';
        //minutes
        else if (Math.floor(diff / 60000) >= 1)
        howLong = sprintf('%s %s ago.', Math.floor(diff / 60000), 'minutes');
        else if (Math.floor(diff / 60000) == 1)
        howLong = '1 minute ago.';
        //Just now
        else
        howLong = 'Just now.';
    }

    return howLong;
}

function showTxts(threads, theTime)
 {
    $(".threadBox").remove();
    newTxts = 0;

    var threadNum = 0;
    for (var i in threads)
    {
        var xclone = $('.thread-template').clone();
        xclone.find('strong').text(threads[i][0]['number']);
        $('#txtStream').append(xclone.removeClass('thread-template').addClass('threadBox ' + threadNum).show());

        var msgCount = 0;
        var charCount = 0;
        var latestDate = 0;
        for (var j in threads[i])
        {
            // Limit the number of messages shown
            if (msgCount > 2 || charCount > 320)
            break;

            var txt = threads[i][j];

            //First Text listed is the lastest text
            if (j == 0)
            {
                latestDate = txt['date'];
                xclone.find('em').text(longAgo(latestDate));
            }

            // Count the number of new texts from minute and a half ago
            if (txt['date'] > theTime - 90000)
            newTxts++;

            var yclone = $('.message-template').clone();

            if (txt['type'] == 'incoming')
            yclone.find('strong').text(txt['number'] + ': ')
            else
            yclone.find('strong').text('Me:')

            yclone.find('span').text(txt['message']);

            xclone.append(yclone.removeClass('message-template').show());

            msgCount++;
            charCount += txt['message'].length;
        }
        xclone.append('<a class="replyLink" onClick="addReplyBox(' + threadNum + ',' + txt['number'] + ');" href="#">Reply</a>');
        $('#txtStream').append('<br class="threadBox"/>');
        threadNum++;
    }
    $('#blah').text(newTxts);
}

