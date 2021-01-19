import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProfile } from "../../actions/profileAction";
import ResumeHeader from "../common/resume-comp/ResumeHeader";
import ResumeIntro from "../common/resume-comp/ResumeIntro";
import ResumeSkills from "../common/resume-comp/ResumeSkills";
import ResumeExp from "../common/resume-comp/ResumeExp";
import ResumeSocial from "../common/resume-comp/ResumeSocial";
import { Divider, Row, Col, Skeleton } from "antd";

const Home = () => {
  const { profile_admin, loading } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProfile());
  }, []);

  let aboutMe;

  if (profile_admin === null || loading) {
    aboutMe = <Skeleton avatar active paragraph={{ rows: 5 }} />;
  } else {
    aboutMe = (
      <>
        <ResumeHeader profile={profile_admin} />
        <Divider />
        <ResumeIntro profile={profile_admin} />
        <Divider />
        <ResumeSkills profile={profile_admin} />
        <Divider />
        <ResumeExp profile={profile_admin} />
        <Divider />
        <ResumeSocial profile={profile_admin} />
      </>
    );
  }

  return (
    <Row justify="center" align="top">
      <Col sm={24} lg={20}>
        <div className="site-layout-content shadow-lg">{aboutMe}</div>
      </Col>
    </Row>
  );
};

export default Home;
