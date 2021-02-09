import React, { useContext, useState } from "react";
import axios from "axios";
import { Icon, Modal, Select, TextInput } from "react-materialize";
import { Button } from "@material-ui/core";
import useHistory from "../../hooks/history";
import { AuthContext } from "../../hooks/authContext";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
// import "filepond/dist/filepond.min.css";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

function NewTicket(props) {
  const context = useContext(AuthContext);
  registerPlugin(
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode
  );
  // const styles = {
  //   maxW
  // }
  const [file, setFile] = useState({
    files: [
      {
        source: "index.html",
        options: {
          type: "local",
        },
      },
    ],
  });
  const { recordHistory } = useHistory();
  const {
    title,
    description,
    type,
    priority,
    status,
    update,
  } = props.previousValues;
  const [values, setValues] = useState({
    creator: context.userData.username,
    date: new Date(),
    update: update,
    projectID: props.pID,
    projectName: props.name,
    title: title,
    description: description,
    type: type,
    priority: priority,
    status: status,
    attachment: {},
  });
  const [valid, setValid] = useState(true);
  // const [isSaved, setIsSaved] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!value) {
      setValid(false);
    } else {
      setValid(true);
    }
    setValues({
      ...values,
      [name]: value,
      projectID: props.pID,
    });
  };
  // useEffect(() => {
  //   // if (Object.values(props.previousValues)) {
  //   // setValues(newValues);
  //   // }
  // }, []);
  const postTicket = async () => {
    try {
      const resTicket = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/ticket?title=${props.previousValues.title}`,
        values,
        {
          params: {
            file: file,
          },
        }
      );
      if (resTicket.data === true) {
        alert("success");
        // setIsSaved(true);
        recordHistory("New ticket (" + values.title + ") saved", props.pID);
        window.location.reload(true);
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // setErrors(validate(values));
    setValues({
      ...values,
      projectID: props.pID,
    });
    if (values.title && values.description) {
      postTicket();
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const deleteTicketHandler = async () => {
    const data = { title: props.previousValues.title };
    try {
      const resTicket = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + "/ticket",
        {
          data,
        }
      );
      if (resTicket.data === true) {
        alert("success");
        recordHistory(
          "A ticket (" + props.previousValues.title + ") was deleted",
          props.pID || props.previousValues.projectID
        );
        window.location.reload();
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="center" style={{ marginBottom: "25px" }}>
        Ticket for "{props.name || props.previousValues.projectName}"
      </h1>

      <form onSubmit={submitHandler}>
        <div style={{ maxWidth: "40rem" }} className="container form-card">
          <div className="card gray darken-8 z-depth-3">
            <div className="card-content">
              <TextInput
                error="Field cannot be blank"
                name="title"
                onChange={handleChange}
                label="Title"
                value={values.title}
                className={`${!valid && !values.name && "invalid"}`}
              />
              <TextInput
                name="description"
                onChange={handleChange}
                label="Description"
                value={values.description}
                error="Field cannot be blank"
                className={`${!valid && !values.description && "invalid"}`}
              />
              <Select
                icon={<Icon>format_list_bulleted</Icon>}
                name="type"
                // label="Type"
                id="Select-9"
                onChange={handleChange}
                multiple={false}
                options={{
                  classes: "",
                  dropdownOptions: {
                    alignment: "left",
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250,
                  },
                }}
                value={type}
              >
                <option disabled value="">
                  Type
                </option>
                <option name="type" value="Bug">
                  Bug
                </option>
                <option name="type" value="Error">
                  Error
                </option>
                <option name="type" value="Unknown">
                  Unknown
                </option>
              </Select>
              <Select
                icon={<Icon>priority_high</Icon>}
                // label="Priority"
                id="Select-9"
                name="priority"
                multiple={false}
                onChange={handleChange}
                options={{
                  classes: "",
                  dropdownOptions: {
                    alignment: "left",
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250,
                  },
                }}
                value={priority}
              >
                <option disabled value="">
                  Priority
                </option>
                <option name="priority" value="High">
                  High
                </option>
                <option name="priority" value="Medium">
                  Medium
                </option>
                <option name="priority" value="Low">
                  Low
                </option>
              </Select>
              <Select
                icon={<Icon>hourglass_empty</Icon>}
                id="Select-9"
                // label="Status"
                multiple={false}
                name="status"
                onChange={handleChange}
                options={{
                  classes: "",
                  dropdownOptions: {
                    alignment: "left",
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250,
                  },
                }}
                value={status}
              >
                <option disabled value="">
                  Status
                </option>
                <option name="status" value="On progress">
                  On progress
                </option>
                <option name="status" value="Pending">
                  Pending
                </option>
                <option name="status" value="Done">
                  Done
                </option>
              </Select>
              <div>
                <FilePond
                  className="filepond"
                  // ref={(ref) => (this.pond = ref)}
                  // files={this.state.files}
                  allowMultiple={true}
                  maxFiles={3}
                  onupdatefiles={(fileItems) => {
                    setFile({
                      files: fileItems.map((fileItem) => fileItem.file),
                    });
                  }}
                ></FilePond>
                {/* <input
                  name="attachment"
                  onChange={handleChange}
                  label="Choose a file"
                  type="file"
                  className="filepond"
                /> */}
              </div>
              <Button
                style={{
                  marginTop: "40px",
                }}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                {update ? "Modify" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Modal
        className="modal"
        actions={[
          <>
            <button
              style={{ marginRight: "15px" }}
              className="btn red modal-close"
              onClick={deleteTicketHandler}
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
          update && (
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
            >
              Delete this ticket
            </Button>
          )
        }
      ></Modal>
    </div>
  );
}

export default NewTicket;
