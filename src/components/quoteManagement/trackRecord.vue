<template>
  <div>
    <mt-header fixed class="def-header" title="跟进记录">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot='right'>
        <img :src="addImg" @click="addFollowIn" style="width:18px;height:18px;margin-top:5px" />
      </div>
    </mt-header>
    <div class="followIn" style="margin-top:48px">
      <div class="followIn_item" v-for="item in followIndetail">
        <div class="follow_title">
          <h3>{{item.title}}</h3>
          <p>{{item.createdTime}}</p>
        </div>
        <div class="follow_body">
          <!-- <p>跟进时间:</p> -->
          <p>跟进人:{{item.creatorName}}</p>
          <div><p>跟进内容:</p><p v-html="item.content"></p>
          </div>
        </div>
      </div>
      <div id="nodata" v-if="followIndetail == ''">暂无数据</div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from "./../../common/Axios";
import { Indicator } from "mint-ui";
import bottomTab from "./../bottomtab/bottom-tab";
import store from "./../../store/store";
import * as types from "./../../store/types";
import { Icon } from 'vant';
export default {
  data() {
    return {
      customerId: '',
      followIndetail: [],
      addImg: this.src = require('../../assets/images/ico-add.png'),
    };
  },

  created: function() {
    this.customerId = this.$route.query.customerId;
    console.log(this.customerId);
    axiosGetAPI('/vi/customers/' + this.customerId + '/tracks').then(res => {
      if (res.result) {
        this.followIndetail = res.result;
      }
    })
  },
  methods: {
    openBack() {
      this.$router.back();
    },
    addFollowIn() {
      this.$router.push({ path: "/quoteManagement/AddTrackRecord?customerId=" + this.customerId })
    }
  }
};

</script>
<style scoped>
.followIn {
  padding-top: 5px;
}

.followIn_item {
  margin: 10px;
  background: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
}

.follow_title {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.follow_title p{
  font-size: 12px;
  color: #999;
}
.follow_title h3{
  font-size: 14px;
  color: #333;
  font-weight: normal;

}
.follow_body{
   padding: 10px 0px;
}
.follow_body p{
  font-size: 14px;
  color: #333;
  margin: 5px 0;
}
#nodata {
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 50% 0;
  color: #a4a4a4;
  font-size: 16px;
}

</style>
