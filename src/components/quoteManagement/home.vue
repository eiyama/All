<template>
  <div class="home" style="background-color:#FFF">
    <mt-header fixed :title="title"></mt-header>
    <div class="mint-content">
      <!-- 车险报价 -->
      <div style="margin-top:15px">
        <h4>车险出单</h4>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
      </div>
      <div class="tip">注：目前仅支持9座以下非营运客车</div>
      <mt-field label="投保地区" v-model="city.insCityShortName" placeholder='请选择' readonly="readonly">
        <span @click="choiceCity">切换</span><img class="ins-img" :src="defaultImg" alt="">
      </mt-field>
        <div @click="openone">
          <mt-field label="车牌号" class="upper" type="text" :disabled="isNonPlateNo" :placeholder="placeholderPlateNo" v-model="city.plateNo" v-verify="city.plateNo" disabled>
            <mt-switch v-model="isNonPlateNo" @change="turn" style='width: 115px;'>新/次新车</mt-switch>
          </mt-field>
          <label class="mt-err-tip" v-remind="city.plateNo" v-if="isNonPlateNo==false"></label>
        </div>
        <mt-field label="证件号后六位" placeholder="请输入证件号后六位" :maxlenght="6" v-model="city.ownerIdCardNo" v-verify="city.ownerIdCardNo" v-show="!isNonPlateNo"></mt-field>
        <label class="mt-err-tip" v-remind="city.ownerIdCardNo"></label>
        <div class="tip-pingan" v-show="!isNonPlateNo">*平安续保需要输入车主证件号后6位</div>
        <mt-field label="车架号" placeholder="请输入车辆识别代码" v-model="city.vin" v-verify="city.vin" v-show="isNonPlateNo"></mt-field>
        <label class="mt-err-tip" v-remind="city.vin" v-if="isNonPlateNo"></label>
        <mt-field label="发动机号" type="text" placeholder="请输入发动机编号" v-model="city.engineNo" v-verify="city.engineNo" v-show="isNonPlateNo" maxlenght="11"></mt-field>
        <label class="mt-err-tip" v-remind="city.engineNo"></label>
        <div class="tip-pingan" v-show="isNonPlateNo">*上年国寿需要输入发动机号后6位</div>
        <mt-button type="primary" size="large" @click="toQuota">车险报价</mt-button>
        <!-- 寿险产品列表 -->
        <div v-show="hasProductsData" style="margin-top:30px">
          <div>
            <div>
              <h4 style="float:left">热门寿险</h4>
              <mt-button style="float:right;color:blue;text-align:center;font-size:12px;margin-bottom:5px;height:25px;width:72px;" type="default" size="small" @click="viewAll">查看全部</mt-button>
            </div>
            <hr width="100%" color="#f5f5f5" size="1">
            </hr>
          </div>
          <div class="wrppera" ref="wrppera">
            <ul class="cust-list mint-region">
              <li class="mint-cell" style="margin-left: -10px;padding-bottom: 15px" v-for="item in products" @click="productDetail(item,$event)">
                <div style="margin-top: -25px">
                  <img :src="item.coverUrl? item.coverUrl : defaultImg" style="width: 80px;height: 80px; margin-top: 25px" slot="left">
                  <i class="mint-title" style="margin-left: 5px;font-size: 16px;">{{item.shortName}}</i>
                  <p style="margin-left: 85px; margin-top: -25px">{{item.description}}</p>
                </div>
                <i class="ico-arrow"></i>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <mt-popup v-show="inputPlateNo" position="bottom" popup-transition="popup-fade">
      <div id="dispense">
        <mt-header fixed class="def-header" title="车牌号">
          <div slot="left">
            <mt-button style="font-size:16px;color:#f94037" @click="closeone(false)">取消</mt-button>
          </div>
          <div slot="right">
            <mt-button style="font-size:16px;color:#f94037" @click="closeone(true)">确定</mt-button>
          </div>
        </mt-header>
        <div class="content-car-number">
          <div class="content-section">
            <div class="content-section-flex flex-card">
              <div class="content-section-flex flex-card-border">
                <button id="font" class="flex-btn" @click="btnClickYue" v-bind:class="{isClick: isYue }">
                  {{areaName}}
                </button>
                <span class="blank-border blank-border-first"></span>
                <button id='letter' class="flex-btn" @click="btnClickA" v-bind:class="{isClick: isA}">
                  {{areaLetter}}
                </button>
                <div class="flex-mid"><span></span></div>
                <div class="flex-btns">
                  <button id='numOne' @click="btnClickNum('one')" v-bind:class="{isNumClick: isNumOne }">{{numOne}}</button>
                  <span class="blank-border"></span>
                  <button id='numTwo' @click="btnClickNum('two')" v-bind:class="{isNumClick: isNumTwo }">{{numTwo}}</button>
                  <span class="blank-border"></span>
                  <button id='numThree' @click="btnClickNum('three')" v-bind:class="{isNumClick: isNumThree }">{{numThree}}
                  </button>
                  <span class="blank-border"></span>
                  <button id='numFour' @click="btnClickNum('four')" v-bind:class="{isNumClick: isNumFour }">{{numFour}}
                  </button>
                  <span class="blank-border"></span>
                  <button id='numFive' @click="btnClickNum('five')" v-bind:class="{isNumClick: isNumFive }">{{numFive}}
                  </button>
                  <span class="blank-border" v-if="checkbox"></span>
                  <button v-if="checkbox" id='numSix' @click="btnClickNum('six')" v-bind:class="{isNumClick: isNumSix }">{{numSix}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="keyboard" v-if="keyboardShow" :class='{animationDown:isDown,animationUp:isUp}'>
          <div v-if="keyboard == 'txt'">
            <div class="keyboard-row" v-for="(item,rows) in carTxt">
              <button class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
              </button>
            </div>
            <div class="keyboard-row">
              <!-- <div class="keyboard-row-items"> -->
              <button class="keyboard-row-item bottom" @click="btnBottomClick('新')">新</button>
              <button class="keyboard-row-item bottom" @click="btnBottomClick('临')">临</button>
              <button v-for="j in noneBottomtxt" class="none-botton">{{j}}</button>
              <div class="keyboard-row-item clear" @click="clearClick">
                <img src="../../assets/images/icon_input_delete.png" alt="删除">
                      </div>
                <!-- </div> -->
              </div>
            </div>
            <div v-if="keyboard == 'num'">
              <div class="keyboard-row" v-for="(item,rows) in carNum">
                <button :disabled="!isSelectl?isDisable && i<10 :isDisable&& rows!=0 " class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
                </button>
              </div>
              <div class="keyboard-row">
                <!-- <div class="keyboard-row-bottom"> -->
                <button :disabled="isSelectl" v-for="item in carNumBottom" class="keyboard-row-item bottom" @click="btnBottomNumClick(item)">{{item}}
                </button>
                <button v-for="j in noneBottom" class="none-botton">{{j}}</button>
                <div class="keyboard-row-item clear" @click="clearClick">
                  <img src="../../assets/images/icon_input_delete.png" alt="删除">
                      </div>
                </div>
              </div>
            </div>
          </div>
    </mt-popup>
    <div class="container-bottom">
      <bottomAllTab ref="bottomAllTab" :plant.sync="plante" v-show="!iSingleUserMode"></bottomAllTab>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import store from './../../store/store'
import * as types from './../../store/types';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import bottomAllTab from './../bottomtab/bottom-all-tab';
import axios from 'axios';
import cityPlateNoPrefix from '../../assets/json/cityPlateNoPrefix.json';
export default {
  name: 'home',
  data() {
    return {
      defaultImg: this.src = require('../../assets/images/icon-product.png'),
      products: [],
      hasProductsData: false,
      limit: 10,
      lengths: '',
      plante: 'home',
      title: '',
      isNonPlateNo: false,
      iSingleUserMode: false,
      placeholderPlateNo: '请输入车牌号',
      inputPlateNo: false,
      city: {
        insCityCode: "", //投保地区编码
        insCityShortName: "",
        plateNo: '', //车牌号
        ownerIdCardNo: '',
        vin: "", //车辆VIN码
        engineNo: "" //发动机号
      },
      noCity: false,
      defaultImg: this.src = require('../../assets/images/right.png'),
      checkbox: true,
      isDown: false,
      isUp: false,
      selected: null,
      isSelectx: false,
      isSelectl: false,
      key: 1,
      areaName: '',
      areaLetter: '',
      numOne: '',
      numTwo: '',
      numThree: '',
      numFour: '',
      numFive: '',
      numSix: '',
      isYue: false,
      keyboardShow: false,
      keyboard: false,
      isA: false,
      isNumOne: false,
      isNumTwo: false,
      isNumThree: false,
      isNumFour: false,
      isNumFive: false,
      isNumSix: false,
      isDisable: false,
      isOne: false,
      isTwo: false,
      isThree: false,
      isFour: false,
      isFive: false,
      isSix: false,
      isSeven: false,
      isEight: false,
      isOther: false,
      carTxt: [
        { name: ['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉', '黑'] },
        { name: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂'] },
        { name: ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'] }
      ],
      carNumBottom: ['W', 'X', 'Y', 'Z'],
      noneBottom: ['', '', '', ''],
      noneBottomtxt: ['', '', '', '', '', ''],
      carNum: [
        { name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
        { name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'] },
        { name: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'] }
      ],
      addedCarNum: ''
    }
  },
  components: {
    bottomAllTab
  },
  verify: {
    city: {
      plateNo: [{
        test: function(val) {
          if (this.isNonPlateNo == false) {
            if (!this.Verify.validate.plateNo(val)) {
              return false;
            }
          }
          return true
        },
        message: '请正确填写车牌号'
      }],
      ownerIdCardNo: [{
        test: function(val) {
          if (val != undefined && val != '')
            if (val.length != 6 && this.isNonPlateNo == false) return false;
          return true
        },
        message: '请输入证件号后六位数'
      }],
      vin: [{
        test: function(val) {
          if (val.length == 0 && this.isNonPlateNo) return false
          return true;
        },
        message: "请填写车架号"
      }, {
        test: function(val) {
          if (val.length != 17 && this.isNonPlateNo) return false
          return true;
        },
        message: "请核对您的车架号是否输入正确"
      }],
      engineNo: [{
        test: function(val) {
          if (val != '') {
            if (val.length < 5 && this.isNonPlateNo) return false;
          }

          return true
        },
        message: '请核对您的发动机号是否输入正确'
      }]
    }
  },
  watch: {
    checkbox: function(val) {
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.yue
      const vm = this
      if (!val) { // 切换到普通车牌
        if (vm.numFour) {
          vm.isNumFive = true
          vm.key = 7
          console.log(4, val)
        }
      } else { // 切换到新能源车牌
        if (vm.numFive) {
          vm.isNumSix = true
          vm.key = 8
          console.log(3, val)
        }
      }
    }
  },
  methods: {
    getProducts: function(id) {
      var param = {};
      this.hasProductsData = true;
      var appId = localStorage.getItem("appId");
      if (appId) {
        Indicator.open('加载中...');
        axiosGetAPI('/li/products', param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.products = res.result;
            this.hasProductsData = true;
          }
        });

      };
    },
    productDetail: function(item, e) {
      e.preventDefault();
      var appId = localStorage.getItem("appId");
      var localToken = localStorage.getItem('token');
      if (localToken) {
        localToken = localToken.replace(appId + '_', '');
      }
      var url = "/product/detail?pid=" + item.id + "&appId=" + appId + "&token=" +
        encodeURIComponent(localToken);
      this.$router.push({ path: url });
    },
    viewAll: function() {
      this.$router.push({ path: "/products" });
    },
    closeone: function(update) {
      var self = this;
      self.inputPlateNo = false;
      if (update) {
        self.addCar();
      };
    },
    openone: function() {
      var self = this;
      if (!self.isNonPlateNo) {
        self.inputPlateNo = true;
        if (self.city.plateNo) {
          var len = self.city.plateNo.length;
          if (len == 1) {
            self.areaName = self.city.plateNo.substring(0, 1);
          } else if (len == 2) {
            self.areaName = self.city.plateNo.substring(0, 1);
            self.areaLetter = self.city.plateNo.substring(1, 2);
          } else if (len == 3) {
            self.areaName = self.city.plateNo.substring(0, 1);
            self.areaLetter = self.city.plateNo.substring(1, 2);
            self.numOne = self.city.plateNo.substring(2, 3);
          } else if (len == 4) {
            self.areaName = self.city.plateNo.substring(0, 1);
            self.areaLetter = self.city.plateNo.substring(1, 2);
            self.numOne = self.city.plateNo.substring(2, 3);
            self.numTwo = self.city.plateNo.substring(3, 4);
          } else if (len == 5) {
            self.areaName = self.city.plateNo.substring(0, 1);
            self.areaLetter = self.city.plateNo.substring(1, 2);
            self.numOne = self.city.plateNo.substring(2, 3);
            self.numTwo = self.city.plateNo.substring(3, 4);
            self.numThree = self.city.plateNo.substring(4, 5);
          } else if (len == 6) {
            self.areaName = self.city.plateNo.substring(0, 1);
            self.areaLetter = self.city.plateNo.substring(1, 2);
            self.numOne = self.city.plateNo.substring(2, 3);
            self.numTwo = self.city.plateNo.substring(3, 4);
            self.numThree = self.city.plateNo.substring(4, 5);
            self.numFour = self.city.plateNo.substring(5, 6);
          } else if (len == 7) {
            self.areaName = self.city.plateNo.substring(0, 1);
            self.areaLetter = self.city.plateNo.substring(1, 2);
            self.numOne = self.city.plateNo.substring(2, 3);
            self.numTwo = self.city.plateNo.substring(3, 4);
            self.numThree = self.city.plateNo.substring(4, 5);
            self.numFour = self.city.plateNo.substring(5, 6);
            self.numFive = self.city.plateNo.substring(6, 7);
          } else if (len == 8) {
            self.areaName = self.city.plateNo.substring(0, 1);
            self.areaLetter = self.city.plateNo.substring(1, 2);
            self.numOne = self.city.plateNo.substring(2, 3);
            self.numTwo = self.city.plateNo.substring(3, 4);
            self.numThree = self.city.plateNo.substring(4, 5);
            self.numFour = self.city.plateNo.substring(5, 6);
            self.numFive = self.city.plateNo.substring(6, 7);
            self.numSix = self.city.plateNo.substring(7, 8);
            self.checkbox = true;
          }
        }
        self.btnClickYue();
      };
    },
    turn: function() { // 是否未上牌
      var self = this;
      self.changeCard();
    },
    choiceCity: function() { // 点击切换城市
      localStorage.setItem("homeApp", JSON.stringify(this.city));
      this.$router.push({ path: "/quoteManagement/city", query: { from: 'home' } });
    },
    changeCard: function() { // 有无车牌处理函数
      var self = this;
      self.inputPlateNo = !self.isNonPlateNo;
      if (!self.isNonPlateNo) {
        self.city.vin = "";
        self.city.engineNo = "";
        self.placeholderPlateNo = "请输入车牌号";
      } else {
        self.city.plateNo = "";
        self.city.ownerIdCardNo = "";
        self.placeholderPlateNo = "";
      }
    },
    toQuota: function() {
      var self = this;
      if (self.noCity) {
        Toast('暂无报价权限，请联系管理员。');
        return false;
      };
      if (!self.city.insCityCode) {
        Toast('请选择投保地区');
        return false;
      }
      if (self.$verify.check()) {
        // self.changeCard();
        self.city.plateNo = self.city.plateNo.toUpperCase();
        self.city.vin = self.city.vin.toUpperCase();
        localStorage.setItem("homeApp", JSON.stringify(self.city));
        Indicator.open('加载中...');
        self.$router.push({ path: "/quoteManagement/quoteInfo", query: self.city });
      }
    },
    getCitys: function() {
      Indicator.open('加载中...');
      var self = this;
      var root = process.env.API_ROOT
      axios({
          method: 'GET',
          url: '/vi/insuranceCompanies',
          data: null,
          params: null,
          baseURL: root,
          withCredentials: false
        })
        .then(function(res) {
          Indicator.close();
          if (res.data.status == 200) {
            if (res.data.result) {
              self.noCity = false;
              /* 城市和城市代码去重*/
              var CityCode = [],
                CityShortName = [];
              for (var i = 0; i < res.data.result.length; i++) {
                var cityCode = res.data.result[i].insCityCode;
                if (cityCode != '110000') {
                  CityCode.push(cityCode);
                  CityShortName.push(res.data.result[i].insCityShortName);
                };
              }
              var qCityCode = CityCode.unique(),
                qCityShortName = CityShortName.unique(),
                arr = [];
              for (var j = 0; j < qCityShortName.length; j++) {
                var obj = {};
                obj.insCityCode = qCityCode[j];
                obj.insCityShortName = qCityShortName[j];
                obj.appId = self.appId;
                arr.push(obj);
              }
              if (arr.length == 1) {
                for (var i = 0; i < cityPlateNoPrefix.result.length; i++) {
                  if (arr[0].insCityCode == cityPlateNoPrefix.result[i].CityCode) {
                    if (self.city.plateNo.length <= 2) {
                      self.city.plateNo = cityPlateNoPrefix.result[i].PlateNoPrefix;
                    };
                    break;
                  };
                };
                self.city.insCityCode = arr[0].insCityCode;
                self.city.insCityShortName = arr[0].insCityShortName;
              } else {
                self.city.insCityCode = '';
                self.city.insCityShortName = '';
              };

            } else {
              self.noCity = true;
            }
          } else {
            self.noCity = true;
          }

        }, err => {
          MessageBox.alert('请求超时，请刷新页面重试！').then(action => {
            window.location.reload();
          });
          reject(err)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    carTypeChange(val) {
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      if (!val) { // 切换到普通车牌
        if (this.numFour) {
          this.isNumFive = true
          this.key = 7
        }
      } else { // 切换到新能源车牌
        if (this.numFive) {
          this.isNumSix = true
          this.key = 8
        }
      }
    },
    btnClickYue() {
      this.isYue = true
      this.isA = false
      this.isUp = true
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.keyboardShow = true
      this.keyboard = 'txt'
      this.key = 1
    },
    btnWordClick(rows, index, i) {
      this.selected = i
      if (this.key === 1) {
        if (this.areaName === '临') {
          this.areaLetter = ''
          this.numOne = ''
          this.numTwo = ''
          this.numThree = ''
          this.numFour = ''
          this.numFive = ''
          this.numSix = ''
        }
        this.areaName = i
        this.isSelectl = false
        document.getElementById('letter').click()
      } else if (this.key === 2) {
        this.areaLetter = i
        document.getElementById('numOne').click()
      } else if (this.key === 3) {
        this.numOne = i
        document.getElementById('numTwo').click()
      } else if (this.key === 4) {
        this.numTwo = i
        document.getElementById('numThree').click()
      } else if (this.key === 5) {
        this.numThree = i
        document.getElementById('numFour').click()
      } else if (this.key === 6) {
        this.numFour = i
        document.getElementById('numFive').click()
      } else if (this.key === 7) {
        this.numFive = i
        if (this.checkbox) {
          document.getElementById('numSix').click()
        }
      } else if (this.key === 8) {
        this.numSix = i
      }
      if (this.key === 7 || this.key === 8) {
        this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
        this.noneBottom = ['']
      } else if (this.key === 3 || this.key === 4 || this.key === 5 || this.key === 6) {
        this.carNumBottom = ['W', 'X', 'Y', 'Z']
        this.noneBottom = ['', '', '', '']
      }
    },
    btnBottomClick(val) {
      if (val === '新') {
        if (this.areaName === '临') {
          this.areaLetter = ''
          this.numOne = ''
          this.numTwo = ''
          this.numThree = ''
          this.numFour = ''
          this.numFive = ''
          this.numSix = ''
        }
        this.areaName = '新'
        this.isSelectx = true
        this.isSelectl = false
        document.getElementById('letter').click()
      } else if (val === '临') {
        this.areaName = '临'
        this.isSelectl = true
        this.isSelectx = false
        this.isDisable = true
        this.areaLetter = ''
        this.numOne = ''
        this.numTwo = ''
        this.numThree = ''
        this.numFour = ''
        this.numFive = ''
        this.numSix = ''
        document.getElementById('letter').click('isLin')
      }
    },
    btnBottomNumClick(i) {
      this.selected = i
      if (this.key === 2) {
        this.areaLetter = i
        document.getElementById('numOne').click()
      } else if (this.key === 3) {
        this.numOne = i
        document.getElementById('numTwo').click()
      } else if (this.key === 4) {
        this.numTwo = i
        document.getElementById('numThree').click()
      } else if (this.key === 5) {
        this.numThree = i
        document.getElementById('numFour').click()
      } else if (this.key === 6) {
        this.numFour = i
        document.getElementById('numFive').click()
      } else if (this.key === 7) {
        this.numFive = i
        if (this.checkbox) {
          document.getElementById('numSix').click()
        }
      } else if (this.key === 8) {
        this.numSix = i
      }
    },
    btnClickA() {
      this.isDisable = true
      this.isA = true
      this.isYue = false
      this.isUp = true
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.keyboardShow = true
      this.keyboard = 'num'
      this.key = 2
    },
    btnClickNum(name) {
      if (this.isSelectl) {
        this.isDisable = true
      } else {
        this.isDisable = false
      }
      this.keyboard = 'num'
      this.keyboardShow = true
      this.isYue = false
      this.isA = false
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.isUp = true
      if (name === 'one') {
        this.isNumOne = true
        this.key = 3
      } else if (name === 'two') {
        this.isNumTwo = true
        this.key = 4
      } else if (name === 'three') {
        this.isNumThree = true
        this.key = 5
      } else if (name === 'four') {
        this.isNumFour = true
        this.key = 6
      } else if (name === 'five') {
        this.isNumFive = true
        this.key = 7
      } else if (name === 'six') {
        this.isNumSix = true
        this.key = 8
      }
      if (name === 'five' || name === 'six') {
        this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
        this.noneBottom = ['']
      } else {
        this.carNumBottom = ['W', 'X', 'Y', 'Z']
        this.noneBottom = ['', '', '', '']
      }
    },
    completeClick() {
      this.isYue = false
      this.isA = false
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.isUp = false
      this.isDown = true
      this.keyboardShow = false
    },
    clearClick() {
      if (this.key === 1) {
        this.areaName = ''
      } else if (this.key === 2) {
        document.getElementById('font').click()
        this.areaLetter = ''
      } else if (this.key === 3) {
        document.getElementById('letter').click()
        this.numOne = ''
      } else if (this.key === 4) {
        document.getElementById('numOne').click()
        this.numTwo = ''
      } else if (this.key === 5) {
        document.getElementById('numTwo').click()
        this.numThree = ''
      } else if (this.key === 6) {
        document.getElementById('numThree').click()
        this.numFour = ''
      } else if (this.key === 7) {
        document.getElementById('numFour').click()
        this.numFive = ''
      } else if (this.key === 8) {
        document.getElementById('numFive').click()
        this.numSix = ''
      }
    },
    addCar() {
      var num
      if (!this.checkbox) {
        num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive
      } else if (this.checkbox) {
        num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive + this.numSix
      }
      if (num === '') {
        Toast("请输入车牌")
      } else if (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '') {
        Toast("请输入完整车牌")
      }
      this.city.plateNo = num;
    },
  },
  created: function() {
    var self = this;
    var appId = self.$route.query.appid || self.$route.query.appId;
    localStorage.setItem('appId', appId);

    if (appId) {
      // localStorage.removeItem('appId');
      localStorage.removeItem('insureInfoApp');
      localStorage.removeItem('quoteInfoStatus');

      var homeApp = localStorage.getItem('homeApp')
      if (homeApp) {
        var resultData = JSON.parse(homeApp);
        self.city = resultData;
      }
      Indicator.open('加载中...');
      document.title = '';
      axiosGetAPI('/apis/apps/' + appId + "/H5").then((res) => {
        Indicator.close();
        var authMode = res.result.authMode.text;
        localStorage.setItem('appId', res.result.appId);
        self.$store.commit(types.APPID, res.result.appId);
        self.$store.commit(types.AUTHMODE, authMode);
        if (authMode == 'SingleUserMode') {
          self.$store.commit(types.LOGIN, '1');
          localStorage.setItem('token', '1');
          self.iSingleUserMode = true;
          if (Object.keys(self.$route.query).length <= 1) self.getCitys();
        } else {
          self.iSingleUserMode = false;
          if (store.state.token == 'null' || store.state.token == '1') {
            self.$store.commit(types.LOGOUT);
            self.$router.push({ path: "/login" });
          } else {
            // Toast('appid:' + store.state.appId +'\n'+ 'token:' + store.state.token);
            var localToken = localStorage.getItem('token');
            if (localToken && localToken.indexOf(appId) == 0) {
              if (Object.keys(self.$route.query).length <= 1) {
                self.getCitys();
              }
              self.getProducts();
              axiosGetAPI('/Users/Me').then((res) => {
                self.userId = res.result.userId;
                sessionStorage.setItem('userIds', res.result.userId);
                sessionStorage.setItem('nickName', '');
                sessionStorage.setItem('referralCode', '');
                sessionStorage.setItem('salesmanId', '');
                if (self.userId) {
                  var root = process.env.API_ROOT
                  axios({
                      method: 'GET',
                      url: '/Users/' + self.userId + '/Salesman',
                      data: null,
                      params: null,
                      baseURL: root,
                      withCredentials: false
                    })
                    .then(function(res) {
                      Indicator.close();
                      if (res.data.status == 200) {
                        if (res.data.result) {
                          sessionStorage.setItem('nickName', res.data.result.nickName);
                          sessionStorage.setItem('referralCode', res.data.result.referralCode);
                          sessionStorage.setItem('salesmanId', res.data.result.id);
                        }
                      } else if (res.data.status == 404) {}
                    }, err => {
                      MessageBox.alert('请求超时，请刷新页面重试！').then(action => {
                        window.location.reload();
                      });
                      reject(err)
                    })
                    .catch(function(error) {
                      console.log(error)
                    })
                }

              });
            } else {
              self.$store.commit(types.LOGOUT);
              self.$router.push({ path: "/login" });
            }
          }
        }
        self.title = res.result.name;
        document.title = res.result.name;
        sessionStorage.setItem('title', self.title);
      });
    } else {
      this.$store.commit(types.LOGOUT);
      this.$router.push({ path: "/login" });
    }
  },
  mounted: function() {
    if (Object.keys(this.$route.query).length > 1) { /* 获取city页面传过来的值，并赋值给city对象*/
      this.city.insCityCode = this.$route.query.insCityCode;
      this.city.insCityShortName = this.$route.query.insCityShortName;
      for (var i = 0; i < cityPlateNoPrefix.result.length; i++) {
        if (this.city.insCityCode == cityPlateNoPrefix.result[i].CityCode) {
          if (this.city.plateNo.length <= 2) {
            this.city.plateNo = cityPlateNoPrefix.result[i].PlateNoPrefix;
          };
          break;
        };
      };
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
.mint-content .tip {
  font-size: 10px;
  color: #fc3738;
  letter-spacing: 0;
  height: 25px;
  line-height: 30px;
}

.mint-content .tip-pingan {
  font-size: 10px;
  color: #fc3738;
  letter-spacing: 0;
  height: 30px;
  line-height: 30px;
  padding-left: 50px 0;
  margin-left: 80px
}

.mint-content .ins-img {
  width: 28px;
  height: 28px;
  display: inline-block;
  margin: 0 5px 0 0px;
  position: relative;
  margin-right: -10px
}

.mint-content .messagecc {
  height: 100%;
  width: 100%;
}

.mint-content .lili {
  bottom: 0;
  top: 0;
}

#dispense {
  .ze-checkbox>input[type=checkbox] {
    position: absolute;
    left: -9999em;
  }

  .ze-checkbox>input[type=checkbox]:checked+.ze-checkbox-icon {
    background-color: currentColor;
    border-color: #ffC400;
  }

  .ze-checkbox-icon {
    border: 1px solid #ccc;
    /*no*/
    border-radius: 2px;
    display: inline-block;
    position: relative;
    z-index: 10;
    vertical-align: bottom;
    pointer-events: none;

    >i {
      content: "";
      position: absolute;
      top: 45%;
      left: 50%;
      border: 3px solid #ffC400;
      /*no*/
      border-top: 0;
      border-left: 0;
      -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(0);
      transform: translate(-50%, -50%) rotate(45deg) scale(0);
    }
  }

  .ze-checkbox>input[type=checkbox]:checked+.ze-checkbox-icon>i {
    -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(1);
    transform: translate(-50%, -50%) rotate(45deg) scale(1);
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }

  background-color: #fff;
  height:385px;

  .content-car-number {
    padding: 56px 0 0;

    .car-content-title {
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      margin-bottom: 15px;

      span {
        font-size: 15px;
      }

      .ze-checkbox {
        display: flex;
        align-items: center;
      }

      .ze-radio-text {
        font-size: 15px;
      }

      .ze-checkbox-icon {
        color: #FFEDB1 !important;
        margin-right: 8px;
      }
    }

    .content-section {
      .content-section-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        margin-bottom: 10px;

        .blank-border {
          height: 44px;
          width: 1px;
          /*no*/
          border-right: 1px solid #ddd;
          /*no*/
          margin-top: 2px;
          float: left;
          margin-left: 0px;
          z-index: 1;

          &.blank-border-first {
            margin-top: 0px;
          }
        }

        &.flex-card {
          color: #000;

          .flex-btn {
            width: 40px;
            height: 48px;
            border: none;
            text-align: center;
            background: #fff;
            font-size: 18px;
            color: #000;
          }

          .flex-btns {
            text-align: center;
            background: #fff;
            width: fit-content;
            position: relative;
            height: 48px;

            button {
              width: 40px;
              height: 48px;
              border: none;
              font-size: 18px;
              color: #000;
              border-radius: 50%;
              background: transparent;
              float: left;
              margin-left: 0px;
              z-index: 2;
              position: relative;

              &:first-child {
                margin-left: 0;
              }
            }
          }

          .flex-mid {
            margin: 0 0.1rem;

            span {
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #ddd;
            }
          }

          .isClick {
            border: 1px solid #f94037;
            /*no*/
            z-index: 50;
            border-radius: 3px;
          }

          .isNumClick {
            border-radius: 8px !important;
            border: 1px solid #f94037 !important;
            /*no*/
            z-index: 10;
            background-color: #fff !important;
          }
        }

        .flex-card-border {
          border: 1px solid #ddd;
          /*no*/
          border-radius: 3px;
        }
      }
    }
  }

  .keyboard {
    width: 100%;
    height: 265px;
    position: fixed;
    bottom: -265px;
    background: #F9F9F9;
    z-index: 10;

    &.animationDown {
      animation: slide_dowms 0.3s ease-out;
      animation-fill-mode: forwards;
    }

    &.animationUp {
      animation: slide_ups 0.3s ease-out;
      animation-fill-mode: forwards;
    }

    .btn-complete {
      height: 42px;
      text-align: right;
      color: #ffc200;
      font-size: 18px;
      width: 100%;
      background: #fff;
      border: none;
      border-top: 1px solid #eee;
      margin-bottom: 15px;

      span {
        margin-right: 30px;
      }
    }

    .keyboard-row {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      padding: 0 8px;
      color: #333;

      &:first-child {
        margin-top: 0;
      }

      .keyboard-row-items {
        display: flex;
        justify-content: left;
      }

      .keyboard-row-bottom {
        display: flex;
        justify-content: space-between;
      }

      .keyboard-row-item {
        width: 45px;
        height: 45px;
        background: #fff;
        font-size: 20px;
        text-align: center;
        border: 1px solid #ccc;
        /*no*/
        border-radius: 8px;
        color: #333;

        &.bottom {
          height: 45px;
          width: 45px;
          line-height: 45px;
          background: #fff;
          color: #333;
          /*margin-right: 0.08rem;*/
        }

        &.clear {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 25px;
          }
        }
      }

      .none-botton {
        border: none;
        height: 80px;
        width: 66px;
        visibility: hidden;
      }
    }

    button {
      &:active {
        background: #f4f4f4 !important;
        color: #999 !important;
      }
    }
  }

  @keyframes slide_ups {
    from {
      bottom: -220px;
    }

    to {
      bottom: 0px;
    }
  }

  @keyframes slide_dowms {
    from {
      bottom: 0px;
    }

    to {
      bottom: -220px;
    }
  }

  button:disabled {
    background: #f4f4f4 !important;
    color: #8f8f8f !important;
  }

  .active {
    &:active {
      background: #f4f4f4 !important;
      color: #999 !important;
    }
  }
}

</style>
