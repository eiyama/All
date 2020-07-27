<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header" title="查询结果">
      <div slot="left">
        <mt-button @click="openBack" icon="back"></mt-button>
      </div>
    </mt-header>
    <div style="padding-top:15px;margin-top:48px">
      <div :style="sqwrppera" ref="wrppera">
        <ul class="qcust-list qmint-region" v-show="hasInsurePoliciesData">
          <li class="qmint-cell" v-for="item in insurePolicies" @click="insListPage(item)">
            <h4 class="qmint-title" style="line-height:30px">
              {{item.carOwnerName ? item.plateNo + " - " + item.carOwnerName : (item.plateNo ? item.plateNo : "未上牌")}}
            </h4>
            <img :src="rightImg" style="position: absolute;left:90%;width: 25px; height: 25px;">
            <p style="color:#666;font-size:12px">VIN: {{item.vin}}</p>
            <p style="color:#666;font-size:12px">投保人: {{item.applicantName}}</p>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin-top:5px" />
            <div v-for="policy in item.policies" style="color:#666;font-size:12px;margin-top:5px">
              <img :src="policy.src ? policy.src : defaultImg" style="position: absolute;right:90%;width: 20px; height: 20px;;margin-top:5px">
              <span style="color:#666;font-size:12px;margin-left:25px;line-height:30px">
                {{policy.insCorp.shortName}} : {{ policy.premium > 0 ? " ¥ " + policy.premium : policy.policiesIns}}
              </span>
            </div>
          </li>
          <li class="qdown">
            <img :src="srcitem" v-show="hasInsurePoliciesData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </li>
        </ul>
        <div class="non-data" v-show="!hasInsurePoliciesData">
          <img src="../../assets/images/icon-nothing.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
import BScroll from 'better-scroll';

export default {
  name: 'home',
  data() {
    return {
      selected: '1',
      plante: 'quotationList',
      title: '报价单',
      limit: 10,
      date: '',
      imgshow: false,
      textshow: false,
      params: '',
      lengths: '',
      hasInsurePoliciesData: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      rightImg: this.src = require('../../assets/images/right.png'),
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      insurePolicies: [{
        "insBatchNo": "",
        "plateNo": "",
        "carOwnerName": "",
        "vin": "",
        "applicantName": "",
        "insuredName": "",
        "createdTime": "",
        "policies": [{
          "insureNo": "",
          "bzInsureNo": "",
          "bsInsureNo": "",
          "premium": "",
          "insCorp": { "shortName": "", "code": "pingan" },
          "insureStatus": "报价失败"
        }]
      }],
      sqwrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background-color": "#F5F5F5",
      },
      plateNo: '',
      vin: '',
    }
  },
  created: function() {
    this.initHeight();
    this.getInsurePolicies();
  },
  methods: {
    initHeight: function() {
      this.sqwrppera.height = window.innerHeight + 'px';
    },
    refresh() {
      this.contentScroll.refresh();
    },
    getInsurePolicies: function() {
      var self = this;
      self.plateNo = self.$route.query.plateNo;
      self.vin = self.$route.query.vin;
      var url = '/vi/insurePolicies';
      if (self.plateNo) {
        self.plateNo = self.plateNo.toUpperCase();
        url = url + '?plateNo=' + self.plateNo;
        if (self.vin) {
          self.vin = self.vin.toUpperCase();
          url = url + '&vin=' + self.vin;
        };
      } else if (self.vin) {
        self.vin = self.vin.toUpperCase();
        url = url + '?vin=' + self.vin;
      };

      Indicator.open('加载中...');
      axiosGetAPI(url).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.hasInsurePoliciesData = true
          this.insurePolicies = res.result;
          this.lengths = this.insurePolicies.length
          if (res.page.totalRows == 0) {
            this.textshow = false;
            this.imgshow = false;
          } else if (this.lengths == res.page.totalRows) {
            this.textshow = true;
            this.imgshow = false;
          } else {
            this.imgshow = false;
          };
          this.insurePolicies.map(item => {
            var policiesIns = '';
            var insureStatus = '';
            var len = item.policies.length;
            for (var i = 0; i < len; i++) {
              var policies = item.policies[i];
              if (policies.insureStatus == 'QuotedFailed') {
                insureStatus = '报价失败';
                policies.premium = 0;
              } else if (policies.insureStatus == 'VerifiedFailed') {
                insureStatus = '核保失败';
                policies.premium = 0;
              } else if (policies.insureStatus == 'QuotedSuccess') {
                insureStatus = '待核保'
              } else if (policies.insureStatus == 'VerifiedSuccess') {
                insureStatus = '待支付'
              } else if (policies.insureStatus == 'Paid') {
                insureStatus = '待承保'
              } else if (policies.insureStatus == 'Insured') {
                insureStatus = '已承保'
              }
              /*policiesIns += policies.insCorp.shortName + ':';
              if (policies.premium > 0) {
                policiesIns += '￥' + policies.premium + ',';
              };
              policiesIns += insureStatus;
              if (i != (len - 1)) {
                policiesIns += ' | ';
              };*/
              policies.src = require(`@/assets/images/companys/${policies.insCorp.code}.png`)
              policies.policiesIns = insureStatus;
            }
            // item.policiesIns = policiesIns
          });
        } else {
          this.textshow = false;
          this.imgshow = false;
          this.hasInsurePoliciesData = false;
        }
      });
    },
    insListPage: function(item) {
      this.$store.commit(types.INSUREPOLICIES, item);
      this.$router.push({ path: "/quoteManagement/insList" });
    },
    insdatail: function(item) {
      this.$store.commit(types.INSUREPOLICIES, item);
      this.$router.push({ path: "/quoteManagement/insdatail" });
    },
    openBack: function() {
      window.history.back();
    },
  },
  mounted() {
    const contentScroll = new BScroll(this.$refs.wrppera, {
      probeType: 3,
      click: true
    });
    this.contentScroll = contentScroll
    //开始滚动前，更新视图大小
    contentScroll.on("beforeScrollStart", () => {
      this.refresh();
    })
    contentScroll.on("scrollEnd", () => {
      var maxY = contentScroll.maxScrollY;
      var y = contentScroll.y
      if (y >= maxY + 40) {} else if (y < maxY + 40 && y > maxY) {
        contentScroll.scrollTo(0, maxY + 70, 200);
      } else if (y <= maxY) {
        if (this.lengths == null || this.lengths == '') {
          return;
        };
        var lengths = this.lengths
        var limit = this.limit
        var url = '/vi/insurePolicies';
        this.plateNo = this.$route.query.plateNo;
        this.vin = this.$route.query.vin;
        var param = { offset: this.lengths, limit: this.limit }
        if (this.plateNo) {
          param.plateNo = this.plateNo.toUpperCase();
          if (this.vin) {
            param.vin = this.vin.toUpperCase();
          };
        } else if (this.vin) {
          param.vin = this.vin.toUpperCase();
        };
        this.imgshow = true;
        axiosGetAPI(url, param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.hasInsurePoliciesData = true
            this.lengths = this.insurePolicies.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
            } else {
              if (this.lengths < res.page.totalRows) {
                this.imgshow = false;
                this.insurePolicies = [...this.insurePolicies, ...res.result];
              } else {
                this.insurePolicies = [...this.insurePolicies];
                this.textshow = true;
                this.imgshow = false;
              };
            }

            this.insurePolicies.map(item => {
              var policiesIns = '';
              var insureStatus = '';
              var len = item.policies.length;
              for (var i = 0; i < len; i++) {
                var policies = item.policies[i];
                if (policies.insureStatus == 'QuotedFailed') {
                  insureStatus = '报价失败'
                } else if (policies.insureStatus == 'VerifiedFailed') {
                  insureStatus = '核保失败'
                } else if (policies.insureStatus == 'QuotedSuccess') {
                  insureStatus = '待核保'
                } else if (policies.insureStatus == 'VerifiedSuccess') {
                  insureStatus = '待支付'
                } else if (policies.insureStatus == 'Paid') {
                  insureStatus = '待承保'
                } else if (policies.insureStatus == 'Insured') {
                  insureStatus = '已承保'
                }
                /*policiesIns += policies.insCorp.shortName + ':';
                if (policies.premium > 0) {
                  policiesIns += '￥' + policies.premium + ',';
                };
                policiesIns += insureStatus;
                if (i != (len - 1)) {
                  policiesIns += ' | ';
                };*/
                policies.src = require(`@/assets/images/companys/${policies.insCorp.code}.png`)
                policies.policiesIns = insureStatus;
              }
              // item.policiesIns = policiesIns
            });
          } else {
            this.textshow = false;
            this.imgshow = false;
          }
        });
        this.$nextTick(() => {
          this.contentScroll //更新滚动视图
        })
      }
    })
  }
}

</script>
<style scoped>
.qmint-tab-content {
  padding: 0px;
}

.qmint-tab-content .qcust-list {
  padding-top: 5px;
}

.qcust-list .qmint-region {
  margin-bottom: 10px;
}

.qmint-region .qmint-cell {
  padding: 8px;
  background-color: #FFF;
  border-radius: 5px;
  margin: 10px;
}

.qcust-list .qmint-title {
  font-size: 15px;
  color: #333;
  font-weight: bold;
}

.qdown {
  height: 40px;
  text-align: center;
}

.qdown img {
  width: 35px;
  height: 35px;
  margin-top: 5px
}

.qtextshow {
  margin-top: 15px;
  color: #999999
}

</style>
