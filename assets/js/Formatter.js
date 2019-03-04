class Formatter {

    constructor(table, scraper, output) {
        this.table = table;
        this.scraper = scraper;
        this.output = output;
    }

    generateMarkdownTable() {
        var headerItems = [
            { element: 'subreddit', text: 'Subreddit' },
            { element: 'subs', text: 'Subscrições' },
            { element: 'created', text: 'Criação' },
            { element: 'nsfw', text: 'NSFW' },
            { element: 'description', text: 'Descrição' }
          ];
        let header = [];
        
        headerItems.forEach(function(item) {
            if (Input.isColumnChecked(item.element)) {
                header.push(item.text);
            }
        });

        let markdownTable = header.join('|') + '\n' + ':--|'.repeat(header.length) + '\n';

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
}
