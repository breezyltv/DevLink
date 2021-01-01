import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Form,
  Input,
  Checkbox,
  Button,
  AutoComplete,
  Row,
  Col,
  Typography,
  Divider
} from "antd";

const AddProfile = () => {
  return (
    <Row>
      <Col span={16} offset={4}>
        <Divider>
          <Typography.Title level={3}>Create A New Resume</Typography.Title>
        </Divider>
      </Col>
    </Row>
  );
};

export default AddProfile;
