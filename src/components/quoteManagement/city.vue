<template>
  <div class="citys" style="background-color:#FFF">
    <mt-header class="def-header" title="选择城市">
      <div slot="right" @click="closeCity()">
        <img :src="closeImg" style="width: 18px;height: 18px;">
      </div>
    </mt-header>
    <!--字母列表-->
    <!-- <div class="letter" v-show="!noData">
      <ul>
        <li v-for="item in citys" @click="naver(item.letter)">{{item.letter}}</li>
      </ul>
    </div> -->
    <!--城市列表-->
    <div class="city-content" v-show="!noData">
      <div class="city">
        <div class="city-list">
          <div v-for="item in citys">
            <div class="icon-letter"><a :id="item.letter">{{item.letter}}</a></div>
            <p v-for="city in item.citylist" @click="selectedCity(city)" v-html="city.insCityShortName"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="non-data" v-show="noData" style="text-align:left;margin-left:15px">
      <p style="font-size:15px;color:#333">没有可选择的城市哦，请联系管理员</p>
      <p style="font-size:13px;color:red;margin-top:8px">存在的原因如下：</p>
      <p style="font-size:13px;color:red">1. 当前用户所在的机构暂未配置出单渠道信息；</p>
      <p style="font-size:13px;color:red">2. 当前用户不是业务员，或者未绑定业务员；</p>
    </div>
    <!-- <div id="tipBox" v-show="!noData">{{tipString}}</div> -->
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import pinyin from '../../../static/lib/web-pinyin/bundle.js'
import axios from 'axios'
export default {
  name: 'citys',
  data() {
    return {
      appId: 0,
      show: false,
      citys: [],
      letter: [],
      tipString: '',
      noData: false,
      closeImg: this.src = require('../../assets/images/ico-close.png'),
    }
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    buildLetter: function() { // 构建字母项
      this.letter = []
      for (var i = 0; i < 26; i++) {
        var obj = {}
        obj.letter = String.fromCharCode((65 + i))
        obj.citylist = []
        this.letter.push(obj)
      }
    },
    companiesSuccess: function(data) {
      var self = this;
      if (data.status == 200) {
        if (data.result && data.result.length > 0) {
          sessionStorage.setItem('insuranceNameCode', JSON.stringify(data.result));
          self.noData = false;
          /* 城市和城市代码去重*/
          var CityCode = [],
            CityShortName = [];
          for (var i = 0; i < data.result.length; i++) {
            var cityCode = data.result[i].insCityCode;
            if (cityCode != '110000') {
              CityCode.push(cityCode);
              CityShortName.push(data.result[i].insCityShortName);
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
          this.buildItem(arr)
        } else{
          self.noData = true;
        }
      }
    },
    buildItem: function(cityNamesFilter) { // 构建城市
      var self = this,
        citysArr = [];
      self.buildLetter()
      for (var i = 0; i < 26; i++) {
        self.letter[i].citylist = []
      }
      for (var i = 0; i < cityNamesFilter.length; i++) {
        var _index = Number(self.getFirstLetter(cityNamesFilter[i].insCityShortName).charCodeAt() - 65)
        if (_index >= 0 && _index < 26) {
          self.letter[_index].citylist.push(cityNamesFilter[i])
        }
      }
      for (var i = 0; i < self.letter.length; i++) {
        var letterItem = self.letter[i];
        if (letterItem.citylist.length > 0) {
          citysArr.push(letterItem)
        }
      }
      self.citys = citysArr;
    },
    getFirstLetter: function(str) { //  得到城市第一个字的首字母
      return pinyin.pinyin(str)[0][0].charAt(0).toUpperCase()
    },
    postData: function(city) {
      var self = this;
      var from = self.$route.query.from;
      var plateNo = self.$route.query.plateNo;
      var vin = self.$route.query.vin;
      var phone = self.$route.query.phone;
      if (from == 'home') {
        this.$router.push({ path: "/quoteIndex", query: city });
      } else {
        var cityCode = city.insCityCode ? city.insCityCode : '';
        var shortName = city.insCityShortName ? city.insCityShortName : '';
        var url = "/quoteManagement/quoteInfo" + "?from=" + from + "&insCityCode=" + cityCode + "&insCityShortName=" + shortName + "&plateNo=" + plateNo + "&vin=" + vin + "&phone=" + phone;
        this.$router.push({ path: url });
      }

    },
    naver: function(id) { // 点击右边字母滚动
      this.tipString = id
      var obj = document.getElementById(id)
      var tip = document.getElementById('tipBox')
      tip.setAttribute('class', 'tipAppear')
      setTimeout(function() {
        tip.removeAttribute('class')
      }, 500)
      var oPos = obj.offsetTop
      return window.scrollTo(0, oPos - 36)
    },
    closeCity: function() {
      this.$emit('closeCity');
    },
    selectedCity: function(city) {
      var cityCode = city.insCityCode ? city.insCityCode : '';
      var shortName = city.insCityShortName ? city.insCityShortName : '';
      this.$emit('selectedCity', cityCode, shortName);
    },
  },
  mounted: function() {
    var self = this;
    /* 请求城市数据   */
    self.appId = localStorage.getItem('appId')
    Indicator.open('加载中...');
    // axiosGetAPI('/vi/insuranceCompanies').then((res) => {
    //     Indicator.close();
    //     self.companiesSuccess(res)
    // });

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
        if (res.data.status == 200 && res.data.result.length > 0) {
          /* 城市和城市代码去重*/
          self.companiesSuccess(res.data);
        } else {
          Indicator.close();
        }
      }, err => {
        Toast('请求超时，请刷新页面重试！');
        reject(err)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}

</script>
<style scoped>

.citys .city-content {
  padding: 5px 4%;
  width: 88%;
}

.citys .letter {
  width: auto;
  position: fixed;
  top: 30%;
  right: 10px;
  text-align: center
}

.citys .letter ul li {
  text-decoration: none;
  color: #333;
  font-size: 14px
}

.citys .city {
  width: 100%;
  overflow: hidden;
}

.citys .city-list {
  width: 100%
}

.citys .city-list .city-letter {
  font-size: 20px;
  display: inline-block;
  padding-top: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e8ecf1;
  width: 100%
}

.citys .city-list .icon-letter {
  margin-top: 20px;
}

.citys .city-list p {
  color: #666666;
  width: 95%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e8ecf1;
  cursor: pointer
}

.citys .UISelect {
  margin-top: 5px
}

#tipBox {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #333333;
  width: 100px;
  height: 100px;
  z-index: 10;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
  opacity: 0;
}

.tipAppear {
  animation: appearTip 1 linear 0.5s;
}

@keyframes appearTip {
  0% {
    opacity: 1;
  }

  80% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

</style>
