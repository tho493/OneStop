const { sql } = require("../config/db");
const fs = require("fs");
const path = require("path");

const uploadYeuCau = async (req, res) => {
    res.send("Upload successfully")
};

// Tạo yêu cầu mới
const createYeuCau = async (req, res) => {
  console.log("Received body:", req.body);
  console.log("Received file:", req.file);

  const { loai_yeu_cau_id, student_id, message } = req.body;
  const fileStudent = req.file?.filename || null;

  try {
    const result = await sql.query`
      INSERT INTO Yeu_cau (loai_yeu_cau_id, student_id, message, fileStudent, status)
      OUTPUT INSERTED.yeu_cau_id
      VALUES (${loai_yeu_cau_id}, ${student_id}, ${message}, ${fileStudent}, 'pending')`;

    const yeu_cau_id = result.recordset[0].yeu_cau_id;
    res.status(201).json({ message: "Yêu cầu được tạo thành công", yeu_cau_id });
  } catch (error) {
    console.error("Lỗi khi tạo yêu cầu:", error);
    res.status(500).send(error.message);
  }
};

const updateYeuCauStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send("Trạng thái không hợp lệ");
  }

  try {
    const result = await sql.query`
      UPDATE Yeu_cau
      SET status = ${status}, updated_at = GETDATE()
      WHERE yeu_cau_id = ${id}`;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Yêu cầu không tìm thấy");
    }

    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái:", error);
    res.status(500).send(error.message);
  }
};


// Lấy danh sách yêu cầu
const getYeuCau = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Yeu_cau`;
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// download Yeu Cau

const downloadYeuCau = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  // Kiểm tra file có tồn tại không
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File không tồn tại");
  }

  // Sử dụng res.download để tải file
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Lỗi khi tải file:", err.message);
      res.status(500).send("Lỗi khi tải file");
    }
  });
};

// Lấy yêu cầu theo ID
const getYeuCauById = async (req, res) => {
  const { id } = req.params;
  try {
    const result =
      await sql.query`SELECT * FROM Yeu_cau WHERE yeu_cau_id = ${id}`;
    if (result.recordset.length === 0) {
      return res.status(404).send("Yêu cầu không tìm thấy");
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Lay ho so theo id sinh vien
const getTypeFromStudent = async (req, res) => {
  const { student_id } = req.params;
  try {
    const result =
      await sql.query`SELECT * FROM Yeu_cau WHERE student_id = ${student_id}`;
    if (result.recordset.length === 0) {
      return res.status(404).send("Yêu cầu không tìm thấy");
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Cập nhật yêu cầu
const updateYeuCau = async (req, res) => {
  const { id } = req.params;
  const { loai_yeu_cau_id, student_id, message, status } = req.body;
  const fileStudent = req.file?.filename || null;
  try {
    const result = await sql.query`
            UPDATE Yeu_cau 
            SET loai_yeu_cau_id = ${loai_yeu_cau_id}, 
                student_id = ${student_id}, 
                message = ${message}, 
                status = ${status},
                fileStudent = ${fileStudent},
                updated_at = GETDATE() 
            WHERE yeu_cau_id = ${id}`;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Yêu cầu không tìm thấy");
    }
    res.json({ message: "Yêu cầu đã được cập nhật thành công" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Xóa yêu cầu
const deleteYeuCau = async (req, res) => {
  const { id } = req.params;
  try {
    const result =
      await sql.query`DELETE FROM Yeu_cau WHERE yeu_cau_id = ${id}`;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Yêu cầu không tìm thấy");
    }
    res.json({ message: "Yêu cầu đã được xóa thành công" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getYeuCau,
  getYeuCauById,
  createYeuCau,
  updateYeuCau,
  uploadYeuCau,
  deleteYeuCau,
  downloadYeuCau,
  getTypeFromStudent,
  updateYeuCauStatus
};