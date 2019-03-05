/**
 * Delega um pedido ao backend.
 */
class Requester {

    /**
     * Cria um requester.
     * @param {String} subredditName - O nome do subreddit que será enviado para o backend.
     * @param {Number} delay - A quantidade de tempo, em ms, que levará até que o backend receba o nome do subreddit.
     * @param {Scraper} scraper - O scraper que receberá os dados do backend.
     */
    constructor(subredditName, delay, scraper) {
        this.timerId;
        this.start;
        this.subredditName = subredditName;
        this.remaining = delay;
        this.scraper = scraper;
        this.callback = this.getCallback();

        this.resume();
    }

    /**
     * Transfere o nome de um subreddit para o backend e recupera os dados do subreddit.
     * @return {Function} Uma callback function.
     */
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

    /**
     * Interrompe o contador do delay do pedido.
     */
    pause() {
        window.clearTimeout(this.timerId);
        this.remaining -= new Date() - this.start;
    }

    /**
     * Continua o contador do delay do pedido.
     */
    resume() {
        this.start = new Date();
        window.clearTimeout(this.timerId);
        this.timerId = window.setTimeout(this.callback, this.remaining);
    }
}