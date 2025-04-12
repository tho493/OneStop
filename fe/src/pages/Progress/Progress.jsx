import React, { useState, useEffect } from "react";
import { Steps, Timeline, Button, message } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux-tookit/authSlice";
import { getStudentById } from "../../services/StudentServices";
import {
  deleteTypeItem,
  getTypeFromStudent,
} from "../../services/TypeItemServices";
import { getCategoryTypeById } from "../../services/CategoryTypeServices";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const Progress = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [students, setStudents] = useState({});
  const [typeItemId, setTypeItemId] = useState(null);
  const [nameType, setNameType] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch user info
  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);

  // Fetch data for student and type item
  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (!user?.user?.id) return;
  
        const getStudent = await getStudentById(user.user.id);
        setStudents(getStudent);
  
        const getType = await getTypeFromStudent(getStudent?.student_id);
        if(getType?.yeu_cau_id) {
          setTypeItemId(getType);
        } else {
          setTypeItemId(null);
        }
  
        if (getType?.loai_yeu_cau_id) {
          const getNameType = await getCategoryTypeById(getType.loai_yeu_cau_id);
          setNameType(getNameType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (user?.user?.id) {
      fetchApi();
    }
  }, [user]);

  // Map status to step index
  useEffect(() => {
    if (typeItemId?.status) {
      const statusToStep = {
        pending: 0,
        approved: 1,
        rejected: 2,
      };
      setCurrentStep(statusToStep[typeItemId.status]);
    } else {
      setCurrentStep(null);
    }
  }, [typeItemId]);

  // Handle delete type item
  const handleDelete = async () => {
    if (!typeItemId?.yeu_cau_id) return;

    const response = await deleteTypeItem(typeItemId.yeu_cau_id);
    if (response) {
      message.success("Hủy hồ sơ thành công");
      setTypeItemId(null); 
      navigate("/main");
    } else {
      message.error("Hủy hồ sơ thất bại");
    }
  };

  const steps = [
    { title: "Đang xử lý", icon: <ClockCircleOutlined /> },
    { title: "Hoàn tất", icon: <CheckCircleOutlined /> },
    { title: "Thất bại", icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Tiến trình xử lý hồ sơ sinh viên
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {typeItemId && typeItemId.status ? (
          <>
            {/* Thông tin sinh viên */}
            <div className="flex items-center gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Đang xử lý hồ sơ:{" "}
                  <span className="text-blue-600">{nameType?.ten_loai}</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Hồ sơ đang được xử lý, vui lòng chờ...
                </p>
                <div className="mt-2 flex gap-4">
                  <span className="text-sm text-gray-600">
                    <strong>Mã sinh viên:</strong> {students?.student_id}
                  </span>
                  <span className="text-sm text-gray-600">
                    <strong>Số điện thoại:</strong> {students?.phone_number}
                  </span>
                </div>
              </div>
            </div>

            {/* Thanh tiến trình */}
            <Steps current={currentStep} size="default" className="mb-8">
              {steps.map((step, index) => {
                const isRejected = currentStep === 2; // Kiểm tra trạng thái "Thất bại"
                const isCompletedStep = index === 1; // Bước "Hoàn tất"

                return (
                  <Step
                    key={index}
                    title={
                      isRejected && isCompletedStep ? (
                        <span className="text-gray-400">{step.title}</span> // Làm mờ chữ
                      ) : (
                        step.title
                      )
                    }
                    icon={
                      isRejected && isCompletedStep ? (
                        <ExclamationCircleOutlined style={{ color: "gray" }} /> // Dấu "X" màu xám
                      ) : (
                        step.icon
                      )
                    }
                    status={
                      index < currentStep
                        ? "finish"
                        : index === currentStep
                        ? "process"
                        : "wait"
                    }
                  />
                );
              })}
            </Steps>

            <div className="mt-10">
              {/* Timeline chi tiết */}
              <Timeline
                items={[
                  {
                    color: currentStep >= 0 ? "blue" : "gray",
                    children: (
                      <>
                        <p className="text-gray-700">Đang xử lý</p>
                        <span className="text-sm text-gray-500">
                          Phòng đào tạo đang xử lý hồ sơ yêu cầu của bạn, vui
                          lòng chờ.
                        </span>
                      </>
                    ),
                  },
                  {
                    color:
                      currentStep === 1 && currentStep !== 2 ? "blue" : "gray",
                    dot:
                      currentStep === 2 ? (
                        <ExclamationCircleOutlined style={{ color: "gray" }} />
                      ) : undefined,
                    children: (
                      <>
                        <p
                          className={`${
                            currentStep === 2
                              ? "text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          Hoàn tất
                        </p>
                        <span
                          className={`text-sm ${
                            currentStep === 2
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          {currentStep === 2
                            ? "Hồ sơ không đạt yêu cầu để thực hiện."
                            : "Hồ sơ đã xử lý xong, phòng đào tạo sẽ sớm liên lạc với bạn."}
                        </span>
                      </>
                    ),
                  },
                  {
                    color: currentStep >= 2 ? "blue" : "gray",
                    children: (
                      <>
                        <p className="text-gray-700">Thất bại</p>
                        <span className="text-sm text-gray-500">
                          Hồ sơ của bạn không đạt yêu cầu để thực hiện.
                        </span>
                      </>
                    ),
                  },
                ]}
              />
              <Button onClick={handleDelete} color="danger" variant="solid">
                Hủy hồ sơ
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full border border-gray-300 p-6 text-center text-gray-600">
            <h3 className="text-xl font-semibold">Không có yêu cầu nào</h3>
            <p>Hiện tại không có yêu cầu hồ sơ nào để hiển thị.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
