import axios from "axios"

export default async function uploadFile(destination: string, fileUrl: string) {
    try {
        await axios.post("http://localhost:8080/files/upload", destination, )
    } catch (error) {
        console.log(error)
    }
}