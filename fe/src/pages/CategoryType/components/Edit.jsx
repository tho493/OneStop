import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { editCategoryType, getCategoryTypeById } from "../../../services/CategoryTypeServices";
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../redux-tookit/documentSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormCategoryType from "./Form";

const EditCategoryType = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { documents } = useSelector((state) => state.document);
  const [ categoryTypeId, setCategoryTypeId ] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    dispatch(getAllDocuments());
  }, [dispatch]);

  useEffect(() => {
    const getCategoryTypeId = async () => {
      const response = await getCategoryTypeById(id);
      if(response) {
        setCategoryTypeId(response)
      }
    }
    getCategoryTypeId()
  }, [])

  const onFinish = async (values) => {
    const response = await editCategoryType(values, id);
    if(response) {
      message.success("Cập nhật loại yêu cầu thành công");
      navigate('/admin/category-type');
    } else {
      message.error("Cập nhật loại yêu cầu thất bại");
    }
  };
  return (
    <div className={`h-full ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className="mt-10 mx-6">
        <h1 className="text-3xl font-bold text-orange-300">
          Sửa loại yêu cầu
        </h1>
        <FormCategoryType documents={documents} onFinish={onFinish} categoryTypeId={categoryTypeId}/>
      </div>
    </div>
  );
};

export default EditCategoryType;
