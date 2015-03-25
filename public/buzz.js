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
    var sound = getSound();
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
