```javascript
axios({
  method: 'get',
  url: '/simple/get',
  // 一般参数
  params: {
    a: 1,
    b: 2 
  }
  // 数组
  params: {
  	foo: ['bar','baz']
	}
	// 对象
	params: {
    foo: {bar:'baz'}
  }
	// Date
	params: {
    date: new Date()
  }
})
```

params里是get请求的参数

1. 如果是上面的形式，我们希望url带上参数`/base/get?a=1&b=2`

2. 数组，则`/base/get?foo[]=bar&foo[]=baz`
3. 对象，则`/base/get?foo=%7B%22bar....`  拼兑现encode结果
4. 日期，则`/base/get?date=2010-01-01T05:55:39.030Z`拼date.toISOString()
5. 特殊字符`@` `:` `$`  `[` `]`不要encode ，空格转换为`+`
6. 参数如果是null或者undefined,参数不传
7. 不要hash标记（比如url: '/simple/get#hash'，#hash不要）
8. 保留原有的参数(url: '/simple/get?name='原有参数 ')