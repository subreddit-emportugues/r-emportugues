//Representa cada uma das colunas da tabela.
class Column {

    constructor(element, index) {
        this.element = element;
        this.index = index;
        this.ascending = false;
    }

    //Inverte a vari�vel booleana que diz se a coluna est� crescente ou decrescente.
    toggleOrder() {
        this.ascending = !this.ascending;
    }

    isAscending() {
        return this.ascending;
    }
}