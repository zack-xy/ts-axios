import { buildURL } from '../helpers/url';
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import xhr from './xhr';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders } from '../helpers/headers';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then((res: AxiosResponse) => {
        return transformResponseData(res)
    })
}

// 在请求前对config进行处理
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

// 转换config中的url
function transformURL(config: AxiosRequestConfig): string {
    const {url, params} = config
    return buildURL(url!, params)
}
 
// 转换config中的data
function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

// 转换请求头
function transformHeaders(config: AxiosRequestConfig): any {
    const { headers={}, data } = config
    return processHeaders(headers, data)
}

// 处理响应的data为对象
function transformResponseData(res: AxiosResponse): AxiosResponse   {
    res.data = transformResponse( res.data)
    return res
}
