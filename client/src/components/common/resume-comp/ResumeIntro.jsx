import React from "react";
import { Typography, Row, Avatar, Space, Image, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;
const ResumeIntro = ({ profile }) => {
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={6} lg={4}>
          {profile.user.avatar ? (
            <Avatar size={120} src={<Image src={profile.user.avatar} />} />
          ) : (
            <Avatar icon={<UserOutlined />} />
          )}{" "}
        </Col>

        <Col xs={24} sm={24} md={18} lg={20}>
          <div className="resume-intro">
            <Typography>
              <Paragraph>{profile.bio}</Paragraph>
            </Typography>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ResumeIntro;
