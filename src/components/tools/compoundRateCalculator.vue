<template>
  <div style="background-color:#FFF;height:820px">
    <mt-header fixed class="def-header" title="复利计算">
      <div slot="left">
        <mt-button icon="back" @click="openBack" v-show="false"></mt-button>
      </div>
      <div slot="right" @click="closeHome">
        <img :src="closeImg" style="width: 18px;height: 18px;" >
      </div>
    </mt-header>
    <div style="padding-top:48px;text-align:center">
      <van-cell-group>
        <van-field v-model="income" input-align = "center" clearable type="number" label="投资金额 (元)" placeholder="请输入"/>
        <van-field v-model="year" input-align = "center" clearable type="number" label="投资年限 (年)" placeholder="请输入" />
        <van-field v-model="rate" input-align = "center" clearable type="number" label="年化利率 (%)" placeholder="请输入" />
      </van-cell-group>
      <van-button slot="button" size="small" type="danger" @click="calculator" style="margin-top:20px;width:150px">计算</van-button>
      <div style="margin-top:30px;padding:10px;background-color:#f9f9f9">
        <span style="font-size:15px;"></span>
        <table class="mint-table" cellpadding="0" cellspacing="0" style="margin-top:10px">
          <tr style="background-color:#F5F5F5;">
            <td>年度</td>
            <td>当年收入</td>
            <td>利息</td>
            <td>本息</td>
          </tr>
          <tr style="background-color:white;" v-for="item in profits">
            <td>{{item.year}}</td>
            <td>{{item.income}}</td>
            <td>{{item.interest}}</td>
            <td>{{item.principal}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  name: 'defaultPage',
  data() {
    return {
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      income: '',
      year: '',
      rate: '',
      total:'',
      fuLiProfit:'',
      profits:[],
      profit:{"year": "","income": "","interest": "","principal ": ""},
    }
  },
  methods: {
    onBlur: function() {

    },
    openBack: function() {
      window.history.back();
    },
    closeHome: function() {
      window.history.back();
    },
    calculator:function(){
      if (this.income == null || this.income == '') {
        Toast('请输入投资金额');
        return;
      };
      if (this.year == null || this.year == '') {
        Toast('请输入投资年限');
        return;
      };
      if (this.rate == null || this.rate == '') {
        Toast('请输入年化利率');
        return;
      };
      // this.calcProfit(this.income, this.year * 12);
      this.profits = [];
      for (var y = 0; y < this.year; y++) {
        var profit = {"year": "","income": "","interest": "","principal ": ""};
        profit.year = y + 1;
        profit.income = this.income;
        var yearDays = 365;
        var a = function(rate) {
          return rate / yearDays * profit.income;
        };
        var b = function(rate, days) {
          if (days > 1) {
            return a(rate) + b(rate, days - 1);
          } else {
            return a(rate);
          }
        };
        var totalAmt = 0;
        var monthDays = yearDays / 12;
        for (var i = 1; i <= (12 * profit.year); i++) {
          var num = i < 6 ? i : 6;
          var rate = (0.045 + ((num - 1) * 0.005)) * 100 / 100;
          totalAmt += b(rate, monthDays);
        }
        // this.fuLiProfit = this.numFilter(totalAmt);
        profit.interest = this.numFilter(totalAmt);
        profit.principal = this.numFilter(this.numFilter(this.income) + this.numFilter(totalAmt));
        this.profits.push(profit);
      };
      
    },
    calcProfit:function(amt, mons) {
      var totalRate = 0;
      var yearDays = 365;
      var monthDays = yearDays / 12;
      for (var i = 1; i <= mons; i++) {
        var num = i < 6 ? i : 6;
        var rate = (0.045 + ((num - 1) * 0.005)) * 100 / 100;
        totalRate += rate * 10e10 / 10e10;
      }
      this.total = this.numFilter(this.income) + this.numFilter(amt * (totalRate / yearDays * monthDays));
    },
    calcFuLiProfit:function(amt, mons) {
      var yearDays = 365;
      var a = function(rate) {
        return rate / yearDays * amt;
      };
      var b = function(rate, days) {
        if (days > 1) {
          return a(rate) + b(rate, days - 1);
        } else {
          return a(rate);
        }
      };
      var totalAmt = 0;
      var monthDays = yearDays / 12;
      for (var i = 1; i <= mons; i++) {
        var num = i < 6 ? i : 6;
        var rate = (0.045 + ((num - 1) * 0.005)) * 100 / 100;
        totalAmt += b(rate, monthDays);
      }
      this.fuLiProfit = this.numFilter(totalAmt);
      profit.interest = this.fuLiProfit;
      profit.principal = this.numFilter(this.income) + this.numFilter(totalAmt);
    },
    calcFuLiProfit:function(profit) {
      var yearDays = 365;
      var a = function(rate) {
        return rate / yearDays * profit.income;
      };
      var b = function(rate, days) {
        if (days > 1) {
          return a(rate) + b(rate, days - 1);
        } else {
          return a(rate);
        }
      };
      var totalAmt = 0;
      var monthDays = yearDays / 12;
      for (var i = 1; i <= 12; i++) {
        var num = i < 6 ? i : 6;
        var rate = (0.045 + ((num - 1) * 0.005)) * 100 / 100;
        totalAmt += b(rate, monthDays);
      }
      this.fuLiProfit = this.numFilter(totalAmt);
      profit.income
    },
    numFilter:function(value) {
      var realVal = parseFloat(value).toFixed(2)
      // num.toFixed(2)获取的是字符串
      return parseFloat(realVal)
    }
  },
  mounted: function() {}
}

</script>
<style scoped>
.taxmessagecc {
  height: 100%;
  width: 100%;
}

</style>
