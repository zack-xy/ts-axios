import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index';
import { parseHeaders } from './helpers/headers';
import { createError } from './helpers/error';

// 请求的实际实现
export default function xhr(config: AxiosRequestConfig): AxiosPromise {

  return new Promise((resolve, reject) => {
    const {data=null, url, method='get', headers, responseType, timeout} = config

    const request = new XMLHttpRequest()

    if(responseType) {
      request.responseType = responseType
    }

    if(timeout) {
      request.timeout = timeout
    }
  
    request.open(method.toUpperCase(), url, true) 

    request.onreadystatechange = function handleLoad() {
      if(request.readyState !== 4) {
        return
      }

      if(request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const resoponseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: resoponseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders, 
        config,
        request
      }
      handleResponse(response)
    }

    // 网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error',config, null, request)) 
    }

    // 超时事件
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // 设置请求头
    Object.keys(headers).forEach(name => { // 如果数据为空，不必要设置content-type
      if(data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
   
    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if(response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError (`Request failed with status code ${response.status}`, config, null,request, response))
      }
    }
  })

} 
 