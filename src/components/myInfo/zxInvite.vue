<template>
  <div :style="bodyBox" class="mainBox">
    <div style="display: flex;justify-content: center;">
        <h2 style="color: #fff; font-size: 40px;">加&nbsp;入&nbsp;我&nbsp;们</h2>
    </div>
    <div class="scanCode">
    <div  style="margin-top: -40px;padding-top:1px;">
      <img class="myImg" src="../../assets/images/icon-avatar.png" />
    </div>
     <p class="recommend" >我已在<span style="color:#000;font-weight: bold;font-size: 15px;">{{title}}</span>入驻，这里保险展业体验真不错，你也一起加入吧~</p>
      <img  style="height:170px;" :src="scanCode" alt="">
    <p class="joinBox">长按识别二维码加入</p>
    </div>
    <div class="footer-banner">
        <img src="../../assets/images/bg-yq-bottom.png" alt="">
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
  // import QRCode from 'qrcodejs2';
  import router from './../../router';
  // import echarts from "echarts";
  import store from './../../store/store';
  export default {
    data() {
      return {
        bodyBox: {
          'minHeight': '',
          'paddingTop': '15%',
        },
        appId: '',
        nickName: '',
        title: '',
        referrerMobile: '',
        shareUrl:'',
        iszxPage:false,
        scanCode:''
      }
    },
    created: function() {
      var h = window.innerHeight;
      var top = h * 0.2;
      this.bodyBox.minHeight = h - top + 'px';
    },
    mounted() {
      this.appId = this.$route.query.appId;
       localStorage.setItem("appId",this.appId);
       var userCode = this.$route.query.userCode;
      this.iszxPage = (this.appId == 'cx7190761141531rzi' || this.appId == 'cxa181211170855pxj');
     axiosGetAPI("/Weixin/QRCode?userCode=" + userCode).then((res) => {
          if (res.status == 200 ) {
            this.scanCode = res.result;
            }
          })
    // localStorage.setItem("appId", this.appId);
      this.nickName = decodeURIComponent(this.$route.query.nickName);
      // this.referralCode = this.$route.query.referralCode;
      this.title = decodeURIComponent(this.$route.query.title);
      // this.userId = this.$route.query.userId;
      this.referrerMobile = this.$route.query.referrerMobile;
    //   var domain =  document.location.toString().split("#")[0];
    //    this.shareUrl = domain + '#/regUser?appId=' + this.appId +
    //   '&nickName=' + this.nickName +
    //   // '&referralCode=' + this.referralCode +
    //   '&title=' + this.title +
    //   // '&UserId=' + this.userId +
    //   '&ReferrerMobile=' + this.referrerMobile +
    //   '&isShare=true';
       this.$nextTick(function() {
      // this.creatQrCode();
    })
    },
    methods: {
      goReg:function(){
        var param = '?appId=' + this.appId +'&nickName=' + this.nickName +'&title=' + this.title +
        '&ReferrerMobile=' + this.referrerMobile +'&isShare=true';
        this.$router.push({ path: "/regUser" + param});
      },
    }
  }
</script>
<style scoped>
.mainBox{
  background: url('../../assets/images/bg-yq-top.png')no-repeat top left; 
  background-size: cover; 
  min-height: inherit;
}

  .recommend {
    width: 85%;
    text-align: center;
    margin: 5px auto;
    color: #000;
  }

  .recommend p {
    width: 260px;
    color: #fcf8f0;
    font-size: 14px;
  }

  .joinBtn {
    background: #fec22c;
    color: #FFFFFF;
    margin: 30px 40px;
    text-align: center;
    padding: 10px 0;
    display: block;
    border-radius: 8px;
    font-size: 16px;
  }

  .footerBox{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 160px;
  }

  .qr-pos {
  margin-top: -10px;
  display: inline-block;
}

.scanCode{
    text-align: center;
    max-width: 80%;
    margin: auto;
    background: #ffffff;
    border-radius: 5px;
    padding-bottom: 10px;
    padding-top: 0.5px;
    margin-top: 50px;
    position: relative;
    z-index: 10;
}

.myImg{
    height: 90px;
    border-radius: 50%;
    border: 2px solid #093483;
}

.goReg{
    /* max-width: 250px; */
    margin: auto;
}

.joinBox{
    padding-bottom: 15px;
    font-size: 16px;
    color: #e4000f;
    font-weight: bold;
}

.footer-banner{
    /* background: url('../../assets/images/bg-yq-bottom.png')no-repeat 0 0;  */
    /* height: 265px; */
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    bottom: -6px;
    background-size: cover;

}
.footer-banner img{
    /* height: 260px; */
    width: 100%;
}

</style>
