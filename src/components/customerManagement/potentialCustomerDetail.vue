<template>
  <div>
    <mt-header fixed class="def-header cust-head" title="客户详情">
      <div slot="left" v-show='!isShare'>
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div>
      <div class="mint-region" style="margin-top: 45px;">
        <mt-field class="feildItem" label="姓名" type="text" v-model="potentialCustomerDetail.name" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        
        <mt-field class="feildItem" label="电话" type="text" v-model="potentialCustomerDetail.contactPhone" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
      
        <mt-field class="feildItem" label="邮箱" type="text" v-model="potentialCustomerDetail.contactMail" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
     
        <mt-field class="feildItem" label="证件号" type="text" v-model="potentialCustomerDetail.identifyNo" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
       
        <mt-field class="feildItem" label="所在地区" type="text" v-model="potentialCustomerDetail.contactDistrict" readonly="readonly" disableClear>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        
        <mt-field label="详细地址" type="text" v-model="potentialCustomerDetail.contactAddress" readonly="readonly" disableClear>
        </mt-field>
      </div>
      <div style="background:#F5F5F5; height: 5px"></div>
      <hr width="100%" color="#f5f5f5" size="1">
     
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">车辆</mt-tab-item>
        <mt-tab-item id="2">家庭成员</mt-tab-item>
        <mt-tab-item id="3">影像</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="mint-tab-content" style="margin-bottom: 0.7rem">
        <mt-tab-container-item id="1">
          <ul class="cust-list mint-region" v-show="hasCarsData">
            <li class="mint-cell" v-for="item in cars">
              <div>
                <p style="color:#666;font-size: .28rem">车牌号:{{item.plateNo}}</p>
                <p style="color:#666;font-size: .28rem">车架号:{{item.vin}}</p>
                <p style="color:#666;font-size: .28rem">创建时间:{{item.createdTime}}</p>
              </div>
            </li>
          </ul>
          <div class="non-data" v-show="!hasCarsData">
            <p>暂无车辆信息</p>
          </div>
          <div style="margin-left: 30px; margin-right: 30px;margin-top:30px">
            <mt-button @click="addCar" type="primary" size="large" plain><img style="margin-top: 2px;margin-right:5px" src="../../assets/images/ico-add.png" height="20" width="20" slot="icon">添加</mt-button>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="cust-list mint-region" v-show="hasRelationsData">
            <li class="mint-cell" v-for="item in relations">
              <div>
                <div style="float: left;width:50%">
                  <p style="font-size: .28rem;color:#666">姓名:{{item.name}}</p>
                  <p style="font-size: .28rem;color:#666">创建时间:{{item.createdTime}}</p>
                </div>
                <div style="float: right;width:50%">
                  <p style="font-size: .28rem;color:#666">电话:{{item.contactPhone}}</p>
                  <p style="font-size: .28rem;color:#666">关系:{{item.relation}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="non-data" v-show="!hasRelationsData">
            <p>暂无家庭成员信息</p>
          </div>
          <div style="margin-left: 30px; margin-right: 30px">
            <mt-button @click="addRelationCust" type="primary" size="large" plain><img style="margin-top: 2px;margin-right:5px" src="../../assets/images/ico-add.png" height="20" width="20" slot="icon">添加</mt-button>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <ul v-show="hasImagesData">
            <li v-for="item in images" style="text-align: center">
            </li>
          </ul>
          <div class="non-data" v-show="!hasImagesData">
            <p>暂无影像资料</p>
          </div>
          <div style="margin-left: 30px; margin-right: 30px">
            <mt-button @click="uploadImage" type="primary" size="large" plain><img style="margin-top: 2px;margin-right:5px" src="../../assets/images/ico-add.png" height="20" width="20" slot="icon">上传</mt-button>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="mint-bottom" v-show="false">
      <button class="btn-bottom frist-bottom" @click="createProspectus()">制作计划书</button>
      <button class="btn-bottom" @click="toQuote(productDetail.insureUrl)">在线投保</button>
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
      hasCarsData: false,
      hasImagesData: false,
      hasRelationsData: false,
      hasClausesData: false,
      isShare: false,
      defaultImg: this.src = require('../../assets/images/img-product-banner.png'),
      potentialCustomerDetail: {
        "customerManagerUserId": "",
        "sex": "",
        "identifyType": "",
        "creator": "",
        "cars": [],
        "images": [],
        "relations": [],
        "id": "",
        "customerManagerName": "",
        "name": "",
        "sex_Describe": "",
        "birthday": "",
        "identifyType_Describe": "",
        "identifyNo": "",
        "contactPhone": "",
        "contactMail": "",
        "contactDistrict": "",
        "contactAddress": "",
        "modifier": "",
        "modifiedTime": ""
      },
      cars: [{ "createdTime": "", "id": "", "plateNo": "", "vin": "" }],
      images: [{ "id": "", "createdTime": "", "label": "", "imageId": "" }],
      relations: [{
        "id": "",
        "createdTime": "",
        "name": "",
        "relation": "",
        "identifyType": "",
        "identifyNo": "",
        "contactPhone": ""
      }],
    }
  },
  mounted: function() {
    this.getPotentialCustomerDetail();
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
    toQuote: function(insureUrl) {
      window.location.href = insureUrl;
    },
    openBack: function() {
      window.history.back();
    },
    getPotentialCustomerDetail: function() {
      var self = this;
      var pcid = self.$route.query.pcid;
      Indicator.open('加载中...');
      axiosGetAPI('/PotentialCustomers/' + pcid).then((res) => {
        if (res.result) {
          self.potentialCustomerDetail = res.result;
          self.cars = self.potentialCustomerDetail.cars;
          self.hasCarsData = (self.cars.length > 0);
          self.images = self.potentialCustomerDetail.images;
          self.hasImagesData = (self.images.length > 0);
          self.relations = self.potentialCustomerDetail.relations;
          self.hasRelationsData = (self.relations.length > 0);
        }
        Indicator.close();
      });
    },
    addCar: function() {
      var pcid = this.$route.query.pcid;
      this.$router.push({ path: "/addCar?pcid=" + pcid });
    },
    addRelationCust: function() {
      var pcid = this.$route.query.pcid;
      this.$router.push({ path: "/addRelationCust?pcid=" + pcid });
    },
    uploadImage: function() {
      var pcid = this.$route.query.pcid;
      this.$router.push({ path: "/uploadData?pcid=" + pcid });
    }
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
  margin-bottom: .32rem;
  line-height: .44rem;
  font-weight: 400;
}

.cust-title .plateno {
  float: left;
  font-size: 20px;
  color: #333;
}

.cust-title .levels {
  float: right;
  font-size: .28rem;
  color: #808080;
}

.ico-levels {
  display: inline-block;
  width: .44rem;
  height: .44rem;
  border-radius: 4px;
  color: #fff;
  line-height: .44rem;
  text-align: center;
  background-color: #F5A623;
}

.div1 {
  height: 4.8rem;
  width: 100%;
  position: relative;
  z-index: 1;
  text-align: center
}

.div2 {
  height: 0.7rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  padding-top: 8px;
  top: 4.84rem;
  left: 0;
  z-index: 2;
}

.feildItem {
  min-height: .5rem;
  height: 0.7rem;
}

</style>
