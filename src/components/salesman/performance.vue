<template>
  <div class="home">
    <mt-header fixed class="def-header cust-head" title="业绩">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;">
      <mt-navbar v-model="activeName">
        <mt-tab-item id="1">
          <span class="item-click" @click="dayReport">日报</span>
        </mt-tab-item>
        <mt-tab-item id="2">
          <span class="item-click" @click="monthReport">月报</span>
        </mt-tab-item>
        <mt-tab-item id="3">
          <span class="item-click" @click="quarterReport">季报</span>
        </mt-tab-item>
        <mt-tab-item id="4">
          <span class="item-click" @click="yearReport">年报</span>
        </mt-tab-item>
      </mt-navbar>
      <!-- 弹层 -->
      <!-- navbar下面内容 -->
      <div class="isTime"><span>
          <p v-show="startDate!= '' ">{{startDate}}-</p>
          <p>{{endDate}}</p>
        </span>
        <!-- <span @click="moreTime" v-show="startDate!= ''"><p style="color: #5696F2;">更多</p><van-icon name="arrow" /> </span> -->
      </div>
      <div class="PerformanceBody">
        <div class="carInsurance" v-for="item in PerformanceResult">
          <h3>{{item.title}}</h3>
          <ul>
            <li v-for="(_item,index) in item.items">
              <p>{{_item.key}}</p>
              <p>{{_item.value}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  axiosGetAPI,
  axiosPostAPI,
  axiosPutAPI
} from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import router from './../../router';
import store from './../../store/store';
export default {
  data() {
    return {
      activeName: '1',
      PerformanceResult: [],
      salesmanId: '',
      startDate: '',
      endDate: '',

    }
  },
  created: function() {
    if (sessionStorage.getItem('salesmanId')) {
      this.salesmanId = sessionStorage.getItem('salesmanId');
    }
    this.dayReport()

  },

  methods: {
    getPerformanceResult(startDate, endDate) {
      var url = 'Salesmans/' + this.salesmanId + '/Performance' + '?startDate=' + startDate + '&endDate=' + endDate;
      Indicator.open('加载中...');
      axiosGetAPI(url).then(res => {
        Indicator.close();
        if (res.result) {
          this.PerformanceResult = res.result;
        }
      });
    },

    openBack: function() {
      window.history.back();
    },
    getTime() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var day = date.getDate();
      var time = y + "-" + m + "-" + day;
      this.endDate = y + "年" + m + "月";
      return { time, y, m, day };
    },
    dayReport() {
      var time = this.getTime().time;
      this.getPerformanceResult(time, time);
      var m = this.getTime().m;
      var day = this.getTime().day;
      this.startDate = '';
      var y = this.getTime().y
      // this.endDate =  y + "年" + m + "月" + day + '日';
      this.endDate = y + "年" + m + "月" + day + '日';
    },
    monthReport() {
      var time = this.getTime().time;
      var m = this.getTime().m;
      var day = 1;
      var y = this.getTime().y;
      var _time = y + "-" + m + "-" + day;
      this.getPerformanceResult(_time, time);
      this.startDate = '';

    },
    quarterReport() {
      var time = this.getTime().time;

      var m = this.getTime().m;
      if (m >= 1 && m <= 3) {
        var mon = 1;
        var _mon = 3;
      }
      if (m >= 4 && m <= 6) {
        var mon = 4;
        var _mon = 6;
      }
      if (m >= 7 && m <= 9) {
        var mon = 7;
        var _mon = 9;
      }
      if (m >= 10 && m <= 12) {
        var mon = 10;
        var _mon = 12;
      }
      var day = 1;
      var y = this.getTime().y;
      var time1 = y + "-" + mon + "-" + day;
      var time2 = y + "-" + _mon + "-" + day;
      this.getPerformanceResult(time1, time2);
      this.startDate = y + "年" + mon + "月";
      this.endDate = y + "年" + _mon + "月";
    },
    yearReport() {
      var time = this.getTime().time;
      var m = 1;
      var day = 1;
      var y = this.getTime().y;
      var _time = y + "-" + m + "-" + day;
      this.getPerformanceResult(_time, time);
      this.startDate = y + "年" + m + "月";

    },
    moreTime() {
      // this.$router.push({path:'performanceFilter'})
    }
  }
}

</script>
<style scoped>
.PerformanceBody {
  margin: 10px 10px 0 10px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
  /* min-height: 600px; */
  border: 1px solid #EEEEEE;
}

.carInsurance {
  border-bottom: 1px solid #EEEEEE;
  padding: 15px 0px;
}

.carInsurance ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.carInsurance ul li p:nth-child(2n-1) {
  color: #999999;
}

/* .carInsurance ul li:nth-child(1) p {
  font-size: 24px;
  color: #333;
} */
.isTime {
  background: #fff;
  display: flex;
  /* border-top: 1px solid #eee; */
  padding: 7px 15px;
  color: #999999;
  justify-content: space-between;
  align-items: center;
}

.isTime span {
  display: flex;
  align-items: center;
}

</style>
