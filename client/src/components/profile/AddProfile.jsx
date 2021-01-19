import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { validateStatus } from "../../utils/util";
import { addProfile, clearErrors } from "../../actions/profileAction";
import {
  Form,
  Input,
  Button,
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
  const { loadingStatus } = useSelector(state => state.loading);
  const [showSocialOption, setShowSocialOption] = useState(false);
  const [cleanErrors, setCleanErrors] = useState({});
  const [errorStatus, setErrorStatus] = useState(false);

  const dispatch = useDispatch();

  //clear errors from redux store
  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  useEffect(() => {
    setCleanErrors({ ...errors });
  }, [errors]);

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
    const skills = {
      frameworks: getSkills(popFrameworkList[0].frameworks),
      languages: getSkills(popFrameworkList[0].languages),
      tools: getSkills(popFrameworkList[0].tools)
    };
    value.resume["skills"] = skills;
    console.log("all values", value.resume);

    //dispatch to add new resume
    dispatch(addProfile(value.resume, history));
    setErrorStatus(true);
  };

  const getSkills = skills => skills.filter(skill => skill.status === true);

  //removing error alert from backend when input has been on change
  const onInputChange = (value, type) => {
    if (value) {
      //hide error message for antd form
      cleanErrors[type] = undefined;
      setCleanErrors({ ...cleanErrors });
      if (errors.loginFailed) {
        errors.loginFailed = undefined;
      }
    }
  };

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
            name={["resume", "handle"]}
            label="Resume name"
            extra="A unique handle for resume URL, your full name, your company ect...(this CANNOT be changed later)."
            {...validateStatus(cleanErrors.handle, errorStatus)}
            rules={[{ required: true }]}
          >
            <Input onChange={value => onInputChange(value, "handle")} />
          </Form.Item>
          <Form.Item
            name={["resume", "status"]}
            label="Status"
            extra="Give us an idea of where you are in at career."
            {...validateStatus(cleanErrors.status, errorStatus)}
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
            name={["resume", "position"]}
            label="Job title"
            extra="Which position are you in? frontend, backend or fullstack web developer..."
          >
            <Input />
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
            {...validateStatus(cleanErrors.website, errorStatus)}
          >
            <Input onChange={value => onInputChange(value, "website")} />
          </Form.Item>
          <Form.Item
            name={["resume", "github"]}
            label="Your Github"
            extra="Show your repos"
            {...validateStatus(cleanErrors.github, errorStatus)}
          >
            <Input onChange={value => onInputChange(value, "github")} />
          </Form.Item>
          <Form.Item
            name={["resume", "city"]}
            label="City"
            extra="City & State suggested (Ex. San Diego, CA) "
          >
            <Input />
          </Form.Item>
          <Form.Item name={["resume", "bio"]} label="Introduction">
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
              <Form.Item
                name={["resume", "twitter"]}
                {...validateStatus(cleanErrors.twitter, errorStatus)}
              >
                <Input
                  placeholder="Twitter profile URL"
                  prefix={<TwitterOutlined />}
                  onChange={value => onInputChange(value, "twitter")}
                />
              </Form.Item>
              <Form.Item
                name={["resume", "facebook"]}
                {...validateStatus(cleanErrors.facebook, errorStatus)}
              >
                <Input
                  placeholder="facebook profile URL"
                  prefix={<FacebookOutlined />}
                  onChange={value => onInputChange(value, "facebook")}
                />
              </Form.Item>
              <Form.Item
                name={["resume", "linkedin"]}
                {...validateStatus(cleanErrors.linkedin, errorStatus)}
              >
                <Input
                  placeholder="Linkedin profile URL"
                  prefix={<LinkedinOutlined />}
                  onChange={value => onInputChange(value, "linkedin")}
                />
              </Form.Item>
              <Form.Item
                name={["resume", "instagram"]}
                {...validateStatus(cleanErrors.instagram, errorStatus)}
              >
                <Input
                  placeholder="Instagram profile URL"
                  prefix={<InstagramOutlined />}
                  onChange={value => onInputChange(value, "instagram")}
                />
              </Form.Item>
              <Form.Item
                name={["resume", "Youtube"]}
                prefix={<YoutubeOutlined />}
                {...validateStatus(cleanErrors.youtube, errorStatus)}
                onChange={value => onInputChange(value, "youtube")}
              >
                <Input
                  placeholder="Youtube profile URL"
                  prefix={<TwitterOutlined />}
                />
              </Form.Item>
            </Col>
          )}

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingStatus}
              block
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default React.memo(AddProfile);
