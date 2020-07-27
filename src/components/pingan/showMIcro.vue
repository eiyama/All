<template>
    <div class="page-container">
        <div class="InsureBannner" style="padding-bottom: 0.9rem;">
            <div class="m20" v-if="pinganDetailList.length > 0">
                <div>                        
                    <div class="product-title" >
                            <span class="cell-title title-bold">
                                <i class="cell-title-left-icon"></i>
                                保障信息
                            </span>
                    </div>
                    <ul class="scheme-detail"  v-for="(item,index) in pinganDetailList[typeIndex].PlanInfos" :key="index">
                        <li>
                            <div class="scheme-detail-item">
                                <!-- 雇主责任保险 -->
                                {{item.PlanName}}
                            </div>
                            <ul  v-for="(_item ,_index) in item.DutyInfos" :key="_index">
                                <li class="duty-detail" >
                                    <span class="duty-detail-item duty-name">{{_item.DutyName}}</span>
                                    <span class="fr duty-detail-item">{{_item.InsuredAmount + _item.InsuredAmountUnit}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            被保人
                        </span>   
                </div>
                <div  >
                    <div class="cell-container">
                        <span class="fl">姓名/公司</span>
                        <span class="fr">{{orderRes.orderDetail.Insurant.Name}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">证件号码</span>
                        <span class="fr">{{orderRes.orderDetail.Insurant.CertificateNo}}</span>
                    </div>
                     <div class="cell-container">
                        <span class="fl">标的地址</span>
                        <span class="fr">{{orderRes.orderDetail.AreaName}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">投保人数</span>
                        <span class="fr">2</span>
                    </div>
                     <div class="cell-container">
                        <span class="fl">车牌号</span>
                        <span class="fr">{{orderRes.orderDetail.TargetObject.VehicleLicenceCode}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">车架号</span>
                        <span class="fr">{{orderRes.orderDetail.TargetObject.VehicleFrameNo}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">车辆种类</span>
                        <span class="fr">{{orderRes.orderDetail.TargetObject.Vehicle == 'A' ? '客车' : orderRes.orderDetail.TargetObject.Vehicle == 'B' ? '货车'  : '特种车' }}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">车辆类型</span>
                        <span class="fr">{{carcolumns[typeIndex]}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">车辆使用性质</span>
                        <span class="fr">{{orderRes.orderDetail.TargetObject.UseAttribute == '01' ? '营业' : '非营业'}}</span>
                    </div>
                </div>
            </div>
             <div class="m20" style="padding-bottom:0;">
                <div class="insurance-time-container">
                        <span>保险期限</span>
                        <div class="insurance-time-block fr">
                            <span class="fl">{{orderRes.startDateStr}} 0时 至 </span>
                            <span class="fr">{{orderRes.endDateStr}} 24时</span>
                        </div>
                </div>
                
            </div>

            <div class="m20" style="padding-bottom:0;">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            受益人
                        </span>
                        <div class="_scheme-detail">
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
                <div class="cell-container">
                    <span class="fl">发票类型</span>
                    <span class="fr">{{InvoiceIndex == 0 ? '电子发票' : InvoiceIndex == 1  ?  '增值税专用发票' : '不开发票' }}</span>
                </div>
                <div class="cell-container" v-show="orderRes.orderDetail.Invoice.PrintType == '03'" >
                    <span class="fl">纳税人识别码</span>
                    <span class="fr">{{orderRes.orderDetail.Invoice.TaxPayerNo}}</span>
                </div>

             </div>
             <div class="m20">
                    <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            联系人信息
                        </span>
                    </div>
                   <div class="cell-container">
                        <span class="fl">联系人</span>
                        <span class="fr">{{orderRes.orderDetail.Contact.Name}}</span>
                    </div>
                     <div class="cell-container">
                        <span class="fl">联系电话</span>
                        <span class="fr">{{orderRes.orderDetail.Contact.Phone}}</span>
                    </div>
                     <div class="cell-container">
                        <span class="fl">邮箱</span>
                        <span class="fr">{{orderRes.orderDetail.Contact.Email}}</span>
                    </div>
             </div>
            
             <div class="page-footer bottom-fixed">
                <!-- <div class="foot-premium">--</div> -->
                <div class="money-text foot-premium" >{{'￥' + orderRes.amount}}</div>
                <div class="footer-btn" @click="toProductMicro">立即投保</div>
            </div>
        </div> 
        
        

    </div>
</template>
<script>
import "./../../assets/css/pingan.scss";
import "./../../assets/js/rem.js";
import pinganProject from './../../assets/json/pinganProject.json';
import pinganDetail from './../../assets/json/pinganDetail.json';//保障赔付详情
import pinganList from './../../assets/json/pinganList.json';//保障赔付条款
// import { zmGetProvincesArr,zmGetCitiesArr,zmGetAreaArr } from '../../assets/js/zmRegion';
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { dialog } from 'vant';
export default {
    data(){
        return{
            isTimeout:true,
            timeOut:10,
            insuranceName:'',
            cardNum:"",
            isCard:false,
            InsureChecked:true,
            taxpayerNum:'',
            userTypeIndex:'0',
            userTypeList:[{name:'电子普通发票',code:'0'},{name:'增值税专用发票',code:'1'},{name:'不开发票',code:'2'}],
            cardType:'',
            arrow:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAMAAACOLiwjAAAAUVBMVEUAAACwsLCoqKioqKimpqalpaWmpqalpaWmpqampqampqampqampqampqampqanp6empqanp6empqampqanp6eqqqqlpaWmpqalpaWlpaWlpaVEFJUHAAAAGnRSTlMACh0r41fy7ejb0cW5saiWeHNjTjcSn42DbLt1rC8AAABXSURBVBjTdc43AoAgEAVRE0aCiHHuf1AtAKFgqzfV30p0topnYI3RdGCzemK1I2ylGkAUau/BZdWkA23w9D9yzHAnvrzrBUziM1iCDlagah8O5OewoKNf/bgF+EeITpAAAAAASUVORK5CYII=',
            insuranceNum:'',
            insCityShortName:'',
            Contact:{name:'',phone:'',email:''},
            carcolumns:['二吨以下货车','二吨至五吨以下货车','五吨至十吨以下货车','十吨以上货车'],
            carCodeList:['B012','B022','B032','B042'],
            province: '广东省',//省
			city: '深圳市',//市
			area: '福田区',//县
			provinceCode: '',//省级代码
			cityCode: '', //市级代码
			areaCode: '440303',//县级代码
            isShow:false,
            insuredBirthday: new Date(this.Common.Public.GetDateStr(0)),
            startDate: new Date(this.Common.Public.GetDateStr(0)),
            carType:'',
           
            isShow:false,
            startTime:'',
            invaldText:'不能为空',//请输入正确的纳税人识别号,15~18位字母或数字!
            endTime:'',
            isTaxpayer:false,
            isCheckBox:false,
            isApplicant:false,
            applicantcardType:'社会统一信用码',
            applicantType:'',
            type:'',//中间值
            showInformation:false,
            timer:null,
            orderRes:{},
            getAmount:{},
            pinganDetailList:[],
            typeIndex:'',
            orderNo:'',
            payUrl:'',
            status:'',
            remark:'',
            statusDisplay:'',
            InvoiceIndex:'',
        }
    },
    created(){
        if(sessionStorage.getItem("title")){
            document.title = sessionStorage.getItem("title");
        }
       var orderNo = this.$route.query.orderNo;
       this.orderNo = orderNo;
       axiosGetAPI('/PropertyProducts/PAIC-HK-CZWY/Order/' + orderNo).then(res=>{
           if(res.status == 200){
               this.orderRes = res.result;
               if( res.result.payUrl != '' && res.result.payUrl != undefined ){
                   this.payUrl =  res.result.payUrl;
               }else{
                   this.remark = res.result.remark;
                   this.status = res.result.status;
                   this.statusDisplay = res.result.statusDisplay;
                   this.payUrl = '';
               }
               
           }
       })
       this.InvoiceIndex = sessionStorage.getItem('InvoiceIndex');
        this.getAmount = JSON.parse(sessionStorage.getItem('getAmount')); 
        this.carcolumns = JSON.parse(sessionStorage.getItem('carcolumns')); 
        this.carCodeList =  JSON.parse(sessionStorage.getItem('carCodeList')); 
            // sessionStorage.setItem('carcolumns',carcolumns);
            // sessionStorage.setItem('carCodeList',carCodeList);
        var PackageCode = this.getAmount.OrderDetail.MarketProductCode;
        var typeCode =  this.getAmount.OrderDetail.TargetObject.VehicleDetail;
        // console.log(PackageCode)
        for(var i = 0; i < this.carCodeList.length ; i ++){
            if(typeCode == this.carCodeList[i]){
                this.typeIndex = i;
            }   
        }
        this.readerDetailList(PackageCode)
    },
   
    methods:{
          readerDetailList(PackageCode){//条款列表          
            var Products =  pinganDetail.Products;
              console.log(Products);
            var model = {};
            for(var i = 0 ; i < Products.length ; i++){
                 var item = Products[i];
                 if(PackageCode == item.ProductCode){
                     this.pinganDetailList =  item.Packages;
                    //  console.log(this.pinganDetailList);
                     return 
                 }
            }
        },
        
        
        toProductMicro(){
            if(this.status == 'Cancel'){
                 this.$dialog.confirm({
                                title: this.statusDisplay,
                                message: this.remark + '。请联系管理员或重新投保。',
                                }).then(() => {
                        }).catch(() => {});
                return
            }
            if(this.payUrl != ''){
                    window.location.href = this.payUrl; 
            }else{
                  axiosGetAPI('/PropertyProducts/PAIC-HK-CZWY/Order/'+ this.orderNo + '/Payment').then(res=>{
                        if(res.status == 200){
                            this.payUrl = res.result.payUrl;
                            window.location.href = this.payUrl;
                        }
                    })
            }
            // this.$router.push({path:'/pingan/cppay?orderNo=' + this.orderNo});

        },
        
         
    }
}
</script>
<style scoped>
.m20{
    margin-bottom: .2rem;
    background: #ffffff;
    padding-bottom: 0.2rem;
}
.placeholder-text{
    font-size: .3rem;
    color: #ccc;
    font-family: PingFangSC-Regular;
}

.scheme-detail {
    padding: 0 .3rem;
    -ms-flex: 1;
    flex: 1;
    text-align: left;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}

.scheme-detail-item {
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #333;
}

.duty-name{
    width: 80%;
    line-height: .4rem;
}

/* .duty-detail{
    line-height: 0.68rem;
    overflow: hidden;
} */
.scheme-detail>li {
    overflow: hidden;
    font-size: .28rem;
    line-height: .68rem;
}

.duty-detail-item {
    display: inline-block;
    font-family: PingFangSC-Light;
    font-size: .28rem;
    color: #666;
}

 .cell-container {
    font-family: PingFangSC-Light;
    font-size: .28rem;
    color: #666;
    min-height: .6rem;
    height: auto;
    line-height: .6rem;
    padding: 0 .3rem;
    background-color: #fff;
    overflow: hidden;
}

.insurance-time-container {
    /* width: 100%; */
    height: .9rem;
    line-height: .9rem;
    padding: 0 .3rem;
    background: #fff;
    font-family: PingFangSC-Light;
    font-size: .28rem;
    color: #666;
}

.insurance-time-block{
    text-align: center;
}

._scheme-detail {
    margin-right: .3rem;
    line-height: .89rem;
    float: right;
    font-size: .3rem;
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

.bottom-fixed{
    margin-bottom: env(safe-area-inset-bottom);
}
.read-area {
    font-size: .24rem;
    font-family: PingFangSC-Light;
    color: #666;
    padding: .2rem .3rem;
    position: relative;
    white-space: normal;
}
.read-area .checkbox-icon {
    position: absolute;
    width: .3rem;
    height: .3rem;
    background: #f60;
    margin-top: .05rem;
    color: #a5a5a5;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAKlBMVEUAAADDw8PBwcHCwsLBwcHU1NTQ0NDBwcHCwsLCwsLCwsLr6+vk5OTd3d1i4ZWfAAAAC3RSTlMA9hpt8vn14r2eUIq7iTgAAAB3SURBVBjTYwACJotC8WYFIAPEnph7es81SQhvSfRuINjqBWIzy+wGg4MGQM7C0xDOHimgDp/dUHBEgYEzGsbZOoFBcTccCDGYITjJDL0Izg2GGgTnOIM0grMRmbMFRRmKAShGo1iK4hwUhyJ7Ac1zCG9jBggiqAAfZJqcRUCbwAAAAABJRU5ErkJggg==) 0 0 no-repeat;
    background-size: contain;
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
.page-footer > div{
    width: 50%;
}

</style>