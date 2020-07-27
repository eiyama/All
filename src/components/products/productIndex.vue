<template>
  <div style="background-color:#FFF;">
    <mt-header fixed title="产品">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="container-center ">
      <vue-tabbar-slide :options="options" @callback="callback" v-show="options.slideData.length > 0"></vue-tabbar-slide>
      <div class="wrppera" ref="wrppera">
        <div> 
              <ul class="cust-list mint-region" v-show="hasProductsData">
                <li class="mint-cell" style="margin-left: -10px;padding-bottom: 15px" v-for="(item,index) in products" :key="index"  @click="productDetail(item,$event)">
                  <div >
                    <img :src="item.coverUrl? item.coverUrl : defaultImg" style="width: 80px;height: 80px;" slot="left">
                    <i class="mint-title" style="margin-left: 5px;font-size: 16px;">{{item.shortName}}</i>
                    <p class="van-ellipsis" style="margin-left: 85px; margin-top: -25px">{{item.description}}</p>
                  </div>
                  <i class="ico-arrow"></i>
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
    <div class="icon-compare" :style="iconstyle" @click='clickFloatBtn' @touchmove='touchmove' @touchstart='touchstart(this,$event)' @touchend='touchend' v-show="showOptions">
      <p style="color:white;font-size:12px;margin-top:12px;margin-left:12px">产品</p>
      <p style="color:white;font-size:12px;margin-left:12px">对比</p>
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
        index: 0
      },
      /*--------图标样式变量--------------*/
      iconrotate:0,//旋转deg
      icontranslateX:0,//沿正x轴位移px
      icontranslateY:0,//沿负y轴位移px
      width:50,//元素宽度
      height:50,//元素高度
      /*--------拖动计算变量------------*/
      mouseX:0,//鼠标触发时正x轴位置
      mouseY:0,//鼠标触发时负y轴位置
      objX:0,//元素初始正x轴位置
      objY:0,//元素初始负y轴位置
      isDown:false,
      /*--------设备参数---------*/
      clientWidth:0,//屏幕可视宽度
      clientHeight:0,//屏幕可视高度
      showOptions:false,
      id:'',
    }
  },
  components: {
    
  },
  computed:{
    iconstyle:function(){//图标动态样式
      var arr = new Array();
      // arr.push('background-color:#f94037;');
      arr.push('width:'+this.width+'px;');//元素宽度
      arr.push('height:'+this.height+'px;');//元素高度
      if(this.icontranslateX > this.clientWidth){//元素x超过半屏
        arr.push('right:'+(this.clientWidth-this.width)+'px;');//右边距对齐,配合fixed方式
      }else{
        arr.push('left:'+this.icontranslateX+'px;');//左边距对齐,配合fixed方式
      }
      if (this.icontranslateY > this.clientHeight) {//元素y超过半屏
        arr.push('bottom:'+(this.clientHeight-this.height)+'px;');//下边距对齐,配合fixed方式
      }else{
        arr.push('top:'+this.icontranslateY+'px;');//上边距对齐,配合fixed方式
      }
      arr.push('transform:rotate('+this.iconrotate+'deg) ');//元素旋转
      return arr.join("");
    }
  },
  created() {
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//获取设备宽度
    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//获取设备高度
    this.icontranslateX = this.clientWidth - 60;
    this.icontranslateY = this.clientHeight - 110;
  },
  methods: {
    clickFloatBtn:function(){//图标点击事件
      if (this.iconrotate == 0) {//改变样式属性
         this.iconrotate = 45;
         this.showOptions = true;
      }else {
        this.iconrotate = 0;
        this.showOptions = false;
      }
    },
    touchstart:function(obj,e){//finger touch 触发
      this.objX = this.icontranslateX;//记录元素初始x
      this.objY = this.icontranslateY;//记录元素初始y
      this.mouseX = e.touches[0].clientX;//记录触点初始x
      this.mouseY = e.touches[0].clientY;//记录触点初始y
      this.isDowm = true;//运行touchmove和touchend执行
    },
    touchmove:function(e){//finger move 触发
      var x = e.touches[0].clientX;//记录触点初始x
      var y = e.touches[0].clientY;//记录触点初始y
      if (this.isDowm) {//拖拽触发
          this.icontranslateX = parseInt(x) - parseInt(this.mouseX) + parseInt(this.objX);//动态更新元素x
          this.icontranslateX = this.icontranslateX<0?this.icontranslateX=0:this.icontranslateX;//设置元素左边界
          this.icontranslateX = this.icontranslateX>this.clientWidth-this.width?this.clientWidth-this.width:this.icontranslateX;//设置元素右边界
          this.icontranslateY = parseInt(y) - parseInt(this.mouseY) + parseInt(this.objY);//动态更新元素y
          this.icontranslateY = this.icontranslateY<0?this.icontranslateY=0:this.icontranslateY;//设置元素左边界
          this.icontranslateY = this.icontranslateY>this.clientHeight-this.height?this.clientHeight-this.height:this.icontranslateY;//设置元素右边界
      }
    },
    touchend:function(e){//finger from touch to notouch
      if (this.isDowm) {//拖拽触发
          var x = e.touches[0].clientX;//记录触点初始x
          var y = e.touches[0].clientY;//记录触点初始y
          this.icontranslateX = parseInt(x) - parseInt(this.mouseX)+ parseInt(this.objX);//动态更新元素x
          this.icontranslateY = parseInt(y) - parseInt(this.mouseY)+ parseInt(this.objY);//动态更新元素y
          this.isDowm=false;//结束拖拽触发
      }
    },
    callback(event, index, val, id) {
      console.log(`callback=${index},${val},${id}`);
      this.hasProductsData = false;
      this.products = [];
      this.id = id ;
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
      var appId = localStorage.getItem("appId");
      var url = "/product/detail?pid=" + item.id + "&appId=" + appId;
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
  },
  mounted() {
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//获取设备宽度
    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//获取设备高度
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
        this.categoryCode = this.id;
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
  height: 92vh;
  overflow: hidden;
  background-color: #FFF;
}

.textshow {
  margin-top: 15px;
  color: #999999
}

  /*加号*/
.icon-compare{
    position: fixed;
    z-index:999;
    box-sizing: border-box;
    border: 1px solid #f94037;
    border-radius: 50%;
    background-color:#f94037;
    box-shadow:#f94037 0px 0px 2px 2px;
}

</style>
