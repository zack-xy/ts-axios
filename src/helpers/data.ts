import { isPlainObject } from "./util";

// 转化post请求data如果为对象，则转换为字符串
export function transformRequest(data: any): any {
  if(isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 转化返回数据中的data为对象
export function transformResponse(data: any): any {
  if(typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      
    }
  }
  return data
}
