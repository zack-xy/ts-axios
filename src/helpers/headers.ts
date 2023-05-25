import { isPlainObject } from './util';

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

export function processHeaders(headers: any, data: any): void {

  normalizeHeaderName(headers, 'Content-Type')

  if(isPlainObject(data)) { // 如果数据data是一个对象，而且没有设置Content-Type，则设置个默认的
    if(headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  } 

  return headers
}
