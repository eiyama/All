<template>
  <div>
    <mt-header fixed class="def-header" title="需求分析评测">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
          <div slot="right">
            <van-icon name="cross" color="#666" @click="backHome"></van-icon>
      </div>
    </mt-header>
    <div style="margin-top:49px;padding-top:1px;margin-bottom:40px">
      <div class="briefBox">
        <div class="briefHeader">
          <h3>风险评估报告（简要）</h3>
          <p @click="afresh">重测</p>
        </div>
         <p style="margin-top:3px;font-size:12px;">{{nowTime}}</p>
         <p style="margin-top:35px;font-size:16px;">30岁以后的身体代谢将逐渐缓慢。将以您重点关注个人重疾发病风险。</p>
         <div class="lookDetail" @click=""><p>查看详情</p> </div>
      </div>
      <div class="briefItem">
        <div class="brieItem_Title">
            <span>意外医疗风险</span>
        </div>
        <div class="briefDetail">
            <i>
                <img style="width:65px;height:65px;" src="../../assets/images/share/canping.jpg" alt="">
            </i>
            <div class="briefDetailBody">
                <div class="briefBody_spanLeft">
                    <span class="spanLeftBox">
                        <h3>个人重疾发病风险</h3>
                        <p>风险等级：中风险！</p>
                    </span>
                    <span class="toDetail" >
                        详情
                    </span>
                </div>
                <p>风险理由：30岁以后的身体代谢将逐渐缓慢！</p>
            </div>
        </div>
      </div>
      <div class="briefItem">
        <div class="brieItem_Title">
            <span>交通事故风险</span>
        </div>
        <div class="briefDetail" style="border-bottom: 1px solid #eee;">
            <i>
                <img style="width:65px;height:65px;" src="../../assets/images/share/canping.jpg" alt="">
            </i>
            <div class="briefDetailBody" >
                <div class="briefBody_spanLeft">
                    <span class="spanLeftBox">
                        <h3>交通事故意外风险</h3>
                        <p>风险等级：中风险！</p>
                    </span>
                    <span class="toDetail"  @click="">
                        详情
                    </span>
                </div>
                <p>风险理由：出行较为频繁，有风险滋生！</p>
            </div>
        </div>
         <div class="briefDetail">
            <i>
                <img style="width:65px;height:65px;" src="../../assets/images/share/canping.jpg" alt="">
            </i>
            <div class="briefDetailBody">
                <div class="briefBody_spanLeft">
                    <span class="spanLeftBox">
                        <h3>航班延误风险</h3>
                        <p>风险等级：低风险！</p>
                    </span>
                    <span class="toDetail"  @click="">
                        详情
                    </span>
                </div>
                <p>风险理由：受外界因素影响！</p>
            </div>
        </div>
      </div>
    </div>
    <div class="inviteFreands">
        <p>邀请好友测评</p>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
// import { common } from "../../common/common"
export default {
  data() {
    return {
      nowTime: '',
      appId:'',
    };
  },
  methods: {
    backHome() {
      this.appId = localStorage.getItem('appId');
      this.$router.push({ path: "/?appId=" + this.appId });
    },
    openBack(){
      this.$router.back();
    },
    // (){
    //     this.$router.push({path:'productsDetail'})
    // },
    afresh(){
      this.$router.push({path:'/tools/replenishInfor'})
    }
  },
  mounted: function() {
      this.nowTime = this.Common.Public.dateString(new Date());
  }
};
</script>
<style scoped>
.briefBox {
  height: 210px;
  background: #6880fe;
  border-radius: 8px;
  margin: 10px;
  padding: 15px;
  color: #f0f0f0;
}

.briefHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.briefHeader h3{
    font-weight: normal;
    font-size: 18px;
}

.briefHeader p{
    background: #3f59e4;
    padding: 2px 15px;
    border-radius: 10px;
    font-size: 12px;
}

.lookDetail{
    margin-top: 40px;
    display: flex;
    justify-content: center;
}
.lookDetail p{
    padding:5px 15px;
    width: 100px;
    border: 1px solid #fff;
    text-align: center;
    border-radius: 20px;
}

.briefItem{
    padding: 15px;
    margin: 10px;
    background:#fff;
    border-radius: 8px;
}

.brieItem_Title span{
    border-left: 3px solid #6880fe;
    padding-left: 15px;
    font-size: 16px;
}

.brieItem_Title{
    border-bottom: 1px solid #eeeeee;
    padding:8px 0px;
}

.briefDetail{
    padding: 20px 0px;
    display: flex;
}
.briefDetailBody{
    margin-left: 15px;
    width: 80%;
}
.briefBody_spanLeft{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.spanLeftBox h3{
    font-size: 16px;
    font-weight: normal;
    color: #333;
}

.briefDetail p {
    color: #999;
    font-size: 14px;
}
.toDetail{
    padding: 2px 10px;
    border: 1px solid #91a2e1;
    color: #91a2e1;
    border-radius: 8px;
}

.inviteFreands{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 44px;
    background: #6880fe;
    text-align: center;
    line-height: 44px;
    color: #fff;
    font-size: 16px;
}
</style>
