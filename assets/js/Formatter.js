class Formatter {

    constructor(table, scraper, output) {
        this.table = table;
        this.scraper = scraper;
        this.output = output;
    }

    generateMarkdownTable() {
<<<<<<< HEAD
        var headingItems = [
            { element: 'subreddit', text: 'Name' },
            { element: 'subs', text: 'Subscribers' },
            { element: 'created', text: 'Created' },
            { element: 'nsfw', text: 'NSFW' },
            { element: 'description', text: 'Description' }
          ];
        let heading = [];
        
        headingItems.forEach(function(item) {
            if (Input.isColumnChecked(item.element)) {
                heading.push(item.text);
            }
        });

        let markdownTable = heading.join('|') + '\n' + ':--|'.repeat(heading.length) + '\n';
=======
        let markdownTable = 'name|subscribers|created|nsfw|description' + '\n' + ':--|:--|:--|:--|:--' + '\n';
>>>>>>> 4e3abf366f3b4768b9eb7bf8736ba358e3323263

        this.sortSubreddits();

        this.scraper.subreddits.forEach(function(subreddit) {
            let line = [];
            if (Input.isColumnChecked('subreddit')) {
                line.push(subreddit.getName('markdown'));
                heading[0] = 'name';
            }
            if (Input.isColumnChecked('subs')) {
                line.push(subreddit.getSubscribers('markdown'));
                heading[0] = 'name';
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
            let ascending = context.table.sortingColumn.isAscending();

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
}
