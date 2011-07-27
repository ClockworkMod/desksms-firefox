function checkTxts(){
    var x = $('#blah').text();
    console.log(x);
    if(parseInt(x))
        self.postMessage(x);
}
checkTxts();

var cycle = setInterval(checkTxts, 10000);
