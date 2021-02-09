import React, { useContext, useEffect, useState } from "react";
// import { windows } from "react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MUIDataTable from "mui-datatables";
// import { pageContext } from "../../hooks/pageContext";
import { AuthContext } from "../../hooks/authContext";
import axios from "axios";
import NewProject from "./NewProject";
import ProjectDetails from "./ProjectDetails";
import "./projects.css";

function Projects(props) {
  const [TheNewProject, setTheNewProject] = useState(false);
  const [projectsData, setProjectsData] = useState();
  const [allProjectsData, setAllProjectsData] = useState();
  const [ticketsData, setTicketsData] = useState();
  const [projectDetailsPage, setProjectDetailsPage] = useState(false);
  const [projectName, setProjectName] = useState();
  const [projectID, setProjectID] = useState(true);
  const [seeAllStatus, setSeeAll] = useState(false);
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            // width: "50%",
            margin: "0 auto",
            alignItems: "center",
            paddingTop: "30px",
          },
        },
      },
    });
  const columns = ["Project name", "Description", "Creator", "More details"];

  const options = {
    filterType: "checkbox",
    responsive: "stacked",
    rowsPerPage: 5,
    rowsPerPageOptions: [2, 5, 8, 10, 15, 100],
    selectableRows: "none",
    searchPlaceholder: "Search",
  };
  const styles = {
    padding: "20px",
  };

  const moreDetailsHandler = (event) => {
    setProjectDetailsPage(true);
    setProjectName(event.target.name);
  };

  const context = useContext(AuthContext);
  context.setCurrent("projects");

  useEffect(() => {
    const projectsDatabase = async () => {
      let data = [];

      let userProjects = [];
      const userRes = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/users"
      );
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/projects"
      );
      setAllProjectsData(res.data);
      userRes.data.data.map((el) => {
        if (el.username === context.userData.username) {
          userProjects = el.projectNames;
        }
        return "";
      });
      res.data.map((el) => {
        return el.assignedUsername.map((element) => {
          if (
            element === context.userData.username &&
            userProjects.includes(el.name)
          ) {
            data.push([
              el.name,
              el.description,
              el.creator,
              <button
                name={el.name}
                className="btn black yellow-text waves-effect waves-light res-button"
                onClick={moreDetailsHandler}
              >
                More details
              </button>,
            ]);
          }
          return "";
        });
      });

      if (!seeAllStatus) {
        setProjectsData(data);
      }
      // setProjectsData(data);
      const getProjectId = async () => {
        try {
          const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "/projects",
            {
              params: {
                name: projectName,
              },
            },
            {
              withCredentials: true,
            }
          );
          setProjectID(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getProjectId();
    };
    const projectTickets = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/ticket"
      );
      const tickets = res.data;
      setTicketsData(tickets);
    };
    projectsDatabase();
    projectTickets();
  }, [projectName, context.userData.username, seeAllStatus]);

  const newProjectHandler = () => {
    setTheNewProject(true);
  };
  const ProjectHandler = () => {
    setTheNewProject(false);
  };
  const backToProjects = (user) => {
    if (user) {
      setProjectDetailsPage(false);
    }
  };

  const seeAll = () => {
    const newData = [];
    setSeeAll(!seeAllStatus);
    if (allProjectsData) {
      allProjectsData.map((el) => {
        return newData.push([
          el.name,
          el.description,
          el.creator,
          <button
            name={el.name}
            className="btn black yellow-text waves-effect waves-light"
            onClick={moreDetailsHandler}
          >
            More details
          </button>,
        ]);
      });
    }
    setProjectsData(newData);
  };

  return (
    <div className="res-project" style={styles}>
      {/* <h1>{props.role}</h1> */}
      {projectDetailsPage ? (
        <>
          <ProjectDetails
            goBack={backToProjects}
            tickets={ticketsData}
            title={projectName}
            projectID={projectID}
            allProjects={allProjectsData}
          />

          <Button variant="contained" color="primary" onClick={backToProjects}>
            go Back
          </Button>
        </>
      ) : (
        <>
          {TheNewProject ? (
            <>
              <NewProject
                toUpdate={false}
                previousValues=""
                onClick={ProjectHandler}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={ProjectHandler}
              >
                Back
              </Button>
            </>
          ) : (
            <div>
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  margin: "0 auto",
                  width: "90%",
                  height: "60px",
                  backgroundColor: "black ",
                  borderRadius: "5px",
                  boxShadow: "1px 5px 5px",
                  textColor: "yellow",
                }}
              >
                <h2 style={{ color: "yellow", paddingTop: "9px" }}>Projects</h2>

                <button
                  onClick={seeAll}
                  style={{ marginTop: "20px" }}
                  className="btn-small waves-effect waves-light black yellow-text"
                >
                  {!seeAllStatus
                    ? "See all of the projects"
                    : "See Projects Assigned to you"}
                </button>
              </div>
              <div className="col">
                <MuiThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    // title={<h2 className="card-title">Projects</h2>}
                    data={props.demo ? props.demo.projects : projectsData}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
              </div>
              {context.userData.role === "Admin" && (
                <button
                  style={{ marginTop: "20px" }}
                  className="btn waves-effect waves-light black yellow-text"
                  onClick={newProjectHandler}
                >
                  Create a new project
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Projects;
