addEventListener('load', function() {
    var es = new EventSource(location.origin+'/sse');

    es.addEventListener('buzz', function(buzzEvent) {
        buzz();
    });
});

function buzz() {
    document.querySelector('audio').play();
}
