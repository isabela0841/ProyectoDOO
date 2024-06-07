import axios from "axios";

const baseUrl = 'http://localhost:8080/categories'

export const findAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;

}