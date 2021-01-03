import React, { useState } from "react";
import { Typography, Button, Row, Col, Space, Divider } from "antd";
import DynamicIconComp from "./DynamicIconComp";
const { Title, Text } = Typography;
const SkillCategory = props => {
  const { popFrameworkList, cat, title, showModal } = props;

  return (
    <Row>
      <Col span={4}>
        <Typography style={{ textAlign: "center" }}>
          <Text level={4}>{title} </Text>
        </Typography>
      </Col>
      <Col span={18}>
        <Space wrap>
          {popFrameworkList &&
            popFrameworkList[cat].map((item, idx) => (
              <>
                <Button
                  key={idx}
                  value={idx}
                  type={item.status ? "primary" : ""}
                  icon={
                    <DynamicIconComp
                      iconName={item.title}
                      size={20}
                      type={cat}
                    />
                  }
                  onClick={e => showModal(e.currentTarget.value, cat)}
                >
                  {item.title}
                </Button>
              </>
            ))}
        </Space>
        <Divider />
      </Col>
    </Row>
  );
};

export default SkillCategory;
