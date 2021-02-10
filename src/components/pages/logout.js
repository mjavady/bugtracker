import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoggedOut from "./loggedout";

function Logout() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/logout",
          {
            withCredentials: true,
          }
        );
        if (res.data) {
          if (
            Cookies.get("username") &&
            Cookies.get("username") !== undefined
          ) {
            Cookies.remove("username");
            setIsLoggedOut(true);
            window.location.reload();
            setIsLoggedOut(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    logout();
  }, []);

  return (
    <div className="container form-card ">
      <h2 className="center">Successfully logged out!</h2>
      {/* <div className="card gray darken-8 z-depth-3">
        <div className="card-content center">
          <Link
            style={{ margin: "25px 0" }}
            className="btn black yellow-text"
            to="/register"
          >
            Register
          </Link>
          <div>
            <Link className="btn black yellow-text" to="/login">
              Log in
            </Link>
          </div>
        </div>
      </div> */}
      <LoggedOut />
    </div>
  );
}

export default Logout;
