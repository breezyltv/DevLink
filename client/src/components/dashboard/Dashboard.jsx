import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileAction";
import { Typography, Divider, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;

const Dashboard = () => {
  //const { isAuthenticated, user } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.profile);
  const { loadingStatus } = useSelector(state => state.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  let dashboardContent;

  if (profile == null || loadingStatus) {
    console.log("loading...");
  } else {
    //check if this user has any profile data
    if (Object.keys(profile).length > 0) {
      console.log("display data");
      //dashboardContent = profile;
    } else {
      dashboardContent = (
        <>
          <Divider />
          <Typography>
            <Title level={2}>OOP!</Title>
            <Paragraph>
              <Text strong>
                You have not yet set up any resume. Please make some resumes!
              </Text>
            </Paragraph>
          </Typography>
          <Button type="primary" icon={<PlusCircleOutlined />}>
            Add Resume
          </Button>
          <Divider />
        </>
      );
    }
  }

  return <div className="site-layout-content">{dashboardContent}</div>;
};

export default Dashboard;
