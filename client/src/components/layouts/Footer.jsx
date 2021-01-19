import React from "react";
import { Layout, Row, Col, Typography, Space, Tag } from "antd";
import { commonTags, randomChoiceArr } from "../../utils/util";
const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const FooterLayout = () => (
  <Footer>
    <Row>
      <Col sm={24} lg={8}>
        <Typography>
          <Title level={4}>About</Title>
          <Paragraph>
            I'm a web developer in San Diego, I've been excited in building
            websites and web applications since 2010.
          </Paragraph>
          <Paragraph>
            We help clients solve business problems by fusing creativity,
            innovation, strategy, and craft.
          </Paragraph>
          <Text>Dev Link ©2020 Created by Vu Le</Text>
        </Typography>
      </Col>
      <Col sm={24} lg={7}>
        <Typography>
          <Title level={4}>Recent Projects</Title>
          <Space direction="vertical">
            <Text>MEAN Stack Web Application</Text>
            <Text>MEAN Stack Web Application</Text>
            <Text>MEAN Stack Web Application</Text>
            <Text>MEAN Stack Web Application</Text>
          </Space>
        </Typography>
      </Col>
      <Col sm={24} lg={8}>
        <Typography>
          <Title level={4}>Tags</Title>
        </Typography>
        <Space wrap>
          {randomChoiceArr(commonTags, 25).map(item => (
            <Tag>{item}</Tag>
          ))}
        </Space>
      </Col>
    </Row>
  </Footer>
);

export default FooterLayout;
