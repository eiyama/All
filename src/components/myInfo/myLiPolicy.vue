<template>
  <div style="background-color: #FFF;">
    <mt-header fixed class="def-header cust-head" title="我的保单">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div ref="wrppera" class="wrppera">
      <ul class="cust-list mint-region" v-show="!noData" style="margin-top: 25px">
        <li class="mint-cell" v-for="item in policiesData" @click="policyDetail(item,$event)">
          <div>
            <div style="float: left;width:60%">
              <p style="font-size: 15px;color:#333">产品名称：{{item.productName}}</p>
              <p style="font-size: 13px;color:#666">投保单号：{{item.quotationNo}}</p>
              <p style="font-size: 13px;color:#666">合同号：{{item.contractNo}}</p>
              <p style="font-size: 13px;color:#666">机构名称：{{item.orgName}}</p>
            </div>
            <div style="float: right;width:40%">
              <p style="font-size: 13px;color:#666">保险公司：{{item.insCorpName}}</p>
              <p style="font-size: 13px;color:#666">保单年度：{{item.period}}</p>
              <p style="font-size: 13px;color:#666">销售方式：{{item.salesType}}</p>
              <p style="font-size: 13px;color:#666">保单状态：{{item.statusDisplay}}</p>
            </div>
          </div>
          <i class="ico-arrow"></i>
        </li>
        <li class="down">
          <img :src="srcitem" v-show="noData&&imgshow">
          <p v-show="textshow" class="textshow">无更多数据了</p>
        </li>
      </ul>
      <div class="non-data" v-show="noData">
        <p>暂无保单数据</p>
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
      imgages: '',
      lengths: '',
      limit: 10,
      imgshow: true,
      textshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      policiesData: [{
        "id": "",
        "quotationNo": "",
        "contractNo": "",
        "period": "",
        "salesType": "",
        "salesmanId": "",
        "status": "",
        "productName": "",
        "orgName": "",
        "insCorpName": "",
        "premium": "",
        "statusDisplay": ""
      }],
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      noData: true
    }
  },
  created: function() {
    this.getPolicies();
  },
  methods: {
    refresh() {
      this.contentScroll.refresh();
    },
    openBack: function() {
      window.history.back();
    },
    getPolicies: function() {
      var self = this;
      var salesmanId = sessionStorage.getItem('salesmanId');
      if (salesmanId && salesmanId != 'undefined') {
        Indicator.open('加载中...');
        axiosGetAPI('/Salesmans/' + salesmanId + '/lifePolicies').then((res) => {
          Indicator.close();
          if (res.result && res.result.length > 0) {
            self.noData = false;
            self.policiesData = res.result;

            self.lengths = self.policiesData.length
            if (res.page.totalRows == 0) {
              self.textshow = false;
              self.imgshow = false;
            } else if (self.lengths == res.page.totalRows) {
              self.textshow = true;
              self.imgshow = false;
            } else {
              self.imgshow = true;
            };
          } else {
            self.noData = true;
            self.textshow = false;
            self.imgshow = false;
          }
        });
      } else {
        self.noData = true;
        self.textshow = true;
        self.imgshow = false;
      }

    },
    policyDetail: function(item, e) {
      e.preventDefault();
      var appId = localStorage.getItem("appId");
      var localToken = localStorage.getItem('token');
      if (localToken) {
        localToken = localToken.replace(appId + '_', '');
      }
      var url = "/myInfo/liPolicy/detail?policyId=" + item.id + "&appId=" + appId + "&token=" +
        encodeURIComponent(localToken);
      this.$router.push({ path: url });
    }
  },
  mounted() {
    const contentScroll = new BScroll(this.$refs.wrppera, {
      probeType: 3,
      click: true
    });
    this.contentScroll = this.contentScroll
    //开始滚动前，更新视图大小
    contentScroll.on("beforeScrollStart", () => {
      this.refresh();
    })
    this.contentScroll = contentScroll
    contentScroll.on("scrollEnd", () => {
      var maxY = contentScroll.maxScrollY;
      var y = contentScroll.y
      if (y >= maxY + 40) {} else if (y < maxY + 40 && y > maxY) {
        contentScroll.scrollTo(0, maxY + 70, 200);
      } else if (y <= maxY) {
        var self = this;
        if (self.lengths == null || self.lengths == '') {
          return;
        };
        var lengths = self.lengths
        var limit = self.limit
        var param = { offset: lengths, limit: limit };
        var salesmanId = self.$route.query.salesmanId;
        axiosGetAPI('/Salesmans/' + salesmanId + '/lifePolicies').then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            // self.policiesData=[...self.policiesData, ...res.result];
            self.lengths = self.policiesData.length
            if (res.page.totalRows == 0) {
              self.textshow = false;
              self.imgshow = false;
            } else {
              if (self.lengths < res.page.totalRows) {
                self.imgshow = true;
                self.policiesData = [...self.policiesData, ...res.result];
              } else {
                self.policiesData = [...self.policiesData];
                self.textshow = true;
                self.imgshow = false;
              };
            }
          } else {
            self.textshow = true;
            self.imgshow = false;
          }
        });
        self.$nextTick(() => {
          self.contentScroll //更新滚动视图               
        })
      }
    })

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
  height: 546px;
}

.my-policy {
  min-height: 20px;
}

.my-policy .mint-cell {
  margin-left: 70px;
  font-size: 14px;
  font-size: 14px;
  color: #666
}

.my-policy .my-cell-gray {
  color: #666666;
  font-size: 14px;
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
/*   height: 820px; */
  overflow: auto;
  margin-top: 10px;
}

.textshow {
  margin-top: 5px;
  color: #878484
}

</style>
