import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Logout() {
  const logout = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/logout",
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        Cookies.remove("username");
        // window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  logout();
  return (
    <div className="container form-card ">
      <div className="card gray darken-8 z-depth-3">
        <div className="card-content center">
          <h2>You are not logged in!</h2>
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
      </div>
    </div>
  );
}

export default Logout;
