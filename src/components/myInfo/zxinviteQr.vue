<template>
  <div class="home" style="min-height: inherit;">
    <mt-header fixed title="我的二维码名片" style="background-color:#184595;height:0.96rem;">
      <div slot="left" v-show='!isShare'>
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
   
    <div class="main-content">
         <div class="main">
            <h1 class='main_title'> 实时报价，一键分享</h1>
            <p class="main_join">加入我的智能车团队，一起躺赢！</p>
        </div>
      <div class="tip-qr">
          <div class="content_center">
            <div class="content_s">
                    <div class="tip-title"><span>{{  nickName ? nickName: weixinInfor.nickname }}的名片</span></div>
                    <p v-show="scanCode && userCode != undefined && userCode != 'null' " class="tip-userCode" style="color:#000000;">我的邀请码：{{userCode}}</p>
                    <p v-show="!scanCode && userCode != undefined && userCode != 'null'" class="tip-userCode" style="color:#000000; height: 0.54rem;">我的邀请码：{{userCode}}</p>
                 <div class="scanBox">
                    <div v-if="scanCode">
                        <img :src="scanCode" style="height:2.14rem" alt="">
                    </div>
                    <div v-else class="qr-pos" id="qrcode" ref="qrcode"></div>
                    <div style="display:block;" v-if="weixinInfor.headimgUrl"><img class="my-head" :src="weixinInfor.headimgUrl" alt=""></div>
                    <div style="display:block;" v-else><img class="my-head" :src="headImageUrl ? headImageUrl: avatar" alt=""></div>
                 </div>
                    <div class="tip-top"><span>使用微信扫码注册</span></div>
                    <div style="margin-top: 0.3rem;">
                        <img style="width:3.08rem" src="../../assets/images/zxMoney_icon.png" alt="">
                    </div>
                <!-- <div style="margin-top: 10px;font-size: 0.28rem;color: #0070D3;" v-show="isShare">
                <van-button style="color:#0070D3;font-size:12px;border:1px solid #0070D3" type="default" size="small" @click="goReg" plain>点此去注册</van-button>
                </div>     -->
            </div>
         </div>
      </div>
    </div>
    <div class="money_icon">
          <img style="width:100%" src="../../assets/images/share_monicon_02.png" alt="">
    </div>
    <div class="footer">
        <div class="tip_btn" v-show="!isShare"><span>点右上角 <van-icon name="weapp-nav" color="#000"></van-icon>，发送给朋友</span></div>
        <!-- <img src="../../assets/images/zxinvite_b.png" alt=""> -->
    </div>
  </div>
</template>
<script>
 import "./../../assets/css/car.scss";
import "./../../assets/js/rem.js";

import QRCode from 'qrcodejs2';
import wx from 'weixin-js-sdk';
import { Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
export default {
  data() {
    return {
      appId: '',
      nickName: '',
      title: '',
      referralCode: '',
      downloadUrl: '',
      shareUrl: '',
      isShare: false,
      userId: '',
      referrerMobile: '',
      headImageUrl: '',
      avatar: this.src = require('../../assets/images/img-avatar.png'),
      zxImg:this.src = require('../../../static/imgs/zxlogo.png'),
      isWeixin: false,
      weixin: {},
      shareLink:'',
      weixinInfor:{},
      userCode:'',
      scanCode:'',
      headimgUrl:'',
      // zxImg:''
    }
  },
  mounted:function(){
    if(sessionStorage.getItem("title")){
        document.title = sessionStorage.getItem("title");
    }
    document.body.addEventListener('touchmove', function(e){
        e.preventDefault();
    }, { passive: false })
    var self = this;
    this.appId = this.$route.query.appId;
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
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData','closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          var shareImg = self.headImageUrl ? self.headImageUrl : self.avatar;
          if(this.appId == 'cx7190761141531rzi' || this.appId == 'cxa181211170855pxj'){
            // self.title = this.zxImg;
            shareImg = self.headimgUrl ||  "https://bjzxbx.bandins.com/zxhome/img/zxlogo.png";
          }
          // console.log('shareLink', self.shareLink);
          self.initWx(self.title, self.nickName, shareImg, self.shareLink);
        }
      });
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!window.localStorage.getItem('isReload')) {
        window.localStorage.setItem('isReload', window.location.href)
        // 微信分享需要重新设置URL
        window.location.href = window.location.href
      }
    })
  },
  created() {
   if(sessionStorage.getItem("weixinInfor") ){
      this.weixinInfor = JSON.parse(sessionStorage.getItem("weixinInfor"));
      this.headimgUrl = this.weixinInfor.headimgUrl
    } 
    this.userCode = sessionStorage.getItem('userCode') || this.$route.query.userCode || '';
    var headImg = sessionStorage.getItem('headImageUrl');
    if (headImg != '' && headImg != null && headImg != 'undefined') {
      this.headImageUrl = headImg;
    }
    this.isShare = this.$route.query.isShare;
    if (this.isShare == 'undefined') {
      this.isShare = false;
    }
    this.appId = this.$route.query.appId;
    localStorage.setItem("appId", this.appId);
    this.nickName = this.$route.query.nickName || this.weixinInfor.nickname ;
    // this.referralCode = this.$route.query.referralCode;
    this.title = this.$route.query.title;
    // this.userId = this.$route.query.userId;
    this.referrerMobile = this.$route.query.referrerMobile;
    document.title = '[' + this.title + '] ' + this.nickName + "的名片";
    var domain = '';
    var currentUrl = document.location.toString();
    if (currentUrl) {
      var arrUrl = currentUrl.split("#");
      domain = arrUrl[0];
    };
    if (this.referrerMobile == 'undefined') {
      this.referrerMobile = '';
    };
    this.shareUrl = domain + '#/regUser?appId=' + this.appId +
      '&nickName=' + this.nickName +
      // '&referralCode=' + this.referralCode +
      '&title=' + this.title +
      // '&UserId=' + this.userId +
      '&ReferrerMobile=' + this.referrerMobile +
      '&isShare=true';
    // + '&downloadUrl=' + this.downloadUrl;
    this.shareLink = domain + '#/salesman/invitation?appId=' + this.appId +
      '&nickName=' + encodeURIComponent(this.nickName) +
      // '&referralCode=' + this.referralCode +
      '&title=' + encodeURIComponent(this.title) +
      // '&UserId=' + this.userId +
      '&ReferrerMobile=' + this.referrerMobile +
      '&isShare=true';
      // this.zxImg = domain + ''
      if(this.appId == 'cx7190761141531rzi' || this.appId == 'cxa181211170855pxj'){
        // var self = this;
        // Indicator.open('请稍等...');
        //  axiosGetAPI("/Weixin/QRCode?userCode=" + this.userCode).then((res) => {
        //    Indicator.close();
        //   if (res.status == 200 ) {
        //     self.scanCode = res.result;
        //     }
        //   });
          this.shareLink = domain + '#/salesman/invitation?appId=' + this.appId +
        '&nickName=' + encodeURIComponent(this.nickName) + '&title=' + encodeURIComponent(this.title) +
        '&ReferrerMobile=' + this.referrerMobile +
        '&isShare=true' + "&userCode=" + this.userCode + "&iszxPage=true"; 
        if(this.headimgUrl){
          this.shareLink = this.shareLink + '&headImageUrl='+ encodeURIComponent(this.headimgUrl);
        }   
         this.shareUrl = this.shareLink;
         console.log(this.headimgUrl)
        // console.log(this.shareUrl);
      }
    // console.log('shareLink', this.shareLink);
    this.$nextTick(function() {
      this.creatQrCode();
    })
  },
  methods: {
    goReg:function(){
      var param = '?appId=' + this.appId +'&nickName=' + this.nickName +'&title=' + this.title +
      '&ReferrerMobile=' + this.referrerMobile +'&isShare=true';
      this.$router.push({ path: "/regUser" + param});
    },
    openBack: function() {
      window.history.back();
    },
    creatQrCode() {
      var qrcode = new QRCode('qrcode', {
        text: this.shareUrl,
        width: 140,
        height: 140,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
      })
    },
    initWx: function(title, name, shareImg, shareLink) {
      // var shareImg = shareImg;
      // console.log(shareImg)
      wx.ready(function() { //通过ready接口处理成功验证
        // config信息验证成功后会执行ready方法
        // var shareLink = this.redirectUri;
        // if (this.redirectUri.indexOf("&share=true") < 0) {
        //     shareLink = this.redirectUri+"&share=true";
        // };
        // console.log('link', shareLink);
        // var href = window.location.href;
        // var linkUrl = href;
        if (shareLink.indexOf("&isShare=true") < 0) {
          shareLink = shareLink + "&isShare=true"
        };
        var pTitle = name + '邀您加入' + title;
        // console.log('linkUrl', shareLink);
        wx.updateAppMessageShareData({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
          title: pTitle, // 分享标题
          desc: '--来自' + name + '的邀请, 快来加入我的团队，让我带你飞', // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImg, // 分享图标
          success: function() {
            // 设置成功
          }
        });
        wx.updateTimelineShareData({ //分享朋友圈
          title: pTitle, // 分享标题
          desc: '--来自' + name + '的邀请, 快来加入我的团队，让我带你飞', // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImg, // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
      wx.error(function(res) { //通过error接口处理失败验证
        // config信息验证失败会执行error函数
        // console.log(res);
      });
    },
  },
}

</script>
<style scoped>
.home{position: relative;background: url('../../assets/images/share_Bg_02.png')no-repeat 0 0 ;background-size: 100% 100%;margin-top: 0.91rem}
.home .main .main_title{font-size: 0.5rem;text-align: center;color: #ffffff;padding-top: .3rem}
.home .main .main_join{font-size:0.3rem;text-align: center;color: #ffffff;padding-top: 0.1rem;}
.main-content{margin-left:.9rem;margin-right:0.9rem}
.content-img{display: flex;justify-content: center;margin-top: 0.1rem;}
.content-img img{text-align: center;height:2.5rem}


.main-content .tip-qr {
  margin-top: 0.56rem;
  margin-bottom: 100px;
  text-align: center;
  display: block;
  height: 8rem;
  background-color:#d93833;
  border-radius: 0.5rem;
  padding: 0.35rem;
}
 .content_center {
      background: #ffd5ab;
    /* border-radius: 0.08rem; */
    height: 100%;
    border-radius: 0.45rem;
    padding: 0.37rem;
 }
.content_s{
      background: #fff;
    /* border-radius: 0.08rem; */
    height: 100%;
    border-radius: 0.45rem;
}

.main-content .tip-field {
  color: #4192E8;
  letter-spacing: 0;
  height: 30px;
  line-height: 15px;
  margin-top: 10px;
}

.main-content .tip-title {
  font-size: 0.4rem;
  color: #0c3484;
  font-weight: bold;
  letter-spacing: 0;
  padding-top: 0.35rem;
}

.main-content .tip-top {
   /* margin-top: 0.15rem; */
  font-size: 0.28rem;
  color: #000000;
  letter-spacing: 0;
  /* height: 30px; */
  /* line-height: 15px; */
  /* margin-bottom: 5px; */
}

.main-content .tip-bottom {
  margin-top: 10px;
  font-size: 20px;
  color: #032f82;
  letter-spacing: 0;
  height: 30px;
}

.main-content .my-head {
  width: 0.72rem;
  height: 0.72rem;
  background-color: #eee;
  border-radius: 50%;
  border: 1px solid #eee;
  position: absolute;
  margin-top: -100px;
  margin-left: -18px;
}
.tip-userCode{position: relative;z-index: 10;}

.main-content .tip-qr .qr-pos {
  /* margin-top: -10px; */
  display: inline-block;
}
.money_icon{
    position: absolute;
    top: 2.6rem;
    width: 100%;
    z-index: 9;
    }
.scanBox{
        width: 3rem;
        margin: auto;
        position: relative;
        z-index: 10;
        background: #fff;
        height: 150px;
    }

.tip_btn{margin: 2rem 1rem;
    background: #fff;
    font-size: 0.30rem;
    color: #d93833;
    border-radius: 0.18rem;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;}

.footer{
    height: 3.88rem;
    position: fixed;bottom: 0;left: 0;right: 0;background: url('../../assets/images/sharebottom_02.png') no-repeat 0 0;    background-size: 100% 100%;
}
.footer img{width: 100%;position: fixed;bottom: 0;}

</style>
