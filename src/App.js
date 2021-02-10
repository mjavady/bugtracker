import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  Suspense,
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { AuthContext } from "./hooks/authContext";
import Axios from "axios";
import Cookies from "js-cookie";
import { DemoContext } from "./hooks/demoContext";
import { Preloader } from "react-materialize";
// import Register from "./components/Form/register";
// import Dashboard from "./components/pages/Dashboard";
// import Projects from "./components/pages/Projects";
// import NewNavbar from "./components/navbar/newNavbar";
// import NewFooter from "./components/navbar/NewFooter";
// import Home from "./components/pages/Home";
// import Logout from "./components/pages/logout";
// import LoggedOut from "./components/pages/loggedout";
// import NotFoundPage from "./components/pages/NotFoundPage";
// import Users from "./components/pages/Users";
// import Tickets from "./components/pages/Tickets";
// import Demo from "./components/pages/Demo";

const Register = React.lazy(() => import("./components/Form/register"));
const Dashboard = React.lazy(() => import("./components/pages/Dashboard"));
const Projects = React.lazy(() => import("./components/pages/Projects"));
const NewNavbar = React.lazy(() => import("./components/navbar/newNavbar"));
const NewFooter = React.lazy(() => import("./components/navbar/NewFooter"));
const Logout = React.lazy(() => import("./components/pages/logout"));
const Users = React.lazy(() => import("./components/pages/Users"));
const Tickets = React.lazy(() => import("./components/pages/Tickets"));
const Demo = React.lazy(() => import("./components/pages/Demo"));
const LoggedOut = React.lazy(() => import("./components/pages/loggedout"));
const NotFoundPage = React.lazy(() =>
  import("./components/pages/NotFoundPage")
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState(true);
  // const [ticketsData, setTicketsData] = useState();
  const context = useContext(DemoContext);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  const [page, setPage] = useState();
  const setCurrent = useCallback((currentPage) => {
    setPage(currentPage);
  }, []);
  /* eslint-disable no-unused-vars */
  const [user, setUser] = useState();
  const setCurrentUser = useCallback((currentUser) => {
    setUser(currentUser);
  }, []);
  /* eslint-disable no-unused-vars */
  let username;
  if (Cookies.get("username") !== undefined) {
    username = atob(Cookies.get("username"));
  }
  console.log(username);
  useEffect(() => {
    const checkAuth = async () => {
      const res = await Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/register",
        {
          params: {
            cookie: username,
          },
        },
        {
          withCredentials: true,
        }
      );
      setIsLoggedIn(res.data);
    };
    checkAuth();
    const fetchRole = async () => {
      const res = await Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/fetchinfo",
        {
          params: {
            username: username,
          },
        },
        {
          withCredentials: true,
        }
      );
      res.data.map((el) => {
        return setUserInfo(el);
      });
    };
    fetchRole();
  }, [username, isLoggedIn]);

  if (isLoggedIn === false) {
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        currentPage: page,
        setCurrent: setCurrent,
        setCurrentUser: setCurrentUser,
        userData: userInfo,
      }}
    >
      <DemoContext.Provider
        value={{
          username: "demo 1",
          role: "Admin",
          email: "demo@email.com",
          projects: [
            [
              "demoName 1",
              "demoDesc 1",
              "demoCreator 1",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 2",
              "demoDesc 2",
              "demoCreator 2",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 3",
              "demoDesc 3",
              "demoCreator 3",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 4",
              "demoDesc 4",
              "demoCreator 4",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 5",
              "demoDesc 5",
              "demoCreator 5",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 6",
              "demoDesc 6",
              "demoCreator 6",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 7",
              "demoDesc 7",
              "demoCreator 7",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 8",
              "demoDesc 8",
              "demoCreator 8",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 9",
              "demoDesc 9",
              "demoCreator 9",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 10",
              "demoDesc 10",
              "demoCreator 10",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 11",
              "demoDesc 11",
              "demoCreator 11",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
          ],
          tickets: [
            [
              "demoName 1",
              "demoDesc 1",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 1",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 2",
              "demoDesc 2",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 2",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 3",
              "demoDesc 3",
              "Error",
              "High",
              "On progress",
              "demoCreator 3",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 4",
              "demoDesc 4",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 4",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 5",
              "demoDesc 5",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 5",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 6",
              "demoDesc 6",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 6",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 7",
              "demoDesc 7",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 7",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 8",
              "demoDesc 8",
              "Unknown",
              "low",
              "done",
              "demoCreator 8",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 9",
              "demoDesc 9",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 9",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 10",
              "demoDesc 10",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 10",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 11",
              "demoDesc 11",
              "Error",
              "High",
              "Pending",
              "demoCreator 11",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
          ],
          comments: [
            ["Demo title 1", "Demo description 1", "Demo creator 1"],
            ["Demo title 2", "Demo description 2", "Demo creator 2"],
            ["Demo title 3", "Demo description 3", "Demo creator 3"],
            ["Demo title 4", "Demo description 4", "Demo creator 4"],
            ["Demo title 5", "Demo description 5", "Demo creator 5"],
            ["Demo title 6", "Demo description 6", "Demo creator 6"],
            ["Demo title 7", "Demo description 7", "Demo creator 7"],
            ["Demo title 8", "Demo description 8", "Demo creator 8"],
            ["Demo title 9", "Demo description 9", "Demo creator 9"],
            ["Demo title 10", "Demo description 10", "Demo creator 10"],
          ],
          users: [
            ["Demo user 1", "Demo Admin 1"],
            ["Demo user 2", "Demo Developer 2"],
            ["Demo user 3", "Demo Normal 3"],
            ["Demo user 4", "Demo Admin 4"],
            ["Demo user 5", "Demo Developer 5"],
            ["Demo user 6", "Demo Normal 6"],
            ["Demo user 7", "Demo Admin 7"],
          ],
        }}
      >
        <Suspense
          fallback={
            <div className="center">
              <Preloader active color="blue" flashing className="col s4" />
            </div>
          }
        >
          <Router>
            <Switch>
              <Route path="/" exact>
                <LoggedOut />
              </Route>
              <Route path="/demo" exact>
                <Demo />
              </Route>
              <Route path="/register" exact>
                <Register login={false} />
              </Route>
              <Route path="/login" exact>
                <Register login={true} />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
              <Redirect to="/" path="/" />
            </Switch>
          </Router>
        </Suspense>
      </DemoContext.Provider>
    </AuthContext.Provider>;
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        currentPage: page,
        setCurrent: setCurrent,
        setCurrentUser: setCurrentUser,
        userData: userInfo,
      }}
    >
      <DemoContext.Provider
        value={{
          username: "demo 1",
          role: "Admin",
          email: "demo@email.com",
          projects: [
            [
              "demoName 1",
              "demoDesc 1",
              "demoCreator 1",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 2",
              "demoDesc 2",
              "demoCreator 2",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 3",
              "demoDesc 3",
              "demoCreator 3",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 4",
              "demoDesc 4",
              "demoCreator 4",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 5",
              "demoDesc 5",
              "demoCreator 5",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 6",
              "demoDesc 6",
              "demoCreator 6",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 7",
              "demoDesc 7",
              "demoCreator 7",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 8",
              "demoDesc 8",
              "demoCreator 8",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 9",
              "demoDesc 9",
              "demoCreator 9",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 10",
              "demoDesc 10",
              "demoCreator 10",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
            [
              "demoName 11",
              "demoDesc 11",
              "demoCreator 11",
              <button className="btn waves-effect waves-light black yellow-text">
                More details
              </button>,
            ],
          ],
          tickets: [
            [
              "demoName 1",
              "demoDesc 1",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 1",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 2",
              "demoDesc 2",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 2",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 3",
              "demoDesc 3",
              "Error",
              "High",
              "On progress",
              "demoCreator 3",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 4",
              "demoDesc 4",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 4",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 5",
              "demoDesc 5",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 5",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 6",
              "demoDesc 6",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 6",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 7",
              "demoDesc 7",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 7",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 8",
              "demoDesc 8",
              "Unknown",
              "low",
              "done",
              "demoCreator 8",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 9",
              "demoDesc 9",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 9",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 10",
              "demoDesc 10",
              "Bug",
              "Medium",
              "Pending",
              "demoCreator 10",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
            [
              "demoName 11",
              "demoDesc 11",
              "Error",
              "High",
              "Pending",
              "demoCreator 11",
              <button className="btn waves-effect waves-light black yellow-text">
                click to modify
              </button>,
            ],
          ],
          comments: [
            ["Demo title 1", "Demo description 1", "Demo creator 1"],
            ["Demo title 2", "Demo description 2", "Demo creator 2"],
            ["Demo title 3", "Demo description 3", "Demo creator 3"],
            ["Demo title 4", "Demo description 4", "Demo creator 4"],
            ["Demo title 5", "Demo description 5", "Demo creator 5"],
            ["Demo title 6", "Demo description 6", "Demo creator 6"],
            ["Demo title 7", "Demo description 7", "Demo creator 7"],
            ["Demo title 8", "Demo description 8", "Demo creator 8"],
            ["Demo title 9", "Demo description 9", "Demo creator 9"],
            ["Demo title 10", "Demo description 10", "Demo creator 10"],
          ],
          users: [
            ["Demo user 1", "Demo Admin 1"],
            ["Demo user 2", "Demo Developer 2"],
            ["Demo user 3", "Demo Normal 3"],
            ["Demo user 4", "Demo Admin 4"],
            ["Demo user 5", "Demo Developer 5"],
            ["Demo user 6", "Demo Normal 6"],
            ["Demo user 7", "Demo Admin 7"],
          ],
        }}
      >
        <Suspense
          fallback={
            <div className="center">
              <Preloader active color="blue" flashing className="col s4" />
            </div>
          }
        >
          {isLoggedIn && <NewNavbar username={username} />}
          <main className={isLoggedIn && "main"}>
            <Router>
              <Switch>
                <Route path="/dashboard" exact>
                  {isLoggedIn ? (
                    <Dashboard
                      demo={{
                        username: context.username,
                        role: context.role,
                        email: context.email,
                        projects: context.projects,
                        tickets: context.tickets,
                        comments: context.comments,
                        users: context.users,
                      }}
                      role={userInfo.role}
                      username={username}
                    />
                  ) : (
                    <LoggedOut />
                  )}
                </Route>
                <Route path="/" exact>
                  <LoggedOut />
                </Route>
                <Route path="/projects" exact>
                  {isLoggedIn ? (
                    <Projects role={userInfo.role} />
                  ) : (
                    <LoggedOut />
                  )}
                </Route>
                <Route path="/profile" exact>
                  {isLoggedIn ? (
                    <Users role={userInfo.role} name={username} />
                  ) : (
                    <LoggedOut />
                  )}
                </Route>
                <Route path="/tickets" exact>
                  {isLoggedIn ? <Tickets /> : <LoggedOut />}
                </Route>
                <Route path="/logout" exact>
                  <Logout />
                </Route>
                <Route path="/demo" exact>
                  <Demo />
                </Route>
                <Route path="/register" exact>
                  {!isLoggedIn ? (
                    <Register login={false} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )}
                </Route>
                <Route path="/login" exact>
                  {!isLoggedIn ? (
                    <Register login={true} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )}
                </Route>
                <Route>
                  <NotFoundPage />
                </Route>
                <Redirect to="/" path="/" />
              </Switch>
            </Router>
          </main>
          {isLoggedIn && (
            <footer>
              <NewFooter />
            </footer>
          )}
        </Suspense>
      </DemoContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
