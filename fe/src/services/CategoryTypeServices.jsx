export const getCategoryType = async () => {
    const res = await fetch("http://localhost:3000/api/loai-yeu-cau", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    const result = res.json();
    return result;
  };

  export const getCategoryTypeById = async (id) => {
    const res = await fetch(`http://localhost:3000/api/loai-yeu-cau/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    const result = await res.json();
    return result;
  };

  export const createCategoryType = async (data) => {
    const res = await fetch("http://localhost:3000/api/loai-yeu-cau", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
  
    const result = await res.json();
    return result;
  }; 

  export const editCategoryType = async (data, id) => {
    const res = await fetch(`http://localhost:3000/api/loai-yeu-cau/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
  
    const result = await res.json();
    return result;
  }; 

  export const deleteCategoryType = async (id) => {
    const res = await fetch(`http://localhost:3000/api/loai-yeu-cau/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    return res;
  }; 