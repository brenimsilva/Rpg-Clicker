export default class StatComponentList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const statName = this.getAttribute('statList');
        this.shadowRoot.innerHTML = `
        <div style="display">
        </div>
      `;
    }
}
customElements.define("stat-component-list", StatComponentList);
