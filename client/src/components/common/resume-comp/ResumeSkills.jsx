import React from "react";
import { Typography, Row, Col, Space, Divider, Progress, Tag } from "antd";
import DynamicIconComp from "../DynamicIconComp";
const { Title, Text } = Typography;
const ResumeSkills = ({ profile }) => {
  return (
    <>
      <Row>
        <Col sm={24} md={12} lg={18}>
          <div className="resume-skill">
            <div className="resume-section-heading">
              <Title level={2}>Technical Skills</Title>
            </div>
            <div className="resume-skill-title">
              {profile.skills.frameworks.map(item => (
                <>
                  <Text level={5}>
                    {item.title}
                    <DynamicIconComp
                      iconName={item.title}
                      size={20}
                      type="frameworks"
                    />
                  </Text>
                  <Progress
                    percent={item.level}
                    showInfo={false}
                    trailColor="#34495e"
                    strokeColor="#40739e"
                  />
                </>
              ))}
            </div>

            <Divider />
            <Typography>
              <Title level={5}>Languages:</Title>
            </Typography>
            <div className="resume-lang-info ">
              <Space wrap>
                {profile.skills.languages.map(item => (
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
          </div>
        </Col>

        <Col sm={24} md={10} lg={6}>
          <div className="resume-section-heading">
            <Title level={2}>Additional Skills</Title>
          </div>
          <div className="resume-aside">
            <Space wrap>
              {profile.skills.tools.map(item => (
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
    </>
  );
};

export default ResumeSkills;
