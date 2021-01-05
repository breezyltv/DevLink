import React, { useState, useEffect } from "react";
import { BehaviorSubject, of, merge, Subject } from "rxjs";
import {
  debounceTime,
  tap,
  delay,
  map,
  distinctUntilChanged,
  filter,
  switchMap,
  catchError
} from "rxjs/operators";
import {
  Typography,
  Divider,
  Button,
  Space,
  Row,
  Col,
  message,
  Modal,
  Slider,
  Input,
  Select
} from "antd";
import {
  popularFrameworks,
  popularLanguages,
  popularTools
} from "../../utils/util";
import isEmpty from "../../utils/isEmpty_valid";
import SkillCategory from "./SkillCategory";
const { Title, Text } = Typography;
const { Option } = Select;

const IconSkillList = props => {
  const { popSkills } = props;

  const initSearch = {
    frameworks: {},
    languages: {},
    tools: {}
  };

  //const [loadingSearch, setLoadingSearch] = useState(initSearch);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [selectSkill, setSelectSkill] = useState({});
  const [level, setLevel] = useState();
  const [subject, setSubject] = useState(null);
  const [popFrameworkList, setPopFrameworkList] = popSkills;
  const [isSearching, setIsSearching] = useState(false);
  const [resultSearch, setResultSearch] = useState(initSearch);
  const levelDefault = 20;

  useEffect(() => {
    //initial list of skills
    initSkills(levelDefault);
  }, []);

  useEffect(() => {
    if (subject === null) {
      const sub = new BehaviorSubject("");
      setSubject(sub);
    } else {
      const frameworks = doSearch(
        skillsFilter,
        popFrameworkList["frameworks"]
      ).subscribe(result => {
        //console.log("frameworks", result);
        //setLoadingSearch(s => Object.assign({}, s, result));
        resultSearch.frameworks = result;
        setResultSearch({ ...resultSearch });
      });
      const languages = doSearch(
        skillsFilter,
        popFrameworkList["languages"]
      ).subscribe(result => {
        resultSearch.languages = result;
        setResultSearch({ ...resultSearch });
      });
      const tools = doSearch(skillsFilter, popFrameworkList["tools"]).subscribe(
        result => {
          resultSearch.tools = result;
          setResultSearch({ ...resultSearch });
        }
      );

      return () => {
        frameworks.unsubscribe();
        languages.unsubscribe();
        tools.unsubscribe();
        subject.unsubscribe();
      };
    }
  }, [subject]);

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

  const doSearch = (search, skills) => {
    return subject.pipe(
      map(s => s.trim()),
      distinctUntilChanged(),
      filter(s => s.length >= 1),
      debounceTime(200),
      switchMap(query =>
        merge(
          of({ loading: true, errorMessage: "", noResults: false }),
          of({
            data: search(skills, query),
            loading: false,
            noResults: search(skills, query).length === 0
          }).pipe(delay(1000))
        )
      ),
      catchError(e => ({
        loading: false,
        errorMessage: "An application error occurred"
      }))
    );
  };

  //filling skill title by query
  const skillsFilter = (skills, query) =>
    skills.filter(skill =>
      skill.title.toLowerCase().startsWith(query.toLowerCase())
    );

  const handleSearch = value => {
    //do searching when value is not empty and length >= 1
    if (!isEmpty(value) && value.length >= 1) {
      setIsSearching(true);
      if (subject) {
        return subject.next(value);
      }
    }
    //reset search to show all skills
    if (isEmpty(value)) {
      setResultSearch(initSearch);
      setIsSearching(false);
    }
  };

  //select item when modal showed up
  const selectFrameworks = () => {
    const { idx, cat } = selectSkill;

    const skill = popFrameworkList[cat][idx];

    setTitleModal(skill.title);
    skill.status = true;
    skill.level = level;
    setPopFrameworkList({ ...popFrameworkList });
    //message.info("Framework selected: " + frameworks[name]);
  };

  const showModal = (idx, cat) => {
    //reset default value for slider
    setLevel(levelDefault);
    const split = idx.split("-");
    //console.log("get idx and title skill: " + isSearching, split);

    const index = split[0];
    if (isSearching) {
      //is for searching
      const findSkillIndex = handleSearchModal(split[1], cat);
      if (findSkillIndex !== null) {
        //console.log("check", findSkillIndex);
        const skill = popFrameworkList[cat][findSkillIndex.idx];
        if (skill.status) {
          //reset selected
          handleResetSelected(skill);
        } else {
          setIsModalVisible(true);
        }
      } else {
        message.info("No " + split[1] + " founds in " + cat);
      }
    } else {
      const skill = popFrameworkList[cat][index];
      //set state for handleOk Modal
      setSelectSkill({ idx: index, cat: cat });
      if (!skill.status) {
        if (cat !== "tools") {
          setTitleModal(skill.title);
          setIsModalVisible(true);
        } else {
          // if category is tools, just selected item without setting level
          skill.status = true;
          skill.level = level;
          setPopFrameworkList({ ...popFrameworkList });
        }
      } else {
        //reset selected
        handleResetSelected(skill);
        //console.log(popFrameworkList);
      }
    }
  };

  const handleResetSelected = skill => {
    skill.status = false;
    skill.level = levelDefault;
    setPopFrameworkList({ ...popFrameworkList });
  };

  const handleSearchModal = (title, cat) => {
    for (let i = 0; i < popFrameworkList[cat].length; i++) {
      const item = popFrameworkList[cat][i];
      if (item.title === title) {
        //console.log(item.title + " -> " + i);
        const pos = { idx: i, cat: cat };
        setSelectSkill(pos);
        return pos;
      }
    }
    return null;
  };

  const handleOk = () => {
    //console.log(popFrameworkList);
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
        <Slider value={level} onChange={value => setLevel(value)} />
      </Modal>
      <Divider orientation="left">
        <Title level={4}>Skills:</Title>
      </Divider>
      <Row>
        <Col span={10} offset={12}>
          <Input.Search
            placeholder="enter input to search..."
            onChange={e => handleSearch(e.target.value)}
            loading={resultSearch.frameworks.loading}
            enterButton
            allowClear={true}
            onSearch={() => {
              console.log("final result", resultSearch);
              console.log("final selected", popFrameworkList);
            }}
          />
        </Col>
        <Divider />
      </Row>

      <SkillCategory
        popFrameworkList={
          isSearching
            ? resultSearch.frameworks.data
            : popFrameworkList.frameworks
        }
        cat={"frameworks"}
        title={"Frameworks & Libraries:"}
        showModal={showModal}
        searchResult={resultSearch.frameworks}
      />

      <SkillCategory
        popFrameworkList={
          isSearching ? resultSearch.languages.data : popFrameworkList.languages
        }
        cat={"languages"}
        title={"Languages:"}
        showModal={showModal}
        searchResult={resultSearch.languages}
      />
      <SkillCategory
        popFrameworkList={
          isSearching ? resultSearch.tools.data : popFrameworkList.tools
        }
        cat={"tools"}
        title={"Tools & Services:"}
        showModal={showModal}
        searchResult={resultSearch.tools}
      />
    </>
  );
};

export default IconSkillList;
