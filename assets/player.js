document.querySelectorAll('.tracklist').forEach(function (list) {
    var audio = list.querySelector('audio');
    var nowPlaying = list.querySelector('.now-playing');
    var tracks = Array.prototype.slice.call(list.querySelectorAll('.track'));
    var currentIndex = -1;

    function playTrack(index) {
        if (index < 0 || index >= tracks.length) return;
        var track = tracks[index];
        currentIndex = index;
        tracks.forEach(function (t) { t.classList.remove('active'); });
        track.classList.add('active');

        audio.innerHTML = '';
        var source = document.createElement('source');
        source.src = track.dataset.src;
        source.type = 'audio/mpeg';
        audio.appendChild(source);
        audio.load();
        audio.play().catch(function () {});

        if (nowPlaying) nowPlaying.textContent = track.dataset.title;
    }

    tracks.forEach(function (track, index) {
        track.addEventListener('click', function () {
            playTrack(index);
        });
    });

    audio.addEventListener('ended', function () {
        playTrack(currentIndex + 1);
    });
});
