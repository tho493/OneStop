import { useDispatch, useSelector } from "react-redux";
import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { getAllCategoryType } from "../../redux-tookit/categoryTypeSlice";
import { deleteCategoryType } from "../../services/CategoryTypeServices";
import { Link } from "react-router-dom";

const CategoryType = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [ categoryTypeList, setCategoryTypeList ] = useState([]);
  const { loading, categoryTypes } = useSelector((state) => state.categoryType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoryType());
  }, [dispatch])

  useEffect(() => {
    setCategoryTypeList(categoryTypes);
  }, [categoryTypes])

  const handleDelete = async (id) => {
    const response = await deleteCategoryType(id);
    if(response) {
      message.success(`Xóa thành công loại yêu cầu: ${id}`);
      setCategoryTypeList(categoryTypeList.filter((item) => item.loai_yeu_cau_id !== id));
    } else {
      message.error(`Xóa thất bài loại yêu cầu: ${id}`);
    }
  }

  const columns = [
    { title: "Id", dataIndex: "loai_yeu_cau_id", key: "loai_yeu_cau_id" },
    { title: "Tên yêu cầu", dataIndex: "ten_loai", key: "ten_loai" },
    { title: "Id hồ sơ", dataIndex: "document_id", key: "document_id" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <>
          <Link to={`/admin/category-type/edit?id=${record.loai_yeu_cau_id}`} className="mx-2">Sửa</Link>
          <Link onClick={() => handleDelete(record.loai_yeu_cau_id)} className="mx-2">Xóa</Link>
        </>
      ),
    },
  ];

  return (
    <div className={`h-full ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className="mt-10 mx-6">
        <h1 className="text-3xl font-bold text-orange-300">
          Quản lý loại yêu cầu
        </h1>
        <div className="mt-2">
          <Table
            loading={loading}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ margin: 0 }}>
                  <p>Chi tiết loại yêu cầu</p>
                  <p>Loại yêu cầu: {record.loai_yeu_cau_id}</p>
                  <p>Yêu cầu: {record.ten_loai}</p>
                  <p>Id tài liệu: {record.document_id}</p>
                </div>
              ),
              rowExpandable: (record) => record.loai_yeu_cau_id !== "Not Expandable",
            }}
            dataSource={categoryTypeList.map((item, index) => (
              {
                key: index,
                ...item
              }
            ))}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryType;