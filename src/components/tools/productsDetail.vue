<template>
  <div>
    <mt-header fixed class="def-header" :title="title">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:49px;">
      <div class="main-header">
        <div class="banner">
          <img src="../../assets/images/share/typeof1.jpg" style="width:100%;height:100%" v-show="pid==1">
          <img src="../../assets/images/share/typeof2.jpg" style="width:100%;height:100%" v-show="pid==2">
          <img src="../../assets/images/share/typeof3.jpg" style="width:100%;height:100%" v-show="pid==3">
          <div class="bannerBottom">
            <img src="../../assets/images/companys/pingan.png" alt="">
            <p style="color:#fff;">本产品由中国平安财产保险股份有限公司提供</p>
          </div>
        </div>
        <div class="aboutInsurance">
          <span>
            <p style="color:#3f59e4;float:left">【{{title}}】</p>
            <p style="color:#666;" v-show="pid==1">保障期限1年；缴费方式·一次性缴费；承保年龄18-80周岁。</p>
            <p style="color:#666;" v-show="pid==2">保障期限1年；缴费方式·一次性缴费；承保年龄16-65周岁，1-4类职业。</p>
            <p style="color:#666;" v-show="pid==3">保障期限1年；缴费方式·一次性缴费；承保年龄0至80岁（驾驶人需超过18岁）。</p>
          </span>
          <div style="display:flex;justify-content: space-between;align-items: center;">
            <span style="display:flex;color:#f1783a;">
              <p style="font-size:22px;" v-show="pid==1">100</p>
              <p style="font-size:22px;" v-show="pid==2">35</p>
              <p style="font-size:22px;" v-show="pid==3">260</p>
              <p style="line-height: 36px;">元起</p>
            </span>
            <p style="color:#3f59e4;">已售0元</p>
          </div>
        </div>
      </div>
      <div style="margin-top: 15px;">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">简介</mt-tab-item>
          <mt-tab-item id="2">保障</mt-tab-item>
          <mt-tab-item id="3">理赔</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div>
              <ul>
                <li v-show="pid==1"><img style="width: 100%;" src="../../assets/images/share/typeof1_detail.jpg" /></li>
                <li v-show="pid==2"><img style="width: 100%;" src="../../assets/images/share/typeof2_detail.jpg" /></li>
                <li v-show="pid==3"><img style="width: 100%;" src="../../assets/images/share/typeof3_detail.jpg" /></li>
              </ul>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div>
              <ul>
                <li v-show="pid==1"><img style="width: 100%;" src="../../assets/images/share/typeof1_detail_1.png" /></li>
                <li v-show="pid==2"><img style="width: 100%;" src="../../assets/images/share/typeof2_detail_1.jpg" /></li>
                <li v-show="pid==3"><img style="width: 100%;" src="../../assets/images/share/typeof3_detail_1.jpg" /></li>
              </ul>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div>
              <ul>
                <li v-show="pid==1"><img style="width: 100%;" src="../../assets/images/share/typeof1_detail_2.jpg" /></li>
                <li v-show="pid==2"><img style="width: 100%;" src="../../assets/images/share/typeof2_detail_2.jpg" /></li>
                <li v-show="pid==3"><img style="width: 100%;" src="../../assets/images/share/typeof3_detail_2.jpg" /></li>
              </ul>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div v-show="isShowBtn" class="main-footer">
        <span @click="toMyShop">
          <i><img src="../../assets/images/share/mendian.png" alt=""></i>
          <p>门店</p>
        </span>
        <span>
          <i><img src="../../assets/images/share/photo.png" alt=""></i>
          <p>咨询</p>
        </span>
        <span>
          <i><img src="../../assets/images/share/share-icon.png" alt=""></i>
          <p>分享</p>
        </span>
        <div class="subminQuote">
          <p>立即报价</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import wx from 'weixin-js-sdk';
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
export default {
  data() {
    return {
      sex: '',
      birthday: '',
      placeAbode: '',
      occupation: '',
      annualIncome: '',
      title: '',
      selected: '1',
      isShowBtn: false,
      ppId: '',
      nickName: '',
      referralCode: '',
      downloadUrl: '',
      shareUrl: '',
      isShare: false,
      userId: '',
      referrerMobile: '',
      headImageUrl: '',
      avatar: this.src = require('../../assets/images/img-avatar.png'),
      isWeixin: false,
      weixin: {},
      shareLink: '',
      pid: 1,
    };
  },
  methods: {
    openBack() {
      this.$router.back();
    },
    toNext() {
      this.$router.push({ path: '' });
    },
    toMyShop() {
      this.$router.push({ path: 'myShop' })
    },
    initWx: function(title, name, shareLink) {
      wx.ready(function() { //通过ready接口处理成功验证
        if (shareLink.indexOf("&isShare=true") < 0) {
          shareLink = shareLink + "&isShare=true"
        };

        var pTitle = name + '邀您加入' + title;
        // console.log('linkUrl', shareLink);
        wx.updateAppMessageShareData({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
          title: pTitle, // 分享标题
          desc: '--来自' + name + '的邀请', // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          success: function() {
            // 设置成功
          }
        });
        wx.updateTimelineShareData({ //分享朋友圈
          title: pTitle, // 分享标题
          desc: '--来自' + name + '的邀请', // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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

  },
  created: function() {
    // this.appId = this.$route.query.appId;
    this.appId = localStorage.getItem("appId", this.appId);
    if (sessionStorage.getItem('nickName')) {
      this.nickName = sessionStorage.getItem('nickName');
    }
    // this.referralCode = this.$route.query.referralCode;
    // this.title = this.$route.query.title;
    // this.userId = this.$route.query.userId;
    this.referrerMobile = this.$route.query.referrerMobile;
    // document.title = '[' + this.title + '] ' + this.nickName + "的名片";
    var domain = '';
    var currentUrl = document.location.toString();
    if (currentUrl) {
      var arrUrl = currentUrl.split("#");
      domain = arrUrl[0];
    };
    if (this.referrerMobile == undefined) {
      this.referrerMobile = '';
    };
    // this.shareUrl = currentUrl + '?appId=' + this.appId
    this.shareLink = currentUrl + '&appId=' + this.appId
  },
  mounted: function() {
    this.title = this.$route.query.title;
    this.pid = this.$route.query.pid;
    
    var self = this;
    // self.redirectUri = window.location.href;
    var ua = navigator.userAgent.toLowerCase();
    self.isWeixin = ua.indexOf('micromessenger') != -1;
    if (self.isWeixin) {
      var wxUrl = window.location.href.split('#')[0];
      // var url = '/Configurations?types=weixin&weixin_url=' + encodeURIComponent(wxUrl);
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
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData', 'closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          var shareImg = self.headImageUrl ? self.headImageUrl : self.avatar;
          // console.log('shareLink', self.shareLink);
          self.initWx(self.title, self.nickName, self.shareLink);
        }
      });
    }
  }
};

</script>
<style scoped>
.main-header {
  background: #ffffff;
}

.banner {
  height: 205px;
  position: relative;
}

.bannerBottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background-color: rgba(0, 0, 0, 0.3);
}

.bannerBottom img {
  width: 50px;
}

.aboutInsurance {
  padding: 15px;
  margin-top: 10px;
}

.main-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  background: #ffffff;
  display: flex;
  align-items: center;
  text-align: center;
}

.main-footer span {
  width: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-footer span i {
  margin-right: 5px
}

.main-footer span p {
  color: #666
}

.subminQuote {
  flex: 1;
  background: rgb(63, 89, 228);
  padding: 12px 0;
  color: #ffffff
}

</style>
