import { isPlainObject } from "./util";

// 转化post请求data如果为对象，则转换为字符串
export function transformRequest(data: any): any {
  if(isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
