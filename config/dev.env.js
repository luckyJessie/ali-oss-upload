'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PIC_API: '"http://p6wy4yl6s.bkt.clouddn.com/"',
  BASE_API: '"//test.audit.admin.yixia.com"'
})
