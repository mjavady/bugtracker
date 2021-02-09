import React from "react";
import validate from "./validateInfo";
import useForm from "../../hooks/useForm";
import { Icon } from "react-materialize";

function Login() {
  const {
    handleChange,
    values,
    handleLoginSubmit,
    errors,
    valid,
    resetButton,
  } = useForm(validate);

  return (
    <div>
      <p className="card-title center">
        <h4>Login</h4>
      </p>
      <form onSubmit={handleLoginSubmit}>
        <div className="input-field">
          <input
            autoFocus
            onChange={handleChange}
            type="text"
            id="first_name"
            name="username"
            value={values.username}
            className={
              errors.username && `${valid.username ? "valid" : "invalid"}`
            }
          />
          <label for="username">Username</label>
          <span className="helper-text" data-error={errors.username} />
        </div>
        <div className="input-field">
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            value={values.password}
            className={
              errors.password && `${valid.password ? "valid" : "invalid"}`
            }
          />
          <label for="password">Password</label>
          <span className="helper-text" data-error={errors.password} />
        </div>
        <button
          className="btn waves-effect black yellow-text"
          type="submit"
          // disabled={errors.length === 0 ? false : true}
        >
          Submit <Icon className="right">send</Icon>
        </button>
        <button
          type="button"
          onClick={resetButton}
          className="btn white"
          style={{ marginLeft: "15px" }}
          // disabled={errors.length === 0 ? false : true}
        >
          Reset
        </button>
        <p style={{ textAlign: "center", marginTop: "25px" }}>
          To see demo click <a href="/demo">Here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
