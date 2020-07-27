<template>
	<div class="quoteInfo" style="background-color:#FFF;min-height:820px">
      <mt-header fixed class="def-header" title="车险报价">
        <div slot="left">
          <mt-button icon="back" @click="openBack"></mt-button>
        </div>
      </mt-header>
		<div class="mint-wrap">
        <div class="fixed-navbar" :style="{ width: size + '%' }"></div>
        <mt-navbar class="quote-tab" fixed v-model="selected">
          <mt-tab-item class="nav-item" id="1"><span class="t-dot">1</span>填车辆信息</mt-tab-item>
          <mt-tab-item :class="{ 'nav-item': isScheme }" id="2"><span class="t-dot">2</span>选车险方案</mt-tab-item>
          <mt-tab-item :class="{ 'nav-item': isResult }" id="3"><span class="t-dot">3</span>看报价结果</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import quoteInfo from './quoteInfo'
export default {
  data() {
    return {
      selected: '1',
      btnSelIns: false,
      size: 66.66,
      isResult: false,
      isScheme: false,
      isSelectIns: true,
      renewalCode: '',
      appId: '',
      from: ''
    }
  },
  components: {
    quoteInfo,
  },
  created() {
  },
  mounted(){
  	Indicator.open('加载中...');
 	  this.threeGo();
  },
  methods: {
  	openBack: function() {
      this.$router.back();
    },
  	 threeGo(){
  	 	var self = this;
  	 	var fullPath = self.$route.fullPath;
  	 	//quoteManagement/index?from=recent&plateNo=%E7%B2%A4B715CD&vin=LGBG12E03AY123092"
  	 	var queryStr = fullPath.split('?')[1];
  	 	// self.$router.push({ path: '/quoteManagement/quoteInfo?' + queryStr });
  	 	setTimeout(function()  {
		  Indicator.close();
		  self.$router.replace({ path: '/quoteManagement/quoteInfo?' + queryStr });
		}, 50);
	 },
  }
}
</script>
<style scoped>
.quoteInfo .mint-wrap.toQuote {
  padding-top: 100px;
}

.quoteInfo .mint-navbar.is-fixed {
  top: 44px;
}

.quoteInfo .fixed-navbar {
  position: fixed;
  top: 44px;
  right: 0;
  width: 100%;
  height: 59px;
  text-align: right;
  z-index: 2;
}

</style>