class ProgressBar {

    constructor(output) {
        this.progress = 0;
        this.output = output;
    }

    start() {
        this.output.setState('Iniciando...');
    }

    reset() {
        this.output.resetProgressBar();
        this.output.setState('Parado');
        this.progress = 0;
    }
}