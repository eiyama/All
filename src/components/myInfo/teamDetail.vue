<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header class="def-header cust-head" title="我的团队">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
       <div slot="right" @click="showExplain = true">
         <mt-button > <p style="color:#4A66FE;font-size:14px;">车险基本法</p></mt-button>
      </div>
    </mt-header>
    <div class="main">
      <div class="main_header">
            <span class="amountBox">
                <h4>群主累计奖励</h4>
                <span>
                    <p>{{ totalGroupOwnerBouns }}</p>
                </span>
            </span>
            <div class="team">
                <div class="teamItem" @click="toMyteam">
                    <h4>团队成员</h4>
                     <span>
                         <p>{{ownerReferralCount}}</p>
                         <van-icon name="arrow" />
                     </span>
                </div>
                <div class="teamItem">
                    <h4>已出单成员数</h4>
                     <span>
                         <p>{{ownerReferralInsuredCount}} </p>
                         <!-- <van-icon name="arrow" /> -->
                     </span>
                </div>
                <div class="teamItem">
                    <h4>累计团队保费</h4>
                     <span>
                         <p>{{ totalBsPremiums  }}</p>
                         <!-- <van-icon name="arrow" /> -->
                     </span>
                </div>
                
            </div> 
      </div>
      <div class="main_body" >
          <h4>团队详细信息</h4> 
            <!-- <p class="list">业务员/群主：{{salesmanName}}</p>
            <p class="list">是否为群主：{{isGroupOwner ? "是" : "否"}}</p>
            <p class="list">群主等级：{{groupOwnerLevel}}</p>
            <p class="list">账单日期范围：{{startTime}} 至 {{endTime}}</p>
            <span class="listItem"><p>本群周期内商业险保费：</p><p style="color:#4A66FE" >{{groupBsPremiums}}</p></span>
            <span class="listItem"><p>群主商业险保费：</p><p style="color:#4A66FE" >{{ ownerBsPremiums}}</p></span>
            <p class="list">本群奖励系数：{{groupCoefficient}}</p>
            <p class="list">本群成长因子：{{groupGrowthFactor}}</p>
            <span class="listItem"><p>子群商业险保费：</p><p style="color:#4A66FE" >{{subGroupBsPremiums}}</p></span>
            <p class="list">子群奖励系数：{{subGroupCoefficient}}</p>
            <span class="listItem"><p>群主奖金（元）：</p><p style="color:#4A66FE" >{{groupOwnerBonus}}</p></span> -->
            <table class="mint-table" cellpadding="0" cellspacing="0">
            <colgroup>
              <col width="35%">
              <col width="65%">
              <col>
            </colgroup>
            <tr>
              <th>是否为群主</th>
              <td>{{isGroupOwner ? "是" : "否"}}</td>
            </tr>
              <tr>
              <th>群主等级</th>
              <td>{{groupOwnerLevel}}</td>
            </tr>
            <tr>
              <th>账单日期范围</th>
              <td>{{startTime}}<br> 至<br> {{endTime}}</td>
            </tr>
              <tr>
              <th>本群商业险保费</th>
              <td>{{groupBsPremiums}}</td>
            </tr>
            <tr>
              <th>群主商业险保费</th>
              <td>{{ownerBsPremiums}}</td>
            </tr>
            <tr>
                <th>子群保费规模</th>
                <td>{{nextLevelGroupBsPremiums}}</td>
            </tr>
            <tr>
              <th>本群奖励系数</th>
              <td>{{groupCoefficient}}</td>
            </tr>
              <tr>
              <th>本群成长因子</th>
              <td>{{groupGrowthFactor}}</td>
            </tr>
            <tr>
              <th>子群商业险保费</th>
              <td>{{subGroupBsPremiums}}</td>
            </tr>
             <tr>
              <th>子群奖励系数</th>
              <td>{{subGroupCoefficient}}</td>
            </tr>
            <tr>
              <th>本群奖金（元）</th>
              <td>{{groupBonus}}</td>
            </tr>
            <tr>
              <th>群主奖金（元）</th>
              <td>{{groupOwnerBonus}}</td>
            </tr>
          </table>
      </div>
       <van-popup v-model="showExplain" position="bottom" >
          <mt-header fixed class="def-header cust-head" title="车险奖励基本法">
            <div slot="left" @click="showExplain = false">
              <van-icon name="cross" size="18px" />
            </div>
          </mt-header>
          <div style="height:100%;width:100%;margin-top:50px;">
            <img :src="zxExplain" alt="" style="width:100%">
          </div>
        </van-popup>
    </div>
  </div>
</template>
<script>
import { Toast,Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
export default {
  name: 'home',
  data() {
    return {
        salesmanId:'',
        salesmanName: '',
        salesOrgName: '' ,
        startTime : '' ,
        endTime : '',
        ownerBsPremiums : '' ,
        ownerReferralCount : '' ,
        ownerReferralInsuredCount : '' ,
        isGroupOwner : '' ,
        groupOwnerLevel : '' ,
        groupBsPremiums : '' ,
        totalBsPremiums:'',
        groupCoefficient : '',
        groupGrowthFactor : '',
        groupBonus : '',
        subGroupBsPremiums : '',
        nextLevelGroupBsPremiums:'',
        subGroupCoefficient : '',
        subGroupBonus : '' ,
        groupOwnerBonus : '',
        totalGroupOwnerBouns :'',
        zxExplain:this.src = require('../../assets/images/zxExplain.png'),
        showExplain:false
    }
  },
  created: function() {
      this.salesmanId = sessionStorage.getItem('salesmanId');
        Indicator.open('请稍等');
      axiosGetAPI('/ZhongXing/GroupOwner/'+ this.salesmanId).then(res=>{
            Indicator.close();
            if(res.status == "200"){
                 this.ownerReferralCount = res.result.ownerReferralCount;
                 this.ownerReferralInsuredCount = res.result.ownerReferralInsuredCount 
                 this.salesmanName = res.result.salesmanName;
                 this.salesOrgName = res.result.salesOrgName;
                 this.startTime = res.result.startTime;
                 this.endTime = res.result.endTime;
                 this.ownerBsPremiums = res.result.ownerBsPremiums;
                 this.groupOwnerLevel = res.result.groupOwnerLevel;
                 this.isGroupOwner = res.result.isGroupOwner 
                 this.groupBsPremiums = res.result.groupBsPremiums;
                 this.nextLevelGroupBsPremiums = res.result.nextLevelGroupBsPremiums;
                 this.groupCoefficient = res.result.groupCoefficient;
                 this.groupGrowthFactor = res.result.groupGrowthFactor 
                 this.groupBonus = res.result.groupBonus;
                 this.subGroupBsPremiums = res.result.subGroupBsPremiums;
                 this.subGroupCoefficient = res.result.subGroupCoefficient;
                 this.subGroupBonus = res.result.subGroupBonus 
                 this.groupOwnerBonus = res.result.groupOwnerBonus;
                 this.totalBsPremiums = res.result.totalBsPremiums;
                 this.totalGroupOwnerBouns = res.result.totalGroupOwnerBouns ;
                 if(!res.result.isGroupOwner){
                     Toast('您还未成为群主');
                 }
            }
      })
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    toMyteam(){
        this.$router.push('/myInfo/myTeam');
    }
  }
}

</script>
<style scoped>
    .main_header{
        padding: 15px;
         background: #FFFFFF;
    }
    .main_header .amountBox{
        text-align: center;
    }
    .main_header .amountBox span{ display: flex;align-items: baseline;justify-content: center;}
    .main_header .amountBox h4{color:#999;font-size: 14px;font-weight: normal;}
    /* .main_header .amountBox span p:nth-child(1){color: #333;font-size: 16px;} */
    .main_header .amountBox span p{color: #333;font-size: 36px;}
    .team{display: flex;justify-content: space-around; align-items: center;}
    .team .teamItem h4{ font-size: 14px;color: #999;font-weight: normal;}
    .teamItem span{display: flex;justify-content: center;align-items: center;}
    .main_body { padding: 15px; color: #333; font-size: 14px;background-color: #fff;    margin-top: 15px;}
    .main_body h4{font-size: 16px}
    .main_body .list { line-height: 30px;}
    .listItem{display: flex;align-items: center;line-height: 30px;}
    .mint-table td{text-align: right}
    .mint-table {
         text-align: left;
        margin-top: 10px;
            font-size: 14px;
    }

</style>
