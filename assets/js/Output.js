class Output {

    setState(state) {
        this.setHtml('#status', `Estado: <b>${state}</b>`)
    }

    resetTable() {
        this.setHtml('#table tbody', '')
    }

    resetProgressBar() {
        this.setCss('#progress-bar', 'width', 0);
    }

    displayButton(element, show) {
        if (show) {
            this.setCss(`#${element}-button`, 'display', 'block');
        } else {
            this.setCss(`#${element}-button`, 'display', 'none');
        }
    }

    static convertUnixTimestamp(unixTimestamp){
        var date = new Date(unixTimestamp * 1000);
        var year = date.getFullYear();
        var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
        var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var time = day + '/' + month + '/' + year;
        return time;
    }

    insertRowIntoTable(icon, name, subscribers, created, nsfw, description) {
        $('#table tbody').prepend(`
            <tr>
            <td><img src="${icon}" width="20" height="20"></td>
            <td>${name}</td>
            <td>${subscribers}</td>
            <td>${created}</td>
            <td>${nsfw}</td>
            <td>${description}</td>
            </tr>
        `);
    }

    scrollTable(progress) {
        if (progress % 2 == 0) {
            this.setCss('table tbody tr:nth-child(even)', 'background-color', '#dddddd');
            this.setCss('table tbody tr:nth-child(odd)', 'background-color', '#f8f8f8');
        } else {
            this.setCss('table tbody tr:nth-child(even)', 'background-color', '#f8f8f8');
            this.setCss('table tbody tr:nth-child(odd)', 'background-color', '#dddddd');
        }
    }

    notify(message) {
        this.setHtml('#notification-bar', message);
        $('#notification-bar').slideDown('fast');
        window.setTimeout(this.closeNotification, 3000);
    }

    closeNotification() {
        $('#notification-bar').slideUp('fast');
    }

    increaseProgressBar(width) {
        this.setCss('#progress-bar', 'width', width);
    }

    setProgress(progress) {
        this.setHtml("#status", `Progresso: <b>${progress}</b>`);
    }

    setPauseButtonState(state) {
        if (state) {
            this.setHtml('#pause-button', 'Continuar');
        } else {
            this.setHtml('#pause-button', 'Pausar');
        }
    }

    removeColumnArrow(column) {
        this.setHtml(column, Input.getHtml(column).replace(/▾|▴/g, ''));
    }

    addColumnArrow(column) {
        this.setHtml(column, Input.getHtml(column) + ' ▾');
    }

    reverseColumnArrow(column, ascending) {
        this.removeColumnArrow(column);

        if (ascending) {
            this.setHtml(column, Input.getHtml(column) + ' ▴');
        } else {
            this.setHtml(column, Input.getHtml(column) + ' ▾');
        }
    }

    setCss(element, attribute, value) {
        $(element).css(attribute, value);
    }

    setHtml(element, value) {
        $(element).html(value);
    }
}