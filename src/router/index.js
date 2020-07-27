import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'
import * as types from './../store/types';

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

if (window.localStorage.getItem('appId')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const routes = [{
    path: '/login',
    name: 'login',
    component: resolve => require(['../components/quoteManagement/login.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/errPage',
    name: 'errPage',
    component: resolve => require(['../components/quoteManagement/errPage.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/index',
    name: 'quoteIndex',
    component: resolve => require(['../components/quoteManagement/quoteIndex.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/quoteDetail',
    name: 'quotedetail',
    component: resolve => require(['../components/quoteManagement/quoteDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/preview',
    name: 'previewQuoteInfo',
    component: resolve => require(['../components/quoteManagement/previewQuoteInfo.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/uwResult',
    name: 'uwResult',
    component: resolve => require(['../components/quoteManagement/uwResult.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/payMode',
    name: 'payMode',
    component: resolve => require(['../components/quoteManagement/payMode.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/payMethod',
    name: 'payMethod',
    component: resolve => require(['../components/quoteManagement/payMethod.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/payResult',
    name: 'payResult',
    component: resolve => require(['../components/quoteManagement/payResult.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/carInCustomers',
    name: 'carInCustomers',
    component: resolve => require(['../components/quoteManagement/carInCustomers.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/trackRecord',
    name: 'trackRecord',
    component: resolve => require(['../components/quoteManagement/trackRecord.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/AddTrackRecord',
    name: 'AddTrackRecord',
    component: resolve => require(['../components/quoteManagement/AddTrackRecord.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/updateInf',
    name: 'updateInf',
    component: resolve => require(['../components/quoteManagement/updateInf.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/manageNoncar',
    name: 'manageNoncar',
    component: resolve => require(['../components/quoteManagement/manageNoncar.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/sendRepair',
    name: 'sendRepair',
    component: resolve => require(['../components/quoteManagement/sendRepair.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/carInCustomersDetail',
    name: 'carInCustomersDetail',
    component: resolve => require(['../components/quoteManagement/carInCustomersDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/selectIns',
    name: 'selectIns',
    component: resolve => require(['../components/quoteManagement/selectIns.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/scan',
    name: 'ScanOcrFile',
    component: resolve => require(['../components/quoteManagement/ScanOcrFile.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/customerManagement/custIndex',
    name: 'custIndex',
    component: resolve => require(['../components/customerManagement/custIndex.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
   {
    path: '/customerManagement/customerTrackRecord',
    name: 'customerTrackRecord.vue',
    component: resolve => require(['../components/customerManagement/customerTrackRecord.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/sysMsg/index',
    name: 'sysMsgIndex',
    component: resolve => require(['../components/quoteManagement/sysMsgIndex.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/customerManagement/search',
    name: 'searchCust',
    component: resolve => require(['../components/customerManagement/searchCust.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/customerManagement/addCust',
    name: 'addCust',
    component: resolve => require(['../components/customerManagement/addCust.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/customerManagement/custDetail',
    name: 'custDetail',
    component: resolve => require(['../components/customerManagement/custDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/customerManagement/custIndexb',
    name: 'custDetailB',
    component: resolve => require(['../components/customerManagement/bbb.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/customerManagement/renewalPolicyDetail',
    name: 'renewalPolicyDetail',
    component: resolve => require(['../components/customerManagement/renewalPolicyDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/insList',
    name: 'insList',
    component: resolve => require(['../components/quoteManagement/insList.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quoteManagement/dualrecord',
    name: 'dualRecord',
    component: resolve => require(['../components/quoteManagement/dualRecord.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quotationList/quotationIndex',
    name: 'quotationIndex',
    component: resolve => require(['../components/quotationList/quotationIndex.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/quotationList/search',
    name: 'searchQuotation',
    component: resolve => require(['../components/quotationList/searchQuotation.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/myPolicy',
    name: 'myPolicy',
    component: resolve => require(['../components/myInfo/myPolicy.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/myInfo',
    name: 'myInfo',
    component: resolve => require(['../components/myInfo/myInfo.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/operationControlFrom',
    name: 'operationControlFrom',
    component: resolve => require(['../components/myInfo/operationControlFrom.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/policyDetail',
    name: 'policyDetail',
    component: resolve => require(['../components/myInfo/policyDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/mylnfo',
    name: 'mylnfo',
    component: resolve => require(['../components/myInfo/myInfo.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/myIndex',
    name: 'myIndex',
    component: resolve => require(['../components/myInfo/myIndex.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/myFriends',
    name: 'myFriends',
    component: resolve => require(['../components/myInfo/myFriends.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/myInviteQr',
    name: 'myInviteQr',
    component: resolve => require(['../components/myInfo/myInviteQr.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/myTeam',
    name: 'myTeam',
    component: resolve => require(['../components/myInfo/teamMemberList.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/teamDetail',
    name: 'teamDetail',
    component: resolve => require(['../components/myInfo/teamDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/zxinviteQr',
    name: 'zxinviteQr',
    component: resolve => require(['../components/myInfo/zxinviteQr.vue'], resolve),
    meta: {
      keepAlive: false
    }
    
  },
  {
    path: '/myInfo/teamItem',
    name: 'teamItem',
    component: resolve => require(['../components/myInfo/teamItem.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/teamAward',
    name: 'teamAward',
    component: resolve => require(['../components/myInfo/teamAward.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  
  {
    path: '/myInfo/fqa',
    name: 'fqa',
    component: resolve => require(['../components/myInfo/fqa.vue'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/myInfo/insuranceKnowledge',
    name: 'insuranceKnowledge',
    component: resolve => require(['../components/myInfo/insuranceKnowledge.vue'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/myInfo/report',
    name: 'reportCase',
    component: resolve => require(['../components/myInfo/reportCase.vue'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/quoteManagement/supplement',
    name: 'supplement',
    component: resolve => require(['../components/quoteManagement/supplement.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
    {
    path: '/quoteManagement/orgCodeSearch',
    name: 'orgCodeSearch',
    component: resolve => require(['../components/quoteManagement/orgCodeSearch.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    //过渡页面
    path: '/quoteManagement/transitionPage',
    name: 'transitionPage',
    component: resolve => require(['../components/quoteManagement/transitionPage.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/quoteManagement/insdatail',
    name: 'insdatail',
    component: resolve => require(['../components/quoteManagement/insdatail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/inspolicyDetail',
    name: 'inspolicyDetail',
    component: resolve => require(['../components/myInfo/inspolicyDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/zxCertification',//实名认证
    name: 'zxCertification',
    component: resolve => require(['../components/myInfo/zxCertification.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  
  {
    path: '/myInfo/zxregister',
    name: 'zxregister',
    component: resolve => require(['../components/myInfo/zxregister.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/zxlogin',
    name: 'zxlogin',
    component: resolve => require(['../components/myInfo/zxlogin.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/zxtoHome',
    name: 'zxtoHome',
    component: resolve => require(['../components/myInfo/zxtoHome.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/myInfo/dataAnalyze',
    name: 'dataAnalyze',
    component: resolve => require(['../components/myInfo/dataAnalyze.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/registered',
    name: 'registered',
    component: resolve => require(['../components/registered.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/success',
    name: 'success',
    component: resolve => require(['../components/success.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/contributing',
    name: 'contributing',
    component: resolve => require(['../components/contributing.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/regUser',
    name: 'regUser',
    component: resolve => require(['../components/quoteManagement/regUser.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/certification',
    name: 'certification',
    component: resolve => require(['../components/quoteManagement/certification.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/certificationStatus',
    name: 'certificationStatus',
    component: resolve => require(['../components/quoteManagement/certificationStatus.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/payPage',
    name: 'payPage',
    component: resolve => require(['../components/quoteManagement/payPage.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/supplementUp',
    name: 'supplementUp',
    component: resolve => require(['../components/quoteManagement/supplementUp.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/vehiclePolicyInfo',
    name: 'vehiclePolicyInfo',
    component: resolve => require(['../components/quoteManagement/vehiclePolicyInfo.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/piccOnlineQuote/picclink',
    name: 'picclink',
    component: resolve => require(['../components/piccOnlineQuote/picclink.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/piccOnlineQuote/recordItem',
    name: 'recordItem',
    component: resolve => require(['../components/piccOnlineQuote/recordItem.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/piccOnlineQuote/recordDetail',
    name: 'recordDetail',
    component: resolve => require(['../components/piccOnlineQuote/recordDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/insureIndex',
    name: 'insureIndex',
    component: resolve => require(['../components/zxfdPage/insureIndex.vue'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/zxfdPage/fwczrList',
    name: 'fwczrList',
    component: resolve => require(['../components/zxfdPage/fwczrList.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/sanzexianList',
    name: 'sanzexianList',
    component: resolve => require(['../components/zxfdPage/sanzexianList.vue'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/zxfdPage/jtcczhList',
    name: 'jtcczhList',
    component: resolve => require(['../components/zxfdPage/jtcczhList.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/jjzrList',
    name: 'jjzrList',
    component: resolve => require(['../components/zxfdPage/jjzrList.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {//投保
    path: '/zxfdPage/orderInformation', 
    name: 'orderInformation',
    component: resolve => require(['../components/zxfdPage/orderInformation.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/payPage',
    name: 'payPage',
    component: resolve => require(['../components/zxfdPage/payPage.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/specialAgreement',
    name: 'specialAgreement',
    component: resolve => require(['../components/zxfdPage/specialAgreement.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/InsuranceDec',//投保声明
    name: 'InsuranceDec',
    component: resolve => require(['../components/zxfdPage/InsuranceDec.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/tenantInsurance', //租客版投保页面
    name: 'tenantInsurance',
    component: resolve => require(['../components/zxfdPage/tenantInsurance.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/zxfdPage/tenantFamily', //附加家庭险
    name: 'tenantFamily',
    component: resolve => require(['../components/zxfdPage/tenantFamily.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/zxfdPage/TenantDwsyzrList', //动物饲养条款
    name: 'TenantDwsyzrList',
    component: resolve => require(['../components/zxfdPage/TenantDwsyzrList.vue'], resolve),
    meta: {
      keepAlive: false
    } 
    
  },
  {
    path: '/zxfdPage/tenantJJZRList', // 租客版居家责任
    name: 'tenantJJZRList',
    component: resolve => require(['../components/zxfdPage/tenantJJZRList.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/zxfdPage/tenantDDZXC', //电动自行车
    name: 'tenantDDZXC',
    component: resolve => require(['../components/zxfdPage/tenantDDZXC.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/zxfdPage/tenantJHRList', //电动自行车
    name: 'tenantJHRList',
    component: resolve => require(['../components/zxfdPage/tenantJHRList.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/zxfdPage/tenantsIndex', //
    name: 'tenantsIndex',
    component: resolve => require(['../components/zxfdPage/tenantsIndex.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/zxfdPage/paySuccess', //支付成功
    name: 'paySuccess',
    component: resolve => require(['../components/zxfdPage/paySuccess.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/proprietorIndex',
    name: 'proprietorIndex',
    component: resolve => require(['../components/zxfdPage/proprietorIndex.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/proprietorInsuran',
    name: 'proprietorInsuran',
    component: resolve => require(['../components/zxfdPage/proprietorInsuran.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/proprietJZFW',
    name: 'proprietJZFW',
    component: resolve => require(['../components/zxfdPage/proprietJZFW.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    
    path: '/zxfdPage/tenantTY',
    name: 'tenantTY',
    component: resolve => require(['../components/zxfdPage/tenantTY.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/zxfdPage/proprietorTY',
    name: 'proprietorTY',
    component: resolve => require(['../components/zxfdPage/proprietorTY.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/pingan/insureIndex',
    name: 'pinganInsureIndex',
    component: resolve => require(['../components/pingan/insureIndex.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/pingan/storeIndex',
    name: 'storeIndex',
    component: resolve => require(['../components/pingan/storeIndex.vue'], resolve),
    meta: {
      keepAlive: false
    }
    
  },
  {
    path: '/pingan/insuranceType',
    name: 'insuranceType',
    component: resolve => require(['../components/pingan/insuranceType.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/pingan/productMicro',
    name: 'productMicro',
    component: resolve => require(['../components/pingan/productMicro.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/pingan/insuranceInfor',
    name: 'insuranceInfor',
    component: resolve => require(['../components/pingan/insuranceInfor.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {    
    path: '/pingan/showMIcro',
    name: 'showMIcro',
    component: resolve => require(['../components/pingan/showMIcro.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  { 
    path: '/pingan/cppay',
    name: 'cppay',
    component: resolve => require(['../components/pingan/cppay.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/pingan/payResult',
    name: 'payResult',
    component: resolve => require(['../components/pingan/payResult.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/pingan/freightIndex',
    name: 'freightIndex',
    component: resolve => require(['../components/pingan/freightIndex.vue'], resolve),
    meta: {
      keepAlive: false
    } 
  },
  {
    path: '/pingan/storeTreasure',
    name: 'storeTreasure',
    component: resolve => require(['../components/pingan/storeTreasure.vue'], resolve),
    meta: {
      keepAlive: false
    },
  },
  {
    path: '/pingan/storeInsuranceDe',
    name: 'storeInsuranceDe',
    component: resolve => require(['../components/pingan/storeInsuranceDe.vue'], resolve),
    meta: {
      keepAlive: false
    },
  },
  {
    path: '/pingan/storeInsuranceNum',
    name: 'storeInsuranceNum',
    component: resolve => require(['../components/pingan/storeInsuranceNum.vue'], resolve),
    meta: {
      keepAlive: false
    },
    
  },
  {
    path: '/pingan/storeMico',
    name: 'storeMico',
    component: resolve => require(['../components/pingan/storeMico.vue'], resolve),
    meta: {
      keepAlive: false
    },
  },
  {
    path: '/product/insuranceIndex',
    name: 'insuranceIndex',
    component: resolve => require(['../components/product/insuranceIndex.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/product/orderList',
    name: 'orderList',
    component: resolve => require(['../components/product/orderList.vue'], resolve),
    meta: { keepAlive: false }
  },  
  {
    path: '/product/orderDetail',
    name: 'orderDetail',
    component: resolve => require(['../components/product/orderDetail.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/product/presoalInformation',
    name: 'presoalInformation',
    component: resolve => require(['../components/product/presoalInformation.vue'], resolve),
    meta: { keepAlive: false }
  },
  
  {
    path: '/product/payPage',
    name: 'productPay',
    component: resolve => require(['../components/product/payPage.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/product/payResult',
    name: 'productpayResult',
    component: resolve => require(['../components/product/payResult.vue'], resolve),
    meta: { keepAlive: false }    
  },
  {
    path: '/product/underwritingTrans',
    name: 'underwritingTrans',
    component: resolve => require(['../components/product/underwritingTrans.vue'], resolve),
    meta: { keepAlive: false }       
  },
  {
    path: '/product/zhonganUnderwriting',
    name: 'zhonganUnderwriting',
    component: resolve => require(['../components/product/zhonganUnderwriting.vue'], resolve),
    meta: { keepAlive: false }     
  },
  {
    path: '/',
    name: 'home',
    component: resolve => require(['../components/quoteManagement/newHome.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/quoteIndex',
    name: 'quoteIndex',
    component: resolve => require(['../components/quoteManagement/quoteIndex.vue'], resolve),
    meta: { keepAlive: false }
  },

  {
    path: '/newFeature',
    name: 'defaultPage',
    component: resolve => require(['../components/defaultPage.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/quoteManagement/city',
    name: 'city',
    component: resolve => require(['../components/quoteManagement/city.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/quoteManagement/quoteInfo',
    name: 'quoteInfo',
    component: resolve => require(['../components/quoteManagement/quoteInfo.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/quoteManagement/underwriting',
    name: 'underwriting',
    component: resolve => require(['../components/quoteManagement/underwriting.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/potentialCustomers',
    name: 'potentialCustomers',
    component: resolve => require(['../components/customerManagement/potentialCustomers.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/potentialCustomer/detail',
    name: 'potentialCustomerDetail',
    component: resolve => require(['../components/customerManagement/potentialCustomerDetail.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/addPotentialCustomer',
    name: 'addPotentialCustomer',
    component: resolve => require(['../components/customerManagement/addPotentialCustomer.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/addCar',
    name: 'addCar',
    component: resolve => require(['../components/customerManagement/addCar.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/addRelationCust',
    name: 'addRelationCust',
    component: resolve => require(['../components/customerManagement/addRelationCust.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/uploadData',
    name: 'uploadData',
    component: resolve => require(['../components/customerManagement/uploadData.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/quoteManagement/carInCustomers',
    name: 'carInCustomers',
    component: resolve => require(['../components/quoteManagement/carInCustomers.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/quoteManagement/trackRecord',
    name: 'trackRecord',
    component: resolve => require(['../components/quoteManagement/trackRecord.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/quoteManagement/AddTrackRecord',
    name: 'AddTrackRecord',
    component: resolve => require(['../components/quoteManagement/AddTrackRecord.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/quoteManagement/updateInf',
    name: 'updateInf',
    component: resolve => require(['../components/quoteManagement/updateInf.vue'], resolve),
    // meta: {keepAlive: false}
  },
  {
    path: '/quoteManagement/manageNoncar',
    name: 'manageNoncar',
    component: resolve => require(['../components/quoteManagement/manageNoncar.vue'], resolve),
    // meta: {keepAlive: false}
  },
  {
    path: '/quoteManagement/sendRepair',
    name: 'sendRepair',
    component: resolve => require(['../components/quoteManagement/sendRepair.vue'], resolve),
    // meta: {keepAlive: false}
  },
  {
    path: '/myInfo/myLiPolicy',
    name: 'myLiPolicy',
    component: resolve => require(['../components/myInfo/myLiPolicy.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/myInfo/liPolicy/detail',
    name: 'liPolicyDetail',
    component: resolve => require(['../components/myInfo/liPolicyDetail.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/myInfo/mylnfo',
    name: 'mylnfo',
    component: resolve => require(['../components/myInfo/myInfo.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/products',
    name: 'productIndex',
    component: resolve => require(['../components/products/productIndex.vue'], resolve),
    meta: { keepAlive: false }
  }, 
  {
    path: '/product/detail',
    name: 'productDetail',
    component: resolve => require(['../components/products/productDetail.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/productProspectus',
    name: 'productProspectus',
    component: resolve => require(['../components/products/productProspectus.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/prospectuses',
    name: 'prospectuses',
    component: resolve => require(['../components/products/prospectuses.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/prospectus/detail',
    name: 'prospectusDetail',
    component: resolve => require(['../components/products/prospectusDetail.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/agreement',
    name: 'agreementPage',
    component: resolve => require(['../components/agreementPage.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/learning',
    name: 'learningCenter',
    component: resolve => require(['../components/learningCenter.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/learning/list',
    name: 'learningCenterList',
    component: resolve => require(['../components/learningCenterList.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/learning/detail',
    name: 'learningCenterDetail',
    component: resolve => require(['../components/learningCenterDetail.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/combinationPlan',
    name: 'combinationPlans',
    component: resolve => require(['../components/products/combinationPlans.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/combinationPlan/detail',
    name: 'combinationPlansDetail',
    component: resolve => require(['../components/products/combinationPlansDetail.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/combinationPlan/viewers',
    name: 'combinationPlansViewers',
    component: resolve => require(['../components/products/combinationPlansViewers.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/product/comparison',
    name: 'productComparison',
    component: resolve => require(['../components/products/productComparison.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/myInfo/myTeam',
    name: 'myTeam',
    component: resolve => require(['../components/myInfo/myTeam.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/myInfo/performanceList',
    name: 'performanceList',
    component: resolve => require(['../components/myInfo/performanceList.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/myInfo/performanceDetail',
    name: 'performanceDetail',
    component: resolve => require(['../components/myInfo/performanceDetail.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/myInfo/performanceItemDetail',
    name: 'performanceItemDetail',
    component: resolve => require(['../components/myInfo/performanceItemDetail.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/tools/taxCalculator',
    name: 'taxCalculator',
    component: resolve => require(['../components/tools/taxCalculator.vue'], resolve),
    meta: { keepAlive: false }
  },
  {    
    path: '/tools/familyMumber',
    name: 'familyMumber',
    component: resolve => require(['../components/tools/familyMumber.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/tools/riskAssessment',
    name: 'riskAssessment',
    component: resolve => require(['../components/tools/riskAssessment.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/tools/replenishInfor',
    name: 'replenishInfor',
    component: resolve => require(['../components/tools/replenishInfor.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/tools/possessSecurity',
    name: 'possessSecurity',
    component: resolve => require(['../components/tools/possessSecurity.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/tools/demandAnalysis',
    name: 'demandAnalysis',
    component: resolve => require(['../components/tools/demandAnalysis.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/tools/index',
    name: 'toolsIndex',
    component: resolve => require(['../components/tools/index.vue'], resolve),
    meta: { keepAlive: false }
  },{
    path: '/tools/myShop',
    name: 'myShop',
    component: resolve => require(['../components/tools/myShop.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
    path: '/tools/productsDetail',
    name: 'productsDetail',
    component: resolve => require(['../components/tools/productsDetail.vue'], resolve),
    meta: { keepAlive: false }
  },
  {
	 path: '/tools/activity',
	 name: 'activity',
	 component: resolve => require(['../components/tools/activity.vue'], resolve),
	 meta: { keepAlive: false }
	},
  {
    path: '/myInfo/teamMember',
    name: 'teamMemberList',
    component: resolve => require(['../components/myInfo/teamMemberList.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/tools/compoundRate',
    name: 'compoundRate',
    component: resolve => require(['../components/tools/compoundRateCalculator.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/wxAuth',
    name: 'wxAuth',
    component: resolve => require(['../components/products/wxAuthPage.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/signalR',
    name: 'signalRPage',
    component: resolve => require(['../components/products/signalRPage.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/vehiclePolicyInfo',
    name: 'vehiclePolicyInfo',
    component: resolve => require(['../components/quoteManagement/vehiclePolicyInfo.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/selectProduct',
    name: 'selectProduct',
    component: resolve => require(['../components/products/selectProduct.vue'], resolve),
    meta: { keepAlive: false }
  }, {
    path: '/piccOnlineQuote/picclink',
    name: 'picclink',
    component: resolve => require(['../components/piccOnlineQuote/picclink.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/piccOnlineQuote/recordItem',
    name: 'recordItem',
    component: resolve => require(['../components/piccOnlineQuote/recordItem.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/piccOnlineQuote/recordDetail',
    name: 'recordDetail',
    component: resolve => require(['../components/piccOnlineQuote/recordDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/salesman/index',
    name: 'index',
    component: resolve => require(['../components/salesman/index.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/salesman/accountCord',
    name: 'accountCord',
    component: resolve => require(['../components/salesman/accountCord.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/salesman/accountCordFeeList',
    name: 'accountCordFeeList',
    component: resolve => require(['../components/salesman/accountCordFeeList.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/salesman/accountCordDetail',
    name: 'accountCordDetail',
    component: resolve => require(['../components/salesman/accountCordDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    // 费用结算（列表页）
    path: '/salesman/incomeAccount',
    name: 'incomeAccount',
    component: resolve => require(['../components/salesman/incomeAccount.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    // 费用结算（冲红）
    path: '/salesman/personalIncome',
    name: 'personalIncome',
    component: resolve => require(['../components/salesman/personalIncome.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    // 费用详情（收入明细进入该详情页）
    path: '/salesman/incomeDetail',
    name: 'incomeDetail',
    component: resolve => require(['../components/salesman/incomeDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    // 业绩模块
    path: '/salesman/performance',
    name: 'performance',
    component: resolve => require(['../components/salesman/performance.vue'], resolve),
    meta: {
      keepAlive: false
    },

  }, {
    path: '/salesman/performanceFilter',
    name: 'performanceFilter',
    component: resolve => require(['../components/salesman/performanceFilter.vue'], resolve),
    meta: {
      keepAlive: false
    },
  }, {
    // 收入明细
    path: '/salesman/allIncome',
    name: 'allIncome',
    component: resolve => require(['../components/salesman/allIncome.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    // 我的银行卡
    path: '/salesman/mycard',
    name: 'mycard',
    component: resolve => require(['../components/salesman/mycard.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    // 添加银行卡
    path: '/salesman/addCard',
    name: 'addCard',
    component: resolve => require(['../components/salesman/addCard.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    //业务员信息
    path: '/salesman/info',
    name: 'salesmanInfo',
    component: resolve => require(['../components/salesman/salesmanInfo.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    //查询保单
    path: '/myInfo/searchPolicy',
    name: 'searchPolicy',
    component: resolve => require(['../components/myInfo/searchPolicy.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    //欢迎界面
    path: '/welcome',
    name: 'welcome',
    component: resolve => require(['../components/welcome.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    //manualInquiry文件夹下为人工询价功能文件
    path: '/manualInquiry/index',
    name: 'inquiry',
    component: resolve => require(['../components/manualInquiry/index.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    //人工询价报价
    path: '/manualInquiry/selectRiskKinds',
    name: 'selectRiskKinds',
    component: resolve => require(['../components/manualInquiry/selectRiskKinds.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },

  {
    path: '/manualInquiry/inquiryRecord',
    name: 'inquiryRecord',
    component: resolve => require(['../components/manualInquiry/inquiryRecord.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/manualInquiry/inquiryDetail',
    name: 'inquiryDetail',
    component: resolve => require(['../components/manualInquiry/inquiryDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/manualInquiry/updataInquiry',
    name: 'updataInquiry',
    component: resolve => require(['../components/manualInquiry/updataInquiry.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/salesman/invitation',
    name: 'invitation',
    component: resolve => require(['../components/salesman/invitation.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/piccOnlineQuote/search',
    name: 'piccSearch',
    component: resolve => require(['../components/piccOnlineQuote/searchRecords.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/piccOnlineQuote/pay',
    name: 'payLink',
    component: resolve => require(['../components/piccOnlineQuote/payLink.vue'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/manualInquiry/editVehicle',
    name: 'editVehicleDetail',
    component: resolve => require(['../components/manualInquiry/editVehicleDetail.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },{
    path: '/quoteManagement/sysMsg/index',
    name: 'sysMsgIndex',
    component: resolve => require(['../components/quoteManagement/sysMsgIndex.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },{
    path: '/customerManagement/customerTrackRecord',
    name: 'customerTrackRecord',
    component: resolve => require(['../components/customerManagement/customerTrackRecord.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },{
    path: '/hkLogin',
    name: 'hkLogin',
    component: resolve => require(['../components/quoteManagement/hkLogin.vue'], resolve),
    meta: {
      keepAlive: false
    }
  },
  

]

var __dirname = process.env.DIR_NAME;

const router = new Router({
  base: __dirname,
  routes
});

router.beforeEach((to, from, next) => {
  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  var url = window.location.protocol + '//' + window.location.host + '/#' + to.fullPath;
  if (isiOS && to.path !== window.location.pathname) {
    var hash = window.location.hash;
    if (hash && hash.indexOf(to.fullPath) < 0) {
      window.location.assign(url)
    };
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
  } else {
    next();
  }
  // var appId, token;
  // appId = store.state.appId;
  // token = store.state.token;
  // if (window.localStorage.getItem('appId')) {
  //   appId = window.localStorage.getItem('appId');
  // }
  // if (window.localStorage.getItem('token')) {
  //   token = window.localStorage.getItem('token');
  //   token = token.replace(appId + '_', '');
  // }
  // if(!appId || !token){
  //       next({
  //         path:'/login',
  //         query: { appId: appId }          
  //       })
  // }
  
  // const appId = window.localStorage.getItem('appId') || to.query.appId;    
  // if(to.path == '/login' && (appId == 'cx220t020161609ck9' || appId =='cxa181211170855pxj') ){
  //     // console.log(to,from)
  //     const sUserAgent = navigator.userAgent.toLowerCase();
  //     if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
  //     //跳转移动端页面
  //       next()
  //     }else{
  //       next({
  //         path:'/hkLogin',
  //         query: { appId: appId }          
  //       })
  //     }
  //   }  
})

// router.beforeEach((to, from, next) => {
//   const appId = window.localStorage.getItem('appId');
//   if(from.fullPath == '/login' && appId == 'cx220t020161609ck9' ){
//       // console.log(to,from)
//       const sUserAgent = navigator.userAgent.toLowerCase();
//       if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
//       //跳转移动端页面
//         next()
//       }else{
//         next({
//           path:'hkLogin'
//         })
//       }
//     }  
// })

router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

export default router;
