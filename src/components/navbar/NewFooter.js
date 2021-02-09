import React, { useState } from "react";
import "./Navbar.css";

function NewFooter() {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY > 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <div
      id="footer"
      className={
        navbar
          ? "black z-depth-3 page-footer "
          : "grey lighten-2 z-depth-3 page-footer "
      }
    >
      {/* <div className="footer-copyright"> */}
      <div className="container center">
        <p className={navbar ? "footer-p yellow-text" : "footer-p black-text"}>
          © 2021 Copyright Made by Mjavad
        </p>
      </div>
      {/* </div> */}
    </div>
  );
}

export default NewFooter;
