<template>
  <div class="home" style>
    <mt-header fixed class="def-header cust-head" title="询价详情编辑">
      <!--      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>-->
      <div slot="left">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openBack" />
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:5px;padding-bottom:45px;">
      <div style=" background: #FFFFFF;padding: 15px;">
        <span class="isItem">
          <p>询价单号：</p>
          <p>{{itemDetail.enquiryNo}}</p>
        </span>
        <!-- <div class=" hasBtn"> -->
        <span class="isItem">
          <p>状态：</p>
          <p>{{itemDetail.statusDisplay}}</p>
        </span>
        <span v-show="itemDetail.status == 'QuotedPrice' " class="enteringBtn" @click="openEnterRes">录入出单结果</span>
        <!-- </div> -->
        <span v-show="itemDetail.status == 'Reject'" class="isItem">
          <p>打回原因：</p>
          <p style="color: #f44;">{{itemDetail.remark}}</p>
        </span>
        <span class="isItem">
          <p>险种：</p>
          <p>{{itemDetail.productTypeDisplay }}</p>
        </span>
        <span class="isItem">
          <p>投保人：</p>
          <p>{{itemDetail.applicantName}}</p>
        </span>
        <span class="isItem">
          <p>总保费：</p>
          <p>￥{{itemDetail.premium}}</p>
        </span>
        <div class="isItem">
          <p>营业执照：</p>
          <img :src="itemDetail.businessLicenseImgUrl" style="height:100px" alt />
        </div>
      </div>
      <div style="margin-top: 15px;background: #fff;border-radius: 8px;padding: 10px;margin-left:10px;margin-right:10px">
        <van-field readonly required right-icon="arrow" clickable label="产品" :value="isUpdata.productName" placeholder=" 请选择" @click="categoryType = true" />
        <van-popup v-model="categoryType" position="bottom">
          <van-picker style show-toolbar :columns="category" @change="onChange" @cancel="categoryType = false" @confirm="onConfirm" />
        </van-popup>
        <div style="background: #fff">
          <div v-if="isUpdata.basicInfo && isUpdata.basicInfo.basicInfoDetails && isUpdata.basicInfo.basicInfoDetails.length > 0" v-for="(fieldItem, _index) in isUpdata.basicInfo.basicInfoDetails">
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-field placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.uploadValue">
                </van-field>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row v-if="fieldItem.fieldType == 'option'" style="padding: 6px;border-bottom: 1px solid #F9F9F9;">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14" style="line-height:35px">
                <el-select v-model="fieldItem.uploadValue" placeholder="请选择">
                  <el-option v-for="isitem in fieldItem.option" :key="isitem.value" :label="isitem.text" :value="isitem.text">
                  </el-option>
                </el-select>
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'file'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,'>
                </van-uploader>
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
              </van-col>
             <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
          </div>
          <div v-if="isUpdata.basicInfo && isUpdata.basicInfo.lastYearInfoDetails && isUpdata.basicInfo.lastYearInfoDetails.length > 0" v-for="(fieldItem, _index) in isUpdata.basicInfo.lastYearInfoDetails">
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-field placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.uploadValue">
                </van-field>
              </van-col>
            <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row v-if="fieldItem.fieldType == 'option'" style="padding: 6px;border-bottom: 1px solid #F9F9F9;">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14" style="line-height:35px">
                <el-select v-model="fieldItem.uploadValue" placeholder="请选择">
                  <el-option v-for="isitem in fieldItem.option" :key="isitem.value" :label="isitem.text" :value="isitem.text">
                  </el-option>
                </el-select>
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'file'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,'>
                </van-uploader>
              </van-col>
           <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
          </div>
          <div v-if="isUpdata.basicInfo && isUpdata.basicInfo.currYearInfoDetails && isUpdata.basicInfo.currYearInfoDetails.length > 0" v-for="(fieldItem, _index) in isUpdata.basicInfo.currYearInfoDetails">
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-field placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.uploadValue">
                </van-field>
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row v-if="fieldItem.fieldType == 'option'" style="padding: 6px;border-bottom: 1px solid #F9F9F9;">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14" style="line-height:35px">
                <el-select v-model="fieldItem.uploadValue" placeholder="请选择">
                  <el-option v-for="isitem in fieldItem.option" :key="isitem.value" :label="isitem.text" :value="isitem.text">
                  </el-option>
                </el-select>
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'file'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,'>
                </van-uploader>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
              </van-col>
             <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
          </div>
          <div v-for="(fieldItem, index) in isUpdata.details">
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-field placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.uploadValue"></van-field>
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row v-if="fieldItem.fieldType == 'option'" style="padding: 6px;border-bottom: 1px solid #F9F9F9;">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14" style="line-height:35px">
                <el-select v-model="fieldItem.uploadValue" placeholder="请选择">
                  <el-option v-for="isitem in fieldItem.option" :key="isitem.value" :label="isitem.text" :value="isitem.text"></el-option>
                </el-select>
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'file'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size="60px" v-model="fieldItem.fileList" accept=".docx, .doc, .pdf, text/plain" />
              </van-col>
             <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size="60px" v-model="fieldItem.fileList" accept="image/*" multiple />
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
          </div>
          <div v-if="isUpdata.isTypeOfWork">
             <p style="font-size:14px;color:#333;line-height:35px">工种分类表：</p>
              <viewer v-show="isUpdata.typeOfWorkMediaUrl">
                <img style="height:80px;" :src="isUpdata.typeOfWorkMediaUrl" alt="">
              </viewer>
            <table class="workTable" cellspacing="0" cellpadding="0">
              <tr>
                <th style="width: 25%;">工种</th>
                <th style="width: 20%;">人数</th>
                <th style="width: 25%;">有无高空</th>
                <th style="width: 25%;">保额（元/人）</th>
                <th style="width: 5%;"></th>
              </tr>
              <tr v-for="(workItem, workIndex) in isUpdata.typeOfWorks">
                <td>
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="workItem.valueWork" :options="workItem.optionWork" />
                  </van-dropdown-menu>
                </td>
                <td>
                  <van-field type="number" v-model="workItem.numberOfpeople"></van-field>
                </td>
                <td style="font-size: 14px;">
                  <van-dropdown-menu>
                    <van-dropdown-item v-model="workItem.valuekingHeight" :options="workItem.isWorkingAtHeights" />
                  </van-dropdown-menu>
                </td>
                <td>
                  <van-field type="number" v-model="workItem.coverage"></van-field>
                </td>
                <td>
                  <van-icon name="close" size="18px" color="#f44" @click="removeWorkitem(workIndex)" />
                </td>
              </tr>
            </table>
            <van-icon name="add-o" color="#67c23a" style="margin: 15px;" size="18px" @click="addworkItem" />
          </div>
        </div>
      </div>
      <div class="amendBtn">
        <mt-button class="btn-fixed" @click="amendInquiry" size="large" type="primary">确认更新</mt-button>
        <!-- <van-button class="mt20 btn_quote" type="info" size="large" @click="amendInquiry">确认更新</van-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from "./../../common/Axios";
import { Indicator, Toast } from "mint-ui";
import store from "./../../store/store";
import * as types from "./../../store/types";
import Vue from 'vue'
import Viewer from 'v-viewer'//放大查看图片
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true,  "keyboard": true, "url": "data-source" }
});
export default {
  // name: 'home',
  data() {
    return {
      causeOffailure: [],
      showcauseOffailure: false,
      causeOffailureValue: "",
      enterList: false,
      listRadio: "1",
      isShowcause: false,
      itemDetail: {},
      id: "",
      statusDisplay: "",
      status: "",
      enquiryParameters: [],
      riskKinds: [],
      typeOfWorks: [],
      hasRepair: false,
      hasNonCar: false,
      currentCategoryIndex: 0,
      closeImg: (this.src = require("../../assets/images/ico-close.png")),
      nonAuto: [],
      carData: [],
      currentIndex: 0,
      detailIndex: 0,
      hasCategoryVal: "",
      optionWork: [],
      valueWork: "",
      feildData: {},
      categoryItems: [],
      category: [],
      categoryType: false,
      categoryValue: "",
      productName: "",
      isUpdata: {},
      fieldName: [],
      imgName: []
    };
  },
  mounted: function() {
    var self = this;
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    if (this.$route.query.statusDisplay) {
      this.statusDisplay = this.$route.query.statusDisplay;
    }
    Indicator.open("加载中...");

    axiosGetAPI("/enquiry/" + "NonAuto" + "/products").then(res => {
      Indicator.close();
      if (res.result) {
        self.feildData = res;
        self.getProducts()
        // self.nonAuto = res.result;
        res.result.map(item => {
          self.category.push(item.productName);
        });
      }
    });
    Indicator.open("加载中...");
    axiosGetAPI(
      "vi/repairOrder/getWordBooks?moduleName=询价字典管理&type=人工询价工种"
    ).then(res => {
      Indicator.close();
      if (res.result) {
        self.valueWork = res.result[0].value;
        res.result.map(item => {
          var obj = {};
          obj.value = item.value;
          obj.text = item.description;
          self.optionWork.push(obj);
        });
      }
    });
  },
  methods: {
    onConfirm(value) {
      var self = this;
      this.isUpdata.productName = value;
      for (var index = 0; index < this.category.length; index++) {
        if (value == this.category[index]) {
          const field = {
            productName: "",
            details: [],
            isTypeOfWork: false,
            isEnable: false,
            typeOfWorks: []
          };
          field.productName = value;
          for (var i = 0; i < this.feildData.result.length; i++) {
           
            if (this.feildData.result[i].productName == value) {
               var item = this.feildData.result[i];
              // item.details.map(detailsItem => {
              for (var j = 0; j < item.details.length; j++) {
                
                var detailsItem = item.details[j];
                detailsItem.value = detailsItem.value ? detailsItem.value : "";
                if (detailsItem.fieldType == "option") {
                  detailsItem.option = [];
                  // detailsItem.uploadValue = '';
                  var arr = detailsItem.value.split(",");
                  for (var k = 0; k < arr.length; k++) {
                    var obj = {};
                    obj.text = arr[k];
                    obj.value = arr[k];
                    detailsItem.option.push(obj);
                  }
                  this.$set(item.details[j], "uploadValue", "");
                }
                if (item.details[j].fieldType == "file" || item.details[j].fieldType == "image" ) {
                  this.$set(item.details[j], "uploadValue", "");
                  this.$set(item.details[j], "fileList", []);
                }
                if (item.details[j].fieldTyp == "number" || item.details[j].fieldTyp == "text") {
                  this.$set(item.details[j], 'uploadValue', '');
                }
              }
              if (item.basicInfo) {
                  
              for (var key = 0; key < item.basicInfo.basicInfoDetails.length; key++) {
                var lastYearItem = item.basicInfo.basicInfoDetails[key];
                // var _item = item.details[k];
                if (lastYearItem.fieldType == "option") {
                  lastYearItem.option = [];
                  var arr = lastYearItem.value.split(',');

                  for (var i = 0; i < arr.length; i++) {
                    var obj = {};
                    obj.text = arr[i];
                    obj.value = i;
                    lastYearItem.option.push(obj);
                  }
                  this.$set(lastYearItem, 'uploadValue', '');
                }
                if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                  this.$set(lastYearItem, 'uploadValue', '');
                  this.$set(lastYearItem, 'fileList', []);
                }
                if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                  this.$set(lastYearItem, 'uploadValue', '');
                }
              }

              for (var key = 0; key < item.basicInfo.lastYearInfoDetails.length; key++) {
                var lastYearItem = item.basicInfo.lastYearInfoDetails[key];
                // var _item = item.details[k];
                if (lastYearItem.fieldType == "option") {
                  lastYearItem.option = [];
                  var arr = lastYearItem.value.split(',');
                  for (var i = 0; i < arr.length; i++) {
                    var obj = {};
                    obj.text = arr[i];
                    obj.value = i;
                    lastYearItem.option.push(obj);
                  }
                  this.$set(lastYearItem, 'uploadValue', '');
                }
                if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                  this.$set(lastYearItem, 'uploadValue', '');
                  this.$set(lastYearItem, 'fileList', []);
                }
                if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                  this.$set(lastYearItem, 'uploadValue', '');
                }
              }
              for (var key = 0; key < item.basicInfo.currYearInfoDetails.length; key++) {
                var lastYearItem = item.basicInfo.currYearInfoDetails[key];
                // var _item = item.details[k];
                if (lastYearItem.fieldType == "option") {
                  lastYearItem.option = [];
                  var arr = lastYearItem.value.split(',');

                  for (var i = 0; i < arr.length; i++) {
                    var obj = {};
                    obj.text = arr[i];
                    obj.value = i;
                    lastYearItem.option.push(obj);
                  }
                  this.$set(lastYearItem, 'uploadValue', '');
                }
                if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                  this.$set(lastYearItem, 'uploadValue', '');
                  this.$set(lastYearItem, 'fileList', []);
                }
                if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                  this.$set(lastYearItem, 'uploadValue', '');
                }
              }
                }
              // )
              field.details = item.details;
              field.isTypeOfWork = item.isTypeOfWork;
              field.basicInfo = item.basicInfo;
              field.isEnable = item.isEnable;
              field.id = item.id;
              console.log(this.categoryItems);
              if (item.isTypeOfWork) {
                var _field = {
                  optionWork: this.optionWork,
                  numberOfpeople: "",
                  isWorkingAtHeights: [{
                      text: "有",
                      value: true
                    },
                    {
                      text: "无",
                      value: false
                    }
                  ],
                  coverage: "",
                  valueWork: this.valueWork,
                  valuekingHeight: false
                };
                if (field.typeOfWorks.length < 1) {
                  field.typeOfWorks.push(_field);
                }
              }
                this.isUpdata = field;
            }
          }
        
        }
      }
      this.categoryType = false;
    },
    getProducts() {
      Indicator.open("加载中...");
      axiosGetAPI("/enquiry/policies/" + this.id).then(res => {
        Indicator.close();
        if (res.result) {
          this.productName = res.result.productName;
          this.itemDetail = res.result;
          this.enquiryParameters = res.result.enquiryParameters;
          this.status = res.result.status;
          this.riskKinds = res.result.riskKinds;
          this.typeOfWorks = res.result.typeOfWorks;
          this.getProductItem(this.productName);
        }
      });
    },

    getProductItem(type) {
      var self = this;
      if (this.category.length > 0) {
        for (var index = 0; index < this.category.length; index++) {
          if (type == this.category[index]) {
            var field = {
              productName: "",
              details: [],
              isTypeOfWork: false,
              isEnable: false,
              typeOfWorks: [],
              basicInfo: {}
            };
            field.productName = type;
            this.fieldName = [];
            self.imgName = [];
            for (var i = 0; i < this.feildData.result.length; i++) {
              var item = this.feildData.result[i];
              if (item.productName == type) {
                // item.details.map(detailsItem => {
                for (var j = 0; j < item.details.length; j++) {
                  var detailsItem = item.details[j];
                  detailsItem.value = detailsItem.value ? detailsItem.value : "";
                  if (detailsItem.fieldType == "option") {
                    detailsItem.option = [];
                    var arr = detailsItem.value.split(",");
                    for (var k = 0; k < arr.length; k++) {
                      var obj = {};
                      obj.text = arr[k];
                      obj.value = arr[k];
                      detailsItem.option.push(obj);
                    }
                    for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (item.details[j].fieldName == this.enquiryParameters[key].key) {
                        this.$set(item.details[j], "uploadValue", this.enquiryParameters[key].value);
                      }
                    }
                    // this.$set(item.details[j], "uploadValue", "");
                  }
                  if (item.details[j].fieldType == "file" || item.details[j].fieldType == "image") {
                    var uploadValue = "";
                    var fileList = [];
                    for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (item.details[j].fieldName == this.enquiryParameters[key].key) {
                        if (this.enquiryParameters[key].type == "file") {
                          var obj = {};
                          obj.url = this.enquiryParameters[key].fileName;
                          obj.value = this.enquiryParameters[key].value;
                          fileList.push(obj);
                        }
                        if (this.enquiryParameters[key].type == "image") {
                          var obj = {};
                          obj.url = this.enquiryParameters[key].filePath;
                          fileList.push(obj);
                        }
                      }
                    }
                    this.$set(item.details[j], "uploadValue", "");
                    this.$set(item.details[j], "fileList", fileList);
                  }
                  if (item.details[j].fieldType == "text" || item.details[j].fieldType == "number") {
                      this.$set(item.details[j], "uploadValue", '');
                      for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (item.details[j].fieldName == this.enquiryParameters[key].key) {
                            item.details[j].uploadValue = this.enquiryParameters[key].value;
                      }
                    }
                  }
                }
                if (item.basicInfo) {
                  if (item.basicInfo.basicInfoDetails) {
                    for (var j = 0; j < item.basicInfo.basicInfoDetails.length; j++) {
                      var detailsItem = item.basicInfo.basicInfoDetails[j];
                      detailsItem.value = detailsItem.value ? detailsItem.value : "";
                      if (detailsItem.fieldType == "option") {
                        this.$set(detailsItem, "uploadValue", '');
                        detailsItem.option = [];
                        var arr = detailsItem.value.split(",");
                        for (var k = 0; k < arr.length; k++) {
                          var obj = {};
                          obj.text = arr[k];
                          obj.value = arr[k];
                          detailsItem.option.push(obj);
                        }
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                      if (detailsItem.fieldType == "file" || detailsItem.fieldType == "image") {
                        var uploadValue = "";
                        var fileList = [];
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            if (this.enquiryParameters[key].type == "file") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].fileName;
                              obj.value = this.enquiryParameters[key].value;
                              fileList.push(obj);
                            }
                            if (this.enquiryParameters[key].type == "image") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].filePath;
                              fileList.push(obj);
                            }
                          }
                        }
                        this.$set(detailsItem, "uploadValue", "");
                        this.$set(detailsItem, "fileList", fileList);
                      }
                      if (detailsItem.fieldType == "text" || detailsItem.fieldType == "number") {
                        this.$set(detailsItem, "uploadValue", "");
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                    }
                  }

                  if (item.basicInfo.currYearInfoDetails) {
                    for (var j = 0; j < item.basicInfo.currYearInfoDetails.length; j++) {
                      var detailsItem = item.basicInfo.currYearInfoDetails[j];
                      detailsItem.value = detailsItem.value ? detailsItem.value : "";
                      if (detailsItem.fieldType == "option") {
                        this.$set(detailsItem, "uploadValue", '');
                        detailsItem.option = [];
                        var arr = detailsItem.value.split(",");
                        for (var k = 0; k < arr.length; k++) {
                          var obj = {};
                          obj.text = arr[k];
                          obj.value = arr[k];
                          detailsItem.option.push(obj);
                        }
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                      if (detailsItem.fieldType == "file" || detailsItem.fieldType == "image") {
                        var uploadValue = "";
                        var fileList = [];
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            if (this.enquiryParameters[key].type == "file") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].fileName;
                              obj.value = this.enquiryParameters[key].value;
                              fileList.push(obj);
                            }
                            if (this.enquiryParameters[key].type == "image") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].filePath;
                              fileList.push(obj);
                            }
                          }
                        }
                        this.$set(detailsItem, "uploadValue", "");
                        this.$set(detailsItem, "fileList", fileList);
                      }
                      if (detailsItem.fieldType == "text" || detailsItem.fieldType == "number") {
                        this.$set(detailsItem, "uploadValue", "");
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                    }
                  }

                  if (item.basicInfo.lastYearInfoDetails) {
                    for (var j = 0; j < item.basicInfo.lastYearInfoDetails.length; j++) {
                      var detailsItem = item.basicInfo.lastYearInfoDetails[j];
                      detailsItem.value = detailsItem.value ? detailsItem.value : "";
                      if (detailsItem.fieldType == "option") {
                        this.$set(detailsItem, "uploadValue", '');
                        detailsItem.option = [];
                        var arr = detailsItem.value.split(",");
                        for (var k = 0; k < arr.length; k++) {
                          var obj = {};
                          obj.text = arr[k];
                          obj.value = arr[k];
                          detailsItem.option.push(obj);
                        }
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                      if (detailsItem.fieldType == "file" || detailsItem.fieldType == "image") {
                        var uploadValue = "";
                        var fileList = [];
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            if (this.enquiryParameters[key].type == "file") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].fileName;
                              obj.value = this.enquiryParameters[key].value;
                              fileList.push(obj);
                            }
                            if (this.enquiryParameters[key].type == "image") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].filePath;
                              fileList.push(obj);
                            }
                          }
                        }
                        this.$set(detailsItem, "uploadValue", "");
                        this.$set(detailsItem, "fileList", fileList);
                      }
                      if (detailsItem.fieldType == "text" || detailsItem.fieldType == "number") {
                        this.$set(detailsItem, "uploadValue", "");
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                    }
                  }
                }

                field.details = item.details;
                field.basicInfo = item.basicInfo;
                // console.log(field);
                field.isTypeOfWork = item.isTypeOfWork;
                field.isEnable = item.isEnable;
                field.id = item.id;
                if (item.isTypeOfWork) {
                  for (var _key = 0; _key < this.typeOfWorks.length; _key++) {
                    var _field = {
                      optionWork: this.optionWork,
                      numberOfpeople: this.typeOfWorks[_key].numberOfPeople,
                      isWorkingAtHeights: [{
                          text: "有",
                          value: true
                        },
                        {
                          text: "无",
                          value: false
                        }
                      ],
                      coverage: this.typeOfWorks[_key].coverage,
                      valueWork: this.typeOfWorks[_key].workValue,
                      valuekingHeight: this.typeOfWorks[_key].isWorkingAtHeights
                    };
                    field.typeOfWorks.push(_field);
                  }
                }
              }
            }
            this.isUpdata = field;
          }

        }
      }
    },
    async amendInquiry() {
      var self = this;
      var item = this.isUpdata;
      var enquiryInfo = [];
      var model = {
        enquiryInfo: [],
        productId: "",
        applicantName: "",
        businessLicenseImgId: "",
        typeOfWorks: []
      };

      for (var i = 0; i < item.details.length; i++) {

        if (item.details[i].fieldType == "file") {
          self.isUpdata.details[i].uploadValue = ""
          var _file = [];
          for (
            var fileListIndex = 0; fileListIndex < item.details[i].fileList.length; fileListIndex++
          ) {
            if (item.details[i].fileList[fileListIndex].file) {
              _file.push(item.details[i].fileList[fileListIndex]);

            }
            if (item.details[i].fileList[fileListIndex].url) {
              if (self.isUpdata.details[i].uploadValue == "") {
                self.isUpdata.details[i].uploadValue = item.details[i].fileList[fileListIndex].value;
              } else {
                self.isUpdata.details[i].uploadValue =
                  self.isUpdata.details[i].uploadValue + "," + item.details[i].fileList[fileListIndex].value;
              }
            }
          }

          if (_file.length > 0) {
            let formData = new FormData();
            for (let _j = 0; _j < _file.length; _j++) {
              formData.append("file" + (_j + 1), _file[_j].file);
            }
            Indicator.open("请稍等...");
            await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(
              res => {
                Indicator.close();
                if (res.result.length > 0) {
                  for (
                    var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++
                  ) {
                    if (self.isUpdata.details[i].uploadValue != "") {
                      self.isUpdata.details[i].uploadValue =
                        self.isUpdata.details[i].uploadValue + "," +
                        res.result[forDataIndex].id;
                    } else {
                      self.isUpdata.details[i].uploadValue =
                        "" + res.result[forDataIndex].id;
                    }
                  }
                }
              }
            );
          }
        }

        if (item.details[i].fieldType == "image") {
          self.isUpdata.details[i].uploadValue = "";
          var _file = [];
          for (
            var _fileListIndex = 0; _fileListIndex < item.details[i].fileList.length; _fileListIndex++
          ) {
            if (item.details[i].fileList[_fileListIndex].file) {
              _file.push(item.details[i].fileList[_fileListIndex]);
            }
            if (item.details[i].fileList[_fileListIndex].url) {
              for (var key = 0; key < this.enquiryParameters.length; key++) {
                if (this.enquiryParameters[key].filePath == item.details[i].fileList[_fileListIndex].url) {
                  if (self.isUpdata.details[i].uploadValue == "") {
                    self.isUpdata.details[i].uploadValue = this.enquiryParameters[key].value;
                  } else {
                    self.isUpdata.details[i].uploadValue = self.isUpdata.details[i].uploadValue + "," + this.enquiryParameters[key].value;
                  }
                }
              }
            }
          }
          var reader = new FileReader();
          if (_file.length > 0) {
            Indicator.open("请稍等...");
            var fileModel = {};
            for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
              fileModel.dataURIString = _file[_indexImg].content;
              await axiosPostAPI(
                "/Documents?folderName=enquiry",
                fileModel
              ).then(res => {
                Indicator.close();
                if (res.result) {
                  if (self.isUpdata.details[i].uploadValue != "") {
                    self.isUpdata.details[i].uploadValue = self.isUpdata.details[i].uploadValue + "," + res.result.id;
                  } else {
                    self.isUpdata.details[i].uploadValue = "" + res.result.id;
                  }
                }
              });
            }
          }
        }
        var obj = {};
        obj.key = item.details[i].fieldName;
        obj.value = item.details[i].uploadValue;
        obj.type = item.details[i].fieldType;
        enquiryInfo.push(obj);
        if (item.details[i].required) {
          if (item.details[i].uploadValue == "") {
            Indicator.close();
            Toast("请补充" + item.details[i].fieldName + "信息");
            return false;
          }
        }
      }
      if (item.basicInfo) {
        if (item.basicInfo.basicInfoDetails) {
          for (var i = 0; i < item.basicInfo.basicInfoDetails.length; i++) {
            var nonCarData = item.basicInfo.basicInfoDetails[i];
            if (nonCarData.fieldType == "file") {
              nonCarData.uploadValue = ""
              var _file = [];
              for (var fileListIndex = 0; fileListIndex < nonCarData.fileList.length; fileListIndex++) {
                if (nonCarData.fileList[fileListIndex].file) {
                  _file.push(nonCarData.fileList[fileListIndex]);
                }
                if (nonCarData.fileList[fileListIndex].url) {
                  if (nonCarData.uploadValue == "") {
                    nonCarData.uploadValue = nonCarData.fileList[fileListIndex].value;
                  } else {
                    nonCarData.uploadValue = nonCarData.uploadValue + "," + nonCarData.fileList[fileListIndex].value;
                  }
                }
              }
              if (_file.length > 0) {
                let formData = new FormData();
                for (let _j = 0; _j < _file.length; _j++) {
                  formData.append("file" + (_j + 1), _file[_j].file);
                }
                Indicator.open("请稍等...");
                await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(
                  res => {
                    Indicator.close();
                    if (res.result.length > 0) {
                      for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                        if (nonCarData.uploadValue != "") {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result[forDataIndex].id;
                        } else {
                          nonCarData.uploadValue = "" + res.result[forDataIndex].id;
                        }
                      }
                    }
                  }
                );
              }
            }
            if (nonCarData.fieldType == "image") {
              nonCarData.uploadValue = "";
              var _file = [];
              for (var _fileListIndex = 0; _fileListIndex < nonCarData.fileList.length; _fileListIndex++) {
                if (nonCarData.fileList[_fileListIndex].file) {
                  _file.push(nonCarData.fileList[_fileListIndex]);
                }
                if (nonCarData.fileList[_fileListIndex].url) {
                  for (var key = 0; key < this.enquiryParameters.length; key++) {
                    if (this.enquiryParameters[key].filePath == nonCarData.fileList[_fileListIndex].url) {
                      if (nonCarData.uploadValue == "") {
                        nonCarData.uploadValue = this.enquiryParameters[key].value;
                      } else {
                        nonCarData.uploadValue = nonCarData.uploadValue + "," + this.enquiryParameters[key].value;
                      }
                    }
                  }
                }
              }
              var reader = new FileReader();
              if (_file.length > 0) {
                Indicator.open("请稍等...");
                var fileModel = {};
                for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                  fileModel.dataURIString = _file[_indexImg].content;
                  await axiosPostAPI(
                    "/Documents?folderName=enquiry",
                    fileModel
                  ).then(res => {
                    Indicator.close();
                    if (res.result) {
                      if (nonCarData.uploadValue != "") {
                        nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result.id;
                      } else {
                        nonCarData.uploadValue = "" + res.result.id;
                      }
                    }
                  });
                }
              }
            }
            if (nonCarData.uploadValue != '') {
              var obj = {};
              obj.key = nonCarData.fieldName;
              obj.type = nonCarData.fieldType;
              obj.value = nonCarData.uploadValue;
              enquiryInfo.push(obj);
            }
            if (nonCarData.required) {
              if (nonCarData.uploadValue == '') {
                Toast('请补充' + nonCarData.fieldName);
                Indicator.close();
                return false;
              }
            }
          }
        }
        if (item.basicInfo.currYearInfoDetails) {
          for (var i = 0; i < item.basicInfo.currYearInfoDetails.length; i++) {
            var nonCarData = item.basicInfo.currYearInfoDetails[i];
            if (nonCarData.fieldType == "file") {
              nonCarData.uploadValue = ""
              var _file = [];
              for (var fileListIndex = 0; fileListIndex < nonCarData.fileList.length; fileListIndex++) {
                if (nonCarData.fileList[fileListIndex].file) {
                  _file.push(nonCarData.fileList[fileListIndex]);
                }
                if (nonCarData.fileList[fileListIndex].url) {
                  if (nonCarData.uploadValue == "") {
                    nonCarData.uploadValue = nonCarData.fileList[fileListIndex].value;
                  } else {
                    nonCarData.uploadValue = nonCarData.uploadValue + "," + nonCarData.fileList[fileListIndex].value;
                  }
                }
              }
              if (_file.length > 0) {
                let formData = new FormData();
                for (let _j = 0; _j < _file.length; _j++) {
                  formData.append("file" + (_j + 1), _file[_j].file);
                }
                Indicator.open("请稍等...");
                await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(
                  res => {
                    Indicator.close();
                    if (res.result.length > 0) {
                      for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                        if (nonCarData.uploadValue != "") {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result[forDataIndex].id;
                        } else {
                          nonCarData.uploadValue = "" + res.result[forDataIndex].id;
                        }
                      }
                    }
                  }
                );
              }
            }
            if (nonCarData.fieldType == "image") {
              nonCarData.uploadValue = "";
              var _file = [];
              for (var _fileListIndex = 0; _fileListIndex < nonCarData.fileList.length; _fileListIndex++) {
                if (nonCarData.fileList[_fileListIndex].file) {
                  _file.push(nonCarData.fileList[_fileListIndex]);
                }
                if (nonCarData.fileList[_fileListIndex].url) {
                  for (var key = 0; key < this.enquiryParameters.length; key++) {
                    if (this.enquiryParameters[key].filePath == nonCarData.fileList[_fileListIndex].url) {
                      if (nonCarData.uploadValue == "") {
                        nonCarData.uploadValue = this.enquiryParameters[key].value;
                      } else {
                        nonCarData.uploadValue = nonCarData.uploadValue + "," + this.enquiryParameters[key].value;
                      }
                    }
                  }
                }
              }
              var reader = new FileReader();
              if (_file.length > 0) {
                Indicator.open("请稍等...");
                var fileModel = {};
                for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                  fileModel.dataURIString = _file[_indexImg].content;
                  await axiosPostAPI(
                    "/Documents?folderName=enquiry",
                    fileModel
                  ).then(res => {
                    Indicator.close();
                    if (res.result) {
                      if (nonCarData.uploadValue != "") {
                        nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result.id;
                      } else {
                        nonCarData.uploadValue = "" + res.result.id;
                      }
                    }
                  });
                }
              }
            }
            var obj = {};
            obj.key = nonCarData.fieldName;
            obj.type = nonCarData.fieldType;
            obj.value = nonCarData.uploadValue;
            enquiryInfo.push(obj);
            if (nonCarData.required) {
              if (nonCarData.uploadValue == '') {
                Toast('请补充' + nonCarData.fieldName);
                Indicator.close();
                return false;
              }
            }
          }
        }

        if (item.basicInfo.lastYearInfoDetails) {
          for (var i = 0; i < item.basicInfo.lastYearInfoDetails.length; i++) {
            var nonCarData = item.basicInfo.lastYearInfoDetails[i];
            if (nonCarData.fieldType == "file") {
              nonCarData.uploadValue = ""
              var _file = [];
              for (var fileListIndex = 0; fileListIndex < nonCarData.fileList.length; fileListIndex++) {
                if (nonCarData.fileList[fileListIndex].file) {
                  _file.push(nonCarData.fileList[fileListIndex]);
                }
                if (nonCarData.fileList[fileListIndex].url) {
                  if (nonCarData.uploadValue == "") {
                    nonCarData.uploadValue = nonCarData.fileList[fileListIndex].value;
                  } else {
                    nonCarData.uploadValue = nonCarData.uploadValue + "," + nonCarData.fileList[fileListIndex].value;
                  }
                }
              }
              if (_file.length > 0) {
                let formData = new FormData();
                for (let _j = 0; _j < _file.length; _j++) {
                  formData.append("file" + (_j + 1), _file[_j].file);
                }
                Indicator.open("请稍等...");
                await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(
                  res => {
                    Indicator.close();
                    if (res.result.length > 0) {
                      for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                        if (nonCarData.uploadValue != "") {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result[forDataIndex].id;
                        } else {
                          nonCarData.uploadValue = "" + res.result[forDataIndex].id;
                        }
                      }
                    }
                  }
                );
              }
            }
            if (nonCarData.fieldType == "image") {
              nonCarData.uploadValue = "";
              var _file = [];
              for (var _fileListIndex = 0; _fileListIndex < nonCarData.fileList.length; _fileListIndex++) {
                if (nonCarData.fileList[_fileListIndex].file) {
                  _file.push(nonCarData.fileList[_fileListIndex]);
                }
                if (nonCarData.fileList[_fileListIndex].url) {
                  for (var key = 0; key < this.enquiryParameters.length; key++) {
                    if (this.enquiryParameters[key].filePath == nonCarData.fileList[_fileListIndex].url) {
                      if (nonCarData.uploadValue == "") {
                        nonCarData.uploadValue = this.enquiryParameters[key].value;
                      } else {
                        nonCarData.uploadValue = nonCarData.uploadValue + "," + this.enquiryParameters[key].value;
                      }
                    }
                  }
                }
              }
              var reader = new FileReader();
              if (_file.length > 0) {
                Indicator.open("请稍等...");
                var fileModel = {};
                for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                  fileModel.dataURIString = _file[_indexImg].content;
                  await axiosPostAPI(
                    "/Documents?folderName=enquiry",
                    fileModel
                  ).then(res => {
                    Indicator.close();
                    if (res.result) {
                      if (nonCarData.uploadValue != "") {
                        nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result.id;
                      } else {
                        nonCarData.uploadValue = "" + res.result.id;
                      }
                    }
                  });
                }
              }
            }
            if (nonCarData.uploadValue != '') {
              var obj = {};
              obj.key = nonCarData.fieldName;
              obj.type = nonCarData.fieldType;
              obj.value = nonCarData.uploadValue;
              enquiryInfo.push(obj);
            }
            if (nonCarData.required) {
              if (nonCarData.uploadValue == '') {
                Toast('请补充' + nonCarData.fieldName);
                Indicator.close();
                return false;
              }
            }
          }
        }
      }

      model.productId = item.id;
      if (item.isTypeOfWork) {
        item.typeOfWorks.map(workItem => {
          if (!workItem.coverage) {
            Toast("请输入保额");
            Indicator.close();
            return false;
          }
          if (!workItem.numberOfpeople) {
            Toast("请输入人数");
            Indicator.close();
            return false;
          }
          var typeOfWorks = {};
          typeOfWorks.workValue = workItem.valueWork;
          typeOfWorks.numberOfPeople = workItem.numberOfpeople;
          typeOfWorks.isWorkingAtHeights = workItem.valuekingHeight;
          typeOfWorks.coverage = workItem.coverage;
          model.typeOfWorks.push(typeOfWorks);
        });
      }
      model.applicantName = self.itemDetail.applicantName;
      model.businessLicenseImgId = self.itemDetail.businessLicenseImgId;
      model.enquiryInfo = JSON.stringify(enquiryInfo);
      // requestBody.push(model);
      Indicator.close();
      console.log(model);
      Indicator.open("正在提交数据，请稍等...");
      axiosPutAPI("/enquiry/policies/" + this.id, model).then(res => {
        Indicator.close();
        if (res.status == 200) {
          // Toast('询价提交成功，请稍后查看记录');
          window.history.back();
        }
      });
    },
    openBack: function() {
      window.history.back();
    },
    openEnterRes() {
      this.enterList = true;
    },
    afterfileRead(file, detail) {
      var index = detail.name;
      var self = this;
      var _file = self.isUpdata.details[index].fileList;
      let formData = new FormData();
      for (let i = 0; i < _file.length; i++) {
        formData.append("file", _file[i].file);
      }
      if (_file.length > 0) {
        axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
          if (res.result) {
            // self.isUpdata.details[index].uploadValue = res.result[0].id;
            self.isUpdata.details[index].uploadValue = res.result[0].id;
          }
        });
      }
    },
    afterimgRead(file, detail) {
      var self = this;
      var index = detail.name;
      var _file = self.isUpdata.details[index].fileList;
      var reader = new FileReader();
      if (_file.length > 0) {
        var fileModel = {};
        fileModel.dataURIString = _file[0].content;
        axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
          if (res.result) {
            self.isUpdata.details[index].uploadValue = res.result.id;
          }
        });
      }
    },
    handleImg: function(name, index) {
      var self = this;
      this.detailIndex = index;
      for (var i = 0; i < this.imgName.length; i++) {
        if (this.imgName[i] == name) {
          var $target = this.$refs.imgElem[i] || this.$refs.imgElem.srcElement;
        }
      }
      var file = $target.files[0];
      var reader = new FileReader();
      if (file) {
        reader.onload = function(data) {
          var dataResult = data.target || data.srcElement;
          //读取完成后，数据保存在对象的result属性中
          var fileModel = {};
          fileModel.dataURIString = dataResult.result;
          axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
            if (res.result) {
              self.isUpdata.details[index].uploadValue = res.result.id;
            }
          });
        };
        reader.readAsDataURL(file);
      }
    },
    handleFile: function(name, index) {
      var self = this;
      this.detailIndex = index;
      for (var i = 0; i < this.fieldName.length; i++) {
        if (this.fieldName[i] == name) {
          var $target = this.$refs.filElem[i] || this.$refs.filElem.srcElement;
        }
      }
      // var $target = this.$refs.filElem[0] || this.$refs.filElem.srcElement;
      var file = $target.files;
      let formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
      axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
        if (res.result) {
          self.isUpdata.details[index].uploadValue = res.result[0].id;
        }
      });
    },
    addworkItem() {
      var field = {
        optionWork: this.optionWork,
        numberOfpeople: "",
        isWorkingAtHeights: [{
            text: "有",
            value: true
          },
          {
            text: "无",
            value: false
          }
        ],
        coverage: "",
        valueWork: this.valueWork,
        valuekingHeight: false
      };
      this.isUpdata.typeOfWorks.push(field);
    },
    removeWorkitem(index) {
      this.isUpdata.typeOfWorks.splice(index, 1);
    },

    removeCategoryItem(index) {
      this.categoryItems.splice(index, 1);
    },

    onChange(picker, value, index) {
      this.categoryValue = value ? value : this.category[0];
    },
    chooseType(index) {
      this.currentCategoryIndex = index;
      this.categoryType = true;
    },
    onCancel(index) {
      if (this.currentCategoryIndex == index) {
        this.categoryType = false;
        this.categoryValue = "";
      }
    },
    showcauseOffailureBtn() {
      this.showcauseOffailure = true;
      // console.log(123)
    },
    oncancel() {
      this.showcauseOffailure = false;
    }
  }
};

</script>
<style scoped>
.insureScheme {
  /* background-color: #F9F9F9; */
  padding-bottom: 65px;
}

.insureScheme .mint-region.first {
  border-bottom: 1px solid #eee;
}

.insureScheme .mint-region {
  margin-bottom: 0;
}

.insureScheme .popup li {
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.insureScheme .mint-cell-text {
  width: 150px;
}

.insureScheme .dumb {
  width: 100%;
}

.insureScheme .freedd {
  width: 140px;
}

.insureScheme .freefree {
  margin-left: 34px;
}

.insureScheme #sex {
  flex: 1;
  color: #333333;
  font-size: 12px;
}

.insureScheme #wufaone {
  padding-left: 4%;
  margin: 0 !important;
}

.insureScheme .cc {
  margin-left: 88px;
}

.insureScheme #wufa {
  border: none;
  margin: 0 !important;
  display: flex;
}

.insureScheme #damage {
  margin-left: 86px;
}

.insureScheme #thirdlys {
  float: right !important;
  text-align: right;
  line-height: 40px;
  font-size: 12px;
  color: #666;
  border: none;
  padding-right: 3%;
  width: 100px !important;
}

.Footerfixed {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  background: #fff;
  border-top: 1px solid #eee;
  height: 44px;
}

.Footerfixed .btn-repair {
  width: 30%;
  text-align: center;
  color: #3963f9;
  border-right: 1px solid #eeeeee;
}

.btn-Nonecar {
  width: 30%;
  text-align: center;
  color: #3963f9;
}

.btn-Offer {
  background: #3963f9;
  text-align: center;
  color: #ffffff;
  line-height: 44px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.insureScheme #icoone {
  float: right;
  right: 0;
  width: 5px;
  height: 5px;
  border: solid 2px #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  line-height: 40px;
  display: inline-block;
  -webkit-transform: rotate(45deg);
  transform: translateY(226%) rotate(45deg);
}

.Noncar {
  position: fixed;
  top: 0;
  background: #f5f5f5;
}

.insureScheme #labelone {
  float: right !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 120px;
}

.el-dateItm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}

.el-dateItm-picker .el-input__inner {
  border: 0 !important;
}

.btn_additem {
  display: flex;
  color: #5479ff;
  text-align: center;
  font-size: 14px;
  justify-content: flex-end;
}

.workTable tr th,
.workTable tr td {
  margin: 0;
  border: 1px solid #eeeeee;
}

.workTable tr th {
  font-size: 14px;
  font-weight: normal;
  color: #999999;
  border: 1px solid #eee;
  padding: 10px 0;
}

.workTable tr td {
  font-size: 14px;
  font-weight: normal;
  color: #333;
  border: 1px solid #eee;
}

.item_Detail {
  background: #ffffff;
  margin: 10px;
  padding: 15px;
  border-radius: 8px;
}

.isItem {
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
}

.isItem p:nth-child(2) {
  color: #999999;
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
  background: #0066ff;
  padding: 5px 10px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
}

</style>
