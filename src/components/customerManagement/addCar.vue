<template>
  <div class="car">
    <mt-header fixed class="def-header cust-head" title="添加车辆">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center">
      <div class="mint-region">
        <div @click="openone">
          <mt-field class="mint-formItm upper" label="车牌号" :disabled="true">
            <input class="mint-input" type="text" v-model="carData.plateNo" placeholder="请输入车牌号" disabled="true">
          </mt-field>
        </div>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <mt-field class="mint-formItm upper" label="车架号" type="text" :disabled="true">
          <input class="mint-input" type="text" v-model="carData.vin" placeholder="输入车架号" maxlength="17">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <div style="background:#F5F5F5; height: 10px"></div>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
      </div>
    </div>
    <div style="margin-left: 30px; margin-right: 30px">
      <mt-button @click="createCar" type="primary" size="large" plain>确定</mt-button>
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
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import event from './../../common/event';
export default {
  name: 'car',
  data() {
    return {
      carData: { "plateNo": "", "vin": "" },
      placeholderPlateNo: '请输入车牌号',
      inputPlateNo: false,
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
    };
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
    openBack: function() {
      window.history.back();
    },
    createCar: function() { //立即创建
      var self = this;
      if (!self.carData.plateNo) {
        Toast('请填写车牌号码')
        return false
      }
      self.carData.vin = self.carData.vin.toUpperCase();
      Indicator.open('加载中...');
      var pcid = this.$route.query.pcid;
      axiosPostAPI('/PotentialCustomers/' + pcid + '/Cars', self.carData).then((res) => {
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
    closeone: function(update) {
      var self = this;
      self.inputPlateNo = false;
      if (update) {
        self.addCar();
      };
    },
    openone: function() {
      var self = this;
      self.inputPlateNo = true;
      if (self.carData.plateNo) {
        var len = self.carData.plateNo.length;
        if (len == 1) {
          self.areaName = self.carData.plateNo.substring(0, 1);
        } else if (len == 2) {
          self.areaName = self.carData.plateNo.substring(0, 1);
          self.areaLetter = self.carData.plateNo.substring(1, 2);
        } else if (len == 3) {
          self.areaName = self.carData.plateNo.substring(0, 1);
          self.areaLetter = self.carData.plateNo.substring(1, 2);
          self.numOne = self.carData.plateNo.substring(2, 3);
        } else if (len == 4) {
          self.areaName = self.carData.plateNo.substring(0, 1);
          self.areaLetter = self.carData.plateNo.substring(1, 2);
          self.numOne = self.carData.plateNo.substring(2, 3);
          self.numTwo = self.carData.plateNo.substring(3, 4);
        } else if (len == 5) {
          self.areaName = self.carData.plateNo.substring(0, 1);
          self.areaLetter = self.carData.plateNo.substring(1, 2);
          self.numOne = self.carData.plateNo.substring(2, 3);
          self.numTwo = self.carData.plateNo.substring(3, 4);
          self.numThree = self.carData.plateNo.substring(4, 5);
        } else if (len == 6) {
          self.areaName = self.carData.plateNo.substring(0, 1);
          self.areaLetter = self.carData.plateNo.substring(1, 2);
          self.numOne = self.carData.plateNo.substring(2, 3);
          self.numTwo = self.carData.plateNo.substring(3, 4);
          self.numThree = self.carData.plateNo.substring(4, 5);
          self.numFour = self.carData.plateNo.substring(5, 6);
        } else if (len == 7) {
          self.areaName = self.carData.plateNo.substring(0, 1);
          self.areaLetter = self.carData.plateNo.substring(1, 2);
          self.numOne = self.carData.plateNo.substring(2, 3);
          self.numTwo = self.carData.plateNo.substring(3, 4);
          self.numThree = self.carData.plateNo.substring(4, 5);
          self.numFour = self.carData.plateNo.substring(5, 6);
          self.numFive = self.carData.plateNo.substring(6, 7);
        } else if (len == 8) {
          self.areaName = self.carData.plateNo.substring(0, 1);
          self.areaLetter = self.carData.plateNo.substring(1, 2);
          self.numOne = self.carData.plateNo.substring(2, 3);
          self.numTwo = self.carData.plateNo.substring(3, 4);
          self.numThree = self.carData.plateNo.substring(4, 5);
          self.numFour = self.carData.plateNo.substring(5, 6);
          self.numFive = self.carData.plateNo.substring(6, 7);
          self.numSix = self.carData.plateNo.substring(7, 8);
          self.checkbox = true;
        }
      };
      self.btnClickYue();
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
      this.carData.plateNo = num;
    },
  }
};

</script>
<style rel="stylesheet/scss" lang="scss">
.car {
  background-color: #FFF;
}

.car .mint-cell-title {
  color: #000;
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
