import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocuments } from "../../redux-tookit/documentSlice";
import { deleteDocument } from "../../services/DocumentServices";

const Document = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [documentList, setDocumentList] = useState([]);
  const { documents } = useSelector((state) => state.document);

  
  useEffect(() => {
    dispatch(getAllDocuments());
  }, [dispatch]);

  useEffect(() => {
    setDocumentList(documents)
  }, [documents])

  console.log(documentList)
  
  const handleDelete = async (id) => {
    const response = await deleteDocument(id);
    if(response) {
      message.success(`Xóa thành công tài liệu: ${id}`)
      setDocumentList((prevList) => prevList.filter((doc) => doc.document_id !== id));
    } else {
      message.error(`Xóa thất bại tài liệu: ${id}`)
    }
  }

  // Cột của bảng
  const columns = [
    {
      title: "Tên tài liệu",
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div>
          {/* <Button
          >
            <Link to={`/admin/document/edit?id=${record.document_id}`}>Sửa</Link>
          </Button> */}
          <Button
            danger
            onClick={() => handleDelete(record.document_id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={`h-full ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className="mt-10 mx-6">
        <h1 className="text-3xl font-bold text-orange-300">Quản lý tài liệu</h1>
        <div className="mt-2">
          <Table
            columns={columns}
            dataSource={documentList.map((doc, index) => ({
              key: index,
              ...doc,
            }))}
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ margin: 0 }}>
                  <p className="text-orange-600">Chi tiết tài liệu</p>
                  <p>Id tài liệu: {record.document_id} </p>
                  <p>Tên tài liệu: {record.file_name}</p>
                  <p>File: {record.file_path}</p>
                  <p>Ngày nộp: {record.uploaded_at}</p>
                </div>
              ),
              rowExpandable: (record) => !!record.file_path, // chỉ cho phép mở rộng khi có trường file_path
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Document;