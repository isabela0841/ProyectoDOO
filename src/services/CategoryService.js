import axios from "axios";

const initCategories = [
    {
        id: 1,
        name: 'Ropa exterior',
        description: 'Prendas superiores del torso'
    },
    {
        id: 2,
        name: 'Pantalones',
        description: 'Prendas inferiores'
    },
    {
        id: 3,
        name: 'Gorras',
        description: 'Prendas para la cabeza'
    }
];

const baseUrl = 'http://localhost:8080/categories'

export const listCategories = () => {
    return initCategories;
}

export const findAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;

}