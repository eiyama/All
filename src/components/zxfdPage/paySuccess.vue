<template>
  <div :style="wrppera">
    <div class="mainBox">
      <div class="main_header" v-show="status == 'SuccessfulRelease' || status == 'EPolicyGenerated'">
        <img style="height:0.6rem" src="../../assets/images/insurance_2/paySuccess.png" alt />
        <p style="color:#FFD500">支付成功</p>
      </div>
      <div class="main_header" v-show="status == 'PendingPayment' " >
        <img style="height:0.6rem" src="../../assets/images/insurance/invalid_icon.png" alt />
        <p style="color:#333">等待返回结果</p>
      </div>
      <div class="main_header" v-show="status != 'SuccessfulRelease' && status != 'PendingPayment'  && status != 'EPolicyGenerated'">
        <img style="height:0.6rem" src="../../assets/images/insurance/lose-icon.png" alt />
        <p style="color:#333333">支付失败</p>
      </div>
      <div v-if="status == 'SuccessfulRelease' || status == 'EPolicyGenerated' ">
        <div class="productName">
          <p>{{resultList.productName}}</p>
        </div>
        <h4 class="account">
          <span>￥</span>
          <p>{{resultList.amount}}</p>
        </h4>
      </div>
      <div v-show="status != 'SuccessfulRelease' && status != 'PendingPayment'">
        <p>{{resultList.remark}}</p>
      </div>
      <div v-show="status == 'PendingPayment'"></div>

      <div class="payBtn" :style="isBorder" @click="payBtn" >
        <p :style="isColor">返回</p>
      </div>
     
     <!-- <p>返回支付页</p> -->
    
    </div>
  </div>
</template>
  <script >
import "./../../assets/css/zxfd/base.scss";
import { axiosGetAPI, axiosPostAPI } from "../../common/Axios";
import { Toast, Indicator } from "mint-ui";
// import { dialog } from "vant";
const typeList = ["标准版", "豪华版", "尊享无忧版", "温馨版"];
// 等待：#FF9500，成功：#FFD500，
export default {
  data() {
    return {
      productCode:'',
      amount: "",
      productType: "",
      insuredName: "",
      orderNo: "",
      payurl: "",
      isWeixin: false,
      resultList:[],
      payReturnUrl: "",
      isColor: { color: "#FF9500" },
      isBorder: {
        border: "1px solid #FF9500"
      },
      status: "PendingPayment",
      wrppera: {
        minHeight: "650px",
        background: "#fff"
      },
      payReturnUrl: "",
      remark: ""
    };
  },
  methods: {
    go_back() {
      this.$router.back();
    },
    againQuest() {
      var self = this;
      var hander, payurl;
      var time = 30;
      Indicator.open("正在刷新订单状态...");
      hander = setInterval(function() {
        time--;
        if (time > 0) {
          axiosGetAPI('/PropertyProducts/' + this.productCode  + '/Order/' + self.orderNo + '/Accept').then(Data => {
            if (Data.result.status != "OutOfOrder" && Data.result.status != "PendingPayment" ) {
              self.status = Data.result.status;
              if (Data.result.status == "SuccessfulRelease" || Data.result.status == "EPolicyGenerated") {
                self.status = Data.result.status;
                self.payReturnUrl = Data.result.payReturnUrl;
                clearInterval(hander);
                Indicator.close();
                self.isColor.color = "#FFD500";
                self.isBorder.border = "1px solid #FFD500";
                self.resultList = Data.result;
              } else {
                clearInterval(hander);
                Indicator.close();
                self.isColor.color = "#FF3B30";
                self.isBorder.border = "1px solid #FF3B30";
                self.resultList = Data.result;
                // Toast('出单失败，请重新提交信息');
                if ( Data.result.Remark || Data.result.StatusDisplay ) {
                  self.$dialog
                    .confirm({
                      title: "",
                      message:  Data.result.Remark || Data.result.StatusDisplay
                    })
                    .then(() => {})
                    .catch(() => {});
                } else {
                  self.$dialog
                    .confirm({
                      title: "",
                      message: "未查到支付结果",
                      confirmButtonText: "重试",
                      cancelButtonText: "取消"
                    })
                    .then(() => {
                      self.againQuest();
                    })
                    .catch(() => {});
                }
              }
            }
          });
        } else {
          clearInterval(hander);
          Indicator.close();
          // Toast('出单失败，请重新提交信息');
          self.$dialog
            .confirm({
              title: "",
              message: "未查到支付结果"
            })
            .then(() => {})
            .catch(() => {});
        }
      }, 2000);
    },
    payBtn() {
        if(this.payReturnUrl){
            window.location.href = this.payReturnUrl;
        }else{
            sessionStorage.setItem('orderNo',this.orderNo);
            this.$router.push({path:"/zxfdPage/payPage?payurl=" + encodeURIComponent(this.payurl)});
        }
      //  this.payReturnUrl = Data.result.payReturnUrl
    }
  },
  created() {

  },
  mounted() {
      if( this.$route.query.AppId || this.$route.query.appId ){
        var appId = this.$route.query.AppId || this.$route.query.appId;
        localStorage.setItem('appId', appId);
      }
      if(sessionStorage.getItem("productCode")){
        this.productCode = sessionStorage.getItem("productCode");
      }
    document.title = "出租无忧";
    var h = window.innerHeight;
    this.wrppera.minHeight = h + "px";
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    this.isWeixin = isWeixin;
    var self = this;
    this.orderNo = this.$route.query.OrderNo || this.$route.query.orderNo;
    //  var url = window.location.protocol + '//' + window.location.host + '/#' + '/zxfdPage/paySuccess?OrderNo=' + this.orderNo;
    // window.location.href='weixin://' + url
    // console.log(this.orderNo);
    if (this.orderNo ) {
      var hander, payurl;
      var time = 30;
      Indicator.open("正在刷新订单状态...");
      hander = setInterval(function() {
        time--;
        if (time > 0) {
          // /PropertyProducts/' + this.productCode  + '/Order/{orderNo}/Accept
          axiosGetAPI('/PropertyProducts/' + this.productCode  + '/Order/' + self.orderNo + '/Accept').then(Data => {
            if (Data.status == "200") {
                 self.status = Data.result.status;
                 self.payurl = Data.result.payUrl;
              if (Data.result.status != "OutOfOrder" && Data.result.status != "PendingPayment" ) {
                if (Data.result.status == "SuccessfulRelease" || Data.result.status == "EPolicyGenerated") {
                  self.status = Data.result.status;
                  self.payReturnUrl = Data.result.payReturnUrl;
                  clearInterval(hander);
                  Indicator.close();
                  self.isColor.color = "#FFD500";
                  self.isBorder.border = "1px solid #FFD500";
                  self.resultList = Data.result;
                } else {
                  clearInterval(hander);
                  Indicator.close();
                  self.isColor.color = "#FF3B30";
                  self.isBorder.border = "1px solid #FF3B30";
                  self.resultList = Data.result;
                  // Toast('出单失败，请重新提交信息');
                  if (Data.result.StatusDisplay) {
                    self.$dialog
                      .confirm({
                        title: "",
                        message: Data.result.StatusDisplay
                      })
                      .then(() => {})
                      .catch(() => {});
                  } else {
                    self.$dialog
                      .confirm({
                        title: "",
                        message: "未查到支付结果",
                        confirmButtonText: "重试",
                        cancelButtonText: "取消"
                      })
                      .then(() => {
                        self.againQuest();
                      })
                      .catch(() => {});
                  }
                }
              }
            }else{
              clearInterval(hander);
              Indicator.close();
            }
          });
        } else {
          clearInterval(hander);
          Indicator.close();
          // Toast('出单失败，请重新提交信息');
          self.$dialog
            .confirm({
              title: "",
              message: "未查到支付结果"
            })
            .then(() => {})
            .catch(() => {});
        }
      }, 2000);
    }
    // this.insuredName = nonCarList.orderDetail.InsCorpCode;
    // console.log(this.insuredName);
  }
};
</script>
<style scoped>
.base_msg_box > div > a.sbtn {
  color: #333;
  background: linear-gradient(
    90deg,
    rgba(255, 226, 59, 1) 0%,
    rgba(255, 213, 0, 1) 100%
  );
  box-shadow: 0px 2px 5px 0px rgba(255, 192, 0, 0.7);
  border-radius: 0.8rem;
  width: 80%;
  margin: 0.3rem auto;
}
.base_msg_box > h3 {
  padding-top: 0.45rem;
  font-size: 0.36rem;
}
.insuranceSetBox,
.insuranceTextBottom {
  padding-right: 0.3rem;
}
.insuranceTextBottom {
  border: none;
}
.mainBox {
  /* height: 158px; */
  background: rgba(255, 255, 255, 1);
  padding-top: 1px;
}
.mainBox h3 {
  font-size: 16px;
  color: rgba(153, 153, 153, 1);
  text-align: center;
  margin-top: 23px;
}
.mainBox .account {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainBox .account span {
  font-size: 0.56rem;
  color: #333333;
  margin-top: 8px;
  font-weight: 400;
}
.mainBox .account p {
  font-size: 0.82rem;
  font-weight: 500;
  color: #333333;
}

.productName {
  margin-top: 1.12rem;
  text-align: center;
}

.productName p {
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
}
.payWay {
  /* border-top: 10px solid rgba(245, 245, 245, 1); */
  display: flex;
  background: #fff;
  align-items: center;
  padding: 0 16px;
  height: 52px;
}

.payWay .list p {
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  margin-left: 16px;
}

.payBtn {
  width: 3.24rem;
  height: 0.64rem;
  border-radius: 4px;
  /* border:1px solid rgba(255,213,0,1); */
  margin: auto;
  margin-top: 6.3rem;
}

.payBtn p {
  font-size: 0.3rem;
  text-align: center;
  color: rgba(255, 213, 0, 1);
  line-height: 0.64rem;
}

.main_header {
  text-align: center;
  margin-top: 0.7rem;
  font-size: 0.3rem;
}
</style>