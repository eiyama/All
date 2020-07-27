<template>
  <div class="messagecc">
    <mt-header class="def-header" title="往年续保详情">
      <div slot="right" @click="closePolicy()">
        <img :src="closeImg" style="width: 18px;height: 18px;">
      </div>
    </mt-header>
    <div style="padding:10px;color:#666;font-size:12px;">
      <div style="background-color:#F3F3F3;font-size:14px;color:#333;height:25px;border:1px solid #e0e0e0;text-align:center;padding-top:5px">车辆信息</div>
      <table class="mint-table" style="margin-top:-1px" cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="35%">
          <col width="65%">
        </colgroup>
        <tr v-show="carInfoData.insCorp">
          <th style="background-color:#F3F3F3;">承保险企</th>
          <td style="color:#333;">{{carInfoData.insCorp.shortName}}</td>
        </tr>
        <tr v-if="carInfoData.bzRiskKind && carInfoData.bzRiskKind.beginDate">
          <th style="background-color:#F3F3F3;">交强险日期</th>
          <td style="color:#333;">{{carInfoData.bzRiskKind.beginDate.substring(0,10) }} 至 {{carInfoData.bzRiskKind.endDate.substring(0,10) }}</td>
        </tr>
        <tr v-if="carInfoData.bsRiskKind && carInfoData.bsRiskKind.beginDate">
          <th style="background-color:#F3F3F3;">商业险日期</th>
          <td style="color:#333;">{{carInfoData.bsRiskKind.beginDate.substring(0,10) }} 至 {{carInfoData.bsRiskKind.endDate.substring(0,10) }}</td>
        </tr>
        <tr v-show="carInfoData.car && carInfoData.car.owner">
          <th style="background-color:#F3F3F3;">车主名称</th>
          <td style="color:#333;">{{carInfoData.car.owner.name}}</td>
        </tr>
        <tr v-show="carInfoData.ownerIdType">
          <th style="background-color:#F3F3F3;">证件类型</th>
          <td>{{carInfoData.ownerIdType}}</td>
        </tr>
        <tr v-show="carInfoData.car && carInfoData.car.owner">
          <th style="background-color:#F3F3F3;">证件号码</th>
          <td style="color:#333;">{{carInfoData.car.owner.idNo}}</td>
        </tr>
        <tr v-show="carInfoData.car">
          <th style="background-color:#F3F3F3;">车牌号</th>
          <td style="color:#333;">{{carInfoData.car.plateNo}}</td>
        </tr>
        <tr v-show="carInfoData.car">
          <th style="background-color:#F3F3F3;">车架号</th>
          <td style="color:#333;">{{carInfoData.car.vin}}</td>
        </tr>
        <tr v-show="carInfoData.car">
          <th style="background-color:#F3F3F3;">发动机号</th>
          <td style="color:#333;">{{carInfoData.car.engineNo}}</td>
        </tr>
        <tr v-show="carInfoData.car">
          <th style="background-color:#F3F3F3;">品牌型号</th>
          <td style="color:#333;">{{carInfoData.car.model}}</td>
        </tr>
        <tr v-show="carInfoData.car">
          <th style="background-color:#F3F3F3;">核定载客量</th>
          <td style="color:#333;">{{carInfoData.car.passengerCapacity}}</td>
        </tr>
        <tr v-show="carInfoData.car">
          <th style="background-color:#F3F3F3;">新车购置价</th>
          <td style="color:#333;">{{carInfoData.car.purchasePrice}}</td>
        </tr>
        <tr v-show="carInfoData.car">
          <th style="background-color:#F3F3F3;">注册日期</th>
          <td style="color:#333;">{{carInfoData.car.registerDate}}</td>
        </tr>
        <tr v-show="carInfoData.car">
          <th style="background-color:#F3F3F3;">投保车型</th>
          <td style="color:#333;">{{carInfoData.car.fullPriceModel}}</td>
        </tr>
      </table>
      <div style="background-color:#F3F3F3;font-size:14px;color:#333;height:25px;border:1px solid #e0e0e0;text-align:center;padding-top:5px">险种信息</div>
      <table class="mint-table" style="margin-top:-1px" cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="30%">
          <col width="35%">
          <col width="35%">
        </colgroup>
        <tr style="background-color:#F3F3F3;">
          <th>险种</th>
          <td>保额(元)</td>
          <td>不计免赔</td>
        </tr>
        <tr v-show="carInfoData.bzRiskKind">
          <th>交强险</th>
          <td style="color:#333;"></td>
          <td style="color:#333;"></td>
        </tr>
        <tr v-show="carInfoData.bsRiskKind">
          <th>商业险</th>
          <td style="color:#333;"></td>
          <td style="color:#333;"></td>
        </tr>
        <tr v-show="carInfoData.bsRiskKind && carInfoData.bsRiskKind.items" v-for="item in carInfoData.bsRiskKind.items">
          <th>{{item.riskKindItemName}}</th>
          <td style="color:#333;">
            {{item.riskKindItemCode == 'CKZRX' ? item.coverage + "*" + (carInfoData.car.passengerCapacity - 1) : (item.riskKindItemCode == 'BLX' ? (item.coverage == 'Home' ? "国产" : "进口") : item.coverage)}}
          </td>
          <td style="color:#333;">{{item.isDeductible ? "不计免赔":""}}</td>
        </tr>
      </table>
    </div>
     <div class="showLoading" v-show="showLoading">
       <div style="width:200px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
         <img class="loadingImg" style="height:48px" src="../../assets/images/loading.png" alt="">
          <p style="font-size:14px;color:#fff;margin:10px 0;">往年续保查询中，请稍后...</p>
         <div style="width:140px;">
            <van-progress :percentage="count2" pivot-color="#4A66FE" :show-pivot="false" />
         </div>
        <p @click="showLoading = false" style="color:#FFF;font-size:15px;margin-top:15px;line-height:30px;width:100px;border-radius:5px;border:1px solid #FFF;text-align:center;">取消</p>
       </div>
       
     </div>
  </div>
</template>
<script>
var typeResult = {
    '个人': ['中华人民共和国身份证', '港澳居民来往内地通行证', '台胞证'],
    '企业单位': ['机构代码', '统一社会信用代码'],
    '机关单位': ['机构代码', '统一社会信用代码']
  },
  arro = ["51", "52", "53", "59", "11", "13", "19"],
  arre = ["91", "92", "93"];
var suredproperty = {
  "非营业": [],
  "营业": ["出租租赁", "城市公交", "公路客运", "旅游客运"]
}
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import event from './../../common/event';
import Licenseplate from '../../assets/json/Vehicletype.json';
import Licenseplatee from '../../assets/json/Licenseplatee.json';
import Vehicletype from '../../assets/json/Licenseplate.json';
import Vehicletypee from '../../assets/json/Vehicletypee.json';
import axios from "axios";
const address = Vehicletype.result;
const Licens = Licenseplate.result;
const TIME_COUNT = 3000;
export default {
  name: 'vehicleInfo',
  data() {
    return {
      showLoading:false,
      timer:null,
      ownerIdType: '',
      carInfoData: {
        insCorp: {},
        insCity: { shortName: "", code: "" },
        car: {
          owner: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
          plateNo: "",
          vin: "",
          engineNo: "",
          brandName: "",
          model: "",
          makerModel: "",
          vehicleModelCode: "",
          purchasePrice: "",
          analogyCarPrice: "",
          year: "",
          passengerCapacity: "",
          registerDate: "",
          remark: "",
          exhaustMeasure: "",
          isChangedOwner: false,
          changedOwnerDate: "",
          aliasName: "",
          fullPriceModel: "",
          licenseVehicleType: "",
          licenceType: "",
          busType: '',
          useCharacter: "",
          weightCapacity: 0,
          wholeWeight: 0
        },
        applicant: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
        insured: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
        bzRiskKind: {},
        bsRiskKind: {}
      },
      showPolicy: false,
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      showTimer:false,
      count2:0,

    }
  },
  mounted() { // 获取续保信息
    var self = this;
    if(JSON.parse(sessionStorage.getItem("carInfoParams"))){
      var carInfoParams = JSON.parse(sessionStorage.getItem("carInfoParams"));
      this.getRenewalpolicy(carInfoParams);
    }
  },

  methods: {
    getRenewalpolicy: function(carInfoParams) {
      var self = this;
      this.showLoading = true;
      // Indicator.open('正在查询续保信息，请稍候...');
      // self.showQueryRenewalpolicy = true;
      // self.show = self.showQueryRenewalpolicy;

      if (!this.timer) {
        // this.count2 = 40;
        this.count = 1;
        this.showTimer = false;
        this.timer = setInterval(() => {
          if (this.count < TIME_COUNT) {
            this.count++;
            if( this.count2 < 80){
                this.count2 = this.count2 + 0.3;
            } else if(this.count2 >=80 && this.count2 < 95){
              this.count2 = this.count2 + 0.05;
            } else if(this.count2 >=95 && this.count2 < 98){
              this.count2 = this.count2 + 0.01 ;
            }
            else{
                 this.count2 = 98;
            }
          } else {
            this.count2 = 100;
            this.showTimer = true;
            clearInterval(this.timer);
            this.timer = null;
            this.showLoading = false;    
          }
        }, 50)
      }
      var root = process.env.API_ROOT;
      axios({
        method: "GET",
        url:'/vi/RenewalPolicy',
        data: null,
        params: carInfoParams,
        baseURL: root,
        withCredentials: false
      }).then(function(res) {
         self.showLoading = false;
        if (res.data.status == 200 && res.data.result) {
          self.carInfoData = res.data.result;
          console.log(res.data.result);
        } 
        // Indicator.close();
      }, err => {
        // self.initData();
        reject(err);
      }).catch(function(error) {
        // self.initData();
        console.log(error);
      });
    },

    closePolicy: function() {
      this.$emit('closePolicy');
    },
    lastYearCurentTime:function(date) {
      var year = date.getFullYear(); //年
      var month = date.getMonth() + 1; //月
      var day = date.getDate(); //日
      var hh = date.getHours(); //时
      var mm = date.getMinutes(); //分
      var ss = date.getSeconds();
      var clock = year + "-";
      if(month < 10)
        clock += "0";

      clock += month + "-";

      if(day < 10)
        clock += "0";

      clock += day + " ";

      if(hh < 10)
        clock += "0";
      clock += hh + ":";
      if(mm < 10) clock += "0";
      clock += mm + ":";
      if(ss < 10) clock += "0";
      clock += ss;
      return clock;
    }
  }

};

</script>
<style rel="stylesheet/scss" lang="scss">
.messagecc {
  height: 100%;
  width: 100%;
}

.showLoading {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .4);
  display: flex;
  align-items: center;
  justify-content: center;
  /* opacity: 0.8; */

  
}
.loadingImg{
  	-webkit-animation:loading .8s linear infinite;
}

	@-webkit-keyframes loading{
 
		0%{-webkit-transform:rotate(0deg);}
 
		25%{-webkit-transform:rotate(90deg);}
 
		50%{-webkit-transform:rotate(180deg);}
 
		75%{-webkit-transform:rotate(270deg);}
 
		100%{-webkit-transform:rotate(360deg);}
 
	}
</style>
