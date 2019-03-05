/**
 * Proporciona a interação do usuário com a aplicação.
 */
class Input {

    /**
     * Cria o objeto de input.
     * @param {Scraper} scraper - Scraper com o qual o usuário interage por meio deste objeto.
     * @param {Table} table  - Tabela com a qual o usuário interage por meio deste objeto.
     * @param {Formatter} formatter - Formatador com a qual o usuário interage por meio deste objeto.
     */
    constructor(scraper, table, formatter) {
        this.scraper = scraper;
        this.table = table;
        this.formatter = formatter;

        /** @type {Column[]} */
        this.columns = [];

        scraper.awake();
        this.initializeColumns();
        this.defineEvents();
        table.awake(this.columns[1]);
    }

    /**
     * Define qual função deve ser chamada na ocorrência de um evento.
     */
    defineEvents() {
        const context = this;

        $("#generate-button").click(function () {
            context.scraper.start();
        });

        $("#pause-button").click(function () {
            context.scraper.pause();
        });

        $("#clear-button").click(function () {
            context.scraper.reset();
        });

        $("#markdown-button").click(function () {
            context.formatter.generateMarkdownTable();
        });

        this.columns.forEach(function(column) {
            $(column.element).click(function () {
                if (!context.scraper.running && context.scraper.started) {
                    context.table.removeColumnArrows(context.columns);
                    context.table.selectColumn(column);
                    context.table.updateTable(context.scraper);
                }
            });
        });
    }

    /**
     * Busca todas as colunas da tabela e, para cada uma, cria um objeto que a representa.
     */
    initializeColumns() {
        const columnElements = $('.column-name').toArray();
        for (let i = 0; i < columnElements.length; i++) {
            this.columns.push(new Column(columnElements[i], i));
        }
    }

    /**
     * Obtém o caminho para o arquivo que contém a lista de subreddits.
     * @return {String} O caminho para o arquivo da lista.
     */
    static getSubredditListFilename() {
        return 'res/subreddits_mini.txt';
    }

    /**
     * Obtém o contéudo html do elemento especificado.
     * @param {Element} element - O elemento.
     * @return {String} O contéudo html do elemento.
     */
    static getHtml(element) {
        return $(element).html();
    }

    /**
     * Verifica se a coluna especificada está marcada.
     * @param {String} columnName - O nome da coluna.
     * @return {Boolean} O valor do atributo checked da coluna.
     */
    static isColumnChecked(columnName) {
        return $(`#${columnName}-cb`).is(":checked");
    }
}