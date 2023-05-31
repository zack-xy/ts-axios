// 跑测试之前都会执行这个文件

const JasmineCore = require('jasmine-core')

// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}

require('jasmine-ajax')
