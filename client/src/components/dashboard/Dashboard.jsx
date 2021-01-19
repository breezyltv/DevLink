import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileAction";
import moment from "moment";
import {
  Typography,
  Divider,
  Button,
  Row,
  Col,
  Space,
  Table,
  Skeleton
} from "antd";
import { upperFirstChar } from "../../utils/util";
import {
  PlusCircleOutlined,
  PlusSquareOutlined,
  ProfileOutlined,
  InfoCircleOutlined,
  ProjectOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { Education } from "@styled-icons/zondicons";
const { Title, Paragraph, Text } = Typography;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Feature",
    dataIndex: "feature",
    key: "feature"
  },
  {
    title: "Github",
    dataIndex: "github_link",
    key: "github_link",
    render: text => <a href={text}>{text}</a>
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => console.log("id:", record._id)}
        ></Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => console.log("id:", record._id)}
        ></Button>
      </Space>
    )
  }
];

const columnsEdu = [
  {
    title: "School",
    dataIndex: "school",
    key: "school"
  },
  {
    title: "Major",
    dataIndex: "major",
    key: "feature"
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: value => <Text>{moment(value).year()}</Text>
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: value => <Text>{value ? moment(value).year() : "Now"}</Text>
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => console.log("id:", record._id)}
        ></Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => console.log("id:", record._id)}
        ></Button>
      </Space>
    )
  }
];

const Dashboard = () => {
  //get current user
  const { isAuthenticated, user } = useSelector(state => state.auth);

  let fullName = "";

  if (isAuthenticated) {
    fullName =
      upperFirstChar(user.first_name) + " " + upperFirstChar(user.last_name);
  }
  const { loadingStatus } = useSelector(state => state.loading);
  const history = useHistory();

  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  let dashboardContent;
  let projectTable;
  let eduTable;

  if (profile == null || loadingStatus) {
    console.log("loading...");
    projectTable = (
      <Row>
        <Col span={20} offset={2}>
          <Skeleton active paragraph={{ rows: 3 }} />
        </Col>
      </Row>
    );
    eduTable = (
      <Row>
        <Col span={20} offset={2}>
          <Skeleton active paragraph={{ rows: 3 }} />
        </Col>
      </Row>
    );
  } else {
    //check if this user has any profile data
    if (Object.keys(profile).length > 0) {
      console.log("display data");
      //dashboardContent = profile;
      dashboardContent = (
        <>
          <Row>
            <Title level={4}>
              Welcome, <Link to="/resume">{fullName}</Link>
            </Title>
          </Row>

          <Row>
            <Space wrap>
              <Button
                type="primary"
                onClick={() => history.push("/add-profile")}
                icon={<PlusSquareOutlined />}
              >
                Add Resume
              </Button>
              <Button icon={<ProfileOutlined />}>Edit Profile</Button>
              <Button
                icon={<ProjectOutlined />}
                onClick={() => history.push("/add-project")}
              >
                Add Project
              </Button>
              <Button icon={<InfoCircleOutlined />}>Add Experience</Button>
              <Button
                icon={<Education size={12} />}
                onClick={() => history.push("/add-edu")}
              >
                Add Education
              </Button>
            </Space>
          </Row>
        </>
      );

      projectTable = (
        <Row>
          <Col span={20} offset={2}>
            <Title level={3}>Projects</Title>
            <Table columns={columns} dataSource={profile.projects} />
          </Col>
        </Row>
      );

      eduTable = (
        <Row>
          <Col span={20} offset={2}>
            <Title level={3}>Education</Title>
            <Table columns={columnsEdu} dataSource={profile.education} />
          </Col>
        </Row>
      );
    } else {
      dashboardContent = (
        <>
          <Divider />
          <Typography>
            <Title level={2}>OOP!</Title>
            <Paragraph>
              <Text strong>
                You have not created any resume yet. Please make some resumes!
              </Text>
            </Paragraph>
          </Typography>
          <Button
            type="primary"
            onClick={() => history.push("/add-profile")}
            icon={<PlusCircleOutlined />}
          >
            Add Resume
          </Button>
          <Divider />
        </>
      );
    }
  }

  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <Divider>
            <Title level={2}>Dashboard</Title>
          </Divider>
          <div className="site-layout-content">{dashboardContent}</div>
        </Col>
      </Row>
      {projectTable}
      {eduTable}
    </>
  );
};

export default Dashboard;
