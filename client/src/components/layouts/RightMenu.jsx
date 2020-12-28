import React from "react";
import { Link } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import { Menu, Icon } from "antd";
const RightMenu = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/register">Register </Link>
      </Menu.Item>
    </Menu>
  );
};
export default RightMenu;
