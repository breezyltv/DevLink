import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import store from "./store/store";

import HeaderLayout from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import FooterLayout from "./components/layouts/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Layout } from "antd";
const { Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout className="layout">
          <HeaderLayout />
          <Content style={{ padding: "0 60px" }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Content>
          <FooterLayout />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
