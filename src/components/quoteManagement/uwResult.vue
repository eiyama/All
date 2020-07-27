<template>
  <div class="uwResult">
    <mt-header fixed class="def-header" title="核保">
      <div slot="left">
        <mt-button @click="openBack" icon="back"></mt-button>
      </div>
      <div slot="right">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openHome">
      </div>
    </mt-header>
    <div class="mint-content">
      <div :style="wrppera">
        <div class="uw-head fn-clear" v-show="insureStatus=='loading'">
          <i class="uw-img" :class="{ 'uwing' : insureStatus=='loading','uw-succ': insureStatus=='VerifiedSuccess', 'uw-fail': insureStatus=='VerifiedFailed', 'uw-manual': insureStatus== 'NeedManualAudit' }"></i>
        </div>
        <div class="uw-info fn-left">
          <div v-show="insureStatus=='loading'" style="text-align:center;">
            <h3 style="font-weight:bold;font-size:15px">{{order.insCorpName}}核保中<br>请稍候…</h3>
          </div>
          <div v-show="insureStatus=='VerifiedSuccess' || insureStatus=='VerifiedSuccessToShuanglu'" style="margin-top:50px;text-align:center;">
            <img src="../../assets/images/icon_successful.png" style="width:54px;height:54px">
            <h3 style="margin-top:10px;font-weight:bold;font-size:15px">{{order.insCorpName}}: 核保成功
              <span v-show="insureStatus=='VerifiedSuccessToShuanglu'">,待双录</span>
            </h3>
            <div style="text-align:left;padding-left:5%;margin-top:40px;padding-right:5%;">
              <p style="color: #333;font-size:14px;line-height:35px">投保信息: <span style="color: 333;font-weight:bold">{{order.insCorpName}} - {{order.plateNo}}</span></p>
              <p style="color: #333;font-size:14px;line-height:35px">保费核实: <span style="color: #fc4041;font-weight:bold">¥{{order.premium}}</span> 元</p>
              <p style="color: #333;font-size:14px;line-height:35px">交强险投保单号: <span style="color: 333;font-weight:bold" v-show="commonParam.bzInsureNo">{{commonParam.bzInsureNo}}</span></p>
              <p style="color: #333;font-size:14px;line-height:35px">商业险投保单号: <span style="color: #333;font-weight:bold" v-show="commonParam.bsInsureNo">{{commonParam.bsInsureNo}}</span></p>
            </div>
            <!-- <p class="uw-txt">奖金: ¥1,404.60元 (商: 24%+交:2%)<br>保单生成后奖金将转入您的平台钱包</p> -->
          </div>
          <div v-show="insureStatus=='VerifiedFailed'" class="replenish">
            <img src="../../assets/images/icon_failure.png" style="width:54px;height:54px">
            <h3 style="margin-top:10px;font-weight:bold;font-size:15px">{{order.insCorpName}}核保失败</h3>
            <p v-html="remark"></p>
            <span v-show="isRequireMaterial" @click="uploadAttachment" style="border:1px solid #4A66FE;padding:6px;border-radius:5px;color:#4A66FE;">点此补充资料</span>
          </div>
          <div v-show="insureStatus=='NeedManualAudit'" style="margin-top:50px;text-align:center;">
            <img src="../../assets/images/icon_failure.png" style="width:54px;height:54px">
            <h3 style="margin-top:10px;font-weight:bold;font-size:15px">{{order.insCorpName}}转人工核保</h3>
            <div style="text-align:left;padding-left:5%;margin-top:20px;padding-right:5%;">
              <p>转人工核保原因: </p>
              <p class="uw-txt" v-html="remark"></p>
            </div>
          </div>
          <div style="font-size:12px;color:#999;margin-top:30px;margin-bottom:30px;padding-left:5%;padding-right:5%;"> 温馨提示:<br>保险公司核保时会核对您的驾驶习惯及出险次数，对报价做出相应调整，最终核保价格与报价金额会有所差异。</div>
          <div style="font-size:12px;color:#999;margin-top:100px;margin-bottom:30px;padding-left:5%;padding-right:5%;">
            <mt-button style="margin-top:10px;" v-show="insureStatus=='VerifiedSuccessToShuanglu'" type="primary" size="large" @click="openDualRecord">去双录</mt-button>
            <mt-button style="margin-top:10px;color:#fff;background:#f44" v-show="insureStatus=='VerifiedSuccess'" type="primary" size="large" @click="openPayMode">
              去支付</mt-button>
            <mt-button style="margin-top:10px;background: #fff;border: 1px solid #4A66FE; color: #4A66FE;" v-show="insureStatus=='VerifiedFailed'" type="default" size="large" @click="openContributing">添加特约</mt-button>
            <mt-button style="margin-top:10px;background: #fff;border: 1px solid #4A66FE; color: #4A66FE;" v-show="insureStatus=='VerifiedFailed'" type="default" size="large" @click="reuwResult">重新核保</mt-button>
            <mt-button style="margin-top:10px;" v-show="insureStatus=='NeedManualAudit'" type="primary" size="large" @click="toQuoteDetail">查看状态</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
var Time;
export default {
  name: 'uwResult',
  data() {
    return {
      insureStatus: "loading", //核保状态值，控制显示和隐藏
      remark: "", //核保失败的原因
      order: {
        name: '',
        insBatchNo: "",
        insCorpCode: "",
        premium: "",
        plateNo: "",
        orderNo: '',
        premium: '',
        idType: '',
        idNo: '',
        relationType: '',
        insCorpName: '',
        riskName: '',
        applicantPhone: '',
      },
      isRequireMaterial: false,
      commonParam: {
        insBatchNo: '',
        insCorpCode: '',
        insCorpName: '',
        bzInsureNo: '',
        bsInsureNo: '',
        userName: '',
        applicatName: '',
        idNo: '',
      },
      insured: { name: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
      wrppera: {
        "width": "100%",
        "minHeight": "640px"
      },
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      key:'',
      specialCode:[],
      RiskValue:'',
    }
  },
  methods: {
    toQuoteDetail: function() {
      var self = this;
      var quoteJson = {
        insCorpName: self.commonParam.insCorpName,
        insCorpCode: self.commonParam.insCorpCode,
        insBatchNo: self.commonParam.insBatchNo
      };
      var appId = localStorage.getItem("appId");
      var localToken = localStorage.getItem('token');
      if (localToken) {
        localToken = localToken.replace(appId + '_', '');
      }
      var url = "/quoteManagement/quotedetail?insCorpName=" + quoteJson.insCorpName + "&insCorpCode=" + quoteJson.insCorpCode + "&insBatchNo=" + quoteJson.insBatchNo + "&appId=" + appId + "&token=" + encodeURIComponent(localToken);
      self.$router.push({ path: url });
    },
    openHome: function() {
      this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
    },
    openBack: function() {
      window.history.back();
    },
    reuwResult: function() {
      var self = this;
      var url = '/vi/insurePolicies' + '/' + self.commonParam.insBatchNo + '/' + self.commonParam.insCorpCode;
      Indicator.open('加载中...');
      axiosPutAPI(url).then((res) => {
        Indicator.close();
        if (res.result) {
          self.uwResultShow(res.result);
        
        }

      });
    },
    //资料补充
    uploadAttachment: function() {
      var self = {};
      self.insBatchNo = this.commonParam.insBatchNo;
      self.insCorpCode = this.commonParam.insCorpCode;
      this.$router.push({ path: "/supplementUp", query: self });
    },
    //双录
    openDualRecord: function() {
      var self = this;
      self.$router.push({ path: "/quoteManagement/dualrecord", query: self.commonParam });
    },
    //特约
    openContributing: function() {
      var self = this;
       if(this.key == "UnderwritingSpecials"){
        var specialCode = JSON.stringify(this.specialCode);
        var RiskValue =  this.RiskValue;
        sessionStorage.setItem('specialCode',specialCode);
        sessionStorage.setItem('RiskValue',RiskValue);
      }
      self.$router.push({ path: "/contributing", query: self.commonParam });
    },
    openPayMode: function() {
      //支付
      var self = this;
      Indicator.open('加载中...');
      axiosPostAPI('/vi/insurePolicies/' + self.$route.query.insBatchNo + '/' + self.$route.query.insCorpCode + '/orders', {
        model: self.insured
      }).then((data) => {
        Indicator.close();
        if (data.status == 200) {
          if (data.result) {
            self.order.orderNo = data.result.orderNo;
            self.order.premium = data.result.payAmount; //订单金额
            self.$router.push({ path: "/payPage", query: self.order });
          };
        }
      });

    },
    uwResultShow: function(data) {
      var self = this
      if (data.remark) self.remark = data.remark; //核保失败的原因
      if (data.insureStatus == 'Verifying') {
        self.insureStatus = 'loading';
      } else {
        clearInterval(Time);
        self.insureStatus = data.insureStatus;
        if (data.insureStatus == 'VerifiedSuccess' || data.insureStatus == 'Paid' || data.insureStatus == 'Insured') {
          self.insureStatus = 'VerifiedSuccess';
        }
      }
      self.order.orderNo = data.orderNo;
      self.order.insBatchNo = data.insBatchNo;
      self.order.insCorpCode = data.insCorp.code; //保险公司编码
      self.commonParam.insBatchNo = data.insBatchNo;
      self.commonParam.insCorpCode = data.insCorp.code;
      self.order.premium = data.premium; //订单金额
      self.order.insCorpName = data.insCorp.shortName; //保险公司名字
      self.commonParam.insCorpName = data.insCorp.shortName; //保险公司名字
      self.order.plateNo = data.car.plateNo; //车牌号
      self.order.name = data.applicant.name;
      self.insured.name = self.order.name;
      self.order.idNo = data.applicant.idNo;
      self.commonParam.userName = data.shuanglu ? data.shuanglu.name : "";
      self.commonParam.idNo = data.shuanglu ? data.shuanglu.idNo : "";
      self.commonParam.applicantPhone = data.applicant.phone;
      self.commonParam.applicatName = data.applicant.name;
      self.insured.idNo = self.order.idNo;
      self.order.idType = data.applicant.idType;
      self.insured.idType = self.order.idType;
      self.order.relationType = data.applicant.relationType;
      self.insured.relationType = self.order.relationType;
      if (data.bzRiskKind) {
        self.order.riskName = '交强险';
        self.commonParam.bzInsureNo = data.bzRiskKind.insureNo;
        if (data.bzRiskKind.vehicleTax) {
          self.order.riskName = '交强险+车船税';
        };
        if (data.bsRiskKind) {
          self.commonParam.bsInsureNo = data.bsRiskKind.insureNo;
          self.order.riskName += '+商业险';
        };
      } else if (data.bsRiskKind) {
        self.commonParam.bsInsureNo = data.bsRiskKind.insureNo;
        self.order.riskName = '商业险';
      };
      self.order.applicantPhone = data.applicant.phone;
      this.isRequireMaterial = data.isRequireMaterial
    }
  },
  created: function() {
    var self = this;
    var h = window.innerHeight;
    this.wrppera.minHeight = h + 'px';
    var url = '/vi/insurePolicies/' + self.$route.query.insBatchNo + '/' + self.$route.query.insCorpCode;
    self.order.insCorpCode = self.$route.query.insCorpCode;
    self.order.insBatchNo = self.$route.query.insBatchNo;
    self.order.shortName = self.$route.query.insCorpName;
    self.order.name = self.$route.query.name;
    self.order.insCorpName = self.$route.query.insCorpName;
    self.$event.$on('handle-insure', (res) => {
      self.order.shortName = res.insCorpName
    })
    Time = setInterval(function() {
      axiosGetAPI(url).then((res) => {
        if (res.result) {
          self.uwResultShow(res.result);
           if(res.result.suggestedInfo){
              self.specialCode = [],
              self.key = res.result.suggestedInfo.key;
              res.result.suggestedInfo.value.map(item=>{
                  if(item.fieldCode == 'RiskKind'){
                      self.RiskValue = item.fieldValue;
                  }
                  if(item.fieldCode == 'SpecialCode'){
                      self.specialCode.push(item.fieldValue);
                  }                  

              })
          }
        }
      });
    }, 1000);
  }
}

</script>
<style scoped>
.uwResult {
  background-color: #FFF;
}

.uwResult .mint-button.btn-fixed {
  width: 92%;
  left: 4%;
  bottom: 20px;
  border-radius: 4px;
}

.uwResult .mint-button.fixeds {
  bottom: 65px;
}

.uwResult .mint-region .mint-input {
  border: 1px solid #f6f6f6;
}

.mint-region .mint-cell-title {
  width: 80px
}

.uwResult .mint-formItm .mint-input {
  width: 96%;
  text-align: left;
  color: #333;
  padding-left: 10px;
}

</style>
