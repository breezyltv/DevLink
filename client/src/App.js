import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import HeaderLayout from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import FooterLayout from "./components/layouts/Footer";
import Register from "./components/auth/Register";
import SignIn from "./components/auth/SignIn";
import { Layout } from "antd";
const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <HeaderLayout />
        <Content style={{ padding: "0 60px" }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={SignIn} />
        </Content>
        <FooterLayout />
      </Layout>
    </Router>
  );
}

export default App;
