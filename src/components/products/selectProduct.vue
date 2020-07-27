<template>
  <div style="background-color:#FFF;">
    <mt-header fixed class="def-header cust-head" title="添加产品">
      <div slot="left" v-show="false">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openBack">
      </div>
    </mt-header>
    <div class="container-center ">
      <vue-tabbar-slide :options="options" @callback="callback" v-show="options.slideData.length > 0"></vue-tabbar-slide>
      <div class="wrppera" ref="wrppera">
          <ul class="cust-list mint-region" v-show="hasProductsData">
            <li class="mint-cell" style="margin-left: -10px;padding-bottom: 15px" v-for="item in products" @click="productDetail(item,$event)">
              <div style="margin-top: -25px">
                <img :src="item.coverUrl? item.coverUrl : defaultImg" style="width: 80px;height: 80px; margin-top: 25px" slot="left">
                <i class="mint-title" style="margin-left: 5px;font-size: 16px;">{{item.shortName}}</i>
                <p style="margin-left: 85px; margin-top: -25px">{{item.description}}</p>
              </div>
              <!-- <i class="ico-arrow"></i> -->
            </li>
            <li class="down">
              <img :src="srcitem" v-show="hasProductsData&&imgshow">
              <p v-show="textshow" class="textshow">无更多数据了</p>
            </li>
          </ul>
          <div class="non-data" v-show="!hasProductsData">
            <p>暂无产品</p>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';

export default {
  name: 'home',
  data() {
    return {
      selected: '1',
      shouldShowLayer: false,
      hasProductsData: false,
      loadmoreActive: true,
      limit: 10,
      lengths: '',
      categoryCode: 0,
      imgshow: true,
      textshow: false,
      srcitem: this.src = require('../../assets/images/ajax-loader.gif'),
      defaultImg: this.src = require('../../assets/images/icon-product.png'),
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      products: [],
      categories: [],
      category:{"id": "","name": "","description": ""},
      options: {
        //required(必填项)
        container: 'categorySlide',
        slideData: [],
        //用来传递data-id
        slideId: [],
        //optional(可选项)
        width: '80px',
        checkedColor: '#f94037',
        downLineColor:'#f94037',
        index: 0
      },
    }
  },
  components: {
    
  },
  computed:{
  },
  created() {
  },
  methods: {
    callback(event, index, val, id) {
      console.log(`callback=${index},${val},${id}`);
      this.hasProductsData = false;
      this.products = [];
      this.getProducts(id);
      this.options.index = index;
    },
    openBack: function() {
      window.history.back();
    },
    refresh() {
      this.contentScroll.refresh();
    },
    getProducts: function(id) {
      var param = {};
      this.categoryCode = id
      if(id > 0){
          param.categoryCode = id;
      }
      this.textshow = false;
      this.imgshow = false;
      this.hasProductsData = true;
      var appId = localStorage.getItem("appId");
      if (appId) {
        axiosGetAPI('/li/poductCategories').then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.categories = res.result;
            var names = [];
            var ids = [];
            ids.push(0);
            names.push('全部');
            for (var i = 0; i < this.categories.length; i++) {
              names.push(this.categories[i].name);
              ids.push(this.categories[i].id);
            };
            this.options.slideData = names;
            this.options.slideId = ids;
          }
        });
        Indicator.open('加载中...');
        axiosGetAPI('/li/products', param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.products = res.result;
            this.hasProductsData = true;
            this.lengths = this.products.length
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
            this.hasProductsData = false;
          }
        });
        
      };
    },
    productDetail: function(item, e) {
      e.preventDefault();
      /*var appId = localStorage.getItem("appId");
      var url = "/product/detail?pid=" + item.id + "&appId=" + appId;
      this.$router.push({ path: url });*/
      var url = "/productProspectus?id=" + item.id +
        "&insCorpName=" + item.insCorpName
      this.$router.push({ path: url });
    },
  },
  mounted() {
    this.getProducts(0);
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
        this.categoryCode = id
        if(this.categoryCode > 0){
            param.categoryCode = this.categoryCode;
        }
        this.textshow = false;
        this.imgshow = false;
        axiosGetAPI('/li/products', param).then((res) => {
          Indicator.close();
          if (res.result && res.result != '') {
            this.lengths = this.products.length
            if (res.page.totalRows == 0) {
              this.textshow = false;
              this.imgshow = false;
            } else {
              if (this.lengths < res.page.totalRows) {
                this.imgshow = true;
                this.products = [...this.products, ...res.result];
              } else {
                this.products = [...this.products];
                this.textshow = true;
                this.imgshow = false;
              };
            }
            this.hasProductsData = true;
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
  width: 32px;
  height: 32px;
  font-size: 32px;
  border-radius: 50%;
}

.mint-header-button .icon-icon-add {
  font-size: 18px;
}

.down {
  height: 40px;
  text-align: center;
}

.down img {
  width: 35px;
  height: 35px;
  margin-top: 5px;
}

.wrppera {
  width: 100%;
  height: 820px;
  overflow: hidden;
  background-color: #FFF;
}

.textshow {
  margin-top: 15px;
  color: #999999
}

</style>
