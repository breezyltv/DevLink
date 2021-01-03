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
  Divider,
  PageHeader,
  Select
} from "antd";
import IconSkillItems from "../common/IconSkillList";
const { Title, Paragraph, Text } = Typography;

const { Option } = Select;
const AddProfile = () => {
  const history = useHistory();
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!"
    }
  };

  const profileStatus = [
    "Developer",
    "Junior Developer",
    "Senior Developer",
    "Manager",
    "Student or Learning",
    "Instructor or Teacher",
    "Intern",
    "Other"
  ];

  return (
    <Row>
      <Col span={16} offset={4}>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            history.push("/dashboard");
          }}
          title="Dashboard"
        />
        <Typography style={{ textAlign: "center" }}>
          <Title level={3}>Create A New Resume</Title>
          <Text>
            Get a Job-Winning Resume Template for Free! Stop Struggling with
            Word.
          </Text>
        </Typography>
        <Divider />
        <Form
          {...layout}
          name="nest-messages"
          onFinish={() => {}}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["resume", "name"]}
            label="Resume name"
            extra="A unique handle for resume URL, your full name, your company ect...(this CANNOT be changed later)."
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["resume", "status"]}
            label="Status"
            extra="Give us an idea of where you are in at career."
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              placeholder="Select professional status"
              onChange={value => console.log(value)}
              allowClear
            >
              {profileStatus.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={["resume", "company"]}
            label="Company"
            extra="Could be your own country or where you work for."
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["resume", "website"]}
            label="Website"
            extra="Your website or company website."
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["resume", "city"]}
            label="City"
            extra="City & State suggested (Ex. San Diego, CA) "
          >
            <Input />
          </Form.Item>

          <IconSkillItems setSelectedFrameworks={setSelectedFrameworks} />

          <Form.Item name={["resume", "introduction"]} label="Introduction">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddProfile;
