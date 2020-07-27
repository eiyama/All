<template>
  <div style="">
    <mt-header fixed class="def-header" title="活动中心">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:49px;padding:1px 0;">
      <p style="text-align:center;color:#999;margin-top:50%">暂无活动内容</p>
        <!-- <div class="activeItem1 activeItem">
          <h3>专属权益兑换</h3>
          <span class="activeCode">
            <p style="color: #fff;">输入兑换码获取</p>
            <p style="color: #f6c69e;">更多福利</p>
          </span>
        </div>

       <div class="activeItem2 activeItem">
          <h3>分享热点资讯</h3>
          <p style="font-size: 26px;">100元积分等你来拿</p>
        <span class="activeCode">
          <p style="color: rgb(255, 208, 196);">输入兑换码获取</p>
        </span>
      </div>

      <div class="activeItem3 activeItem">
          <p style="font-size: 26px;line-height: 42px;color:#333">智能体重秤等你来拿</p>
        <span class="activeCode">
          <p style="color: #fff;">9月份出单保费达5万即可领取</p>
        </span>
      </div> -->
<!--
      <div class="activeItem4 activeItem">
        <span style="display: flex;align-items: center;">
          <p style="font-size: 14px;font-weight: bold;color:#333333">全国统一服务热线：</p>
          <p style="color: #999999;">01010231</p>
        </span>
          <span style="display: flex;align-items: center;margin: 5px 0;">
          <p style="font-size: 14px;font-weight: bold;color:#333333">建议及投诉电话：</p>
          <p style="color: #999999;">01010231</p>
        </span>
          <span style="display: flex;align-items: center;">
          <p style="font-size: 14px;font-weight: bold;color:#333333">客服邮箱：</p>
          <p style="color: #999999;">01010231@bandins.com</p>
        </span>
      </div> -->
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
export default {
  name: "defaultPage",
  data() {
    return {

    };
  },
  methods: {
    openBack() {
      this.$router.back();
    }
  },
  mounted: function() {}
};
</script>
<style scoped>
.activeItem{
  margin: 15px;
  padding: 10px 25px;
  height: 100px;
  border-radius: 5px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  }
  .activeItem1{
    background: url('../../assets/images/share/bg-quanyi.jpg');
    background-size: cover;
    }
  .activeItem1 h3{
    font-size: 25px;
  }
  .activeItem1 .activeCode{
    display: flex;
    align-items: center;
    background: #ffffff2b;
    padding: 3px 10px;
    border-radius: 0 8px 8px 8px;
    width: 56%;
    justify-content: center;
  }
  .activeItem2{
    background: url('../../assets/images/share/bg-redian.jpg');
    background-size: cover;
  }
 .activeItem2 .activeCode{
    display: flex;
    align-items: center;
    background: #ec475a;
    padding: 1px 10px;
    border-radius: 5px;
    width: 34%;
    justify-content: center;
  }

  .activeItem3{
    background: url('../../assets/images/share/bg-dianzic.jpg');
    background-size: cover;
  }

.activeItem3 .activeCode{
  display: flex;
  align-items: center;
   background: #484848;
  padding: 1px 10px;
  width: 60%;
  justify-content: center;
  /* background: #5a1802; */
}
.activeItem4{
  background: #daf8f0;

}

</style>
