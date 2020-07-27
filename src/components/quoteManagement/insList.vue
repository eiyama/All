<template>
  <div class="inslist" ref="inslist" style="background-color:#F5F5F5;">
    <mt-header fixed class="def-header cust-head" title="报价列表">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right">
        <van-checkbox v-model="checked" style="float:right">
          <img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive" style="width:.48rem;height:.48rem;">
        </van-checkbox>
      </div>
    </mt-header>
    <div class="container-center">
      <!-- <p class="quote-bar">{{cityName}} {{plateNo}} {{ownerName}}</p>
            <div class="quote-row">当前报价险企{{codesLen}}家</div> -->
      <div :style="inwrppera" ref="wrppera">
        <div class="mint-region" v-for="(item,index) in insArr">
          <div @click.stop="toQuoteDetail(item,index)">
            <mt-cell class="mint-list" title="" :title="item.insCorp.shortName" icon="back">
              <img slot="icon" class="ico-ins" :src="item.src ? item.src : defaultImg">
              <span class="quote-money" style="display: inline-grid;" v-show="item.insureStatus != 'loading'">
                <p style="padding-bottom: .14rem;text-align:right" v-show="item.insureStatus != 'QuotedFailed' && item.insureStatus != 'VerifiedFailed' &&  item.insureStatus != 'Duplicate' " >￥{{item.premium}}</p>
                <p style="color:#4192E8;margin-left:.24rem;text-align:right" v-show="item.insureStatus" v-text="item.insureStatus == 'VerifiedSuccess'?'待缴费': item.insureStatus == 'QuotedSuccess'?'待核保':item.insureStatus == 'Paid'?'已支付':item.insureStatus == 'Insured'?'已承保':
                item.insureStatus == 'NeedManualAudit'?'人工核保中':''"></p>
              </span>
              <div class="quoting" v-show="item.insureStatus == 'loading'">
                <p class="q-txt">报价中</p>
                <p>
                  <em class="J-countdown" v-html="item.random"></em>%
                  <img class="q-loading" src="../../assets/images/ad-loading.gif">
                </p>
              </div>
              <p class="fail-txt" v-show="item.insureStatus == 'QuotedFailed'">报价失败</p>
              <p class="fail-txt" v-show="item.insureStatus == 'VerifiedFailed'">核保失败</p>
              <p class="fail-txt" v-show="item.insureStatus == 'Duplicate'" style="color:orange">重复投保</p>
              <i class="ico-arrow" v-show="item.insureStatus != 'QuotedFailed'&& item.insureStatus != 'VerifiedFailed' && item.insureStatus != 'Duplicate'" ></i>
            </mt-cell>
          </div>
          <div style="height:.4rem" v-show="item.insureStatus != 'QuotedFailed' && item.insureStatus != 'VerifiedFailed' 
              && item.costsDisplay && checked">
            <p style="float:right;font-size:.2rem;color: #f94037;margin-right:.5rem">{{item.costsDisplay}}</p>
          </div>
          <div class="mint-results">
            <div class="results-area">
              <div class="fail-reason" v-show="item.remark && item.insureStatus != 'VerifiedSuccess'">
                <i class="ico-open" @click.stop="downFailTxt"></i>{{item.remark}}
              </div>
              <div class="msgUp">
                <van-button style="color: #f94037;border:1px solid #f94037;border-radius:.1rem;margin-bottom: .2rem;" v-show="item.isRequireMaterial" size="small" @click="uploadAttachment(item.insBatchNo,item.insCorp.code)">资料补充</van-button>
                <van-button style="color: #f94037;border:1px solid #f94037;border-radius:.1rem;margin-bottom: .2rem;" v-show="item.insureStatus == 'VerifiedSuccessToShuanglu'" size="small" @click="goDualRecord(item,index)">去双录</van-button>
                <van-button style="color: #f94037;border:1px solid #f94037;border-radius:.1rem;margin-bottom: .2rem;" v-show="item.insureStatus == 'QuotedFailed' || item.insureStatus == 'VerifiedFailed'" size="small" @click="modifyInfo(item,index)">修改资料</van-button>
                <van-button style="color: #f94037;border:1px solid #f94037;border-radius:.1rem;margin-bottom: .2rem;" v-show="item.insureStatus == 'QuotedFailed' || item.insureStatus == 'VerifiedFailed'" size="small" @click.stop="reQuote" :code="item.insCorp.code">重新报价</van-button>
                <van-button style="color: #f94037;border:1px solid #f94037;border-radius:.1rem;margin-bottom: .2rem;" v-if="((item.insureStatus == 'QuotedSuccess' && item.bsRiskKind) || (item.insureStatus == 'QuotedFailed' && item.canModifyDiscount)) && item.insCorp.code != 'pingan' " size="small" @click.stop="openModifyInDiscount(item)" :code="item.insCorp.code">申请商业险折扣</van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showfullPrice" position="bottom">
      <mt-header class="def-header" title="车型不匹配">
        <div slot="left" @click="showfullPrice = false">
          <img src="../../assets/images/ico-close.png" style="width: .36rem;height: .36rem;" />
        </div>
        <div slot="right" style="display:flex;height:.6rem;justify-content: flex-end;">
          <van-button style="color:#f94037;font-size:.28rem;" type="default" size="small" @click="reSelectQuote" plain>重新报价</van-button>
        </div>
      </mt-header>
      <p style="padding-left:15px;line-height:.9rem;font-size:.28rem;color:red">保险公司提示：您选择的车型不匹配，请重新选择车型；</p>
      <p style="padding-left:15px;line-height:.4rem;font-size:.28rem;color:red">推荐车型如下：</p>
      <van-radio-group v-model="currentIndex">
        <van-cell-group>
          <van-cell v-for="(item, index) in fullPriceValues" :key="index" :title="item.fullPriceModel" @click="currentIndex = index">
            <van-radio slot="right-icon" :name="index" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <van-popup v-model="showInsuredInfo" position="bottom">
      <mt-header class="def-header" title="险种投保日期有误">
        <div slot="left" @click="showInsuredInfo = false">
          <img src="../../assets/images/ico-close.png" style="width: .36rem;height: .36rem;" />
        </div>
        <div slot="right" style="display:flex;height:.6rem;justify-content: flex-end;">
          <van-button style="color:#f94037;font-size:.28rem;" type="default" size="small" @click="reInsured" plain>重新报价</van-button>
        </div>
      </mt-header>
      <p style="padding-left:15px;line-height:.6rem;font-size:.28rem;color:red">保险公司提示：您选择的投保日期有误，请重新报价；</p>
      <p style="padding-left:15px;line-height:.4rem;font-size:.28rem;color:red">推荐信息如下：</p>
      <table class="mint-table" style="margin-top:-1px;" cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="35%">
          <col width="65%">
        </colgroup>
        <tr v-for="(item, index) in suggestedInsurance" :key="index">
          <th style="background-color:#F3F3F3;">{{item.fieldName}}</th>
          <td style="color:#333;">{{item.fieldValue}}</td>
        </tr>
      </table>
    </van-popup>
    <van-popup v-model="showDiscountSchemes" position="bottom">
      <mt-header class="def-header" title="平安-选择方案决策">
        <div slot="left" @click="showDiscountSchemes = false">
          <img src="../../assets/images/ico-close.png" style="width: .36rem;height: .36rem;" />
        </div>
        <div slot="right" style="display:flex;height:.6rem;justify-content: flex-end;">
          <van-button style="color:#0070D3;font-size:.28rem;" type="default" size="small" @click="reSelectScheme" plain>重新报价</van-button>
        </div>
      </mt-header>
      <table class="mint-table" style="margin-top:-1px;" cellpadding="0" cellspacing="0">
        <colgroup>
          <col width="10%">
          <col width="20%">
          <col width="30%">
          <col width="20%">
          <col width="20%">
        </colgroup>
        <tr>
          <th style="background-color:#F3F3F3;"></th>
          <td style="background-color:#F3F3F3;">方案名称</td>
          <td style="background-color:#F3F3F3;">自主核保系数</td>
          <td style="background-color:#F3F3F3;">渠道系数</td>
          <td style="background-color:#F3F3F3;">手续费(%)</td>
        </tr>
        <tr v-for="(item, index) in quoteDiscountSchemes" :key="index">
          <th style="color:#333;">
            <van-radio-group v-model="currentQuoteSchemesItem">
              <van-radio :name="item"></van-radio>
            </van-radio-group>
          </th>
          <td style="color:#333;">{{item.name}}</td>
          <th style="color:#333;">{{item.selfUnderWritingRate}}</th>
          <td style="color:#333;">{{item.channelRate}}</td>
          <th style="color:#333;">{{item.commissionBrokerFee * 100}}</th>
        </tr>
      </table>
    </van-popup>
    <van-popup v-model="showModifyInsDiscount" position="bottom">
      <mt-header class="def-header" title="商业险折扣申请">
        <div slot="left" @click="showModifyInsDiscount = false">
          <img src="../../assets/images/ico-close.png" style="width: .36rem;height: .36rem;" />
        </div>
        <div slot="right" style="display:flex;height:.6rem;justify-content: flex-end;">
          <van-button style="color:#f94037;font-size:.28rem;" type="default" size="small" @click="reModifyInDiscount" plain>重新报价</van-button>
        </div>
      </mt-header>
      <p style="padding-left:15px;line-height:.6rem;font-size:.28rem;color:red">注：根据车辆的情况、渠道的类型、业务性质都会影响折扣，不是每台车折扣申请都能通过</p>
      <div style="display:flex;align-items: center;padding:15px;">
        <van-field v-model="modifyInsDiscount" required clearable label="折扣系数" placeholder="输入折扣系数" style="border:1px solid #eee" />
        <span style="margin-left:.1rem;color:#666">{{currentInsDiscount}}</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Button } from 'vant';
import event from './../../common/event';
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
import store from './../../store/store'
import * as types from './../../store/types';

var Method, reMethod, insArray = [],
  quoteInfoStatus = {};
export default {
  name: 'inslist',
  data() {
    return {
      currentInsCorp: '',
      modifyInsDiscount: '',
      currentInsDiscount: 0,
      currentQuoteSchemesItem: '',
      insArr: [],
      codes: [],
      initArr: [],
      quoteInfo: [],
      cityName: '',
      plateNo: '',
      ownerName: '',
      codesLen: 0,
      insBatchNo: '',
      insurePolicies: {},
      countdown: parseInt(10 * Math.random()),
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      checked: true,
      icon: {
        inactive: require('../../assets/images/eye-close.png'),
        active: require('../../assets/images/eye-open.png')
      },
      inwrppera: {
        "padding-top": ".1rem",
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background-color": "#F5F5F5",
      },
      status: "VerifiedSuccessToShuanglu",
      currentIndex: 0,
      currentQuoteInfo: {},
      showfullPrice: false,
      fullPriceValues: [],
      showInsuredInfo: false,
      showDiscountSchemes: false,
      suggestedInsurance: [],
      suggestedType: ["SuggestedVehicle", "SuggestedInsured", "QuoteDiscountSchemes", "QuoteLowDiscount"],
      quoteDiscountSchemes: [],
      showModifyInsDiscount: false,
    };
  },
  mounted() {
    var self = this;
    self.initHeight();
    var insurePolicies = store.state.insurePolicies;
    if (insurePolicies && Object.keys(insurePolicies).length > 0) {
      this.insurePolicies = insurePolicies;
      self.initList(this.insurePolicies);
    }
  },
  methods: {
    openModifyInDiscount: function(item) {
      var self = this;
      if (item.bsRiskKind) {
        self.currentInsDiscount = item.bsRiskKind.insDiscount;
      } else{
        self.currentInsDiscount = '';
      }
      
      self.currentInsCorp = item.insCorp;
      self.showModifyInsDiscount = true;
    },
    reModifyInDiscount: function() {
      var self = this;
      if (self.modifyInsDiscount) {
        self.currentQuoteInfo.insCorps = [];
        self.currentQuoteInfo.insCorps.push(self.currentInsCorp);
        self.currentQuoteInfo.quotation = {};
        self.currentQuoteInfo.quotation.purchasingBsRate = self.modifyInsDiscount;
        console.log(JSON.stringify(self.currentQuoteInfo));
        self.getInsCode(self.currentQuoteInfo);
      } else {
        Toast('请输入折扣系数');
      }
      self.showModifyInsDiscount = false;
    },
    reInsured: function() {
      var self = this;
      if (self.suggestedInsurance && self.suggestedInsurance.length > 0) {
        var suggestRiskKind = '';
        var suggestBeginDate = '';
        for (var i = 0; i < self.suggestedInsurance.length; i++) {
          var item = self.suggestedInsurance[i];
          if (item.fieldCode == 'RiskKind') {
            suggestRiskKind = item.fieldValue;
          }
          if (item.fieldCode == 'EndDate') {
            suggestBeginDate = item.fieldValue;
          }
        }
        // var bzBeginDate = suggestRiskKind !== "商业险" ? suggestBeginDate : "";
        // var bsBeginDate = suggestRiskKind === "商业险" ? suggestBeginDate : "";
        self.currentQuoteInfo.bzRiskKind = {};
        self.currentQuoteInfo.bzRiskKind.beginDate = suggestBeginDate.split(" ")[0];

        self.currentQuoteInfo.bsRiskKind = {};
        self.currentQuoteInfo.bsRiskKind.beginDate = suggestBeginDate.split(" ")[0];
        // console.log("修改后的投保日期：" + JSON.stringify(self.currentQuoteInfo));
        self.getInsCode(self.currentQuoteInfo);
      }
      self.showInsuredInfo = false;
    },
    reSelectQuote: function() {
      var self = this;
      if (self.fullPriceValues && self.fullPriceValues.length > 0) {
        var item = self.fullPriceValues[self.currentIndex];

        self.currentQuoteInfo.car.brandName = item.brandName;
        self.currentQuoteInfo.car.model = item.model;
        self.currentQuoteInfo.car.makerModel = item.makerModel;
        self.currentQuoteInfo.car.purchasePrice = item.purchasePrice;
        self.currentQuoteInfo.car.year = item.year;
        self.currentQuoteInfo.car.remark = item.remark;
        self.currentQuoteInfo.car.exhaustMeasure = item.exhaustMeasure;
        self.currentQuoteInfo.car.passengerCapacity = item.passengerCapacity;
        self.currentQuoteInfo.car.weightCapacity = item.weightCapacity;
        self.currentQuoteInfo.car.analogyCarPrice = item.analogyCarPrice;
        self.currentQuoteInfo.car.vehicleModelCode = item.vehicleModelCode;
        self.currentQuoteInfo.car.fullPriceModel = item.fullPriceModel;
        self.currentQuoteInfo.car.licenceType = item.licenceType;
        self.currentQuoteInfo.car.licenseVehicleType = item.licenseVehicleType;
        // console.log("修改后的车型价格：" + JSON.stringify(self.currentQuoteInfo));
        self.getInsCode(self.currentQuoteInfo);
      }
      self.showfullPrice = false;
    },
    reSelectScheme: function() {
      var self = this;
      if (self.currentQuoteSchemesItem) {
        self.currentQuoteInfo.quotation = {};
        self.currentQuoteInfo.quotation.quoteSchemesIndex = self.currentQuoteSchemesItem.index;
        console.log(JSON.stringify(self.currentQuoteInfo));
        self.getInsCode(self.currentQuoteInfo);
      }
      self.showDiscountSchemes = false;
    },
    initHeight: function() {
      this.inwrppera.height = window.innerHeight + 'px';
    },
    openBack: function() {
      clearInterval(reMethod);
      clearInterval(Method);
      this.$router.push({ path: "/quotationList/quotationIndex" });
      // window.history.back();
    },
    uploadAttachment(insBatchNo, code) {
      var self = {};
      self.insBatchNo = insBatchNo;
      self.insCorpCode = code;
      this.$router.push({ path: "/supplementUp", query: self });
    },
    isContained: (a, b) => {
      if (!(a instanceof Array) || !(b instanceof Array)) return false;
      if (a.length < b.length) return false;
      var aStr = a.toString();
      for (var i = 0, len = b.length; i < len; i++) {
        if (aStr.indexOf(b[i]) == -1) return false;
      }
      return true;
    },
    initList: function(quoteInfo) {
      var self = this;
      var datas = quoteInfo,
        codes = [];
      insArray = [];
      for (var i = 0; i < datas.policies.length; i++) {
        var insItem = datas.policies[i],
          insJson = {};
        insJson.insCorp = insItem.insCorp;
        insJson.insureStatus = 'loading';
        insJson.random = parseInt(10 * Math.random());
        insJson.isSelIns = true;
        insArray.push(insJson)
        codes.push(insItem.insCorp.code)
      }
      self.codes = codes
      self.insArr = insArray
      self.codesLen = codes.length
      self.insArr.map(item => {
        try{
         item.src = require(`@/assets/images/companys/${item.insCorp.code}.png`)
        } catch(err){
         item.src = require(`@/assets/images/companys/defaultImg.png`)
        }
      });
      var hander;
      hander = setInterval(function() {
        for (var i = 0; i < self.insArr.length; i++) {
          var temp = self.insArr[i];
          if (temp.random > 95) {
            clearInterval(hander);
          }
          temp.random++
        }
      }, 2000)
      self.insBatchNo = datas.insBatchNo
      var url = '/vi/insurePolicies/' + self.insBatchNo;
      self.getResultList(url, false);
    },
    getInsCode: function(quoteInfo) {
      var self = this;
      Indicator.open('加载中...');
      self.currentQuoteInfo = quoteInfo;
      quoteInfoStatus.quoteInfo = quoteInfo;
      axiosPutAPI('/vi/insurePolicies/' + self.insBatchNo, quoteInfo).then((res) => {
        Indicator.close();
        var datas = res.result,
          codes = [];
        insArray = [];
        for (var i = 0; i < datas.insCorps.length; i++) {
          var insItem = datas.insCorps[i],
            insJson = {};
          insJson.insCorp = insItem;
          insJson.insureStatus = 'loading';
          insJson.random = parseInt(10 * Math.random());
          insJson.isSelIns = true;
          insJson.suggestedInfo = {};
          insArray.push(insJson);
          codes.push(insItem.code)
        }
        self.codes = codes
        self.insArr = insArray
        self.codesLen = codes.length
        self.insArr.map(item => {
          try{
           item.src = require(`@/assets/images/companys/${item.insCorp.code}.png`)
          } catch(err){
           item.src = require(`@/assets/images/companys/defaultImg.png`)
          }
        });
        var hander;
        hander = setInterval(function() {
          for (var i = 0; i < self.insArr.length; i++) {
            var temp = self.insArr[i];
            if (temp.random > 95) {
              clearInterval(hander);
            }
            temp.random++
          }
        }, 2000)
        self.insBatchNo = res.result.insBatchNo;
        var suggestedVehicleModels = res.result.suggestedVehicleModels;
        if (suggestedVehicleModels && suggestedVehicleModels.length > 0) {
          self.fullPriceValues = suggestedVehicleModels;
          // console.log(self.fullPriceValues);
          self.showfullPrice = true;
        } else {
          self.showfullPrice = false;
        }
        if (self.insBatchNo) {
          clearInterval(reMethod);
          clearInterval(Method);
          self.initList(this.insurePolicies);
        }
      });
    },
    getResultList: function(url, isRe) {
      var self = this,
        url = url;
      if (self.showfullPrice || self.showInsuredInfo) {
        clearInterval(reMethod);
        clearInterval(Method);
        return;
      }
      axiosGetAPI(url).then((res) => {
        if (res.result) {
          var result = res.result,
            insTemp = [],
            len = 0;

          if (isRe == true) {
            len = 1
            reMethod = setTimeout(function() { self.getResultList(url, isRe) }, 2000)
          } else {
            len = result.length
            Method = setTimeout(function() { self.getResultList(url, isRe) }, 2000)
          }
          for (var i = 0; i < self.insArr.length; i++) {
            var temp = self.insArr[i];
            var random = temp.random,
              src = temp.src,
              arr = {};
            arr = temp;
            for (var j = 0; j < len; j++) {
              var item = {};
              if (isRe == true) {
                item = result;
              } else {
                item = result[j];
              }
              if (self.currentQuoteInfo.car == undefined) {
                var quoteInfo = {
                  "bzRiskKind": {},
                  "bsRiskKind": {},
                  "insCity": {},
                  "car": {},
                  "applicant": "",
                  "insured": "",
                  "insCorp": {},
                  "receivingEmail": "",
                  "insCorps": []
                };
                quoteInfo.bzRiskKind = item.bzRiskKind;
                quoteInfo.bsRiskKind = item.bsRiskKind;
                quoteInfo.insCity = item.insCity;
                quoteInfo.car = item.car;
                quoteInfo.applicant = item.applicant;
                quoteInfo.insured = item.insured;
                quoteInfo.insCorp = item.insCorp;
                quoteInfo.receivingEmail = item.receivingEmail;
                self.currentQuoteInfo = quoteInfo;
              }
              if (item.bzRiskKind) {
                self.currentQuoteInfo.bzRiskKind = item.bzRiskKind;
              }
              if (item.bsRiskKind) {
                self.currentQuoteInfo.bsRiskKind = item.bsRiskKind;
              }
              if (temp.insCorp.code == item.insCorp.code) {
                arr = item;
                arr.random = random;
                arr.src = src;
                arr.isSelIns = true;
                arr.isReInsure = false;
                if (item.remark) {
                  if (item.remark.indexOf('重复投保') == -1) arr.isReInsure = true;
                }
                this.Common.Public.removeByValue(self.codes, temp.insCorp.code);
                if (isRe == true) { clearInterval(reMethod); }
                break;
              }
            };

            arr.costsDisplay = '';
            if (arr.costDisplay == "Salesman") {
              var length = arr.costs.length;
              if (length > 0) {
                var cost = arr.costs[length - 1];
                if (cost.salesmanId > 0) {
                   if (cost.bzCommisionRate && cost.bsCommisionRate) {
                    if(cost.isShowRate){
                      var s = (cost.bzCommision + cost.bsCommision) + "";
                      var sum = s.substring(0, s.indexOf(".") + 3);
                      arr.costsDisplay = "(交: " + cost.bzCommisionRate + "% " + " 商: " + cost.bsCommisionRate + "%, " +
                      cost.bzCommision + " + " + cost.bsCommision + " = " + sum + ")";
                    }
                    else{
                      var s = (cost.bzCommision + cost.bsCommision) + "";
                      var sum = s.substring(0, s.indexOf(".") + 3);
                      arr.costsDisplay = " (交) " + cost.bzCommision + "+ (商) " + cost.bsCommision + " = " + sum ; 
                    }
                  } else if (cost.bzCommisionRate) {
                      if(cost.isShowRate){
                        arr.costsDisplay = "(交: " + cost.bsCommisionRate + "% " + cost.bsCommision + ")";
                      }
                      else{
                        arr.costsDisplay = "(交) "  + cost.bsCommision; 
                      }
                  } else if (cost.bsCommisionRate) {
                    if(cost.isShowRate){
                    arr.costsDisplay = "(商: " + cost.bsCommisionRate + "% " + cost.bsCommision + ")";
                    }else{
                       arr.costsDisplay = "(商)" + cost.bsCommision;
                    }
                  }

                };
              };
            };
            //处理系统推荐信息
            arr.canModifyDiscount = false;
            var suggestedInfo = arr.suggestedInfo;
            if (suggestedInfo) {
              self.currentQuoteInfo.insCorps = [];
              self.currentQuoteInfo.insCorps.push(arr.insCorp);
              //车型错误
              if (suggestedInfo.key == self.suggestedType[0] && !self.showInsuredInfo) {
                self.showInsuredInfo = false;
                if (suggestedInfo.value && suggestedInfo.value.length > 0) {
                  var model = suggestedInfo.value[0].fieldValue;
                  var models = model.split(" ");
                  var subModel = '';
                  var subModelType = '';
                  var len = models.length;
                  if (len > 2) {
                    // for (var i = 0; i < len - 1; i++) {
                    //   subModel = subModel + " " + models[i];
                    // }
                    subModel = models[0];
                    subModelType = models[len - 1];
                  } else {
                    if (len == 1) {
                      subModel = models[0];
                    } else if (len > 1) {
                      subModel = models[0];
                      subModelType = models[1];
                    }
                  }

                  axiosGetAPI('/vi/vehicePrices?model=' + subModel).then((res) => {
                    if (res.result && res.result.length > 0) {
                      var tempArr = [];
                      for (var i = 0; i < res.result.length; i++) {
                        var item = res.result[i];
                        // if (subModelType) {
                        //   if (item.model.indexOf(subModel) >= 0 && item.fullPriceModel.indexOf(subModelType) > 0) {
                        //     tempArr.push(item);
                        //   }
                        // } else{
                        if (item.model.indexOf(subModel) >= 0) {
                          tempArr.push(item);
                        }
                        // }

                      };
                      self.showfullPrice = (tempArr && tempArr.length > 0);
                      self.fullPriceValues = tempArr;
                    } else {
                      self.showfullPrice = false;
                    }
                  });
                }
              } else if (suggestedInfo.key == self.suggestedType[1] && !self.showfullPrice && !self.showInsuredInfo) {
                //起保日期错误
                self.showfullPrice = false;
                self.showInsuredInfo = (suggestedInfo.value && suggestedInfo.value.length > 0);
                self.suggestedInsurance = suggestedInfo.value;
              } else if (suggestedInfo.key == self.suggestedType[2] && !self.showfullPrice && !self.showInsuredInfo && !self.showDiscountSchemes) {
                //平安决策方案信息
                self.showfullPrice = false;
                self.showInsuredInfo = false;
                self.showDiscountSchemes = true;
                if (arr.extend && arr.extend.extrasJson && arr.extend.extrasJson.quoteDiscountSchemes) {
                  self.quoteDiscountSchemes = arr.extend.extrasJson.quoteDiscountSchemes;
                }
              } else if (suggestedInfo.key == self.suggestedType[3]) {
                //可以申请商业险折扣
                arr.canModifyDiscount = true;
              }
            }
            insTemp.push(arr);
          }
          self.insArr = insTemp;
          quoteInfoStatus.insArr = self.insArr;
          quoteInfoStatus.insBatchNo = self.insBatchNo;
          quoteInfoStatus.quoteInfo = quoteInfo;
          localStorage.setItem("quoteInfoStatus", JSON.stringify(quoteInfoStatus));
        }
        if (self.codes.length == 0) {
          if (!(typeof(Method) == 'undefined')) {
            clearInterval(Method);
            clearInterval(reMethod);
          }
        }
      });
    },
    downFailTxt: function(e) {
      var $reason = $(e.currentTarget).closest('.fail-reason')
      if (!$(e.currentTarget).hasClass('down')) {
        $(e.currentTarget).addClass('down');
        $reason.css({ 'height': '.44rem','whiteSpace': 'nowrap' })
      } else {
        $reason.css({ 'height': 'auto','whiteSpace': 'normal' })
        $(e.currentTarget).removeClass('down');
      }
    },
    modifyInfo: function(item, index) {
      var curDate = new Date();
      var hh = curDate.getHours();
      var mm = curDate.getMinutes();
      if (hh >= 8 && hh <=22) {
        if (hh == 22 && mm > 0) {
          Toast("非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。");
          return false;
        }
        var self = this;
        var cityCode = item.insCity ? item.insCity.code : '';
        var shortName = item.insCity ? item.insCity.shortName : '';
        var carNo = item.car ? item.car.plateNo : '';
        var vin = item.car ? item.car.vin : '';
        var url = "/quoteManagement/index?from=policyList&insCityCode=" + cityCode + "&insCityShortName=" +
          shortName + "&plateNo=" + carNo + "&vin=" + vin;
        localStorage.removeItem("insureInfoApp");
        localStorage.removeItem("quoteInfoStatus");
        Indicator.open('加载中...');
        setTimeout(function() {
          Indicator.close();
          self.$router.push({ path: url });
        }, 100);
      } else{
        Toast("非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。");
        return false;
      }

    },
    reQuote: function(e) {
      var self = this,
        code = $(e.currentTarget).attr('code');
      self.codeQuote(code);
    },
    goDualRecord: function(item, index) {
      var insBatchNo = item.insBatchNo;
      var insCorpName = item.insCorp ? item.insCorp.shortName : '';
      var insCorpCode = item.insCorp ? item.insCorp.code : '';
      var bzInsureNo = item.bzRiskKind ? item.bzRiskKind.insureNo : '';
      var bsInsureNo = item.bsRiskKind ? item.bsRiskKind.insureNo : '';
      var userName = item.shuanglu ? item.shuanglu.name : '';
      var idNo = item.shuanglu ? item.shuanglu.idNo : '';
      var applicatName = item.applicant ? item.applicant.name : '';
      var applicantPhone = item.applicant ? item.applicant.phone : '';
      var url = "/quoteManagement/dualrecord?from=policyList&insBatchNo=" + insBatchNo + "&insCorpCode=" + insCorpCode +
        "&insCorpName=" + insCorpName + "&bzInsureNo=" + bzInsureNo + "&bsInsureNo=" + bsInsureNo +
        "&userName=" + userName + "&applicatName=" + applicatName + "&idNo=" + idNo + "&applicantPhone=" + applicantPhone;
      this.$router.push({ path: url });
    },
    codeQuote: function(code) {
      var self = this,
        insItems = [];
      self.insArr.map(item => {
        var ins = {};
        ins = item;
        if (item.insCorp.code == code) {
          self.currentQuoteInfo.insCorps = [];
          self.currentQuoteInfo.insCorps.push(item.insCorp);
          var shortName = item.insCorp.shortName,
            src = item.src;
          ins = {
            random: parseInt(10 * Math.random()),
            src: src,
            isSelIns: true,
            insCorp: {
              shortName: shortName,
              code: code
            },
            insureStatus: 'loading'
          }
        }
        insItems.push(ins)
      });
      self.insArr = insItems;
      self.codes.push(code);
      self.getInsCode(self.currentQuoteInfo);
      // var url = '/vi/insurePolicies/' + this.insBatchNo + "/" + code;
      // self.getResultList(url, true)
    },
    toQuoteDetail: function(item, index) {
      if (item.insureStatus != 'QuotedFailed' && item.insureStatus != 'VerifiedFailed' &&
        item.insureStatus != 'loading' && item.insureStatus != 'Duplicate') {
        var quoteJson = {
          insCorpName: item.insCorp.shortName,
          insCorpCode: item.insCorp.code,
          insBatchNo: this.insBatchNo
        }
        clearInterval(Method);
        clearInterval(reMethod);
        var appId = localStorage.getItem("appId");
        var url = "/quoteManagement/quotedetail?appId=" + appId + "&insCorpName=" + quoteJson.insCorpName + "&insCorpCode=" + quoteJson.insCorpCode + "&insBatchNo=" + quoteJson.insBatchNo; // + "&token=" + encodeURIComponent(localToken);
        this.$router.push({ path: url });
      }
    }
  }
};

</script>
<style scoped>
.inslist {}

.inslist .mint-results {
  padding-left: 4%;
}

.inslist .mint-list {
  padding-right: .2rem;

}

.inslist .mint-list .ico-arrow {
  right: 4%;
}

.inslist .mint-region {
  padding: 0px;
  background-color: #FFF;
  border-radius: .1rem;
  margin: .2rem;
}

.inslist .mint-results .results-area {
  padding-top: .1rem;
  text-align: right;
  border-bottom: 0px solid #eee;
}

.inslist .quoting {
  line-height: .4rem;
}

.inslist .ico-ins {
  width: .64rem;
  height: .64rem;
  margin-right: .2rem;
  border-radius: 50%;
}

.inslist .q-loading {
  width: .36rem;
  height: .36rem;
  margin-left: .1rem;
  opacity: .8;
}

.inslist .quote-money {
  font-size: .28rem;
  color: #FC3738;
}

.inslist .fail-txt {
  font-size: .28rem;
}

.inslist .fail-txt .q-txt {
  display: inline-block;
  width: 1.24rem;
  height: .44rem;
  margin-left: .2rem;
  font-size: .24rem;
  line-height: .44rem;
  text-align: center;
  border: 1px solid #E0E0E0;
  border-radius: .08rem;
}

.inslist .mint-results .fail-reason {
  position: relative;
  display: inline-block;
  width: 5rem;
  min-height: .44rem;
  margin: 0 4% .2rem 0;
  padding: .08rem .6rem .08rem .2rem;
  line-height: .44rem;
  font-size: .24rem;
  color: #999;
  overflow: hidden;
  background: #F7F7F7; 
  border-radius: .08rem;
  text-align: left;
   text-overflow:ellipsis;
  word-wrap: break-word;
}

.inslist .mint-results .ico-open {
  position: absolute;
  top: .08rem;
  right: .2rem;
  width: .4rem;
  height: .4rem;
  background-image: url(../../assets/images/icon-down.png);
  background-size: .32rem 0.74rem;
  background-repeat: no-repeat;
  background-position: .04rem .08rem;
}

.inslist .mint-results .ico-open.down {
  background-position: .04rem -.48rem;
}

.msgUp {
  margin: 0px .4rem .2rem;
}

</style>
