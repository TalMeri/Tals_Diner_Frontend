import axios from "axios";

export const createUser = (username, password) => {
    return axios.post('/user/',{
        username: username,
        password: password
    });
};

export const login = (username, password) => {
    return axios.post('/auth/login',{
        username: username,
        password: password
    });
};

export const logout = () => {
    return axios.post('/auth/logout');
};