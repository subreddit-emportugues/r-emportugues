class Scraper {

    constructor(progressBar, table, panel) {
        this.progressBar = progressBar;
        this.table = table;
        this.panel = panel;
        
        this.running = false;
        this.index = 0;
        this.total = 0;
        this.requests = [];
    }

    start() {
        if (!this.running) {
            this.reset();
            this.running = true;

            this.panel.start();
            this.progressBar.start();
    
            this.readSubredditList();
        }
    }

    readSubredditList() {
        let context = this;
        
        $.get(Input.getSubredditListFilename(), function (response) {
            let lines = response.split("\n");
            context.total = lines.length;

            lines.forEach(function(line) {
                alert(line);
                context.index++;
                //TODO: implement visit(line);
            });
        });
    }

    reset() {
        if (!this.running) {
            this.index = 0;
            this.total = 0;
            this.requests = [];

            this.progressBar.reset();
            this.table.reset();
            this.panel.reset();
        }
    }
}