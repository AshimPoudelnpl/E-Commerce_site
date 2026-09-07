import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("accessToken");

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("adminAvatar");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const postData = async (url: string, data?: Record<string, unknown>) => {
  try {
    const response = await axios.post(`${apiUrl}${url}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.log("POST API Error:", error);
    throw error;
  }
};

export const uploadData = async (url: string, formData: FormData) => {
  try {
    const response = await axios.put(`${apiUrl}${url}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.log("UPLOAD API Error:", error);
    throw error;
  }
};

export const getData = async (url: string) => {
  try {
    const response = await axios.get(`${apiUrl}${url}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.log("GET API Error:", error);
    throw error;
  }
};

export const putData = async (url: string, data?: Record<string, unknown | null>) => {
  try {
    const response = await axios.put(`${apiUrl}${url}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.log("PUT API Error:", error);
    throw error;
  }
};

export const postUpload = async (url: string, formData: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}${url}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.log("POST UPLOAD API Error:", error);
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    const response = await axios.delete(`${apiUrl}${url}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.log("DELETE API Error:", error);
    throw error;
  }
};
