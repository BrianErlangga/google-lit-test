import "./input.js";
import "./button.js";
import "./card.js";
import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BasicForm extends LitElement {
  static styles = css`
    .btn {
      display: block;
    }
  `;

  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      passwordRepeat: null,
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      if (true) {
        const appInputs = this.shadowRoot.querySelectorAll("app-input");
        const button = this.shadowRoot.querySelector("app-button");
        const [usernameInput, emailInput, passwordInput, passwordRepeatInput] =
          appInputs;
        usernameInput.addEventListener("app-input", (event) => {
          this.state.username = event.detail;
          usernameInput.validation = "none";
        });
        emailInput.addEventListener("app-input", (event) => {
          this.state.email = event.detail;
          emailInput.validation = "none";
        });
        passwordInput.addEventListener("app-input", (event) => {
          this.state.password = event.detail;
          if (this.state.password != this.state.passwordRepeat) {
            passwordRepeatInput.help = "Password Misatch";
            passwordRepeatInput.validation = "invalid";
          } else {
            passwordRepeatInput.help = "Password are matching";
            passwordRepeatInput.validation = "valid";
          }
        });
        passwordRepeatInput.addEventListener("app-input", (event) => {
          this.state.passwordRepeat = event.detail;
          if (this.state.password != this.state.passwordRepeat) {
            passwordRepeatInput.help = "Password Misatch";
            passwordRepeatInput.validation = "invalid";
          } else {
            passwordRepeatInput.help = "Password are matching";
            passwordRepeatInput.validation = "valid";
          }
        });
        this.addEventListener("click-app-button", (event) => {
          button.inprogress = true;
          setTimeout(() => {
            //do fetch here to backend
            usernameInput.validation = "invalid";
            usernameInput.help = "Name must be unique";
            emailInput.validation = "invalid";
            emailInput.help = "Cannot be null";
            button.inprogress = false;
          }, 2000);
        });
      }
    });
  }

  render() {
    return html`
      <app-card>
        <h3 slot="card-header">Register</h3>
        <app-input
          id="usernameInput"
          slot="card-body"
          label="Username"
        ></app-input>
        <app-input slot="card-body" label="Email"></app-input>
        <app-input
          slot="card-body"
          label="Password"
          type="password"
        ></app-input>
        <app-input
          slot="card-body"
          label="Password Repeat"
          type="password"
        ></app-input>

        <app-button class="btn" slot="card-body">Register</app-button>
      </app-card>
    `;
  }
}
customElements.define("app-form", BasicForm);
