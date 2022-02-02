const pane = new Tweakpane({
    title: 'Grain Delay',
    expanded: true,
});

pane.addSeparator();

const instr = pane.addFolder({
    title: 'Sound',
});

const btnSound = instr.addButton({
    title: '► | ◼︎',
    label: 'sound on/off',
});

playing = false;

btnSound.on('click', () => {
    if (playing) {
        Tone.getContext().rawContext.suspend();
        playing = false;
        audioBuffer.disconnect();
    } else {
        Tone.start();
        playing = true;
        /*
        const recorder = new Tone.Recorder();
        gp.connect(recorder);
        // start recording
        recorder.start();
        // generate a few notes
        gp.start();
        // wait for the notes to end and stop the recording
        setTimeout(async () => {
            // the recorded audio is returned as a blob
            const recording = await recorder.stop();
            // download the recording by creating an anchor element and blob url
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement("a");
            anchor.download = "recording.webm";
            anchor.href = url;
            anchor.click();
        }, 70000);
    */
        gp.start();
        let len = audioBuffer.buffer.length;
        let att = 0.1;
        let dec = 0.1;

        /*
            for(let i = 0; i < len/50; i + 50){
                buf = new Tone.ToneBufferSource().toDestination();
                buf.buffer = audioBuffer.buffer;
                buf.start(Tone.now(),(audioBuffer.buffer.length*i)/audioBuffer.buffer.length);
                buf.stop(Tone.now()+(audioBuffer.buffer.length*i)/audioBuffer.buffer.length);
                
            }
            */

      

/*
        for (let i = 0; i < 50; i + 0.1) {
            
            const buf = new Tone.ToneBufferSource().toDestination();
            buf.buffer = audioBuffer.buffer;
            grainGain = new Tone.Gain();
            contour = new Tone.Gain();

            contour.gain.setValueAtTime(0, Tone.now());
            contour.gain.exponentialRampToValueAtTime(0.6, Tone.now() + att);
            contour.gain.exponentialRampToValueAtTime(0, Tone.now() + (att + dec));

            contour.connect(grainGain);

            grainGain.toDestination();
            buf.connect(contour);

            buf.start(Tone.now(), (len * i) / len + Math.random(0,1), (att + dec));
            //buf.stop(Tone.now()+(att+dec));
            
            grainGain.disconnect();
        

        }
        console.log(Tone.getContext().rawContext.state);

*/
        //     audioBuffer.start();


        // gp.start();
        //  console.log("started gp");
        //player.start();
        //audioBuffer.start();

    }



});