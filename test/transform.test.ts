import axios, {AxiosTransformer} from '../src/index';
import { getAjaxRequest } from './helper';
import { deepMerge } from '../src/helpers/util';
import { AxiosResponse } from '../src/types/index';

describe('defaults', () => {
      // 每个测试用例运行前的钩子函数
      beforeEach(() => {
        jasmine.Ajax.install()
      })
    
      // 每个测试用例运行后的钩子函数
      afterEach(() => {
        jasmine.Ajax.uninstall()
      })

      test('should transform JSON to string', () => {
        const data = {
          foo: 'bar'
        }

        axios.post('/foo', data)

        return getAjaxRequest().then(request => {
          expect(request.params).toBe('{"foo":"bar"}')
        })
      })

      test('should transform string to JSON', done => {
        let response: AxiosResponse
        axios('/foo').then(res => {
          response = res
        })

        return getAjaxRequest().then(request => {
          request.respondWith({
            status: 200,
            responseText: '{"foo":"bar"}'
          })
          setTimeout(() => {
            expect(typeof response.data).toBe('object')
            expect(response.data.foo).toBe('bar')
            done()
          }, 100);
        })
      })

      test('should override default transform', () => {
        const data = {
          foo: 'bar'
        }

        axios.post('/foo', data, {
          transformRequest(data) {
            return data
          }
        })

        return getAjaxRequest().then(request => {
          expect(request.params).toEqual(data)
        })
      })

      test('should allow an array of transformers', () => {
        const data = {
          foo: 'bar'
        }

        axios.post('/foo', data, {
          transformRequest: (axios.defaults.transformRequest as AxiosTransformer[]).concat(function(data) {
            return data.replace('bar', 'baz')
          })
        })

        return getAjaxRequest().then(request => {
          expect(request.params).toBe('{"foo":"baz"}')
        })
      })
    
      test('should allowing mutating headers', () => {
        const token = Math.floor(Math.random() * Math.pow(2,64)).toString(36)

        axios('foo', {
          transformRequest: (data, headers) => {
            headers['X-Authorization'] = token
            return data
          }
        })

        return getAjaxRequest().then(request => {
          expect(request.requestHeaders['X-Authorization']).toBe(token)
        })
      })
})
