<template>
  <div>
    <mt-header fixed class="def-header" title="客户">
      <mt-button slot="left" icon="back" @click="openBack" v-show="false"></mt-button>
      <mt-button slot="right"><i @click="addCust" class="icon-icon-add"></i>
      </mt-button>
    </mt-header>
    <div class="container-center">
      <div class="wrppera" ref="wrppera">
        <ul class="cust-list mint-region" v-show="hasCustomersData">
          <li class="mint-cell" style="padding-bottom: .3rem" v-for="item in customersData" @click="custDetail(item,$event)">
            <div style="margin-top: -25px">
              <img :src="defaultImg" style="width: 1.2rem;height: 1.2rem; margin-top: 25px" slot="left">
              <i class="mint-title" style="margin-left: 5px;font-size: 16px;">{{item.name}}</i>
              <p style="margin-left: 70px;margin-top: -25px;color:#666;font-size: 14px">电话：{{item.contactPhone}}</p>
              <p style="margin-left: 70px;color:#666;font-size: 12px" v-show="item.contactEmail">邮箱:{{item.contactEmail}}</p>
            </div>
            <i class="ico-arrow"></i>
          </li>
          <li class="down">
            <img :src="srcitem" v-show="hasCustomersData&&imgshow">
            <p v-show="textshow" class="textshow">无更多数据了</p>
          </li>
        </ul>
        <div class="non-data" v-show="!hasCustomersData">
          <p>暂无客户</p>
        </div>
      </div>
    </div>
    <div class="container-bottom">
      <bottomTab ref="bottomTab" :plant.sync="plante"></bottomTab>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import bottomTab from './../bottomtab/bottom-tab';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';

export default {
  name: 'home',
  data() {
    return {
      customerTitle: '',
      selected: '1',
      plante: 'customer',
      shouldShowLayer: false,
      hasCustomersData: false,
      loadmoreActive: true,
      limit: 10,
      lengths: '',
      date: '',
      imgshow: true,
      textshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      defaultImg: this.src = require('../../assets/images/icon-headImg.png'),
      customersData: [{
        "id": "",
        "customerManagerName": "",
        "name": "",
        "sex_Describe": "",
        "birthday": "",
        "identifyType_Describe": "",
        "identifyNo": "",
        "contactPhone": "",
        "contactMail": "",
        "contactDistrict": "",
        "contactAddress": "",
        "modifier": "",
        "modifiedTime": ""
      }],
    }
  },
  components: {
    bottomTab
  },
  created() {
    this.getCustomers();
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    refresh() {
      this.contentScroll.refresh();
    },
    getCustomers: function(date) {
      var param = {};
      this.date = date
      if (date && date != '') {
        param.overduedays = date
      }
      Indicator.open('加载中...');
      var userId = sessionStorage.getItem('userIds')
      axiosGetAPI('/Users/' + userId + '/PotentialCustomers', param).then((res) => {
        Indicator.close();
        if (res.result && res.result != '') {
          this.customersData = res.result;
          this.hasCustomersData = true;
          this.lengths = this.customersData.length;
          if (res.page.totalRows == 0) {
            this.textshow = false;
            this.imgshow = false;
          } else if (this.lengths == res.page.totalRows) {
            this.textshow = true;
            this.imgshow = false;
          } else {
            this.imgshow = true;
          };
        } else {
          this.textshow = false;
          this.imgshow = false;
          this.hasCustomersData = false;
        }
      });
    },
    custDetail: function(item, e) {
      e.preventDefault();

      var appId = localStorage.getItem("appId");
      var localToken = localStorage.getItem('token');
      if (localToken) {
        localToken = localToken.replace(appId + '_', '');
      }
      var url = "/potentialCustomer/detail?pcid=" + item.id + "&appId=" + appId + "&token=" + encodeURIComponent(localToken);
      this.$router.push({ path: url });
    },
    filterItem: function(e) {
      var $this = $(e.currentTarget)
      $this.toggleClass('cur');
      $this.siblings().removeClass('cur');
      if ($this.hasClass('cur')) {
        this.shouldShowLayer = true
      } else {
        this.shouldShowLayer = false
      }
    },
    filterList: function(e) {
      var $this = $(e.currentTarget)
      $this.addClass('cur');
      $this.siblings().removeClass('cur');
    },
    addCust: function() {
      this.$router.push({ path: "/addPotentialCustomer" });
    }
  },
  mounted() {
    this.getCustomers();
    const contentScroll = new BScroll(this.$refs.wrppera, {
      probeType: 2,
      click: true
    });
    this.contentScroll = contentScroll
    //开始滚动前，更新视图大小
    contentScroll.on("beforeScrollStart", () => {
      this.refresh();
    });
    this.contentScroll = contentScroll;
    contentScroll.on("scrollEnd", () => {
      var maxY = contentScroll.maxScrollY;
      var y = contentScroll.y
      if (y >= maxY + 40) {} else if (y < maxY + 40 && y > maxY) {
        contentScroll.scrollTo(0, maxY + 70, 200);
      } else if (y <= maxY) {
        if (this.lengths == null || this.lengths == '') {
          return;
        };
        var lengths = this.lengths
        var limit = this.limit
        var param = { offset: this.lengths, limit: this.limit };
        param.overduedays = this.date
        var userId = sessionStorage.getItem('userIds')
        axiosGetAPI('/Users/' + userId + '/PotentialCustomers', param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.lengths = this.customersData.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
            } else {
              if (this.lengths < res.page.totalRows) {
                this.imgshow = true;
                this.customersData = [...this.customersData, ...res.result];
              } else {
                this.customersData = [...this.customersData];
                this.textshow = true;
                this.imgshow = false;
              };
            }
            this.hasCustomersData = true;
          } else {
            this.textshow = false;
            this.imgshow = false;
          }
        });
        this.$nextTick(() => {
          this.contentScroll //更新滚动视图
        })
      }
    })
  },

}

</script>
<style scoped>
.cust-list .ico-call {
  position: absolute;
  top: 22%;
  right: 8%;
  display: block;
  width: .64rem;
  height: .64rem;
  font-size: .64rem;
  border-radius: 50%;
}

.mint-header-button .icon-icon-add {
  font-size: .36rem;
}

.down {
  height: .8rem;
  text-align: center;
}

.down img {
  width: .7rem;
  height: .7rem;
  margin-top: 5px
}

.wrppera {
  width: 100%;
  height: 820px;
  overflow: hidden;
  background-color: #FFF;
}

.textshow {
  margin-top: .3rem;
  color: #999999
}

</style>
