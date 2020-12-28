import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Divider,
  Typography,
  AutoComplete,
  Alert
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { domains } from "../../utils/util";

const Login = () => {
  const [errors, setErrors] = useState({});
  const { Title } = Typography;
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onEmailChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(domains.map(domain => `${value}${"@" + domain}`));
    }
  };

  const emailOptions = autoCompleteResult.map(email => ({
    label: email,
    value: email
  }));

  //removing error alert from backend when input has been on change
  const onInputChange = (value, type) => {
    if (value) {
      errors[type] = null;
      setErrors({ ...errors });
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <Divider>
          <Title level={3}>Log In</Title>
        </Divider>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          {errors.email && (
            <Alert message={errors.email} type="error" showIcon />
          )}
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your email!"
              }
            ]}
          >
            <AutoComplete options={emailOptions} onChange={onEmailChange}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
                onChange={value => onInputChange(value, "email")}
              />
            </AutoComplete>
          </Form.Item>
          {errors.password && (
            <Alert message={errors.password} type="error" showIcon />
          )}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={value => onInputChange(value, "password")}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>{" "}
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
