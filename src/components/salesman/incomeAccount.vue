<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="费用结算">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;">
      <div style="display:flex;background: #fff;">
        <mt-navbar v-model="activeName" style="width:90%;min-height: 30px;">
          <!--         <mt-tab-item id="1">
            <span class="item-click" @click="allType">全部</span>
          </mt-tab-item> -->
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
      <div v-if="Incomes.length > 0" class="countDetail">
        <ul>
          <li v-for="(item,index) in Incomes" :key="index">
            <van-checkbox-group v-model="checkModel" v-show="activeName != '2'">
              <van-checkbox :key="item.id" :name="item.id">
              </van-checkbox>
            </van-checkbox-group>
            <!-- @click="toIncomeDetail(item)" -->
            <div class="itemBox" @click="toIncomeDetail(item)">
              <p style="color:#a0a0a0;font-size:12px;">{{item.feeTime}}</p>
              <div class="bonus">
                <p>{{item.feeTypeDescription}}-{{item.description}}</p>
                <p>{{item.amount}}元</p>
              </div>
              <span class="owner">
                <p style="color:#a0a0a0;font-size:12px;">{{item.plateNo}}&nbsp;- &nbsp;{{item.insuredName}}&nbsp;|&nbsp;{{item.insKindDescription}} </p>
                <!-- <p v-show="item.plateNo">{{item.plateNo}}-</p>
                <p style="padding-right:10px;max-width: 120px;word-break: break-all;">{{item.insuredName}}</p>
                <p v-show="item.insKindDescription"> | </p>
                <p style="padding: 0 10px;">{{item.insKindDescription}}</p> -->
              </span>
            </div>　　
          </li>
        </ul>
      </div>
      <div class="noData" v-else>
        <img src="../../assets/images/icon-nothing.png">
      </div>
    </div>
    <div v-show="this.Incomes.length > 0 && activeName != '2'" class="fooer-box">
      <div class="allChoose">　
        <!-- 　<input type="checkbox" @click="checkAll"  v-model="checked">
        　　<span>全选</span> -->
        <van-checkbox @click="checkAll" v-model="checked">全选</van-checkbox>
      </div>
      <div @click="nextBtn" class="nextBtn">下一步</div>
    </div>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui';
import {
  axiosGetAPI,
  axiosPostAPI,
  axiosPutAPI
} from './../../common/Axios';
import {
  Indicator
} from 'mint-ui';
import router from './../../router';
import store from './../../store/store';
import VueEvent from './../../common/event';
export default {
  data() {
    return {
      activeName: '1',
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
      feeType: 'CarCommission',
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
    toIncomeDetail(item) {
      console.log(this.Incomes);
      var query = '?feeId=' + item.id + '&feeType=' + item.feeType
      this.$router.push({
        path: 'incomeDetail' + query
      })
    },
    carFee() {
      this.getAccount('CarCommission');
    },
    lifeFee() {
      this.getAccount('LifeCommission');
    },
    recommendFee() {
      this.getAccount('Bonus');
    },
    getAccount(feeType) {
      this.Incomes = [];
      this.feeType = feeType;
      if (feeType == '') {
        var url = '/Salesmans/' + this.salesmanId + '/Incomes';
      } else {
        var url = '/Salesmans/' + this.salesmanId + '/Incomes?feeType=' + feeType + '&isSettled=' + false + '&limit=50';
      }
      Indicator.open('加载中...');
      axiosGetAPI(url).then(res => {
        Indicator.close();
        if (res.result) {
          this.Incomes = res.result;
          for (var i = 0; i < res.result.length; i++) {
            this.Incomes[i].amount = (res.result[i].amount * 1).toFixed(2)
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
      for (var j = 0; j < this.checkModel.length; j++) {
        for (var i = 0; i < this.Incomes.length; i++) {
          if (this.checkModel[j] == this.Incomes[i].id) {
            var obj = {};
            obj.id = this.Incomes[i].id;
            obj.feeType = this.Incomes[i].feeType;
            obj.amount = this.Incomes[i].amount;
            settleFeeIds.push(obj);
          }
          // console.log( settleFeeIds)
        }
      }

      if (settleFeeIds.length > 0) {
        sessionStorage.setItem('settleFeeIds', JSON.stringify(settleFeeIds));
        this.$router.push({ path: 'personalIncome' });
      } else {
        Toast({
          message: '请选择要结算的单',
          position: 'center',
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
          var url = '/Salesmans/' + this.salesmanId + '/Incomes?feeType=' + this.feeType + '&isSettled=' + false + '&limit=50';
        }
        Indicator.open('加载中...');
        axiosGetAPI(url).then(res => {
          Indicator.close();
          if (res.result) {
            this.showTime = false;
            this.Incomes = res.result;
          }
        });
      } else{
        if (this.beginValue == '') {
          Toast({
            message: '输入起始时间'
          })
          return;
        }
        if (this.endValue == '') {
          Toast({
            message: '输入截止时间'
          })
          return;
        }
        if (this.endValue < this.beginValue) {
          Toast({
            message: '起始时间不能大于截止时间'
          })
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

.countDetail {
  margin-bottom: 60px;
}

.countDetail ul {
  width: 100%;
}

.countDetail ul li {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eeeeee;
  margin: 10px;
  border-radius: 5px;
  background: #fff;
}

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
  margin-left: 10px;
  width: 95%;
}

.bonus {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333333;
}

/* .owner {
  display: flex;
  color: #999999;
  font-size: 14px;
  align-items: center;
} */

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
  background: #fff;
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
