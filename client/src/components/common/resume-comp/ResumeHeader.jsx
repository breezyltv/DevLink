import React from "react";
import { Typography, Row, Col, Space } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  GithubOutlined
} from "@ant-design/icons";
import { upperFirstChar, upperCaseString } from "../../../utils/util";
const { Title, Text } = Typography;
const ResumeHeader = ({ profile }) => {
  return (
    <>
      <Row>
        <Col sm={24} md={12} lg={18}>
          <Space direction="vertical">
            <div className="resume-name">
              <Title level={2}>
                {profile.user.first_name.toUpperCase() +
                  " " +
                  profile.user.last_name.toUpperCase()}
              </Title>
            </div>
            <div className="resume-tagline">
              <Text>{profile && upperFirstChar(profile.status)}</Text>
            </div>
            <div className="resume-tagline">
              <Text>{upperCaseString(profile.position)}</Text>
            </div>
          </Space>
        </Col>

        <Col sm={24} md={12} lg={6}>
          <div className="resume-contact">
            <Space direction="vertical">
              {profile.phone && (
                <Text>
                  <PhoneOutlined /> {profile.phone}
                </Text>
              )}
              <Text>
                <MailOutlined />
                {profile.user.email}
              </Text>
              <Text>
                <GithubOutlined />
                <a href={profile.github}>{profile.github}</a>
              </Text>
              <Text>
                <EnvironmentOutlined />
                {upperFirstChar(profile.location)}
              </Text>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ResumeHeader;
