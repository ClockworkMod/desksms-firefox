function checkTxts(){
    var count = $('#count').text();
    var messages = $('#messages').text();
    messages = $.parseJSON(messages);
    if(parseInt(count))
        self.postMessage({ count: count, messages: messages, type:'messages'});
}
checkTxts();

var cycle = setInterval(checkTxts, 1000);

window.onbeforeunload = function() { $('body').css('background', 'white'); }