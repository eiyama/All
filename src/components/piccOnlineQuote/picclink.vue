<template>
  <div class="citys" style="background-color:#FFF">
    <mt-header class="def-header" title="人保在线投保">
      <div slot="left">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openBack">
      </div>
    </mt-header>
    <!-- <a href=""></a> -->
    <!-- <a  :href="toPiccpage">  
    <button type="button">跳转</button> 
</a> -->
    <iframe :src="toPiccpage" frameborder="0" width="100%" :height=isHeight></iframe>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import pinyin from '../../../static/lib/web-pinyin/bundle.js';
import axios from 'axios';
export default {
  name: 'citys',
  data() {
    return {
      insCtiyCode: '',
      salesmanId: '',
      toPiccpage: '',
      isHeight: '',
      closeImg: (this.src = require("../../assets/images/ico-close.png")),
    }
  },
  created() {
    if (sessionStorage.getItem("insCtiyCode") != undefined && sessionStorage.getItem("insCtiyCode")) {
      this.insCtiyCode = sessionStorage.getItem("insCtiyCode");
    }
    if (sessionStorage.getItem("salesmanId") != undefined && sessionStorage.getItem("salesmanId")) {
      this.salesmanId = sessionStorage.getItem("salesmanId");
    }
    this.isHeight = window.innerHeight;
  },
  mounted() {
    Indicator.open("加载中...");
    axiosGetAPI('/vi/piccWap/link?cityCode=15020000&salesmanId=' + this.salesmanId).then(res => {
      Indicator.close();
      if (res.result.length > 1) {
        this.toPiccpage = res.result;
      }
    })
  },
  methods: {
    openBack() {
      this.$router.back()
    }

  }
}

</script>
<style scoped>
</style>
