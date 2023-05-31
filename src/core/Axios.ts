import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, ResolvedFn, RejectedFn} from "../types";
import dispatchRequest, { transformURL } from './dispatchRequest';
import InterceptorManager from "./interceptorManager";
import mergeConfig from "./mergeConfig";

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
} 

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

// Axios类，实例有request方法和get、delete等一系列方法
export default class Axios {

   defaults: AxiosRequestConfig 
   interceptors: Interceptors

   constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
   }
  
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

    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLowerCase()

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    // 请求拦截器，先添加的后执行 
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    // 响应拦截器，先添加的先执行
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while(chain.length) {
      const { resolved,  rejected } = chain.shift()!
      promise = promise.then(resolved, rejected )
    }

    return promise
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

   getUri(config?: AxiosRequestConfig): string {
     config = mergeConfig(this.defaults, config)
     return transformURL(config)
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
  