import React from "react";
import { Typography, Button, Row, Col, Space, Divider, Spin } from "antd";
import DynamicIconComp from "./DynamicIconComp";
import isEmpty from "../../utils/isEmpty_valid";
import { LoadingOutlined } from "@ant-design/icons";
const { Text } = Typography;
const SkillCategory = props => {
  const { popFrameworkList, cat, title, showModal, searchResult } = props;

  return (
    <Row>
      <Col span={4}>
        <Typography style={{ textAlign: "center" }}>
          <Text level={4}>{title} </Text>
        </Typography>
      </Col>
      <Col span={18}>
        {!searchResult.loading && !searchResult.noResults ? (
          <Space wrap>
            {!isEmpty(popFrameworkList) &&
              popFrameworkList.map((item, idx) => (
                <>
                  <Button
                    key={idx}
                    value={idx + "-" + item.title}
                    type={item.status ? "primary" : ""}
                    icon={
                      <DynamicIconComp
                        key={item.title}
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
        ) : !searchResult.loading && searchResult.noResults ? (
          <Typography style={{ textAlign: "center" }}>
            <Text level={4}>No result found... </Text>
          </Typography>
        ) : (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
        <Divider />
      </Col>
    </Row>
  );
};

export default SkillCategory;
