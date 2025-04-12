import React, { useEffect, useState } from "react";
import { Avatar, Button, List, message, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../redux-tookit/studentSlice";
import { Link } from "react-router-dom";
import { deleteStudents } from "../../services/StudentServices";

const Student = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(6);
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);
  useEffect(() => {
    dispatch(getAllStudents());
    setInitLoading(false);
  }, []);

  useEffect(() => {
    setData(students);
    setList(students.slice(0, visible));
  }, [students, visible]);

  const onLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newVisibleCount = visible + 6;
      setVisible(newVisibleCount);
      setList(data.slice(0, newVisibleCount));
      setLoading(false);
      window.dispatchEvent(new Event("resize"));
    }, 500);
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Xem thêm</Button>
      </div>
    ) : null;
  const deleteStudent = async (id) => {
    const response = await deleteStudents(id);
    if (response) {
      message.success(`Xóa thành công sinh viên: ${id}`);
      const updatedData = data.filter((student) => student.student_id !== id);
      setData(updatedData);
      setList(updatedData.slice(0, visible));
    } else {
      message.error(`Xóa thất bại sinh viện: ${id}`);
    }
  };

  return (
    <div className={`h-full ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className="mt-10 mx-6">
        <h1 className="text-3xl font-bold text-orange-300">
          Quản lý sinh viên
        </h1>
        <div className="mt-2">
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button key="list-loadmore-edit" color="cyan" variant="solid">
                    <Link to={`/admin/student/edit?id=${item.student_id}`}>
                      Sửa
                    </Link>
                  </Button>,
                  <Button
                    key="list-loadmore-more"
                    color="danger"
                    variant="solid"
                    onClick={() => deleteStudent(item.student_id)}
                  >
                    Xóa
                  </Button>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.picture.large} />}
                    title={
                      <>
                        <span
                          className={
                            theme === "dark" ? "text-white" : "text-black"
                          }
                        >
                          Tên sinh viên: {item.full_name}
                        </span>
                        <span> | </span>
                        <span
                          className={
                            theme === "dark" ? "text-white" : "text-black"
                          }
                        >
                          Mã sinh viên: {item.student_id}
                        </span>
                      </>
                    }
                    description={
                      <span
                        className={
                          theme === "dark" ? "text-white" : "text-black"
                        }
                      >
                        Ngày sinh:{" "}
                        {item.date_of_birth
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </span>
                    }
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Student;
