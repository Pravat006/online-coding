import axios from "axios";

const formdataConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
};
const jsonConfig = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
};
const defaultConfig = {
    withCredentials: true,
};

const axiosInstance = axios.create({
    baseURL: "http://localhost:5054/api/v0",
})









