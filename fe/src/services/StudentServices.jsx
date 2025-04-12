export const StudentsServices = async () => {
  const res = await fetch("http://localhost:3000/api/students", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const result = await res.json();
  return result;
};

export const createStudent = async(data) => {
  const res = await fetch("http://localhost:3000/api/students", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const result = await res.json();
  return result;
}

export const getStudentById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/students/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  const result = await res.json();
  return result;
};

export const editStudents = async (data, id) => {
  const res = await fetch(`http://localhost:3000/api/students/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const result = await res.json();
  return result;
};

export const deleteStudents = async (id) => {
  const result = await fetch(`http://localhost:3000/api/students/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  })
  return result;
};