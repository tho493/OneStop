import "../../assets/css/card.css";
const Card = () => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-center items-center w-full gap-10 my-20">
                <div className="card">
                    <div className="card-content">
                        <p className="card-title">Trường Đại Học Sao Đỏ</p>
                        <p className="card-para">
                            Nơi hội tụ tri thức, vươn tầm tương lai, chắp cánh cho những ước mơ bay xa, mang đến cơ hội phát triển toàn diện.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <p className="card-title">Thư Viện</p>
                        <p className="card-para">
                            Kho tàng tri thức, mở lối thành công, đồng hành trên con đường chinh phục tri thức, xây dựng nền tảng vững chắc cho tương lai.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
