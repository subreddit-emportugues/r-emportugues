class Input {

    constructor(scraper) {
        this.defineEvents();
    }

    defineEvents() {
        $("#generate-button").click(function () {
            scraper.start();
        });
    }

    static getSubredditListFilename() {
        return 'res/subreddits_mini.txt';
    }
}