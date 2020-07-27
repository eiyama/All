<template>
  <div class="home">
    <mt-header fixed class="def-header cust-head" title="报价详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="rbpolicy-content">
      <div class="rbpolicy-detail">
        <div class="rbpolicy-vehicle">
          <div class="rbpolicy-hd" :class="{ 'show': shouldShowVehicle}">
            <h3 class="rbpolicy-plateno">
              {{policyData.vehicle.plateNo ? policyData.vehicle.plateNo : policyData.vehicle.vin}}-{{policyData.vehicle.carOwnerName}}
            </h3>
            <table class="rbpolicy-table vehicle-info" cellpadding="0" cellspacing="0">
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
                <td>中国人保</td>
              </tr>
              <tr>
                <th>车架号</th>
                <td>{{policyData.vehicle.vin}}</td>
              </tr>
              <tr>
                <th>发动机号</th>
                <td>{{policyData.vehicle.engineNo}}</td>
              </tr>
              <tr>
                <th>注册日期</th>
                <td>{{policyData.vehicle.registerDate}}</td>
              </tr>
            </table>
            <table class="rbpolicy-table vehicle-info" cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>车主名</th>
                <td>{{policyData.vehicle.carOwnerName}}</td>
              </tr>
              <tr>
                <th style="width:65px;">车主证件号</th>
                <td>{{policyData.vehicle.carOwnerIDNo}}</td>
              </tr>
              <tr v-show="policyData.vehicle.carOwnerMobile">
                <th>车主手机号</th>
                <td>{{policyData.vehicle.carOwnerMobile}}</td>
              </tr>
            </table>
            <table v-if="policyData.applicant" class="rbpolicy-table vehicle-info" cellpadding="0" cellspacing="0">
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
            <table v-if="policyData.insured" class="rbpolicy-table vehicle-info" cellpadding="0" cellspacing="0">
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
        <div v-if="policyData.bzInsure">
          <h3 class="rbpolicy-title">交强险</h3>
          <p class="rbpolicy-num" v-show="policyData.bzInsure.insureNo">投保单号: {{policyData.bzInsure.insureNo}}</p>
          <p class="rbpolicy-num" v-show="policyData.bzInsure.policyNo">保单号: {{policyData.bzInsure.policyNo}}</p>
          <table class="rbpolicy-table" cellpadding="0" cellspacing="0">
            <tr>
              <th class="gray-th">生效日期</th>
              <td class="gray-td">{{policyData.bzInsure.beginDate}} 至 {{policyData.bzInsure.endDate}}</td>
            </tr>
            <tr>
              <th class="gray-th">车船税</th>
              <td class="gray-td">{{policyData.bzInsure.totalTax ? policyData.bzInsure.totalTax:0.00}}元</td>
            </tr>
            <tr>
              <th class="gray-th">保费(元)</th>
              <td class="gray-td">{{policyData.bzInsure.premium ? policyData.bzInsure.premium : 0.00}}元</td>
            </tr>
          </table>
        </div>
        <div v-if="policyData.bsInsure">
          <h3 class="rbpolicy-title">商业险</h3>
          <p class="rbpolicy-num" v-show="policyData.bsInsure.insureNo">投保单号: {{policyData.bsInsure.insureNo}}</p>
          <p class="rbpolicy-num" v-show="policyData.bsInsure.policyNo">保单号: {{policyData.bsInsure.policyNo}}</p>
          <table class="rbpolicy-table" cellpadding="0" cellspacing="0">
            <tr>
              <th class="gray-th">生效日期</th>
              <td class="gray-td">{{policyData.bsInsure.beginDate}} 至 {{policyData.bsInsure.endDate}}</td>
            </tr>
            <tr>
              <th class="gray-th">保费(元)</th>
              <td class="gray-td">{{policyData.bsInsure.premium ? policyData.bsInsure.premium : 0.00}}元</td>
            </tr>
          </table>
        </div>
        <div v-if="hasNonCar">
          <h3 class="rbpolicy-title">非车险</h3>
          <div v-for="item in policyData.accidentInsurances" style="color:#666;">
            <div class="bzBox" v-show='item.policyNo'>
              <h3>保单号：</h3>
              <p>{{item.policyNo}}</p>
            </div>
            <div class="bzBox" v-show='item.insuranceName'>
              <h3>险种名称：</h3>
              <p>{{item.insuranceName}}</p>
            </div>
            <div class="bzBox" v-show='item.beginDate'>
              <h3>保险起止：</h3>
              <p>{{item.beginDate}} - {{item.endDate}}</p>
            </div>
            <div class="bzBox" v-show='item.premium'>
              <h3>保费(元)：</h3>
              <p>{{item.premium}}</p>
            </div>
            <div style="background:#F5F5F5;height:5px"></div>
          </div>
        </div>
      </div>
    </div>
    <footer v-show="policyData.premium">
      <div class="mint-footer fn-clear">
        <div style="display: flex;height: 100%;float: right;float:left">
          <p style="height:100%;display:flex;align-items: center;padding-left:15px">总保费(元):<span style="color:red;font-size:18px">{{policyData.premium}}</span></p>
        </div>
        <div class="btnItem">
          <van-button type="info" style="margin-right:5px;background-color:#f94037;color:#FFF;font-size:13px" v-show="policyData.insureStatus == 'VerifiedSuccess'" @click="payPage(policyData.payUrl)">去支付</van-button>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import axios from 'axios';
import { Button } from 'vant';
export default {
  name: 'quotedetail',
  data() {
    return {
      appId: '',
      token: '',
      title: '',
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      jiaoq: true,
      shangye: true,
      show: true,
      qianjiao: true,
      whether: '',
      showPay: false,
      loading: true,
      policyData: {
        "insCityCode": "",
        "insCityName": "",
        "insureNo": "",
        "premium": "",
        "accidentInsurancePremium": "",
        "payUrl": "",
        "insuredTime": "",
        "salesmanId": "",
        "sellerName": "",
        "organCode": "",
        "organName": "",
        "insureStatus": "",
        "insureStatusDisplay": "",
        "creatorName": "",
        "applicant": {
          "name": "",
          "phone": "",
          "idNo": "",
          "type": "",
          "typeDisplay": "",
          "relationPeopleType": "",
          "relationPeopleTypeDisplay": "",
          "email": ""
        },
        "insured": {
          "name": "",
          "phone": "",
          "idNo": "",
          "type": "",
          "typeDisplay": "",
          "relationPeopleType": "",
          "relationPeopleTypeDisplay": "",
          "email": ""
        },
        "vehicle": {
          "plateNo": "",
          "vin": "",
          "engineNo": "",
          "registerDate": "",
          "carOwnerName": "",
          "carOwnerRelationType": "",
          "carOwnerRelationTypeDisplay": "",
          "carOwnerType": "",
          "carOwnerTypeDisplay": "",
          "carOwnerIDNo": "",
          "carOwnerMobile": ""
        },
        "bsInsure": {
          "beginDate": "",
          "endDate": "",
          "insureNo": "",
          "policyNo": "",
          "premium": "",
          "insuranceCode": "",
          "insuranceName": ""
        },
        "bzInsure": {
          "totalTax": "",
          "beginDate": "",
          "endDate": "",
          "insureNo": "",
          "policyNo": "",
          "premium": "",
          "insuranceCode": "",
          "insuranceName": ""
        },
        "accidentInsurances": [{
          "beginDate": "",
          "endDate": "",
          "insureNo": "",
          "policyNo": "",
          "premium": "",
          "insuranceCode": "",
          "insuranceName": ""
        }]
      },
      hasNonCar: false,
      policyId: 0,
      shouldShowVehicle: false,
    }
  },
  created() {
    this.policyId = this.$route.query.itemId
    Indicator.open('加载中, 请稍等...');
    axiosGetAPI('/vi/piccWap/applications/' + this.policyId).then((res) => {
      Indicator.close();
      if (res.result) {
        this.policyData = res.result;
        this.hasNonCar = (this.policyData.accidentInsurances && this.policyData.accidentInsurances.length > 0);
      }
    });
  },
  methods: {
    //跳付款
    payPage: function(url) {
      this.$router.push({ path: '/piccOnlineQuote/pay?payUrl=' + url });
    },
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
.rbpolicy-content {
  padding: 44px 0 90px;
  /* background-color: #f9f9f9; */
}

.rbpolicy-detail {
  position: relative;
  width: 86%;
  margin: 10px auto;
  padding: 14px 4%;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff;
}

.rbpolicy-detail:after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: 0;
  width: 100%;
  height: 60px;
  background: url(../../assets/images/bg-paper.png) no-repeat left top;
  background-size: 100%;
}

.rbpolicy-vehicle {
  position: relative;
  margin-bottom: 8px;
}

.rbpolicy-hd {
  position: relative;
  height: 80px;
  overflow: hidden;
  transition: all .2s;
  -webkit-transition: all .2s;
}

.rbpolicy-hd.show {
  height: auto;
  border: 0px solid #FFF;
}

.rbpolicy-vehicle .btn-show {
  display: block;
  width: 100%;
  height: 25px;
  text-align: center;
}

.rbpolicy-vehicle .ico-arrow {
  display: inline-block;
  position: relative;
  top: 8px;
  border: 6px solid transparent;
  border-top: 6px solid #888;
}

.rbpolicy-vehicle .ico-arrow em {
  position: absolute;
  top: -6px;
  left: -4px;
  border: 4px solid transparent;
  border-top: 4px solid #fff;
  transition: all .2s;
  -webkit-transition: all .2s;
}

.rbpolicy-vehicle .btn-show.cur .ico-arrow {
  top: 0;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -o-transform: rotate(180deg);
}

.rbpolicy-plateno {
  font-size: 18px;
  font-weight: 400;
  color: #333;
}

.rbpolicy-table {
  width: 100%;
  margin-bottom: 10px;
  color: #666;
  font-size: 13px;
  text-align: left;
}

.rbpolicy-table.sy-table td {
  text-align: right;
}

.rbpolicy-table th,
.rbpolicy-table td {
  padding: 3px 5px 3px 0;
}

.rbpolicy-table th {
  font-weight: 400;
  color: #333;
}

.rbpolicy-title {
  padding-top: 10px;
  font-size: 15px;
  color: #333;
  font-weight: 600;
}

.rbpolicy-table.vehicle-info th {
  color: #666;
}

.rbpolicy-table .gray-th {
  color: #666;
}

.rbpolicy-table .gray-td {
  color: #333;
}

.rbpolicy-num {
  line-height: 30px;
  margin-bottom: 5px;
  font-size: 13px;
  color: #f94037;
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

.bzBox {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bzBox h3 {
  font-size: 13px;
  color: #666;
  font-weight: normal;
}

.bzBox p {
  font-size: 12px;
  color: #666;
  font-weight: normal;
}

.btnItem {
  display: flex;
  height: 100%;
  float: right;
  vertical-align: middle;
  text-align: center;
  margin-top: 5px;
}

.btnItem button {
  flex: 1;
  width: 50%;
  height: 75%;
}

</style>
