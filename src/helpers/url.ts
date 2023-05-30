import { isDate, isPlainObject, isURLSearchParams } from "./util"

interface URLOrigin {
  protocol: string
  host: string
}

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

export function buildURL(url: string, params?:any, paramsSerializer?: (param: any) => string): string {
  if(!params) return url

  let serializedParams

  if(paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if(isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {

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
        } else if(isPlainObject(val)) {
          val = JSON.stringify( val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')

  }

  const markIndex = url.indexOf('#')
  if(markIndex !== -1) {
    url = url.slice(0, markIndex)  // 忽略hash
  }

  if(serializedParams) {
    url+=(url.indexOf('?')===-1?'?':'&') + serializedParams
  }

  return url
 
}

export function isAbsoluteURL(url: string): boolean {
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/,'') + '/' + relativeURL.replace(/^\/+/,'') : baseURL
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

// 判断一个url跟当前的url是否在一个域
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host ===  currentOrigin.host
} 

// 解析一个链接的【协议】和【端口】
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}
   