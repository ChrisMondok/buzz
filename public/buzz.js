if('EventSource' in window)
    subscribeToBuzzes();
else
    alert('Your browser does not support EventSource. You will not hear anything.');

function subscribeToBuzzes() {
    var es = new EventSource(location.origin+'/sse');

    es.addEventListener('buzz', function(buzzEvent) {
        buzz();
    });
}

function buzz() {
    document.querySelector('audio').play();
}
