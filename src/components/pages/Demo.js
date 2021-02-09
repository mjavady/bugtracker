// import { MuiThemeProvider } from "@material-ui/core";
// import MUIDataTable from "mui-datatables";
import React, { useContext } from "react";
// import ReactDOM from "react-dom";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import { AuthContext } from "../../hooks/authContext";
import { DemoContext } from "../../hooks/demoContext";
import NewNavbar from "../navbar/newNavbar";
import Projects from "./Projects";
import Tickets from "./Tickets";
import Users from "./Users";
import "./Demo.css";

function Demo() {
  const auth = useContext(AuthContext);
  auth.setCurrent("dashboard");
  const context = useContext(DemoContext);
  const demoRoutes = (
    <>
      <NewNavbar username={context.username} />
      <div className="main">
        <h1>You can preview each page here</h1>
        <h3 className="mobile-show">
          Please switch to desktop view for better experience.
        </h3>
        <Collapsible accordion popout>
          <CollapsibleItem
            expanded={false}
            header="Projects"
            icon={<Icon>library_books</Icon>}
            node="div"
          >
            <Projects
              role={context.role}
              demo={{
                username: context.username,
                role: context.role,
                email: context.email,
                projects: context.projects,
                tickets: context.tickets,
                comments: context.comments,
                users: context.users,
              }}
            />
          </CollapsibleItem>
          <CollapsibleItem
            expanded={false}
            header="Tickets"
            icon={<Icon>assignment</Icon>}
            node="div"
          >
            <Tickets
              demo={{
                username: context.username,
                role: context.role,
                email: context.email,
                projects: context.projects,
                tickets: context.tickets,
                comments: context.comments,
                users: context.users,
              }}
              role={context.role}
            />
          </CollapsibleItem>
          <CollapsibleItem
            expanded={false}
            header="Profile"
            icon={<Icon>people</Icon>}
            node="div"
          >
            <Users
              demo={{
                username: context.username,
                role: context.role,
                email: context.email,
                projects: context.projects,
                tickets: context.tickets,
                comments: context.comments,
                users: context.users,
              }}
              role={context.role}
            />
          </CollapsibleItem>
        </Collapsible>
      </div>
    </>
  );
  // return ReactDOM.createPortal(demoRoutes, document.getElementById("demo"));
  return demoRoutes;
}

export default Demo;
