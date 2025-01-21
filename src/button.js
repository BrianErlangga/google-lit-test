import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class Button extends LitElement {
  static styles = css`
    .btn {
      background-color: #0070f3;
      color: white;
      border: none;
      border-radius: 7px;
      padding: 0.5rem 2rem;
      margin-top: 10px;
      font-size: 1.5rem;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
    }
    .btn:hover {
      background-color: #1d80f0;
    }
    .btn:disabled {
      background-color: #6aa8f0;
    }
    .fading {
      animation: fading 0.5s infinite;
    }

    @keyframes fading {
      0% {
        color: #6aa8f0;
      }
      50% {
        color: white;
      }
      100% {
        color: #6aa8f0;
      }
    }
  `;

  static properties = {
    inprogress: { type: Boolean },
  };

  constructor() {
    super();
    this.inprogress = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const appBtn = this.shadowRoot.querySelector("button");
      if (appBtn) {
        console.log(appBtn);
        appBtn.addEventListener("click", (event) => {
          console.log("clciekd");
          event.stopPropagation();
          this.dispatchEvent(
            new CustomEvent("click-app-button", {
              bubbles: true,
              composed: true,
            })
          );
        });
      }
    });
  }

  render() {
    return html`
      <button
        class="btn ${this.inprogress ? "fading" : ""}"
        ?disabled=${this.inprogress}
      >
        ${this.inprogress ? "Loading..." : html`<slot></slot>`}
      </button>
    `;
  }
}

customElements.define("app-button", Button);
