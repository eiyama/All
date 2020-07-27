<template>
  <div style="background-color: #FFF;">
    <mt-header fixed class="def-header cust-head" :title="detailData.category">
      <div slot="left" v-show="!isShare">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="padding-top:48px;" v-show="!isShare">
      <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
      <div v-show="hasData" style="padding-left:45px;padding-right:45px;padding-top:15px;text-align:center; font-size:18px;color:#333;font-weight:bold">{{detailData.title}}</div>
      <div v-show="hasData" style="padding-top:10px;text-align:center; font-size:12px;color:#999;">发布时间: {{modifiedTime}}</div>
      <div style="padding: 15px;" v-show="hasData">
        <div v-html="detailData.content"></div>
      </div>
      <div class="non-data" v-show="!hasData">
        <p>暂无数据</p>
      </div>
    </div>
    <div style="padding-top:48px;padding-bottom:60px" v-show="isShare">
      <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
      <div v-show="hasData" style="padding-left:45px;padding-right:45px;padding-top:15px;text-align:center; font-size:18px;color:#333;font-weight:bold">{{detailData.title}}</div>
      <div v-show="hasData" style="padding-top:10px;text-align:center; font-size:12px;color:#999;">发布时间: {{modifiedTime}}</div>
      <div style="padding: 15px;" v-show="hasData">
        <div v-html="detailData.content"></div>
      </div>
      <div class="non-data" v-show="!hasData">
        <p>暂无数据</p>
      </div>
    </div>
    <div class="learn-footer" v-show="isShare">
      <span style="display: flex;justify-content: space-between;padding-left: 10px;">
        <p style="display: flex;align-items: center;"><i><img src="../assets/images/img-avatar.png" style="width:45px;" /></i>联系业务经理</p>
        <i style="margin-left:15px"><img style="width: 50px;" src="../assets/images/share/scanCode.jpg" /></i>
      </span>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../store/store'
import * as types from './../store/types';
import '../assets/css/preview.css' //markdown css
import wx from 'weixin-js-sdk';
export default {
  name: 'home',
  data() {
    return {
      defaultImg: this.src = require('../assets/images/img-product-banner.png'),
      closeImg: this.src = require('../assets/images/ico-close.png'),
      openBtnImg: this.src = require('../assets/images/btn-open-circle.png'),
      arrowImg: this.src = require('../assets/images/icon-arrowUp-white.png'),
      hasData:false,
      itemId:"",
      modifiedTime:"",
      detailData:{
        "coverMediaId": "",
        "coverMediaUrl": "",
        "title": "",
        "category": "",
        "classifyKey": "",
        "classify": "",
        "description": "",
        "content": ""
      },
      isShare:false,
    }
  },
  mounted:function(){
    var self = this;
    self.itemId = self.$route.query.itemId;
    self.modifiedTime = self.$route.query.modifiedTime;
    self.isShare = self.$route.query.isShare;
    var appId = self.$route.query.appId;
    var domain = '';
    var currentUrl = document.location.toString();
    if (currentUrl) {
      var arrUrl = currentUrl.split("#");
      domain = arrUrl[0];
    };
    self.shareLink = domain + '#/learning/detail?itemId=' + self.itemId + "&modifiedTime=" + encodeURIComponent(self.modifiedTime) 
    + '&appId=' + appId + '&isShare=true';
    self.redirectUri = window.location.href;
    var ua = navigator.userAgent.toLowerCase();
    self.isWeixin = ua.indexOf('micromessenger') != -1;
    if (self.isWeixin) {
      var wxUrl = window.location.href.split('#')[0];
      var url = '/Configurations?types=weixin&weixin_url=' + encodeURIComponent(wxUrl);
      axiosGetAPI(url).then((res) => {
        if (res.status == 200 && res.result && res.result.weixin) {
          self.weixin = res.result.weixin;
          wx.config({
            debug: false, // 开启调试模式,
            appId: self.weixin.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: self.weixin.timestamp, // 必填，生成签名的时间戳
            nonceStr: self.weixin.nonceStr, // 必填，生成签名的随机串
            signature: self.weixin.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData','closeWindow'] 
          });
        }
      });
    }
    self.getDetail();
  },
  destroyed: function() {
  },
  created: function() {
  },
  methods: {
    initWx: function(title, description, shareImg, shareLink) {
      wx.ready(function() { //通过ready接口处理成功验证
        // config信息验证成功后会执行ready方法
        wx.updateAppMessageShareData({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
          title: title, // 分享标题
          desc: description, // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImg, // 分享图标
          success: function() {
            // 设置成功
          }
        });
        wx.updateTimelineShareData({ //分享朋友圈
          title: title, // 分享标题
          desc: description, // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImg, // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
      wx.error(function(res) { //通过error接口处理失败验证
        // config信息验证失败会执行error函数
        console.log(res);
      });
    },
    openBack: function() {
      window.history.back();
    },
    getDetail: function() {
      Indicator.open('加载中...');
      axiosGetAPI('/consultation/' + this.itemId).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.detailData = res.result;
          this.initWx(this.detailData.title, this.detailData.description, this.detailData.coverMediaUrl, this.shareLink);
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
    },
  }
};

</script>
<style scoped>
.learn-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;
  display: flex;
  align-items: center;
  text-align: center;
}

.learn-footer span {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-right: 1px solid #eeeeee; */
}

.learn-footer span i {
  margin-right: 5px;
}

.learn-footer span p {
  color: #666;
}

</style>
