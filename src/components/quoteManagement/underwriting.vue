<template>
  <div class="underwriting" style="background-color:#F5F5F5;">
    <mt-header fixed class="def-header" title="提交核保">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="mint-region" style="margin-top:48px;padding-top:5px;padding-bottom:100px;background-color:#F5F5F5">
      <div v-show="relationType!=='Person'" style="border:1px solid #F3F3F3;margin:10px;border-radius:5px;background-color:#FFF;padding-bottom:10px">
        <h3 style="padding:10px">电子发票</h3>
        <p style="padding-left:15px;padding-right:15px;font-size:11px;color:red">
          保险公司默认开具普通(电子)发票，如需增值税专用发票请选择，否则不勾选</p>
        <mt-field label="专业增值税发票" type="text" :disabled="true">
          <span class="mint-plane fn-clear">
            <mt-radio v-model="needInvoce" :options="[{label: '是', value: 'Yes'}, {label: '否', value: 'No'}]"></mt-radio>
          </span>
        </mt-field>
        <p style="padding-left:15px;padding-right:15px;font-size:11px;color:#333;font-size:14px;min-height:25px">
          企业名称: {{invoiceName}}</p>
        <div v-show="needInvoce == 'Yes'">
          <mt-field class="mint-formItm upper" label="证件号码" :disabled="true">
            <input class="mint-input" type="text" placeholder="请输入证件号码" v-model.trim="unwritData.invoice.certificateNo">
          </mt-field>
          <mt-field class="mint-formItm upper" label="开户地址" :disabled="true">
            <input class="mint-input" type="text" placeholder="请输入开户地址" v-model.trim="unwritData.invoice.ticketAddress"></i>
          </mt-field>
          <mt-field class="mint-formItm upper" label="开户银行" :disabled="true">
            <input class="mint-input" placeholder="请输入开户银行" @click.stop="bankclick" type="text" v-model.trim="unwritData.invoice.depositBankName">
          </mt-field>
          <mt-field class="mint-formItm upper" label="开户账号" :disabled="true">
            <input class="mint-input" type="text" placeholder="请输入在国税局登记的银行账号" v-model.trim="unwritData.invoice.depositBankAccount" />
          </mt-field>
          <mt-field class="mint-formItm upper" label="联系电话" :disabled="true">
            <input class="mint-input" type="number" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="国税局登记的联系电话" v-model.trim="unwritData.invoice.depositBankPhone" />
          </mt-field>
        </div>
      </div>
      <div style="border:1px solid #F3F3F3;margin:10px;border-radius:5px;background-color:#FFF;padding-bottom:10px" v-show="relationType!=='Person' && insCityCode=='440300'">
        <h3 style="padding:10px">企业经办人</h3>
        <mt-field class="mint-formItm" label="姓名">
          <input class="mint-input" type="text" placeholder="企业经办人姓名" v-model="unwritData.agent.name">
        </mt-field>
        <mt-field class="mint-formItm" label="身份证号">
          <input class="mint-input" type="text" placeholder="企业经办人身份证号" v-model="unwritData.agent.idNo" oninput="if(value.length>18)value=value.slice(0,18)">
        </mt-field>
        <mt-field class="mint-formItm" label="手机号码">
          <input class="mint-input" type="text" placeholder="企业经办人手机号码" v-model="unwritData.agent.phone" oninput="if(value.length>11)value=value.slice(0,11)">
        </mt-field>
      </div>
      <div style="border:1px solid #F3F3F3;margin:10px;border-radius:5px;background-color:#FFF;padding-bottom:10px" v-show="insCityCode=='440300'">
        <h3 style="padding:10px">双录人</h3>
        <!-- <mt-field class="mint-formItm" label="姓名">
          <span>
            <input class="mint-input" type="text" placeholder="请选择双录人" v-model="unwritData.photographer.name">
            <i class="ico-arrow" style="margin-right:15px" @click="openSelectPeople"></i>
          </span>
        </mt-field> -->
        <mt-field label="姓名" type="text" placeholder="填写双录人" v-model="unwritData.photographer.name" >
          <van-button size="small" style="color:#f94037;border:1px solid #f94037;margin-left:5px;border-radius:8px;" plain @click="openSelectPeople" v-show="hasPeoples">选择双录人</van-button>
        </mt-field>
        <mt-field class="mint-formItm" label="身份证号">
          <input class="mint-input" type="text" placeholder="请输入身份证号" v-model="unwritData.photographer.idNo" oninput="if(value.length>18)value=value.slice(0,18)">
        </mt-field>
        <mt-actionsheet :actions="photographerArr" v-model="showSelectPeople"></mt-actionsheet>
        <!-- <mt-field class="mint-formItm" label="登录密码">
          <input class="mint-input" type="password" placeholder="请输入深保通登录密码" v-model="unwritData.photographer.password" >
        </mt-field> -->
        <!-- <mt-field class="mint-formItm" label="手机号码">
          <input class="mint-input" type="text" placeholder="请输入手机号码" v-model="unwritData.photographer.phone" oninput="if(value.length>11)value=value.slice(0,11)">
        </mt-field> -->
      </div>
      <div class="real-name" v-show="insCityCode=='440300' && insCorpCode=='picc'">
        <h3 style="color: #333;font-size: 14px;font-weight: normal;">是否实名制</h3>
        <van-radio-group style="display:flex;align-items:center;" v-model="radio">
          <van-radio style="margin:0 10px;" name="1">是</van-radio>
          <van-radio name="2">否</van-radio>
        </van-radio-group>
      </div>
      <div class="opinion" v-show="insCorpCode=='picc'">
        <h3>承保意见</h3>
        <van-cell-group>
          <van-field v-model="unwritData.attach.underwriteRemark" type="textarea" placeholder="输入承保意见" rows="1" autosize class="opinionText" />
        </van-cell-group>
        <div class="severMoney">
            <span>手续费调整</span>
            <van-field v-model="unwritData.attach.bzCostRate" v-show="isbzCostRate" placeholder="输入0-100的之间的数字" label="交强险比例:"   />
            <van-field v-model="unwritData.attach.bsCostRate" v-show="isbsCostRate" placeholder="输入0-100的之间的数字" label="商业险比例:" />
        </div>
      </div>
      <mt-button class="btn-fixed" @click="goUnderwriting" type="primary" size="large">提交核保信息</mt-button>
    </div>
  </div>
</template>
<script>
import city from '../../assets/json/city.json';
import { Field } from 'mint-ui';
import { Toast, Indicator } from 'mint-ui';
import { Picker } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
export default {
  name: 'underwriting',
  data() {
    return {
      radio: '1',
      insCityCode: '',
      relationType: "", //证件类型
      invoiceName: "",
      unwritData: { //核保提交的数据
        "express": {
          "receiverAddress": "",
          "receiverName": "",
          "receiverMobile": "",
          "zipCode": "",
          "email": "",
          "expressType": "SelfTake" //['Send'快递, 'SelfTake'自取]
        },
        "invoice": {
          "ticketAddress": "",
          "depositBankName": "",
          "depositBankAccount": "",
          "certificateNo": "",
          "depositBankPhone": "",
        },
        "photographer": {
          "name": "",
          "idNo": "",
          "orgCode": "",
        },
        "agent": {
          "name": "",
          "phone": "",
          "idNo": "",
        },
        "attach": {
          "underwriteRemark": "",
          "isRealName": false,
          "bsCostRate": "",
          "bzCostRate": ""//string,交强险手续费比例（%）
        }
      },
      needInvoce: "No",
      insCorpCode: '',
      insBatchNo: '',
      insCorpName: '',
      photographerArr: [],
      showSelectPeople: false,
      peoples: [],
      hasPeoples:false,
      isbsCostRate:false,
      isbzCostRate:false,
    }
  },
  created() {
    if (this.$route.query.insCityCode) {
      this.insCityCode = this.$route.query.insCityCode;
    }
    var insureInfoApp = JSON.parse(localStorage.getItem('insureInfoApp'));

    if(insureInfoApp.bsRiskKind){
      this.isbsCostRate = true;
    }
    if(insureInfoApp.bzRiskKind){
      this.isbzCostRate = true;
    }
  },
  methods: {
    getShuangLuPeopleList: function() {
      var self = this;
      if (self.insCityCode == '440300') {
        // sessionStorage.getItem('sellerDeptCode');
        var orgCode = sessionStorage.getItem('sellerOrgCode');
        self.unwritData.photographer.orgCode = orgCode;
        var url = '/vi/shuanglu?orgCode=' + orgCode;
        Indicator.open('加载中...');
        axiosGetAPI(url).then((res) => {
          Indicator.close();
          if (res.result) {
            self.peoples = res.result;
            self.hasPeoples = (res.result.length > 0);
            for (var i = 0; i < self.peoples.length; i++) {
              var people = self.peoples[i];
              var name = people.name;
              var idNo = people.idNo;
              var obj = {
                name: name,
                method: function(people) {
                  // console.log(people);
                  self.setShuangLuPeople(people);
                },
              };
              self.photographerArr.push(obj);
            };
          }
        });
      }
    },
    setShuangLuPeople: function(people) {
      this.showSelectPeople = false;
      if (people) {
        var name = people.name;
        this.unwritData.photographer.name = name;
        for (var i = 0; i < this.peoples.length; i++) {
          if (name == this.peoples[i].name) {
            this.unwritData.photographer.idNo = this.peoples[i].idNo;
            break;
          };
        };

      };
    },
    openSelectPeople: function() {
      this.showSelectPeople = !this.showSelectPeople;
    },
    openBack: function() {
      window.history.back();
    },
    goUnderwriting: function() {
      /*点击提交核保信息按钮响应函数*/
      var that = this;
      var expressType = that.unwritData.express.expressType;

      if (that.relationType !== 'Person' && that.needInvoce == 'Yes') {
        if (!that.unwritData.invoice.certificateNo) {
          Toast('请填写开户证件号')
          return false
        }
        if (!that.unwritData.invoice.ticketAddress) {
          Toast('请填写开户地址')
          return false
        }
        if (!that.unwritData.invoice.depositBankName) {
          Toast('请填写开户银行')
          return false
        }
        if (!that.unwritData.invoice.depositBankAccount) {
          Toast('请填写开户银行账户')
          return false
        }
        if (!that.unwritData.invoice.depositBankPhone) {
          Toast('请填写开户联系电话')
          return false
        }
      } else {
        that.needInvoce == 'No'
        that.unwritData.invoice = null;
      }

      if (that.relationType !== 'Person' && that.insCityCode == '440300') {
        if (!that.unwritData.agent.name) {
          Toast('请填写企业经办人姓名')
          return false
        }
        if (!that.unwritData.agent.idNo) {
          Toast('请填写企业经办人证件号码')
          return false
        } else {
          if (!this.Verify.validate.IsIDCard(that.unwritData.agent.idNo)) {
            Toast('请填写有效的企业经办人证件号码')
            return false
          }
        }
        if (!that.unwritData.agent.phone) {
          Toast('请填写企业经办人手机号')
          return false
        } else {
          if (!this.Verify.validate.IsTeleMobilePNumber(that.unwritData.agent.phone)) {
            Toast('请填写有效的企业经办人手机号')
            return false
          }
        }
      } else {
        that.unwritData.agent = null;
      }
      if (that.insCityCode == '440300') {
        if (!that.unwritData.photographer.name) {
          Toast('请填写双录人姓名')
          return false
        }
        if (!that.unwritData.photographer.idNo) {
          Toast('请填写双录人身份证号')
          return false
        } else {
          if (!this.Verify.validate.IsIDCard(that.unwritData.photographer.idNo)) {
            Toast('请填写有效的身份证号')
            return false
          }
        }
        that.unwritData.attach.isRealName = (that.radio == '1');
      } else {
        that.unwritData.photographer = null;
        that.unwritData.attach.isRealName = false;
      }

      /*if (!that.unwritData.photographer.password) {
        Toast('请填写登录密码')
        return false
      }
      if (!that.unwritData.photographer.phone) {
        Toast('请填写手机号')
        return false
      } else {
        if (!this.Verify.validate.IsTeleMobilePNumber(that.unwritData.photographer.phone)) {
          Toast('请填写有效的手机号')
          return false
        }
      }*/
      var param = that.unwritData;
      var url = '/vi/insurePolicies/' + that.insBatchNo + '/' + that.insCorpCode
      axiosPostAPI(url, param).then((res) => {
        var quoteJson = {
          insCorpCode: that.insCorpCode,
          insBatchNo: that.insBatchNo,
          insCorpName: that.insCorpName
        }
        this.$router.push({ path: "/quoteManagement/uwResult", query: quoteJson });
      });
    }
  },
  mounted: function() {
    var that = this;
    that.insCorpCode = that.$route.query.insCorpCode;
    that.insBatchNo = that.$route.query.insBatchNo;
    that.insCorpName = that.$route.query.insCorpName;
    /*把核保详情页面传过来的值赋值给relationType变量*/
    that.relationType = this.$route.query.relationType;
    /*接收企业的时候用的企业名称，用于展示*/
    that.invoiceName = this.$route.query.invoiceName;
    that.unwritData.invoice.certificateNo = this.$route.query.invoiceIdNo;
    that.unwritData.photographer.name = this.$route.query.shuangluName;
    that.unwritData.photographer.idNo = this.$route.query.shuangluIdNo;
    that.unwritData.express.expressType = 'SelfTake';
    that.getShuangLuPeopleList();
  }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.underwriting i {
  font-style: normal;
  margin-right: 10px;
  background-color: #F5F5F5;
  height: 100%;
}

.underwriting .home-carnum li input {
  width: 100%;
}

.underwriting .underwriting {
  background: #F5F5F5;
}

.underwriting header {
  height: 50px;
  background: #FFFFFF;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  width: 100%;
}

.underwriting header .header-left {
  position: relative;
  display: inline-block;
  width: 25%;
  height: 45px;
  float: left;
}

.underwriting header .header-left img {
  width: auto;
  height: 20px;
  margin-top: 7.5px;
  margin-left: 20px;
}

.underwriting header h3 {
  color: #333333;
  width: 50%;
  margin: 0 auto;
  text-align: center;
  height: 45px;
  line-height: 45px;
  float: left;
}

.underwriting header .header-right {
  position: relative;
  display: inline-block;
  width: 25%;
  height: 45px;
  float: right;
  text-align: right;
}

.underwriting header .header-right img {
  width: auto;
  height: 20px;
  margin-top: 7.5px;
  margin-right: 20px;
}

.underwriting .banks {
  line-height: 59px;
}

.underwriting footer .footer-left {
  height: 50px;
  float: left;
  width: 70%;
}

.underwriting footer .footer-left .footer-left-top {
  height: 20px;
  line-height: 20px;
  font-size: 11px;
  color: #B1C4DB;
  padding-left: 20px;
}

.underwriting footer .footer-left .footer-left-bottom {
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  color: #FC3738;
  padding-left: 20px;
}

.underwriting footer .footer-right {
  height: 50px;
  float: right;
  width: 30%;
  background: #f94037;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #FFFFFF;
}

.underwriting .detail-row {
  height: 30px;
  line-height: 30px;
  background: #FFFFFF;
  padding-left: 20px;
  padding-right: 20px;
}

.underwriting .detail-row .detail-row-left {
  font-size: 14px;
  color: #333333;
  margin-right: 5px;
}

.underwriting .detail-row .detail-row-left-last {
  font-size: 12px;
  color: #B1C4DB;
}

.underwriting .detail-row .detail-row-left-red {
  font-size: 12px;
  color: #FC3738;
}

.underwriting .detail-row .detail-row-right {
  font-size: 14px;
  color: #333333;
  float: right;
}

.underwriting .detail-row-three {
  height: 31px;
  background: #FFFFFF;
  padding-left: 20px;
  padding-right: 20px;
}

.underwriting .detail-row-three ul {
  width: 100%;
  height: 30px;
  border-bottom: 1px dotted #EEEEEE
}

.underwriting .home-carnum {
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  background: #FFFFFF;
}

.underwriting .home-carnum ul {
  height: 59px;
  width: 100%;
  border-bottom: 1px solid #EEEEEE;
}

.underwriting #sex {
  float: right;
  text-align: right;
}

.underwriting #sex div {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #F7F7F7;
  border: 1px solid #E0E0E0;
  border-radius: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 5px;
  margin-left: 10px;
}

.underwriting #sex div span {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #F7F7F7;
  border-radius: 10px;
  line-height: 10px;
}

.underwriting #sex div:nth-child(1) span {
  background: #f94037;
}

.underwriting .home-carnum ul li {
  height: 59px;
  float: left;
}

.underwriting .home-carnum ul li:nth-child(1) {
  line-height: 59px;
  width: 28%;
  font-size: 14px;
  color: #757E97;
  letter-spacing: 0;
  float: left;
}

.underwriting .home-carnum ul li:nth-child(1) img {
  display: inline-block;
  height: 24px;
  margin-top: 18px;
  margin-right: 10px;
  float: left;
}

.underwriting .home-carnum ul li:nth-child(1) img.why {
  width: 15px;
  height: 15px;
  margin-left: 10px;
  margin-top: 22.5px;
}

.underwriting .home-carnum ul li:nth-child(2) {
  line-height: 59px;
  width: 70%;
  font-size: 14px;
  color: #18243A;
}

.underwriting .ss .mint-cell {
  padding-left: 0 !important;
}

.underwriting .ss .mint-cell-title {
  color: #18243A !important;
}

.Double {
  margin-top: 50px;
  border-top: 1px solid #f6f6f6;
}

.Double-shuang {
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  background: #F8F8F8
}

.Double-shuang h3 {
  font-size: 14px;
  height: 42px;
  line-height: 42px;
  padding-left: 5%;
  color: #333;
}

.underwriting .mint-region .mint-input {
  border: 1px solid #f6f6f6;
}

.mint-region .mint-cell-title {
  width: 80px
}

.underwriting .mint-formItm .mint-input {
  width: 96%;
  text-align: left;
  color: #333;
  padding-left: 10px;
}

.opinion {
  background: #fff;
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
}

.opinion h3 {
  font-size: 14px;
  font-weight: normal;
  color: #333;

}

.opinionText {
  margin-top: 10px;
  height: 150px;
  border: 1px solid #f0f0f0;
}

.real-name {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #fff;
  margin: 10px;

}

.severMoney{
  margin-top: 20px;
}

</style>
