import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@material-ui/core";
import "./App.css";
import Dashboard from "./page/Dashboard/Dashboard";
import Main from "./components/RightPanels/Dashboard/Main";
import SocialPage from "./components/RightPanels/SocialPage/SocialPage";
import Login from "./page/Auth/Login/Login";
import Project from "./components/RightPanels/Project/Project";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NO_MESSAGE } from "./store/actions/message";
import { USER_STATUS_IN } from "./store/actions/user";
import PrivateRoutes from "./PrivateRoutes";
import Stock from "./components/RightPanels/Stocks/Stocks";

function App() {
  const msg = useSelector((state) => state.Message.msg);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(USER_STATUS_IN());
  }, []);
  useEffect(() => {
    if (msg) {
      if (msg.status === "success") {
        toast.success(msg.title, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (msg.status === "error") {
        toast.error(msg.title, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (msg.status === "info") {
        toast.info(msg.title, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (msg.status === "warning") {
        toast.warn(msg.title, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      dispatch(NO_MESSAGE());
    }
  }, [msg]);
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <Switch>
          <PrivateRoutes path="/dashboard/project">
            <Dashboard content={<Project />} />
          </PrivateRoutes>
          <PrivateRoutes path="/dashboard/stocks">
            <Dashboard content={<Stock />} />
          </PrivateRoutes>
          <PrivateRoutes path="/social-media/:name">
            <Dashboard content={<SocialPage />} />
          </PrivateRoutes>
          <PrivateRoutes path="/dashboard">
            <Dashboard content={<Main />} />
          </PrivateRoutes>
          <Route path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
