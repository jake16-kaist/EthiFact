const color_red = "rgb(252,217,217)";
const color_grey = "rgb(240,240,240)";
const color_green = "rgb(230, 252, 232)";

const template = `
    <template id="highlightRed">
    <span class="highlight" style="background-color: ${color_red}; display: inline"></span>
    </template>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  .text-marker {
    fill: white;
  }
  .text-marker:hover {
    fill: ${color_red};
  }
`;

class Highlighter extends HTMLElement {

    get styleElement() {
        return this.shadowRoot.querySelector("style");
    }

    get highlightRed() {
        return this.shadowRoot.getElementById("highlightRed");
    }

    constructor() {
        super();
        this.render();
    }

    render() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML += template;
        this.highlightSelection();
    }

    highlightSelection() {
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
            this.highlightRange(userSelection.getRangeAt(i));
        }
        window.getSelection().empty();
    }

    highlightRange(range) {
        const clone =
            this.highlightRed.cloneNode(true).content.firstElementChild;
        clone.appendChild(range.extractContents());
        range.insertNode(clone);
    }
}

window.customElements.define("ethifact-highlighter", Highlighter);