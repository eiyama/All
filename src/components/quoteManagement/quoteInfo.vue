<template>
  <div class="quoteInfo" style="background-color:#FFF">
    <div>
      <mt-header fixed class="def-header" title="车险报价" v-show="isSelectIns">
        <div slot="left">
          <mt-button icon="back" @click="goBack"></mt-button>
        </div>
        <div slot="right">
          <van-icon name="cross"  @click="closeBack"  />
          <!-- <van-icon name="close" @click="openBack" /> -->
        </div>
        <!-- <mt-button icon="more" slot="right" id="openSelectIns" v-show="selected == '3' && btnSelIns"></mt-button> -->
      </mt-header>
      <div class="mint-wrap" :class="{ 'toQuote': isSelectIns }">
        <div class="fixed-navbar" :style="{ width: size + '%' }" v-show="isSelectIns"></div>
        <mt-navbar class="quote-tab" fixed v-model="selected" v-show="isSelectIns">
          <mt-tab-item class="nav-item" id="1"><span class="t-dot">1</span>填车辆信息</mt-tab-item>
          <mt-tab-item :class="{ 'nav-item': isScheme }" id="2"><span class="t-dot">2</span>选车险方案</mt-tab-item>
          <mt-tab-item :class="{ 'nav-item': isResult }" id="3"><span class="t-dot">3</span>看报价结果</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <!-- 提交车辆信息 -->
          <mt-tab-container-item id="1">
            <vehicleInfo v-show="isSelectIns" ref="vehicleInfo" v-on:child-vehicle="getListenVehicle"></vehicleInfo>
          </mt-tab-container-item>
          <!-- 选择车险方案 -->
          <mt-tab-container-item id="2">
            <insureScheme ref="insureScheme" v-on:child-scheme="getListenScheme"></insureScheme>
          </mt-tab-container-item>
          <!-- 报价列表 -->
          <mt-tab-container-item id="3">
            <quoteList ref="quoteList" v-on:child-list="getListenList"></quoteList>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>
<script>
import vehicleInfo from './vehicleInfo'
import insureScheme from './insureScheme'
import quoteList from './quoteList'
import selectIns from './selectIns'
import { Toast, Indicator } from 'mint-ui';
export default {
  name: 'quoteInfo',
  data() {
    return {
      selected: '1',
      btnSelIns: false,
      size: 66.66,
      isResult: false,
      isScheme: false,
      isSelectIns: true,
      renewalCode: '',
      cityCode:'',
      cityName:'',
      appId: '',
      from: '',
      customerId:'',
    };
  },
  components: {
    vehicleInfo,
    insureScheme,
    quoteList
  },
  methods: {
    closeBack: function() {
      if (this.from == 'cust') {
        this.$router.push({ path: "/customerManagement/custDetail?customerId=" + this.customerId });
      } else if (this.from == 'policyList') {
        this.$router.push({ path: "/quoteManagement/insList" });
      } else if (this.from == 'carInCustomers') {
        this.$router.push({ path: "/quoteManagement/carInCustomers" });
      } else {
        var appIdParam = {
          appId: this.appId
        }
        this.$router.push({ path: "/quoteIndex", query: appIdParam });
        // this.$router.back();
      }
    },
    goBack(){
      if(this.selected == '3'){
        this.selected = '2';
        return;
      }
      if(this.selected == '2'){
        this.selected = '1';
        return;
      }
      if(this.selected == '1'){
        // console.log(this.selected)
        this.closeBack();
        // break;
      }
    },
    getListenVehicle: function(data) {
      this.selected = data.num;
      this.size = data.size;
      this.isScheme = data.isScheme;
    },
    getListenList: function(data) {
      this.isSelectIns = data.isSelectIns;
      if (data.num) this.selected = data.num;
      if (data.size) this.size = data.size;
      if (data.isResult) this.isResult = data.isResult;
      if (data.btnSelIns) this.btnSelIns = data.btnSelIns;
      if (data.renewalCode) this.renewalCode = data.renewalCode;
      if (data.cityCode) this.cityCode = data.cityCode;
      if (data.cityName) this.cityName = data.cityName;
    },
    getListenScheme: function(data) {
      this.isSelectIns = data.isSelectIns;
      if (data.num) this.selected = data.num;
      if (data.size) this.size = data.size;
      if (data.isResult) this.isResult = data.isResult;
      if (data.cityCode) this.cityCode = data.cityCode;
      if (data.cityName) this.cityName = data.cityName;
    }
  },
  mounted() {
    var self = this;
    var quoteInfoStatus = localStorage.getItem('quoteInfoStatus');
    self.appId = localStorage.getItem('appId');
    self.from = self.$route.query.from;
    self.customerId = self.$route.query.customerId;
    self.isSelectIns = true;
    if (quoteInfoStatus) {
      quoteInfoStatus = JSON.parse(quoteInfoStatus);
      if (quoteInfoStatus.status) {
        Indicator.close();
        self.isSelectIns = true;
        self.selected = quoteInfoStatus.status.num;
        self.size = quoteInfoStatus.status.size;
        self.isScheme = quoteInfoStatus.status.isScheme;
        self.isResult = quoteInfoStatus.status.isResult;
        self.renewalCode = quoteInfoStatus.status.renewalCode;
        self.cityCode = quoteInfoStatus.status.cityCode;
        self.cityName = quoteInfoStatus.status.cityName;
      }
    }
  }
};

</script>
<style scoped>
.quoteInfo .mint-wrap.toQuote {
  padding-top: 100px;
}

.quoteInfo .mint-navbar.is-fixed {
  top: 44px;
}

.quoteInfo .fixed-navbar {
  position: fixed;
  top: 44px;
  right: 0;
  width: 100%;
  height: 59px;
  text-align: right;
  z-index: 2;
}


</style>
