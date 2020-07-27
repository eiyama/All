<template>
    <div class="page-container">
        <div class="InsureBannner" style="padding-bottom: 0.9rem;">
            <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            保障信息
                        </span>
                </div>
                <div>
                    <van-field v-model="insuranceName" @focus.native.capture="showSeachOrgCode" label="姓名/公司"  placeholder="请输入姓名/公司" />
                    <div class="common-cell none-line show-all">
                      <div class="common-cell-container">
                            <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                <span data-v-29da0c6c="" class="cell-title">证件类型</span>
                            </div>
                            <div class="cell-right"  @click="isCard = true">
                                <div class="cell-right-content">
                                    <span class="placeholder-text" v-show="cardType == ''" >{{cardType ? cardType : "请选择"}}</span>    
                                    <span class="placeholder-address" v-show="cardType">{{cardType}}</span>
                                </div>
                                <i class="cell-icon cell-icon-" style="display:none"></i>       
                                <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    
                    <van-field v-model="cardNum" label="证件号码" placeholder="18位数字或大写英文字母" />

                    <van-field v-model="VehicleLicenceCode" label="车牌号"  placeholder="请输入车牌号码" />

                    <van-field v-model="insuranceVin" label="车架号"  placeholder="请输入车架号" />

                </div>
            </div>
            <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            投保人（缴费人）
                        </span>
                        <div class="scheme-detail" style="display: flex;align-items: center;">
                            <p style=" font-size: .28rem;color: #666;margin-right: 0.1rem;">同被保人</p>
                            <van-switch  size="16px" v-model="InsureChecked" active-color="#ffa03b" inactive-color="#e5e5e5" />
                        </div>
                </div>
                <div  v-show="!InsureChecked" >
                      <van-field v-model="applicantName" label="名称"  placeholder="请输入名称" />
                      <div class="common-cell none-line show-all">
                      <div class="common-cell-container">
                            <div data-v-29da0c6c="" class="cell-left" style="min-width:1.8rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                <label for="" class="applicantCard"  @click="applicantcardTypeBtn">
                                    <span class="cell-title" >{{applicantcardType}}</span>
                                    <van-icon name="arrow-down" />
                                </label>
                                
                            </div>
                            <div class="cell-right" >
                                <div class="cell-right-content">
                                   <input type="text" v-model="applicantType" placeholder="请输入" >
                                </div>
                                <i class="cell-icon cell-icon-" style="display:none"></i>       
                                <!-- <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="arrow-right"></i> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            受益人
                        </span>
                        <div class="scheme-detail">
                            <p style=" font-size: .28rem;color: #666">同被保人</p>
                        </div>
                </div>
                
            </div>
             <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                           发票
                        </span>
                </div>
                <div class="invoice-cell">
                     <div class="common-content">
                        <span :class="{ active : index == userTypeIndex}" class="common-radio " @click="changeUsertype(item,index)" v-for="(item,index) in userTypeList" :key="index">
                            {{item.name}}
                        </span>
                    </div>
                </div>
                <div class="common-cell none-line show-all" v-show="userTypeIndex == 0">
                      <div class="common-cell-container">
                            <div data-v-29da0c6c="" class="cell-left" style="width:2rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                <span data-v-29da0c6c="" class="cell-title">纳税人识别码</span>
                            </div>
                            <div class="cell-right"  >
                                <input type="text" v-model="taxpayerNum"  @keyup="taxpayerChange"  placeholder="请输入纳税人识别号"  >
                            </div>
                        </div>
                    </div>
                <!-- <van-field v-show="userTypeIndex == 0" v-model="taxpayerNum" label="纳税人识别码"  @keyup="taxpayerChange"  placeholder="请输入纳税人识别号" /> -->
                <div class="invalid-text-container" v-show="isTaxpayer">
                    <div class="invalid-text">
                        {{invaldText}}
                    </div>
                </div>
                <p class="paper-invoice-tips" v-show="userTypeIndex == 1">增值税专用纸质发票请到就近平安门店打印。</p>
             </div>
             <div class="m20">
                    <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            联系人信息
                        </span>
                    </div>
                    <div class="">
                        <van-field  v-model="Contact.name" label="联系人"  placeholder="请输入联系人姓名" />
                        <van-field  v-model="Contact.phone" oninput="if(value.length>11)value=value.slice(0,11)"  type="tel" label="联系电话"  placeholder="请输入手机号码" />
                        <van-field  v-model="Contact.email" type="email" label="邮箱"  placeholder="用于接收电子保单" />
                    </div>
             </div>
             <div class="bottom-fixed">
                    <div class="read-area bottom-fixed">
                            <span class="checkbox-icon" :class="{active:isCheckBox}" @click="showCheckBox"></span>
                            <div class="item-wrapper-list">
                                <label for="">我已阅读</label>
                                <span @click="informationBtn">《投保须知》</span>
                                <span @click="showInsuranceList = true">《保险条款》</span>
                                <span @click="showSolvency = true" >《偿付能力披露》</span>
                                <span @click="showIvoice = true">《发票说明》</span>
                            </div>
                    </div>
             </div>
             <div class="page-footer bottom-fixed">
                <div class="money-text foot-premium">{{ '￥' + amount}}</div>
                <div class="footer-btn" @click="toProductMicro">立即投保</div>
            </div>
        </div> 


        <van-popup position="bottom" v-model="isCard">
			  <!-- <div class="picker-toolbar headerClose">
					<span @click="isCard = false">取消</span>
					<span style="color:#ff8727" @click="selCard">确定</span>
			</div> -->
				<van-picker show-toolbar :columns="typeResult" @confirm="cardChange"  @cancel="arcdCancel" />
		</van-popup>

         <van-popup position="bottom" v-model="isApplicant">
			  <!-- <div class="picker-toolbar headerClose">
					<span @click="isApplicant = false">取消</span>
					<span style="color:#ff8727" @click="selApplicant">确定</span>
			</div> -->
				<van-picker show-toolbar :columns="typeResult" @confirm="ApplicantChange"  @cancel="isApplicant = false" />
		</van-popup>

    

        <van-popup v-model="isSeachOrgCode" class="mint-popup-full" style="height:100%;width:100%;background:rgb(241,241,241);">
          <div class="information-search-container">
              <div class="searchbar">
                <div class="backIcon" @click="closeSeach"></div>
                <div class="searchbar-inner">
                    <i class="icon-search"></i>
                    <i class="icon-close" v-show="OrgCode != ''" @click="emptyInput"></i>
                    <input type="text" v-model="OrgCode" ref="inputOrg"  placeholder="您可以根据输入机构名称，检索组织机构信息" style="width: 100%;">
                </div>
                <div class="searchbar-confirm" @click="closeSeach">完成</div>
              </div>
              <div class="org-info-box" v-show="orgCodeResult.length > 0">
                  <div v-for="(item,index) in orgCodeResult" :key="index" @click="closeSeach(item,index)">
                    <div class="org-info">
                            <div class="clientName">
                                {{item.name}}
                            </div>
                            <div class="code">
                               社会统一信用代码：{{item.creditCode}}
                            </div>
                            <div class="code">
                                组织机构代码：{{item.orgCode}}
                            </div>
                    </div>  
                  </div>
              </div>
          </div>
        </van-popup>

        <van-popup v-model="showInformation" :close-on-click-overlay="false"  style="height:80%" position="bottom">
            <div>
                <div class="_closedPopupBtn" >
                        投保须知
                    <div class="header-right" >
                        <span v-show="isTimeout" style="color:#333">{{timeOut}}</span>
                        <span v-show="!isTimeout" @click="showInformationBtn"> 已阅读 </span>
                    </div>
                </div>
                <insuranceInfor></insuranceInfor>
            </div>
		</van-popup>

        
        <van-popup v-model="showSolvency" :close-on-click-overlay="false"  style="height:45%" position="bottom">
            <div class="_closedPopupBtn" >
                    偿付能力披露
                <div class="header-right" @click="showSolvency = false">
                    <i  class="close-icon"></i>
                 </div>
            </div>
            <div class="solvency">
                 <p>截至2019年四季度,我公司综合偿付能力充足率为259.17%,满足监管要求;我公司最近一期的风险综合评级结果为B类</p>
            </div>
		</van-popup>


         <van-popup v-model="showIvoice" :close-on-click-overlay="false"  style="height:85%" position="bottom">
           <div>
                <div class="_closedPopupBtn" >    
                        发票说明
                    <div class="header-right" @click="showIvoice = false">
                        <i  class="close-icon"></i>
                    </div>
                </div>
                <div class="clause-txt">
                    <p>
                        温馨提示：为践行绿色环保的生活理念，推荐您使用电子发票。电子发票法律效力等同于纸质普通发票，且支持随时随地查看。承保成功后将以短信和邮件的形式发送至您的手机和邮箱。如您需要纸质发票可到就近平安门店打印纸质发票。发票抬头信息即为您填写的投保人信息，请根据实际财务报销需求填写投保人信息。
                    </p>
                </div>
                    
           </div>
		</van-popup>

        <van-popup v-model="showInsuranceList" :close-on-click-overlay="false"  style="height:85%" position="bottom">
            <div class="_closedPopupBtn" >    
                    保险条款
                <div class="header-right" @click="closeBtn">
                    <i  class="close-icon"></i>
                 </div>
            </div>
            <div style="height:100%" class="h-100p">
            <ul  class="clause-list" v-show="showList">
                <li data-v-eebe785a="" @click="showFJABtn">《平安雇主责任保险附加24小时意外保险（A款）》</li>
                <li data-v-eebe785a="" @click="showZRABtn" >《平安雇主责任保险（A款）》</li>
                <li data-v-eebe785a="" @click="showFJCRBBtn" >《平安责任保险附加传染病救助保险》</li>
            </ul>
            <div style="height:100%">
                <iframe  v-if="showFJA"  src="http://emcs.pa18.com/lib/pdf-viewer/viewer.html?pdfUrl=https%3A%2F%2Femcs.pa18.com%2Fterm%2FT0367521%2F%E5%B9%B3%E5%AE%89%E9%9B%87%E4%B8%BB%E8%B4%A3%E4%BB%BB%E4%BF%9D%E9%99%A9%E9%99%84%E5%8A%A024%E5%B0%8F%E6%97%B6%E6%84%8F%E5%A4%96%E4%BF%9D%E9%99%A9%EF%BC%88A%E6%AC%BE%EF%BC%89.pdf" class="clause-iframe"></iframe>
                <iframe  v-if="showZRA"  src="http://emcs.pa18.com/lib/pdf-viewer/viewer.html?pdfUrl=https%3A%2F%2Femcs.pa18.com%2Fterm%2FT0368826%2F%E5%B9%B3%E5%AE%89%E9%9B%87%E4%B8%BB%E8%B4%A3%E4%BB%BB%E4%BF%9D%E9%99%A9%EF%BC%88A%E6%AC%BE%EF%BC%89.pdf" class="clause-iframe"></iframe>
                <iframe  v-if="showFJCRB"  src="http://emcs.pa18.com/lib/pdf-viewer/viewer.html?pdfUrl=https%3A%2F%2Femcs.pa18.com%2Fterm%2FT0367693%2F%E5%B9%B3%E5%AE%89%E8%B4%A3%E4%BB%BB%E4%BF%9D%E9%99%A9%E9%99%84%E5%8A%A0%E4%BC%A0%E6%9F%93%E7%97%85%E6%95%91%E5%8A%A9%E4%BF%9D%E9%99%A9.pdf" class="clause-iframe"></iframe>
            </div>
            </div>
		</van-popup>     

    </div>
</template>
<script>
import "./../../assets/css/pingan.scss";
import "./../../assets/js/rem.js";
import { zmGetProvincesArr,zmGetCitiesArr,zmGetAreaArr } from '../../assets/js/zmRegion';
import insuranceInfor from './insuranceInfor.vue';
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator,Toast } from 'mint-ui';
// import { Toast } from 'vant';
export default {
    data(){
        return{
            isTimeout:true,
            showList:true,//责任条款
            showFJA:false,//附加A
            showZRA:false,//雇主责任保险A
            showFJCRB:false,
            timeOut:10,
            insuranceName:'',
            showSolvency:false,
            cardNum:"",
            isCard:false,
            InsureChecked:true,
            showInsuranceList:false,
            taxpayerNum:'',
            showIvoice:false,
            userTypeIndex:'0',
            userTypeList:[{name:'电子普通发票',code:'0'},{name:'增值税专用发票',code:'1'},{name:'不开发票',code:'2'}],
            cardType:'统一社会信用代码',
            arrow:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAMAAACOLiwjAAAAUVBMVEUAAACwsLCoqKioqKimpqalpaWmpqalpaWmpqampqampqampqampqampqampqanp6empqanp6empqampqanp6eqqqqlpaWmpqalpaWlpaWlpaVEFJUHAAAAGnRSTlMACh0r41fy7ejb0cW5saiWeHNjTjcSn42DbLt1rC8AAABXSURBVBjTdc43AoAgEAVRE0aCiHHuf1AtAKFgqzfV30p0topnYI3RdGCzemK1I2ylGkAUau/BZdWkA23w9D9yzHAnvrzrBUziM1iCDlagah8O5OewoKNf/bgF+EeITpAAAAAASUVORK5CYII=',
            insuranceNum:'',
            insCityShortName:'',
            Contact:{name:'',phone:'',email:''},
            province: '广东省',//省
			city: '深圳市',//市
			area: '福田区',//县
			provinceCode: '',//省级代码
			cityCode: '', //市级代码
			areaCode: '440303',//县级代码
            isShow:false,
            typeResult : ['居民身份证','统一社会信用代码', '港澳居民来往内地通行证', '台胞证','士兵证/军官证/警官证','中国护照','港澳身份证','外国人永久居留身份证','机构代码','其他'],
			typeCode:[{name:'居民身份证',code:'IdCard'},{name:'统一社会信用代码',code:'CreditCode'},{name:'港澳居民来往内地通行证',code:'MacHKerPassport'},{name:'台胞证',code:'TaiwanesePassport'},{name:'士兵证/军官证/警官证',code:'Soldier'},{name:'中国护照',code:'ChinaPassPort'},
			{name:'港澳身份证',code:'GAIdCard'},{name:'外国人永久居留身份证',code:'ForeignForeverIdCard'},{name:'机构代码',code:'Organization'},{name:'其他',code:'Other'}],
            // isShow:false,
            startTime:'',
            invaldText:'不能为空',//请输入正确的纳税人识别号,15~18位字母或数字!
            endTime:'',
            isTaxpayer:false,
            isCheckBox:false,
            isApplicant:false,
            applicantcardType:'社会统一信用码',
            VehicleLicenceCode:'',
            insuranceVin:'',
            applicantType:'',
            applicantName:'',
            type:'',//中间值
            showInformation:false,
            timer:null,
            openNext:0,
            cardIndex:1,
            getAmount: {
            "DistributorCode": "",
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
            updataModel:{
                "DistributorCode": "",
                "ProductCode": "",
                "StartDate": "",
                "EndDate": "",
                "Amount": 0,
                "ApplicantName": "",
                "InsurantName": "",
                "OrderDetail": {
                    "AreaCode": "",
                    "AreaName": "",
                    "MarketProductCode": "",
                    "PackageCode": "",
                    "TargetObject": {
                        "VehicleLicenceCode": "",
                        "VehicleFrameNo": "",
                        "UseAttribute": "",
                        "Vehicle": "",
                        "VehicleDetail": ""
                    },
                    "Applicant": {
                        "Name": "",
                        "CertificateType": '',
                        "CertificateNo": ""
                    },
                    "Insurant": {
                        "Name": "",
                        "CertificateType": '',
                        "CertificateNo": ""
                    },
                    "Beneficary": {
                       "Name": "",
                        "CertificateType": '',
                        "CertificateNo": ""
                    },
                    "Invoice": {
                        "PrintType": "",
                        "TaxPayerNo": ""
                    },
                    "Contact": {
                        "Email": "",
                        "Phone": "",
                        "Name": ""
                    }
                },
                "DistributorAttach": "",
                "OrderSource": "WeiXin",
                "Properties":{
                    "PayReturnUrl":"",
                     "PayNotifyUrl":""
                     }
            },
            amount:'',
            productCode:'',//
            applicantcardIndex:'',
            isSeachOrgCode: false,
            isShowOrgBtn: true,
            orgCodeResult: [],
            orgCodeType: '',
            OrgCode:'',
            timeout:null,
            orgList:{},
            distributorCode:''
        }
    },
    created(){
    //    this.startTime =  this.Common.Public.dateString(this.startDate);
    //    this.endTime = this.getNowFormatDate(this.startTime)
    if(sessionStorage.getItem("title")){
            document.title = sessionStorage.getItem("title");
        }
    if(sessionStorage.getItem('distributorCode')){
           this.distributorCode = sessionStorage.getItem('distributorCode');
       }
       var getAmount =  sessionStorage.getItem('getAmount');
       getAmount = JSON.parse(getAmount);
       this.getAmount = getAmount;
       this.amount = getAmount.Amount || this.$route.query.amount;
       this.updataModel.DistributorCode = this.distributorCode;
        this.updataModel.Amount = getAmount.Amount;
        this.productCode = getAmount.ProductCode;
        this.updataModel.OrderDetail.MarketProductCode = getAmount.OrderDetail.MarketProductCode;   
        this.updataModel.OrderDetail.PackageCode = getAmount.OrderDetail.PackageCode;   
         this.updataModel.ProductCode = getAmount.ProductCode;  
        this.updataModel.StartDate = getAmount.StartDate;
        this.updataModel.EndDate = getAmount.EndDate;
        this.updataModel.OrderDetail.AreaName = getAmount.AreaName;
        this.updataModel.OrderDetail.AreaCode = getAmount.AreaCode;
        this.updataModel.OrderDetail.TargetObject.UseAttribute = getAmount.OrderDetail.TargetObject.UseAttribute;
        this.updataModel.OrderDetail.TargetObject.Vehicle = getAmount.OrderDetail.TargetObject.Vehicle;
        this.updataModel.OrderDetail.TargetObject.VehicleDetail = getAmount.OrderDetail.TargetObject.VehicleDetail;

    },
    components:{
        insuranceInfor
    },
    watch:{
        OrgCode(curVal, oldVal) {
            // 实现input连续输入，只发一次请求
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
            this.searchOrgCode(curVal,oldVal);
            }, 300);
        },
    },
    methods:{
       closeSeach(item,index){
           if(this.orgCodeResult.length > 0){
                this.isSeachOrgCode = false;
                this.insuranceName  = item.name;
                this.cardNum = item.creditCode;
                this.taxpayerNum = item.creditCode;
                this.OrgCode = item.name;
                this.cardType = '统一社会信用代码';
                this.cardIndex = 1;
           }else{
               this.isSeachOrgCode = false;
               this.insuranceName = this.OrgCode; 
           }
        },
      emptyInput(){
          this.OrgCode = '';
        },
     searchOrgCode(curVal,oldVal) {
      var self = this;
      const param = {
        orgName: curVal || oldVal,
        orgCode:"",
      }
      Indicator.open('加载中...');
      axiosGetAPI('/vi/Enterprise', param).then((res) => {
        if (res.result) {
          self.orgCodeResult = res.result;
          // self.fullPriceSlots = res.result;

        }
        Indicator.close();
      });
    },
  
     showSeachOrgCode() { //社会统一信用码查询
    //   this.orgCodeType = type;
      var self = this;
    //   self.orgCodeResult = [];
    //   this.orgRadio = '';
      this.isSeachOrgCode = true;
    //   this.orgNameValue = name;
    //   this.orgCodeValue = idNo;
        this.$nextTick((x)=>{   //正确写法
        this.$refs.inputOrg.focus();
        })
    },
        closeBtn(){
            if(this.openNext > 0){
                this.showList = true;
                this.showFJA = false;
                this.showZRA = false;
                this.showFJCRB=false;
                this.openNext = 0;
            }else{
                this.showInsuranceList = false;
                //  this.showList = true;
            }
        },
        showFJABtn(){
            this.showList = false;
            this.showFJA = true;
            this.openNext = 1;
        },
        showZRABtn(){
            this.showList = false;
             this.showZRA = true;
            this.openNext = 1;
        },
        showFJCRBBtn(){
            this.showList = false;
            this.showFJCRB = true;
            this.openNext = 1;
        },
        showCheckBox(){
            this.isCheckBox = !this.isCheckBox;
           this.informationBtn()
        },
        showInformationBtn(){
            this.showInformation = false;
            this.isCheckBox = true;
        },
        informationBtn(){
             this.showInformation = true;
                 if(this.timeOut > 1){
                  this.count = 10;
                // this.showTimer = false;
            this.timer = setInterval(() => {
                if (this.timeOut > 0) {
                    this.timeOut--;
                } else {
                    this.timeOut = 0;
                    clearInterval(this.timer);
                    this.timer = null;
                    this.isTimeout = false;    
                }
                }, 1000)
            }
        },
        taxpayer(taxId){
            var regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i],
                i, j = regArr.length;
            for (var i = 0; i < j; i++) {
                if (regArr[i].test(taxId)) {
                    return true;
                }
            }
            return false
        },
        taxpayerChange(){
            if(this.taxpayerNum == ''){
                this.isTaxpayer = true;
                this.invaldText = '不能为空'
            }
            else if(!this.taxpayer(this.taxpayerNum)){
                 this.isTaxpayer = true;
                this.invaldText = '请输入正确的纳税人识别号,15~18位字母或数字!'
            }
            else{
                this.isTaxpayer = false;
            }
            
        },
        toProductMicro(){
            if(this.isCheckBox){
            var Insurant = {
                        "Name": "",
                        "CertificateType": '',
                        "CertificateNo": ""
             };
            if(this.insuranceName == ''){
                Toast('请输入名字/公司');
                return;
            }else{
                this.updataModel.InsurantName = this.insuranceName;
                this.updataModel.ApplicantName = this.insuranceName;
                Insurant.Name = this.insuranceName
            }
            if(this.cardType != ''){          
                Insurant.CertificateType =  this.typeCode[this.cardIndex].code;
            }else{
                 Toast('请选择证件类型');
                return;
            }
            if(this.cardNum != ''){                
                 if(Insurant.CertificateType == 'IdCard'){
                      if(this.cardNum.length != 15 && this.cardNum.length != 18){
							Toast("投保人证件号错误");  
							return false; 
						}
                 }
                  Insurant.CertificateNo = this.cardNum; 
            }else{
                Toast("请输入证件号");  
				return false; 
            }
            if( this.VehicleLicenceCode != ''){
                this.updataModel.OrderDetail.TargetObject.VehicleLicenceCode = this.VehicleLicenceCode
            }else{
                Toast("请输入车牌号");  
				return false; 
            }
            if( this.insuranceVin != ''){
                this.updataModel.OrderDetail.TargetObject.VehicleFrameNo = this.insuranceVin;
            }else{
                Toast("请输入车架号");  
				return false; 
            }
             this.updataModel.OrderDetail.Insurant = Insurant;     
             this.updataModel.OrderDetail.Beneficary = Insurant;    
                  
            if(this.InsureChecked){
                this.updataModel.OrderDetail.Applicant = Insurant;
            }else{
                this.updataModel.OrderDetail.Applicant.CertificateType = this.typeCode[this.applicantcardIndex].code;
                this.updataModel.OrderDetail.Applicant.Name = this.applicantName;
                this.updataModel.OrderDetail.Applicant.CertificateNo = this.applicantType;
            }
            var Invoice= {
                        "PrintType": "",
                        "TaxPayerNo": ""
            };
            if(this.userTypeIndex == 0){
                Invoice.PrintType = '03';
                if(this.taxpayerNum != ''){
                    Invoice.TaxPayerNo = this.taxpayerNum ;
                }else{
                    Toast('请输入纳税人识别码')
                    return;
                }
            }
            if(this.userTypeIndex == 1){
                 Invoice.PrintType = '11';
            }
            if(this.userTypeIndex == 2){
                Invoice.PrintType = '11';
            }
             this.updataModel.OrderDetail.Invoice = Invoice;
            if(this.Contact.name != ''){
                this.updataModel.OrderDetail.Contact.Name = this.Contact.name
            }else{
                 Toast('请输入联系人')
                 return;
            }
            if(this.Contact.phone != ''){
                this.updataModel.OrderDetail.Contact.Phone = this.Contact.phone
            }else{
                 Toast('手机号')
                 return;
            }
             if(this.Contact.email != ''){
                this.updataModel.OrderDetail.Contact.Email = this.Contact.email
            }else{
                 Toast('请输入电子邮箱')
                 return;
            }
            var url = window.location.protocol + '//' + window.location.host + '/#' ;
            this.updataModel.Properties.PayReturnUrl = url + '/pingan/insureIndex?appId=' + localStorage.getItem('appId') + '&ProductCode=' +  this.updataModel.ProductCode;
            this.updataModel.Properties.PayNotifyUrl = url + '/pingan/payResult?appId=' + localStorage.getItem('appId');
            sessionStorage.setItem('InvoiceIndex',this.userTypeIndex); 
            Indicator.open('投保中...')
            axiosPostAPI('PropertyProducts/' + this.productCode  + '/Order',this.updataModel).then(res=>{
                Indicator.close();
                    if(res.status == 200){
                        var orderNo = res.result.orderNo;
                        sessionStorage.setItem('orderNo',orderNo);
                        this.$router.push({path:'/pingan/showMIcro?orderNo=' + orderNo});
                    }
                })           
            }
            else{
                Toast('请先阅读协议');
                return;
            }

        },
        changeProject(item,index){
            this.projectIndex = index;
        },
    
        changeUsertype(item,index){
            this.userTypeIndex = item.code;
        },
        applicantcardTypeBtn(){
            this.isApplicant = true;
        },
        ApplicantChange(value,index){
             this.applicantcardType = value;//滑动投保人
             this.applicantcardIndex = index;
             this.isApplicant = false;
        },

        cardChange(value,index){
            this.cardType = value;//保障信息车辆种类。（滑动）
            this.cardIndex = index;
             this.isCard = false;
        },
        arcdCancel(){
             this.isCard = false;
        },
      
        
    }
}
</script>
<style scoped>
.placeholder-text{
    font-size: .28rem;
    color: #ccc;
    font-family: PingFangSC-Regular;
}
.placeholder-address{
    color: #333333;
    font-size: .28rem;
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
    padding: 0 0.15rem;
    color: #666;
    text-align: center;
    min-width: 1.2rem;
    margin-right: .3rem;
    background: #fff;
    box-shadow: 0 0.03rem 0.09rem 0 hsla(0,0%,89%,.7);
    border-radius: .3rem;
    border-radius: 30px;
    font-size: 0.28rem;
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

.invoice-cell{
    margin-left: 0.3rem;
    height: .9rem;
    /* width: 100%; */
    /* padding-right: .3rem */
    border-bottom: .01rem solid #eee;
}
.paper-invoice-tips {
    font-family: PingFangSC-Light;
    font-size: .3rem;
    color: #666;
    padding: .05rem 0 .2rem .3rem;
}
.applicantCard{
    display: flex;
    align-items: center;
}


.read-area .active{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAWlBMVEUAAAD/iCj/iSr/iCj/hyj/iCf/iSf/iSf/hyf/////48z/lD//nk//iiz/+PP/9Ov/3MH/jTL/8eb/7uD/6tr/17f/xZf/tnv/qGP/jzb/5dD/0q//zqb/mEdoGAUsAAAACHRSTlMA8xts2babTk78UQYAAAC0SURBVCjPfVJXFoQgEKNLEOx1y/2vuYqwFp7mB17CMJlCAhiXglIhOSNHMKX/UAcpo/oAmkWe6wt4eK8T+BhGU4GuedSFrE21OFgCLrwzMMvBksxvlLnPL8/8gMKupyTixI/A5C+CrJ4qk2/8BIzBlxcMWq/YAkM07L+aX2i+WucNeh0giNy8o7R1B+OiIINdV6Ew6Oa9XbFA18MXEMH2lnxau/Pqtol3bX8eVDrax2W4XZ8fIZwPmYtTMbUAAAAASUVORK5CYII=)
}

 .money-text{
    font-size: .44rem;
    color: #ff8727;
    line-height: .9rem;
    /* margin-right: .08rem; */
    font-family: PingFangSC-Semibold;
}

.active{
    color: #fff;
    background-image: linear-gradient(90deg,#ff8f3c,#ff6300);
    box-shadow: 0 0.06rem 0.18rem 0 rgba(255,151,59,.6);
    border-radius: .3rem;
}
.page-footer > div{
    width: 50%;
}
</style>