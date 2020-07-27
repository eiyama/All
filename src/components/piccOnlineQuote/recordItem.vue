<template>
  <div class="home">
    <mt-header fixed class="def-header cust-head" title="人保报价记录">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <mt-button slot="right" @click="openone"><img :src="searchImg" style="height:24px;margin-top:8px" /></mt-button>
    </mt-header>
    <hr width="100%" color="#f5f5f5" size="1" style="padding-top:48px" />
    <div ref="wrppera" :style="rbwrppera">
      <div class="quota-content">
        <div class="rbpolicy" v-for="item in recodeDatas" @click="toRecordDetail(item,$event)" v-show="!noData">
          <div class="rbpolicyTitle">
            <div style="width: 65%;">
              <h3>{{item.plateNo ? item.plateNo : item.vin}}-{{item.carOwnerName}}</h3>
              <p>{{item.insuredTime}}</p>
            </div>
            <div style="display: flex;align-items: center;">
              <img slot="icon" src="../../assets/images/companys/picc.png" width="24" height="24" />
              <span style="margin-left:5px">中国人保</span>
            </div>
            <van-icon name="arrow"></van-icon>
          </div>
          <div class="bzBox" v-show='item.bzInsureNo'>
            <h3>交强险投保单号：</h3>
            <p>{{item.bzInsureNo}}</p>
          </div>
          <div class="bzBox" v-show='item.bzPolicyNo'>
            <h3>交强险保单号：</h3>
            <p>{{item.bzPolicyNo}}</p>
          </div>
          <div class="bzBox" v-show='item.bsInsureNo'>
            <h3>商业险投保单号：</h3>
            <p>{{item.bsInsureNo}}</p>
          </div>
          <div class="bzBox" v-show='item.bsPolicyNo'>
            <h3>商业险保单号：</h3>
            <p>{{item.bsPolicyNo}}</p>
          </div>
        </div>
        <div class="non-data" v-show="noData">
          <img src="../../assets/images/icon-nothing.png">
        </div>
        <div class="down">
          <img :src="srcitem" v-show="imgshow">
          <p v-show="textshow" class="textshow">无更多数据</p>
        </div>
      </div>
    </div>
    <van-popup v-model="showQuery" position="bottom">
      <div style="height: 100%;width: 100%;">
        <mt-header class="def-header" title="查询保单">
          <div slot="left">
            <mt-button style="font-size:15px;color:#f94037" @click="closeone(false)">取消</mt-button>
          </div>
          <div slot="right">
            <mt-button style="font-size:15px;color:#f94037" @click="closeone(true)">确定</mt-button>
          </div>
        </mt-header>
        <hr width="100%" color="#f5f5f5" size="1" />
        <div class="mint-region" style="color:#FC3738;padding:10px">
          <mt-field class="mint-formItm upper" label="车主名" :disabled="true">
            <input class="mint-input" type="text" v-model="carOwnerName" placeholder="输入车主名">
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
          <mt-field label="车牌号" class="upper" type="text" :disabled="isNonPlateNo" placeholder="输入车牌号" v-model="plateNo">
            <mt-switch @change="turn" v-model="isNonPlateNo">未上牌</mt-switch>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
          <mt-field class="mint-formItm upper" label="车架号" :disabled="true">
            <input class="mint-input" type="text" v-model="vin" placeholder="输入车架号">
          </mt-field>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import bottomTab from './../bottomtab/bottom-tab'
import store from './../../store/store'
import * as types from './../../store/types';
import BScroll from 'better-scroll';

export default {
  data() {
    return {
      recodeDatas: [{
          "id": "",
	      "insCityName": "",
	      "bzBeginDate": "",
	      "bsBeginDate": "",
	      "bzEndDate": "",
	      "bsEndDate": "",
	      "insureNo": "",
	      "bzInsureNo": "",
	      "bsInsureNo": "",
	      "bzPolicyNo": "",
	      "bsPolicyNo": "",
	      "plateNo": "",
	      "vin": "",
	      "carOwnerName": "",
	      "premium": "",
	      "bzPremium": "",
	      "bsPremium": "",
	      "totalTax": "",
	      "accidentInsurancePremium": "",
	      "payUrl": "",
	      "insuredTime": "",
	      "sellerName": "",
	      "organName": "",
	      "insureStatus": "",
	      "insureStatusDisplay": "",
	      "creatorName": "",
	      "modifiedTime": ""
        }
      ],
      title: '报价单',
      imgages: '',
      lengths: '',
      limit: 10,
      imgshow: false,
      textshow: false,
      searchImg: this.src = require('../../assets/images/ico-search.png'),
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      noData: true,
      rbwrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
      },
      showQuery: false,
      isNonPlateNo: false,
      plateNo: '',
      vin: '',
      carOwnerName: '',
    }
  },
  created: function() {
    Indicator.open("加载中...");
    axiosGetAPI('/vi/piccWap/applications').then(res => {
    	Indicator.close();
        if (res.result && res.result != '') {
          this.noData = false;
          this.recodeDatas = res.result;
          this.lengths = this.recodeDatas.length
          if (res.page.totalRows == 0) {
            this.textshow = false;
            this.imgshow = false;
          } else if (this.lengths == res.page.totalRows) {
            this.textshow = true;
            this.imgshow = false;
          } else {
            this.imgshow = true;
          }
        } else {
          this.textshow = false;
          this.imgshow = false;
        }
    })
    
  },
  methods: {
    turn: function() { // 是否未上牌
      var self = this;
      self.changeCard();
    },
    changeCard: function() { // 有无车牌处理函数
      var self = this;
      self.inputPlateNo = !self.isNonPlateNo;
      if (!self.isNonPlateNo) {
        self.plateNo = "";
      } else {
        self.plateNo = "暂未上牌";
      }
    },
    closeone: function(flag) {
      var self = this;
      self.showQuery = false;
      if (flag) {
        var url = '/piccOnlineQuote/search';
        if (self.plateNo || self.vin || self.carOwnerName) {
          if (self.plateNo) {
            url = url + "?plateNo=" + self.plateNo;
            if (self.vin) {
              url = url + "&vin=" + self.vin;
            }
            if (self.carOwnerName) {
              url = url + "&carOwnerName=" + self.carOwnerName;
            }
          } else if (self.vin) {
            url = url + "?vin=" + self.vin;
            if (self.carOwnerName) {
              url = url + "&carOwnerName=" + self.carOwnerName;
            }
          } else if (self.carOwnerName) {
            url = url + "?carOwnerName=" + self.carOwnerName;
          }
        } else {
          Toast('请至少选择一个查询条件');
          return;
        }
        self.$router.push({ path: url });
      }
    },
    openone: function() {
      this.showQuery = true;
      this.carOwnerName = '';
      this.isNonPlateNo = false;
      this.plateNo = '';
    },
    initHeight: function() {
      this.rbwrppera.height = window.innerHeight - 44 + 'px';
    },
    refresh() {
      this.contentScroll.refresh();
    },
    openBack: function() {
      window.history.back();
    },
    toRecordDetail:function(item) {
      this.$router.push({ path: '/piccOnlineQuote/recordDetail?itemId=' + item.id });
    },
    refresh() {
      this.contentScroll.refresh();
    },
  },
  mounted() {
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
      } else if (y <= maxY) {
        if (this.lengths == null || this.lengths == '') {
          return;
        };
        var lengths = this.lengths
        var limit = 10;
        var url = "/vi/piccWap/applications";
        var param = { offset: this.lengths, limit: limit }
        this.imgshow = true;
        axiosGetAPI(url, param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.recodeDatas = [...this.recodeDatas, ...res.result];
            this.lengths = this.recodeDatas.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
            } else {
              if (this.lengths < res.page.totalRows) {
                this.imgshow = true;
                this.recodeDatas = [...this.recodeDatas, ...res.result];
              } else {
                this.recodeDatas = [...this.recodeDatas];
                this.textshow = true;
                this.imgshow = false;
              };
            }
          } else {
            this.textshow = true;
            this.imgshow = false;
          }
        });
        this.$nextTick(() => {
          this.contentScroll //更新滚动视图
        })
      }
    })
  }
}

</script>
<style scoped>
.rbpolicy {
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
  background-color: white;
}

.down {
  height: 40px;
  text-align: center;
  /* background: #FFFFFF */
}

.down img {
  width: 35px;
  height: 35px;
  margin-top: 5px
}

.textshow {
  margin-top: 5px;
  color: #878484
}

.rbpolicyTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.rbpolicyTitle h3 {
  font-size: 14px;
  color: #333333;

}

.rbpolicyTitle p {
  font-size: 14px;
  color: #333333;
}

.bzBox {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bzBox h3 {
  font-size: 13px;
  color: #666666;
  font-weight: normal;
}

.bzBox p {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}

</style>