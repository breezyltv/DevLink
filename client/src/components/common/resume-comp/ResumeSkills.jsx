import React from "react";
import { Typography, Row, Col, Space, Divider, Progress, Tag } from "antd";
import DynamicIconComp from "../DynamicIconComp";
const { Title } = Typography;
const ResumeSkills = ({ profile }) => {
  return (
    <>
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
              {profile.skills.frameworks.map(item => (
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
            {profile.skills.frameworks.map(item => (
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
        </Col>

        <Col span={6} offset={4}>
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
