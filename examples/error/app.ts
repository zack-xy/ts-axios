import axios, { AxiosError } from '../../src/index';


axios({
  method: 'get',
  url: '/error/get1',
}).then(res => {
  console.log('请求1成功', res);
}).catch(err => {
  console.log('请求1失败', err);
})


axios({
  method: 'get',
  url: '/error/get',
}).then(res => {
  console.log('请求2成功', res);
}).catch(err => {
  console.log('请求2失败', err);
})


axios({
  method: 'get',
  url: '/error/get',
}).then(res => {
  console.log('请求2成功', res);
}).catch(err => {
  console.log('请求2失败', err);
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get',
  }).then(res => {
    console.log('延时5秒请求成功', res);
  }).catch(err => {
    console.log('延时5秒请求失败', err);
  })
}, 5000);


axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log('2秒后超时请求成功', res);
}).catch((err:AxiosError) => {
  console.log(err.message )
  console.log(err.code )
  console.log(err.config )
  console.log(err.request )
  console.log('2秒后超时请求失败', err);
})
 