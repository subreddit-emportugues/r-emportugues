class Table {

    constructor(output) {
        this.output = output;
        this.sortingColumn;
    }

    awake(column) {
        this.sortingColumn = column;
    }

    addSubreddit(subreddit) {
        this.output.insertRowIntoTable(
            subreddit.getIcon('preview'),
            subreddit.getName('preview'),
            subreddit.getSubscribers('preview'),
            subreddit.getCreated('preview'),
            subreddit.getNsfw('preview'),
            subreddit.getDescription('preview')
            );
    }

    scroll(progress) {
        this.output.scrollTable(progress);
    }

    selectColumn(column) {
        this.sortingColumn = column;
        this.output.addColumnArrow(column.element);
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