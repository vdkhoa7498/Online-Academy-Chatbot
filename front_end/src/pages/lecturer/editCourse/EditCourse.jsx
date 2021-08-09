import React from "react";
import { Tabs } from "antd";
import { PlaySquareOutlined, PicLeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Videos from "./Videos";
import Information from "./Information";

const { TabPane } = Tabs;

const EditCourse = () => {
  const courseId = useParams().courseId;
  return (
    <div>
      <h1>Chỉnh sửa khoá học</h1>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <PicLeftOutlined />
              Thông tin khoá học
            </span>
          }
          key="1"
        >
          <Information courseId={courseId} />
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
