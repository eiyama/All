<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="常见问题">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:5px;padding-bottom:5px">
      <van-row v-for="(item,index) in qas" :key="index" style="margin:10px;background-color:#FFF;border-radius:8px;padding:15px" type="flex">
        <van-col span="24">
          <p style="float:left;color:#333;font-size:15px;font-weight:bold;width:100%">{{item.Q}}</p>
          <p style="float:left;color:#666;font-size:13px;width:100%;margin-top:10px;">{{item.A}}</p>
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
        { Q: "问：折扣系数可以调整吗？", A: "答：支持人保、太保调整折扣系数。" },
        { Q: "问：驾意险可以在线出单吗？", A: "答：支持平安、太保随车驾意险出单。" },
        { Q: "问：新车可以出单吗？", A: "答：可以的，需要按照车辆合格证输入车辆信息、车主信息、投保人和被保人信息。" },
        { Q: "问：为什么平安保费与人保、太保不一样？", A: "答：1.平安的折扣系数受投保方案影响，不同的险种组合，折扣系数不一样。2.有出险记录的，平安的保费比其他公司高。" },
        { Q: "系统里报价与保险公司系统报价不一致？", A: "1.请确认报价信息是否一致。2.请确认出单工号是否一致，平安的不同出单工号，渠道系数与自主核保系数不一致，会导致报价结果不一致。" },
        { Q: "问：客户可以二次分配吗？", A: "答：可以的。" },
        { Q: "问：保单同步状态是查询无结果？", A: "答：1.还没有缴费。2.车牌或者车架号错误。3.保险公司选择错误。4.线下出单账号与系统配置的账号不一致。" },
        { Q: "问：导入客户后会自动查询续保信息吗？", A: "答：导入客户后系统会自动查询续保信息。" },
        { Q: "问：可以使用IE浏览器登录系统吗？", A: "答：不支持IE浏览器，推荐使用谷歌chrome浏览器或者360浏览器极速模式。" },
        { Q: "问：企业车可以出单吗？", A: "答：支持企业车出单。" },
        { Q: "问：过户车可以出单吗？", A: "答：支持过户车出单。" },
        { Q: "问：货车报价保费不准确？", A: "答：系统暂不支持货车报价出单，仅支持9座以下非营运客车报价出单。" },
        { Q: "问：客户导入为什么失败？", A: "答：需要使用系统里面的导入模板，且不能改动模板表头信息。" },
        { Q: "问：输入车牌号无法带出车辆信息？", A: "答： 1.上年在平安投保的，用车牌好续保需要输入证件号后6位。如果没有证件号，可以使用车架号报价。2.太平洋系统有限制，如果上年是太平洋保单，还没有到续保期，也是带不出车辆信息的。" },
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
