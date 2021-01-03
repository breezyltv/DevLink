import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  Button,
  Space,
  Row,
  Col,
  message,
  Modal,
  Slider
} from "antd";
import {
  popularFrameworks,
  popularLanguages,
  popularTools
} from "../../utils/util";

import SkillCategory from "./SkillCategory";
const { Title, Text } = Typography;

const IconSkillList = props => {
  const { popSkills } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [selectSkill, setSelectSkill] = useState();
  const [level, setLevel] = useState();
  const [popFrameworkList, setPopFrameworkList] = useState();
  const levelDefault = 20;

  useEffect(() => {
    //initial list of skills
    initSkills(levelDefault);
  }, []);

  const initSkills = levelDefault => {
    let initSkills = {
      frameworks: [],
      languages: [],
      tools: []
    };
    for (const item of popularFrameworks) {
      initSkills["frameworks"].push({
        title: item,
        level: levelDefault,
        status: false
      });
    }
    for (const item of popularLanguages) {
      initSkills["languages"].push({
        title: item,
        level: levelDefault,
        status: false
      });
    }
    for (const item of popularTools) {
      initSkills["tools"].push({
        title: item,
        status: false
      });
    }
    setPopFrameworkList(initSkills);
  };

  const selectFrameworks = () => {
    const { idx, cat } = selectSkill;
    message.info(
      "Framework selected: " +
        popFrameworkList.frameworks[idx].title +
        " level: " +
        level
    );
    const skill = popFrameworkList[cat][idx];

    setTitleModal(skill.title);
    skill.status = true;
    skill.level = level;
    setPopFrameworkList({ ...popFrameworkList });
    //message.info("Framework selected: " + frameworks[name]);
  };

  const showModal = (idx, cat) => {
    const skill = popFrameworkList[cat][idx];
    if (!skill.status) {
      setTitleModal(skill.title);
      setIsModalVisible(true);
      //set state for handleOk Modal
      setSelectSkill({ idx: idx, cat: cat });
    } else {
      //reset selected
      skill.status = false;
      skill.level = levelDefault;
      setPopFrameworkList({ ...popFrameworkList });
      console.log(popFrameworkList);
    }
  };

  const handleOk = () => {
    console.log(popFrameworkList);
    selectFrameworks();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal
        title={titleModal}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Title level={5}>Level:</Title>

        <Slider
          defaultValue={levelDefault}
          onChange={value => setLevel(value)}
        />
      </Modal>
      <Divider orientation="left">
        <Title level={4}>Skills:</Title>
      </Divider>
      <SkillCategory
        popFrameworkList={popFrameworkList}
        cat={"frameworks"}
        title={"Framework & Libraries:"}
        showModal={showModal}
      />
      <SkillCategory
        popFrameworkList={popFrameworkList}
        cat={"languages"}
        title={"Languages:"}
        showModal={showModal}
      />
      <SkillCategory
        popFrameworkList={popFrameworkList}
        cat={"tools"}
        title={"Tools & Services:"}
        showModal={showModal}
      />
    </>
  );
};

export default IconSkillList;
