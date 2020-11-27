// refactor(src): services
// add(src): services
// rm(src): services

// para modo produção
// const url = "https://ranekapi.origamid.dev/wp-json";

// aqui basicamente ficam os servicos externos
import axios from "axios";
// http://localhost:3000 -> ranek-api.json
const axiosInstance = axios.create({
  // para modo produção
  // baseURL: url + "/api"
  baseURL: "http://localhost/wp_ranek/wp-json/api",
});
// interceptador
axiosInstance.interceptors.request.use(
  function(config){
    const token = window.localStorage.token;
    if(token){
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error){
    return Promise.reject(error);
  }
)
export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(body){
    // para modo produção
    // return axios.post(url + "/jwt-auth/v1/token", body);
    return axios.post("http://localhost/wp_ranek/wp-json/jwt-auth/v1/token", body);
  },
  validateToken(){
    // para modo produção
    // return axiosInstance.post(url + "/jwt-auth/v1/token/validate");
    return axiosInstance.post("http://localhost/wp_ranek/wp-json/jwt-auth/v1/token/validate");
  }
  
};

// faz axios na api via cep
export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}