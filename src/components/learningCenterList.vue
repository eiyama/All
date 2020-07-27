<template>
  <div style="background-color:#FFF">
    <mt-header fixed class="def-header" :title="category">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <div class="vwrppera" ref="vwrppera">
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
</template>
<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../store/store';
import * as types from './../store/types';
import BScroll from 'better-scroll';

export default {
  name: 'home',
  data() {
    return {
      hasData: false,      
      defaultImg: this.src = require('../assets/images/icon-product.png'),
      dailyCoreImg: this.src = require('../assets/images/img-dailyCore.png'),
      trainingImg: this.src = require('../assets/images/img-training-test.png'),
      expandImg: this.src = require('../assets/images/icon-expand-customers.png'),
      newAgentsImg: this.src = require('../assets/images/icon-newAgents.png'),
      saleSkillImg: this.src = require('../assets/images/icon-saleSkill.png'),
      salesTeamImg: this.src = require('../assets/images/icon-salesTeam.png'),
      learningData:[],
      category:'',
      title:"最新资讯",
    }
  },
  components: {
  },
  created() {
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    getDatas: function() {
      this.category = this.$route.query.category;
      Indicator.open('加载中...');
      var url = '/consultation?offset=0&limit=50';
      if (this.category) {
        url = url + '&category=' + this.category;
      } else{
        url = '/consultation?offset=0&limit=100';
        this.category = this.title;
      };
      var self = this;
      axiosGetAPI(url).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          self.learningData = res.result;
          self.lengths = self.learningData.length;
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
    openDetail:function(item){
      this.$router.push({ path: "/learning/detail?itemId=" + item.id + "&modifiedTime=" + item.modifiedTime});
    }
  },
  mounted() {
    this.getDatas();
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
  margin-top: 5px
}

.vwrppera {
  width: 100%;
  /* height: 100%; */
  overflow:auto;
}

.textshow {
  margin-top: 15px;
  color: #999999
}

</style>
