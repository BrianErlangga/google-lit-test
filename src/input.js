import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class Input extends LitElement {
  static styles = css`
    label {
      display: block;
    }
    input {
      min-width: 200px;
      border-radius: 3px;
      border: 1px solid lightgray;
      padding: 10px;
    }
    span {
      font-size: 0.8rem;
      display: none;
    }
    :host([validation="invalid"]) span {
      display: block;
      color: red;
    }
    :host([validation="invalid"]) input {
      border-color: red;
    }

    :host([validation="valid"]) span {
      display: block;
      color: green;
    }
    :host([validation="valid"]) input {
      border-color: green;
    }
  `;

  static properties = {
    help: { type: String, reflect: true },
    validation: { type: String, reflect: true },
    label: { type: String },
    type: { type: String },
  };

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const input = this.shadowRoot.querySelector("input");
      if (input) {
        input.addEventListener("input", (event) => {
          event.stopPropagation();
          input.dispatchEvent(
            new CustomEvent("app-input", {
              bubbles: true,
              composed: true,
              detail: event.target.value,
            })
          );
        });
      }
    });
  }

  render() {
    return html`
      <label>${this.label}</label>
      <input type=${this.type} />
      <span>${this.help}</span>
    `;
  }
}

customElements.define("app-input", Input);
