<template>
  <div class="home" style="background-color:#F7F7F7;">
    <mt-header fixed class="def-header cust-head" title="业绩概览">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center ">
      <div ref="wrppera" class="wrppera">
        <div class="my-policy" style="padding-top: 10px;padding-bottom:10px;" 
            v-for="item in costesData" @click="costeDetail(item,$event)">
            <mt-cell class='mint-cell' :title="item.name" is-link>
              <span class="my-cell-gray">{{item.value}}</span>
            </mt-cell>
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
      costesData:[],
      itemData:{"name": "","costType": "","value": ""}
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
        ///Salesmans/{salesmanId}/Costes
        var startDate = this.$route.query.startDate;
        var endDate = this.$route.query.endDate;
        axiosGetAPI('/salesmans/' + salesmanId + '/Costes?startDate=' + startDate + '&endDate=' + endDate).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.costesData = res.result;
          }
        });
      }
    },
    costeDetail: function(item, e) {
      e.preventDefault();
      var startDate = this.$route.query.startDate;
      var endDate = this.$route.query.endDate;
      var costType = item.costType;
      this.$router.push({ path: "/myInfo/performanceItemDetail?startDate=" + startDate + "&endDate=" + endDate + "&costType=" + costType });
    },
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
