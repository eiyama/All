<template>
  <div style="background-color: #FFF;">
    <!-- <mt-header fixed class="def-header cust-head" title="计划书">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openHome">
      </div>
    </mt-header> -->
    <main>
      <!-- 固定信息 -->
      <div class="mint-region">
        <div style="height:35px;background-color:#F9F9F9;color:#666;font-size:15px;
        text-align:center;padding-left:10px;padding-right:10px;" v-show="index > 0">
          <div style="float:left;padding-top:7px">
            <span style="font-weight:bold;color:#333" >计划书{{index+1}}</span>
          </div>
          <div style="float:right;padding-top:7px;font-size: 18px;color:#333" v-show="index > 0">
            <van-icon name="close" @click="deleteItem" />
          </div>
        </div>
        <div @click="handleInsCropClick()">
          <mt-cell title="保险公司" :value="insCorpName" v-show="index == 0" @click="selApplicationDate"></mt-cell>
          <mt-cell title="保险公司" :value="insCorpName" v-show="index > 0" is-link @click="selApplicationDate"></mt-cell>
        </div>
        <hr width="100%" color="#f5f5f5" size="1"/>
        <div @click="handleProductClick()" >
          <mt-cell title="保险产品" :value="primaryProduct.shortName" v-show="index == 0"></mt-cell>
          <mt-cell title="保险产品" :value="primaryProduct.shortName" v-show="index > 0"  is-link></mt-cell>
        </div>
        <div v-show="index == 0">
          <hr width="100%" color="#f5f5f5" size="1"/>
          <div style="background:#F5F5F5; height: 15px"></div>
          <hr width="100%" color="#f5f5f5" size="1"/>
          <mt-field label="投保人" placeholder="请填写投保人姓名" v-model="prospectusData.applicationName" @blur.native.capture="nameBlur"></mt-field>
          <hr width="100%" color="#f5f5f5" size="1"/>
          <mt-field label="年龄" placeholder="投保人需满18周岁" type="number" v-model="prospectusData.applicationAge" @blur.native.capture="ageBlur">
            <div>
              <mt-button @click="selApplicationDate" style="width: 75px;height: 30px;font-size: 12px">出生日期</mt-button>
            </div>
          </mt-field>
          <mt-datetime-picker ref="applicationDate" v-model="applicationBirthday" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="dateConfirm"></mt-datetime-picker>
          <hr width="100%" color="#f5f5f5" size="1"/>
          <mt-field class="mint-formItm" label="性别" type="text">
            <span @click="handleSexClick()">
              <input class="mint-input" v-model="prospectusData.applicationSex"
                readonly="readonly" type="text" placeholder="请选择投保人性别" >
              <i class="ico-arrow"></i>
            </span>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1"/>
          <div style="background:#F5F5F5; height: 15px"></div>
          <hr width="100%" color="#f5f5f5" size="1"/>
          <mt-field label="被保人" placeholder="请填写被保人姓名" :readonly="sameAsApplicant" v-model="prospectusData.insuredName" :disableClear="sameAsApplicant">
            <div class="same-as-applicant">
              <span>同投保人</span>
              <mt-switch v-model="sameAsApplicant"></mt-switch>
            </div>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1"/>
          <mt-field class="mint-formItm" label="年龄" type="text" v-show="!sameAsApplicant" :readonly="sameAsApplicant">
            <span @click="handleInsuredAgeClick()">
              <input class="mint-input" v-model="prospectusData.insuredAge"
                readonly="readonly" type="text" :placeholder="placeholderInsured">
              <i class="ico-arrow"></i>
            </span>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1" v-show="!sameAsApplicant"/>
          <mt-field class="mint-formItm" label="性别" type="text" v-show="!sameAsApplicant" :readonly="sameAsApplicant">
            <span @click="handleInsuredSexClick()">
              <input class="mint-input" v-model="prospectusData.insuredSex"
                readonly="readonly" type="text" placeholder="请选择被保人性别" >
              <i class="ico-arrow"></i>
            </span>
          </mt-field>
        </div>
      </div>
      <!-- 主险 -->
      <div class="quote-row" style="margin: 5px;color:#666; font-size: 15px" v-show="hasPrimaryProduct">{{primaryProduct.name}}</div>
      <div class="mint-region" v-show="hasPrimaryProduct">
        <hr width="100%" color="#f5f5f5" size="1"/>
        <mt-field class="mint-formItm" v-for="(field,index) in primaryProduct.fields" :label="field.label" type="text" :disabled="true" :key="index" v-show="field.label !='年龄' && field.label !='性别' && field.label !='费率'">
          <span @click="handleFieldClick(primaryProduct, index)">
            <input class="mint-input" v-model="field.value" readonly="readonly"
              type="text" :placeholder="'请选择' + field.label" >
            <i class="ico-arrow"></i>
          </span>
        </mt-field>
        <mt-field class="mint-formItm" label="保险金额(元)" type="text" v-show="!primaryProduct.hasAmount">
          <span >
            <input class="mint-input" v-model="primaryProduct.amount" 
            type="number" :placeholder="primaryProduct.placeholderAmount" >
          </span>
        </mt-field>
      </div>
      <!-- 附加险 -->
      <div class="quote-row" v-show="additionProducts.length > 0 && !sameAsApplicant" style="margin: 5px;color:#666; font-size: 15px">附加险</div>
      <hr width="100%" color="#f5f5f5" size="1" v-show="additionProducts.length > 0 && !sameAsApplicant"/>
      <div class="mint-region" v-show="additionProducts.length > 0 && !sameAsApplicant">
        <div v-for="(product, index) in additionProducts" :key="index">
          <mt-cell :title="product.shortName">
            <mt-switch v-model="product.switch"></mt-switch>
          </mt-cell>
          <div v-if="product.switch">
            <mt-field class="mint-formItm" v-for="(field,index) in product.fields" :label="field.label" type="text" :disabled="true" :key="index" v-show="field.label !='年龄' && field.label !='性别' && field.label !='费率'">
              <span @click="handleFieldClick(product, index)">
                <input class="mint-input" v-model="field.value" readonly="readonly"
                  type="text" :placeholder="'请选择' + field.label" >
                <i class="ico-arrow"></i>
              </span>
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1"/>
            <mt-field class="mint-formItm" label="保险金额(元)" type="text" v-show="!product.hasAmount">
              <span >
                <input class="mint-input" v-model="product.amount" 
                type="number" :placeholder="product.placeholderAmount" >
              </span>
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1"/>
          </div>
        </div>
      </div>
      <!-- 选择器 -->
      <mt-popup v-model="popupIsOpen" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="popupIsOpen = false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="handlePick()" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker ref="picker" :slots="pickerSlots"></mt-picker>
      </mt-popup>
      <!-- 选择器 -->
      <mt-popup v-model="popupAgeIsOpen" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="popupAgeIsOpen = false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="handleInsuredAgePick()" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker ref="pickerAge" :slots="pickerAgeSlots"></mt-picker>
      </mt-popup>
      <!-- 选择器 -->
      <mt-popup v-model="popupSexIsOpen" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="popupSexIsOpen = false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="handleSexPick()" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker ref="pickerSex" :slots="pickerSexSlots"></mt-picker>
      </mt-popup>
      <!-- 选择器 -->
      <mt-popup v-model="popupInSexIsOpen" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="popupInsurcedSexIsOpen = false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="handleInsuredSexPick()" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker ref="pickerInsuredSex" :slots="pickerSexSlots"></mt-picker>
      </mt-popup>
      <!-- 选择器 -->
      <mt-popup v-model="popupInsCropIsOpen" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="popupInsCropIsOpen = false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="handleInsCropPick()" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker ref="pickerInsCrop" :slots="pickerInsCropSlots"></mt-picker>
      </mt-popup>
      <!-- 选择器 -->
      <mt-popup v-model="popupProductIsOpen" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="popupProductIsOpen = false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="handleProductPick()" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker ref="pickerProduct" :slots="pickerProductSlots"></mt-picker>
      </mt-popup>
    </main>
    <!-- <footer>
      <mt-button type="primary" size="large" @click="createProspectus()">生成计划书</mt-button>
    </footer> -->
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator } from "mint-ui";
import store from "./../../store/store";
import * as types from "./../../store/types";
import { debug } from "util";
// import func from "./vue-temp/vue-editor-bridge";
export default {
  name: "home",
  props: {
    index: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      applicant: '',
      sameAsApplicant: false,
      hasPrimaryProduct: true,
      primaryProduct: {},
      additionProducts: [],
      popupIsOpen: false,
      pickerSlots: [],
      /* 当前选择器来源 */
      pickerSource: {},
      pickerSourceFieldIndex: null,
      insCorpName: '',
      // prospectusDatas: [],
      prospectusData: {
        "applicationName": "",
        "applicationAge": "",
        "applicationSex": "",
        "insuredName": "",
        "insuredAge": "",
        "insuredSex": "",
        "insureRisks": []
      },
      productId: "",
      popupAgeIsOpen: false,
      popupSexIsOpen: false,
      popupInSexIsOpen: false,
      pickerAgeSlots: [],
      pickerSexSlots: [{ flex: 1, defaultIndex: 0, values: ['男', '女'], className: "slot1" }],
      popupInsCropIsOpen: false,
      pickerInsCropSlots: [{ flex: 1, defaultIndex: 0, values: ['男', '女'], className: "slot1" }],
      popupProductIsOpen: false,
      pickerProductSlots: [{ flex: 1, defaultIndex: 0, values: ['男', '女'], className: "slot1" }],
      applicationBirthday: new Date(this.Common.Public.GetDateStr(-18 * 365)),
      startDate: new Date(this.Common.Public.GetDateStr(-106 * 365)),
      endDate: new Date(this.Common.Public.GetDateStr(-18 * 365)),
      placeholderInsured: '请选择被保人年龄',
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      insCompanies:[],
      products:[],
      canCommit:true,
    };
  },
  watch: {
    prospectusData: {
      handler (newV, oldV) {
        this.$emit('uploadData', {index: this.index, data: newV})
      },
      deep: true
    },
    items: {
      handler (newV, oldV) {
        if (newV.length !== 0) {
          this.prospectusData = {...newV[this.index]}
        }
      },
      deep: true
    }
  },
  mounted: function() {

    /* 获取保险公司列表 */
    axiosGetAPI("/li/insCompanies").then(res => {
      Indicator.close();
      if (res.result) {
        this.insCompanies = res.result;
        var names = [];
        for (var i = 0; i < this.insCompanies.length; i++) {
          names.push(this.insCompanies[i].shortName);
        }
        this.pickerInsCropSlots[0].values = names;
      }
    });
    
    if (this.index == 0) {
      this.productId = this.$route.query.id;
      this.insCorpName = this.$route.query.insCorpName;
      this.getProducts(this.productId, this.insCorpName);
    } else{
      this.productId = '';
      this.insCorpName = '';
      this.prospectusData = this.items[0];
      this.hasPrimaryProduct = false;
    }

    console.log(this.prospectusData);

    /* 处理同投保人 */
    this.$watch(
      () => [this.applicant, this.sameAsApplicant].join(),
      () => {

        if (this.sameAsApplicant) {
          this.prospectusData.insuredName = this.sameAsApplicant ? this.prospectusData.applicationName : "";
          this.prospectusData.insuredAge = this.sameAsApplicant ? this.prospectusData.applicationAge : "";
          this.prospectusData.insuredSex = this.sameAsApplicant ? this.prospectusData.applicationSex : "";
          if (this.pickerAgeSlots && this.pickerAgeSlots.length > 0) {
            var length = this.pickerAgeSlots[0].values.length;
            var start = this.pickerAgeSlots[0].values[0];
            var end = this.pickerAgeSlots[0].values[length - 1];
            if (this.prospectusData.applicationAge >= start && this.prospectusData.applicationAge <= end) {
              //清除已输入内容
              for (var i = 0; i < this.primaryProduct.fields.length; i++) {
                var fieldItem = this.primaryProduct.fields[i];
                if (fieldItem.label != "年龄" && fieldItem.label != "性别") {
                  fieldItem.value = '';
                }
              }
              this.primaryProduct.amount = '';
              for (var i = 0; i < this.additionProducts.length; i++) {
                var additionProduct = this.additionProducts[i];
                for (var j = 0; j < additionProduct.fields.length; j++) {
                  var fieldItem = additionProduct.fields[j];
                  if (fieldItem.label != "年龄" && fieldItem.label != "性别") {
                    fieldItem.value = '';
                  }
                }
                additionProduct.amount = '';
              }
              this.handleAgeAndSexPick();
            } else{
              Toast('被保人年龄适用于' + start + '~' + end + '岁'+'，请重新填写被保人年龄');
              this.sameAsApplicant = false;
              this.prospectusData.insuredAge = "";
              this.prospectusData.insuredSex = "";
            };
          }
        }
      }
    );
  },
  created: function() {},
  methods: {
    deleteItem: function () {
      this.$emit('deleteIndex', this.index)
    },
    nameBlur:function(){
      this.prospectusData.insuredName = this.sameAsApplicant ? this.prospectusData.applicationName : "";
    },
    ageBlur:function(){
      this.prospectusData.insuredAge = this.sameAsApplicant ? this.prospectusData.applicationAge : "";
      if (this.sameAsApplicant) {
        this.handleAgeAndSexPick();
      };
    },
    openBack:function() {
      window.history.back();
    },
    openHome:function() {
      this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
    },
    selApplicationDate: function() {
      // 打开注册日期选择层
      this.applicationDate = new Date(this.endDate);
      this.$refs.applicationDate.open();
    },
    dateConfirm: function() {
      var etime = Date.parse(new Date(this.endDate));
      var stime = Date.parse(new Date(this.applicationBirthday));
      var usedTime = etime - stime + 18 * 24 * 3600 * 1000 * 365; //两个时间戳相差的毫秒数
      var days = Math.floor(usedTime / (24 * 3600 * 1000 * 365));
      this.prospectusData.applicationAge = days;
      this.$refs.applicationDate.close();
      this.ageBlur();
    },
    getProducts(productId, insCorpName) {
      function formatProduct(product) {
        if (product == null || product.attributes == null) {
          return;
        }
        if (product.attributes.indexOf("保险金额") < 0 && product.shortName != "华夏附加投保人豁免（2.0版）") {
          product.hasAmount = false;
        } else {
          product.hasAmount = true;
        }
        if (product.atomUnit > 0) {
          product.placeholderAmount = '输入金额需是' + product.atomUnit + '的整数倍';
        };
        product.amount = '';
        product.fields = product.attributes.map(item => ({
          label: item
        }));
      }
      if (productId && insCorpName) {
        Indicator.open("加载中...");
        /* 获取主险 */
        axiosGetAPI("/li/products/" + productId + "/schema").then(res => {
          Indicator.close();
          if (res.result) {
            this.primaryProduct = res.result;
            formatProduct(this.primaryProduct);
            this.hasPrimaryProduct = true;
            this.handleAgeClick(this.primaryProduct);
            this.handleAgeAndSexPick();
          } else{
            this.hasPrimaryProduct = false;
          }
        });

        /* 获取附加险 */
        axiosGetAPI("/li/products/" + productId + "/additions/schema").then(res => {
          Indicator.close();
          if (res.result) {
            if (this.pickerAgeSlots && this.pickerAgeSlots.length > 0) {
              this.additionProducts = res.result;
              this.additionProducts.forEach(item => formatProduct(item));
              this.handleAgeAndSexPick();
            };
            
          }
        });
      }else{
        this.hasPrimaryProduct = false;
      }
      
    },
    handleAgeClick(product) {
      this.pickerSource = product;
      for (var i = 0; i < product.fields.length; i++) {
        if (product.fields[i].label == "年龄") {
          this.pickerSourceFieldIndex = i;
          break;
        }
      }
      const fieldValues = product.fields.map(field => field.value);

      const values = Object.keys(
        getNode(product.options, fieldValues, this.pickerSourceFieldIndex)
      );

      this.pickerSlots = [{ values }];
      this.pickerAgeSlots = [{ values }];
      if (this.pickerAgeSlots) {
        var length = this.pickerAgeSlots[0].values.length;
        this.placeholderInsured = '被保人年龄适用于' + this.pickerAgeSlots[0].values[0] + '~' +
          this.pickerAgeSlots[0].values[length - 1] + '岁';
      }

      /**
       * 获取树结构的某个节点
       * tree 树结构
       * path 键组成的路径
       * dest 路径的某个点
       */
      function getNode(tree, path, dest) {
        var node = tree;
        for (var i = 0; i <= dest; i++) {
          if (i !== 0) {
            node = node[path[i - 1]];
          }
        }
        return node;
      }
    },
    handleInsuredAgeClick() {
      if (this.insCorpName == null || this.insCorpName == '') {
        Toast("请选择保险公司");
        return;
      }
      if (this.primaryProduct.shortName == null ||
        this.primaryProduct.shortName == '') {
        Toast("请选择保险产品");
        return;
      }
      if (this.prospectusData.applicationName == null ||
        this.prospectusData.applicationName == '') {
        Toast("请输入投保人姓名");
        return;
      }
      if (this.prospectusData.applicationAge == null ||
        this.prospectusData.applicationAge == '') {
        Toast("请输入投保人年龄");
        return;
      }
      if (this.prospectusData.applicationAge < 18) {
        Toast("投保人需满18周岁");
        return;
      }
      if (this.prospectusData.applicationSex == null ||
        this.prospectusData.applicationSex == '') {
        Toast("请选择投保人性别");
        return;
      }
      if (this.prospectusData.insuredName == null ||
        this.prospectusData.insuredName == '') {
        Toast("请输入被保人姓名");
        return;
      }
      this.popupAgeIsOpen = true;
    },
    handleSexClick() {
      if (this.insCorpName == null || this.insCorpName == '') {
        Toast("请选择保险公司");
        return;
      }
      if (this.primaryProduct.shortName == null ||
        this.primaryProduct.shortName == '') {
        Toast("请选择保险产品");
        return;
      }
      if (this.prospectusData.applicationName == null ||
        this.prospectusData.applicationName == '') {
        Toast("请输入投保人姓名");
        return;
      }
      if (this.prospectusData.applicationAge == null ||
        this.prospectusData.applicationAge == '') {
        Toast("请输入投保人年龄");
        return;
      }
      if (this.prospectusData.applicationAge < 18) {
        Toast("投保人需满18周岁");
        return;
      }
      this.popupSexIsOpen = true;
    },
    handleInsuredSexClick() {
      if (this.insCorpName == null || this.insCorpName == '') {
        Toast("请选择保险公司");
        return;
      }
      if (this.primaryProduct.shortName == null ||
        this.primaryProduct.shortName == '') {
        Toast("请选择保险产品");
        return;
      }
      if (this.prospectusData.applicationName == null ||
        this.prospectusData.applicationName == '') {
        Toast("请输入投保人姓名");
        return;
      }
      if (this.prospectusData.applicationAge == null ||
        this.prospectusData.applicationAge == '') {
        Toast("请输入投保人年龄");
        return;
      }
      if (this.prospectusData.applicationAge < 18) {
        Toast("投保人需满18周岁");
        return;
      }
      if (this.prospectusData.applicationSex == null ||
        this.prospectusData.applicationSex == '') {
        Toast("请选择投保人性别");
        return;
      }
      if (this.prospectusData.insuredName == null ||
        this.prospectusData.insuredName == '') {
        Toast("请输入被保人姓名");
        return;
      }
      this.popupInSexIsOpen = true;
    },
    handleInsuredAgePick() {
      this.prospectusData.insuredAge = this.$refs.pickerAge.getValues()[0];
      this.popupAgeIsOpen = false;
    },
    handleSexPick() {
      this.prospectusData.applicationSex = this.$refs.pickerSex.getValues()[0];
      this.popupSexIsOpen = false;
      if (this.sameAsApplicant) {
        this.prospectusData.insuredSex = this.prospectusData.applicationSex;
        this.handleAgeAndSexPick();
      };
    },
    handleInsuredSexPick() {
      this.prospectusData.insuredSex = this.$refs.pickerInsuredSex.getValues()[0];
      this.popupInSexIsOpen = false;
      this.handleAgeAndSexPick();
    },
    handleAgeAndSexPick(){
      if (this.primaryProduct && this.primaryProduct.fields && this.primaryProduct.fields.length>0) {
        for (var i = 0; i < this.primaryProduct.fields.length; i++) {
          var fieldItem = this.primaryProduct.fields[i];
          if (fieldItem.label == "年龄") {
            fieldItem.value = this.primaryProduct.queryType == "Insured" ?
              this.prospectusData.insuredAge : this.prospectusData.applicationAge;
            this.primaryProduct.fields[i] = fieldItem;
          } else if (fieldItem.label == "性别") {
            fieldItem.value = this.primaryProduct.queryType == "Insured" ?
              this.prospectusData.insuredSex : this.prospectusData.applicationSex;
            this.primaryProduct.fields[i] = fieldItem;
          } else {
            continue;
          }
        }
        console.log(this.primaryProduct);
      };

      if (this.additionProducts && this.additionProducts.length > 0) {
          for (var i = 0; i < this.additionProducts.length; i++) {
          var additionProduct = this.additionProducts[i];
          if (additionProduct && additionProduct.fields.length > 0) {
            for (var j = 0; j < additionProduct.fields.length; j++) {
              var fieldItem = additionProduct.fields[j];
              if (fieldItem.label == "年龄") {
                fieldItem.value = additionProduct.queryType == "Insured" ?
                  this.prospectusData.insuredAge : this.prospectusData.applicationAge;
                additionProduct.fields[j] = fieldItem;
              } else if (fieldItem.label == "性别") {
                fieldItem.value = additionProduct.queryType == "Insured" ?
                  this.prospectusData.insuredSex : this.prospectusData.applicationSex;
                additionProduct.fields[j] = fieldItem;
              } else {
                continue;
              }
            }
          };
          
        }
        console.log(this.additionProducts);
      };

      if (this.index > 0 && this.pickerAgeSlots && this.pickerAgeSlots.length > 0) {
        var length = this.pickerAgeSlots[0].values.length;
        var start = this.pickerAgeSlots[0].values[0];
        var end = this.pickerAgeSlots[0].values[length - 1];
        if (this.prospectusData.applicationAge < start || this.prospectusData.applicationAge > end) {
          Toast('该产品的被保人年龄适用于' + start + '~' + end + '岁'+'，请重新选择保险产品');
          this.canCommit = false;
          this.primaryProduct = {};
          this.hasPrimaryProduct = false;
          this.additionProducts = [];
          this.pickerAgeSlots = [];
        };
      }

    },
    handleFieldClick(product, fieldIndex) {
      /* 如果上级没选择返回 */
      if (fieldIndex !== 0 && !product.fields[fieldIndex - 1].value) return;
      this.pickerSource = product;
      this.pickerSourceFieldIndex = fieldIndex;

      const fieldValues = product.fields.map(field => field.value);

      const values = Object.keys(
        getNode(product.options, fieldValues, fieldIndex)
      );

      this.pickerSlots = [{ values }];
      this.popupIsOpen = true;
      /**
       * 获取树结构的某个节点
       * tree 树结构
       * path 键组成的路径
       * dest 路径的某个点
       */
      function getNode(tree, path, dest) {
        var node = tree;
        for (var i = 0; i <= dest; i++) {
          if (i !== 0) {
            node = node[path[i - 1]];
          }
        }
        return node;
      }
    },
    handlePick() {
      const product = this.pickerSource;
      const fieldIndex = this.pickerSourceFieldIndex;

      var itemLabel = product.fields[fieldIndex].label;
      if (itemLabel == "年龄") {
        this.prospectusData.applicationAge = this.$refs.picker.getValues()[0];
      } else {
        product.fields[fieldIndex].value = this.$refs.picker.getValues()[0];
      }

      if (itemLabel == "性别") {
        this.prospectusData.applicationSex = this.$refs.picker.getValues()[0];
      } else {
        product.fields[fieldIndex].value = this.$refs.picker.getValues()[0];
      }

      /* 清空下级的值 */
      product.fields.filter((field, i) => i > fieldIndex)
        .forEach(field => (field.value = null));

      this.popupIsOpen = false;
    },
    handleInsCropClick() {
      if (this.index == 0) {
        return
      };
      this.popupInsCropIsOpen = true;
    },
    handleProductClick() {
      if (this.index == 0) {
        return
      };
      if (this.insCorpName == null || this.insCorpName == '') {
        Toast("请选择保险公司");
        return;
      }
      if (this.pickerProductSlots[0].values.length > 0) {
        this.popupProductIsOpen = true;
      } else{
        Toast("暂无在售产品，请选择其他保险公司");
        this.popupProductIsOpen = false;
      }
      
    },
    handleInsCropPick() {
      this.insCorpName = this.$refs.pickerInsCrop.getValues()[0];
      var insCorpCode;
      for (var i = 0; i < this.insCompanies.length; i++) {
        if (this.insCorpName == this.insCompanies[i].shortName) {
          insCorpCode = this.insCompanies[i].code;
          break;
        };
      };
      this.primaryProduct = {};
      this.hasPrimaryProduct = false;
      this.additionProducts = [];
      this.popupInsCropIsOpen = false;
      /* 获取保险产品列表 */
      axiosGetAPI("/li/products?insCorpCode=" + insCorpCode).then(res => {
        Indicator.close();
        if (res.result) {
          this.products = res.result;
          var names = [];
          for (var i = 0; i < this.products.length; i++) {
            names.push(this.products[i].shortName);
          }
          this.pickerProductSlots[0].values = names;
        }
      });
    },
    handleProductPick() {
      this.primaryProduct.shortName = this.$refs.pickerProduct.getValues()[0];
      var productId;
      for (var i = 0; i < this.products.length; i++) {
        if (this.primaryProduct.shortName == this.products[i].shortName) {
          productId = this.products[i].id;
          break;
        };
      };
      this.productId = productId;
      this.getProducts(this.productId, this.insCorpName);
      this.popupProductIsOpen = false;
    },
    getProspectus:function() {
      // self.prospectusDatas = [];
      if (this.insCorpName == null || this.insCorpName == '') {
        Toast("请选择保险公司");
        this.canCommit = false;
        return;
      }

      if (!this.primaryProduct) {
        Toast("请选择保险产品");
        this.canCommit = false;
        return;
      }

      if (this.primaryProduct.shortName == null ||
        this.primaryProduct.shortName == '') {
        Toast("请选择保险产品");
        this.canCommit = false;
        return;
      }
      if (this.prospectusData.applicationName == null ||
        this.prospectusData.applicationName == '') {
        Toast("请输入投保人姓名");
        this.canCommit = false;
        return;
      }
      if (this.prospectusData.applicationAge == null ||
        this.prospectusData.applicationAge == '') {
        Toast("请选择投保人年龄");
        this.canCommit = false;
        return;
      }
      if (this.prospectusData.applicationSex == null ||
        this.prospectusData.applicationSex == '') {
        Toast("请选择投保人性别");
        this.canCommit = false;
        return;
      }
      if (this.prospectusData.insuredName == null ||
        this.prospectusData.insuredName == '') {
        Toast("请输入被保人姓名");
        this.canCommit = false;
        return;
      }
      if (this.prospectusData.insuredAge == null ||
        this.prospectusData.insuredAge == '') {
        Toast("请选择被保人年龄");
        this.canCommit = false;
        return;
      }
      if (this.prospectusData.insuredSex == null ||
        this.prospectusData.insuredSex == '') {
        Toast("请选择被保人性别");
        this.canCommit = false;
        return;
      }
      this.canCommit = true;
      this.prospectusData.insureRisks = [];
      var self = this;
      var arr = [];
      for (var i = 0; i < self.primaryProduct.fields.length; i++) {
        var itemLabel = self.primaryProduct.fields[i].label;
        var itemValue = self.primaryProduct.fields[i].value;
        if (itemValue == null || itemValue == '') {
          if (itemLabel != '费率' && itemLabel != '年龄' && itemLabel != '性别') {
            Toast('请选择' + itemLabel);
            self.canCommit = false;
            return
          }
        }
        arr.push(itemValue);
      }
      var insureRisk = { "productId": "", "attributes": [], "amount": "", "premium": "", "isMain": "" };
      insureRisk.productId = self.productId;
      insureRisk.attributes = arr;

      if (!self.primaryProduct.hasAmount) {
        if (self.primaryProduct.amount == null || self.primaryProduct.amount == 0) {
          Toast('请输入保险金额');
          self.canCommit = false;
          return
        }
        if (self.primaryProduct.atomUnit > 0) {
          if ((self.primaryProduct.amount % self.primaryProduct.atomUnit) != 0) {
            Toast(self.primaryProduct.placeholderAmount);
            self.canCommit = false;
            return
          }
        };
        
        insureRisk.amount = self.primaryProduct.amount;
      }

      insureRisk.isMain = true;
      insureRisk.premium = 0;
      self.prospectusData.insureRisks.push(insureRisk);

      for (var i = 0; i < self.additionProducts.length; i++) {
        if (self.additionProducts[i].switch) {
          var arrAddition = [];
          var insureRiskAddition = {
            "productId": "",
            "attributes": [],
            "amount": "",
            "premium": "",
            "isMain": ""
          };
          for (var j = 0; j < self.additionProducts[i].fields.length; j++) {
            var itemValue = self.additionProducts[i].fields[j].value;
            var itemLabel = self.additionProducts[i].fields[j].label;
            if (itemValue == null || itemValue == '') {
              if (itemLabel != '费率' && itemLabel != '年龄' && itemLabel != '性别') {
                Toast('请选择' + itemLabel);
                self.canCommit = false;
                return
              }
            }
            arrAddition.push(itemValue);
          }
          insureRiskAddition.productId = self.additionProducts[i].id;
          insureRiskAddition.attributes = arrAddition;
          if(self.additionProducts[i].shortName != "华夏附加投保人豁免（2.0版）"){
                insureRiskAddition.amount = self.additionProducts[i].amount;
            }else{
                insureRiskAddition.amount = 10000;
            } 
          if (!self.additionProducts[i].hasAmount) {
            if (self.additionProducts[i].amount == null || self.additionProducts[i].amount == 0) {
              Toast('请输入保险金额');
              self.canCommit = false;
              return
            }
            if (self.additionProducts[i].atomUnit > 0) {
              if ((self.additionProducts[i].amount % self.additionProducts[i].atomUnit) != 0) {
                Toast(self.additionProducts[i].placeholderAmount);
                self.canCommit = false;
                return
              }
            };
            if(self.additionProducts[i].shortName != "华夏附加投保人豁免（2.0版）"){
                insureRiskAddition.amount = self.additionProducts[i].amount;
            }else{
                insureRiskAddition.amount = 10000;
            }            
          }
          insureRiskAddition.isMain = false;
          insureRiskAddition.premium = 0;
          self.prospectusData.insureRisks.push(insureRiskAddition);
        } else {
          continue;
        }
      }
      
      /*self.prospectusDatas.push(self.prospectusData);
      console.log(self.prospectusDatas);
      Indicator.open('加载中...');
      var salesmanId = sessionStorage.getItem('salesmanId');
      axiosPostAPI('/salesmans/' + salesmanId + '/prospectuses', self.prospectusDatas).then((res) => {
        Indicator.close();
        if (res.status == 200) {
          var appId = localStorage.getItem("appId");
          var localToken = localStorage.getItem('token');
          if (localToken) {
            localToken = localToken.replace(appId + '_', '');
          }
          var url = "/prospectus/detail?pid=" + res.result.prospectusId +
            "&appId=" + appId + "&token=" + encodeURIComponent(localToken);
          self.$router.push({ path: url });
        }
      });*/
    }

  }
};

</script>
<style scoped>
main {
  padding-bottom: 0px;
}

.same-as-applicant {
  display: flex;
  align-items: center;
}

.same-as-applicant .mint-switch {
  width: auto;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

footer button {
  border-radius: 0;
}

</style>
