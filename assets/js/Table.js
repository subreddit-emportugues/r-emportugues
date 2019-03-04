/*
Usa o Output.js para exibir os dados para o usuário.
Coluna selecionada serve para ordenar os dados da Scrapper.js usados em Formatter.js.
*/
Dados são usados por Formatter.js.
class Table {

    constructor(output) {
        this.output = output;
        this.sortingColumn;
    }

    awake(column) {
        this.sortingColumn = column;
    }

    start() {
        this.output.enableTableControls();
    }

    addSubreddit(subreddit, append) {
        this.output.prependRowtoTable(subreddit);
    }

    scroll(progress) {
        this.output.scrollTable(progress);
    }

    /*
    Chamada quando o usuário clica no nome da coluna.
    Caso a coluna recebida por parâmetro seja igual à coluna já selecionada,
    as funções sortingColumn.toggleOrder() e output.reverseColumnArrow() são chamadas.
    */
    selectColumn(column) {
        this.sortingColumn = column;
        this.output.addColumnArrow(column.element);
        this.sortingColumn.toggleOrder();
        if (column.isAscending()) {
            this.output.reverseColumnArrow(column.element, column.isAscending());
        }
    }

    updateTable(scraper) {
        const context = this;
        this.reset();
        this.sortSubreddits(scraper);
        scraper.subreddits.forEach(function(subreddit) {
            context.output.appendRowtoTable(subreddit);
        });
    }

    /*
    Verifica se a coluna selecionada é crescente ou decrescente.
    Troca a ordem da comparação que forma a função de ordenação.
    Chamada por Formatter.generateMarkdownTable().
    */    
    sortSubreddits() {
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

    removeColumnArrows(columns) {
        const context = this;
        columns.forEach(function(column) {
            context.output.removeColumnArrow(column.element);
        });
    }

    reset() {
        this.output.resetTable();
    }
}