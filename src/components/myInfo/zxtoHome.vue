<template>
  <div class="box">
    <div class="header-banner">
        <div class="header-top">
        </div>
      <!-- <img style="width: 100%;" src="../../assets/images/bg-zc-top.png" /> -->
      <h4 style="font-size: 28px; color: rgb(12, 52, 132); text-align: center;">注&nbsp;册&nbsp;成&nbsp;功</h4>
      <p style="font-size: 16px;color: rgb(12, 52, 132); text-align: center;">恭喜您，您已成功加入智能车大家庭</p>
    </div>
    
    <div  style="margin:40px 15px 0px;">
        <mt-button class="zxTohome" type="default" size="large" @click="toHome" >去&nbsp;展&nbsp;业</mt-button>
    </div>
    <div>
        <ul class="listItem">
            <li><img src="../../assets/images/icon-bussiness.png" alt=""></li>
             <li><img src="../../assets/images/icon-follow.png" alt=""></li>
             <li><img src="../../assets/images/icon-team.png" alt=""></li>
        </ul>
    </div>
    <div class="footerBox">
      <!-- <img style="" src="../../assets/images/bg-zc-bottom.png" /> -->
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
  import store from './../../store/store';
  export default {
    data() {
      return {
        // bodyBox: {
        //   'minHeight': '',
        // },
        appId: '',
        nickName: '',
        title: '',
        referrerMobile: '',
        shareUrl:''
      }
    },
    created: function() {
    //   var h = window.innerHeight;
    //   this.bodyBox.minHeight = h + 'px';
    },
    mounted() {
      this.appId = this.$route.query.appId || localStorage.getItem('appId');
      localStorage.setItem("appId", this.appId);
    },
    methods: {
      toHome:function(){
       this.$router.push({path:'/?appId=' + this.appId});
      },
    }
  }
</script>
<style scoped>
    .box{
        background: #A9B8D4;
        min-height: inherit;
    }

    .header-banner{
    background: url('../../assets/images/bg-zc-top.png')no-repeat 0 0;
    width: 100%;
    background-size: contain;
    }

  .recommend {
    background: url("../../assets/images/bg-pop-dashline.png")no-repeat center;
    height: 100px;
    background-size: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    height: 310px;
    background: url("../../assets/images/bg-zc-bottom.png")no-repeat 0 0;
    background-size: cover;
  }

  .qr-pos {
  margin-top: -10px;
  display: inline-block;
}

.listItem{
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* margin-top: 35px; */
    margin: 35px 45px;
}

.listItem li img{
    height: 85px;
}

.header-top{
  height: 85px;  
}

</style>
