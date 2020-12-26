import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Layout, Button, Drawer } from "antd";
import logo from "../../img/looper.png";

const HeaderLayout = () => {
  const [visible, setVisible] = useState(false);

  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="">
          <img src={logo} width="70"></img>
        </a>
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
