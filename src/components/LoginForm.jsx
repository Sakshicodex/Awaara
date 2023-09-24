import React, { useState } from "react";
import "./MyComponent.css";

function LoginForm({ mode, onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      // Handle login
      onSubmit({ username, password });
    } else {
      // Handle signup
      onSubmit({ fullname, email, createPassword, repeatPassword });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {mode === "login" ? (
        <div className="form-block__input-wrapper">
          <div className="form-group form-group--login">
            <Input
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="form-block__input-wrapper">
          <div className="form-group form-group--signup">
            <Input
              id="fullname"
              label="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <Input
              type="email"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              id="createpassword"
              label="Password"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
            />
            <Input
              type="password"
              id="repeatpassword"
              label="Repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
      )}

      <button className="button button--primary full-width" type="submit">
        {mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}

const Input = ({ id, type, label, value, onChange }) => (
  <input
    className="form-group__input"
    type={type}
    id={id}
    placeholder={label}
    value={value}
    onChange={onChange}
  />
);

export default LoginForm;
