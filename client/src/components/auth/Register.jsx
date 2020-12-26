import React, { useState } from "react";

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
      offset: 8
    }
  }
};

const Register = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onEmailChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ["@gmail.com", "@yahoo.com", "@hotmail.com"].map(
          domain => `${value}${domain}`
        )
      );
    }
  };

  const emailOptions = autoCompleteResult.map(email => ({
    label: email,
    value: email
  }));
  return (
    <Row>
      <Col span={16} offset={4}>
        <Divider>
          <Title level={3}>Sign Up</Title>
        </Divider>

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
          <Form.Item
            name="firstName"
            label={<span>First Name&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Please input your first name!",
                whitespace: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={<span>Last Name&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Please input your last name!",
                whitespace: true
              }
            ]}
          >
            <Input />
          </Form.Item>
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
              <Input />
            </AutoComplete>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
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
      </Col>
    </Row>
  );
};

export default Register;
