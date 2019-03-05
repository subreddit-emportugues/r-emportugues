/**
 * Controla uma coluna da tabela.
 */
class Column {

    /**
     * Cria o controlador da coluna.
     * @param {Element} element - O elemento da coluna.
     * @param {Number} index - A posição da coluna na tabela.
     */
    constructor(element, index) {
        this.element = element;
        this.index = index;
        this.ascending = false;
    }

    /**
     * Inverte a variável booleana que indica se a coluna tem seu conteúdo em ordem crescente ou decrescente.
     */
    toggleOrder() {
        this.ascending = !this.ascending;
    }

    /**
     * Retorna o valor booleano que indica se a coluna tem seu conteúdo em ordem crescente ou decrescente.
     * @return {boolean} O valor da variável ascending.
     */
    isAscending() {
        return this.ascending;
    }
}