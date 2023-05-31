import axios, {AxiosTransformer} from '../src/index';
import { getAjaxRequest } from './helper';
import { parseHeaders } from '../src/helpers/headers';


describe('auth', () => {
  // 每个测试用例运行前的钩子函数
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  // 每个测试用例运行后的钩子函数
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should accept HTTP Basic auth with username/password', () => {
    axios('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame'
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
    })
  })

  test('should fail to encode HTTP Basic auth credentials with non-Latin1 characters', () => {
    
  })

})
