import axios from "axios";
const request = axios.create({ 
    baseURL: "http://135.181.108.207/",
    headers:{
        "Authorization": 'Token 1ffd6995451529cbe8b47a4b934bba2643d20162',
    }
});

export { request };
