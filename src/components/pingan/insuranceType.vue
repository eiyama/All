<template>
    <div class="page-container">
        <div class="InsureBannner" :style="wrppera" >
            <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            标的信息
                        </span>
                </div>
                <!-- 百度地图 -->
                <!-- <div>{{LocationCity}}</div>   -->
                <div class="common-cell none-line show-all">
                    <div class="common-cell-container" >
                        <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                            <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;">
                            </i> <span data-v-29da0c6c="" class="cell-title">标的地址</span>
                            <i data-v-29da0c6c="" class="arrow-insurance_intruduce"></i> 
                        </div>
                        <div class="cell-right"  @click="toAddress">
                            <div class="cell-right-content">
                                <span class="placeholder-text" v-show="cityValue == ''" >{{cityValue ? cityValue : "请选择"}}</span>    
                                <span class="placeholder-address" v-show="cityValue">{{cityValue}}</span>
                            </div>
                            <i class="cell-icon cell-icon-" style="display:none"></i>       
                            <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div v-show="cityValue">
                    <van-field v-model="insuranceNum" label="投保人数" type="digit" :readonly='LeastEmployeeNum == TopEmployeeNum'  placeholder="请输入投保人数" />
                    <div class="common-cell none-line show-all">
                        <div class="common-cell-container">
                            <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;">
                                </i> <span data-v-29da0c6c="" class="cell-title">使用性质</span>
                            </div>
                            <div class="cell-right"  >
                                <div class="cell-right-content">
                                    <div class="common-content">
                                        <span :class="{ active : index == userTypeIndex}" class="common-radio " @click="changeUsertype(item,index)" v-for="(item,index) in userTypeList" :key="index">
                                            {{item.name}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                      <div  class="common-cell none-line show-all" v-if="carTypeArr.length > 0">
                        <div class="common-cell-container">
                            <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;">
                                </i> <span data-v-29da0c6c="" class="cell-title">车辆种类</span>
                            </div>
                            <div class="cell-right"  >
                                <div class="cell-right-content">
                                    <div class="common-content">
                                        <span :class="{ active : index == vehicleIndex}" class="common-radio " @click="vehicleBtn(item,index)" v-for="(item,index) in carTypeArr" :key="index">
                                            {{item.name}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                      <van-field v-else v-model="carType" label="车辆种类" readonly  placeholder="请选择车辆种类" />
                    <div class="common-cell none-line show-all">
                      <div class="common-cell-container">
                        <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                            <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                            <span data-v-29da0c6c="" class="cell-title">车辆类型</span>                            
                        </div>
                        <div class="cell-right"  @click="isCarDetail = true">
                            <div class="cell-right-content">
                                <span class="placeholder-text" v-show="carDetail == ''" >{{carDetail ? carDetail : "请选择"}}</span>    
                                <span class="placeholder-address" v-show="carDetail">{{carDetail}}</span>
                            </div>
                            <i class="cell-icon cell-icon-" style="display:none"></i>       
                            <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="arrow-right"></i>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            保险时间
                        </span>
                </div>
                <div class="insurance-time-container">
                    <div class="lable-name">
                            <span class="fl">起期</span>
                            <span>期限</span>
                            <span class="fr">止期</span>
                            <!-- <div class="clear"></div> -->
                    </div>
                    <div class="time-info">
                        <div class="fl">
                            <span class="fl">{{startTime}}</span>
                            <span class="fl">&nbsp;0时</span>
                            <span class="icon fl" @click="selInsuredBirthday"></span>

                        </div>
                        <span class="time-string">1年</span>
                        <div class="fr">
                            <span class="fr">&nbsp;24时</span>
                            <span class="fr">{{endTime}}</span>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
             <div class="m20" v-show="cityValue" style="padding-bottom: 0.7rem">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            保障计划
                        </span>
                        <div class="scheme-detail" @click="pinganDetailBtn">
                            <span>查看责任详情</span>
                        </div>
                </div>
                <div class="lyBox" style="background:#fff;border:0">
                    <div class="htabscroll"> 
                        <div class="ly-tab-list">
                            <div class="ly-tab-item-label" v-for="(item,index) in projectListArr" :key="index" @click="changeProject(item,index)" :class="{projectActive:index == projectIndex}">
                             <span class="wd">{{item.PackageName}}</span>
                          </div>
                        </div>
                    </div>
                </div>
                <ul class="plan-info-list" v-if="PackagesList.length > 0">
                    <li v-for="(item ,index) in PackagesList[projectIndex].PlanInfos" :key="index" >
                        <ul  v-for="(_item ,_index) in item.DutyInfos" :key="_index">
                            <li  class="duty-item" > 
                                <p class="insured-detail">{{_item.DutyName}}</p>
                                <p class="insured-amount">{{_item.InsuredAmount  + _item.InsuredAmountUnit }}</p>
                            </li> 
                        </ul>
                    </li>
                </ul>
             </div>
             <div class="page-footer bottom-fixed">
                 <div class="money-text foot-premium"  v-if="amount != ''">{{'￥' + amount}}</div>
                <div class="money-text foot-premium" style="color:#a0a0a0;font-size:0.32rem;" v-else>{{tip}}</div>
                <div class="footer-btn" @click="toProductMicro">立即投保</div>
            </div>
        </div> 

        <mt-popup position="bottom" v-model="isShow">
			  <!-- <div class="picker-toolbar headerClose">
					<span @click="isShow = false">取消</span>
					<span >请选择省市区</span> 
					<span @click="selAddress">确定</span>
			</div>
				<mt-picker :slots="myAddressSlots"  valueKey="name" :visibleItemCount="5" @change="addressChange"
					:itemHeight="40"></mt-picker> -->
            <selectAddress v-on:addressList="addressList" v-on:closeAddress="closeAddress"   ></selectAddress>
		</mt-popup>

        <mt-datetime-picker  @touchmove.native.stop.prevent ref="insuredBirthday" v-model="insuredBirthday" type="date" :startDate="startDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="insuredBirthConfirm">
		</mt-datetime-picker>


        <mt-popup position="bottom" v-model="isCarDetail">
			  <!-- <div class="picker-toolbar headerClose">
					<span @click="isCarDetail = false">取消</span>
					<span style="color:#ff8727" @click="selcarDetail">确定</span>
			</div> -->
				<van-picker show-toolbar :columns="carcolumns" @confirm="caronChange"   @cancel="isCarDetail = false" />
		</mt-popup>

        <van-popup v-model="showpinganDetail" style="width:100%;height:100%">
            <div class="_closedPopupBtn" style="background: #fff;">    
                    责任详情
                <div class="header-right" @click="showpinganDetail = false">
                    <i  class="close-icon"></i>
                 </div>
            </div>
            <div class="_scheme-detail" v-if="PackagesList.length > 0">
                <div class="scheme-box">
                    <div  v-for="(item,index) in PackagesList[projectIndex].PlanInfos" :key="index">  
                        <div class="plan-name">
                                <div>{{item.PlanName}}</div>
                            </div>
                        <div v-for="(_item ,_index) in item.DutyInfos" :key="_index">
                            <table width="100%" cellspacing="0">
                                <tr>
                                    <td :rowspan="_item.DutyAttributeInfos.length + 1" width="50%" class="content-item br">
                                        <div>{{_item.DutyName}}</div>
                                    </td>
                                </tr>
                                <tr v-for="(item_1,index_1) in _item.DutyAttributeInfos" :key="index_1"> 
                                    <td width="50%" class="content-item " v-if="item_1.DutyAttrAmountValue != ''">
                                        <div>{{item_1.DutyAttributeName + item_1.DutyAttrAmountValue + item_1.DutyAttributeUnit}}</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>

    </div>
</template>

<script>

import "./../../assets/css/pingan.scss";
import "./../../assets/js/rem.js";
import { dialog } from 'vant';
// import carOwer from './../../assets/json/carOwer.json';
// import pinganProject from './../../assets/json/pinganProject.json';
import pinganDetail from './../../assets/json/pinganDetail.json';//保障赔付详情
// import pinganList from './../../assets/json/pinganList.json';//保障赔付条款
import { Indicator,Toast } from 'mint-ui';
// import { zmGetProvincesArr,zmGetCitiesArr,zmGetAreaArr } from '../../assets/js/zmRegion';
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import selectAddress from "./../common/selectAddress.vue"; //共用组件地址选择器
export default {
    data(){
        return{
            cityValue:'',
            isCarDetail:false,
            userTypeIndex:0,
            userTypeList:[{name:'营业',code:'0'},{name:'非营业',code:'1'}],
            carDetail:'二吨以下货车',
            arrow:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAMAAACOLiwjAAAAUVBMVEUAAACwsLCoqKioqKimpqalpaWmpqalpaWmpqampqampqampqampqampqampqanp6empqanp6empqampqanp6eqqqqlpaWmpqalpaWlpaWlpaVEFJUHAAAAGnRSTlMACh0r41fy7ejb0cW5saiWeHNjTjcSn42DbLt1rC8AAABXSURBVBjTdc43AoAgEAVRE0aCiHHuf1AtAKFgqzfV30p0topnYI3RdGCzemK1I2ylGkAUau/BZdWkA23w9D9yzHAnvrzrBUziM1iCDlagah8O5OewoKNf/bgF+EeITpAAAAAASUVORK5CYII=',
            insuranceNum:2,
            insCityShortName:'',
            vehicleIndex:0,
            amount:'',
            tip:'--',
            address:"",
            province: '广东省',//省
			city: '深圳市',//市
			area: '罗湖区',//县
			provinceCode: '',//省级代码
			cityCode: '', //市级代码
			areaCode: '440303',//县级代码
            isShow:false,
            insuredBirthday: new Date(this.Common.Public.GetDateStr(1)),
            startDate: new Date(this.Common.Public.GetDateStr(1)),
            carType:'货车',
            carcolumns:['二吨以下货车','二吨至五吨以下货车','五吨至十吨以下货车','十吨以上货车'],
            carCodeList:['B012','B022','B032','B042'],
            carcolumnsB:[],
            carCodeListB:[],
            carCodeListA:[],
            carCodeListC:[],
            showpinganDetail:false,
            carProducts:{},
            projectList:[
                {
                    "PackageCode": "PK00028933",
                    "PackageName": "方案一"
                },
                {
                    "PackageCode": "PK00028934",
                    "PackageName": "方案二"
                },
                {
                    "PackageCode": "PK00028935",
                    "PackageName": "方案三"
                },
                {
                    "PackageCode": "PK00028936",
                    "PackageName": "方案四"
                },
                {
                    "PackageCode": "PK00028937",
                    "PackageName": "方案五"
                }
                ],
            carcolumnsA:[],
            projectListArr:[],//保障
            carcolumnsC:[],
            schemeCode:'',//方案编码
            ProductCode:'',//市场产品编码
            projectIndex:0,
            wrppera:{
                "minHeight":"650px",
            },
            carTypeArr:[],
            VehicleCode:'B',
			regionInit: false,//禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址		
            isShow:false,
            startTime:'',
            endTime:'',
            diffProductCode:'',
            isflag:true,
            carTypeIndex:0,
            PackagesList:[],
            pinganDetailList:[],
            getAmount: {
            "DistributorCode": "HK",
            "ProductCode": "PAIC-HK-CZWY",
            "StartDate": "",
            "EndDate": "",
            "OrderDetail": {
                "MarketProductCode": "", //市场编码
                "PackageCode": "",//方案编码

                "TargetObject": {
                    "UseAttribute": "",
                    "Vehicle": "",
                    "VehicleDetail": ""
                }
                },
            },
            carOwer:{},
            LeastEmployeeNum:0,
            TopEmployeeNum:0,
            distributorCode:''
            // Products:[],
            //  LocationCity:"正在定位" 
        }
    },
    components:{
        selectAddress
    },
   async created(){
       if(sessionStorage.getItem('distributorCode')){
           this.distributorCode = sessionStorage.getItem('distributorCode');
       }
        if(sessionStorage.getItem("title")){
            document.title = sessionStorage.getItem("title");
        }
       var h = window.innerHeight;
       var self = this;
       this.wrppera.minHeight = h  + 'px';
       this.startTime =  this.Common.Public.dateString(this.startDate);
       this.endTime = this.getNowFormatDate(this.startTime);
        // this.carOwer = carOwer.Products
        var ProductCode = this.$route.query.ProductCode;
        this.diffProductCode = ProductCode;
        Indicator.open('请稍等')
        await axiosGetAPI('/PropertyProducts/' + ProductCode).then(res=>{
             Indicator.close();
                if(res.status == 200){
                     self.carOwer = res.result.schema.Products;
                     document.title =  res.result.name;
                     sessionStorage.setItem('title',res.result.name);
                     var showAddress = sessionStorage.getItem('showAddress');
                      if(showAddress == '' || showAddress == undefined || showAddress == true  ){
                            // sessionStorage.setItem('showAddress',true);
                            self.toAddress();
                        }
                }
         })       
      
    },
    methods:{
        pinganDetailBtn(){
            this.showpinganDetail = true;
            // this.
        },
        toProductMicro(){
            if(this.amount == null || this.amount == undefined || this.amount == ''){
                Toast('正在计算投保金额，请稍等')
                return 
            }
            if(this.cityValue == ''){
                Toast('请选择投保地区');
                return;
            }
            this.getAmount.AreaCode = this.areaCode;
            this.getAmount.AreaName = this.cityValue;
            var getAmount  = JSON.stringify(this.getAmount);
            var carcolumns = JSON.stringify(this.carcolumns);
            var carCodeList = JSON.stringify(this.carCodeList);
            sessionStorage.setItem('carcolumns',carcolumns);
            sessionStorage.setItem('carCodeList',carCodeList);
            sessionStorage.setItem('getAmount',getAmount);
            this.$router.push({path:'/pingan/productMicro?amount=' + this.amount});
        },
        getAmountfun(){
            var model = {
            "DistributorCode": this.distributorCode,
            "ProductCode": "",
            "StartDate": "",
            "EndDate": "",
            "OrderDetail": {
                "MarketProductCode": "", //市场编码
                "PackageCode": "",//方案编码
                "AreaName":'',
                "AreaCode":'',
                "TargetObject": {
                    "UseAttribute": "",
                    "Vehicle": "",
                    "VehicleDetail": ""
                }
            }
        };
            model.StartDate = this.startTime + ' 00:00:00';
            model.EndDate = this.endTime + ' 23:59:59';
            model.ProductCode = this.diffProductCode;
            model.OrderDetail.MarketProductCode = this.ProductCode;
            model.OrderDetail.PackageCode = this.projectListArr[this.projectIndex].PackageCode;
            model.OrderDetail.TargetObject.UseAttribute = '0' +  (this.userTypeIndex - 0 + 1);
            model.OrderDetail.TargetObject.Vehicle =  this.carTypeArr[this.vehicleIndex].code;
            model.OrderDetail.TargetObject.VehicleDetail = this.carCodeList[this.carTypeIndex];
            model.OrderDetail.AreaName =   this.cityValue;
            model.OrderDetail.AreaCode =  this.areaCode;
            this.tip = '保费计算中...';
            this.amount = '';
            this.getAmount = model;
            //   "AreaCode": "440305",
            //   "AreaName": "广东省深圳市南山区",
            axiosPostAPI('PropertyProducts/'+ this.diffProductCode +'/QuotedPrice',model).then(res=>{
                if(res.status == 200){
                    this.amount = res.result;
                     this.getAmount.Amount = this.amount;
                }
            })
            // console.log(model);
        },
        changeProject(item,index){
            this.projectIndex = index;
            this.schemeCode = item.PackageCode;
            this.getAmountfun();
        },
         getNowFormatDate(d){
			var date;
			if(typeof(d) == "undefined"){
				date = new Date();
			}else{
				date = new Date(d); 
            	date.setFullYear(date.getFullYear()+1); 
           		date.setDate(date.getDate()-1);
			}
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		},
        toAddress(){
            this.isShow = true;
        },
        vehicleBtn(item,index){
            this.VehicleCode = item.code;
            if(item.code == 'A'){
                this.carcolumns = this.carcolumnsA;
                this.carCodeList = this.carCodeListA;
                this.carDetail = this.carcolumnsA[0];
                this.carTypeIndex = 0;
            }else if(item.code == 'B'){
                this.carcolumns = this.carcolumnsB;
                this.carCodeList = this.carCodeListB;
                this.carDetail = this.carcolumnsB[0];
                this.carTypeIndex = 0;
            }else if(item.code == 'C'){
                this.carcolumns = this.carcolumnsC;
                this.carCodeList = this.carCodeListC;
                this.carDetail = this.carcolumnsC[0];
                this.carTypeIndex = 0;
            }
            this.filtration();
            this.vehicleIndex = index;
            this.projectIndex = 0;
            this.getAmountfun();
        },
        changeUsertype(item,index){
            this.userTypeIndex = index;
            this.getAmountfun()
            // console.log(this.userTypeIndex);
        },
        carDetailchange(picker, values) { //滑动座位数
            //  this.passengerCapacity = values[0];
            
        },
        caronChange(value,index){
            this.carDetail = value;//车辆种类。
            this.carTypeIndex = index;
            this.projectIndex = 0;
             this.filtration();
            this.getAmountfun();
            this.isCarDetail = false;
        },
        selcarDetail(){
            this.isCarDetail = false;
            // this.getAmountfun();
        },
        selInsuredBirthday: function() { // 打开被保人生日日期层
				if (this.CommencementDateValuey) {
					this.insuredBirthday = new Date(this.CommencementDateValue);
				}
				this.$refs.insuredBirthday.open();
				},
		insuredBirthConfirm: function() { // 选择被保人生日日期
                this.startTime = this.Common.Public.dateString(this.insuredBirthday)
                 this.endTime = this.getNowFormatDate(this.startTime)
				this.$refs.insuredBirthday.close();
            },
        
        randerView(code){
            var Products =  this.carOwer;
                 var model = {};
                  for(var i = 0 ; i < Products.length ; i++){
                    var item = Products[i];
                     if(item.CityCode.length > 6) {
                            var arr =  Products[i].CityCode.split(',');
                            var cityCode = code.substring(0,4) + '00';
                            var _cityCode = code.substring(0,2) + '0000';
                            // console.log(arr)
                            //   console.log(cityCode)
                            //     console.log(_cityCode)
                            if(arr.indexOf(cityCode) != -1 ){
                                       var model = {};
                                        model.ProductCode = item.ProductCode ;
                                        model.Packages = item.Packages;
                                        model.RiskOptions = item.RiskOptions;
                                        return model;  
                            }
                            if(arr.indexOf(_cityCode) != -1 ){
                                       var model = {};
                                        model.ProductCode = item.ProductCode ;
                                        model.Packages = item.Packages;
                                        model.RiskOptions = item.RiskOptions;
                                        return model;  
                            }
                          
                      }else{
                        var cityCode1 = item.CityCode.substring(0,4);
                        var cityCode2 = item.CityCode.substring(0,2);
                         if(code.indexOf(cityCode1) != -1) {
                                model.ProductCode = item.ProductCode;
                                model.Packages = item.Packages;
                                model.RiskOptions = item.RiskOptions;
                                return model;
                            }
                        else if(code.indexOf(cityCode2) != -1){
                                model.ProductCode = item.ProductCode ;
                                model.Packages = item.Packages;
                                model.RiskOptions = item.RiskOptions;
                                return model;
                            }
                        }
                }              
        },
       async readerGuarantee(PackageCode){//条款列表 
           var pinganList = {};    
           await axiosGetAPI('/PropertyProducts/' + this.diffProductCode).then(res=>{
                if(res.status = 200){
                    pinganList = res.result.schema;
                }
            })
            var Products =  pinganList.Products;
            var model = {};
            for(var i = 0 ; i < Products.length ; i++){
                 var item = Products[i];
                 if(PackageCode == item.ProductCode){
                     this.PackagesList =  item.Packages;
                     return 
                 }                  
            }
        },
        // readerDetailList(PackageCode){//条款列表          
        //     var Products =  pinganDetail.Products;
        //     var model = {};
        //     for(var i = 0 ; i < Products.length ; i++){
        //          var item = Products[i];
        //          if(PackageCode == item.ProductCode){
        //              this.pinganDetailList =  item.Packages;
        //             //  console.log(this.pinganDetailList)
        //              return 
        //          }     
        //     }
        // },
        filtration(){
            this.projectListArr = []
            for(var i = 0; i < this.projectList.length ; i ++){
                var item = this.projectList[i];
                var useAttributeArr = item.RuleParam.useAttribute.split(',');
                var useAttributeCode = '0' +  (this.userTypeIndex - 0 + 1);
                var vehicleDetailArr = item.RuleParam.vehicleDetail.split(',');
                if(useAttributeArr.indexOf(useAttributeCode)  != -1){
                    // console.log(12)
                }else{
                    continue 
                }
                if(item.RuleParam.vehicle == this.VehicleCode  != -1){
                    
                }else{
                    continue 
                }
                if(vehicleDetailArr.indexOf(this.carCodeList[this.carTypeIndex])  != -1){
                    
                }else{
                    continue 
                }
                var model = {};
                model.PackageCode = item.PackageCode;
                model.PackageName = item.PackageName;
                this.projectListArr.push(model);
                //  "PackageCode": "PK00028933",
                //     "PackageName": "方案一"
           
            }
        },
    async selAddress(){
                    this.isShow = false;
                    if(this.address != ''){
                        this.cityValue = this.address;
                    }else{
                        this.cityValue = '广东省深圳市罗湖区'
                        this.areaCode = '440303';
                        this.cityCode = '4403';
                    }					                    
                    var model = this.randerView(this.areaCode);
                    console.log(model,this.areaCode);
                    // console.log(model)
                  if(JSON.stringify(model) == "{}" || model == undefined ){
                      this.cityValue = '';
                      this.areaCode = '';
                      this.amount = '';
                      this.tip = '--';
                       this.$dialog.confirm({
                                title: '',
                                message: '该地区暂时不能投保请重新选择',
                                }).then(() => {
                        }).catch(() => {});
                  }else{
                        this.ProductCode = model.ProductCode;
                        this.projectList = model.Packages
                        this.PackagesList = model.Packages;
                        model.RiskOptions.map(item=>{
                            if(item.code == 'UseAttribute'){
                                this.userTypeList = [];
                               for(var i = 0 ; i < item.options.length ; i ++){
                                   if(item.options[i] == '01'){
                                      var obj = {};
                                      obj.code = item.options[i];
                                      obj.name = '营业';
                                      this.userTypeList.push(obj);
                                   }
                                   if(item.options[i] == '02'){
                                      var obj = {};
                                      obj.code = item.options[i];
                                      obj.name = '非营业';
                                      this.userTypeList.push(obj);
                                   }
                               }  
                            }
                        });
                        model.RiskOptions.map(item=>{
                            if(item.code == 'LeastEmployeeNum'){
                                this.LeastEmployeeNum = 0;
                               for(var i = 0 ; i < item.options.length ; i ++){
                                  this.LeastEmployeeNum = item.options[i];
                               }  
                            }
                        });
                        model.RiskOptions.map(item=>{
                            if(item.code == 'TopEmployeeNum'){
                                this.TopEmployeeNum = 0;
                               for(var i = 0 ; i < item.options.length ; i ++){
                                   this.TopEmployeeNum = item.options[i]
                               }  
                            }
                        });
                        model.RiskOptions.map(item=>{
                            if(item.code == 'Vehicle'){
                                this.carTypeArr = [];
                            if(item.options.length > 0 ){
                               for(var i = 0 ; i < item.options.length ; i ++){
                                    // "A": "客车",
                                    // "B": "货车",
                                    // "C": "特种车"
                                    if(item.options[i] == 'A'){
                                      var obj = {};
                                      obj.code = item.options[i];
                                      obj.name = '客车';
                                      this.carTypeArr.push(obj);
                                   }
                                   if(item.options[i] == 'B'){
                                      var obj = {};
                                      obj.code = item.options[i];
                                      obj.name = '货车';
                                      this.carTypeArr.push(obj);
                                   }
                                   if(item.options[i] == 'C'){
                                      var obj = {};
                                      obj.code = item.options[i];
                                      obj.name = '特种车';
                                      this.carTypeArr.push(obj);
                                   }
                               }  
                              }else{
                                  if(item.options[0] == 'A'){
                                       this.carType = '客车';
                                        this.VehicleCode = 'A'
                                   }
                                   if(item.options[0] == 'B'){
                                       this.carType = '货车';
                                     this.VehicleCode = 'B'
                                   }
                                   if(item.options[0] == 'C'){
                                      this.carType = '特种车';
                                     this.VehicleCode = 'C'
                                   }
                                 
                              }
                            }
                        })
                         model.RiskOptions.map(item=>{
                            if(item.code == 'VehicleDetail'){
                                // this.carTypeArr = [];
                                this.carcolumns = [];
                                this.carCodeList = [];
                                this.carcolumnsA = [];
                                this.carcolumnsC = [];
                                this.carCodeListA = [];
                                this.carCodeListC = [];
                               for(var i = 0 ; i < item.options.length ; i ++){
                                if(item.options[i] == 'A012'){
                                      this.carcolumnsA.push('6座以下客车');
                                      this.carCodeListA.push(item.options[i])
                                   }
                                 if(item.options[i] == 'A032'){
                                      this.carcolumnsA.push('10-20座以下客车');
                                      this.carCodeListA.push(item.options[i])
                                   }
                                    if(item.options[i] == 'A042'){
                                      this.carcolumnsA.push('20-36座以下客车');
                                      this.carCodeListA.push(item.options[i])
                                   }
                                    if(item.options[i] == 'A052'){
                                        this.carcolumnsA.push('36座及以上客车');
                                        this.carCodeListA.push(item.options[i])
                                   }
                                    if(item.options[i] == 'B012'){
                                         this.carcolumns.push('二吨以下货车');
                                        this.carCodeList.push(item.options[i])
                                      
                                   }
                                    if(item.options[i] == 'B022'){
                                      this.carcolumns.push('二吨至五吨以下货车');
                                        this.carCodeList.push(item.options[i])
                                   }
                                    if(item.options[i] == 'B032'){
                                      this.carcolumns.push('五吨至十吨以下货车');
                                        this.carCodeList.push(item.options[i])
                                    
                                   }
                                    if(item.options[i] == 'B042'){
                                        this.carcolumns.push('十吨以上货车');
                                        this.carCodeList.push(item.options[i])
                                  
                                   }
                                    if(item.options[i] == 'C022'){
                                        this.carcolumnsC.push('特种车一');
                                        this.carCodeListC.push(item.options[i])
                                  
                                   }
                                    if(item.options[i] == 'C032'){
                                     this.carcolumnsC.push('特种车二');
                                        this.carCodeListC.push(item.options[i])
                                  
                                   }

                                    if(item.options[i] == 'C042'){
                                      this.carcolumnsC.push('特种车三');
                                        this.carCodeListC.push(item.options[i])
                                  
                                   }
                                    if(item.options[i] == 'B142'){
                                        this.carcolumnsC.push('特种车四');
                                        this.carCodeListC.push(item.options[i])
                                   }

                               }  
                               this.carcolumnsB = this.carcolumns;
                               this.carCodeListB = this.carCodeList;
                            }
                        })
                        this.carDetail = this.carcolumns[0];
                        this.carTypeIndex = 0;
                        this.vehicleIndex = 0;
                        this.projectIndex = 0;
                        this.Vehicle = this.carCodeList[this.vehicleIndex].code;
                       await this.filtration();
                    //    await this.readerDetailList(model.ProductCode)
                       await this.getAmountfun()
                  } 
            },
        addressChange(picker, values) { //地区选择器
				if (this.regionInit) {
				//取值并赋值
				if (values[0] && values[1]  && values[2]) {
					this.address = values[0]["name"] + values[1]["name"] + values[2]["name"];
					this.province = values[0]["name"];
					this.city = values[1]["name"];
					this.area = values[2]["name"];
					this.provinceCode = values[0]["code"];
					this.cityCode = values[1]["code"];
					this.areaCode = values[2]["code"];
					//给市、县赋值
					    let area = "";
						if (values[0].name == "北京市") {
							this.area  = "1101";
						} else if (values[0].name == "天津市") {
							this.area  = "1201";
						} else {
							this.area  = values[1]["code"];
						}
					picker.setSlotValues(1, zmGetCitiesArr(values[0]["code"]));
					picker.setSlotValues(2, zmGetAreaArr(values[1]["code"]));
					this.$emit("getRegion", this.address)
				}else {
					// console.log("数据不全");
				}
				} else {
			    	this.regionInit = true;
				}
            },
    closeAddress(data){
            // console.log(data);
            this.isShow = false;
        },
        addressList(data){
            this.address = data.address;
            this.areaCode = data.areaCode;
            this.cityCode = data.cityCode;
            this.provinceCode = data.provinceCode;
            this.selAddress();
            console.log(data);
        },
    }
}
</script>
<style scoped>
.placeholder-text{
    font-size: .3rem;
    color: #ccc;
    font-family: PingFangSC-Regular;
}
.placeholder-address{
    color: #333333;
    font-size: .3rem;
}
.m20{
        margin-bottom: .2rem;
        background: #ffffff;
}
.common-cell.pl30-line>.common-cell-container {
    border-bottom: .005rem solid #eee;
    min-height: .445rem;
}
.common-radio {
    display: inline-block;
    line-height: .6rem;
    color: #666;
    text-align: center;
    min-width: 1.2rem;
    margin-right: .3rem;
    background: #fff;
    box-shadow: 0 0.03rem 0.09rem 0 hsla(0,0%,89%,.7);
    border-radius: .3rem;
    border-radius: 30px;
}
.active{
    color: #fff;
    background-image: linear-gradient(90deg,#ff8f3c,#ff6300);
    box-shadow: 0 0.06rem 0.18rem 0 rgba(255,151,59,.6);
    border-radius: .3rem;
}
.insurance-time-container{
    /* width: 100%; */
    padding: .1rem .3rem .3rem;
    background: #fff;
    text-align: center;
    font-family: PingFangSC-Regular;
}
.insurance-time-container .lable-name {
    font-size: .26rem;
    color: #888;
    padding-bottom: .3rem;
}
.fl{
        float: left;
}
.fr{
    float: right;
}
.insurance-time-container .icon {
    display: inline-block;
    width: .3rem;
    height: .42rem;
    margin-left: .1rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAOAgMAAABFiESqAAAADFBMVEUAAABnZ2dmZmZnZ2f7tBJ5AAAABHRSTlMA5yjHR2NZBgAAAEZJREFUCNdjMGMAAc4DDKoNQBpEciaAGNMYGJgiGEAEhAMUBkuDMJgHEgXLgxBYB1gQrAhiFpAPVAJWFBXBAAFTIUqgpgAAefQNj0svmDwAAAAASUVORK5CYII=) 50% no-repeat;
    background-size: .25rem .1rem;
}

.insurance-time-container .time-info{
    font-size: .28rem;
    color: #4e4e4e;
}

.clear{
    clear: both;
}

.scheme-detail {
    margin-right: .3rem;
    line-height: .89rem;
    float: right;
    font-size: .3rem;
    color: #ff8727;
    text-align: right;
}

.htabscroll{
        position: relative;
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
}
.lyBox{
    overflow: hidden;
    padding: 0 .3rem;
}
.ly-tab-item-label{
    /* height: .9rem;
    border-radius: .08rem;
    border: .02rem solid #ffdbb6;
    background: #fff;
    color: #ff8727!important;
    box-shadow: none!important */
     height: .9rem;
    width: 2rem;
    line-height: 0.9rem;
    border-radius: .08rem;
    border: .02rem solid #ffdbb6;
    background: #fff;
    color: #ff8727!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    text-align: center;
    margin-right: 0.15rem;
    font-size: 0.28rem;
}
.ly-tab-list{
   
        position: relative;
    box-sizing: border-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    min-width: 100%;
    height: auto;
    width: auto;
}
.projectActive{
    background: #ff8727;
    border: none;
    color: #fff!important;
    box-shadow: none!important;
}
.plan-info-list{
     padding: .3rem;
    font-size: .28rem;
    line-height: .4rem;
}
.plan-info-list li:first-child {
    padding-top: .08rem;
}
.duty-item{
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.duty-item p{
        color: #666;
    font-size: 0.3rem;
}
.plan-info-list  li:last-child {
    padding-top: .06rem;
}
 .duty-item .insured-detail {
    width: 5.12rem;
    line-height: .4rem;
}
.duty-item .insured-amount {
    white-space: nowrap;
}

._scheme-detail {
    background: #fff;
    padding: .3rem;
    min-height: 100vh;
}
.scheme-box {
    border: .01rem solid #ff8727;
    box-shadow: 0 0.01rem 0.08rem 0 rgba(255,135,39,.4);
    border-radius: .08rem;
    overflow: hidden;
}
.plan-name {
    background: #fff1e6;
    padding: .2rem;
    border-bottom: .01rem solid #e5e5e5;
}
.plan-name>div:first-child {
    /* font-family: PingFangSC-Medium; */
    font-size: .3rem;
    color: #ff8727;
    line-height: .4rem;
}
.content-item {
    padding: .2rem;
    font-family: PingFangSC-Regular;
    font-size: .26rem;
    color: #4e4e4e;
    line-height: .36rem;
    border-bottom: .01rem solid #e5e5e5;
}
.br {
    border-right: .01rem solid #e5e5e5;
}
.close-icon{
    display: inline-block;
    width: .42rem;
    height: .42rem;
    margin-top: .28rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAArCAMAAAA5QerMAAAAM1BMVEUAAACcnJycnJyjo6OcnJybm5udnZ2cnJydnZ26urqbm5ucnJycnJycnJycnJycnJybm5uW+F15AAAAEHRSTlMAas4ZEtk85EsF9cS2qHx3XWMJ1QAAAG5JREFUOMvt0DkOgDAQwMDlviH/fy004IJIriPF9VSOWpktc/zqxyw9UvOT7Zq1TXotMg1dqEWaRZpFmkWaRapFukWqnV5pXY8VySWemRxOs/zkr0n+usSaxKrEusSKdLshAzvn6Nh+ErsvUSuxG4pMBXcTNUT/AAAAAElFTkSuQmCC);
    background-size: .42rem;
}
 .money-text{
    font-size: .44rem;
    color: #ff8727;
    line-height: .9rem;
    /* margin-right: .08rem; */
    font-family: PingFangSC-Semibold;
}
.page-footer > div{
    width: 50%;
}

</style>