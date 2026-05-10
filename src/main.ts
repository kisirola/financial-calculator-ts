import './style.css';
import { IrrCalculator } from './calculator-ui';

class App {

    private readonly appDiv: HTMLDivElement;
    private readonly header: HTMLDivElement;
    private ui: IrrCalculator;

    constructor() {
        const el = document.querySelector<HTMLDivElement>('#app');
        if (!el) throw new Error('#app element not found');

        this.appDiv = el;


        this.header = document.createElement('div');
        this.header.innerHTML = `Header`;
        this.header.id = 'header';
        this.appDiv.appendChild(this.header);

        this.ui = new IrrCalculator();
        this.appDiv.appendChild(this.ui.div);
    }
}

function init() {
    new App();
}

init();