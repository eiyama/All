<template>
  <div class="customer">
    <mt-header fixed class="def-header cust-head" title="添加客户">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <div class="mint-region">
        <mt-field class="mint-formItm" label="姓名" :disabled="true">
          <input class="mint-input" type="text" v-model="customerData.name" placeholder="请输入姓名">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="mint-formItm" label="证件类型" type="text" :disabled="true">
          <span @click="openTypeBox">
            <input class="mint-input" v-model="ownerIdType" readonly="readonly" type="text" placeholder="选择证件类型">
            <i class="ico-arrow"></i>
          </span>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-popup v-model="popTypeVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="popTypeVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectTypeVal" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="typeSlots" @change="onTypesChange"></mt-picker>
        </mt-popup>
        <mt-field class="mint-formItm" label="证件号" type="text" :disabled="true">
          <input class="mint-input" v-model="customerData.identifyNo" type="text" placeholder="输入证件号" @blur.prevent="GetBirthday()">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="mint-formItm" label="出生日期" :disabled="true" type="text">
          <span @click="selOwnerBirthday">
            <input class="mint-input ownerBirthday" type="text" readonly="readonly" v-model="customerData.birthday" placeholder="选择出生日期">
            <i class="ico-arrow"></i>
          </span>
        </mt-field>
        <mt-datetime-picker ref="ownerBirthday" v-model="ownerBirthday" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="ownerBirthConfirm"></mt-datetime-picker>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field label="性别" type="text" :disabled="true">
          <span class="mint-plane fn-clear">
            <mt-radio v-model="customerData.sex" :options="[{label: '男', value: 'Male'}, {label: '女', value: 'Female'}]"></mt-radio>
          </span>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="mint-formItm" label="联系电话" type="number" :disabled="true">
          <input class="mint-input" oninput="if(value.length>11)value=value.slice(0,11)" v-model="customerData.contactPhone" type="number" placeholder="请输入联系电话">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="mint-formItm" label="联系邮箱" type="number" :disabled="true">
          <input class="mint-input" v-model="customerData.contactMail" type="email" placeholder="输入联系邮箱">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="mint-formItm" label="地区" type="number" :disabled="true" is-link>
          <span @click="opencity">
            <input class="mint-input" v-model="customerData.contactDistrict" readonly="readonly" type="text" placeholder="选择地区">
            <i class="ico-arrow"></i>
          </span>
        </mt-field>
        <!--地区弹框-->
        <mt-popup v-model="cityVisible" position="bottom" popup-transition="popup-fade">
          <div class="page-picker">
            <p @click="cancelcity" class="mint-datetime-action mint-datetime-cancel">取消</p>
            <p @click='conscity' class="mint-datetime-action mint-datetime-confirm">确定</p>
            <div style="clear: both"></div>
            <div class="page-picker-wrapper">
              <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
            </div>
          </div>
        </mt-popup>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="mint-formItm" label="详细地址" type="number" :disabled="true">
          <input class="mint-input" v-model="customerData.contactAddress" type="text" placeholder="输入详细地址">
        </mt-field>
      </div>
    </div>
    <mt-button class="btn-fixed" type="primary" size="large" @click="createCust">添加</mt-button>
  </div>
</template>
<script>
var typeResult = {
    个人: ["中华人民共和国身份证", "港澳居民来往内地通行证", "台胞证"],
  },
  arro = ["51", "52", "53", "59", "11", "13", "19"],
  arre = ["91", "92", "93"];
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import event from './../../common/event';
import city from '../../assets/json/city.json';
const address = city;
export default {
  name: 'customer',
  data() {
    return {
      customerData: {
        "customerManagerUserId": "",
        "name": "",
        "sex": "",
        "birthday": "",
        "identifyType": "",
        "identifyNo": "",
        "contactPhone": "",
        "contactMail": "",
        "contactDistrict": "",
        "contactAddress": ""
      },
      ownerIdTypeVal: "",
      popTypeVisible: false,
      startDate: new Date("1945-01-01"),
      endDate: new Date(this.Common.Public.GetDateStr(0)),
      typeSlots: [
        { flex: 1, values: Object.keys(typeResult), className: "slot1", textAlign: "center" },
        { divider: true, content: "-", className: "slot2" },
        { flex: 1, values: Object.values(typeResult)[0], className: "slot3", textAlign: "center" }
      ],
      ownerBirthday: "",
      ownerIdType: "",
      ownerSex: "",
      cityVisible: false,
      addressSlots: [
        { flex: 1, values: Object.keys(address), className: 'slot1', textAlign: 'center' },
        { divider: true, content: '-', className: 'slot2' },
        { flex: 1, values: ['北京市'], className: 'slot3', textAlign: 'center' }
      ],
      addressProvince: '北京市',
      addressCity: '北京市'
    };
  },
  mounted() {},
  methods: {
    onTypesChange(picker, values) {
      //滑动证件类型
      picker.setSlotValues(1, typeResult[values[0]]);
      this.ownerIdTypeVal = values;
    },
    openTypeBox: function() {
      //打开证件类型选择层
      this.popTypeVisible = true;
    },
    selectTypeVal: function() {
      //选择证件类型
      this.popTypeVisible = false;
      this.ownerIdType = this.ownerIdTypeVal[0] + " - " + this.ownerIdTypeVal[1];
      this.customerData.identifyType = this.Common.Public.cardTypeChange(
        this.ownerIdTypeVal[0],
        this.ownerIdTypeVal[1]
      )[1];
    },
    selOwnerBirthday: function() {
      // 打开日期层
      if (this.ownerBirthday)
        this.ownerBirthday = new Date(this.customerData.birthday);
      this.$refs.ownerBirthday.open();
    },
    ownerBirthConfirm: function(e) {
      // 选择日期
      if (this.ownerBirthday)
        this.customerData.birthday = this.Common.Public.dateString(
          this.ownerBirthday
        );
      $(".ownerBirthday").val(this.customerData.birthday);
      this.$refs.ownerBirthday.close();
    },
    openBack: function() {
      // window.history.back();
      var selected = this.$route.query.selected;
      var url = "/customerManagement/custIndex?selected=" + selected;
      this.$router.push({ path: url });
    },
    createCust: function() { //立即创建
      var self = this;
      if (!self.customerData.name) {
        Toast('请填写姓名')
        return false
      }
      if (!self.customerData.contactPhone) {
        Toast('请填写联系电话');
        return false
      } else {
        if (!this.Verify.validate.IsTeleMobilePNumber(self.customerData.contactPhone)) {
          Toast('请正确填写手机号');
          return false;
        }
      }
      Indicator.open('加载中...');
      self.customerData.customerManagerUserId = sessionStorage.getItem("userIds");
      axiosPostAPI('/PotentialCustomers', self.customerData).then((res) => {
        Indicator.close();
        if (res.status == 200) {
          Toast({
            message: '添加成功',
            position: 'bottom',
            duration: 2000
          });
          window.history.back();
        }
      });

    },
    //选择地区
    opencity: function() {
      this.cityVisible = true
    },
    onAddressChange(picker, values) {
      picker.setSlotValues(1, address[values[0]]);
      this.addressProvince = values[0];
      this.addressCity = values[1];
    },
    conscity: function() {
      this.cityVisible = false;
      this.customerData.contactDistrict = this.addressProvince + this.addressCity;
    },
    cancelcity: function(certificateNo) {
      this.cityVisible = false;
      this.addressProvince = '';
      this.addressCity = ''
    },
    GetBirthday: function() {
      var psidno = this.customerData.identifyNo;
      var birthdayno, birthdaytemp
      if (psidno.length == 18) {
        birthdayno = psidno.substring(6, 14)
      } else if (psidno.length == 15) {
        birthdaytemp = psidno.substring(6, 12)
        birthdayno = "19" + birthdaytemp
      } else {
        this.customerData.birthday = '';
        this.customerData.sex = '';
        return
      }
      this.ownerBirthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8)
      this.customerData.birthday = this.ownerBirthday;

      if (psidno) {
        var sexno, sex
        if (psidno.length == 18) {
          sexno = psidno.substring(16, 17)
        } else if (psidno.length == 15) {
          sexno = psidno.substring(14, 15)
        } else {
          alert("错误的身份证号码，请核对！")
          return
        }
        var tempid = sexno % 2;
        if (tempid == 0) {
          sex = 'Female'
        } else {
          sex = 'Male'
        }
        this.customerData.sex = sex;
      }

    }
  }
};

</script>
<style>
.customer {
  background-color: #FFF;
}

.customer .mint-cell-title {
  color: #000;
}

</style>
