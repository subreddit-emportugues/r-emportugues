class Scraper {

    constructor(progressBar, table, panel) {
        this.progressBar = progressBar;
        this.table = table;
        this.panel = panel;
        
        this.started = false;
        this.running = false;
        this.paused = false;
        this.index = 0;
        this.total = 0;
        this.delay = 1000; // ms
        this.requests = [];
        this.subreddits = [];
    }

    awake() {
        this.progressBar.awake();
    }

    start() {
        if (!this.running) {
            this.reset();
            this.running = true;
            this.started = true;

            this.panel.start();
            this.progressBar.start();
    
            this.readSubredditList();
        }
    }

    readSubredditList() {
        const context = this;
        
        $.get(Input.getSubredditListFilename(), function (response) {
            const subredditNames = response.split("\n");
            context.total = subredditNames.length;

            subredditNames.forEach(function(subredditName) {
                context.index++;
                context.makeRequest(subredditName);
            });
        });
    }

    makeRequest(subredditName) {
        this.requests.push(new Request(subredditName, this.delay * this.index, this));
    }

    addSubreddit(subreddit) {
        this.subreddits.push(subreddit);
    }

    updateViews(subreddit) {
        this.table.addSubreddit(subreddit);
        this.table.scroll(this.progressBar.progress);
        this.progressBar.increase(this.total);

        if (this.progressBar.progress == this.total) {
            this.finish();
        }
    }

    pause() {
        if (this.running) {
            this.paused = !this.paused;
    
            for (let i = this.progressBar.progress; i < this.requests.length; i++) {
                if (this.paused) {
                    this.requests[i].pause();
                    
                } else {
                    this.requests[i].resume();
                }
                this.panel.pause(this.paused);
            }
        }
    }

    reset() {
        if (!this.running) {
            this.index = 0;
            this.total = 0;
            this.paused = false;
            this.requests = [];
            this.subreddits = [];

            this.progressBar.reset();
            this.table.reset();
            this.panel.reset();
        }
    }

    finish() {
        this.running = false;
        this.progressBar.finish();
        this.panel.finish();
        this.table.updateTable(this);
        this.table.start();
    }
}