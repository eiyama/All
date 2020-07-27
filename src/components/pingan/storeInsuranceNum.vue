<template>
    <div class="read-content" style="padding-bottom: 0.9rem;">
       <div class="m20 person-num-block ">
          <span>保障人数</span>
          <span>{{AccidentInsuranceNum}}</span>
       </div>
        <div class="m20" v-for="(item,index) in InsuranceNumList" :key = index  >
                <div class="product-title">
                    <span class="cell-title title-bold">
                        <i class="cell-title-left-icon"></i>
                        {{"保障人员" + (1 + index)}}
                    </span>
                </div>
                <van-field  v-model="item.Name" label="姓名"  placeholder="请输入姓名" />
                <van-field  v-model="item.CertificateNo" label="身份证号"  placeholder="请输入身份证号" /> 
        </div>
            <div class="page-footer bottom-fixed">
                 <div class="money-text foot-premium"  v-if="Amount != ''">{{'￥' + Amount}}</div>
                <div class="footer-btn" @click="toProductMicro">立即投保</div>
            </div>
    </div>
</template>
<script>
import "./../../assets/css/pingan.scss";
import "./../../assets/js/rem.js";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator,Toast } from 'mint-ui';
export default {
    data(){
        return{
            updataModel:{},
            AccidentInsuranceNum:'',
            Amount:'',
            InsuranceNumList:[],
        }
    },
    created(){
        this.updataModel = JSON.parse(sessionStorage.getItem('updataModel')); 
        this.Amount =  this.$route.query.amount;
        this.AccidentInsuranceNum = this.updataModel.OrderDetail.TargetObject.AccidentInsuranceNum;
        this.setView();
        if(sessionStorage.getItem("title")){
            document.title = sessionStorage.getItem("title");
        }
    },
    methods:{
        setView(){
            this.InsuranceNumList = [];
            for(var i = 0 ; i < this.AccidentInsuranceNum ; i ++ ){
                var model = {};
                // model.title = "保障人员" + ( 1 +  i);
                model.Name = "";
                model.CertificateNo = "";
                this.InsuranceNumList.push(model);
            }
            // console.log(this.InsuranceNumList);
        },
        toProductMicro(){
            for(var i = 0 ; i < this.InsuranceNumList.length; i ++){
                if(this.InsuranceNumList[i].Name == ''){
                    Toast("投保人证件号错误");  
					return false; 
                }
                if(this.InsuranceNumList[i].CertificateNo.length != 15 && this.InsuranceNumList[i].CertificateNo.length != 18){
					Toast("投保人证件号错误");  
					return false; 
                }
            }
            this.updataModel.OrderDetail.TargetObject.AcplPersonnels = this.InsuranceNumList;
             Indicator.open('投保中...')
            axiosPostAPI('PropertyProducts/' + this.productCode  + '/Order',this.updataModel).then(res=>{
                Indicator.close();
                    if(res.status == 200){
                        var orderNo = res.result.orderNo;
                        sessionStorage.setItem('orderNo',orderNo);
                        this.$router.push({path:'/pingan/storeMico?orderNo=' + orderNo});
                    }
                })  
        },
    }
}
</script>
<style scoped>
.person-num-block {
    height: .9rem;
    line-height: .9rem;
    font-size: .28rem;
    color: #666;
    padding-left: .3rem;
    background: #fff;
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