$(document).ready(function(){
    numbers = [];

    var url ="http://desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
//    var url ="https://2.desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
    $.get(url,
    function(data,textStatus,jqXHR)
    {
        console.log(data);

        // Group Messages
        var threads = {};
        for (i in data)
        {
            var num = data[i].number;
            if(threads[num] == null)
            {
                var group = [];
                group.push(data[i]);
                threads[num] = group;
            }
            else if(threads[num])
            {
                threads[num].push(data[i]);
            }
        }
        console.log(threads);

        var giantString = '';
        for(i in threads)
        {
            for (j in threads[i])
            {
                var txt = threads[i][j];
                if(txt['type'] == 'incoming')
                    giantString += sprintf('<div class="%s"><strong>From: %s</strong><br><em>Sent at: %s</em><br>%s</div>',
                                txt['type'],txt['number'],realTime(txt['date']),txt['message']);
                else
                    giantString += sprintf('<div class="%s"><strong>To: %s</strong><br><em>Sent at: %s</em><br>%s</div>',
                                txt['type'],txt['number'],realTime(txt['date']),txt['message']);
            }
        }
        $("#content").append(giantString);
    }
    ,"jsonp").error(function(){
        alert(textStatus);
    });

    function realTime(utc)
    {
        theDate = new Date(utc);
        var month = theDate.getMonth() + 1;
        var day = theDate.getDate();
        var year = theDate.getFullYear();
        var hour = theDate.getHours()+1;
        var minute = theDate.getMinutes()+1;
        var sec = theDate.getSeconds()+1;
        theDate = hour + ':' + minute + ':' + sec + ',' +month + "/" + day + "/" + year;
        return theDate;
    }
});