import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { mdiBug } from "@mdi/js";
import { Icon as Ic } from "@mdi/react";
import { mdiLogout } from "@mdi/js";
import {
  Button,
  Icon,
  Navbar,
  NavItem,
  // SideNav,
  // SideNavItem,
} from "react-materialize";
// import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../hooks/authContext";
import "./Navbar.css";

function NewNavbar(props) {
  const context = useContext(AuthContext);
  const activePage = context.currentPage;

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
    <>
      <Navbar
        className={navbar ? "black z-depth-3" : "grey lighten-2 z-depth-1"}
        alignLinks="right"
        brand={
          <>
            <i
              style={{
                marginBottom: "17px",
                display: "inline",
              }}
              className={
                navbar
                  ? " yellow-text site-logo-icon"
                  : " black-text site-logo-icon"
              }
            >
              <Ic path={mdiBug} size={1.5} />
            </i>
            <a
              href="/dashboard"
              node="a"
              flat
              className={
                navbar
                  ? "brand-logo transparent yellow site-logo col s12"
                  : "brand-logo transparent black-text site-logo col s12"
              }
              style={{
                textDecoration: "none",
                // marginTop: "10px",
                marginLeft: "0px",
                padding: "0",
                color: "yellow",
              }}
            >
              Bug Tracker
            </a>
          </>
        }
        menuIcon={
          <i
            className={
              navbar
                ? "yellow-text material-icons medium"
                : "black-text material-icons medium"
            }
          >
            menu
          </i>
        }
        fixed
        sidenav={
          <div>
            <li className="">
              <div className="user-view">
                <div className="background">
                  <img src="https://placeimg.com/640/480/tech" alt="" />
                </div>
                <a href="#!name">
                  <span className="white-text name">
                    {context.userData.username}
                  </span>
                </a>
                <a href="#!email">
                  <span className="white-text email">
                    {context.userData.email}
                  </span>
                </a>
              </div>
            </li>
            <li>
              <a
                className={activePage === "dashboard" ? "btn black-text" : ""}
                href="/dashboard"
              >
                <i className="material-icons prefix">dashboard</i>Dashboard
              </a>
            </li>
            <li>
              <a
                className={activePage === "projects" ? "btn black-text" : ""}
                href="/projects"
              >
                <i className="material-icons prefix">library_books</i>Projects
              </a>
            </li>
            <li>
              <a
                className={activePage === "tickets" ? "btn black-text" : ""}
                href="/tickets"
              >
                <i className="material-icons prefix">style</i>Tickets
              </a>
            </li>
            <li>
              <a
                className={activePage === "profile" ? "btn black-text" : ""}
                href="/profile"
              >
                <i className="material-icons prefix">account_box</i>Profile
              </a>
            </li>
            <li>
              <a className="" href="/logout">
                <Ic
                  path={mdiLogout}
                  size={1.1}
                  style={{ marginRight: "33px", color: "#616161 " }}
                />
                Log out
              </a>
            </li>
          </div>
        }
      >
        <div className="center row">
          <div className="col s12 ">
            <div className="row" id="topbarsearch">
              <div className="input-field col s6 s12">
                <i
                  // style={{ color: "yellow" }}
                  className={
                    navbar
                      ? "material-icons prefix yellow-text"
                      : "material-icons prefix black-text"
                  }
                >
                  search
                </i>
                <input
                  style={{}}
                  type="text"
                  placeholder="search"
                  id="autocomplete-input"
                  className="autocomplete yellow-text searchBar-placeHolder"
                />
              </div>
            </div>
          </div>
        </div>
        <NavItem badge={4}>
          <Icon className={navbar ? "yellow-text" : "black-text"}>mail</Icon>
        </NavItem>
        <NavItem badge={4}>
          <Icon className={navbar ? "yellow-text" : "black-text"}>
            notifications
          </Icon>
        </NavItem>
        <NavItem
          className={activePage === "register" ? "active" : ""}
          badge={4}
        >
          <Icon className={navbar ? "yellow-text" : "black-text"}>
            account_box
          </Icon>
        </NavItem>
      </Navbar>
      <ul
        className="sidenav sidenav-fixed darken-2 sidebar onMobile"
        // style="transform: translateX(0px);"
      >
        <li className="">
          <div className="user-view">
            <div className="background">
              <img src="https://placeimg.com/640/480/tech" alt="" />
            </div>
            <a href="#!name">
              <span className="white-text name">
                {context.userData.username}
              </span>
            </a>
            <a href="#!email">
              <span className="white-text email">
                {" "}
                {context.userData.email}{" "}
              </span>
            </a>
          </div>
        </li>
        <li>
          <a
            className={activePage === "dashboard" ? "btn black-text" : ""}
            href="/dashboard"
          >
            <i className="material-icons prefix">dashboard</i>Dashboard
          </a>
        </li>
        <li>
          <a
            className={activePage === "projects" ? "btn black-text" : ""}
            href="/projects"
          >
            <i className="material-icons prefix">library_books</i>Projects
          </a>
        </li>
        <li>
          <a
            className={activePage === "tickets" ? "btn black-text" : ""}
            href="/tickets"
          >
            <i className="material-icons prefix">style</i>Tickets
          </a>
        </li>
        <li>
          <a
            className={activePage === "profile" ? "btn black-text" : ""}
            href="/profile"
          >
            <i className="material-icons prefix">account_box</i>Profile
          </a>
        </li>
        <li>
          <a className="" href="/logout">
            <Ic
              path={mdiLogout}
              size={1.1}
              style={{ marginRight: "33px", color: "#616161 " }}
            />
            Log out
          </a>
        </li>
      </ul>
      {/* <SideNav
        options={{
          draggable: true,
        }}
        className="darken-2 sidebar"
      >
        <SideNavItem
          user={{
            background: "https://placeimg.com/640/480/tech",
            email: context.userData.email,
            name: props.username,
          }}
          userView
        />
        <SideNavItem
          className="white-text"
          href="#!icon"
          icon={<Icon>cloud</Icon>}
        >
          First Link With Icon
        </SideNavItem>
        <SideNavItem divider />
        <SideNavItem
          icon={<Icon>dashboard</Icon>}
          href="/dashboard"
          className={activePage === "dashboard" ? "active"}
        >
          Dashboard
        </SideNavItem>
        <SideNavItem
          icon={<Icon>library_books</Icon>}
          href="/projects"
          className={activePage === "projects" && "active"}
        >
          Projects
        </SideNavItem>
        <SideNavItem
          href="/profile"
          className={activePage === "profile" && "active"}
          icon={<Icon>account_box</Icon>}
        >
          Profile
        </SideNavItem>
        <SideNavItem
          href="/tickets"
          className={activePage === "tickets" && "active"}
          icon={<Icon>account_box</Icon>}
        >
          Tickets
        </SideNavItem>
        <SideNavItem
          icon={<Icon>assignment</Icon>}
          href="/logout"
          className={activePage === "register" && "active"}
        >
          Log out
        </SideNavItem>
      </SideNav> */}
    </>
  );
}

export default withRouter(NewNavbar);
