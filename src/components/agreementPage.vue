<template>
  <div style="background-color:#FFF;height:820px">
    <mt-header fixed class="def-header" title="<<代理人协议>>">
      <div slot="left">
        <mt-button icon="back" @click="openBack" v-show="false"></mt-button>
      </div>
      <div slot="right" @click="closeHome">
        <img :src="closeImg" style="width: 18px;height: 18px;" >
      </div>
    </mt-header>
    <iframe :src='fileUrl' width='100%' height='100%' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
  </div>
</template>
<script>
export default {
  name: 'defaultPage',
  data() {
    return {
      defaultImg: this.src = require('../assets/images/img-comingsoon.png'),
      closeImg: this.src = require('../assets/images/ico-close.png'),
      fileUrl:''
    }
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    closeHome: function() {
      window.history.back();
    },
  },
  mounted: function() {
    //https://view.officeapps.live.com/op/embed.aspx?src=http://dev.bandins.cn/Media/Default/Tp/协议1.docx
    this.fileUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + this.$route.query.fileUrl;
  }
}

</script>
<style scoped>
.messagecc {
  height: 100%;
  width: 100%;
}
</style>
