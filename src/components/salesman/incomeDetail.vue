<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="费用详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;">
      <div class="aboutIncome">
        <p style="font-size: 12px;color:#999;">费用产生时间:{{incomeRes.feeTime}}</p>
        <div class="incomeTitle">
          <h3>{{incomeRes.feeTypeDescription}}</h3>
          <p v-show="incomeRes.description">{{incomeRes.description}}</p>
        </div>
        <span class="income_Money">
          <p>￥</p>
          <p class="incomeMoney">{{incomeRes.amount}}</p>
          <span v-show="incomeRes.feeCalculateDescription">
            <van-icon style="margin-left: 10px;" @click="showFeeCal" v-show="isDown" name="arrow-down"></van-icon>
            <van-icon style="margin-left: 10px;" @click="showFeeCal" v-show="!isDown" name="arrow-up"></van-icon>
          </span>
        </span>
        <p class="from" v-show="isShow && incomeRes.feeCalculateDescription"> = {{incomeRes.feeCalculateDescription}}</p>
      </div>
      <div class="incomeFrom">
        <p style="color: #333;margin: 15px 0;font-size: 14px;font-weight: bold;">详情信息</p>
        <p class="list">投保人：{{incomeRes.insuredName}}</p>
        <p class="list" v-show="feeType!='LifeCommission'">投保车辆：{{incomeRes.vin ? incomeRes.plateNo + " / " + incomeRes.vin : incomeRes.plateNo}}</p>
        <p class="list">投保险种：{{incomeRes.insKindDescription}}</p>
        <!-- <p class="list">账单日期：</p>
        <p class="list">账单日期范围：</p>
        <span class="listItem"><p>本群商业险保费：</p><p style="color:#4A66FE" @click="showPopup('本群商业险保费清单')">2000</p></span>
        <span class="listItem"><p>群主商业险保费：</p><p style="color:#4A66FE" @click="showPopup('群主商业险保费清单')">2000</p></span>
        <p class="list">群主等级：</p>
        <p class="list">本群奖励系数：</p>
        <p class="list">本群成长因子：</p>
        <span class="listItem"><p>子群商业险保费：</p><p style="color:#4A66FE" @click="showPopup('子群商业险保费清单')">2000</p></span>
        <p class="list">子群奖励系数：</p>
        <p>群主奖金（元）：</p> -->
      </div>
       <van-popup v-model="premiumListing" position="bottom" style="height:100%;background:#f9f9f9;">
          <mt-header fixed class="def-header cust-head" :title="popupTitle">
          <div slot="right">
            <!-- <mt-button icon="back" @click="premiumListing = false"></mt-button> -->
            <van-icon name="cross" @click="premiumListing = false" />
          </div>
        </mt-header>
        <div style="margin-top:49px;">
          <span style="display: flex;align-items: center;height: 35px;padding-left: 10px;"><p>保费合计：</p> <p style="font-weight: bold;">20000</p></span>
            <table class="tablePopup">
               <tr style="color:#999">
                  <td> 车牌/车架号 </td>
                  <td> 业务员 </td>
                  <td> 保费（元） </td>
                  <td> 出单日期 </td>
              </tr>
               <tr>
                  <td> 车牌/车架号 </td>
                  <td> 业务员 </td>
                  <td> 保费 </td>
                  <td> 出单日期 </td>
              </tr>   
            </table>
        </div>
        
      </van-popup>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import router from './../../router';
import store from './../../store/store';
export default {
  data() {
    return {
      incomeRes: [],
      salesmanId: '',
      isShow: true,
      isDown: true,
      feeType:'',
      popupTitle:'',
      premiumListing:false,
    }
  },
  created: function() {
    var feeId = this.$route.query.feeId;
    this.feeType = this.$route.query.feeType;
    if (sessionStorage.getItem('salesmanId')) {
      this.salesmanId = sessionStorage.getItem('salesmanId');
    };
    Indicator.open('加载中...');
    // /Salesmans/Incomes/{feeType}/{feeId}/Detail
    axiosGetAPI('Salesmans/Incomes/' + this.feeType + '/' + feeId + '/Detail').then(res => {
      Indicator.close()
      if (res.result) {
        this.incomeRes = res.result;
        this.incomeRes.amount = (res.result.amount * 1).toFixed(2);
      }
    })
  },

  methods: {
    showPopup(title){
      this.premiumListing = true;
      this.popupTitle = title;
    },
    openBack: function() {
      window.history.back();
    },
    showFeeCal() {
      this.isDown = !this.isDown;
      if (this.isShow == true) {
        this.isShow = false;
      } else {
        this.isShow = true
      }
    }
  }
}

</script>
<style scoped>
.aboutIncome {
  padding: 15px;
  background: #FFFFFF;

}

.incomeTitle {
  padding: 15px;
  background: rgba(255, 240, 223, 1);
  border-radius: 10px;
  margin: 20px 0;
}

.incomeTitle h3 {
  color: #E14B23;
  text-align: center;
  font-size: 24px;
  font-weight: normal;
}

.incomeTitle p {
  font-size: 14px;
  color: #F7871A;
  line-height: 20px;
  text-align: center;
}

.incomeMoney {
  /* text-align: center; */
  /* padding-top: 15px; */
  font-size: 36px;
  color: #333333;
}

.income_Money {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.from {
  color: #666;
  padding: 5px 10px;
  background: #f7f7f7;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;
}

.incomeFrom {
  padding: 15px;
  color: #333;
  font-size: 12px;
  background-color: #f2f2f2;
}

.incomeFrom .list {
  line-height: 30px;
}
.listItem{
  display: flex;
  align-items: center;
  line-height: 30px;
}
.tablePopup{
  width: 100%;
}
.tablePopup td{
    width: 25%;
    border: 1px solid #eee;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    background: #FFFFFF;
}


</style>
