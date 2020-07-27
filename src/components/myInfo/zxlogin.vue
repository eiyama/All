<template>
  <div :style="bodyBox" class="login">
   <div class="mint-content mint-region">
        <mt-field class="mint-formItm" :disabled="true">
          <img :src="phoneImg" style="width:20px;">
          <input class="mint-input" v-model="phone" type="number" maxlength='11' placeholder="请输入手机号">
        </mt-field>
        <mt-field class="mint-formItm" style="position: relative;" :disabled="true">
          <img :src="pswImg" style="width:20px;">
          <input class="mint-input" v-model="verifyCode" placeholder="请输入验证码">
             <div style="position: absolute;right: 0;bottom:2px">
                 <p class="btnTitle" :style="verifyBtn" @click="getVerifyCode" >{{btnTitle}}</p>
            </div> 
        </mt-field> 
        <div style="padding:0px 10px">
            <mt-button class="btn-login" type="primary" @click="jumpreg" size="large">登录</mt-button>
        </div>
        <p style="color:#4A66FE;text-align: center; margin: 30px;" @click="toRegister">我要注册</p>
        <!-- <div class="footer-banner">
        </div> -->
    </div>
     
  </div>
</template>
<script>
  import {
    axiosGetAPI,
    axiosPostAPI
  } from './../../common/Axios';
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import store from "./../../store/store";
  import * as types from './../../store/types';
  import { Dialog } from 'vant';
  export default {
    data() {
      return {
        bodyBox: {
          'minHeight': '',
          'background': '#fff',
          'padding': '40px 0'
        },
        appId: '',
        nickName: '',
        title: '',
        referrerMobile: '',
        shareUrl:'',
        phoneImg: (this.src = require("../../assets/images/phone-icon.png")),
        pswImg: (this.src = require("../../assets/images/verify-icon.png")),
        canReg: false,
        urlFrom: "",
        code: "",
        enableLogin: false,
        openId: "",
        btnTitle:'获取验证码',
        verifyBtn:{
            "backgroundColor":'#fff',
            "color":"#4A66FE",
            "border":"1px solid rgb(74, 102, 254)"
        },
        countTime:'60',
        disabled:false,
        phone:'',
        verifyCode:'',
        realName:'',
        zeRegister:{"backgroundColor":"#FFF","minHeight": "650px" },
        InsuranceCard:[],
        popOrganizationVisible: false,
        organization: '',
        organizationVal: '',
        isFlag:true,
      }
    },
    created: function() {
          var h = window.innerHeight;
          this.bodyBox.minHeight = h + 'px';
           if(this.$route.query.appId){
        this.appId = this.$route.query.appId;
        localStorage.setItem("appId", this.appId);
      }
      if(sessionStorage.getItem('openId')){
        this.openId = sessionStorage.getItem('openId');
      }
        localStorage.removeItem("canReg");
        localStorage.removeItem("hasViewCars");
        localStorage.removeItem("hasManage");
        // localStorage.removeItem("token");
        if (this.appId == '' || this.appId == null || this.appId == 'undefined') {
          // this.appId = this.$route.query.appId;
          this.appId = localStorage.getItem('appId');
        }
        localStorage.setItem("appId", this.appId);
        Indicator.open('加载中...');
        axiosGetAPI('/apis/apps/' + this.appId + "/H5").then((res) => {
          Indicator.close();
          this.title = res.result.name;
          sessionStorage.setItem('title', this.title);
          localStorage.setItem("appId", this.appId);
          localStorage.setItem("serviceHost", res.result.serviceHost);
          localStorage.setItem("servicePort", res.result.servicePort);
          axiosGetAPI('/Configurations?types=salesman').then((d) => {
              if (d.status == 200 && d.result && d.result.salesman) {
                var plates = d.result.salesman.plates;
                if (plates && plates.length > 0) {
                  this.canReg = true;
                } else{
                  this.canReg = false;
                }
              } else{
                this.canReg = false;
              }
              localStorage.setItem("canReg", this.canReg);
            });
        });
    },
  async  mounted() {
     
      var self = this;
    this.appId = localStorage.getItem("appId");
    localStorage.setItem("appId",this.appId);
    // this.urlFrom = this.$route.query.urlFrom;
    var token = store.state.token || localStorage.getItem(token) || "";
    var wxappId = "";
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin && this.openId == "") {
      //在微信环境下
      // var url = window.location.href;
      self.code = self.getUrlParam("code");
      if (self.code == "" || self.code == null) {
        var wxUrl = window.location.href.split("#")[0];
        var url = "/Configurations?types=weixin&weixin_url=" + encodeURIComponent(wxUrl);
        var local = encodeURIComponent(window.location.href);
        await axiosGetAPI(url).then(res => {
          if (res.status == 200 && res.result && res.result.weixin) {
            wxappId = res.result.weixin.appId;
            self.enableLogin = res.result.weixin.enableLogin || false;
            if (wxappId && self.enableLogin) {
              //能获取微信配置（appid）且站点打开了免登陆；
              window.location.href =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                wxappId + "&redirect_uri=" +  local +
                "&response_type=code&scope=snsapi_userinfo&state=yIwrleQfyqxdPHj#wechat_redirect";
            } else {
              //提示未在后台配置微信免登陆
            }
          }
        });
      } else {
        // Toast('授权成功');
        self.openId = sessionStorage.getItem("openId") || ""; //code只能用一次，openId能重复使用；
        // if (!self.openId) {
            axiosPostAPI('/Weixin/' + self.code + '/Token').then(dataRes=>{
              if( dataRes.status == '200' && dataRes.result.bindUser != undefined && dataRes.result.bindUser.token != undefined){
                Toast('该微信号已绑定账号，正在为您登录');
                  self.openId = dataRes.result.openId;
                  sessionStorage.setItem("openId", self.openId);
                   self.$store.commit(types.LOGIN, dataRes.result.bindUser.token);
                   localStorage.setItem('token',localStorage.getItem('appId') + '_' + dataRes.result.bindUser.token); 
                    this.$router.push({ path: "/", query: { appId: self.appId } });
               }else{
                self.openId = dataRes.result.openId;
                sessionStorage.setItem("openId", self.openId);
               }
            })
      }
    }
    },
    methods: {
       searchOrg(e){
        if(this.InvitationCode){
             axiosGetAPI('/Users?userCode=' + this.InvitationCode).then((res) => {
                if (res.status == 200 && res.result) {
                  this.hasOrgResult = true;
                  this.organizationVal = res.result.orgName;
                  this.realName = res.result.realName;
                  this.customerData.ReferrerMobile = res.result.userName;
                  this.customerData.OrgCode = res.result.orgCode;
                  this.organization = res.result.orgName;
                }
                else{
                     this.hasOrgResult = false;
                     this.organizationVal = '';
                }
            });
        }else{
            this.hasOrgResult = false;
            return;   
        }
      },
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
   getVerifyCode(){
        var self = this;
         if(!this.phone){
          Toast('请输入手机号');
          return;  
        }
        if(this.phone){
            if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
            Toast("手机号码有误，请重新输入");  
            return false; 
            } 
        }
        if(!this.openId){
          Toast('未获取微信登录权限，请先授权微信');
          return;  
        }
        if(this.countTime < 60){
            return;
        }
         if(this.isFlag){ //防止重复点击
           this.isFlag = false;
            if(this.phone){
              axiosGetAPI('/Users?userName=' + this.phone).then((resData) => {
                        if(resData.result){
                           this.verifyBtn.backgroundColor = "#f0f0f0";
                          this.verifyBtn.color = "#999";
                          this.verifyBtn.border = "1px solid #eee"
                          axiosGetAPI('/Weixin/'+ this.openId + '/captcha?phone=' + this.phone).then(res=>{
                              if(res.status == "200"){
                                  let timer = setInterval(() => {
                                      if( this.countTime == 0) {
                                          clearInterval(timer);
                                          this.countTime = 60;
                                          this.disabled = false;
                                          self.verifyBtn.backgroundColor = "#4A66FE";
                                          self.verifyBtn.color = "#fff";
                                          this.btnTitle = "获取验证码";
                                          this.isFlag = true;
                                      } else {
                                          this.btnTitle = this.countTime + '秒后重试';
                                          this.disabled = true;
                                          this.countTime--
                                      }
                                      },1000)
                                  }    
                              })  
                          }else{
                            Toast('您还未注册请先注册！');
                            return;
                          }
                        })
            }
         }
    },
   async jumpreg(){
      var self = this;
          if(this.phone == ""){
            Toast("请输入手机号");
            return
          }
        if(this.verifyCode == ""){
              Toast("请输入验证码");
              return
            }
            var model = {},token = "";
            model.captcha = this.verifyCode;
            model.phone = this.phone;
            localStorage.removeItem('permissions');
            localStorage.setItem('hasManage', false);
            localStorage.setItem('hasViewCars', false);
            Indicator.open('正在登陆')
           await axiosPostAPI('/Weixin/'+ this.openId + '/captcha',model).then(res=>{
             Indicator.close();
                  if(res.status == "200"){
                            // self.$store.commit(types.LOGININFO, self.login);
                            self.$store.commit(types.LOGIN, res.result.token);
                            self.appId = localStorage.getItem('appId');
                            localStorage.setItem('token', self.appId + '_' + res.result.token);
                           token = res.result.token;
                  }else{
                    return ;
                  }
            })
            var ua = navigator.userAgent.toLowerCase();
            var isWeixin = ua.indexOf('micromessenger') != -1;
            if(isWeixin  &&  token ){ //在微信环境下登录成功
                  if(this.openId){ //enableLogin是否有微信登录功能（站点配置）
                    var isToHome = false;
                    await axiosGetAPI('Weixin').then(res=>{ //判断是否绑定微信，如果没有弹框让他是否绑定微信，如果绑定了则直接到首页
                        if(res.result){
                           var weixinInfor = {};
                            weixinInfor = JSON.stringify(res.result);
                            sessionStorage.setItem("weixinInfor" ,weixinInfor);
                            sessionStorage.setItem('hasBindWeixin',true);
                            self.$router.push({ path: "/", query: { appId: self.appId } });
                        }else{
                          sessionStorage.setItem('hasBindWeixin',false)
                           Dialog.confirm({
                                title: '',
                                message: '是否绑定微信'
                              }).then(() => {
                                self.$router.push({ path: "/quoteManagement/transitionPage", query: { appId: self.appId } });
                              }).catch(() => {
                                // on cancel
                                self.$router.push({ path: "/", query: { appId: self.appId } });
                            });
                         
                        }
                      })
                    }else{
                      self.$router.push({ path: "/", query: { appId: self.appId } });
                    }
                // }
              }
          await axiosGetAPI('/Users/Me/Permissions').then((res) => {
          if (res.result) {
            var permissions = res.result.permissions;
            if (permissions && permissions.length > 0) {
              for (var i = 0; i < permissions.length; i++) {
                if (permissions[i] == "SiteOwner") {
                  localStorage.setItem('hasManage', true);
                  localStorage.setItem('hasViewCars', true);
                  localStorage.setItem('hasLookAgencyBandCard', true);
                  localStorage.setItem('hasLookEnquiryProducts', true);
                  break;
                } else {
                  if (permissions[i] == "LookCameraCustomers" || permissions[i] == "LookCameraCars") {
                    localStorage.setItem('hasViewCars', true);
                    continue;
                  }
                  if (permissions[i] == "LookVIDataAnalysis") {
                    localStorage.setItem('hasManage', true);
                    continue;
                  }
                  if (permissions[i] == "LookAgencyBandCard") {
                    localStorage.setItem('hasLookAgencyBandCard', true);
                    continue;
                  }
                  if (permissions[i] == "LookMeEnquiryPolicy") {
                    localStorage.setItem('hasLookEnquiryProducts', true);
                    continue;
                  }
                }
              }
            }
            //  if(!isWeixin  || !self.enableLogin){
            //      self.$router.push({ path: "/", query: { appId: self.appId } });
            //   }
          }
        });
    },
    toRegister(){
      // this.$router.push({path:'/myInfo/zxregister'});
       this.$router.push({ path: "/myInfo/zxregister?appId=" + localStorage.getItem('appId') + '&showOrg=true'});
    }
    }
  }
</script>
<style scoped>
  
.login .mint-formItm .mint-input {
  width: 85%;
  margin-right: 0;
  color: #333;
  font-size: 14px;
}

.login .btn-login {
  margin-top: 50px;
  background:#4A66FE;
}

.login .fn-clear-j {
  color: #888991;
  padding: 10px;
}

.login .fn-clear-j p {
  float: right;
}

.login .fn-clear-j a {
  color: #fff
}
.login-images img{
  width: 100%;
  height: 160px;
  margin-bottom: 15px;
}

.btnTitle{
    font-size: 12px;
    color:#999;
    background: #f0f0f0;
    padding: 0 10px;
    border-radius: 6px;
    height: 32px;
    line-height: 32px;
    border:1px solid #eeeeee;
}

.btnInvitation{
    position:absolute;
    bottom: 0;
    padding: 10px;
    font-size: 14px;
    color:#999;
    background: #f0f0f0;
    right: 0;
    /* padding: 0 10px; */
}

.tip{
    padding-top: 20px;
    line-height: 40px;
    /* padding: 1px 0; */
    margin: 0 15px;
    /* border-bottom: 1px solid #e0e0e0; */
}

.tip1{
    padding: 10px 0;
    margin: 0 15px;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;  
}

.footer-banner{
    background: url('./../../assets/images/regiter-banner.png')no-repeat 0 0;
    background-size: cover;
    height: 150px;
    opacity: 0.6;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 5;
}
</style>
