<template>
  <div class="home" style="background-color:#F7F7F7;">
    <mt-header fixed class="def-header cust-head" title="我的业绩">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <div ref="wrppera" class="wrppera">
        <div class="my-policy" style="border-radius: 8px;padding-top: 10px;padding-bottom:10px;margin-left:15px;margin-right:15px" 
        v-for="item in personData" @click="performanceDetail(item,$event)" v-show="!noData">
          <span class="my-cell-gray" style="text-align:center;font-size:15px;color:#333">{{item.period}}</span>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-cell class='mint-cell' title="新单保费：" is-link>
            <span class="my-cell-gray">{{item.newAmount}}</span>
          </mt-cell>
          <mt-cell class='mint-cell' title="实收保费：" is-link>
            <span class="my-cell-gray">{{item.actualAmount}}</span>
          </mt-cell>
          <mt-cell class='mint-cell' title="新单件数：" is-link>
            <span class="my-cell-gray">{{item.newCount}}</span>
          </mt-cell>
          <mt-cell class='mint-cell' title="首年保费(FYP)：" is-link>
            <span class="my-cell-gray">{{item.firstYearPremium}}</span>
          </mt-cell>
          <mt-cell class='mint-cell' title="首年佣金(FYC)：" is-link>
            <span class="my-cell-gray">{{item.firstYearCommission}}</span>
          </mt-cell>
          <mt-cell class='mint-cell' title="本月新增客户人数：" is-link>
            <span class="my-cell-gray">{{item.customerCount}}</span>
          </mt-cell>
        </div>
        <div class="non-data" v-show="noData">
          <p>暂无个人业绩数据</p>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';
export default {
  name: 'home',
  data() {
    return {
      noData: true,
      personData:[],
      itemData:{"period": "","newAmount": "","newCount": "","actualAmount": "","firstYearPremium": "","firstYearCommission": "","customerCount": ""}
    }
  },
  created: function() {
    
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    getPerformance: function() {
      var salesmanId = sessionStorage.getItem('salesmanId');
      if (salesmanId && salesmanId != 'undefined') {
        this.noData = true;
        Indicator.open('加载中...');
        ///Salesmans/{salesmanId}/Businesses
        axiosGetAPI('/salesmans/' + salesmanId + '/Businesses').then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.personData = res.result;
            this.noData = false;
          } else {
            this.noData = true;
          }
        });
      } else {
        this.noData = true;
      }
    },
    performanceDetail: function(item, e) {
      e.preventDefault();
      this.$router.push({ path: "/myInfo/performanceDetail?startDate=" + item.startDate + "&endDate=" + item.endDate });
    },
  },
  mounted() {
    this.getPerformance();
  },
}

</script>
<style scoped>
.quota-content {
  position: absolute;
  top: 0;
  bottom: 10px;
  width: 100%;
  padding: 44px 0 44px;
  background-color: #F5F5F5;
  height: 1467px;
}

.my-policy .mt-policy-cell {
  min-height: 30px;
}

.my-policy .mint-cell {
  height: 24px;
  min-height: 25px;
}

.my-policy .my-cell-gray {
  color: #666666;
  font-size: 12px;
  padding-right: 15px;
  text-align: center;
  display: block;
}

.down {
  height: 40px;
  text-align: center;
  background: #FFFFFF
}

.down img {
  width: 35px;
  height: 35px;
  margin-top: 5px
}

.wrppera {
  width: 100%;
  /* height: 100%; */
  overflow: auto;
  margin-top: 0px;
  margin-bottom: 10px;
}

.textshow {
  margin-top: 5px;
  color: #878484
}

</style>
