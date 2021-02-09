import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hooks/authContext";
import NewTicket from "./NewTicket";
import "./ticket.css";

function Tickets(props) {
  const [ticketsData, setTicketsData] = useState();
  const [newTicketPage, setNewTicketPage] = useState(false);
  const [ticketsToModify, setTicketsToModify] = useState({
    title: "",
    description: "",
    type: "",
    priority: "",
    status: "",
  });
  const context = useContext(AuthContext);
  context.setCurrent("tickets");
  useEffect(() => {
    const projectTickets = async () => {
      const res = await Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/ticket"
      );
      const tickets = res.data;
      setTicketsData(tickets);
    };
    projectTickets();
  }, []);
  const data = [];
  const modifyTicket = (event) => {
    setNewTicketPage(true);
    if (ticketsData) {
      data.map((element) => {
        if (element[0] === event.target.name) {
          setTicketsToModify({
            title: element[0],
            description: element[1],
            type: element[2],
            priority: element[3],
            status: element[4],
            projectName: element[6],
            projectID: element[8],
            update: true,
          });
        }
        return "";
      });
    }
  };

  let ticketCreator = "";
  if (ticketsData) {
    ticketsData.map((ticket) => {
      return data.push([
        ticket.title,
        ticket.description,
        ticket.type,
        ticket.priority,
        ticket.status,
        ticket.creator,
        ticket.projectName,
        context.userData.role === "Admin" ||
        context.userData.role === "Developer" ||
        ticket.creator === context.userData.username ? (
          <button
            className="btn waves-effect waves-light black yellow-text res-button"
            name={ticket.title}
            onClick={modifyTicket}
            variant="contained"
            color="secondary"
          >
            Click to modify
          </button>
        ) : (
          <button
            disabled={true}
            className="btn waves-effect waves-light black yellow-text res-button"
            name={ticket.title}
            onClick={modifyTicket}
            variant="contained"
            color="secondary"
          >
            Click to modify
          </button>
        ),
        ticket.projectID,
      ]);
    });
  }
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
  const columns = [
    "Title",
    "Description",
    "Type",
    "Priority",
    "Status",
    "Creator",
    "Project name",
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
  const styles = {
    padding: "20px",
  };

  const goBack = () => {
    setNewTicketPage(false);
  };

  return (
    <div className="res-ticket" style={styles}>
      {!newTicketPage ? (
        <>
          <div
            style={{
              position: "relative",
              textAlign: "center",
              margin: "0 auto",
              width: "90%",
              height: "60px",
              backgroundColor: "black",
              borderRadius: "5px",
              boxShadow: "1px 5px 5px",
            }}
          >
            <h2 style={{ color: "yellow", paddingTop: "11px" }}>Tickets</h2>
          </div>

          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={<h2 className="card-title">Tickets</h2>}
              data={props.demo ? props.demo.tickets : data}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </>
      ) : (
        <>
          <button
            className="btn waves-effect waves-light black yellow-text"
            onClick={goBack}
          >
            Back
          </button>
          <NewTicket previousValues={ticketsToModify} />
        </>
      )}
    </div>
  );
}

export default Tickets;
