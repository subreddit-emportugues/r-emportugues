class Formatter {

    constructor(table, scraper, output) {
        this.table = table;
        this.scraper = scraper;
        this.output = output;
    }

    generateMarkdownTable() {
        let markdownTable = '';

        this.sortSubreddits();

        this.scraper.subreddits.forEach(function(subreddit) {
            let line = [];
            if (Input.isColumnChecked('subreddit')) {
                line.push(subreddit.getName('markdown'));
            }
            if (Input.isColumnChecked('subs')) {
                line.push(subreddit.getSubscribers('markdown'));
            }
            if (Input.isColumnChecked('created')) {
                line.push(subreddit.getCreated('markdown'));
            }
            if (Input.isColumnChecked('nsfw')) {
                line.push(subreddit.getNsfw('markdown'));
            }
            if (Input.isColumnChecked('description')) {
                line.push(subreddit.getDescription('markdown'));
            }
            markdownTable += line.join('|') + '\n';
        });

        navigator.clipboard.writeText(markdownTable);

        this.output.notify('Markdown copiado!');
    }

    sortSubreddits() {
        const context = this;

        this.scraper.subreddits.sort(function(r1, r2) {
            let index = context.table.sortingColumn.index;
    
            switch(index) {
                case 0:
                    return r1.name.localeCompare(r2.name);
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
                    return r1.description.localeCompare(r2.description);
                    break;
            }
        });
    }
}