<template>
  <div>
    <mt-header fixed class="def-header" title="补充信息">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="followInAdd" style="margin-top:48px">
      <!-- <van-cell-group>
        <van-field v-model="model.name" clearable label="车主名" placeholder="车主名" />
      </van-cell-group> -->
      <!-- 保险公司 -->
      <van-field readonly clickable label="上年保险公司" :value="CompaniesValue" placeholder="选择保险公司" @click="CompaniesStatus = true" right-icon="arrow" style="margin: 10px 0px" />
      <van-popup v-model="CompaniesStatus" position="bottom">
        <van-picker show-toolbar :columns="CompaniesshortName" @cancel="CompaniesStatus = false" @confirm="onCompanies" />
      </van-popup>
      <!-- 证件号 -->
      <!-- <van-cell-group>
        <van-field style="margin: 10px 0px" v-model="model.idCard" clearable label="证件号后6位" placeholder="证件号后6位" size='6' />
      </van-cell-group> -->
      <!-- 交强险到期时间 -->
      <van-field class="colWidth" readonly clickable label="商业险到期时间" :value="model.bsLastYearEndDate" placeholder="选择商业险到期时间" @click="showPickerBSTime = true" right-icon="arrow" style="margin: 10px 0px" />
      <van-popup v-model="showPickerBSTime" position="bottom">
        <van-datetime-picker v-model="currentBSDate" type="date" @cancel="cancel" @confirm="confirmbsTime" />
      </van-popup>
      <!--      <van-cell-group>
        <van-field class="controlWidth" v-model="bsLatestEndDate"  clearable label="交强险到期时间"  placeholder="交强险到期时间"/>
      </van-cell-group> -->
      <!--  商业险到期时间-->
      <van-field class="colWidth" readonly clickable label="交强险到期时间" :value="model.bzLastYearEndDate" placeholder="选择交强险到期时间" @click="showPickerBZTime = true" right-icon="arrow" style="margin: 10px 0px" />
      <van-popup v-model="showPickerBZTime" position="bottom">
        <van-datetime-picker v-model="currentBZDate" type="date" @cancel="cancel" @confirm="confirmbzTime" />
      </van-popup>
      <!--    <van-cell-group>
        <van-field v-model="bzLatestEndDate"  clearable label="商业险到期时间" placeholder="商业险到期时间" />
      </van-cell-group> -->
      <!-- <van-cell-group>
        <van-field style="margin: 10px 0px" v-model="model.VIN" clearable label="车架号" placeholder="车架号" />
      </van-cell-group> -->
      <!-- 保存按钮 -->
      <div class="btn_addFollowIn">
        <mt-button @click="updateFollowIn" type="primary" size="large">保存</mt-button>
        <!-- <p @click="openBack">取消</p> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from "./../../common/Axios";
import bottomTab from "./../bottomtab/bottom-tab";
import store from "./../../store/store";
import * as types from "./../../store/types";
export default {
  data() {
    return {
      customerId: "",
      CompaniesCode: [''],
      CompaniesValue: '',
      CompaniesshortName: ['请选择'],
      CompaniesStatus: false,
      showPickerBSTime: false,
      currentBSDate: new Date(),
      currentBZDate: new Date(),
      bzLatestEndDate: '',
      showPickerBZTime: false,
      VIN: '',
      idCard: '',
      selected:'',
      model: {
       "name": "",
       "phone": "",
       "reservePhone": "",
       "insCorpCode": "",
       "bsLastYearEndDate": "",
       "bzLastYearEndDate": "",
       "level": "",
       "email": "",
       "category": "",
       "reserveCategory": "",
       "province": "",
       "city": "",
       "areaName": "",
       "address": ""
      }
    };
  },
  created: function() {
    var self = this;
    if(this.$route.query.customerId != undefined && this.$route.query.customerId != ''){
         this.customerId = this.$route.query.customerId;
    }
    if(this.$route.query.selected != undefined && this.$route.query.selected != ''){
         this.selected = this.$route.query.selected;
    }
    Indicator.open('加载中...');
    axiosGetAPI('/vi/insCompanies').then(res => {
      if (res.result) {
        Indicator.close();
        for (var i = 0; i < res.result.length; i++) {
          this.CompaniesshortName.push(res.result[i].shortName);
          this.CompaniesCode.push(res.result[i].code);
        }
      }
      axiosGetAPI('/vi/customers/' + self.customerId + '/contact').then(res => {
        if (res.result) {
          self.model = res.result;
        }
        for (var i = 0; i < self.CompaniesshortName.length; i++) {
          if (self.model.insCorpCode == self.CompaniesCode[i]) {
            self.CompaniesValue = self.CompaniesshortName[i];
            console.log(self.model.insCorpCode)
          }
        }
      })
    });


  },
  mounted() {

  },
  methods: {
    openBack() {
      if(this.selected  != ''){
        this.$router.push({path:'/quoteManagement/carInCustomers?selected=' + this.selected})
      }
      else{
        this.$router.back();
      }
    },
    onCompanies(value) {
      this.CompaniesValue = value;
      for (var i = 0; i < this.CompaniesshortName.length; i++) {
        if (this.CompaniesValue == this.CompaniesshortName[i]) {
          this.model.insCorpCode = this.CompaniesCode[i]
        }
      }
      this.CompaniesStatus = false;
    },
    cancel() {
      this.showPickerBSTime = false;
      this.showPickerBZTime = false;
    },
    confirmbsTime(value) {
      this.model.bsLastYearEndDate = this.Common.Public.dateString(value);
      this.showPickerBSTime = false;
    },
    confirmbzTime(value) {
      this.model.bzLastYearEndDate = this.Common.Public.dateString(value);
      this.showPickerBZTime = false;
    },
    updateFollowIn() {
      var self = this;
      // if (self.model.name == '') {
      //   Toast("请输入姓名");
      //   return false;
      // }
      if (self.model.insCorpCode == '') {
        Toast("选择上年保险公司");
        return false;
      }
      if (self.model.bzLastYearEndDate == '') {
        Toast("选择交强险到期时间");
        return false;
      }
      if (self.model.bsLastYearEndDate == '') {
        Toast("选择商业险到期时间");
        return false;
      }
      console.log(this.model)
      axiosPutAPI('/vi/customers/' + this.customerId + '/contact', this.model).then(res => {
        if (res.status == 200) {
          self.$router.back()
        }
      })
    }

  }
};

</script>
<style >
.followInAdd .van-cell__title{
  width: 120px !important;
}
/* .followInAdd .van-cell__title span{
 font-size:12px;
} */
.followInAdd {
  padding: 5px;
}

.followIn_item {
  margin: 10px;
  background: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
}

.follow_title {
  border-bottom: 1px solid #f0f0f0;
}

.btn_addFollowIn {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
}

.btn_addFollowIn p {
  width: 100px;
  background: rgba(22, 155, 213, 1);
  font-size: 14px;
  color: #ffffff;
  margin: 0 20px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  height: 30px;
}

.Followintime {
  background: #ffffff;
  height: 100px;
}

.timeRadio {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.timeRadio .van-radio {
  width: 24%;
}

</style>
