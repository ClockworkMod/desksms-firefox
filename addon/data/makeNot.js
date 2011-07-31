function checkTxts(){
    var count = $('#count').text();
    if(parseInt(count))
    {
        var messages = $('#messages').text();
        $('#count').text('0');
        $('#messages').text('');
        messages = $.parseJSON(messages);
        self.postMessage({ count: count, messages: messages, type:'messages'});
    }
}
checkTxts();

var cycle = setInterval(checkTxts, 1000);