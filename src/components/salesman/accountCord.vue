<template>
  <div class="home" style="background-color:#F5F5F5">
    <mt-header fixed class="def-header cust-head" title="结算记录">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;background: #fff;">
      <div :style="qwrppera" ref="wrppera">
        <div v-if="Settlements.length > 0" class="countDetail">
          <ul>
            <li @click="toDetail(item)" v-for="(item,index) in Settlements">
              <span>
                <p>{{item.settleDate}}</p>
                <p id="setdisplay" :style="{color:isColor[index]}">{{item.status}}
                  <van-icon name="arrow" />
                </p>
              </span>
              <span class="Itemspan">
                <p style="color:#A0A0A0">{{item.settleTypeDisplay}}</p>
                <p>{{item.settleAmount}}元</p>
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
      qwrppera: {
        "width": "100%",
        "height": "640px",
        "overflow": "hidden",
        "background": "#f7f7f7"
      },
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
      totalRows:''
    }
  },
  created: function() {
    if (sessionStorage.getItem('salesmanId')) {
      this.salesmanId = sessionStorage.getItem('salesmanId');
    }
    this.getSettlements('');
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
        if (this.lengths == null || this.lengths == '' || this.lengths >= this.totalRows) {
          this.hasInsurePoliciesData = false;
          return;
        };
        var lengths = this.lengths;

        var url = '/Salesmans/' + this.salesmanId + '/Settlements' + '?isSettled=' + true;
        // var url = "/vi/customers/CarIn";
        var param = { offset: this.lengths, limit: this.limit, feeType: this.feeType }
        this.imgshow = true;
        axiosGetAPI(url, param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.imgshow = false;
            this.hasInsurePoliciesData = true;
            this.totalRows = res.result.totalRows;
            this.Settlements = [...this.Settlements, ...res.result];
            res.result.map(item => {
              if (item.status == "Paid") {
                this.isColor.push("#999");
              }
              if (item.status == "Submitted") {
                this.isColor.push("#8CB0FD");
              }
              if (item.status == 'Reject') {
                this.isColor.push("#FD8C8C");
              }
              if (item.status == 'Checked') {
                this.isColor.push("#999");
              }
            })
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
      this.qwrppera.height = window.innerHeight - 49 + 'px';
    },
    getSettlements(checkStatus) {
      if (checkStatus == '') {
        var url = '/Salesmans/' + this.salesmanId + '/Settlements';
      } else {
        var url = '/Salesmans/' + this.salesmanId + '/Settlements?checkStatus=' + checkStatus;
      }
      Indicator.open('加载中...');
      axiosGetAPI(url).then(res => {
        Indicator.close();
        if (res.result) {
          this.Settlements = res.result;
          this.lengths = res.result.length;
          for (var i = 0; i < res.result.length; i++) {
            this.Settlements[i].settleAmount = res.result[i].settleAmount.toFixed(2);
          }

          res.result.map(item => {
            if (item.status == "Paid") {
              this.isColor.push("#999");
            }
            if (item.status == "Submitted") {
              this.isColor.push("#8CB0FD");
            }
            if (item.status == 'Reject') {
              this.isColor.push("#FD8C8C");
            }
            if (item.status == 'Checked') {
              this.isColor.push("#999");
            }
          })
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
      var param = "?packageId=" + item.id + "&isShow=isShow"
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
  padding: 15px;
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
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px
}

.noData {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
