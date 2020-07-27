<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="结算明细">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;">
      <div ref="wrppera">
        <van-tabs v-model="selectedIndex" color="#0070D3" style="font-weight:bold;padding-top:10px" type="card" @click="getSettlements">
          <van-tab title="费用明细" name="1"></van-tab>
          <van-tab title="冲红明细" name="2"></van-tab>
        </van-tabs>
        <div v-if="Settlements.length > 0" class="countDetail">
          <ul>
            <li v-for="(item,index) in Settlements">
              <span class="Itemspan">
                <p style="color:#333;font-size:15px;font-weight:bold">被保险人：{{item.insuredName}}</p>
              </span>
              <span class="Itemspan">
                <p style="color:#666;font-size:12px;font-weight:bold">车牌号码：{{item.plateNo}}</p>
              </span>
              <span class="Itemspan">
                <p style="color:#666;font-size:12px">保险公司：{{item.insCompanyCodeName}}</p>
                <p style="color:#666;font-size:12px">{{item.issuanceDate}}</p>
              </span>
              <span class="Itemspan">
                <p style="color:#666;font-size:12px">分保单号：{{item.subPolicyNo}}</p>
                <p style="color:#666;font-size:12px">保费金额：{{item.amount}}</p>
              </span>
              <span class="Itemspan">
                <!-- <p style="color:#666;font-size:12px">费用比例(%)：{{item.rate}}</p> -->
                <p style="color:#666;font-size:12px">费用: {{item.rateAmount}}</p>
              </span>
            </li>
          </ul>
          <div class="qdown">
            <img :src="srcitem" v-show="hasInsurePoliciesData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </div>
        </div>
        <div class="noData" v-else>
          <img src="../../assets/images/icon-nothing.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui';
import {
  axiosGetAPI,
  axiosPostAPI
} from './../../common/Axios';
import {
  Indicator
} from 'mint-ui';
import BScroll from 'better-scroll';
import router from './../../router';
import store from './../../store/store';
export default {
  data() {
    return {
      selectedIndex:"1",
      /*qwrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background": "#f7f7f7"
      },*/
      activeName: '1',
      showTime: false,
      currentDate: new Date(),
      beginDate: false,
      beginValue: '',
      endValue: '',
      endDate: false,
      currentend: new Date(),
      Settlements: [],
      salesmanId: '',
      isColor: [],
      lengths: '',
      imgshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      textshow: false,
      hasInsurePoliciesData: false,
      limit: 10,
      itemId: 0,
    }
  },
  created: function() {
    this.itemId = this.$route.query.itemId;
    this.getSettlements();
    this.initHeight();
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
          this.hasInsurePoliciesData = false;
          return;
        };
        var lengths = this.lengths;
        var url = '/Settlements/' + this.itemId + "/Fees";
        if (this.selectedIndex == '2') {
          url = '/Settlements/' + this.itemId + "/Adjustments";
        }
        var param = { offset: this.lengths, limit: this.limit}
        this.imgshow = true;
        axiosGetAPI(url, param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.imgshow = false;
            this.hasInsurePoliciesData = true;
            this.Settlements = [...this.Settlements, ...res.result];
            if (this.Settlements.length >= res.result.totalRows) {
              this.lengths = res.result.totalRows;
              this.limit = 0;
              return
            } else {
              this.lengths = this.Settlements.length;
            }
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
  methods: {
    refresh() {
      this.contentScroll.refresh();
    },
    initHeight: function() {
      // this.qwrppera.height = window.innerHeight - 49 + 'px';
    },
    getSettlements() {
      this.Settlements = [];
      this.lengths = 0;
      var url = '/Settlements/' + this.itemId + "/Fees";
      if (this.selectedIndex == '2') {
        url = '/Settlements/' + this.itemId + "/Adjustments";
      }
      var param = { offset: 0, limit: this.limit}
      Indicator.open('加载中...');
      axiosGetAPI(url, param).then(res => {
        Indicator.close();
        if (res.result) {
          this.Settlements = res.result;
          this.lengths = res.result.length;
        }
      })
    },

    openBack: function() {
      window.history.back();
    },
    filterTime() {
      this.showTime = true;
    },
    showBegin() {
      this.beginDate = true;
    },
    closebeginTime() {
      this.beginDate = false;
    },
    onbeginTime(value) {
      this.beginValue = this.Common.Public.dateString(value);
      this.closebeginTime();
    },
    showEnd() {
      this.endDate = true;
    },
    closeendTime() {
      this.endDate = false;
    },
    onendTime(value) {
      this.endValue = this.Common.Public.dateString(value);
      this.closeendTime();
    },

    toDetail(item) {
      if (this.reviewRemark == undefined) {
        this.reviewRemark = ''
      }
      var param = "?settleAmount=" + item.settleAmount + '&id=' + item.id + "&isShow=isShow"
      this.$router.push({
        path: 'accountCordDetail' + param
      })
    }

  }
}

</script>
<style scoped>
.performanceItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.beginTime {
  width: 35%;
  border: 1px solid #eee;
  border-radius: 5px;
}

.performanceItem p {
  color: #333;
  font-size: 14px;
}

.countBtn {
  padding: 7px 20px;
  background: #0066ff;
  color: #fff;
  border-radius: 5px;

}

.brokerage {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 15px
}

.brokerage li p:nth-child(1) {
  color: #999;
  font-size: 12px;
}

.brokerage li p:nth-child(2) {
  color: #333;
  font-size: 14px;
}

.countDetail {
  padding-left: 15px;
  padding-right: 15px;
}

.countDetail ul {
  width: 100%;
  text-align: center;
}

.countDetail ul li {
  padding: 15px;
  border-bottom: 1px solid #eeeeee;
  background: #FFFFFF;
  margin: 10px 0px;
  border-radius: 10px;
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

.countDetail ul li span {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px 0;
}

.countDetail ul li span {}

.filter {
  border-left: 1px solid #eee;
  display: flex;
  align-items: center;
  width: 10%;
  justify-content: center;
}

.chooseTime {
  min-height: 200px;
  padding: 15px;
}

#setdisplay {
  display: flex;
  align-items: center;
}

.Itemspan p:nth-child(2) {
  color: #303030;
  font-size: 12px;
  margin-right: 10px
}

.noData {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
