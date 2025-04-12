import { CommentOutlined } from "@ant-design/icons";

const Comment = () => {
  return (
    <div className="animate__animated animate__backInUp bg-[url('https://i.pinimg.com/736x/30/f7/cd/30f7cd23ea6800687080bcddd93cb175.jpg')] bg-cover bg-center flex">
      <div className="w-[800px] m-auto p-20 flex flex-col justify-center items-center">
        <CommentOutlined style={{ fontSize: "32px", marginBottom: "8px", color: "orange" }} />
        <p className="text-lg text-center font-semibold text-blue-500">
          "Trường Đại học Sao Đỏ - Nơi chắp cánh ước mơ, kiến tạo tương lai. Với
          sứ mệnh đào tạo nguồn nhân lực chất lượng cao, chúng tôi luôn đồng
          hành cùng sinh viên trên hành trình chinh phục tri thức và xây dựng sự
          nghiệp vững chắc."
        </p>
      </div>
    </div>
  );
};

export default Comment;
