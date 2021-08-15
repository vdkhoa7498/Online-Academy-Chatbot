import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getMyCourses, removeRegisterCourse } from "../../stores/user";
import CoursesList from "../../components/coursesList/CourseList";

const top10 = [
  {
    title: "Lập trình web",
    description:
      "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
    image:
      "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Tự học guitar",
    description:
      "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
    image:
      "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Nâng cao toán học cho trẻ",
    description:
      "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
    image:
      "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Lập trình web",
    description:
      "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
    image:
      "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Tự học guitar",
    description:
      "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
    image:
      "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Nâng cao toán học cho trẻ",
    description:
      "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
    image:
      "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Lập trình web",
    description:
      "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
    image:
      "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Tự học guitar",
    description:
      "Tự học guitar tại nhà cho phép người tập được chủ động về thời gian và phương pháp học, cũng như tích kiệm được nhiều chi phí.",
    image:
      "https://hocguitar.net/wp-content/uploads/2019/11/tu-hoc-guitar-tai-nha-online.jpg",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Nâng cao toán học cho trẻ",
    description:
      "Những câu đố toán học dành cho trẻ nhỏ giúp rèn luyện khả năng tính toán. Tuy nhiên các bạn nhỏ cần tỉnh táo, chú ý phép nhân chia khiến cho các bạn nhỏ dễ bị nhầm lẫn.",
    image:
      "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/3/13/790705/Cau-Do-Toan-Hoc0-01.jpg?w=888&h=592&crop=auto&scale=both",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
  {
    title: "Lập trình web",
    description:
      "Lập trình web là công việc với nhiệm vụ nhận tất cả dữ liệu từ các bộ phận thiết kế và chuyển thành một website hoàn chỉnh",
    image:
      "https://lamweb.vn/wp-content/uploads/2020/09/lap-trinh-web-la-gi.jpg",
    category: "Kinh tế",
    lecturer: "Nguyễn Văn A",
    price: "200000",
    rateScore: 3.9,
    numberOfRate: 249,
  },
];

const MyCourses = (props) => {
  // const [courses, setCourses] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(props?.myCourses ? props.myCourses?.length: 0);

  useEffect(() => {
    if (localStorage && localStorage.getItem("access_token")) {
      props.getMyCourses();
    } else {
      //  props.toggleGlobalLoading(false);
    }
  }, []);

  return (
    <CoursesList
      limit={limit}
      setLimit={setLimit}
      page={page}
      setPage={setPage}
      total={total}
      titleList={"Khoá học của tôi"}
      courses={props.myCourses}
      onHandleRemove={props.removeRegisterCourse}
      isWatchList={true}
    />
  );
};

const mapState = (state) => ({
  myCourses: state.user.myCourses,
});
const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      getMyCourses,
      removeRegisterCourse,
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(MyCourses);
