/**
 * Controla a barra de progresso do crawler.
 */
class ProgressBar {

    /**
     * Cria o controlador da barra de progresso.
     * @param {Output} output - O objeto que altera a barra de progresso.
     */
    constructor(output) {
        this.progress = 0;
        this.output = output;
    }

    /**
     * Acorda a barra de progresso.
     */
    awake() {
        this.output.setState('Parado');
    }

    /**
     * Inicia a barra de progresso.
     */
    start() {
        this.output.setState('Iniciando...');
    }

    /**
     * Aumenta a barra de progresso e o indicador textual de progresso.
     * @param {Number} total - A quantidade de subreddits analisados.
     */
    increase(total) {
        this.progress++;
        this.output.increaseProgressBar((this.progress / total) * 800);
        this.output.setProgress(this.progress + '/' + total + ' (' + ((this.progress / total) * 100).toFixed(1) + '%)');
    }

    /**
     * Zera o progresso e a barra de progresso.
     */
    reset() {
        this.output.resetProgressBar();
        this.output.setState('Parado');
        this.progress = 0;
    }

    /**
     * Altera o texto que indica o estado do crawler para finalizado.
     */
    finish() {
        this.output.setState('Finalizado');
    }
}