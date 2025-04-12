const API_DOMAIN = "http://localhost:3000/api/";

export const get = async (patch) => {
  const res = await fetch(API_DOMAIN + patch);
  const result = await res.json();
  return result;
};

export const post = async (data, patch) => {
  const res = await fetch(API_DOMAIN + patch, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export const deletes = async (patch) => {
  const res = await fetch(API_DOMAIN + patch, {
    method: "DELETE",
  });
  const result = await res.json();
  return result;
};

export const patch = async (data, patch) => {
  const res = await fetch(API_DOMAIN + patch, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = res.json(data);
  return result;
};
