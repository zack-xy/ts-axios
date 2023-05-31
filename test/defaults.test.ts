import axios, {AxiosTransformer} from '../src/index';
import { getAjaxRequest } from './helper';
import { deepMerge } from '../src/helpers/util';

describe('defaults', () => {
      // 每个测试用例运行前的钩子函数
      beforeEach(() => {
        jasmine.Ajax.install()
      })
    
      // 每个测试用例运行后的钩子函数
      afterEach(() => {
        jasmine.Ajax.uninstall()
      })

      test('should transform request json', () => {
        expect((axios.defaults.transformRequest as AxiosTransformer[])[0]({foo:'bar'})).toBe('{"foo":"bar"}')
      })

      test('should do nothing to request string', () => {
        expect((axios.defaults.transformRequest as AxiosTransformer[])[0]('foo=bar')).toBe('foo=bar')
      })

      test('should transform response json', () => {
        const data = (axios.defaults.transformResponse as AxiosTransformer[])[0]('{"foo":"bar"}')

        expect(typeof data).toBe('object')
        expect(data.foo).toBe('bar')
      })

      test('should do nothing to response string', () => {
        expect((axios.defaults.transformResponse as AxiosTransformer[])[0]('foo=bar')).toBe('foo=bar')
      })

      test('should use global defaults config', () => {

        axios('/foo')

        return getAjaxRequest().then(request => {
          expect(request.url).toBe('/foo')
        })
      })

      test('should use midified defaults config', () => {

        axios.defaults.baseURL = 'http://example.com'

        axios('/foo')

        return getAjaxRequest().then(request => {
          expect(request.url).toBe('http://example.com/foo')
          delete axios.defaults.baseURL
        })
      })

      test('should use request config', () => {

        axios('/foo', {
          baseURL: 'http://example.com'
        })

        return getAjaxRequest().then(request => {
          expect(request.url).toBe('http://example.com/foo')
        })
      })

      test('should use default config for custom instance', () => {

        const instance = axios.create({
          xsrfCookieName: 'CUSTOM-XSRF-TOKEN',
          xsrfHeaderName: 'X-CUSTOM-XSRF-TOKEN'
        })

        document.cookie = instance.defaults.xsrfCookieName + '=foo'

        instance.get('/foo')
        return getAjaxRequest().then(request => {
          expect(request.requestHeaders[instance.defaults.xsrfHeaderName!]).toBe('foo')
          document.cookie = instance.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 84600000)
.toUTCString()        })
      })

      test('should use GET headers', () => {
        axios.defaults.headers.get['X-CUSTON-HEADER'] = 'foo'
        axios.get('/foo')

        return getAjaxRequest().then(request => {
          expect(request.requestHeaders['X-CUSTON-HEADER']).toBe('foo')
          delete axios.defaults.headers.get['X-CUSTON-HEADER']
        })
      })

      test('should use POST headers', () => {
        axios.defaults.headers.post['X-CUSTON-HEADER'] = 'foo'
        axios.post('/foo', {})

        return getAjaxRequest().then(request => {
          expect(request.requestHeaders['X-CUSTON-HEADER']).toBe('foo')
          delete axios.defaults.headers.post['X-CUSTON-HEADER']
        })
      })

      test('should use header config', () => {
        const instance = axios.create({
          headers: {
            common: {
              'X-COMMON-HEADER': 'commonHeaderValue'
            },
            get: {
              'X-GET-HEADER': 'getHeaderValue'
            },
            post: {
              'X-POST-HEADER': 'postHeaderValue'
            }
          }
        })

        instance.get('/foo', {
          headers: {
            'X-FOO-HEADER': 'fooHeaderValue',
            'X-BAR-HEADER': 'barHeaderValue'
          }
        })

        return getAjaxRequest().then(request => {
          expect(request.requestHeaders).toEqual(
            deepMerge(axios.defaults.headers.common, axios.defaults.headers.get, {
              'X-COMMON-HEADER': 'commonHeaderValue',
              'X-GET-HEADER': 'getHeaderValue',
              'X-FOO-HEADER': 'fooHeaderValue',
              'X-BAR-HEADER': 'barHeaderValue'
            })
          )
        })
      })

      test('should be used by custom instance if set before instance created', () => {
        axios.defaults.baseURL = 'http://example.com'
        const instance = axios.create()

        instance.get('/foo')
        return getAjaxRequest().then(request => {
          expect(request.url).toBe('http://example.com/foo')
          delete axios.defaults.baseURL
        })
      })

      test('should not be used by custom instance if set after instance created', () => {
        const instance = axios.create()
        axios.defaults.baseURL = 'http://example.com'

        instance.get('/foo')
        return getAjaxRequest().then(request => {
          expect(request.url).toBe('/foo')
        })
      })
})
