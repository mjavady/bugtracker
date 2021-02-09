import React from "react";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";
import { mdiAccountPlus } from "@mdi/js";
import { mdiLogin } from "@mdi/js";
import Icon2 from "@mdi/react";

function LoggedOut() {
  return (
    <div className="container form-card ">
      <div className="card gray darken-8 z-depth-3">
        <div className="card-content center">
          <h1>Welcome to the bug tracker app</h1>
          <h5 style={{ margin: "25px 0" }}>
            Please login or register to continue.
          </h5>
          <div>
            <Icon medium>keyboard_arrow_down</Icon>
            <Icon medium>keyboard_arrow_down</Icon>
            <Icon medium>keyboard_arrow_down</Icon>
            {/* <Icon medium>keyboard_arrow_down</Icon> */}
          </div>
          <div>
            <Icon medium>keyboard_arrow_down</Icon>
            <Icon medium>keyboard_arrow_down</Icon>
            {/* <Icon large>keyboard_arrow_down</Icon>
            <Icon large>keyboard_arrow_down</Icon> */}
          </div>
          <div>
            {/* <Icon medium>keyboard_arrow_down</Icon> */}
            {/* <Icon>keyboard_arrow_down</Icon>
            <Icon>keyboard_arrow_down</Icon>
            <Icon>keyboard_arrow_down</Icon> */}
          </div>
          <Link
            style={{ margin: "25px 0" }}
            className="btn black yellow-text"
            to="/register"
          >
            Register
            <Icon2
              style={{ margin: "0 5px" }}
              className="right"
              size={1}
              path={mdiAccountPlus}
            />
          </Link>
          <div>
            <Link className="btn black yellow-text" to="/login">
              Login
              <Icon2
                style={{ margin: "0 5px" }}
                className="right"
                size={1}
                path={mdiLogin}
              />
            </Link>
          </div>
          <div style={{ margin: "25px 0" }}>
            Already logged in? Continue
            <a href="/dashboard"> here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoggedOut;
