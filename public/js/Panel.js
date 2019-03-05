/**
 * Controla os botões do painel do crawler.
 */
class Panel {

    /**
     * Cria o controlador do painel.
     * @param {Output} output - O objeto que altera os botões.
     */
    constructor(output) {
        this.output = output;
    }

    /**
     * Exibe o botão de pausa e oculta todos os outros.
     */
    start() {
        this.output.displayButton('clear', false);
        this.output.displayButton('generate', false);
        this.output.displayButton('markdown', false);
        this.output.displayButton('pause', true);
    }

    /**
     * Altera o botão de pausa.
     * @param {Boolean} state - O estado do botão de pausa.
     */
    pause(state) {
        this.output.setPauseButtonState(state);
    }

    /**
     * Oculta o botão de pausa, limpar e copiar tabela markdown.
     */
    reset() {
        this.output.setPauseButtonState(false);
        this.output.displayButton('clear', false);
        this.output.displayButton('markdown', false);
    }

    /**
     * Oculta o botão de pausa e exibe todos os outros.
     */
    finish() {
        this.output.displayButton('clear', true);
        this.output.displayButton('generate', true);
        this.output.displayButton('markdown', true);
        this.output.displayButton('pause', false);
    }
}