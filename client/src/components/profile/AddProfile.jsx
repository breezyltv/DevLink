import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
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
  Select,
  BackTop,
  Tag,
  Space
} from "antd";
import {
  PlusCircleOutlined,
  CloseCircleOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined
} from "@ant-design/icons";
import IconSkillItems from "../common/IconSkillList";
const { Title, Paragraph, Text } = Typography;

const { Option } = Select;
const AddProfile = () => {
  const history = useHistory();
  const popFrameworkList = useState({});
  const errors = useSelector(state => state.errors);
  const [showSocialOption, setShowSocialOption] = useState(false);

  useEffect(() => {}, []);

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

  const handleSubmitProfile = value => {
    console.log("form value", value);

    console.log("get frameworks: ", getSkills(popFrameworkList[0].frameworks));
  };

  const getSkills = skills => skills.filter(skill => skill.status === true);

  return (
    <Row>
      <BackTop />
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
          onFinish={handleSubmitProfile}
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
            name={["resume", "github"]}
            label="Your Github"
            extra="Show your repos"
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
          <Form.Item name={["resume", "introduction"]} label="Introduction">
            <Input.TextArea
              placeholder="Bio..."
              extra="Tell us about yourself"
            />
          </Form.Item>
          <Divider orientation="left">
            <Title level={4}>Skills:</Title>
          </Divider>
          <IconSkillItems popSkills={popFrameworkList} />
          <Row>
            <Col offset={4}>
              <Space>
                {!showSocialOption ? (
                  <Button
                    type="primary"
                    htmlType="showSkills"
                    icon={<PlusCircleOutlined />}
                    onClick={() => setShowSocialOption(true)}
                  >
                    Add Socials Link
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="showSkills"
                    icon={<CloseCircleOutlined />}
                    onClick={() => setShowSocialOption(false)}
                  >
                    Clear Socials Link
                  </Button>
                )}

                <Tag>Option</Tag>
              </Space>
              <Divider />
            </Col>
          </Row>
          {showSocialOption && (
            <Col offset={4}>
              <Form.Item name={["resume", "twitter"]}>
                <Input
                  placeholder="Twitter profile URL"
                  prefix={<TwitterOutlined />}
                />
              </Form.Item>
              <Form.Item name={["resume", "facebook"]}>
                <Input
                  placeholder="facebook profile URL"
                  prefix={<FacebookOutlined />}
                />
              </Form.Item>
              <Form.Item name={["resume", "linkedin"]}>
                <Input
                  placeholder="Linkedin profile URL"
                  prefix={<LinkedinOutlined />}
                />
              </Form.Item>
              <Form.Item name={["resume", "instagram"]}>
                <Input
                  placeholder="Instagram profile URL"
                  prefix={<InstagramOutlined />}
                />
              </Form.Item>
              <Form.Item name={["resume", "Youtube"]}>
                <Input
                  placeholder="Youtube profile URL"
                  prefix={<TwitterOutlined />}
                />
              </Form.Item>
            </Col>
          )}

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddProfile;
