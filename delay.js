/*

var audioCtx = new (window.AudioContext || window.webkitAudioContext);
var mediaElem = document.querySelector('audio');
var stream = audioCtx.createMediaElementSource(mediaElem);
var gainNode = audioCtx.createGain();

// This a normal connection between to native AudioNodes.
stream.connect(gainNode);

// Set the context used by Tone.js
Tone.context = audioCtx;

var pitchShift = new Tone.PitchShift();

// Use the Tone.connect() helper to connect native AudioNodes with the nodes provided by Tone.js
Tone.connect(gainNode, pitchShift);
Tone.connect(pitchShift, audioCtx.destination);

*/

let outGain = 2.1;


const gainNode2 = new Tone.Gain(outGain).toDestination();
const delay = new Tone.Delay(0.4).toDestination();
// delayTime, feedback amount // only adds delay

// delayTime, resonance // adds vibration
const fbcombfilter = new Tone.FeedbackCombFilter(0.01, 0.01).toDestination();

const fbcombfilter2 = new Tone.FeedbackCombFilter(0.01, 0.4).toDestination();

const fbcombfilter3 = new Tone.FeedbackCombFilter(0.01, 0.4).toDestination();

const fbcombfilter4 = new Tone.FeedbackCombFilter(0.3, 0.2).toDestination();

Tone.FeedbackCombFilter.dry = 0;
Tone.FeedbackCombFilter.wet = 1;

//const filter = new Tone.BiquadFilter(4000, "highpass").toDestination();
const filter = new Tone.Filter(15000, "highpass").toDestination();
filter.frequency.rampTo(20000, 10);

var convolver = new Tone.Convolver();
var duration = 1;
var decay = 10;
var reverse = true;
convolver.buffer = createImpulseResponse(duration, decay, reverse);
//var wet = 0.5;
//convolver.wet.value = wet;
var bypassed = false;
convolver.toDestination();

let audioFile = "data/music/Theremin_Hauptstimme_sound.wav";
let audioFile2 = "guitar.wav";



const eq = new Tone.EQ3(-6, -6, 10).toDestination();

const dist = new Tone.Distortion(2000).toDestination();

const phaser = new Tone.Phaser({
  frequency: 50,
  octaves: 1,
  baseFrequency: 10000
}).toDestination();

const stereowid = new Tone.StereoWidener(0.7).toDestination();

const pitchsh = new Tone.PitchShift(12).toDestination();

const audioBuffer = new Tone.ToneBufferSource(audioFile, () => {
  console.log('loaded');
}).toDestination();




//audioBuffer.connect(feedbackDelay).toDestination();


let feedForward = [1.00020298, 1.0004059599, 1.00020298];
let feedBack = [2.0126964558, -2.9991880801, 2.9873035442];

const iirFilter = Tone.getContext().rawContext.createIIRFilter(feedForward, feedBack);


Tone.FeedbackDelay.wet = 0.5;

const feedbackDelay = new Tone.FeedbackDelay(0.1, 0.2).toDestination();
const feedbackDelay2 = new Tone.FeedbackDelay(0.15, 0.4).toDestination();
const feedbackDelay3 = new Tone.FeedbackDelay(0.2, 0.2).toDestination();
const feedbackDelay4 = new Tone.FeedbackDelay(0.25, 0.4).toDestination();
const feedbackDelay5 = new Tone.FeedbackDelay(0.3, 0.2).toDestination();
const feedbackDelay6 = new Tone.FeedbackDelay(0.35, 0.3).toDestination();
const feedbackDelay7 = new Tone.FeedbackDelay(0.4, 0.4).toDestination();
const feedbackDelay8 = new Tone.FeedbackDelay(0.45, 0.45).toDestination();
const feedbackDelay9 = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
const feedbackDelay10 = new Tone.FeedbackDelay(0.55, 0.55).toDestination();
const feedbackDelay11 = new Tone.FeedbackDelay(0.6, 0.6).toDestination();
const feedbackDelay12 = new Tone.FeedbackDelay(0.7, 0.7).toDestination();

const reverb = new Tone.Reverb(0.05).toDestination();
//const cheby = new Tone.Chebychev(3).toDestination();

gp = new Tone.GrainPlayer(audioBuffer.buffer, () => {

  //gp.detune = 300;

  gp.detune = 1010
  gp.grainSize = 0.1
  gp.overlap = 0.09
  gp.loop = false; 
  gp.playbackRate = 0.9
  console.log("GrainPlayer loaded!")
  console.log("gp.playbackRate:", gp.playbackRate)
  console.log("gp.grainSize", gp.grainSize)
}).connect(feedbackDelay11).connect(feedbackDelay12).connect(feedbackDelay3).toDestination();
//.connect(feedbackDelay).connect(feedbackDelay2).connect(feedbackDelay3).connect(feedbackDelay4).connect(feedbackDelay5).connect(feedbackDelay6).connect(feedbackDelay7).connect(feedbackDelay8).connect(feedbackDelay9).connect(feedbackDelay10).connect(feedbackDelay11).toDestination();
//.connect(pitchsh).connect(filter).connect(feedbackDelay).toDestination(); 
// mit convolver -> echo
//mit feedbackDelay -> reverb, 8n, 16b, 8t, // 1n -> langes echo


let offlineCtx = new OfflineAudioContext(1, 44100 * 40, 44100);
source = offlineCtx.createBufferSource(audioFile);




  const ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8
  }).toDestination();
  // create an oscillator and connect it

  const audioBuffer2 = new Tone.ToneBufferSource(audioFile, () => {
    console.log('loaded');
  });

  const bufff = audioBuffer2.connect(ampEnv).toDestination();
 // const osc = new Tone.Oscillator().connect(ampEnv).start();
  // trigger the envelopes attack and release "8t" apart
  ampEnv.triggerAttackRelease("4n");




function offlineAmplEnv(){

  return Tone.Offline(() => {
    const ampEnv = new Tone.AmplitudeEnvelope({
      attack: 0.1,
      decay: 0.2,
      sustain: 1.0,
      release: 0.8
    }).toDestination();
    // create an oscillator and connect it
    const osc = new Tone.Oscillator().connect(ampEnv).start();
    // trigger the envelopes attack and release "8t" apart
    ampEnv.triggerAttackRelease("8t");
  }, 1.5, 1);

}

//audioBuffer.start();
//audioBuffer.connect(delay).toDestination();



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