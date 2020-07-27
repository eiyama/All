<template>
  <div>
    <mt-header fixed class="def-header" title="进店车辆">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:0px;">
      <mt-navbar v-model="selected" class="select_status">
        <mt-tab-item id="1">
          <span class="item-click" @click="todayCarBtn">今日车辆</span>
        </mt-tab-item>
        <mt-tab-item id="2">
          <span class="item-click" @click="yesterdayCarBtn">昨日车辆</span>
        </mt-tab-item>
        <mt-tab-item id="3">
          <span class="item-click" @click="weekCarBtn">本周车辆</span>
        </mt-tab-item>
        <mt-tab-item id="4">
          <span class="item-click" @click="monthCarBtn">本月车辆</span>
        </mt-tab-item>
      </mt-navbar>
      <div :style="qwrppera" ref="wrppera">
        <div class="container-center">
          <div class="mt-list carInCustomers_item" id="mt-list" v-for="(item,index) in InCustomer" :key="item.id" @click="InCustomerDetail(item)">
            <div style="height:82px;width:100%">
              <div class="carInCustomers_title">进店时间：{{item.entryTime}}</div>
              <div class="carInCustomers_body">
                <div class="entryCarImage" v-show="item.entryCarImage">
                  <img :src="item.entryCarImage">
                </div>
                <div class="item_plateNo">
                  <b>{{item.plateNo}}</b>
                  <p v-if="item.carOwner">{{item.carOwner}}</p>
                  <p v-else></p>
                </div>
                <van-icon name="arrow" color="#ccc" />
              </div>
            </div>
            <div class="item_insCorp">
              <ul v-if="item.bzLatestEndDate != '' || item.insCorp != '' || item.bsLatestEndDate != '' ">
                <li>
                  <p>上年保险公司</p>
                  <p>{{item.insCorp}}</p>
                </li>
                <li>
                  <p>交强险止期</p>
                  <p>{{item.bzLatestEndDate}}</p>
                </li>
                <li>
                  <p>商业险止期</p>
                  <p>{{item.bsLatestEndDate}}</p>
                </li>
              </ul>
              <p v-else style="height:30px;line-height:30px;text-align:center;color:#999;font-size:12px; ">系统未查询到续保信息</p>
            </div>
            <div class="carInCustomers_footer">
              <button @click.stop="addmessage(item)">补充信息</button>
              <button @click.stop="offer(item)">报价</button>
              <button @click.stop="followIn(item)">跟进</button>
            </div>
            <div class="clear"></div>
          </div>
          <div class="qdown">
            <img :src="srcitem" v-show="hasInsurePoliciesData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </div>
          <div id="nodata" v-if="totalRows == '' || totalRows == '' ">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from "./../../common/Axios";
import { Indicator } from "mint-ui";
import bottomTab from "./../bottomtab/bottom-tab";
import store from "./../../store/store";
import * as types from "./../../store/types";
import BScroll from 'better-scroll';
export default {
  data() {
    return {
      active: 0,
      InCustomer: [],
      latestTrackBeginTime: "",
      latestTrackEndTime: "",
      entryBeginTime: "",
      entryEndTime: "",
      hasMore: false,
      selected: "1",
      totalRows: "",
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      qwrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background-color": "#F5F5F5",
      },
      lengths: '',
      imgshow: false,
      textshow: false,
      hasInsurePoliciesData: false,
    };
  },
  components: {
    bottomTab
  },
  created: function() {
    if (this.$route.query.selected != undefined && this.$route.query.selected != '') {
      this.selected = this.$route.query.selected;
      if (this.selected == '1') {
        this.todayCarBtn();
      } else if (this.selected == '2') {
        this.yesterdayCarBtn()
      } else if (this.selected == '3') {
        this.weekCarBtn()
      } else {
        this.monthCarBtn()
      }
    } else {
      this.todayCarBtn();
    }
    this.initHeight();
  },
  methods: {
    initHeight: function() {
      this.qwrppera.height = window.innerHeight - 49 + 'px';
    },
    refresh() {
      this.contentScroll.refresh();
    },
    openBack() {
      this.$router.push({ path: '/', query: { appId: localStorage.getItem('appId') } })
    },
    todayCarBtn() {
      this.totalRows = "";
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var day = date.getDate();
      var _m = m - 1;
      this.entryBeginTime = y + "-" + m + "-" + day;
      this.entryEndTime = y + "-" + m + "-" + day;
      this.getCarInCustomerData();
    },
    yesterdayCarBtn() {
      this.totalRows = "";
      var date = new Date();
      var y = date.getFullYear();
      var Month = date.getMonth() + 1;
      console.log(Month)
      var d = date.getDate();
      if (d == 1) {
        if (Month == 1) {
          y = y - 1;
          Month = 12 + Month - 1;
          d = d + 31 - 1;
        } else if (Month == 3 || 5 || 7 || 8 || 10 || 12) {
          d = 31 - 1;
        } else if (Month == 4 || 6 || 9 || 11) {
          d = 30 - 1;
        } else if (Month == 2) {
          if ((time % 4 == 0 && time % 100 != 0) || time % 400 == 0) {
            d = 29 - 1;
          } else {
            d = 28 - 1;
          }
        }
        Month = Month - 1
      } else {
        d = d - 1;
      }
      this.entryBeginTime = y + "-" + Month + "-" + d;
      this.entryEndTime = y + "-" + Month + "-" + d;
      this.getCarInCustomerData();
    },
    getCarInCustomerData: function() {
      this.textshow = false;
      Indicator.open("加载中...");
      axiosGetAPI(
        "/vi/customers/CarIn?offset=0&limit=20" +
        "&entryBeginTime=" +
        this.entryBeginTime +
        "&entryEndTime=" +
        this.entryEndTime
      ).then(res => {
        Indicator.close();
        if (res.result) {
          this.InCustomer = res.result;
          this.lengths = res.result.length;
        }
        if (res.page.totalRows) {
          this.totalRows = res.page.totalRows;

        }
      });
    },
    weekCarBtn() {
      this.totalRows = "";
      var myDate = new Date();
      var time = "";
      time = myDate.getFullYear();
      var Month = myDate.getMonth() + 1;
      var _Date = "";
      _Date = myDate.getDate();
      this.entryEndTime = time + "-" + Month + "-" + _Date;
      // 处理天数
      if (_Date <= 7) {
        if (Month == 1) {
          time = time - 1;
          Month = 12 + Month - 1;
          _Date = _Date + 31 - 6;
        } else if (Month == 3 || 5 || 7 || 8 || 10 || 12) {
          _Date = _Date + 31 - 6;
        } else if (Month == 4 || 6 || 9 || 11) {
          _Date = _Date + 30 - 6;
        } else if (Month == 2) {
          if ((time % 4 == 0 && time % 100 != 0) || time % 400 == 0) {
            _Date = _Date + 29 - 6;
          } else {
            _Date = _Date + 28 - 6;
          }
        }
        Month = Month - 1;
      } else {
        _Date = _Date - 6;
      }
      // 保持与弹层日期格式一样（月份和时间）
      if (Month < 10) {
        Month = "0" + Month;
      }
      if (_Date < 10) {
        _Date = "0" + _Date;
      }
      time = time + "-" + Month + "-" + _Date;
      this.entryBeginTime = time;
      this.getCarInCustomerData();
    },
    monthCarBtn() {
      this.totalRows = "";
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var day = date.getDate();
      var _m = m - 1;
      var _day = day;
      this.entryBeginTime = y + "-" + _m + "-" + _day;
      this.entryEndTime = y + "-" + m + "-" + day;
      this.getCarInCustomerData();
    },
    InCustomerDetail(item) {
      this.$router.push({ path: "/quoteManagement/carInCustomersDetail" + "?plateNo=" + item.plateNo + '&selected=' + this.selected });

    },
    addmessage(item) {
      var customerId = item.customerId;
      this.$router.push({ path: "/quoteManagement/updateInf?customerId=" + customerId + '&selected=' + this.selected });
    },
    offer(item) {
      var curDate = new Date();
      var hh = curDate.getHours();
      var mm = curDate.getMinutes();
      if (hh >= 8 && hh <=22) {
        if (hh == 22 && mm > 0) {
          Toast("非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。");
          return false;
        }
        var from = 'carInCustomers';
        //insCityCode=370200&insCityShortName=青岛&plateNo=粤B12345&ownerIdCardNo=&vin=&engineNo=
        var self = this;
        var url = "/quoteManagement/index";
        var carNo = item.plateNo ? item.plateNo : "";
        var vin = item.vin ? item.vin : "";
        url = url + "?plateNo=" + carNo + "&vin=" + vin + "&from=" + from;
        Indicator.open("加载中...");
        localStorage.removeItem("insureInfoApp");
        localStorage.removeItem("quoteInfoStatus");
        setTimeout(function() {
          Indicator.close();
          self.$router.push({ path: url });
        }, 100);
      } else{
        Toast("非工作时间，报价服务暂未启动。报价服务工作时间：8:00-22:00。");
        return false;
      }
    },
    followIn(item) {
      var customerId = item.customerId
      this.$router.push({ path: "/quoteManagement/trackRecord?customerId=" + customerId + '&selected=' + this.selected });
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
          // this.hasInsurePoliciesData = false;
          return;
        };
        var lengths = this.lengths
        var limit = 10;
        var url = "/vi/customers/CarIn";
        var param = { offset: this.lengths, limit: limit, entryBeginTime: this.entryBeginTime, entryEndTime: this.entryEndTime }
        this.imgshow = true;
        axiosGetAPI(url, param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.imgshow = false;
            this.hasInsurePoliciesData = true;
            this.lengths = this.InCustomer.length;
            this.InCustomer = [...this.InCustomer, ...res.result];
          } else {
            this.textshow = true;
            this.imgshow = false;
            this.hasInsurePoliciesData = false;
          }
        });
        this.$nextTick(() => {
          this.contentScroll //更新滚动视图
        })
      }
    })
  },
};

</script>
<style scoped>
.carInCustomers_item {
  margin: 10px;
  border-radius: 5px;
  background: #ffffff;
  /* border-radius: 5px; */
  /* height: 140px; */
  padding: 15px;
}

.carInCustomers_title {
  margin: 0px;
  height: 28px;
  line-height: 28px;
  /* border-bottom: 1px solid #f0f0f0; */
  font-size: 12px;
  color: #999;
}

.carInCustomers_body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entryCarImage img {
  height: 45px;
  border-radius: 5px;
}

.carInCustomers_body .item_plateNo {
  margin-left: 10px;
  width: 70%;
}

.carInCustomers_body .item_plateNo p {
  color: #333;
  font-size: 14px;
}

.item_insCorp {
  background: #f9f9f9;
}

.item_insCorp ul {
  width: 100%;
  height: 45px;
  background: #f9f9f9;
}

.item_insCorp ul li {
  list-style: none;
  float: left;
  width: 33%;
  text-align: center;
  margin: 5px 0;
  border-right: 1px solid #e1e1e1;
}

.item_insCorp ul li:nth-child(3) {
  border: 0;

}

.item_insCorp ul li p:nth-child(1) {
  color: #999;
  font-size: 12px;
}

.item_insCorp ul li p:nth-child(2) {
  color: #333;
  font-size: 12px;
}


.carInCustomers_footer {
  float: right;
  margin-top: 10px;
}

.carInCustomers_footer button {
  background: #fff;
  /* color: #b5caff; */
  color: #3c70f9;
  padding: 1px 15px;
  margin: 0 5px;
  border-radius: 5px;
  border: 1px solid #b5caff;
}

.mint-tab-content {
  padding: 10px 5px;
}

.container-center {
  padding: 1px 0;
}

#nodata {
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 50% 0;
  color: #a4a4a4;
  font-size: 16px;
}

.clear {
  clear: both;
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

</style>
