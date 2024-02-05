// https://api.rawg.io/api/games?page_size=5&key=e01533e174e140bc831c2d2c0f628fb4

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.rawg.io/api/'
})

export default api