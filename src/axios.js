import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://yt-app-backend.herokuapp.com/'
})

export default instance;