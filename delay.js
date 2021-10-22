
let outGain = 2.1;


const gainNode = new Tone.Gain(outGain).toDestination();
const delay = new Tone.Delay(2.5).toDestination();
// delayTime, feedback amount // only adds delay
const feedbackDelay = new Tone.FeedbackDelay(0.3, 0.7).toDestination();
// delayTime, resonance // adds vibration
const fbcombfilter = new Tone.FeedbackCombFilter(0.3,0.7).toDestination();

//const filter = new Tone.BiquadFilter(4000, "highpass").toDestination();
const filter = new Tone.Filter(15000, "lowpass").toDestination();
filter.frequency.rampTo(20000, 10);

var convolver = new Tone.Convolver();
var duration = 1;
var decay =  10;
var reverse = true;
convolver.buffer = createImpulseResponse(duration, decay, reverse);
//var wet = 0.5;
//convolver.wet.value = wet;
var bypassed = false;
convolver.toDestination();

let audioFile = "data/music/Theremin_Hauptstimme_sound.wav";
let audioFile2 = "guitar.wav";



const eq = new Tone.EQ3(-6,-6,10).toDestination();

const dist = new Tone.Distortion(2000).toDestination();

const phaser = new Tone.Phaser({
	frequency: 50,
	octaves: 1,
	baseFrequency: 10000
}).toDestination();

const stereowid = new Tone.StereoWidener(0.7).toDestination();

const pitchsh = new Tone.PitchShift(5).toDestination();

gp = new Tone.GrainPlayer(audioFile, () => {

    //gp.detune = 300;

    gp.detune = 2000
    gp.grainSize = 0.07
    gp.overlap = 0.85
    gp.loop = false;
    gp.playbackRate = 1
    console.log("GrainPlayer loaded!")
    console.log("gp.playbackRate:", gp.playbackRate)
    console.log("gp.grainSize", gp.grainSize)
  }).connect(phaser).connect(filter).connect(fbcombfilter).connect(feedbackDelay).toDestination();
// mit convolver -> echo
//mit feedbackDelay -> reverb, 8n, 16b, 8t, // 1n -> langes echo



const distortion = new Tone.Distortion();


const audioBuffer = new Tone.ToneBufferSource(audioFile, () => {
    console.log('loaded');
}).connect(phaser).connect(filter).connect(fbcombfilter).connect(new Tone.Reverb(0.4).toDestination()).connect(feedbackDelay).toDestination();

//audioBuffer.start();
//audioBuffer.connect(delay).toDestination();

const player = new Tone.Player(audioFile2);

player.connect(feedbackDelay).connect(gainNode).toDestination();

/*
var feedbackDelay2 = new Tone.FeedbackDelay(0.05, 0.94).toDestination();
var tom = new Tone.MembraneSynth({
	"octaves" : 4,
	"pitchDecay" : 0.1
}).connect(feedbackDelay2);
tom.triggerAttackRelease("A2","32n");
*/

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


function createImpulseResponse(duration, decay, reverse) {

  var sampleRate = Tone.context.sampleRate;
  var length = sampleRate * duration;
  var impulse = Tone.context.createBuffer(2, length, sampleRate);
  var impulseL = impulse.getChannelData(0);
  var impulseR = impulse.getChannelData(1);

  for (var i = 0; i < length; i++) {
    var n = reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }

  return impulse;
}