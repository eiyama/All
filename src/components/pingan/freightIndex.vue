<template>
    <div class="page-container">
        <div class="freightBannner" style="margin-bottom: 1rem;">
            <div class="banner-img" :style="bannerImg">
                <!-- <img class="pingan-logo" src="../../assets/images/pingan/logo.png" alt=""> -->
            </div>
            <div class="block">
                <p class="product-name">货运无忧</p>
                <p class="product-desc"></p>
            </div>
            <div class="m20">
                 <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            适用客户
                        </span>
                </div>
                <div class="block">
                    <div class="applicable-customers">
                        <p>本保单不承担下述货物发生的任何损失赔偿责任： （1）长度在14米以上或宽度在3.5米以上或高度在3米以上或重量在20吨以上的大件货物； （2）商品车、工艺品、艺术品、现金、有价证券、珠宝、贵金属、鲜活动植物（瓜果/蔬菜除外）以及疫苗、血液制品； （3）对运输有特殊的防震动、防倾斜、防尘要求的设备或仪器； （4）单件货物价值超过人民币200万元人民币的设备或仪器；</p>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="product-title">
                    <span class="cell-title title-bold">
                        <i class="cell-title-left-icon"></i>
                        产品特色
                    </span>
                </div>
                <div class="productDisplay">
                     <img src="../../assets/images/pingan/freight_01.jpg" alt="">
                     <img src="../../assets/images/pingan/freight_02.jpg" alt="">
                     <img src="../../assets/images/pingan/freight_03.jpg" alt="">
                </div>
            </div>
            <div class="introducerInformation" v-show="salesmanInfo.mobile">               
                 <span>客户经理：{{salesmanInfo.name}}</span>     
                 <div style="display: flex;justify-content: space-between;align-items: center;">
                        <a :href="'tel:' + salesmanInfo.mobile">
                            <img style="height:16px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADUElEQVRoQ9WaS6hOURTHf/9ioJh5DJgTYsAEkTshQl2lSF4TEgbyCBOkPDJRJAPluklSJG8mJG8lDFwZGZgxMPGcbK06tz5f33fO2ufsc25W3dH332ut315nn733Olf856Yy+YcQRgNjgHGSHpbxkWpMFEAIYSNgfzNaErgOnJZ0L1VSMX5cACGE9cDWtsTb42yQ1BcTPIW2ECCEcADY7wj2HZgt6Z1Dm0ySCxCR/GBC9yUtTJadw1FXgBDCEuCGw0e7ZLWkiyXGlRqSB2CLc2kJr7ckGXwjlgcQKmQwV9LjCuPdQ+sCOCJpnzuLCsK6APolrauQl3toHsAPYITb07/Cxt5GeQCfgfElARrb1PIA3gLTSgB8AqZKso2tdssDeADMj8zgK7BO0u3IcaXleQC7gWMRnt8AmyS9jBhTWZoHMAt46oxwUJKdmRq3orOQdyH3DNW9oAjgPLDWMa19kjY4dMklRQC9wFVn1FmSnju1yWSe+8AAMMkR8ZKkVQ5dUokH4DCw1xm1V9I1pzaJzAMwE3jljPZQUo9Tm0RWCGBRQgjexWzyzZLOJMnO4cQLYDuy7cwe+wDYgv7mEVfVuACyKlwBljsDHpB00KmtJIsBiL0jN3IidQNkVTiZ9Yc8s2b3iTmS7IxUm8UCjAOslejZFyzpAUmTa8seiALIqrAauBCR1B1JiyP0UdJogAziHGDtRq9tl3SikziEMBKwveappD9eh4O6sgD2KN2PvLH9c2INIawEtlk7MkvmZ+bTOhovvCClALIqLABiO9I7gNd28QEMoJNZFQzCdb8oDZBB7ASOe2crUndKklUo1yoBZBD9wJqiQCV/vyjJXhpdLQWA9Y4eZQuxZJ65w3K7fJUBsipMAN4Do+ogsCazpJudfCcByCCmA3XtujckLasVIIOwV+KTOqogqeNkJ6vAYNIhBDs6WCWGpwRpDCCrhEFcBqYkgvgoaWLtj1BrgKwSR0t+5WnP1T7jbmkUoOWR2gMcAoaVrMYXSWO7jU2+BjoFCiHMAwxkUSREYcOsEYCWaljfyD6YDx7guvHYfXqXpLNFwI0CtIDYUXwF0H5P+AXcBaxZ7NpThgSgBcT+YaT1TfVM0u+iWW/9fUgBYhLtpv0L0E78MW/Lz14AAAAASUVORK5CYII=" alt="">                    
                        </a>
                        <span style="margin-left: 0.1rem;color:#fff;">拨打电话</span>
                 </div>                 
            </div>
            <div class="page-footer bottom-fixed">
                <!-- <div class="foot-premium">--</div> -->
                <div class="footer-btn" @click="toInsurance">立即投保</div>
            </div>
        </div> 

    </div>
</template>
<script>
import "./../../assets/css/pingan.scss";
import "./../../assets/js/rem.js";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import wx from 'weixin-js-sdk';
import {wxShare} from '../../assets/js/wxshare';
export default {
    data(){
        return{
            bannerImg:{
                backgroundImage:"url("+require("@/assets/images/pingan/freight_banner.jpg")+")"
            },
            appId:'',
            ProductCode:'',
            shareTitle:"",
            shareContent:'',
            shareImg:'',
            shareLink:'',
            distributorCode:'',
            shareToken:'',
            salesmanId:'',
            salesmanInfo:{},
        }
    },
    mounted(){

    },
    created(){ 
        var self = this;               
        if(this.$route.query.distributorCode){
            this.distributorCode = this.$route.query.distributorCode;
            sessionStorage.setItem('distributorCode',this.distributorCode);
        }
        if(this.$route.query.appId){
            this.appId = this.$route.query.appId;
            localStorage.setItem('appId',this.appId);
        }
        document.title =  '货运无忧';
        sessionStorage.setItem('title','货运无忧');
        this.ProductCode = this.$route.query.ProductCode;
        if(sessionStorage.getItem('salesmanId')){
            this.salesmanId = sessionStorage.getItem('salesmanId');
        }
        if(this.$route.query.salesmanId){
             this.salesmanId = this.$route.query.salesmanId;
        }
        if(this.$route.query.shareToken){
            this.shareToken = this.$route.query.shareToken;
            sessionStorage.setItem('shareToken',this.$route.query.shareToken);
            var SalesmanModel = {};
            SalesmanModel.shareToken = this.shareToken;
            axiosPostAPI('/Share/Salesman',SalesmanModel).then(res=>{
                if(res.status == 200){
                    self.salesmanInfo = res.result;
                }
            })
        }  
         if(self.$route.query.orderNo || self.$route.query.OrderNo){ 
            var orderNo = self.$route.query.orderNo || self.$route.query.OrderNo;
            sessionStorage.setItem('orderNo',orderNo);
            // /PropertyProducts/FDD001/PrepareOrder/{prepareOrderNo}
            axiosGetAPI('/UsersOrder/AgainInsure?orderNo=' + orderNo).then(res=>{
                if(res.status == '200'){
                    self.distributorCode = res.result.distributorCode;
                    // self.distributorAttach = res.result.distributorAttach;
                    // sessionStorage.setItem('distributorAttach',self.distributorAttach);
                    sessionStorage.setItem('distributorCode',self.distributorCode);
                }
            })
		} 
        self.shareTitle = "货运无忧";
        axiosGetAPI('li/products/' + self.$route.query.id).then(res=>{
                    if(res.status == 200){
                        self.shareContent = res.result.description;                                                      
                        self.shareImg = res.result.coverUrl; 
                        var domain = '';
                        var currentUrl = document.location.toString();
                        if (currentUrl) {
                            var arrUrl = currentUrl.split("#");
                            domain = arrUrl[0];
                        };                                      
                         // 分享地址中必须包含appid，业务员id，渠道编号，产品编码，分享的token（当前业务员shareToken）                             
                        if(self.shareToken == ''){
                            self.shareLink = domain + '#/pingan/freightIndex?appId=' + localStorage.getItem('appId') +  '&ProductCode=' + self.ProductCode + '&distributorCode=' + self.distributorCode +"&salesmanId=" + self.salesmanId + '&id=' + self.$route.query.id;   
                            var model = {};
                            model.link = self.shareLink;
                            axiosPostAPI('/Share/Links',model).then(res=>{
                                if(res.status == 200){
                                    self.shareLink = res.result.tokenLink;
                                    self.shareToken = res.result.shareToken;
                                    // 分享链接参数拼接    
                                    wxShare({title:self.shareTitle, description:self.shareContent, shareImg:self.shareImg, shareLink:self.shareLink});                                   
                                    // self.initWx(self.shareTitle, self.shareContent, self.shareImg , self.shareLink);                                                                                  
                                }
                            })
                        }else{                    
                            self.shareLink = domain + '#/pingan/freightIndex?appId=' + localStorage.getItem('appId') +  '&ProductCode=' +  self.ProductCode  + '&distributorCode=' + self.distributorCode +"&salesmanId=" + self.salesmanId + "&shareToken=" + self.shareToken + '&id=' + self.$route.query.id;  
                            wxShare({title:self.shareTitle, description:self.shareContent, shareImg:self.shareImg, shareLink:self.shareLink});  
                        }                        
                    }
                })                                            
    },
    methods:{       
        toInsurance(){
            this.$router.push({path:'/pingan/insuranceType?ProductCode=PAIC-HK-HYWY'});
        }
    }
}
</script>
<style scoped>
.block{
    background: #fff;
    padding: .2rem .3rem;
    margin-bottom: .2rem;
}
.product-name {
    font-size: .44rem;
    font-weight: 700;
    font-family: PingFangSC-Semibold;
    margin-bottom: .17rem;
}
  .product-desc {
    font-size: .28rem;
    color: #666;
    font-family: PingFangSC-Light;
}

.productDisplay{
    background: #fff;
    padding: .1rem .15rem;
    margin-bottom: .1rem;
}
.productDisplay img{
    width: 100%;    
}
.applicable-customers {
    background: #fefaee;
    padding: .2rem;
    font-size: .28rem;
    line-height: .4rem;
    color: #333;
    font-family: PingFangSC-Regular;
}



</style>