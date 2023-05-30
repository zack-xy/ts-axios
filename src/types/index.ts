  export type Method = 'get' | 'GET' 
 | 'delete' | 'DELETE '
 | 'head' | 'HEAD'
 |  'options' | 'OPTIONS'
 | 'post' | 'POST'
 | 'put' | 'PUT'
 | 'patch' | 'PATCH '
 

 // axios传入配置项
 export interface AxiosRequestConfig {
   url?: string
   method?: Method
   data?: any
   params?: any
   headers?: any
   responseType?: XMLHttpRequestResponseType,
   timeout?: number
   transformRequest?: AxiosTransformer | AxiosTransformer[]
   transformResponse?: AxiosTransformer | AxiosTransformer[]


   [propName: string]: any
 } 

 export interface AxiosResponse<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
 }
 
 export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
  
 }

 export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig 
  code?: string | null
  request?: any
  response?: AxiosResponse
 }


 // 扩展接口
 export interface Axios {

   defaults: AxiosRequestConfig

   interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>
      response: AxiosInterceptorManager<AxiosResponse>
   }

   request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
   get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
   delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
   head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
   options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
   post<T = any>(url: string,data?:any, config?: AxiosRequestConfig): AxiosPromise<T>
   put<T = any>(url: string,data?:any, config?: AxiosRequestConfig): AxiosPromise<T>
   patch<T = any>(url: string,data?:any, config?: AxiosRequestConfig): AxiosPromise<T> 
 }

 // 混合接口，既本身是一个方法
 // 也有扩展接口  
 export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig):  AxiosPromise<T>
 }
 

 // 定义拦截器接口
 export interface AxiosInterceptorManager<T> {
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

    eject(id: number): void
 }
 
 export interface ResolvedFn<T> {
    (val: T): T | Promise<T>
 }

 export interface RejectedFn {
  (error: any): any
 }

 export interface AxiosTransformer {
   (data: any, headers?: any): any
 }

 export interface AxiosStatic extends AxiosInstance{
     create(config?: AxiosRequestConfig): AxiosInstance 
 } 
