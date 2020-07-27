<template>
  <div class="angent">
    <mt-header fixed class="def-header" title="个人信息">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <!-- <div slot="right">
        <mt-button  style="font-size:16px;color:#0070D3"><img style="height: 20px;" src="../../assets/images/icon-weixin.png" alt=""></mt-button>
      </div> -->
    </mt-header>
    <div style="padding-top:48px;padding-bottom:50px">
      <!-- <div style="background-color:white;color:red;height:30px;display: flex;align-items: center;padding-left:15px" v-show="!isSalesMan">注册申请{{salesManStatus}}</div> -->
      <!-- <div style="background-color:white;color:green;height:30px;display: flex;align-items: center;padding-left:15px" v-show="isSalesMan">入职申请{{salesManStatus}}</div> -->
      <div style="background-color:white;color:#333;padding:15px;border-radius:8px;margin:10px">
        <div>
          <span v-show="hasBindWeixin && enableLogin" @click="unbindWX" style="display:flex;justify-content: flex-end; align-items: center;">
            <img  style="height:16px;" :src="hasweixinImg" alt="">
            <p style="font-size:12px;color:#4A66FE;margin-left: 6px;">解绑微信</p>
          </span>
          <span v-show="noBindWeixin && !hasBindWeixin && enableLogin" style="display:flex;justify-content: flex-end; align-items: center;" @click="bindWeixin">
             <img style="height:16px;"  :src="weixinImg" alt="">
            <p style="font-size:12px;color:#333;margin-left: 6px;">绑定微信</p>
          </span>
          <p style="font-size:20px;color:#333;font-weight:bold;display:flex;align-items:center;justify-content:center">
            <img class="member-head" v-if="hasBindWeixin" :src="weixinInfor.headimgUrl" alt="">
            <img  v-else class="member-head" :src="agentInfo.headImageUrl ? agentInfo.headImageUrl : avatar" alt="">
          </p>
          <p style="font-size:20px;color:#333;font-weight:bold;display:flex;align-items:center;justify-content:center;margin-top:5px">
            {{agentInfo.name}}
          </p>
          <p style="font-size:13px;color:#666;margin-top:10px"></p>
          <p style="font-size:13px;color:#333;margin-top:3px">公司: <span style="color:#666">{{agentInfo.organName}}</span></p>
          <p style="font-size:13px;color:#333;margin-top:3px">部门: <span style="color:#666">{{agentInfo.deptName}}</span></p>
          <p style="font-size:13px;color:#333;margin-top:3px" v-if="salesMan">工号: <span style="color:#666">{{agentInfo.jobNumber}}</span></p>
          <p style="font-size:13px;color:#333;margin-top:3px" v-if="salesMan">注册日期: <span style="color:#666">{{agentInfo.hiredate}}</span></p>
          <p style="font-size:13px;color:#333;margin-top:3px" v-if="salesMan">联系方式: <span style="color:#666">{{agentInfo.mobile}}</span></p>
        </div>
      </div>
      <div style="background-color:white;color:#333;padding:15px;border-radius:8px;margin:10px" v-show="salesMan">
        
          <div style="display:flex;align-items: center; justify-content: space-between;">
            <p style="font-weight:bold;font-size:15px">详细信息</p>
            <van-icon size="18px" v-if="hasDetail" @click="LookDetail" name="arrow-up" />
            <van-icon size="18px" v-else @click="LookDetail" name="arrow-down" />
          </div>
          <div v-show="hasDetail" >
          <p style="color:#333">证件类型: <span style="color:#666">{{agentInfo.idType?agentInfo.idType:'无'}}</span></p>
          <p style="color:#333">证件号码: <span style="color:#666">{{agentInfo.idNo?agentInfo.idNo:'无'}}</span></p>
          <p style="color:#333">性别: <span style="color:#666">{{agentInfo.gender?agentInfo.gender:'无'}}</span></p>
          <p style="color:#333">生日: <span style="color:#666">{{agentInfo.birthDay?agentInfo.birthDay:'无'}}</span></p>
          <p style="color:#333" v-show="agentInfo.nationality">国籍:
            <span style="color:#666">{{agentInfo.nationality?agentInfo.nationality:'中国'}}</span></p>
          <p style="color:#333" v-show="agentInfo.education">学历:
            <span style="color:#666">{{agentInfo.education?agentInfo.education:'无'}}</span></p>
          <p style="color:#333" v-show="agentInfo.maritalStatus">婚姻状况:
            <span style="color:#666">{{agentInfo.maritalStatus?agentInfo.maritalStatus:'未婚'}}</span></p>
          <p style="color:#333" v-show="agentInfo.nation">民族:
            <span style="color:#666">{{agentInfo.nation?agentInfo.nation:'无'}}</span></p>
          <p style="color:#333" v-show="agentInfo.politicalStatus">政治面貌:
            <span style="color:#666">{{agentInfo.politicalStatus?agentInfo.politicalStatus:'无'}}</span></p>
        </div>
      </div>
      <div style="background-color:white;color:#333;padding:15px;border-radius:8px;margin:10px" v-show="salesMan">
          <div style="display:flex;align-items: center; justify-content: space-between;">
            <p style="font-weight:bold;font-size:15px">银行卡信息</p>
            <van-icon size="18px" v-if="hascardDetail" @click="LookCardDetail" name="arrow-up" />
            <van-icon v-else size="18px" @click="LookCardDetail" name="arrow-down" />
          </div>
          <div v-show="hascardDetail">
          <p style="color:#333">开户银行: <span style="color:#666">{{bankName?bankName:'无'}}</span></p>
          <p style="color:#333">开户支行: <span style="color:#666">{{bankSubName?bankSubName:'无'}}</span></p>
          <p style="color:#333">银行卡号: <span style="color:#666">{{bankCardNo?bankCardNo:'无'}}</span></p>
        </div>
      </div>
       <div style="background-color:white;color:#333;padding:15px;border-radius:8px;margin:10px" v-show="isEnabledAuth && iszxWeixin && hasCertification">
          <div style="display:flex;align-items: center; justify-content: space-between;">
            <p style="font-weight:bold;font-size:15px">实名认证</p>
            <span style="display:flex;align-items: center;" v-show="authStatus == 'UnAuth'" @click="toCertification">
                <p>{{authStatusDisplay}}</p>
                 <van-icon size="18px" v-if="authStatus" @click="LookCardDetail"  name="arrow" />
            </span>
            <span style="display:flex;" v-show="authStatus == 'Pending' || authStatus == 'PassAuth' ">
                <p>{{authStatusDisplay}}</p>
            </span>
          </div>
          <div style="margin-top:10px" v-show="authRemark">
            <p style="color:#333">失败原因: <span style="color:#f44">{{ authRemark}}</span></p>
        </div>
      </div>
      <div style="background-color:white;color:#333;display: flex;padding:15px;border-radius:8px;margin:10px;justify-content: space-between;" v-show="salesMan">
          <p style="font-weight:bold;font-size:15px">推荐人</p>
          <!-- <p style="color:#333">所属组织:{{agentInfo.organName?agentInfo.organName:'无'}}</p> -->
          <p style="color:#333">{{agentInfo.refereer?agentInfo.refereer:'无'}}</p>
          <!-- <p style="color:#808080">辅导人:{{agentInfo.counsellorSalesman?agentInfo.counsellorSalesman:'无'}}</p> -->
      </div>
      <div v-show="!ischangeCode" style="background-color:white;color:#333;padding:10px;border-radius:8px;margin:10px">
        <p style="font-weight:bold;font-size:15px;display:flex;align-items:center;font-size:14px;color:#333;height:100%;justify-content: space-between;" @click="openModifyPWD">修改密码
          <van-icon size="18px" name="arrow" style="margin-left:10px" />
        </p>
      </div>
      <van-dialog v-model="showModifyPWD" show-cancel-button :before-close="beforeClose" :overlay='overlay' :close-on-click-overlay='overlay' :show-confirm-button='btn' :showCancelButton='btn'>
        <div class="dialogs">
          <p style="color:#333;font-size:18px;font-weight:bold">修改密码</p>
          <div class="diaContent">
            <div style="margin-top:15px">
              <mt-field label="原密码" class="mint-formItm" v-model="oldPsw" type="password" placeholder="请输入原密码">
              </mt-field>
              <mt-field label="新密码" class="mint-formItm" v-model="newPsw" type="password" placeholder="请输入新密码">
              </mt-field>
              <mt-field label="确认密码" class="mint-formItm" v-model="confirmPsw" type="password" placeholder="请输入确认密码">
              </mt-field>
            </div>
            <div class="btns-hao" style="margin-top:30px">
              <span @click="cancel" style="font-size:14px">取消</span>
              <mt-button type="primary" @click="modifyPWD" size="large" style=" background: #357bfd;font-size:12px;height:30px;width:85px">确定</mt-button>
            </div>
          </div>
        </div>
      </van-dialog>
    </div>
    <!-- <div class="parentWrap" style="background-color:white;color:#333;display: flex;padding:10px;border-radius:8px;margin-top:10px;" > -->
    <mt-button class="btn-fixed" type="primary" size="large" @click="Signout">退出登录</mt-button>
    <!-- </div> -->
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Dialog } from 'vant';
import store from './../../store/store';
import * as types from './../../store/types';
import verify from "./../../common/verify";
import { axiosGetAPI, axiosPostAPI, axiosPutAPI, axiosDeleteAPI } from './../../common/Axios';
import { dialog } from 'vant';
export default {
  name: 'angent',
  data() {
    return {
      salesManStatus: '',
      hasInsCorpNum: false,
      hasImages: false,
      agentInfo: {
        "idType": "",
        "idNo": "",
        "licenseNo": "",
        "linkUserId": "",
        "mobile": "",
        "jobNumber": "",
        "classify": "",
        "gender": "",
        "nationality": "",
        "birthDay": "",
        "address": "",
        "education": "",
        "maritalStatus": "",
        "nation": "",
        "politicalStatus": "",
        "bankCode": "",
        "bankName": "",
        "bankSubName": "",
        "bankCardNo": "",
        "contactName": "",
        "contactPhone": "",
        "email": "",
        "remark": "",
        "referrerSalesmanId": "",
        "refereer": "",
        "counsellorSalesmanId": "",
        "counsellorSalesman": "",
        "renewalHolderSalesmanId": "",
        "renewalHolderSalesman": "",
        "headImageUrl": "",
        "headImageMediaId": "",
        "insCorpNumbers": [{
          "id": "",
          "number": "",
          "insCorpCode": "",
          "insCorpName": ""
        }],
        "images": [{
          "id": "",
          "filePath": "",
          "fileName": "",
          "rank": ""
        }],
        "id": "",
        "linkedUser": "",
        "name": "",
        "organName": "",
        "deptName": "",
        "status": "",
        "hiredate": "",
        "modifier": "",
        "modifiedTime": ""
      },
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      hasImages: false,
      hasImage1: false,
      hasImage2: false,
      hasImage3: false,
      hasImage4: false,
      rankName: '',
      bankName: '',
      bankSubName: '',
      bankCardNo: '',
      showReg: false,
      agreements: [],
      hasAgreements: false,
      messageone: false,
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      agreementName: '',
      agreementUrl: '',
      overlay: true,
      btn: false,
      showModifyPWD: false,
      oldPsw: '',
      newPsw: '',
      confirmPsw: '',
      avatar: this.src = require('../../assets/images/img-avatar.png'),
      hasweixinImg:this.src = require('../../assets/images/icon-hasweixin.png'),
      weixinImg:this.src = require('../../assets/images/icon-Infweixin.png'),
      salesMan: false,
      weixinInfor:{},
      hasBindWeixin:false,
      noBindWeixin:false,
      hasDetail:false,
      hascardDetail:false,
      enableLogin:false,
      iszxWeixin:false,
      ischangeCode:false,
      isEnabledAuth:false,
      authStatus:'',
      authStatusDisplay:'',
      authRemark:'',
      hasCertification:true,
    }
  },
  mounted() {
    if(sessionStorage.getItem('hasCertification')){
        this.hasCertification = sessionStorage.getItem('hasCertification');
    }
    var self = this;
    this.appId = localStorage.getItem('appId');
    this.ischangeCode  =  (this.appId == 'cx7190761141531rzi');
    this.iszxWeixin = (this.appId == 'cx7190761141531rzi' || this.appId == 'cxa181211170855pxj');
    var wxUrl = window.location.href.split('#')[0];
    var url = '/Configurations?types=weixin&weixin_url=' + encodeURIComponent(wxUrl);
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if(isWeixin){
      axiosGetAPI(url).then((res) => {
        if (res.status == 200 && res.result && res.result.weixin) {
            self.enableLogin = res.result.weixin.enableLogin || false; 
            if(self.enableLogin ){
              if(sessionStorage.getItem("weixinInfor") ){
                this.weixinInfor = JSON.parse(sessionStorage.getItem("weixinInfor"));
                this.hasBindWeixin = true;
              }else{
                axiosGetAPI('/Weixin').then(res=>{//获取微信用户信息
                  if(res.result){
                    self.weixinInfor = res.result;
                    var weixinInfor = {};
                    weixinInfor = JSON.stringify(res.result);
                    sessionStorage.setItem("weixinInfor" ,weixinInfor);
                    self.hasBindWeixin = true;
                    }else{
                        this.noBindWeixin = true;
                        this.hasBindWeixin = false;
                    }
                  })
              }
          }
         } 
       }) 
    } 
    this.loadAgentInfo();
  },
  methods: {
   async toCertification(){
          var _url = ''
         this.salesmanId = sessionStorage.getItem('salesmanId');
         var url = window.location.protocol + '//' + window.location.host + '/#' + '/myInfo/myIndex?appId=' + localStorage.getItem('appId');
         var callback = encodeURIComponent(url);
         await axiosGetAPI('/Salesmans/'+ this.salesmanId + '/Authentication?callback=' + callback).then(res=>{
            // Indicator.close()
            if(res.status){
                _url = res.result;
            }
          })
          if(_url){
            window.location.href = _url;
          }
      
      //  this.$router.push({ path: '/myInfo/zxCertification'});
    },
    LookDetail(){
      this.hasDetail = !this.hasDetail;
    },
    LookCardDetail(){
      this.hascardDetail = !this.hascardDetail;
    },
    bindWeixin(){
      var self = this;
    this.$dialog.confirm({
                  title: '',
                   message: '是否绑定微信'
                  }).then(() => {
                 self.$router.push({ path: "/quoteManagement/transitionPage", query: { appId: self.appId, urlFrom:"myInfor" } });
                }).catch(() => {}); 
    },
    unbindWX(){
      var self = this;
     this.$dialog.confirm({
                  title: '',
                   message: '是否解绑微信'
                  }).then(() => {
                  var ua = navigator.userAgent.toLowerCase();
                  var isWeixin = ua.indexOf('micromessenger') != -1;
                 axiosDeleteAPI('/Weixin').then(res=>{
                   if(res.status == '200'){
                     sessionStorage.removeItem("weixinInfor");
                     sessionStorage.setItem("hasBindWeixin",false);
                    self.hasBindWeixin = false;
                    if(isWeixin){
                      self.noBindWeixin = true;
                    }
                    self.weixinInfor = {};
                   Toast('解除成功');
                   }
                 })
                }).catch(() => {}); 
    },
    beforeClose() {},
    Signout: function() {
      var self = this;
      store.commit(types.LOGOUT);
      sessionStorage.removeItem('userIds');
      sessionStorage.removeItem('nickName');
      sessionStorage.removeItem('referralCode');
      sessionStorage.removeItem('title');
      sessionStorage.removeItem('salesmanId');
      sessionStorage.removeItem('hasCertification');
      // sessionStorage.removeItem('accountName');
      sessionStorage.removeItem("carInfoData");
      sessionStorage.removeItem('sellerOrgCode');
      sessionStorage.removeItem('sellerDeptCode');
      sessionStorage.removeItem('CarInformation');
      sessionStorage.removeItem('insCtiyCode');
      sessionStorage.removeItem('settleFeeIds');
      sessionStorage.removeItem('agentInfo');
      sessionStorage.removeItem("canViewCarCommission");
      sessionStorage.removeItem('canViewLifeCommission');
      sessionStorage.removeItem('canViewRemmendBonu');
      sessionStorage.removeItem("hasBindWeixin");
      sessionStorage.removeItem("weixinInfor");
      sessionStorage.removeItem("openId");
      sessionStorage.removeItem("weixinCode");
      sessionStorage.removeItem("wxappId");
      sessionStorage.removeItem("enableLogin");
      sessionStorage.removeItem("userCode");
      sessionStorage.removeItem("authStatus");
      // sessionStorage.removeItem("canReg");
      sessionStorage.removeItem('accountName');
      sessionStorage.removeItem('sellerOrgName');
      sessionStorage.removeItem('sellerDeptName');
      sessionStorage.removeItem('sellerName');
      localStorage.removeItem('token');
      
      localStorage.removeItem('hasManage');
      localStorage.removeItem('hasViewCars');
      localStorage.removeItem('hasLookEnquiryProducts')
      localStorage.removeItem("hasLookAgencyBandCard");
      if(this.ischangeCode){
        this.$store.commit(types.LOGOUT);
        this.$router.push({ path: "/myInfo/zxlogin?appId=" + localStorage.getItem('appId') + '&showOrg=true'});
        // this.$router.push({ path: "/login?appId=" + localStorage.getItem('appId') });
      }else{
        this.$router.push({ path: "/login?appId=" + localStorage.getItem('appId') });
      }
      
    },
    openAgreement: function(item) {
      this.messageone = true;
      this.agreementName = item.name;
      this.agreementUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + item.downloadUrl;
      // this.$router.push({ path: '/agreement?fileUrl=' + fileUrl })
    },
    closeAgreement: function() {
      this.messageone = false;
    },
    openBack: function() {
      this.$router.push({ path: "/myInfo/myIndex" });
    },
    loadAgentInfo: function() {
      var self = this;
      var salesmanId = sessionStorage.getItem('salesmanId');
      if (salesmanId) {
        Indicator.open('加载中...');
        self.salesMan = true;
        self.showReg = false;
        self.salesManStatus = '已通过';
        axiosGetAPI('/Salesmans/' + salesmanId).then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result) {
            self.parseAgentInfo(d.result);
          }
        })
        /*axiosGetAPI('/Ranks/' + salesmanId).then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result) {
            self.rankName = d.result.rankName;
          }
        })*/
      } else {
        self.salesMan = false;
        self.agentInfo.name = sessionStorage.getItem('sellerName');
        self.agentInfo.organName = sessionStorage.getItem('sellerOrgName');
        self.agentInfo.deptName = sessionStorage.getItem('sellerDeptName');
        /*var url = '/Users/' + sessionStorage.getItem('userIds') + '/SalesmanApply';
        axiosGetAPI(url).then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result) {
            self.parseAgentInfo(d.result);
          }
        })*/

      }
    },
    parseAgentInfo: function(agentInfo) {
      console.log(agentInfo);
      this.agentInfo = agentInfo;
      sessionStorage.setItem('agentInfo', JSON.stringify(this.agentInfo));
      this.bankName = agentInfo.bankName;
      this.bankSubName = agentInfo.bankSubName;
      this.bankCardNo = agentInfo.bankCardNo;
      this.hasInsCorpNum = (agentInfo.insCorpNumbers && agentInfo.insCorpNumbers.length > 0);
      var images = agentInfo.images;
      this.isEnabledAuth = agentInfo.isEnabledAuth
      this.authStatus = agentInfo.authStatus;
      this.authStatusDisplay = agentInfo.authStatusDisplay;
      this.authRemark = agentInfo.authRemark;
      this.hasImages = (images && images.length > 0);
      if (images.length > 0) {
        this.image1 = images[0].filePath;
        this.hasImage1 = true;
      }
      if (images.length > 1) {
        this.image2 = images[1].filePath;
        this.hasImage2 = true;
      }
      if (images.length > 2) {
        this.image3 = images[2].filePath;
        this.hasImage3 = true;
      }
      if (images.length > 3) {
        this.image4 = images[3].filePath;
        this.hasImage4 = true;
      };
      this.showReg = false;
      /*if (agentInfo.status == 'NotPass' || agentInfo.status == 'NotRecheck') {
        this.isSalesMan = false;
        this.salesManStatus = '未通过';
        this.showReg = true;
      } else if (agentInfo.status == 'Auditing' || agentInfo.status == 'Recheck') {
        this.isSalesMan = false;
        this.salesManStatus = '审核中';
      } else {
        this.isSalesMan = true;
        this.salesManStatus = '已通过';
      }*/
      if (this.salesMan) {
        axiosGetAPI('/Salesmans/' + agentInfo.id + '/BankCards').then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result && d.result.length > 0) {
            this.agentInfo.bankName = d.result[0].subBankName;
            this.agentInfo.bankCardNo = d.result[0].cardNo;
            this.bankName = d.result[0].bankName;
            this.bankSubName = d.result[0].subBankName;
            this.bankCardNo = d.result[0].cardNo;
            sessionStorage.setItem('agentInfo', JSON.stringify(this.agentInfo));
          }
        })
        /*axiosGetAPI('/Salesmans/' + agentInfo.id + '/Agreements').then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result && d.result.length > 0) {
            this.agreements = d.result;
            this.hasAgreements = true;
          } else {
            this.hasAgreements = false;
          }
        })*/
      };
    },
    goToEdit: function() {
      // this.$router.push({ path: "/salesman/edit", query: { appId: localStorage.getItem('appId') } });
    },
    openModifyPWD: function() {
      this.showModifyPWD = true;
    },
    cancel: function() {
      this.showModifyPWD = false;
    },
    modifyPWD: function() {
      var me = this;
      if (!me.oldPsw) {
        Toast({
          message: '请输入原密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      if (!me.newPsw) {
        Toast({
          message: '请输入新密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      if (!me.confirmPsw) {
        Toast({
          message: '请输入确认密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };

      if (me.confirmPsw != me.newPsw) {
        me.confirmPsw = '';
        Toast({
          message: '两次输入的密码不一致，请重新输入',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      var putBody = { "password": "", "newPassword": "" };
      putBody.password = me.oldPsw;
      putBody.newPassword = me.newPsw
      var url = '/Users/Me/Password';
      axiosPutAPI(url, putBody).then((data) => {
        Indicator.close();
        if (data.status == 200) {
          Toast('密码修改成功，请重新登录');
          me.Signout();
        } else {
          Toast(res.errMsg);
        }
      });
    },
  }
}

</script>
<style scoped>
.messagecc {
  height: 100%;
  width: 100%;
}

.member-head {
  display: inline-block;
  width: 72px;
  height: 72px;
  background-color: #eee;
  border-radius: 50%;
}

dialogs .title {
  font-size: 14px;
}

.dialogs {
  padding: 10px 20px;
  font-size: 12px;
}

.diaContent {
  padding: 0 0px;
}

.diaContent .imgcontent {
  text-align: center
}

.diaContent .imgcontent img {
  max-width: 130px;
}

.diaContent .tip {
  padding: 20px 0;
  color: #B1B9CE
}

.diaContent .tip span {
  vertical-align: text-bottom;
  margin-left: 5px
}

.diaContent .pos .pos-content {
  padding: 0 20px;
  margin-bottom: -10px;
}

.diaContent .pos .pos-content .tit {
  padding-bottom: 10px;
}

.diaContent .pos .pos-content .tit span {
  font-size: 20px
}

.btns-hao {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns-hao span {
  flex: 1;
  color: #357bfd;
  line-height: 40px;
}

.btn-fixed {
  background: #357bfd;
}

</style>
