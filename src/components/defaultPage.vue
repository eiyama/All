<template>
  <div style="background-color:#FFF;height:820px">
    <mt-header fixed class="def-header" title="新功能">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:50px">
      <img :src="defaultImg" style="height:100%;width:100%">
    </div>
  </div>
</template>
<script>
export default {
  name: 'defaultPage',
  data() {
    return {
      defaultImg: this.src = require('../assets/images/img-comingsoon.png'),
    }
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
  },
  mounted: function() {}
}

</script>
<style scoped>
</style>
