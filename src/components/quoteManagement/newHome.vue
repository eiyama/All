<template>
  <div class="home" id="newHome" style="background-color:#FFF;padding-bottom: 1rem;">
    <mt-header fixed class="def-header cust-head" :title="title" v-show="false"></mt-header>
    <div class="headerTitle">
      <h3 style="font-size:.32rem;">Hi {{nickName}}</h3>
      <img @click="openMsg" :src="msgImg" style="width:0.4rem;height:0.4rem">
    </div>
    <div>
      <div style="padding:0.2rem;">
        <img :src="homeBanner" style="width:100%" alt="">
        
      </div>
      <!-- <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item><img :src="homeBanner" style="height:100%;width:100%"></van-swipe-item>
        <van-swipe-item><img :src="homeBanner1" style="height:100%;width:100%" @click="goInvite"></van-swipe-item>       
      </van-swipe> -->      
      <div class="parentWrap">
        <div class="hparent" style="background-color: white;margin-top:0.1rem;">
          <div class="child" @click="toQuote">
            <img :src="chexianImg" style="height:0.96rem;width:0.96rem">           
          </div>
           <div class="child" @click="toInquiry" v-if="hasEnquiryProducts">
            <img :src="xubaoImg" style="height:0.96rem;width:0.96rem">          
          </div>
          <div class="child" @click="viewCustomer" v-else>
            <img :src="xubaoImg" style="height:0.96rem;width:0.96rem">           
          </div>
          <div class="child" @click="viewLearningCenter">
            <img :src="xuexiImg" style="height:0.96rem;width:0.96rem">            
          </div>
          <div class="child" @click="toActive">
            <img :src="huodongImg" style="height:0.96rem;width:0.96rem">           
          </div>
        </div>
        <div class="hparent" style="background-color: white;text-align:center;color:#505050">
          <div class="child2">
            <P>车险</P>
          </div>
          <div class="child2" v-if="hasEnquiryProducts">
            <P>人工询价</P>
          </div>
          <div class="child2" v-else>
            <P>续保</P>
          </div>
          <div class="child2">
            <P>云学院</P>
          </div>
          <div class="child2">
            <P>活动</P>
          </div>
        </div>
      </div>
      <div class="parentWrap" style="margin-top:0.2rem;">
        <div class="hparent" style="background-color: #fff;padding: 0.2rem;display: flex;justify-content: space-between;">
          <div class="customerImg" @click="viewCustomer">
            <img :src="inviteImg" >
          </div>
          <div  class="customerImg">
            <img :src="toolsImg" >
          </div>
        </div>
      </div>     
        <div v-if="appId =='cx220t020161609ck9' || appId == 'cxa181211170855pxj'  || appId == 'cxx200304225758hjm'">
            <div class="headeNew">          
              <img src="../../assets/images/img-toutiao.png" style="height:0.4rem;margin-right:0.3rem;" alt="">           
              <span >明天安联臻爱无限8折，百万医疗优质推荐</span>
          </div>
          <div style="float:right;color:#7093ed;text-align:center;font-size:0.24rem;margin-top:0.1rem;margin-right:0.2rem;height:0.5rem;font-size:0.28rem">
                  
          </div>
          <div style="display:flex; align-items: center;">
             <van-tabs style="width:80%" @click="tabBarBtn" v-model="tabBarIndex" animated  >
                  <van-tab v-for="item in tabBarList"   :title="item.name"  :key="item.id">                                          
                  </van-tab>
              </van-tabs>  
               <div class="filter" style="padding-left: 7px;font-size: 12px;border-left: 1px solid #f0f0f0;color:#646566;" @click="filterTime">              
                  {{insCorpName}}<van-icon name="arrow-down" />
                </div>     
          </div>
                <div v-show="prodectArr.length > 0"  class="productList" v-for="(item,index) in prodectArr" :key="index">
                  <div class="productImg">
                      <img v-lazy="item.coverUrl" style="height:1.6rem;border-radius: 8px;width: 1.6rem;" alt="">
                  </div>
                  <div class="productRecommend">
                      <h3>{{item.name}}</h3>
                     <div class="van-ellipsis description">{{item.description}}</div>
                      <div class="toubao">
                          <p class="amount"><span style="font-size:0.4rem;font-weight:blod;">{{item.minPrice}}</span>元起</p>
                        <span class="insurantNow" @click="toInsurance(item,item.insureUrl)">立即投保</span>
                    </div>              
                  </div>
              </div> 
              <div v-show="prodectArr.length == 0">
                  <div class="non-data" >
                      <img class="noImg" src="../../assets/images/icon-nothing.png">
                  </div>
              </div>                       
        </div>         
      <div v-else>        
        <div style="margin-top:0.2rem;height:0.6rem" class="parentWrap">
          <img :src="recommendImg" style="height:18px;width:1.6rem;float:left;margin-left:0.2rem">
          <div style="float:right;color:#7093ed;text-align:center;font-size:0.24rem;margin-bottom:0.1rem;margin-right:0.2rem;height:0.5rem;width:72px;font-size:0.28rem" @click="viewAll">
            <span>更多产品</span>
          </div>
        </div>
        <!-- <hr width="100%" color="#f5f5f5" size="1" /> -->
        <div class="parentWrap" style="margin-bottom:1.6rem;padding-bottom:10px">  
            <div class="hparent" style="background-color: white;padding-left:0.2rem;padding-right:0.2rem">
              <div class="child1" style="background-color: white;padding-top:0.3rem" @click="productDetail(product1,$event)" v-show="hasProduct1Data">
                <img :src="product1.coverUrl? product1.coverUrl : defaultImg" style="width: 1.6rem;height: 1.6rem;float:left">
                <div style="margin-left: 85px;">
                  <p class="van-ellipsis" style="color:#505050;font-size:14px;">{{product1.shortName}}</p>   
                   <br>               
                  <p class="van-multi-ellipsis--l2" style="color:#999;font-size: 12px;">{{product1.description}}</p>
                </div>
              </div>
              <div class="child1" style="background-color: white;padding-top:0.3rem" @click="productDetail(product2,$event)" v-show="hasProduct2Data">
                <img :src="product2.coverUrl? product2.coverUrl : defaultImg" style="width: 1.6rem;height: 1.6rem;float:left">
                <div style="margin-left: 85px;">
                  <p class="van-ellipsis" style="color:#505050;font-size:14px;">{{product2.shortName}}</p>
                  <br>
                  <p  class="van-multi-ellipsis--l2" style="color:#999;font-size: 12px;">{{product2.description}}</p>
                </div>
              </div>
            </div>
            <hr width="100%" color="#f5f5f5" size="1" v-show="hasProduct3Data||hasProduct4Data"/>
            <div class="hparent" style="background-color: white;padding-left:0.2rem;padding-right:0.2rem" >
              <div class="child1" style="background-color: white;padding-top:0.3rem" @click="productDetail(product3,$event)" v-show="hasProduct3Data">
                <img :src="product3.coverUrl? product3.coverUrl : defaultImg" style="width: 1.6rem;height: 1.6rem;float:left">
                <div style="margin-left: 85px;">
                  <p class="van-ellipsis" style="color:#505050;font-size:14px;">{{product3.shortName}}</p>
                  <br>
                  <p  class="van-multi-ellipsis--l2" style="color:#999;font-size: 12px;">{{product3.description}}</p>
                </div>
              </div>
              <div class="child1" style="background-color: white;padding-top:0.3rem" @click="productDetail(product4,$event)" v-show="hasProduct4Data">
                <img :src="product4.coverUrl? product4.coverUrl : defaultImg" style="width: 1.6rem;height: 1.6rem;float:left">
                <div style="margin-left: 85px;">
                  <p class="van-ellipsis" style="color:#505050;font-size:14px;">{{product4.shortName}}</p>
                  <br>
                  <p  class="van-multi-ellipsis--l2" style="color:#999;font-size: 12px;">{{product4.description}}</p>
                </div>
              </div>
            </div>
          </div>        
      </div>
      </div>
    <div class="container-bottom">
      <bottomAllTab ref="bottomAllTab" :plant.sync="plante" v-show="!iSingleUserMode"></bottomAllTab>
    </div>
    <div class='popContainer' v-show="showOptions">
      <div style="color:white;font-size:0.4rem;text-align:right;padding-right:0.3rem;padding-top:0.3rem">
          <img :src="closeImg" style="width: 0.4rem;height: 0.4rem;color:white" @click="clickFloatBtn">
      </div>
      <div style="color:white;margin-top:0.3rem;font-size:24px;text-align:center">
        工具箱
      </div>
      <div class="parentWrap">
        <div class="parent" style="margin-top:0.6rem;margin-left:0.3rem;margin-right:0.3rem">
          <div class="child3" @click="demandAnalysis">
            <img :src="toolImg1" style="height:1.6rem;width:1.6rem">
          </div>
          <div class="child3" @click="newPoster">
            <img :src="toolImg2" style="height:1.6rem;width:1.6rem">
          </div>
          <div class="child3" @click="taxCalculator">
            <img :src="toolImg5" style="height:1.6rem;width:1.6rem">
          </div>
        </div>
        <div class="parent" style="text-align:center;margin-left:0.3rem;margin-right:0.3rem">
          <div class="child4">
            <P>需求分析</P>
          </div>
          <div class="child4">
            <P>做海报</P>
          </div>
          <div class="child4">
            <P>计税器</P>
          </div>
        </div>
      </div>
      <div class="parentWrap">
        <div class="parent" style="margin-top:0.2rem;margin-left:0.3rem;margin-right:0.3rem">
          <div class="child3" @click="rateCalculator">
            <img :src="toolImg6" style="height:1.6rem;width:1.6rem">
          </div>
          <div class="child3">
            <p style="width:1.6rem;height: 1.6rem;"/>
          </div>
          <div class="child3">
            <p style="width:1.6rem;height: 1.6rem;"/>
          </div>
        </div>
        <div class="parent" style="text-align:center;margin-left:0.3rem;margin-right:0.3rem">
          <div class="child4">
            <P>复利计算</P>
          </div>
          <div class="child4">
            <P></P>
          </div>
          <div class="child4">
            <P></P>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showMessage" position="top" style="width:90%;margin-top:0.6rem;left:5%;border-radius:0.1rem">
      <div style="color:#333;font-size:0.3rem;font-weight:bold;margin: 0.2rem;background: #ffffff; padding: 0.1rem 0.2rem; border-radius: 0.1rem;">
        <div style="border-bottom: 1px solid #f0f0f0;">
          <h3>{{sysMessages.Title}}</h3>
        </div>
        <div style="margin-top:0.1rem" @click="openMsg">
          <img :src="rightImg" style="position: absolute;left:92%;width: 0.5rem; height: 0.5rem;">
          <p style="color:#666;font-size:0.24rem;margin-right:0.2rem">{{sysMessages.Message}}</p>
        </div>
      </div>
    </van-popup>
    <div class="icon-add-50" :style="iconstyle" @click='clickFloatBtn' @touchmove='touchmove' @touchstart='touchstart(this,$event)' @touchend='touchend' v-show="!showOptions">
      <img :src="toolImg" style="width:60px;height:60px">
    </div>
<!-- <van-popup v-model="isDate" position="bottom">
     <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate"
      />
</van-popup> -->
   
    <mt-popup style="width: 80%;height: 100%;padding: 0 0.2rem;background:#f2f2f2" v-model="showFilter" position="right" popup-transition="popup-fade">
        <mt-header fixed class="def-header" title="选择公司">
          <div slot="left">
            <mt-button icon="back" @click="showFilter = false"></mt-button>
          </div>
        </mt-header>
        <div style="margin-top: 1rem;padding-top: 0.0.1rem;">          
          <div class="popop-item">                          
              <span  :class="{isActive:insCorpCodeIndex === index}" :key="index" v-for="(item,index) in insCorpCodeList"  @click="selectCustomerFrom(item,index)"> {{item.shortName}}</span>               
          </div>           
        </div>        
      </mt-popup>
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
import signalR from 'signalr'
export default {
  name: 'home',
  data() {
    return {
      closeImg: this.src = require('../../assets/images/ico-closew.png'),
      defaultImg: this.src = require('../../assets/images/icon-product.png'),
      homeBanner: this.src = require('../../assets/images/banner.png'),
      homeBanner1: this.src = require('../../assets/images/banner-home-02.png'),
      chexianImg: this.src = require('../../assets/images/icon-auto-ins.png'),
      huodongImg: this.src = require('../../assets/images/icon-active.png'),
      xubaoImg: this.src = require('../../assets/images/icon-manual.png'),
      // xunjiaImg:this.src = require('../../assets/images/icon-nav-plans.png'),
      xuexiImg: this.src = require('../../assets/images/icon-edu.png'),
      recommendImg: this.src = require('../../assets/images/img-section-title-tuijian.png'),
      inviteImg: this.src = require('../../assets/images/img-xubao.png'),
      toolsImg: this.src = require('../../assets/images/img-zengzhi.png'),
      toolImg: this.src = require('../../assets/images/btn-tools.png'),
      toolImg1: this.src = require('../../assets/images/1.png'),
      toolImg2: this.src = require('../../assets/images/2.png'),
      toolImg3: this.src = require('../../assets/images/3.png'),
      toolImg4: this.src = require('../../assets/images/5.png'),
      toolImg5: this.src = require('../../assets/images/4.png'),
      toolImg6: this.src = require('../../assets/images/6.png'),
      msgImg: (this.src = require("../../assets/images/icon-notices.png")),
      rightImg: (this.src = require("../../assets/images/right.png")),
      products: [],
      product1: {},
      product2: {},
      product3: {},
      product4: {},
      // minDate: new Date(2020, 0, 1),
      // maxDate: new Date(2025, 10, 1),
      // currentDate: new Date(),
      // isDate:true,
      hasProduct1Data: false,
      hasProduct2Data: false,
      hasProduct3Data: false,
      hasProduct4Data: false,
      limit: 2,
      tabBarIndex:0,
      lengths: '',
      plante: 'home',
      title: '',
      iSingleUserMode: false,
      defaultBanner: this.src = require('../../assets/images/img-product-banner.png'),
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
      proxy: {},
      hasConn: false,
      sysMessages: '',
      showMessage: false,
      userId:'',
      hasEnquiryProducts:false,
      nickName:'',
      tabBarList: [],
      selected: '1',
      appId:'',
      appFeatures:[],
      prodectArr:[],
      showFilter:false,
      insCorpCodeIndex:0,
      insCorpCodeList:[],
      insCorpCode:'',
      id:'',
      insCorpName:'全部公司',

    }
  },
  components: {
    bottomAllTab
  },
  methods: {
    // confirmDate(value){
    //   console.log(this.Common.Public.dateString(value));      
    //   this.isDate = false;
    // },
    selectCustomerFrom(item,index){
        this.insCorpCodeIndex = index;
        this.insCorpName = item.shortName;
        this.insCorpCode = item.code;
        this.CommitFilter();
    },
    CommitFilter(){
        this.getProducts(this.id);
        this.showFilter = false;
    },
    ResetFilter(){
        this.insCorpCodeIndex = 0;
        this.insCorpCode = '';
    },
    tabBarBtn(index){
      // console.log(index);
      var id = this.tabBarList[index].id ;
      this.id = id;
      this.getProducts(id);
    },
    filterTime(){
        this.showFilter = true;
    },
    toInsurance(item,url){      
      if(url.indexOf('http') > -1){
           window.location.href = url;
      }else{
          url = url + "&id=" + item.id;
          // var model = {};
          // model.coverUrl = item.coverUrl;
          // model.description = item.description;
          // sessionStorage.setItem('productDetail',JSON.stringify(model));
          if(this.appId == "cx220t020161609ck9" || this.appId == 'cxa181211170855pxj'){
              url = url + '&distributorCode=HK' 
          }else if(this.appId == 'cxx200304225758hjm') {
            url = url + '&appId=cxb2003311101194jb' + '&distributorCode=FR'
          }      
          this.$router.push({path:url});
      }        
    },   
    toInquiry(){
      this.$router.push({path:'/manualInquiry/index'});
    },
    openMsg: function() {
      this.$router.push({ path: '/quoteManagement/sysMsg/index' })
    },
    getProducts: function(id) {
      var self = this;
      var param = {};
      self.hasProductsData = true;
      var appId = localStorage.getItem("appId");
       var param = { offset: 0, limit: 30 };        
        if( id > 0){
            param.categoryCode = id;
        }  
        if(this.insCorpCode){
          param.insCorpCode = this.insCorpCode;
        }

      if (appId) {
        Indicator.open('加载中...');
        axiosGetAPI('/li/products', param).then((res) => {
          Indicator.close();
          if (res.result) {
            self.products = res.result;
            self.prodectArr = res.result;
            if (self.products.length > 0) {
              self.product1 = self.products[0];
              self.hasProduct1Data = true;
            };
            if (self.products.length > 1) {
              self.product2 = self.products[1];
              self.hasProduct2Data = true;
            };
            if (self.products.length > 2) {
              self.product3 = self.products[2];
              self.hasProduct3Data = true;
            };
            if (self.products.length > 3) {
              self.product4 = self.products[3];
              self.hasProduct4Data = true;
            };
          }
        });
      };
    },
    getPoductCategories(){
          Indicator.open('加载中...');          
        axiosGetAPI('/li/poductCategories').then((res) => {
            Indicator.close();
            if(res.status == '200'){
              this.tabBarList.push({name:'全部',id:0,description:''});
              res.result.map(item=>{
                this.tabBarList.push(item);
              })                
            }            
        })
        Indicator.open('加载中...');
        axiosGetAPI('/li/insCompanies').then((res) => {
          Indicator.close();
          this.insCorpCodeList = [{shortName:'全部公司',code:''}]
          if (res.result) {
            res.result.map(item=>{
              this.insCorpCodeList.push(item);     
            })
            
          }
        });
    },
    productDetail: function(item, e) {
      e.preventDefault();
      var appId = localStorage.getItem("appId");
      var url = "/product/detail?pid=" + item.id + "&appId=" + appId;
      this.$router.push({ path: url });
    },
    newFeature:function(){
      this.$router.push({ path: "/newFeature" });
      // this.$router.push({ path: "/tools/index" });
    },
    newPoster:function(){
      // this.$router.push({ path: "/newFeature" });
      this.$router.push({ path: "/tools/index" });
    },
    taxCalculator:function(){
      this.$router.push({ path: "/tools/taxCalculator" });
    },
    demandAnalysis:function(){
      this.$router.push({ path: "/tools/demandAnalysis" });
    },
    rateCalculator:function(){
      this.$router.push({ path: "/tools/compoundRate" });
    },
    viewAll: function() {
      this.$router.push({ path: "/products" });
    },
    viewCustomer: function() {
      this.$router.push({ path: "/customerManagement/custIndexb", query: {appId: localStorage.getItem("appId")}})
    },
    toActive(){
      this.$router.push({ path: "/tools/activity" });
    },
    toQuote: function() {
      this.$router.push({ path: "/quoteIndex", query: {appId: localStorage.getItem("appId")}});
    },
    viewLearningCenter:function(){
      this.$router.push({ path: "/learning" });
    },
    goInvite: function() {
      var nickName = sessionStorage.getItem('nickName');
      var appTitle = sessionStorage.getItem('title');
      var appId = localStorage.getItem('appId');
      this.$router.push({
        path: '/myInfo/myInviteQr?title=' + appTitle + '&appId=' + appId + '&nickName=' + nickName +
          '&referrerMobile=' + this.referrerMobile
      });
    },
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
        if(e.touches.length){
            var x = e.touches[0].clientX;//记录触点初始x
          var y = e.touches[0].clientY;//记录触点初始y
          this.icontranslateX = parseInt(x) - parseInt(this.mouseX)+ parseInt(this.objX);//动态更新元素x
          this.icontranslateY = parseInt(y) - parseInt(this.mouseY)+ parseInt(this.objY);//动态更新元素y
          this.isDowm=false;//结束拖拽触发
        }          
      }
    },
    connectServer: function() {
      var $this = this;
      var serviceHost = localStorage.getItem('serviceHost');
      var servicePort = localStorage.getItem('servicePort');
      if (serviceHost && servicePort) {
        var HUB_URL;
        if ("443" == servicePort) {
          HUB_URL = "https://" + serviceHost;
        } else {
          HUB_URL = "http://" + serviceHost;
        }
        HUB_URL = HUB_URL + ":" + servicePort + "/signalr/hubs";
        var conn = $.hubConnection(HUB_URL, { useDefaultPath: false })
        $this.proxy = conn.createHubProxy("messageHub");
        $this.getMsg();
        conn.start().done((data) => {
          console.log('已连接');

        }).fail((data) => {
          console.log('连接失败异常:', data)
        });
        $this.hasConn = true;
      };
    },
    getMsg: function() {
      var $this = this;
      $this.proxy.on("sendNotify", (data) => {
        console.log('接收到新的消息:', data)
        if (data && (data.Title.indexOf('留修任务') < 0)) {
          $this.showMessage = false;
          $this.sysMessages = data;
          $this.showMessage = true;
        }
      })
    },
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
        arr.push('left:'+this.icontranslateX +'px;');//左边距对齐,配合fixed方式
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
  created: function() {
    var self = this;
    var appId = self.$route.query.appid || self.$route.query.appId;
    this.appId = appId;
    // 启动人工询价的APPID集合
    var hasEnquiryProductAppids = [
      'cx7190761141531rzi',
      'cxa181211170855pxj',
      'cx8190110143618pyi',
      'cxs190103104249iwe',
      'cxx200304225758hjm',
      'cx220t020161609ck9'
      ];
      // if(this.appFeatures.length > 0){
      //     self.hasEnquiryProducts =  this.appFeatures.indexOf('ManualEnquiry');
      // }
    self.hasEnquiryProducts = hasEnquiryProductAppids.indexOf(appId)>0;
    // self.hasEnquiryProducts = hasEnquiryProductAppids.indexOf(appId)>0 (appId == 'cx7190761141531rzi' || appId == 'cxa181211170855pxj' ||  appId == 'cx8190110143618pyi' || appId == 'cxs190103104249iwe'|| appId == 'cx220t020161609ck9' || appId == 'cxx200304225758hjm' );
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//获取设备宽度
    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//获取设备高度
    this.icontranslateX = this.clientWidth - 60;
    this.icontranslateY = this.clientHeight - 110;
    var self = this;
    var appId = self.$route.query.appid || self.$route.query.appId;
    localStorage.setItem('appId', appId);

    if (appId) {
      Indicator.open('加载中...');
      document.title = '';
      axiosGetAPI('/apis/apps/' + appId + "/H5").then((res) => {
        Indicator.close();
        var authMode = res.result.authMode.text;
        localStorage.setItem("appId", res.result.appId);
        localStorage.setItem("serviceHost", res.result.serviceHost);
        localStorage.setItem("servicePort", res.result.servicePort);
        self.$store.commit(types.APPID, res.result.appId);
        self.$store.commit(types.AUTHMODE, authMode);
        self.connectServer();
        // if(res.result.appFeatures){
        //   this.appFeatures = res.result.appFeatures;
        //   sessionStorage.setItem('appFeatures',JSON.stringify(this.appFeatures));
        //   self.hasEnquiryProducts =  this.appFeatures.indexOf('ManualEnquiry') > 0;
        // }
       
        if (authMode == 'SingleUserMode') {
          self.$store.commit(types.LOGIN, '1');
          localStorage.setItem('token', '1');
          self.iSingleUserMode = true;
        } else {
          self.iSingleUserMode = false;
          if (store.state.token == 'null' || store.state.token == '1') {
            self.$store.commit(types.LOGOUT);
            self.$router.push({ path: "/login?appId=" + localStorage.getItem('appId') });
          } else {
            // Toast('appid:' + store.state.appId +'\n'+ 'token:' + store.state.token);
            var localToken = localStorage.getItem('token');
            if (localToken && localToken.indexOf(appId) == 0) {
              self.getProducts();
              self.getPoductCategories();
              var me = this;
              axiosGetAPI('/Users/Me').then((res) => {
                self.userId = res.result.userId;
                sessionStorage.setItem('userIds', self.userId);
                sessionStorage.setItem('accountName', res.result.accountName);
                sessionStorage.setItem('sellerOrgCode', res.result.sellerOrgCode);
                sessionStorage.setItem('sellerDeptCode', res.result.sellerDeptCode);
                sessionStorage.setItem('sellerOrgName', res.result.sellerOrgName);
                sessionStorage.setItem('sellerDeptName', res.result.sellerDeptName);
                // sessionStorage.setItem('nickName', '');
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
                          self.nickName = res.data.result.name;
                          sessionStorage.setItem('nickName', res.data.result.name);
                          sessionStorage.setItem('referrerMobile', res.data.result.moblie);
                          sessionStorage.setItem('salesmanId', res.data.result.id);
                          sessionStorage.setItem('headImageUrl', res.data.result.headImageUrl);
                        }
                      }
                    }, err => {
                      Toast('请求超时，请刷新页面重试！');
                      reject(err)
                    })
                    .catch(function(error) {
                      console.log(error)
                    })
                }

              });
            } else {
              self.$store.commit(types.LOGOUT);
              self.$router.push({ path: "/login?appId=" + localStorage.getItem('appId') });
            }
          }
        }
        self.title = res.result.name;
        document.title = res.result.name;
        sessionStorage.setItem('title', self.title);
      });
    } else {
      this.$store.commit(types.LOGOUT);
      this.$router.push({ path: "/login?appId=" + localStorage.getItem('appId')});
    }
  },
  mounted: function() {
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//获取设备宽度
    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//获取设备高度
    // this.nickName =sessionStorage.getItem('nickName');
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
.mint-content .tip {
  font-size: 0.2rem;
  color: #fc3738;
  letter-spacing: 0;
  height: 0.5rem;
  line-height: 0.6rem;
}

.mint-content .tip-pingan {
  font-size: 0.2rem;
  color: #fc3738;
  letter-spacing: 0;
  height: 0.6rem;
  line-height: 0.6rem;
  padding-left: 1rem 0;
  margin-left: 1.6rem
}

.mint-content .ins-img {
  width: .56rem;
  height: .56rem;
  display: inline-block;
  margin: 0 .1rem 0 .1rem;
  position: relative;
  margin-right: -0.2rem
}

.mint-content .messagecc {
  height: 100%;
  width: 100%;
}

.mint-content .lili {
  bottom: 0;
  top: 0;
}

.div1 {
  height: 100px;
  width: 100%;
  position: relative;
  z-index: 1;
  text-align: center
}

.parentWrap {
  overflow: hidden;
}

.hparent {
  overflow: hidden;
}

.child {
  float: left;
  // height: 100px;
  width: calc(25%);
  display: flex;
  text-align:center;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color:#505050;
}

.child1 {
  float: left;
  // height: 100px;
  width: calc(47%);
  align-items: center;
  justify-content: center;
  margin-left:0.16rem;
  padding-bottom:0.1rem;
  font-size: 12px;
  color:#505050;
}

.child2 {
  float: left;
  height: 0.5rem;
  width: calc(25%);
  display: flex;
  text-align:center;
  align-items: center;
  justify-content: center;
  font-size:14px;
  color:#505050;
}
.child3 {
  float: left;
  // height: 100px;
  width: calc(33%);
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  display: flex;
  text-align:center;
  align-items: center;
  justify-content: center;
  font-size:14px;
  color:white;
}
.child4 {
  float: left;
  // height: 100px;
  width: calc(33%);
  padding-top: .1rem;
  padding-bottom: .2rem;
  display: flex;
  text-align:center;
  align-items: center;
  justify-content: center;
  font-size:14px;
  color:white;
}
  /*加号*/
.icon-add-50{
    position: fixed;
    z-index:999;
    // box-sizing: border-box;
    // border: 1px solid #f94037;
    // border-radius: 50%;
    // box-shadow:#f94037 0px 0px 2px 2px;
}

.popContainer{
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    color:white;
}
.headerTitle{
   display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem  0.3rem 0 0.3rem;
}

.headeNew{
  background: #f9f9f9;
  margin: 0.3rem;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  border-radius: 0.16rem;
}
.headeNew span{
  padding-right:.3rem;
  border-left:1px solid #eee;
  overflow:hidden; //超出的文本隐藏
  text-overflow:ellipsis; //溢出用省略号显示
  white-space:nowrap;
  font-size:14px;
}
.productImg img{
  border-radius: 8px;
}
.productList{
  margin: .3rem;
  padding: 0.2rem;
  background: #f9f9f9;
  border-radius: .16rem;
  display: flex;
  justify-content: space-between;
  // box-shadow: 0 0.06rem 0.13rem -0.05rem #7C88A359;


}
.productRecommend{
 margin-left: 0.2rem;
 flex: 1;
}
.productRecommend h3{
  font-size: 16px;
  font-weight: bold;

}
.productRecommend .description {
    color: #999;
    font-size: 12px;
    width: 4.5rem;
    line-height: 0.5rem;

}

.toubao{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toubao .amount{
    font-size:14px;
    color: #f44;
}

.toubao .insurantNow{
    padding: .1rem .24rem;
    background: #f15757;
    border-radius: .3rem;
    color: #fff;
}
.customerImg img{
     width: 3.5rem;
}

.non-data .noImg{
  width: 64px;
}

.popop-item span {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-height: 1px;
    padding: 5px 13px;
    border: 1px solid #f0f0f0;
    border-radius: 7px;
    margin: 5px;
    background: #fff;
}

.popop-item .isActive{
  color: rgb(252, 55, 56);
  border: 1px solid rgb(252, 55, 56);
}

.popup_Bottom{
  position: fixed;
  bottom: 0;
  right: 0;
  height: 50px;
  left: 0;
  background: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup_Bottom .reset{
  text-align: center;
  width: 50%;
  line-height: 50px;
}

.popup_Bottom .commit{
  text-align: center;
  background: rgb(252, 55, 56);
  width: 50%;
  line-height: 50px;
  color: #FFF;
}

</style>

<style >
 #newHome .van-hairline--top-bottom::after{
        border-width: 0;
  }
</style>
