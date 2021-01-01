import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Menu, Avatar, Image } from "antd";
import { logout } from "../../actions/authAction";
import { clearCurrentProfile } from "../../actions/profileAction";
import { useSelector, useDispatch } from "react-redux";
import { upperFirstChar } from "../../utils/util";
const RightMenu = () => {
  const dispatch = useDispatch();
  //get current user
  const { isAuthenticated, admin, user } = useSelector(state => state.auth);

  let fullName = "";

  if (isAuthenticated) {
    fullName =
      upperFirstChar(user.first_name) + " " + upperFirstChar(user.last_name);
  }

  useEffect(() => {
    //console.log("menu", isAuthenticated);
  }, []);

  const logoutUser = () => {
    //clear current profile
    dispatch(clearCurrentProfile());
    dispatch(logout());
  };

  const authMenu = (
    <Menu mode="horizontal">
      <Menu.Item key="account">
        {user.avatar ? (
          <Avatar src={<Image src={"https:" + user.avatar} />} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}{" "}
        {fullName}
      </Menu.Item>

      {admin && (
        <Menu.Item key="management" icon={<SettingOutlined />}>
          <Link onClick={logoutUser}>Management</Link>
        </Menu.Item>
      )}

      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link onClick={logoutUser}>Logout</Link>
      </Menu.Item>
    </Menu>
  );

  const guestMenu = (
    <Menu mode="horizontal">
      <Menu.Item key="mail" icon={<LoginOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );

  return <>{isAuthenticated ? authMenu : guestMenu}</>;
};
export default RightMenu;
