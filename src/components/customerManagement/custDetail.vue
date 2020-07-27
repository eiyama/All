<template>
  <div style="background-color:#FFF">
    <mt-header fixed class="def-header cust-head" title="客户详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <!-- <div slot="right">
        <a :href="'tel:'+ custDetailsData.phone" v-show="custDetailsData.phone"><img style="height:20px;" src="../../assets/images/custDetail-phone.png" alt=""></a>
      </div> -->
    </mt-header>
    <div class="container-center customer-index">
      <div class="mint-area">
        <h3 class="cust-title fn-clear">
          <span class="plateno" v-show="custDetailsData.owner && (custDetailsData.owner.name != null&&custDetailsData.owner.name !='')">{{custDetailsData.plateNo}}-{{custDetailsData.owner.name}}</span>
          <span class="plateno" v-show="custDetailsData.owner && (custDetailsData.owner.name == null||custDetailsData.owner.name =='')">
            {{custDetailsData.plateNo}}</span>
          <em class="levels">客户等级：<i class="ico-levels">{{custDetailsData.level}}</i></em>
        </h3>
        <div class="mint-bar fn-clear" v-show="hasRenewalpolicy">
          <span class="fn-left">上年承保信息:</span>
          <a class="fn-right fnRight" @click="lastPolicyDetail" href="#"><i class="icon-mini-icon-history"></i>上年承保详情</a>
        </div>
        <table class="mint-table" cellpadding="0" cellspacing="0" v-show="hasRenewalpolicy">
          <tr>
            <th style="width:33%">上年承保险企</th>
            <th v-show="hasBsRisk">商业险到期</th>
            <th v-show="hasBzRisk">交强险到期</th>
          </tr>
          <tbody>
            <tr>
              <td v-show="(hasBsRisk || hasBzRisk)">{{renewalpolicyData.insCorp ? renewalpolicyData.insCorp.shortName : ""}}</td>
              <td v-if="hasBsRisk && renewalpolicyData.bsRiskKind.suggestRenewalDate">
                {{renewalpolicyData.bsRiskKind ? renewalpolicyData.bsRiskKind.suggestRenewalDate.substring(0,10) : ""}}
                <p class="surplus"></p>
              </td>
              <td v-if="hasBzRisk && renewalpolicyData.bzRiskKind.suggestRenewalDate">
                {{renewalpolicyData.bzRiskKind ? renewalpolicyData.bzRiskKind.suggestRenewalDate.substring(0,10) : ""}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">车辆详情</mt-tab-item>
        <mt-tab-item id="2">跟进记录</mt-tab-item>
        <mt-tab-item id="3">保单记录</mt-tab-item>
        <mt-tab-item id="4">报价记录</mt-tab-item>
        <mt-tab-item id="5" v-show="false">影像资料</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="mint-tab-content">
        <mt-tab-container-item id="1">
          <table class="mint-table" cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="30%">
              <col width="70%">
              <col>
            </colgroup>
            <tr>
              <th>车牌号</th>
              <td>{{custDetailsData.plateNo}}</td>
            </tr>
            <tr>
              <th>品牌型号</th>
              <td>{{custDetailsData.model}}</td>
            </tr>
            <tr>
              <th>车架号</th>
              <td>{{custDetailsData.vin}}</td>
            </tr>
            <tr>
              <th>发动机号</th>
              <td>{{custDetailsData.engineNo}}</td>
            </tr>
            <tr>
              <th>车辆销售价格</th>
              <td>{{custDetailsData.purchasePrice}}</td>
            </tr>
            <tr>
              <th>核定载客量</th>
              <td>{{custDetailsData.passengerCapacity}}</td>
            </tr>
            <tr>
              <th>车辆注册日期</th>
              <td v-if="custDetailsData.registerDate" >{{custDetailsData.registerDate.substring(0,10)}}</td>
            </tr>
            <tr>
              <th>是否过户</th>
              <td v-text="custDetailsData.isChangedOwner == 'true'? '是': '否'"></td>
            </tr>
            <tr v-show="custDetailsData.isChangedOwner">
              <th>过户日期</th>
              <td>{{custDetailsData.changedOwnerDate}}</td>
            </tr>
            <tr>
              <th>厂牌车型</th>
              <td>{{custDetailsData.fullPriceModel}}</td>
            </tr>
          </table>
          <table class="mint-table" cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="30%">
              <col width="70%">
              <col>
            </colgroup>
            <tr>
              <th>车主名</th>
              <td>{{custDetailsData.owner.name}}</td>
            </tr>
            <tr>
              <th>证件类型</th>
              <td>{{custDetailsData.owner.relationType}}</td>
            </tr>
            <tr>
              <th>车主证件号</th>
              <td>{{custDetailsData.owner.idNo.replace(/(\d{5})\d{6}(\d{6})/, "$1******$2") }}</td>
            </tr>
            <tr>
              <th>车主电话</th>
              <td >
               <p>{{custDetailsData.owner.phone}}</p> 
              </td>
            </tr>
            <tr>
              <th>电子邮箱</th>
              <td>{{custDetailsData.owner.email}}</td>
            </tr>
          </table>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" class="content-policies">
          <div class="mint-content">
            <div class="layui-card-body fn-clear">
              <ul v-show="!shouldShowNonTracks" class="layui-timeline">
                <li class="layui-timeline-item" v-for="item in tracks">
                  <i class="layui-icon layui-timeline-axis"></i>
                  <div class="layui-timeline-content layui-text">
                    <h3 class="layui-timeline-time">{{item.createdTime}}</h3>
                    <p class="layui-timeline-title">{{item.title}}</p>
                    <div class="cont-timeline" v-html="item.content">
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="non-data" v-show="shouldShowNonTracks">
            <img class="noImg" src="../../assets/images/icon-nothing.png">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3" class="content-policies">
          <ul class="cust-list mint-region" v-show="hasPoliciesData">
            <li class="mint-cell" v-for="item in policies" @click="renewalPolicyDetail(item)">
              <h3 class="mint-title"><img slot="icon" :src="item.src ? item.src : defaultImg" width="24" height="24"> {{item.car.plateNo}}-{{item.car.owner.name}}</h3>
              <p class="lab-time" v-html="item.label"></p>
              <i class="ico-arrow"></i>
            </li>
          </ul>
          <div class="non-data" v-show="!hasPoliciesData">
            <!-- <i class="ico-non-data"></i> -->
            <img class="noImg" src="../../assets/images/icon-nothing.png">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4" class="insure-policies">
          <div v-for="item in insurePolicies" v-show="hasInsurePoliciesData" @click="insListPage(item)">
            <mt-cell :title="item.createdTime" :label="item.policiesIns" is-link></mt-cell>
          </div>
          <div class="non-data" v-show="!hasInsurePoliciesData">
            <!-- <i class="ico-non-data"></i> -->
            <img class="noImg" src="../../assets/images/icon-nothing.png">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="5">
          <form action="" id="uploadForm" enctype="multipart/form-data">
            <!-- 暂时使用 -->
            <div class="non-data">
              <!-- <i class="ico-non-data"></i> -->
              <img class="noImg" src="../../assets/images/icon-nothing.png">
            </div>
          </form>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- <mt-popup v-model="shouldShowTracksBox" class="mint-popup-full mint-popup-tracks fn-clear" popup-transition="popup-fade" position="right" :modal="false">
      <div class="mt-popup-layer" @click="shouldShowTracksBox=false"></div>
      <div class="tracks-info">
        <div class="mt-header-tracks fn-clear">
          <h3>客户跟踪记录</h3>
          <mt-button class="fn-right" type="primary">更新进度</mt-button>
        </div>
        <div class="mint-content">
          <div class="layui-card-body fn-clear">
            <ul v-show="!shouldShowNonTracks" class="layui-timeline">
              <li class="layui-timeline-item" v-for="item in tracks">
                <i class="layui-icon layui-timeline-axis"></i>
                <div class="layui-timeline-content layui-text">
                  <h3 class="layui-timeline-time">{{item.createdTime}}</h3>
                  <p class="layui-timeline-title">{{item.title}}</p>
                  <div class="cont-timeline" v-html="item.content">
                  </div>
                </div>
              </li>
            </ul>
            <div class="non-tracks" v-show="shouldShowNonTracks">
              您还没有此客户的跟进记录，可以点击右上角的按钮更新状态哦~
            </div>
          </div>
        </div>
      </div>
    </mt-popup> -->
    <audio class="audio" id="audio" ref="audio" preload="metadata" :src="audioSrc"></audio>
    <div class="mint-bottom">
      <!-- <a :href="'tel:'+ custDetailsData.phone" v-show="custDetailsData.phone"><img src="../../assets/images/custDetail-phone.png" alt=""></a> -->
      <div class="phonebtn" >
          <a  :href="'tel:'+ custDetailsData.phone" v-if="custDetailsData.phone"><img style="height:28px;" src="../../assets/images/hasphone.png" alt=""></a>
          <a v-else><img style="height:28px;" src="../../assets/images/nophone.png" alt=""></a>      
      </div>
      <button class="btn-bottom" style="border:1px solid #f94037;border-radius:8px;margin-left:10px;height:35px" @click="toTrackRecord">录入跟进结果</button>
      <button class="btn-bottom" style="border:1px solid #f94037;border-radius:8px;margin-right:10px;margin-left:10px;height:35px" @click="quote">一键报价</button>
    </div>
    <van-popup v-model="showreneDetail" position="bottom" style="height:100%;" >
        <renewalDetail  v-on:closeRenewalDetail="closeRenewalDetail"></renewalDetail> 
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
import renewalDetail from "./../customerManagement/renewalPolicyDetail";
export default {
  name: 'home',
  data() {
    return {
      showreneDetail:false,
      selected: '1',
      shouldShowTracksBox: false,
      shouldShowNonTracks: false,
      hasPoliciesData: false,
      hasBzRisk: false,
      hasBsRisk: false,
      hasInsurePoliciesData: false,
      attachments: [],
      policies: [{
        "insureNo": "",
        "policyNo": "",
        "premium": "",
        "insuredTime": "",
        "insCorp": { "shortName": "", "code": "" },
        "insCity": { "shortName": "平安", "code": "pingan" },
        "insChannel": { "insCorpCode": "", "insCorpShortName": "", "insCityCode": "", "insCityShortName": "", "channelName": "" },
        "car": { "owner": { "name": "哥", "phone": "", "idNo": "", "idType": "", "relationType": "", "birthday": "", "gender": "" }, "plateNo": "粤B88888", "vin": "", "engineNo": "", "brandName": "", "model": "", "makerModel": "", "vehicleModelCode": "", "purchasePrice": "", "analogyCarPrice": "", "year": "", "passengerCapacity": "", "registerDate": "", "remark": "", "exhaustMeasure": "", "isChangedOwner": "", "changedOwnerDate": "", "aliasName": "", "seriesName": "", "fullPriceModel": "" },
        "applicant": { "name": "", "phone": "", "idNo": "", "idType": "", "relationType": "", "birthday": "", "gender": "" },
        "insured": { "name": "", "phone": "", "idNo": "", "idType": "", "relationType": "", "birthday": "", "gender": "" },
        "bzRiskKind": { "vehicleTax": { "totalTax": "", "tax": "", "preTax": "", "lateFeesOfTax": "" }, "beginDate": "", "endDate": "", "insureNo": "", "policyNo": "", "premium": "", "insDiscount": "" },
        "bsRiskKind": {
          "items": [{ "riskKindItemName": "", "premium": "", "quantity": "", "deductiblePremium": "", "coverage": "", "riskKindItemCode": "", "isDeductible": "" }],
          "beginDate": "",
          "endDate": "",
          "insureNo": "",
          "policyNo": "",
          "premium": "",
          "insDiscount": ""
        }
      }],
      insurePolicies: [{
        "insBatchNo": "",
        "plateNo": "",
        "carOwnerName": "",
        "vin": "",
        "applicantName": "",
        "insuredName": "",
        "createdTime": "",
        "policies": [{
          "insureNo": "",
          "bzInsureNo": "",
          "bsInsureNo": "",
          "premium": "",
          "insCorp": { "shortName": "", "code": "pingan" },
          "insureStatus": "报价失败"
        }]
      }],
      renewalpolicyData: {
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
        "bzRiskKind": {},
        "bsRiskKind": {}
      },
      hasRenewalpolicy: false,
      tracks: [{ "title": "", "content": "", "createdTime": "", "creatorName": "" }],
      custDetailsData: { id: 0, owner: { name: '', phone: '', idNo: '', idType: '', relationType: '', birthday: '', gender: '' } },
      aSrc: '',
      audioSrc: '',
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      customerId: ''
    }
  },
  components:{
    renewalDetail
  },
  mounted: function() {
    // this.customerId = this.$route.query.customerId;
    this.customerId = this.$route.query.customerId;
    var self = this;
    axiosGetAPI('/vi/customers/' + this.customerId).then(res => {
      if (res.result) {
        self.custDetailsData = res.result;
        console.log(self.custDetailsData)
        if (self.custDetailsData.owner.relationType == "Person") { self.custDetailsData.owner.relationType = "个人" }
        if (self.custDetailsData.owner.relationType == "Enterprise") { self.custDetailsData.owner.relationType = "企业单位" }
        if (self.custDetailsData.owner.relationType == "Organization") { self.custDetailsData.owner.relationType = "机关单位" }
        self.renewalpolicy();
        $('.annex-main').on('change', "#imgFile", function() {
          var $this = $(this),
            src = $('#uploadForm')[0];
          var file = this.files[0];
          var reader = new FileReader();
          reader.onloadend = function() {
            var dataURL = reader.result;
            var img = new Image();
            img.src = dataURL;
            var param = { image: dataURL }
            Indicator.open('加载中...');
            axiosPostAPI('/vi/customers/' + self.custDetailsData.customerId + '/attachments', param).then((res) => {
              self.getAttachments();
            });
          };
          if (file) reader.readAsDataURL(file);
        });
      }
    })

    // else {
    //   this.$router.push({ path: "/customerManagement/custIndex" });
    // }
  },
  methods: {
    closeRenewalDetail(){
      this.showreneDetail = false;
    },
    toTrackRecord: function() {
      this.$router.push({ path: 'customerTrackRecord?customerId=' + this.custDetailsData.customerId });
    },
    quote: function() {
      var curDate = new Date();
      var hh = curDate.getHours();
      var mm = curDate.getMinutes();
      if (hh >= 8 && hh <= 22) {
        if (hh == 22 && mm > 0) {
          Toast("非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。");
          return false;
        }
      var self = this;
      var url = "/quoteManagement/quoteInfo";
      var cityCode = this.renewalpolicyData.insCity ? this.renewalpolicyData.insCity.code : '';
      var shortName = this.renewalpolicyData.insCity ? this.renewalpolicyData.insCity.shortName : '';
      var carNo = this.custDetailsData ? this.custDetailsData.plateNo : '';
      var vin = this.custDetailsData ? this.custDetailsData.vin : '';
      vin = (vin == undefined) ? "" : vin;
      carNo = (carNo == undefined) ? "" : carNo;
      var phone = this.custDetailsData ? this.custDetailsData.owner.phone : '';
      phone = (phone == undefined) ? "" : phone;
        url = url + "?from=cust&customerId=" + this.custDetailsData.customerId + "&insCityCode=" + cityCode + "&insCityShortName=" + shortName + "&plateNo=" + carNo + "&vin=" + vin + "&phone=" + phone;
     
     localStorage.removeItem("insureInfoApp");
      localStorage.removeItem("quoteInfoStatus");
      Indicator.open('加载中...');
      setTimeout(function() {
        Indicator.close();
        self.$router.push({ path: url });
      }, 70);
      } else{
        Toast("非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。");
        return false;
      }
    },
    openBack: function() {
      // window.history.back();
      var url = '/customerManagement/custIndex';
      this.$router.push({ path: url });
    },
    renewalPolicyDetail: function(data) {
      this.$store.commit(types.RENEWALPOLICYDETAILS, data);
      this.showreneDetail = true;
      // this.$router.push({ path: "/customerManagement/renewalPolicyDetail" });
    },
    lastPolicyDetail: function(e) {
      e.preventDefault();
      if(this.renewalpolicyData){
        this.renewalPolicyDetail(this.renewalpolicyData)
      }
      
    },
    renewalpolicy: function() {
      var param = {
        insCityCode: '',
        vin: this.custDetailsData.vin,
        plateNo: this.custDetailsData.plateNo,
        engineNo: this.custDetailsData.engineNo,
        ownerIdCardNo: this.custDetailsData.idNo
      }
      Indicator.open('加载中...');
      var self = this;
      axiosGetAPI('/vi/RenewalPolicy', param).then((res) => {
        Indicator.close();
        if (res.result) {
          self.renewalpolicyData = res.result;
          if (self.renewalpolicyData.bzRiskKind) {
            self.hasBzRisk = true;
          } else {
            self.hasBzRisk = false;
          }
          if (self.renewalpolicyData.bsRiskKind) {
            self.hasBsRisk = true;
          } else {
            self.hasBsRisk = false;
          }
          self.hasRenewalpolicy = self.hasBsRisk || self.hasBzRisk;
          self.custDetailsData.car = self.renewalpolicyData.car;
          if (self.renewalpolicyData.car.owner.name) {
            self.custDetailsData.owner.name = self.renewalpolicyData.car.owner.name;
          };
          if (self.renewalpolicyData.car.owner.phone) {
            self.custDetailsData.owner.phone = self.renewalpolicyData.car.owner.phone;
          };

        } else {
          self.hasRenewalpolicy = false;
        }
      });
      self.getAttachments();
      self.getPolicies();
      self.getInsurePolicies();
      self.getTracks();
    },
    getTracks: function() {
      Indicator.open('加载中...');
      axiosGetAPI('/vi/customers/' + this.custDetailsData.customerId + '/tracks').then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.shouldShowNonTracks = false
          this.tracks = res.result
        } else {
          this.shouldShowNonTracks = true
        }
      });
    },
    getAttachments: function() {
      Indicator.open('加载中...');
      axiosGetAPI('/vi/customers/' + this.custDetailsData.customerId + '/attachments').then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {

          this.attachments = res.result
        }
      });
    },
    getPolicies: function() {
      Indicator.open('加载中...');
      axiosGetAPI('/vi/customers/' + this.custDetailsData.customerId + '/policies').then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.hasPoliciesData = true;
          this.policies = res.result;
          this.policies.map(item => {
            var html = "";
            if (item.bzRiskKind) {
              html += '<span class=\"cust-label\">交强险生效期:</span>' + item.bzRiskKind.beginDate + '~' + item.bzRiskKind.endDate
            }
            if (item.bsRiskKind) {
              html += '</br><span class=\"cust-label\">商业险生效期:</span>' + item.bsRiskKind.beginDate + '~' + item.bsRiskKind.endDate
            }
            item.label = html;
            item.src = require(`@/assets/images/companys/${item.insCorp.code}.png`);
          });
        } else {
          this.hasPoliciesData = false;
        }
      });
    },
    getInsurePolicies: function() {
      Indicator.open('加载中...');
      axiosGetAPI('/vi/customers/' + this.custDetailsData.customerId + '/insurePolicies').then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.hasInsurePoliciesData = true;
          this.insurePolicies = res.result;
          this.insurePolicies.map(item => {
            var policiesIns = '';
            var insureStatus = '';
            var len = item.policies.length;
            for (var i = 0; i < len; i++) {
              var policies = item.policies[i];
              if (policies.insureStatus == 'QuotedFailed') {
                insureStatus = '报价失败'
              } else if (policies.insureStatus == 'VerifiedFailed') {
                insureStatus = '核保失败'
              } else if (policies.insureStatus == 'QuotedSuccess') {
                insureStatus = '待核保'
              } else if (policies.insureStatus == 'VerifiedSuccess') {
                insureStatus = '待支付'
              } else if (policies.insureStatus == 'Paid') {
                insureStatus = '待承保'
              } else if (policies.insureStatus == 'Insured') {
                insureStatus = '已承保'
              }
              policiesIns += policies.insCorp.shortName + ':￥' + policies.premium + ',' + insureStatus;
              if (i != (len - 1)) {
                policiesIns += ' | ';
              };
            }
            item.policiesIns = policiesIns
          });
        } else {
          this.hasInsurePoliciesData = false;
        }
      });
    },
    // showTracksBox: function() {
    //   this.shouldShowTracksBox = true
    // },
    playAudio: function(e) {
      var audio = document.getElementById('audio')
      var $icon = $(e.currentTarget).find('.layui-icon');

      if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")) {
        if (this.aSrc != 'http://ting666.yymp3.com:86/new27/mljyyj/1.mp3') {
          audio.src = 'http://ting666.yymp3.com:86/new27/mljyyj/1.mp3'
          this.aSrc = audio.src;
        }
        if (audio.paused) {
          audio.play();
          $icon.addClass('icon-icon-stop');
          $icon.removeClass('icon-icon-play');
        } else {
          audio.pause();
          $icon.addClass('icon-icon-play');
          $icon.removeClass('icon-icon-stop');
        }
      }

      audio.addEventListener('error', function() {
        Toast('找不到音频路径!');
        return false;
      }, false);

      audio.addEventListener('ended', function() {
        audio.pause();
        $icon.addClass('icon-icon-play');
        $icon.removeClass('icon-icon-stop');
      }, false);
    },
    insListPage: function(item) {
      this.$store.commit(types.INSUREPOLICIES, item);
      this.$router.push({ path: "/quoteManagement/insList" });
    }
  }
}

</script>
<style scoped>
.mint-popup-tracks {
  width: 100%;
  height: 100%;
  margin-top: 44px;
  background: rgba(0, 0, 0, .6);
  z-index: 99 !important;
}

.mint-popup-tracks .mt-popup-layer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 25%;
}

.mt-header-tracks {
  position: fixed;
  top: 0;
  width: 75%;
  right: 0;
  height: 44px;
  background-color: #fff;
}

.mint-popup-tracks .tracks-info {
  position: absolute;
  top: 44px;
  bottom: 0;
  right: 0;
  width: 75%;
  overflow-y: scroll;
  background-color: #fff;
}

.mint-popup-tracks .mt-header-tracks h3 {
  float: left;
  line-height: 44px;
  font-weight: 400;
  color: #666;
  font-size: 14px;
  padding-left: 4%;
}

.mint-popup-tracks .mint-button--primary {
  height: auto;
  padding: 2px 12px;
  margin: 10px 4% 0 0;
  font-size: 12px;
}

.mint-content {
  padding-top: 30px;
}

.mint-header.def-header.cust-head {
  border-bottom: 1px solid #f0f0f0;
}

.mint-tab-content .mint-table {
  text-align: left;
}

.cust-title {
  margin-bottom: 16px;
  line-height: 22px;
  font-weight: 400;
}

.cust-title .plateno {
  float: left;
  font-size: 20px;
  color: #333;
}

.cust-title .levels {
  float: right;
  font-size: 12px;
  color: #808080;
}

.ico-levels {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  color: #fff;
  line-height: 16px;
  text-align: center;
  background-color: #F5A623;
}

.mint-bar {
  margin-bottom: 8px;
  font-size: 14px;
  color: #999;
}

.mint-bar a {
  text-decoration: none;
}

.mint-bar .icon-mini-icon-history {
  margin: 1px 2px 0 0;
}

.mint-bar .icon-mini-icon-history:before {
  color: #f94037;
}

.tracks {
  position: fixed;
  right: 0;
  bottom: 60px;
  width: 88px;
  height: 34px;
  padding: 8px;
  border-radius: 80px 0 0 80px;
  background: #ECF6FF;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
  font-size: 12px;
  color: #333;
  line-height: 34px;
}

.tracks .ico-tracks {
  float: left;
  width: 34px;
  height: 34px;
  font-size: 34px;
  border-radius: 50%;
  margin-right: 5px;
}

.annex-main .drag-box,
.annex-main .btn-add {
  float: left;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 10px 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.annex-main .drag-box {
  background: url(../../assets/images/load-failed.png) no-repeat center;
}

.annex-main .drag-box:nth-child(3n) {
  margin-right: 0;
}

.annex-main .drag-box img {
  width: 100%;
  height: 100%;
}

.annex-main .imgfile {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.annex-main .ico-del {
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: #666 url(../../assets/images/ico-closew.png) center;
  background-size: 14px 14px;
  border-radius: 50%;
}

.annex-main .drag-box:hover .ico-del {
  display: block;
}

.annex-main .btn-add {
  background: #f9f9f9 url(../../assets/images/ico-add.png) no-repeat center;
  background-size: 26px 26px;
  text-indent: -999em;
}

.trackBtn {
  /* margin-top: 20px; */
  /* padding: 2px; */
  /* border: 1px solid #0070D3; */
  color: #0070D3;
  text-align: center;
  /* width: 30%; */
  border-radius: 5px;
}

.fnRight{
    padding:2px 5px;
    font-size: 12px;
    border: 1px solid #f94037;
    border-radius: 8px;
    display: flex;
    align-items: center;
}

.non-data .noImg{
  width: 64px;
}

.phonebtn{
    border-right: 1px solid rgb(238, 238, 238);
    width: 0.9rem;
    /* padding-top: 8px; */
    height: 0.9rem;
    /* line-height: 50px; */
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
