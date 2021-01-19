import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { validateStatus } from "../../utils/util";
import moment from "moment";
import { addEdu, clearErrors } from "../../actions/profileAction";
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

const AddEducation = () => {
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
    const eduData = {
      ...values.edu,
      from: moment(values.edu.from).valueOf(),
      to: values.edu.to ? moment(values.edu.to).valueOf() : undefined
    };
    console.log("eduData", eduData);
    dispatch(addEdu(eduData, history));
    setErrorStatus(true);
  };

  //removing error alert from backend when input has been on change
  const onInputChange = (value, type) => {
    if (value) {
      //hide error message for antd form
      cleanErrors[type] = undefined;
      setCleanErrors({ ...cleanErrors });
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
            <Title level={3}>Add New Education</Title>
          </Typography>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["edu", "school"]}
              label="School"
              {...validateStatus(cleanErrors.handle, errorStatus)}
              onChange={value => onInputChange(value, "school")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["edu", "major"]}
              label="Major"
              {...validateStatus(cleanErrors.handle, errorStatus)}
              onChange={value => onInputChange(value, "major")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["edu", "from"]}
              label="From"
              {...validateStatus(cleanErrors.handle, errorStatus)}
              onChange={value => onInputChange(value, "from")}
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={["edu", "to"]}
              label="To"
              extra='Leave blank as "to now".'
            >
              <DatePicker />
            </Form.Item>
            <Form.Item name={["edu", "description"]} label="Description">
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

export default AddEducation;
