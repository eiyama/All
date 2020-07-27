<template>
  <div style="background-color: #FFF;">
    <mt-header fixed class="def-header cust-head" title="计划书">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openHome">
      </div>
    </mt-header>
    <div style="padding-top:45px;padding-bottom:45px">
      <PlanItem ref="planItem" v-for="(item,index) in items"
      :key="index"
      :index="index"
      :items="items"
      @deleteIndex="del"
      @uploadData="getData"></PlanItem>
    </div>
    <footer>
      <div class="mint-bottom">
        <mt-button type="primary" @click="add" size="large" plain>添加组合产品</mt-button>
        <mt-button type="primary" @click="createProspectus" size="large">生成计划书</mt-button>
      </div>
    </footer>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator } from "mint-ui";
import store from "./../../store/store";
import * as types from "./../../store/types";
import { debug } from "util";
import PlanItem from './combinationPlan';
export default {
  name: "home",
  data() {
    return {
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      items: [{}],
      prospectusDatas:[],
      personInfo:{"applicationName": "","applicationAge": "","applicationSex": "","insuredName": "","insuredAge": "", "insuredSex": ""}
    };
  },
  mounted: function() {
  },
  created: function() {

  },
  components: {
    PlanItem
  },
  methods: {
    openBack:function() {
      window.history.back();
    },
    openHome:function() {
      this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
    },
    createProspectus:function() {
      this.prospectusDatas = [];
      for (var i = 0; i < this.$refs.planItem.length; i++) {
        this.$refs.planItem[i].getProspectus();
        var prospectusData = this.$refs.planItem[i].prospectusData;
        if (!this.$refs.planItem[i].canCommit) {
          return;
        };
        this.prospectusDatas.push(prospectusData);
      };
      // this.prospectusDatas.push(self.prospectusData);
      console.log(this.prospectusDatas);
      Indicator.open('加载中...');
      var salesmanId = sessionStorage.getItem('salesmanId');
      axiosPostAPI('/salesmans/' + salesmanId + '/prospectuses', this.prospectusDatas).then((res) => {
        Indicator.close();
        if (res.status == 200) {
          var appId = localStorage.getItem("appId");
          var localToken = localStorage.getItem('token');
          if (localToken) {
            localToken = localToken.replace(appId + '_', '');
          }
          var url = "/combinationPlan/detail?pid=" + res.result.prospectusId +
            "&appId=" + appId;// + "&token=" + encodeURIComponent(localToken);
          this.$router.push({ path: url });
        }
      });
    },
    add: function () {
      if (this.$refs.planItem.length>0) {
        this.$refs.planItem[0].getProspectus();
        var planItem = this.$refs.planItem[0];
        var prospectusData = planItem.prospectusData;

        if (planItem.insCorpName == null || planItem.insCorpName == '') {
          Toast("请选择保险公司");
          return;
        }
        if (planItem.primaryProduct.shortName == null || planItem.primaryProduct.shortName == '') {
          Toast("请选择保险产品");
          return;
        }
        if (prospectusData.applicationName == null || prospectusData.applicationName == '') {
          Toast("请输入投保人姓名");
          return;
        }
        if (prospectusData.applicationAge == null || prospectusData.applicationAge == '') {
          Toast("请选择投保人年龄");
          return;
        }
        if (prospectusData.applicationSex == null || prospectusData.applicationSex == '') {
          Toast("请选择投保人性别");
          return;
        }
        if (prospectusData.insuredName == null || prospectusData.insuredName == '') {
          Toast("请输入被保人姓名");
          return;
        }
        if (prospectusData.insuredAge == null || prospectusData.insuredAge == '') {
          Toast("请选择被保人年龄");
          return;
        }
        if (prospectusData.insuredSex == null || prospectusData.insuredSex == '') {
          Toast("请选择被保人性别");
          return;
        }

        this.personInfo.applicationName = prospectusData.applicationName;
        this.personInfo.applicationAge = prospectusData.applicationAge;
        this.personInfo.applicationSex = prospectusData.applicationSex;
        this.personInfo.insuredName = prospectusData.insuredName;
        this.personInfo.insuredAge = prospectusData.insuredAge;
        this.personInfo.insuredSex = prospectusData.insuredSex;
      };
      this.items.push(this.personInfo)
    },
    // delete student
    del: function (index) {
      //  not allow to delete the first
      if (index !== 0) {
        this.items.splice(index, 1)
        console.log('deleted:', JSON.stringify(this.items))
      }
    },
    //  get the data from child
    getData: function (val) {
      var index = val.index
      this.items[index] = val.data
      console.log('I got the data:', JSON.stringify(this.items))
    }
  }
};

</script>
<style scoped>
main {
  padding: 48px 0;
}

.same-as-applicant {
  display: flex;
  align-items: center;
}

.same-as-applicant .mint-switch {
  width: auto;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

footer button {
  border-radius: 0;
}

</style>
