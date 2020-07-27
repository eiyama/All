<template>
  <div class="quotedetail" style="padding: 0;">
    <mt-header fixed class="def-header cust-head" title="询价详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:5px;padding-bottom:45px;">
      <div style=" background: #FFFFFF;padding: 15px;">
        <span class="isItem">
          <p>询价单号：</p>
          <p>{{itemDetail.enquiryNo}}</p>
        </span>
        <div v-if="itemDetail.status == 'QuotedPrice'" class="hasBtn">
          <span class="isItem">
            <p style="width: 100%;">状态：</p>
            <p style="width: 100%;">{{itemDetail.statusDisplay}}</p>
          </span>
          <span v-show="itemDetail.status == 'QuotedPrice' " class="enteringBtn" @click="openEnterRes">
            录入出单结果
          </span>
        </div>
        <span v-else class="isItem">
          <p>状态：</p>
          <p>{{itemDetail.statusDisplay}}</p>
        </span>
        <span v-show="itemDetail.status == 'Reject'" class="isItem">
          <p>打回原因：</p>
          <p style="color: #FF464C;">{{itemDetail.remark}}</p>
        </span>
        <span class="isItem">
          <p>险种：</p>
          <p>{{itemDetail.productTypeDisplay }}</p>
        </span>
        <span class="isItem">
          <p>产品：</p>
          <p>{{itemDetail.productName}}</p>
        </span>
        <span class="isItem">
          <p>投保人：</p>
          <p>{{itemDetail.applicantName}}</p>
        </span>
        <span class="isItem">
          <p>总保费：</p>
          <p>￥{{itemDetail.premium.toFixed(2)}}</p>
        </span>
        <div class="isItem">
          <p>营业执照：</p>
          <viewer>
            <img :src="itemDetail.businessLicenseImgUrl" style="height:100px;max-width:100%" alt="">
          </viewer>
        </div>
      </div>
      <div class="item_Detail" style="margin: 10px;">
        <div class="isItem is-item" v-for="item in enquiryInfo">
          <p v-show="item.key">{{item.key}}：</p>
          <div v-if="item.type == 'image'" style="max-width: 70%;">
            <!-- <img :src="item.filePath" style="height:100px;width: 100%;" /> -->
            <viewer>
              <img :src="item.filePath" style="height:100px;max-width: 100%;">
            </viewer>
          </div>
          <div v-else-if="item.type == 'file'">
            <a :href="item.filePath" style="padding:  10px 0;">{{item.fileName}}下载</a>
            <!-- <p @click="downLoad(item)" style="padding: 5px 10px;background: #eee;">{{item.fileName}} &nbsp;&nbsp;下载</p> -->
          </div>
          <p v-else>{{item.value}}</p>
        </div>
        <div v-if="typeOfWorks.length > 0" style="border-top: 1px solid #EEEEEE;" v-for="workItem in typeOfWorks">
          <span class="isItem">
            <p>工种：</p>
            <p> {{workItem.workName}}</p>
          </span>
          <span class="isItem">
            <p>人数：</p>
            <p> {{workItem.numberOfPeople}}</p>
          </span>
          <span class="isItem">
            <p>有无高空：</p>
            <p>{{workItem.isWorkingAtHeights ? "有" : "无" }}</p>
          </span>
          <span class="isItem">
            <p>保额（元）：</p>
            <p>{{workItem.coverage.toFixed(2)}}</p>
          </span>
        </div>
      </div>
      <div v-show="itemDetail.status == 'Reject' " class="amendBtn">
        <mt-button class="btn-fixed" @click="amendInquiry" size="large" type="primary">修改</mt-button>
        <!-- <van-button class="mt20 btn_quote" type="info" size="large" @click="amendInquiry">修改</van-button> -->
      </div>
      <div class="item_Detail" style="margin: 10px;" v-if="itemDetail.bzBeginDate||itemDetail.bsBeginDate">
        <div class="middlebox fn-clear" v-if="itemDetail.bzBeginDate">
          <span class="detail-row-left header-left">交强险</span>
          <span class="detail-row-right header-right">￥{{itemDetail.bzAmount.toFixed(2)}}</span>
        </div>
        <div class="detail-row" v-if="itemDetail.bzBeginDate">
          <span class="smallboxone">交强险生效时间：<span style="color: #151515;">{{itemDetail.bzBeginDate}}</span>
          </span>
        </div>
        <div class="middlebox buttomone" style="margin-bottom: 10px;" v-show="itemDetail.tax && (itemDetail.tax > 0)">
          <span class="detail-row-left header-left" style="float: none;">车船税</span>
          <!-- <span class="smallboxone">滞纳金</span> -->
          <span class="detail-row-right header-right">￥{{itemDetail.tax.toFixed(2)}}</span>
        </div>
        <!--    <div class="detail-row"  v-show="itemDetail.tax && (itemDetail.tax > 0)">
          <span class="smallboxone">当年应缴: ¥{{itemDetail.tax.toFixed(2)}}</span>
        </div> -->
        <div class="detail-row" v-show="itemDetail.tax && (itemDetail.tax > 0)">
          <span class="smallboxone" v-show="itemDetail.preTax && (itemDetail.preTax > 0)">往年欠缴：¥ {{itemDetail.preTax.toFixed(2)}} </span>
          <span class="smallboxone" v-show="itemDetail.lateFeesOfTax && (itemDetail.lateFeesOfTax > 0)">滞纳金：¥{{itemDetail.lateFeesOfTax.toFixed(2)}}</span>
        </div>
        <div class="middlebox fn-clear" v-if="itemDetail.bsBeginDate">
          <span class="header-left">商业险</span>
          <span class="header-right">￥{{itemDetail.bsAmount.toFixed(2)}}</span>
        </div>
        <div class="detail-row buss" v-if="itemDetail.bsBeginDate">
          <span class="smalltwo">商业险生效时间：<span style="color: #151515;">{{itemDetail.bsBeginDate}}</span> </span>
        </div>
        <div class="detail-row-three" style="margin-top: 10px;" v-if="itemDetail.bsBeginDate">
          <ul style="font-size: 14px;color: #333333">
            <li class="detail-row-three-left">险种</li>
            <li class="detail-row-three-center">保费(￥)</li>
            <li class="detail-row-three-right">不计免赔(￥)</li>
          </ul>
        </div>
        <div class="detail-row-three" v-for="_item in itemDetail.riskKinds">
          <ul>
            <li class="detail-row-three-left" style="color:#666">
              <span>{{_item.riskKindItemName}}</span>
              <span v-if="_item.coverage=='国产'">(国产)</span>
              <span v-else-if="_item.coverage=='进口'">(进口)</span>
              <span v-else-if="_item.riskKindItemName=='乘客责任险' ">({{_item.coverage}}元)</span>
              <span v-else-if="_item.coverage>0">({{_item.coverage}}元)</span>
            </li>
            <li class="detail-row-three-center"><span>{{_item.premium}}</span></li>
            <li class="detail-row-three-right" v-if='_item.isDeductible'>{{_item.deductiblePremium}}</li>
          </ul>
        </div>
      </div>
      <div v-show="itemDetail.images.length > 0 ||  itemDetail.file != undefined" style="text-align: center;background: #FFFFFF;margin: 10px;padding: 10px;">
        <p style="color: #333333;font-size: 14px;text-align: left;">报价单资料：</p>
        <!-- <div > -->
        <viewer v-for="(itemImg, index) in itemDetail.images" :key="index">
          <img :src="itemImg.filePath" style="width: 83%;" />
        </viewer>
        <!-- </div> -->
        <a :href="itemDetail.file.url" v-if="itemDetail.file" style="padding: 5px 10px;background: #eee;">{{itemDetail.file.name}}下载</a>
      </div>
      <van-popup v-model="enterList" position="bottom">
        <div style="min-height: 180px;padding-top: 15px;padding-left: 15px;padding-right: 15px;padding-bottom: 5px;">
          <p style="font-size:16px;font-weight:600;color:#333">出单结果录入</p>
          <div style="display: flex;align-items: center;color:#333">
            <label>是否出单</label>
            <van-radio-group v-model="listRadio" @change="changeRadio" style="display: flex;align-items: center;margin: 20px;">
              <van-radio name="1" style="margin:0 20px;">出单</van-radio>
              <van-radio name="2">不出单</van-radio>
            </van-radio-group>
          </div>
          <div style="display: flex; align-items: center;color:#333" v-show="isShowcause">
            <p style="color: #333;">不出单原因：</p>
            <!--           <van-dropdown-menu :overlay="false" @change="changeCause">
              <van-dropdown-item v-model="causeOffailureValue" :options="causeOffailure" />
            </van-dropdown-menu> -->
            <el-select v-model="causeOffailureValue" placeholder="请选择">
              <el-option v-for="isitem in causeOffailure" :key="isitem.value" :label="isitem.text" :value="isitem.value">
              </el-option>
            </el-select>
          </div>
          <div class="popupBtn" style="display: flex;margin-top:30px">
            <p @click="enterList = false">取消</p>
            <p @click="submitCause">确定</p>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import {
  axiosGetAPI,
  axiosPostAPI,
  axiosPutAPI
} from './../../common/Axios';
import {
  Indicator,
  Toast
} from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import Vue from 'vue'
import Viewer from 'v-viewer'//放大查看图片
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
 Options: {  "button": true, "navbar": true, "title": true,  "keyboard": true, "url": "data-source" }
});
export default {
  data() {
    return {
      causeOffailure: [],
      showcauseOffailure: false,
      causeOffailureValue: '',
      enterList: false,
      listRadio: '1',
      isShowcause: false,
      itemDetail: {},
      id: '',
      statusDisplay: '',
      status: '',
      enquiryInfo: [],
      riskKinds: [],
      typeOfWorks: [],
      isChoose: false,
    }
  },
  created: function() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    Indicator.open('加载中...');
    axiosGetAPI('/enquiry/policies/' + this.id).then(res => {
      Indicator.close();
      if (res.result) {
        this.itemDetail = res.result;
        this.enquiryInfo = res.result.enquiryParameters;
        this.status = res.result.status;
        this.riskKinds = res.result.riskKinds;
        this.typeOfWorks = res.result.typeOfWorks;
      }
    })
    Indicator.open('加载中...');
    axiosGetAPI("/vi/repairOrder/getWordBooks?moduleName=询价字典管理&type=人工询价战败原因").then(res => {
      Indicator.close();
      if (res.result) {
        res.result.map(item => {
          var obj = {};
          obj.text = item.description;
          obj.value = item.value;
          this.causeOffailure.push(obj);

        })
      }
    })
  },
  methods: {
    downLoad(item) {
      var value = item.value;
      axiosGetAPI('/Documents/' + value + '/Download').then(res => {

      })
    },
    submitCause() {
      if (this.listRadio == '2') {
        if (this.causeOffailureValue) {
          Indicator.open('加载中...');
          axiosPutAPI("/enquiry/policies/" + this.id + "/" + this.status + "?reason=" + this.causeOffailureValue).then(
            res => {
              Indicator.close();
            })
          this.enterList = false;
        } else {
          Toast('请选择不出单原因');
          return;
        }
      }
      if (this.listRadio == '1') {
        Indicator.open('加载中...');
        axiosPutAPI("/enquiry/policies/" + this.id + "/" + this.status).then(
          res => {
            Indicator.close();
          })
        this.enterList = false;
      }

    },
    amendInquiry() {
      if (this.itemDetail.productTypeDisplay == "非车险") {
        this.$router.push({
          path: 'updataInquiry?id=' + this.id
        })
      }
      if (this.itemDetail.productTypeDisplay == "车险") {
        this.$router.push({
          path: '/manualInquiry/editVehicle?id=' + this.id
        })
      }
    },
    changeCause(value) {
      console.log(value);
    },
    openBack: function() {
      window.history.back();
    },
    openEnterRes() {
      this.enterList = true;
    },
    changeRadio(value) {
      console.log(value)
      if (value == '1') {
        this.isShowcause = false;
      }
      if (value == '2') {
        this.isShowcause = true;
      }
    },
    onConfirm() {

    },
    showcauseOffailureBtn() {
      this.showcauseOffailure = true;
      // console.log(123)
    },
    oncancel() {
      this.showcauseOffailure = false;
    },
  }
}

</script>
<style scoped>
.item_Detail {
  background: #FFFFFF;
  /* margin: 10px; */
  padding: 15px;
  border-radius: 8px
}

.isItem {
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
}

.popupBtn p {
  width: 48%;
  height: 18px;
  padding: 12px 0;
  text-align: center;
  background: #f2f2f2;
  margin: 5px;
  border-radius: 5px;
  color: #0070D3
}

.popupBtn p:hover {
  background: #0070D3;
  color: #FFFFFF;
}

.isItem p:nth-child(1) {
  font-size: 14px;
  color: #999;
}

.isItem p:nth-child(2) {
  font-size: 14px;
  color: #333;

}

.spanBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.hasBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hasBtn .isItem {
  margin: 0;
}

.amendBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.enteringBtn {
  background: #0066FF;
  padding: 5px 10px;
  border-radius: 4px;
  color: #FFFFFF;
  font-size: 12px;
}

</style>
