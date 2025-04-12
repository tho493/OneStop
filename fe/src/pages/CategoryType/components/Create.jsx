import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { createCategoryType } from "../../../services/CategoryTypeServices";
import { useEffect } from "react";
import { getAllDocuments } from "../../../redux-tookit/documentSlice";
import { useNavigate } from "react-router-dom";
import FormCategoryType from "./Form";

const CreateCategoryType = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { documents } = useSelector((state) => state.document);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllDocuments());
  }, [dispatch]);
  const onFinish = async (values) => {
    const response = await createCategoryType(values);
    console.log(response)
    if(response) {
      message.success("Thêm loại yêu cầu thành công");
      navigate('/admin/category-type');
    } else {
      message.error("Thêm loại yêu cầu thất bại");
    }
  };
  return (
    <div className={`h-full ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className="mt-10 mx-6">
        <h1 className="text-3xl font-bold text-orange-300">
          Thêm loại yêu cầu
        </h1>
        <FormCategoryType documents={documents} onFinish={onFinish} />
      </div>
    </div>
  );
};

export default CreateCategoryType;
