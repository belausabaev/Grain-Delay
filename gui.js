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
        }, 60000);
        */
        gp.start();
      //  console.log("started gp");
        //player.start();
        //audioBuffer.start();

    }



});