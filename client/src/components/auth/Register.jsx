import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { domains } from "../../utils/util";
import { registerUser } from "../../actions/authAction";
import {
  Form,
  Input,
  Checkbox,
  Button,
  AutoComplete,
  Row,
  Col,
  Typography,
  Divider,
  Alert
} from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 18
    },
    sm: {
      span: 6
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 6
    }
  }
};

const Register = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  //get errors from redux store
  const getErrors = useSelector(state => state.errors);

  useEffect(() => {
    //set errors when errors has been changed from backend
    setErrors(getErrors);
  }, [getErrors]);

  const onFinish = registerData => {
    console.log("Received values of form: ", registerData);
    //dispatch a action
    dispatch(registerUser(registerData));
  };

  //removing error alert from backend when input has been on change
  const onInputChange = (value, type) => {
    if (value) {
      errors[type] = null;
      setErrors({ ...errors });
    }
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
  return (
    <Row>
      <Col span={16} offset={4}>
        <Divider></Divider>
        <Col span={16} offset={6}>
          <Title level={3}>Register</Title>
        </Col>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "86"
          }}
          scrollToFirstError
        >
          {errors.first_name && (
            <Col span={16} offset={6}>
              <Alert message={errors.first_name} type="error" showIcon />
            </Col>
          )}

          <Form.Item
            name="first_name"
            label={<span>First Name&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Please input your first name!",
                whitespace: true
              },
              {
                min: 2,
                message: "First Name must be at least 2 characters"
              },
              {
                max: 30,
                message: "First Name cannot be longer than 30 characters"
              }
            ]}
          >
            <Input onChange={value => onInputChange(value, "first_name")} />
          </Form.Item>
          {errors.last_name && (
            <Col span={16} offset={6}>
              <Alert message={errors.last_name} type="error" showIcon />
            </Col>
          )}
          <Form.Item
            name="last_name"
            label={<span>Last Name&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Please input your last name!",
                whitespace: true
              },
              {
                min: 2,
                message: "Last Name must be at least 2 characters"
              },
              {
                max: 30,
                message: "Last Name cannot be longer than 30 characters"
              }
            ]}
          >
            <Input onChange={value => onInputChange(value, "last_name")} />
          </Form.Item>

          {errors.email && (
            <Col span={16} offset={6}>
              <Alert message={errors.email} type="error" showIcon />
            </Col>
          )}

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]}
          >
            <AutoComplete options={emailOptions} onChange={onEmailChange}>
              <Input onChange={value => onInputChange(value, "email")} />
            </AutoComplete>
          </Form.Item>
          {errors.password && (
            <Col span={16} offset={6}>
              <Alert message={errors.password} type="error" showIcon />
            </Col>
          )}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              },
              {
                min: 6,
                message: "Password must be at least 6 characters"
              },
              {
                max: 30,
                message: "Password cannot be longer than 30 characters"
              }
            ]}
            hasFeedback
          >
            <Input.Password
              onChange={value => onInputChange(value, "password")}
            />
          </Form.Item>
          {errors.confirm_password && (
            <Col span={16} offset={6}>
              <Alert message={errors.confirm_password} type="error" showIcon />
            </Col>
          )}
          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!"
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement")
              }
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <Divider></Divider>
      </Col>
    </Row>
  );
};

export default Register;
