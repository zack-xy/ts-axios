import axios, {AxiosTransformer} from '../src/index';
import { getAjaxRequest } from './helper';


describe('xsrf', () => {
      // 每个测试用例运行前的钩子函数
      beforeEach(() => {
        jasmine.Ajax.install()
      })
    
      // 每个测试用例运行后的钩子函数
      afterEach(() => {
        jasmine.Ajax.uninstall()
        document.cookie = axios.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 84600000)
.toUTCString() 
      })

      test('should not set xsrf header if cookie is null', () => {
        axios('/foo')

        return getAjaxRequest().then(request => {
          expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
        })
      })

      test('should  set xsrf header if cookie is set', () => {
        document.cookie = axios.defaults.xsrfCookieName + '=12345'
        axios('/foo')

        return getAjaxRequest().then(request => {
          expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('12345')
        })
      })

      test('should not set xsrf header for cross origin', () => {
        document.cookie = axios.defaults.xsrfCookieName + '=12345'
        axios('http://example.com')

        return getAjaxRequest().then(request => {
          expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBeUndefined()
        })
      })

      test('should set xsrf header for cross origin using withCredentials', () => {
        document.cookie = axios.defaults.xsrfCookieName + '=12345'
        axios('http://example.com', {
          withCredentials: true
        })

        return getAjaxRequest().then(request => {
          expect(request.requestHeaders[axios.defaults.xsrfHeaderName!]).toBe('12345')
        })
      })
    
})
