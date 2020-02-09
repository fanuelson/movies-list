import Axios from "axios";


// https://api.themoviedb.org/3/movie/550?api_key=3544ac49bd30e0a58123c5191ba8dee8

const apiKeyQueryParam = 'api_key=3544ac49bd30e0a58123c5191ba8dee8';
const apiLanguage = '&language=en-us';

const movieApi = Axios.create({
    baseURL: 'https://api.themoviedb.org/3',
  });
  

movieApi.interceptors.request.use((config) => {

    const prefix = config.url.includes('?') ? '&' : '?';
    config.url = config.url + prefix + apiKeyQueryParam + apiLanguage

    return config
})

export default movieApi