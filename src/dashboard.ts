import type {MainRouter} from "./main-router.ts";

export class Dashboard extends HTMLElement {
    
    private readonly irrCalculatorButton: HTMLAnchorElement;
    private readonly mainRouter: MainRouter;
    
    constructor(mainRouter: MainRouter) {
        super();

        this.mainRouter = mainRouter;
        this.classList.add('dashboard');
        this.innerHTML = '<h2>This is the dashboard!</h2>';

        
        this.irrCalculatorButton = document.createElement('a');
        this.irrCalculatorButton.innerHTML = 'IRR Calculator';
        this.irrCalculatorButton.addEventListener('click', () => {
            this.mainRouter.viewIrrCalculator();
        })

        this.appendChild(this.irrCalculatorButton);
        
    }
}

customElements.define('dashboard-element', Dashboard);