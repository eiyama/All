<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="车险小知识">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:5px;padding-bottom:5px">
      <van-row v-for="(item,index) in qas" :key="index" style="margin:10px;background-color:#FFF;border-radius:8px;padding:15px" type="flex">
        <van-col span="24">
          <p style="float:left;color:#333;font-size:15px;font-weight:bold;width:100%">{{item.Q}}</p>
          <p style="float:left;color:#666;font-size:13px;margin-top:10px;width:100%">{{item.A}}</p>
        </van-col>
      </van-row>
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
      qas: [
        { Q: "车损险", A: "被保险机动车辆在使用过程中因碰撞、倾覆等事故或暴风雨、洪水部分自然灾害等意外造成的直接损失。" },
        { Q: "三者险", A: "被保险车辆在使用过程中发生意外事故，致使第三者遭受人身伤亡或财产直接损毁的赔偿责任。" },
        { Q: "车上人员责任险（司机和乘客）", A: "被保险人或其允许的驾驶人在使用被保险车辆过程生发生意外事故致使车上人员遭受人身伤亡。" },
        { Q: "盗抢险", A: "被保险车辆被盗抢后的全车损失或盗抢后发生的车辆损坏及车上零配件丢失的合理维修费用。" },
        { Q: "玻璃险(玻璃单独破碎险)", A: "保险期内，被保险机动车挡风玻璃或车窗玻璃的单独破碎的实际损失金额。" },
        { Q: "自燃险(自燃损失险)", A: "保险期内被保险车辆自身的电器、线路、供油、供气系统等自身原因起火燃烧引起的损失及全理施救费用。" },
        { Q: "划痕险(车身划痕损失险)", A: "被保险车辆在使用过程中发生无明显碰撞的车身划痕。" },
        { Q: "涉水险(发动机涉水险)", A: "被保险车辆在使用过程中因发动机进水后导致发动机直接损毁及合理施救的费用。" },
        { Q: "不计免赔(不计免赔率险)", A: "主险按免赔率计算由被保险人自行承担的免赔部分金额。" },
        { Q: "第三方特约险(机动车损失保险无法找到第三方特约险)", A: "被保险机动车损失应当由第三方负责赔偿但因无法找到条三方而由被保险人自行承担的免赔金额。" },
        { Q: "精神损害抚慰金责任险", A: "投保人投保三者险及车上人员责任险后赔偿第三者或机动车车上人员的精神损害抚慰金。" },
        { Q: "修理期间费用补偿险", A: "被保险机动车在责任范围内的事故造成的修理期间的代步车费或弥补停驶损失。" },
        { Q: "车上货物险(车上货物责任险）", A: "被保险机动车发生意外事故致使车上所载货物遭受直接损毁。" },
        { Q: "指定修理厂险", A: "被保险车辆发生事故后可到指定修理厂进行修理。" },
      ],
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
</style>
