/**
 * Controla a tabela.
 */
class Table {

    /**
     * Cria o controlador da tabela.
     * @param {Output} output - O objeto que exibe as alterações da tabela.
     */
    constructor(output) {
        this.output = output;
        /** @type {Column} */
        this.sortingColumn;
    }

    /**
     * Acorda a tabela.
     * @param {Column} column - A coluna selecionada.
     */
    awake(column) {
        this.sortingColumn = column;
    }

    /**
     * Ativa os controles da tabela.
     */
    start() {
        this.output.enableTableControls();
    }

    /**
     * Adiciona um subreddit à tabela.
     * @param {Subreddit} subreddit - O subreddit adicionado à tabela.
     */
    addSubreddit(subreddit) {
        this.output.prependRowtoTable(subreddit);
    }

    /**
     * Cria o efeito de rolagem da tabela.
     * @param {ProgressBar} progress - O Progresso do scraper.
     */
    scroll(progress) {
        this.output.scrollTable(progress);
    }

    /**
     * Seleciona uma coluna.
     * Se a coluna já estiver selecionada, inverte a ordenação.
     * @param {Column} column - A coluna selecionada.
     */
    selectColumn(column) {
        if (this.sortingColumn == column) {
            this.sortingColumn.toggleOrder();
        }
        this.sortingColumn = column;
        this.output.addColumnArrow(column.element);
        
        if (column.isAscending()) {
            this.output.reverseColumnArrow(column.element, column.isAscending());
        }
    }

    /**
     * Reordena as linhas da tabela.
     * @param {Scraper} scraper - O scraper usado para obter a lista de subreddits.
     */
    updateTable(scraper) {
        const context = this;
        this.reset();
        this.sortSubreddits(scraper);
        scraper.subreddits.forEach(function(subreddit) {
            context.output.appendRowtoTable(subreddit);
        });
    }

    /**
     * Ordena a lista de subreddits do scraper de acordo com o controlador da tabela.
     * @param {Scraper} scraper - O scraper usado para obter a lista de subreddits.
     */
    sortSubreddits(scraper) {
        const context = this;

        scraper.subreddits.sort(function(r1, r2) {
            let index = context.sortingColumn.index;
            let ascending = context.sortingColumn.isAscending();

            if (ascending) {
                [r1, r2] = [r2, r1];
            }
    
            switch(index) {
                case 0:
                    return r2.name.localeCompare(r1.name);
                    break;
                case 1:
                    return r2.subscribers - r1.subscribers;
                    break;
                case 2:
                    return r2.created - r1.created;
                    break;
                case 3:
                    return r1.nsfw ? -1 : 1;
                    break;
                case 4:
                    return r2.description.localeCompare(r1.description);
                    break;
            }
        });
    }

    /**
     * Remove os indicadores de ordenação de todas as colunas da tabela.
     * @param {Column} columns - As colunas da tabela.
     */
    removeColumnArrows(columns) {
        const context = this;
        columns.forEach(function(column) {
            context.output.removeColumnArrow(column.element);
        });
    }

    /**
     * Zera a tabela.
     */
    reset() {
        this.output.resetTable();
    }
}