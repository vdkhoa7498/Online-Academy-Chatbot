import React, { useState, useEffect } from "react";
import CourseList from "../../components/coursesList/CourseList";
import { useParams } from "react-router-dom";
import { httpClient } from "../../api";
import {
  Input,
  Row,
  Col,
  Select,
  Divider,
  Checkbox,
  Rate,
  Radio,
  Space,
} from "antd";
// import "./styles.scss";

const { Search } = Input;
const { Option } = Select;

const SearchList = () => {
  const params = useParams().categoryId;

  const [courses, setCourses] = useState([]);
  const [priceFilter, setPriceFilter] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt:desc");
  const [rateScoreFilter, setRateScoreFilter] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const courses_ = await httpClient.course.getCourses({
        sortBy: sortBy,
        // rateScoreFilter: rateScoreFilter,
        // priceFilter: priceFilter
      });
      setCourses(courses_.results);
      setTotalResults(courses_.totalResults)
    };
    fetchData();
  }, [sortBy]);

  const onSearch = async (searchText) => {
    const courses_ = await httpClient.course.getCourses({
      sortBy: sortBy,
      search: searchText,
      // rateScoreFilter: rateScoreFilter,
      // priceFilter: priceFilter
    });
    setCourses(courses_.results);
    setTotalResults(courses_.totalResults)
  };

  const priceOptions = [
    { label: "Miễn phí", value: 0 },
    { label: "Có phí", value: -1 },
  ];

  return (
    <div style={{ backgroundColor: "white", marginTop: 20, padding: 15 }}>
      <Row>
        <Col span={12}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col>
          <Select
            defaultValue="createdAt:desc"
            style={{ width: 200 }}
            onChange={(value) => {
              setSortBy(value);
            }}
          >
            <Option value="createdAt:desc">Mới nhất</Option>
            <Option value="view:desc">Nhiều người xem nhất</Option>
            <Option value="studentNumber:desc">Nhiều người đăng ký nhất</Option>
            <Option value="rateScore">Điểm đánh giá tăng dần</Option>
            <Option value="rateScore:desc">Điểm đánh giá giảm dần</Option>
          </Select>
        </Col>
      </Row>
      <div style={{textAlign: 'left', margin: 5}}>Có {totalResults} kết quả tìm kiếm ...</div>
      <Row style={{ padding: 15 }}></Row>
      <Row>
        <Col span={6}>
          <Divider />
          <h2>Lọc kết quả tìm kiếm</h2>

          <Divider orientation="left">Giá tiền</Divider>
          <Checkbox.Group
            options={priceOptions}
            onChange={(value) => {
              if (value.length === 1){
                setPriceFilter(value[0])
              }
              if (value.length === 2){
                setPriceFilter(null)
              }
              onSearch()
              console.log('priceFilter', priceFilter)
            }}
          />

          <Divider orientation="left">Đánh giá</Divider>
          <Radio.Group onChange={(event)=>{setRateScoreFilter(event.target.value)}}>
            <Space direction="vertical">
              <Radio value={4.5}>
                <div>
                  <Rate allowHalf value={4.5} disabled />
                  <span>4.5 đến 5.0</span>
                </div>
              </Radio>
              <Radio value={4.0}>
                <div>
                  <Rate allowHalf value={4} disabled />
                  <span>4 đến 5.0</span>
                </div>
              </Radio>
              <Radio value={3.5}>
                {" "}
                <div>
                  <Rate allowHalf value={3.5} disabled />
                  <span>3.5 đến 5.0</span>
                </div>
              </Radio>
            </Space>
          </Radio.Group>
        </Col>
        <Col span={18}>
          <CourseList titleList={"Danh sách tìm kiếm"} courses={courses} />
        </Col>
      </Row>
    </div>
  );
};

export default SearchList;
