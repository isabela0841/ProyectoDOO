import axios from "axios";

const baseUrl = 'http://localhost:8080/products';

export const findAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;

}

export const create = async ({id, name, price, mark, category}) => {
    try {
        const response = await axios.post(baseUrl, {
            id,
            name,
            price,
            mark,
            category
        } );
        return response;
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const update = async ({id, name, price, mark, category}) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, {
            name,
            price,
            mark,
            category
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