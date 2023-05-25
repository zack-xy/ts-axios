import { isDate, isObject } from "./util"

function encode(val: string): string { // 特殊字符处理
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
} 

export function buildURL(url: string, params?:any): string {
  if(!params) return url

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if(val === null || typeof val === 'undefined') {  // 如果是null或者undefined，不做处理，进入下一个循环
      return
    }

    let values = []
    if(Array.isArray(val)) {  // 如果参数是数组，拼接[]符号
      values = val
      key+='[]'
    } else {
      values = [val]
    }
    values.forEach(val=> {
      if(isDate(val)) { 
        val = val.toISOString()
      } else if(isObject(val)) {
        val = JSON.stringify( val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  const markIndex = url.indexOf('#')
  if(markIndex !== -1) {
    url = url.slice(0, markIndex)  // 忽略hash
  }
  if(serializedParams) {
    url+=(url.indexOf('?')===-1?'?':'&') + serializedParams
  }

  return url
 
}
 