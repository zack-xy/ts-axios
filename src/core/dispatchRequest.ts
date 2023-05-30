import { buildURL } from '../helpers/url';
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import xhr from './xhr';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders, flattenHeaders } from '../helpers/headers'; 
import transform from './transform';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    throwIfCancellationRequested(config)
    processConfig(config)
    return xhr(config).then((res: AxiosResponse) => {
        return transformResponseData(res)
    })
}

// 在请求前对config进行处理
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config)
    // config.headers = transformHeaders(config)
    // config.data = transformRequestData(config) 
    config.data = transform(config.data, config.headers, config.transformRequest)
    config.headers = flattenHeaders(config.headers, config.method!)
}

// 转换config中的url
function transformURL(config: AxiosRequestConfig): string {
    const {url, params, paramsSerializer} = config
    return buildURL(url!, params, paramsSerializer)
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
    // res.data = transformResponse( res.data)
    // return res
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}

// 如果请求已经取消不需要请求
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    if(config.cancelToken) {
        config.cancelToken.throwIfRequested() 
    }
}
