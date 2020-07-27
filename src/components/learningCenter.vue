<template>
  <div class="home" style="background-color: #FFF;">
    <mt-header fixed class="def-header cust-head" title="云学院">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="padding-top:48px">
      <div style="background-color:#FFF;border-radius:5px;" @click="newFeature" v-show="false">
        <img :src="dailyCoreImg" style="height:100%;width:100%;">
      </div>
      <div class="parentWrap" style="background-color:#F5F5F5;">
        <div class="parentWrap" style="margin:10px;padding:10px;background-color:#FFF;border-radius:5px;">
          <div class="hparent" style="background-color: white;margin-top:5px;">
            <div class="lChild" @click="openList('新人晋升')">
              <img :src="newAgentsImg" style="height:48px;width:48px">
            </div>
            <div class="lChild" @click="openList('营销技巧')">
              <img :src="saleSkillImg" style="height:48px;width:48px">
            </div>
            <div class="lChild" @click="openList('增员技巧')">
              <img :src="expandImg" style="height:48px;width:48px">
            </div>
            <div class="lChild" @click="openList('团队经营')">
              <img :src="salesTeamImg" style="height:48px;width:48px">
            </div>
          </div>
          <div class="hparent" style="background-color: white;text-align:center;color:#505050">
            <div class="lChild2">
              <P>新人晋升</P>
            </div>
            <div class="lChild2">
              <P>营销技巧</P>
            </div>
            <div class="lChild2">
              <P>增员技巧</P>
            </div>
            <div class="lChild2">
              <P>团队经营</P>
            </div>
          </div>
        </div>
      </div>
      <div style="background-color:#FFF;border-radius:5px;" @click="newFeature" v-show="false">
        <img :src="trainingImg" style="height:100%;width:100%;">
      </div>
      <div style="margin-top:10px;height:30px;background-color:#FFF">
        <span style="float:left;margin-left:10px;font-size:16px">最新资讯</span>
        <div style="float:right;color:#7093ed;text-align:center;font-size:12px;margin-bottom:5px;margin-right:10px;height:25px;width:72px;font-size:14px" @click="viewAll">
          <span>更多资讯</span>
        </div>
        <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
        <div>
          <ul class="mint-region" v-show="hasData">
            <li class="mint-cell" v-for="item in learningData">
              <div style="padding-bottom:15px;padding-top:15px;min-height:64px" @click="openDetail(item)">
                <img :src="item.coverMediaUrl ? item.coverMediaUrl : item.coverImg" style="width: 60px;height: 60px;" slot="left">
                <p style="margin-left: 70px;margin-top: -60px;margin-right: 30px;color:#333;font-size: 16px">
                  <span>{{item.title}}</span>
                </p>
                <p style="margin-left: 70px;color:#999;font-size: 12px;margin-right: 30px;min-height:12px;">
                  <span>{{item.description}}</span>
                </p>
                <p style="margin-left: 70px;color:#999;font-size: 12px;margin-right: 30px">
                  <span>{{item.classify ? "[" + item.classify + "]":"其他"}} {{item.modifiedTime}}</span>
                </p>
              </div>
              <hr width="100%" color="#f5f5f5" size="1" />
              <i class="ico-arrow" style="margin-right:10px"></i>
            </li>
          </ul>
          <div class="non-data" v-show="!hasData">
            <p>暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../common/Axios';
import { Indicator } from 'mint-ui';
import bottomAllTab from './bottomtab/bottom-all-tab'
import store from './../store/store'
import * as types from './../store/types';
import axios from 'axios'
export default {
  name: 'home',
  data() {
    return {
      closeImg: this.src = require('../assets/images/ico-closew.png'),
      dailyCoreImg: this.src = require('../assets/images/img-dailyCore.png'),
      trainingImg: this.src = require('../assets/images/img-training-test.png'),
      expandImg: this.src = require('../assets/images/icon-expand-customers.png'),
      newAgentsImg: this.src = require('../assets/images/icon-newAgents.png'),
      saleSkillImg: this.src = require('../assets/images/icon-saleSkill.png'),
      salesTeamImg: this.src = require('../assets/images/icon-salesTeam.png'),
      defaultImg: this.src = require('../assets/images/icon-product.png'),
      hasData:false,
      learningData:[],
    }
  },
  components: {
  },
  created: function() {
    this.getDatas();
  },
  methods: {
    getDatas: function() {
      var self = this;
      Indicator.open('加载中...');
      axiosGetAPI('/consultation?offset=0&limit=10').then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          self.learningData = res.result;
          self.lengths = self.learningData.length
          self.hasData = (self.lengths > 0);
          for (var i = 0; i < self.lengths; i++) {
            var item = self.learningData[i];
            if(item.category == "新人晋升"){
              item.coverImg = self.newAgentsImg;
            } else if(item.category == "营销技巧"){
              item.coverImg = self.saleSkillImg;
            } else if(item.category == "增员技巧"){
              item.coverImg = self.expandImg;
            } else if(item.category == "团队经营"){
              item.coverImg = self.salesTeamImg;
            }
          };
        } else {
          self.hasData = false;
        }
      });
    },
    openBack: function() {
      window.history.back();
    },
    openList:function(category){
      this.$router.push({ path: "/learning/list?category=" + category});
    },
    newFeature:function(){
      this.$router.push({ path: "/newFeature" });
    },
    viewAll:function(){
      this.$router.push({ path: "/learning/list"});
    },
    openDetail:function(item){
      this.$router.push({ path: "/learning/detail?itemId=" + item.id 
        + "&modifiedTime=" + item.modifiedTime + "&appId=" + localStorage.getItem('appId')});
    }
  }
}

</script>
<style scoped>
.parentWrap {
  overflow: hidden;
}

.lparent {
  overflow: hidden;
}

.lChild {
  float: left;
   /* height: 100px; */
  width: calc(25%);
  display: flex;
  text-align:center;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color:#505050;
}

.lChild1 {
  float: left;
  /* height: 100px; */
  width: calc(47%);
  align-items: center;
  justify-content: center;
  margin-left:8px;
  padding-bottom:5px;
  font-size: 12px;
  color:#505050;
}

.lChild2 {
  float: left;
  height: 25px;
  width: calc(25%);
  display: flex;
  text-align:center;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color:#505050;
}
.lChild3 {
  float: left;
   /* height: 100px; */
  width: calc(50%);
  padding-top: 10px;
  padding-bottom: 5px;
  display: flex;
  text-align:center;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color:white;
}
.lChild4 {
  float: left;
   /* height: 100px; */
  width: calc(50%);
  padding-top: 5px;
  padding-bottom: 10px;
  display: flex;
  text-align:center;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color:white;
}
</style>
