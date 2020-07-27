<template>
  <div style="background-color:#F5F5F5">
    <mt-header fixed class="def-header" title="客户">
      <mt-button slot="right" v-show="selected==1" >
        
        <!-- <img :src="searchImg" style="width:22px;height:22px;margin-top:8px" /> -->
        <span style="display:flex;align-items: center;">
          <p @click="screenBtn" style="margin-right: 0.06rem;color: #7d7e80;">筛选</p>
          <img @click="screenBtn" style="height: .32rem;" src="./../../assets/images/filtration.png" />
        </span>
     
      </mt-button>
      <mt-button slot="right" v-show="selected==2"><i @click="addCust" class="icon-icon-add"></i></mt-button>
    </mt-header>
    <div style="margin-top:1rem">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1"><span class="item-click" @click="getCars(900)">车险客户</span></mt-tab-item>
        <mt-tab-item id="2"><span class="item-click" @click="getCustomers()">非车客户</span></mt-tab-item>
      </mt-navbar>
      <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
      <div :style="cwrppera" ref="wrppera">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
          <ul class="mcust-list mmint-region" v-show="hasCarsData">
          <li class="mmint-cell" v-for="(item,index) in carsData" :key="index" @click="carDetail(item,$event)">
            <div class="itemTitle">
              <span style="display: flex;align-items: center;">
                <img style="height: .32rem;" src="./../../assets/images/user-icon.png" />
                <p style=" margin: 0 6px;max-width:3rem">{{item.carOwnerName ? item.carOwnerName : item.name ? item.name : '--' }}</p>
                <a @click.stop="" v-if="item.phone" >
                  <img style="height: .32rem;" src="./../../assets/images/phone.png" />
                </a>
              </span>
              <span style="display: flex;align-items: center;">
                <p style="color: #f44;">
                  {{ item.bzOverduedays ? "还剩" + (item.bsOverduedays ? (item.bzOverduedays - item.bsOverduedays > 0 ? item.bsOverduedays : item.bzOverduedays) : item.bzOverduedays) + "天到期" : (item.bsOverduedays ? "还剩" + item.bsOverduedays + "天到期" : "")}}</p>
                <van-icon name="arrow" color="#999999"/>
              </span>
            </div>
          <span style="display: flex;justify-content: space-between;align-items: center;margin:0.2rem 0">
            <p style="color:#999">保险公司：</p>
            <p style="color:#333">{{item.insCorpName ? item.insCorpName : '--'}}</p>
          </span>
            <div class="itemBody">
              <span v-if='item.plateNo' class="itemBody_title">
                <p >{{item.plateNo}}</p>
              </span>
              <span v-else-if="item.vin">
                  <p>{{item.vin}}</p>
              </span>
              <span class="itemBody_script">
                <p >交强险止期：{{item.bzLastYearEndDate ? item.bzLastYearEndDate : '--' }}</p>
                <p >商业险止期：{{item.bsLastYearEndDate ? item.bsLastYearEndDate : '--' }}</p>
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
          </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <div class="mmint-region">
              <div class="mmint-cell" v-for="(_item,_index) in customersData" :key="_index" @click="custDetail(_item,$event)">
               <div class="itemTitle">
              <span style="display: flex;align-items: center;">
                <img style="height: .32rem;" src="./../../assets/images/user-icon.png" v-show="_item.name" />
                <p style=" margin: 0 6px;max-width:3rem">{{_item.name}}</p>
                <a @click.stop="" v-if="_item.contactPhone" :href="'tel:' + _item.contactPhone">
                  <img style="height: .32rem;" src="./../../assets/images/phone.png" />
                </a>
              </span>
              <span style="display: flex;align-items: center;">
                <p style="color: #f44;">
                  {{_item.modifiedTime}}
                 </p>
                <van-icon name="arrow" color="#999999"/>
              </span>  
            </div>
                <div style="display: flex;margin: 0.2rem 0;">
                  <p style="color:#999">
                    住址信息：
                  </p>
                  <p>
                    {{_item.contactDistrict}}
                     {{_item.contactAddress}}
                  </p>
                </div>
                <span style="display: flex">
                  <p style="color:#999">邮箱：</p>
                  <p>{{_item.contactMail}}</p>
                </span>
              </div>
              </div>
            </mt-tab-container-item>
        </mt-tab-container>
      </div>      
      <mt-popup style="width: 80%;height: 100%;padding: 0 0.2rem;" v-model="showFilter" position="right" popup-transition="popup-fade">
        <mt-header fixed class="def-header" title="筛选">
          <div slot="left">
            <mt-button icon="back" @click="showFilter = false"></mt-button>
          </div>
        </mt-header>
        <div style="margin-top: 49px;padding-top: 0.0.1rem;">
          <div class="popop-item">
            <p>客户来源：</p>
            <van-row gutter="20" style="margin: 0;">
              <van-col class="item_col" :class="{isActive:customerSelected === customerIndex}" span="9" :key="customerIndex" v-for="(customerItem,customerIndex) in customerFrom" >
               <p  @click="selectCustomerFrom(customerItem,customerIndex)"> {{customerItem.display}}</p>
              </van-col>
            </van-row>
          </div>
           <div class="popop-item">
            <p>客户状态：</p>
            <van-row gutter="20" style="margin: 0;">
              <van-col class="item_col" :class="{isActive:customerStatusSelected === customerStatusIndex}" span="7" :key="customerStatusIndex" v-for="(customerStatusItem,customerStatusIndex) in customerStatus" >
               <p  @click="selectCustomerStatus(customerStatusItem,customerStatusIndex)"> {{customerStatusItem.name}}</p>
              </van-col>
            </van-row>
          </div>
            <div class="mint-region" style="color:#FC3738;padding:0.2rem">
            <span style="color:#333;font-weight:bold;line-height:30px">车辆信息:</span>
            <mt-field class="mint-formItm" label="车主名" type="text" :disabled="true" >
              <input v-model="ownerName" type="text" placeholder="输入车主名">
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
            <mt-switch style="color:#333;margin-left:0.2rem;" @change="turn" v-model="isNonPlateNo">未上牌</mt-switch>
            <mt-field label="车牌号" class="upper" type="text" :disabled="isNonPlateNo" placeholder="输入车牌号" v-model="plateNo">
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
            <mt-field class="mint-formItm upper" label="车架号" :disabled="true">
              <input class="mint-input" type="text" v-model="vin" placeholder="输入车架号">
            </mt-field>
        
          </div>
        </div>
          <div class="popup_Bottom">
                <p class="reset" @click="ResetFilter">重置</p>
                <p class="commit" @click="CommitFilter">确定</p>
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
import { InfiniteScroll } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import bottomAllTab from './../bottomtab/bottom-all-tab';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';
import { RadioGroup, Radio } from 'vant';
export default {
  name: 'home',
  data() {
    return {
      bzEndTime:[{name:'0-30天',code:'30'},{name:'30-60天',code:'60'},{name:'60-90天',code:'90'},{name:'90天+',code:'90'}],
      active:0,
      bsEndTime:[{name:'30天内',code:'30'},{name:'60天内',code:'60'},{name:'90天内',code:'90'},{name:'120天内',code:'120'}],
      bsselected:'',
      bzselected:'',
      customerStatusSelected:'',
      trackSelected:'',
      customerSelected:'',
      customerValue:'',
      customerStatusValue:'',
      trackValue:'',
      customerTitle: '',
      selected: '1',
      plante: 'customer',
      shouldShowLayer: false,
      hasCarsData: false,
      hasCustomersData: false,
      loadmoreActive: true,
      limit: 20,
      lengths: '',
      custLengths: '',
      date: '',
      imgshow: false,
      textshow: false,
      cimgshow: false,
      ctextshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      carsData: [{ "customerId": 28, "level": "H", "name": "", "phone": "15013514981", "email": "", "owner": { "name": "", "phone": "", "idNo": "", "idType": "IdCard", "relationType": "Person", "birthday": "", "gender": "Male" }, "plateNo": "粤SH0W28", "vin": "12345678901239567", "engineNo": "76346654", "brandName": "", "model": "", "makerModel": "", "vehicleModelCode": "", "purchasePrice": "", "analogyCarPrice": "", "year": "", "passengerCapacity": "", "registerDate": "", "remark": "", "exhaustMeasure": "", "isChangedOwner": "", "changedOwnerDate": "", "aliasName": "", "seriesName": "", "fullPriceModel": "" }],
      headImg: this.src = require('../../assets/images/icon-headImg.png'),
      customersData: [{
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
      }],
      cwrppera: {
        "width": "100%",
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
      searchDay: "",
      showFilter:false,
      endDueDay:'',
      trackStatus:[],
      customerStatus:[
        {
          name:'待续保',
          value:'None'
        },
         {
          name:'已出单',
          value:'PolicyConfirmation'
        },
        {
          name:'战败',
          value:'OrderFailure'
        }
      ],
      customerFrom: [
        {
            "text": "QuotedIn", 
            "value": 0, 
            "display": "报价录入"
        }, 
        {
            "text": "CameraIn", 
            "value": 1, 
            "display": "摄像头进店"
        }, 
        {
            "text": "ManualIn", 
            "value": 2, 
            "display": "人工录入"
        }, 
        {
            "text": "PushSMS", 
            "value": 3, 
            "display": "推修短信"
        }, 
        {
            "text": "ImportCustomer", 
            "value": 4, 
            "display": "导入客户"
        }, 
        {
            "text": "PhoneIn", 
            "value": 5, 
            "display": "电话呼入"
        }
    ],
    url:''

    }
  },
  components: {
    bottomAllTab
  },
  created() {
    this.initHeight();
    this.getCars(900);
    this.getCustomers();
    axiosGetAPI('/vi/repairOrder/getWordBooks?moduleName=' + '客户管理' + '&type=' + '跟进状态').then(res=>{
      if(res.result){
          this.trackStatus = res.result;
      }
    })
  },
  methods: {
    ResetFilter(){
      this.bsselected = ''
      this.bzselected = ''
      this.customerStatusSelected = ''
      this.trackSelected = ''
      this.customerSelected = ''
    },
    CommitFilter(){
      var url = 'vi/customers?offset=0';
        if(this.customerValue){
        url = url + "&originType=" + this.customerValue;
      }
      if(this.customerStatusValue ){
        url = url + '&status=' + this.customerStatusValue;
      }
      if(this.bsValue){
        url = url + '&overduedays=' + this.bsValue;
      }
      if(this.ownerName) {
         url = url + '&ownerName=' + this.ownerName;
      }
      if(this.plateNo) {
         url = url + '&plateNo=' + this.plateNo;
      }
      if(this.vin) {
         url = url + '&vin=' + this.vin;
      }
      this.url = url;
        Indicator.open('加载中...');
        axiosGetAPI(url).then(res=>{
             if (res.result && res.result != '') {
          this.carsData = res.result;
          this.hasCustomersData = true;
          this.lengths = this.carsData.length
          if (res.page.totalRows == 0) {
            this.textshow = false;
            this.imgshow = false;
          } else if (this.lengths == res.page.totalRows) {
            this.textshow = true;
            this.imgshow = false;
          } else {
            this.imgshow = false;
          };
        } else {
          this.textshow = false;
          this.imgshow = false;
          this.hasCustomersData = false;
        }
        Indicator.close();
        this.showFilter = false
        })
    },
    selectCustomerFrom(item,index){
         if (this.customerSelected === index) {
        this.customerSelected = "";
        this.customerValue = '';
      } else {
        this.customerSelected = index;
        this.customerValue = item.text;
      }
    },
    selectCustomerStatus(item,index){
        if (this.customerStatusSelected === index) {
        this.customerStatusSelected = "";
        this.customerStatusValue = '';
      } else {
        this.customerStatusSelected = index;
        this.customerStatusValue = item.value;
      }
    },
    selectTrackStatus(item,index){
      if (this.trackselected === index) {
        this.trackSelected = "";
        this.trackValue = '';
      } else {
        this.trackSelected = index;
        this.trackValue = item.code;
      }
    },
    selectBztime(item,index){
       if (this.bzselected === index) {
        this.bzselected = "";
        this.bzValue = '';
      } else {
        this.bzselected = index;
        this.bzValue = item.code;
      }
    },
    selectBstime(item,index){
       if (this.bsselected === index) {
        this.bsselected = "";
        this.bsValue = '';
      } else {
        this.bsselected = index;
        this.bsValue = item.code;
      }
    },

    screenBtn(){
      this.showFilter = true;
    },

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
        var url = '/customerManagement/search';
        if (self.plateNo || self.vin) {
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
          url = url + "&overduedays=" + self.searchDay;
        } else if (self.searchDay) {
          url = url + "?overduedays=" + self.searchDay;
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
      this.vin = '';
      this.isNonPlateNo = false;
      this.plateNo = '';
    },
    refresh() {
      this.contentScroll.refresh();
    },
    overDueDays(name,title){
     if(name == 0){
       this.getCustomers('366')
     }
     if(name == 1){
       this.getCustomers('30')
       // this.overduedays = '30';
     }
     if(name == 2){
       // this.overduedays = '90';
       this.getCustomers('90')
     }

    },
    getCars: function(date) {
      var param = { offset: 0, limit: this.limit, overduedays: this.overduedays, quotedTimeDesc: true, viExpiredTimeDesc: false };
      this.overduedays = date
      if (date && date != '') {
        param.overduedays = date
      }
      Indicator.open('加载中...');
      axiosGetAPI('/vi/customers', param).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          // this.carsData = res.result;
          this.carsData = res.result;
          this.lengths = this.carsData.length
          this.hasCarsData = true;
          if (res.page.totalRows == 0) {
            this.textshow = false;
            this.imgshow = false;
          } else if (this.lengths == res.page.totalRows) {
            this.textshow = true;
            this.imgshow = false;
          } else {
            this.imgshow = false;
          };
        } else {
          this.textshow = false;
          this.imgshow = false;
          this.hasCarsData = false;
        }
      });
    },
    carDetail: function(item, e) {
      e.preventDefault();
      this.$store.commit(types.CUSTDETAILS, item);
      this.$router.push({ path: "/customerManagement/custDetail?customerId=" + item.id });
    },

    getCustomers: function(date) {
      var param = {};
      this.date = date
      if (date && date != '') {
        param.overduedays = date
      }
      Indicator.open('加载中...');
      var userId = sessionStorage.getItem('userIds')
      axiosGetAPI('/Users/' + userId + '/PotentialCustomers', param).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.customersData = res.result;
          this.custLengths = this.customersData.length;
          this.hasCustomersData = (this.custLengths > 0);
          if (res.page.totalRows == 0) {
            this.ctextshow = false;
            this.cimgshow = false;
          } else if (this.custLengths == res.page.totalRows) {
            this.ctextshow = true;
            this.cimgshow = false;
          } else {
            this.cimgshow = false;
          };
        } else {
          this.ctextshow = false;
          this.cimgshow = false;
          this.hasCustomersData = false;
        }
      });
    },
    custDetail: function(item, e) {
      e.preventDefault();

      var appId = localStorage.getItem("appId");
      var localToken = localStorage.getItem('token');
      if (localToken) {
        localToken = localToken.replace(appId + '_', '');
      }
      var url = "/potentialCustomer/detail?pcid=" + item.id + "&appId=" + appId + "&token=" + encodeURIComponent(localToken);
      this.$router.push({ path: url });
    },
    addCust: function() {
      this.$router.push({ path: "/addPotentialCustomer?selected=" + this.selected });
    },
    initHeight: function() {
      this.cwrppera.height = window.innerHeight - 100 + 'px';
    },
  },
  mounted() {
    this.selected = this.$route.query.selected;
    if (!this.selected) {
      this.selected = '1';
    };
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
        if (this.selected == '1') {
          if (this.lengths == null || this.lengths == '') {
            return;
          };
          var lengths = this.lengths
          var limit = this.limit
          this.imgshow = true;
          // var param = { offset: this.lengths, limit: this.limit, overduedays: this.date, quotedTimeDesc: true, viExpiredTimeDesc: false };
          var param = { offset: this.lengths, limit: this.limit, overduedays: this.overDudays,originType: this.customerValue,status: this.customerStatusValue,plateNo: this.plateNo, quotedTimeDesc: true, viExpiredTimeDesc: false };
          axiosGetAPI('/vi/customers', param).then((res) => {
            Indicator.close();
            if (res.result && res.result != '') {
              this.lengths = this.carsData.length
              if (res.page.totalRows == 0) {
                this.textshow = false;
                this.imgshow = false;
              } else {
                if (this.lengths < res.page.totalRows) {
                  this.imgshow = false;
                  this.carsData = [...this.carsData, ...res.result];
                } else {
                  this.carsData = [...this.carsData];
                  this.textshow = true;
                  this.imgshow = false;
                };
              }
              this.hasCarsData = true;
            } else {
              this.textshow = false;
              this.imgshow = false;
            }
          });
        } else {
          if (this.custLengths == null || this.custLengths == '') {
            return;
          };
          var custLengths = this.custLengths
          var limit = this.limit
          this.cimgshow = true;
          var param = { offset: this.custLengths, limit: this.limit };
          var userId = sessionStorage.getItem('userIds')
          axiosGetAPI('/Users/' + userId + '/PotentialCustomers', param).then((res) => {
            Indicator.close();
            if (res.result && res.result != '') {
              this.custLengths = this.customersData.length
              if (res.page.totalRows == 0) {
                this.textshow = false;
                this.cimgshow = false;
              } else {
                if (this.custLengths < res.page.totalRows) {
                  this.cimgshow = false;
                  this.customersData = [...this.customersData, ...res.result];
                } else {
                  this.customersData = [...this.customersData];
                  this.textshow = true;
                  this.cimgshow = false;
                };
              }
              this.hasCustomersData = false;
            } else {
              this.textshow = false;
              this.cimgshow = false;
            }
          });
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
.mcust-list {
  padding-top: 0.1rem;
}

.mcust-list .mmint-region {
  margin-bottom: 0.2rem;
}

.mmint-region .mmint-cell {
  padding: 15px;
  background-color: #FFF;
  border-radius: 0.1rem;
  margin: 0.2rem;
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
  margin-top: 0.1rem
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
    padding: 0.06rem;
    border-radius: 0.1rem;
}

.itemBody_title p{
    color: #fff;
    border-radius: 0.1rem;
    padding: 0px 0.1rem;
    border: 1px solid #fff;
    font-size: .24rem;
    width: 1.36rem;
    text-align: center;
}

.itemBody_script{
  font-size: .24rem;
  color: #666;
}

.popop-item{
  margin: 0.2rem 0;
}

.item_col{
    background: #F9F9F9;
    text-align: center;
    margin: 0.1rem;
    padding: 0.06rem;
    border-radius: 0.1rem;
}

.isActive{
  background: rgb(252, 55, 56);
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
  background: rgb(252, 55, 56);
  width: 50%;
  line-height: 50px;
  color: #FFF;
}

</style>
