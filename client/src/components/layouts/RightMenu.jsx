import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
const RightMenu = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail">
        <Link to="/signin">Signin</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/register">Signup </Link>
      </Menu.Item>
    </Menu>
  );
};
export default RightMenu;
