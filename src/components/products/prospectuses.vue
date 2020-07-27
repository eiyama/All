<template>
  <div style="background-color:#FFF;">
    <mt-header fixed class="def-header" title="计划书">
      <div slot="left">
        <mt-button icon="back" @click="openBack" v-show="false"></mt-button>
      </div>
      <div slot="right" v-show="hasProspectusesData">
        <mt-button @click="openEdit(isEdit)" style="font-size:15px;color:#f94037" >{{isEdit?'取消':'编辑'}}</mt-button>
      </div>
    </mt-header>
    <div class="container-center" style="padding-bottom:48px">
      <hr width="100%" color="#f5f5f5" size="1" style="padding-top:3.5px" />
      <div :style="pwrppera" ref="wrppera">
        <ul class="cust-list mint-region" v-show="hasProspectusesData">
          <li class="mint-cell" style="padding-bottom: 10px" v-for="(item,$index) in prospectuses" :key="$index">
            <div style="margin-top:-30px">
              <div @click="detail(item,$event)">
                <img :src="item.topPath? item.topPath : defaultImg" style="width: 80px;height: 80px; margin-top: 25px" slot="left">
                <i class="mint-title" style="margin-left: 5px;font-size: 16px;">{{item.isCombination ? item.name + "(组合计划)" : item.name}}</i>
                <p style="margin-left: 88px;margin-top: -40px;color:#999;font-size: 12px">主险:{{item.mainInsName}}</p>
              </div>
              <div>
                <p style="margin-left: 88px;margin-top: 5px;color:#999;font-size:12px;color:#7093ed" @click="viewRead(item)">查看{{item.readCount}}次</p>
              </div>
            </div>
            <i class="ico-arrow" v-show="!isEdit"></i>
            <div style="position:absolute;right:10px;top:10px;font-size: 18px;top:35%;color:red" @click="del(item)" v-show="isEdit">
              <van-icon name="close"/>
            </div>
          </li>
          <li class="down">
            <img :src="srcitem" v-show="hasProspectusesData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </li>
        </ul>
        <div class="non-data" v-show="!hasProspectusesData">
          <p>暂无计划书</p>
        </div>
      </div>
    </div>
    <div class="container-bottom">
      <bottomAllTab ref="bottomAllTab" :plant.sync="plante"></bottomAllTab>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI, axiosDeleteAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import bottomAllTab from './../bottomtab/bottom-all-tab';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';
import { Dialog } from 'vant';
export default {
  name: 'home',
  data() {
    return {
      plante: 'prospectuses',
      selected: '1',
      shouldShowLayer: false,
      hasProspectusesData: false,
      loadmoreActive: true,
      limit: 10,
      lengths: '',
      imgshow: true,
      textshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      defaultImg: this.src = require('../../assets/images/icon-product.png'),
      prospectuses: [],
      prospectus: {
        "id": "",
        "name": "",
        "salesmanName": "",
        "isolationName": "",
        "isCombination": "",
        "mainInsName": "",
        "isRead": "",
        "readCount": "",
        "totalTime": "",
        "totalTimeFormat": "",
        "topPath": "",
        "createdTime": "",
        "readCount":0,
      },
      isEdit:false,
      pwrppera:{
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background-color": "#FFF",
      }
    }
  },
  components: {
    bottomAllTab
  },
  created() {
    this.initHeight();
    this.getProspectuses();
  },
  methods: {
    initHeight:function(){
　　　this.pwrppera.height = window.innerHeight-100+'px';
　　},
    del:function(item) {
      var url = '/li/prospectuses/' + item.id;
      Dialog.confirm({
        title: '提示',
        message: '确定要删除【'+item.name+'】吗？'
      }).then(() => {
        Indicator.open('正在删除...');
        axiosDeleteAPI(url).then((res) => {
          Indicator.close();
          if (res.status == 200) {
            Toast("删除成功");
            this.getProspectuses();
          }
        });
      }).catch(() => {
      });
    },
    openBack: function() {
      window.history.back();
    },
    openEdit:function(isEdit){
      this.isEdit = !isEdit;
    },
    refresh() {
      this.contentScroll.refresh();
    },
    getProspectuses: function() {
      var param = {};
      this.textshow = false;
      this.imgshow = false;
      var salesmanId = sessionStorage.getItem('salesmanId');
      if (salesmanId && salesmanId != 'undefined') {
        this.hasProspectusesData = true;
        Indicator.open('加载中...');
        axiosGetAPI('/salesmans/' + salesmanId + '/prospectuses', param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.prospectuses = res.result;
            this.hasProspectusesData = true;
            this.lengths = this.prospectuses.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
              this.isEdit = false;
            } else if (this.lengths == res.page.totalRows) {
              this.textshow = true;
              this.imgshow = false;
            } else {
              this.imgshow = true;
            };
          } else {
            this.textshow = false;
            this.imgshow = false;
            this.hasProspectusesData = false;
            this.isEdit = false;
          }
        });
      } else {
        this.textshow = false;
        this.imgshow = false;
        this.hasProspectusesData = false;
      }

    },
    detail: function(item, e) {
      if (!this.isEdit) {
        e.preventDefault();
        var appId = localStorage.getItem("appId");
        var url = "/combinationPlan/detail?pid=" + item.id + "&readCount=" + item.readCount + "&appId=" + appId;
        this.$router.push({ path: url });
      };
    },
    viewRead:function(item){
      var url = "/combinationPlan/viewers?pid=" + item.id;
      this.$router.push({ path: url });
    }
  },
  mounted() {
    this.getProspectuses();
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
        var param = { offset: this.lengths, limit: this.limit };
        // param.overduedays = this.date
        this.textshow = false;
        this.imgshow = false;
        var salesmanId = sessionStorage.getItem('salesmanId');
        axiosGetAPI('/salesmans/' + salesmanId + '/prospectuses', param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.lengths = this.prospectuses.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
            } else {
              if (this.lengths < res.page.totalRows) {
                this.imgshow = true;
                this.prospectuses = [...this.prospectuses, ...res.result];
              } else {
                this.prospectuses = [...this.prospectuses];
                this.textshow = true;
                this.imgshow = false;
              };
            }
            this.hasProspectusesData = true;
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
.cust-list .ico-call {
  position: absolute;
  top: 22%;
  right: 8%;
  display: block;
  width: 32px;
  height: 32px;
  font-size: 32px;
  border-radius: 50%;
}

.mint-header-button .icon-icon-add {
  font-size: 18px;
}

.down {
  height: 40px;
  text-align: center;
}

.down img {
  width: 35px;
  height: 35px;
  margin-top: 5px;
}

.textshow {
  margin-top: 15px;
  color: #999999
}

</style>
