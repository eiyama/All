<template>
  <div>
    <mt-header fixed class="def-header cust-head" title="添加银行卡">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top: 5px;">
      <div style="margin:10px;">
        <p style="color:red;font-size:14px;padding-left:15px;border-radius:8px 8px 0px 0px;background-color:#FFF;line-height:40px">* 请绑定持卡人本人的银行卡</p>
        <van-cell-group class="field-border">
          <van-field v-model="postData.cardName" clearable label="账户名称" placeholder="请填写账户名称" style="color:#333;font-size:14px" />
        </van-cell-group>
        <van-cell-group class="field-border" style="color:#333;font-size:14px">
          <van-field :value="bankValue" placeholder="请选择开户银行" label="开户银行" readonly="readonly" @click="openBank = true" right-icon="arrow" />
        </van-cell-group>
        <van-cell-group class="field-border">
          <van-field v-model="postData.cardNo" clearable label="银行卡号" right-icon="credit-pay" @click-right-icon="showOccre" placeholder="请填写银行卡号" style="color:#333;font-size:14px" />
        </van-cell-group>
        <van-popup v-model="openBank" position="bottom">
          <van-picker show-toolbar :columns="bankName" @cancel="openBank = false" @confirm="onBankconfirm" />
        </van-popup>
        <van-cell-group class="field-border">
          <van-field v-model="postData.subBankName" clearable label="开户支行" placeholder="请填写开户支行" style="color:#333;font-size:14px" />
        </van-cell-group>
        <!-- <van-cell-group class="field-border" style="border-radius:0px 0px 8px 8px;">
          <van-field :value="finishValue" placeholder="请选择有效期" label="有效期" readonly="readonly" @click="finishTimeStatus = true" right-icon="arrow" style="color:#333;font-size:14px" />
        </van-cell-group> -->
        <van-popup v-model="finishTimeStatus" position="bottom">
          <van-datetime-picker type="date" v-model="finishTimeDate" show-toolbar @cancel="finishTimeStatus = false" @confirm="onfinishTime" />
        </van-popup>
        <van-popup v-model="isOccre" position="bottom">
          <ScanOcrFile scanType='BankCard' scanTitle="银行卡号识别" v-on:getOcrresult="getOcrresult" v-on:closeOcr="closeOcr"></ScanOcrFile>
        </van-popup>
      </div>
      <div class="confirmBtn" size='large' @click="nextStep" type="info">
        保存
      </div>
    </div>
  </div>
</template>
<script>
import {
  axiosGetAPI,
  axiosPostAPI
} from './../../common/Axios';
import {
  Indicator,
  Toast
} from 'mint-ui';
import router from './../../router';
import echarts from "echarts";
import store from './../../store/store';
import ScanOcrFile from './../quoteManagement/ScanOcrFile';
export default {
  data() {
    return {
      salesmanId: '',
      cardCode: '',
      cardNo: '',
      openBank: false,
      bankName: [],
      bankValue: '',
      finishValue: '',
      finishTimeDate: new Date(),
      finishTimeStatus: false,
      isOccre: false,
      Ocrresult: [],
      postData: {
        "cardName": "",
        "bankCode": "",
        "cityCode": "",
        "subBankName": "",
        "cardNo": "",
        "expiryDate": ""
      },
      Banks: [],
    }
  },
  created: function() {
    axiosGetAPI('/Banks').then((res) => {
      if (res.status == 200 && res.result) {
        this.Banks = res.result;
        this.bankName = [];
        for (var i = 0; i < this.Banks.length; i++) {
          this.bankName.push(this.Banks[i].shortName);
        }
      }
    });
  },
  mounted() {},
  components: {
    ScanOcrFile,
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    onBankconfirm(value) {
      this.bankValue = value;
      this.postData.bankName = value;
      for (var i = 0; i < this.Banks.length; i++) {
        if (this.Banks[i].shortName == value) {
          this.postData.bankCode = this.Banks[i].bankCode;
        }
      }
      this.openBank = false
    },
    onfinishTime(value) {
      this.finishTimeStatus = false;
      this.finishValue = this.Common.Public.dateString(value);
      this.postData.expiryDate = this.finishValue;
    },
    nextStep() {
      if (!this.postData.cardName) {
        Toast('请填写账户名称');
        return false;
      }
      if (!this.postData.bankName) {
        Toast('请选择开户银行');
        return false;
      }
      if (!this.postData.cardNo) {
        Toast('请填写银行卡号');
        return false;
      }
      if (!this.postData.subBankName) {
        Toast('请填写开户支行');
        return false;
      }
      console.log(this.postData);
      Indicator.open('正在添加银行卡，请稍等...');
      axiosPostAPI('/agencyBandCards', this.postData).then((res) => {
        Indicator.close();
        if (res.status == 200) {
          Toast('添加成功');
          window.history.back();
        }
      });

    },
    showOccre() {
      this.isOccre = true;
    },
    getOcrresult(Ocrresult) {
      this.isOccre = false;
      if (Ocrresult.cardNo) {
        this.cardNo = Ocrresult.cardNo;
        this.postData.cardNo = this.cardNo;
      }
    },
    closeOcr() {
      this.isOccre = false
    }
  }
}

</script>
<style scoped>
.cardTitle {
  text-align: center;
  color: #999999;
  font-size: 14px;
  padding: 45px;
}

.addCard {
  margin: 0 20px;
  background: #fff;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.field-border {
  border-bottom: 0px solid #eee
}

.confirmBtn {
  background: rgba(10, 87, 236, 1);
  font-size: 16px;
  color: #FFFFFF;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  margin: 50px 10px;
}

</style>
