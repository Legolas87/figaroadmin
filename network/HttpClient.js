import axios from 'axios';
import Router from 'next/router'

const BASE_URL = 'https://app.figaro.am:15551/FigaronAPI/api/';

class HttpClient {
  static instance = null;

  static getInstance = () => {
    if (HttpClient.instance === null) {
      HttpClient.instance = axios.create({
        baseURL: BASE_URL,
        timeout: 35000,
      });
      HttpClient.instance.interceptors.response.use(response => response, error =>
         {
          if (error.response.status === 401) {
            Router.push('/');
           }
           return Promise.reject(error);
         }
        
         );
    }

    return HttpClient.instance;
  }
}

export default HttpClient;
