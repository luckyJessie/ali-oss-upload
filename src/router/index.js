import Vue from 'vue'
import Router from 'vue-router'
import upload from '@/views/upload'
import elUploadOss from '@/views/el-upload-oss'
import fileUploaderOss from '@/views/fileUploader-oss'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'upload',
      component: upload
    },
    {
      path: '/el-upload-oss',
      name: 'el-upload-oss',
      component: elUploadOss
    },
    {
      path: '/fileUploader-oss',
      name: 'fileUploader-oss',
      component: fileUploaderOss
    }
  ]
})
