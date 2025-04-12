import { useDispatch, useSelector } from "react-redux";
import { message, Table, Select } from "antd"; // Thêm Select từ Ant Design
import { useEffect, useState } from "react";
import { getAllTypeItem } from "../../redux-tookit/typeItemSlice";
import { deleteTypeItem, updateTypeItemStatus } from "../../services/TypeItemServices"; // Import hàm cập nhật status
import { Link } from "react-router-dom";

const { Option } = Select;

const TypeItem = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { loading, typeItems } = useSelector((state) => state.typeItem);
  const [typeItemsList, setTypeItemList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTypeItem());
  }, [dispatch]);

  useEffect(() => {
    setTypeItemList(typeItems);
  }, [typeItems]);

  const handleDelete = async (id) => {
    const response = await deleteTypeItem(id);
    if (response) {
      message.success(`Xóa yêu cầu thành công ${id}`);
      setTypeItemList(typeItemsList.filter((item) => item.yeu_cau_id !== id));
    } else {
      message.error(`Xóa yêu cầu thất bại`);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTypeItemStatus(id, { status: newStatus }); // <-- CHỈ truyền 'status'
      message.success("Cập nhật trạng thái thành công");
      setTypeItemList(
        typeItemsList.map((item) =>
          item.yeu_cau_id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại: " + error.message);
    }
  };

  const columns = [
    { title: "Id", dataIndex: "yeu_cau_id", key: "yeu_cau_id" },
    {
      title: "Id loại yêu cầu",
      dataIndex: "loai_yeu_cau_id",
      key: "loai_yeu_cau_id",
    },
    { title: "Mã sinh viên", dataIndex: "student_id", key: "student_id" },
    { title: "Mô tả", dataIndex: "message", key: "message" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(record.yeu_cau_id, newStatus)}
          style={{ width: 120 }}
        >
          <Option value="pending">Đang xử lý</Option>
          <Option value="approved">Đã duyệt</Option>
          <Option value="rejected">Từ chối</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <Link
          onClick={() => handleDelete(record.yeu_cau_id)}
          className="mx-2"
        >
          Xóa
        </Link>
      ),
    },
  ];

  return (
    <div className={`h-full ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className="mt-10 mx-6">
        <h1 className="text-3xl font-bold text-orange-300">Quản lý yêu cầu</h1>
        <div className="mt-2">
          <Table
            loading={loading}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ margin: 0 }}>
                  <p>Chi tiết loại yêu cầu</p>
                  <p>Id: {record.yeu_cau_id}</p>
                  <p>Loại yêu cầu id: {record.loai_yeu_cau_id}</p>
                  <p>Mã sinh viên: {record.student_id}</p>
                  <p>Mô tả: {record.message}</p>
                  <p>
                    Hồ sơ yêu cầu:{" "}
                    {record.fileStudent ? (
                      <a
                        href={`http://localhost:3000/api/yeu-cau/download/${record.fileStudent}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem yêu cầu
                      </a>
                    ) : (
                      "Không có file"
                    )}
                  </p>
                  <p>Trạng thái: {record.status}</p>
                </div>
              ),
              rowExpandable: (record) => record.yeu_cau_id !== "Not Expandable",
            }}
            dataSource={typeItemsList.map((item, index) => ({
              key: index,
              ...item,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default TypeItem;