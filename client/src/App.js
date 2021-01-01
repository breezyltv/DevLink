import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch
} from "react-router-dom";
import { auth } from "./actions/authAction";
import { Provider } from "react-redux";
import "./App.css";

import store from "./store/store";

import PrivateRoute from "./components/auth/PrivateRoute";
import HeaderLayout from "./components/layouts/Header";
import FooterLayout from "./components/layouts/Footer";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
//import Home from "./components/layouts/Home";
const Home = lazy(() => import("./components/layouts/Home"));
//import Register from "./components/auth/Register";
const Register = lazy(() => import("./components/auth/Register"));
//import Login from "./components/auth/Login";
const Login = lazy(() => import("./components/auth/Login"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const spinIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const { Content } = Layout;

function App() {
  const history = useHistory();
  //check current user and set current user data
  useEffect(() => {
    document.title = "DevLink";
    store.dispatch(auth(history));
  }, []);

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
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </Suspense>
          </Content>
          <FooterLayout />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
