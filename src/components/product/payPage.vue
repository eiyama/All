<template>
  <div style="background:#fff;height:100vh">
      <div class="h3_pay" style=" text-align: center;padding-top: 0.3rem;">
           <img src="./../../assets/images/Allianzlogo.png" style="width:1.96rem;" alt="">
          <div class="ng-binding" style="padding-left: 0px;font-size: .7rem;padding-top: .3rem;">
              <p style="font-size:.28rem;color: #666666;display: inline-block;">应付金额</p>
              ￥{{amount}}
          </div>
      </div>
      <ul style="padding: 0 0.3rem">
          <li class="ng-scope">
            <div class="personnelName">
                <span class="labelTitle ng-binding ">投保产品</span>
                <input type="text" v-model="productRuslt.productName"  readonly >     
            </div>
        </li>
        <li class="ng-scope" v-show="insutanceData.plantName">
            <div class="personnelName">
                <span class="labelTitle ng-binding ">投保计划</span>
                <input type="text" v-model="insutanceData.plantName" readonly >     
            </div>
        </li>
        <li class="ng-scope">
            <div class="personnelName">
                <span class="labelTitle ng-binding ">被保人</span>
                <input type="text" v-model="InsuranceName" readonly >     
            </div>
        </li>
      </ul>
    <div class="new_footer">
        <div class="submitBuy" @click="toPay" style="line-height: .88rem;font-size: .34rem;">
            确认支付
        </div>
    </div>
  </div>
</template>
  <script >
import "./../../assets/css/product.scss";
import "./../../assets/js/rem.js";
import { axiosGetAPI, axiosPostAPI } from '../../common/Axios';
import { Toast, Indicator } from "mint-ui";
import { dialog } from "vant";

export default {
  data() {
      return{
        amount:'',
        productType:'',
        insuredName:'',
        orderNo:'',
        payurl:'',
        iswxPay:false,
        isWeixin:false,
        type:'',
        productCode:'',
        productName:"",
        productDiff:'',
        insutanceData:{},
        productRuslt:{},
        plantName:'',
        status:'',
        InsuranceName:''
      }
  },
  methods: {
    	go_back(){
				this.$router.back();
      },
      toPay(){
          if(this.status == 'Cancel'){
             this.$router.back();
          }else{
            if(this.payurl != ''){
              window.location.href = this.payurl;
            }else{
            }
          }
      }
  },
  created() {
    var code = '';
       if(sessionStorage.getItem('insuranceData')){
            var insutanceData = JSON.parse(sessionStorage.getItem('insuranceData'));
            this.insutanceData = insutanceData;
            code = insutanceData.code;
            // this.amount = insutanceData.amount;
        }
        if(this.$route.query.productCode){
            code = this.$route.query.productCode;
        }
        if(sessionStorage.getItem("title")){
            document.title = sessionStorage.getItem("title");
          }
        if(this.$route.query.orderNo){
            this.orderNo = this.$route.query.orderNo;
        }         
    var self = this;
    // this.orderNo = sessionStorage.getItem('orderNo');
    Indicator.open('加载中...');
    axiosGetAPI('/PropertyProducts/' + code +  '/Order/' + this.orderNo).then(res=>{
        Indicator.close();
        if(res.status == 200){
            this.productRuslt = res.result;
            this.payurl = res.result.payUrl;
            this.amount = res.result.amount;
            this.productName = res.result.productName;
            this.InsuranceName = ''
            res.result.orderDetail.InsurantList.map(item=>{
              if(this.InsuranceName == ''){
                this.InsuranceName =  this.InsuranceName + item.Name
              }else{
                this.InsuranceName = this.InsuranceName + ',' + item.Name
              }
              
            })
            this.status = res.result.status;
            if(res.result.status == 'Cancel'){
               self.$dialog
                    .confirm({
                      title: "",
                      message: res.result.remark
                    })
                    .then(() => {
                        this.$router.back();
                    })
                    .catch(() => {}); 
            }
        }
      })
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    this.isWeixin = isWeixin
  },
  mounted() {
  
  },
};
</script>
<style scoped>
.labelTitle{
    font-size: .28rem;
    font-weight: normal;
    color: #868686;
}

</style>