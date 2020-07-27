<template>
  <div class="home" style="background-color:#FFF">
    <mt-header fixed class="def-header cust-head" title="保单查询结果">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <hr width="100%" color="#f5f5f5" size="1" style="padding-top:48px" />
    <div ref="wrppera" :style="mywrppera">
      <div class="quota-content">
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
      title: '报价单',
      imgages: '',
      lengths: '',
      limit: 10,
      imgshow: false,
      textshow: false,
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
      mywrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background": "#f7f7f7"
      },
      showQuery: false,
      isNonPlateNo: false,
      plateNo: '',
      vin: '',
      startDate:'',
      endDate:'',
    }
  },
  created: function() {
    this.initHeight();
    this.getPolicies();
    /*this.policiesData.map(item => {
      var insType = '';
      var isBzRiskKind = false;
      var isBsRiskKind = false;
      if (item.bzRiskKind && item.bzRiskKind != '') {
        if (item.bzRiskKind.premium != '' && item.bzRiskKind.premium != 0) {
          insType += '交强险';
          isBzRiskKind = true;
        }
        if (item.bzRiskKind.vehicleTax) {
          if (item.bzRiskKind.vehicleTax.totalTax != '' && item.bzRiskKind.vehicleTax.totalTax != 0) {
            insType += '+车船税'
          }
        }
      }
      if (item.bsRiskKind && item.bsRiskKind != '') {
        if (item.bsRiskKind.premium != '' && item.bsRiskKind.premium != 0) {
          insType += '+商业险';
          isBsRiskKind = true;
        }
      }
      item.insType = insType;
      item.isBzRiskKind = isBzRiskKind;
      item.isBsRiskKind = isBsRiskKind;
    });*/
  },
  methods: {
    initHeight: function() {
      this.mywrppera.height = window.innerHeight - 44 + 'px';
    },
    refresh() {
      this.contentScroll.refresh();
    },
    openBack: function() {
      window.history.back();
    },
    getPolicies: function() {
      var self = this;
      self.plateNo = self.$route.query.plateNo;
      self.vin = self.$route.query.vin;
      self.startDate = self.$route.query.startDate;
      self.endDate = self.$route.query.endDate;
      var url = '/vi/policies/my';
      if (self.plateNo) {
        self.plateNo = self.plateNo.toUpperCase();
        url = url + '?plateNo=' + self.plateNo;
        if (self.vin) {
          self.vin = self.vin.toUpperCase();
          url = url + '&vin=' + self.vin;
        }
        if (self.startDate) {
          url = url + "&startInsuredTime=" + self.startDate;
        }
        if (self.endDate) {
          url = url + "&endInsuredTime=" + self.endDate;
        }
      } else if (self.vin) {
        self.vin = self.vin.toUpperCase();
        url = url + '?vin=' + self.vin;
        if (self.startDate) {
          url = url + "&startInsuredTime=" + self.startDate;
        }
        if (self.endDate) {
          url = url + "&endInsuredTime=" + self.endDate;
        }
      } else if (self.startDate) {
        url = url + "?startInsuredTime=" + self.startDate;
        if (self.endDate) {
          url = url + "&endInsuredTime=" + self.endDate;
        }
      } else if (self.endDate) {
        url = url + "?endInsuredTime=" + self.endDate;
      }

      Indicator.open('加载中...');
      axiosGetAPI(url).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          self.noData = false;
          self.policiesData = res.result;

          self.lengths = self.policiesData.length
          if (res.page.totalRows == 0) {
            self.textshow = false;
            self.imgshow = false;
          } else if (self.lengths == res.page.totalRows) {
            self.textshow = true;
            self.imgshow = false;
          } else {
            self.imgshow = true;
          };

          for (var i = 0; i < self.policiesData.length; i++) {
            self.policiesData.map(item => {
              if (item.insCorpCode) {
                  item.src = require(`@/assets/images/companys/${item.insCorpCode}.png`);
                } else{
                  item.src = require(`@/assets/images/companys/defaultImg.png`);
                }
              /*var insType = '';
              if (item.bzRiskKind && item.bzRiskKind != '') {
                insType += '交强险';
                if (item.bzRiskKind.vehicleTax) {
                  if (item.bzRiskKind.vehicleTax.totalTax != '' && item.bzRiskKind.vehicleTax.totalTax != 0) {
                    insType += '+车船税'
                  }
                }
                if (item.bsRiskKind && item.bsRiskKind != '') {
                  insType += '+商业险';
                }
              } else if (item.bsRiskKind && item.bsRiskKind != '') {
                if (item.bsRiskKind.premium != '' && item.bsRiskKind.premium != 0) {
                  insType += '+商业险';
                }
              }
              item.insType = insType;*/
            })
          }
        } else {
          self.textshow = false;
          self.imgshow = false;
        }
      });
    },
    policyDetail: function(item) {
      this.$store.commit(types.POLICYDETAIL, item);
      this.$router.push({ path: "/myInfo/policyDetail?policyId=" + item.policyId });
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
        if (this.lengths == null || this.lengths == '') {
          return;
        };
        var lengths = this.lengths
        var limit = this.limit
        var url = '/vi/policies/my';
        this.plateNo = this.$route.query.plateNo;
        this.vin = this.$route.query.vin;
        this.startDate = this.$route.query.startDate;
        this.endDate = this.$route.query.endDate;
        var param = { offset: this.lengths, limit: this.limit }
        if (this.plateNo) {
          param.plateNo = this.plateNo.toUpperCase();
          if (this.vin) {
            param.vin = this.vin.toUpperCase();
          };
          if (this.startDate) {
            param.startInsuredTime = this.startDate;
          }
          if (this.endDate) {
            param.endInsuredTime = this.endDate;
          }
        } else if (this.vin) {
          param.vin = this.vin.toUpperCase();
          if (this.startDate) {
            param.startInsuredTime = this.startDate;
          }
          if (this.endDate) {
            param.endInsuredTime = this.endDate;
          }
        } else if (this.startDate) {
          if (this.startDate) {
            param.startInsuredTime = this.startDate;
          }
        } else if (this.endDate) {
          if (this.endDate) {
            param.endInsuredTime = this.endDate;
          }
        }
        this.imgshow = true;
        axiosGetAPI(url, param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.policiesData = [...this.policiesData, ...res.result];
            this.lengths = this.policiesData.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
            } else {
              if (this.lengths < res.page.totalRows) {
                this.imgshow = false;
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
                /*var insType = '';
                if (item.bzRiskKind && item.bzRiskKind != '') {
                  insType += '交强险';
                  if (item.bzRiskKind.vehicleTax) {
                    if (item.bzRiskKind.vehicleTax.totalTax != '' && item.bzRiskKind.vehicleTax.totalTax != 0) {
                      insType += '+车船税'
                    }
                  }
                  if (item.bsRiskKind && item.bsRiskKind != '') {
                    insType += '+商业险';
                  }
                } else if (item.bsRiskKind && item.bsRiskKind != '') {
                  if (item.bsRiskKind.premium != '' && item.bsRiskKind.premium != 0) {
                    insType += '+商业险';
                  }
                }
                item.insType = insType;*/
              })
            }
          } else {
            this.textshow = true;
            this.imgshow = false;
          }
        });
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
