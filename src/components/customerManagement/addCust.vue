<template>
  <div class="vehicleInfo" style="background-color:#FFF">
    <mt-header fixed class="def-header cust-head" title="添加客户">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <div class="mint-region">
        <mt-field class="mint-formItm" label="客户姓名" type="number" :disabled="true">
          <input class="mint-input" v-model="customerData.name" type="text" placeholder="请输入客户姓名">
        </mt-field>
        <mt-field class="mint-formItm" label="客户手机号" type="number" :disabled="true">
          <input class="mint-input" v-model="customerData.phone" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="请输入客户手机号">
        </mt-field>
      </div>
      <div class="mint-region">
        <mt-field class="mint-formItm upper" label="车牌号" :disabled="true">
          <div class="plateNo-area fn-clear">
            <input class="mint-input" type="text" onkeyup="value=value.replace(/\s+/g,'')" v-model="customerData.plateNo" placeholder="请输入车牌号">
            <mt-switch @change="turn" v-model="isNonPlateNo">未上牌</mt-switch>
          </div>
        </mt-field>
        <mt-field class="mint-formItm" label="车架号" :disabled="true">
          <input class="mint-input" type="text" onkeyup="value=value.replace(/\s+/g,'')" v-model="customerData.vin" placeholder="请输入车架号">
        </mt-field>
        <mt-field class="mint-formItm" label="发动机号" :disabled="true">
          <input class="mint-input" type="text" v-model="customerData.engineNo" placeholder="请输入发动机号">
        </mt-field>
        <mt-field class="mint-formItm" label="品牌型号" :disabled="true">
          <input class="mint-input" type="text" v-model="customerData.model" placeholder="请输入品牌型号">
        </mt-field>
      </div>
    </div>
    <mt-button class="btn-fixed" type="primary" size="large" @click="Establish">立即创建</mt-button>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import event from './../../common/event';
export default {
  name: 'vehicleInfo',
  data() {
    return {
      isNonPlateNo: false,
      customerData: { "name": "", "phone": "", "plateNo": "", "vin": "", "engineNo": "", "model": "" }
    };
  },
  mounted() { // 获取续保信息

  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    Establish: function() { //立即创建
      var self = this;
      if (!self.customerData.name) {
        Toast('请填写客户姓名')
        return false
      }
      if (!self.customerData.phone) {
        Toast('请填写手机号');
        return false
      } else {
        if (!this.Verify.validate.IsTeleMobilePNumber(self.customerData.phone)) {
          Toast('请正确填写手机号');
          return false;
        }
      }
      if (!self.customerData.plateNo && this.isNonPlateNo == false) {
        Toast('请填写车牌号');
        return false
      } else {
        if (!this.Verify.validate.plateNo(self.customerData.plateNo) && this.isNonPlateNo == false) {
          Toast('请正确填写车牌号');
          return false;
        }
      }
      if (!self.customerData.vin) {
        Toast('请填写车架号')
        return false
      } else if (self.customerData.vin.length != 17) {
        Toast('请正确填写车架号')
        return false
      }
      if (!self.customerData.engineNo) {
        Toast('请填写发动机号');
        return false
      }
      if (!self.customerData.model) {
        Toast('请填写品牌型号');
        return false
      } else {
        if (this.isNonPlateNo) {
          self.customerData.plateNo = '未上牌'
        }
        var param = self.customerData
        axiosPostAPI('/vi/customers', param).then((res) => {
          this.$router.push({ path: "/customerManagement/custIndex" });
          console.log(res)
        });
      };
    }
  }
};

</script>
<style scoped>
.vehicleInfo {
  background-color: #F9F9F9;
}

.vehicleInfo .quote-row {
  height: 20px;
  padding: 10px 4%;
  font-size: 12px;
  color: #999;
  line-height: 20px;
}

.vehicleInfo .vehicleInfo #fullPriceModel {
  min-height: 40px;
  line-height: 20px;
  white-space: inherit;
}

.vehicleInfo .plateNo-area .mint-input {
  float: left;
  width: 50%;
  margin-right: 2%;
  margin-top: 4px;
}

.vehicleInfo .plateNo-area .mint-switch {
  float: right;
  width: 100px;
  clear: none;
}

</style>
