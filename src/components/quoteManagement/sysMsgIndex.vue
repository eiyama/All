<template>
  <div style="background-color:#F5F5F5">
    <mt-header fixed class="def-header" title="我的消息">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-bottom:10px">
      <div :style="msgwrppera" ref="wrppera">
        <ul class="mcust-list mmint-region" v-show="hasMsgData">
          <li class="mmint-cell" v-for="item in messages" @click="msgDetail(item,$event)">
            <img :src="item.readed ? readImg : unReadImg" style="position: absolute;right:89%;width: 18px; height: 18px;margin-top:6px">
            <h4 class="mmint-title" :style="{color:item.readed ? '#999':'#333'}">
              {{item.category ? item.category : (item.messageType ? item.messageType : "")}}
            </h4>
            <!-- <img :src="rightImg" style="position: absolute;left:92%;width: 25px; height: 25px;"> -->
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;" />
            <p class="{font-size:12px;margin-top:5px;margin-right:10px}" :style="{color:item.readed ? '#999':'#666'}">{{item.title}}</p>
          </li>
          <li class="mdown">
            <img :src="srcitem" v-show="hasMsgData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';
import { RadioGroup, Radio } from 'vant';
export default {
  name: 'home',
  data() {
    return {
      customerTitle: '',
      selected: '1',
      hasMsgData: false,
      limit: 20,
      lengths: '',
      imgshow: false,
      textshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      rightImg: (this.src = require("../../assets/images/right.png")),
      readImg: (this.src = require("../../assets/images/ic_read.png")),
      unReadImg: (this.src = require("../../assets/images/ic_unread.png")),
      messages: [{
        "id": "",
        "readed": "",
        "messageType": "",
        "category": "",
        "createdTime": "",
        "title": "",
        "actionPageUrl": "",
        "creator": ""
      }],
      msgwrppera: {
        "width": "100%",
        "overflow": "hidden",
        "background-color": "#F5F5F5",
      },
    }
  },
  created() {
    this.initHeight();
  },
  methods: {
    openBack: function() {
      window.history.go(-1);
    },
    initHeight: function() {
      this.msgwrppera.height = window.innerHeight + 'px';
    },
    refresh() {
      this.contentScroll.refresh();
    },
    getMessages: function(date) {
      Indicator.open('加载中...');
      var param = { offset: 0, limit: this.limit };
      var userId = sessionStorage.getItem('userIds');
      axiosGetAPI('/Users/' + userId + '/Messages', param).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.messages = res.result;
          this.hasMsgData = true;
          this.lengths = this.messages.length
          if (res.page.totalRows == 0) {
            this.textshow = false;
            this.imgshow = false;
          } else if (this.lengths == res.page.totalRows) {
            this.textshow = true;
            this.imgshow = false;
          } else {
            this.imgshow = false;
          };
        } else {
          this.textshow = false;
          this.imgshow = false;
          this.hasMsgData = false;
        }
      });
    },
    msgDetail: function(item, e) {
      e.preventDefault();
 
      var str = item.actionPageUrl;
      str = str.split('id=',2)[1];
      str = str.split('&',1);
      console.log(str)
      var id = str;
      axiosPutAPI('/Messages/' + item.id).then((res) => {
        this.getMessages();
      });
      var category = item.category;
      if (category) {
        if (category == '车辆进店通知') {
          this.$router.push({ path: '/quoteManagement/carInCustomers' })
        } else if (category == '客户跟进提醒') {
          this.$router.push({ path: '/customerManagement/custDetail?customerId=' + id })
        } else if (category.indexOf('询价') >= 0) {
          this.$router.push({path:'/manualInquiry/inquiryRecord'});
        }
      }
    },
  },
  mounted() {
    this.getMessages();
    const contentScroll = new BScroll(this.$refs.wrppera, {
      probeType: 2,
      click: true
    });
    this.contentScroll = contentScroll
    //开始滚动前，更新视图大小
    contentScroll.on("beforeScrollStart", () => {
      this.refresh();
    });
    this.contentScroll = contentScroll;
    contentScroll.on("scrollEnd", () => {
      var maxY = contentScroll.maxScrollY;
      var y = contentScroll.y
      if (y >= maxY + 40) {} else if (y < maxY + 40 && y > maxY) {
        contentScroll.scrollTo(0, maxY + 70, 200);
      } else if (y <= maxY) {
        if (this.lengths == null || this.lengths == '') {
          return;
        };
        var lengths = this.lengths
        var limit = this.limit
        this.imgshow = true;
        var param = { offset: this.lengths, limit: this.limit };
        var userId = sessionStorage.getItem('userIds');
        axiosGetAPI('/Users/' + userId + '/Messages', param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.lengths = this.messages.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
            } else {
              if (this.lengths < res.page.totalRows) {
                this.imgshow = false;
                this.messages = [...this.messages, ...res.result];
              } else {
                this.messages = [...this.messages];
                this.textshow = true;
                this.imgshow = false;
              };
            }
            this.hasMsgData = true;
          } else {
            this.textshow = false;
            this.imgshow = false;
          }
        });
        this.$nextTick(() => {
          this.contentScroll //更新滚动视图
        })
      }
    })
  },

}

</script>
<style scoped>
.mcust-list {
  padding-top: 5px;
}

.mcust-list .mmint-region {
  margin-bottom: 10px;
}

.mmint-region .mmint-cell {
  padding: 15px;
  background-color: #FFF;
  border-radius: 5px;
  margin: 10px;
}

.mcust-list .mmint-title {
  margin-left: 25px;
  line-height: 35px;
  font-size: 15px;
  color: #333;
  font-weight: bold;
}

.readClass {
  font-size: 15px;
  color: #333;
  font-weight: bold;
}

.unReadClass {
  font-size: 15px;
  color: #999;
  font-weight: bold;
}

.mdown {
  height: 40px;
  text-align: center;
}

.mdown img {
  width: 35px;
  height: 35px;
  margin-top: 5px
}

.mtextshow {
  margin-top: 15px;
  color: #999999
}

.cmessagecc {
  height: 100%;
  width: 100%;
}

.clili {
  bottom: 0;
  top: 200;
}

</style>
