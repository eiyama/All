<template>
  <div style="background-color: #FFF;">
    <mt-header fixed class="def-header cust-head" :title="prospectusDetail.name">
      <div slot="left" v-show='!isShare'>
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right" v-show='!isShare'>
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openHome">
      </div>
    </mt-header>
    <div style="padding-bottom: 30px">
      <div class="div1" style="margin-top: 45px" v-show="insures.topPath == null 
            || insures.topPath == ''">
        <img :src="defaultImg">
            </div>
        <div class="div1" style="margin-top: 45px" v-show="insures.topPath">
          <img :src="insures.topPath" width="100%" height="100%">
            </div>
          <div style="padding-top: 10px;padding-left: 15px;padding-right: 15px;">
            <div>
              <h3 style="font-size: 18px;text-align: center;height: 40px">首期保费:<span style="color: red">{{totalAmount}}</span>元</h3>
              <hr width="100%" color="#f5f5f5" size="1">
              </hr>
            </div>
            <div>
              <span style="float:left;font-size: 14px;height: 30px;padding-top: 15px">投保人:{{insures.applicationName}}</span>
              <span style="float:right;font-size: 14px;height: 30px;padding-top: 15px">被保人:{{insures.insuredName}} / {{insures.insuredAge}} / {{insures.insuredSex}}</span>
            </div>
            <table class="mint-table" cellpadding="0" cellspacing="0" style="border-radius:5px 5px 5px 5px;border-color: #F3F3F3">
              <colgroup>
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
              </colgroup>
              <tr style="background-color:#F0F0F0;font-size: 12px">
                <td>险种</td>
                <td>保险金额</td>
                <td>保险期间</td>
                <td>缴费年限</td>
                <td>首期保费</td>
              </tr>
              <tr>
                <td>{{insures.variates.简称}}</td>
                <td>{{insures.variates.保险金额}}</td>
                <td>{{insures.variates.保险期间}}</td>
                <td>{{insures.variates.缴费年限}}</td>
                <td>{{insures.variates.首期保费}}</td>
              </tr>
              <tr v-for="item in addtionRisks">
                <td>{{item.简称}}</td>
                <td>{{item.保险金额}}</td>
                <td>{{item.保险期间}}</td>
                <td>{{item.缴费年限}}</td>
                <td>{{item.首期保费}}</td>
              </tr>
            </table>
          </div>
          <div :style="{backgroundColor:backgroudColor}" class="markdown-body editormd-preview-container">
            <div :style="{backgroundColor:backgroudColor}" v-html="context">
            </div>
            <div style="margin:15px;padding-bottom:15px;color:#FFF;font-size: 14px;">注：此计划书仅供演示参考，具体请见保险条款。</div>
          </div>
          <div v-show="!isShare" style="font-size：10px;color:red;background-color:white;margin:15px;padding-bottom:15px;">点击右上角"更多"按钮或者复制当前链接地址,可分享给客户</div>
        </div>
        <footer>
          <div class="mint-bottom" v-show="!((prospectusDetail.salesmanMobile ==null || prospectusDetail.salesmanMobile =='') && (insureUrl ==null || insureUrl ==''))" style="background-color:#F3F3F3">
            <button class="btn-bottom frist-bottom" v-show="insureUrl" @click="toQuote(insureUrl)">去投保</button>
            <button class="btn-bottom" v-show="prospectusDetail.salesmanMobile&&isShare"><a :href="'tel:'+ prospectusDetail.salesmanMobile">联系业务经理</a></button>
          </div>
        </footer>
      </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
import '../../assets/css/preview.css' //markdown css
import wx from 'weixin-js-sdk';
import signalR from 'signalr'
export default {
  name: 'home',
  data() {
    return {
      isShare: false,
      defaultImg: this.src = require('../../assets/images/img-product-banner.png'),
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      prospectusDetail: {
        "name": "",
        "salesmanName": "",
        "salesmanMobile": "",
        "isCombination": "",
        "isRead": "",
        "insures": []
      },
      insures: {
        "applicationName": "",
        "applicationAge": "",
        "applicationSex": "",
        "insuredName": "",
        "insuredAge": "",
        "insuredSex": "",
        "mainInsId": "",
        "variates": {},
        "topPath": "",
        "backgroudColor": "",
        "preview": ""
      },
      topPath: '',
      insCorpName: '',
      context: '',
      backgroudColor: '',
      addtionRisks: [],
      totalAmount: '',
      insureUrl: '',
      wxInfo:{"openId": "","nickname": "","sex": "","province": "","city": "","country": "","headimgUrl": "","privilege": "","unionId": ""},
      redirectUri:'',
      proxy: {},
    }
  },
  mounted: function() {
    this.getProspectusDetail();
    console.log(window.location.href);
    if (window.location.href.indexOf('code=') > 0) {
      this.getWxUserInfo();
      this.connectServer();
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
  },
  destroyed: function () {
    this.proxy.invoke("finishRead").done((msg) => {
        console.log('已销毁');
      });
  },
  created: function() {
    var len = window.history.length;
    if (len <= 2) {
      this.isShare = true;
    };
    var appId = this.$route.query.appId;
    if (appId) {
      localStorage.setItem("appId", appId);
    };

    /*var token = decodeURIComponent(this.$route.query.token);
    if (token) {
      token = token.replace(' ', '+');
      localStorage.setItem('token', appId + '_' + token);
    };*/
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    openHome:function() {
      this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
    },
    toQuote: function(insureUrl) {
      window.location.href = insureUrl;
    },
    getProspectusDetail: function() {
      var self = this;
      var pid = self.$route.query.pid;
      Indicator.open('加载中...');
      axiosGetAPI('/li/prospectuses/' + pid).then((res) => {
        if (res.result && res.result != '') {
          self.prospectusDetail = res.result;
          document.title = self.prospectusDetail.name;
          self.insures = self.prospectusDetail.insures[0];
          self.context = self.insures.preview;
          self.backgroudColor = self.insures.backgroudColor
          self.addtionRisks = self.insures.variates.附加险;
          self.totalAmount = self.insures.variates.首期保费;
          self.insureUrl = self.insures.insureUrl;
          for (var i = 0; i < self.addtionRisks.length; i++) {
            self.totalAmount += self.addtionRisks[i].首期保费;
          }
        }
        Indicator.close();
      });
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
    },
    connectServer: function() {
      var $this = this;
      //http://dev.bandins.cn/signalr/hubs
      var conn = $.hubConnection("ws://dev.bandins.cn/signalr/hubs", { useDefaultPath: false })
      $this.proxy = conn.createHubProxy("prospectusHub");
      $this.getMsg();
      conn.start().done((data) => {
        // console.log('已连接')
      }).fail((data) => {
        console.log('连接失败:', data)
      });
    },
    sendMsg: function() {
      var $this = this;
      $this.proxy.invoke("beginRead", 1,  'weixin',  'adfasdfasdf').done((msg) => {
        console.log('开始阅读');
      });
    },
    getMsg: function() {
      var $this = this;
      $this.proxy.on("connected", (data) => {
        console.log('已连接:', data)
        $this.sendMsg();
      })
    }
  }
};

</script>
<style scoped>
.mint-popup-tracks {
  width: 100%;
  height: 100%;
  margin-top: 44px;
  background: rgba(0, 0, 0, .6);
  z-index: 99 !important;
}

.mint-popup-tracks .mt-popup-layer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 25%;
}

.mt-header-tracks {
  position: fixed;
  top: 0;
  width: 75%;
  right: 0;
  height: 44px;
  background-color: #fff;
}

.mint-popup-tracks .tracks-info {
  position: absolute;
  top: 44px;
  bottom: 0;
  right: 0;
  width: 75%;
  overflow-y: scroll;
  background-color: #fff;
}

.mint-popup-tracks .mt-header-tracks h3 {
  float: left;
  line-height: 44px;
  font-weight: 400;
  color: #666;
  font-size: 14px;
  padding-left: 4%;
}

.mint-popup-tracks .mint-button--primary {
  height: auto;
  padding: 2px 12px;
  margin: 10px 4% 0 0;
  font-size: 12px;
}

.mint-popup-tracks .mint-content {
  padding: 10px 4% 50px;
}

.mint-header.def-header.cust-head {
  border-bottom: 1px solid #f0f0f0;
}

.mint-tab-content .mint-table {
  text-align: left;
}

.cust-title {
  margin-bottom: 16px;
  line-height: 22px;
  font-weight: 400;
}

.cust-title .plateno {
  float: left;
  font-size: 20px;
  color: #333;
}

.cust-title .levels {
  float: right;
  font-size: 14px;
  color: #808080;
}

.ico-levels {
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  color: #fff;
  line-height: 22px;
  text-align: center;
  background-color: #F5A623;
}

.mint-bar {
  margin-bottom: 8px;
  font-size: 12px;
  color: #999;
}

.mint-bar a {
  text-decoration: none;
}

.mint-bar .icon-mini-icon-history {
  margin: 1px 5px 0 0;
}

.mint-bar .icon-mini-icon-history:before {
  color: #B0B9CD;
}

.btnItem {
  display: flex;
  height: 100%;
  float: right;
}

.tracks {
  position: fixed;
  right: 0;
  bottom: 60px;
  width: 88px;
  height: 34px;
  padding: 8px;
  border-radius: 80px 0 0 80px;
  background: #ECF6FF;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
  font-size: 12px;
  color: #333;
  line-height: 34px;
}

.tracks .ico-tracks {
  float: left;
  width: 34px;
  height: 34px;
  font-size: 34px;
  border-radius: 50%;
  margin-right: 5px;
}

.annex-main .drag-box,
.annex-main .btn-add {
  float: left;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 10px 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.annex-main .drag-box {
  background: url(../../assets/images/load-failed.png) no-repeat center;
}

.annex-main .drag-box:nth-child(3n) {
  margin-right: 0;
}

.annex-main .drag-box img {
  width: 100%;
  height: 100%;
}

.annex-main .imgfile {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.annex-main .ico-del {
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: #666 url(../../assets/images/ico-closew.png) center;
  background-size: 14px 14px;
  border-radius: 50%;
}

.annex-main .drag-box:hover .ico-del {
  display: block;
}

.annex-main .btn-add {
  background: #f9f9f9 url(../../assets/images/ico-add.png) no-repeat center;
  background-size: 26px 26px;
  text-indent: -999em;
}

.div1 {
  height: 240px;
  width: 100%;
  position: relative;
  z-index: 1;
  text-align: center
}

.div2 {
  height: 35px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  padding-top: 8px;
  top: 242px;
  left: 0;
  z-index: 2;
}

</style>
