/**
 * Controla o scraper.
 */
class Scraper {

    /**
     * Cria um scraper.
     * @param {ProgressBar} progressBar - A barra de progresso que informa o progresso do scraper.
     * @param {Table} table - A tabela que é preenchida com os dados obtidos pelo scraper.
     * @param {Panel} panel - O painel que controla o scraper.
     */
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

        /** @type {Requester[]} */
        this.requesters = [];
        /** @type {Subreddit[]} */
        this.subreddits = [];
    }

    /**
     * Acorda a barra de progresso.
     */
    awake() {
        this.progressBar.awake();
    }

    /**
     * Se o scraper não estiver rodando, reinicia o scraper, o painel e a barra de progresso.
     */
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

    /**
     * Lê a lista de subreddits e itera por cada um deles.
     */
    readSubredditList() {
        const context = this;
        
        $.get(Input.getSubredditListFilename(), function (response) {
            const subredditNames = response.split("\n");
            context.total = subredditNames.length;

            subredditNames.forEach(function(subredditName) {
                context.index++;
                context.makeRequester(subredditName);
            });
        });
    }

    /**
     * Cria um requester para o subreddit especificado.
     * @param {Subreddit} subredditName - O nome do reddit.
     */
    makeRequester(subredditName) {
        this.requesters.push(new Requester(subredditName, this.delay * this.index, this));
    }

    /**
     * Adiciona o subreddit especificado à lista.
     * @param {Subreddit} subreddit - O subreddit que é adicionado à lista.
     */
    addSubreddit(subreddit) {
        this.subreddits.push(subreddit);
    }

    /**
     * Adiciona o subreddit especificado à tabela e aumenta o progresso da barra de progresso.
     * @param {Subreddit} subreddit - O subreddit que é adicionado à tabela.
     */
    updateViews(subreddit) {
        this.table.addSubreddit(subreddit);
        this.table.scroll(this.progressBar.progress);
        this.progressBar.increase(this.total);

        if (this.progressBar.progress == this.total) {
            this.finish();
        }
    }

    /**
     * Se o scraper estiver rodando, interrompe sua execução.
     */
    pause() {
        if (this.running) {
            this.paused = !this.paused;
    
            for (let i = this.progressBar.progress; i < this.requesters.length; i++) {
                if (this.paused) {
                    this.requesters[i].pause();
                    
                } else {
                    this.requesters[i].resume();
                }
                this.panel.pause(this.paused);
            }
        }
    }

    /**
     * Zera todas as variáveis do scraper.
     */
    reset() {
        if (!this.running) {
            this.index = 0;
            this.total = 0;
            this.paused = false;
            this.requesters = [];
            this.subreddits = [];

            this.progressBar.reset();
            this.table.reset();
            this.panel.reset();
        }
    }

    /**
     * Finaliza o scraper.
     */
    finish() {
        this.running = false;
        this.progressBar.finish();
        this.panel.finish();
        this.table.updateTable(this);
        this.table.start();
    }
}