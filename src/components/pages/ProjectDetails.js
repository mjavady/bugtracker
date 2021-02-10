import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@material-ui/core";
import { Icon, Modal } from "react-materialize";
import "./ProjectDetails.css";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import NewTicket from "./NewTicket";
import CommentForm from "./commentForm";
import { useForceUpdate } from "../../hooks/forceUpdate";
import useHistory from "../../hooks/history";
import { AuthContext } from "../../hooks/authContext";
import NewProject from "./NewProject";

function ProjectDetails(props) {
  const { recordHistory, getHistory } = useHistory();
  const [newTicketPage, setNewTicketPage] = useState(false);
  const [newCommentPage, setNewCommentPage] = useState(false);
  const [projectToModify, setProjectToModify] = useState({
    name: "",
    description: "",
  });
  const [editingProject, setEditingProject] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [ticketsToModify, setTicketsToModify] = useState({
    title: "",
    description: "",
    type: "",
    priority: "",
    status: "",
  });
  const projectID = props.projectID;
  // const [toSendValues, setToSendValues] = useState({
  //   description: "",
  //   title: "",
  //   // ticketID: "",
  //   // creator: "",
  // });

  const context = useContext(AuthContext);
  const deleteProjectHandler = () => {
    deleteProject();
  };
  const deleteProject = async () => {
    const data = { name: props.title };
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + "/projects",
        {
          data,
        }
      );
      if (res.data === true) {
        recordHistory("Project deleted", projectID);
        // alert("success");
        window.location.reload(true);
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newTicket = () => {
    setNewTicketPage(true);
    setEditingProject(false);
  };

  const ticketData = [];
  const modifyTicket = (event) => {
    setNewTicketPage(true);
    ticketData.forEach((element) => {
      if (element[0] === event.target.name) {
        setTicketsToModify({
          title: element[0],
          description: element[1],
          type: element[2],
          priority: element[3],
          status: element[4],
          update: true,
        });
      }
    });
  };

  const commentForm = () => {
    setNewCommentPage(true);
    // postComment();
  };
  const commentFormBack = () => {
    setNewCommentPage(false);
  };
  // const goBack = () => {
  //   setNewTicketPage(false);
  // };
  props.tickets.map((ticket) => {
    if (ticket.projectID === projectID) {
      ticketData.push([
        ticket.title,
        ticket.description,
        ticket.type,
        ticket.priority,
        ticket.status,
        ticket.creator,
        context.userData.role === "Admin" ||
        context.userData.role === "Developer" ||
        ticket.creator === context.userData.username ? (
          <button
            className="btn waves-effect waves-light black yellow-text"
            name={ticket.title}
            style={{ height: "auto" }}
            onClick={modifyTicket}
            variant="contained"
            color="secondary"
          >
            Click to modify
          </button>
        ) : (
          <button
            disabled={true}
            className="btn waves-effect waves-light black yellow-text"
            name={ticket.title}
            style={{ height: "auto" }}
            onClick={modifyTicket}
            variant="contained"
            color="secondary"
          >
            Click to modify
          </button>
        ),
      ]);
    }
    return "";
  });

  const columns = [
    "Title",
    "Description",
    "Type",
    "Priority",
    "Status",
    "Creator",
    "Edit",
  ];
  const options = {
    filterType: "checkbox",
    responsive: "stacked",
    rowsPerPage: 5,
    rowsPerPageOptions: [2, 5, 8, 10, 15, 100],
    selectableRows: "none",
    searchPlaceholder: "Search",
  };

  const [commentsData, setCommentsData] = useState([]);
  useEffect(() => {
    const findComments = async () => {
      const commentsRes = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/comments",
        {
          params: {
            projectID: projectID,
          },
        },
        {
          withCredentials: true,
        }
      );
      setCommentsData(commentsRes.data);
    };
    findComments();
    let newHistory = [];
    const histories = getHistory(projectID);
    try {
      histories.map((data) => {
        if (data.projectID === projectID) {
          newHistory.push([data.typeOfChange, data.date]);
        }
        return "";
      });
    } catch (error) {
      console.log(error);
    }
    setHistoryData(newHistory);
  }, [projectID]);

  // let preComments = [];
  let comments = [];
  commentsData.map((preComment) => {
    comments.push(preComment.comment);
    comments.map((comment) => {
      comment.push(preComment.creatorID);
      return "";
    });
    return "";
  });
  const forceUpdate = useForceUpdate();
  const testC = useRef(comments);
  const childNewValue = (newVal) => {
    comments.push(newVal);
    testC.current = comments;
    forceUpdate();
    recordHistory("New comment was made", projectID);
  };
  const editProject = () => {
    setNewTicketPage(true);
    setEditingProject(true);
    props.allProjects.map((project) => {
      if (project.name === props.title) {
        setProjectToModify({
          name: props.title,
          description: project.description,
        });
      }
      return "";
    });
  };
  return (
    <>
      {!newTicketPage ? (
        <div>
          <h1 className="center">
            <Icon small className="center">
              arrow_drop_down_circle
            </Icon>
            {props.title}
          </h1>
          <Modal
            className="modal"
            actions={[
              <>
                <button
                  style={{ marginRight: "15px" }}
                  className="btn red modal-close"
                  onClick={deleteProjectHandler}
                >
                  Yes
                </button>
                <button className="btn modal-close">No</button>
              </>,
            ]}
            header="Are sure about this?"
            id="Modal-0"
            open={false}
            options={{
              dismissible: true,
              endingTop: "10%",
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              opacity: 0.5,
              outDuration: 150,
              preventScrolling: true,
              startingTop: "4%",
            }}
            //   root={[object HTMLBodyElement]}
            trigger={
              context.userData.role === "Admin" && (
                <Button
                  id="deleteProject"
                  variant="contained"
                  color="secondary"
                >
                  Delete project
                </Button>
              )
            }
          ></Modal>
          {context.userData.role === "Admin" && (
            <Button
              onClick={editProject}
              className="right"
              variant="contained"
              color="primary"
            >
              Edit this project
            </Button>
          )}

          <div style={{ margin: "22px auto 60px auto" }}>
            <MUIDataTable
              columns={columns}
              options={options}
              data={ticketData}
              title={<h2 className="card-title">Tickets</h2>}
            />
            <Button onClick={newTicket} variant="contained" color="primary">
              Assign a new ticket
            </Button>
          </div>
          <div style={{ margin: "60px auto" }}>
            <MUIDataTable
              data={historyData}
              options={options}
              columns={["Type of change", "Date", "Creator"]}
              title={<h2 className="card-title">History</h2>}
            />
          </div>
          <div style={{ margin: "60px auto" }}>
            <MUIDataTable
              columns={["Title", "Description", "Creator"]}
              options={options}
              data={
                testC.current.length > comments.length
                  ? testC.current
                  : comments
              }
              title={<h2 className="card-title">Comments</h2>}
            />
            {newCommentPage ? (
              <div className="container form-card">
                <div className="card gray darken-8 z-depth-3">
                  <div className="card-content">
                    <CommentForm
                      data={commentsData}
                      projectID={projectID}
                      title={props.title}
                      newValue={childNewValue}
                      forceUpdate={forceUpdate}
                      close={commentFormBack}
                    />
                    <Button
                      onClick={commentFormBack}
                      type="button"
                      style={{ marginTop: "15px" }}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={commentForm} variant="contained" color="primary">
                Write a new comment
              </Button>
            )}
          </div>
        </div>
      ) : editingProject ? (
        <NewProject toUpdate={true} previousValues={projectToModify} />
      ) : (
        <NewTicket
          goBack={props.goBack}
          ticketData={ticketData}
          pID={projectID}
          name={props.title}
          previousValues={ticketsToModify}
        />
      )}
    </>
  );
}

export default ProjectDetails;
