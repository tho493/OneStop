import { Carousel } from "antd";
import { useState } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "./slide1.jpg",
      title: "Chào mừng đến với Đại Học Sao Đỏ",
      description: "Nơi đào tạo nguồn nhân lực chất lượng cao cho tương lai.",
    },
    {
      image: "./slide2.jpg",
      title: "Cơ sở vật chất hiện đại",
      description: "Được trang bị đầy đủ để phục vụ tốt nhất cho sinh viên.",
    },
    {
      image: "./slide3.jpg",
      title: "Đội ngũ giảng viên tận tâm",
      description: "Luôn đồng hành cùng sinh viên trên con đường học tập.",
    },
    {
      image: "./slide4.jpg",
      title: "Hành trình chinh phục tri thức",
      description: "Cùng Đại Học Sao Đỏ xây dựng tương lai tươi sáng.",
    },
  ];

  return (
    <div className="hidden sm:block mx-auto my-10 w-full max-w-[1400px] rounded-md overflow-hidden relative">
      <Carousel
        autoplay
        dots
        effect="fade"
        beforeChange={(_, to) => setCurrentSlide(to)} // Cập nhật slide hiện tại
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-[250px] md:h-[350px] lg:h-[400px] relative"
          >
            {/* Hình ảnh */}
            <img
              src={slide.image}
              alt={`slide-${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Nội dung chữ */}
            <div
              className={`absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4 transition-opacity duration-1000 delay-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-sm md:text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;