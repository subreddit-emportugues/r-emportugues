var sortingElement = 'Subs';

function selectColumn(column) {
    removeMark('subreddit-sc');
    removeMark('subs-sc');
    removeMark('created-sc');
    removeMark('nsfw-sc');
    removeMark('description-sc');
    sortingElement = column.innerHTML;
    $(column).html($(column).html() + ' ▾');
}

function removeMark(element) {
    $('#' + element).html($('#' + element).html().replace(' ▾', ''));
}