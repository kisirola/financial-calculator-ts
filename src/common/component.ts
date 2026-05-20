export class AddRemoveButtons extends HTMLElement {

    onAddButtonClicked?: () => void;
    onRemoveButtonClicked?: () => void;

    constructor() {
        super();
    }

    private render() {
        console.log('render');
        this.classList.add('input-buttons');
        this.innerHTML = '<button class="add circle">+</button><button class="remove circle">-</button>';

        let addButton = this.querySelector('.add') as HTMLButtonElement;
        let removeButton = this.querySelector('.remove') as HTMLButtonElement;

        addButton.onclick = () => {
            if (this.onAddButtonClicked)
                this.onAddButtonClicked();

        }
        removeButton.onclick = () => {
            if (this.onRemoveButtonClicked)
                this.onRemoveButtonClicked();
        }

    }

    connectedCallback() {
        console.log('connected');
        this.render();
    }

    disconnectedCallback() {
        console.log('disconnected');
    }
}

customElements.define("add-remove-buttons", AddRemoveButtons);