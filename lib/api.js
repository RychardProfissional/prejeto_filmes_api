const axios = require("axios");

function CreateAxiosInstance(path = "") {
    const instance = axios.create()
    return instance;
}

api = CreateAxiosInstance();
module.exports = api
