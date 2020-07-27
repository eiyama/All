'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://192.168.6.251:8099"', // 本地IP,局域网内可以访问
  API_ROOT: '"http://localhost:8090/"', // 本地
  DIR_NAME: '"/"',
})
