import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (
  url: string,
  formData?: Record<string, unknown>,
) => {
  try {
    const response = await axios.post(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("POST API Error:", error);
    throw error;
  }
};

export const putData = async (
  url: string,
  data: Record<string, unknown> = {},
) => {
  try {
    const response = await axios.put(apiUrl + url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("PUT API Error:", error);
    throw error;
  }
};

export const uploadData = async (url: string, formData: FormData) => {
  try {
    const response = await axios.put(apiUrl + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("UPLOAD API Error:", error);
    throw error;
  }
};

export const getData = async (url: string) => {
  try {
    const response = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("GET API Error:", error);
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    const response = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("DELETE API Error:", error);
    throw error;
  }
};
