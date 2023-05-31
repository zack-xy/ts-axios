export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise(function(resolve) {
    setTimeout(() => {
      return resolve(jasmine.Ajax.requests.mostRecent()) // 伪造的xhr对象
    }, 0);
  })
}
