import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getAdminProfile } from "../../actions/profileAction";
import { upperFirstChar, randomChoice } from "../../utils/util";
import {
  Typography,
  Divider,
  Button,
  Row,
  Col,
  Space,
  Avatar,
  Image,
  Tag,
  Progress,
  Skeleton,
  Timeline
} from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  UserOutlined,
  ExperimentOutlined
} from "@ant-design/icons";
import DynamicIconComp from "../common/DynamicIconComp";

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { profile_admin, loading } = useSelector(state => state.profile);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("menu", isAuthenticated);
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(getAdminProfile());
  }, []);

  const randomColor = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple"
  ];

  let aboutMe;

  if (profile_admin === null || loading) {
    aboutMe = <Skeleton avatar active paragraph={{ rows: 5 }} />;
  } else {
    aboutMe = (
      <>
        <Row>
          <Col span={18}>
            <Space direction="vertical">
              <div className="resume-name">
                <Title level={2}>
                  {profile_admin.user.first_name.toUpperCase() +
                    " " +
                    profile_admin.user.last_name.toUpperCase()}
                </Title>
              </div>
              <div className="resume-tagline">
                <Text>
                  {profile_admin && upperFirstChar(profile_admin.status)}
                </Text>
              </div>
              <div className="resume-tagline">
                <Text>Full-stack web developer</Text>
              </div>
            </Space>
          </Col>

          <Col span={6}>
            <div className="resume-contact">
              <Space direction="vertical">
                <Text>
                  <PhoneOutlined /> 858-465-9011
                </Text>
                <Text>
                  <MailOutlined />
                  {profile_admin.user.email}
                </Text>
                <Text>
                  <GithubOutlined />
                  <Link to={profile_admin.github}>{profile_admin.github}</Link>
                </Text>
                <Text>
                  <EnvironmentOutlined />
                  {upperFirstChar(profile_admin.location)}
                </Text>
              </Space>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row>
          <div className="resume-intro">
            <Space>
              {profile_admin.user.avatar ? (
                <Avatar
                  size={120}
                  src={<Image src={profile_admin.user.avatar} />}
                />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}{" "}
              <Typography>
                <Paragraph>{profile_admin.bio}</Paragraph>
              </Typography>
            </Space>
          </div>
        </Row>
        <Divider />
        <Row>
          <Col span={18}>
            <div className="resume-section-heading">
              <Title level={2}>Technical Skills</Title>
            </div>
          </Col>
          <Col span={6}>
            <div className="resume-section-heading">
              <Title level={2}>Additional Skills</Title>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <div className="resume-skill-title">
              <Typography style={{ textAlign: "right" }}>
                {profile_admin.skills.frameworks.map(item => (
                  <Title level={5}>
                    {item.title}
                    <DynamicIconComp
                      iconName={item.title}
                      size={20}
                      type="frameworks"
                    />
                  </Title>
                ))}
              </Typography>
              <Divider />
              <Typography style={{ textAlign: "right" }}>
                <Title level={5}>Languages:</Title>
              </Typography>
            </div>
          </Col>
          <Col span={10}>
            <div className="resume-skill-info">
              {profile_admin.skills.frameworks.map(item => (
                <Progress
                  percent={item.level}
                  showInfo={false}
                  trailColor="#34495e"
                  strokeColor="#40739e"
                />
              ))}
            </div>
            <div className="resume-lang-info ">
              <Space wrap>
                {profile_admin.skills.languages.map(item => (
                  <Title level={5}>
                    <DynamicIconComp
                      iconName={item.title}
                      size={18}
                      type="languages"
                    />
                    {item.title}
                  </Title>
                ))}
              </Space>
            </div>
          </Col>

          <Col span={6} offset={4}>
            <div className="resume-aside">
              <Space wrap>
                {profile_admin.skills.tools.map(item => (
                  <Tag color="#40739e">
                    <DynamicIconComp
                      iconName={item.title}
                      size={20}
                      type="tools"
                    />
                    {item.title}
                  </Tag>
                ))}
              </Space>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={17}>
            <div className="resume-section-heading">
              <Title level={2}>Projects-Experience</Title>
            </div>
            <div className="resume-timeline">
              <Timeline>
                <Timeline.Item color="#40739e">
                  <Typography>
                    <Space direction="vertical">
                      <Title level={5}>A Step Tracker App</Title>
                      <Text>
                        Worked with a team to develop an Android apps using
                        Firebase
                      </Text>
                      <Link to={profile_admin.github}>
                        {profile_admin.github}
                      </Link>
                    </Space>
                  </Typography>
                </Timeline.Item>
                <Timeline.Item color="#40739e">
                  <Typography>
                    <Space direction="vertical">
                      <Title level={5}>A Web Tracker</Title>
                      <Text>React js + react-redux + Firebase</Text>
                      <Paragraph>
                        Web tracker is a simple project that can track users'
                        activities such as counting number of clicks, number of
                        loading, keydown and getting browser's info. It's
                        managed by admin and can see all of user's info.
                      </Paragraph>
                      <Link to={profile_admin.github}>
                        {profile_admin.github}
                      </Link>
                    </Space>
                  </Typography>
                </Timeline.Item>
                <Timeline.Item color="#40739e">
                  <Typography>
                    <Space direction="vertical">
                      <Title level={5}>A Web Tracker</Title>
                      <Text>React js + react-redux + Firebase</Text>
                      <Paragraph>
                        Web tracker is a simple project that can track users'
                        activities such as counting number of clicks, number of
                        loading, keydown and getting browser's info. It's
                        managed by admin and can see all of user's info.
                      </Paragraph>
                      <Link to={profile_admin.github}>
                        {profile_admin.github}
                      </Link>
                    </Space>
                  </Typography>
                </Timeline.Item>
              </Timeline>
            </div>
          </Col>
          <Col span={6} offset={1}>
            <div className="resume-section-heading">
              <Title level={2}>Education</Title>
            </div>
            <div className="resume-timeline">
              <Timeline>
                <Timeline.Item color="#40739e">
                  <Typography>
                    <Space direction="vertical">
                      <Text>2014 - 2017</Text>
                      <Title level={5}>Miramar College</Title>
                      <Text>Major: Computer and Information Sciences</Text>
                    </Space>
                  </Typography>
                </Timeline.Item>
                <Timeline.Item color="#40739e">
                  <Typography>
                    <Space direction="vertical">
                      <Text>2017 - Now</Text>
                      <Title level={5}>
                        University of California San Diego{" "}
                      </Title>
                      <Text>Major: Computer Science</Text>
                      <Paragraph>
                        Learning in higher education that is the best way to
                        reach my goal. UCSD gives me many real projects in each
                        course. This reason support extremely myself to gain
                        experience to solve many real problems in life
                      </Paragraph>
                    </Space>
                  </Typography>
                </Timeline.Item>
              </Timeline>
            </div>
          </Col>
        </Row>
        <Divider />
        <div className="resume-social-list">
          <Row>
            <Col span={20} offset={2} style={{ textAlign: "center" }}>
              <Space wrap>
                <Button type="link" icon={<GithubOutlined />}>
                  github.com/username
                </Button>
                <Button type="link" icon={<LinkedinOutlined />}>
                  linkedin.com/in/username
                </Button>
                <Button type="link" icon={<InstagramOutlined />}>
                  @username
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  return (
    <Row>
      <Col span={20} offset={2}>
        <div className="site-layout-content shadow-lg">{aboutMe}</div>
      </Col>
    </Row>
  );
};

export default Home;
