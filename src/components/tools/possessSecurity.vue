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
        <h3 style="font-size: 16px;">您已有的保障</h3>
        <span style="display:flex;align-items: center;">
          <p style="margin-right:5px;color:#999">为何需要</p>
          <van-icon name="question-o" />
        </span>
      </div>
      <div style="padding:5px">
            <van-field
            readonly
            clickable
            label="城市"
            :value="value"
            placeholder="选择城市"
            @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
</van-popup>
          <!-- <mt-field  label="性别" placeholder="请输入" v-model="sex"></mt-field> -->
      </div>
      <div class="itemList">
            <van-field label="人寿保险保额" placeholder="请输入" v-model="birthday" />
      </div>
      <div class="itemList">
          <van-field  label="重疾保险保额" placeholder="请输入" v-model="placeAbode" />
      </div>
      <div class="itemList">
          <van-field  label="意外保险保额" placeholder="请输入" v-model="occupation" />
      </div>
      <div class="itemList">
          <van-field label="住院医疗保额" placeholder="请输入" v-model="annualIncome" />
      </div>
       <div class="itemList">
          <van-field  label="养老保险保额" placeholder="请输入" v-model="annualIncome" />
      </div>
      </div>
      <div>
       <p style="color:#999;text-align:center;margin-top: 20px;font-size: 16px;">2/4</p>
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
      value: '',
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      appId:''
    };
  },
  methods: {
    openBack() {
      this.$router.back();
    },
    toNext(){
      this.$router.push({path:'familyMumber'});
    },
    onConfirm(){
       this.showPicker = false
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
  padding: 10px 16px ;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.itemList{
  padding:5px 0;
  border-bottom: 1px solid #eee;
}

.van-field__label{
  width:110px !important;
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


</style>
