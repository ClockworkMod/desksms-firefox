var newTxts = 0;
var threads = {};
$(document).ready(function()
{
    desksms.whoami(function(err, data)
    {
        if (!data.email)
        {
            window.location.href = window.desksms.getLoginUrl();
        }
    });

    // Get texts, display texts
    window.desksms.sms(getTxts);
    showTxts((new Date()).getTime());
});

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
    //Consider making more options?
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
        else if (Math.floor(diff / 1000) > 10)
            howLong = sprintf('%s %s ago.', Math.floor(diff / 1000), 'seconds');
        //Just now
        else
            howLong = 'Just now.';
    }

    return howLong;
}

function getTxts(error, vdata)
 {
    var data = vdata.data;
    threads = {};
    // Group Messages
    for (var i in data.reverse())
    {
        var num = data[i].number;
        if (threads[num] == null)
        {
            var group = [];
            group.push(data[i]);
            threads[num] = group;
        }
        else if (threads[num])
            threads[num].push(data[i]);
    }
}

function showTxts(theTime)
 {
    $(".threadBox").remove();

    var threadNum = 0;
    var newMessages = [];
    var threadsL = threads.length;
    for (var i in threads)
    {
        var xclone = $('.thread-template').clone();
        xclone.find('strong').text(threads[i][0]['number']);
        $('#txtStream').append(xclone.removeClass('thread-template').addClass('threadBox ' + threadNum).show());

        var msgCount = 0;
        var charCount = 0;
        var latestDate = 0;
        var threadL = threads[i].length;
        for (var j in threads[i])
        {
            // Limit the number of messages shown
            if ((msgCount > 2) || (charCount > 320))
                break;

            var txt = threads[i][j];

            //First Text listed is the lastest text
            if (j == 0)
            {
                latestDate = txt['date'];
                xclone.find('em').text(longAgo(latestDate));
            }

            // Count the number of new texts from minute and a half ago
            if (txt['date'] >= (theTime - 20000))
                newTxts++;

            var yclone = $('.message-template').clone();

            if (txt['type'] == 'incoming')
            {
                yclone.find('strong').text(txt['number'] + ': ')

                if (txt['date'] >= (theTime - 20000))
                    newMessages.push({'icon':'','number':String(txt['number']),'message':String(txt['message'])});
            }
            else
                yclone.find('strong').text('Me:')

            yclone.find('span').text(txt['message']);

            xclone.append(yclone.removeClass('message-template').show());

            msgCount++;
            charCount += txt['message'].length;
        }
        xclone.append(' <a class="replyLink" onClick="addReplyBox(' + threadNum + ',' + txt['number'] + ');" href="#">Reply</a>');
        $('#txtStream').append('<br class="threadBox"/>');
        threadNum++;

        if(threadNum > 4)
            break;
    }
    $('#count').text(String(newTxts));
    newTxts =0;
    $('#messages').text(JSON.stringify(newMessages));
}

function getNShowTxts()
{
  window.desksms.sms(getTxts);
  showTxts((new Date()).getTime());
}