import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../hooks/authContext";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Axios from "axios";

function Dashboard(props) {
  // const [isAuthenticated, setIsAuthenticated] = useState();
  const context = useContext(AuthContext);
  const bug = useRef(0);
  const error = useRef(0);
  const unknown = useRef(0);
  const onprogress = useRef(0);
  const done = useRef(0);
  const pending = useRef(0);
  useEffect(() => {
    context.setCurrent("dashboard");
    const projectTickets = async () => {
      const res = await Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/ticket"
      );
      const tickets = res.data;
      tickets.map((ticket) => {
        if (ticket.type === "Bug") {
          bug.current++;
        }
        if (ticket.type === "Error") {
          error.current++;
        }
        if (ticket.type === "Unknown") {
          unknown.current++;
        }
        if (ticket.status === "On progress") {
          onprogress.current++;
        }
        if (ticket.status === "Done") {
          done.current++;
        }
        if (ticket.status === "Pending") {
          pending.current++;
        }
        return "";
      });
    };
    projectTickets();
  }, [bug, context]);
  const dataStatus = {
    labels: ["Onprogress", "Done", "Pending"],
    datasets: [
      {
        label: "# of Votes",
        data: [onprogress.current, done.current, pending.current],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataType = {
    labels: ["Bug", "Error", "Unknown"],
    datasets: [
      {
        label: "# of Votes",
        data: [bug.current, error.current, unknown.current],
        backgroundColor: [
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <h1>Dashboard</h1>
      <h3>Hi {props.username}</h3>
      <div className="row container">
        <div className="col s12 l6 m12 center">
          <h3
            style={{
              borderRadius: "5px",
              display: "inline-block",
              width: "180px",
            }}
            className="black yellow-text"
          >
            Tickets by status
          </h3>
          <Pie responsive={true} width={60} height={45} data={dataStatus} />
        </div>
        <div className="col s12 l6 m12 center">
          <h3
            style={{
              borderRadius: "5px",
              display: "inline-block",
              width: "170px",
            }}
            className="black yellow-text"
          >
            Tickets by type
          </h3>
          <Pie responsive={true} width={60} height={45} data={dataType} />
        </div>
      </div>
      <Link
        to="/projects"
        className="btn waves-effect waves-light black yellow-text"
      >
        See Projects
      </Link>
    </>
  );
}

export default Dashboard;
