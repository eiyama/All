<template>
  <div style="background-color:#FFF">
    <mt-header class="def-header" title="支付订单">
      <div slot="left">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openBack">
      </div>
    </mt-header>
    <iframe :src="payUrl" frameborder="0" width="100%" :height="height"></iframe>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      payUrl: '',
      height: '100%',
      closeImg: (this.src = require("../../assets/images/ico-close.png")),
    }
  },
  created() {
    this.height = window.innerHeight;
  },
  mounted() {
    this.payUrl = this.$route.query.payUrl;
  },
  methods: {
    openBack() {
      this.$router.back()
    }

  }
}

</script>
<style>
</style>
