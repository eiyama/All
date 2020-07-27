<template>
  <div style="background-color:#FFF;">
    <mt-header fixed class="def-header" title="需求分析评测">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:49px">
        <div :style="wrppera" class="demandAnalysis_main">
          <div class="bg-banner">
            <img style="height: 70%;width:70%;margin-top: 30px;" src="../../assets/images/share/img-ceping.png" />
          </div>
            <div style="margin-top:50px">
            <h3 style="font-size: 26px;">
                需求分析评测
            </h3>
            <p style="margin-top: 10px;">
                全面了解您和您家人的风险
            </p>
            <p>
                根据您的需求和消费能力量身定制《投保建议书》
            </p>
            <div class="beginDemand" @click="replenishInfor">
                <p>开始测评</p>
                <img style="width: 22px;" src='../../assets/images/share/tonext.png' alt="">
            </div>

            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
    wrppera: {
            "width": "100%",
            "minHeight": "640px",
        },
    };
  },
  methods: {
    openBack() {
      this.$router.back();
    },
    replenishInfor(){
        this.$router.push({path:'replenishInfor'});
    }
  },
  mounted: function() {
        var h = window.innerHeight;
        this.wrppera.minHeight = h - 49 + 'px';
  }
};
</script>
<style scoped>
.demandAnalysis_main{
    background: #4891f0;
    width: 100%;
    height: 100%;
    color: #ffffff;
    text-align: center;
    padding-top: 0.5px;
}

.beginDemand{
    padding: 5px;
    background: #216bcc;
    border-radius: 15px;
    width: 120px;
    margin: auto;
    margin-top: 20px ;
    display: flex;
    justify-content: center;
    align-items: center;
}

.beginDemand p{
    font-size: 18px;
    margin-right: 5px;
}

</style>
