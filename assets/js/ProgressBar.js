class ProgressBar {

    constructor(output) {
        this.progress = 0;
        this.output = output;
    }

    awake() {
        this.output.setState('Parado');
    }

    start() {
        this.output.setState('Iniciando...');
    }

    increase(total) {
        this.progress++;
        this.output.increaseProgressBar((this.progress / total) * 800);
        this.output.setProgress(this.progress + '/' + total + ' (' + ((this.progress / total) * 100).toFixed(1) + '%)');
    }

    reset() {
        this.output.resetProgressBar();
        this.output.setState('Parado');
        this.progress = 0;
    }

    finish() {
        this.output.setState('Finalizado');
    }
}