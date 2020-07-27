<template>
  <div class="home">
    <!-- <mt-header fixed class="def-header cust-head" title="我的"></mt-header> -->
    <div class="mt-my-list">
      <div class="head-area fn-clear">
        <div>
          <img class="ico-head" :src="headImageUrl ? headImageUrl: avatar" alt="" @click="uploadHeadImg">
          <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
        </div>
        <div class="head-info" @click="goCer()">
          <h2>{{accountName}}</h2>
          <img :src="rightImg" style="position: absolute;left:90%;width:20px;height:20px;">
          <p style="color:#E5E5E5" v-show="userName">{{userName}}</p>
          <p style="color:#E5E5E5;" class="ccyc" v-show="sellerName">{{sellerName}} - {{sellerDeptName}}</p>
        </div>
        <div style="background-color:#f9dba4;border-radius:15px 0px 0px 15px;color:#cc880a;float:right;padding-left:0.2rem;
        padding-right:12px;padding-top:4px;padding-bottom:4px;font-size:12px;font-weight:bold;" v-show="rankName">{{rankName}}</div>
      </div>
      <!-- <img @click="openMsg" :src="msgImg" style="position: absolute;left:92%;width:20px;height:20px;top:1%"> -->
      <div style="position: relative;top:-20px;width:100%">
        <div class="parentWrap">
          <div class="parent" style="background-color: white;border-radius:0.16rem 0.16rem 0px 0px;margin-left:0.2rem;margin-right:0.2rem;margin-top:0.2rem">
            <div class="myChild" @click="viewQuote">
              <img :src="ordersImg" style="width:48px">
            </div>
            <div class="myChild" @click="myPolicy">
              <img :src="policyImg" style="width:48px">
            </div>
            <div class="myChild" @click="viewProspectuses">
              <img :src="plansImg" style="width:48px">
            </div>
          </div>
          <div class="parent" style="background-color: white;text-align:center;color:#505050;border-radius:0px 0px 0.16rem 0.16rem;margin-left:0.2rem;margin-right:0.2rem">
            <div class="myChild1">
              <P>我的订单</P>
            </div>
            <div class="myChild1">
              <P>我的保单</P>
            </div>
            <div class="myChild1">
              <P>计划书</P>
            </div>
          </div>
        </div>

        <div @click="goInvite" style="background-color:white;border-radius:0.16rem;margin:0.2rem;">
          <mt-cell title="我的二维码名片" is-link>
            <img :src="erweimaImg" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>
        <div @click="goMyShop" style="background-color:white;border-radius:0.16rem;margin:0.2rem;">
          <mt-cell title="我的微店" is-link>
            <img src="../../assets/images/share/mendian.png" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>


        <div class="parentWrap" @click="toPerformance" style="background-color:white;border-radius:0.16rem;margin:0.2rem;">
          <mt-cell title="我的业绩" is-link>
            <img :src="yejiImg" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>        
        <div class="parentWrap" @click="viewFriends" style="background-color:white;border-radius:0.16rem;margin:0.2rem;">
          <mt-cell title="我的团队" is-link>
            <img :src="tuanduiImg" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>
        <div class="parentWrap" @click="toIncome" style="background-color:white;border-radius:0.16rem;margin:0.2rem;" >
          <mt-cell title="我的收入" is-link>
            <img :src="incomeImg" style="height:18px;width:18px;padding-left:0.2rem" slot="icon" >
          </mt-cell>
        </div>
        <div class="parentWrap" @click="toMycard" style="background-color:white;border-radius:0.16rem;margin:0.2rem;" v-show="hasLookAgencyBandCard == 'true'">
          <mt-cell title="我的银行卡" is-link>
            <img :src="cardImg" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>
        <div class="parentWrap" @click="toInquiryDetail" style="background-color:white;border-radius:0.16rem;margin:0.2rem;" v-show="hasEnquiryProducts">
          <mt-cell title="询价记录" is-link>
            <img :src="inquiryRecordImg" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>
        <div class="parentWrap" @click="torecordItem" style="background-color:white;border-radius:0.16rem;margin:0.2rem;" v-show="canViewRB">
          <mt-cell title="人保投保记录" is-link>
            <img :src="rbPolicyImg" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>
        <div class="parentWrap" @click="dataAnalyze" style="background-color:white;border-radius:0.16rem;margin:0.2rem;" v-show="hasManage=='true'">
          <mt-cell title="车险数据看板" is-link>
            <img src="../../assets/images/data_icon.png" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>
        <div class="parentWrap" @click="viewInsurance" style="background-color:white;border-radius:0.16rem;margin:0.2rem;">
          <mt-cell title="车险小知识" is-link>
            <img src="../../assets/images/kown_icon.png" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>
        <!-- <div class="parentWrap" @click="reportCase" style="background-color:white;border-radius:0.16rem;margin:0.2rem;">
          <mt-cell title="保险公司报案电话" is-link>
            <img src="../../assets/images/phone_icon.png" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div> -->
        <div class="parentWrap" @click="viewFQA" style="background-color:white;border-radius:0.16rem;margin:0.2rem;">
          <mt-cell title="常见问题" is-link>
            <img :src="fqaImg" style="height:18px;width:18px;padding-left:0.2rem" slot="icon">
          </mt-cell>
        </div>
        <hr width="100%" color="#f5f5f5" size="1" />
      </div>
    </div>
    <div class="container-bottom">
      <bottomAllTab ref="bottomAllTab" :plant.sync="plante"></bottomAllTab>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import bottomAllTab from './../bottomtab/bottom-all-tab'
import store from './../../store/store'
import * as types from './../../store/types';
import axios from 'axios';
//var formData = new FormData();
export default {
  name: 'home',
  data() {
    return {
      plante: 'myInfo',
      title: '我的',
      accountName: '',
      sellerName: '',
      sellerDeptName: '',
      userId: '',
      isSalesMan: false,
      certification: '待审核',
      userName: '',
      policyImg: this.src = require('../../assets/images/icon-nav-inserancePolicy.png'),
      ordersImg: this.src = require('../../assets/images/icon-nav-orders.png'),
      plansImg: this.src = require('../../assets/images/icon-nav-plans.png'),
      shengriImg: this.src = require('../../assets/images/icon-nav-shengri.png'),
      xubaoImg: this.src = require('../../assets/images/icon-nav-xubao.png'),
      erweimaImg: this.src = require('../../assets/images/icon-menu-erweima.png'),
      kehuImg: this.src = require('../../assets/images/icon-menu-kehu.png'),
      tuanduiImg: this.src = require('../../assets/images/icon-menu-tuandui.png'),
      yejiImg: this.src = require('../../assets/images/icon-menu-yeji.png'),
      rankName: '',
      headImageUrl: '',
      avatar: this.src = require('../../assets/images/img-avatar.png'),
      payImg: this.src = require('../../assets/images/icon-4pay.png'),
      xubaoImg: this.src = require('../../assets/images/icon-customer-xubao.png'),
      genjinImg: this.src = require('../../assets/images/icon-customer-genjin.png'),
      defaultImg: this.src = require('../../assets/images/right.png'),
      fqaImg: this.src = require('../../assets/images/icon-questions.png'),
      rightImg: this.src = require('../../assets/images/w-right.png'),
      incomeImg: this.src = require('../../assets/images/performance.png'),
      performanceImg: this.src = require('../../assets/images/yeji.png'),
      cardImg: this.src = require('../../assets/images/card.png'),
      qrImg: this.src = require('../../assets/images/ico-code.png'),
      teamImg: this.src = require('../../assets/images/ic-team.png'),
      rbPolicyImg: this.src = require('../../assets/images/ic-policy.png'),
      inquiryRecordImg: this.src = require('../../assets/images/inquiryRecord.png'),
      msgImg: (this.src = require("../../assets/images/icon-notices.png")),
      hasManage: '',
      referrerMobile: '',
      viewMyIncomes: false,
      viewMyPerformance: false,
      canReg: false,
      hasLookAgencyBandCard: false,
      hasLookEnquiryProducts: false,
      hasEnquiryProducts:false,
      canViewRB: false,
    }
  },
  components: {
    bottomAllTab
  },
  created: function() {
    // this.initHeight();
    var appId = store.state.appId;
    this.canViewRB = (appId == 'cxv190614111634a4f' || appId == 'cxa181211170855pxj');
    var loginInfo = store.state.loginInfo;
    var localToken = localStorage.getItem('token');
    this.hasManage = localStorage.getItem('hasManage')
    this.canReg = localStorage.getItem("canReg");
    this.hasEnquiryProducts = (appId == 'cx7190761141531rzi' || appId == 'cxa181211170855pxj' ||  appId == 'cx8190110143618pyi' || appId == 'cxs190103104249iwe' || appId == 'cx220t020161609ck9'  || appId == 'cxx200304225758hjm' );
    // var appFeatures = JSON.parse(sessionStorage.getItem('appFeatures'));
    // this.hasEnquiryProducts = appFeatures.indexOf('ManualEnquiry') > 0;  
    this.hasLookEnquiryProducts = localStorage.getItem('hasLookEnquiryProducts')
    this.hasLookAgencyBandCard = localStorage.getItem("hasLookAgencyBandCard");
    // console.log(this.hasManage)
    if (localToken) {
      localToken = localToken.replace(localStorage.getItem('appId') + '_', '');
    }
    var param = {
      token: localToken
    }
    var me = this;

    var headImg = sessionStorage.getItem('headImageUrl');
    if (headImg != '' && headImg != null && headImg != 'undefined') {
      me.headImageUrl = headImg;
    }

    axiosGetAPI('/Users/Me').then((res) => {
      me.accountName = res.result.accountName;
      me.userName = res.result.accountName;
      me.sellerName = res.result.sellerOrgName;
      me.sellerDeptName = res.result.sellerDeptName;
      me.userId = res.result.userId;
      sessionStorage.setItem('userIds', res.result.userId);
      sessionStorage.setItem('accountName', res.result.accountName);
      sessionStorage.setItem('sellerOrgCode', res.result.sellerOrgCode);
      sessionStorage.setItem('sellerDeptCode', res.result.sellerDeptCode);
      sessionStorage.setItem('sellerOrgName', res.result.sellerOrgName);
      sessionStorage.setItem('sellerDeptName', res.result.sellerDeptName);
      sessionStorage.setItem('sellerName', res.result.sellerName);
      if (me.userId) {
        var root = process.env.API_ROOT
        axios({
            method: 'GET',
            url: '/Users/' + me.userId + '/Salesman',
            data: null,
            params: null,
            baseURL: root,
            withCredentials: false
          })
          .then(function(res) {
            Indicator.close();
            if (res.data.status == 200) {
              if (res.data.result) {
                me.accountName = res.data.result.name;
                me.sellerName = res.data.result.organName;
                me.sellerDeptName = res.data.result.deptName;
                sessionStorage.setItem('nickName', res.data.result.name);
                sessionStorage.setItem('referrerMobile', res.data.result.mobile);
                me.certification = '在职';
                var headImg = sessionStorage.getItem('headImageUrl');
                if (headImg != '' && headImg != null && headImg != 'undefined') {
                  me.headImageUrl = headImg;
                } else {
                  me.headImageUrl = res.data.result.headImageUrl;
                  sessionStorage.setItem('headImageUrl', me.headImageUrl);
                }
                var salesmanId = res.data.result.id;
                if (salesmanId > 0) {
                  sessionStorage.setItem('salesmanId', salesmanId);
                  // axiosGetAPI('/Ranks/' + salesmanId).then((d) => {
                  //   Indicator.close();
                  //   if (d.status == 200 && d.result) {
                  //     me.rankName = d.result.rankName;
                  //   }
                  // });
                  axiosGetAPI('/Salesmans/' + salesmanId + '/Modules').then((res) => {
                    if (res.result) {
                      if (res.result.isCarCommission || res.result.isLifeCommission || res.result.isRemmendBonu) {
                        me.viewMyIncomes = true;
                        me.viewMyPerformance = true;
                      }
                      sessionStorage.setItem("canViewCarCommission", res.result.isCarCommission);
                      sessionStorage.setItem('canViewLifeCommission', res.result.isLifeCommission);
                      sessionStorage.setItem('canViewRemmendBonu', res.result.isRemmendBonu);
                    }
                  });
                };
              }
            }
          }, err => {
            Toast('请求超时，请刷新页面重试！');
            reject(err)
          })
          .catch(function(error) {
            console.log(error)
          })
        var url = '/Users/' + sessionStorage.getItem('userIds') + '/SalesmanApply';
        axiosGetAPI(url).then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result) {
            me.agentInfo = d.result;
            me.accountName = d.result.name;
            if (d.result.organName) {
              me.sellerName = d.result.organName;
            };
            if (d.result.deptName) {
              me.sellerDeptName = d.result.deptName;
            };
            if (me.agentInfo.status == 'NotPass' || me.agentInfo.status == 'NotRecheck') {
              me.certification = '审核未通过';
            } else if (me.agentInfo.status == 'Auditing' || me.agentInfo.status == 'Recheck') {
              me.certification = '待审核';
            } else {
              me.certification = '在职';
              var salesmanId = d.result.id;
              if (salesmanId > 0) {
                sessionStorage.setItem('salesmanId', salesmanId);
                // axiosGetAPI('/Ranks/' + salesmanId).then((d) => {
                //   Indicator.close();
                //   if (d.status == 200 && d.result) {
                //     me.rankName = d.result.rankName;
                //   }
                // })
              };
            }
          }
        })
      }
    });
  },
  methods: {
    openMsg: function() {
      this.$router.push({ path: '/quoteManagement/sysMsg/index' })
    },
    goMyShop(){
      var nickName = sessionStorage.getItem('nickName');
      var appId = localStorage.getItem('appId');
      this.$router.push({path: '/tools/myShop?appId=' + appId + '&nickName=' + nickName});
    },
    toInquiryDetail(){
      this.$router.push({path: '/manualInquiry/inquiryRecord'});
    },
    torecordItem() {
      this.$router.push({ path: '/piccOnlineQuote/recordItem' })
    },
    toIncome() {
      this.$router.push({ path: '/salesman/index' });
    },
    toPerformance() {
      this.$router.push({ path: '/salesman/performance' });
    },
    toMycard() {
      this.$router.push({ path: '/salesman/mycard' });
    },
    viewFQA: function() {
      this.$router.push({ path: '/myInfo/fqa' })
    },
    dataAnalyze: function() {
      this.$router.push({ path: '/myInfo/dataAnalyze' })
    },
    viewInsurance: function() {
      this.$router.push({ path: '/myInfo/insuranceKnowledge' })
    },
    reportCase: function() {
      this.$router.push({ path: '/myInfo/report' })
    },
    initHeight: function() {
      this.mwrppera.height = window.innerHeight - 60 + 'px';
    },
    viewProspectuses: function() {
      this.$router.push({ path: "/prospectuses" });
      // this.$router.push({ path: "/combinationPlan" });
    },
    viewQuote: function() {
      this.$router.push({ path: "/quotationList/quotationIndex" })
    },
    myPolicy: function() { // 车险保单
      this.$router.push({ path: '/product/orderList' })
    },
    myLiPolicy: function() { // 寿险保单
      this.$router.push({ path: '/myInfo/myLiPolicy' })
    },
    myPotentialCustomers: function() { // 客户关系
      this.$router.push({ path: '/potentialCustomers' })
    },
    myProspectus: function() { // 计划书列表
      this.$router.push({ path: '/prospectuses' })
    },
    modify: function() {
      this.$router.push({ path: '/myInfo/mylnfo?accountName=' + this.accountName + "&sellerName=" + this.sellerName + "&sellerDeptName=" + this.sellerDeptName })
    },
    viewCustomer: function() {
      this.$router.push({ path: "/customerManagement/custIndexb", query: { appId: localStorage.getItem("appId") } })
    },
    //认证申请
    goCer() {
      this.$router.push({ path: "/certification" })
    },
    //查看好友
    viewFriends() {
      // this.$router.push({ path: "/myInfo/myFriends" })
      this.$router.push({ path: "/myInfo/myTeam" })
    },
    newFeature: function() {
      this.$router.push({ path: "/newFeature" });
    },
    myPerformance: function() {
      // this.$router.push({ path: "/myInfo/performance" });
      this.$router.push({ path: "/myInfo/performanceList" });
    },
    goInvite: function() {
      var nickName = sessionStorage.getItem('nickName');
      var appTitle = sessionStorage.getItem('title');
      var appId = localStorage.getItem('appId');
      this.$router.push({
        path: '/myInfo/myInviteQr?title=' + appTitle + '&appId=' + appId + '&nickName=' + nickName +
          '&referrerMobile=' + this.referrerMobile
      });
    },
    // 打开图片上传
    uploadHeadImg: function() {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile: function(e) {
      var self = this;
      var $target = e.target || e.srcElement;
      var file = $target.files[0];
      var reader = new FileReader();
      if (file) {
        reader.onload = (data) => {
          var res = data.target || data.srcElement;
          self.avatar = res.result;
          var img = new Image,
            width = 132, //image resize   压缩后的宽
            quality = 0.8, //image quality  压缩质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          img.src = self.avatar;
          img.onload = function() {
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            //上传
            var base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            console.log(base64)
            var fileModel = { "extension": "", "image": "" };
            fileModel.extension = "jpg";
            fileModel.image = base64;
            Indicator.open('正在上传...');
            var salesmanId = sessionStorage.getItem('salesmanId');
            axiosPutAPI('/Salesmans/' + salesmanId + '/HeadImage', fileModel)
              .then((res) => {
                Indicator.close();
                if (res.status == 200) {
                  Toast('头像上传成功！');
                  self.headImageUrl = res.result.headImageUrl;
                  sessionStorage.setItem('headImageUrl', self.headImageUrl);
                } else {
                  MessageBox.alert(res.errMsg);
                }
              });
          }
        }
        reader.readAsDataURL(file);
      };
    },
  }
}

</script>
<style scoped>
.mt-my-list {
  overflow: hidden;
  padding-bottom: 50px;
}

.mt-my-list .head-area {
  padding-left: 30px;
  padding-top: 60px;
  padding-bottom: 30px;
  background: -webkit-linear-gradient(rgb(248, 99, 117) 0%, rgb(239, 84, 58) 100%);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgb(248, 99, 117) 0%, rgb(239, 84, 58) 100%);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgb(248, 99, 117) 0%, rgb(239, 84, 58) 100%);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(rgb(248, 99, 117) 0%, rgb(239, 84, 58) 100%);
  /* 标准的语法 */
}

.mt-my-list .head-area .ico-head {
  float: left;
  width: 64px;
  height: 64px;
  background-color: #f0f0f0;
  border-radius: 50%;
}

.mt-my-list .head-info {
  float: left;
  margin-left: 14px;
  color: white;
  max-width: 75%;
}

.mt-my-list .head-info h3 {
  font-weight: 400;
  font-size: 16px;
  color: white;
}

.parentWrap {
  overflow: hidden;
}

.parent {
  overflow: hidden;
  margin-right: -0.2rem;
}

.myChild {
  float: left;
  /* //: 100px; */
  width: 33.33%;
  padding-bottom: 15px;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-top: 20px;
  font-size: 12px;
  color: #505050
}

.myChild1 {
  float: left;

  width: calc(33.33%);
  padding-top: 0px;
  padding-bottom: 15px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #999;
}

.myChild3 {
  float: left;
  width: calc(33.33%);
  padding-top: 0.2rem;
  padding-bottom: 5px;
  display: flex;
  /* text-align:center; */
  /* align-items: center;
  justify-content: center; */
  font-size: 13px;
  color: #505050;
}

.hiddenInput {
  display: none;
}

.box {
  position: relative;
  height: 100%;
}

.wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  height: calc(100% - 50px);
}

.vue-cropper {
  background: black;
  background-image: none !important;
}

.btn {
  height: 50px;
  background: #565656;
  width: 100%;
  padding: 0 15px;
}

.btn a {
  color: white;
  font-size: .16rem;
  display: inline-block;
  line-height: 50px;
}

.btn a:nth-of-type(1) {
  float: left;
}

.btn a:nth-of-type(2) {
  float: right;
}

</style>
