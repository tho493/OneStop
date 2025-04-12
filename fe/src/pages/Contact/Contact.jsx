import { PhoneOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosSchool } from "react-icons/io";
import { Button } from "antd";

const Contact = () => {
  return (
    <div className="w-full flex my-[50px] px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-[1200px] mx-auto rounded-md overflow-hidden shadow-lg">
        {/* Thông tin liên hệ */}
        <div className="w-full lg:w-[40%] bg-gradient-to-r from-[#00b8b0] to-[#007d7a] p-6 text-white flex flex-col justify-center gap-y-8 animate__animated animate__fadeInLeft">
          <h2 className="text-2xl font-bold">Thông tin liên hệ</h2>
          <p className="text-sm my-2">
            Chúng tôi luôn sẵn sàng hỗ trợ và hướng dẫn bạn. Đừng ngần ngại liên
            hệ với chúng tôi để được giải đáp thắc mắc hoặc hỗ trợ. Tương lai
            của bạn bắt đầu tại Đại học Sao Đỏ!
          </p>
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-2">
              <PhoneOutlined className="text-xl" />
              <span>0220 3882 269</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineEmail className="text-xl" />
              <span>daotaosaodo@edu.vn</span>
            </div>
            <div className="flex items-center gap-2">
              <IoIosSchool className="text-xl" />
              <span>Số 24, Thái Học 2, phường Sao Đỏ, Chí Linh</span>
            </div>
          </div>
        </div>

        {/* Form liên hệ */}
        <form className="w-full lg:w-[60%] bg-white p-6 flex flex-col justify-around gap-y-6 animate__animated animate__fadeInRight">
          <div className="flex flex-col md:flex-row items-center justify-center gap-[20px]">
            <div className="flex flex-col gap-y-[10px] w-full md:w-[45%]">
              <label htmlFor="name" className="font-medium">
                Tên sinh viên
              </label>
              <input
                id="name"
                className="outline-none border-b-[2px] border-gray-400 focus:border-blue-500 transition-all duration-300"
                type="text"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="flex flex-col gap-y-[10px] w-full md:w-[45%]">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                id="email"
                className="outline-none border-b-[2px] border-gray-400 focus:border-blue-500 transition-all duration-300"
                type="email"
                placeholder="anha@gmail.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <label htmlFor="subject" className="font-medium">
              Chủ đề
            </label>
            <input
              id="subject"
              className="outline-none border-b-[2px] border-gray-400 focus:border-blue-500 transition-all duration-300"
              type="text"
              placeholder="Cách để nộp hồ sơ"
            />
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <label htmlFor="message" className="font-medium">
              Nội dung
            </label>
            <textarea
              id="message"
              className="outline-none border-b-[2px] border-gray-400 focus:border-blue-500 transition-all duration-300"
              placeholder="..."
              rows="4"
            />
          </div>
          <Button
            type="primary"
            className="w-full md:w-[200px] mx-auto bg-[#00b8b0] hover:bg-[#007d7a] text-white font-bold transition-all duration-300"
          >
            Gửi
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;