export const getTypeItem = async () => {
    const res = await fetch("http://localhost:3000/api/yeu-cau", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    return result;
  };

  export const getTypeItemById = async (id) => {
    const res = await fetch(`http://localhost:3000/api/yeu-cau/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    const result = await res.json();
    return result;
  };

  export const getTypeFromStudent = async(student_id) => {
    const res = await fetch(`http://localhost:3000/api/yeu-cau/student-type/${student_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const result = await res.json();
    return result
  }

  // export const postTypeAdmin = async (data) => {
  //   const res = await fetch("http://localhost:3000/api/yeu-cau/create", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   const result = await res.json();
  //   return result;
  // };

  export const postTypeItem = async (formData) => {
    const res = await fetch("http://localhost:3000/api/yeu-cau/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    });
    const result = await res.json();
    return result;
  };

  // export const editTypeItem = async (data, id) => {
  //   const res = await fetch(`http://localhost:3000/api/yeu-cau/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data)
  //   });
  
  //   const result = await res.json();
  //   return result;
  // }; 

  export const updateTypeItemStatus = async (id, data) => {
    const res = await fetch(`http://localhost:3000/api/yeu-cau/status/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const text = await res.text(); // 👈 nhận chuỗi lỗi nếu không phải JSON
      throw new Error(text);         // 👈 ném lỗi cho frontend catch
    }
  
    const result = await res.json(); // 👈 chỉ gọi nếu res.ok
    return result;
  };

  export const deleteTypeItem = async (id) => {
    const res = await fetch(`http://localhost:3000/api/yeu-cau/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    return res;
  }; 
  