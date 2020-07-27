<template>
  <div class="relation">
    <mt-header fixed class="def-header cust-head" title="添加家庭成员">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <div class="mint-region">
        <mt-field class="mint-formItm" label="姓名" :disabled="true">
          <input class="mint-input" type="text" v-model="relationData.name" placeholder="请输入姓名">
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
          <input class="mint-input" v-model="relationData.identifyNo" type="text" placeholder="输入证件号">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="mint-formItm" label="联系电话" type="number" :disabled="true">
          <input class="mint-input" oninput="if(value.length>11)value=value.slice(0,11)" v-model="relationData.contactPhone" type="number" placeholder="请输入联系电话">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <div @click="openRelationPop">
          <mt-field class="mint-formItm" label="关系" :disabled="true">
            <input class="mint-input" v-model="relationData.relation" type="text" placeholder="选择关系" disabled="true">
            <i class="ico-arrow"></i>
          </mt-field>
        </div>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-popup v-model="popRelationVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="popRelationVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectRelationShips" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="relationSlots" @change="onRelationChange"></mt-picker>
        </mt-popup>
        <div style="background:#F5F5F5; height: 10px"></div>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
      </div>
    </div>
    <div style="margin-left: 30px; margin-right: 30px">
      <mt-button @click="createRelation" type="primary" size="large" plain>确定</mt-button>
    </div>
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
export default {
  name: 'relation',
  data() {
    return {
      relationData: {
        "name": "",
        "relation": "",
        "identifyType": "",
        "identifyNo": "",
        "contactPhone": ""
      },
      ownerIdTypeVal: "",
      popTypeVisible: false,
      popRelationVisible: false,
      typeSlots: [
        { flex: 1, values: Object.keys(typeResult), className: "slot1", textAlign: "center" },
        { divider: true, content: "-", className: "slot2" },
        { flex: 1, values: Object.values(typeResult)[0], className: "slot3", textAlign: "center" }
      ],
      ownerIdType: "",
      relation: "",
      relationSlots: [{
        flex: 1,
        defaultIndex: 0,
        values: ["配偶", "儿子", "女儿", "父亲", "母亲", "祖父", "祖母", "外祖父", "外祖母",
          "孙子", "孙女", "外孙", "外孙女", "岳母/婆婆", "岳父/公公", "兄弟", "姐妹", "女婿", "儿媳", "其他亲属"
        ],
        className: "slot1"
      }],
    };
  },
  mounted() { // 获取续保信息

  },
  methods: {
    onTypesChange: function(picker, values) {
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
      this.relationData.identifyType = this.Common.Public.cardTypeChange(
        this.ownerIdTypeVal[0],
        this.ownerIdTypeVal[1]
      )[1];
    },
    openBack: function() {
      window.history.back();
    },
    openRelationPop: function() {
      this.popRelationVisible = true;
    },
    selectRelationShips: function() {
      this.relationData.relation = this.relation;
      this.popRelationVisible = false;
    },
    onRelationChange: function(picker, values) {
      this.relation = values[0];
    },
    createRelation: function() { //立即创建
      var self = this;
      if (!self.relationData.name) {
        Toast('请填写姓名')
        return false
      }
      if (!self.relationData.contactPhone) {
        Toast('请填写联系电话');
        return false
      } else {
        if (!this.Verify.validate.IsTeleMobilePNumber(self.relationData.contactPhone)) {
          Toast('请正确填写手机号');
          return false;
        }
      }
      Indicator.open('加载中...');
      var pcid = this.$route.query.pcid;
      axiosPostAPI('/PotentialCustomers/' + pcid + '/Relations', self.relationData).then((res) => {
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
  }
};

</script>
<style>
.relation {
  background-color: #FFF;
}

.relation .mint-cell-title {
  color: #000;
}

</style>
