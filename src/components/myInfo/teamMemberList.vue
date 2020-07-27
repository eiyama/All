<template>
  <div class="home" style="background-color:#FFF;">
    <mt-header fixed class="def-header cust-head" title="团队关系">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="padding-top:48px;background-color:#FFF;width:100%;height: 100%;position: absolute;">
      <hr width="100%" color="#f5f5f5" size="1" />
      <div class="parentWrap" style="color:#333;font-size:12px;">
        <van-row>
          <van-col span="8" style="line-height: 40px;font-size: 15px;font-weight: 600;text-align: center;border: 1px solid #eee;">
            我的直辖
          </van-col>
          <van-col span="8" style="line-height: 40px;font-size: 15px;font-weight: 600;text-align: center;border: 1px solid #eee;">
            我的一级直辖
          </van-col>
          <van-col span="8" style="line-height: 40px;font-size: 15px;font-weight: 600;text-align: center;border: 1px solid #eee;">
            我的二级直辖
          </van-col>
        </van-row>
        <div class="non-data" v-show="noData">
          <p>您还没有好友哦，赶紧去邀请吧。</p>
        </div>
        <van-row style="background-color:#FFF;" type="flex" justify="end">
          <van-col span="8" style="border:0.1px solid #F3F3F3">
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad" style="width:100%">
              <!-- <van-cell v-for="item in personData" :key="item" :title="item" icon="location-o" is-link/> -->
              <div v-for="(item,index) in personData" :key="index" style="height:45px;border:0.1px solid #F5F5F5;" @click="onLoadFirst(index, item)">
                <p :class="{classA:currentIndex == index}" style="display:flex;align-items:center;font-size:14px;color:#333;
                height:100%;padding: 0 10px;justify-content: space-between;">
                  <span style="display: flex;align-items: center;">
                    <van-icon name="contact" style="margin-right:5px" />
                    <p  @click="openInfo(item)"> {{item.name}}</p>
                  </span>
                  <van-icon name="arrow" style="margin-left:10px"/>
                </p>
              </div>
            </van-list>
          </van-col>
          <van-col span="8" style="border:0.1px solid #F3F3F3">
            <van-list style="width:100%">
              <!-- <van-cell v-for="item in personFirstData" :key="item" :title="item" /> -->
              <div v-for="(item,index) in personFirstData" :key="index" style="height:45px;border:0.1px solid #F5F5F5;" @click="onLoadSecond(index, item)">
                <p :class="{classA:currentIndexB == index}" style="display:flex;align-items:center;font-size:14px;color:#333;
                height:100%;padding: 0 10px;justify-content: space-between;">
                  <span style="display: flex;align-items: center;">
                    <van-icon name="contact" style="margin-right:5px" />
                    <p  @click="openInfo(item)"> {{item.name}}</p>
                  </span>
                  <van-icon name="arrow" style="margin-left:10px"/>
                </p>
              </div>
            </van-list>
          </van-col>
          <van-col span="8" style="border:0.1px solid #F3F3F3">
            <van-list style="width:100%">
              <!-- <van-cell v-for="item in personSecondData" :key="item" :title="item" /> -->
              <div v-for="(item,index) in personSecondData" :key="index" style="height:45px;border:0.1px solid #F5F5F5;">
                <p style="display:flex;align-items:center;font-size:14px;color:#333;height:100%;padding-left:10px">
                  <van-icon name="contact" style="margin-right:5px"/>
                  <span @click="openInfo(item)">{{item.name}}</span>
                </p>
              </div>
            </van-list>
          </van-col>
        </van-row>
        <mt-button class="btn-fixed" type="primary" size="large" @click="myQr" v-show="noData">邀请好友</mt-button>
        <mt-popup v-model="showInfo" position="middle" popup-transition="popup-fade" style="width:65%;height:250px;border-radius:5px">
          <div class="teammessagecc">
            <div style="margin-top:5px;margin-bottom:5px;padding-top:15px;padding-left:15px;padding-right:15px;text-align:center">
              <img class="member-head" :src="itemData.headImageUrl ? itemData.headImageUrl: avatar" alt="">
              <p style="font-size:20px;color:#333;font-weight:bold">{{itemData.name}}</p>
              <p style="font-size:13px;color:#666;margin-top:10px"></p>
              <p style="font-size:13px;color:#333;margin-top:3px">公司: <span style="color:#666">{{itemData.organName}}</span></p>
              <p style="font-size:13px;color:#333;margin-top:3px">部门: <span style="color:#666">{{itemData.deptName}}</span></p>
              <p style="font-size:13px;color:#333;margin-top:3px">工号: <span style="color:#666">{{itemData.jobNumber}}</span></p>
              <p style="font-size:13px;color:#333;margin-top:3px">注册日期: <span style="color:#666">{{itemData.hiredate}}</span></p>
              <p style="font-size:13px;color:#333;margin-top:3px">联系方式: <span style="color:#666">{{itemData.mobile}}</span></p>
            </div>
          </div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';
export default {
  name: 'home',
  data() {
    return {
      noData: false,
      personData: [],
      personFirstData: [],
      personSecondData: [],
      itemData: { "id": "", "linkedUser": "", "name": "", "organName": "", "deptName": "", "status": "", "hiredate": "", "modifier": "", "modifiedTime": "" },
      rightImg: this.src = require('../../assets/images/right.png'),
      showInfo: false,
      rankName: '',
      loading: false,
      finished: false,
      firstLoading: false,
      firstFinished: false,
      secondLoading: false,
      secondFinished: false,
      currentIndex: -1,
      currentIndexB: -1,
      avatar: this.src = require('../../assets/images/img-avatar.png'),
    }
  },
  created: function() {

  },
  methods: {
    myQr: function() {
      var referrerMobile = sessionStorage.getItem('referrerMobile');
      var nickName = sessionStorage.getItem('nickName');
      var appTitle = sessionStorage.getItem('title');
      var appId = localStorage.getItem('appId');
      this.$router.push({
        path: '/myInfo/myInviteQr?title=' + appTitle + '&appId=' + appId + '&nickName=' + nickName +
          '&referrerMobile=' + referrerMobile
      });
    },
    onLoad() {
      // 异步更新数据
      this.personFirstData = [];
      this.personSecondData = [];
      setTimeout(() => {
        this.getReferrals();
      }, 500);
    },
    onLoadFirst(index, item) {
      // 异步更新数据
      this.currentIndex = index;
      this.currentIndexB = -1;
      this.personFirstData = [];
      this.personSecondData = [];
      setTimeout(() => {
        Indicator.open('加载中...');
        this.firstLoading = true;
        this.getFirst(item);
      }, 500);
    },
    onLoadSecond(index, item) {
      // 异步更新数据
      this.currentIndexB = index;
      this.personSecondData = [];
      setTimeout(() => {
        this.secondLoading = true;
        Indicator.open('加载中...');
        this.getSecond(item)
      }, 500);
    },
    openInfo: function(item) {
      this.showInfo = true;
      this.itemData = item;
      axiosGetAPI('/Ranks/' + item.id).then((d) => {
          Indicator.close();
          if (d.status == 200 && d.result) {
            this.rankName = d.result.rankName;
          }
        })
    },
    closeInfo: function() {
      this.showInfo = false;
    },
    openBack: function() {
      window.history.back();
    },
    getFirst: function(item) {
      ///Salesmans/{salesmanId}/Referrals
      var url = '/Salesmans/' + item.id + '/Referrals';
      axiosGetAPI(url).then((res) => {
        Indicator.close();
        this.firstLoading = false;
        if (res.status == 200 && res.result) {
          this.personFirstData = res.result;
        }
        this.firstFinished = true;
      })
    },
    getSecond: function(item) {
      ///Salesmans/{salesmanId}/Referrals
      var url = '/Salesmans/' + item.id + '/Referrals';
      axiosGetAPI(url).then((res) => {
        Indicator.close();
        this.secondLoading = false;
        if (res.status == 200 && res.result) {
          this.personSecondData = res.result;
        }
        this.secondFinished = false;
      })
    },
    getReferrals: function() {
      ///Salesmans/{salesmanId}/Referrals
      var salesmanId = sessionStorage.getItem('salesmanId')
      if (salesmanId) {
        var url = '/Salesmans/' + salesmanId + '/Referrals';
        axiosGetAPI(url).then((res) => {
          Indicator.close();
          this.loading = false;
          if (res.status == 200 && res.result && res.result.length > 0) {
            this.personData = res.result;
            this.noData = false;
          } else{
            this.noData = true;
          }
          this.finished = true;
        })
      };
    },
  },
  mounted() {
  },
}

</script>
<style scoped>
.splitline {
  height: 15px;
  background-color: #F9F9F9;
}

.parentWrap {
  overflow: hidden;
}

.memberParent {
  overflow: hidden;
}

.memberChild {
  float: left;
  /* height: 100px; */
  width: calc(33.27%);
  display: flex;
  background-color: white;
  padding-top: 5px;
  font-size: 13px;
}

.teammessagecc {
  height: 100%;
  width: 100%;
}

.classA {
  background-color: #F9F9F9;
  border: 0.1px solid #FFF;
}
.tabtitle{
  color:#333;
  padding-left:16px;
  padding-top:10px;
  padding-bottom:10px;
  font-weight:bold;
  font-size:15px;
}

.member-head {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: #eee;
  border-radius: 50%;
}

</style>
