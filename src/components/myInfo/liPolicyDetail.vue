<template>
  <div>
    <mt-header fixed class="def-header cust-head" title="保单详情">
      <div slot="left" v-show='!isShare'>
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div>
      <div class="mint-region" style="margin-top: 45px;">
        <mt-field class="feildItem" label="保险公司" type="text" v-model="liPolicyDetail.insCorpName" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="投保单号" type="text" v-model="liPolicyDetail.quotationNo" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="合同编号" type="text" v-model="liPolicyDetail.contractNo" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="保单年度" type="text" v-model="liPolicyDetail.period" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="犹豫期 (天)" type="text" v-model="liPolicyDetail.hesitatePeriod" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="销售方式" type="text" v-model="liPolicyDetail.salesType" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="银行名称" type="text" v-model="liPolicyDetail.bankName" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="银行卡号" type="text" v-model="liPolicyDetail.bankCardNo" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="出单机构" type="text" v-model="liPolicyDetail.orgName" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="feildItem" label="业务员" type="text" v-model="liPolicyDetail.salesmanName" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1" v-show="!hasProfiData">
        </hr>
        <mt-field class="feildItem" v-show="!hasProfiData" label="受益人" type="text" v-model="profiData" readonly="readonly" disableClear>
        </mt-field>
      </div>
      <hr width="100%" color="#f5f5f5" size="1">
      </hr>
      <div style="background:#F5F5F5; height: 5px"></div>
      <hr width="100%" color="#f5f5f5" size="1">
      </hr>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">投/被保人</mt-tab-item>
        <mt-tab-item id="2">保险计划</mt-tab-item>
        <mt-tab-item id="3" v-show="hasProfiData">受益人</mt-tab-item>
        <mt-tab-item id="4">影像</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="mint-tab-content" style="margin-bottom: 35px">
        <mt-tab-container-item id="1">
          <ul class="cust-list mint-region" v-show="hasRelationsData">
            <li class="mint-cell" v-for="item in relatedPeoples">
              <div>
                <div style="float: left;width:60%">
                  <p style="font-size: 16px;color:#333">{{item.peopleTypeDisplay}}</p>
                  <p style="font-size: 14px;color:#666">年龄: {{item.age}}</p>
                  <p style="font-size: 14px;color:#666">电话: {{item.phone}}</p>
                </div>
                <div style="float: right;width:40%">
                  <p style="font-size: 14px;color:#666">姓名: {{item.name}}</p>
                  <p style="font-size: 14px;color:#666">性别: {{item.genderDisplay}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="non-data" v-show="!hasRelationsData">
            <p>暂无投/被保人信息</p>
          </div>
          <!-- <div style="margin-left: 30px; margin-right: 30px">
                        <mt-button @click="addRelationCust" type="primary" size="large" plain><img style="margin-top: 2px;margin-right:5px" src="../../assets/images/ico-add.png" height="20" width="20" slot="icon">添加</mt-button>
                    </div> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="cust-list mint-region" v-show="hasInsPlansData">
            <li class="mint-cell" v-for="item in insPlans">
              <div>
                <div style="float: left;width:60%">
                  <p style="font-size: 14px;color:#666">产品名称: {{item.productName}}</p>
                  <p style="font-size: 14px;color:#666">产品属性: {{item.productProperty}}</p>
                  <p style="font-size: 14px;color:#666" v-show="item.adjustAmount > 0">修改保费: {{item.adjustAmount}}</p>
                </div>
                <div style="float: right;width:40%">
                  <p style="font-size: 14px;color:#666">保险金额: {{item.insAmount}}</p>
                  <p style="font-size: 14px;color:#666">首期保费: {{item.initAmount}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="non-data" v-show="!hasInsPlansData">
            <p>暂无保险计划</p>
          </div>
          <!-- <div style="margin-left: 30px; margin-right: 30px">
                        <mt-button @click="uploadImage" type="primary" size="large" plain><img style="margin-top: 2px;margin-right:5px" src="../../assets/images/ico-add.png" height="20" width="20" slot="icon">上传</mt-button>
                    </div> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="3" v-show="hasProfiData">
          <ul class="cust-list mint-region" v-show="hasProfiData">
            <li class="mint-cell" v-for="item in profitPeoples">
              <div>
                <div style="float: left;width:60%">
                  <p style="font-size: 14px;color:#666">受益人姓名: {{item.name}}</p>
                  <p style="font-size: 14px;color:#666">与被保人关系: {{item.relationShipDisplay}}</p>
                </div>
                <div style="float: right;width:40%">
                  <p style="font-size: 14px;color:#666">受益比例: {{item.profitRate}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="non-data" v-show="!hasProfiData">
            <p>暂无指定受益人信息</p>
          </div>
          <!-- <div style="margin-left: 30px; margin-right: 30px;margin-top:30px">
                        <mt-button @click="addCar" type="primary" size="large" plain><img style="margin-top: 2px;margin-right:5px" src="../../assets/images/ico-add.png" height="20" width="20" slot="icon">添加</mt-button>
                    </div> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <ul class="cust-list mint-region" v-show="hasImagesData">
            <li v-for="item in images">
              <img :src="item.filePath" width="100%" height="100%">
            </li>
          </ul>
          <div class="non-data" v-show="!hasImagesData">
            <p>暂无影像资料</p>
          </div>
          <!-- <div style="margin-left: 30px; margin-right: 30px">
                        <mt-button @click="uploadImage" type="primary" size="large" plain><img style="margin-top: 2px;margin-right:5px" src="../../assets/images/ico-add.png" height="20" width="20" slot="icon">上传</mt-button>
                    </div> -->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
export default {
  name: 'home',
  data() {
    return {
      selected: '1',
      hasProfiData: false,
      hasImagesData: false,
      hasRelationsData: false,
      hasInsPlansData: false,
      isShare: false,
      profiData: '法定',
      defaultImg: this.src = require('../../assets/images/img-product-banner.png'),
      relatedPeoples: [{
        "id": "",
        "age": "",
        "peopleType": "",
        "peopleTypeDisplay": "",
        "name": "",
        "identityType": "",
        "identityNo": "",
        "birthDay": "",
        "validDate": "",
        "forever": "",
        "gender": "",
        "genderDisplay": "",
        "nationality": "",
        "maritalStatus": "",
        "maritalStatusDisplay": "",
        "phone": "",
        "education": "",
        "cityCode": "",
        "address": "",
        "company": "",
        "position": "",
        "profession": "",
        "cityCodeFullPath": ""
      }],
      insPlans: [{
        "id": "",
        "productId": "",
        "productName": "",
        "isAddition": "",
        "productProperty": "",
        "insAmount": "",
        "initAmount": "",
        "adjustAmount": ""
      }],
      images: [{ "id": "", "imageType": "", "imageTypeDisplay": "", "filePath": "", "rank": "" }],
      profitPeoples: [{
        "id": "",
        "name": "",
        "identityType": "",
        "identityTypeDisplay": "",
        "identityNo": "",
        "profitRate": "",
        "rank": "",
        "relationShip": "",
        "relationShipDisplay": ""
      }],
      liPolicyDetail: {
        "profitPeoples": [],
        "images": [],
        "insPlans": [],
        "relatedPeoples": [],
        "id": "",
        "orgCode": "",
        "orgName": "",
        "insCorpCode": "",
        "insCorpName": "",
        "quotationNo": "",
        "contractNo": "",
        "period": "",
        "hesitatePeriod": "",
        "salesType": "",
        "remark": "",
        "status": "",
        "statusDisplay": "",
        "bankCode": "",
        "bankName": "",
        "bankCardNo": "",
        "salesmanId": "",
        "salesmanName": ""
      },
    }
  },
  mounted: function() {
    this.getLiPolicyDetail();
  },
  created: function() {
    var len = window.history.length;
    if (len <= 2) {
      this.isShare = true;
    };
    var appId = this.$route.query.appId;
    var token = decodeURIComponent(this.$route.query.token);
    if (appId) {
      localStorage.setItem("appId", appId);
    };

    if (token) {
      token = token.replace(' ', '+');
      localStorage.setItem('token', appId + '_' + token);
    };
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    getLiPolicyDetail: function() {
      var self = this;
      var policyId = self.$route.query.policyId;
      Indicator.open('加载中...');
      axiosGetAPI('/li/policies/' + policyId).then((res) => {
        if (res.result) {
          self.liPolicyDetail = res.result;
          self.profitPeoples = self.liPolicyDetail.profitPeoples;
          self.hasProfiData = (self.profitPeoples.length > 0);
          self.images = self.liPolicyDetail.images;
          self.hasImagesData = (self.images.length > 0);
          self.relatedPeoples = self.liPolicyDetail.relatedPeoples;
          self.hasRelationsData = (self.relatedPeoples.length > 0);
          self.insPlans = self.liPolicyDetail.insPlans;
          self.hasInsPlansData = (self.insPlans.length > 0);
        }
        Indicator.close();
      });
    },
  }
};

</script>
<style scoped>
.mint-header.def-header.cust-head {
  border-bottom: 1px solid #f0f0f0;
}

.mint-tab-content .mint-table {
  text-align: left;
}

.cust-title {
  margin-bottom: 16px;
  line-height: 22px;
  font-weight: 400;
}

.cust-title .plateno {
  float: left;
  font-size: 20px;
  color: #333;
}

.cust-title .levels {
  float: right;
  font-size: 14px;
  color: #808080;
}

.ico-levels {
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  color: #fff;
  line-height: 22px;
  text-align: center;
  background-color: #F5A623;
}

.div1 {
  height: 240px;
  width: 100%;
  position: relative;
  z-index: 1;
  text-align: center
}

.div2 {
  height: 35px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  padding-top: 8px;
  top: 242px;
  left: 0;
  z-index: 2;
}

.feildItem {
  min-height: 25px;
  height: 35px;
}

</style>
