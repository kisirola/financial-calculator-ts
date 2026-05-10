import type { TimedCashFlow } from './calculator-type.ts'
import {Calculate} from "./calculate.ts";

export class NumericField {

    private readonly root: HTMLDivElement;
    private readonly field: HTMLInputElement;

    constructor(value: number, className: string) {
        this.root = document.createElement('div');
        this.root.classList.add(className);

        this.field = document.createElement('input');
        this.field.classList.add('numeric-input');
        this.field.type = 'text';
        this.field.inputMode = 'numeric';
        this.field.value = String(value);

        this.root.appendChild(this.field);
    }

    get div() {
        return this.root;
    }

    getValue(): number {
        return Number.parseFloat(this.field.value);
    }

    get value():number {
        return Number.parseFloat(this.field.value);
    }
}

class TimeField extends NumericField {
    constructor(value: number) {
        super(value, 'time');
    }
}

class AmountField extends NumericField {
    constructor(value: number) {
        super(value, 'amount');
    }
}

class CashFlowElement {

    private readonly timeField: TimeField;
    private readonly amountField: AmountField;

    constructor(time: number, amount: number) {
        this.timeField = new TimeField(time);
        this.amountField = new AmountField(amount);
    }

    get time(): number {
        return this.timeField.value;
    }

    get amount(): number {
        return this.amountField.value;
    }

    getTimeField() {
        return this.timeField
    }

    getAmountField() {
        return this.amountField
    }

    get value(): TimedCashFlow {
        return {
            time: this.time,
            amount: this.amount
        };
    }
}

class CashFlowElements {

    private readonly div: HTMLDivElement;
    private readonly list: CashFlowElement[]  = new Array<CashFlowElement>();
    constructor() {
        this.div = document.createElement('div');
        this.div.id = 'cash-flow-list';

        this.list = [
            new CashFlowElement(0, -1000),
            new CashFlowElement(1, 1100),
        ];

        this.list.forEach((element: CashFlowElement) => {
            this.div.appendChild(element.getTimeField().div);
            this.div.appendChild(element.getAmountField().div);
        });
    }

    get rootElement(): HTMLDivElement {
        return this.div;
    }

    appendElement(element: CashFlowElement) {

        this.list.push(element);
        this.div.appendChild(element.getTimeField().div);
        this.div.appendChild(element.getAmountField().div);
    }

    appendEmptyElement() {
        let cashFlowElement: CashFlowElement = new CashFlowElement(0,0);
        this.appendElement(cashFlowElement);
    }

    removeLastElement() {
        let element = this.list.pop();
        if (element) {
            this.div.removeChild(element.getTimeField().div);
            this.div.removeChild(element.getAmountField().div);
        }
    }

    get value(): TimedCashFlow[] {

        return this.list.map( (element: CashFlowElement) => element.value)
    }

    get count(): number {
        return this.list.length;
    }

}

export class IrrCalculator {

    private readonly root: HTMLDivElement;
    private readonly header: HTMLDivElement;
    private readonly footer: HTMLDivElement;
    private readonly buttons: HTMLDivElement;
    private readonly addButton: HTMLButtonElement;
    private readonly removeButton: HTMLButtonElement;

    private cashFlowElements: CashFlowElements;
    private readonly calculateButton: HTMLButtonElement;
    private readonly resultView: HTMLDivElement;

    constructor() {
        this.root = document.createElement('div');
        this.root.id = 'irr-calculator';
        this.root.classList.add('calculator');

        this.header = document.createElement('div');
        this.header.classList.add('header');
        this.header.innerHTML = '<div class="title">IRR Calculator</div>';

        this.buttons = document.createElement('div');
        this.header.classList.add('buttons');
        this.header.appendChild(this.buttons);

        this.root.appendChild(this.header);

        this.cashFlowElements = new CashFlowElements();
        this.root.appendChild(this.cashFlowElements.rootElement);

        this.addButton = document.createElement('button');
        this.addButton.classList.add('add');
        this.addButton.classList.add('square');
        this.addButton.innerHTML = '+';
        this.addButton.onclick = () => {
            this.cashFlowElements.appendEmptyElement();
        }

        this.buttons.appendChild(this.addButton);

        this.removeButton = document.createElement('button');
        this.removeButton.classList.add('remove');
        this.removeButton.classList.add('square');
        this.removeButton.innerHTML = '-';
        this.removeButton.onclick = () => {
            console.log(this.addButton.innerHTML + ' clicked');
            this.cashFlowElements.removeLastElement();
        }

        this.buttons.appendChild(this.removeButton);


        this.footer = document.createElement('div');
        this.footer.classList.add('footer');

        this.calculateButton = document.createElement('button');
        this.calculateButton.classList.add('calculate-button');
        this.calculateButton.innerHTML = 'Calculate';

        this.calculateButton.onclick = () => {

            this.calculate();
        }
        this.footer.appendChild(this.calculateButton);

        this.resultView = document.createElement('div');
        this.resultView.classList.add('calculate-result');
        this.resultView.innerHTML = 'IRR: Click Calculate to see result!';
        this.footer.appendChild(this.resultView);

        this.root.appendChild(this.footer);

        /*
        this.cashFlowElements.getList()
            .forEach((element: CashFlowElement) => {
                this.div.appendChild(element.getTimeField().divElement);
                this.div.appendChild(element.getAmountField().divElement);
        });

         */
    }

    get div() {
        return this.root;
    }

    validate(){

        if (this.cashFlowElements.count < 2) {

            this.resultView.innerHTML = 'Error: number of elements must be greater than 1';
            throw Error('number of elements must be greater than 1');
        }
        if (!Calculate.sum(this.cashFlowElements.value)) {
            throw Error('failed to calculate amount sum!');
        }
    }

    calculate() {
        try {
            this.validate();
            this.resultView.innerHTML = 'IRR:' + Calculate.irr(this.cashFlowElements.value, 0.001, 0.1, 2000);
        } catch (e) {
            console.error(e);
            this.resultView.classList.add('error');
            if (e instanceof Error) {
                this.resultView.innerHTML = `ERROR: ${e.message}`;
            } else {
                this.resultView.innerHTML = `ERROR: Failed to calculate IRR`;
            }
        }
    }

}