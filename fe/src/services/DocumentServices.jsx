export const getDocuments = async () => {
  const res = await fetch("http://localhost:3000/api/documents", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const result = await res.json();
  return result;
};


export const createDocument = async(data) => {
    const res = await fetch("http://localhost:3000/api/documents/upload/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    })
    const result = await res.json();
    return result;
}
  
  export const getDocumentById = async (id) => {
    const res = await fetch(`http://localhost:3000/api/documents/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const result = await res.json();
    return result;
  };

  export const getDocumentDownload = async (id) => {
    const res = await fetch(`http://localhost:3000/api/documents/download/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const result = await res.json();
    return result;
  };
  
  // export const editDocument= async (data, id) => {
  //   const res = await fetch(`http://localhost:3000/api/documents/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   const result = await res.json();
  //   return result;
  // };
  
  export const deleteDocument = async (id) => {
    const result = await fetch(`http://localhost:3000/api/documents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    return result;
  };