import { AxiosRequestConfig } from './types/index';

// 请求的实际实现
export default function xhr(config: AxiosRequestConfig): void {
  const {data=null, url, method='get', headers} = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => { // 如果数据为空，不必要设置content-type
    if(data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
 
  request.send(data)

} 
 