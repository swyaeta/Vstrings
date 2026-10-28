let audio = new AudioContext();

let strings = document.querySelectorAll(".string");

strings.forEach(function(string) {
    string.addEventListener("click", function() {

        let note = Number(string.dataset.note);

        let oscillator = audio.createOscillator();
        let volume = audio.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.value = note;

        volume.gain.setValueAtTime(0.3, audio.currentTime);
        volume.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 1
        );

        oscillator.connect(volume);
        volume.connect(audio.destination);

        oscillator.start();
        oscillator.stop(audio.currentTime + 1);
    });
});