import { Method } from '../types';
import { deepMerge, isPlainObject } from './util';

// headers的规范化
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if(!headers) return
  Object.keys(headers).forEach(name => {
    if(name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]

      delete headers[name]
    }
  })
} 

// 处理请求的headers
export function processHeaders(headers: any, data: any): void {

  normalizeHeaderName(headers, 'Content-Type')

  if(isPlainObject(data)) { // 如果数据data是一个对象，而且没有设置Content-Type，则设置个默认的
    if(headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  } 

  return headers
}

// 处理返回数据中的headers，将字符串转换为对象
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if(!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if(!key) return
    if(value) {
      value = value.trim() 
    }
    parsed[key] = value
  })

  return parsed

}


export function flattenHeaders(headers: any, method: Method): any {
  if(!headers) {
    return headers
  }


  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options','post','put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method ]
  })

  return headers
}
