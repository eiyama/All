<template>
  <div class="home" :style="mainStyle">
    <mt-header fixed class="def-header cust-head" title="我的奖励">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="main">
        <div class="mainItem">
            <h2 class="itemTitle">本期本群奖励</h2>
             <div class="team">
                <div class="teamItem" >                  
                    <span>
                         <p >{{groupBsPremiums}}</p>
                    </span> 
                    <h4>本群商业险保费</h4> 
                </div>
                 <div class="teamItem">
                    <span>
                         <p>{{groupCoefficient }}</p>
                     </span>
                    <h4>本群奖励系数</h4>
                </div>
                <div class="teamItem">
                    <span>
                        <p class="level">{{groupBonus}}</p>
                     </span>
                    <h4>本群奖励金额</h4>
                </div>
            </div> 
        </div>
        <div class="mainItem">
            <h2 class="itemTitle">本期子群群奖励</h2>
             <div class="team">
                <div class="teamItem" >                  
                    <span>
                         <p >{{subGroupBsPremiums}}</p>
                    </span> 
                    <h4>子群商业险保费</h4> 
                </div>
                 <div class="teamItem">
                    <span>
                         <p>{{subGroupCoefficient  }}</p>
                     </span>
                    <h4>子群奖励系数</h4>
                </div>
                <div class="teamItem">
                    <span>
                        <p class="level">{{subGroupBonus }}</p>
                     </span>
                    <h4>子群奖励金额</h4>
                </div>
            </div> 
        </div>

        <div class="mainItem">
              <h2 class="itemTitle" style="margin:0">出单清单</h2>
              <!-- <p class="itemDiscreption">出单{{outPolicyList.premium}}笔，保费约{{outPolicyList.premium}}元</p> -->
              <div class="itemList" v-for="(item,index) in outPolicyList" :key = index> 
                  <p class="listFirst">{{item.insuredTime}}</p>
                  <span  class="listSecond"><p>{{item.ownerType}} - {{item.sellerName}}</p>  <p  class="level"></p></span> 
                  <p class="listThird">{{item.plateNo}}   {{item.insCorpName}} |  保费{{item.premium}}</p>
              </div>
              <p v-show="outPolicyList.length < 1" class="noneList">本期暂无清单数据</p>
              <!-- <div class="itemList">
                  <p class="listFirst">2020-01-10 12:36:20</p>
                  <span  class="listSecond"><p>本群—出单人</p>  <p  class="level">123.00元</p></span> 
                  <p class="listThird">粤B111111   人保商业险 | 保费8652.32</p>
              </div>
              <div class="itemList">
                  <p class="listFirst">2020-01-10 12:36:20</p>
                  <span  class="listSecond"><p>本群—出单人</p>  <p  class="level">123.00元</p></span> 
                  <p class="listThird">粤B111111   人保商业险 | 保费8652.32</p>
              </div>
              <div class="itemList">
                  <p class="listFirst">2020-01-10 12:36:20</p>
                  <span  class="listSecond"><p>本群—出单人</p>  <p  class="level">123.00元</p></span> 
                  <p class="listThird">粤B111111   人保商业险 | 保费8652.32</p>
              </div>
              <div class="itemList">
                  <p class="listFirst">2020-01-10 12:36:20</p>
                  <span  class="listSecond"><p>本群—出单人</p>  <p  class="level">123.00元</p></span> 
                  <p class="listThird">粤B111111   人保商业险 | 保费8652.32</p>
              </div> -->
        </div>

    </div>
  </div>
</template>
<script>
import { Toast,Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import echarts from "echarts";

export default {
  // name: 'home',
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
        showExplain:false,
        mainStyle:{
          "backgroundColor":"#eaeaea",
          // "paddingBottom":"10px",
          "minHeight":''
        },
        outPolicyList:[],
    }
  },
  mounted: function() {
    var h = window.innerHeight;
    this.mainStyle.minHeight = h + 'px';
      this.salesmanId = sessionStorage.getItem('salesmanId');
      var billId = this.$route.query.billId;
      Indicator.open()
      axiosGetAPI('ZhongXing/GroupOwner/' +  this.salesmanId + '/Bills/' + billId).then(res=>{
        Indicator.close();
        if(res.status == 200){
          this.outPolicyList = res.result;
        }
      })
      var groupowner = JSON.parse(sessionStorage.getItem('GroupOwner'));
                 this.ownerReferralCount =groupowner.ownerReferralCount;
                 this.ownerReferralInsuredCount =groupowner.ownerReferralInsuredCount 
                 this.salesmanName =groupowner.salesmanName;
                 this.salesOrgName =groupowner.salesOrgName;
                 this.startTime =groupowner.startTime;
                 this.endTime =groupowner.endTime;
                 this.ownerBsPremiums =groupowner.ownerBsPremiums;
                 this.groupOwnerLevel =groupowner.groupOwnerLevel;
                 this.isGroupOwner =groupowner.isGroupOwner 
                 this.groupBsPremiums =groupowner.groupBsPremiums;
                 this.nextLevelGroupBsPremiums =groupowner.nextLevelGroupBsPremiums;
                 this.groupCoefficient =groupowner.groupCoefficient;
                 this.groupGrowthFactor =groupowner.groupGrowthFactor 
                 this.groupBonus =groupowner.groupBonus;
                 this.subGroupBsPremiums =groupowner.subGroupBsPremiums;
                 this.subGroupCoefficient =groupowner.subGroupCoefficient;
                 this.subGroupBonus =groupowner.subGroupBonus 
                 this.groupOwnerBonus =groupowner.groupOwnerBonus;
                 this.totalBsPremiums =groupowner.totalBsPremiums;
                 this.totalGroupOwnerBouns =groupowner.totalGroupOwnerBouns;
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    toMyteam(){
        this.$router.push('/myInfo/myTeam');
    },
   
   
  }
}

</script>
<style scoped>
    .main{padding-top: 49px;}
    .mainItem{
        margin: 10px 15px;
        border-radius: 5px;
        border: 1px solid #e3e6eb;
        padding: 12px 12px 25px 12px;
        background: #fafbfc;
    }
    .itemTitle{margin-bottom:16px;font-size: 16px;font-weight: bold;}
    .team{display: flex;justify-content: space-between; align-items: center;    margin-top: 10px;}
    .team .teamItem h4{ font-size: 13px;color: #474747;font-weight: normal;}
    .teamItem span{display: flex;justify-content: center;align-items: center;}
    .teamItem span p{ font-size: 18px; font-weight: bold;}
    .itemDiscreption{font-size: 14px;color: #474747;display: flex;}
    .level{color: #e60012}
    .progressLeVel{background: #e60012;height: 17px;border-radius: 10px; text-align: center;color: #fff;line-height: 17px;font-size: 11px;}
    .headerTitle{text-align: center;font-size: 16px;color:#333;}
    .itemList{border: 1px solid #f0f1f1;padding: 15px 25px; margin:9px 0;background: #fff;border-radius: 5px;}
    .itemList .listFirst{font-size: 14px;color: #666666;}
    .itemList .listSecond{color: #000;display: flex;justify-content: space-between;}
    .itemList .listThird{font-size: 14px;color: #666666;}
    .noneList{
      color: #999;
    font-size: 12px;
    margin-top: 5px;
    }
</style>
