import axios from '../../src/index';
import { AxiosError } from '../../src/types/index';
import qs from 'qs';

axios.get('/other/304').then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
})


axios.get('/other/304', {
  validateStatus(status) {
    return status >= 200 && status <= 400
  }
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
})


axios.get('/other/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res);
})

axios.get('/other/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a','b','c']
  }
}).then(res => {
  console.log(res);
})


const instance = axios.create({
  paramsSerializer(params) {
     return qs.stringify(params, {arrayFormat: 'brackets'})
  }
})

instance.get('/other/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a','b','c']
  }
}).then(res => {
  console.log(res);
}) 

const instance2 = axios.create({
  baseURL: 'https://pic1.zhimg.com/50/'
})

instance2.get('v2-257bb81683aa16bd75acd636434fb6f3_r.jpg')
