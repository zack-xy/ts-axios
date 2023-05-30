import axios from '../../src/index';
import { AxiosError } from '../../src/types/index';

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
