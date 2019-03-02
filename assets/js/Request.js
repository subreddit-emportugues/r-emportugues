class Request {
    constructor(subredditName, delay, scraper) {
        this.timerId;
        this.start;
        this.subredditName = subredditName;
        this.remaining = delay;
        this.scraper = scraper;
        this.callback = this.getCallback();

        this.resume();
    }

    getCallback() {
        const context = this;

        return function() {
            const dataPost = {
                "name": context.subredditName.replace(/(\r\n|\n|\r)/gm, "")
            };
            const dataString = JSON.stringify(dataPost);
            
            $.ajax({
                url: 'app/controllers/visitor.php',
                data: {
                    subreddit: dataString
                },
                type: 'POST',
                success: function(response) {
                    const json = jQuery.parseJSON(response);

                    const subreddit = new Subreddit(
                        json.name,
                        json.subscribers,
                        json.created,
                        json.nsfw,
                        json.description,
                        json.icon
                    );

                    context.scraper.addSubreddit(subreddit);
                    context.scraper.updateViews(subreddit);
                }
            });
        };
    }

    pause() {
        window.clearTimeout(this.timerId);
        this.remaining -= new Date() - this.start;
    }

    resume() {
        this.start = new Date();
        window.clearTimeout(this.timerId);
        this.timerId = window.setTimeout(this.callback, this.remaining);
    }
}