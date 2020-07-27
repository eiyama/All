<template>
  <div class="angent" style="background-color:#F5F5F5;">
    <mt-header fixed class="def-header" title="个人信息">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right">
        <mt-button @click="Signout" style="font-size:16px;color:#f94037">退出登录</mt-button>
      </div>
    </mt-header>
    <div class="parentWrap" style="padding-top:48px;">
      <div style="background-color:white;color:red;height:30px;display: flex;align-items: center;padding-left:15px" v-show="!isSalesMan">入职申请{{salesManStatus}}</div>
      <!-- <div style="background-color:white;color:green;height:30px;display: flex;align-items: center;padding-left:15px" v-show="isSalesMan">入职申请{{salesManStatus}}</div> -->
      <div style="background-color:white;color:#333;display: flex;padding:10px;border-radius:8px;margin:10px">
        <div>
          <p>{{agentInfo.name}}</p>
          <p>工号:{{agentInfo.jobNumber?agentInfo.jobNumber:'未入职'}}</p>
          <p>职业资格证号:{{agentInfo.licenseNo?agentInfo.licenseNo:'暂无'}}</p>
          <p>职级:{{rankName?rankName:'暂无'}}</p>
        </div>
      </div>
      <div class="parentWrap" style="background-color:white;color:#333;display: flex;padding:10px;border-radius:8px;margin:10px">
        <div>
          <p style="font-weight:bold;font-size:15px">个人信息</p>
          <p style="color:#808080">证件类型:{{agentInfo.idType?agentInfo.idType:'无'}}</p>
          <p style="color:#808080">证件号码:{{agentInfo.idNo?agentInfo.idNo:'无'}}</p>
          <p style="color:#808080">性别:{{agentInfo.gender?agentInfo.gender:'无'}}</p>
          <p style="color:#808080">生日:{{agentInfo.birthDay?agentInfo.birthDay:'无'}}</p>
          <p style="color:#808080" v-show="agentInfo.nationality">国籍:{{agentInfo.nationality?agentInfo.nationality:'中国'}}</p>
          <p style="color:#808080" v-show="agentInfo.education">学历:{{agentInfo.education?agentInfo.education:'无'}}</p>
          <p style="color:#808080" v-show="agentInfo.maritalStatus">婚姻状况:{{agentInfo.maritalStatus?agentInfo.maritalStatus:'未婚'}}</p>
          <p style="color:#808080" v-show="agentInfo.nation">民族:{{agentInfo.nation?agentInfo.nation:'无'}}</p>
          <p style="color:#808080" v-show="agentInfo.politicalStatus">政治面貌:{{agentInfo.politicalStatus?agentInfo.politicalStatus:'无'}}</p>
        </div>
      </div>
      <div class="parentWrap" style="background-color:white;color:#333;display: flex;padding:10px;border-radius:8px;margin:10px">
        <div>
          <p style="font-weight:bold;font-size:15px">银行卡信息</p>
          <p style="color:#808080">开户银行:{{bankName?bankName:'无'}}</p>
          <p style="color:#808080">开户支行:{{bankSubName?bankSubName:'无'}}</p>
          <p style="color:#808080">银行卡号:{{bankCardNo?bankCardNo:'无'}}</p>
        </div>
      </div>
      <div class="parentWrap" style="background-color:white;color:#333;display: flex;padding:10px;border-radius:8px;margin:10px">
        <div>
          <p style="font-weight:bold;font-size:15px">机构信息</p>
          <p style="color:#808080">所属组织:{{agentInfo.organName?agentInfo.organName:'无'}}</p>
          <p style="color:#808080">推荐人:{{agentInfo.refereer?agentInfo.refereer:'无'}}</p>
          <p style="color:#808080">辅导人:{{agentInfo.counsellorSalesman?agentInfo.counsellorSalesman:'无'}}</p>
        </div>
      </div>
      <div class="parentWrap" style="background-color:white;color:#333;display:flex;padding:10px;border-radius:8px;margin:10px">
        <div>
          <p style="font-weight:bold;font-size:15px">保险公司工号</p>
          <div v-for="item in agentInfo.insCorpNumbers" v-show="hasInsCorpNum">
            <p style="color:#808080">{{item.insCorpName}}:{{item.number?item.number:'无'}}</p>
          </div>
          <div v-show="!hasInsCorpNum" style="color:#aaa;display: flex;text-align:center;font-size:12px;width:100%">
            未添加工号
          </div>
        </div>
      </div>
      <div class="parentWrap" style="background-color:white;color:#333;display: flex;padding:10px;border-radius:8px;margin:10px">
        <div>
          <p style="font-weight:bold;font-size:15px">影像资料</p>
          <div class="parentWrap" style="margin-bottom:35px" v-show="hasImages">
            <div class="parent" style="background-color: white;padding-left:10px;padding-right:10px">
              <div class="cerChild1" style="background-color: white;padding-top:10px" v-show="hasImage1">
                <img :src="image1" style="height:100%;width:100%">
                </div>
                <div class="cerChild1" style="background-color: white;padding-top:10px" v-show="hasImage2">
                  <img :src="image2" style="height:100%;width:100%">
                </div>
                </div>
                <hr width="100%" color="#f5f5f5" size="1" v-show="hasImage3||hasImage4" />
                <div class="parent" style="background-color: white;padding-left:10px;padding-right:10px">
                  <div class="cerChild1" style="background-color: white;padding-top:10px" v-show="hasImage3">
                    <img :src="image3" style="height:100%;width:100%">
                  </div>
                  <div class="cerChild1" style="background-color: white;padding-top:10px" v-show="hasImage4">
                      <img :src="image4" style="height:100%;width:100%">
                  </div>
                </div>
            </div>
            <div v-show="!hasImages" style="color:#aaa;display: flex;text-align:center;font-size:12px;width:100%">
              未添加影像资料
            </div>
          </div>
        </div>
        <div class="parentWrap" style="background-color:white;color:#333;display: flex;padding:10px;border-radius:8px;margin:10px">
          <div>
            <p style="font-weight:bold;font-size:15px">代理人协议</p>
            <div v-for="item in agreements" v-show="hasAgreements" >
              <p style="color:#7093ed" @click="openAgreement(item)"><<{{item.name?item.name:'无'}}>></p>
            </div>
            <div v-show="!hasAgreements" style="color:#aaa;display: flex;text-align:center;font-size:12px;width:100%">
              未签署协议
            </div>
          </div>
        </div>
        <mt-popup v-model="messageone" position="bottom" popup-transition="popup-fade" style="height:100%">
          <div class="messagecc">
            <mt-header fixed class="def-header" :title="agreementName">
              <div slot="right" @click="closeAgreement">
                <img :src="closeImg" style="width: 18px;height: 18px;" >
              </div>
            </mt-header>
            <iframe :src='agreementUrl' width='100%' height='100%' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
          </div>
        </mt-popup>
        <div style="background-color:white;color:#333;padding:10px;border-radius:8px;margin:10px">
          <p style="font-weight:bold;font-size:15px;display:flex;align-items:center;font-size:14px;color:#333;height:100%;justify-content: space-between;" @click="openModifyPWD">修改密码
            <van-icon name="arrow" style="margin-left:10px" />
          </p>
        </div>
        <van-dialog v-model="showModifyPWD" show-cancel-button :before-close="beforeClose" :overlay='overlay' :close-on-click-overlay='overlay' :show-confirm-button='btn' :showCancelButton='btn'>
          <div class="dialogs">
            <p style="color:#333;font-size:18px;font-weight:bold">修改密码</p>
            <div class="diaContent">
              <div style="margin-top:15px">
                <mt-field label="原密码" class="mint-formItm" v-model="oldPsw" type="password" placeholder="请输入原密码">
                </mt-field>
                <mt-field label="新密码" class="mint-formItm" v-model="newPsw" type="password" placeholder="请输入新密码">
                </mt-field>
                <mt-field label="确认密码" class="mint-formItm" v-model="confirmPsw" type="password" placeholder="请输入确认密码">
                </mt-field>
              </div>
              <div class="btns-hao" style="margin-top:30px">
                <span @click="cancel" style="font-size:14px">取消</span>
                <mt-button type="primary" @click="modifyPWD" size="large" style=" background: #f94037;font-size:12px;height:30px;width:85px">确定</mt-button>
              </div>
            </div>
          </div>
        </van-dialog>
      </div>
      <div class="parentWrap" style="background-color:white;color:#333;display: flex;padding:10px;border-radius:8px;margin-top:10px;" v-show="showReg">
        <mt-button class="btn-fixed" type="primary" size="large" @click="jumpreg">重新申请入职</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Dialog } from 'vant';
import store from './../../store/store';
import * as types from './../../store/types';
import verify from "./../../common/verify";
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { dialog } from 'vant';
export default {
  name: 'angent',
  data() {
    return {
      isSalesMan: false,
      salesManStatus: '',
      hasInsCorpNum: false,
      hasImages: false,
      agentInfo: {
        "idType": "",
        "idNo": "",
        "licenseNo": "",
        "linkUserId": "",
        "mobile": "",
        "jobNumber": "",
        "classify": "",
        "gender": "",
        "nationality": "",
        "birthDay": "",
        "address": "",
        "education": "",
        "maritalStatus": "",
        "nation": "",
        "politicalStatus": "",
        "bankCode": "",
        "bankName":'',
        "bankSubName": "",
        "bankCardNo": "",
        "contactName": "",
        "contactPhone": "",
        "email": "",
        "remark": "",
        "referrerSalesmanId": "",
        "refereer": "",
        "counsellorSalesmanId": "",
        "counsellorSalesman": "",
        "renewalHolderSalesmanId": "",
        "renewalHolderSalesman": "",
        "insCorpNumbers": [{
          "id": "",
          "number": "",
          "insCorpCode": "",
          "insCorpName": ""
        }],
        "images": [{
          "id": "",
          "filePath": "",
          "fileName": "",
          "rank": ""
        }],
        "id": "",
        "linkedUser": "",
        "name": "",
        "organName": "",
        "deptName": "",
        "status": "",
        "hiredate": "",
        "modifier": "",
        "modifiedTime": ""
      },
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      hasImages: false,
      hasImage1: false,
      hasImage2: false,
      hasImage3: false,
      hasImage4: false,
      rankName:'',
      bankName:'',
      bankSubName:'',
      bankCardNo:'',
      showReg:false,
      agreements:[],
      hasAgreements:false,
      messageone: false,
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      agreementName:'',
      agreementUrl:'',
      overlay: true,
      btn: false,
      showModifyPWD: false,
      oldPsw: '',
      newPsw: '',
      confirmPsw: '',
    }
  },
  mounted() {
    this.loadAgentInfo();
  },
  methods: {
    openAgreement:function(item) {
      this.messageone = true;
      this.agreementName = item.name;
      this.agreementUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + item.downloadUrl;
      // this.$router.push({ path: '/agreement?fileUrl=' + fileUrl })
    },
    closeAgreement:function() {
      this.messageone = false;
    },
    openBack: function() {
      this.$router.push({ path: "/myInfo/myIndex" });
    },
    beforeClose() {},
    Signout: function() {
      var self = this;
      store.commit(types.LOGOUT);
      sessionStorage.removeItem('userIds');
      sessionStorage.removeItem('nickName');
      sessionStorage.removeItem('referralCode');
      sessionStorage.removeItem('title');
      sessionStorage.removeItem('salesmanId');
      sessionStorage.removeItem('accountName');
      sessionStorage.removeItem("carInfoData");
      sessionStorage.removeItem('sellerOrgCode');
      sessionStorage.removeItem('sellerDeptCode');
      sessionStorage.removeItem('CarInformation');
      sessionStorage.removeItem('insCtiyCode');
      sessionStorage.removeItem('settleFeeIds');
      sessionStorage.removeItem('agentInfo');
      sessionStorage.removeItem("canViewCarCommission");
      sessionStorage.removeItem('canViewLifeCommission');
      sessionStorage.removeItem('canViewRemmendBonu');
      // sessionStorage.removeItem("canReg");
      sessionStorage.removeItem('accountName');
      sessionStorage.removeItem('sellerOrgName');
      sessionStorage.removeItem('sellerDeptName');
      sessionStorage.removeItem('sellerName');
      localStorage.removeItem('token');
      localStorage.removeItem('hasManage');
      localStorage.removeItem('hasViewCars');
      localStorage.removeItem('hasLookEnquiryProducts')
      localStorage.removeItem("hasLookAgencyBandCard");
      this.$router.push({ path: "/login?appId=" + localStorage.getItem('appId') });
    },
    loadAgentInfo: function() {
      var self = this;
      var salesmanId = sessionStorage.getItem('salesmanId');
      Indicator.open('加载中...');
      if (salesmanId) {
        self.isSalesMan = true;
        self.showReg = false;
        self.salesManStatus = '已通过';
        axiosGetAPI('/Salesmans/' + salesmanId).then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result) {
            self.parseAgentInfo(d.result);
          }
        })
        axiosGetAPI('/Ranks/' + salesmanId).then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result) {
            self.rankName = d.result.rankName;
          }
        })

      } else {
        var url = '/Users/' + sessionStorage.getItem('userIds') + '/SalesmanApply';
        axiosGetAPI(url).then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result) {
            self.parseAgentInfo(d.result);
          }
        })
      }
    },
    parseAgentInfo: function(agentInfo) {
      console.log(agentInfo);
      this.agentInfo = agentInfo;
      this.bankName = agentInfo.bankName;
      this.bankSubName = agentInfo.bankSubName;
      this.bankCardNo = agentInfo.bankCardNo;
      this.hasInsCorpNum = (agentInfo.insCorpNumbers && agentInfo.insCorpNumbers.length > 0);
      var images = agentInfo.images;
      this.hasImages = (images && images.length > 0);
      if (images.length > 0) {
        this.image1 = images[0].filePath;
        this.hasImage1 = true;
      } 
      if (images.length > 1) {
        this.image2 = images[1].filePath;
        this.hasImage2 = true;
      } 
      if (images.length > 2) {
        this.image3 = images[2].filePath;
        this.hasImage3 = true;
      } 
      if (images.length > 3) {
        this.image4 = images[3].filePath;
        this.hasImage4 = true;
      };
      this.showReg = false;
      if (agentInfo.status == 'NotPass' || agentInfo.status == 'NotRecheck') {
        this.isSalesMan = false;
        this.salesManStatus = '未通过';
        this.showReg = true;
      } else if (agentInfo.status == 'Auditing' || agentInfo.status == 'Recheck') {
        this.isSalesMan = false;
        this.salesManStatus = '审核中';
      } else {
        this.isSalesMan = true;
        this.salesManStatus = '已通过';
      }
      if (this.isSalesMan) {
        axiosGetAPI('/Salesmans/' + agentInfo.id +'/BankCards').then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result && d.result.length>0){
            this.agentInfo.bankName = d.result[0].subBankName;
            this.agentInfo.bankCardNo = d.result[0].cardNo;
            this.bankName = d.result[0].bankName;
            this.bankSubName = d.result[0].subBankName;
            this.bankCardNo = d.result[0].cardNo;
          }
        })
        axiosGetAPI('/Salesmans/' + agentInfo.id +'/Agreements').then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result && d.result.length>0){
            this.agreements = d.result;
            this.hasAgreements = true;
          } else{
            this.hasAgreements = false;
          }
        })
      };
    },
    jumpreg() {
      this.$router.push({ path: "/regUser", query: { appId: localStorage.getItem('appId') } });
    },
    openModifyPWD: function() {
      this.showModifyPWD = true;
    },
    cancel: function() {
      this.showModifyPWD = false;
    },
    modifyPWD: function() {
      var me = this;
      if (!me.oldPsw) {
        Toast({
          message: '请输入原密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      if (!me.newPsw) {
        Toast({
          message: '请输入新密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      if (!me.confirmPsw) {
        Toast({
          message: '请输入确认密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };

      if (me.confirmPsw != me.newPsw) {
        me.confirmPsw = '';
        Toast({
          message: '两次输入的密码不一致，请重新输入',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      var putBody = { "password": "", "newPassword": "" };
      putBody.password = me.oldPsw;
      putBody.newPassword = me.newPsw
      var url = '/Users/Me/Password';
      axiosPutAPI(url, putBody).then((data) => {
        Indicator.close();
        if (data.status == 200) {
          Toast('密码修改成功，请重新登录');
          me.Signout();
        } else {
          Toast(res.errMsg);
        }
      });
    },
  }
}

</script>
<style scoped>
.parentWrap {
  overflow: hidden;
}

.parent {
  overflow: hidden;
  margin-right: -10px;
}

.cerChild {
  float: left;
  // height: 100px;
  width: calc(25% - 5px);
  margin-right: 0px;
}

.cerChild1 {
  float: left;
  // height: 100px;
  width: calc(50% - 10px);
  margin-right: 10px;
  padding-bottom: 10px;
}

.messagecc {
  height: 100%;
  width: 100%;
}
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns-hao span {
  flex: 1;
  color: #f94037;
  line-height: 40px;
}

.btn-fixed {
  background: #f94037;
}
</style>
