<template>
  <div class="home" :style="mainStyle">
    <mt-header fixed class="def-header cust-head" title="我的团队">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
       <div slot="right" @click="showExplain = true">
         <mt-button > <p style="color:#4A66FE;font-size:14px;">车险基本法</p></mt-button>
      </div>
    </mt-header>
    <div class="main">
        <div class="mainItem">
            <h2 class="itemTitle">我的奖励</h2>
             <div class="team">
                <div class="teamItem" @click="toMyteam">
                    <span>
                         <p style="color:#e82836;text-align:center;font-weight: bold;">{{groupBonus }}</p>
                     </span>  
                      <h4>本期奖励</h4>
                </div>
                <div class="teamItem" @click="toMyteam">
                    <span>
                         <p >{{totalGroupOwnerBouns}}</p>
                         <van-icon name="arrow" color="#6b6b6b" />
                     </span>  
                         <h4>群主累计奖励</h4>
                </div>
                 <div class="teamItem"> 
                    <span>
                         <p style="color:#7f8080;">{{lifeOwnerBouns}}</p>
                         <!-- <van-icon name="arrow" color="#6b6b6b" /> -->
                     </span>
                      <h4 style="color:#7f8080;">寿代产奖励</h4>
                </div>
            </div> 
        </div>
        <div class="mainItem">
           <h2 class="itemTitle">群主等级</h2>
           <p class="itemDiscreption">您的等级为<span class="level">{{groupOwnerLevel}}</span>，距离升级还差<span class="level">{{((nextLevelGroupBsPremiums - totalGroupOwnerBouns) / 10000).toFixed(2)}}万元</span></p>
           <div class="progress">
               <div class="progressLeVel" :style="progress">{{groupOwnerLevel}}</div>
           </div>
           <p style="display:flex;justify-content: center;">本期结束时间：<span class="level">{{endTime}}</span>，还剩 <span class="level">{{nextLevelUpgradeDays}}</span>天</p>
        </div>
        <div class="mainItem" >
            <h2 class="itemTitle">商业险保费规模</h2>
            <p> 近期<span class="level">6个月</span>之内的商业险保费（元）</p>
            <div class="outbillTrend2">
                <div id="bsPremiumsBar" style="width: 100%;height: 160px;"></div>
            </div>
        </div>
        
        <div class="mainItem" >
            <h2 class="itemTitle">车险奖励</h2>
            <p>过往<span class="level">6个月</span>的奖励金额（元）</p>
            <div class="outbillTrend1">
                <div id="outbillTrend" style="width: 100%;height: 160px;"></div>
            </div>
        </div>

       <van-popup v-model="showExplain" style="height:100%;width:101%" >
          <mt-header fixed class="def-header cust-head" title="车险奖励基本法">
            <div slot="left" @click="showExplain = false">
              <van-icon name="cross" size="18px" />
            </div>
          </mt-header>
          <div style="height:100%;width:100%;margin-top:50px;">
            <img :src="zxExplain" alt="" style="width:100%">
          </div>
        </van-popup>
    </div>
  </div>
</template>
<script>
import { Toast,Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import echarts from "echarts";

export default {
  // name: 'home',
  data() {
    return {
        salesmanId:'',
        salesmanName: '',
        salesOrgName: '' ,
        startTime : '' ,
        endTime : '',
        ownerBsPremiums : '' ,
        ownerReferralCount : '' ,
        ownerReferralInsuredCount : '' ,
        isGroupOwner : '' ,
        groupOwnerLevel : '' ,
        groupBsPremiums : '' ,
        totalBsPremiums:'',
        groupCoefficient : '',
        groupGrowthFactor : '',
        groupBonus : '',
        subGroupBsPremiums : '',
        nextLevelGroupBsPremiums:'',
        subGroupCoefficient : '',
        subGroupBonus : '' ,
        groupOwnerBonus : '',
        remnant:'',
        lifeOwnerBouns:'',
        totalGroupOwnerBouns :'',
        zxExplain:this.src = require('../../assets/images/zxExplain.png'),
        showExplain:false,
        latestBillId: 0,
        progress:{
            "width":"",
            "background":'#ff0000'
        },
         mainStyle:{
          "backgroundColor":"#eaeaea",
          "paddingBottom":"10px",
          "minHeight":''
        }
    }
  },
 async created() {
      var h = window.innerHeight;
      this.mainStyle.minHeight = h;
      this.salesmanId = sessionStorage.getItem('salesmanId');
      var recentSixMonthsBsPremiums = [];//商业险保费
      var recentSixMonthsBonus = [];//车险奖励
      Indicator.open('加载中...');
    await axiosGetAPI('/ZhongXing/GroupOwner/'+ this.salesmanId).then(res=>{
            Indicator.close();
            if(res.status == "200"){
                  var GroupOwner = JSON.stringify(res.result); 
                  sessionStorage.setItem('GroupOwner', GroupOwner);
                 recentSixMonthsBsPremiums = res.result.recentSixMonthsBsPremiums;
                 recentSixMonthsBonus = res.result.recentSixMonthsBonus;
                 this.latestBillId = res.result.latestBillId;
                 this.ownerReferralCount = res.result.ownerReferralCount;
                 this.ownerReferralInsuredCount = res.result.ownerReferralInsuredCount 
                 this.salesmanName = res.result.salesmanName;
                 this.salesOrgName = res.result.salesOrgName;
                 this.nextLevelUpgradeDays = res.result.nextLevelUpgradeDays;
                 this.startTime = res.result.startTime;
                 this.endTime = res.result.endTime;
                 this.ownerBsPremiums = res.result.ownerBsPremiums;
                 this.groupOwnerLevel = res.result.groupOwnerLevel;
                 this.isGroupOwner = res.result.isGroupOwner 
                 this.groupBsPremiums = res.result.groupBsPremiums;
                 this.nextLevelGroupBsPremiums = res.result.nextLevelGroupBsPremiums;
                 this.groupCoefficient = res.result.groupCoefficient;
                 this.groupGrowthFactor = res.result.groupGrowthFactor 
                 this.groupBonus = res.result.groupBonus;
                 this.subGroupBsPremiums = res.result.subGroupBsPremiums;
                 this.subGroupCoefficient = res.result.subGroupCoefficient;
                 this.subGroupBonus = res.result.subGroupBonus 
                 this.groupOwnerBonus = res.result.groupOwnerBonus;
                 this.totalBsPremiums = res.result.totalBsPremiums;
                 this.totalGroupOwnerBouns = res.result.totalGroupOwnerBouns ;
                  this.lifeOwnerBouns = '0';
                  var startTime = this.endTime.split(' ')[0];
                  startTime = "2020-03-28 "  
                  // console.log(startTime)
                  this.remnant = this.dateDiff(this.Common.Public.GetDateStr(0),startTime)
                 if(this.groupOwnerLevel == 'L0'){
                     this.progress.width = '100%';
                     this.progress.background = "#dcdcdc"
                 }else if(this.groupOwnerLevel == 'L1'){
                     this.progress.width = '20%';
                     this.progress.background = 'ff0000'
                 }else if(this.groupOwnerLevel == 'L2'){
                     this.progress.width = '40%';
                      this.progress.background = 'ff0000'
                 }else if(this.groupOwnerLevel == 'L3'){
                     this.progress.width = '60%';
                      this.progress.background = 'ff0000'
                 }else if(this.groupOwnerLevel == 'L4'){
                     this.progress.width = '80%';
                      this.progress.background = 'ff0000'
                 }else if(this.groupOwnerLevel == 'L5'){
                     this.progress.width = '100%';
                      this.progress.background = 'ff0000'
                 }
                 
                 if(!res.result.isGroupOwner){
                     Toast('您还未成为群主');
                 }
            }
      });
      recentSixMonthsBsPremiums.push({name:"",value:""});
      recentSixMonthsBonus.push({name:"",value:""});
      // var recentSixMonthsBsPremiums = [
      //   {name:"2019-08",value:"0"},{name:"2019-09",value:"0"},{name:"2019-10",value:"0"},
      //   {name:"2019-12",value:"2454.16"},{name:"2020-01",value:"5683.68"},{name:"2020-02",value:"0"},{name:"",value:""}
      //   ];
      //   var recentSixMonthsBonus= [
      //     {name:"2019-08",value:"0"},{name:"2019-09",value:"0"},{name:"2019-10",value:"0"},
      //     {name:"2019-12",value:"2454.16"},{name:"2020-01",value:"5683.68"},{name:"2020-02",value:"0"},{name:"",value:""}
      //   ]
      var Value = [];
      var Name = [];
    for(var i = 0 ; i < recentSixMonthsBsPremiums.length ; i++){
        var item = recentSixMonthsBsPremiums[i];
          var _date = (item.name).replace(/-/g, "/");
          Name.push(_date)
          Value.push(item.value)
    }
    this.createCharsBar(Name, Value);

    var dataX = [];
    var dataY = [];
    for(var i = 0 ; i < recentSixMonthsBonus.length ; i++){
       var item = recentSixMonthsBonus[i];
          var _date = (item.name).replace(/-/g, "/");
          dataX.push(_date)
          dataY.push(item.value)

    }
      this.createCharsNOxy(dataX,dataY);
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    dateDiff(sDate1, sDate2){
        console.log(sDate1, sDate2);
        var aDate, oDate1, oDate2, iDays
        aDate = sDate1.split("-")
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式
        aDate = sDate2.split("-")
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
        console.log(iDays);
        return iDays
      },
    toMyteam(){
        this.$router.push('/myInfo/teamAward?billId=' + this.latestBillId);
    },
    createCharsBar(dataX,dataY){
      let myChart = echarts.init(document.getElementById('bsPremiumsBar'));
      myChart.setOption({
            color: ['#0c3484'],
            tooltip: {
                trigger: 'axis',
                //  formatter:function (params) {
                //    if(params[0].data >= 1000){
                //      var value = params.data / 10000
                //      return params[0].data/10000 + "万元" 
                //    }else{
                //      return params[0].data + '元'
                //    }
                // },
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: 10,
                right: -15,
                bottom: 20,
                containLabel: true
            },
            xAxis:{
                axisLabel: {
                  show: true,
                   interval:0,//横轴信息全部显示  
                   rotate:-35,//-15度角倾斜显示  
                  textStyle: {
                    color: '#aeafaf', //更改坐标轴文字颜色
                    fontSize: 12 //更改坐标轴文字大小
                  },
                },
                 boundaryGap: true,//起始位置
                 offset:4,
                  axisTick: {
                      show: false
                  },
                    type: 'category',
                    data: dataX,
                    axisLine: {
                      lineStyle: {
                        color: "#a0a0a0",
                      }
                    },
                    splitLine:{
                      show:false
                  },
                },
            yAxis: [
               { 
                type: 'value',
                show: true,
                axisLine:{
                      show:false
                  },
                  axisLabel: {
                      show: false

                  },
                  axisTick:{
                      show:false
                  },
                   splitLine:{
                      show:false
                  },
              }
            ],
            series: [
                {
                    name: '商业险保费',
                    type: 'bar',
                    barWidth: '60%',
                    data: dataY,
                    label: {
                      show: true, // 开启显示
                      position: 'top', // 在上方显示
                      distance: 20, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
                      verticalAlign: 'middle',
                      textStyle: { // 数值样式
                        color: '#768bb7',
                        fontSize: 12
                      },
                       formatter:function (params) {
                        if(params.data >= 1000){
                          var value = params.data / 10000
                          // Math.round(value * 100) / 100
                          return  Math.round(value * 100) / 100 + "万" 
                        }else{
                          return params.data 
                        }
                      },

                    }
                }
            ]
        });
    },
     // 有xy轴的折线图函数
    createCharsNOxy(dateX, dateY) {
      // 绘制图表
      var self = this;
      let myChart = echarts.init(document.getElementById('outbillTrend'));
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          position: 'center',
         
        },
        grid: {
          left: 10,
          right: 0,
          top:30,
          bottom: 20,
          containLabel: true
        },
       xAxis: {
          boundaryGap: true,//起始位置
          type: 'category',
          // scale: true,
          boundaryGap: false,
          axisLabel: {
            interval:0,//横轴信息全部显示  
            rotate:-35,//-15度角倾斜显示  
            show: true,
            textStyle: {
              color: '#a0a0a0', //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            },
          },
          axisTick: {
              show: false
          },
          axisLine: {
            lineStyle: {
              color: "#a0a0a0",
            }
          },
          data: dateX
        },
        yAxis: {
          type: 'value',
          show: true,
          axisLine:{
                show:false
            },
            axisLabel: {
                show: false
            },
            axisTick:{
                show:false
            },

        },
        series: [{
          name: '奖励金额',
          type: 'line',
          smooth: true,
          // sampling: 'average',
          symbolSize: 5,
          symbol: 'circle',
          itemStyle: {
            normal: {
              label : {
                show: true,
                formatter:function (params) {
                        if(params.data >= 1000){
                          var value = params.data / 10000
                          // Math.round(value * 100) / 100
                          return  Math.round(value * 100) / 100 + "万" 
                        }else{
                          return params.data
                        }
                      },
              },
              color: '#225cd0',
              lineStyle:{
                color:'#80AAED' //改变折线颜色
              },
              
            },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#c9daf6',
              },
              {
                offset: 1,
                color: '#f9fbfc',
                opacity: 0.6
              }
            ])
          },
          data: dateY
        }]
      })
    },
  }
}

</script>
<style scoped>
    .main{padding-top: 49px;}
    .mainItem{
        margin: 10px 15px;
        border-radius: 5px;
        border: 1px solid #e3e6eb;
        padding: 12px 12px 25px 12px;
        background: #fafbfc;
    }
    .itemTitle{margin-bottom:5px;font-size: 16px;font-weight: bold;}
    .team{display: flex;justify-content: space-around; align-items: center;    margin-top: 10px;}
    .team .teamItem h4{ font-size: 14px;color: #333333;font-weight: normal;}
    .teamItem span{display: flex;justify-content: center;align-items: center;}
    .teamItem span p{ font-size: 20px; font-weight: bold;}
    .itemDiscreption{font-size: 14px;color: #474747;display: flex;}
    .progress{height: 17px;background: #dcdcdc;width: 100%;border-radius: 15px;    margin: 10px 0;}
    .level{color: #ff0000}
    .progressLeVel{background: #dcdcdc;height: 17px;border-radius: 10px; text-align: center;color: #fff;line-height: 17px;font-size: 11px;}
    .headerTitle{text-align: center;font-size: 16px;color:#333;}
</style>
