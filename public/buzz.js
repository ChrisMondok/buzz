if('EventSource' in window)
    subscribe();
else
    alert('Your browser does not support EventSource. You will not hear anything.');

function subscribe() {
    var es = new EventSource(location.origin+'/sse');

    var version = undefined;

    es.addEventListener('buzz', function(buzzEvent) {
        buzz();
    });

    es.addEventListener('version', function(versionEvent) {
        var newVersion = versionEvent.data;
        if(!version)
            version = newVersion;
        if(version != newVersion)
            location.reload();
    });
}

function buzz() {
    var sound = getSound();
    sound.currentTime = 0;
    sound.play();
    animateButton(sound.duration);
}

function getSound() {
    return document.querySelector('audio');
}

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

function animateButton(duration) {
    if( !( 'requestAnimationFrame' in window))
        return;

    var button = document.querySelector('button.buzz');

    var remaining = Math.floor(1000 * duration);
    var initial = remaining;
    var lastTick = new Date();

    tick();

    function tick() {
        var now = new Date();
        var dt = now - lastTick;
        lastTick = now;

        remaining -= dt;

        updateButton();

        if(remaining > 0)
            requestAnimationFrame(tick);
    }

    function updateButton() {
        var magnitude = 0.35 * Math.max(Math.min(1, Math.pow((remaining/initial), 5)), 0);
        var scale = 'scale('+ (1 + magnitude) + ')';

        var rotate = 'rotate(' + magnitude * Math.sin(remaining/15) * 10 + 'deg)';

        button.style.webkitTransform = [scale, rotate].join(' ');
        button.style.transform = [scale, rotate].join(' ');
    }
}
