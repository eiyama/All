<template>
  <div>
    <div :style="wrap_bottom" class="wrap-bottom" :value="bottomNav">
      <div class="bottom-tab">
        <div class="bottom-nav">
          <div class="buttom-item" :class="{ 'cur': bottomNav=='home'}" value="home" @click="handleChange">
            <div class="item-wrapper"><i class="icon-icon-home"></i>首页</div>
          </div>
          <div class="buttom-item" :class="{ 'cur': bottomNav=='customer'}" value="customer" @click="handleChange">
            <div class="item-wrapper"><i class="icon-icon-customer"></i>客户</div>
          </div>
          <div class="buttom-item" :class="{ 'cur': bottomNav=='quotationList'}" value="quotationList" @click="handleChange">
            <div class="item-wrapper"><i class="icon-icon-inserancePolicy"></i>报价单</div>
          </div>
          <div class="buttom-item" :class="{ 'cur': bottomNav=='prospectuses'}" value="prospectuses" @click="handleChange">
            <div class="item-wrapper"><i class="icon-icon-tabs-plans"></i>计划书</div>
          </div>
          <div class="buttom-item" :class="{ 'cur': bottomNav=='myInfo'}" value="myInfo" @click="handleChange">
            <div class="item-wrapper"><i class="icon-icon-userCenter"></i>我的</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bottomAllTab',
  props: {
    plant: ''
  },
  data() {
    return {
      bottomNav: 'home',
      appId: '',
      wrap_bottom: {
        "left": '0',
        "width": '100%',
      }
    }
  },
  mounted: function() {
    this.browserRedirect();
    this.bottomNav = this.plant;
  },
  methods: {
    // 点击按钮
    handleChange(e) {
      var val = $(e.currentTarget).attr('value');
      var url = '/quoteManagement/home';
      var appIdParam = {};

      this.bottomNav = val;
      this.appId = localStorage.getItem('appId');

      if (val == 'home') {
        url = '/'
        appIdParam = { appId: this.appId }
      } else if (val == 'customer') {
        url = '/customerManagement/custIndexb'
      }
      // else if (val == 'customer') {
      //   url = '/potentialCustomers'
      // } 
      else if (val == 'quotationList') {
        url = '/quotationList/quotationIndex'
      } else if (val == 'prospectuses') {
        url = '/prospectuses'
      } else {
        url = '/myInfo/myIndex'
      }

      // 路由跳转至当前点击的页面
      this.$router.push({ path: url, query: appIdParam })
    },
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      console.log(sUserAgent);
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        this.wrap_bottom.left = '0'
      } else {
        // this.wrap_bottom.width = '375px';
      }
    }
  }
}

</script>
<style scoped>
.wrap-bottom {
  position: fixed;
  z-index: 9;
  bottom: 0;
  /* left: 50%; */
  /* margin: 0 -3.75rem; */
  /* left: 0; */
  /* width: 7.5rem; */
  height: 1rem;
  border-top: 1px solid #f9f9f9;
}

.wrap-bottom .bottom-tab {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  color: #ffffff;
}

.wrap-bottom .bottom-nav {
  height: 100%;
  width: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
}

.wrap-bottom .buttom-item {
  color: #C9CBD6;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  /* min-width: 80px; */
  max-width: 2.36rem;
  position: relative;
  height: 100%;
  padding: 0;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-decoration: none;
  border: none;
  outline: none;
  transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.wrap-bottom .item-wrapper {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 100%;
  font-size: 0.2rem;
}

.wrap-bottom .item-wrapper i {
  display: block;
  margin-bottom: 0.04rem;
  font-size: 0.48rem;
}

.wrap-bottom .item-wrapper i:before {
  color: #B9BCCA;
}

</style>
