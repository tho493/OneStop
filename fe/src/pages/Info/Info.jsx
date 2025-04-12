import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux-tookit/authSlice";
import { getStudentById } from "../../services/StudentServices";

const Info = () => {
  const [infoStudent, setInfoStudent] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const id = user.user.id;

  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getStudentById(id);
      setInfoStudent(response);
    };
    fetchApi();
  }, [id]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      {/* Container */}
      <motion.div
        className="flex bg-white rounded-lg shadow-lg w-[900px] h-auto overflow-hidden"
        variants={itemVariants}
      >
        {/* Profile Section */}
        <div className="flex-1 p-8">
          <motion.div
            className="animate-fade-in"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              Thông tin sinh viên
            </h1>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Information Section */}
              <div className="flex-1 mt-12">
                <div className="mb-6">
                  <span className="block text-gray-500 text-sm">
                    Mã sinh viên
                  </span>
                  <span className="block text-gray-800 text-lg font-bold">
                    {infoStudent.student_id}
                  </span>
                </div>
                <div className="mb-6">
                  <span className="block text-gray-500 text-sm">Họ tên</span>
                  <span className="block text-gray-800 text-lg font-bold">
                    {infoStudent.full_name}
                  </span>
                </div>
                <div className="mb-6">
                  <span className="block text-gray-500 text-sm">Ngày sinh</span>
                  <span className="block text-gray-800 text-lg font-bold">
                    {infoStudent.date_of_birth
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </span>
                </div>
                <div className="mb-6">
                  <span className="block text-gray-500 text-sm">Địa chỉ</span>
                  <span className="block text-gray-800 text-lg font-bold">
                    {infoStudent.address}
                  </span>
                </div>
                <div className="mb-6">
                  <span className="block text-gray-500 text-sm">
                    Số điện thoại
                  </span>
                  <span className="block text-gray-800 text-lg font-bold">
                    {infoStudent.phone_number}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Info;