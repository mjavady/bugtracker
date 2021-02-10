import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "./authContext";
import Cookies from "js-cookie";

const useForm = (validate) => {
  const context = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Normal",
  });
  const [valid, setValid] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [loginValid, setLoginValid] = useState({
    username: false,
    password: false,
  });

  const [login, setLogin] = useState(false);
  const [currentUser, setCurrent] = useState();
  let valErrors = {};

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);
  const [FormIsValidated, setFormIsValidated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    setErrors(RealTimeValidate(name, value));

    if (Object.keys(errors).length === 0) {
      setFormIsValidated(true);
    }
  };
  const postForm = async () => {
    try {
      const axiosConfig = {
        withCredentials: true,
      };
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/register",
        values,
        axiosConfig
      );
      if (res.data === true) {
        setDataSaved(true);
        setCurrent(values.username.toString());
        context.setCurrentUser(values.username);
        console.log("logged in >> redirecting");
        // window.location.reload(true);
        console.log(encodeURI(values.username));
        console.log(res);
        Cookies.set("username", values.username);
        context.login();
      } else if (res.data === "Already registered") {
        alert("A user with this username or email is already registered.");
      } else {
        alert(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postLogin = async () => {
    try {
      const loginValues = {
        username: values.username,
        password: values.password,
      };
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/login",
        loginValues,
        {
          withCredentials: true,
        }
      );
      if (res.data === true) {
        setDataSaved(true);
        setCurrent(values.username.toString());
        context.setCurrentUser(values.username);
        context.login();
        context.isLoggedIn = true;
        console.log("logged in >> redirecting");
        console.log(encodeURI(values.username));
        console.log(res);
        Cookies.set("username", values.username);
        // window.location.reload(true);
      } else {
        setDataSaved(false);
      }
    } catch (err) {
      console.log(err);
      alert(`Error>> You are not authorized. Please try to register first.`);
    }
  };
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    if (
      valid.username &&
      valid.password &&
      valid.email &&
      valid.confirmPassword
    ) {
      console.log("no error >> logging in");
      postForm();
    } else {
      let message = [];
      Object.keys(valid).map((key, index) => {
        if (!valid[key]) {
          return message.push(key);
        }
        return "";
      });
      alert(`Please complete the wrong field(s)! >> ${message.toString()}`);
    }
  };
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    if (valid.username && valid.password) {
      console.log("no error >> logging in");
      postLogin();
    } else {
      let message = [];
      Object.keys(loginValid).map((key, index) => {
        if (!valid[key]) {
          return message.push(key);
        }
        return "";
      });
      alert(`Please complete the wrong field(s)! >> ${message.join(" ")}`);
    }
  };

  const resetButton = () => {
    setValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  const loginPage = () => {
    setLogin(true);
  };
  const registerPage = () => {
    setLogin(false);
  };

  const RealTimeValidate = (name, value = values) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name === "username") {
      if (!value.trim()) {
        valErrors.username = "Username is required";
        setValid({ ...valid, username: false });
        setLoginValid({ ...valid, username: false });
      } else if (value.length < 5) {
        valErrors.username = "Username must be at least 4 characters long";
        setValid({ ...valid, username: false });
        setLoginValid({ ...valid, username: false });
      } else {
        setValid({ ...valid, username: true });
        setLoginValid({ ...valid, username: true });
      }
    }

    if (name === "email") {
      if (!value) {
        valErrors.email = "Email is required";
        setValid({ ...valid, email: false });
      } else if (!re.test(value)) {
        valErrors.email = "Email is not valid";
        setValid({ ...valid, email: false });
      } else {
        setValid({ ...valid, email: true });
      }
    }

    if (name === "password") {
      if (!value) {
        valErrors.password = "Password is required";
        setValid({ ...valid, password: false });
        setLoginValid({ ...valid, password: false });
      } else if (values.password.length < 7) {
        valErrors.password = "Password needs to be 8 characters or more";
        setValid({ ...valid, password: false });
        setLoginValid({ ...valid, password: false });
      } else {
        setValid({ ...valid, password: true });
        setLoginValid({ ...valid, password: true });
      }
    }
    if (name === "confirmPassword") {
      if (!value) {
        valErrors.confirmPassword = "Password is required";
        setValid({ ...valid, confirmPassword: false });
      } else if (value !== values.password) {
        valErrors.confirmPassword = "Passwords do not match";
        setValid({ ...valid, confirmPassword: false });
      } else {
        setValid({ ...valid, confirmPassword: true });
      }
    }
    setErrors(valErrors);
    return valErrors;
  };

  return {
    handleChange,
    values,
    handleRegisterSubmit,
    errors,
    isSubmitting,
    FormIsValidated,
    dataSaved,
    valid,
    resetButton,
    currentUser,
    loginPage,
    login,
    registerPage,
    handleLoginSubmit,
  };
};

export default useForm;
