import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const LeftMenu = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  let leftMenuContent;
  if (!isAuthenticated) {
    leftMenuContent = (
      <>
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            <Link to="/">Home</Link>
          </Menu.Item>
          <SubMenu title={<span>Blogs</span>}>
            <MenuItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <Menu.Item key="alipay">
            <a href="">Contact Us</a>
          </Menu.Item>
        </Menu>
      </>
    );
  } else {
    leftMenuContent = (
      <>
        <Menu mode="horizontal">
          <Menu.Item key="resume">
            <Link to="/resume">Your Resume</Link>
          </Menu.Item>
          <Menu.Item key="blog">
            <a href="">Blogs</a>
          </Menu.Item>
        </Menu>
      </>
    );
  }
  return <>{leftMenuContent}</>;
};
export default LeftMenu;
