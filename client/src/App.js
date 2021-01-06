import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { auth } from "./actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

import HeaderLayout from "./components/layouts/Header";
import FooterLayout from "./components/layouts/Footer";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import PrivateRoute from "./auth/PrivateRoute";
//import Home from "./components/layouts/Home";
const Home = lazy(() => import("./components/layouts/Home"));
//import Register from "./components/auth/Register";
const Register = lazy(() => import("./components/auth/Register"));
//import Login from "./components/auth/Login";

const Login = lazy(() => import("./components/auth/Login"));

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const AddProfile = lazy(() => import("./components/profile/AddProfile"));

const spinIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const { Content } = Layout;

function App() {
  //const history = useHistory();
  const { isAuthenticated, isLogout } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  //check current user and set current user data
  useEffect(() => {
    document.title = "DevLink";
    dispatch(auth());
  }, []);

  return (
    <Router>
      <Layout className="layout">
        <HeaderLayout />
        <Content style={{ padding: "0 60px" }}>
          <Suspense
            fallback={
              <Spin
                className="lazyContent"
                tip="Loading..."
                indicator={spinIcon}
              />
            }
          >
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {isAuthenticated ? (
              <>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                    isAuthenticated={isAuthenticated}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-profile"
                    component={AddProfile}
                    isAuthenticated={isAuthenticated}
                  />
                </Switch>
              </>
            ) : !isAuthenticated && isLogout ? (
              <Redirect to="/login" />
            ) : null}
          </Suspense>
        </Content>
        <FooterLayout />
      </Layout>
    </Router>
  );
}

export default App;
