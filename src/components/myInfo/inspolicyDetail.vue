<template>
  <div class="home" style="background-color:#FFF">
    <mt-header fixed class="def-header cust-head" title="保单详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="policy-content">
      <div class="policy-top" v-show="Underwriting">
        <h2>核保失败</h2>
        <p>失败原因：</p>
      </div>
      <div class="policy-detail">
        <div class="policy-vehicle">
          <div class="policy-hd" :class="{ 'show': shouldShowVehicle}">
            <h3 class="policy-plateno">{{policyData.plateNo}}{{policyData.car.owner.name}}</h3>
            <table class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
              <colgroup>
                <col width="70">
                <col>
              </colgroup>
              <tr>
                <th>承保公司</th>
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
                <td>{{policyData.car.registerDate}}</td>
              </tr>
              <tr>
                <th>是否过户</th>
                <td v-text="policyData.car.isChangedOwner == 'true'?'是': '否'"></td>
              </tr>
              <tr v-show="policyData.car.isChangedOwner">
                <th>过户日期</th>
                <td>{{policyData.car.changedOwnerDate}}</td>
              </tr>
              <tr>
                <th>投保车型</th>
                <td>{{policyData.car.fullPriceModel}}</td>
              </tr>
            </table>
            <table class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
              <tr>
                <th>车主名</th>
                <td>{{policyData.car.owner.name}}</td>
              </tr>
              <tr>
                <th style="width:65px;">车主证件号</th>
                <td>{{policyData.car.owner.idNo}}</td>
              </tr>
              <tr v-show="policyData.car.owner.phone != ''">
                <th>车主手机号</th>
                <td>{{policyData.car.owner.phone}}</td>
              </tr>
            </table>
            <table v-if="policyData.applicant != ''" class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
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
            <table v-if="policyData.insured != ''" class="policy-table vehicle-info" cellpadding="0" cellspacing="0">
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
        <div v-if="jiaoq">
          <h3 class="policy-title">交强险</h3>
          <p class="policy-num">保单号: FM2016120612546858</p>
          <table class="policy-table" cellpadding="0" cellspacing="0">
            <tr>
              <th class="gray-th">生效日期</th>
              <td class="gray-td">{{policyData.bzRiskKind.beginDate}}--{{policyData.bzRiskKind.endDate}}</td>
            </tr>
            <tr>
              <th class="gray-th">保费</th>
              <td class="gray-td">￥{{policyData.bzRiskKind.premium}}</td>
            </tr>
            <tr>
              <th class="gray-th">车船税</th>
              <td class="gray-td">￥{{policyData.bzRiskKind.vehicleTax ? policyData.bzRiskKind.vehicleTax.totalTax:0}}</td>
            </tr>
          </table>
        </div>
        <div v-if="shangye">
          <h3 class="policy-title">商业险</h3>
          <p class="policy-num">保单号: FM2016120612557947</p>
          <!--  <table class="policy-table sy-table" cellpadding="0" cellspacing="0">
                    <tr><th class="gray-th">生效日期</th><td class="gray-td" style="width: 140px">{{policyData.bsRiskKind.beginDate}}-{{policyData.bsRiskKind.endDate}}</td></tr>
                    <tr><th class="gray-th">投保险种</th><td>保额(元)</td></tr>
                    <tr v-for='item in policyData.bsRiskKind.items'>
                        <th>{{item.riskKindItemName}}<em v-text="item.isDeductible ? '(不计免赔)' : ''"></em></th>
                        <td>
                            <span v-if="item.riskKindItemCode=='CKZRX'"><em v-text="item.coverage + '*' +policyData.car.passengerCapacity"></em></span>
                            <span v-else-if="item.riskKindItemCode=='BLX'"><em v-text="item.coverage == 'Home' ? '国产' : '进口'"></em></span>
                            <span v-else-if="item.coverage=='0'">投保</span>
                            <span v-else>{{item.coverage}}</span>
                        </td>
                    </tr>
                    <tr><th></th><td class="gray-th">保费总额: <em class="gray-td">{{policyData.premium}}元</em></td></tr>
                </table> -->
          <div class="detail-row-three">
            <ul style="font-size: 14px;color: #333333 width:100$;">
              <li class="detail-row-three-left">险种</li>
              <li class="detail-row-three-center">保费(￥)</li>
              <li class="detail-row-three-right">不计免赔(￥)</li>
            </ul>
          </div>
          <div class="detail-row-three" v-for="item in policyData.bsRiskKind.items">
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
          <div class="footer">
            <span class="mint-footer-left">
                <div class="footone">
                    <p class="smallboxone">总保费:</p>
                    <p class="bigreds">{{policyData.premium}}元</p>
                </div>
            </span>
            <mt-button class="btn-yes" type="primary" v-show="Immediately" @click="openUnderwriting">立即投保</mt-button>
            <mt-button class="btn-yes" type="primary" v-show="Toinsure" @click="openUnderwriting">重新核保</mt-button>
            <mt-button class="btn-yes" type="primary" v-show="Uploaddata" @click="supplement">补充资料</mt-button>
            <mt-button class="btn-yes" type="primary" v-show="According" id="According">付款</mt-button>
          </div>
        </div>
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
      shouldShowVehicle: false,
      jiaoq: true,
      shangye: true,
      Toquote: false,
      Uploaddata: false,
      Toinsure: false,
      Immediately: false,
      Underwriting: true,
      According: false,
      unwritData: { //核保提交的数据
        express: {
          receiverAddress: "",
          receiverName: "",
          receiverMobile: "",
          zipCode: "",
          email: "",
          expressType: "SelfTake" //['Send'快递, 'SelfTake'自取]
        },
        invoice: {
          ticketAddress: "",
          depositBankName: "",
          depositBankAccount: "",
          certificateNo: "",
          depositBankPhone: ""
        }
      },
      order: {
        name: '',
        insBatchNo: "",
        insCorpCode: "",
        premium: "",
        shortName: "",
        plateNo: ""
      },
      policyData: [{
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
        "bzRiskKind": { "vehicleTax": { "totalTax": "", "tax": "", "preTax": "", "lateFeesOfTax": "" }, "beginDate": "", "endDate": "", "insureNo": "", "policyNo": "", "premium": "", "insDiscount": "" },
        "bsRiskKind": { "items": [{ "riskKindItemName": "", "premium": "", "quantity": "", "deductiblePremium": "", "coverage": "", "riskKindItemCode": "", "isDeductible": "" }], "beginDate": "", "endDate": "", "insureNo": "", "policyNo": "", "premium": "", "insDiscount": "" }
      }]
    }
  },
  created: function() {
    if (store.state.policyDetail) {
      var self = this;
      if (store.state.policyDetail.bzRiskKind) { this.jiaoq = true; } else { this.jiaoq = false; }
      if (store.state.policyDetail.bsRiskKind) { this.shangye = true } else(this.shangye = false)
      self.policyData = store.state.policyDetail;
      if (store.state.policyDetail.insureStatus == "VerifiedFailed") {
        self.Toinsure = true; //核保失败
      }
      if (store.state.policyDetail.isRequireMaterial) {
        self.Uploaddata = true; //需要补充资料
      };
      if (store.state.policyDetail.insureStatus == "QuotedSuccess") {
        self.Immediately = true; //待核保
        self.Underwriting = false;
      };
      if (store.state.policyDetail.insureStatus == "VerifiedSuccess") {
        self.Underwriting = false;
        self.According = true;
      };
    } else {
      //this.$router.push({path:"/myInfo/myPolicy"});
      this.$router.push({ path: "/quoteManagement/insdatail" });
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
    },
    openUnderwriting: function() {
      if (this.policyData.insCity.code != 440300) {
        var that = this;
        var obj = {};
        obj.relationType = that.policyData.car.owner.relationType; //拥有者类型
        obj.insBatchNo = that.policyData.insBatchNo; //投保编号
        obj.insCorpCode = that.policyData.insCorp.code; //投保保险公司编号
        obj.invoiceName = that.policyData.car.owner.name; //拥有者姓名
        obj.insCorpName = that.policyData.insCorp.shortName; //投保保险公司编号
        this.$event.$emit('handle-insure', obj);
        var url = '/vi/insurePolicies/' + this.policyData.insBatchNo + '/' + that.policyData.insCorp.code
        axiosPostAPI(url, that.unwritData).then((res) => {
          var quoteJson = {
            insCorpCode: obj.insCorpCode,
            insBatchNo: obj.insBatchNo,
            insCorpName: obj.insCorpName
          }
          Indicator.close();
          this.$router.push({ path: "/quoteManagement/uwResult", query: quoteJson });
        })
      } else if (this.policyData.insCity.code == 440300) {
        var that = this;
        var obj = {};
        obj.relationType = that.policyData.car.owner.relationType; //拥有者类型
        obj.insBatchNo = that.policyData.insBatchNo; //投保编号
        obj.insCorpCode = that.policyData.insCorp.code; //投保保险公司编号
        obj.invoiceName = that.policyData.car.owner.name; //拥有者姓名
        obj.insCorpName = that.policyData.insCorp.shortName; //投保保险公司编号
        obj.insCity = that.policyData.insCity
        obj.car = that.policyData.car
        obj.insCorp = that.policyData.insCorp
        obj.insBatchNo = that.policyData.insBatchNo
        this.$event.$emit('handle-insure', obj);
        this.$router.push({ path: "/quoteManagement/underwriting", query: obj });
      }
    },
    supplement: function() {
      var self = this;
      var obj = {
        name: store.state.policyDetail.car.owner.name,
        insBatchNo: store.state.policyDetail.insBatchNo,
        insCorpCode: store.state.policyDetail.insCorp.code,
        premium: store.state.policyDetail.premium,
        shortName: store.state.policyDetail.insCity.shortName,
        plateNo: store.state.policyDetail.car.plateNo
      }
      self.$router.push({ path: "/quoteManagement/supplement", query: obj });
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

.detail-row-three {
  height: 30px;
  color: #888888;
  font-size: 12px;
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

.policy-top {
  height: 60px;
  text-align: center;
  padding-top: 20px;
}

.policy-top h2 {
  font-size: 24px;
  color: #FC3738;
  line-height: 20px;
  font-weight: 100
}

.policy-top p {
  margin-left: 25px;
  float: left;
  font-size: 12px;
  color: #999999;
  line-height: 20px;
}

.footer {
  width: 100%;
  height: 50px;
  background-color: #fff;
  -webkit-box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.05);
}

.mint-footer-left {
  float: left;
  padding-left: 4%;
}

.smallboxone {
  font-size: 12px;
  color: #888888;
}

.bigreds {
  color: #FC3738;
  font-size: 18px;
}

.btn-yes {
  float: right;
  margin-left: 5px;
  margin-top: 10px;
}

#According {
  background-color: #ff464c;
}

/*.gray-th{float: right;}*/

</style>
