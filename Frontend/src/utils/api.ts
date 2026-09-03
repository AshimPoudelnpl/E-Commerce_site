const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url: string, formData: Record<string, unknown>) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("POST API Error:", error);
    throw error;
  }
};