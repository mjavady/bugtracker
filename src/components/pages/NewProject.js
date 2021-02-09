import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { TextInput } from "react-materialize";
import axios from "axios";
import useHistory from "../../hooks/history";
import { AuthContext } from "../../hooks/authContext";

function NewProject(props) {
  const context = useContext(AuthContext);
  const { recordHistory } = useHistory();
  const [values, setValues] = useState({
    name: props.previousValues.name,
    description: props.previousValues.description,
    creator: context.userData.username,
  });
  const [valid, setValid] = useState(true);
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
    });
  };
  const postForm = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/projects",
        values
      );
      if (res.data === true) {
        // alert("success");
        recordHistory("New project created");
        window.location.reload(true);
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const patchUpdate = async () => {
    try {
      const res = await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "/projects",
        values,
        {
          params: {
            name: props.previousValues.name,
          },
        }
      );
      if (res.data === true) {
        // alert("success");
        recordHistory(
          `Project ${props.previousValues.name} updated to ${values.name}`
        );
        window.location.reload();
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // setErrors(validate(values));
    if (props.toUpdate) {
      if (values.name && values.description) {
        setValid(true);
        patchUpdate();
      } else {
        setValid(false);
      }
    } else {
      if (values.name && values.description) {
        setValid(true);
        postForm();
      } else {
        setValid(false);
      }
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div
          style={{ maxWidth: "40rem" }}
          className="container form-card center col s10 m6"
        >
          <div className="card gray darken-8 z-depth-3">
            <div className="card-content">
              <TextInput
                error="Field cannot be blank"
                name="name"
                onChange={handleChange}
                label="Project name"
                value={values.name}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewProject;
