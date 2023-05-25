import axios from 'axios';

/*

//Rodar com IPV4:json-server –watch -d 180 –host SEU-IP db.json

*/

const api = axios.create({
    baseURL:' http://localhost:3000/foods'
})

export default api;