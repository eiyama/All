<template>
  <div style="background-color:#FFF;height:820px">
    <mt-header fixed class="def-header" title="微信授权测试">
      <div slot="left">
        <mt-button icon="back" @click="openBack" v-show="false"></mt-button>
      </div>
      <div slot="right" @click="closeHome">
        <img :src="closeImg" style="width: 18px;height: 18px;" >
      </div>
    </mt-header>
    <div style="padding:48px;color:#333">
      <p>授权个人信息</p>
      <p>用户名：{{wxInfo.nickname}}</p>
      <p>头像地址：{{wxInfo.headimgUrl}}</p>
      <!-- <p>性别：{{wxInfo.sex == 1 ? "男":"女"}}</p> -->
      <p>openId:{{wxInfo.openId}}</p>
      <p>unionId:{{wxInfo.unionId}}</p>
    </div>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
export default {
  name: 'defaultPage',
  data() {
    return {
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      fileUrl: '',
      wxInfo:{"openId": "","nickname": "","sex": "","province": "","city": "","country": "","headimgUrl": "","privilege": "","unionId": ""},
      redirectUri:'',
    }
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    closeHome: function() {
      window.history.back();
    },
    initWx:function(weixin){
      wx.config({
        debug: true, // 开启调试模式,
        appId: weixin.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: weixin.timestamp, // 必填，生成签名的时间戳
        nonceStr: weixin.nonceStr, // 必填，生成签名的随机串
        signature: weixin.signature, // 必填，签名，见附录1
        jsApiList: ['updateAppMessageShareData','updateTimelineShareData '] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function() { //通过ready接口处理成功验证
      // config信息验证成功后会执行ready方法
        wx.updateAppMessageShareData({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
            title: '分享给朋友', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 设置成功
            }
        });
        wx.updateTimelineShareData ({ //分享朋友圈
            title: '分享到朋友圈', // 分享标题
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 设置成功
            }
        });
      });
      wx.error(function(res){//通过error接口处理失败验证
          // config信息验证失败会执行error函数
          console.log(res);
      });
    },
    getQueryString:function(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    getWxUserInfo:function(){
      var code = this.getQueryString("code");
      var state = this.getQueryString("state");
      console.log('code:' + code);
      console.log('state:' +state);
      var url = '/Weixin/' + code;
      axiosGetAPI(url).then((res) => {
        if (res.status == 200 && res.result){
          this.wxInfo = res.result;
          console.log(this.wxInfo);
        }
      });
    }
  },
  mounted: function() {
    //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx66833d85a1b1475f&redirect_uri=http%3a%2f%2fwww.bandins.com%2f%23%2fwxAuth&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    console.log(window.location.href);
    if (window.location.href.indexOf('code=') > 0) {
      this.getWxUserInfo();
    }else{
      this.redirectUri = window.location.href;
      var wxUrl = window.location.href.split('#')[0];
      // wxUrl = wxUrl.substring(0,wxUrl.length-1);
      var url = '/Configurations?types=weixin&weixin_url=' + encodeURIComponent(wxUrl);
      axiosGetAPI(url).then((res) => {
        if (res.status == 200 && res.result && res.result.weixin){
          this.initWx(res.result.weixin);
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.result.weixin.appId + 
          '&redirect_uri=' + encodeURIComponent(this.redirectUri) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
      });
    }
    
  }
}

</script>
<style scoped>
.messagecc {
  height: 100%;
  width: 100%;
}

</style>
