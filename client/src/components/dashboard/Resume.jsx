import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileAction";
import ResumeHeader from "../common/resume-comp/ResumeHeader";
import ResumeIntro from "../common/resume-comp/ResumeIntro";
import ResumeSkills from "../common/resume-comp/ResumeSkills";
import ResumeExp from "../common/resume-comp/ResumeExp";
import {
  Typography,
  Divider,
  Button,
  Row,
  Col,
  Space,
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
  GithubOutlined,
  ExperimentOutlined
} from "@ant-design/icons";
import DynamicIconComp from "../common/DynamicIconComp";

const { Title, Paragraph, Text } = Typography;

const Resume = () => {
  const { profile, loading } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  let aboutMe;

  if (profile === null || loading) {
    aboutMe = <Skeleton avatar active paragraph={{ rows: 5 }} />;
  } else {
    aboutMe = (
      <>
        <ResumeHeader profile={profile} />
        <Divider />
        <ResumeIntro profile={profile} />
        <Divider />
        <ResumeSkills profile={profile} />
        <Divider />
        <ResumeExp profile={profile} />
        <Divider />
        <div className="resume-social-list">
          <Row>
            <Col span={20} offset={2} style={{ textAlign: "center" }}>
              <Space wrap>
                <Button
                  type="link"
                  icon={<GithubOutlined />}
                  onClick={() =>
                    window.location.assign("https://github.com/breezyltv")
                  }
                >
                  github.com/breezyltv
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

export default Resume;
