<template>
  <div class="errPage" :style="ewrppera">
    <div class="mint-content">
      <div align="center">
        <img :src="errorImg" style="width:220px;height:226px">
        <h3 style="margin-top:20px">Oh no！页面无法打开～</h3>
        <p style="margin-top:15px;color:#666">提示：请检查网络是否畅通</p>
        <p style="margin-top:20px;margin-bottom:15px;color:#f94037"><span @click="refresh" style="border:1px solid #f94037;padding:6px;border-radius:5px;font-size:12px">点此刷新</span></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'errPage',
  data() {
    return {
      errorImg: this.src = require('../../assets/images/err.png'),
      ewrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
      },
    }
  },
  methods: {
    initHeight: function() {
      this.ewrppera.height = window.innerHeight + 'px';
    },
    refresh:function(){
      var appId = this.$route.query.appid;
      if (appId) {
        localStorage.setItem('appId', appid);
      } 
      appId = localStorage.getItem("appId");

      this.$router.push({ path: "/", query: { appId: appId } });
    },
  },
  mounted: function() {}
}

</script>
<style scoped>
.errPage {
  width: 100%;
}
</style>
