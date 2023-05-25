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


///// 测试post请求data参数  -- start
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

axios({
  method:'post',
  url: '/base/buffer',
  data: arr
})

///// 测试post请求data参数  -- end


////// 测试设置header -- start

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 'no set content-type',
    b: 'still get the correct data'
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */* '
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams // 浏览器本来就支持，自动设置content-type
})


////// 测试设置header -- end

