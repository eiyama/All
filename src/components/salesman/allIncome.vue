<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="收入明细">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;background: #fff;">
      <div style="display:flex;">
        <mt-navbar v-model="activeName" style="width:90%">
          <mt-tab-item id="1" v-show="canViewCarCommission =='true'">
            <span class="item-click" @click="carFee">车险佣金</span>
          </mt-tab-item>
          <mt-tab-item id="2" v-show="canViewLifeCommission =='true'">
            <span class="item-click" @click="lifeFee">寿险佣金</span>
          </mt-tab-item>
          <mt-tab-item id="3" v-show="canViewRemmendBonu =='true'">
            <span class="item-click" @click="recommendFee">分销奖金</span>
          </mt-tab-item>
        </mt-navbar>
        <div class="filter" @click="filterTime">
          <img src="../../assets/images/filtration.png" style="width:16px" alt="">
        </div>
        <!-- 弹层 -->
        <van-popup v-model="showTime" position="bottom">
          <div class="chooseTime">
            <p style="font-size:16px;font-weight:600;color:#333">出单日期</p>
            <div style="display: flex;align-items: center;margin-top: 20px;">
              <van-field readonly clickable :value="beginValue" placeholder="起始时间" @click="showBegin" class="beginTime" />
              <van-popup v-model="beginDate" position="bottom">
                <van-datetime-picker v-model="currentDate" type="date" @cancel="closebeginTime" @confirm="onbeginTime" />
              </van-popup>
              <p style="margin: 0 15px;color:#999999">-</p>
              <van-field class="beginTime" readonly clickable :value="endValue" placeholder="截止时间" @click="showEnd" />
              <van-popup v-model="endDate" position="bottom">
                <van-datetime-picker v-model="currentend" type="date" @cancel="closeendTime" @confirm="onendTime" />
              </van-popup>
            </div>
          </div>
          <div class="popupBtn" style="display: flex;">
            <p @click="reset">重置</p>
            <p @click="searchResult">确定</p>
          </div>
        </van-popup>
      </div>
      <!-- navbar下面内容 -->
      <div :style="qwrppera" ref="wrppera">
        <div v-if="Incomes.length > 0" class="countDetail">
          <ul>
            <li v-for="(item,index) in Incomes" :key="index">
              <div class="itemBox" @click="toIncomeDetail(item)">
                <p style="font-size: 14px; color: #999;">{{item.feeTime}}</p>
                <div class="bonus">
                  <p>{{item.feeTypeDescription}}-{{item.description}}</p>
                  <span style="display: flex;align-items: center;">
                    <p>{{item.amount}}元</p>
                    <van-icon color="#999" name="arrow"></van-icon>
                  </span>
                </div>
                <span class="owner">
                  <p v-show="item.plateNo">{{item.plateNo}}-</p>
                  <p style="padding-right:10px;">{{item.insuredName}}</p>
                  <p v-show="item.insKindDescription"> | </p>
                  <p style="padding: 0 10px;">{{item.insKindDescription}}</p>
                </span>
              </div>　
            </li>
          </ul>
          <div class="qdown">
            <img :src="srcitem" v-show="hasInsurePoliciesData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </div>
        </div>
        <div class="noData" v-else>
          <img src="../../assets/images/icon-nothing.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  axiosGetAPI,
  axiosPostAPI,
  axiosPutAPI
} from './../../common/Axios';
import {
  Indicator,
  Toast
} from 'mint-ui';
import router from './../../router';
import store from './../../store/store';
import BScroll from 'better-scroll';
import VueEvent from './../../common/event';
export default {
  data() {
    return {
      qwrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background": "#f7f7f7"
      },
      activeName: '1',
      feeType: 'CarCommission',
      showTime: false,
      currentDate: new Date(),
      beginDate: false,
      beginValue: '',
      endValue: '',
      endDate: false,
      currentend: new Date(),
      Incomes: [],
      checked: false, //是否全选
      checkModel: [], //双向数据绑定的数组，我是用的id
      lengths: '',
      imgshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      textshow: false,
      hasInsurePoliciesData: false,
      canViewCarCommission:false,
      canViewLifeCommission:false,
      canViewRemmendBonu:false
    }
  },
  created: function() {
    if (sessionStorage.getItem('salesmanId')) {
      this.salesmanId = sessionStorage.getItem('salesmanId');
    };
    this.canViewCarCommission = sessionStorage.getItem("canViewCarCommission");
    this.canViewLifeCommission = sessionStorage.getItem('canViewLifeCommission');
    this.canViewRemmendBonu = sessionStorage.getItem('canViewRemmendBonu');
    this.carFee();
    this.initHeight();
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
          this.hasInsurePoliciesData = false;
          return;
        };
        var lengths = this.lengths
        var limit = 10;
        var url = '/Salesmans/' + this.salesmanId + '/Incomes' + '?isSettled=' + true;
        // var url = "/vi/customers/CarIn";
        var param = { offset: this.lengths, limit: limit, feeType: this.feeType }
        this.imgshow = true;
        axiosGetAPI(url, param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.imgshow = false;
            this.hasInsurePoliciesData = true;
            this.lengths = this.Incomes.length;

            this.Incomes = [...this.Incomes, ...res.result];
            if (this.Incomes.length >= res.result.totalRows) {
              limit = res.result.totalRows;
              return
            }
          } else {
            this.textshow = true;
            this.imgshow = false;
            this.hasInsurePoliciesData = false;
          }
        });
        this.$nextTick(() => {
          this.contentScroll //更新滚动视图
        })
      }
    })
  },
  watch: {
    checkModel() {
      if (this.checkModel.length == this.Incomes.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },
  methods: {
    // allType() {
    //   this.getAccount('');
    // },
    refresh() {
      this.contentScroll.refresh();
    },
    initHeight: function() {
      this.qwrppera.height = window.innerHeight - 49 + 'px';
    },
    carFee() {
      this.feeType = 'CarCommission'
      this.getAccount('CarCommission');
    },
    lifeFee() {
      this.feeType = 'LifeCommission'
      this.getAccount('LifeCommission');
    },
    recommendFee() {
      this.feeType = 'Bonus'
      this.getAccount('Bonus');
    },
    getAccount(feeType) {
      this.Incomes = [];
      if (feeType == '') {
        var url = '/Salesmans/' + this.salesmanId + '/Incomes';
      } else {
        var url = '/Salesmans/' + this.salesmanId + '/Incomes?feeType=' + feeType + '&isSettled=' + true;
      }
      Indicator.open('加载中...');
      axiosGetAPI(url).then(res => {
        Indicator.close();
        if (res.result) {
          this.Incomes = res.result;
          this.lengths = res.result.length;
          for (var i = 0; i < res.result.length; i++) {
            this.Incomes[i].amount = (res.result[i].amount * 1).toFixed(2);
          }
        }
      })
    },
    checkAll() {
      if (this.checked) {
        this.checkModel = [];
      } else {
        this.Incomes.forEach((item) => {
          if (this.checkModel.indexOf(item.id) == -1) {
            this.checkModel.push(item.id)
          }
        })
      }
    },
    openBack: function() {
      window.history.back();
    },
    nextBtn() {
      var settleFeeIds = [];
      var obj = {};
      for (var i = 0; i < this.Incomes.length; i++) {
        if (this.checkModel[i] == this.Incomes[i].id) {
          obj.id = this.Incomes[i].id;
          obj.feeType = this.Incomes[i].feeType;
          obj.amount = this.Incomes[i].amount;
          settleFeeIds.push(obj);
        }
      }
      if (settleFeeIds.length > 0) {
        sessionStorage.setItem('settleFeeIds', JSON.stringify(settleFeeIds));
        this.$router.push({
          path: 'personalIncome'
        });
      } else {
        Toast({
          message: '请选择要结算的单',
          position: 'bottom',
          duration: 5000
        });
        return;
      }

    },
    filterTime() {
      this.showTime = true;
    },
    showBegin() {
      this.beginDate = true;
    },
    closebeginTime() {
      this.beginDate = false;
    },
    onbeginTime(value) {
      this.beginValue = this.Common.Public.dateString(value);
      this.closebeginTime();
    },
    showEnd() {
      this.endDate = true;
    },
    closeendTime() {
      this.endDate = false;
    },
    onendTime(value) {
      this.endValue = this.Common.Public.dateString(value);
      this.closeendTime();
    },
    toIncomeDetail(item) {
      console.log(this.Incomes);
      var query = '?feeId=' + item.id + '&feeType=' + item.feeType
      this.$router.push({
        path: 'incomeDetail' + query
      })
    },
    reset() {
      this.beginValue = '';
      this.endValue = '';
    },
    searchResult() {
      if (!this.beginValue && !this.endValue) {
        this.Incomes = [];
        if (this.feeType == '') {
          var url = '/Salesmans/' + this.salesmanId + '/Incomes';
        } else {
          var url = '/Salesmans/' + this.salesmanId + '/Incomes?feeType=' + this.feeType + '&isSettled=' + true;
        }
        Indicator.open('加载中...');
        axiosGetAPI(url).then(res => {
          Indicator.close();
          if (res.result) {
            this.showTime = false;
            this.Incomes = res.result;
          }
        });
      } else {
        if (this.beginValue == '') {
          Toast('请输入起始时间');
          return;
        }
        if (this.endValue == '') {
          Toast('请输入截止时间')
          return;
        }
        if (this.endValue < this.beginValue) {
          Toast('起始时间不能大于截止时间')
          return;
        }
        var url = 'Salesmans/' + this.salesmanId + '/Incomes?startDate=' + this.beginValue + '&endDate=' + this.endValue;
        Indicator.open('加载中...');
        axiosGetAPI(url).then(res => {
          Indicator.close();
          if (res.result) {
            this.showTime = false;
            this.Incomes = res.result;
          }
        });
      }
    }

  }
}

</script>
<style scoped>
.beginTime {
  width: 45%;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.countDetail ul {
  width: 100%;
}

.countDetail ul li {
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  background-color: white;
  margin: 10px;
}

/* .countDetail ul li:nth-child(1){
    background: #f2f2f2;
} */

.filter {
  border-left: 1px solid #eee;
  display: flex;
  align-items: center;
  width: 10%;
  justify-content: center;
}

.chooseTime {
  min-height: 100px;
  padding: 15px;
}

.itemBox {
  margin-left: 5px;
  width: 100%;
}

.bonus {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333333;
}

.owner {
  display: flex;
  color: #999999;
  font-size: 14px;
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

.fooer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
}

.popupBtn p {
  width: 48%;
  height: 18px;
  padding: 12px 0;
  text-align: center;
  background: #f2f2f2;
  margin: 5px;
  border-radius: 5px;
  color: #f94037
}

.nextBtn {
  padding: 7px 15px;
  background: #1989fa;
  color: #FFFFFF;
}

.noData {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
