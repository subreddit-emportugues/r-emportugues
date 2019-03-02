class Panel {

    constructor(output) {
        this.output = output;
    }

    start() {
        this.output.displayButton('clear', false);
        this.output.displayButton('generate', false);
        this.output.displayButton('markdown', false);
        this.output.displayButton('pause', true);
    }

    pause(state) {
        this.output.setPauseButtonState(state);
    }

    reset() {
        this.output.setPauseButtonState(false);
        this.output.displayButton('clear', false);
        this.output.displayButton('markdown', false);
    }

    finish() {
        this.output.displayButton('clear', true);
        this.output.displayButton('generate', true);
        this.output.displayButton('markdown', true);
        this.output.displayButton('pause', false);
    }
}