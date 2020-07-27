<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="费用结算">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;background: #fff;">
      <div class="displayAmount">
        <p>本次结算金额为：</p>
        <h3>{{allAmount}}元</h3>
        <div v-show="Adjusts.adjustFeeAmount > 0">
          <span style="display: flex;align-items: center">
            <p style="margin-right: 10px;">上期结算“冲红”</p>
            <van-icon @click="hintMessageshow = true " name="question-o" />
          </span>
          <van-dialog v-model="hintMessageshow">
            <div class="popupBox">
              <p style="color:#333333;">冲红指上期结算完成后，费用由于保险公司政策调整而更新，从而产生差额，正数表示费用增加，负数表示费用减少。如仍有疑问，请联系客服。</p>
            </div>
          </van-dialog>
          <span style="display: flex;align-items: center;">
            <p style="color: #2DC657;margin: 0;font-size: 18px;">{{Adjusts.adjustFeeAmount}}</p>元
          </span>
        </div>
      </div>
      <div class="endAmount">
        <p>最终实际到账款项:</p>
        <span style="display: flex;align-items: baseline;">
          <p style="color:#333333;font-size: 24px;">{{allAmount}}</p>
          <p>元</p>
        </span>
      </div>
    </div>
    <div class="confirmBtn" size='large' @click="confirm" type="info">
      确定结算
    </div>
    <!-- <p style="color: #999999;margin-left: 15px;">最终结算金额将由{邦德车险}转入您绑定的银行卡</p> -->
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui';
import {
  axiosGetAPI,
  axiosPostAPI,
  axiosPutAPI
} from './../../common/Axios';
import VueEvent from './../../common/event'
import {
  Indicator
} from 'mint-ui';
import router from './../../router';
import store from './../../store/store';
import { dialog } from 'vant';
export default {
  data() {
    return {
      settleFeeIds: [],
      allAmount: 0,
      salesmanId: '',
      Adjusts: 0,
      hintMessageshow: false,
      feeType: '',
      allId: [],
      hasData:false,
      isEnabledAuth:false,
      authStatus:'',
      hasCertification:true,
    }
  },
  created: function() {
     if(sessionStorage.getItem('hasCertification')){
        this.hasCertification = sessionStorage.getItem('hasCertification');
    }
    if (sessionStorage.getItem('salesmanId')) {
      this.salesmanId = sessionStorage.getItem('salesmanId');
    }
    if (sessionStorage.getItem('authStatus')) {
      this.authStatus = sessionStorage.getItem('authStatus');
    }

     if (sessionStorage.getItem('isEnabledAuth')) {
      this.isEnabledAuth = sessionStorage.getItem('isEnabledAuth');
    }

    if (sessionStorage.getItem('settleFeeIds')) {
      this.settleFeeIds = JSON.parse(sessionStorage.getItem('settleFeeIds'));
    };
    this.settleFeeIds.map(item => {
      item.amount *= 1;
      this.allAmount += item.amount;
      this.allId.push(item.id);
      this.feeType = item.feeType;
    });
    var url = 'Salesmans/Adjusts/' + this.salesmanId + '/' + this.feeType + '/Summary';
    Indicator.open('加载中...');
    axiosGetAPI(url).then(res => {
      if (res.result) {
        Indicator.close();
        this.Adjusts = res.result;
      }
    });
    this.loadData();
  },
  mounted: function() {
    this.allAmount += this.Adjusts;
    this.allAmount = this.allAmount.toFixed(2)
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
    confirm() {
      if(this.isEnabledAuth && this.hasCertification){
        if(this.authStatus == 'PassAuth'){
           var url = '/Settlements';
        var model = {};
        model.feeType = this.feeType;
        model.FeeIds = this.allId;
        if (this.Adjusts.adjustIds.length > 0) {
          model.adjustIds = this.Adjusts.adjustIds;
        }
        axiosPostAPI(url, model).then(res => {
          if (res.status == 200) {
            console.log(res.result)
            if (res.result.length > 0) {
              var param = "?packageId=" + res.result[0].id;
              this.$router.push({path: 'accountCordDetail' + param})
            }
          }
        })
        }else if(this.authStatus == 'UnAuth'){
           this.$dialog.confirm({
                  title: '',
                   message: '您还未完成实名认证，不能结算费用，是否去实名认证'
                  }).then(() => {
                 this.$router.push({ path: "/myInfo/zxCertification"});
                }).catch(() => {});
        }else if(this.authStatus == 'Pending'){
               this.$dialog.confirm({
                  title: '',
                   message: '您的实名认证状态是待人工审核，暂不能结算费用，如有疑问请联系客。'
                  }).then(() => {
                }).catch(() => {});
        }
      }else{
        if(this.hasData){
        var url = '/Settlements';
        var model = {};
        model.feeType = this.feeType;
        model.FeeIds = this.allId;
        if (this.Adjusts.adjustIds.length > 0) {
          model.adjustIds = this.Adjusts.adjustIds;
        }
        axiosPostAPI(url, model).then(res => {
          if (res.status == 200) {
            console.log(res.result)
            if (res.result.length > 0) {
              var param = "?packageId=" + res.result[0].id;
              this.$router.push({path: 'accountCordDetail' + param})
            }
          }
        })
      }else{
           this.$dialog.confirm({
                  title: '',
                   message: '您还未添加银行卡，暂时不能结算，是否去添加银行卡'
                  }).then(() => {
                 this.$router.push({ path: "/salesman/addCard"});
                }).catch(() => {});
      }
      }
    },
  }
}

</script>
<style scoped>
.displayAmount {
  padding: 15px;

}

.displayAmount p:nth-child(1n) {
  color: #999999;
  font-size: 14px;
  line-height: 20px;
  margin: 10px 0;
}

.displayAmount h3 {
  color: #333333;
  font-size: 18px;
  line-height: 20px;
  font-weight: normal;
  margin: 10px 0;
}

.confirmBtn {
  background: #4A66FE;
  font-size: 16px;
  color: #FFFFFF;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  margin: 30px 15px;
}

.popupBox {
  padding: 15px;
}

.endAmount {
  border-top: 1px solid #EEEEEE;
  padding: 15px;
}

.endAmount p:nth-child(1) {
  color: #999999;
}

</style>
