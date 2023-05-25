import axios from '../../src/index';

// 数组参数的测试
axios({
  method:'get',
  url: '/base/get',
  params: {
    foo: ['bar','baz']
  }
})


// 对象参数的测试
axios({
  method:'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})


// 日期参数的测试
axios({
  method:'get',
  url: '/base/get',
  params: {
    date: new Date() 
  }
})

// 特殊字符
axios({
  method:'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// 特殊字符
axios({
  method:'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null,
    baz2: undefined 
  }
})

// 携带hash
axios({
  method:'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar',
    baz: null,
    baz2: undefined 
  }
})


// 已有参数
axios({
  method:'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz' 
  }
})

