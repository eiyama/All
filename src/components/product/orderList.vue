<template>
  <div class="">
    <mt-header fixed class="def-header cust-head" style="z-index:2" title="非车订单">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:1rem;">
      <van-tabs
        v-model="trendIndex"
        line-height="3"
        line-width="25"
        background="#f2f2f2"
        color="rgba(37, 88, 255, 1)"
        @click="trendChangeBtn"
      >
        <van-tab title="全部"></van-tab>
        <van-tab title="待付款"></van-tab>
        <van-tab title="已出单"></van-tab>
        <van-tab title="待续保"></van-tab>
      </van-tabs>
      <!-- <div style="margin:0.3rem;">
        <span>
          筛选
          <img style="height:15px;" src="../../assets/images/od_down.png" alt />
        </span>
        <span style="margin-left:0.8rem;">
          全部时间
          <img style="height:15px;" src="../../assets/images/od_down.png" alt />
        </span>
      </div> -->
    </div>
    <div :style="cwrppera" ref="wrppera">
      <div>
        <div class="productItem" v-for="item in carsData" @click.prevent="toOrderDetail(item)">
          <div class="itemTitle">
            <p>{{item.insuredDateStr}}</p>
            <p>{{item.statusDisplay}}</p>
            <!-- <van-count-down :time="time" /> -->
            <!-- <p v-show="item.status == 'Cancel'">{{item.statusDisplay}}</p>
                        <p v-show="item.status == 'SuccessfulRelease'">{{item.statusDisplay}}</p>
                        <p v-show="item.status == 'EPolicyGenerated'">{{item.statusDisplay}}</p>
            <p v-show="item.status == 'OutOfOrder'">{{item.statusDisplay}}</p>-->
          </div>
          <div class="itemConcent">
            <div class="concentLeft">{{item.insCorpName}}</div>
            <div class="concentRight">
              <h3>{{item.productName}}</h3>
              <p>投保人：{{item.applicantName}}</p>
              <p>被保人：{{item.insurantName}}</p>
              <p>保险期间：{{item.startDateStr}} 至 {{item.endDateStr}}</p>
              <div class="itemAmount">
                <p>订单金额：{{item.amount}}元</p>
                <div>
                  <span v-show="item.status == 'PendingPayment'" @click.stop="toPay(item)">去付款</span>
                  <span v-show="item.status == 'Expire'" @click.stop="toInsurance(item)">再次投保</span>
                  <span  v-show="item.status == 'Cancel' || item.status == 'Expire'" @click.stop="deleteOrder(item)" >删除订单</span>
                  <!-- <span v-show="item.status == 'SuccessfulRelease'" @click.stop="toInsurance(item)" >再次投保</span> -->
                  <!-- <span> </span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mdown">
          <img :src="srcitem" v-show="hasCustomersData && imgshow" />
          <p v-show="textshow" class="textshow">无更多数据了</p>
        </div>
        <div class="non-data" v-show="!hasCustomersData">
          <img src="../../assets/images/icon-nothing.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI , axiosDeleteAPI } from "./../../common/Axios";
import { Toast, Indicator } from "mint-ui";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      trendIndex: 0,
      imgshow: false,
      limit: 20,
      lengths: "",
      carsData: [],
      custLengths: "",
      srcitem: (this.src = require("../../assets/images/ajax-loader.gif")),
      textshow: "",
      hasCustomersData: false,
      prodectArr:[],
      status: "",
      time:'',
      cwrppera: {
        "width": "100%",
        "overflow": "hidden", 
        "marginTop":"0.2rem"   
      }
    };
  },
  methods: {
    openBack() {
      this.$router.back();
    },
    refresh() {
      this.contentScroll.refresh();
    },
    deleteOrder(item){
        axiosDeleteAPI('/UsersOrder/Delete?id=' + item.id).then(res=>{
            if(res.status == 200){
                Toast('删除成功');  
                this.getSearch();      
            }
        })
    },
    trendChangeBtn() {
      switch (this.trendIndex) {
        case 0:
          this.status = "";
          this.getSearch();
          break;
        case 1:
          this.status = "PendingPayment";
          this.getSearch();
          break;
        case 2:
          this.status = "SuccessfulRelease ";
          this.getSearch();
          break;
        case 3:
          this.status = "EPolicyGenerated";
          this.getSearch();
          break;
      }
    },
    toOrderDetail(item) {
      this.$router.push({ path: "orderDetail?orderNo=" + item.orderNo + '&id=' + item.id});
    },
    toInsurance(item) {
    //   var data = this.Common.Public.countData(
    //     this.Common.Public.GetDateStr(0),
    //     item.endTime
    //   );

      // if(data > 30){
        //   平安产品
        var id = '';
        this.prodectArr.map(i=>{
            if(item.productCode == i.code){
                id = i.id;
            }
        })
        if(item.productCode == 'PAIC-HK-DJB'){
                this.$router.push({path:"/pingan/storeIndex?productCode=" + item.productCode + "&orderNo=" + item.orderNo + '&id=' + id  });
          }else if (item.productCode ==  'PAIC-HK-HYWY'){
              this.$router.push({path:"/pingan/freightIndex?productCode=" + item.productCode + "&orderNo=" + item.orderNo + '&id=' + id  });
          }else if (item.productCode ==  'PAIC-HK-CZWY'){
              this.$router.push({path:"/pingan/insureIndex?productCode=" + item.productCode + "&orderNo=" + item.orderNo + '&id=' + id  });
          }else{
                this.$router.push({path:"insuranceIndex?productCode=" + item.productCode + "&orderNo=" + item.orderNo + '&id=' + id  });
          }
      
      // }else{
      //     Toast('未到续保期，暂时无法投保')
      // }
    },
    toPay(item) {
      this.$router.push({
        path:
          "payPage?productCode=" + item.productCode + "&orderNo=" + item.orderNo
      });
    },
    getSearch() {     
      var self = this;
       self.textshow = false;
       self.imgshow = false;
       this.lengths = '';
      if (self.status) {
        var param = {
          offset: 1,
          limit: 20,
          status: self.status
        };
      } else {
        var param = { offset: 1, limit: 20 };
      }
      this.carsData = [];     
       Indicator.open("加载中");
      axiosGetAPI("/UsersOrder/Search", param).then(res => {
        Indicator.close();
        if (res.status == 200) {
            self.imgshow = false;
          this.carsData = res.result;
          this.lengths = this.carsData.length;
          this.hasCustomersData = true;
        }
      });
    }
  },
  created() {
    var self = this;
    this.cwrppera.height = window.innerHeight - 100 + "px";
    var param = { offset: 1, limit: self.limit };
    Indicator.open("加载中");
    axiosGetAPI("/UsersOrder/Search", param).then(res => {
      Indicator.close();
      if(res.result){
            // var date = new Date(res.result[0].insuredDateStr);
            // var time = date.setMinutes( date.getMinutes() + 30);
            // this.time = date.getTime() - new Date().getTime();
            // console.log(date.getHours() + '-' + date.getMinutes());
            this.carsData = res.result;
            this.lengths = this.carsData.length;
            this.hasCustomersData = true;    
      }      
    });
    if(!sessionStorage.getItem('prodectArr')){
        Indicator.open('加载中...');
        axiosGetAPI('/li/products', param).then((res) => {
          Indicator.close();
          if (res.result) {      
            self.prodectArr = res.result;   
            sessionStorage.setItem('prodectArr',JSON.stringify(res.result));    
          }
        });
    }else{
        self.prodectArr = JSON.parse(sessionStorage.getItem('prodectArr'));   
    }    
  },
  mounted() {
    var self = this;
    const contentScroll = new BScroll(this.$refs.wrppera, {
      probeType: 2,
      click: true
    });
    this.contentScroll = contentScroll;
    //开始滚动前，更新视图大小
    contentScroll.on("beforeScrollStart", () => {
      self.refresh();
    });
    self.contentScroll = contentScroll;
    contentScroll.on("scrollEnd", () => {
      var maxY = contentScroll.maxScrollY;
      var y = contentScroll.y;
      if (y >= maxY + 40) {
      } else if (y < maxY + 40 && y > maxY) {
        contentScroll.scrollTo(0, maxY + 70, 200);
      } else if (y <= maxY) {
        if (self.lengths == null || self.lengths == "") {
          return;
        }
        var lengths = self.lengths;
        var limit = self.limit;
        self.imgshow = true;
        // var param = { offset: this.lengths, limit: this.limit, overduedays: this.date, quotedTimeDesc: true, viExpiredTimeDesc: false };
        if (self.status) {
          var param = {
            offset: self.lengths,
            limit: self.limit,
            status: self.status
          };
        } else {
          var param = { offset: self.lengths, limit: self.limit };
        }
        axiosGetAPI("/UsersOrder/Search", param).then(res => {
          Indicator.close();
          if (res.result && res.result != "") {
            self.lengths = self.carsData.length;
            if (res.page.totalRows == 0) {
              self.textshow = false;
              self.imgshow = false;
            } else {
              if (self.lengths < res.page.totalRows) {
                self.imgshow = false;
                self.carsData = [...self.carsData, ...res.result];
              } else {
                self.carsData = [...self.carsData];
                self.textshow = true;
                self.imgshow = false;
              }
            }
            this.hasCustomersData = true;
          } else {
            self.textshow = false;
            self.imgshow = false;
          }
        });

        self.$nextTick(() => {
          self.contentScroll; //更新滚动视图
        });
      }
    });
  }
};
</script>
<style scoped>
.productItem {
  margin: 0.2rem;
  border-radius: 5px;
  background: #ffffff;
}
.productItem .itemTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
}
.productItem .itemTitle p:nth-child(2) {
  font-size: 0.24rem;
  color: #bcd6ff;
}
.productItem .itemConcent {
  border-top: 1px solid #eeeeee;
  padding: 0.2rem;
  display: flex;
}
.productItem .itemConcent .concentLeft {
  width: 1.2rem;
  height: 1.2rem;
  background: #e3ecfb;
  border-radius: 5px;
  line-height: 1.2rem;
  text-align: center;
  color: #ffffff;
  font-size: 12px;
}
.productItem .itemConcent .concentRight {
  margin-left: 0.2rem;
  flex: 1;
}
.productItem .itemConcent .concentRight h3 {
  font-size: 15px;
  margin-bottom: 0.1rem;
}
.productItem .itemConcent .concentRight p {
  color: #999999;
  font-size: 12px;
  line-height: 0.4rem;
}
.productItem .itemConcent .concentRight .itemAmount {
  /* float: right;      */
  width: 100%;
  margin-top: 0.3rem;
}
.productItem .itemConcent .concentRight .itemAmount p {
  color: #333333;
  font-size: 14px;
  margin-bottom: 0.3rem;
  font-weight: bold;
  text-align: right;
}
.productItem .itemConcent .concentRight .itemAmount div span {
  padding: 0.04rem 0.3rem;
  border-radius: 16px;
  border: 1px solid #eee;
  float: right;
  margin-right: 0.1rem;
}
.mdown {
  height: 40px;
  text-align: center;
}

.mdown img {
  width: 35px;
  height: 35px;
  margin-top: 0.1rem;
}

.mtextshow {
  margin-top: 15px;
  color: #999999;
}
</style>