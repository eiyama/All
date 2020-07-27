<template>
  <div style="background-color: #FFF;">
    <mt-header fixed class="def-header cust-head" :title="title" v-show="!showSplash">
      <div slot="left" v-show="!isShare">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right" v-show="!isShare">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openHome">
      </div>
    </mt-header>
    <div style="padding-top:48px;" v-show="prospectusDetail.isCombination"></div>
    <div style="padding-bottom: 20px" v-show="!showSplash">
      <vue-tabbar-slide :options="options" @callback="callback" v-show="options.slideData.length > 1"></vue-tabbar-slide>
      <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
      <div style="padding-bottom: 5px">
        <div class="div1" style="margin-top: 45px" v-show="(currentInsurance.topPath == null || currentInsurance.topPath == '')">
          <img :src="defaultImg">
        </div>
        <div class="div1" style="margin-top: 45px" v-show="currentInsurance.topPath">
          <img :src="currentInsurance.topPath" width="100%" height="100%">
        </div>
        <div style="padding-top: 10px;padding-left: 15px;padding-right: 15px;">
          <div>
            <h3 style="font-size: 18px;text-align: center;height: 40px">首期保费:<span style="color: red">{{currentInsurance.totalAmount}}</span>元</h3>
            <hr width="100%" color="#f5f5f5" size="1"/>
          </div>
          <div>
            <span style="float:left;font-size: 14px;height: 30px;margin-top: 15px">投保人:{{currentInsurance.applicationName}}</span>
            <span style="float:right;font-size: 14px;height: 30px;margin-top: 15px">被保人:{{currentInsurance.insuredName}} / {{currentInsurance.insuredAge}} / {{currentInsurance.insuredSex}}</span>
            <span class="clear"></span>
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
              <td>{{currentVariates.简称}}</td>
              <td>{{currentVariates.保险金额}}</td>
              <td>{{currentVariates.保险期间}}</td>
              <td>{{currentVariates.缴费年限}}</td>
              <td>{{currentVariates.首期保费}}</td>
            </tr>
            <tr v-for="(item , index) in currentVariates.附加险" v-show="currentVariates.附加险.length > 0" :key="index">
              <td>{{item.简称}}</td>
              <td>{{item.计算方式 == '主险首期保费' ? currentVariates.首期保费  : item.保险金额}}</td>
              <td>{{item.保险期间}}</td>
              <td>{{item.缴费年限}}</td>
              <td>{{item.计算方式 == '主险首期保费' ?  (currentVariates.首期保费 / 1000 * item.费率).toFixed(2)  :  item.首期保费}}</td>
            </tr>
          </table>
        </div>
        <div :style="{backgroundColor:currentInsurance.backgroudColor}" class="markdown-body editormd-preview-container">
          <div :style="{backgroundColor:currentInsurance.backgroudColor}" v-html="currentInsurance.preview"></div>
          <div style="margin:15px;padding-bottom:15px;color:#FFF;font-size: 14px;">注：此计划书仅供演示参考，具体请见保险条款。</div>
        </div>
        <!-- <div v-show="!isShare" style="font-size：10px;color:red;background-color:white;margin:15px;padding-bottom:15px;">点击右上角"更多"按钮或者复制当前链接地址,可分享给客户</div> -->
      </div>
      <footer v-show="!showSplash">
        <div class="mint-bottom" v-show="!isShare" style="background-color:#F9F9F9">
          <button class="btn-bottom frist-bottom" v-show="!isShare" @click="viewRead()" style="color:#7093ed">累计查看{{readCount ? readCount : 0}}次</button>
        </div>
        <div class="mint-bottom" v-show="!((prospectusDetail.salesmanMobile ==null || prospectusDetail.salesmanMobile =='') && (currentInsurance.insureUrl ==null || currentInsurance.insureUrl ==''))&&isShare" style="background-color:#F9F9F9">
          <button class="btn-bottom frist-bottom" v-show="currentInsurance.insureUrl" @click="toQuote(currentInsurance.insureUrl)">去投保</button>
          <button class="btn-bottom" v-show="prospectusDetail.salesmanMobile&&isShare"><a :href="'tel:'+ prospectusDetail.salesmanMobile">联系业务经理</a></button>
        </div>
      </footer>
    </div>
    <mt-popup v-show="showSplash&&isShare" position="bottom" popup-transition="popup-fade" style="height:100%">
        <div class="combination">
          <p style="padding-top:50%;color:white;font-size:16px">
            {{prospectusDetail.name}}为您呈上，请查阅
          </p>
          <p style="padding-top:30%;">
            <img :src="openBtnImg" style="width: 105px;height: 105px;" @click="closeSplash">
          </p>
          <p style="padding-top:30px;color:white;font-size:12px">
            来自{{appName}}的计划书
          </p>
        </div>
      </mt-popup>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
import '../../assets/css/preview.css' //markdown css
import PlanDetailItem from './combinationPlansDetail';
import { Swipe, SwipeItem } from 'vant';
import wx from 'weixin-js-sdk';
import signalR from 'signalr'
export default {
  name: 'home',
  data() {
    return {
      isShare: false,
      defaultImg: this.src = require('../../assets/images/img-product-banner.png'),
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      openBtnImg: this.src = require('../../assets/images/btn-open-circle.png'),
      arrowImg: this.src = require('../../assets/images/icon-arrowUp-white.png'),
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
        "preview": "",
        "totalAmount": 0,
      },
      topPath: '',
      insCorpName: '',
      context: '',
      backgroudColor: '',
      addtionRisks: [],
      insureUrl: '',
      current: 0,
      insureLength: 0,
      wxInfo: { "openId": "", "nickname": "", "sex": "", "province": "", "city": "", "country": "", "headimgUrl": "", "privilege": "", "unionId": "" },
      redirectUri: '',
      proxy: {},
      isWeixin: false,
      requestBody: { prospectusId: 0, visitorFrom: 'WeChat', visitorIdentity: '', nickName: '', headImgUrl: '' },
      showSplash: false,
      appName: '',
      shareImg: '',
      weixin: {},
      hasConn: false,
      title: '',
      options: {
        //required(必填项)
        container: 'planSlide',
        slideData: [],
        //用来传递data-id
        slideId: [],
        //optional(可选项)
        width: '80px',
        height: '48px',
        index: 0,
        downLineHeight:'1px',
        downLineColor:'#f94037',
        checkedColor:'#f94037',
      },
      currentInsurance: {},
      currentIndex: 0,
      currentVariates:[],
      isCombination:false,
      readCount:0,
    }
  },
  components: {
    PlanDetailItem
  },
  mounted: function() {
    var self = this;
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
          // this.initWx(this.weixin);
        }
      });
      if (window.location.href.indexOf('code=') > 0) {
        self.showSplash = false;
        self.getWxUserInfo();
      } else {
        self.showSplash = self.isShare;
      }
      if(self.isShare){
        /*self.pushHistory();
        window.addEventListener("popstate", function(e) { 
           self.finishRead();
        }, false);*/
        window.addEventListener("visibilitychange",()=>{
          if(document.hidden){
              console.log("我离开页面了");
              self.finishRead();
          }
       })
      }
    }
    this.getProspectusDetail();
  },
  destroyed: function() {
    this.finishRead();
  },
  created: function() {
    var appId = this.$route.query.appId;
    this.isShare = this.$route.query.share;
    this.readCount = this.$route.query.readCount;
    if (appId) {
      localStorage.setItem("appId", appId);
    };
    this.getVisitors();
    axiosGetAPI('/apis/apps/' + appId + "/H5").then((res) => {
      localStorage.setItem("serviceHost", res.result.serviceHost);
      localStorage.setItem("servicePort", res.result.servicePort);
    });
  },
  methods: {
     getVisitors: function() {
      var pid = this.$route.query.pid;
      Indicator.open('加载中...');
      ///li/prospectuses/{prospectusId}/visitors
      axiosGetAPI('li/prospectuses/'+pid+'/visitors').then((res) => {
        Indicator.close();
        if(res.page.totalRows){
          this.readCount = res.page.totalRows;
        }
      });
    },
    finishRead:function(){
      if (this.hasConn) {
        this.proxy.invoke("finishRead").done((msg) => {
          console.log('已销毁');
        });
        wx.closeWindow();
      };
    },
    pushHistory:function() {
      //写入空白历史路径
      var state = {
        title: 'title',
        url: "#"
      }
      window.history.pushState(state, state.title, state.url)
    },
    back:function() {
      var self = this;
      self.pushHistory();
      window.addEventListener("popstate", function (e) {
        self.finishRead();
      }, false);
    },
    callback: function(event, index, val, id) {
      console.log(`callback=${index},${val},${id}`);
      this.products = [];
      this.currentInsurance = this.prospectusDetail.insures[index]
      this.currentVariates = this.currentInsurance.variates;
      // this.getProducts(id);
      this.options.index = index;
    },
    viewRead: function() {
      var pid = this.$route.query.pid;
      var url = "/combinationPlan/viewers?pid=" + pid;
      this.$router.push({ path: url });
    },
    closeSplash: function() {
      this.showSplash = false;
      if (this.isWeixin && this.isShare && this.weixin) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.weixin.appId +
          '&redirect_uri=' + encodeURIComponent(this.redirectUri) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      };
    },
    // onChange: function(index) {
    //   this.current = index;
    // },
    openBack: function() {
      window.history.back();
    },
    openHome: function() {
      this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
    },
    toQuote: function(insureUrl) {
      window.location.href = insureUrl;
    },
    getProspectusDetail: function() {
      var self = this;
      var pid = self.$route.query.pid;
      var appId = self.$route.query.appId;
      // Indicator.open('加载中...');
      axiosGetAPI('/apis/apps/' + appId + "/H5").then((res) => {
        localStorage.setItem('appId', res.result.appId);
        localStorage.setItem('serviceHost', res.result.serviceHost);
        self.appName = res.result.name;
        document.title = self.appName;
      });
      axiosGetAPI('/li/prospectuses/' + pid).then((res) => {
        if (res.result && res.result != '') {
          self.prospectusDetail = res.result;
          document.title = self.appName;
          self.insureLength = self.prospectusDetail.insures.length;
          self.currentInsurance = self.prospectusDetail.insures[0];
          self.shareImg = self.currentInsurance.topPath;
          self.currentVariates = self.currentInsurance.variates;
         
          self.isCombination = self.prospectusDetail.isCombination;
          var names = [];
          var ids = [];
          for (var i = 0; i < self.insureLength; i++) {
            var insures = self.prospectusDetail.insures[i];
            var variates = insures.variates;
            insures.totalAmount = variates.首期保费;
            var addtionRisks = variates.附加险;
            for (var j = 0; j < addtionRisks.length; j++) {
              insures.totalAmount += addtionRisks[j].首期保费;
            }
            self.prospectusDetail.insures[i] = insures;
            names.push('计划书' + (i + 1));
            ids.push(i);
          };
          self.options.slideData = names;
          self.options.slideId = ids;
          self.title = self.prospectusDetail.name;
          if (self.prospectusDetail.isCombination) {
            self.title = self.title + "(组合计划)";
          };
          self.initWx(self.title, self.appName, self.shareImg);
        }
        Indicator.close();
      });
    },
    initWx: function(name, appName, shareImg) {
      wx.ready(function() { //通过ready接口处理成功验证
        // config信息验证成功后会执行ready方法
        // var shareLink = this.redirectUri;
        // if (this.redirectUri.indexOf("&share=true") < 0) {
        //     shareLink = this.redirectUri+"&share=true";
        // };
        // console.log('link', shareLink);
        var href = window.location.href;
        var linkUrl = href;
        if (linkUrl.indexOf("&share=true") < 0) {
          linkUrl = linkUrl + "&share=true"
        };
        console.log('linkUrl', linkUrl);
        /*wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
            title: name, // 分享标题
            desc: '', // 分享描述
            link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareImg, // 分享图标
            success: function () {
              // 设置成功
            }
        });
        wx.onMenuShareTimeline ({ //分享朋友圈
            title: name, // 分享标题
            link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareImg, // 分享图标
            success: function () {
              // 设置成功
            }
        });*/
        wx.updateAppMessageShareData({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
          title: name + '为您呈上，请查阅', // 分享标题
          desc: '--来自' + appName + '的计划书', // 分享描述
          link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImg, // 分享图标
          success: function() {
            // 设置成功
          }
        });
        wx.updateTimelineShareData({ //分享朋友圈
          title: name + '为您呈上，请查阅', // 分享标题
          desc: '--来自' + appName + '的计划书', // 分享描述
          link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
    getQueryString: function(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    getWxUserInfo: function() {
      this.wxInfo = sessionStorage.getItem('wxInfo');
      if (this.wxInfo) {
        this.wxInfo = JSON.parse(this.wxInfo);
        this.requestBody.prospectusId = this.$route.query.pid;
        this.requestBody.visitorIdentity = this.wxInfo.openId;
        this.requestBody.nickName = this.wxInfo.nickname;
        this.requestBody.headImgUrl = this.wxInfo.headimgUrl;
        this.connectServer();
      } else {
        var code = this.getQueryString("code");
        var state = this.getQueryString("state");
        console.log('code:' + code);
        console.log('state:' + state);
        var url = '/Weixin/' + code;
        axiosGetAPI(url).then((res) => {
          if (res.status == 200 && res.result) {
            this.wxInfo = res.result;
            this.requestBody.prospectusId = this.$route.query.pid;
            this.requestBody.visitorIdentity = this.wxInfo.openId;
            this.requestBody.nickName = this.wxInfo.nickname;
            this.requestBody.headImgUrl = this.wxInfo.headimgUrl;
            var model = JSON.stringify(this.wxInfo);
            sessionStorage.setItem('wxInfo', model);
            this.connectServer();
          }
        });
      }

    },
    connectServer: function() {
      var $this = this;
      var serviceHost = localStorage.getItem('serviceHost');
      var servicePort = localStorage.getItem('servicePort');
      if (serviceHost && servicePort) {
        var HUB_URL;
        if ("443" == servicePort) {
          HUB_URL = "https://" + serviceHost;
        } else {
          HUB_URL = "http://" + serviceHost;
        }
        HUB_URL = HUB_URL + ":" + servicePort + "/signalr/hubs";
        var conn = $.hubConnection(HUB_URL, { useDefaultPath: false });
        $this.proxy = conn.createHubProxy("prospectusHub");
        $this.getMsg();
        conn.start().done((data) => {
          // console.log('已连接')
        }).fail((data) => {
          console.log('连接失败异常:', data)
        });
        $this.hasConn = true;
      }
    },
    sendMsg: function() {
      var $this = this;
      var model = JSON.stringify($this.requestBody);
      console.log(model);
      $this.proxy.invoke("beginRead", $this.requestBody).done((msg) => {
        console.log('开始阅读');
      }).fail((msg) => {
        console.log('异常:', msg)
      });;
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

.combination {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../../assets/images/bg-plan.png);
  text-align: center;
}
</style>
