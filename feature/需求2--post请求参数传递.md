XMLHttpRequest.send(data)

在XMLHttpRequest.send的API中，data需要是Documen、Blob、FormData、URLSearchParams、USVString等，这里不包含普通对象

我们进行post请求的时候，传过来的配置data一般都是普通对象

所以，需要将对象转换为字符串(USVString)


