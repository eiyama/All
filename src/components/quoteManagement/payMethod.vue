<template>
  <div class="payMethod" style="background-color:#FFF">
    <mt-header fixed class="def-header" :title="title">
      <div slot="left">
        <mt-button @click="openBack" icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="mint-content">
      <h3 class="pay-title">您选择通过{{title}}保费</h3>
      <div class="pay-info">
        <div v-show="payMethod=='Offline_Swipe'">
          <p class="mt20">缴费编号</p>
          <em class="pay-num">{{paymentNo}}</em>
          <p>校验码</p>
          <em class="pay-num">{{securityNo}}</em>
        </div>
        <div v-show="payMethod=='Online'">
          <img class="qrcode" :src="src">
        </div>
      </div>
    </div>
    <button class="btn-pay" @click="openPayResult">支付完成</button>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI, axiosDeleteAPI } from './../../common/Axios';
import event from './../../common/event';
export default {
  name: 'payMethod',
  data() {
    return {
      url: '',
      title: '',
      src: '',
      paymentNo: '',
      securityNo: '',
      payMethod: "" //1、pos机方式：'Offline_Swipe',2、二维码方式:'Online'
    }
  },
  methods: {
    openBack: function() {
      self.url = '/vi/insurePolicies/' + this.$route.query.insBatchNo + '/' + this.$route.query.insCorpCode + '/orders/' + this.$route.query.orderNo + '/payment';
      axiosDeleteAPI(self.url).then((res) => {
        window.history.back();
      });
    },
    openPayResult: function() {
      var self = this;
      var obj = {};
      obj.insBatchNo = this.$route.query.insBatchNo; //批次编码
      obj.insCorpCode = this.$route.query.insCorpCode; //保险公司编码
      this.$router.push({ path: "/quoteManagement/payResult", query: obj });
    },
    getPayInfo: function(result) {
      var self = this;
      if (self.payMethod == 'Offline_Swipe') {
        self.paymentNo = result.content.indexOf('-') != -1 ? result.content.substring(0, result.content.indexOf('-')) : result.content
        self.securityNo = result.content.indexOf('-') != -1 ? result.content.substring(result.content.indexOf('-') + 1, result.content.length) : result.content
      } else if (self.payMethod == 'Online') {
        self.src = result.content
      }
    }
  },
  mounted: function() {
    var self = this;
    self.payMethod = self.$route.query.paymentType;
    var res = {
      content: self.$route.query.content,
      paymentType: self.$route.query.paymentType
    }
    self.getPayInfo(res)

    if (self.payMethod == 'Offline_Swipe') this.title = 'POS机刷卡支付';
    else if (self.payMethod == 'Online') this.title = '二维码支付';
  }
}

</script>
<style scoped>
.payMethod {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #F9F9F9;
  overflow-y: scroll;
}

.payMethod .pay-title {
  padding-top: 20px;
  color: #999;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
}

.payMethod .pay-info {
  width: 76%;
  min-height: 200px;
  padding: 40px 4%;
  margin: 18px auto 0;
  font-size: 14px;
  color: #999;
  background-color: #fff;
  text-align: center;
}

.payMethod .pay-num {
  display: block;
  margin-bottom: 18px;
  font-size: 28px;
  color: #333;
  font-style: normal;
}

.payMethod .qrcode {
  display: inline-block;
  width: 200px;
  height: 200px;
}

</style>
