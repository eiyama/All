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
        <h3 style="font-size: 16px;">您的家庭成员</h3>
        <span style="display:flex;align-items: center;">
          <p style="margin-right:5px;color:#999">为何需要</p>
          <van-icon name="question-o" />
        </span>
      </div>
          <van-row class="itemSet">
          <van-col ><p style="font-size: 16px;color: #666;">家庭成员:</p></van-col>
          <van-col >
            <van-col class="isItem" :class="{isActive:selected === index}" @click="checkRegulatory(index,item)"
              v-for=" (item , index) in mumberList" :key="index">
              {{item}}
            </van-col>
          </van-col>
        </van-row>
      </div>
      <div>
       <p style="color:#999;text-align:center;margin-top: 20px;font-size: 16px;">3/4</p>
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
    mumberList:  ['本人', '配偶', '父亲', '母亲', '子女'],
    radio: '',
    selected:0,
    appId:''
    };
  },
  methods: {
    openBack() {
      this.$router.back();
    },
    toNext(){
      this.$router.push({path:'riskAssessment'});
    },
    onConfirm(){

    },
    checkRegulatory(index,item){
           if (this.selected === index) {
          this.selected = "";
          // this.regulatoryCode = "";
        } else {
          this.selected = index;
          // this.regulatoryCode = item;
        }
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
    background: #f94037;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
}

.itemSet{
  padding: 15px
}

.isActive {
    background-color: #f94037;
    color: #FFFFFF;
  }


  .isItem {
    margin: 10px 35px;
    text-align: center;
    padding: 6px 25px;
    border-radius: 5px;
    cursor: pointer;
  }

</style>
