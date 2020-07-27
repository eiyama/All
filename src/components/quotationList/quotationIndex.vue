<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="投保管理">
      <mt-button slot="right" @click="openone"><img :src="searchImg" style="width:.48rem;margin-top:.16rem" /></mt-button>
    </mt-header>
    <div style="margin-top:1rem">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1"><span class="item-click" @click="getInsurePolicies('')">全部</span></mt-tab-item>
        <mt-tab-item id="2">
          <span class="item-click" @click="getInsurePolicies('?insureStatus=QuotedSuccess')">已报价</span>
        </mt-tab-item>
        <mt-tab-item id="3">
          <span class="item-click" @click="getInsurePolicies('?insureStatus=VerifiedSuccess')">已核保</span>
        </mt-tab-item>
        <mt-tab-item id="4">
          <span class="item-click" @click="getInsurePolicies('?insureStatus=Insured')">已支付</span>
        </mt-tab-item>
      </mt-navbar>
      <div :style="qwrppera" ref="wrppera">
        <mt-tab-container v-model="selected" class="qmint-tab-content">
          <mt-tab-container-item id="1">
            <ul class="qcust-list qmint-region" v-show="hasInsurePoliciesData">
              <li class="qmint-cell" v-for="item in insurePolicies" @click="insListPage(item)">
                <h4 class="qmint-title" style="line-height:.44rem">
                  {{item.carOwnerName ? item.plateNo + " - " + item.carOwnerName : (item.plateNo ? item.plateNo : "未上牌")}}
                </h4>
                <img :src="rightImg" style="position: absolute;left:90%;width: .5rem; height: .5rem;">
                <p style="color:#666;font-size:.24rem">VIN: {{item.vin}}</p>
                <p style="color:#666;font-size:.24rem">投保人: {{item.applicantName}}</p>
                <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin:.2rem 0;" />
                <div v-for="policy in item.policies" style="color:#666;font-size:.24rem;">
                  <p style="display:flex;align-items:center;font-size:.28rem;color:#333;height:100%;justify-content: space-between;">
                    <span style="display: flex;align-items: center;position: relative;">
                      <img :src="policy.src ? policy.src : defaultImg" style="position: absolute;left:0;width: .4rem; height: .4rem;">
                      <span style="color:#666;font-size:.24rem;margin-left:.5rem;line-height:.44rem">
                        {{policy.insCorp.shortName}}
                      </span>
                    </span>
                    <span style="display: flex;align-items: center;">
                      <span style="color:#666;font-size:.24rem;margin-left:.5rem;line-height:.44rem">
                        {{ policy.premium > 0 ? " ¥ " + policy.premium : policy.policiesIns}}
                      </span>
                    </span>
                  </p>
                </div>
              </li>
              <li class="qdown">
                <img :src="srcitem" v-show="hasInsurePoliciesData&&imgshow">
                <p v-show="textshow" class="textshow">无更多数据了</p>
              </li>
            </ul>
            <div class="non-data" v-show="!hasInsurePoliciesData">
              <!-- <i class="ico-non-data"></i> -->
              <img src="../../assets/images/icon-nothing.png">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <ul class="qcust-list qmint-region" v-show="hasInsurePoliciesData">
              <li class="qmint-cell" v-for="item in insurePolicies" @click="insListPage(item)">
                <h4 class="qmint-title" style="line-height:.44rem">
                  {{item.carOwnerName ? item.plateNo + " - " + item.carOwnerName : (item.plateNo ? item.plateNo : "未上牌")}}
                </h4>
                <img :src="rightImg" style="position: absolute;left:90%;width: .5rem; height: .5rem;">
                <p style="color:#666;font-size:.24rem">VIN: {{item.vin}}</p>
                <p style="color:#666;font-size:.24rem">投保人: {{item.applicantName}}</p>
                <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin:.3rem 0;" />
                <div v-for="policy in item.policies" style="color:#666;font-size:.24rem;">
                  <p style="display:flex;align-items:center;font-size:.28rem;color:#333;height:100%;justify-content: space-between;">
                    <span style="display: flex;align-items: center;">
                      <img :src="policy.src ? policy.src : defaultImg" style="position: absolute;width: .4rem; height: .4rem;">
                      <span style="color:#666;font-size:.24rem;margin-left:.5rem;line-height:.44rem">
                        {{policy.insCorp.shortName}}
                      </span>
                    </span>
                    <span style="display: flex;align-items: center;">
                      <span style="color:#666;font-size:.24rem;margin-left:.5rem;line-height:.44rem">
                        {{ policy.premium > 0 ? " ¥ " + policy.premium : policy.policiesIns}}
                      </span>
                    </span>
                  </p>
                </div>
              </li>
              <li class="qdown">
                <img :src="srcitem" v-show="hasInsurePoliciesData&&imgshow">
                <p v-show="textshow" class="textshow">无更多数据了</p>
              </li>
            </ul>
            <div class="non-data" v-show="!hasInsurePoliciesData">
              <!-- <i class="ico-non-data"></i> -->
              <img src="../../assets/images/icon-nothing.png">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <ul class="qcust-list qmint-region" v-show="hasInsurePoliciesData">
              <li class="qmint-cell" v-for="item in insurePolicies" @click="insListPage(item)">
                <h4 class="qmint-title" style="line-height:.44rem">
                  {{item.carOwnerName ? item.plateNo + " - " + item.carOwnerName : (item.plateNo ? item.plateNo : "未上牌")}}
                </h4>
                <img :src="rightImg" style="position: absolute;left:90%;width: .5rem; height: .5rem;">
                <p style="color:#666;font-size:.24rem">VIN: {{item.vin}}</p>
                <p style="color:#666;font-size:.24rem">投保人: {{item.applicantName}}</p>
                <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin:.3rem 0;" />
                <div v-for="policy in item.policies" style="color:#666;font-size:.24rem;">
                  <p style="display:flex;align-items:center;font-size:.28rem;color:#333;height:100%;justify-content: space-between;">
                    <span style="display: flex;align-items: center;">
                      <img :src="policy.src ? policy.src : defaultImg" style="position: absolute;right:90%;width: .4rem; height: .4rem;">
                      <span style="color:#666;font-size:.24rem;margin-left:.5rem;line-height:.44rem">
                        {{policy.insCorp.shortName}}
                      </span>
                    </span>
                    <span style="display: flex;align-items: center;">
                      <span style="color:#666;font-size:.24rem;margin-left:.5rem;line-height:.44rem">
                        {{ policy.premium > 0 ? " ¥ " + policy.premium : policy.policiesIns}}
                      </span>
                    </span>
                  </p>
                </div>
              </li>
              <li class="qdown">
                <img :src="srcitem" v-show="hasInsurePoliciesData&&imgshow">
                <p v-show="textshow" class="textshow">无更多数据了</p>
              </li>
            </ul>
            <div class="non-data" v-show="!hasInsurePoliciesData">
              <!-- <i class="ico-non-data"></i> -->
              <img src="../../assets/images/icon-nothing.png">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <ul class="qcust-list qmint-region" v-show="hasInsurePoliciesData">
              <li class="qmint-cell" v-for="item in insurePolicies" @click="insListPage(item)">
                <h4 class="qmint-title" style="line-height:.44rem">
                  {{item.carOwnerName ? item.plateNo + " - " + item.carOwnerName : (item.plateNo ? item.plateNo : "未上牌")}}
                </h4>
                <img :src="rightImg" style="position: absolute;left:90%;width: .5rem; height: .5rem;">
                <p style="color:#666;font-size:.24rem">VIN: {{item.vin}}</p>
                <p style="color:#666;font-size:.24rem">投保人: {{item.applicantName}}</p>
                <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin:.3rem 0;" />
                <div v-for="policy in item.policies" style="color:#666;font-size:.24rem;">
                  <p style="display:flex;align-items:center;font-size:.28rem;color:#333;height:100%;justify-content: space-between;">
                    <span style="display: flex;align-items: center;">
                      <img :src="policy.src ? policy.src : defaultImg" style="position: absolute;right:90%;width: .4rem; height: .4rem;">
                      <span style="color:#666;font-size:.24rem;margin-left:.5rem;line-height:.44rem">
                        {{policy.insCorp.shortName}}
                      </span>
                    </span>
                    <span style="display: flex;align-items: center;">
                      <span style="color:#666;font-size:.24rem;margin-left:.5rem;line-height:.44rem">
                        {{ policy.premium > 0 ? " ¥ " + policy.premium : policy.policiesIns}}
                      </span>
                    </span>
                  </p>
                </div>
              </li>
              <li class="qdown">
                <img :src="srcitem" v-show="hasInsurePoliciesData&&imgshow">
                <p v-show="textshow" class="textshow">无更多数据了</p>
              </li>
            </ul>
            <div class="non-data" v-show="!hasInsurePoliciesData">
              <!-- <i class="ico-non-data"></i> -->
              <img src="../../assets/images/icon-nothing.png">
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <mt-popup v-model="showQuery" position="bottom" popup-transition="popup-fade" class='qlili'>
        <div class="qmessagecc">
          <mt-header fixed class="def-header" title="投保记录查询">
            <div slot="left">
              <mt-button style="font-size:.3rem;color:#f94037" @click="closeone(false)">取消</mt-button>
            </div>
            <div slot="right">
              <mt-button style="font-size:.3rem;color:#f94037" @click="closeone(true)">确定</mt-button>
            </div>
          </mt-header>
          <hr width="100%" color="#f5f5f5" size="1" style="margin-top:48px;" />
          <div class="mint-region" style="color:#FC3738;padding:.2rem">
            <mt-field label="车牌号" class="upper" type="text" :disabled="isNonPlateNo" placeholder="输入车牌号" v-model="plateNo">
              <mt-switch @change="turn" v-model="isNonPlateNo">未上牌</mt-switch>
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
            <mt-field class="mint-formItm upper" label="车架号" :disabled="true">
              <input class="mint-input" type="text" v-model="vin" placeholder="输入车架号">
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="container-bottom">
      <bottomAllTab ref="bottomAllTab" :plant.sync="plante"></bottomAllTab>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import bottomAllTab from './../bottomtab/bottom-all-tab'
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
      searchImg: this.src = require('../../assets/images/ico-search.png'),
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
      qwrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background-color": "#F5F5F5",
      },
      showQuery: false,
      isNonPlateNo: false,
      plateNo: '',
      vin: '',
    }
  },
  components: {
    bottomAllTab
  },
  created: function() {

    if (this.$route.query.selected != undefined && this.$route.query.selected != '') {
      this.selected = this.$route.query.selected;
    }
    // this.selected = this.$route.query.selected;
    this.initHeight();
    this.getInsurePolicies('');
  },
  methods: {
    turn: function() { // 是否未上牌
      var self = this;
      self.changeCard();
    },
    changeCard: function() { // 有无车牌处理函数
      var self = this;
      self.inputPlateNo = !self.isNonPlateNo;
      if (!self.isNonPlateNo) {
        self.plateNo = "";
      } else {
        self.plateNo = "未上牌";
      }
    },
    //弹层
    closeone: function(flag) {
      var self = this;
      self.showQuery = false;
      if (flag) {
        var url = '/quotationList/search';
        if (self.plateNo || self.vin) {
          if (self.plateNo) {
            url = url + "?plateNo=" + self.plateNo;
            if (self.vin) {
              url = url + "&vin=" + self.vin;
            }
          } else if (self.vin) {
            url = url + "?vin=" + self.vin;
          }
        } else {
          Toast('请至少选择一个查询条件');
          return;
        }
        self.$router.push({ path: url });
      };
    },
    openone: function() {
      this.showQuery = true;
      this.ownerName = '';
      this.isNonPlateNo = false;
      this.plateNo = '';
    },
    initHeight: function() {
      this.qwrppera.height = window.innerHeight - 100 + 'px';
    },
    refresh() {
      this.contentScroll.refresh();
    },
    getInsurePolicies: function(params) {
      Indicator.open('加载中...');
      axiosGetAPI('/vi/insurePolicies' + params).then((res) => {
        Indicator.close();
        this.params = params;
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
               if (policies.insureStatus == 'Duplicate') {
                insureStatus = '重复投保'
              }
              /*policiesIns += policies.insCorp.shortName + ':';
              if (policies.premium > 0) {
                policiesIns += '￥' + policies.premium + ',';
              };
              policiesIns += insureStatus;
              if (i != (len - 1)) {
                policiesIns += ' | ';
              };*/
              try{
               policies.src = require(`@/assets/images/companys/${policies.insCorp.code}.png`)
              } catch(err){
               policies.src = require(`@/assets/images/companys/defaultImg.png`)
              }
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
    }
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
        var url = '/vi/insurePolicies' + this.params;
        var param = { offset: this.lengths, limit: this.limit }
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
  margin-bottom: .2rem;
}

.qmint-region .qmint-cell {
  padding: .3rem;
  background-color: #FFF;
  border-radius: 5px;
  margin: .2rem;
}

.qcust-list .qmint-title {
  font-size: .3rem;
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
  margin-top: .3rem;
  color: #999999
}

.qmessagecc {
  height: 100%;
  width: 100%;
}

.qlili {
  bottom: 0;
  top: 200;
}

</style>
