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
    } else {
        Tone.start();
        playing = true;
       // gp.start();
       player.start();
    }



});