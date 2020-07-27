<template>
  <div style="background-color:#FFF">
    <mt-header fixed class="def-header" title="查看记录">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <div class="vwrppera" ref="vwrppera">
        <ul class="mint-region" v-show="hasVisitorsData">
          <li class="mint-cell" v-for="item in visitorsData">
            <div style="padding-bottom:5px;padding-top:15px">
              <img :src="item.headImgUrl ? item.headImgUrl : defaultImg" style="width: 60px;height: 60px;border-radius: 50%;" slot="left">
             <!--  <i class="mint-title" style="margin-left: 5px;font-size: 16px;">{{item.nickName ? item.nickName:"匿名"}}</i> -->
              <p style="margin-left: 70px;margin-top: -70px;color:#333;font-size: 16px">{{item.nickName ? item.nickName:"匿名"}}</p>
              <p style="margin-left: 70px;color:#999;font-size: 12px">访客来源：{{item.visitorFromText ? item.visitorFromText:"其他"}}</p>
              <!-- <p style="margin-left: 70px;color:#999;font-size: 12px">阅读时长：{{item.durationText?item.durationText:"0"}}</p> -->
              <p style="margin-left: 70px;color:#999;font-size: 12px">阅读状态：{{item.duration > 0 ? '阅读' + item.durationText : item.statusText}}</p>
              <p style="margin-left: 70px;color:#999;font-size: 12px">访问时间：{{item.createdTime}}</p>
            </div>
            <hr width="100%" color="#f5f5f5" size="1" />
            <!-- <i class="ico-arrow"></i> -->
          </li>
        </ul>
        <div class="non-data" v-show="!hasVisitorsData">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';

export default {
  name: 'home',
  data() {
    return {
      hasVisitorsData: false,      
      defaultImg: this.src = require('../../assets/images/icon-headImg.png'),
      visitorsData: {"id": "","visitorFrom": "","visitorIdentity": "","duration": "","createdTime": "", 
      "nickName": '', "headImgUrl": '',"statusText":"","durationText":""},
    }
  },
  components: {
  },
  created() {
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    getVisitors: function(date) {
      var pid = this.$route.query.pid;
      Indicator.open('加载中...');
      ///li/prospectuses/{prospectusId}/visitors
      axiosGetAPI('li/prospectuses/'+pid+'/visitors').then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.visitorsData = res.result;
          this.lengths = this.visitorsData.length
          this.hasVisitorsData = (this.lengths > 0);
        } else {
          this.hasVisitorsData = false;
        }
      });
    },
  },
  mounted() {
    this.getVisitors();
  },
}

</script>
<style scoped>
.cust-list .ico-call {
  position: absolute;
  top: 22%;
  right: 8%;
  display: block;
  width: 32px;
  height: 32px;
  font-size: 32px;
  border-radius: 50%;
}

.mint-header-button .icon-icon-add {
  font-size: 18px;
}

.down {
  height: 40px;
  text-align: center;
}

.down img {
  width: 35px;
  height: 35px;
  margin-top: 5px
}

.vwrppera {
  width: 100%;
  /* height: 100%; */
  overflow:auto;
}

.textshow {
  margin-top: 15px;
  color: #999999
}

</style>
