import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Button, Drawer } from "antd";
import logo from "../../img/looper.png";

const HeaderLayout = () => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="menuBar">
      <div className="logo">
        <Link to="/">
          <img src={logo}></img>
          <span className="title">DevLink</span>
        </Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button
          className="barsMenu"
          type="primary"
          onClick={() => setVisible(true)}
        >
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
};

export default HeaderLayout;
