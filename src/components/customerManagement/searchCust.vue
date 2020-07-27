<template>
  <div style="background-color:#F5F5F5">
    <mt-header fixed class="def-header" title="查询结果">
      <div slot="left">
        <mt-button @click="openBack" icon="back"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px">
      <div :style="cwrppera" ref="wrppera">
        <ul class="mcust-list mmint-region" v-show="hasCustomersData">
          <li class="mmint-cell" v-for="item in customersData" @click="custDetail(item,$event)">

            <!-- <img :src="carImg" style="position: absolute;right:89%;width: 25px; height: 25px;">
            <h4 class="mmint-title" style="margin-left:25px;line-height:35px">
              {{item.owner.name ? item.plateNo + " - " + item.owner.name : (item.plateNo ? item.plateNo : "未上牌")}}
            </h4>
            <img :src="defaultImg" style="position: absolute;left:90%;width: 25px; height: 25px;">
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;" />
            <p style="color:#666;font-size:12px;margin-top:5px">VIN: {{item.vin}}</p>
            <p style="color:#666;font-size:12px">品牌型号: {{item.model}}</p>
            <p style="color:#666;font-size:12px">注册日期: {{item.registerDate ? item.registerDate.split(' ')[0] : ""}}</p> -->
              
              <div class="itemTitle">
              <span style="display: flex;align-items: center;">
                <img style="height: 16px;" src="./../../assets/images/user-icon.png" v-show="item.carOwnerName" />
                <p style=" margin: 0 6px;max-width:150px">{{item.carOwnerName}}</p>
                <a @click.stop="" v-if="item.phone" :href="'tel:' + item.phone">
                  <img style="height: 16px;" src="./../../assets/images/phone.png" />
                </a>
              </span>
              <span style="display: flex;align-items: center;">
                <p style="color: #f44;">
                  {{ item.bzOverduedays ? "还剩" + (item.bsOverduedays ? (item.bzOverduedays - item.bsOverduedays > 0 ? item.bsOverduedays : item.bzOverduedays) : item.bzOverduedays) + "天到期" : (item.bsOverduedays ? "还剩" + item.bsOverduedays + "天到期" : "")}}</p>
                <van-icon name="arrow" color="#999999"/>
              </span>
            </div>
          <span style="display: flex;justify-content: space-between;align-items: center;margin:10px 0">
            <p style="color:#999">保险公司名称</p>
            <p style="color:#333">{{item.insCorpName }}</p>
          </span>
            <div class="itemBody">
              <span class="itemBody_title">
                <p >{{item.plateNo}}</p>
              </span>
              <span class="itemBody_script">
                <p v-show="item.bzLastYearEndDate">交强险止期：{{item.bzLastYearEndDate }}</p>
                <p v-show="item.bsLastYearEndDate">商业险止期：{{item.bsLastYearEndDate}}</p>
              </span>
            </div>


          </li>
          <li class="mdown">
            <img :src="srcitem" v-show="hasCustomersData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </li>
        </ul>
        <div class="non-data" v-show="!hasCustomersData">
          <img src="../../assets/images/icon-nothing.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';
export default {
  name: 'home',
  data() {
    return {
      customerTitle: '',
      selected: '1',
      plante: 'customer',
      shouldShowLayer: false,
      hasCustomersData: false,
      loadmoreActive: true,
      limit: 20,
      lengths: '',
      overduedays: '366',
      imgshow: false,
      textshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      customersData: [{ "customerId": 0, "level": "H", "name": "", "phone": "15013514981", "email": "", "owner": { "name": "", "phone": "", "idNo": "", "idType": "IdCard", "relationType": "Person", "birthday": "", "gender": "Male" }, "plateNo": "", "vin": "", "engineNo": "", "brandName": "", "model": "", "makerModel": "", "vehicleModelCode": "", "purchasePrice": "", "analogyCarPrice": "", "year": "", "passengerCapacity": "", "registerDate": "", "remark": "", "exhaustMeasure": "", "isChangedOwner": "", "changedOwnerDate": "", "aliasName": "", "seriesName": "", "fullPriceModel": "" }],
      cwrppera: {
        "padding-top": "15px",
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background-color": "#F5F5F5",
      },
      showQuery: false,
      ownerName: "",
      plateNo: "",
      vin: "",
      isNonPlateNo: false,
      searchImg: this.src = require('../../assets/images/ico-search.png'),
      defaultImg: this.src = require('../../assets/images/right.png'),
      carImg: this.src = require('../../assets/images/ic-car.png'),
      plateNo: '',
      vin: '',
    }
  },
  created() {
    this.initHeight();
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    //弹层
    searchCust: function() {
      var self = this;
      self.plateNo = self.$route.query.plateNo;
      self.vin = self.$route.query.vin;
      self.overduedays = self.$route.query.overduedays;
      var url = '/vi/customers';
      if (self.ownerName) {
        url = url + "?name=" + self.ownerName;
        if (self.plateNo) {
          url = url + "&plateNo=" + self.plateNo;
        }
        if (self.vin) {
          url = url + "&vin=" + self.vin;
        }
      } else if (self.plateNo) {
        url = url + "?plateNo=" + self.plateNo;
        if (self.vin) {
          url = url + "&vin=" + self.vin;
        }
      } else if (self.vin) {
        url = url + "?vin=" + self.vin;
      };
      if (!self.plateNo && !self.vin) {
        url = url + "?overduedays=" + self.overduedays;
      } else {
        url = url + "&overduedays=" + self.overduedays;
      }
      Indicator.open('查询中...');
      axiosGetAPI(url).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          self.customersData = res.result;
          self.hasCustomersData = true;
          self.lengths = self.customersData.length
          if (res.page.totalRows == 0) {
            self.textshow = false;
            self.imgshow = false;
          } else if (self.lengths == res.page.totalRows) {
            self.textshow = true;
            self.imgshow = false;
          } else {
            self.imgshow = false;
          };
        } else {
          self.textshow = false;
          self.imgshow = false;
          self.hasCustomersData = false;
        }
      })
    },
    initHeight: function() {
      this.cwrppera.height = window.innerHeight + 'px';
    },
    refresh: function() {
      this.contentScroll.refresh();
    },
    custDetail: function(item, e) {
      e.preventDefault();
      this.$store.commit(types.CUSTDETAILS, item);
      this.$router.push({ path: "/customerManagement/custDetail?id=" + item.id });
    },
  },
  mounted() {
    this.searchCust();
    const contentScroll = new BScroll(this.$refs.wrppera, {
      probeType: 2,
      click: true
    });
    this.contentScroll = contentScroll
    //开始滚动前，更新视图大小
    contentScroll.on("beforeScrollStart", () => {
      this.refresh();
    });
    this.contentScroll = contentScroll;
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
        this.imgshow = true;
        this.plateNo = this.$route.query.plateNo;
        this.vin = this.$route.query.vin;
        this.overduedays = this.$route.query.overduedays;
        var param = {
          offset: this.lengths,
          limit: this.limit,
          overduedays: this.date,
          quotedTimeDesc: true,
          viExpiredTimeDesc: true,
          plateNo: this.plateNo,
          vin: this.vin,
          overduedays: this.overduedays
        };
        axiosGetAPI('/vi/customers', param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.lengths = this.customersData.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
            } else {
              if (this.lengths < res.page.totalRows) {
                this.imgshow = false;
                this.customersData = [...this.customersData, ...res.result];
              } else {
                this.customersData = [...this.customersData];
                this.textshow = true;
                this.imgshow = false;
              };
            }
            this.hasCustomersData = true;
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
  },

}

</script>
<style scoped>
.mcust-list {
  padding-top: 5px;
}

.mcust-list .mmint-region {
  margin-bottom: 10px;
}

.mmint-region .mmint-cell {
  padding: 10px;
  background-color: #FFF;
  border-radius: 5px;
  margin: 10px;
}

.mcust-list .mmint-title {
  font-size: 15px;
  color: #333;
  font-weight: bold;
}

.mdown {
  height: 40px;
  text-align: center;
}

.mdown img {
  width: 35px;
  height: 35px;
  margin-top: 5px
}

.mtextshow {
  margin-top: 15px;
  color: #999999
}

.cmessagecc {
  height: 100%;
  width: 100%;
}

.clili {
  bottom: 0;
  top: 200;
}

.itemTitle{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.itemBody{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.itemBody_title{
    background: #1641b4;
    padding: 3px;
    border-radius: 5px;
}

.itemBody_title p{
    color: #fff;
    border-radius: 5px;
    padding: 0px 5px;
    border: 1px solid #fff;
    font-size: 12px;
    width: 60px;
    text-align: center;
}

.itemBody_script{
  font-size: 12px;
  color: #666;
}

.popop-item{
  margin: 10px 0;
}

.item_col{
    background: #F9F9F9;
    text-align: center;
    margin: 5px;
    padding: 3px;
    border-radius: 5px;
}

.isActive{
  background: #0066FF;
  color: #FFFFFF;
}

.popup_Bottom{
  position: fixed;
  bottom: 0;
  right: 0;
  height: 50px;
  left: 0;
  background: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup_Bottom .reset{
  text-align: center;
  width: 50%;
  line-height: 50px;
}

.popup_Bottom .commit{
  text-align: center;
  background: #0070D3;
  width: 50%;
  line-height: 50px;
  color: #FFF;
}



</style>
