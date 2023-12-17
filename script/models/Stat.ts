export default class StatComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
        const statName = this.getAttribute('stat-name');
        const statValue = this.getAttribute('stat-value');
        const showArrow = this.hasAttribute('show-arrow');
        this.shadowRoot!.innerHTML = `
        <div>
            <span style="color: rgb(248,185,66)">${statName} </span>
            <span id="${statName}">${statValue}</span>
            <img src="Images/arrow-right-pixel-white.png" class="arrow" id="arrow-${statName}" style="display: ${showArrow ? 'block' : 'hidden'}"/>
        </div>
      `;
    }
}

customElements.define("stat-component", StatComponent);
