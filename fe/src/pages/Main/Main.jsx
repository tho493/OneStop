import React, { useEffect, useState } from "react";
import { Input, Card, Row, Col, Typography, Button, Spin, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "animate.css";
import { getAllCategoryType } from "../../redux-tookit/categoryTypeSlice";

const { Title, Paragraph } = Typography;

const dataIcons = [
  {
    key: "1",
    icon: "📚",
  },
  {
    key: "2",
    icon: "📝",
  },
  {
    key: "3",
    icon: "🎓",
  },
  {
    key: "4",
    icon: "🏆",
  },
];

const Main = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const { loading, categoryTypes } = useSelector(state => state.categoryType);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  useEffect(() => {
    dispatch(getAllCategoryType())
    
  }, [dispatch])

  useEffect(() => {
    const updateIconsData = categoryTypes.map((item) => ({
      ...item,
      icon: dataIcons[Math.floor(Math.random() * dataIcons.length)].icon
    }))

    setData(updateIconsData)
  }, [categoryTypes, searchText])

  useEffect(() => {
    setData((data) => data.filter(item => item.ten_loai.includes(searchText)))
  }, [searchText])  

  return (
    <div className="w-full flex flex-col my-5">
      <div className="w-[1200px] mx-auto">
        {/* Tiêu đề */}
        <div className="text-center my-10 animate__animated animate__fadeInDown">
          <Title level={2} className="text-2xl font-bold text-gray-800">
            Danh Sách Thủ Tục
          </Title>
          <Paragraph className="text-gray-600">
            Dưới đây là các thủ tục quan trọng dành cho sinh viên. Bạn có thể
            tìm kiếm hoặc xem chi tiết từng thủ tục.
          </Paragraph>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex justify-center mb-8 animate__animated animate__fadeIn">
          <Input
            placeholder="Tìm kiếm thủ tục..."
            prefix={<SearchOutlined />}
            size="large"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={handleSearch}
          />
        </div>

        {/* Hiển thị danh sách hoặc trạng thái */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <Spin size="large" />
            </div>
          ) : data && data.length > 0 ? (
            <Row
              gutter={[16, 16]}
              className="flex flex-wrap my-10 animate__animated animate__fadeInUp"
            >
              {data.map((item) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  key={item.loai_yeu_cau_id}
                  className="p-2"
                >
                  <Card
                    hoverable
                    className="h-[250px] text-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <Title
                      level={4}
                      className="text-lg font-semibold text-gray-800 h-[27px] line-clamp-1 overflow-hidden"
                    >
                      {item.ten_loai}
                    </Title>
                    <Paragraph className="text-gray-600 mt-auto">
                      <p>Thủ tục hướng dẫn trong chi tiết</p>
                    </Paragraph>
                    <Button type="primary" size="small" className="mt-2">
                      <Link to={`/main/detail?id=${item.loai_yeu_cau_id}`}>Nộp hồ sơ</Link>
                    </Button>
                  </Card>
                </Col>
              ))} 
            </Row>
           ) : (
            <div className="flex justify-center items-center h-[400px] animate__animated animate__fadeIn">
              <Empty description="Không tìm thấy kết quả" />
            </div>
          )} 
        </div>
      </div>
    </div>
  );
};

export default Main;