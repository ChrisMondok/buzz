addEventListener('load', function() {
    var ws = new WebSocket('ws://'+location.host);

    ws.addEventListener('message', function(message) {
        if(message.data == 'buzz') {
            console.log('buzz');
            buzz();
        }
    });
});

function buzz() {
    document.querySelector('audio').play();
}
