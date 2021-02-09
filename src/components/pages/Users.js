import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../hooks/authContext";
import {
  Card,
  Chip,
  Collection,
  CollectionItem,
  Divider,
  Dropdown,
  Icon,
} from "react-materialize";
import Select from "react-select";
import "./Users.css";
import { Link } from "react-router-dom";

function Users(props) {
  const context = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [userAllData, setUserAllData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);
  const [roleSection, setRoleSection] = useState(false);
  const [newOrder, setNewOrder] = useState("");
  const [changes, setChanges] = useState({
    creatorUsername: "",
    username: "",
    creatorUserID: "",
    role: "",
    comment: "",
    assignedProjects: "",
  });
  const [selectedValue, setSelectedValue] = useState([]);
  const [textArea, setTextArea] = useState({
    comment: "",
  });
  const [message, setMessage] = useState({
    message: "",
  });

  useEffect(() => {
    context.setCurrent("profile");
    const getUsers = async () => {
      const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/users");
      const resProjects = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/projects"
      );
      const commentsRes = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/comments"
      );
      setUserData(res.data.usernames);
      setUserAllData(res.data.data);
      setProjects(resProjects.data);
      let comments = [];
      commentsRes.data.map((comment) => {
        if (comment.forUsername === context.userData.username) {
          comments.push(comment);
        }
        return "";
      });
      setComments(comments);
    };
    getUsers();
  }, [context.userData.username, context]);
  const data = [];
  projects.map((project) => {
    data.push({ value: project.name, label: project.name });
    return "";
  });

  const commentsData = [];
  comments.map((comment) => {
    commentsData.push([comment.comment, comment.creatorID]);
    return "";
  });
  const handleFormSubmit = (event) => {
    event.preventDefault();

    postChanges();
  };

  const handleSelectChange = (event) => {
    setSelectedValue(Array.isArray(event) ? event.map((x) => x.value) : []);
    let currentRole = "";
    userData.map((data) => {
      if (data[0] === btnName) {
        currentRole = data[1];
      }
      return "";
    });
    setChanges({
      creatorUsername: props.name,
      username: btnName,
      creatorUserID: context.userData.username,
      role: newOrder ? newOrder.split(" ")[0] : currentRole,
      comment: textArea.comment !== undefined ? textArea.comment : "",
      assignedProjects: Array.isArray(event) ? event.map((x) => x.value) : [],
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTextArea({
      [name.split(" ")[0]]: value.length ? value : "",
    });
    let currentRole = "";
    userData.map((data) => {
      if (data[0] === name.split(" ")[1]) {
        currentRole = data[1];
      }
      return "";
    });
    setChanges({
      creatorUsername: props.name,
      username: name.split(" ")[1],
      creatorUserID: context.userData.username,
      role: newOrder ? newOrder.split(" ")[0] : currentRole,
      [name.split(" ")[0]]: value.length ? value : "",
      assignedProjects: selectedValue,
    });
  };

  const [btnName, setBtnName] = useState("");
  const handleRoleSection = (event) => {
    setBtnName(event.target.name);
    if (event.target.name === btnName) {
      setRoleSection(!roleSection);
    } else {
      setRoleSection(true);
    }
    setNewOrder("");
    setChanges({
      creatorUsername: "",
      username: "",
      creatorUserID: "",
      role: "",
      comment: "",
      assignedProjects: "",
    });
    setSelectedValue([]);
    setTextArea("");
  };
  const saveRole = (event) => {
    const newList = event.target.name;
    setNewOrder(newList);
    setChanges({
      ...changes,
      username: newList.split(" ")[1],
      role: newList.split(" ")[0],
    });
  };
  const postChanges = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/users",
        changes
      );
      if (res.data) {
        alert("Successful");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const postMessage = async () => {
    /* eslint-disable no-unused-vars */
    try {
      userAllData.map(async (users) => {
        if (users.role === "Admin") {
          const res = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/message",
            {
              data: {
                message: message.message,
              },
            },
            {
              params: {
                username: users.username,
                creatorID: props.name,
              },
            }
          );
          alert("Successful");
          window.location.reload();
        } else {
        }
      });
      /* eslint-disable no-unused-vars */
    } catch (error) {
      console.log(error);
      alert("There are no admins right now!!");
    }
    // setMessage({});
  };
  const sendToAdmins = (e) => {
    e.preventDefault();
    postMessage();
  };

  const handleCommentsChange = (e) => {
    const { name, value } = e.target;
    setMessage({
      [name]: value,
    });
  };
  return (
    <div className="row container">
      <div className="center">
        <h1>Welcome {props.name}</h1>
        {userData.map((data) => {
          if (
            (data[0] === props.name) &
            (props.role === "Admin" || props.role === "Developer")
          ) {
            return (
              <h6>
                You are one of the{" "}
                <b>
                  "<u>{data[1]}s</u>"
                </b>{" "}
                of this website.
              </h6>
            );
          }
          return "";
        })}
      </div>
      <div className="col m6 s6">
        <Link
          style={{
            // display: "inline-block",
            // height: "45px",
            padding: " 0",
            // marginRight: "5px",
          }}
          to={{
            pathname: "/projects",
            state: {
              all: true,
            },
          }}
          className="col 12 s12 "
        >
          See projects assigned to you
        </Link>
        <Link
          style={{
            // display: "inline-block",
            // marginLeft: "15px",
            // height: "45px",
            padding: "10px 0",
          }}
          to={{
            pathname: "/tickets",
            state: {
              all: true,
            },
          }}
          className="col m12 s12 "
        >
          See all of the tickets
        </Link>
      </div>
      {props.role === "Admin" ? (
        <div className="">
          <ul className="collection hoverable col s12 m8">
            <li className="collection-item">
              <h2>Manage Users</h2>
            </li>
            {props.demo
              ? props.demo.users.map((el) => {
                  return (
                    <li className="collection-item avatar">
                      <i className="material-icons circle blue">people</i>
                      <h2 className="title">{el[0]}</h2>
                      <h6>Role: {el[1]}</h6>
                      {el[0] !== props.name && (
                        <button
                          name={el[0]}
                          onClick={handleRoleSection}
                          className="btn waves-effect waves-light pink white-text secondary-content"
                        >
                          more options
                        </button>
                      )}
                      {roleSection & (el[0] === btnName) ? (
                        <div style={{ height: "auto" }}>
                          <form name={el[0]} onSubmit={handleFormSubmit}>
                            <div
                              style={{
                                marginTop: "20px",
                                marginBottom: "20px",
                              }}
                              className="center"
                            >
                              <h5
                                style={{ marginTop: "5px" }}
                                className="col s4"
                              >
                                Set/Change the role:{" "}
                              </h5>
                              <Chip className="left col s4" options={null}>
                                {newOrder.split(" ")[1] === el[0]
                                  ? newOrder.split(" ")[0]
                                  : el[1]}
                              </Chip>
                              <Dropdown
                                style={{ paddingBottom: "0px" }}
                                options={{
                                  alignment: "left",
                                  autoTrigger: true,
                                  closeOnClick: true,
                                  constrainWidth: true,
                                  container: null,
                                  coverTrigger: true,
                                  hover: false,
                                  inDuration: 150,
                                  onCloseEnd: null,
                                  onCloseStart: null,
                                  onOpenEnd: null,
                                  onOpenStart: null,
                                  outDuration: 250,
                                }}
                                className="col s4"
                                trigger={
                                  <button className="btn waves-effect waves-light black yellow-text">
                                    Select
                                  </button>
                                }
                              >
                                <a
                                  name={`Admin ${el[0]}`}
                                  onClick={saveRole}
                                  href="#!"
                                >
                                  Admin
                                </a>
                                <a
                                  name={`Developer ${el[0]}`}
                                  onClick={saveRole}
                                  href="#!"
                                >
                                  Developer
                                </a>
                                <Divider />
                                <a
                                  name={`Normal ${el[0]}`}
                                  onClick={saveRole}
                                  href="#!"
                                >
                                  Normal
                                </a>
                              </Dropdown>
                            </div>
                            <br />
                            <hr />
                            <div
                              className="center"
                              style={{
                                height: "120px",
                              }}
                            >
                              <h5
                                style={{ marginTop: "10px" }}
                                className="col s6"
                              >
                                Assign a project to this user:
                              </h5>
                              <Select
                                onChange={handleSelectChange}
                                style={{
                                  width: "100%",
                                }}
                                className="col s6 dropdown"
                                value={data.filter((obj) =>
                                  selectedValue.includes(obj.value)
                                )}
                                options={data}
                                placeholder="Select Option"
                                isMulti
                                isClearable
                              />
                            </div>
                            <br />
                            <hr />
                            <div
                              className="center row"
                              style={{ height: "60px" }}
                            >
                              <h5 className="col s6">
                                Send a comment to this user:
                              </h5>
                              <input
                                style={{
                                  width: "100%",
                                }}
                                className="col s6"
                                name={`comment ${el[0]}`}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                type="text"
                              />
                            </div>
                            <div
                              className="center"
                              style={{ marginBottom: "40px", height: "100%" }}
                            >
                              <button
                                type="submit"
                                className="btn waves-effect waves-light green"
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        ""
                      )}
                    </li>
                  );
                })
              : userData.map((el) => {
                  return (
                    <li className="collection-item avatar">
                      <i className="material-icons circle blue">people</i>
                      <h2 className="title">{el[0]}</h2>
                      <h6>Role: {el[1]}</h6>
                      <h6>Projects: {el[2].join(", ")}</h6>
                      {el[0] !== props.name && (
                        <button
                          name={el[0]}
                          onClick={handleRoleSection}
                          className="btn waves-effect waves-light pink white-text res-but"
                        >
                          more options
                        </button>
                      )}
                      {roleSection & (el[0] === btnName) ? (
                        <div style={{ height: "auto" }}>
                          <form name={el[0]} onSubmit={handleFormSubmit}>
                            <div
                              style={{
                                marginTop: "20px",
                                marginBottom: "20px",
                              }}
                              className="center"
                            >
                              <h5
                                style={{ marginTop: "5px" }}
                                className="col s4"
                              >
                                Set/Change the role:{" "}
                              </h5>
                              <Chip className="left col s4" options={null}>
                                {newOrder.split(" ")[1] === el[0]
                                  ? newOrder.split(" ")[0]
                                  : el[1]}
                              </Chip>
                              <Dropdown
                                style={{ paddingBottom: "0px" }}
                                options={{
                                  alignment: "left",
                                  autoTrigger: true,
                                  closeOnClick: true,
                                  constrainWidth: true,
                                  container: null,
                                  coverTrigger: true,
                                  hover: false,
                                  inDuration: 150,
                                  onCloseEnd: null,
                                  onCloseStart: null,
                                  onOpenEnd: null,
                                  onOpenStart: null,
                                  outDuration: 250,
                                }}
                                className="col s4"
                                trigger={
                                  <button className="btn waves-effect waves-light black yellow-text">
                                    Select
                                  </button>
                                }
                              >
                                <a
                                  name={`Admin ${el[0]}`}
                                  onClick={saveRole}
                                  href="#!"
                                >
                                  Admin
                                </a>
                                <a
                                  name={`Developer ${el[0]}`}
                                  onClick={saveRole}
                                  href="#!"
                                >
                                  Developer
                                </a>
                                <Divider />
                                <a
                                  name={`Normal ${el[0]}`}
                                  onClick={saveRole}
                                  href="#!"
                                >
                                  Normal
                                </a>
                              </Dropdown>
                            </div>
                            <br />
                            <hr />
                            <div
                              className="center"
                              style={{
                                height: "120px",
                              }}
                            >
                              <h5
                                style={{ marginTop: "10px" }}
                                className="col s6"
                              >
                                Assign a project to this user:
                              </h5>
                              <Select
                                onChange={handleSelectChange}
                                style={{
                                  width: "100%",
                                }}
                                className="col s6 dropdown"
                                value={data.filter((obj) =>
                                  selectedValue.includes(obj.value)
                                )}
                                options={data}
                                placeholder="Select Option"
                                isMulti
                                isClearable
                              />
                            </div>
                            <br />
                            <hr />
                            <div
                              className="center row"
                              style={{ height: "60px" }}
                            >
                              <h5 className="col s6">
                                Send a comment to this user:
                              </h5>
                              <input
                                style={{
                                  width: "100%",
                                }}
                                className="col s6"
                                name={`comment ${el[0]}`}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                type="text"
                              />
                            </div>
                            <div
                              className="center"
                              style={{ marginBottom: "40px", height: "100%" }}
                            >
                              <button
                                type="submit"
                                className="btn waves-effect waves-light green"
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        ""
                      )}
                    </li>
                  );
                })}
          </ul>
          <div className="col s12 m4">
            <Collection className="hoverable black-text ">
              <CollectionItem>
                <h3>Comments</h3>
              </CollectionItem>
              {props.demo
                ? props.demo.comments.map((data) => {
                    return (
                      <CollectionItem>
                        {`From: ${data[1]}`}
                        <br />
                        <br />
                        {`Message: ${data[0]}`}
                      </CollectionItem>
                    );
                  })
                : commentsData.map((data) => {
                    return (
                      <CollectionItem>
                        {`From: ${data[1]}`}
                        <br />
                        <br />
                        {`Message: ${data[0]}`}
                      </CollectionItem>
                    );
                  })}
            </Collection>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col s12 m6 ">
            <Collection className="hoverable black-text ">
              <CollectionItem>
                <h3>Comments</h3>
              </CollectionItem>
              {commentsData.map((data) => {
                return (
                  <CollectionItem>
                    {`From: ${data[1]}`}
                    <br />
                    <br />
                    {`Message: ${data[0]}`}
                  </CollectionItem>
                );
              })}
            </Collection>
          </div>
          <div className="col s12 m6">
            <form onSubmit={sendToAdmins}>
              <Card
                style={{ marginRight: "0px" }}
                className="hoverable black-text"
                closeIcon={<Icon>close</Icon>}
                revealIcon={<Icon>more_vert</Icon>}
                textClassName="white-text"
                title={<h4 className="black-text">Send comments to admins:</h4>}
              >
                <div className="row">
                  <div className="col s12">
                    <div className="input-field">
                      <input
                        name="message"
                        onChange={handleCommentsChange}
                        id="message"
                        type="text"
                      />
                      <label htmlFor="message">Type your message here</label>
                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                      ></span>
                    </div>
                    <button
                      type="submit"
                      style={{ width: "100px" }}
                      className="btn waves-effect waves-light black yellow-text"
                    >
                      send <Icon right>send</Icon>
                    </button>
                  </div>
                </div>
              </Card>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
