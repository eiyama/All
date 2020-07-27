<template>
  <div style="background-color: #FFF;">
    <mt-header fixed class="def-header cust-head" title="产品详情">
      <div slot="left" v-show='!isShare'>
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div>
      <div>
        <div class="div1" style="margin-top: 45px" v-show="productDetail.topPath==null || productDetail.topPath == ''">
          <img :src="defaultImg">
        </div>
        <div class="div1" style="margin-top: 45px" v-show="productDetail.topPath">
          <img :src="productDetail.topPath" width="100%" height="240px">
        </div>
        <div class="div2">
          <span style="color:#FFFFFF;margin-left:15px;font-size: 18px;">{{productDetail.insCorpName}}</span>
        </div>
        <div class="mint-area" style="margin-top: -10px">
          <h3 class="cust-title fn-clear">
            <span class="plateno">{{productDetail.name}}</span>
            <br><span style="color:#666666;font-size: 15px;">{{productDetail.description}}</span>
          </h3>
        </div>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" v-show="hasIntrosData">简介</mt-tab-item>
        <mt-tab-item id="2" v-show="hasRulesData">规则</mt-tab-item>
        <mt-tab-item id="3" v-show="hasClausesData">条款</mt-tab-item>
        <mt-tab-item id="4" v-show="hasLightspotsData">亮点</mt-tab-item>
        <mt-tab-item id="5" v-show="hasCasesData">案例</mt-tab-item>
        <mt-tab-item id="6" v-show="hasAdditionsData">附加险</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="mint-tab-content" style="margin-bottom: 35px">
        <mt-tab-container-item id="1">
          <ul v-show="hasIntrosData">
            <li v-for="item in intros" style="text-align: center">
              <img :src="item.filePath ? item.filePath : defaultImg" width="100%" height="100%">
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul v-show="hasRulesData">
            <li v-for="item in rules" style="text-align: center">
              <img :src="item.filePath ? item.filePath : defaultImg" width="100%" height="100%">
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <ul v-show="hasClausesData">
            <li v-for="item in clauses" style="text-align: center">
              <img :src="item.filePath ? item.filePath : defaultImg" width="100%" height="100%">
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <ul v-show="hasLightspotsData">
            <li v-for="item in lightspots" style="text-align: center">
              <img :src="item.filePath ? item.filePath : defaultImg" width="100%" height="100%">
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="5" v-show="hasCasesData">
          <ul>
            <li v-for="item in cases" style="text-align: center">
              <img :src="item.filePath ? item.filePath : defaultImg" width="100%" height="100%">
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="6" v-show="hasAdditionsData">
          <ul>
            <li v-for="item in additions" style="text-align: center">
              <img :src="item.filePath ? item.filePath : defaultImg" width="100%" height="100%">
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="mint-bottom">
      <button class="btn-bottom frist-bottom" @click="productCompare" v-show="false">产品对比</button>
      <button class="btn-bottom" @click="createProspectus" v-show="productDetail.isPublish">制作计划书</button>
      <button class="btn-bottom" v-show="productDetail.insureUrl" @click="toQuote(productDetail.insureUrl)">在线投保</button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
import wx from 'weixin-js-sdk';
export default {
  name: 'home',
  data() {
    return {
      selected: '1',
      hasRulesData: false,
      hasCasesData: false,
      hasLightspotsData: false,
      hasIntrosData: false,
      hasClausesData: false,
      hasAdditionsData: false,
      isShare: false,
      defaultImg: this.src = require('../../assets/images/img-product-banner.png'),
      productDetail: {
        "id": "",
        "name": "",
        "shortName": "",
        "clauseCode": "",
        "uuid": "",
        "insCorpCode": "",
        "insCorpName": "",
        "categoryCode": [],
        "categoryName": "",
        "hesitatePeriod": "",
        "code": "",
        "regularPremiumCode": "",
        "singlePremiumCode": "",
        "isAddition": "",
        "description": "",
        "insureUrl": "",
        "coverUrl": "",
        "isRecommend": "",
        "recommendUrl": "",
        "isCustomStandard": "",
        "standardUrl": "",
        "standardDetails": [{ "category": "", "fileName": "", "filePath": "" }],
        "isCustomMobile": "",
        "mobileUrl": "",
        "mobileDetails": [{ "category": "", "fileName": "", "filePath": "" }],
        "atomUnit": "",
        "isComparison": "",
        "status": "",
        "topPath": "",
        "rates": [{
          "heads": [],
          "rates": [
            []
          ],
          "category": ""
        }],
        "isPublish": true,
      },
      intros: [{ "category": "", "fileName": "", "filePath": "" }],
      lightspots: [{ "category": "", "fileName": "", "filePath": "" }],
      cases: [{ "category": "", "fileName": "", "filePath": "" }],
      clauses: [{ "category": "", "fileName": "", "filePath": "" }],
      rules: [{ "category": "", "fileName": "", "filePath": "" }],
      additions: [{ "category": "", "fileName": "", "filePath": "" }],
      isSalesMan: false
    }
  },
  created: function() {
    this.isShare = this.$route.query.isShare;
    var appId = this.$route.query.appId;

    if (appId) {
      localStorage.setItem("appId", appId);
    };
    if(this.$route.query.isSalesMan){
      this.isSalesMan = this.$route.query.isSalesMan;
    }
    if (sessionStorage.getItem('salesmanId')) {
      this.isSalesMan = true;
    }
    

  },
  mounted:function(){
    var self = this;
    self.appId = self.$route.query.appId;
    localStorage.setItem("appId", self.appId);
    var pid = self.$route.query.pid;
    var domain = '';
    var currentUrl = document.location.toString();
    if (currentUrl) {
      var arrUrl = currentUrl.split("#");
      domain = arrUrl[0];
    };
    self.shareLink = domain + '#/product/detail?pid=' + pid + '&appId=' + self.appId + '&isShare=true' + '&isSalesMan=true'
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
    self.getProductDetail();
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
    toQuote: function(insureUrl) {
      window.location.href = insureUrl;
    },
    openBack: function() {
      window.history.back();
    },
    getProductDetail: function() {
      var pid = this.$route.query.pid;
      Indicator.open('加载中...');
      axiosGetAPI('/li/products/' + pid).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.productDetail = res.result;
          this.intros = this.productDetail.mobileDetails;
          this.hasIntrosData = (this.intros.length > 0);
          document.title = this.productDetail.name;
          var standardDetails = this.productDetail.standardDetails;
          var lightspotsArr = [];
          var casesArr = [];
          var rulesArr = [];
          var clausesArr = [];
          var additionsArr = [];
          for (var i = 0; i < standardDetails.length; i++) {
            if (standardDetails[i].category == 'Lightspot') {
              lightspotsArr.push(standardDetails[i]);
            } else if (standardDetails[i].category == 'Case') {
              casesArr.push(standardDetails[i]);
            } else if (standardDetails[i].category == 'Rule') {
              rulesArr.push(standardDetails[i]);
            } else if (standardDetails[i].category == 'Clause') {
              clausesArr.push(standardDetails[i]);
            } else if (standardDetails[i].category == 'Addition') {
              additionsArr.push(standardDetails[i]);
            }
          }
          this.lightspots = lightspotsArr;
          this.hasLightspotsData = (lightspotsArr.length > 0);
          this.cases = casesArr;
          this.hasCasesData = (casesArr.length > 0);
          this.rules = rulesArr;
          this.hasRulesData = (rulesArr.length > 0);
          this.clauses = clausesArr;
          this.hasClausesData = (clausesArr.length > 0);
          this.additions = additionsArr;
          this.hasAdditionsData = (additionsArr.length > 0);
          this.initWx(this.productDetail.name, this.productDetail.description, this.productDetail.coverUrl, this.shareLink);
        }
      });
    },
    createProspectus: function() {
      // e.preventDefault();
      var appId = localStorage.getItem("appId");
      var localToken = localStorage.getItem("token");
      if (localToken) {
        localToken = localToken.replace(appId + "_", "");
      }
      var url = "/combinationPlan?id=" + this.$route.query.pid +
        "&insCorpName=" + this.productDetail.insCorpName //+ "&token=" + encodeURIComponent(localToken);
      this.$router.push({ path: url });
    },
    productCompare: function() {
      var url = "/productProspectus?id=" + this.$route.query.pid +
        "&insCorpName=" + this.productDetail.insCorpName
      this.$router.push({ path: url });
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
  z-index: 9;
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
  text-align: center
}

.div2 {
  height: 35px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  padding-top: 8px;
  top: 197px;
  left: 0;
  z-index: 1;
}

</style>
