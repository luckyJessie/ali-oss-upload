<template>
  <div class="hello">
    <el-upload
      drag
      :show-file-list='true'
      class="uploader"
      action=""
      :auto-upload='false'
      :on-success="handleSuccess"
      :on-change="handleChange"
      ref="uploadInner">
      <img :src="imageUrl" alt="">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
import { getOssToken } from '@/api/upload'
import OSS from 'ali-oss'
export default {
  name: 'uploadCompt',
  props: {
    handleSuccess: {
      type: 'Function',
      default: () => {}
    },
    handleError: {
      type: 'Function',
      default: () => {}
    }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleChange (file, fileList) {
      let storeAs = 'upload-file'
      let params = {}
      getOssToken(params).then((res) => {
        /**
         * 设置获取token请求成功回调
         */
        let result = null
        try {
          result = JSON.parse(res)
        } catch (e) {
          return alert('parse sts response info error: ' + e.message)
        }
        let client = new OSS({
          // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
          region: '<Your region>',
          // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
          accessKeyId: result.AccessKeyId,
          accessKeySecret: result.AccessKeySecret,
          stsToken: result.SecurityToken,
          endpoint: '<oss endpoint>',
          bucket: '<Your bucket name>'
        })
        // storeAs表示上传的object name , file表示上传的文件
        client.multipartUpload(storeAs, file, {
          progress: (p) => {
            // 上传进度
            file.progress.percent = p * 100
          },
          headers: {
            // 设置上传回调
            'x-oss-callback': result.callback,
            'x-oss-callback-var': result['callback-var']
          }
        }).then((result) => {
          console.log(result)
          /**
           * 设置本地上传成功的回调
           */
          this.imageUrl = result.res.requestUrl
          this.handleSuccess()
        }).catch(function (err) {
          console.log(err)
          this.handleError(err)
          /**
           * 设置本地上传失败的回调
           */
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
