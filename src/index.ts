import { buildURL } from './helpers/url';
import { AxiosRequestConfig } from './types';
import xhr from './xhr';
import { transformRequest } from './helpers/data';
import { processHeaders } from './helpers/headers';

function axios(config: AxiosRequestConfig) {
    processConfig(config)
    xhr(config)
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
    return buildURL(url, params)
}

// 转换config中的data
function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
    const { headers={}, data } = config
    return processHeaders(headers, data)
}

export default axios  
