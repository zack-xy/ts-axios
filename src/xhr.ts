import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index';
import { parseHeaders } from './helpers/headers';

// 请求的实际实现
export default function xhr(config: AxiosRequestConfig): AxiosPromise {

  return new Promise((resolve, reject) => {
    const {data=null, url, method='get', headers, responseType} = config

    const request = new XMLHttpRequest()

    if(responseType) {
      request.responseType = responseType
    }
  
    request.open(method.toUpperCase(), url, true) 

    request.onreadystatechange = function handleLoad() {
      if(request.readyState !== 4) {
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
      resolve(response)
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
  })

} 
 