import axios from 'axios'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import store from './../store/store'
import * as types from './../store/types'
import router from './../router'

//配置API地址
var root = process.env.API_ROOT

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios(method, url, params) {
  return new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        withCredentials: false
      })
      .then(function(res) {
        if (res.data.status === 200) {
          resolve(res.data);
        } else {
          Indicator.close();
          if (url.indexOf('/apis/apps//H5') != -1 && url.indexOf('/apis/apps/null/H5') != -1) {
            store.commit(types.APPIDLOSE)
            router.replace({
              path: 'errPage',
              query: { redirect: router.currentRoute.fullPath }
            })
          } else {
            if (res.data.status == 401) {
              store.commit(types.LOGOUT);
              router.replace({
                path: 'login',
                query: { redirect: router.currentRoute.fullPath }
              })
            } else {
              resolve(res.data);
              Indicator.close();
              Toast(res.data.errMsg);
              // MessageBox.alert(res.data.errMsg || '服务端发生异常', '提示');
            }
          }
        }
      }, err => {
        Indicator.close();
        reject(err)
      })
      .catch(function(error) {
        Indicator.close();
        console.log(error)
      })
  })
}

//post API
export function axiosPostAPI(url, params) {
  return apiAxios('POST', url, params);
}

//get API
export function axiosGetAPI(url, params = {}) {
  return apiAxios('GET', url, params);
}

//put API
export function axiosPutAPI(url, params = {}) {
  return apiAxios('PUT', url, params);
}

//delete API
export function axiosDeleteAPI(url,params={}){
    return apiAxios('DELETE', url, params);
}