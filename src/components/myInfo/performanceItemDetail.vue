<template>
  <div class="home" style="background-color:#F7F7F7;">
    <mt-header fixed class="def-header cust-head" title="详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center ">
      <div ref="wrppera" class="wrppera">
        <div class="my-policy" style="border-radius: 8px;padding-top: 10px;padding-bottom:10px;margin-left:15px;margin-right:15px" 
        v-for="item in costDetailsDatas" v-show="!noData">
            <mt-cell class='mint-cell' title="名称：">
              <span class="my-cell-gray">{{item.name}}</span>
            </mt-cell>
            <mt-cell class='mint-cell' title="合同号：">
              <span class="my-cell-gray">{{item.contractNo}}</span>
            </mt-cell>
            <mt-cell class='mint-cell' title="保单年度：">
              <span class="my-cell-gray">{{item.period}}</span>
            </mt-cell>
            <mt-cell class='mint-cell' title="首期总保费：">
              <span class="my-cell-gray">{{item.premium}}</span>
            </mt-cell>
            <mt-cell class='mint-cell' title="首期标准保费：">
              <span class="my-cell-gray">{{item.standardPremium}}</span>
            </mt-cell>
            <mt-cell class='mint-cell' title="金额：">
              <span class="my-cell-gray">{{item.value}}</span>
            </mt-cell>
        </div>
        <div class="non-data" v-show="noData">
          <p>暂无数据</p>
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
      noData:false,
      costDetailsDatas:[],
      costDetailsData:{"contractNo": "","period": "","premium": "","standardPremium": "","name": "","costType": "","value": ""}
    }
  },
  created: function() {
    
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    getPerformance: function(all) {
      var salesmanId = sessionStorage.getItem('salesmanId');
      if (salesmanId && salesmanId != 'undefined') {
        Indicator.open('加载中...');
        var startDate = this.$route.query.startDate;
        var endDate = this.$route.query.endDate;
        var costType = this.$route.query.costType;
        ///Salesmans/{salesmanId}/CostDetails
        axiosGetAPI('/salesmans/' + salesmanId + '/CostDetails?startDate=' + startDate + '&endDate=' + endDate + '&costType=' + costType).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.costDetailsDatas = res.result;
            this.noData = false;
          }else{
            this.noData = true;
          }
        });
      }
    }
  },
  mounted() {
    this.getPerformance('');
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
