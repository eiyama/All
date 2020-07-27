<template>
  <div style="background-color:#FFF;width:100%;height:100vh">
    <p style="display:flex;background-color:#FFF;margin-top:200px;
    align-items:center;justify-content:center;flex-direction: column;">
      <img src="../assets/images/ajax-loader.gif" alt="" style="">
      <!-- <span style="font-size:24px;font-weight:bold;margin-top:5px">正在准备数据</span> -->
      <!-- <span style="font-size:24px;font-weight:bold;margin-top:30px">欢迎使用车险报价系统~~</span> -->
    </p>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {
    this.ssoJump();
  },
  methods: {
    ssoJump() {
      var self = this;
      var appId = self.$route.query.appId;
      var token = self.$route.query.token;
      if (token != null && token != undefined) {
        token = decodeURIComponent(token);
        token = token.replace(' ', '+');
        localStorage.setItem('token', appId + '_' + token);
      }
      sessionStorage.setItem('hasCertification',false);
      setTimeout(function() {
        self.$router.replace({ path: "/", query: { appId: appId } });
      }, 1000);
    },
  }
}

</script>
<style scoped>
</style>
