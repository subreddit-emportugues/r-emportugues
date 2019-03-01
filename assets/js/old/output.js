var index = 1;

function copyMarkdown() {
    var txt = '';

    index = getColumnIndex();

    subreddits.sort(sortBy);

    subreddits.forEach(function(subreddit) {
        if ($('#subreddit-cb').is(":checked")) {
            txt += subreddit[0] + '|';
        }
        if ($('#subs-cb').is(":checked")) {
            txt += subreddit[1] + '|';
        }
        if ($('#description-cb').is(":checked")) {
            txt += subreddit[4];
        }
        txt += '\n';
    });
    navigator.clipboard.writeText(txt);
    $('#notification-bar').html('Markdown copiado!');
    $('#notification-bar').slideDown('fast');
    window.setTimeout(closeNotification, 3000);
}

function closeNotification() {
    $('#notification-bar').slideUp('fast');
}

function sortBy(a,b) {
    if (index == 1 || index == 2) {
        return b[index]-a[index];
    } else if (index == 0 || index == 4) {
        if (a[index].toLowerCase() < b[index].toLowerCase()) {
            return -1;
        }
        if (a[index].toLowerCase() > b[index].toLowerCase()) {
            return 1;
        }
        return 0;
    } else {
        if (a == true) {
            return 1;
        }
        return 0;
    }
}

function getColumnIndex() {
    switch(sortingElement) {
        case 'Subreddit': return 0;
            break;
        case 'Subs': return 1;
            break;
        case 'Criação': return 2;
            break;
        case 'NSFW': return 3;
            break;
        case 'Descrição': return 4;
            break;
    }
}