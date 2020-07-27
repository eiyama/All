<template>
  <div  style="background-color:#FFF;">
    <mt-header fixed class="def-header" title="" v-show="false">
      <mt-button class="mint-head-close" icon="more" @click="closePage" slot="right"><i class="ico-login ico-close"></i></mt-button>
    </mt-header>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import store from "./../../store/store";
import * as types from './../../store/types';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Dialog } from 'vant';
export default {
  // name: 'login',
  data() {
    return {
      title: '',
      appId:'',
      login: {
        userName: '',
        password: '',
      },
      phoneImg: this.src = require('../../assets/images/username.png'),
      pswImg: this.src = require('../../assets/images/password.png'),
      canReg: false,
      urlFrom:'',
      code:'',
      enableLogin:false
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
     getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
 
  },
  async mounted() {
    // this.$store.commit(types.TITLE, 'Login');
    // localStorage.removeItem("canReg");
    // localStorage.removeItem("hasViewCars");
    // localStorage.removeItem("hasManage");
    // localStorage.removeItem("token");
    var self = this;
    this.appId = localStorage.getItem('appId');
    this.urlFrom = this.$route.query.urlFrom;
    var token = store.state.token || localStorage.getItem(token) || '';
    var wxappId = '';
    
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if(isWeixin  &&  token ){ //在微信环境下登录成功
              // var url = window.location.href;
              self.code = self.getUrlParam("code");
              if(self.code == '' || self.code == null ){
                var wxUrl = window.location.href.split('#')[0];
                var url = '/Configurations?types=weixin&weixin_url=' + encodeURIComponent(wxUrl);
                var local = encodeURIComponent(window.location.href);     
                await axiosGetAPI(url).then((res) => {
                    if (res.status == 200 && res.result && res.result.weixin) {
                      wxappId = res.result.weixin.appId;      
                      self.enableLogin = res.result.weixin.enableLogin || false;   
                      if(wxappId && self.enableLogin ){ //能获取微信配置（appid）且站点打开了免登陆；
                          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxappId + "&redirect_uri=" + local + "&response_type=code&scope=snsapi_userinfo&state=yIwrleQfyqxdPHj#wechat_redirect"
                      } 
                      else{
                         if(self.urlFrom == 'myInfor'){                 
                            self.$router.push({ path: "/salesman/info", query: { appId: self.appId } });
                          }else{
                            self.$router.push({ path: "/", query: { appId: self.appId } });
                          }
                      }  
                    }
                    })
                } else{
                  var openId = sessionStorage.getItem("openId") || ''; //code只能用一次，openId能重复使用；
                    if(!openId){
                        await axiosGetAPI('/Weixin/' + self.code).then(dataRes=>{ //获取openId
                          if(dataRes.result.openId){
                           openId = dataRes.result.openId;
                            sessionStorage.setItem("openId",openId)
                          }
                        })  
                    }  
                      await axiosPostAPI('/Weixin?openId=' + openId ).then(res=>{ //根据openId绑定当前业务员，即微信与业务员绑定。
                        if(res.status == '200'){
                          if(this.urlFrom == 'myInfor'){                 
                            self.$router.push({ path: "/salesman/info", query: { appId: self.appId } });
                          }else{
                            self.$router.push({ path: "/", query: { appId: self.appId } });
                          }
                        }else{
                            self.$router.push({ path: "/", query: { appId: self.appId } });
                        }
                      })
                    }
              }
  }
}

</script>
<style scoped>


</style>
