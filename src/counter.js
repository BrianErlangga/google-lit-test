import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class Counter extends LitElement {
  static styles = css``;

  static properties = {
    count: { type: Number },
    until: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
    this.until = 5;
  }

  connectedCallback() {
    super.connectedCallback();
    this._startCounting();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.interval);
  }

  _startCounting() {
    if (this.until > 0) {
      this.interval = setInterval(() => {
        if (this.count < this.until) {
          this.count++;
        } else {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  render() {
    return html` <span>${this.count}</span> `;
  }
}

customElements.define("app-counter", Counter);
