<template>
  <div class="quoteList" ref="quoteList" style="background-color:#FFF">
    <div v-show="isSelectIns" style="padding-top:10px;">
      <p class="quote-bar">{{cityName}} {{plateNo}} {{ownerName}}</p>
      <div style="height: 40px; padding: 0px 4%; font-size: 14px; color: #999; line-height: 40px; background: #F9F9F9;">
        <span style="float:left;width:200px">当前报价险企{{codesLen}}家</span>
        <div style="float:right;margin-top:8px">
          <van-checkbox v-model="checked">
            <img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.normal" style="width:24px;height:24px">
          </van-checkbox>
        </div>
      </div>
      <div class="quote-result">
        <div class="mint-region resultList" v-for="(item,index) in insArr" v-show="item.isSelIns">
          <div @click.stop="toQuoteDetail(item,index)">
            <mt-cell class="mint-list" title="" :title="item.insCorp.shortName">
              <img slot="icon" class="ico-ins" :src="item.src ? item.src : defaultImg">
              <img class="insr-img" :src="renewalImg" aslot="icon" v-show="item.insCorp.code == renewalCode">
              <span class="quote-money" v-show="item.insureStatus != 'loading'"><em v-show="item.insureStatus != 'QuotedFailed' && item.insureStatus != 'Duplicate' ">￥ {{item.premium}}</em></span>
              <div class="quoting" v-show="item.insureStatus == 'loading'">
                <p class="q-txt">报价中</p>
                <p><em class="J-countdown" v-html="item.random"></em>%<img class="q-loading" src="../../assets/images/ad-loading.gif"></p>
              </div>
              <p class="fail-txt" v-show="item.insureStatus == 'QuotedFailed'">报价失败<span v-show="item.isReInsure" class="q-txt" @click.stop="reQuote" :code="item.insCorp.code">重新报价</span></p>
              <p class="fail-txt" v-show="item.insureStatus == 'Duplicate'" style="color:orange">重复投保</p>
              <i class="ico-arrow" v-show="item.insureStatus != 'QuotedFailed' &&  item.insureStatus != 'Duplicate'"></i>
             
            </mt-cell>
          </div>
          <div style="height:24px;margin-top:-6px" v-show="item.insureStatus != 'QuotedFailed' && item.insureStatus != 'VerifiedFailed' 
              && item.costsDisplay && checked">
            <p style="float:right;font-size:12px;color: #0070D3;margin-right:15px">{{item.costsDisplay}}</p>
          </div>
          <div class="mint-results">
            <div class="results-area">
              <div class="fail-reason" v-show="item.insureStatus == 'QuotedFailed' || item.insureStatus == 'Duplicate' ">
                <i class="ico-open" @click.stop="downFailTxt"></i>
                {{item.remark}}
              </div>
              <van-button style="color: #0070D3;border:1px solid #0070D3;border-radius:5px;margin-bottom: 10px;margin-right:15px" v-if="((item.insureStatus == 'QuotedSuccess' && item.bsRiskKind) || (item.insureStatus == 'QuotedFailed' && item.canModifyDiscount)) && item.insCorp.code != 'pingan' " size="small" @click.stop="openModifyInDiscount(item)" :code="item.insCorp.code">申请商业险折扣</van-button>
            </div>
            
          </div>
        </div>
      </div>
      <van-popup v-model="showfullPrice" position="bottom">
        <mt-header class="def-header" title="车型不匹配">
          <div slot="left" @click="showfullPrice = false">
            <img src="../../assets/images/ico-close.png" style="width: 18px;height: 18px;" />
          </div>
          <div slot="right" style="display:flex;height:30px;justify-content: flex-end;">
            <van-button style="color:#0070D3;font-size:14px;" type="default" size="small" @click="reSelectQuote" plain>重新报价</van-button>
          </div>
        </mt-header>
        <p style="padding-left:15px;line-height:45px;font-size:14px;color:red">保险公司提示：您选择的车型不匹配，请重新选择车型；</p>
        <p style="padding-left:15px;line-height:20px;font-size:14px;color:red">推荐车型如下：</p>
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
            <img src="../../assets/images/ico-close.png" style="width: 18px;height: 18px;" />
          </div>
          <div slot="right" style="display:flex;height:30px;justify-content: flex-end;">
            <van-button style="color:#0070D3;font-size:14px;" type="default" size="small" @click="reInsured" plain>重新报价</van-button>
          </div>
        </mt-header>
        <p style="padding-left:15px;line-height:30px;font-size:14px;color:red">保险公司提示：您选择的投保日期有误，请重新报价；</p>
        <p style="padding-left:15px;line-height:20px;font-size:14px;color:red">推荐信息如下：</p>
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
          <img src="../../assets/images/ico-close.png" style="width: 18px;height: 18px;" />
        </div>
        <div slot="right" style="display:flex;height:30px;justify-content: flex-end;">
          <van-button style="color:#0070D3;font-size:14px;" type="default" size="small" @click="reSelectScheme" plain>重新报价</van-button>
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
          <img src="../../assets/images/ico-close.png" style="width: 18px;height: 18px;" />
        </div>
        <div slot="right" style="display:flex;height:30px;justify-content: flex-end;">
          <van-button style="color:#0070D3;font-size:14px;" type="default" size="small" @click="reModifyInDiscount" plain>重新报价</van-button>
        </div>
      </mt-header>
      <p style="padding-left:15px;line-height:30px;font-size:14px;color:red">注：根据车辆的情况、渠道的类型、业务性质都会影响折扣，不是每台车折扣申请都能通过</p>
      <div style="display:flex;align-items: center;padding:15px;">
        <van-field v-model="modifyInsDiscount" required clearable label="折扣系数" placeholder="输入折扣系数" style="border:1px solid #eee" />
        <span style="margin-left:5px;color:#666">{{currentInsDiscount}}</span>
      </div>
    </van-popup>
    </div>
    <selectIns v-show="!isSelectIns" v-on:child-ins="getListenIns"></selectIns>
  </div>
</template>
<script>
import event from './../../common/event';
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
import selectIns from './selectIns'
var Method, reMethod, insArray = [],
  quoteInfoStatus = {};
export default {
  name: 'quoteList',
  data() {
    return {
      currentInsCorp: '',
      modifyInsDiscount: '',
      currentInsDiscount: 0,
      currentQuoteSchemesItem: '',
      currentIndex: 0,
      currentQuoteInfo: {},
      showfullPrice: false,
      fullPriceValues: [],
      showInsuredInfo: false,
      suggestedInsurance: [],
      from: "",
      isSelectIns: true,
      insArr: [],
      codes: [],
      initArr: [],
      quoteInfo: [],
      cityName: '',
      renewalCode: '',
      plateNo: '',
      ownerName: '',
      codesLen: 0,
      insBatchNo: '',
      countdown: parseInt(10 * Math.random()),
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      renewalImg: this.src = require('../../assets/images/ic_offer_renewal.png'),
      checked: true,
      icon: {
        normal: require('../../assets/images/eye-close.png'),
        active: require('../../assets/images/eye-open.png')
      },
      suggestedType: ["SuggestedVehicle", "SuggestedInsured", "QuoteDiscountSchemes", "QuoteLowDiscount"],
      quoteDiscountSchemes: [],
      showModifyInsDiscount: false,
      showDiscountSchemes: false,
    };
  },
  components: {
    selectIns
  },
  created() {
    this.select = localStorage.getItem('selected')
  },
  mounted() {
    var self = this;
    this.$event.$on('child-scheme', (res) => {
      this.isSelectIns = res.isSelectIns
      self.renewalCode = res.renewalCode
    })

    this.$event.$on('quoteInfo', (res) => {
      this.quoteInfo = res;
      self.plateNo = res.car.plateNo;
      self.cityName = res.insCity.shortName
      self.ownerName = res.car.owner.name
      self.insArr = [];
    });

    $('#openSelectIns').bind('click', function() {
      var emitFather = { num: '3', size: 1, isResult: true, isSelectIns: false }
      self.isSelectIns = false
      self.$emit('child-list', emitFather);
      localStorage.setItem('selIns', true)
    });

    this.from = self.$route.query.from;
    // if (this.from != 'policyList' && this.from != 'cust') {
    var quoteInfoStorage = localStorage.getItem('quoteInfoStatus')
    if (quoteInfoStorage) {
      Indicator.close();
      var resultData = JSON.parse(quoteInfoStorage),
      bool = false;
      self.insArr = resultData.insArr;
      self.currentQuoteInfo = resultData.quoteInfo;
      self.plateNo = resultData.quoteInfo.car.plateNo;
      self.cityName = resultData.quoteInfo.insCity.shortName
      self.ownerName = resultData.quoteInfo.car.owner.name
      self.insArr.map(item => {
        if (item.insureStatus == 'loading') bool = true;
      });
      self.insBatchNo = resultData.insBatchNo;
      self.codesLen = self.insArr.length;
      self.renewalCode = resultData.quoteInfo.insCorp.code;
      if (bool == true) {
        if (resultData.status && resultData.status.isResult) {
          var codes = [];
          var insArray = [];
          for (var i = 0; i < self.insArr.length; i++) {
            var insItem = self.insArr[i].insCorp,
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
          if (self.insBatchNo) {
            clearInterval(reMethod);
            clearInterval(Method);
            var url = '/vi/insurePolicies/' + self.insBatchNo;
            self.getResultList(url, false);
          }
        } else{
          self.getInsCode(resultData.quoteInfo);
        }
      }
    }
    // };

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
        // self.getInsCode(self.currentQuoteInfo);
        self.reQuoteByCode();
      } else {
        Toast('请输入折扣系数');
      }
      self.showModifyInsDiscount = false;
    },
    reSelectScheme: function() {
      var self = this;
      if (self.currentQuoteSchemesItem) {
        self.currentQuoteInfo.insCorps = [];
        self.currentQuoteInfo.insCorps.push(self.currentInsCorp);
        self.currentQuoteInfo.quotation = {};
        self.currentQuoteInfo.quotation.quoteSchemesIndex = self.currentQuoteSchemesItem.index;
        console.log(JSON.stringify(self.currentQuoteInfo));
        // self.getInsCode(self.currentQuoteInfo);
        self.reQuoteByCode();
      }
      self.showDiscountSchemes = false;
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
    getListenIns: function(data) {
      var self = this;
      self.isSelectIns = data.isSelectIns
      self.$emit('child-list', data);
      var quoteInfo = {};
      quoteInfo = self.quoteInfo;
      if (data.selIns) {
        self.codesLen = 0;
        var insOptionsArr = data.insOptions,
          quoteInfoStorage = localStorage.getItem('quoteInfoStatus');
        if (quoteInfoStorage) {
          Indicator.close();
          var resultData = JSON.parse(quoteInfoStorage),
            bool = false,
            showInsArr = [],
            codes = [],
            insCorpsArr = [],
            codeArr = [];
          self.insArr = resultData.insArr;

          for (var i = 0; i < resultData.insArr.length; i++) {
            codeArr.push(resultData.insArr[i].insCorp.code);
          }

          for (var i = 0; i < insOptionsArr.length; i++) {
            var insCorpsJson = {};
            insCorpsJson.code = insOptionsArr[i].code;
            insCorpsJson.shortName = insOptionsArr[i].shortName;
            codes.push(insCorpsJson.code);
            insCorpsArr.push(insCorpsJson)
          }
          self.insArr.map(temp => {
            var showInsJson = {};
            showInsJson = temp;
            showInsJson.isSelIns = false;
            if (temp.insureStatus == 'loading') bool = true;
            if (self.isContained(codeArr, codes) == true) {
              for (var i = 0; i < insOptionsArr.length; i++) {
                if (temp.insCorp.code == insOptionsArr[i].code) {
                  showInsJson = temp;
                  showInsJson.isSelIns = true;
                  break;
                }
              }
            } else {
              bool = true;
            }
            showInsArr.push(showInsJson)
          });
          self.insArr = showInsArr;
          quoteInfo.insCorps = insCorpsArr

          if (bool == true) self.getInsCode(quoteInfo);

          self.codesLen = insOptionsArr.length
        }
      } else {
        if (data.insOptions) {
          self.initArr = data.insOptions
          quoteInfo.insCorps = self.initArr
          self.getInsCode(quoteInfo);
          quoteInfoStatus.quoteInfo = quoteInfo;
        }
      }

      clearInterval(Method);
      clearInterval(reMethod);
    },
    getInsCode: function(quoteInfo) {
      var self = this;
      Indicator.open('加载中...');
      var sinosafeCarChecked = localStorage.getItem('sinosafeCarChecked');
      if (sinosafeCarChecked != '' && sinosafeCarChecked != null && sinosafeCarChecked != undefined) {
        quoteInfo.sinosafeCarChecked = JSON.parse(sinosafeCarChecked);
      }
      self.currentQuoteInfo = quoteInfo;
      quoteInfoStatus.quoteInfo = quoteInfo;
      axiosPostAPI('/vi/insurePolicies', quoteInfo).then((res) => {
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
          var url = '/vi/insurePolicies/' + self.insBatchNo;
          self.getResultList(url, false);
        }
      });
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
        self.currentQuoteInfo.insCorps = [];
        self.currentQuoteInfo.insCorps.push(self.currentInsCorp);
        if (self.currentQuoteInfo.bzRiskKind && self.currentQuoteInfo.bzRiskKind.beginDate) {
          self.currentQuoteInfo.bzRiskKind.beginDate = suggestBeginDate.split(" ")[0];
        }
        if (self.currentQuoteInfo.bsRiskKind && self.currentQuoteInfo.bsRiskKind.beginDate) {
          self.currentQuoteInfo.bsRiskKind.beginDate = suggestBeginDate.split(" ")[0];
        }
        // console.log("修改后的投保日期：" + JSON.stringify(self.currentQuoteInfo));
        // self.getInsCode(self.currentQuoteInfo);
        self.reQuoteByCode();
      }

      self.showInsuredInfo = false;
    },
    reSelectQuote: function() {
      var self = this;
      if (self.fullPriceValues && self.fullPriceValues.length > 0) {
        var item = self.fullPriceValues[self.currentIndex];
        self.currentQuoteInfo.insCorps = [];
        self.currentQuoteInfo.insCorps.push(self.currentInsCorp);
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
        // self.getInsCode(self.currentQuoteInfo);
        self.reQuoteByCode();
      }
      self.showfullPrice = false;
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
              if (temp.insCorp.code == item.insCorp.code) {
                arr = item;
                arr.random = random;
                arr.src = src;
                arr.isSelIns = true;
                arr.isReInsure = false;
                // if (item.remark) {
                //   if (item.remark.indexOf('重复投保') == -1) arr.isReInsure = true;
                // }
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
              //车型错误
              if (suggestedInfo.key == self.suggestedType[0] && !self.showInsuredInfo) {
                self.showInsuredInfo = false;
                self.currentInsCorp = arr.insCorp;
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
                    } else if(len > 1){
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
                self.currentInsCorp = arr.insCorp;
                self.showfullPrice = false;
                self.showInsuredInfo = (suggestedInfo.value && suggestedInfo.value.length > 0);
                self.suggestedInsurance = suggestedInfo.value;
              } else if (suggestedInfo.key == self.suggestedType[2] && !self.showfullPrice && !self.showInsuredInfo && !self.showDiscountSchemes) {
                //平安决策方案信息
                self.currentInsCorp = arr.insCorp;
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
            } else {
              self.showInsuredInfo = false;
              self.showfullPrice = false;
            }
            insTemp.push(arr);
          }
          self.insArr = insTemp;
          quoteInfoStatus.insArr = self.insArr;
          quoteInfoStatus.insBatchNo = self.insBatchNo
          localStorage.setItem("quoteInfoStatus", JSON.stringify(quoteInfoStatus));
        }
        if (self.codes.length == 0) {
          if (!(typeof(Method) == 'undefined')) {
            clearInterval(Method);
            clearInterval(reMethod);
            var emitHome = { num: '3', size: 1, isResult: true, isSelectIns: true, btnSelIns: true }
            self.$emit('child-list', emitHome);
          }
        }
      });
    },
    downFailTxt: function(e) {
      var $reason = $(e.currentTarget).closest('.fail-reason')
      if (!$(e.currentTarget).hasClass('down')) {
        $(e.currentTarget).addClass('down');
        $reason.css({ 'height': '22px','whiteSpace': 'nowrap' })
      } else {
        $reason.css({ 'height': 'auto','whiteSpace': 'normal' })

        $(e.currentTarget).removeClass('down');
      }
    },
    reQuote: function(e) {
      var self = this,
        code = $(e.currentTarget).attr('code');
      self.codeQuote(code);
    },
    codeQuote: function(code) {
      var self = this,
        insItems = [];
      self.insArr.map(item => {
        var ins = {};
        ins = item;
        if (item.insCorp.code == code) {
          var shortName = item.insCorp.shortName,
            src = item.src;
          self.currentQuoteInfo.insCorps = [];
          self.currentQuoteInfo.insCorps.push(item.insCorp);
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
      self.reQuoteByCode();
    },
    reQuoteByCode:function(){
      var self = this;
      Indicator.open('加载中...');
      axiosPutAPI('/vi/insurePolicies/' + self.insBatchNo, self.currentQuoteInfo).then((res) => {
        Indicator.close();
        var codes = [];
        var insArray = [];
        for (var i = 0; i < self.insArr.length; i++) {
          var insItem = self.insArr[i].insCorp,
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
          var url = '/vi/insurePolicies/' + self.insBatchNo;
          self.getResultList(url, false);
        }
      });
    },
    toQuoteDetail: function(item, index) {
      if (item.insureStatus != 'QuotedFailed' && item.insureStatus != 'Duplicate' && item.insureStatus != 'loading') {
        var quoteJson = {
          insCorpName: item.insCorp.shortName,
          insCorpCode: item.insCorp.code,
          insBatchNo: this.insBatchNo
        }
        clearInterval(Method);
        clearInterval(reMethod);
        var appId = localStorage.getItem("appId");
        // var localToken = localStorage.getItem('token');
        // if (localToken) {
        //   localToken = localToken.replace(appId + '_', '');
        // }
        var url = "/quoteManagement/quotedetail?appId=" + appId + "&insCorpName=" + quoteJson.insCorpName + "&insCorpCode=" + quoteJson.insCorpCode + "&insBatchNo=" + quoteJson.insBatchNo;// + "&token=" + encodeURIComponent(localToken);
        this.$router.push({ path: url });
      }
    }
  }
};

</script>
<style scoped>
.quoteList .quote-result {
  background-color: #fff;
}

.quoteList .mint-results {
  padding-left: 4%;
}

.quoteList .mint-list {
  padding-right: 10px;
}

.quoteList .mint-list .ico-arrow {
  right: 4%;
}

.quoteList .quote-result .mint-region {
  padding: 2px 0 6px;
  margin-bottom: 0;
}

.quoteList .mint-results .results-area {
  text-align: right;
  border-bottom: 1px solid #eee;
}

.quoteList .quote-result .quoting {
  line-height: 20px;
}

.quoteList .quote-result .ico-ins {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
}

.quoteList .quote-result .q-loading {
  width: 18px;
  height: 18px;
  margin-left: 5px;
  opacity: .8;
}

.quoteList .quote-result .quote-money {
  font-size: 14px;
  color: #FC3738;
}

.quoteList .fail-txt {
  font-size: 14px;
}

.quoteList .fail-txt .q-txt {
  display: inline-block;
  width: 62px;
  height: 22px;
  margin-left: 10px;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.quoteList .mint-results .fail-reason {
  position: relative;
  display: inline-block;
  width: 78%;
  min-height: 22px;
  margin: 0 4% 10px 0;
  padding: 4px 30px 4px 10px;
  line-height: 22px;
  font-size: 12px;
  color: #999;
  overflow: hidden;
  background: #F7F7F7;
  border-radius: 4px;
  text-align: left;
  text-overflow:ellipsis;
  word-wrap: break-word;
}

.quoteList .mint-results .ico-open {
  position: absolute;
  top: 4px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-image: url(../../assets/images/icon-down.png);
  background-size: 16px 37px;
  background-repeat: no-repeat;
  background-position: 2px 4px;
}

.quoteList .mint-results .ico-open.down {
  background-position: 2px -24px;
}

.quoteList .quote-result .insr-img {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  border-radius: 50%;
}


.ins-list .mint-checkitem{
  font-size: 16px;
}

</style>
