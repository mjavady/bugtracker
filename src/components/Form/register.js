import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./register.css";
import validate from "./validateInfo";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../hooks/authContext";
import { Icon } from "react-materialize";
import Dashboard from "../pages/Dashboard";
import Login from "./Login";
import { Link, Redirect } from "react-router-dom";

// import NewNavbar from "../navbar/newNavbar";

function Register(props) {
  const {
    handleChange,
    values,
    handleRegisterSubmit,
    errors,
    valid,
    resetButton,
    currentUser,
  } = useForm(validate);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const context = useContext(AuthContext);
  useEffect(() => {
    // const checkAuth = async () => {
    //   const res = await axios.get(
    //     process.env.REACT_APP_BACKEND_URL + "/register",
    //     {
    //       withCredentials: true,
    //     }
    //   );
    // };
    // checkAuth();
  }, []);
  const username = Cookies.get("username");
  if (decodeURI(username) === context.userData.username) {
    setIsAuthenticated(true);
  }

  context.setCurrentUser(currentUser);
  if (isAuthenticated) {
    context.login();
    context.setCurrent("dashboard");
  }
  return (
    <div className="page-bg center">
      {!isAuthenticated ? (
        <div className="container form-card ">
          <div className="card gray darken-8 z-depth-3">
            <div className="card-content">
              {!props.login ? (
                <>
                  <p className="card-title center">
                    <h4>Register</h4>
                  </p>
                  <div>
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="input-field">
                        <input
                          autoFocus
                          onChange={handleChange}
                          type="text"
                          id="first_name"
                          name="username"
                          value={values.username}
                          className={
                            errors.username &&
                            `${valid.username ? "valid" : "invalid"}`
                          }
                        />
                        <label for="username">Username</label>
                        <span
                          className="helper-text"
                          data-error={errors.username}
                        />
                      </div>
                      <div className="input-field">
                        <input
                          onChange={handleChange}
                          type="email"
                          id="email"
                          name="email"
                          value={values.email}
                          className={
                            errors.email &&
                            `${valid.email ? "valid" : "invalid"}`
                          }
                        />
                        <label for="email">Email</label>
                        <span
                          className="helper-text"
                          data-error={errors.email}
                        />
                      </div>
                      <div className="input-field">
                        <input
                          onChange={handleChange}
                          type="password"
                          id="password"
                          name="password"
                          value={values.password}
                          className={
                            errors.password &&
                            `${valid.password ? "valid" : "invalid"}`
                          }
                        />
                        <label for="password">Password</label>
                        <span
                          className="helper-text"
                          data-error={errors.password}
                        />
                      </div>
                      <div className="input-field">
                        <input
                          onChange={handleChange}
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          className={
                            errors.confirmPassword &&
                            `${valid.confirmPassword ? "valid" : "invalid"}`
                          }
                        />
                        <label for="confirmPassword">Confirm Password</label>
                        <span
                          className="helper-text"
                          data-error={errors.confirmPassword}
                        />
                      </div>
                      <button
                        className="btn waves-effect black yellow-text"
                        type="submit"
                        // disabled={errors.length === 0 ? false : true}
                      >
                        Submit <Icon className="right">send</Icon>
                      </button>
                      <button
                        type="button"
                        onClick={resetButton}
                        className="btn white"
                        style={{ marginLeft: "15px" }}
                        // disabled={errors.length === 0 ? false : true}
                      >
                        Reset
                      </button>
                      <p style={{ textAlign: "center", marginTop: "25px" }}>
                        To see demo click <a href="/demo">Here</a>
                      </p>
                      <p style={{ textAlign: "center" }}>
                        Have an account? <Link to="/login">Login</Link>
                      </p>
                    </form>
                  </div>
                  {/* {context.isLoggedIn && <Redirect to="dashboard" />} */}
                </>
              ) : (
                <>
                  <Login />
                  <div className="center">
                    New user? <Link to="/register">Register</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default Register;

// <Paper>
//         <div className="row form">
//           <h1>Registration</h1>
//           <div className="col-sm-8">
//             <form method="POST" onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="text">
//                   Username
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="username"
//                   value={values.username}
//                   onChange={handleChange}
//                   autoFocus
//                 />
//                 {errors.username && <p>{errors.username}</p>}
//               </div>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="email">
//                   Email
//                 </label>
//                 <input
//                   className="form-control"
//                   type="email"
//                   name="email"
//                   value={values.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && <p>{errors.email}</p>}
//               </div>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="password">
//                   Password
//                 </label>
//                 <input
//                   className="form-control"
//                   type="password"
//                   name="password"
//                   value={values.password}
//                   onChange={handleChange}
//                 />
//                 {errors.password && <p>{errors.password}</p>}
//               </div>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="confirmPassword">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   className="form-control"
//                   type="password"
//                   name="confirmPassword"
//                   value={values.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
//               </div>
//               <Button type="submit">Submit</Button>
//             </form>
//           </div>
//         </div>
//       </Paper>
