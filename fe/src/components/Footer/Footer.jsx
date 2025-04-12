const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4 ">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img
            className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain"
            src="/Logo.png"
            alt="Logo"
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl">ĐẠI HỌC SAO ĐỎ</span>
            <span className="text-sm md:text-base">
              Địa chỉ:{" "}
              <strong>
                Số 24, phố Thái Học 2, phường Sao Đỏ, thị xã Chí Linh, tỉnh Hải
                Dương
              </strong>
            </span>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col text-sm md:text-base">
          <span>
            Website:{" "}
            <a
              href="http://saodo.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 hover:text-yellow-400 transition-all duration-300"
            >
              http://saodo.edu.vn/
            </a>
          </span>
          <span>
            Điện thoại: <strong>0220 3882 269</strong>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;