<template>
  <div class="home">
    <mt-header fixed class="def-header cust-head" title="我的保单">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center ">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1"><span class="item-click" @click="getPolicies()" >车险保单</span></mt-tab-item>
        <mt-tab-item id="2"><span class="item-click" @click="getLiPolicies()">人身险保单</span></mt-tab-item>
      </mt-navbar>
      <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
      <div ref="wrppera" :style="mywrppera">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div class="my-policy" v-for="item in policiesData" @click="policyDetail(item,$event)" v-show="!noData">
              <div class="my-policyTitle">
                <div style="width: 65%;">
                  <h3>{{item.plateNo ? item.plateNo : item.vin}}-{{item.carOwnerName}}</h3>
                  <p>{{item.insuredTime}}</p>
                </div>
                <div style="display: flex;align-items: center;">
                  <img slot="icon" :src="item.src ? item.src : defaultImg" width="24" height="24" />
                  {{item.insCorpShortName}}
                </div>
                <van-icon name="arrow"></van-icon>
              </div>
              <div class="bzBox" v-show='item.subPolicyNo'>
                <h3>{{item.policyTypeName}}保单号：</h3>
                <p>{{item.subPolicyNo}}</p>
              </div>
              <div class="bzBox" v-show='item.billSourceName'>
                <h3>保单来源：</h3>
                <p>{{item.billSourceName}}</p>
              </div>
            </div>
            <div class="non-data" v-show="noData">
              <img src="../../assets/images/icon-nothing.png">
            </div>
            <div class="down">
              <img :src="srcitem" v-show="imgshow">
              <p v-show="textshow" class="textshow">无更多数据</p>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <ul class="cust-list mint-region" v-show="!noLiData" style="margin-top: 25px">
              <li class="mint-cell" v-for="item in liPoliciesData" @click="liPolicyDetail(item,$event)">
                <div>
                  <div style="float: left;width:60%">
                    <p style="font-size: 15px;color:#333">产品名称：{{item.productName}}</p>
                    <p style="font-size: 13px;color:#666">投保单号：{{item.quotationNo}}</p>
                    <p style="font-size: 13px;color:#666">合同号：{{item.contractNo}}</p>
                    <p style="font-size: 13px;color:#666">机构名称：{{item.orgName}}</p>
                  </div>
                  <div style="float: right;width:40%">
                    <p style="font-size: 13px;color:#666">保险公司：{{item.insCorpName}}</p>
                    <p style="font-size: 13px;color:#666">保单年度：{{item.period}}</p>
                    <p style="font-size: 13px;color:#666">销售方式：{{item.salesType}}</p>
                    <p style="font-size: 13px;color:#666">保单状态：{{item.statusDisplay}}</p>
                  </div>
                </div>
                <i class="ico-arrow"></i>
              </li>
              <li class="down">
                <img :src="srcitem" v-show="noLiData&&liImgshow">
                <p v-show="textshow" class="liTextshow">无更多数据了</p>
              </li>
            </ul>
            <div class="non-data" v-show="noLiData">
              <img src="../../assets/images/icon-nothing.png">
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
        </div>
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
      selected: '1',
      title: '报价单',
      imgages: '',
      lengths: '',
      liLengths: '',
      limit: 10,
      imgshow: true,
      liImgshow:true,
      textshow: false,
      liTextshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      policiesData: [{
          "policyId": "",
          "insCityShortName": "",
          "insCorpCode": "",
          "insCorpShortName": "",
          "plateNo": "",
          "insuredName": "",
          "applicantName": "",
          "policyNo": "",
          "subPolicyNo": "",
          "premium": "",
          "hasAccidentInsurance": "",
          "isInsuredCSX": "",
          "szxCoverage": "",
          "totalTax": "",
          "insuredTime": "",
          "sellerName": "",
          "billSource": "",
          "billSourceName": "",
          "licenseVehicleType": "",
          "useCharacter": "",
          "policyType": "",
          "policyTypeName": "",
          "vin": "",
          "carOwnerName": "",
          "carRegisterDate": "",
          "beginDate": "",
          "organizationName": "",
          "creatorName": "",
          "carModel": "",
          "modifiedTime": "",
          "auditStatus": "",
          "auditStatusName": "",
          "auditorName": "",
          "auditedTime": ""
        }],
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      noData: true,
      noLiData: true,
      liPoliciesData: [{
        "id": "",
        "quotationNo": "",
        "contractNo": "",
        "period": "",
        "salesType": "",
        "salesmanId": "",
        "status": "",
        "productName": "",
        "orgName": "",
        "insCorpName": "",
        "premium": "",
        "statusDisplay": ""
      }],
      noData: true,
      mywrppera:{
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
      }
    }
  },
  created: function() {
    this.initHeight();
    this.getPolicies();
    this.getLiPolicies();
  },
  methods: {
    initHeight:function(){
　　　this.mywrppera.height = window.innerHeight-50+'px';
　　},
    refresh() {
      this.contentScroll.refresh();
    },
    openBack: function() {
      window.history.back();
    },
    getPolicies: function() {
      Indicator.open('加载中...');
      axiosGetAPI('/vi/policies/my').then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.noData = false;
          this.policiesData = res.result;

          this.lengths = this.policiesData.length
          if (res.page.totalRows == 0) {
            this.textshow = false;
            this.imgshow = false;
          } else if (this.lengths == res.page.totalRows) {
            this.textshow = true;
            this.imgshow = false;
          } else {
            this.imgshow = true;
          };

          for (var i = 0; i < this.policiesData.length; i++) {
            this.policiesData.map(item => {
              if (item.insCorpCode) {
                item.src = require(`@/assets/images/companys/${item.insCorpCode}.png`);
              } else{
                item.src = require(`@/assets/images/companys/defaultImg.png`);
              }
            })
          }
        } else {
          this.textshow = false;
          this.imgshow = false;
        }
      });
    },
    policyDetail: function(item, e) {
      this.$store.commit(types.POLICYDETAIL, item);
      this.$router.push({ path: "/myInfo/policyDetail?policyId=" + item.policyId });
    },
    liPolicyDetail: function(item) {
      var appId = localStorage.getItem("appId");
      var localToken = localStorage.getItem('token');
      if (localToken) {
        localToken = localToken.replace(appId + '_', '');
      }
      var url = "/myInfo/liPolicy/detail?policyId=" + item.id + "&appId=" + appId + "&token=" +
        encodeURIComponent(localToken);
      this.$router.push({ path: url });
    },
    getLiPolicies: function() {
      var self = this;
      var salesmanId = sessionStorage.getItem('salesmanId');
      if (salesmanId && salesmanId != 'undefined') {
        Indicator.open('加载中...');
        axiosGetAPI('/Salesmans/' + salesmanId + '/lifePolicies').then((res) => {
          Indicator.close();
          if (res.result && res.result.length > 0) {
            self.noLiData = false;
            self.liPoliciesData = res.result;

            self.liLengths = self.liPoliciesData.length
            if (res.page.totalRows == 0) {
              self.liTextshow = false;
              self.liImgshow = false;
            } else if (self.liLengths == res.page.totalRows) {
              self.liTextshow = true;
              self.liImgshow = false;
            } else {
              self.liImgshow = true;
            };
          } else {
            self.noLiData = true;
            self.liTextshow = false;
            self.liImgshow = false;
          }
        });
      } else {
        self.noLiData = true;
        self.textshow = true;
        self.imgshow = false;
      }

    }
  },
  mounted() {
    const contentScroll = new BScroll(this.$refs.wrppera, {
      probeType: 3,
      click: true
    });
    this.contentScroll = this.contentScroll
    //开始滚动前，更新视图大小
    contentScroll.on("beforeScrollStart", () => {
      this.refresh();
    })
    this.contentScroll = contentScroll
    contentScroll.on("scrollEnd", () => {
      var maxY = contentScroll.maxScrollY;
      var y = contentScroll.y
      if (y >= maxY + 40) {} else if (y < maxY + 40 && y > maxY) {
        contentScroll.scrollTo(0, maxY + 70, 200);
      } else if (y <= maxY) {
        if (this.selected == '1') {
          if (this.lengths == null || this.lengths == '') {
            return;
          };
          var lengths = this.lengths
          var limit = this.limit
          var param = { offset: lengths, limit: limit };
          axiosGetAPI('/vi/policies/my', param).then((res) => {
            Indicator.close();
            if (res.result && res.result != '') {
              this.policiesData = [...this.policiesData, ...res.result];
              this.lengths = this.policiesData.length
              if (res.page.totalRows == 0) {
                this.textshow = false;
                this.imgshow = false;
              } else {
                if (this.lengths < res.page.totalRows) {
                  this.imgshow = true;
                  this.policiesData = [...this.policiesData, ...res.result];
                } else {
                  this.policiesData = [...this.policiesData];
                  this.textshow = true;
                  this.imgshow = false;
                };
              }
              for (var i = 0; i < this.policiesData.length; i++) {
                this.policiesData.map(item => {
                  if (item.insCorpCode) {
                    item.src = require(`@/assets/images/companys/${item.insCorpCode}.png`);
                  } else{
                    item.src = require(`@/assets/images/companys/defaultImg.png`);
                  }
                })
              }
            } else {
              this.textshow = true;
              this.imgshow = false;
            }
          });
        }else{
          if (this.liLengths == null || this.liLengths == '') {
            return;
          };
          var liLengths = this.liLengths
          var limit = this.limit
          var param = { offset: liLengths, limit: limit };
          var salesmanId = sessionStorage.getItem('salesmanId');
          if (salesmanId && salesmanId != 'undefined') {
            Indicator.open('加载中...');
            axiosGetAPI('/Salesmans/' + salesmanId + '/lifePolicies').then((res) => {
              Indicator.close();
              if (res.result && res.result.length > 0) {
                this.noLiData = false;
                this.liPoliciesData = res.result;

                this.liLengths = this.liPoliciesData.length
                if (res.page.totalRows == 0) {
                  this.liTextshow = false;
                  this.liImgshow = false;
                } else if (self.liLengths == res.page.totalRows) {
                  this.liTextshow = true;
                  this.liImgshow = false;
                  this.liPoliciesData = [...this.liPoliciesData];
                } else {
                  this.liImgshow = true;
                  this.liPoliciesData = [...this.liPoliciesData, ...res.result];
                };
              } else {
                this.noLiData = true;
                this.liTextshow = false;
                this.liImgshow = false;
              }
            });
          } else {
            this.noLiData = true;
            this.textshow = true;
            this.imgshow = false;
          }
        }
        this.$nextTick(() => {
          this.contentScroll //更新滚动视图               
        })
      }
    })

  },
}

</script>
<style scoped>
.my-policy .mt-policy-cell {
  min-height: 30px;

}

.my-policy {
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
}

.my-policy .mint-cell {
  height: 24px;
  min-height: 25px;
}

.my-policy .my-cell-gray {
  color: #666666;
  font-size: 12px;
  padding-right: 15px;
  text-align: center;
  display: block;
}


.down {
  height: 40px;
  text-align: center;
  /* background: #FFFFFF */
}

.down img {
  width: 35px;
  height: 35px;
  margin-top: 5px
}

.textshow {
  margin-top: 5px;
  color: #878484
}

.my-policyTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.my-policyTitle h3 {
  font-size: 14px;
  color: #333333;

}

.my-policyTitle p {
  font-size: 14px;
  color: #333333;
}

.bzBox {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bzBox h3 {
  font-size: 13px;
  color: #666666;
  font-weight: normal;
}

.bzBox p {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}

</style>
