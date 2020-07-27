<template>
  <div class="payMode" style="background-color:#FFF">
    <mt-header fixed class="def-header" title="选择支付方式">
      <div slot="left">
        <mt-button @click="openBack" icon="back"></mt-button>
      </div>
      <!-- <mt-button class="mint-head-close" icon="more" slot="right">关闭</mt-button> -->
    </mt-header>
    <div class="mint-wrap">
      <div class="order-info">
        <p class="mb5">您的订单编号: {{orderData.orderNo}}</p>
        <p class="mb5">您的订单金额为: </p>
        <em class="order-sum">￥{{orderData.payAmount}}</em>
      </div>
      <div class="mint-row-txt">付款人信息</div>
      <div class="mint-region">
        <mt-field class="mint-formItm" label="姓名" :disabled="true">
          <input class="mint-input" type="text" v-model="payer.name" v-verify="payer.name" placeholder="请输入姓名">
        </mt-field>
        <label class="mt-err-tip" v-remind="payer.name"></label>
        <mt-field class="mint-formItm" label="证件类型" type="text" :disabled="true">
          <span @click="openTypeBox"><input class="mint-input" v-model="ownerIdType" type="text" placeholder="请选择证件类型"><i class="ico-arrow"></i></span>
        </mt-field>
        <mt-popup v-model="popTypeVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="popTypeVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectTypeVal" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="typeSlots" @change="onTypesChange"></mt-picker>
        </mt-popup>
        <label class="mt-err-tip"></label>
        <mt-field class="mint-formItm" label="证件号" type="text" :disabled="true">
          <input class="mint-input" @keyup="ownerNoBirth" v-model="payer.idNo" v-verify="payer.idNo" type="text" placeholder="请输入证件号">
        </mt-field>
        <label class="mt-err-tip" v-remind="payer.idNo"></label>
        <!-- <mt-field class="mint-formItm last" label="手机号" type="number" :disabled="true">
		                <input class="mint-input" oninput="if(value.length>11)value=value.slice(0,11)" v-model="payer.phone" v-verify="payer.phone" type="number" placeholder="请输入手机号">
		            </mt-field>
		            <label class="mt-err-tip" v-remind="payer.phone"></label> -->
      </div>
      <div class="mint-row-txt">请选择支付方式 </div>
      <ul class="payer-method">
        <li @click="payMethodPost('Offline_Swipe')"><i class="ico-pay pos"></i>POS机刷卡支付</li>
        <li @click="payMethodPost('Online')"><i class="ico-pay code"></i>扫二维码支付</li>
      </ul>
    </div>
  </div>
</template>
<script>
var typeResult = {
  '个人': ['中华人民共和国身份证', '港澳居民来往内地通行证', '台胞证'],
  '企业单位': ['机构代码', '统一社会信用代码'],
  '机关单位': ['机构代码', '统一社会信用代码']
};
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import event from './../../common/event';
export default {
  name: 'payMode',
  data() {
    return {
      ownerIdType: '',
      popTypeVisible: false,
      order: { insBatchNo: "", insCorpCode: "", premium: "", shortName: "", plateNo: "" },
      payer: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
      orderData: { orderNo: "", payAmount: "" },
      typeSlots: [{ flex: 1, values: Object.keys(typeResult), className: 'slot1', textAlign: 'center' }, { divider: true, content: '-', className: 'slot2' }, { flex: 1, values: Object.values(typeResult)[0], className: 'slot3', textAlign: 'center' }]
    }
  },
  verify: {
    payer: {
      name: ['isRequired'],
      idNo: [{
        test: function(val) {
          if (val.length == 0) return false
          return true;
        },
        message: '请填写证件号'
      }, {
        test: function(val) {
          if (val.length != 0) return this.Verify.validate.checkIdCard(val, this.payer.idType, this.payer.relationType)
          return true;
        },
        message: '请正确填写证件号'
      }]
      // ,phone:['phone']
    }
  },
  methods: {
    openBack: function() { // 返回
      window.history.back();
    },
    ownerNoBirth: function(e) { // 证件号校验+通过证件号来判断性别 出生日期
      if (this.ownerIdType == '') { Toast('请选择证件类型'); return false; }
      const idNo = this.payer.idNo;
      if (e == false) {
        const $this = $(e.currentTarget).closest('.mint-field');
        this.Common.Public.judgeCarType($this, idNo, '', this.payer.idType, this.payer.relationType, '');
      }
    },
    onTypesChange(picker, values) { //滑动证件类型
      picker.setSlotValues(1, typeResult[values[0]]);
      this.ownerIdTypeVal = values;
    },
    openTypeBox: function() { //打开证件类型选择层
      this.popTypeVisible = true;
    },
    selectTypeVal: function() { //选择证件类型
      this.popTypeVisible = false;
      this.payer.idNo = '';
      this.ownerIdType = this.ownerIdTypeVal[0] + ' - ' + this.ownerIdTypeVal[1];
      this.payer.relationType = this.Common.Public.cardTypeChange(this.ownerIdTypeVal[0], this.ownerIdTypeVal[1])[0];
      this.payer.idType = this.Common.Public.cardTypeChange(this.ownerIdTypeVal[0], this.ownerIdTypeVal[1])[1];
    },
    payMethodPost: function(method) { // 支付
      var self = this,
        obj = {};
      if (self.payer.name == '') { Toast('请填写姓名'); return false; }
      if (self.$verify.check()) {
        if (self.ownerIdType == '') { Toast('请选择证件类型'); return false; }
        obj.paymentType = method;
        obj.insBatchNo = self.$route.query.insBatchNo; //批次编码
        obj.insCorpCode = self.$route.query.insCorpCode; //保险公司编码
        obj.orderNo = self.orderData.orderNo; //订单编码

        var param = {};

        self.url = '/vi/insurePolicies/' + self.$route.query.insBatchNo + '/' + self.$route.query.insCorpCode + '/orders/' + self.orderData.orderNo + '/payment';
        param.payer = self.payer;
        param.paymentType = method;
        Indicator.open('加载中...');
        axiosPostAPI(self.url, param).then((res) => {
          Indicator.close();
          if (res.result) {
            obj.content = res.result.content;
            obj.paymentType = res.result.paymentType;
            self.$router.push({ path: "/quoteManagement/payMethod", query: obj });
          }
        });
      }
    }
  },
  created: function() {
    var self = this;
    var url = '/vi/insurePolicies' + '/' + self.$route.query.insBatchNo + '/' + self.$route.query.insCorpCode + '/orders';
    axiosPostAPI(url).then((res) => {
      if (res.result) {
        self.orderData.orderNo = res.result.orderNo;
        self.orderData.payAmount = res.result.payAmount;
      }
    });
    var insureInfoApp = localStorage.getItem('insureInfoApp');
    if (insureInfoApp) {
      var results = JSON.parse(insureInfoApp);
      if (results.applicant != '') {
        self.payer.name = results.applicant.name
        self.payer.idNo = results.applicant.idNo
        self.payer.idType = results.applicant.idType
        self.payer.relationType = results.applicant.relationType
        self.ownerIdType = self.Common.Public.cardTypeChangeTxt(results.applicant.relationType, results.applicant.idType);
      } else {
        self.payer.name = results.car.owner.name
        self.payer.idNo = results.car.owner.idNo
        self.payer.idType = results.car.owner.idType
        self.payer.relationType = results.car.owner.relationType
        self.ownerIdType = self.Common.Public.cardTypeChangeTxt(results.car.owner.relationType, results.car.owner.idType);
      }
    }
  }
}

</script>
<style scoped>
.payMode .order-info {
  padding: 18px 4%;
  color: #999;
}

.payMode .order-info .order-sum {
  font-size: 16px;
  font-style: normal;
  color: #fc3738;
}

.payMode .payer-method li {
  padding: 15px 4%;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: #333;
}

.payMode .payer-method .ico-pay {
  display: inline-block;
  position: relative;
  top: 5px;
  width: 22px;
  height: 22px;
  margin-right: 8px;
  background-size: 22px 22px;
  background-repeat: no-repeat;
}

.payMode .payer-method .ico-pay.pos {
  background-image: url(../../assets/images/ico-pos.png);
}

.payMode .payer-method .ico-pay.code {
  background-image: url(../../assets/images/ico-code.png);
}

</style>
