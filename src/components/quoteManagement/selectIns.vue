<template>
  <div class="insList" ref="insList" v-show="isShowIns">
    <mt-header fixed class="def-header" :title="title">
      <div slot="left">
        <mt-button @click="hideInsList" icon="back"></mt-button>
      </div>
    </mt-header>
    <div v-show="!showSinosafeCarChecked">
      <ul class="ins-list">
        <li v-for="item in insOptions">
          <label class="mint-checkitem" @change="checkon"><input v-model="item.check" type="checkbox"><i>&#10004;</i> <img class="ins-img" :src="item.src ? item.src : defaultImg" alt="">{{item.label}}<img class="insr-img" :src="renewalImg" alt="" v-show="item.value == renewalCode"></label>
        </li>
      </ul>
      <div class="mint-footer fn-clear">
        <span class="mint-footer-left">
          <label class="mint-checkitem" @change="checkonAll"><input v-model="checkAll" type="checkbox"><i>&#10004;</i>全选</label>
        </span>
        <mt-button class="btn-yes" @click="sureSelect()" type="primary">确定</mt-button>
      </div>
    </div>
    <div v-show="showSinosafeCarChecked">
      <div style="color:#FC3738;font-size:13px;margin:10px;">
        华安财险报价需补充以下信息才可以继续报价。如您无法提供，可点击【取消】按钮，系统不会展示华安系统的报价，如果您还选择了其他保险公司，那么它们不会受到影响
      </div>
      <span style="padding-left:10px;line-height:30px;font-size:14px">验车信息</span>
      <div class="mint-region" style="margin-left:10px;padding-bottom:30px;padding-top:10px;margin-right:10px;border:solid #f5F5F5 1px;">
        <mt-field class="mint-formItm" label="验车情况:" type="text" :disabled="true">
          <span class="mint-plane fn-clear">
            <mt-radio v-model="carCheckStatus" @change="isCarCheckStatus" :options="[{label: '已验车', value: 'Checked'}, {label: '免验车', value: 'Uncheck'}, {label: '需验车', value: 'NeedCheck'}]"></mt-radio>
          </span>
        </mt-field>
        <div v-show="carCheckStatus == 'Checked'">
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="验车人:" type="text" :disabled="true">
            <input class="mint-input" v-model="sinosafeCarChecked.carChecker" type="text" placeholder="请输入验车人">
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="验车结果:" type="text" :disabled="true">
            <span @click="openCheckResult"><input class="mint-input" readonly="readonly" v-model="checkResult" type="text" placeholder="请选择验车结果"><i class="ico-arrow"></i></span>
          </mt-field>
          <mt-popup v-model="showCheckResult" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="selCheckResult" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selCheckResult" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="CheckResultlots" @change="changeCheckResult"></mt-picker>
          </mt-popup>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="验车时间:" type="text" :disabled="true">
            <span @click="selCarCheckTime"><input class="mint-input" readonly="readonly" type="text" v-model="carCheckTime" placeholder="请选择验车时间"><i class="ico-arrow"></i></span>
          </mt-field>
          <mt-datetime-picker ref="picker" v-model="pickerValue" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
          </mt-datetime-picker>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="验车内容:" type="text" :disabled="true" style="padding-right:10px">
            <textarea id="text_inp" rows="6" cols="42" v-model="sinosafeCarChecked.carCheckDesc" placeholder="请输入验车内容" style="padding-top:5px;padding-left:2px;padding-right:2px;padding-bottom:5px;font-size:12px;border:solid #f5F5F5 1px;margin-top:10px;"></textarea>
          </mt-field>
        </div>
        <div v-show="carCheckStatus == 'Uncheck'">
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="免验车原因:" type="text" :disabled="true">
            <span @click="openCheckReson"><input class="mint-input" readonly="readonly" type="text" v-model="checkReson" placeholder="请选择免验车原因"><i class="ico-arrow"></i></span>
          </mt-field>
          <mt-popup v-model="showCheckReson" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="selCheckReson" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selCheckReson" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="CheckResonlots" @change="changeCheckReson"></mt-picker>
          </mt-popup>
          <hr width="100%" color="#f5f5f5" size="1" />
        </div>
        <div v-show="carCheckStatus == 'NeedCheck'">
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="验车负责人:" type="text" :disabled="true">
            <input class="mint-input" v-model="sinosafeCarChecked.checkResperson" type="text" placeholder="请输入验车负责人">
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="验车备注:" type="text" :disabled="true" style="padding-right:10px">
            <textarea id="text_inp" rows="6" cols="42" v-model="sinosafeCarChecked.carCheckRemark" placeholder="请输入验车备注" style="padding-top:5px;padding-left:2px;padding-right:2px;padding-bottom:5px;font-size:12px;border:solid #f5F5F5 1px;margin-top:10px;"></textarea>
          </mt-field>
        </div>
      </div>
      <div class="mint-footer fn-clear">
        <span class="mint-footer-left" @click="needCheck(false)">
          <label class="mint-checkitem">取消</label>
        </span>
        <mt-button class="btn-yes" @click="needCheck(true)" type="primary">确定</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import event from './../../common/event';
import { axiosGetAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import { Dialog } from 'vant';
var CheckResultName = ['', '验车合格', '验车不合格'];
var CheckResultValue = ['', '01', '02'];
var CheckResonName = ['', '单保责任险', '按期续保，且未加保损失类险种', '新车', '团车业务', '其他', '本公司续保，脱保2天内，且未加保损失类险种'];
var CheckResonValue = ['', '1', '2', '3', '4', '5', '6'];
export default {
  name: 'insList',
  data() {
    return {
      title: "选择险企",
      insLen: 5,
      isShowIns: true,
      renewalCode: '',
      checkAll: true,
      insOptions: [],
      emitHome: [],
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      renewalImg: this.src = require('../../assets/images/ic_offer_renewal.png'),
      showSinosafeCarChecked: false,
      carCheckStatus: 'Checked',
      sinosafeCarChecked: {},
      showCheckResult: false,
      showCheckReson: false,
      checkResult: '',
      checkReson: '',
      CheckResultlots: [{ flex: 1, values: Object.values(CheckResultName), className: 'slot1' }],
      CheckResonlots: [{ flex: 1, values: Object.values(CheckResonName), className: 'slot1' }],
      overlay: true,
      btn: false,
      startDate: new Date(this.Common.Public.GetDateStr(-365 * 3)),
      endDate: new Date(this.Common.Public.GetDateStr(0)),
      pickerValue: '',
      carCheckTime: '',
      cityCode:'',
      cityName:'',
    };
  },
  props: ['tabs'],
  created() {
    $('.mint-header').hide();
    $('.insList .mint-header').show();
    $('.mint-navbar').hide();
    this.cityCode = this.$route.query.insCityCode;
    this.cityName = this.$route.query.insCityShortName;
    // this.getInsCompanies();
    var myDate = new Date();
    this.pickerValue = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + (myDate.getDate());
  },
  mounted() {
    var self = this;
    this.$event.$on('child-scheme', (res) => {
      self.renewalCode = res.renewalCode;
      self.cityCode = res.cityCode;
      self.cityName = res.cityName;
      Indicator.open('加载中...');
      self.getInsCompanies();
    })
  },
  methods: {
    selCarCheckTime: function() {
      this.$refs.picker.open();
      if (this.pickerValue != '') {
        this.carCheckTime = this.Common.Public.dateString(this.pickerValue);
      }
    },
    handleConfirm: function() {
      if (this.pickerValue != '') this.carCheckTime = this.Common.Public.dateString(this.pickerValue);
      this.$refs.picker.close();
    },
    beforeClose() {},
    openCheckResult: function() {
      this.showCheckResult = true;
    },
    changeCheckResult: function(picker, values) {
      picker.setSlotValues(1, CheckResultName);
      this.checkResult = values;
    },
    selCheckResult: function() {
      this.showCheckResult = false;
      for (var i = 0; i < CheckResultName.length; i++) {
        if (CheckResultName[i] == this.checkResult) {
          this.sinosafeCarChecked.carCheckResult = CheckResultValue[i];
          break;
        }
      }
      console.log(this.checkResult + ":" + this.sinosafeCarChecked.carCheckResult);
    },
    openCheckReson: function() {
      this.showCheckReson = true;
    },
    changeCheckReson: function(picker, values) {
      picker.setSlotValues(1, CheckResonName);
      this.checkReson = values;
    },
    selCheckReson: function() {
      this.showCheckReson = false;
      for (var i = 0; i < CheckResonName.length; i++) {
        if (CheckResonName[i] == this.checkReson) {
          this.sinosafeCarChecked.carCheckReason = CheckResonValue[i];
          break;
        }
      }
      console.log(this.checkReson + ":" + this.sinosafeCarChecked.carCheckReson);
    },
    needCheck: function(need) {
      var self = this;
      self.showSinosafeCarChecked = need;
      var insOptions = self.insOptions,
        codes = [],
        insOptionsArr = [];
      for (var i = 0; i < insOptions.length; i++) {
        var insItem = insOptions[i],
          insJson = {};
        if (insItem.check == true) {
          insJson.shortName = insItem.label;
          insJson.code = insItem.value;
          if (insJson.code == 'sinosafe') {
            if (need) {
              codes.push(insItem.value)
              insOptionsArr.push(insJson)
            }
          } else {
            codes.push(insItem.value)
            insOptionsArr.push(insJson)
          }
        }
      }
      if (insOptionsArr.length == 0) {
        Toast('请选择险企');
        self.showSinosafeCarChecked = false;
        self.title = "选择险企";
        return;
      } else {
        if (need) {
          self.sinosafeCarChecked.carCheckStatus = self.carCheckStatus;
          if (self.carCheckStatus == 'Checked') {
            self.sinosafeCarChecked.carCheckTime = self.carCheckTime;
            if (self.sinosafeCarChecked.carChecker == '' || self.sinosafeCarChecked.carChecker == null) {
              Toast('请输入验车人');
              return;
            }
            if (self.sinosafeCarChecked.carCheckResult == '' || self.sinosafeCarChecked.carCheckResult == null) {
              Toast('请选择验车结果');
              return;
            }
            if (self.sinosafeCarChecked.carCheckTime == '' || self.sinosafeCarChecked.carCheckTime == null) {
              Toast('请选择验车时间');
              return;
            }
            if (self.sinosafeCarChecked.carCheckDesc == '' || self.sinosafeCarChecked.carCheckDesc == null) {
              Toast('请输入验车内容');
              return;
            }
          } else if (self.carCheckStatus == 'Uncheck') {
            if (self.sinosafeCarChecked.carCheckReason == '' || self.sinosafeCarChecked.carCheckReason == null) {
              Toast('请选择免验车原因');
              return;
            }
          } else if (self.carCheckStatus == 'NeedCheck') {
            if (self.sinosafeCarChecked.checkResperson == '' || self.sinosafeCarChecked.checkResperson == null) {
              Toast('请输入验车负责人');
              return;
            }
            if (self.sinosafeCarChecked.carCheckRemark == '' || self.sinosafeCarChecked.carCheckRemark == null) {
              Toast('请输入验车备注');
              return;
            }
          }
          localStorage.setItem('sinosafeCarChecked', JSON.stringify(self.sinosafeCarChecked));
        } else {
          localStorage.setItem('sinosafeCarChecked', null);
        }

        self.isShowIns = false;
        var selIns = localStorage.getItem('selIns');
        if (selIns) {
          self.emitHome = { num: '3', size: 1, isResult: true, isSelectIns: true, insOptions: insOptionsArr, codes: codes, selIns: true }
        } else {
          self.emitHome = { num: '3', size: 1, isResult: true, isSelectIns: true, insOptions: insOptionsArr, codes: codes }
          localStorage.removeItem('quoteInfoStatus');
        }

        self.$emit('child-ins', self.emitHome);
        self.showSinosafeCarChecked = false;
        self.title = "选择险企";
      }

    },
    isCarCheckStatus: function(value) {
      console.log("value: " + value);
      this.carCheckStatus = value;
      this.sinosafeCarChecked.carCheckStatus = value;
    },
    getInsCompanies: function() {
      var self = this;
      axiosGetAPI('/vi/insuranceCompanies').then((res) => {
        Indicator.close();
        if (res.result) {
          sessionStorage.setItem('insuranceNameCode', JSON.stringify(res.result));
          var results = res.result,
            insArr = [],
            insCorpCode = [],
            insCorpShortName = [];
          for (var i = 0; i < results.length; i++) {
            if (self.cityCode == results[i].insCityCode) {
              insCorpCode.push(results[i].insCorpCode);
              insCorpShortName.push(results[i].insCorpShortName);
            }
          }
          var qInsCorpCode = insCorpCode.unique(),
            qInsCorpShortName = insCorpShortName.unique();
          for (var j = 0; j < qInsCorpShortName.length; j++) {
            var obj = {};
            obj.value = qInsCorpCode[j];
            obj.label = qInsCorpShortName[j];
            obj.check = true;
            insArr.push(obj);
          }
          self.insLen = qInsCorpShortName.length;
          self.insOptions = insArr;
          self.insOptions.map(item => {
            if (item.value != null && item.value != '') {
              try{
               item.src = require(`@/assets/images/companys/${item.value}.png`)
              } catch(err){
               item.src = require(`@/assets/images/companys/defaultImg.png`)
              }
            };
          })
        } else {
          Toast('没获取到保险公司')
        }
      });
    },
    hideInsList: function() {
      this.isShowIns = false;
      if (this.emitHome == '') {
        this.emitHome = { num: '2', size: 33.33, isResult: false, isSelectIns: true }
      } else {
        delete this.emitHome.insOptions
      }
      this.$emit('child-ins', this.emitHome);
      this.showSinosafeCarChecked = false;
      this.title = "选择险企";
    },
    checkIns: function() {
      var insOptions = this.insOptions,
        insValues = [];
      for (var i = 0; i < insOptions.length; i++) {
        var insItem = insOptions[i];
        if (insItem.check == true) {
          insValues.push(insItem.check)
        }
      }
      return insValues.length;
    },
    checkon: function() {
      var len = this.checkIns();
      if (len != this.insLen) {
        this.checkAll = false;
      } else {
        this.checkAll = true;
      }
    },
    checkonAll: function() {
      if (this.checkAll == false) {
        this.insOptions.map(item => {
          item.check = false;
        });
      } else {
        this.insOptions.map(item => {
          item.check = true;
        });
      }
    },
    sureSelect: function() {
      if (this.checkIns() == 0) {
        Toast('请选择险企');
        this.showSinosafeCarChecked = false;
        this.title = "选择险企";
        return false;
      }
      var insOptions = this.insOptions,
        codes = [],
        insOptionsArr = [];
      for (var i = 0; i < insOptions.length; i++) {
        var insItem = insOptions[i],
          insJson = {};
        if (insItem.check == true) {
          insJson.shortName = insItem.label;
          insJson.code = insItem.value;
          if (insJson.code == 'sinosafe') {
            this.showSinosafeCarChecked = true;
            this.title = "华安报价信息补充";
          }
          codes.push(insItem.value);
          insOptionsArr.push(insJson);
        }
      }
      if (insOptionsArr.length == 0) {
        Toast('请选择险企');
        this.showSinosafeCarChecked = false;
        this.title = "选择险企";
        return;
      } else {
        if (!this.showSinosafeCarChecked) {
          this.isShowIns = false;
          var selIns = localStorage.getItem('selIns');
          if (selIns) {
            this.emitHome = { num: '3', size: 1, isResult: true, isSelectIns: true, insOptions: insOptionsArr, codes: codes, selIns: true }
          } else {
            this.emitHome = { num: '3', size: 1, isResult: true, isSelectIns: true, insOptions: insOptionsArr, codes: codes }
            localStorage.removeItem('quoteInfoStatus');
          }
          this.$emit('child-ins', this.emitHome);
          this.showSinosafeCarChecked = false;
          this.title = "选择险企";
        }
      }

    }
  }
};

</script>
<style scoped>
/*.insList { position: fixed; top:0; left: 0; width: 102%; height: 100%; overflow-x: hidden; overflow-y: scroll; background-color: #fff; z-index: 10; }*/
.ins-list {
  padding-bottom: 5px;
  background-color: #FFF;
}

.ins-list li {
  padding: 5px 6%;
}

.ins-list .mint-checkitem {
  font-size: 16px;
}

.ins-list .ins-img {
  width: 36px;
  height: 36px;
  display: inline-block;
  margin: 0 10px 0 5px;
  position: relative;
  top: 10px;
  border-radius: 50%;
}

.ins-list .insr-img {
  display: inline-block;
  margin: 0 5px 0 5px;
  position: relative;
  top: 5px;
  border-radius: 50%;
}

.insList .mint-footer-left .mint-checkitem {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #555;
}

</style>
