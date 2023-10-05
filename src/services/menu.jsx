import axios from "axios";

export const getAllNourishments = () => {
    return axios.get('/menu/')
}

export const createNourishments = (image,description,price) => {
    return axios.post('/menu/',{
        image: image,
        description: description,
        price: price
    })
}

export const getNourishmentsByIdList = (ids_list) => {
    return axios.post('/menu/nourishments/',{ ids_list: ids_list } );
}