<template>
  <div>
    <mt-header class="def-header" title="补充送修厂">
      <div @click="closeRepair()" slot="right">
        <img :src="closeImg" style="width: 18px;height: 18px;" />
      </div>
    </mt-header>
    <div style="background:#f5f5f5">
      <div class="sendRepair_box">
        <h4 style="font-size: 14px;height:50px;line-height:60px; color: #999;font-weight: normal;color:red">请按保险公司输入送修码，检索送修厂</h4>
        <div class="insuranceItem" v-for="(item,index) in insuranceNameCode">
          <div class="insuranceTitle">
            <div class="insuranceName">
              <img :src=item.src alt style="height:20px;" />
              <p style="margin-left: 3px;">{{item.insCorpShortName}}</p>
            </div>
            <van-cell-group>
              <van-field v-model="searchText" placeholder="请输入送修代码" maxlength="13" type="number" />
            </van-cell-group>
          </div>
          <van-icon @click="SearchBtn(item)" color="#4A66FE" size="18px" name="search"></van-icon>
        </div>
        <!-- <div style="display: flex;align-items: center;"><van-field v-model="searchText"  placeholder="请输入送修代码" maxlength="13" type="number" />  <van-icon @click="SearchBtn" name="search"></van-icon></div> -->
        <div class="searchRes" v-show="isShow">
          <p>{{this.searchResult}}</p>
          <van-icon @click="closeShow" name="close" />
        </div>
        <!-- <van-popup v-model="isPopup" >请输入送修码后再查询</van-popup> -->
        <!-- 人保 -->
        <!--       <div class="insuranceItem">
          <div class="insuranceTitle">
            <div class="insuranceName">
              <img src="../../assets/images/companys/picc.png" alt style="height:20px;" />
              <p>{{piccInsurance.name}}</p>
            </div>
            <van-cell-group>
              <van-field v-model="piccsearchText" placeholder="请输入送修代码" maxlength="13" type="number" />
            </van-cell-group>
            <van-icon @click="piccSearchRes(piccInsurance.code)" name="search"></van-icon>
          </div>
          <div class="searchRes" v-show="showPicc">
            <p>{{piccRes.code}}{{piccRes.name}}</p>
          </div>
        </div> -->
        <!-- 太保 -->
        <!--        <div class="insuranceItem">
          <div class="insuranceTitle">
            <div class="insuranceName">
              <img src="../../assets/images/companys/cpic.png" alt style="height:20px;" />
              <p>{{cpicInsurance.name}}</p>
            </div>
            <van-cell-group>
              <van-field v-model="cpicsearchText" placeholder="请输入送修代码" maxlength="13" type="number" />
            </van-cell-group>
            <van-icon @click="cpicSearchRes(cpicInsurance.code)" name="search"></van-icon>
          </div>
          <div class="searchRes" v-show="showcpic" >
            <p>{{cpicRes.code}}{{cpicRes.name}}</p>
          </div>
        </div> -->
      </div>
      <div class="btn_search" @click="selectedRepair()">
        <p>确认</p>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from "./../../common/Axios";
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {

      pinganInsurance: { name: "平安财险", code: "pingan" },
      piccInsurance: { name: "人保财险", code: "picc" },
      cpicInsurance: { name: "太平洋财险", code: "cpic" },
      closeImg: (this.src = require("../../assets/images/ico-close.png")),
      model: {},
      searchText: "",
      isShow: false,
      insCtiyCode: "",
      fuzzyCode: "",
      pinganfuzzyCode: "",
      insuranceRes: [],
      insuranceNameCode: [],
      _searchRes: [],
      searchResult: '',
      isPopup: false,
      isClass: '-1',
    };
  },
  created() {
    if (
      sessionStorage.getItem("insCtiyCode") != "" &&
      sessionStorage.getItem("insCtiyCode") != undefined
    ) {
      this.insCtiyCode = sessionStorage.getItem("insCtiyCode");
    }
    if (sessionStorage.getItem("insuranceNameCode") && sessionStorage.getItem("insuranceNameCode") != undefined) {
      this.insuranceRes = JSON.parse(sessionStorage.getItem("insuranceNameCode"));
      for (var i = 0; i < this.insuranceRes.length; i++) {
        if (this.insCtiyCode == this.insuranceRes[i].insCityCode) {
          if (this.insuranceRes[i].insCorpCode == 'picc') {
            this.insuranceNameCode.push(this.insuranceRes[i]);
          }
        }
      }
      this.insuranceNameCode.map(item => {
        if (item.insCorpCode != null && item.insCorpCode != '') {
          item.src = require(`@/assets/images/companys/${item.insCorpCode}.png`);
          item.search = '';
        };
      })
    }
  },
  methods: {
    closeRepair: function() {
      this.$emit("closeRepair");
    },
    closeShow() {
      this.isShow = false;
    },
    selectedRepair: function() {
      var searchResult = [{
        insCorpCode: "",
        repairFactory: {
          code: "",
          name: ""
        }
      }];
      if (this._searchRes) {
        searchResult[0].insCorpCode = "picc";
        searchResult[0].repairFactory.code = this._searchRes.code;
        searchResult[0].repairFactory.name = this._searchRes.name;
      }
      this.$emit("selectedRepair", searchResult);
      this.$emit("closeRepair");
    },

    SearchBtn(item) {

      axiosGetAPI(
        "vi/insurePolicies/" +
        item.insCorpCode +
        "/RepairFactories?insCtiyCode=" +
        item.insCityCode +
        "&insCityCode=" +
        item.insCityCode +
        "&fuzzyCode=" +
        this.searchText
      ).then(res => {
        if (res.result && res.result.length > 0) {
          this._searchRes = res.result[0];
          this.searchRes = res.result[0];
          this.isShow = true;
          var _searchResult = this.searchRes.code + ' ' + this.searchRes.name;
          this.searchResult = _searchResult;
          //  this.$set(item,'searchResult',_searchResult);
        } else {
          this.isShow = false;
          // item.searchResult = '';
        }
      });

    },

  }
};

</script>
<style scoped>
.sendRepair_box {
  margin: 0px 10px;
}

.Selected {
  border: 1px solid #0066FF;
}

.btn_search {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn_search p {
  width: 100%;
  background: #4A66FE;
  font-size: 14px;
  color: #ffffff;
  /* margin: 0 20px; 
  border-radius: 5px;*/
  text-align: center;
  line-height: 48px;
  height: 48px;
}

.insuranceItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}

.insuranceTitle {
  display: flex;
  align-items: center;
}

.insuranceName {
  display: flex;
  align-items: center;

}

.searchBox {
  width: 65%;
}

.searchRes {
  display: flex;
  align-items: center;
  border-top: 1px solid #eeeeee;
  background: #fff;
  padding: 15px 10px;
}

.insuranceItem .van-cell-group {
  position: static;
}

</style>
