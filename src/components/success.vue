<template>
  <div class="bg">
    <div class="contents">
      <h2 class="successs">
        入职申请提交成功
      </h2>
      <div class="font">
        恭喜您，您已经成功加入{{title}}的大家庭, 
        <br>
        <br>
        <div style="color:#F7E359;font-size:14px">温馨提示:<br>入职申请已提交，审核后即可使用<br>账号是您的手机号，密码是证件号后6位</div>
      </div>
      <div class="btn">
        <van-button class="primary" @click='go' size="large" type="primary" v-show='hasData'>立即下载APP</van-button>
        <van-button class="primary" @click='go' size="large" type="primary" v-show='!hasData'>去登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      title: '',
      downloadUrl: '',
      hasData: false
    }
  },
  created() {
    this.title = this.$route.query.title
    this.downloadUrl = this.$route.query.downloadUrl;
    if (this.downloadUrl == null || this.downloadUrl == '') {
      this.hasData = false;
    } else {
      this.hasData = true;
    };
  },
  methods: {
    go() {
      var me = this;
      if (!me.hasData) {
        me.$router.push({ path: '/', query: { appId: me.$route.query.appId } })
      } else {
        window.location.href = me.downloadUrl;
      };
    }
  }
}

</script>
<style>
html,
body {
  height: 100%;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/bg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
}

.bg .successs {
  font-size: 1.6em;
  font-weight: 500
}

.bg .contents {
  position: absolute;
  z-index: 100;
  width: 70%;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
}

.bg .font {
  margin: 20px 0 50px 0;
  line-height: 30px;
  color: #D3F1FE
}

.bg .primary {
  background-color: #F7E359;
  border: 1px solid #F7E359;
  color: #D4800F;
  border-radius: 10px;
  background: linear-gradient(top, #F5FEED 0%, #F7E359 100%);
}

</style>
