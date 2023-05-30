XSRF又名CSRF,跨站请求伪造

跨域请求时，会自动带上目标域的cookie（withCredentials是true，同一浏览器）

所以导致其他黑客网站可能假装用户在操作发送请求

防止的方法：在header上带上非客户端生成的token以验证是否是合法网站的请求


