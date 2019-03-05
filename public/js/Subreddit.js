/**
 * Representa o conjunto de dados de um subreddit.
 */
class Subreddit {

    /**
     * Cria um objeto que representa um subreddit.
     * @param {String} name - O nome do subreddit.
     * @param {Number} subscribers - A quantidade de inscritos no subreddit.
     * @param {Number} created - A data de criação do subreddit no formato UNIX.
     * @param {Boolean} nsfw - Valor que indica se o subreddit não é recomendado para pessoas com menos de 18 anos.
     * @param {String} description - Descrição do subreddit.
     * @param {String} icon - URL do ícone do subreddit.
     */
    constructor(name, subscribers, created, nsfw, description, icon) {
        this.name = name;
        this.subscribers = subscribers;
        this.created = created;
        this.nsfw = nsfw;
        this.description = description;
        this.icon = icon;
    }

    /**
     * Retorna o nome do subreddit com a formatação especificada.
     * @param {String} format - A formatação do nome.
     * @return {String} O nome do subreddit.
     */
    getName(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return this.name;
                break;
        }
    }

    /**
     * Retorna a quantidade de inscritos no subreddit com a formatação especificada.
     * @param {String} format - A formatação da quantidade de inscritos.
     * @return {Number} A quantidade de inscritos.
     */
    getSubscribers(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return this.subscribers;
                break;
        }
    }

    /**
     * Retorna a data na qual o subreddit foi criado com a formatação especificada.
     * @param {String} format - A formatação da data de criação.
     * @return {String} A data de criação.
     */
    getCreated(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return Output.convertUnixTimestamp(this.created);
                break;
        }
    }

    /**
     * Retorna a data na qual o subreddit foi criado com a formatação especificada.
     * @param {String} format - A formatação da data de criação.
     * @return {String} A representação em português do valor da variável NSFW.
     */
    getNsfw(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return this.nsfw ? 'Sim' : 'Não';
                break;
        }
    }

    /**
     * Retorna a descrição do subreddit com a formatação especificada.
     * @param {String} format - A formatação da descrição.
     * @return {String} A descrição do subreddit.
     */
    getDescription(format) {
        switch (format) {
            case 'preview':
                if (this.description.length > 200) {
                    return this.description.substring(0, 200) + '...';
                } else if (this.description == '') {
                    return '- - -';
                } else {
                    return this.description;
                }
                break;
            case 'markdown':
                return this.description;
                break;
        }
    }

    /**
     * Retorna o ícone do subreddit com a formatação especificada.
     * @param {String} format - A formatação do ícone.
     * @return {String} O ícone do subreddit.
     */
    getIcon(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return this.icon == '' ? 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png' : this.icon
                break;
        }
    }
}