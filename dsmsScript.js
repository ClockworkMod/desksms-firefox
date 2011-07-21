$(document).ready(function(){
    numbers = [];

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

    var url ="http://desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
    //var url ="https://2.desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
    $.get(url,
    function(data,textStatus,jqXHR)
    {
        data = data.data
        console.log(data);

        // Group Messages
        var threads = {};
        for (var i in data)
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

        // Display texts
        showTxts(threads);

    }
    ,"jsonp");

    function realTime(utc)
    {
        theDate = new Date(utc);
        var month = theDate.getMonth() + 1;
        var day = theDate.getDate();
        var year = theDate.getFullYear();
        var hour = theDate.getHours();
        var minute = theDate.getMinutes();
        var sec = theDate.getSeconds();
        theDate = hour + ':' + minute + ':' + sec + ',' +month + "/" + day + "/" + year;
        return theDate;
    }

    function showTxts(threads)
    {
        for(var i in threads)
        {
            console.log(i);
            var xclone = $('.thread-template').clone();
            xclone.find('strong').text(threads[i][0]['number']);
            $('#txtStream').append(xclone.removeClass('thread-template').addClass('threadBox').show());

            for (var j in threads[i])
            {
                var txt = threads[i][j];
                var yclone = $('.message-template').clone();

                if(txt['type']=='incoming')
                    yclone.find('strong').text(txt['number']+': ')
                else
                    yclone.find('strong').text('Me:')

                yclone.find('span').text(txt['message']);

               xclone.append(yclone.removeClass('message-template').show());

            }
            $('#txtStream').append('<br />');
        }

    }
});