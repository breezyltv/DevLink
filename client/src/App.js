import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import store from "./store/store";

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


const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout className="layout">
          <HeaderLayout />
          <Content style={{ padding: "0 60px" }}>
            <Suspense fallback={<Spin tip="Loading..." indicator={spinIcon} />}>
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
