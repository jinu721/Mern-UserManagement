import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/"
  });  

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
        if(token && config.headers){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (err:unknown)=> Promise.reject(err)
)


axiosInstance.interceptors.response.use(
    (response)=>{
        console.log(`Response from backend ${JSON.stringify(response.data)}`)
        return response;
    },
    (err:unknown)=>{
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error('An Unexpected Error occured');
        }
    }
)

export {axiosInstance};