import { get, post, patch, deletes } from "../Utils/request";

export const login = async (data) => {
  const result = await post(data, "login");
  return result;
};

export const getInfo = async (token) => {
  const res = await fetch("http://localhost:3000/api/authToken", {
    method: "GET",
    headers: {
      
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const AccountServices = async () => {
  const result = await get("account");
  return result;
};

export const AccountIdUpdate = async (id) => {
  const result = await get(`account/${id}`);
  return result;
};

export const createAccount = async (data) => {
  const result = await post(data, "account");
  return result;
};

export const editAccount = async (data, id) => {
  const result = await patch(data, `account/${id}`);
  return result;
};

export const deleteAccount = async (id) => {
  const result = await deletes(`account/${id}`);
  return result;
};
