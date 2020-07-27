import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);

var token = null;
var appId = null;

var tokenStorage = localStorage.getItem('token');

var appIdStorage = localStorage.getItem('appId');

if (tokenStorage) {
  token = tokenStorage.replace(appIdStorage + '_', '');
}

if (appIdStorage) {
  if (appIdStorage != null && appIdStorage != '') {
    appId = appIdStorage;
  }
}
export default new Vuex.Store({
  state: {
    user: {},
    token: token,
    title: '',
    appId: appId,
    custDetails: '',
    renewalPolicyDetail: {},
    insurePolicies: {},
    policyDetail: '',
    isnpolicyDetail: '',
    myDetail: {},
    authMode: '',
    loginInfo: '',
    orderdetails: ''
  },
  mutations: {
    [types.ORDERDETAILS]: (state, data) => {
      state.orderdetails = data;
    },
    [types.APPID]: (state, data) => {
      localStorage.appId = data;
      state.appId = data;
    },
    [types.APPIDLOSE]: (state) => {
      localStorage.removeItem('appId');
      state.appId = null
    },
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    },
    [types.CUSTDETAILS]: (state, data) => {
      state.custDetails = data;
    },
    [types.RENEWALPOLICYDETAILS]: (state, data) => {
      state.renewalPolicyDetail = data;
    },
    [types.INSUREPOLICIES]: (state, data) => {
      state.insurePolicies = data;
    },
    [types.POLICYDETAIL]: (state, data) => {
      state.policyDetail = data;
    },
    [types.ISNPOLICYDETAIL]: (state, data) => {
      state.isnpolicyDetail = data;
    },
    [types.AUTHMODE]: (state, data) => {
      localStorage.authMode = data;
      state.authMode = data;
    },
    [types.LOGININFO]: (state, data) => {
      state.loginInfo = data;
    }
  }
})
