<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="保险公司报案电话">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:5px;padding-bottom:5px">
        <div class="Insitem" v-for="(item,index) in casePhones" :key="index">
            <a :href="'tel:' + item.phone"><img :src="item.src" style="height:35px;"></a>
             <a style="color:#333;font-size: 14px;" :href="'tel:' + item.phone">{{item.phone}}</a>
        </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import router from './../../router';
import store from './../../store/store';
import * as types from './../../store/types';
import axios from 'axios';
import { Cell, CellGroup } from 'vant';
export default {
  name: 'home',
  data() {
    return {
      casePhones: [
        { phone: "95511", src: this.src = require('../../assets/images/baoan/pingan-95511.png') },
        { phone: "95518", src: this.src = require('../../assets/images/baoan/renb-95518.png') },
        { phone: "95550", src: this.src = require('../../assets/images/baoan/astp-95550.png') },
        { phone: "95500", src: this.src = require('../../assets/images/baoan/tpy-95500.png') },
        { phone: "95505", src: this.src = require('../../assets/images/baoan/ta-95505.png') },
        { phone: "95589", src: this.src = require('../../assets/images/baoan/taiping-95589.png') },
        { phone: "95590", src: this.src = require('../../assets/images/baoan/dd-95590.png') },
        { phone: "95569", src: this.src = require('../../assets/images/baoan/ab-95569.png') },
        { phone: "95592", src: this.src = require('../../assets/images/baoan/changa-95592.png') },
        { phone: "95586", src: this.src = require('../../assets/images/baoan/db-95586.png') },
        { phone: "95556", src: this.src = require('../../assets/images/baoan/ha-95556.png') },
        { phone: "95502", src: this.src = require('../../assets/images/baoan/ya-95502.png') },
        { phone: "95552", src: this.src = require('../../assets/images/baoan/yc-95552.png') },
        { phone: "95510", src: this.src = require('../../assets/images/baoan/yg-95510.png') },
        { phone: "95506", src: this.src = require('../../assets/images/baoan/yt-95506.png') },
        { phone: "95585", src: this.src = require('../../assets/images/baoan/zh-95585.jpg') },
        { phone: "10108848", src: this.src = require('../../assets/images/baoan/zhf-10108848.jpg') },
        { phone: "4008695519", src: this.src = require('../../assets/images/baoan/rens-4008695519.png') },
        { phone: "4000500000", src: this.src = require('../../assets/images/baoan/ach-4000500000.png') },
        { phone: "4006116666", src: this.src = require('../../assets/images/baoan/bh-4006116666.png') },
        { phone: "4000100000", src: this.src = require('../../assets/images/baoan/hn-4000100000.png') },
        { phone: "4008888136", src: this.src = require('../../assets/images/baoan/dh-4008888136.png') },
        { phone: "4008817518", src: this.src = require('../../assets/images/baoan/fb-4008817518.png') },
        { phone: "4006695535", src: this.src = require('../../assets/images/baoan/fd-4006695535.png') },
        { phone: "4008695519", src: this.src = require('../../assets/images/baoan/rens-4008695519.png') },
        { phone: "4000611111", src: this.src = require('../../assets/images/baoan/hh-4000611111.png') },
        { phone: "4009333000", src: this.src = require('../../assets/images/baoan/sanxin-4009333000.png') },
        { phone: "4006077777", src: this.src = require('../../assets/images/baoan/ts-4006077777.png') },
        { phone: "4008667788", src: this.src = require('../../assets/images/baoan/xd-4008667788.png') },
        { phone: "4000188688", src: this.src = require('../../assets/images/baoan/yd-4000188688.png') },
        { phone: "4006995566", src: this.src = require('../../assets/images/baoan/zhy-4006995566.png') },
        { phone: "4008280018", src: this.src = require('../../assets/images/baoan/zj-4008280018.png') },
        { phone: "4006536888", src: this.src = require('../../assets/images/baoan/zm-4006536888.png') },
        { phone: "4008666777", src: this.src = require('../../assets/images/baoan/zs-4008666777.png') },
        { phone: "4008666555", src: this.src = require('../../assets/images/baoan/jt-4008666555.png') },
        { phone: "4008882008", src: this.src = require('../../assets/images/baoan/lb-4008882008.png') },
      ],
      rightImg: this.src = require('../../assets/images/right.png'),
    }
  },
  created: function() {},
  methods: {
    openBack: function() {
      window.history.back();
    },
  }
}

</script>
<style scoped>

  .Insitem{
    background: #FFFFFF;
    margin: 10px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
  }
</style>
