import axios from '../../src/index';

function getA() {
  return axios.get('/final/A')
}

function getB() {
  return axios.get('/final/B')
}

axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log(resA.data);
    console.log(resB.data);
  }))


axios.all([getA(), getB()])
.then(([resA, resB]) => {
  console.log(resA.data);
  console.log(resB.data);
})


const fakeConfig = {
  baseURL: 'https://www.baidu.com',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    name: 'zack'
  }
}

console.log(axios.getUri(fakeConfig));
