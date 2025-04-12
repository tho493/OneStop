import React from "react";

const Introduce = () => {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50 animate-gradient-move"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-20 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10 rounded-full animate-float-reverse"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeInDown">
            Đại Học Sao Đỏ
          </h1>
          <p className="text-lg animate__animated animate__fadeInUp animate__delay-1s">
            Địa chỉ: Số 24, phố Thái Học 2, phường Sao Đỏ, thị xã Chí Linh, tỉnh
            Hải Dương
          </p>
          <p className="text-lg animate__animated animate__fadeInUp animate__delay-2s">
            Điện thoại: 0220 3882 269
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 opacity-50 animate-gradient-move"></div>

        {/* Floating Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-300 opacity-20 rounded-full animate-float"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500 opacity-10 rounded-full animate-float-reverse"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
          <div className="animate__animated animate__fadeInLeft">
            <h2 className="text-4xl font-bold text-blue-600 mb-6">
              Về Đại Học Sao Đỏ
            </h2>
            <p className="text-lg text-gray-700">
              Đại học Sao Đỏ là nơi đào tạo nguồn nhân lực chất lượng cao, đáp
              ứng nhu cầu của xã hội. Với đội ngũ giảng viên tận tâm, cơ sở vật
              chất hiện đại và chương trình đào tạo tiên tiến, chúng tôi cam kết
              mang đến môi trường học tập tốt nhất cho sinh viên.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-700">
              <li>Chương trình đào tạo đa dạng và tiên tiến.</li>
              <li>Đội ngũ giảng viên tận tâm và giàu kinh nghiệm.</li>
              <li>Cơ sở vật chất hiện đại, tiện nghi.</li>
            </ul>
          </div>
          <div className="animate__animated animate__fadeInRight">
            <img
              src="https://eparking.vn/wp-content/uploads/2024/08/z5730529893026_f71d05c141a23e3f8a9a7a91c4aeb273.jpg"
              alt="dh sao do"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-gray-100 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 opacity-50 animate-gradient-move"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-blue-600 mb-12">
            Thành Tựu Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
              <h3 className="text-5xl font-bold text-blue-600 mb-4">10,000+</h3>
              <p className="text-lg text-gray-700">
                Sinh viên tốt nghiệp mỗi năm
              </p>
            </div>

            {/* Item 2 */}
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-1s">
              <h3 className="text-5xl font-bold text-blue-600 mb-4">500+</h3>
              <p className="text-lg text-gray-700">Giảng viên và nhân viên</p>
            </div>

            {/* Item 3 */}
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-2s">
              <h3 className="text-5xl font-bold text-blue-600 mb-4">50+</h3>
              <p className="text-lg text-gray-700">Chương trình đào tạo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="py-16 bg-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 opacity-50 animate-gradient-move"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-blue-600 mb-12">
            Cơ Sở Vật Chất
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
              <img
                src="https://saodo.edu.vn/uploads/news/2021_11/image007_2.jpg"
                alt="Thư viện"
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                Thư Viện Hiện Đại
              </h3>
              <p className="text-gray-700">
                Hệ thống thư viện với hàng ngàn đầu sách và tài liệu học tập.
              </p>
            </div>

            {/* Item 2 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-1s">
              <img
                src="https://lh5.googleusercontent.com/proxy/BxGtK32YiOTABMG7l9MseJuKPKwrn85patYyz-pzJetIuKH-mOJJD0oY9xY6Qffi7ikUrxbaqevavIwBw-3KON2v9eXp4IxHEhgsAbFLUAtR468rytRJAFo4qbFxu9rHJf9jF9aAR7TewcLF7rM95mAGIBzo2fYbjyQ7Mknzy38U7imVu-HDgl_nckaVG5lOoyr9XavZ8JIBVcDyrHskabnT"
                alt="Phòng học"
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                Phòng Học Tiện Nghi
              </h3>
              <p className="text-gray-700">
                Phòng học được trang bị đầy đủ thiết bị hiện đại, phục vụ tốt
                nhất cho việc giảng dạy.
              </p>
            </div>

            {/* Item 3 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-2s">
              <img
                src="https://bhd.1cdn.vn/2021/02/20/files-library-images-site-1-20210220-web-cai-tao-ky-tuc-xa-9-tang-truong-dai-hoc-sao-do-lam-khu-cach-ly-tap-trung-19-002112.jpg"
                alt="Ký túc xá"
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                Ký Túc Xá
              </h3>
              <p className="text-gray-700">
                Ký túc xá tiện nghi, an toàn, tạo điều kiện tốt nhất cho sinh
                viên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;