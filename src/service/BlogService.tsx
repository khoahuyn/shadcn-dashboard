import axios from "axios";

export const BASE_URL = "http://localhost:8080/blogs";


export const createPost = async (postData: any) => {
    return await axios
        .post(`${BASE_URL}/create`, postData)
        .then((response) => response.data)
        .catch((error) => {
            // Xử lý lỗi nếu có
            console.error("Error creating post:", error);
            throw error; // Đưa lỗi tiếp tục xử lý bên ngoài nếu cần
        });
};


