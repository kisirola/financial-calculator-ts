import './style.css';
import type {MainRouter} from "./main-router.ts";
import { IrrCalculator } from './calculator-irr';
import { Dashboard } from './dashboard';

class App implements MainRouter {

    private readonly root: HTMLDivElement;
    private readonly header: HTMLDivElement;
    private readonly homeButton: HTMLButtonElement
    private readonly darkModeButton: HTMLButtonElement
    private readonly center: HTMLDivElement;
    private irrCalculator: IrrCalculator;
    private readonly dashboard: Dashboard;

    constructor() {
        const el = document.querySelector<HTMLDivElement>('#app');
        if (!el) throw new Error('#app element not found');

        this.root = el;
        this.header = document.createElement('div');
        this.header.id = 'header';

        this.homeButton = document.createElement('button');
        this.homeButton.classList.add('home-button');
        this.homeButton.onclick = () => {
            this.viewDashboard();
        }

        this.darkModeButton = document.createElement('button');
        this.darkModeButton.classList.add('dark-mode-button');
        this.darkModeButton.onclick = () => {
            console.log('dark mode');
        }



        this.header.appendChild(this.homeButton);
        this.header.appendChild(this.darkModeButton);
        this.root.appendChild(this.header);

        this.center = document.createElement('div');
        this.center.id = 'center';
        this.root.appendChild(this.center);

        this.irrCalculator = new IrrCalculator();
        this.dashboard = new Dashboard(this);

        // start on dashboard

        this.center.appendChild(this.dashboard);
    }

    viewDashboard() {
        this.center.innerHTML = '';
        this.center.appendChild(this.dashboard);
    }

    viewIrrCalculator() {
        this.center.innerHTML = '';
        this.center.appendChild(this.irrCalculator.div);
    }
}

function init() {
    new App();
}

init();