// login.jsx
import React from "react";
import './LoginComponent.module.css'
import { Redirect } from "react-router-dom";
import MyComponent from "./MyComponent"; // Make sure the path is correct

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
    };
  }

  toggleMode() {
    var newMode = this.state.mode === "login" ? "signup" : "login";
    this.setState({ mode: newMode });
  }

  render() {
    return (
      <div>
        <div
          className={`form-block-wrapper form-block-wrapper--is-${this.state.mode}`}
        />
        <section className={`form-block form-block--is-${this.state.mode}`}>
          <header className="form-block__header">
            <h1>{this.state.mode === "login" ? "Welcome back!" : "Sign up"}</h1>
            <div className="form-block__toggle-block">
              <span>
                {this.state.mode === "login" ? "Don't" : "Already"} have an
                account? Click here →
              </span>
              <input
                id="form-toggler"
                type="checkbox"
                onClick={this.toggleMode.bind(this)}
              />
              <label htmlFor="form-toggler" />
            </div>
          </header>
          <LoginForm mode={this.state.mode} onSubmit={this.props.onSubmit} />
          <MyComponent></MyComponent>
          
        </section>
      </div>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form-block__input-wrapper">
          <div className="form-group form-group--login">
            <Input
              id="username"
              label="Username"
              disabled={this.props.mode === "signup"}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              disabled={this.props.mode === "signup"}
            />
          </div>
          <div className="form-group form-group--signup">
            <Input
            
              id="fullname"
              label="Full name"
              disabled={this.props.mode === "login"}
            />
            <Input
              type="email"
              id="email"
              label="Email"
              disabled={this.props.mode === "login"}
            />
            <Input
              type="password"
              id="createpassword"
              label="Password"
              disabled={this.props.mode === "login"}
            />
            <Input
              type="password"
              id="repeatpassword"
              label="Repeat password"
              disabled={this.props.mode === "login"}
            />
          </div>
        </div>
        <button className="button button--primary full-width" type="submits">
          {this.props.mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>
    );
  }
}

const Input = ({ id, type, label, disabled }) => (
  <input
    className="form-group__input"
    type={type}
    id={id}
    placeholder={label}
    disabled={disabled}
  />
);

export default LoginComponent;
