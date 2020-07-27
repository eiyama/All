<template>
  <div>
    <mt-header fixed class="def-header cust-head" title="车险数据看板">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="dataAnalysis_box" style="margin-top:48px;padding-top:5px;padding-bottom:5px;">
      <div class="outbillAll">
        <div class="outbillAll_title">总出单量: {{outbillRes.totalSum}}单</div>
        <div id="outbillNum" style="width: 100%;height: 120px;"></div>
        <ul class="outbillAll_footer">
          <li>
            <p>周环比：</p>
            <span>
              <i v-if="outbillRes.linkRelativeRatioOfWeeks>0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="outbillRes.linkRelativeRatioOfWeeks==0"></i>
              <i v-if="outbillRes.linkRelativeRatioOfWeeks<0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:outbillRes.linkRelativeRatioOfWeeks>0,isColor:outbillRes.linkRelativeRatioOfWeeks<=0}">{{outbillRes.linkRelativeRatioOfWeeks}}%</p>
            </span>
          </li>
          <li>
            <p>月环比：</p>
            <span>
              <i v-if="outbillRes.linkRelativeRatioOfMonths > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="outbillRes.linkRelativeRatioOfMonths == 0"></i>
              <i v-if="outbillRes.linkRelativeRatioOfMonths < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:outbillRes.linkRelativeRatioOfMonths>0,isColor:outbillRes.linkRelativeRatioOfMonths<=0}">{{outbillRes.linkRelativeRatioOfMonths}}%</p>
            </span>
          </li>
        </ul>
      </div>
      <div class="insurance_PremiumAll">
        <div class="insurance_PremiumAll_title">总保费规模: {{insurance_PremiumRes.totalSum}}元</div>
        <div id="insurance_PremiumAll" style="width: 100%;height: 160px;"></div>
        <ul class="insurance_PremiumAll_footer">
          <li>
            <p>周环比：</p>
            <span>
              <i v-if="insurance_PremiumRes.linkRelativeRatioOfWeeks > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="insurance_PremiumRes.linkRelativeRatioOfWeeks == 0"></i>
              <i v-if="insurance_PremiumRes.linkRelativeRatioOfWeeks < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:insurance_PremiumRes.linkRelativeRatioOfWeeks>0,isColor:insurance_PremiumRes.linkRelativeRatioOfWeeks <=0}">
                {{insurance_PremiumRes.linkRelativeRatioOfWeeks}}%</p>
            </span>
          </li>
          <li>
            <p>月环比：</p>
            <span>
              <i v-if="insurance_PremiumRes.linkRelativeRatioOfMonths > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="insurance_PremiumRes.linkRelativeRatioOfMonths == 0"></i>
              <i v-if="insurance_PremiumRes.linkRelativeRatioOfMonths < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:insurance_PremiumRes.linkRelativeRatioOfMonths>0,isColor:insurance_PremiumRes.linkRelativeRatioOfMonths<=0}">{{insurance_PremiumRes.linkRelativeRatioOfMonths}}%</p>
            </span>
          </li>
        </ul>
      </div>
         <div class="outbillTrend">
        <div id="outbillTrend" style="width: 100%;height: 260px;"></div>
      </div>
      <div class="premiumTrend">
        <div id="premiumTrend" style="width: 100%;height: 260px;"></div>
      </div>
	      <div class="serviceChargeAll">
	    <div class="serviceChargeAll_title">总手续费规模: {{serviceChargeRes.totalSum}}元</div>
	    <div id="serviceCharge" style="width: 100%;height: 160px;"></div>
	    <ul class="serviceChargeAll_footer">
	      <li>
	        <p>周环比：</p>
	        <span>
	          <i v-if="serviceChargeRes.linkRelativeRatioOfWeeks > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
	          <i v-if="serviceChargeRes.linkRelativeRatioOfWeeks == 0"></i>
	          <i v-if="serviceChargeRes.linkRelativeRatioOfWeeks < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
	          <p :class="{setColor:outbillRes.linkRelativeRatioOfWeeks>0,isColor:outbillRes.linkRelativeRatioOfWeeks <=0}">
	            {{serviceChargeRes.linkRelativeRatioOfWeeks}}%</p>
	        </span>
	      </li>
	      <li>
	        <p>月环比：</p>
	        <span>
	          <i v-if="serviceChargeRes.linkRelativeRatioOfMonths > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
	          <i v-if="serviceChargeRes.linkRelativeRatioOfMonths == 0"></i>
	          <i v-if="serviceChargeRes.linkRelativeRatioOfMonths < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
	          <p :class="{setColor:serviceChargeRes.linkRelativeRatioOfMonths>0,isColor:serviceChargeRes.linkRelativeRatioOfMonths<=0}">{{serviceChargeRes.linkRelativeRatioOfMonths}}%</p>
	        </span>
	      </li>
	    </ul>
	  </div>


      <div class="dataTabbar_title">
        <h3>总报价次数:{{sumofQuote.totalSum}}次</h3>
        <ul class="dataTabbar_footer">
          <li>
            <p>周环比:&nbsp;</p>
            <span>
              <i v-if="sumofQuote.linkRelativeRatioOfWeeks > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="sumofQuote.linkRelativeRatioOfWeeks == 0"></i>
              <i v-if="sumofQuote.linkRelativeRatioOfWeeks < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:sumofQuote.linkRelativeRatioOfWeeks>0,isColor:sumofQuote.linkRelativeRatioOfWeeks <=0}">
                {{sumofQuote.linkRelativeRatioOfWeeks}}%</p>
            </span>
          </li>
          <li>
            <p>月环比:&nbsp;</p>
            <span>
              <i v-if="sumofQuote.linkRelativeRatioOfMonths > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="sumofQuote.linkRelativeRatioOfMonths == 0"></i>
              <i v-if="sumofQuote.linkRelativeRatioOfMonths < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:sumofQuote.linkRelativeRatioOfMonths>0,isColor:sumofQuote.linkRelativeRatioOfMonths<=0}">{{sumofQuote.linkRelativeRatioOfMonths}}%</p>
            </span>
          </li>
        </ul>
      </div>
      <div class="dataTabbar_title">
        <h3>总报价车辆数: {{sumofCarquote.totalSum}}辆</h3>
        <ul class="dataTabbar_footer">
          <li>
            <p>周环比:&nbsp;</p>
            <span>
              <i v-if="sumofCarquote.linkRelativeRatioOfWeeks > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="sumofCarquote.linkRelativeRatioOfWeeks == 0"></i>
              <i v-if="sumofCarquote.linkRelativeRatioOfWeeks < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:sumofCarquote.linkRelativeRatioOfWeeks>0,isColor:sumofCarquote.linkRelativeRatioOfWeeks <=0}">
                {{sumofCarquote.linkRelativeRatioOfWeeks}}%</p>
            </span>
          </li>
          <li>
            <p>月环比:&nbsp;</p>
            <span>
              <i v-if="sumofCarquote.linkRelativeRatioOfMonths > 0"><img style="height:14px;vertical-align: middle;"  src="../../assets/images/up_icon.png"></i>
              <i v-if="sumofCarquote.linkRelativeRatioOfMonths == 0"></i>
              <i v-if="sumofCarquote.linkRelativeRatioOfMonths < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:sumofCarquote.linkRelativeRatioOfMonths>0,isColor:sumofCarquote.linkRelativeRatioOfMonths<=0}">{{sumofCarquote.linkRelativeRatioOfMonths}}%</p>
            </span>
          </li>
        </ul>
      </div>
      <div class="dataTabbar_title" v-if="(sumofOrder != null && sumofOrder.totalSum != null)">
        <h3>总留修工单数:{{sumofOrder.totalSum}}单</h3>
        <ul class="dataTabbar_footer">
          <li>
            <p>周环比:&nbsp;</p>
            <span>
              <i v-if="sumofOrder.linkRelativeRatioOfWeeks > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="sumofOrder.linkRelativeRatioOfWeeks == 0"></i>
              <i v-if="sumofOrder.linkRelativeRatioOfWeeks < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:sumofOrder.linkRelativeRatioOfWeeks>0,isColor:sumofOrder.linkRelativeRatioOfWeeks <=0}">
                {{sumofOrder.linkRelativeRatioOfWeeks}}%</p>
            </span>
          </li>
          <li>
            <p>月环比:&nbsp;</p>
            <span>
              <i v-if="sumofOrder.linkRelativeRatioOfMonths > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="sumofOrder.linkRelativeRatioOfMonths == 0"></i>
              <i v-if="sumofOrder.linkRelativeRatioOfMonths < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:sumofOrder.linkRelativeRatioOfMonths>0,isColor:sumofOrder.linkRelativeRatioOfMonths<=0}">{{sumofOrder.linkRelativeRatioOfMonths}}%</p>
            </span>
          </li>
        </ul>
      </div>
      <div class="dataTabbar_title" v-if="(sumofsuccessCar != null && sumofsuccessCar.totalSum  != null)">
        <h3>总进店车辆数:{{sumofsuccessCar.totalSum}}辆</h3>
        <ul class="dataTabbar_footer">
          <li>
            <p>周环比: &nbsp;</p>
            <span>
              <i v-if="sumofsuccessCar.linkRelativeRatioOfWeeks > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="sumofsuccessCar.linkRelativeRatioOfWeeks == 0"></i>
              <i v-if="sumofsuccessCar.linkRelativeRatioOfWeeks < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:sumofsuccessCar.linkRelativeRatioOfWeeks>0,isColor:sumofsuccessCar.linkRelativeRatioOfWeeks <=0}">
                {{sumofsuccessCar.linkRelativeRatioOfWeeks}}%</p>
            </span>
          </li>
          <li>
            <p>月环比:&nbsp;</p>
            <span>
              <i v-if="sumofsuccessCar.linkRelativeRatioOfMonths > 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/up_icon.png"></i>
              <i v-if="sumofsuccessCar.linkRelativeRatioOfMonths == 0"></i>
              <i v-if="sumofsuccessCar.linkRelativeRatioOfMonths < 0"><img style="height:14px;vertical-align: middle;" src="../../assets/images/down_icon.png"></i>
              <p :class="{setColor:sumofsuccessCar.linkRelativeRatioOfMonths>0,isColor:sumofsuccessCar.linkRelativeRatioOfMonths<=0}">{{sumofsuccessCar.linkRelativeRatioOfMonths}}%</p>
            </span>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
      <!-- 饼图 -->
      <div class="insurance_Outbill">
        <div id="insurance_Outbill" style="width: 100%;height: 300px;"></div>
      </div>
      <div class="insurance_Premium">
        <div id="insurance_Premium" style="width: 100%;height: 300px;"></div>
      </div>
      <!-- 保险公司出单量排名 -->
      <div class="outOrderRank">
        <h3>当月门店出单量排名</h3>
        <ul>
          <li v-for="item in insuranceRank">
            <p :class="{Rankfirst:item.rankIndex==1,Ranksecond:item.rankIndex==2,Rankthird:item.rankIndex==3}">{{item.rankIndex}}</p>
            <p style="width:60%;padding-left:5px">{{item.orgName}}</p>
            <p style="width:30%;text-align:right">{{item.count}}单
            </p>
          </li>
        </ul>
      </div>
      <!-- 当月门店保费规模排名 -->
      <div class="outOrderRank">
        <h3>当月门店保费规模排名</h3>
        <ul>
          <li v-for="item in insuranceMouneRank">
            <p :class="{Rankfirst:item.rankIndex==1,Ranksecond:item.rankIndex==2,Rankthird:item.rankIndex==3}">{{item.rankIndex}}</p>
            <p style="width:60%;padding-left:5px">{{item.orgName}}</p>
            <p style="width:30%;text-align:right">{{item.amount}}元</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import { Tab, Tabs } from 'vant';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import echarts from "echarts";

export default {
  data() {
    return {
      active: 0,
      allId: 0,
      echart: 'echart',
      point: [],
      Timeline: [],
      Value: [],
      name: '',
      outbillRes: {},
      serviceChargeRes: {},
      insurance_PremiumRes: {},
      sumofQuote: {},
      sumofCarquote: {},
      sumofOrder: {},
      sumofsuccessCar: {},
      insuranceRank: {},
      insuranceMouneRank: {}
    }

  },

  created() {

  },
  mounted() {
    var self = this;
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth();
    var day = now.getDate();
    var endM = m + 1;
    if(m==0){
      y = y - 1
      m = 12
    }
    var beginDate = y + '-' + m + '-' + day;
    // console.log(this.getNowFormatDate(beginDate));
    var endDate = y + '-' + endM + '-' + day;
    //出单总量
    var url = 'vi/dataAnalysis/Chart?name=' + '车险出单量' + '&beginDate=' + beginDate + '&endDate=' + endDate;
    Indicator.open('加载中...');
    axiosGetAPI(url).then((res) => {
      if (res.result) {
        Indicator.close();
        for (var i = 0; i < res.result[0].values.length; i++) {
          var _date = (res.result[0].values[i].timeline).replace(/-/g, "/")
          self.Timeline.push(_date);
          self.Value.push(res.result[0].values[i].value)
        }
        self.name = res.result[0].name
        
        this.createCharsNOxy(self.Timeline, self.Value, self.name, 'outbillNum');
      }
    });
    // 车险保费规模
    var _url = 'vi/dataAnalysis/Chart?name=' + '总手续费规模' + '&beginDate=' + beginDate + '&endDate=' + endDate;
    Indicator.open('加载中...');
    axiosGetAPI(_url).then((res) => {
      if (res.result) {
        Indicator.close();
        var Timeline = []
        var Value = []
        // console.log(res.result)
        for (var i = 0; i < res.result[0].values.length; i++) {
          var _date = (res.result[0].values[i].timeline).replace(/-/g, "/");
          Timeline.push(_date);
          Value.push(res.result[0].values[i].value);
        }
        var name = res.result[0].name
        this.createCharsNOxy(Timeline, Value, name, 'serviceCharge');
      }
    });
    // 车险保费规模
    Indicator.open('加载中...');
    axiosGetAPI('vi/dataAnalysis/Chart?name=' + '车险保费规模' + '&beginDate=' + beginDate + '&endDate=' + endDate).then((res) => {
      if (res.result) {
        Indicator.close();
        var newCar = [];
        var oldCar = [];
        var dateX = []
        // console.log(res.result)
        for (var i = 0; i < res.result[0].values.length; i++) {
          var date = (res.result[0].values[i].timeline).replace(/-/g, "/");
          dateX.push(date);
          newCar.push(res.result[0].values[i].value)
        }
        for (var j = 0; j < res.result[1].values.length; j++) {
          oldCar.push(res.result[1].values[j].value)
        }
        var name = res.result[0].name;
        var v = { newCar, oldCar, dateX, name, el: 'insurance_PremiumAll' }
        this.createBar(v);
      }
    });
    // 保单趋势
    var year = y - 1;
    var _beginDate = year + '-' + m + '-' + day;
    Indicator.open('加载中...');
    axiosGetAPI('vi/dataAnalysis/Chart?name=' + '保单趋势' + '&beginDate=' + _beginDate + '&endDate=' + endDate).then((res) => {
      if (res.result) {
        Indicator.close();
        var Timeline = [];
        var Value = [];
        var _Timeline = [];
        var _Value = [];
        var type = res.result.chartType
        for (var i = 0; i < res.result[0].values.length; i++) {
          var date = (res.result[0].values[i].timeline).replace(/-/g, "/");
          Timeline.push(date);
          Value.push(res.result[0].values[i].value);
        }
        for (var j = 0; j < res.result[1].values.length; j++) {
          var _date = (res.result[1].values[j].timeline).replace(/-/g, "/");
          _Timeline.push(_date);
          _Value.push(res.result[1].values[j].value);
        }
        var name = res.result[0].name
        var _name = res.result[1].name
        this.createChars(Timeline, Value, name, 'premiumTrend');
        this.createChars(_Timeline, _Value, _name, 'outbillTrend');
      }
    });

    // 保险公司保单占比
    var year = y - 1;
    var _beginDate = year + '-' + m + '-' + day;
    Indicator.open('加载中...');
    axiosGetAPI('vi/dataAnalysis/Chart?name=' + '保险公司保单占比' + '&beginDate=' + _beginDate + '&endDate=' + endDate).then((res) => {
      Indicator.close();
      if (res.result) {
        var data = res.result[0].values;
        var title = res.result[0].name;
        var _title = res.result[1].name;
        var _data = res.result[1].values;
        var name = [];
        var _name = [];
        var select = {}
        for (var i = 0; i < data.length; i++) {
          name.push(data[i].name)
          if (data[i].value > 0) {
            select[data[i].name] = data[i].value > 0
          }
          if (data[i].value == 0) {
            data[i].value = null
          }
        }
        for (var j = 0; j < _data.length; j++) {
          _name.push(_data[j].name)
          if (_data[j].value == 0) {
            _data[j].value = null
          }
        }
        var v = { data, name, title, select, el: 'insurance_Outbill', }
        var v2 = { data: _data, name: _name, title: _title, select, el: 'insurance_Premium' }
        self.createPie(v);
        self.createPie(v2);
      }
    });


    axiosGetAPI('vi/dataAnalysis/Summary?name=' + '车险出单量').then((res) => {
      if (res.result) {
        // console.log(res.result)
        self.outbillRes = res.result;
        self.outbillRes.totalSum = res.result.totalSum.toLocaleString('en-US');

      }
    });

    axiosGetAPI('vi/dataAnalysis/Summary?name=' + '总手续费规模').then((res) => {
      if (res.result) {
        // console.log(res.result)
        self.serviceChargeRes = res.result;
        // 千位分隔
        self.serviceChargeRes.totalSum = res.result.totalSum.toLocaleString('en-US');
      }
    });

    // insurance_PremiumRes
    axiosGetAPI('vi/dataAnalysis/Summary?name=' + '车险总保费').then((res) => {
      if (res.result) {
        // console.log(res.result)
        self.insurance_PremiumRes = res.result;
        // 千位分隔
        self.insurance_PremiumRes.totalSum = res.result.totalSum.toLocaleString('en-US');
      }
    });
    //总报价次数、总报价车辆数、总留修工单数、总进店车辆数、
    // sumofQuote:{},
    // sumofCarquote:{},
    // sumofOrder:{},
    // sumofsuccessCar:{}
    // 总报价次数
    axiosGetAPI('/vi/dataAnalysis/Summary?name=' + '总报价次数').then((res) => {
      if (res.result) {
        self.sumofQuote = res.result;
        if (self.sumofQuote.totalSum) {
          self.sumofQuote.totalSum = res.result.totalSum.toLocaleString('en-US');
        } else {
          self.sumofQuote.totalSum = 0;
        }
      }
    });

    // 总报价车辆数
    axiosGetAPI('/vi/dataAnalysis/Summary?name=' + '总报价车辆数').then((res) => {
      if (res.result) {
        self.sumofCarquote = res.result;
        if (self.sumofCarquote.totalSum) {
          self.sumofCarquote.totalSum = res.result.totalSum.toLocaleString('en-US');
        } else {
          self.sumofCarquote.totalSum = 0;
        }
      }
    });
    // 总留修工单数
    axiosGetAPI('/vi/dataAnalysis/Summary?name=' + '总留修工单数').then((res) => {
      if (res.result) {
        self.sumofOrder = res.result;
        if (self.sumofOrder.totalSum) {
          self.sumofOrder.totalSum = res.result.totalSum.toLocaleString('en-US');
        } else {
          self.sumofOrder.totalSum = 0;
        }

      }
    });
    // 总进店车辆数
    axiosGetAPI('/vi/dataAnalysis/Summary?name=' + '总进店车辆数').then((res) => {
      if (res.result) {
        self.sumofsuccessCar = res.result;
        if (self.sumofsuccessCar.totalSum) {
          self.sumofsuccessCar.totalSum = res.result.totalSum.toLocaleString('en-US');
        } else {
          self.sumofsuccessCar.totalSum = 0;
        }
      }
    });
    // 机构出单量排名
    axiosGetAPI('/vi/dataAnalysis/Table?name=' + '机构出单量排名').then((res) => {
      if (res.result) {
        this.insuranceRank = res.result;
        for (var i = 0; i < res.result.length; i++) {
          this.insuranceRank[i].count = res.result[i].count.toLocaleString('en-US');
        }
      }
    });
    // 机构保费排名
    axiosGetAPI('/vi/dataAnalysis/Table?name=' + '机构保费排名').then((res) => {
      if (res.result) {
        this.insuranceMouneRank = res.result;
        for (var i = 0; i < res.result.length; i++) {
          this.insuranceMouneRank[i].amount = res.result[i].amount.toLocaleString('en-US');
        }
      }
    });
  },
  methods: {
    
    // 返回上一页
    openBack() {
      this.$router.back()
    },
    // getNowFormatDate(date){
		//     var newDate = new Date(date);
    //         var year = newDate.getFullYear();
    //         var month = newDate.getMonth() - 1;//获取当前月份的日期
    //         if (month<1){
    //             year = year - 1;
    //         }
    //   //  month=parseInt(month+1);
		// 	// var date2=new Date(year,month,0);//新的年月
		// 	if(month >= 1 ){
		// 		month=parseInt(month+1)
		// 	}else{
		// 		if(month==0){
		// 			month = 12;
		// 		}
		// 		day1 = new Date(year,month,0).getDate()
		// 	}
		// 	var currentdate = year + '-' + month + '-' + day1;
		// 	return currentdate;
		// },
    // 没有xy轴的折线图函数
    createCharsNOxy(dateX, dateY, name, el) {
      // 绘制图表
      var self = this;
      let myChart = echarts.init(document.getElementById(el));
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          position: 'center',
        },
        title: {
          left: 'center',

          textStyle: {
            color: '#333333',
            fontStyle: 'normal',
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: 'bold',
            fontSize: 16,
          }
        },
        grid: {
          left: -28,
          right: 5,
          top: 5,
          bottom: 0,
          // containLabel: true
        },
        xAxis: {
          type: 'category',
          show: false,
          axisLine: {
            lineStyle: {
              color: "#eee",
            }
          },
          data: dateX
        },
        yAxis: {
          type: 'value',
          show: false,
          textStyle: {
            color: '#a0a0a0', //更改坐标轴文字颜色
            fontSize: 12 //更改坐标轴文字大小
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
        },
        series: [{
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: '#fcaa49'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#fcaa49',
              },
              {
                offset: 1,
                color: '#fcaa49',
                opacity: 0.6
              }
            ])
          },
          data: dateY
        }]
      })
    },
    // 有xy轴的折线图函数
    createChars(dateX, dateY, name, el) {
      // 绘制图表
      var self = this;
      let myChart = echarts.init(document.getElementById(el));
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          position: 'center',
        },
        title: {
          left: 10,
          top: 10,
          text: name,
          textStyle: {
            color: '#333',
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: 600,
            fontSize: 16,
            fontFamily: 'Microsoft YaHei'
          }
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
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#a0a0a0', //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            },
          },
          axisLine: {
            lineStyle: {
              color: "#eee",
            }
          },
          data: dateX
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLine: {
            lineStyle: {
              color: "#eee",
            }
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
            textStyle: {
              color: '#a0a0a0', //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            }
          },
          splitLine: { show: true },
        },
        series: [{
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: '#fcaa49'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#fcaa49',

            }, {
              offset: 1,
              color: '#fcaa49',
              opacity: 0.6
            }])
          },
          data: dateY
        }]
      })
    },
    // 饼图函数
    createPie(v) {
      var self = this;
      console.log(v.select)
      let myChart = echarts.init(document.getElementById(v.el));
      // 绘制图表
      myChart.setOption({
        color: [
          "#8ceaff",
          "#c0ff8c",
          "#ffd08c",
          "#35c2d1",
          "#6aa786",
          "#35c2d1",
          "#2a5f07",
          "#6da5eb",
          "#6d79eb",
          "#ae6deb",
          "#e16deb",
          "#eb6dba",
          "#ff6600",
          "#5551f6",
          "#51a6f6",
          "#ebbd6d",
        ],
        title: {
          text: v.title,
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
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: 'vertical',
          type: 'scroll',
          left: 10,
          top: 35,
          itemGap: 12,
          itemWidth: 10,
          itemHeight: 8,
          textStyle: {
            fontSize: 12
          },
          pageIconSize:[10,8],
          data: v.name,
          selected: v.select,
        },
        series: [{
          name: v.title,
          type: 'pie',
          radius: '40%',
          center: ['60%', '50%'],
          data: v.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });
    },
    // 柱状图函数
    createBar(v) {
      var self = this;
      let myChart = echarts.init(document.getElementById(v.el));
      // 绘制图表
      myChart.setOption({
        color: ['#3171ed', '#fcaa49'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 2,
          right: 10,
          bottom: 10,
          top: 20,
          containLabel: true
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
          textStyle: {
            color: '#a0a0a0', //更改坐标轴文字颜色
            //更改坐标轴文字大小
          }
        },
        xAxis: {
          type: 'category',
          scale: true,
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#a0a0a0', //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            },
          },
          axisLine: {
            lineStyle: {
              color: "#eee",
            }
          },
          data: v.dateX
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#eee",
            }
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
            textStyle: {
              color: '#a0a0a0', //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            }
          },
          splitLine: { show: true },
        },
        series: [{
            name: '新车',
            type: 'bar',
            data: v.newCar,
            barWidth: 6,
          },
          {
            name: "旧车",
            type: 'bar',
            data: v.oldCar,
            barWidth: 6,
          },
        ]
      });
    }
  }
};

</script>
<style>
.showPie {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.outbillAll {
  margin: 10px;
  background: #ffffff;
  border-radius: 5px;
}

.outbillAll_title {
  height: 40px;
  text-align: left;
  line-height: 40px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  border-bottom: 0.5px solid #f0f0f0;
  padding: 10px 15px;

}

.outbillAll_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding: 10px 15px;
}

.outbillAll_footer li {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  height: 30px;
}

.outbillAll_footer li span {
  display: flex;
  justify-content: space-between;
  /* padding: 0 10px; */
  align-items: center;
  /* height: 30px; */
}

.outbillAll_footer li span i img {
  text-align: center;
}

/*  */
.serviceChargeAll {
  margin: 10px;
  background: #ffffff;
  border-radius: 5px;

}

.serviceChargeAll_title {
  height: 40px;
  text-align: left;
  line-height: 40px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  border-bottom: 0.5px solid #f0f0f0;
  padding: 10px 15px;

}

.serviceChargeAll_footer {
  border-top: 1px solid #f0f0f0;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.serviceChargeAll_footer li {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  height: 30px;

}

.serviceChargeAll_footer li span {
  display: flex;
  justify-content: space-between;
  /* padding: 0 10px; */
  align-items: center;
  /* height: 30px; */
}

.serviceChargeAll_footer li span i img {
  text-align: center;
}

/* 车险保费规模 */
.insurance_PremiumAll {
  margin: 10px;
  background: #ffffff;
  border-radius: 5px;
  padding: 15px;
}

.insurance_PremiumAll_title {
  height: 40px;
  text-align: left;
  line-height: 40px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  border-bottom: 0.5px solid #f0f0f0;


}

.insurance_PremiumAll_footer {
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  /* padding: 0 10px; */
  align-items: center;
}

.insurance_PremiumAll_footer li {
  display: flex;
  /* justify-content: space-between; */
  /* padding: 0 10px; */
  align-items: center;
  height: 20px;
  margin-top: 10px
}

.insurance_PremiumAll_footer li span {
  display: flex;
  justify-content: space-between;
  /* padding: 0 10px; */
  align-items: center;
  /* height: 30px; */
}

.insurance_PremiumAll_footer li span i img {
  text-align: center;
}

.premiumTrend {
  background: #fff;
  border-radius: 5px;
  margin: 10px;
}

.outbillTrend {
  background: #fff;
  border-radius: 5px;
  margin: 10px;
}

.insurance_Outbill {
  background: #fff;
  border-radius: 5px;
  margin: 10px;
  padding: 15px;
}

.insurance_Premium {
  background: #fff;
  border-radius: 5px;
  margin: 10px;
  padding: 15px;
}

.dataTabbar {
  /*   height: 120px; */
  background: #fff;
  margin: 10px;
  border-radius: 5px;
  padding: 15px;
}

.dataTabbar_title {
  background: #fff;
  margin: 10px;
  border-radius: 5px;
  padding: 15px;
}

.dataTabbar_title h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  border-bottom: 0.5px solid #f0f0f0;
  padding-bottom: 10px;
}

.dataTabbar_footer {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dataTabbar_footer li {
  display: flex;
  align-items: center;
  height: 30px;
  color: #333;
}

.dataTabbar_footer li span {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dataTabbar_footer li span i img {
  text-align: center;
}

.clear {
  clear: both
}

.outOrderRank {
  background: #fff;
  margin: 10px;
  border-radius: 5px;
  padding: 15px
}

.outOrderRank h3 {
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}

.outOrderRank ul li {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 10px 0;
}

.outOrderRank ul li p:nth-child(1) {
  width: 20px;
  font-size: 12px;
  text-align: center;
  color: #666
}

.outOrderRank ul li p:nth-child(2) {
  width: 150px;
  color: #666;
}

.outOrderRank ul li p:nth-child(3) {
  width: 100px;
  color: #666;
}

.Rankfirst {
  background: #FF5722;
  color: #fff !important;
  border-radius: 2px;
  margin-right: 5px;
}

.Ranksecond {
  width: 20px;
  background: #FFB800;
  color: #fff !important;
  border-radius: 2px;
  margin-right: 5px;
}

.Rankthird {
  background: #999;
  color: #fff !important;
  border-radius: 2px;
  margin-right: 5px;
}

.setColor {
  color: #f8444e;
}

.isColor {
  color: #15ef86;
}

</style>
