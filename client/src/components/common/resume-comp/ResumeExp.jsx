import React from "react";
import { Typography, Row, Col, Space, Timeline } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { upperFirstChar, upperCaseString } from "../../../utils/util";
import moment from "moment";
const { Title, Paragraph, Text } = Typography;
const ResumeExp = ({ profile }) => {
  return (
    <>
      <Row>
        <Col span={17}>
          <div className="resume-section-heading">
            <Title level={2}>Projects-Experience</Title>
          </div>
          <div className="resume-timeline">
            <Timeline>
              {profile.projects.map(item => (
                <Timeline.Item color="#40739e">
                  <Typography>
                    <Space direction="vertical">
                      <Title level={5}>{upperCaseString(item.title)}</Title>
                      <Text>{item.feature}</Text>
                      <Paragraph>{item.description}</Paragraph>
                      <a href={item.github_link}>{item.github_link}</a>
                    </Space>
                  </Typography>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </Col>
        <Col span={6} offset={1}>
          <div className="resume-section-heading">
            <Title level={2}>Education</Title>
          </div>
          <div className="resume-timeline">
            <Timeline>
              {profile.education
                .sort((a, b) => new Date(a.from) - new Date(b.from))
                .map(item => (
                  <Timeline.Item color="#40739e">
                    <Typography>
                      <Space direction="vertical">
                        <Text>
                          {moment(item.from).year()} -{" "}
                          {item.to ? moment(item.to).year() : "Now"}
                        </Text>
                        <Title level={5}>{upperCaseString(item.school)}</Title>
                        <Text>Major: {upperCaseString(item.major)}</Text>
                        <Paragraph>
                          {item.description && upperFirstChar(item.description)}
                        </Paragraph>
                      </Space>
                    </Typography>
                  </Timeline.Item>
                ))}
            </Timeline>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ResumeExp;
