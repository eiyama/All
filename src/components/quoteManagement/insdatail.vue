<template>
  <div class="inslist" ref="inslist" style="background-color:#FFF">
    <mt-header fixed class="def-header cust-head" title="报价详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <!--  <p class="quote-bar">{{cityName}} {{plateNo}} {{ownerName}}</p>
            <div class="quote-row">当前报价险企{{codesLen}}家</div> -->
      <div class="quote">
        <h4>{{plateNo}} {{applicantName}}</h4>
        <p>{{createdTime}}</p>
      </div>
      <div class="quote-result">
        <div class="mint-region resultList" v-for="(item,index) in insArr" @click.stop="toQuoteDetail(item,index)">
          <mt-cell class="mint-list" title="标题文字" :title="item.insCorp.shortName" icon="back">
            <img slot="icon" class="ico-ins" :src="item.src ? item.src : defaultImg">
            <span class="quote-money" v-show="item.insureStatus != 'loading'"><em v-show="item.insureStatus != 'QuotedFailed'">￥ {{item.premium}}</em></span>
            <div class="quoting" v-show="item.insureStatus == 'loading'">
              <p class="q-txt">报价中</p>
              <p><em class="J-countdown" v-html="item.random"></em>%<img class="q-loading" src="../../assets/images/ad-loading.gif"></p>
            </div>
            <p class="fail-txt" v-show="item.insureStatus == 'QuotedFailed'">报价失败<span v-show="item.isReInsure" class="q-txt" @click.stop="reQuote" :code="item.insCorp.code">重新报价</span></p>
            <i class="ico-arrow" v-show="item.insureStatus != 'QuotedFailed'"></i>
          </mt-cell>
          <div class="mint-results">
            <div class="results-area">
              <div class="fail-reason" v-show="item.insureStatus == 'QuotedFailed'">
                <i class="ico-open" @click.stop="downFailTxt"></i>{{item.remark}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import event from './../../common/event';
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import store from './../../store/store'
import * as types from './../../store/types';
var Method, reMethod, insArray = [],
  quoteInfoStatus = {};
export default {
  name: 'inslist',
  data() {
    return {
      insArr: [],
      codes: [],
      initArr: [],
      quoteInfo: [],
      cityName: '',
      plateNo: '',
      ownerName: '',
      codesLen: 0,
      insBatchNo: '',
      createdTime: '',
      applicantName: '',
      insurePolicies: {},
      countdown: parseInt(10 * Math.random()),
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png')
    };
  },
  mounted() {
    var self = this;
    var insurePolicies = store.state.insurePolicies;
    if (insurePolicies && Object.keys(insurePolicies).length > 0) {
      this.insurePolicies = insurePolicies;
      this.createdTime = insurePolicies.createdTime
      this.applicantName = insurePolicies.applicantName
      this.plateNo = insurePolicies.plateNo
      self.getInsCode(this.insurePolicies);
    } else {
      this.$router.push({ path: "/customerManagement/custDetail" });
    }
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    isContained: (a, b) => {
      if (!(a instanceof Array) || !(b instanceof Array)) return false;
      if (a.length < b.length) return false;
      var aStr = a.toString();
      for (var i = 0, len = b.length; i < len; i++) {
        if (aStr.indexOf(b[i]) == -1) return false;
      }
      return true;
    },
    getInsCode: function(quoteInfo) {
      var self = this;
      var datas = quoteInfo,
        codes = [];
      insArray = [];
      for (var i = 0; i < datas.policies.length; i++) {
        var insItem = datas.policies[i],
          insJson = {};
        insJson.insCorp = insItem.insCorp;
        insJson.insureStatus = 'loading';
        insJson.random = parseInt(10 * Math.random());
        insJson.isSelIns = true;
        insArray.push(insJson)
        codes.push(insItem.code)
      }
      self.codes = codes
      self.insArr = insArray
      self.codesLen = codes.length
      self.insArr.map(item => {
        item.src = require(`@/assets/images/companys/${item.insCorp.code}.png`)
      });
      var hander;
      hander = setInterval(function() {
        for (var i = 0; i < self.insArr.length; i++) {
          var temp = self.insArr[i];
          if (temp.random > 95) {
            clearInterval(hander);
          }
          temp.random++
        }
      }, 2000)
      self.insBatchNo = datas.insBatchNo
      var url = '/vi/insurePolicies/' + self.insBatchNo;
      self.getResultList(url, false);
    },
    getResultList: function(url, isRe) {
      var self = this,
        url = url;
      axiosGetAPI(url).then((res) => {
        if (res.result) {
          var result = res.result,
            insTemp = [],
            len = 0;

          if (isRe == true) {
            len = 1
            reMethod = function() { self.getResultList(url, isRe) }
          } else {
            len = result.length
            Method = function() { self.getResultList(url, isRe) }
          }

          self.insArr.map(temp => {
            var random = temp.random,
              src = temp.src,
              arr = {};
            arr = temp;
            for (var j = 0; j < len; j++) {
              var item;
              if (isRe == true) item = result
              else item = result[j];
              if (temp.insCorp.code == item.insCorp.code) {
                arr = item;
                arr.random = random;
                arr.src = src;
                arr.isSelIns = true;
                arr.isReInsure = false;
                if (item.remark) {
                  if (item.remark.indexOf('重复投保') == -1) arr.isReInsure = true;
                }
                this.Common.Public.removeByValue(self.codes, temp.insCorp.code);
                if (isRe == true) { clearInterval(reMethod); }
                break;
              }
            }
            insTemp.push(arr)
          });
          self.insArr = insTemp;
          quoteInfoStatus.insArr = self.insArr;
          quoteInfoStatus.insBatchNo = self.insBatchNo
          localStorage.setItem("quoteInfoStatus", JSON.stringify(quoteInfoStatus));
        }
        if (self.codes.length == 0) {
          if (!(typeof(Method) == 'undefined')) {
            clearInterval(Method);
            clearInterval(reMethod);
          }
        }
      });
    },
    downFailTxt: function(e) {
      var $reason = $(e.currentTarget).closest('.fail-reason')
      if (!$(e.currentTarget).hasClass('down')) {
        $(e.currentTarget).addClass('down');
        $reason.css({ 'height': '22px' })
      } else {
        $reason.css({ 'height': 'auto' })
        $(e.currentTarget).removeClass('down');
      }
    },
    reQuote: function(e) {
      var self = this,
        code = $(e.currentTarget).attr('code');
      self.codeQuote(code);
    },
    codeQuote: function(code) {
      var self = this,
        insItems = [];
      self.insArr.map(item => {
        var ins = {};
        ins = item;
        if (item.insCorp.code == code) {
          var shortName = item.insCorp.shortName,
            src = item.src;
          ins = {
            random: parseInt(10 * Math.random()),
            src: src,
            isSelIns: true,
            insCorp: {
              shortName: shortName,
              code: code
            },
            insureStatus: 'loading'
          }
        }
        insItems.push(ins)
      });
      self.insArr = insItems;
      self.codes.push(code);
      var url = '/vi/insurePolicies/' + this.insBatchNo + "/" + code;
      self.getResultList(url, true)
    },
    toQuoteDetail: function(item, index) {
      // if(item.insureStatus != 'QuotedFailed' && item.insureStatus != 'loading'){
      //     var quoteJson = {
      //         insCorpName: item.insCorp.shortName,
      //         insCorpCode: item.insCorp.code,
      //         insBatchNo: this.insBatchNo
      //     }
      //     clearInterval(Method);
      //     clearInterval(reMethod);
      //     this.$router.push({path:"/quoteManagement/quotedetail",query:quoteJson});
      // }
      if (item.insureStatus == "VerifiedFailed" || item.insureStatus == "QuotedFailed" || item.insureStatus == "QuotedSuccess" || item.insureStatus == "VerifiedSuccess") {
        this.$store.commit(types.POLICYDETAIL, item);
        this.$router.push({ path: "/myInfo/inspolicyDetail" });

      }


    }
  }
};

</script>
<style scoped>
.inslist .quote-result {
  background-color: #fff;
}

.inslist .mint-results {
  padding-left: 4%;
}

.inslist .mint-list {
  padding-right: 10px;
}

.inslist .mint-list .ico-arrow {
  right: 4%;
}

.inslist .quote-result .mint-region {
  padding: 2px 0 6px;
  margin-bottom: 0;
}

.inslist .mint-results .results-area {
  text-align: right;
  border-bottom: 1px solid #eee;
}

.inslist .quote-result .quoting {
  line-height: 20px;
}

.inslist .quote-result .ico-ins {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
}

.inslist .quote-result .q-loading {
  width: 18px;
  height: 18px;
  margin-left: 5px;
  opacity: .8;
}

.inslist .quote-result .quote-money {
  font-size: 14px;
  color: #FC3738;
}

.inslist .fail-txt {
  font-size: 14px;
}

.inslist .fail-txt .q-txt {
  display: inline-block;
  width: 62px;
  height: 22px;
  margin-left: 10px;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.inslist .mint-results .fail-reason {
  position: relative;
  display: inline-block;
  width: 78%;
  min-height: 22px;
  margin: 0 4% 10px 0;
  padding: 4px 30px 4px 10px;
  line-height: 22px;
  font-size: 12px;
  color: #999;
  overflow: hidden;
  background: #F7F7F7;
  border-radius: 4px;
  text-align: left;
  word-wrap: break-word;
}

.inslist .mint-results .ico-open {
  position: absolute;
  top: 4px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-image: url(../../assets/images/icon-down.png);
  background-size: 16px 37px;
  background-repeat: no-repeat;
  background-position: 2px 4px;
}

.inslist .mint-results .ico-open.down {
  background-position: 2px -24px;
}

.quote {
  width: 100%;
  height: 70px;
  text-align: center;
  padding-top: 20px;
  background: #FFFFFF
}

.quote h4 {
  font-size: 18px;
  font-weight: 100;
}

.quote p {
  font-size: 12px;
  color: #999999;
  line-height: 20px;
}

.quote-result {
  margin-top: 15px;
}

.container-center {
  height: 1500px;
  background: #FAFAFA
}

</style>
