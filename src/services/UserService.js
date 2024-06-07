import axios from "axios";

const baseUrl = 'http://localhost:8080/users';

export const findAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;

}

export const create = async ({id, username, email, password}) => {
    try {
        console.log(id, username, email, password);
        const response = await axios.post(baseUrl, {
            id,
            username,
            email,
            password
        } );
        return response;
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const update = async ({id, username, email, password}) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, {
            username,
            email,
            password,
        })
        return response;
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const remove = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return response;
    } catch (error) {
        console.log(error);
    }
    return undefined;
}