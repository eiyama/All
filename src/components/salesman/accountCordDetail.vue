<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="结算记录详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;background: #fff;">
      <div class="accountStatus">
        <p style="text-align: center;color: #999999;">结算金额</p>
        <span class="incomeAmount">
          <p style="color:#333333;font-size: 32px; ">{{Settlements.amount}}</p>元
        </span>
        <span class="incomeAmount" v-show="Settlements.estimatedTax" >
          <p style="color:#666;font-size: 14px;line-height: 30px; ">预计/估算税额：{{Settlements.estimatedTax}}元</p>
        </span>
        <span class="incomeAmount" v-show="Settlements.packageNo">
           <p style="color:#666;font-size: 14px; ">结算编号: {{Settlements.packageNo}}</p>
        </span>
        <span v-show="showAlllength" @click="toincomeDetail" style="display: flex;justify-content: center;align-items: center;margin-top:5px">
          <p>共{{totalCount}}条费用</p> <van-icon color="#999" name="arrow" />
          </span>
        <van-steps class="accountStep" direction="vertical" :active="active">
          <van-step v-for="(item, index) in Settlements.statuses" :key="index">
            <h3 v-if="item.status != 'Reject'">{{item.statusDisplay}}</h3>
            <p style="margin: 5px 0;" v-if="item.status != 'Reject'">{{item.createdTime}}</p>
            <h3 style="color:#FF7272" v-if="item.status == 'Reject'">结算申请被打回</h3>
            <p style="color:#FF7272" v-if="item.status == 'Reject'">打回理由：{{item.remark}}</p>
          </van-step>
        </van-steps>
        <!-- <van-steps class="accountStep" direction="vertical" :active="active">
          <van-step>
            <h3>结算打包</h3>
            <p style="margin: 5px 0;">{{Settlements.createdTime}}</p>
          </van-step>
          <van-step>
            <h3>结算申请待审核</h3>
            <p style="margin: 5px 0;">{{Settlements.createdTime}}</p>
          </van-step>
          <van-step v-if="Settlements.status == 'Checked' || Settlements.status == 'Paid' ">
            <h3>结算申请已审核 - 待转账</h3>
            <p style="margin: 5px 0;">{{Settlements.settleDate}}</p>
          </van-step>
          <van-step v-if="Settlements.status == 'Reject'">
            <h3 style="color:#FF7272">结算申请被打回</h3>
            <p style="color:#FF7272">打回理由：{{Settlements.reviewRemark}}</p>
          </van-step>
          <van-step v-if="Settlements.status == 'Paid'">
            <h3>已转账</h3>
            <p style="margin: 5px 0;">{{Settlements.settleDate}}</p>
            <p>请留意您的银行账户到账情况。如有问题请联系客服</p>
          </van-step>
        </van-steps> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui';
import {
  axiosGetAPI,
  axiosPostAPI
} from './../../common/Axios';
import {
  Indicator
} from 'mint-ui';
import router from './../../router';
import store from './../../store/store';
export default {
  data() {
    return {
      active: 0,
      settleAmount: 0,
      checkStatusDescription: '',
      settleDate: '',
      reviewRemark: '',
      Settlements: {},
      packageId: '',
      totalCount: 0,
      showAlllength: false,
      feeType: '',
      packageNo:''
    }
  },
  created: function() {
    if (this.$route.query.isShow) {
      this.showAlllength = true;
    }
    if (sessionStorage.getItem('salesmanId')) {
      this.salesmanId = sessionStorage.getItem('salesmanId');
    };
    if (this.$route.query.settleAmount) {
      this.settleAmount = this.$route.query.settleAmount;
    }
    if (this.$route.query.packageId) {
      this.packageId = this.$route.query.packageId;
    }
    if(this.$route.query.packageNo){
      this.packageNo = this.$route.query.packageNo
    }
    // if (this.$route.query.settleDate) {
    //   this.settleDate = this.$route.query.settleDate;
    // }
    // if (this.$route.query.reviewRemark) {
    //   this.reviewRemark = this.$route.query.reviewRemark;
    // }
    this.getSettlements();
    if(this.showAlllength){
      this.getAccount();
    }
  },

  methods: {
    openBack: function() {
      this.$router.push({ path: 'index' })
    },
    getAccount(feeType) {
      this.Incomes = [];
      Indicator.open('加载中...');
      axiosGetAPI('/Settlements/' + this.packageId + '/Fees?limit=10').then(res => {
        Indicator.close();
        if (res.result) {
          this.totalCount = res.page.totalRows;
        }
        axiosGetAPI('/Settlements/' + this.packageId + '/Adjustments?limit=10').then(res => {
          console.log(res);
          if (res.result) {
            this.totalCount += res.page.totalRows;
          }
        })
      })
      
    },
    toincomeDetail() {
      this.$router.push({ path: '/salesman/accountCordFeeList?itemId=' + this.packageId})
    },
    getSettlements() {
      var url = '/Settlements/' + this.packageId;
      Indicator.open('加载中...');
      axiosGetAPI(url).then(res => {
        Indicator.close();
        if (res.result) {
          this.Settlements = res.result;
          this.active = (this.Settlements.statuses ? this.Settlements.statuses.length - 1 : 0);
        }
      })
    },
  }
}

</script>
<style scoped>
.accountStatus {
  padding: 50px 0px;
}

.accountStatus h3 {
  font-size: 16px;
  color: #333333;
  font-weight: normal;
}

.accountStep p {
  font-size: 14px;
  color: #999999;
  /* margin-top:10px; */
}

.incomeAmount {
  display: flex;
  justify-content: center;
  align-items: baseline;

}

</style>
