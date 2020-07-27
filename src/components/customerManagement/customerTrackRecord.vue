<template>
  <div>
    <mt-header fixed class="def-header" title="添加跟进状态">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="followInAdd" style="margin-top:48px">
      <van-field readonly clickable label="跟进结果" :value="followInvalue" placeholder="选择跟进结果" @click="showPickerRes = true" right-icon="arrow" />
      <van-popup v-model="showPickerRes" position="bottom">
        <van-picker show-toolbar :columns="followStatus" @cancel="showPickerRes = false" @confirm="onConfirmRes" />
      </van-popup>
      <!-- 时间 -->
      <div v-show="isTime" class="Followintime">
        <van-field readonly clickable label="下次跟进时间" :value="model.remindTime" placeholder="选择跟进时间" @click="showPickerTime = true" right-icon="arrow" />
        <van-popup v-model="showPickerTime" position="bottom">
          <van-datetime-picker v-model="currentDate" type="datetime" @cancel="cancel" @confirm="confirmTime" />
        </van-popup>
        <van-radio-group v-model="timeRadio" class="timeRadio">
          <van-radio @click="getNoticeDay(1)" name="tomorrow">明天</van-radio>
          <van-radio @click="getNoticeDay(2)" name="afterTomorrow">后天</van-radio>
          <van-radio @click="getNoticeDay(3)" name="threeDays">三天后</van-radio>
          <van-radio @click="getNoticeDay(5)" name="fiveDays">五天后</van-radio>
        </van-radio-group>
      </div>
      <!-- 跟进内容 -->
      <van-cell-group style="height: 2rem;">
        <van-field v-model="model.content" label="本次跟进内容" type="textarea" placeholder="请输入跟进内容" rows="1"  />
      </van-cell-group>
      <!-- 保存按钮 -->
      <div class="btn_addFollowIn">
        <!-- <button @click="AddFollowIn">保存</button> -->
        <mt-button @click="AddFollowIn" type="primary" size="large">保存</mt-button>
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
import { Radio } from 'vant';
export default {
  data() {
    return {
      customerId: "",
      followIndetail: [],
      followInvalue: "",
      showPickerRes: false,
      showPickerTime: false,
      followStatus: [],
      followCode: [],
      followIntime: "",
      currentDate: new Date(),
      model: { remindTime: "", content: "", status: '' },
      timeRadio: "",
      isTime: true,

    };
  },
  created: function() {
    // if(this.$route.query.selected != undefined && this.$route.query.selected != '' ){
    // this.selected = this.$route.query.selected;
    // }
    if (this.$route.query.customerId != undefined && this.$route.query.customerId != '') {
      this.customerId = this.$route.query.customerId;
    }
    Indicator.open("加载中...");
    axiosGetAPI(
      "/vi/repairOrder/getWordBooks?moduleName=" +
      "客户管理" +
      "&type=" +
      "跟进状态"
    ).then(res => {
      if (res.result) {
        Indicator.close();
        var arr = [""];
        var _arr = [""];
        for (var i = 0; i < res.result.length; i++) {
          arr.push(res.result[i].description);
          _arr.push(res.result[i].value);
        }
        this.followStatus = arr;
        this.followCode = _arr;
      }
    });
  },
  methods: {
    openBack() {
      this.$router.back();
      // this.$router.push({path:'/quoteManagement/carInCustomers?selected=' + this.selected})
    },
    onConfirmRes(value) {
      this.followInvalue = value;
      this.showPickerRes = false;
      console.log(this.followCode);
      console.log(this.followStatus);
      console.log(value)
      for (var i = 0; i < this.followStatus.length; i++) {
        if (value == this.followStatus[i]) {
          this.model.status = this.followCode[i];
          console.log(this.model.status)
        }
      };
      if (this.followInvalue == "忙碌中待联系" || this.followInvalue == "已报价考虑中" || this.followInvalue == "预约面谈" || this.followInvalue == "客户挂机" || this.followInvalue == '') {
        this.isTime = true;
      } else {
        this.isTime = false;
        this.model.remindTime = ''
      }
    },
    cancel() {
      this.showPickerTime = false;
    },
    confirmTime(value) {
      this.model.remindTime = this.Common.Public.datetimeString(value);
      this.cancel();
    },
    AddFollowIn() {
      var customerId = this.customerId;
      if (this.followInvalue == "忙碌中待联系" || this.followInvalue == "已报价考虑中" || this.followInvalue == "预约面谈" || this.followInvalue == "客户挂机") {
        if (this.model.remindTime == '') {
          Toast({
            message: '请选择跟进时间',
            position: 'bottom',
            duration: 2000
          });
          return;
        }
      };
      if (this.model.status == '') {
        Toast({
          message: '请选择跟进状态',
          position: 'bottom',
          duration: 2000
        });
        return;
      };
      axiosPostAPI('/vi/customers/' + customerId + '/tracks', this.model).then(res => {
        if (res.status == '200') {
          this.$router.back();
        }
      })
    },
    gettime() {
      var now = new Date()
      var y = now.getFullYear();
      var m = now.getMonth() + 1;
      if (m < 10) {
        m = "0" + m
      }
      var d = now.getDate();
      var h = now.getHours()
      if (h < 10) {
        h = "0" + h
      }
      var min = now.getMinutes()
      if (min < 10) {
        min = "0" + min
      }
      var time = { y, m, d, h, min }
      return time;
    },
    getNoticeDay(day) {
      var time = this.gettime()
      var d = time.d + day;
      if ((time.m == 1 || 3 || 5 || 7 || 8 || 10) && d > 31) {
        time.m = time.m + 1;
        d = d - 31;
      } else if (time.m == 12 && d > 31) {
        time.m = 1;
        time.y = time.y + 1;
        d = d - 31;
      } else if ((time.m == 4 || 6 || 9 || 11) && d > 30) {
        time.m = time.m + 1;
        d = d - 30;
      } else if (time.m == 2) {
        if (((time % 4 == 0 && time % 100 != 0) || time % 400 == 0) && d > 29) {
          d = d - 29;
          time.m = time.m + 1
        } else {
          d = d - 28;
          time.m = time.m + 1
        }
      }
      if (d < 10) {
        d = "0" + d
      }
      this.model.remindTime = time.y + '-' + time.m + '-' + d + ' ' + time.h + ':' + time.min;
    },
  }
};

</script>
<style scoped>
.followInAdd {
  padding: .3rem 0;
}

.followIn_item {
  margin: .2rem;
  background: #ffffff;
  padding: 5px .2rem;
  border-radius: 5px;
}

.follow_title {
  border-bottom: 1px solid #f0f0f0;
}



.btn_addFollowIn {
  margin-top: .4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: .3rem;
  margin-right: .3rem;
}

.btn_addFollowIn p {
  width: 2rem;
  background: rgba(22, 155, 213, 1);
  font-size: 14px;
  color: #ffffff;
  margin: 0 .4rem;
  border-radius: 5px;
  text-align: center;
  line-height: .6rem;
  height: .6rem;
}

.Followintime {
  background: #ffffff;
  height: 1.7rem;
}

.timeRadio {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.timeRadio .van-radio {
  width: 22%;
  height: .6rem;
}

</style>
