跨域请求可以通过CORS解决

同域情况下，发送请求会默认携带当前域下的cookie
在跨域请求下，请求是不会携带请求域下的cookie的
如果想要携带，需要设置请求的xhr对象的withCredentials为true
