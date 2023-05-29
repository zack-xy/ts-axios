import { AxiosRequestConfig, AxiosPromise, Method } from "../types";
import dispatchRequest from './dispatchRequest';

// Axios类，实例有request方法和get、delete等一系列方法
export default class Axios { 
  
   // request重载，支持不同方式的调用
   request(url: any, config?: any): AxiosPromise {
    if(typeof url === 'string') {
      if(!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
   }
  //  request(config: AxiosRequestConfig): AxiosPromise {
  //   return dispatchRequest(config)
  //  }

   get(url: string, config?:AxiosRequestConfig): AxiosPromise{
    return this._requestMethodWithoutData('get', url, config)   
   }

   delete(url: string, config?:AxiosRequestConfig): AxiosPromise{
    return this._requestMethodWithoutData('delete', url, config)   
   }

   head(url: string, config?:AxiosRequestConfig): AxiosPromise{
    return this._requestMethodWithoutData('head', url, config)   
   }

   options(url: string, config?:AxiosRequestConfig): AxiosPromise{
    return this._requestMethodWithoutData('options', url, config)   
   }

   post(url: string, data?: any, config? : AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config )
   }

   patch(url: string, data?: any, config? : AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config )
   }

   put(url: string, data?: any, config? : AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config )
   }

   // 不传data的扩展
   _requestMethodWithoutData(method: Method, url: string, config? : AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))  
   }

   // 传data的扩展
   _requestMethodWithData(method: Method, url: string, data?: any, config? : AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))  
   }
}
  