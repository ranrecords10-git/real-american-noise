(function () {
    var img = document.querySelector('.floating-logo');
    var header = document.querySelector('header.site');
    if (!img || !header) return;

    var w = img.offsetWidth;
    var h = img.offsetHeight;
    var x = 0;
    var topBoundary = 0;
    var y = 0;
    var dy = 1.2;
    var started = false;

    function anchorEl() {
        return document.querySelector('.releases') || document.querySelector('.tracklist');
    }

    function recalc() {
        var anchor = anchorEl();
        x = anchor ? anchor.getBoundingClientRect().right + 32 : window.innerWidth - w - 32;
        topBoundary = header.getBoundingClientRect().bottom;

        if (!started) {
            y = topBoundary;
            started = true;
        }
    }

    recalc();
    window.addEventListener('resize', recalc);

    function frame() {
        var maxY = window.innerHeight - h;

        y += dy;

        if (y <= topBoundary) { y = topBoundary; dy = -dy; }
        if (y >= maxY) { y = maxY; dy = -dy; }

        img.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}());
