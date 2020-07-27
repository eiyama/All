<template>
  <div class="home" style="background-color:#FFF;height:820px">
    <mt-header fixed class="def-header cust-head" title="我的团队">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="padding-top:48px">
      <hr width="100%" color="#f5f5f5" size="1" />
      <div class="parentWrap" style="color:#333;font-size:12px;padding-left:10px;padding-top:10px;padding-bottom:10px">
        <div class="parentWrap">
          <div class="teamParent" style="background-color: white;">
            <div class="myTeamChild">
              <span style="color:#999;padding-left:15px">我的直辖代理人</span>
            </div>
            <div class="myTeamChild">
              <span style="color:#999;padding-left:15px">我的所辖代理人</span>
            </div>
          </div>
          <div class="teamParent" style="background-color: white;">
            <div class="myTeamChild">
              <span style="color:#333;padding-left:15px;font-size:18px;font-weight:bold">{{teamSummary.salesmanSonCount}}</span>
            </div>
            <div class="myTeamChild">
              <span style="color:#333;padding-left:15px;font-size:18px;font-weight:bold">{{teamSummary.salesmanSubCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="parentWrap" style="margin-top:5px;margin-left:15px;margin-right:15px">
        <table class="mint-table" cellpadding="0" cellspacing="0" >
          <colgroup>
            <col width="50%">
            <col width="50%">
          </colgroup>
          <tr style="background-color:#F9F9F9;font-size: 12px">
            <td>职级</td>
            <td>人数</td>
          </tr>
          <tr style="background-color:white;" v-for='item in teamRankSummary'>
            <td>{{item.name}}</td>
            <td>{{item.count}}</td>
          </tr>
        </table>
      </div>
      <div class="parentWrap" style="color:#333;font-size:12px;padding-left:10px;padding-bottom:10px">
        <div class="parentWrap">
          <div class="teamParent" style="background-color: white;">
            <div class="myTeamChild">
              <span style="color:#999;padding-left:15px">育成一代</span>
            </div>
            <div class="myTeamChild">
              <span style="color:#999;padding-left:15px">育成二代</span>
            </div>
          </div>
          <div class="teamParent" style="background-color: white;">
            <div class="myTeamChild">
              <span style="color:#7093ed;padding-left:15px;font-size:18px;font-weight:bold">{{teamSummary.salesmanBreedFirstCount}}</span>
            </div>
            <div class="myTeamChild">
              <span style="color:#7093ed;padding-left:15px;font-size:18px;font-weight:bold">{{teamSummary.salesmanBreedSecondCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <hr width="100%" color="#f5f5f5" size="1" />
      <div style="color:#7093ed;margin-left:15px;font-size:14px;padding-top:10px;padding-bottom:10px" @click="viewTeam">
          <span>查看我的团队关系></span>
        </div>
      <hr width="100%" color="#f5f5f5" size="1" />
      <div class="splitline"></div>
      <hr width="100%" color="#f5f5f5" size="1" />
      <div class="parentWrap" style="color:#333;font-size:12px;padding-left:10px;padding-top:10px;padding-bottom:10px">
        <div class="parentWrap">
          <div class="teamParent" style="background-color: white;">
            <div class="myTeamChild">
              <span style="color:#999;padding-left:15px">出单数(件):</span>
            </div>
            <div class="myTeamChild">
              <span style="color:#999;padding-left:15px">合计标保(元):</span>
            </div>
          </div>
          <div class="teamParent" style="background-color: white;">
            <div class="myTeamChild">
              <span style="color:#333;padding-left:15px;font-size:18px;font-weight:bold">{{rankTotal}}</span>
            </div>
            <div class="myTeamChild">
              <span style="color:#333;padding-left:15px;font-size:18px;font-weight:bold">{{standardPremiumTotal}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="parentWrap" style="margin-top:5px;margin-left:15px;margin-right:15px">
        <table class="mint-table" cellpadding="0" cellspacing="0" >
          <colgroup>
            <col width="34%">
            <col width="33%">
            <col width="33%">
          </colgroup>
          <tr style="background-color:#F9F9F9;font-size: 12px">
            <td>职级</td>
            <td>出单数</td>
            <td>标保(元)</td>
          </tr>
          <tr style="background-color:white;" v-for='item in bussinessRankSummary'>
            <td>{{item.name}}</td>
            <td>{{item.count}}</td>
            <td>{{item.standardPremium}}</td>
          </tr>
        </table>
      </div>
      <div style="color:#7093ed;margin-left:15px;font-size:14px;padding-top:10px;padding-bottom:10px" @click="viewAll">
          <span>查看我的业绩></span>
        </div>
      <hr width="100%" color="#f5f5f5" size="1" />
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
      myTeamTotal:0,
      myAllTeamTotal:0,
      firstLevel:0,
      secondLevel:0,
      myAllTeamTotal:0,
      rankTotal:0,
      standardPremiumTotal:0,
      teamSummary:{},
      teamRankSummary:[],
      bussinessRankSummary:[],
    }
  },
  created: function() {},
  methods: {
    openBack: function() {
      window.history.back();
    },
    viewAll:function(){
      this.$router.push({ path: '/salesman/performance' });
      // this.$router.push({ path: "/myInfo/performanceList" });
    },
    viewTeam:function(){
      this.$router.push({ path: "/myInfo/teamMember" });
    },
    getTeamSummary:function(){
      ///Salesmans/{salesmanId}/SalesmanTeamSummary
      var salesmanId = sessionStorage.getItem('salesmanId')
      if (salesmanId) {
        var url = '/Salesmans/' + salesmanId + '/SalesmanTeamSummary';
        axiosGetAPI(url).then((res) => {
          Indicator.close();
          if (res.status == 200 && res.result) {
            this.teamSummary = res.result;
          }
        })
        ///Salesmans/{salesmanId}/GetSalesmanTeamRankSummary
        var url = '/Salesmans/' + salesmanId + '/GetSalesmanTeamRankSummary';
        axiosGetAPI(url).then((res) => {
          Indicator.close();
          if (res.status == 200 && res.result) {
            this.teamRankSummary = res.result;
          }
        })
      };
    },
    getBussinessRankSummary:function(){
      ///Salesmans/{salesmanId}/SalesmanBussinessRankSummary
      var salesmanId = sessionStorage.getItem('salesmanId')
      if (salesmanId) {
        var url = '/Salesmans/' + salesmanId + '/SalesmanBussinessRankSummary';
        axiosGetAPI(url).then((res) => {
          Indicator.close();
          if (res.status == 200 && res.result) {
            this.bussinessRankSummary = res.result;
            for (var i = 0; i < this.bussinessRankSummary.length; i++) {
              this.rankTotal += this.bussinessRankSummary[i].count;
              this.standardPremiumTotal += this.bussinessRankSummary[i].standardPremium;
            };
          }
        })
      };
      
    }
  },
  mounted() {
    this.getTeamSummary();
    this.getBussinessRankSummary();
  },
}

</script>
<style scoped>
.splitline{
  height:15px;
  background-color:#F9F9F9;
}
.parentWrap {
  overflow: hidden;
}

.teamParent {
  overflow: hidden;
}

.myTeamChild {
  float: left;
  /* height: 100px; */
  width: calc(50%);
  display: flex;
  background-color: white;
  padding-top:5px;
  font-size: 13px;
}

</style>
