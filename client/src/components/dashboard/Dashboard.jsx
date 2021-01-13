import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileAction";
import { Typography, Divider, Button, Row, Col, Space } from "antd";
import { upperFirstChar } from "../../utils/util";
import {
  PlusCircleOutlined,
  PlusSquareOutlined,
  ProfileOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { Education } from "@styled-icons/zondicons";
const { Title, Paragraph, Text } = Typography;

const Dashboard = () => {
  //get current user
  const { isAuthenticated, user } = useSelector(state => state.auth);

  let fullName = "";

  if (isAuthenticated) {
    fullName =
      upperFirstChar(user.first_name) + " " + upperFirstChar(user.last_name);
  }
  const { loadingStatus } = useSelector(state => state.loading);
  const history = useHistory();

  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  let dashboardContent;

  if (profile == null || loadingStatus) {
    console.log("loading...");
  } else {
    //check if this user has any profile data
    if (Object.keys(profile).length > 0) {
      console.log("display data");
      //dashboardContent = profile;
      dashboardContent = (
        <>
          <Row>
            <Title level={4}>
              Welcome, <Link>{fullName}</Link>
            </Title>
          </Row>

          <Row>
            <Space>
              <Button
                type="primary"
                onClick={() => history.push("/add-profile")}
                icon={<PlusSquareOutlined />}
              >
                Add Resume
              </Button>
              <Button icon={<ProfileOutlined />}>Edit Profile</Button>
              <Button icon={<InfoCircleOutlined />}>Add Experience</Button>
              <Button icon={<Education size={12} />}>Add Education</Button>
            </Space>
          </Row>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <Divider />
          <Typography>
            <Title level={2}>OOP!</Title>
            <Paragraph>
              <Text strong>
                You have not created any resume yet. Please make some resumes!
              </Text>
            </Paragraph>
          </Typography>
          <Button
            type="primary"
            onClick={() => history.push("/add-profile")}
            icon={<PlusCircleOutlined />}
          >
            Add Resume
          </Button>
          <Divider />
        </>
      );
    }
  }

  return (
    <Row>
      <Col span={20} offset={2}>
        <Divider>
          <Title level={2}>Dashboard</Title>
        </Divider>
        <div className="site-layout-content">{dashboardContent}</div>
      </Col>
    </Row>
  );
};

export default Dashboard;
