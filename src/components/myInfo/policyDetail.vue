<template>
  <div class="home">
    <mt-header fixed class="def-header cust-head" title="保单详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="policy-content">
      <div class="policy-detail">
        <div class="policy-vehicle">
          <div class="policy-hd" :class="{ 'show': shouldShowVehicle}">
            <h3 class="policy-plateno">
              {{policyData.car.plateNo ? policyData.car.plateNo : policyData.car.vin}}-{{policyData.car.carOwnerName}}
            </h3>
            <table class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th>承保险企</th>
                <td>{{policyData.insCorp.shortName}}</td>
              </tr>
              <tr>
                <th>品牌型号</th>
                <td>{{policyData.car.model}}</td>
              </tr>
              <tr>
                <th>车架号</th>
                <td>{{policyData.car.vin}}</td>
              </tr>
              <tr>
                <th>发动机号</th>
                <td>{{policyData.car.engineNo}}</td>
              </tr>
              <tr>
                <th>注册日期</th>
                <td>{{policyData.car.registerDate.substring(0,10)}}</td>
              </tr>
              <tr>
                <th>是否过户</th>
                <td v-text="policyData.car.changedOwner == 'true'?'是': '否'"></td>
              </tr>
              <tr v-show="policyData.car.changedOwner">
                <th>过户日期</th>
                <td>{{policyData.car.changedOwnerDate}}</td>
              </tr>
              <tr>
                <th>投保车型</th>
                <td>{{policyData.car.makerModel}}/{{policyData.car.brandName}}/{{policyData.car.passengerCapacity}}座
                /{{policyData.car.year}}/{{policyData.car.purchasePrice}}</td>
              </tr>
            </table>
            <table class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
               <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>车主名</th>
                <td>{{policyData.car.carOwnerName}}</td>
              </tr>
              <tr>
                <th style="width:65px;">车主证件号</th>
                <td>{{policyData.car.carOwnerIDNo}}</td>
              </tr>
              <tr v-show="policyData.car.carOwnerMobile">
                <th>车主手机号</th>
                <td>{{policyData.car.carOwnerMobile}}</td>
              </tr>
            </table>
            <table v-if="policyData.applicant" class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
               <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>投保人</th>
                <td>{{policyData.applicant.name}}</td>
              </tr>
              <tr>
                <th>证件号</th>
                <td>{{policyData.applicant.idNo}}</td>
              </tr>
              <tr v-show="policyData.applicant.phone != ''">
                <th>手机号</th>
                <td>{{policyData.applicant.phone}}</td>
              </tr>
            </table>
            <table v-if="policyData.insured" class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
               <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>被保人</th>
                <td>{{policyData.insured.name}}</td>
              </tr>
              <tr>
                <th>证件号</th>
                <td>{{policyData.insured.idNo}}</td>
              </tr>
              <tr v-show="policyData.insured.phone != ''">
                <th>手机号</th>
                <td>{{policyData.insured.phone}}</td>
              </tr>
            </table>
          </div>
          <a class="btn-show" @click="toggleShowVehicle"><i class="ico-arrow"><em></em></i></a>
        </div>
        <div v-if="policyData.policyType == 'BZ'">
          <h3 class="policy-title">交强险</h3>
          <p class="policy-num">保单号: {{policyData.subPolicyNo}}</p>
          <!-- <table class="policy-table" cellpadding="0" cellspacing="0">
            <tr>
              <th class="gray-th">生效日期</th>
              <td class="gray-td">{{policyData.beginDate.substring(0,10)}} 至 {{policyData.endDate.substring(0,10)}}</td>
            </tr>
            <tr>
              <th class="gray-th">车船税</th>
              <td class="gray-td">当年应缴: {{policyData.tax ? policyData.tax.totalTax:0}}元 往年欠缴: {{policyData.tax ? policyData.tax.preTax:0}}元   滞纳金: {{policyData.tax ? policyData.tax.lateFeesOfTax:0}}元</td>
            </tr>
          </table> -->
          <div class="policy-table" >
            <span style="display:flex;">
              <p class="">生效日期：</p>
              <p class="dateContant">{{policyData.beginDate.substring(0,10)}} 至 {{policyData.endDate.substring(0,10)}}</p>
            </span>
            <span style="display:flex;margin-top: 5px;">
              <p >车船税：</p>
              <p class="">当年应缴: {{policyData.tax ? policyData.tax.totalTax:0}}元 往年欠缴: {{policyData.tax ? policyData.tax.preTax:0}}元   滞纳金: {{policyData.tax ? policyData.tax.lateFeesOfTax:0}}元</p>
            </span>
          </div>

        </div>
        <div v-if="policyData.policyType == 'BS'">
          <h3 class="policy-title">商业险</h3>
          <p class="policy-num">保单号: {{policyData.subPolicyNo}}</p>
          <div class="policy-table" style="display:flex;">
              <p class="">生效日期：</p>
              <p class="dateContant">{{policyData.beginDate.substring(0,10)}} 至 {{policyData.endDate.substring(0,10)}}</p>
          </div>
          <div class="detail-row-three">
            <ul style="font-size: 14px;color: #333333 width:100$;">
              <li class="detail-row-three-left">险种</li>
              <li class="detail-row-three-center">保费(元)</li>
              <li class="detail-row-three-right">不计免赔(元)</li>
            </ul>
          </div>
          <div class="detail-row-three" v-for="item in policyData.insuredRiskKinds">
            <ul>
              <li class="left">
                <span>{{item.riskKindItemName}}</span>
                <span v-if="item.coverage=='国产'">(国产)</span>
                <span v-else-if="item.coverage=='进口'">(进口)</span>
                <span v-else-if="item.riskKindItemName=='乘客责任险' ">({{item.coverage}}元*{{policyData.car.passengerCapacity-1}})</span>
                <span v-else-if="item.coverage>0">({{item.coverage}}元)</span>
              </li>
              <li class="center"><span>{{item.premium}}</span></li>
              <li class="right" v-if='item.deductiblePremium>0'>{{item.deductiblePremium}}</li>
            </ul>
          </div>
        </div>
        <div v-if="hasNewDevice">
          <h3 class="policy-title">新增设备险</h3>
          <table class="policy-table" cellpadding="0" cellspacing="0">
            <tr>
              <th>设备名称</th>
              <th>产地</th>
              <th>金额</th>
              <th>日期</th>
              <th>数量</th>
            </tr>
            <tr v-for="item in policyData.insuredRiskKindsXZSBSSX" style="color:#666;">
              <td>{{item.name}}</td>
              <td>{{item.origin =="Home" ? "国产" : "进口"}}</td>
              <td>{{item.price}}</td>
              <td>{{item.purchaseDate}}</td>
              <td>{{item.count}}</td>
            </tr>
          </table>
        </div>
        <div v-if="hasNonCar">
          <h3 class="policy-title">非车险</h3>
          <table class="policy-table" cellpadding="0" cellspacing="0">
            <tr>
              <th>险种</th>
              <th>档次</th>
              <th>份数</th>
              <th>保费</th>
            </tr>
            <tr v-for="item in policyData.personInsurances" style="color:#666;">
              <td>{{item.categoryName}}</td>
              <td>{{item.insuranceName}}</td>
              <td>{{item.buyNumber}}</td>
              <td>{{item.amount}}</td>
            </tr>
          </table>
        </div>
        <div style="color:#333;font-size:16px;font-weight:600;line-height:70px;text-align:right">
            保费总额: <span style="color:red;">{{policyData.premium}}</span>元</div>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
export default {
  name: 'home',
  data() {
    return {
      hasNonCar: false,
      hasNewDevice: false,
      policyId: 0,
      shouldShowVehicle: false,
      jiaoq: true,
      shangye: true,
      policyData: {
        "policyId": "",
        "chinaRegion": {
          "id": "",
          "name": "",
          "shortName": "",
          "level": "",
          "code": "",
          "fullName": ""
        },
        "insChannel": {
          "insCorpCode": "",
          "insCorpShortName": "",
          "insCityCode": "",
          "insCityShortName": "",
          "channelName": ""
        },
        "insCorp": {
          "id": "",
          "fullName": "",
          "shortName": "",
          "code": "",
          "orderBy": ""
        },
        "billSource": "",
        "policyType": "",
        "policyTypeName": "",
        "createdTime": "",
        "beginDate": "",
        "endDate": "",
        "policyNo": "",
        "subPolicyNo": "",
        "premium": "",
        "subPremium": "",
        "insuredTime": "",
        "insDiscount": "",
        "car": {
          "id": "",
          "plateNo": "",
          "carOwnerName": "",
          "carOwnerIDNo": "",
          "carOwnerType": "",
          "carOwnerTypeName": "",
          "carOwnerRelationType": "",
          "carOwnerBirthday": "",
          "carOwnerGender": "",
          "carOwnerMobile": "",
          "vin": "",
          "engineNo": "",
          "brandName": "",
          "model": "",
          "makerModel": "",
          "vehicleModelCode": "",
          "purchasePrice": "",
          "analogyCarPrice": "",
          "year": "",
          "passengerCapacity": "",
          "registerDate": "",
          "remark": "",
          "exhaustMeasure": "",
          "changedOwner": "",
          "changedOwnerDate": "",
          "seriesName": "",
          "aliasName": "",
          "useCharacter": "",
          "licenseVehicleType": "",
          "licenceType": "",
          "busType": "",
          "energyType": "",
          "useCharacterDisplay": "",
          "licenseVehicleTypeDisplay": "",
          "licenceTypeDisplay": "",
          "busTypeDisplay": "",
          "energyTypeDisplay": "",
          "wholeWeight": "",
          "weightCapacity": ""
        },
        "insured": {
          "id": "",
          "name": "",
          "phone": "",
          "idNo": "",
          "type": "",
          "typeName": "",
          "insuredPeopleType": "",
          "relationPeopleType": "",
          "birthday": "",
          "gender": ""
        },
        "applicant": {
          "id": "",
          "name": "",
          "phone": "",
          "idNo": "",
          "type": "",
          "typeName": "",
          "insuredPeopleType": "",
          "relationPeopleType": "",
          "birthday": "",
          "gender": ""
        },
        "shuanglu": {
          "id": "",
          "name": "",
          "phone": "",
          "idNo": "",
          "type": "",
          "typeName": "",
          "insuredPeopleType": "",
          "relationPeopleType": "",
          "birthday": "",
          "gender": ""
        },
        "agentPerson": {
          "id": "",
          "name": "",
          "phone": "",
          "idNo": "",
          "type": "",
          "typeName": "",
          "insuredPeopleType": "",
          "relationPeopleType": "",
          "birthday": "",
          "gender": ""
        },
        "sellerId": "",
        "creatorId": "",
        "insuredRiskKinds": [{
          "coverage": "",
          "riskKindItemCode": "",
          "unitPremium": "",
          "quantity": "",
          "premium": "",
          "riskKindItemName": "",
          "isDeductible": "",
          "deductiblePremium": "",
          "rate": ""
        }],
        "coefficients": [{
          "id": "",
          "code": "",
          "name": "",
          "rate": ""
        }],
        "tax": {
          "id": "",
          "totalTax": "",
          "tax": "",
          "preTax": "",
          "lateFeesOfTax": ""
        },
        "specialAgreement": [{
          "insCorpCode": "",
          "insureCityCode": "",
          "specialAgreementCode": "",
          "specialAgreementDescription": "",
          "specialAgreementName": "",
          "engageFlag": ""
        }],
        "garages": [{
          "insCorpCode": "",
          "insCityCode": "",
          "garagesCode": "",
          "garagesName": ""
        }],
        "invoice": {
          "invoiceType": "",
          "subject": "",
          "ticketerAddress": "",
          "ticketerMobile": "",
          "ticketerEmail": "",
          "depositBankName": "",
          "depositBankAccount": "",
          "certificateNo": ""
        },
        "organizationCode": "",
        "personInsurances": [{
          "insuranceCode": "",
          "policyNo": "",
          "insuranceName": "",
          "insuranceAmount": "",
          "premium": ""
        }],
        "policyAttachments": [{
          "id": "",
          "mediaId": "",
          "mediaUrl": ""
        }],
        "address": {
          "province": "",
          "city": "",
          "areaName": "",
          "address": ""
        },
        "insuredRiskKindsXZSBSSX":[],
      }
    }
  },
  created: function() {
    this.policyId = this.$route.query.policyId;
    Indicator.open('加载中, 请稍等...');
    axiosGetAPI('/vi/policies/' + this.policyId).then((res) => {
      Indicator.close();
      if (res.result) {
        this.policyData = res.result;
        this.hasNonCar = (this.policyData.personInsurances && this.policyData.personInsurances.length > 0);
        this.hasNewDevice = (this.policyData.insuredRiskKindsXZSBSSX && this.policyData.insuredRiskKindsXZSBSSX.length > 0);
      }
    });
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    toggleShowVehicle: function(e) {
      var $this = $(e.currentTarget)
      $this.toggleClass('cur');
      if ($this.hasClass('cur')) {
        this.shouldShowVehicle = true
      } else {
        this.shouldShowVehicle = false
      }
    }
  }
}

</script>
<style scoped>
.policy-content {
  padding: 44px 0 90px;
  /* background-color: #f9f9f9; */
}

.policy-detail {
  position: relative;
  width: 86%;
  margin: 10px auto;
  padding: 14px 4%;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff;
}

.policy-detail:after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: 0;
  width: 100%;
  height: 60px;
  background: url(../../assets/images/bg-paper.png) no-repeat left top;
  background-size: 100%;
}

.policy-vehicle {
  position: relative;
  margin-bottom: 8px;
}

.policy-hd {
  position: relative;
  height: 80px;
  overflow: hidden;
  transition: all .2s;
  -webkit-transition: all .2s;
}

.policy-hd.show {
  height: auto;
  border: 0px solid #FFF;
}

.policy-vehicle .btn-show {
  display: block;
  width: 100%;
  height: 25px;
  text-align: center;
}

.policy-vehicle .ico-arrow {
  display: inline-block;
  position: relative;
  top: 8px;
  border: 6px solid transparent;
  border-top: 6px solid #888;
}

.policy-vehicle .ico-arrow em {
  position: absolute;
  top: -6px;
  left: -4px;
  border: 4px solid transparent;
  border-top: 4px solid #fff;
  transition: all .2s;
  -webkit-transition: all .2s;
}

.policy-vehicle .btn-show.cur .ico-arrow {
  top: 0;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -o-transform: rotate(180deg);
}

.policy-plateno {
  font-size: 18px;
  font-weight: 400;
  color: #333;
}

.policy-table {
  width: 100%;
  margin-bottom: 10px;
  color: #666;
  font-size: 13px;
  text-align: left;
}

.policy-table.sy-table td {
  text-align: right;
}

.policy-table th,
.policy-table td {
  padding: 3px 5px 3px 0;
}

.policy-table th {
  font-weight: 400;
  color: #333;
}

.policy-title {
  padding-top: 10px;
  font-size: 15px;
  color: #333;
  font-weight: 600;
}

.policy-table.vehicle-info th {
  color: #666;
}

.policy-table .gray-th {
  color: #666;
}

.policy-table .gray-td {
  color: #333;
}

.policy-num {
  line-height: 30px;
  margin-bottom: 5px;
  font-size: 13px;
  color: #0070D3;
}

.detail-row-three {
  height: 30px;
  color: #888888;
  font-size: 13px;
  overflow: hidden;
}

.detail-row-three-left {
  width: 50%;
  float: left;
  color: #2A0A0A;
}

.detail-row-three-center {
  width: 25%;
  float: left;
  color: #2A0A0A;
}

.detail-row-three-right {
  width: 25%;
  float: left;
  color: #2A0A0A;
}

.gray-th {
  padding-left: 50%;
}

.left {
  width: 50%;
  float: left;
}

.center {
  width: 25%;
  float: left;
}

.right {
  width: 25%;
  float: left;
}

.dateContant{
  color: #333;
}

/*.gray-th{float: right;}*/

</style>
