import React, { useState, useEffect } from "react";
import CourseList from "../../components/coursesList/CourseList";
import { useParams } from "react-router-dom";
import { httpClient } from "../../api";
import "./styles.scss";

const CourseListCategory = () => {
  const categoryId = useParams().categoryId;

  const [courses, setCourses] = useState([]);
  const [categoryName, setCategoryName] = useState({});

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const course_ = await httpClient.course.getCoursesByCategoryId(
        categoryId,
        {
          limit,
          page,
        }
      );
      setCourses(course_.results);
      setTotal(course_.totalResults);
      const category_ = await httpClient.category.getCategoryById(categoryId);
      setCategoryName(category_.name);
      console.log(course_);
      console.log(category_);
    };
    fetchData();
  }, [categoryId, limit, page]);

  return (
    <CourseList
      titleList={"Danh sách khoá học thể loại " + categoryName}
      courses={courses}
      limit={limit}
      setLimit={setLimit}
      page={page}
      setPage={setPage}
      total={total}
    />
  );
};

export default CourseListCategory;
