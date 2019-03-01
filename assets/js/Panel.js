class Panel {

    constructor(output) {
        this.output = output;
    }

    reset() {
        this.output.displayButton('clear', false);
        this.output.displayButton('markdown', false);
    }

    start() {
        this.output.displayButton('clear', false);
        this.output.displayButton('generate', false);
        this.output.displayButton('markdown', false);

        this.output.displayButton('pause', true);
    }
}