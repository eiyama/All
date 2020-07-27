<template>
  <div style="background-color:#FFF;height:820px">
    <mt-header fixed class="def-header" title="SignalR测试">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right" @click="closeHome">
        <img :src="closeImg" style="width: 18px;height: 18px;" >
      </div>
    </mt-header>
    <div style="padding-top:48px;text-align:center">
      <div>{{showmsg}}</div>
      <van-field v-model="value" clearable type="text" label="信息" placeholder="请输入" />
      <van-button slot="button" size="small" type="danger" @click="sendMsg" style="margin-top:20px;width:150px">发送</van-button>
    </div>
  </div>
</template>
<script>
import signalR from 'signalr'
export default {
  name: "Signalr",
  data() {
    return {
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      value: "",
      showmsg: "",
      proxy: {}
    }
  },
  mounted() {
    var $this = this;
    this.connectServer();
  },
  destroyed: function () {
    this.proxy.invoke("finishRead").done((msg) => {
        console.log('已销毁');
      });
  },
  methods: {
    openBack: function() {
      // window.history.back();
      this.$router.push({ path: "/myInfo/myIndex"})
    },
    closeHome: function() {
      window.history.back();
    },
    connectServer: function() {
      var $this = this;
      var conn = $.hubConnection("http://dev.bandins.cn/signalr/hubs", { useDefaultPath: false })
      $this.proxy = conn.createHubProxy("prospectusHub");
      $this.getMsg();
      conn.start().done((data) => {
        // console.log('已连接')
      }).fail((data) => {
        console.log('连接失败:', data)
      });
    },
    sendMsg: function() {
      var $this = this;
      $this.proxy.invoke("beginRead", 1,  'weixin',  'adfasdfasdf').done((msg) => {
        console.log('开始阅读');
      });
    },
    getMsg: function() {
      var $this = this;
      $this.proxy.on("connected", (data) => {
        console.log('已连接:', data)
        $this.sendMsg();
      })
    }
  }
}

</script>
<style>
</style>
