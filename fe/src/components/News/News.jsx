import { Col, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const News = () => {
  return (
    <div data-aos="fade-right" className="w-[1200px] mx-auto my-10">
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
          <div className="flex flex-col text-center">
            <img className="rounded-xl" src="./news1.jpg" alt="news1" />
            <Link className="mt-2" to="/main">
              Bạn muốn hỗ trợ thủ tục?
              <ArrowRightOutlined />
            </Link>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="flex flex-col text-center">
            <img className="rounded-xl" src="./news2.jpg" alt="news2" />
            <Link className="mt-2" to="/contact">
              Bạn muốn liên hệ?
              <ArrowRightOutlined />
            </Link>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="flex flex-col text-center">
            <img className="rounded-xl" src="./news3.jpg" alt="news3" />
            <Link className="mt-2" to="/main">
              Bạn muốn vay tiền?
              <ArrowRightOutlined />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default News;
