<template>
  <div>
    <mt-header fixed class="def-header" title="我的门店">
      <div slot="left" v-show="!isShare">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:49px;">
      <div class="main-header">
        <div class="banner">
          <div style="margin: 0 15px;display:flex;align-items:center">
            <img style="width: 70px;border-radius: 50%;" src="../../assets/images/img-avatar.png" alt />
            <div style="color:#fff;margin-left: 10px;">
              <h3>{{nickName}}</h3>
              <p>您的专属保险顾问</p>
            </div>
          </div>
          <div class="salesmanDetail">
            <van-icon name="description" />
            <p style="margin:0 10px">执业信息</p>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div style="margin-top: 15px;">
        <van-tabs>
          <van-tab v-for="(item, index) in tabBarList" :title="item" :key="index"></van-tab>
        </van-tabs>
        <div style="background:#fff;">
          <van-row style="padding:10px;">
            <!-- <van-col span="8">
            <img style="width:100%;" src="../../assets/images/share/img-share1.jpg" alt />
            </van-col> -->
            <!-- <div class="mainItem"></div> -->
            <van-col class="mainItem" span="11" @click="toDetail('百万家财险', 1)">
              <img src="../../assets/images/share/typeof1.jpg" style="width: 150px; border-radius: 8px;" />
              <p style="font-size:16px;">百万家财险</p>
              <span style="display:flex;">
                <p style=" color:rgb(241, 120, 58);font-size:18px;">￥100</p>
                <p style="line-height: 28px;color:rgb(241, 120, 58);">&nbsp;起</p>
              </span>
            </van-col>
            <van-col class="mainItem" span="11" @click="toDetail('一年期综合意外险', 2)">
              <img src="../../assets/images/share/typeof2.jpg" style="width: 150px; border-radius: 8px;">
              <p style="font-size:16px;">一年期综合意外险</p>
              <span style="display:flex;">
                <p style=" color:rgb(241, 120, 58);font-size:18px;">￥35</p>
                <p style="line-height: 28px;color:rgb(241, 120, 58);">&nbsp;起</p>
              </span>
            </van-col>
            <van-col class="mainItem" span="11" @click="toDetail('平安行驾乘险（扩展版）', 3)">
              <img src="../../assets/images/share/typeof3.jpg" style="width: 150px; border-radius: 8px;" />
              <p style="font-size:16px;">平安行驾乘险（扩展版）</p>
              <span style="display:flex;">
                <p style=" color:rgb(241, 120, 58);font-size:18px;">￥260</p>
                <p style="line-height: 28px;color:rgb(241, 120, 58);">&nbsp;起</p>
              </span>
            </van-col>
          </van-row>
        </div>
        <p style="color: #999;text-align: center;margin-top: 20px;">没有了，这是我的底线</p>
      </div>
      <div class="main-footer">
        <span v-show="isShare">
          <i><img src="../../assets/images/share/photo.png" /></i>
          <p>咨询</p>
        </span>
        <span v-show="!isShare">
          <i><img src="../../assets/images/share/share-icon.png" /></i>
          <p @click="shareBtn">点击右上角"更多"按钮，发送给朋友</p>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import wx from 'weixin-js-sdk';
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
export default {
  data() {
    return {
      tabBarList: ['推荐', '车险', '企业', '出行', '意外'],
      selected: '1',
      appId: '',
      nickName: '张三',
      title: '',
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
    };
  },
  methods: {
    openBack() {
      this.$router.back();
    },
    toDetail(title, index) {
      this.$router.push({ path: 'productsDetail?title=' + title + "&pid=" + index })
    },
    toNext() {
      this.$router.push({ path: '' });
    },
    toMyShop() {
      this.$router.push({ path: 'myShop' });
    },
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
    shareBtn() {

    }
  },
  created: function() {
  },
  mounted:function(){
    var self = this;
    self.isShare = self.$route.query.isShare;
    self.nickName = self.$route.query.nickName;
    self.appId = self.$route.query.appId;
    var domain = '';
    var currentUrl = document.location.toString();
    if (currentUrl) {
      var arrUrl = currentUrl.split("#");
      domain = arrUrl[0];
    };
    self.shareLink = domain + '#/tools/myShop?appId=' + self.appId + '&nickName=' + encodeURIComponent(self.nickName) + '&isShare=true';
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
        self.initWx(self.nickName + "的微店", "快来我的微店看看", self.avatar, self.shareLink);
      });
    }
  },
};

</script>
<style scoped>
.main-header {
  background: #ffffff;
}

.banner {
  height: 120px;
  position: relative;
  background: url("../../assets/images/share/banner-dianpu.jpg");

  background-size: ;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.salesmanDetail {
  display: flex;
  align-items: center;
  color: #fff;
  padding: 8px 5px 8px 15px;
  background: #828ff0;
  border-radius: 20px 0 0 20px;
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-right: 1px solid #eeeeee; */
}

.main-footer span i {
  margin-right: 5px;
}

.main-footer span p {
  color: #666;
}

.mainItem {
  border-radius: 8px;
  box-shadow: 2px 4px 6px #eeeeee;
  padding: 8px;
  margin: 5px;
}

</style>
