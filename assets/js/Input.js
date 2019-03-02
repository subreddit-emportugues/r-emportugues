class Input {

    constructor(scraper, table, formatter) {
        this.scraper = scraper;
        this.table = table;
        this.formatter = formatter;
        this.columns = [];
        scraper.awake();
        this.initializeColumns();
        this.defineEvents();
        table.awake(this.columns[1]);
    }

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
                context.table.removeColumnArrows(context.columns);
                context.table.selectColumn(column);
            });
        });
    }

    initializeColumns() {
        const columnElements = $('.column-name').toArray();
        for (let i = 0; i < columnElements.length; i++) {
            this.columns.push(new Column(columnElements[i], i));
        }
    }

    static getSubredditListFilename() {
        return 'res/subreddits_mini.txt';
    }

    static getHtml(element) {
        return $(element).html();
    }

    static isColumnChecked(columnName) {
        return $(`#${columnName}-cb`).is(":checked");
    }
}