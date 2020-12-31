import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import "./App.css";

import { logout, setCurrentUser } from "./actions/authAction";
import store from "./store/store";

import HeaderLayout from "./components/layouts/Header";
import FooterLayout from "./components/layouts/Footer";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import setAuthToken from "./utils/setAuthToken";
//import Home from "./components/layouts/Home";
const Home = lazy(() => import("./components/layouts/Home"));
//import Register from "./components/auth/Register";
const Register = lazy(() => import("./components/auth/Register"));
//import Login from "./components/auth/Login";
const Login = lazy(() => import("./components/auth/Login"));

const spinIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const { Content } = Layout;

//check if token is available and set it
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //decode to get current use data
  const currentUser = jwt_decode(localStorage.jwtToken);
  //set current user
  store.dispatch(setCurrentUser(currentUser));
  //check if token expired
  const currentTime = Date.now() / 1000;
  if (currentUser.exp < currentTime) {
    //logout user
    store.dispatch(logout());
    //redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
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
            </Suspense>
          </Content>
          <FooterLayout />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
