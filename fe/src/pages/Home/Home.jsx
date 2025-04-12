import { Button } from "antd";
import { Link } from "react-router-dom";
import Comment from "../../components/Comment/Comment";

const Home = () => {
  return (
    <>
      {/* Home */}
      <div className="animate__animated animate__backInRight w-full">
        <div className="w-[1400px] mx-auto flex items-center justify-between my-10">
          <div className="w-[50%]">
            <img
              className="w-full h-[400px] rounded-md"
              src="./slide1.jpg"
              alt="slide-1"
            />
          </div>
          <div className="w-[40%]">
            <h2 className="text-blue-500 text-3xl font-bold my-2">
              Về chúng tôi
            </h2>
            <p className="text-blue-500 my-3">
              Chào mừng bạn đến với đại học Sao Đỏ! Chúng tôi tự hào là một môi
              trường học tập hiện đại, sáng tạo và luôn hướng tới sự phát triển
              toàn diện của sinh viên.
            </p>
            <p className="text-gray-400">
              Với đội ngũ giảng viên giàu kinh nghiệm và cơ sở vật chất tiên
              tiến, chúng tôi cam kết mang đến cho sinh viên những kiến thức và
              kỹ năng cần thiết để thành công trong tương lai.
            </p>
            <p className="text-gray-400 mt-4">
              Ngoài ra, chúng tôi còn tổ chức nhiều hoạt động ngoại khóa, câu
              lạc bộ và các chương trình giao lưu quốc tế, giúp sinh viên phát
              triển kỹ năng mềm và mở rộng mạng lưới quan hệ.
            </p>
            <Button className="my-2">
              <Link to={"/introduce"}>Giới thiệu</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Comment */}
      <Comment />
    </>
  );
};

export default Home;
