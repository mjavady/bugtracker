import { Button } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useState } from "react";
import { TextInput } from "react-materialize";
import { AuthContext } from "../../hooks/authContext";

function CommentForm(props) {
  const context = useContext(AuthContext);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  //   const [dataToBeSent, setDataToBeSent] = useState({
  //     comment: [],
  //     name: "",
  //   });
  //   const [prvComments, setPrvComments] = useState([]);
  //   const [data, setData] = useState([]);
  const [valid, setValid] = useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (!value) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const newComment = [values.title, values.description];
  const addNewComment = (event) => {
    event.preventDefault();
    props.newValue(newComment);
    props.forceUpdate();
    props.close();
    if (values.title || values.description) {
      setValid(true);
      postComment();
    } else {
      setValid(false);
    }
  };

  const postComment = async () => {
    try {
      const res = await Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/comments",
        {
          comment: newComment,
          projectID: props.projectID,
          creatorID: context.userData.username,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={addNewComment}>
      <h2>Write your comment</h2>
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginRight: "15px" }}
      >
        Add comment
      </Button>
    </form>
  );
}

export default CommentForm;
