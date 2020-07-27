<template>
  <div class="login">
    <div class="mint-content mint-region">
      <h3 class="mint-login-hd">
        Hello!<br>
        欢迎登录{{title}}
      </h3>
      <div style="margin-top: 100px;">
        <van-cell-group>
          <van-field van-field__control clearable v-model='login.userName' label="用户名" placeholder="请输入手机号/用户名" maxlength='30' />
          <van-field van-field__control clearable v-model='login.password' label="密码" placeholder="请输入确认密码" maxlength='50' type="password" />
        </van-cell-group>
        <mt-button style="margin-top: 30px;background-color:#f94037" type="primary" @click="subLogin" size="large">登录</mt-button>
      </div>
        <div style="margin-top: 15px;" v-show="canReg">
      <div class="fn-clear fn-clear-j">
        <p>如果还没有账号，请先入职申请</p>
      </div>
      <mt-button style="margin-top: 15px;border-color:#f94037;color:#f94037" type="primary" @click="jumpreg" size="large" plain>我要入职</mt-button>
        </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import * as types from './../../store/types';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
export default {
  name: 'login',
  data() {
    return {
      title: '',
      appId:'',
      login: {
        userName: '',
        password: ''
      },
      canReg: false,
    }
  },
  methods: {
    //注册
    jumpreg() {
      this.$router.push({ path: "/regUser", query: { appId: this.appId } });
    },
    closePage: function() {
      this.$router.push({ path: "/", query: { appId: this.appId } });
    },
    subLogin: function() {
      var self = this;
      if (!self.login.userName) {
        Toast('请输入用户名');
        return;
      }
      if (!self.login.password) {
        Toast('请输入密码');
        return;
      }
      localStorage.removeItem('permissions');
      localStorage.setItem('hasManage', false);
      localStorage.setItem('hasViewCars', false);
      Indicator.open('加载中...');
      axiosPostAPI('/token', self.login).then((res) => {
        Indicator.close();
        self.$store.commit(types.LOGININFO, self.login);
        self.$store.commit(types.LOGIN, res.result.token);
        self.appId = localStorage.getItem('appId');
        localStorage.setItem('token', self.appId + '_' + res.result.token);
        axiosGetAPI('/Users/Me/Permissions').then((res) => {
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
          }
        });
        self.$router.push({ path: "/", query: { appId: self.appId } });
      });
    }
  },
  // beforeRouteEnter:(to,from,next)=>{
  //     const appId = window.localStorage.getItem('appId') || to.query.appId;    
  //     if(to.path == '/login' && (appId == 'cx220t020161609ck9' || appId =='cxa181211170855pxj') ){
  //         // console.log(to,from)
  //         const sUserAgent = navigator.userAgent.toLowerCase();
  //         if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
  //         //跳转移动端页面
  //           next()
  //         }else{
  //           next({
  //             path:'/hkLogin',
  //             query: { appId: appId }          
  //           })
  //         }
  //       } 
  // },
  created: function() {
    this.$store.commit(types.TITLE, 'Login');
    localStorage.removeItem("canReg");
    localStorage.removeItem("hasViewCars");
    localStorage.removeItem("hasManage");
    localStorage.removeItem("token");

    this.appId = localStorage.getItem('appId');
    if (this.appId == '' || this.appId == null || this.appId == 'undefined') {
      this.appId = this.$route.query.appId;
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
  }
}

</script>
<style scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../../assets/images/login-bg.png);
}

.login .mint-content {
  padding: 50px 12% 0;
}

.login .mint-region,
.login .mint-header.def-header,
.login .mint-region input,
.login .mint-region .mint-cell {
  background: none;
}

.login .mint-login-hd {
  font-size: 24px;
  color: #fff;
  font-weight: 400;
}

.login .mint-region input {
  color: #fff;
}

.login .mint-region input::-webkit-input-placeholder {
  color: #e0e0e0;
}

.login .mint-region input:-moz-placeholder {
  color: #e0e0e0;
}

.login .mint-region input::-moz-placeholder {
  color: #e0e0e0;
}

.login .mint-region input:-ms-input-placeholder {
  color: #e0e0e0;
}

.login .mint-region .mint-cell {
  padding-left: 0;
}

.login .ico-login {
  position: relative;
  top: 5px;
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
  background-repeat: no-repeat;
}

.login .ico-login.ico-close {
  width: 30px;
  height: 30px;
  background-image: url(../../assets/images/ico-closew.png);
  background-position: center;
  opacity: 0.9;
}

.login .ico-login.ico-userName {
  top: 7px;
  background-image: url(../../assets/images/icon-phone.png);
}

.login .ico-login.ico-password {
  top: 7px;
  background-image: url(../../assets/images/icon-psw.png);
}

.login .mint-region .mint-formItm .mint-input {
  width: 90%;
  margin-right: 0;
}

.login .fn-clear-j {
  color: #888888;
  padding: 10px;
}

.login .fn-clear-j p {
  text-align: center;
  margin-top: 30px;
}

.login .fn-clear-j a {
  color: #fff
}

</style>
