
let audio = new AudioContext();

let strings = document.querySelectorAll(".striing");

strings.forEach(function(string) {
    string.addEventListener("click", function() {

        if (audio.state === "suspended") {
            audio.resume();
        }

        let note = Number(string.dataset.note);

        let oscillator = audio.createOscillator();
        let distortion = audio.createWaveShaper();
        let volume = audio.createGain();

        oscillator.type = "sawtooth";
        oscillator.frequency.value = note;

        let curve = new Float32Array(44100);

        for (let i = 0; i < curve.length; i++) {
            let x = (i * 2) / curve.length - 1;
            curve[i] = Math.tanh(3 * x);
        }

        distortion.curve = curve;

        volume.gain.setValueAtTime(0.25, audio.currentTime);
        volume.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 1.5
        );

        oscillator.connect(distortion);
        distortion.connect(volume);
        volume.connect(audio.destination);

        oscillator.start();
        oscillator.stop(audio.currentTime + 1.5);
    });
});
