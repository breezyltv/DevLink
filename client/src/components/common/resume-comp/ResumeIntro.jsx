import React from "react";
import { Typography, Row, Avatar, Space, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;
const ResumeIntro = ({ profile }) => {
  return (
    <>
      <Row>
        <div className="resume-intro">
          <Space>
            {profile.user.avatar ? (
              <Avatar size={120} src={<Image src={profile.user.avatar} />} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}{" "}
            <Typography>
              <Paragraph>{profile.bio}</Paragraph>
            </Typography>
          </Space>
        </div>
      </Row>
    </>
  );
};

export default ResumeIntro;
