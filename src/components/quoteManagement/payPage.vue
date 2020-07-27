<template>
  <div class="orders" style="background-color:#FFF">
    <mt-header fixed class="def-header" title="确认订单">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="mint-content mint-region ordercontent">
      <!-- <p class="orderTime order-title">下单时间：2018-2-2-2-2</p> -->
      <div class="orderStatus">
        <div class="lf">
          订单状态：<span>待缴费</span>
        </div>
        <div class=rt>
          订单金额(元):<span class="money">￥{{order.premium}}</span>
        </div>
      </div>
      <div class="order-detail">
        <p class="order-title order-titles">保单详情</p>
        <table class="table" cellspacing="0" style="word-wrap:break-word;">
          <tbody>
            <tr>
              <td>承保险企</td>
              <td>投保人</td>
              <td>险种</td>
              <td>保费金额(元)</td>
            </tr>
            <tr>
              <td>{{order.insCorpName}}</td>
              <td>{{order.name}}</td>
              <td>{{order.riskName}}</td>
              <td>￥{{order.premium}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mint-region">
        <p class="order-title order-titles">付款人信息</p>
        <mt-field class="mint-formItm" label="姓名" type="text" :disabled="true">
          <input class="mint-input" type="text" placeholder="请输入姓名" v-model="order.name">
        </mt-field>
        <mt-field class="mint-formItm" label="证件类型" type="text" :disabled="true">
          <span @click="openApplicantTypeVis"><input class="mint-input" readonly="readonly" v-model="applicantIdType" type="text" placeholder="请选择证件类型"><i class="ico-arrow"></i></span>
        </mt-field>
        <mt-field class="mint-formItm" label="证件号" type="text" :disabled="true">
          <input class="mint-input" type="text" placeholder="请输入证件号" v-model="order.idNo">
        </mt-field>
        <mt-popup v-model="applicantTypeVis" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="applicantTypeVis=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selApplicantType" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="typeSlots" @change="changeApplicantTypes"></mt-picker>
        </mt-popup>
      </div>
      <mt-button class="btn-fixed" type="primary" size="large" @click="goPay">支付订单</mt-button>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
    <mt-actionsheet :actions="paysArr" v-model="pays">
    </mt-actionsheet>
    <van-dialog v-model="shows" show-cancel-button :before-close="beforeClose" :overlay='overlay' :close-on-click-overlay='overlay' :show-confirm-button='btn' :showCancelButton='btn'>
      <div class="dialogs">
        <p class="title">
          <span v-show="!ecodeAndPos">{{payType}}</span> <span v-show="ecodeAndPos">POS机支付</span>
        </p>
          <div style="margin:10px 0">
             <span style="display: flex;align-items: center;">
                <img style="height:30px" :src="insImg" alt="">
                <p style="font-size:14px">{{order.insCorpName}} </p>
            </span>
             <span style="color: #B1B9CE;line-height: 22px;">订单号：{{orderNo}}</span>
            <table class="mint-table" style="margin-bottom:0;border:0">
              <tr>
                <th>投保人</th>
                <th>保费金额(元)</th>
                <!-- <th>承保险企</th> -->
                <th> 车牌号</th>
              </tr>
              <tr>
                  <td>{{order.name}}</td>
                  <td>{{order.premium}}</td>
                  <td> {{plateNo}}</td>
               </tr>
            </table>
            <!-- <p> 投保人：{{order.name}}</p> 
            <p>保费金额(元)：{{order.premium}}</p>
            <p>承保险企：{{order.insCorpName}}</p> -->
          </div>
        <div class="diaContent">
          <div class="ecode" v-show="!ecodeAndPos">
            
            <p class="tip">您选择通过 {{payType}} 保费:</p>
            <div class="imgcontent" v-show="ecoded.ecodeImg">
              <img :src="ecoded.ecodeImg" alt="">
            </div>
            <div v-show="ecoded.ecodeStr" style="color:red;font-size: 13px;">
              <span >{{ecoded.ecodeStr}}</span>
            </div>
            <div class="tip">
              <van-icon name="info-o" /><span class="">付款完成后可点击完成支付按钮，检查支付状态。</span>
            </div>
          </div>
          <div class="pos" v-show="ecodeAndPos">
            <p class="tip">您选择通过 POS刷卡支付 保费:</p>
            <div class="pos-content">
              <div class="tit">
                <p>缴费编号：</p>
                <span>{{pos.content}}</span>
              </div>
              <div class="tit" v-show="pos.yanz">
                <p>校验码：</p>
                <span>{{pos.yanz}}</span>
              </div>
            </div>
            <div class="tip">
              <van-icon name="info-o" /><span class="">付款完成后可点击完成支付按钮，检查支付状态。</span>
              </div>

          </div>
          <div class="btns-hao">
            <span @click="changes" style="font-size:14px">更换支付方式</span>
            <mt-button type="primary" @click="openBack" size="large" style="font-size:12px;height:30px;width:85px">完成支付</mt-button>
          </div>
        </div>
      </div>
    </van-dialog>
    <van-dialog v-model="showsVerificationCode" show-cancel-button :before-close="beforeClose" :overlay='overlay' :close-on-click-overlay='overlay' :show-confirm-button='btn' :showCancelButton='btn'>
      <div class="dialogs">
        <p class="title"><span>短信验证</span></p>
        <div class="diaContent">
          <div style="margin-top:15px">
            <p style="color:red;font-weight:bold;font-size:13px">保险公司要求在缴费前检验投保人手机号</p>
            <p style="color:red;font-size:13px">点击【获取验证码】后，保险公司会将验证码以短信形式发送到下面的手机号上，收到验证码之后，将验证码填入到下面相应的输入框中，并点击【确定】进行支付</p>
            <mt-field label="手机号" class="mint-formItm" :disabled="true" oninput="if(value.length>11)value=value.slice(0,11)" v-model="phone" type="number" placeholder="请输入手机号">
            </mt-field>
            <mt-field label="验证码" placeholder="请输入验证码" type="text" v-model="verificationCode">
              <div>
                <mt-button @click="getVerificationCode" v-show="showTimer" style="width: 85px;height: 30px;font-size: 12px;" type="primary">获取验证码</mt-button>
                <mt-button v-show="!showTimer" style="width: 85px;height: 30px;font-size: 12px;color:#333" disabled>{{count}}秒</mt-button>
              </div>
            </mt-field>
          </div>
          <div class="btns-hao" style="margin-top:30px">
            <span @click="cancel" style="font-size:14px">取消</span>
            <mt-button type="primary" @click="checkVerificationCode" size="large" style="font-size:12px;height:30px;width:85px">确定</mt-button>
          </div>
        </div>
      </div>
    </van-dialog>
    <van-dialog v-model="showsSMSlink" show-cancel-button :before-close="beforeClose" :overlay='overlay' :close-on-click-overlay='overlay' :show-confirm-button='btn' :showCancelButton='btn'>
      <div class="dialogs">
        <p class="title"><span>发送电子投保单</span></p>
        <div class="diaContent">
          <div style="margin-top:15px">
            <p style="color:red;font-weight:bold;font-size:13px">未签电子投保单不允许缴费</p>
            <p style="color:red;font-size:13px">点击【确认】后，将以短信形式发送到下面的手机号上，客户签署电子投保单完成之后，重新点击【支付订单】按钮</p>
            <mt-field label="手机号" class="mint-formItm" :disabled="true" oninput="if(value.length>11)value=value.slice(0,11)" v-model="phone" type="number" placeholder="请输入手机号"></mt-field>
          </div>
          <div class="btns-hao" style="margin-top:30px">
            <span @click="cancel" style="font-size:14px">取消</span>
            <mt-button type="primary" @click="sendApplicationPolicy" size="large" style="font-size:12px;height:30px;width:85px">确定</mt-button>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
var typeResult = {
    '个人': ['中华人民共和国身份证', '港澳居民来往内地通行证', '台胞证'],
    '企业单位': ['机构代码', '统一社会信用代码'],
    '机关单位': ['机构代码', '统一社会信用代码']
  },
  arro = ["51", "52", "53", "59", "11", "13", "19"],
  arre = ["91", "92", "93"];
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Loading } from 'vant';
import { Dialog } from 'vant';
import * as types from './../../store/types';
import { axiosGetAPI, axiosPostAPI, axiosDeleteAPI } from './../../common/Axios';
const TIME_COUNT = 60;
export default {
  data() {
    return {
      actions: [],
      sheetVisible: false,
      pays: false,
      paysArr: [],
      val: '',
      shows: false, //show
      overlay: true,
      btn: false,
      ecodes: false,
      Pass: false,
      order: {
        // orderTime:'',
        orderStatus: '',
        orderPrice: '',
        insCorpName: '',
        riskName: '',
        premium: '',
        idNo: '',
        idType: '',
        relationType: '',
        name: '',
        money: ''
      },
      ecodeAndPos: true,
      pos: {
        content: '',
        yanz: ''
      },
      ecoded: {
        ecodeStr: '',
        ecodeImg: ''
      },
      payTypes: {
        client: '', //支付客户端（POSMachine：POS机、SMSLinkPay：短信支付、WebLinkPay：网页支付、WeChatPay：微信支付）",
        content: '', //对应支付客户端的支付内容\r\n（POSMachine：缴费编码-验证码；SMSLinkPay：固定的文字说明；WebLinkPay：经过Base64编码后的支付二维码，可使用手机扫描并在网页中支付；WeChatPay：经过Base64编码后的微信支付二维码，仅可使用微信扫一扫进行支付）",
        paymentType: '' //Online
      },
      applicantTypeVis: false,
      typeSlots: [{ flex: 1, values: Object.keys(typeResult), className: 'slot1', textAlign: 'center' }, { divider: true, content: '-', className: 'slot2' }, { flex: 1, values: Object.values(typeResult)[0], className: 'slot3', textAlign: 'center' }],
      applicantIdTypeVal: '',
      applicantIdType: '',
      showsVerificationCode: false,
      phone: "",
      verificationCode: "",
      showsSMSlink: false,
      types: "",
      showTimer: true,
      count: '',
      timer: null,
      payType:'二维码支付',
      insImg:'',
      plateNo:'',
      orderNo:''
    }
  },
  created() {
    var insCorpCode =  this.$route.query.insCorpCode;
    this.insImg = require(`@/assets/images/companys/${insCorpCode}.png`)
    this.order.riskName = this.$route.query.riskName
    this.order.insCorpName = this.$route.query.insCorpName
    this.order.premium = this.$route.query.premium
    this.orderNo = this.$route.query.orderNo;
    this.order.orderStatus = this.$route.query.insureStatus
    this.order.name = this.$route.query.name
    this.order.idNo = this.$route.query.idNo
    this.order.idType = this.$route.query.idType
    this.order.relationType = this.$route.query.relationType
    this.applicantIdType = this.Common.Public.cardTypeChangeTxt(this.order.relationType, this.order.idType);
    this.phone = this.$route.query.applicantPhone;
    this.plateNo = this.$route.query.plateNo
    //var num = '4419181121901889-111';

  },
  methods: {
    openBack() {
      window.history.go(-1);
    },
    openApplicantTypeVis: function() { //打开投保人证件类型选择层
      this.applicantTypeVis = true;
    },
    changeApplicantTypes(picker, values) { //滑动投保人证件类型
      picker.setSlotValues(1, typeResult[values[0]]);
      this.applicantIdTypeVal = values;
    },
    selApplicantType: function() { //选择投保人证件类型
      this.applicantTypeVis = false;
      this.order.idNo = '';
      this.applicantIdType = this.applicantIdTypeVal[0] + ' - ' + this.applicantIdTypeVal[1];
      this.order.relationType = this.Common.Public.cardTypeChange(this.applicantIdTypeVal[0], this.applicantIdTypeVal[1])[0];
      this.order.idType = this.Common.Public.cardTypeChange(this.applicantIdTypeVal[0], this.applicantIdTypeVal[1])[1];
    },
    actionsheet() {
      this.sheetVisible = !this.sheetVisible;
      var me = this;
      this.actions = [{
          name: '中华人民共和国身份证',
          method: function() {
            //ms.asd('JQX');
            me.val = '中华人民共和国身份证';

          }
        },
        {
          name: '港澳居民来往内地通行证',
          method: function() {
            //ms.asd('SYX');
            me.val = '港澳居民来往内地通行证';
          }
        },
        {
          name: '台胞证',
          method: function() {
            //ms.asd('SYX');
            me.val = '台胞证';
          }
        }
      ]
    },
    goPay: function() {

      // 获取支付信息
      Indicator.open('正在获取支付信息...');
      axiosGetAPI('/vi/insurePolicies/' + this.$route.query.insBatchNo + '/' + this.$route.query.insCorpCode + '/orders/' + this.$route.query.orderNo + '/payment').then((data) => {
        Indicator.close();
        if (data.status == 200) {
          if (data.result) {
            this.parsePayResult(data);
          } else {
            this.pays = !this.pays;
            var me = this;
            if (this.$route.query.insCorpCode == 'picc') {
              this.paysArr = [{
                  name: 'POS刷卡支付',
                  method: function() {
                    me.getMetods('POS')
                  }
                },
                {
                  name: '微信支付',
                  method: function() {
                    me.getMetods('WeChatPay')
                  }
                },
                {
                  name: '支付宝支付',
                  method: function() {
                    me.getMetods('AliPay')
                  }
                }
              ]
            } else{
              this.paysArr = [{
                  name: 'POS刷卡支付',
                  method: function() {
                    me.getMetods('POS')
                  }
                },
                {
                  name: '在线支付',
                  method: function() {
                    me.getMetods('Online')
                  }
                }
              ]
            }
            
          };

        }
      });
    },
    getMetods(types) {
      var ms = this;
      Indicator.open('正在检查订单信息...');
      this.types = types;
      this.checkPay(types);
      /*axiosPostAPI('/vi/insurePolicies/' + this.$route.query.insBatchNo + '/' + this.$route.query.insCorpCode + '/orders/' + this.$route.query.orderNo + '/payment', {
        "paymentType": types,
        "payer": {
          "idType": ms.order.idType,
          "relationType": ms.order.relationType,
          "birthday": '',
          "gender": '',
          "name": ms.order.name,
          "phone": '',
          "idNo": ms.order.idNo,
        }
      }).then((data) => {
        Indicator.close();
        if (data.status == 200) {
          //window.history.back();
          //pos
          this.parsePayResult(data);
        }
      });*/
    },
    beforeClose() {},
    parsePayResult: function(data) {
      var ms = this;
      if (data.result) {
        ms.payTypes = data.result;
        var content = ms.payTypes.content;
        if (content) {
          if (ms.payTypes.paymentType == 'POS') {
            ms.shows = !ms.shows
            ms.ecodeAndPos = true;
            if (content.indexOf('-') < 0) {
              ms.pos.content = content;
            } else {
              ms.pos.content = content.substring(0, content.indexOf('-'));
              ms.pos.yanz = content.substring(content.indexOf('-') + 1, content.length);
            };
          } else {
            ms.shows = !ms.shows
            ms.ecodeAndPos = false;
            if (ms.payTypes.client == 'SMSLinkPay') {
              //短信支付
              ms.ecoded.ecodeStr = content;
              ms.payType = '短信支付';
            } else if (ms.payTypes.client == 'WebLinkPay' || ms.payTypes.client == 'WeChatPay' || ms.payTypes.client == 'AliPay') {
              //网页/微信支付
              if (ms.payTypes.client == 'WeChatPay') {
                ms.payType = '微信支付';
              } else if (ms.payTypes.client == 'AliPay') {
                ms.payType = '支付宝支付';
              }
              
              ms.ecoded.ecodeImg = 'data:image/png;base64,' + content;
            };
          }
        }
      };
    },
    changes: function() {
      var me = this;
      var url = '/vi/insurePolicies/' + me.$route.query.insBatchNo + '/' + me.$route.query.insCorpCode + '/orders/' +
        me.$route.query.orderNo + '/payment'
      Dialog.confirm({
        title: '提示',
        message: '是否更改支付方式'
      }).then(() => {
        axiosDeleteAPI(url).then((res) => {
          //self.uwResultShow(res.result);
          me.shows = !me.shows;
          me.goPay();
        });
      }).catch(() => {
        // on cancel
      });
    },
    checkPay: function(types) {
      var me = this;
      var url = '/vi/insurePolicies/' + me.$route.query.insBatchNo + '/' + me.$route.query.insCorpCode + '/orders/' +
        me.$route.query.orderNo + '/prepayment';
      Indicator.open('正在生成支付信息...');
      axiosPostAPI(url, {
        "paymentType": types=='WeChatPay' || types=='AliPay' ? "Online" : types,
        "paymentClientType":types=='WeChatPay' || types=='AliPay' ? types : null,
        "payer": {
          "idType": me.order.idType,
          "relationType": me.order.relationType,
          "birthday": '',
          "gender": '',
          "name": me.order.name,
          "phone": '',
          "idNo": me.order.idNo,
        }
      }).then((data) => {
        Indicator.close();
        if (data.status == 200) {
          // 1. 检查成功 Success;2.验证码确认 VerificationCode;3.短信链接确认 SMSLink;4.人员信息采集 PersonnelInformationCollection;5.未知问题 Unknown
          var status = data.result;
          if (status == 'Success') {
            //生成支付信息
            Indicator.open('加载中...');
            axiosPostAPI('/vi/insurePolicies/' + me.$route.query.insBatchNo + '/' + me.$route.query.insCorpCode + '/orders/' + me.$route.query.orderNo + '/payment', {
              "paymentType": me.types,
              "paymentType": me.types=='WeChatPay' || me.types=='AliPay' ? "Online" : me.types,
              "paymentClientType": me.types=='WeChatPay' || me.types=='AliPay' ? me.types : null,
              "payer": {
                "idType": me.order.idType,
                "relationType": me.order.relationType,
                "birthday": '',
                "gender": '',
                "name": me.order.name,
                "phone": '',
                "idNo": me.order.idNo,
              }
            }).then((data) => {
              Indicator.close();
              if (data.status == 200) {
                //window.history.back();
                //pos
                me.parsePayResult(data);
              }
            });
          } else if (status == 'VerificationCode') {
            //发送投保验证码
            me.showsVerificationCode = true;
          } else if (status == 'SMSLink') {
            //发送投保确认单
            me.showsSMSlink = true;
          } else if (status == 'PersonnelInformationCollection') {

          } else if (status == 'Unknown') {

          }
        }
      });
    },
    cancel: function() {
      this.showsVerificationCode = false;
      this.showsSMSlink = false;
    },
    getVerificationCode: function() {
      if (this.showTimer) {
        var url = '/vi/insurePolicies/' + this.$route.query.insBatchNo + '/' + this.$route.query.insCorpCode + '/orders/' + this.$route.query.orderNo + '/verificationcode';
        axiosGetAPI(url).then((data) => {
          Indicator.close();
          if (data.status == 200) {
            Toast({
              message: '验证码已获取，请留意手机短信',
              position: 'bottom',
              duration: 3000
            });
          }
        });
      }
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
    checkVerificationCode: function() {
      var me = this;
      if (me.verificationCode == null || me.verificationCode == '') {
        Toast({
          message: '请输入有效的验证码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };

      var url = '/vi/insurePolicies/' + this.$route.query.insBatchNo + '/' + this.$route.query.insCorpCode + '/orders/' + this.$route.query.orderNo + '/verificationcode?code=' + me.verificationCode;
      axiosPostAPI(url).then((data) => {
        Indicator.close();
        if (data.status == 200) {
          me.showsVerificationCode = false;
          me.checkPay(me.types);
        }
      });
    },
    sendApplicationPolicy: function() {
      var me = this;
      var url = '/vi/insurePolicies/' + this.$route.query.insBatchNo + '/' + this.$route.query.insCorpCode + '/orders/' + this.$route.query.orderNo + '/eApplicationPolicy';
      axiosPostAPI(url).then((data) => {
        Indicator.close();
        if (data.status == 200) {
          me.showsSMSlink = false;
          Toast({
            message: '投保确认单已发送，请留意手机短信',
            position: 'bottom',
            duration: 3000
          });
        }
      });
    }
  }
}

</script>
<style scoped>
.ordercontent {
  margin-top: 20px;
  padding-bottom: 50px
}

.table {
  border: 1px solid #E0E0E0;
  width: 100%;
  text-align: center;
  border-bottom: none;
  border-right: none
}

.table tr:first-child {
  background: #F5F5F5;
}

.table tr td {
  border-right: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  padding: 8px
}

.mint-region .mint-cell {
  padding-left: 0;
}

.order-title {
  color: #666666
}

.order-titles {
  padding: 20px 0 10px 0
}

.orders .orderTime {
  padding: 10px 0
}

.orders .orderStatus {
  overflow: hidden;
}

.orders .orderStatus .lf {
  float: left;
}

.orders .orderStatus .rt {
  float: right;
}

.orders .orderStatus span {
  color: #40AD39
}

.orders .orderStatus .money {
  color: #D64A5A
}

.dialogs .title {
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
  padding: 10px 0;
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
  align-items: center;
}

.btns-hao span {
  flex: 1;
  color: #f94037;
  line-height: 40px;
}

.mint-table th, .mint-table td{
  border: 0;
}
/* .btns-hao button {
  flex: 1
} */

</style>
