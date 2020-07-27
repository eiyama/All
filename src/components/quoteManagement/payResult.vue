<template>
  <div class="payResult" style="background-color:#FFF">
    <mt-header fixed class="def-header" title="承保状态">
      <mt-button class="mint-head-close" icon="more" @click="closePage" slot="right">关闭</mt-button>
    </mt-header>
    <em class="ico-status" :class="{ 'status-succ': insureStatus=='Insured'}"></em>
    <h3 class="insure-status" :class="{ 'insure-succ': insureStatus=='Insured'}">
      <span v-if="insureStatus=='Insured'">已承保</span>
      <span v-else>未承保</span>
    </h3>
    <ul class="result-info">
      <li class="fn-clear">
        <span class="result-lab">承保险企:</span>
        <span class="result-txt">{{showData.shortName}}</span>
      </li>
      <li class="fn-clear">
        <span class="result-lab">投保单号:</span>
        <span class="result-txt">{{showData.insureNo}}</span>
      </li>
      <li class="fn-clear">
        <span class="result-lab">车主:</span>
        <span class="result-txt">{{showData.name}}</span>
      </li>
      <li class="fn-clear">
        <span class="result-lab">车牌:</span>
        <span class="result-txt">{{showData.plateNo}}</span>
      </li>
    </ul>
    <div class="result-remark" v-show="remark!==''">
      未承保原因：
      <div v-html="remark"></div>
    </div>
    <button v-if="insureStatus=='Insured'" class="btn-pay" @click="complete">完成</button>
    <button v-else class="btn-pay" @click="checkStatus">检测承保状态</button>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
export default {
  name: 'payResult',
  data() {
    return {
      url: '',
      remark: '',
      insureStatus: "", //承保状态值,'QuotedFailed', 'QuotedSuccess', 'Verifying', 'VerifiedFailed', 'VerifiedSuccess','NeedManualAudit', 'Paid', 'Insured'
      showData: {
        shortName: "", //承保保险公司
        insureNo: "", //承保单号
        name: "", //拥有者
        plateNo: "" //车牌号
      }
    }
  },
  methods: {
    complete: function() { // 点击完成
      this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
    },
    closePage: function() {
      this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
    },
    checkStatus: function() {
      var self = this;
      Indicator.open('加载中...');
      axiosGetAPI(self.url).then((res) => {
        Indicator.close();
        if (res.result) {
          self.insureStatus = res.result.insureStatus;
        }
      });
    }
  },
  mounted: function() {
    var self = this;
    self.url = '/vi/insurePolicies/' + this.$route.query.insBatchNo + '/' + this.$route.query.insCorpCode;
    axiosGetAPI(self.url).then((res) => {
      if (res.result) {
        self.insureStatus = res.result.insureStatus;
        self.showData.shortName = res.result.insCorp.shortName;
        self.showData.insureNo = res.result.insureNo;
        self.showData.name = res.result.car.owner.name;
        self.showData.plateNo = res.result.car.plateNo;
        if (res.result.remark) self.remark = res.result.remark; //核保失败的原因
      }
    });
  }
}

</script>
<style scoped>
.payResult {
  padding: 100px 6% 0;
}

.payResult .ico-status {
  display: block;
  width: 44px;
  height: 44px;
  margin: 0 auto 8px;
  background-image: url(../../assets/images/icon_toubao_failure.png);
  background-size: 44px 44px;
}

.payResult .ico-status.status-succ {
  background-image: url(../../assets/images/icon_toubao_successful.png);
}

.payResult .result-info {
  width: 90%;
  padding-bottom: 20px;
  margin: 40px auto 20px;
  border-bottom: 1px solid #eee;
  color: #333;
  line-height: 24px;
}

.payResult .result-info .result-lab {
  float: left;
  width: 80px;
  color: #999;
}

.payResult .result-info .result-txt {
  float: left;
  max-width: 66%;
}

.payResult .result-remark {
  width: 90%;
  margin: 0 auto;
  font-size: 12px;
  color: #999;
}

</style>
