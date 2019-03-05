/**
 * Esta função é o ponto de começo da aplicação. 
 * Ela instancia todos os objetos que interagem durante sua execução.
 * @see Formatter
 * @see Input
 * @see Output
 * @see Panel
 * @see ProgressBar
 * @see Scraper
 * @see Table
 */
function main() {
    const output = new Output();

    const table = new Table(output);
    const panel = new Panel(output);
    const progressBar = new ProgressBar(output);

    const scraper = new Scraper(progressBar, table, panel);
    
    const formatter = new Formatter(table, scraper, output);
    const input = new Input(scraper, table, formatter);
}

main();