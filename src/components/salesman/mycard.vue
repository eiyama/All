<template>
  <div>
    <mt-header fixed class="def-header cust-head" title="我的银行卡">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right" v-show="!hasData">
        <van-icon name="plus" @click="addCard"></van-icon>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:5px;padding-bottom:10px">
      <div class="my-bankcard" v-for="item in bankCards" v-show="hasData">
        <div class="my-bankcardTitle">
          <div style="width: 65%;">
            <h3>{{item.cardName}} - {{item.cardTypeName}}</h3>
          </div>
          <img :src="deleteImg" style="width:24px;height:24px;" @click="deleteBank(item)">
        </div>
        <div class="bzBox" v-show='item.subBankName'>
          <h3>开户银行：</h3>
          <p>{{item.bankName}}</p>
        </div>
        <div class="bzBox" v-show='item.subBankName'>
          <h3>开户支行：</h3>
          <p>{{item.subBankName}}</p>
        </div>
        <div class="bzBox" v-show='item.cardNo'>
          <h3>卡号：</h3>
          <p>{{item.cardNo}}</p>
        </div>
      </div>
      <div style="color:red;font-size: 14px;padding: 20px;" v-show="hasData">
        <p>温馨提示：</p>
        <p>仅支持绑定一张储蓄卡，如需更换银行卡，请先解绑此卡，再重新绑定新卡</p>
      </div>
      <div v-show="!hasData">
        <div class="cardTitle">
          <p>您还没有添加银行卡哦，</p>
          <p>赶快添加一张银行卡，您的收入才有了归宿</p>
        </div>
        <div class="addCard" @click="addCard">
          <van-icon name="plus" color="#5399FB" />
          <p style="margin-left: 5px;color:#5399FB;border-radius:8px">立即添加</p>
        </div>
        <div style="color:red;font-size: 14px;padding: 20px;margin-top:10px">
          <p>温馨提示：</p>
          <p>1. 一个账户仅支持绑定一张储蓄卡；</p>
          <p>2. 您的收入结算后将转入您绑定的储蓄卡</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI, axiosDeleteAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import router from './../../router';
import echarts from "echarts";
import store from './../../store/store';
import { Dialog } from 'vant';
export default {
  data() {
    return {
      bankCards: [{
        "id": "",
        "orgName": "",
        "cardTypeName": "",
        "cardName": "",
        "bankCode": "",
        "bankName": "",
        "cityName": "",
        "subBankName": "",
        "cardNo": "",
        "isDefault": ""
      }],
      hasData: false,
      deleteImg: (this.src = require("../../assets/images/ic-delete.png")),
    }
  },
  created: function() {
   
    this.loadData();
  },
  mounted() {

  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  methods: {
    loadData: function() {
       Indicator.open('加载中...');
      axiosGetAPI('/agencyBandCards/my').then(res => {
        Indicator.close();
        if (res.result && res.result.length > 0) {
          this.bankCards = res.result;
          this.hasData = true;
        } else {
          this.hasData = false;
        }
      });
    },
    openBack: function() {
      window.history.back();
    },
    addCard() {
      this.$router.push({ path: 'addCard' });
    },
    deleteBank: function(item) {
      Dialog.confirm({
        title: '',
        message: '亲，您确定要解绑(' + item.cardNo + ')这张银行卡吗'
      }).then(() => {
        Indicator.open('正在解绑银行卡，请稍等...');
        axiosDeleteAPI('/agencyBandCards/' + item.id).then((res) => {
          Indicator.close();
          if (res.status == 200) {
            Toast('解绑成功');
            this.loadData();
          }
        });
      }).catch(() => {});

    }
  }
}

</script>
<style scoped>
.cardTitle {
  text-align: center;
  color: #999;
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

.my-bankcard {
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
  background-color: #FFF
}

.my-bankcardTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.my-bankcardTitle h3 {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.my-bankcardTitle p {
  font-size: 14px;
  color: #333;
}

.bzBox {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bzBox h3 {
  font-size: 14px;
  color: #666;
  font-weight: normal;
}

.bzBox p {
  font-size: 14px;
  color: #666;
  font-weight: normal;
}

</style>
