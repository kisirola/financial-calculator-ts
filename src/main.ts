import './style.css';
import type {MainRouter} from "./main-router.ts";
import { IrrCalculator } from './calculator-irr';
import { Dashboard } from './dashboard';

class App implements MainRouter {

    private readonly appDiv: HTMLDivElement;
    private readonly header: HTMLDivElement;
    private readonly homeButton: HTMLButtonElement
    private irrCalculator: IrrCalculator;
    private dashboard: Dashboard;

    constructor() {
        const el = document.querySelector<HTMLDivElement>('#app');
        if (!el) throw new Error('#app element not found');

        this.appDiv = el;


        this.header = document.createElement('div');
        this.homeButton = document.createElement('button');
        this.homeButton.classList.add('home-button');
        this.homeButton.onclick = () => {
            this.viewDashboard();
        }

        this.header.id = 'header';
        this.header.appendChild(this.homeButton);
        this.appDiv.appendChild(this.header);

        this.irrCalculator = new IrrCalculator();

        this.dashboard = new Dashboard(this);

        // start on dashboard
        this.appDiv.appendChild(this.dashboard);
    }

    viewDashboard() {
        this.appDiv.replaceChild(this.dashboard, this.irrCalculator.div);
    }

    viewIrrCalculator() {
        this.appDiv.replaceChild(this.irrCalculator.div, this.dashboard);
    }
}

function init() {
    new App();
}

init();