export default function validateInfo(values) {
  let errors = {};

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!re.test(values.email)) {
    errors.email = "Email is not valid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password needs to be 8 characters or more";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }
  if (!values.creator) {
    errors.creator = "Creator is required";
  }

  return errors;
}
