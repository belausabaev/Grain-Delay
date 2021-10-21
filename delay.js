
let outGain = 2;


const gainNode = new Tone.Gain(outGain);
const delay = new Tone.Delay(0.5);
const feedbackDelay = new Tone.FeedbackDelay("8n", 0.05);


let audioFile = "data/music/Theremin_Hauptstimme.wav";

gp = new Tone.GrainPlayer(audioFile, () => {

    //gp.detune = 300;
    gp.detune = 100
    gp.grainSize = "5n"
    gp.overlap = 0.02
    gp.loop = false;
    gp.playbackRate = 0.2
    console.log("GrainPlayer loaded!")
    console.log("gp.playbackRate:", gp.playbackRate)
    console.log("gp.grainSize", gp.grainSize)
  }).connect(gainNode).toDestination();


const audioBuffer = new Tone.ToneBufferSource("guitar.wav", () => {
    console.log('loaded');
});

//audioBuffer.connect(delay).toDestination();

const player = new Tone.Player(audioFile);

player.connect(feedbackDelay).connect(gainNode).toDestination();



 // gp.start();

//audioBuffer.connect(delay).connect(gainNode).toDestination().start();
/*
const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
const tom = new Tone.MembraneSynth({
	octaves: 4,
	pitchDecay: 0.1
}).connect(feedbackDelay);
tom.triggerAttackRelease("A2", "32n");
*/