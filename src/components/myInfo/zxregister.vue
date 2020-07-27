<template>
  <div class="login" :style="zeRegister">
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
              <!-- <mt-button  size="small" type="default">{{btnTitle}}</mt-button> -->
            </div> 
        </mt-field>
          <p class="tip" v-show="!showOrg">推荐人：<span  style="color:#333;font-weight: normal;">{{ nickName ? nickName : realName ? realName  + "(" +  customerData.ReferrerMobile + ")" : customerData.ReferrerMobile}}</span></p>
          <!-- <p class="tip1" v-show="showOrg">邀请码：<span  style="color:#333;font-weight: normal;">{{}}</span></p> -->
          <div class="zxFieldBox" v-show="showOrg" style="border-bottom: 1px solid #e0e0e0;margin: 0 4%;position: relative;">
              <van-field class="zxField" label="邀请码：" @keyup="searchOrg" v-model="InvitationCode" placeholder="请输入邀请码" />
              <!-- <p class="btnInvitation" @click="searchOrg">查询机构</p> -->
          </div>
        <div v-show="!hasOrgResult && showOrg" class="zxFieldBox" style="border-bottom: 1px solid #e0e0e0;margin: 0 4%;">
           <van-field required  class="zxField1" readonly clickable label="机构" :value="organizationVal" placeholder="请选择机构" @click="popOrganizationVisible = true" right-icon="arrow" />
        </div>
         <div class="tip2" v-show="hasOrgResult"> <p class="tip2_bef">*</p> 机构 <span  style="margin-left:50px;color:#333;font-weight: normal;">{{organizationVal}}</span></div>
         <p style="color: rgb(255, 68, 68); font-size: 14px; margin: 15px;">如果您有超人补给站账号，请勿注册！请在超人补给站公众号登录使用。</p>
        <van-popup v-model="popOrganizationVisible" position="bottom">
              <van-picker show-toolbar :columns="InsuranceCard" @cancel="popOrganizationVisible = false" @confirm="onInsuranceCard" />
        </van-popup>
        <div style="padding:0px 10px">
            <mt-button class="btn-login" type="primary" @click="jumpreg" size="large">注&nbsp;册</mt-button>
            <p style="color:#4A66FE;text-align: center; margin: 30px;" @click="toLogin">已有账号去登陆</p>
        </div>
        <!-- <div class="footer-banner">
        </div> -->
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import store from "./../../store/store";
import * as types from "./../../store/types";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Dialog } from "vant";
export default {
  // name: 'login',
  data() {
    return {

      title: "",
      appId: "",
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
      showPickerRes:false,
      insuranceCode:[],
      showOrg:false,
      referrerMobile:'',
      organization:'',
      InvitationCode:'',
      userCode:'',
      customerData:{
         ReferrerMobile:'' ,
         OrgCode:'',
         phone:'',
      },
      hasOrgResult:false,
      nickName:'',
      isFlag:true,
    };
  },
  created(){
    // localStorage.removeItem('token');
      this.appId = this.$route.query.appId || localStorage.getItem("appId");
      localStorage.setItem("appId",this.appId);
      this.nickName = this.$route.query.nickName;
      this.showOrg = this.$route.query.showOrg;
      this.referrerMobile = this.$route.query.ReferrerMobile;
      var height = window.innerHeight;
      this.zeRegister.minHeight =  height  + 'px';
      axiosGetAPI('/Organizations?containSubDept=true').then((res) => {
      if (res.status == 200 && res.result) {
        this.Depts = res.result;
        var deptNames = [];
        var code = [];
        for (var i = 0; i < this.Depts.length; i++) {
        deptNames.push(this.Depts[i].fullName);
        code.push(this.Depts[i].code)
        }
        this.InsuranceCard = deptNames;
        this.insuranceCode = code;
      }
    });
    this.InvitationCode =  this.$route.query.userCode;
     if(this.InvitationCode){
             axiosGetAPI('/Users?userCode=' + this.InvitationCode).then((res) => {
                if (res.status == 200 && res.result) {
                 this.realName = res.result.realName;
                 this.customerData.ReferrerMobile = res.result.userName;
                 this.customerData.OrgCode = res.result.orgCode;
                 this.organization = res.result.orgName;
                }
            });
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
                    //  Toast('查询失败，请检查邀请码或手动选择机构');
                }
            });
        }else{
            // Toast('请输入邀请码');
            this.hasOrgResult = false;
            return;   
        }
      },
    onInsuranceCard(e){
        this.organizationVal = e;
        this.popOrganizationVisible = false;
        for(var i = 0;i < this.InsuranceCard.length;i++  ){
            if(e == this.InsuranceCard[i]){
                this.customerData.OrgCode = this.insuranceCode[i];
            }
        }
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
     if(this.isFlag){ //防止重复点击
        this.isFlag = false;
        if(this.countTime < 60 ){
            return;
        }
        if(this.openId && this.phone){
           axiosGetAPI('/Users?userName=' + this.phone).then((res) => {
              if(res.result){
                 Toast('该手机号已注册，请重新输入');
                 return;
              }else{
            axiosGetAPI('/Weixin/'+ this.openId + '/captcha?phone=' + this.phone).then(res=>{
                if(res.status == "200"){
                  this.verifyBtn.backgroundColor = "#f0f0f0";
                  this.verifyBtn.color = "#999";
                  this.verifyBtn.border = "1px solid #eee"
                    let timer = setInterval(() => {
                        if( this.countTime == 0) {
                            clearInterval(timer);
                            this.countTime = 60;
                            this.disabled = false;
                            self.verifyBtn.backgroundColor = "#4A66FE";
                            self.verifyBtn.color = "#fff";
                            this.btnTitle = "获取验证码";
                            self.isFlag = true;
                        } else {
                            this.btnTitle = this.countTime + '秒后重试';
                            this.disabled = true;
                            this.countTime--
                        }
                        },1000)
                    }    
                })
              }
          })  
        }
        }  
    },
    //注册
   async jumpreg() {
     var self = this;
        if(!this.phone){
            Toast('请输入手机号');
            return;
        }
        if(!this.verifyCode){
            Toast('请输入验证码');
            return;
        }
        if(!this.customerData.OrgCode){
            Toast('请输入选择入职机构');
            return;
        }
        if(this.customerData.OrgCode && this.phone && this.verifyCode){
            var model = {};
            model.phone = this.phone;
            model.captcha = this.verifyCode;
            model.orgCode = this.customerData.OrgCode;
            model.referralCode = this.InvitationCode;
            // console.log(model);
            Indicator.open('正在注册请稍后...');
            var token = '';
          await axiosPostAPI('/Weixin/'+ this.openId + '/User' , model).then(res=>{
             Indicator.close(); 
              if(res.status == '200'){
                  self.$store.commit(types.LOGININFO, self.login);
                  self.$store.commit(types.LOGIN, res.result.token);
                  self.appId = localStorage.getItem('appId');
                  localStorage.setItem('token', self.appId + '_' + res.result.token);
                  token = res.result.token;
              }else{
                return;
              }  
            })  
        if(token){
           await axiosPostAPI('/Weixin?openId=' + self.openId ).then(res=>{ //根据openId绑定当前业务员，即微信与业务员绑定。
          if(res.status == '200'){         
               this.$router.push({path:'/myInfo/zxtoHome?appId=' + localStorage.getItem('appId')});
           }else{
              localStorage.removeItem('token');
           }
          })
        } 
        }
    },

    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    toLogin(){
      this.$router.push({path:'/myInfo/zxlogin'});
    }

  },
  async mounted() {
    var self = this;
    // self.appId = self.$route.query.appId;
    //  localStorage.getItem("appId")
    this.appId = self.$route.query.appId || localStorage.getItem("appId");
    localStorage.setItem("appId",this.appId);
    // this.urlFrom = this.$route.query.urlFrom;
    this.openId = sessionStorage.getItem('openId');
    var token = store.state.token || localStorage.getItem(token) || "";
    var wxappId = "";
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin && this.openId != '') {
      //在微信环境下登录成功
      // var url = window.location.href;
      self.code = self.getUrlParam("code");
      if (self.code == "" || self.code == null) {
        var wxUrl = window.location.href.split("#")[0];
        var url =
          "/Configurations?types=weixin&weixin_url=" +
          encodeURIComponent(wxUrl);
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
  }
};
</script>
<style scoped>

.login .mint-formItm .mint-input {
  width: 85%;
  margin-right: 0;
  color: #333;
  font-size: 15px;
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
    font-size: 14px;
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
    font-size: 15px;
    /* border-bottom: 1px solid #e0e0e0; */
}

.tip2{
    padding-top: 20px;
    line-height: 40px;
    /* padding: 1px 0; */
    font-size: 14px;
    display: flex;
    margin: 0 15px;
    padding-left: 10px;
    border-bottom: 1px solid rgb(224, 224, 224);
}

.tip2_bef{
    position: absolute;
    left: 30px;
    color: #f44;
    font-size: 14px;
    /* content: '*'; */
    width: 15px;
    text-align: center;
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

.login input{
  font-size: 15px;
}

</style>
