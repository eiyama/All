<template>
  <div class="home" style="background-color:#FFF">
    <mt-header fixed class="def-header cust-head" title="保单详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="policy-content">
      <div class="policy-detail">
        <div class="policy-vehicle">
          <div class="policy-hd" :class="{ 'show': shouldShowVehicle}">
            <h3 class="policy-plateno">{{renewalData.car.plateNo}}-{{renewalData.car.owner.name}}</h3>
            <table class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>承保公司</th>
                <td>{{renewalData.insCorp.shortName}}</td>
              </tr>
              <tr>
                <th>投保地区</th>
                <td>{{renewalData.car.model}}</td>
              </tr>
              <tr>
                <th>厂牌型号</th>
                <td>{{renewalData.car.vin}}</td>
              </tr>
              <tr>
                <th>车架号</th>
                <td>{{renewalData.car.engineNo}}</td>
              </tr>
              <tr>
                <th>发动机号</th>
                <td>{{renewalData.car.registerDate}}</td>
              </tr>
              <tr>
                <th>注册日期</th>
                <td>{{renewalData.car.registerDate}}</td>
              </tr>
              <tr>
                <th>过户车</th>
                <td v-text="renewalData.car.isChangedOwner == 'true'? '是': '否'"></td>
              </tr>
              <tr v-show="renewalData.car.isChangedOwner">
                <th>过户日期</th>
                <td>{{renewalData.car.changedOwnerDate}}</td>
              </tr>
            </table>
            <table class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>车主</th>
                <td>{{renewalData.car.owner.name}}</td>
              </tr>
              <tr>
                <th>身份证号</th>
                <td>{{renewalData.car.owner.idNo}}</td>
              </tr>
              <tr v-show="renewalData.car.owner.phone != ''">
                <th>车主手机号</th>
                <td>{{renewalData.car.owner.phone}}</td>
              </tr>
            </table>
            <table class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>投保人</th>
                <td>{{renewalData.car.owner.name}}</td>
              </tr>
              <tr>
                <th>身份证号</th>
                <td>{{renewalData.car.owner.idNo}}</td>
              </tr>
              <tr v-show="renewalData.car.owner.phone != ''">
                <th>车主手机号</th>
                <td>{{renewalData.car.owner.phone}}</td>
              </tr>
            </table>
            <table class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>被保人</th>
                <td>{{renewalData.car.owner.name}}</td>
              </tr>
            </table>
          </div>
          <a class="btn-show" @click="toggleShowVehicle"><i class="ico-arrow"><em></em></i></a>
        </div>
        <h3 class="policy-title">交强险</h3>
        <table class="policy-table sy-table" cellpadding="0" cellspacing="0">
          <tr>
            <th class="gray-th">保单号</th>
            <td class="gray-td">{{renewalData.bzRiskKind.beginDate}}-{{renewalData.bzRiskKind.endDate}}</td>
          </tr>
          <tr>
            <th class="gray-th">保障期限</th>
            <td class="gray-td">{{renewalData.bzRiskKind.beginDate}}-{{renewalData.bzRiskKind.endDate}}</td>
          </tr>
          <tr>
            <th class="gray-th">保费</th>
            <td class="gray-td">{{renewalData.bzRiskKind.beginDate}}-{{renewalData.bzRiskKind.endDate}}</td>
          </tr>
          <tr>
            <th class="gray-th">车船税</th>
            <td class="gray-td">￥{{renewalData.bzRiskKind.vehicleTax ? renewalData.bzRiskKind.vehicleTax.totalTax:0}}</td>
          </tr>
        </table>
        <h3 class="policy-title">商业险</h3>
        <table class="policy-table sy-table" cellpadding="0" cellspacing="0">
          <tr>
            <th class="gray-th">保单号</th>
            <td class="gray-td"> </td>
          </tr>
          <tr>
            <th class="gray-th">保障期限</th>
            <td class="gray-td"> 至 </td>
          </tr>
          <tr>
            <th class="gray-th">投保险种</th>
          </tr>
          <tr v-for='item in renewalData.bsRiskKind.items'>
            <th>{{item.riskKindItemName}}<em v-text="item.isDeductible ? '(不计免赔)' : ''"></em></th>
            <td>
              <span v-if="item.riskKindItemCode=='CKZRX'"><em v-text="item.coverage + '*' +renewalData.car.passengerCapacity"></em></span>
              <span v-else-if="item.riskKindItemCode=='BLX'">
                <em v-text="item.coverage == 'Home' ? '国产' : '进口'"></em>
              </span>
              <span v-else>{{item.coverage}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
export default {
  name: 'home',
  data() {
    return {
      shouldShowVehicle: false,
      renewalData: {
        "insureNo": "",
        "policyNo": "",
        "premium": "",
        "insuredTime": "",
        "insCorp": { "shortName": "", "code": "" },
        "insCity": { "shortName": "", "code": "" },
        "insChannel": { "insCorpCode": "", "insCorpShortName": "", "insCityCode": "", "insCityShortName": "", "channelName": "" },
        "car": {
          "owner": { "name": "", "phone": "", "idNo": "", "idType": "", "relationType": "", "birthday": "", "gender": "" },
          "plateNo": "",
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
          "isChangedOwner": "",
          "changedOwnerDate": "",
          "aliasName": "",
          "seriesName": "",
          "fullPriceModel": ""
        },
        "applicant": { "name": "", "phone": "", "idNo": "", "idType": "", "relationType": "", "birthday": "", "gender": "" },
        "insured": { "name": "", "phone": "", "idNo": "", "idType": "", "relationType": "", "birthday": "", "gender": "" },
        "bzRiskKind": {
          "vehicleTax": { "totalTax": "", "tax": "", "preTax": "", "lateFeesOfTax": "" },
          "beginDate": "",
          "endDate": "",
          "insureNo": "",
          "policyNo": "",
          "premium": "",
          "insDiscount": ""
        },
        "bsRiskKind": { "items": [{ "riskKindItemName": "", "premium": "", "quantity": "", "deductiblePremium": "", "coverage": "", "riskKindItemCode": "", "isDeductible": "" }], "beginDate": "", "endDate": "", "insureNo": "", "policyNo": "", "premium": "", "insDiscount": "" }
      }
    }
  },
  created: function() {
    var renewalPolicyDetail = store.state.renewalPolicyDetail;
    if (renewalPolicyDetail && Object.keys(renewalPolicyDetail).length > 0) {
      this.renewalData = renewalPolicyDetail;
    }
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
  background-color: #f9f9f9;
}

.policy-detail {
  position: relative;
  width: 86%;
  margin: 10px auto;
  padding: 14px 4%;
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
  height: 75px;
  overflow: hidden;
  transition: all .2s;
  -webkit-transition: all .2s;
}

.policy-hd.show {
  height: auto;
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
  color: #999;
  font-size: 12px;
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
  font-size: 14px;
  color: #333;
  font-weight: 400;
}

.policy-table.vehicle-info th {
  color: #999;
}

.policy-table .gray-th {
  color: #999;
}

.policy-table .gray-td {
  color: #333;
}

.policy-num {
  margin-bottom: 5px;
  font-size: 12px;
  color: #999;
}

</style>
