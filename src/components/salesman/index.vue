<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="我的收入">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right">
        <p style="color:#6b89fb;font-size:14px;" @click="toAccountCord">结算记录</p>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-bottom:5px">
      <div class="performanceItem" @click="topersonalIncome">
        <p style="color:#333;font-size:12px;font-weight:600">已付款金额(元)：{{fees.accumulatedIncome.toFixed(2)}}</p>
        <van-icon name="arrow"></van-icon>
      </div>
      <div style="background: #fff;padding: 15px;  border-bottom: 1px solid #eee;">
        <p>待结算费用(元)：</p>
        <div style="display: flex;justify-content: space-between;align-items: center;margin: 10px 0;">
          <p style="font-size: 24px;color:#333333;font-weight: bold;">{{fees.unSettleFee.toFixed(2)}}</p>
          <div @click="toincomeAccount" class="countBtn">结算</div>
        </div>
        <ul class="brokerage">
          <li v-for="item in fees.fees">
            <p>{{item.key}}(元)：</p>
            <p>{{item.value}}</p>
          </li>
        </ul>
        <div style="display:flex;justify-content: space-between;align-items: center;margin: 15px 0;">
          <span>
            <p>待审批费用(元)：</p>
            <p style="font-weight: bold;">{{fees.settleFee.toFixed(2)}}</p>
          </span>
          <span>
            <p > 已审批待付款费用(元)：</p>
            <p style="font-weight: bold;">{{fees.checkedFee.toFixed(2)}}</p>
          </span>    
        </div>
      </div>
    </div>
    <div class="chooseTime">
      <van-icon name="arrow-left" color="#4A66FE" @click="timeleft" />
      <p style="display:flex;font-size:12px;color:#333;font-weight:bold;height:30px;justify-content: center;align-items: center;">{{chooseTime}}年</p>
      <van-icon v-show="chooseTime < year" color="#4A66FE" @click="timeright" name="arrow" />
    </div>
    <div id="outbillNum" style="width: 100%;height: 240px;background: #FFFFFF;"></div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import router from './../../router';
import echarts from "echarts";
import store from './../../store/store';
export default {
  name: 'home',
  data() {
    return {
      fees: {
        accumulatedIncome: 0.00,
        fees: {},
        settleFee: 0.00,
        unSettleFee: 0.00,
      },
      IncomeGraph: [],
      xData: [],
      yData: [],
      salesmanId: '',
      chooseTime: '',
      year: '',
    }
  },
  created: function() {
    var date = new Date();
    this.year = date.getFullYear();
    this.chooseTime = date.getFullYear();
    if (sessionStorage.getItem('salesmanId')) {
      this.salesmanId = sessionStorage.getItem('salesmanId');
    }
    var url = '/Salesmans/' + this.salesmanId + '/Incomes/Summary';
    Indicator.open('加载中...');
    axiosGetAPI(url).then(res => {
      Indicator.close();
      if (res.result) {
        this.fees = res.result;
      }
    });
    this.getdataAnalyza('2019');
  },
  mounted() {
  },
  methods: {
    openBack: function() {
      this.$router.push({ path: '../myInfo/myIndex' });
    },
    getdataAnalyza(year) {
      var _url = "Salesmans/Incomes/" + this.salesmanId + "/Graph?year=" + year;
      Indicator.open('加载中...');
      axiosGetAPI(_url).then(res => {
        if (res.result.length > 0) {
          Indicator.close();
          this.IncomeGraph = res.result;
          var xData = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            carData = [],
            lifeData = [],
            bonusData = [],
            carName,
            lifeName,
            bonusName;
          res.result.map(item => {
            if (item.name == "车险佣金") {
              item.items.map(_item => {
                carData.push(_item.value);
              })
            }
            if (item.name == "寿险佣金") {
              item.items.map(_item => {
                lifeData.push(_item.value);
              })
            }
            if (item.name == "分销奖金") {
              item.items.map(_item => {
                bonusData.push(_item.value);
              })
            }

          })
          carName = "车险佣金";
          lifeName = "寿险佣金";
          bonusName = "分销奖金";
          var v = { carName, lifeName, bonusName, carData, lifeData, bonusData, xData }
          this.createBar(v)
        }
      })
    },
    timeleft() {
      this.chooseTime = this.chooseTime - 1;
      this.getdataAnalyza(this.chooseTime)
    },
    timeright() {
      var date = new Date();
      var y = date.getFullYear();
      if (this.chooseTime >= y) {
        this.chooseTime = y;
      } else {
        this.chooseTime = this.chooseTime + 1;
      }

      this.getdataAnalyza(this.chooseTime)
    },
    toAccountCord() {
      this.$router.push({ path: 'accountCord' });
    },
    toincomeAccount() {
      this.$router.push({ path: 'incomeAccount' });
    },
    topersonalIncome() {
      this.$router.push({ path: 'allIncome' });

    }, // 柱状图函数
    createBar(v) {
      // var self = this;
      // console.log(xData)
      let myChart = echarts.init(document.getElementById('outbillNum'));
      var options = {
        title: {
          text: "收入走势(元/月)",
          x: 10,
          y: 10,
          textStyle: {
            color: '#333',
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: 600,
            fontSize: 16,
            fontFamily: 'Microsoft YaHei'
          }
        },
        color: ['#389fff', '#3171ed', '#fcaa49'],
        tooltip: {
          // trigger: 'axis',
        },
        axisLabel: {
          margin: 2,
          formatter: function(value, index) {
            if (value >= 10000 && value < 10000000) {
              value = value / 10000 + "万";
            } else if (value >= 10000000) {
              value = value / 10000000 + "千万";
            }
            return value;
          },
        },
        grid: {
          left: 10,
          right: 15,
          bottom: 15,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          scale: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#b0b0b0', //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            },
          },
          axisLine: {
            lineStyle: {
              color: "#eeeeee",
            }
          },
          data: v.xData,
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#eee",
            }
          },
          axisLabel: {
            formatter: function(value, index) {
              if (value >= 10000 && value < 10000000) {
                value = value / 10000 + "万";
              } else if (value >= 10000000) {
                value = value / 10000000 + "千万";
              }
              return value;
            },
            textStyle: {
              color: '#b0b0b0', //更改坐标轴文字颜色
              fontSize: 14 //更改坐标轴文字大小
            }
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#eee', '#e1e1e1']
            },
          },
          splitNumber:6,
        },
        series: []
      };
      var serie1 = {name: v.carName, data: v.carData, type: 'bar', barWidth: 10,};
      var serie2 = {name: v.lifeName, data: v.lifeData, type: 'bar', barWidth: 10,};
      var serie3 = {name: v.bonusName, data: v.bonusData, type: 'bar', barWidth: 10,};
      var series = [];

      if (v.carData && v.carData.length > 0) {
        series.push(serie1);
      }
      if (v.lifeData && v.lifeData.length > 0) {
        series.push(serie2);
      }
      if (v.bonusData && v.bonusData.length > 0) {
        series.push(serie3);
      }
      options.series = series;
      // 绘制图表
      myChart.setOption(options);
    }
  }
}

</script>
<style scoped>
.performanceItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.chooseTime {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  background: #fff;
  margin-top: 20px;
  padding: 10px 0;
}

.chooseTime p {
  background: #F2F2F2;
  width: 65px;
  text-align: center;
  line-height: 20px;
  margin: 0 10px;
}

.performanceItem p {
  color: #333;
  font-size: 14px;
}

.countBtn {
  padding: 7px 20px;
  background: #f94037;
  color: #fff;
  border-radius: 5px;
}

.brokerage {
  /*  display: flex;
  justify-content: space-between; */
  background: #fff;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.brokerage li {
  display: flex;
  margin: 10px 0;
}

.brokerage li p:nth-child(1) {
  color: #666;
  font-size: 12px;
  margin-right: 10px;
}

.brokerage li p:nth-child(2) {
  color: #333;
  font-size: 14px;
  text-align: center
}

</style>
