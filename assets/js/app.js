const output = new Output();
const table = new Table(output);
const panel = new Panel(output);
const progressBar = new ProgressBar(output);
const scraper = new Scraper(progressBar, table, panel);
const input = new Input(scraper);