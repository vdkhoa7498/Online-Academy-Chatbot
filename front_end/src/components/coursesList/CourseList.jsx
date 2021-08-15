import React, { useState } from "react";
import { Divider, Pagination, Empty } from "antd";
import CourseItem from "../../components/courseItem/CourseItem";
import { httpClient } from "../../api";

import "./styles.scss";

export default function CourseList({
  titleList,
  courses,
  isWatchList,
  onHandleRemove,
  total,
  limit,
  setLimit,
  setPage,
}) {
  return (
    <div>
      <div className="courseListCategory-container">
        <Divider />
        <h1 className="title-page">{titleList}</h1>
        {!courses ? (
          <Empty />
        ) : (
          courses.map((item, index) => {
            return (
              <CourseItem
                key={index}
                item={item}
                isWatchList={isWatchList}
                onRemoveCourse={() => onHandleRemove(item.id)}
              />
            );
          })
        )}
        <br />
        <Pagination
          showSizeChanger
          showQuickJumper
          total={total}
          pageSize={limit}
          onChange={(value) => {
            setPage(value);
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          onShowSizeChange={(current, pageSize) => {
            setLimit(pageSize)
          }}
        />
        <Divider />
      </div>
    </div>
  );
}
