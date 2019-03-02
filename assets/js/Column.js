class Column {

    constructor(element, index) {
        this.element = element;
        this.index = index;
        this.ascending = false;
    }

    toggleOrder() {
        this.ascending = !this.ascending;
    }

    isAscending() {
        return this.ascending;
    }
}