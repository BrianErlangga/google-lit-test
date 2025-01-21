import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class Card extends LitElement {
  static styles = css`
    .card {
      border-radius: 5px;
      border: 1px solid var(--line-color, darkgray);
      width: fit-content;
    }
    .card-header {
      padding: 5px;
      background-color: var(--element-bg-color, lightgray);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 1px solid var(--line-color, darkgray);
    }
    .card-body {
      padding: 5px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          <slot name="card-header">Card Header</slot>
        </div>

        <div class="card-body">
          <slot name="card-body">Card Body</slot>
        </div>
      </div>
    `;
  }
}

customElements.define("app-card", Card);
