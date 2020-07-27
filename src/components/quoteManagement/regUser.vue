<template>
  <div class="customer">
    <mt-header fixed class="def-header cust-head" title="申请入职">
      <div slot="left" v-show="!isShare">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <div v-show="hasIDPhoto" class="boxClass">
        <p class="tip">身份证(正,反面)，银行卡照片上传</p>
        <div class="parentWrap">
          <div class="parent" style="background-color: white;padding-left:10px;padding-right:10px;padding-bottom:10px">
            <div class="regChild" style="display: flex;align-items: center;justify-content:center;text-align:justify;">
              <ImgInputer v-model="IdCardFront" accept="image/*" @onChange="onChangeIdCardFront" placeholder="请选择身份证正面" size="small" background-color="#FFF" bottomText="点击图片可修改" hoverText="点击图片可修改" noMask></ImgInputer>
            </div>
            <div class="regChild" style="display: flex;align-items: center;justify-content:center;text-align:justify;">
              <ImgInputer v-model="IdCardContrary" accept="image/*" @onChange="onChangeIdCardContrary" placeholder="请选择身份证反面" size="small" background-color="#FFF" bottomText="点击图片可修改" hoverText="点击图片可修改" noMask></ImgInputer>
            </div>
            <div class="regChild" style="display: flex;align-items: center;justify-content:center;text-align:justify;">
              <ImgInputer v-model="BankCard" accept="image/*" @onChange="onChangeBankCard" placeholder="请选择银行卡照片" size="small" background-color="#FFF" bottomText="点击图片可修改" hoverText="点击图片可修改" noMask></ImgInputer>
            </div>
          </div>
          <div class="parent" style="background-color: white;text-align:center;color:#333">
            <div class="regChild1" style="display: flex;align-items: center;justify-content:center;text-align:justify;">
              <P>身份证正面</P>
            </div>
            <div class="regChild1" style="display: flex;align-items: center;justify-content:center;text-align:justify;">
              <P>身份证反面</P>
            </div>
            <div class="regChild1" style="display: flex;align-items: center;justify-content:center;text-align:justify;">
              <P>银行卡</P>
            </div>
          </div>
        </div>
      </div>
      <div class="mint-region">
        <div v-show="hasPersonal" class="boxClass">
          <hr width="100%" color="#f5f5f5" size="1" />
          <p class="tip">个人信息</p>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="机构" type="text" :disabled="true">
            <span @click="openOrganizationBox">
              <input class="mint-input" v-model="organization" readonly="readonly" type="text" placeholder="选择机构">
              <i class="ico-arrow"></i>
            </span>
          </mt-field>
          <mt-popup v-model="popOrganizationVisible" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="popOrganizationVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selectOrganizationVal" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="organizationSlots" @change="onOrganizationChange"></mt-picker>
          </mt-popup>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="手机号" :disabled="true">
            <input class="mint-input" type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="customerData.Mobile" placeholder="请输入手机号" maxlength="11">
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="姓名" :disabled="true">
            <input class="mint-input" type="text" v-model="customerData.Name" placeholder="请输入姓名">
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="证件类型" type="text" :disabled="true">
            <span @click="openTypeBox">
              <input class="mint-input" v-model="ownerIdType" readonly="readonly" type="text" placeholder="选择证件类型">
              <i class="ico-arrow"></i>
            </span>
          </mt-field>
          <mt-popup v-model="popTypeVisible" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="popTypeVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selectTypeVal" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="typeSlots" @change="onTypesChange"></mt-picker>
          </mt-popup>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="证件号码" type="text" :disabled="true">
            <input class="mint-input" v-model="customerData.IdentityNo" type="text" placeholder="输入证件号" @blur.prevent="GetBirthday()">
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="出生日期" :disabled="true" type="text">
            <span @click="selOwnerBirthday">
              <input class="mint-input ownerBirthday" type="text" readonly="readonly" v-model="customerData.BirthDay" placeholder="选择出生日期">
              <i class="ico-arrow"></i>
            </span>
          </mt-field>
          <mt-datetime-picker ref="ownerBirthday" v-model="ownerBirthday" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="ownerBirthConfirm"></mt-datetime-picker>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field label="性别" type="text" :disabled="true">
            <span class="mint-plane fn-clear">
              <mt-radio v-model="customerData.Gender" :options="[{label: '男', value: '男'}, {label: '女', value: '女'}]"></mt-radio>
            </span>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="民族" type="text" :disabled="true">
            <span @click="openNationBox">
              <input class="mint-input" v-model="customerData.Nation" readonly="readonly" type="text" placeholder="选择民族">
              <i class="ico-arrow"></i>
            </span>
          </mt-field>
          <mt-popup v-model="popNationVisible" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="popNationVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selectNationVal" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="nationSlots" @change="onNationChange"></mt-picker>
          </mt-popup>
        </div>
        <div v-show="hasBankCard" class="boxClass">
          <hr width="100%" color="#f5f5f5" size="1" />
          <p class="tip">银行卡信息</p>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="银行卡号" :disabled="true">
            <input class="mint-input" type="number" oninput="if(value.length>22)value=value.slice(0,22)" v-model="customerData.BankCardNo" placeholder="请输入银行卡号" maxlength="23">
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="开户银行" type="text" :disabled="true">
            <span @click="openBankBox">
              <input class="mint-input" v-model="bank" readonly="readonly" type="text" placeholder="选择开户银行">
              <i class="ico-arrow"></i>
            </span>
          </mt-field>
          <mt-popup v-model="popBankVisible" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="popBankVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selectBankVal" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="bankSlots" @change="onBankChange"></mt-picker>
          </mt-popup>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="开户支行" :disabled="true">
            <input class="mint-input" type="text" v-model="customerData.OpenBranchBank" placeholder="请输入开户支行">
          </mt-field>
        </div>
        <div v-show="hasReferrer||hasReferrerMobile" class="boxClass">
          <hr width="100%" color="#f5f5f5" size="1" />
          <p class="tip">推荐人<span v-show="hasReferrerMobile" style="padding-left:70px;color:#333;font-weight:0">{{realName ? customerData.ReferrerMobile + "(" + realName + ")" : customerData.ReferrerMobile}}</span></p>
          <hr width="100%" color="#f5f5f5" size="1" />
          <mt-field class="mint-formItm" label="手机号" v-show="!hasReferrerMobile">
            <input class="mint-input" type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="customerData.ReferrerMobile" placeholder="请输入推荐人手机号" maxlength="11">
          </mt-field>
        </div>
        <div v-show="hasSignature" class="boxClass">
          <hr width="100%" color="#f5f5f5" size="1" />
          <p class="tip" style="height:30px">手写签名
            <van-button icon="edit" style="float:right;color:#f94037;font-size:12px" type="default" size="small" @click="showSignature=true" plain>签名</van-button>
          </p>
        </div>
        <div style="padding-left:10px;background-color:#FFF;min-height:45px;display: flex;align-items:center;" v-show="hasAgreements">
          <div style="float:left;">
            <van-checkbox v-model="checked">请阅读</van-checkbox>
          </div>
          <div style="float:left;" v-for="item in agreements">
            <span style="color:#f94037;margin-left:10px" @click="openAgreement(item)">
              << {{item.name}}>>
            </span>
          </div>
        </div>
        <van-popup v-model="showSignature" position="bottom" style="position: fixed;top: 0;background: #f5f5f5;">
          <div class="messagecc">
            <mt-header class="def-header" title="手写签名">
              <div slot="left" @click="closeSignature">
                <img :src="closeImg" style="width: 18px;height: 18px;">
              </div>
              <div slot="right" @click="saveSignature">
                <van-button style="float:right;color:#f94037;font-size:12px" type="default" size="small" plain>确认</van-button>
              </div>
            </mt-header>
            <!-- <div id="app" style="padding-left:2px;padding-bottom:2px;padding-right:2px;background-color:#FFF"> -->
            <!-- <vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'100%'" style="border:1px solid #F5F5F5" /> -->
            <vueSignature ref="signature" :sigOption="option"></vueSignature>
            <div class="btnBox" style="margin-top:-35px;right:15px;top:15px;font-size: 25px;color:#666666">
              <van-icon name="close" @click="clearSignature" />
            </div>
            <!-- </div> -->
          </div>
        </van-popup>
        <mt-popup v-model="messageone" position="bottom" popup-transition="popup-fade" style="height:100%">
          <div class="messagecc">
            <mt-header fixed class="def-header" :title="agreementName">
              <div slot="right" @click="closeAgreement">
                <img :src="closeImg" style="width: 18px;height: 18px;">
              </div>
            </mt-header>
            <iframe :src='agreementUrl' width='100%' height='100%' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
          </div>
        </mt-popup>
      </div>
    </div>
    <mt-button type="primary" size="large" @click="commitReg" class="btn-fixed" v-show="hasPersonal||hasBankCard||hasIDPhoto||hasSignature">提交</mt-button>
  </div>
</template>
<script>
var typeResult = { 个人: ["中华人民共和国身份证", "港澳居民来往内地通行证", "台胞证", "士兵证/军官证/警官证", "中国护照", "外国护照"] },
  regPlates = ["Personal", "Referrer", "BankCard", "IDPhoto", "Signature", "Agreement"];
import { Toast, Indicator } from 'mint-ui';
import verify from "./../../common/verify";
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import event from './../../common/event';
import city from '../../assets/json/city.json';
import { Dialog } from 'vant';
import axios from "axios";
const address = city;
var formData = new FormData();
export default {
  name: 'customer',
  data() {
    return {
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)"
      },
      name: "app",
      customerData: {
        "Name": "",
        "Gender": "",
        "Nation": "汉族",
        "IdentityType": "",
        "IdentityNo": "",
        "BirthDay": "",
        "MaritalStatus": "",
        "PoliticalStatus": "",
        "EducationLevel": "",
        "OpenBank": "",
        "OpenBranchBank": "",
        "BankCardNo": "",
        "DeptCode": "",
        "UserId": "",
        "Mobile": "",
        "ReferrerMobile": "",
        "OrgCode": ""
      },
      postData: {
        "personal": {
          "name": "",
          "gender": "",
          "nation": "",
          "identityType": "",
          "identityNo": "",
          "birthDay": "",
          "maritalStatus": "",
          "politicalStatus": "",
          "educationLevel": "",
          "mobile": "",
          "orgCode": "",
          "userId": ""
        },
        "bankCard": {
          "openBank": "",
          "openBranchBank": "",
          "bankCardNo": ""
        },
        "idPhotoBase": {
          "idCardFrontMediaId": "",
          "idCardContraryMediaId": "",
          "bankCardMediaId": ""
        },
        "referrer": {
          "referrerMobile": ""
        },
        "signature": {
          "signatureMediaId": ""
        },
        "salesmanConfigId":"",
      },
      ownerIdTypeVal: "",
      popTypeVisible: false,
      typeSlots: [
        { flex: 1, values: Object.keys(typeResult), className: "slot1", textAlign: "center" },
        { divider: true, content: "-", className: "slot2" },
        { flex: 1, values: Object.values(typeResult)[0], className: "slot3", textAlign: "center" }
      ],
      popNationVisible: false,
      nation: '',
      nationVal: '',
      nationSlots: [{
        flex: 1,
        defaultIndex: 0,
        values: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族",
          "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族",
          "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族",
          "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族",
          "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族",
          "门巴族", "珞巴族", "基诺族"
        ],
        className: 'slot1'
      }],
      popMaritalVisible: false,
      marital: '',
      maritalVal: '',
      maritalSlots: [{ flex: 1, defaultIndex: 0, values: ["已婚", "未婚", "离异", "丧偶"], className: 'slot1' }],
      popPoliticsVisible: false,
      politics: '',
      politicsVal: '',
      politicsSlots: [{
        flex: 1,
        defaultIndex: 0,
        values: ["普通居民", "中共党员", "中共预备党员", "共青团员", "民革党员", "民盟盟员",
          "民建会员", "民进会员", "农工党党员", "致公党党员", "九三学社社员", "台盟盟员", "无党派人士"
        ],
        className: 'slot1'
      }],
      popEducationVisible: false,
      education: '',
      educationVal: '',
      educationSlots: [{ flex: 1, defaultIndex: 0, values: ["初中", "高中", "大专", "本科", "硕士", "博士", "文盲"], className: 'slot1' }],
      popOrganizationVisible: false,
      organization: '',
      organizationVal: '',
      organizationSlots: [{ flex: 1, defaultIndex: 0, values: [], className: 'slot1' }],
      popBankVisible: false,
      bank: '',
      bankVal: '',
      bankSlots: [{ flex: 1, defaultIndex: 0, values: [], className: 'slot1' }],
      recommendPhone: '',
      startDate: new Date("1945-01-01"),
      endDate: new Date(this.Common.Public.GetDateStr(0)),
      ownerBirthday: new Date(this.Common.Public.GetDateStr(0)),
      ownerIdType: "",
      ownerSex: "",
      objs: '',
      Banks: [],
      addImg: this.src = require('../../assets/images/ico-add.png'),
      IdCardFront: '',
      IdCardContrary: '',
      BankCard: '',
      Depts: [],
      referrerMobile: '',
      nickName: '',
      title: '',
      downloadUrl: '',
      appId: '',
      agentInfo: {},
      checked: false,
      hasReferrerMobile: false,
      agreements: [],
      agreementName: '',
      agreementUrl: '',
      messageone: false,
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      realName: '',
      plates: [],
      hasAgreements: false,
      hasPersonal: false,
      hasReferrer: false,
      hasBankCard: false,
      hasIDPhoto: false,
      hasSignature: false,
      IdCardFrontBase64: '',
      IdCardContraryBase64: '',
      BankCardBase64: '',
      SignatureBase64: '',
      showSignature: false,
      isShare: false,
      salesmanConfigId:"",
    };
  },
  created() {
    this.isShare = this.$route.query.isShare;
    if (this.isShare == 'undefined') {
      this.isShare = false;
    }
    this.referrerMobile = this.$route.query.ReferrerMobile;
    this.nickName = this.$route.query.nickName;
    this.title = this.$route.query.title;
    this.appId = this.$route.query.appId;
    localStorage.setItem('appId', this.appId);
    Indicator.open('正在加载，请稍等...');
    axiosGetAPI('/Configurations?types=salesman').then((d) => {
      Indicator.close();
      this.initData(d);
    })

    axiosGetAPI('/Banks').then((res) => {
      if (res.status == 200 && res.result) {
        this.Banks = res.result;
        var bankNames = [];
        for (var i = 0; i < this.Banks.length; i++) {
          bankNames.push(this.Banks[i].shortName);
        }
        this.bankSlots[0].values = bankNames;
      }
    });
    axiosGetAPI('/Organizations/Shops').then((res) => {
      if (res.status == 200 && res.result) {
        this.Depts = res.result;
        var deptNames = [];
        for (var i = 0; i < this.Depts.length; i++) {
          deptNames.push(this.Depts[i].fullName);
        }
        this.organizationSlots[0].values = deptNames;
      }
    });
    if (this.referrerMobile) {
      this.hasReferrerMobile = true;
      axiosGetAPI('/Users?userName=' + this.referrerMobile).then((res) => {
        if (res.status == 200 && res.result) {
          this.realName = res.result.realName;
          this.customerData.ReferrerMobile = res.result.userName;
          this.customerData.OrgCode = res.result.orgCode;
          this.organization = res.result.orgName;
        }
      });
    } else {
      this.hasReferrerMobile = false;
    }
    /*var userId = sessionStorage.getItem('userIds');
    if (userId && (userId > 0)) {
      var url = '/Users/' + userId + '/SalesmanApply';
      axiosGetAPI(url).then((d) => {
        Indicator.close();
        if (d.status == 200) {
          this.customerData.Name = d.result.name;
          this.customerData.Gender = d.result.gender;
          this.customerData.Name = d.result.name;
          this.customerData.Nation = d.result.nation;
          this.customerData.IdentityType = d.result.idType;
          this.customerData.IdentityNo = d.result.idNo;
          this.customerData.BirthDay = d.result.birthDay;
          this.customerData.EducationLevel = d.result.education;
          this.customerData.OpenBank = d.result.bankCode;
          this.customerData.OpenBranchBank = d.result.bankSubName;
          this.customerData.BankCardNo = d.result.bankCardNo;
          this.customerData.UserId = this.userId;
          this.customerData.Mobile = d.result.mobile;
          this.customerData.MaritalStatus = d.result.maritalStatus;
          this.customerData.PoliticalStatus = d.result.politicalStatus;
        }
      })
    };*/
  },
  mounted() {},
  methods: {
    uploadFile: function(type, base64Str) {
      var self = this;
      var obj = {};
      obj.dataURIString = base64Str;
      axiosPostAPI('/Documents?folderName=SalesmanApply', obj).then((res) => {
        Indicator.close();
        console.log(res.result);
        if (res.result) {
          if (type == "IdCardFront") {
            self.postData.idPhotoBase.idCardFrontMediaId = res.result.id;
          } else if (type == "IdCardContrary") {
            self.postData.idPhotoBase.idCardContraryMediaId = res.result.id;
          } else if (type == "BankCard") {
            self.postData.idPhotoBase.bankCardMediaId = res.result.id;
          } else if (type == "Signature") {
            self.postData.signature.signatureMediaId = res.result.id;
          }
        }
      });
    },
    initData: function(res) {
      if (res.status == 200 && res.result && res.result.salesman) {
        this.salesmanConfigId = res.result.salesman.id;
        this.agreements = res.result.salesman.agreements;
        this.plates = res.result.salesman.plates;
        //"Personal", "Referrer", "BankCard", "IDPhoto", "Signature", "Agreement"
        if (this.plates && this.plates.length > 0) {
          for (var i = 0; i < this.plates.length; i++) {
            if (this.plates[i] == "Personal") {
              this.hasPersonal = true;
            }
            if (this.plates[i] == "Referrer") {
              this.hasReferrer = true;
            }
            if (this.plates[i] == "BankCard") {
              this.hasBankCard = true;
            }
            if (this.plates[i] == "IDPhoto") {
              this.hasIDPhoto = true;
            }
            if (this.plates[i] == "Signature") {
              this.hasSignature = true;
            }
            if (this.plates[i] == "Agreement") {
              this.hasAgreements = true;
            }
          }
        }
      } else {
        this.hasPersonal = false;
        this.hasReferrer = false;
        this.hasBankCard = false;
        this.hasIDPhoto = false;
        this.hasSignature = false;
        this.hasAgreements = false;
      }
    },
    openUrl: function(url) {
      window.location.href = url;
    },
    openAgreement: function(item) {
      this.messageone = true;
      this.agreementName = item.name;
      this.agreementUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + item.fileMediaUrl;
      // this.$router.push({ path: '/agreement?fileUrl=' + fileUrl })
    },
    closeAgreement: function() {
      this.messageone = false;
    },
    saveSignature: function() {
      var self = this;
      self.showSignature = false;
      if (self.hasSignature) {
        if (self.$refs.signature.isEmpty()) {
          self.SignatureBase64 = '';
          self.postData.signature.signatureMediaId = 0;
          Toast('请签名');
          return false
        } else {
          // var png = self.$refs.signature.save()
          var jpeg = self.$refs.signature.save('image/jpeg');
          var img = new Image,
            width = 800, //image resize   压缩后的宽
            quality = 0.8, //image quality  压缩质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          img.src = jpeg;
          img.onload = function() {
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            //上传
            var base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            self.SignatureBase64 = base64;
          }
        }
      }
    },
    closeSignature: function() {
      var self = this;
      self.showSignature = false;
      self.clearSignature();
    },
    clearSignature: function() {
      var self = this;
      self.SignatureBase64 = '';
      self.postData.signature.signatureMediaId = 0;
      self.$refs.signature.clear();
    },
    undo: function() {
      var self = this;
      self.$refs.signature.undo();
    },
    addWaterMark: function() {
      var self = this;
      self.$refs.signature.addWaterMark({
        text: "mark text", // watermark text, > default ''
        font: "20px Arial", // mark font, > default '20px sans-serif'
        style: 'all', // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill    
        fillStyle: "red", // fillcolor, > default '#333' 
        strokeStyle: "blue", // strokecolor, > default '#333' 
        x: 100, // fill positionX, > default 20
        y: 200, // fill positionY, > default 20        
        sx: 100, // stroke positionX, > default 40
        sy: 200 // stroke positionY, > default 40
      });
    },
    fromDataURL: function(url) {
      var self = this;
      self.$refs.signature.fromDataURL(url);
    },
    onChangeIdCardFront: function(file, name) {
      var self = this;
      self.IdCardFront = file;
      self.postData.idPhotoBase.idCardFrontMediaId = 0;
      console.log(self.IdCardFront);
      if (self.IdCardFront) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          var orignData = e.target.result;
          // console.log(orignData);
          var img = new Image,
            width = 800, //image resize   压缩后的宽
            quality = 0.8, //image quality  压缩质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          img.src = orignData;
          img.onload = function() {
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            //上传
            var base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            self.IdCardFrontBase64 = base64;
            // console.log(base64);
            // self.uploadFile("IdCardFront", base64);
          }
        };
        reader.readAsDataURL(self.IdCardFront);
      }
    },
    onChangeIdCardContrary: function(file, name) {
      var self = this;
      self.IdCardContrary = file;
      self.postData.idPhotoBase.idCardContraryMediaId = 0;
      console.log(self.IdCardContrary);
      if (self.IdCardContrary) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          var orignData = e.target.result;
          // console.log(orignData);
          var img = new Image,
            width = 800, //image resize   压缩后的宽
            quality = 0.8, //image quality  压缩质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          img.src = orignData;
          img.onload = function() {
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            //上传
            var base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            self.IdCardContraryBase64 = base64;
            // console.log(base64);
            // self.uploadFile("IdCardContrary", base64);
          }
        };
        reader.readAsDataURL(self.IdCardContrary);
      }
    },
    onChangeBankCard: function(file, name) {
      var self = this;
      this.BankCard = file;
      this.postData.idPhotoBase.bankCardMediaId = 0;
      console.log(self.BankCard);
      if (self.BankCard) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          var orignData = e.target.result;
          // console.log(orignData);
          var img = new Image,
            width = 800, //image resize   压缩后的宽
            quality = 0.8, //image quality  压缩质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          img.src = orignData;
          img.onload = function() {
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            //上传
            var base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            self.BankCardBase64 = base64;
            // console.log(base64);
            // self.uploadFile("BankCard", base64);
          }
        };
        reader.readAsDataURL(self.BankCard);
      }
    },
    onErr: function(err, file) {
      console.log("​onErr -> file", file);
      console.log("​onErr -> err", err);
    },
    onOrganizationChange: function(picker, values) {
      picker.setSlotValues(1, typeResult[values[0]]);
      this.organizationVal = values;
    },
    openOrganizationBox: function() {
      if (!this.hasReferrerMobile) {
        this.popOrganizationVisible = true;
      };
    },
    selectOrganizationVal: function() {
      this.popOrganizationVisible = false;
      this.organization = this.organizationVal;
      for (var i = 0; i < this.Depts.length; i++) {
        if (this.Depts[i].fullName == this.organization) {
          this.customerData.OrgCode = this.Depts[i].code;
          break;
        }
      }
      console.log("organization:" + this.organization[0] + this.customerData.OrgCode);
    },
    onEducationChange: function(picker, values) {
      picker.setSlotValues(1, typeResult[values[0]]);
      this.educationVal = values;
    },
    openEducationBox: function() {
      this.popEducationVisible = true;
    },
    selectEducationVal: function() {
      this.popEducationVisible = false;
      this.education = this.educationVal;
      this.customerData.EducationLevel = this.education[0];
    },
    onPoliticsChange: function(picker, values) {
      picker.setSlotValues(1, typeResult[values[0]]);
      this.politicsVal = values;
    },
    openPoliticsBox: function() {
      this.popPoliticsVisible = true;
    },
    selectPoliticsVal: function() {
      this.popPoliticsVisible = false;
      this.politics = this.politicsVal;
      this.customerData.PoliticalStatus = this.politics[0];
    },
    onMaritalChange: function(picker, values) {
      picker.setSlotValues(1, typeResult[values[0]]);
      this.maritalVal = values;
    },
    openMaritalBox: function() {
      this.popMaritalVisible = true;
    },
    selectMaritalVal: function() {
      this.popMaritalVisible = false;
      this.marital = this.maritalVal;
      this.customerData.MaritalStatus = this.marital[0];
    },
    onNationChange: function(picker, values) {
      picker.setSlotValues(1, typeResult[values[0]]);
      this.nationVal = values;
    },
    openNationBox: function() {
      this.popNationVisible = true;
    },
    selectNationVal: function() {
      this.popNationVisible = false;
      this.nation = this.nationVal;
      this.customerData.Nation = this.nation[0];
    },
    onBankChange: function(picker, values) {
      picker.setSlotValues(1, typeResult[values[0]]);
      this.bankVal = values;
    },
    openBankBox: function() {
      this.popBankVisible = true;
    },
    selectBankVal: function() {
      this.popBankVisible = false;
      this.bank = this.bankVal;
      for (var i = 0; i < this.Banks.length; i++) {
        if (this.Banks[i].shortName == this.bank) {
          this.customerData.OpenBank = this.Banks[i].bankCode;
          break;
        }
      }
      console.log("OpenBankCode:" + this.customerData.OpenBank);
    },
    onTypesChange: function(picker, values) {
      //滑动证件类型
      picker.setSlotValues(1, typeResult[values[0]]);
      this.ownerIdTypeVal = values;
    },
    openTypeBox: function() {
      //打开证件类型选择层
      this.popTypeVisible = true;
    },
    selectTypeVal: function() {
      //选择证件类型
      this.popTypeVisible = false;
      this.ownerIdType = this.ownerIdTypeVal[1];
      this.customerData.IdentityType = this.Common.Public.cardTypeChange(
        this.ownerIdTypeVal[0],
        this.ownerIdTypeVal[1]
      )[1];
      console.log("IdentityType:" + this.customerData.IdentityType);
    },
    selOwnerBirthday: function() {
      // 打开日期层
      if (this.customerData.BirthDay) {
        this.ownerBirthday = new Date(this.customerData.BirthDay);
      }
      this.$refs.ownerBirthday.open();
    },
    ownerBirthConfirm: function(e) {
      // 选择日期
      this.customerData.BirthDay = this.Common.Public.dateString(this.ownerBirthday);
      $(".ownerBirthday").val(this.customerData.BirthDay);
      this.$refs.ownerBirthday.close();
    },
    openBack: function() {
      window.history.back();
    },
    commitReg: function() { //立即创建
      var self = this;
      if (self.hasIDPhoto) {
        if (!self.IdCardFront) {
          Toast('请添加身份证正面照片');
          return false
        }
        if (!self.IdCardContrary) {
          Toast('请添加身份证反面照片');
          return false
        }
        if (!self.BankCard) {
          Toast('请添加银行卡照片');
          return false
        }
      }

      if (self.hasPersonal) {
        if (!self.customerData.Name) {
          Toast('请填写姓名')
          return false
        }
        if (!self.customerData.IdentityType) {
          Toast('请选择证件类型');
          return false
        }
        if (!self.customerData.IdentityNo) {
          Toast('请输入证件号码');
          return false
        }

        //18位数身份证
        if (self.customerData.IdentityType == 'IdCard' && !verify.validate.IsIDCard(self.customerData.IdentityNo)) {
          Toast({
            message: '身份证号码不正确！',
            position: 'bottom',
            duration: 2000
          });
          return;
        }
        if (!self.customerData.BirthDay) {
          Toast('请选择出生日期');
          return false
        }
        if (!self.customerData.Gender) {
          Toast('请选择性别');
          return false
        }
        if (!self.customerData.Nation) {
          Toast('请选择民族');
          return false
        }
        if (!self.customerData.Mobile) {
          Toast('请输入手机号码');
          return false
        }
        var isMobile = /^((\+?86)|(\(\+86\)))?(19[0123456789][0-9]{8}|17[0123456789][0-9]{8}|13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/; //手机
        if (!(isMobile.test(self.customerData.Mobile))) {
          Toast({
            message: '手机号码不正确',
            position: 'bottom',
            duration: 2000
          });
          return;
        }
        // self.postData.personal = {};
        self.postData.personal.name = self.customerData.Name;
        self.postData.personal.gender = self.customerData.Gender;
        self.postData.personal.nation = self.customerData.Nation;
        self.postData.personal.identityType = self.customerData.IdentityType;
        self.postData.personal.identityNo = self.customerData.IdentityNo;
        self.postData.personal.birthDay = self.customerData.BirthDay;
        self.postData.personal.maritalStatus = self.customerData.MaritalStatus;
        self.postData.personal.politicalStatus = self.customerData.PoliticalStatus;
        self.postData.personal.educationLevel = self.customerData.EducationLevel;
        self.postData.personal.mobile = self.customerData.Mobile;
        // self.postData.personal.orgCode = sessionStorage.getItem('sellerOrgCode');
        // if (self.customerData.OrgCode) {
        self.postData.personal.orgCode = self.customerData.OrgCode;
        // }
        self.postData.personal.userId = self.customerData.UserId;
      }

      if (self.hasBankCard) {
        if (!self.customerData.OpenBank) {
          Toast('请选择银行');
          return false
        }
        if (!self.customerData.BankCardNo) {
          Toast('请输入银行卡号');
          return false
        }
        if (!self.customerData.OpenBranchBank) {
          Toast('请输入开户支行');
          return false
        }
        self.postData.bankCard.openBank = self.customerData.OpenBank;
        self.postData.bankCard.openBranchBank = self.customerData.OpenBranchBank;
        self.postData.bankCard.bankCardNo = self.customerData.BankCardNo;
      }

      if (self.customerData.ReferrerMobile) {
        self.postData.referrer.referrerMobile = self.customerData.ReferrerMobile;
      }
      self.postData.salesmanConfigId = self.salesmanConfigId;
      if (self.hasSignature) {
        if (!self.SignatureBase64) {
          Toast('您还没有签名哦，去签名吧');
          return false
        }
      }

      if (self.hasAgreements) {
        if (!self.checked) {
          Toast('注册前，请您仔细阅读相关协议');
          return false
        }
      }
      console.log(self.postData);
      Indicator.open('正在提交注册信息，请稍等...');
      if (self.hasIDPhoto || self.hasSignature) {
        if (self.hasIDPhoto) {
          var self = this;
          var obj = {};
          obj.dataURIString = self.IdCardFrontBase64;
          axiosPostAPI('/Documents?folderName=SalesmanApply', obj).then((res) => {
            console.log(res.result);
            if (res.result) {
              self.postData.idPhotoBase.idCardFrontMediaId = res.result.id;
              var obj = {};
              obj.dataURIString = self.IdCardContraryBase64;
              axiosPostAPI('/Documents?folderName=SalesmanApply', obj).then((res) => {
                console.log(res.result);
                if (res.result) {
                  self.postData.idPhotoBase.idCardContraryMediaId = res.result.id;
                  var obj = {};
                  obj.dataURIString = self.BankCardBase64;
                  axiosPostAPI('/Documents?folderName=SalesmanApply', obj).then((res) => {
                    console.log(res.result);
                    if (res.result) {
                      self.postData.idPhotoBase.bankCardMediaId = res.result.id;
                      if (self.hasSignature) {
                        var obj = {};
                        obj.dataURIString = self.SignatureBase64;
                        axiosPostAPI('/Documents?folderName=SalesmanApply', obj).then((res) => {
                          console.log(res.result);
                          if (res.result) {
                            self.postData.signature.signatureMediaId = res.result.id;
                            console.log(self.postData);
                            axiosPostAPI('/Salesmans', self.postData).then((res) => {
                              Indicator.close();
                              if (res.status == 200) {
                                Toast('提交成功, 请等待审核！');
                                self.title = sessionStorage.getItem('title');
                                self.appId = localStorage.getItem('appId');
                                self.$router.push({ path: '/success', query: { title: self.title, downloadUrl: '', appId: self.appId } })
                              }
                            })
                          }
                        });
                      } else {
                        console.log(self.postData);
                        axiosPostAPI('/Salesmans', self.postData).then((res) => {
                          Indicator.close();
                          if (res.status == 200) {
                            Toast('提交成功, 请等待审核！');
                            self.title = sessionStorage.getItem('title');
                            self.appId = localStorage.getItem('appId');
                            self.$router.push({ path: '/success', query: { title: self.title, downloadUrl: '', appId: self.appId } })
                          }
                        })
                      }
                    }
                  });
                }
              });
            }
          });
        } else {
          if (self.hasSignature) {
            var obj = {};
            obj.dataURIString = self.SignatureBase64;
            axiosPostAPI('/Documents?folderName=SalesmanApply', obj).then((res) => {
              console.log(res.result);
              if (res.result) {
                self.postData.signature.signatureMediaId = res.result.id;
                console.log(self.postData);
                axiosPostAPI('/Salesmans', self.postData).then((res) => {
                  Indicator.close();
                  if (res.status == 200) {
                    Toast('提交成功, 请等待审核！');
                    self.title = sessionStorage.getItem('title');
                    self.appId = localStorage.getItem('appId');
                    self.$router.push({ path: '/success', query: { title: self.title, downloadUrl: '', appId: self.appId } })
                  }
                })
              }
            });
          }
        }
      } else {
        axiosPostAPI('/Salesmans', self.postData).then((res) => {
          Indicator.close();
          if (res.status == 200) {
            Toast('提交成功, 请等待审核！');
            self.title = sessionStorage.getItem('title');
            self.appId = localStorage.getItem('appId');
            self.$router.push({ path: '/success', query: { title: self.title, downloadUrl: '', appId: self.appId } })
          }
        })
      }
    },
    GetBirthday: function() {
      var psidno = this.customerData.IdentityNo;
      var birthdayno, birthdaytemp
      if (psidno.length == 18) {
        birthdayno = psidno.substring(6, 14)
      } else if (psidno.length == 15) {
        birthdaytemp = psidno.substring(6, 12)
        birthdayno = "19" + birthdaytemp
      } else {
        this.customerData.BirthDay = '';
        this.customerData.Gender = '';
        return
      }
      this.ownerBirthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8)
      this.customerData.BirthDay = this.ownerBirthday;

      if (psidno) {
        var sexno, sex
        if (psidno.length == 18) {
          sexno = psidno.substring(16, 17)
        } else if (psidno.length == 15) {
          sexno = psidno.substring(14, 15)
        } else {
          alert("错误的身份证号码，请核对！")
          return
        }
        var tempid = sexno % 2;
        if (tempid == 0) {
          sex = '女'
        } else {
          sex = '男'
        }
        this.customerData.Gender = sex;
      }
    },
  }
}

</script>
<style>
.customer {
  background-color: #F5F5F5;
}

.customer .mint-cell-title {
  color: #000;
}

.customer .mint-region {
  background-color: #F5F5F5;
}

.customer .mint-region .mint-cell {
  min-height: 25px
}

.customer .tip {
  font-size: 14px;
  padding: 10px;
  color: #333;
  font-weight: bold;
  background-color: #FFF;
}

.boxClass {
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #F5F5F5;
  background-color: #FFF;
}

.canvasBox {
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
}

.btnBox {
  height: 30px;
  padding: 5px;
  text-align: right;
  line-height: 25px;
}

.btnBox button:first-of-type {
  border: 1px solid #F5F5F5;
  background: transparent;
  border-radius: 4px;
  padding: 5px 10px;
}

.btnBox button:last-of-type {
  border: 1px solid #F5F5F5;
  background: white;
  color: #666666;
  border-radius: 4px;
  padding: 5px 10px;
}

.parentWrap {
  overflow: hidden;
}

.parent {
  overflow: hidden;
  margin-right: -15px;
}

.regChild {
  float: left;
  height: 100px;
  width: calc(33% - 8px);
  margin-right: 8px;
}

.regChild1 {
  float: left;
  height: 20px;
  width: calc(33% - 5px);
  margin-right: 0px;
  margin-bottom: 5px;
  color: #666;
  font-size: 12px
}

.messagecc {
  height: 100%;
  width: 100%;
}

</style>
