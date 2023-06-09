import { AxiosRequestConfig } from '../types/index';
import { deepMerge, isPlainObject } from '../helpers/util';

const strats = Object.create(null)

function defaultStrat(value1: any, value2: any): any {
  return typeof value2 !== 'undefined' ? value2 : value1 
}

// 只取val2的值
function fromVal2Strat(value1: any, value2: any): any {
   if(typeof value2 !== 'undefined') {
    return value2
   }
}

function deepMergeStrat(value1: any, value2: any): any {
  if(isPlainObject(value2)) {
     return deepMerge(value1, value2 )
  } else if(typeof value2 !== 'undefined') {
    return value2
  } else if(isPlainObject(value1)) {
    return deepMerge(value1)
  } else {
    return value1  
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']
const stratKeysDeepMerge = ['headers', 'auth']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat 
})

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig { 
  if(!config2) {
    config2 = {}
  }

  const config = Object.create(null)


  for(let key in config2) {
    mergeField(key)
  } 

  for(let key in config1) {
    if(!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
 
}
