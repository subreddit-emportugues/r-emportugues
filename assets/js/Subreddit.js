class Subreddit {

    constructor(name, subscribers, created, nsfw, description, icon) {
        this.name = name;
        this.subscribers = subscribers;
        this.created = created;
        this.nsfw = nsfw;
        this.description = description;
        this.icon = icon;
    }

    getName(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return this.name;
                break;
        }
    }

    getSubscribers(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return this.subscribers;
                break;
        }
    }

    getCreated(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return Output.convertUnixTimestamp(this.created);
                break;
        }
    }

    getNsfw(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return this.nsfw ? 'Sim' : 'Não';
                break;
        }
    }

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

    getIcon(format) {
        switch (format) {
            case 'preview':
            case 'markdown':
                return this.icon == '' ? 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png' : this.icon
                break;
        }
    }
}