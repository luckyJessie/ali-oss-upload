import Vue from 'vue'
export function getOssToken (params) {
  return Vue.http.post('/upload/getOssToken', params)
}
