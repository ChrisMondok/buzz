addEventListener('load', function() {
    var es = new EventSource(location.origin+'/sse');

    es.addEventListener('message', function(message) {
        if(message.data == 'buzz')
            buzz();
    });
});

function buzz() {
    document.querySelector('audio').play();
}
