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

    setCss(element, attribute, value) {
        $(element).css(attribute, value);
    }

    setHtml(element, value) {
        $(element).html(value);
    }
}