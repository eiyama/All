<template>
  <div class="underwriting" style="background-color:#F5F5F5;">
    <mt-header fixed class="def-header" title="投保人双录">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="mint-region" style="margin-top:48px;padding-top:5px;padding-bottom:100px;background-color:#F5F5F5">
      <div style="border:1px solid #F3F3F3;margin:10px;border-radius:5px;background-color:#FFF;padding-bottom:10px" v-show="showDualRecord">
        <h3 style="padding:10px">双录人</h3>
        <!-- <mt-field class="mint-formItm" label="姓名" :disabled="true">
          <span @click="openSelectPeople">
            <input class="mint-input" type="text" placeholder="请选择双录人" v-model="photographer.name">
            <i class="ico-arrow"></i>
          </span>
        </mt-field> -->
        <mt-field label="姓名" type="text" placeholder="填写双录人" v-model="photographer.name">
          <van-button size="small" style="color:#f94037;border:1px solid #f94037;margin-left:5px;border-radius:8px;" plain @click="openSelectPeople" v-show="hasPeoples">选择双录人</van-button>
        </mt-field>
        <mt-field class="mint-formItm" label="身份证号">
          <input class="mint-input" type="text" placeholder="请输入身份证号" v-model="photographer.idNo" oninput="if(value.length>18)value=value.slice(0,18)">
        </mt-field>
        <mt-field class="mint-formItm" label="登录密码">
          <input class="mint-input" type="password" placeholder="请输入深保通登录密码" v-model="photographer.password">
        </mt-field>
        <mt-actionsheet :actions="photographerArr" v-model="showSelectPeople"></mt-actionsheet>
        <!-- <mt-field class="mint-formItm" label="手机号码">
          <input class="mint-input" type="text" placeholder="请输入手机号码" v-model="photographer.phone" oninput="if(value.length>11)value=value.slice(0,11)">
        </mt-field> -->
        <div style="margin:50px;">
          <mt-button @click="updatePwd" type="primary" size="large">去双录</mt-button>
        </div>
      </div>
      <div style="border:1px solid #F3F3F3;margin:10px;border-radius:5px;background-color:#FFF;padding-bottom:10px" v-show="needDualRecord">
        <p style="padding-left:15px;padding-right:15px;padding-top:15px;font-size:12px;color:red;font-weight:bold;">
          将以短信双录的形式发送给客户进行投保确认</p>
        <p style="padding-left:15px;padding-right:15px;padding-top:5px;padding-bottom:5px;font-size:14px;color:#333;font-weight:bold;">
          投保人手机号码</p>
        <mt-field label="" type="tel" :attr="{ maxlength: 11 }" placeholder="请输入投保人手机号码" v-model="applicantPhone" length="11" style="border:1px solid #F3F3F3;margin-left:10px;margin-right:10px;padding-right:">
          <span v-show="showTimer" style="font-size:12px;background-color:#f94037;color:#FFF;padding:8px;border-radius:10px;margin-left: 30px;
    margin-right: -5px;" @click="sendMsg">{{ hasSended ? "重新发送" : "发送短信"}}</span>
          <span v-show="!showTimer" style="font-size:12px;background-color:#F5F5F5;color:#333;
          padding-left:15px;padding-right:15px;padding-top:8px;padding-bottom:8px;border-radius:10px;margin-left: 30px;
    margin-right: -5px;">{{count}}秒</span>
        </mt-field>
        <p style="padding-top:15px;padding-bottom:5px;font-size:14px;color:#333;text-align:center">
          客户双录状态: <span style="color:red">{{shuangluStatus.status}}</span></p>
      </div>
      <div style="margin:50px;" v-show="needDualRecord">
        <p style="padding-top:15px;padding-bottom:15px;font-size:12px;color:#666;text-align:center">
          建议等客户双录完成之后，再点击“查看客户双录状态”</p>
        <mt-button @click="checkDualRecord" type="primary" size="large">查看客户双录状态</mt-button>
      </div>
    </div>
    <van-dialog v-model="showPush" show-cancel-button :before-close="beforeClose" :overlay='overlay' :close-on-click-overlay='overlay' :show-confirm-button='btn' :showCancelButton='btn'>
      <div class="dialogs">
        <p style="color:#333;font-size:18px;font-weight:bold">温馨提示</p>
        <div class="diaContent">
          <div style="margin-top:15px">
            投保单在深保通不存在，请稍后再试或者{{insCorpCode == 'picc' ? "登录人保企业微信" : ""}}重新推送到深保通。
          </div>
          <div class="btns-hao" style="margin-top:30px">
            <span @click="push" style="font-size:14px">{{insCorpCode == 'picc' ? "" : "推送至深保通"}}</span>
            <!-- <mt-button type="primary" @click="push" size="large" style="font-size:12px;height:30px;width:85px">推送至深保通</mt-button> -->
            <mt-button type="primary" @click="cancel" size="large" style="font-size:12px;height:30px;width:85px">确定</mt-button>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import city from '../../assets/json/city.json';
import { Field } from 'mint-ui';
import { Toast, Indicator } from 'mint-ui';
import { Picker } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { dialog } from 'vant';
import axios from 'axios'
const TIME_COUNT = 60;
export default {
  name: 'dualRecord',
  data() {
    return {
      needDualRecord: false,
      insCorpCode: '',
      insBatchNo: '',
      insCorpName: '',
      bzInsureNo: '',
      bsInsureNo: '',
      applicatName: '',
      from: '',
      applicantPhone: '',
      showTimer: true,
      count: '',
      timer: null,
      photographer: {
        "name": "",
        "password": "",
        "idNo": "",
      },
      noDualRecordStatus: false,
      photographerArr: [],
      showSelectPeople: false,
      shuangluStatus: {
        "isSendMessage": "",
        "isVerify": "",
        "taskNumbers": "",
        "status": "",
        "statusCode": "",
      },
      peoples: [],
      hasSended: false,
      val: '',
      shows: false, //show
      overlay: true,
      btn: false,
      showPush: false,
      showDualRecord: false,
      hasPeoples:false,
    }
  },
  created() {},
  methods: {
    cancel: function() {
      this.showPush = false;
      window.history.back();
    },
    push: function() {
      if (this.insCorpCode != 'picc') {
        this.showPush = false;
        var url = '/vi/shuanglu/InsurePush?bzProposalNo=' + this.bzInsureNo + '&bsProposalNo=' + this.bsInsureNo;
        Indicator.open('正在推送至深保通，请稍后...');
        axiosGetAPI(url).then((res) => {
          Indicator.close();
          if (res.result) {
            if (res.result.isSucess) {
              this.checkDualRecord();
            } else {
              Toast('' + res.result.errorInfo);
            }
          }
        });
      }
    },
    beforeClose() {},
    openBack: function() {
      if (this.from == 'policyList') {
        this.$router.push({ path: "/quoteManagement/insList" });
      } else {
        window.history.back();
      }
    },
    updatePwd: function() {
      var self = this;

      if (!self.photographer.name) {
        Toast('请填写双录人姓名')
        return false
      }
      if (!self.photographer.idNo) {
        Toast('请填写双录人身份证号')
        return false
      } else {
        if (!self.Verify.validate.IsIDCard(self.photographer.idNo)) {
          Toast('请填写有效的身份证号')
          return false
        }
      }
      if (!self.photographer.password) {
        Toast('请填写深保通登录密码')
        return false
      }
      var url = '/vi/shuanglu/password';
      var requestBody = {};
      requestBody.userName = self.photographer.idNo;
      requestBody.password = self.photographer.password;
      Indicator.open('加载中...');
      axiosPostAPI(url, requestBody).then((res) => {
        Indicator.close();
        if (res.status == 200) {
          console.log(res.result);
          self.checkDualRecord();
        }
      });
    },
    sendMsg: function() {
      var self = this;
      var url = '/vi/shuanglu/SendVerificationCode';
      var requestBody = {};
      requestBody.userName = self.photographer.idNo;
      requestBody.taskNumber = self.shuangluStatus.taskNumbers;
      requestBody.phone = self.applicantPhone;
      requestBody.isResend = (self.shuangluStatus && (self.shuangluStatus.isSendMessage == '1'));
      self.hasSended = requestBody.isResend;
      Indicator.open('加载中...');
      axiosPostAPI(url, requestBody).then((res) => {
        Indicator.close();
        if (res.result) {
          console.log(res.result);
          self.shuangluStatus = res.result;
          self.hasSended = (self.shuangluStatus && (self.shuangluStatus.isSendMessage == '1'))
        }
      });
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.showTimer = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.showTimer = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    checkDualRecord: function() {
      var self = this;
      // sessionStorage.getItem('sellerDeptCode');
      var orgCode = sessionStorage.getItem('sellerOrgCode');
      var insureNo = self.bzInsureNo ? self.bzInsureNo : self.bsInsureNo
      var urlParam = '/vi/shuanglu/status?insureNo=' + insureNo + '&userName=' + self.photographer.idNo +
        '&applicatName=' + self.applicatName;
      Indicator.open('加载中...');
      var root = process.env.API_ROOT
      axios({
          method: 'GET',
          url: urlParam,
          data: null,
          params: null,
          baseURL: root,
          withCredentials: false
        }).then((res) => {
          Indicator.open('加载中...');
          console.log(res.data);
          if (res.data.status == 200) {
            if (res.data.result) {
              self.shuangluStatus = res.data.result;
              if (self.shuangluStatus) {
                self.hasSended = (self.shuangluStatus.isSendMessage == '1');
                // var successStatus = ['已审核', '人工审核通过'];
                if (self.shuangluStatus.status == '已审核' || self.shuangluStatus.status == '人工审核通过') {
                  Toast('双录信息已审核');
                  self.openBack();
                };
              }
              self.needDualRecord = true;
            } else {
              self.getShuangLuPeopleList();
              self.showPush = true;
            }
          } else if (res.data.status == 500 &&
            (res.data.errCode == 'SBT_ACCOUNT_ERROR' || res.data.errCode == 'SHUANGLU_USER_NOT_EXIST' || res.data.errCode == 'SHUANGLU_USER_PASSWORD_EMPTY')) {
            self.needDualRecord = false;
            if (res.data.errCode == 'SHUANGLU_USER_PASSWORD_EMPTY') {
              Toast('双录人深保通账号密码错误, 请更新');
            } else{
              Toast(res.data.errMsg);
            }
            self.getShuangLuPeopleList();
            self.showDualRecord = true;
          }
          Indicator.close();
        }, err => {
          reject(err)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getShuangLuPeopleList: function() {
      var self = this;
      // sessionStorage.getItem('sellerDeptCode');
      var orgCode = sessionStorage.getItem('sellerOrgCode');
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
                console.log(people);
                self.setShuangLuPeople(people);
              },
            };
            self.photographerArr.push(obj);
          };
        }
      });
    },
    setShuangLuPeople: function(people) {
      this.showSelectPeople = false;
      if (people) {
        var name = people.name;
        this.photographer.name = name;
        for (var i = 0; i < this.peoples.length; i++) {
          if (name == this.peoples[i].name) {
            this.photographer.idNo = this.peoples[i].idNo;
            break;
          };
        };

      };
    },
    openSelectPeople: function() {
      this.showSelectPeople = !this.showSelectPeople;
    }
  },
  mounted: function() {
    var that = this;
    that.from = that.$route.query.from;
    that.insCorpCode = that.$route.query.insCorpCode;
    that.insBatchNo = that.$route.query.insBatchNo;
    that.insCorpName = that.$route.query.insCorpName;
    that.bzInsureNo = that.$route.query.bzInsureNo;
    that.bsInsureNo = that.$route.query.bsInsureNo;
    that.photographer.name = that.$route.query.userName;
    that.photographer.idNo = that.$route.query.idNo;
    that.applicatName = that.$route.query.applicatName;
    that.applicantPhone = that.$route.query.applicantPhone;
    that.checkDualRecord();
  }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
dialogs .title {
  font-size: 14px;
}

.dialogs {
  padding: 10px 20px;
  font-size: 12px;
}

.diaContent {
  padding: 0 0px;
}

.diaContent .imgcontent {
  text-align: center
}

.diaContent .imgcontent img {
  max-width: 130px;
}

.diaContent .tip {
  padding: 20px 0;
  color: #B1B9CE
}

.diaContent .tip span {
  vertical-align: text-bottom;
  margin-left: 5px
}

.diaContent .pos .pos-content {
  padding: 0 20px;
  margin-bottom: -10px;
}

.diaContent .pos .pos-content .tit {
  padding-bottom: 10px;
}

.diaContent .pos .pos-content .tit span {
  font-size: 20px
}

.btns-hao {
  display: flex
}

.btns-hao span {
  flex: 1;
  color: #f94037;
  line-height: 40px;
}

</style>
