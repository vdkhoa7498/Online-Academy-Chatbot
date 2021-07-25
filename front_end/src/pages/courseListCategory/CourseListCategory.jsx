import React, { useState, useEffect } from "react";
import CourseList from "../../components/coursesList/CourseList";
import { useParams } from "react-router-dom";
import { httpClient } from "../../api";
import "./styles.scss";

const CourseListCategory = () => {
  const categoryId = useParams().categoryId;

  const [courses, setCourses] = useState([]);
  const [categoryName, setCategoryName] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const course_ = await httpClient.course.getCoursesByCategoryId(
        categoryId
      );
      setCourses(course_.results);
      const category_ = await httpClient.category.getCategoryById(categoryId);
      setCategoryName(category_.name);
      console.log(course_);
      console.log(category_);
    };
    fetchData();
  }, [categoryId]);

  return (
    <CourseList
      titleList={"Danh sách khoá học thể loại " + categoryName}
      courses={courses}
    />
  );
};

export default CourseListCategory;
