<template>
  <div>
    <mt-header fixed class="def-header" title="进店车辆">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:0px;">
      <div class="Detail">
        <div class="Detail_carMessage">
          <h3>进店时间：{{InCustomer.entryTime}}</h3>
          <img :src="InCustomer.entryCarImage" alt />
          <div class="item_footer">
            <p>车牌号:</p>
            <p>{{plateNo}}</p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="Detail_renewal">
          <p class="Detail_title">车辆续保信息</p>
          <div class="canRenewal" v-if="InCustomer.insCorp!=''">
            <ul>
              <li>
                <p>续保险企:</p>
                <p>&nbsp;{{InCustomer.insCorp}}</p>
              </li>
              <li>
                <p>交强险止期:</p>
                <p>&nbsp;{{InCustomer.bzLatestEndDate}}</p>
              </li>
              <li>
                <p>商业险止期:</p>
                <p>&nbsp;{{InCustomer.bsLatestEndDate}}</p>
              </li>
            </ul>
            <div class="Detail_Modify">
              <p>信息有误？</p>
              <p @click="addmessage(InCustomer)">点此编辑</p>
            </div>
          </div>
          <div v-else>
            <p style="color: #999;font-size: 14px;margin: 10px 0 0 0;">未查询都续保信息</p>
          </div>
        </div>
        <div>
          <div class="Modify_user" v-if="InCustomer.carOwner==''">
            <div>
              <p>系统未检测到对应的客户</p>
              <button @click.stop="addmessage(InCustomer)">更新客户信息</button>
            </div>
            <div>
              <p>您也可以直接去报价，报价后系统会自动创建客户</p>
              <button @click.stop="offer(InCustomer)">去报价</button>
            </div>
          </div>
          <div class="Detail_footer" v-else>
            <div></div>
            <div class="footer_btn">
              <!-- <button
                  @click.stop="addmessage(item)"
              >补充信息</button>-->
              <button @click.stop="offer(InCustomer)">报价</button>
              <button @click.stop="followIn(InCustomer)">跟进</button>
            </div>
          </div>
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
export default {
  data() {
    return {
      active: 0,
      InCustomer: {},
      plateNo: "",
      selected: '',
    };
  },
  components: {
    bottomTab
  },
  created: function() {
    if (this.$route.query.selected != undefined && this.$route.query.selected != '') {
      this.selected = this.$route.query.selected;
    }
    this.plateNo = this.$route.query.plateNo;
    Indicator.open("加载中...");
    axiosGetAPI("/vi/customers/CarIn?model.plateNo=" + this.plateNo).then(
      res => {
        Indicator.close();
        if (res.result) {
          this.InCustomer = res.result[0];
        }
      }
    );
  },
  methods: {
    openBack() {
      // this.$router.back();
      this.$router.push({ path: '/quoteManagement/carInCustomers?selected=' + this.selected })
    },
    addmessage(item) {
      var customerId = item.customerId;
      this.$router.push({
        path: "/quoteManagement/updateInf?customerId=" + customerId
      });
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
        var from = "carInCustomers";
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
      var customerId = item.customerId;
      this.$router.push({
        path: "/quoteManagement/trackRecord?customerId=" + customerId
      });
    }
  }
};

</script>
<style scoped>
.Detail {
  padding: 10px 0;
}

.Detail_carMessage {
  margin: 10px;
  border-radius: 5px;
  padding: 15px 0;
  background: #ffffff;
}

.Detail_carMessage h3 {
  color: #999;
  font-size: 12px;
  margin: 0 0 15px 15px;
}

.Detail_carMessage img {
  height: 100%;
  width: 100%;
}

.item_footer {
  display: flex;
  align-items: center;
  height: 30px;
  margin-left: 15px;
}

.item_footer p {
  font-size: 14px;
}

.item_footer p:nth-child(1) {
  color: #666;
}

.item_footer p:nth-child(2) {
  color: #333;
}

.Detail_renewal {
  background: #ffffff;
  padding: 15px;
  margin: 10px;
}

.Detail_title {
  color: #999;
  font-size: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.canRenewal {
  margin: 10px 0;
}

.canRenewal ul li {
  display: flex;
  justify-items: center;
  /* margin: 5px 0; */
}

.canRenewal ul li p:nth-child(1) {
  color: #999;
  font-size: 14px;
}

.canRenewal ul li p:nth-child(2) {
  color: #333;
  font-size: 14px;
}

.Detail_Modify {
  color: #999;
  margin-top: 40px;
  display: flex;
}

.Detail_Modify p:nth-child(2) {
  color: #3e79f6;
  margin-left: 5px;
}

.Detail_footer {
  position: fixed;
  z-index: 9;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #f9f9f9;
}

.Detail_footer .footer_btn {
  margin: 15px 0 0 15px;
}

.Detail_footer .footer_btn button {
  background: #fff;
  color: #3c70f9;
  padding: 3px 15px;
  margin: 0 5px;
  border-radius: 5px;
  border: 1px solid #b5caff;
}

.Modify_user {
  text-align: center;
}

.Modify_user div:nth-child(1) {
  margin-top: 60px;
}

.Modify_user div:nth-child(2) {
  margin-top: 12px;
}

.Modify_user div p {
  font-size: 12px;
  color: #999;

}

.Modify_user div button {
  margin: 10px;
  background: #fff;
  color: #3c70f9;
  border-radius: 5px;
  border: 1px solid #b5caff;
  width: 90%;
  padding: 8px 0;
}

.clear {
  clear: both;
}

</style>
