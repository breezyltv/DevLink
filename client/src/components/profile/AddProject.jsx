import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { validateStatus } from "../../utils/util";
import moment from "moment";
import { addProject, clearErrors } from "../../actions/profileAction";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider,
  Typography,
  PageHeader,
  DatePicker
} from "antd";
const { Title } = Typography;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};
const validateMessages = {
  required: "${label} is required!"
};

const AddProject = () => {
  const errors = useSelector(state => state.errors);
  const { loadingStatus } = useSelector(state => state.loading);
  const history = useHistory();

  const [cleanErrors, setCleanErrors] = useState({});
  const [errorStatus, setErrorStatus] = useState(false);

  const dispatch = useDispatch();

  //clear errors from redux store
  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  useEffect(() => {
    setCleanErrors({ ...errors });
  }, [errors]);

  const onFinish = values => {
    //console.log(values);
    //console.log(moment(values.from).valueOf());
    const projectData = {
      ...values.project,
      from: moment(values.project.from).valueOf(),
      to: values.project.to ? moment(values.project.to).valueOf() : undefined
    };
    console.log("projectData", projectData);
    dispatch(addProject(projectData, history));
    setErrorStatus(true);
  };

  //removing error alert from backend when input has been on change
  const onInputChange = (value, type) => {
    if (value) {
      //hide error message for antd form
      cleanErrors[type] = undefined;
      setCleanErrors({ ...cleanErrors });
      if (errors.loginFailed) {
        errors.loginFailed = undefined;
      }
    }
  };

  return (
    <>
      <Row>
        <Col span={16} offset={4}>
          <PageHeader
            className="site-page-header"
            onBack={() => {
              history.push("/dashboard");
            }}
            title="Dashboard"
          />
          <Typography style={{ textAlign: "center" }}>
            <Title level={3}>Add New Project</Title>
          </Typography>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["project", "title"]}
              label="Title"
              {...validateStatus(cleanErrors.handle, errorStatus)}
              onChange={value => onInputChange(value, "title")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["project", "feature"]}
              label="Feature"
              extra="give some features, technologies that you used in this project."
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["project", "from"]}
              label="From"
              {...validateStatus(cleanErrors.handle, errorStatus)}
              onChange={value => onInputChange(value, "from")}
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={["project", "to"]}
              label="To"
              extra='Leave blank as "to now".'
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={["project", "github_link"]}
              label="Github"
              {...validateStatus(cleanErrors.handle, errorStatus)}
              onChange={value => onInputChange(value, "github_link")}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["project", "demo_link"]}
              label="Website Demo"
              {...validateStatus(cleanErrors.handle, errorStatus)}
              onChange={value => onInputChange(value, "demo_link")}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["project", "description"]} label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingStatus}
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddProject;
