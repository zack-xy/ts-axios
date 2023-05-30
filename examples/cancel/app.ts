import axios, { Canceler } from '../../src/index';


const CancelToken = axios.CancelToken
const source = CancelToken.source()


axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if(axios.isCancel(e)) {
    console.log('Request canceled', e.message);
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user')

  // 该请求不会被发出去
  axios.post('/cancel/post', {a: 1}, {
    cancelToken: source.token
  }).catch(function(e) {
    if(axios.isCancel(e)) {
      console.log(e.message);
    }
  })
   
}, 100);

// 取消请求方式二
let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if(axios.isCancel(e)) {
    console.log('Request canceled2 ', e.message);
  }
})

setTimeout(() => {
  cancel()
}, 500);


