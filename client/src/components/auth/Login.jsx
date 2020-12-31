import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Divider,
  Typography,
  AutoComplete
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { validateStatus, domains } from "../../utils/util";
import { login } from "../../actions/authAction";

const Login = () => {
  const { Title } = Typography;

  const [errorStatus, setErrorStatus] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  //get errors from backend by redux store
  const errors = useSelector(state => state.errors);
  const auth = useSelector(state => state.auth);
  const [cleanErrors, setCleanErrors] = useState({});
  const { loadingStatus } = useSelector(state => state.loading);
  useEffect(() => {
    setCleanErrors({ ...errors });

    //check if user already logged
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
  }, [auth, errors]);

  const onFinish = userData => {
    //dispatch to login
    dispatch(login(userData));
    //set error status to display errors if input is invalid
    setErrorStatus(true);
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
      //hide error message for antd form
      cleanErrors[type] = undefined;
      setCleanErrors({ ...cleanErrors });
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
          <Form.Item
            name="email"
            hasFeedback
            //for displaying errors from backend
            {...validateStatus(cleanErrors.email, errorStatus)}
            //validateStatus={errors.email && errorStatus ? "error" : ""}
            //help={errorStatus ? errors.email : ""}
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

          <Form.Item
            name="password"
            hasFeedback
            //for displaying errors from backend
            {...validateStatus(cleanErrors.password, errorStatus)}
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
              loading={loadingStatus}
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
