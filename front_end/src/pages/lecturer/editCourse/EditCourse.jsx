import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { PlaySquareOutlined, PicLeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Videos from "./Videos";
import Information from "./Information";
import { httpClient } from "../../../api";

const { TabPane } = Tabs;

const EditCourse = () => {
  const courseId = useParams().courseId;
  const [currentTab, setCurrentTab] = useState(1);
  const [course, setCourse] = useState({});

  const fetchCourse = async () => {
    const course_ = await httpClient.course.getCourseById(courseId);
    await setCourse(course_);
  };
  useEffect(() => {
    fetchCourse();
  }, [courseId, currentTab]);
  return (
    <div>
      <h1>Chỉnh sửa khoá học</h1>
      <Tabs
        defaultActiveKey={currentTab}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      >
        <TabPane
          tab={
            <span>
              <PicLeftOutlined />
              Thông tin khoá học
            </span>
          }
          key="1"
        >
          <Information courseId={courseId} course={course} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <PlaySquareOutlined />
              Videos
            </span>
          }
          key="2"
        >
          <Videos courseId={courseId} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default EditCourse;
