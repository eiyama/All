<template>
  <div style="background-color:#FFF;">
    <mt-header fixed class="def-header" title="海报">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right" @click>
        <!-- <p style="font-size:12px">我的排名</p> -->
      </div>
    </mt-header>
    <div style="margin-top:49px">
      <div class="header-share">
        <span style="display: flex;align-items: center;justify-content: center;">
          <h3>分享海报，是一个习惯，也是一种生活方式!</h3>
          <img src="../../assets/images/share/right-icon.png">
        </span>
      </div>
      <van-tabs>
        <van-tab v-for="(item,index) in tabBarList" :title="item" :key="index"></van-tab>
      </van-tabs>
      <van-row gutter="10" style="padding:10px ">
        <van-col span="8">
          <img style="width:100%;border-radius: 8px;height: 180px;" @click="isShowOverlay = true" src="../../assets/images/share/img-share2.jpg" alt />
        </van-col>
        <van-col span="8">
          <img style="width:100%;border-radius: 8px;height: 180px;" @click="isShowOverlay = true" src="../../assets/images/share/img-share3.jpg" alt />
        </van-col>
        <van-col span="8">
          <img style="width:100%;border-radius: 8px;height: 180px;" @click="isShowOverlay = true" src="../../assets/images/share/img-share4.jpg" alt />
        </van-col>
        <van-col span="8">
          <img style="width:100%;border-radius: 8px;height: 180px;" @click="isShowOverlay = true" src="../../assets/images/share/img-share5.jpg" alt />
        </van-col>
        <van-col span="8">
          <img style="width:100%;border-radius: 8px;height: 180px;" @click="isShowOverlay = true" src="../../assets/images/share/img-share1.jpg" alt />
        </van-col>
        <van-col span="8">
          <img style="width:100%;border-radius: 8px;height: 180px;" @click="isShowOverlay = true" src="../../assets/images/share/img-share6.jpg" alt />
        </van-col>
        <!--       <van-col span="8">
          <img style="width:100%;border-radius: 8px;" src="../../assets/images/share/img-share1.jpg" alt />
        </van-col>
        <van-col span="8">
          <img style="width:100%;border-radius: 8px;" src="../../assets/images/share/img-share1.jpg" alt />
        </van-col>
        <van-col span="8">
          <img style="width:100%;border-radius: 8px;" src="../../assets/images/share/img-share1.jpg" alt />
        </van-col> -->
      </van-row>
      <!--    <div class="share-btn" @click="isShowOverlay = true">
        推荐给同事
    </div> -->
      <div class="popup-Box" v-show="isShowOverlay">
        <div class="popup-bottom">
          <div style="width:46%;display:flex;justify-content: space-between;">
            <!--          <span style="display:flex;flex-direction: column;align-items: center;color: #fff;">
              <i><img src="../../assets/images/share/refresh.png" alt=""></i>
              <p>刷新</p>
          </span>
          <span style="display:flex;flex-direction: column;align-items: center;color: #fff;">
              <i><img src="../../assets/images/share/refresh.png" alt=""></i>
              <p>刷新</p>
          </span>
          <span style="display:flex;flex-direction: column;align-items: center;color: #fff;">
              <i><img src="../../assets/images/share/refresh.png" alt=""></i>
              <p>下载</p>
          </span> -->
            <p style="color:#fff;font-size:16px;float:right;margin: 15px;" @click="isShowOverlay = false">关闭</p>
          </div>
          <!-- <div style="width:46%">
            <span class="shareSubmitBtn">
              <p style="color:#F0F0F0">点击右上角分享</p>
              <i><img src="../../assets/images/share/up-icon.png"></i>
            </span>
          </div> -->
        </div>
        <div class="popup-share">
          <div class="scanCode">
            <span style="color:#333">
              <p>{{nickName}}</p>
              <p v-show="mobile">{{mobile}}</p>
            </span>
            <img style="width: 60px;" src="../../assets/images/share/scanCode.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
export default {
  name: "defaultPage",
  data() {
    return {
      tabBarList: ["推荐", "金句", "正能量", "理念", "增员", "节日", "励志"],
      isShowOverlay: false,
      nickName: '',
      mobile:''
    };
  },
  methods: {
    openBack() {
      this.$router.back();
    }
  },
  mounted: function() {
    if (sessionStorage.getItem('nickName')) {
      this.nickName = sessionStorage.getItem('nickName');
    }
    if (sessionStorage.getItem('referrerMobile')) {
      this.mobile = sessionStorage.getItem('referrerMobile');
      if (this.mobile == 'undefined') {
        this.mobile = '';
      }
    }
  }
};

</script>
<style scoped>
.header-share {
  height: 120px;
  width: 100%;
  text-align: center;
  /* line-height: 100px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #FFFFFF;
  background: url('../../assets/images/share/banner-haibao.jpg');
  background-size: contain;
}

.share-btn {
  position: fixed;
  right: 10px;
  bottom: 50px;
  background: #999;
}

.popup-Box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  z-index: 1000;
}

.popup-share {
  background: url('../../assets/images/share/img-share3.jpg')center;
  background-size: contain;
  height: 80%;
  width: 80%;
  position: absolute;
  top: 55%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -53%);
  position: relative;
}

.scanCode {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  right: 0;
  padding: 15px;
}

.popup-bottom {
  height: 55px;
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

}

.shareSubmitBtn {
  background: #f66330;
  padding: 10px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
