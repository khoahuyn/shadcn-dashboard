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


export const uploadPostImage = async (image: string, postId: string) => {
    let formData = new FormData();
    formData.append("image", image);
    return await axios
        .post(`localhost:8080/files/upload${postId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};