<template>
  <div >
    <mt-header fixed class="def-header" title="需求分析评测">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right">
             <van-icon name="cross" color="#666" @click="backHome"></van-icon>
      </div>
    </mt-header>
    <div style="margin-top:49px;">
      <div style="background:#fff">
        <div class="mainTitle">
        <h3 style="font-size: 16px;">您的基本信息</h3>
        <span style="display:flex;align-items: center;">
          <p style="margin-right:5px;color:#999">为何需要</p>
          <van-icon name="question-o" />
        </span>
      </div>
      <div class="itemList">
          <van-field  label="性别" placeholder="请输入" v-model="sex"></van-field>
      </div>
      <div class="itemList">
          <van-field  label="出生日期" placeholder="请输入" v-model="birthday"></van-field>
      </div>
      <div class="itemList">
          <van-field  label="居住地区" placeholder="请输入" v-model="placeAbode"></van-field>
      </div>
      <div class="itemList">
          <van-field  label="职业" placeholder="请输入" v-model="occupation"></van-field>
      </div>
      <div class="itemList">
          <van-field  label="年收入" placeholder="请输入" v-model="annualIncome"></van-field>
      </div>
      </div>
      <div>
       <p style="color:#999;text-align:center;margin-top: 20px;font-size: 16px;">1/4</p>
      </div>
      <div class="nextBtn" @click="toNext">
        <p>下一步</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      sex:'',
      birthday:'',
      placeAbode:'',
      occupation:'',
      annualIncome:'',
      appId:''
    };
  },
  methods: {
    openBack() {
      this.$router.back();
    },
    toNext(){
      this.$router.push({path:'possessSecurity'});
    },
        backHome() {
      this.appId = localStorage.getItem('appId');
      this.$router.push({ path: "/?appId=" + this.appId });
    },
  },
  mounted: function() {}
};
</script>
<style scoped>
.mainTitle {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.itemList{
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.nextBtn{
  padding: 15px;
}

.nextBtn p{
    text-align: center;
    padding: 10px;
    background:#f94037;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
}

.van-field__label{
  width:110px !important;
}

</style>
