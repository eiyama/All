<template>
  <div class="home" style="">
    <mt-header fixed class="def-header cust-head" title="询价记录">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right">
        <!-- <van-icon name="search" @click="search"></van-icon> -->
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-bottom:5px;">
      <mt-navbar v-model="selectedIndex">
        <mt-tab-item id="1">
          <span class="item-click" @click="getRecord('ToBeConfirmed')">待接单</span>
        </mt-tab-item>
        <mt-tab-item id="2">
          <span class="item-click" @click="getRecord('ToBePrice')">待报价</span>
        </mt-tab-item>
        <mt-tab-item id="3">
          <span class="item-click" @click="getRecord('QuotedPrice')">已报价</span>
        </mt-tab-item>
        <mt-tab-item id="4">
          <span class="item-click" @click="getRecord('Reject')">打回修改</span>
        </mt-tab-item>
        <mt-tab-item id="5">
          <span class="item-click" @click="getRecord('')">全部</span>
        </mt-tab-item>
      </mt-navbar>
      <div :style="qwrppera" ref="wrppera">
        <!-- <div v-show="hasData"> -->
        <div style="padding: 10px 0px;">
          <div class="itemBox" v-for="(item, index) in inquiryRecord" @click="toinquiryDetail(item)" :key="index">
            <div class="divBox">
              <h3>{{item.applicantName}}-{{item.productName}}</h3>
              <p>{{item.statusDisplay}}</p>
            </div>
            <div class="divBox">
              <p>询价单号</p>
              <p>{{item.enquiryNo}}</p>
            </div>
            <div class="divBox">
              <p>询价时间</p>
              <p>{{item.modifiedTime}}</p>
            </div>
          </div>
          <div class="qdown">
            <img :src="srcitem" v-show="hasData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </div>
        </div>
        <div class="non-data" v-show="inquiryRecord.length <= 0">
          <img src="../../assets/images/icon-nothing.png">
        </div>
      </div>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <div class="chooseTime">
        <p style="font-size:16px;font-weight:600;color:#333">询价人</p>
        <div style="display: flex;align-items: center;margin-top: 20px;">
        </div>
      </div>
      <div class="popupBtn" style="display: flex;">
        <!-- <p @click="">重置</p>
        <p @click="">确定</p> -->
      </div>
    </van-popup>
  </div>
</template>
<script>
import {
  axiosGetAPI,
  axiosPostAPI,
} from './../../common/Axios';
import {
  Indicator,
  Toast
} from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';
export default {
  // name: 'home',
  data() {
    return {
      inquiryRecord: [],
      totalRows: "",
      selectedIndex: '1',
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      qwrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",

        // "background-color": "#F5F5F5",
      },
      lengths: '',
      imgshow: false,
      textshow: false,
      hasData: false,
      showTime: false,
      creatorId: '',
      url: '',
      hasMore: false,
    }
  },
  created: function() {
    this.creatorId = sessionStorage.getItem('userIds');
    this.getRecord('ToBeConfirmed')
    this.initHeight();
  },
  mounted() {
    var self = this;

    const contentScroll = new BScroll(this.$refs.wrppera, {
      probeType: 3,
      click: true
    });
    this.contentScroll = contentScroll
    //开始滚动前，更新视图大小
    contentScroll.on("beforeScrollStart", () => {
      this.refresh();
    })
    contentScroll.on("scrollEnd", () => {
      var maxY = contentScroll.maxScrollY;
      var y = contentScroll.y
      if (y >= maxY + 40) {} else if (y < maxY + 40 && y > maxY) {
        contentScroll.scrollTo(0, maxY + 70, 200);
      } else if (y <= maxY && this.hasMore) {
        if (this.lengths == null || this.lengths == '') {
          // this.hasData = false;
          return;
        };

        var lengths = this.lengths
        var limit = 10;
        var url = this.url;
        var param = { offset: this.lengths, limit: limit }
        this.imgshow = true;

        axiosGetAPI(url, param).then((res) => {
          Indicator.close();
          if (res.result && res.result.length > 0) {
            self.hasMore = res.page.hasMore;
            self.imgshow = false;
            self.hasData = true;
            self.textshow = false;
            self.lengths = self.inquiryRecord.length;
            self.inquiryRecord = [...self.inquiryRecord, ...res.result];
          } else {
            self.textshow = true;
            self.imgshow = false;
            self.hasData = false;
          }
        });
        self.$nextTick(() => {
          self.contentScroll //更新滚动视图
        })
      }
    })
  },
  methods: {
    getRecord(types) {
      this.textshow = false;
      Indicator.open('正在加载数据，请稍等...');
      this.url = '/enquiry/policies' + '?creatorId=' + this.creatorId + '&status=' + types;
      axiosGetAPI(this.url).then(res => {
        Indicator.close();
        if (res.result) {
          this.hasMore = res.page.hasMore;
          this.hasData = (res.result.length > 0);
          this.inquiryRecord = res.result;
          this.lengths = res.result.length;
          console.log(res.result)
        }
      });
    },
    openBack: function() {
      // window.history.back();
      this.$router.push({ path: '/myInfo/myIndex' })
    },
    initHeight: function() {
      this.qwrppera.height = window.innerHeight - 50 + 'px';
    },
    refresh() {
      this.contentScroll.refresh();
    },
    search() {
      this.showTime = true;
    },
    toinquiryDetail(item) {
      this.$router.push({ path: "inquiryDetail?id=" + item.id });
    }
  }
}

</script>
<style scoped>
.itemStatus {
  display: flex;
}

.chooseTime {
  min-height: 130px;
  padding: 15px;
}

.itemBox {
  margin: 10px;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
}

.divBox {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.divBox h3 {
  font-size: 15px;
  color: #333;
  font-weight: 600;
}

.divBox p {
  font-size: 13px;
  color: #666;
  font-weight: normal;
}


.qdown {
  height: 40px;
  text-align: center;
}

.qdown img {
  width: 35px;
  height: 35px;
  margin-top: 5px
}

.popupBtn p {
  width: 48%;
  height: 18px;
  padding: 12px 0;
  text-align: center;
  background: #f2f2f2;
  margin: 5px;
  border-radius: 5px;
  color: #0070D3
}

</style>
