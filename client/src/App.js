import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { auth } from "./actions/authAction";
import { setLoadingAuth } from "./actions/loadingAction";

import { useSelector, useDispatch } from "react-redux";
import "./App.css";

import HeaderLayout from "./components/layouts/Header";
import FooterLayout from "./components/layouts/Footer";

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
  const { isAuthenticated } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const { loadingAuth } = useSelector(state => state.loading);

  //check current user and set current user data
  useEffect(() => {
    document.title = "DevLink";
    dispatch(auth());
  }, []);

  useEffect(() => {
    setIsLoadingAuth(loadingAuth);
  }, [loadingAuth]);

  let homeContent;

  if (isLoadingAuth) {
    homeContent = (
      <Spin className="lazyContent" tip="Loading..." indicator={spinIcon} />
    );
  } else {
    homeContent = (
      <>
        <Content style={{ padding: "0 60px" }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
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
        </Content>
      </>
    );
  }

  return (
    <Router>
      <Layout className="layout">
        <Suspense
          fallback={
            <Spin
              className="lazyContent"
              tip="Loading..."
              indicator={spinIcon}
            />
          }
        >
          <HeaderLayout />
          {homeContent}
          <FooterLayout />
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
