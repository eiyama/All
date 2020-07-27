<template>
  <div style="height:100vh;background:#ffffff;">
      <div style="width:100%;margin:auto;margin-top:4rem;text-align: center;">
          <img src="https://img02.az.jd.com/az360/m/images/common/new/logo.png" style="width:1.96rem;margin-bottom:0.5rem" alt="">
          <div v-if="toPagetext">
              <p style="color:#7d7b7e;font-size: 0.32rem;">{{toPagetext}}</p>
          </div>
          <div v-else>
              <p style="color:#7d7b7e;font-size: 0.32rem;"><span class="iColor">{{timeOut}}秒</span>后对被保险人<span class="iColor">{{Name}}</span>进行智能核保</p>             
            <van-button style="margin-top:0.3rem;border-radius: 0.6rem;height: 0.8rem;line-height: 0.8rem;" @click="getUnderwriting"  plain type="info">直接开始核保</van-button>
          </div>            
      </div>     
  </div>
</template>
<script>
import "./../../assets/css/product.scss";
// import "./../../assets/js/rem.js";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator, Toast } from "mint-ui";
import { dialog } from "vant";
export default {
  data() {
    return {
        Name:'',
        InsuranceUnder:'',
        updataModel:{},
        UnderwritingUrl:'',
        insutanceData:{},
        timeOut:5,
        timer:null,
        count:10,
        isTimeout:false,
        toPagetext:'',
        distributorCode:''
    };
  },
  methods: {
    getUnderwriting() {
      var self = this;
      var url = window.location.protocol + "//" + window.location.host + "/#";
      var model = {
        DistributorCode: this.distributorCode,
        ProductCode: this.insutanceData.code,
        orderDetail: {
          schemaProductCode: this.insutanceData.schemaProductCode
        },
        //  + '&InsuranceUnder=' +
        Properties: {
            underwritingPassedUrl: url +"/product/underwritingTrans?appId=" + localStorage.getItem("appId") + "&ProductCode=" +  this.insutanceData.code + '&flagUnderwriting=' + this.flagUnderwriting,
            underwritingBackUrl: url + "/product/presoalInformation?appId=" + localStorage.getItem("appId")
        }
      };
      axiosPostAPI("/PropertyProducts/" + this.insutanceData.code + "/Underwriting", model ).then(data => {
        if (data.status == 200) {
          window.location.href = data.result;
        }
      });
    },
    informationBtn(){
            //  this.showInformation = true;
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
                   this.toUnderwriting()   
                }
                }, 1000)
            }
        },
    getOrder(){
        var self = this;
          Indicator.open('下单中')
                axiosPostAPI('/PropertyProducts/' + this.insutanceData.code +'/Order',this.updataModel).then(res=>{
                    Indicator.close();
                    if(res.result){
                        var orderNo = res.result.orderNo                       
                        Indicator.open('加载中...');
                        axiosGetAPI('/PropertyProducts/' +  self.insutanceData.code +  '/Order/' + orderNo).then(data=>{
                            Indicator.close();
                            if(res.status == 200){                                
                                if(data.result.status == 'Cancel'){
                                self.$dialog.confirm({
                                        title: "",
                                        message: data.result.remark
                                        })
                                        .then(() => {
                                            self.$router.push({ path: '/product/presoalInformation'  });
                                        })
                                        .catch(() => {}); 
                                }
                                else{
                                     self.$router.push({ path: '/product/payPage?orderNo=' + orderNo });
                                }
                            }
                        })
                    }
                })  
    },
    toUnderwriting(){
        var arr= this.InsuranceUnder;               
        this.getUnderwriting()
        //  window.location.href = this.UnderwritingUrl;
    },
  },
 
  mounted() {
        if(sessionStorage.getItem("title")){
            document.title = sessionStorage.getItem("title");
        }
        if(sessionStorage.getItem('distributorCode')){
            this.distributorCode = sessionStorage.getItem('distributorCode');
        }
      this.InsuranceUnder = JSON.parse(sessionStorage.getItem('InsuranceUnder'));         
      this.flagUnderwriting = this.$route.query.flagUnderwriting;
      this.updataModel = JSON.parse(sessionStorage.getItem('updataModel'));
      this.InsurantList = this.updataModel.orderDetail.InsurantList;
      this.insutanceData = JSON.parse(sessionStorage.getItem('insuranceData'));   
    //   if(this.flagUnderwriting == ''){
    //       this.Name = this.InsuranceUnder[0].Name;
    //   }
        if(this.InsuranceUnder.length <= 0){
           this.toPagetext = "核保完成,正在生成支付订单";
           this.getOrder();
           return;
       }  
      if(this.flagUnderwriting != '' && this.$route.query.uw_id){        
            var index = this.flagUnderwriting * 1   
            if(this.updataModel.orderDetail.InsurantList[index].Uwid != undefined){
                this.updataModel.orderDetail.InsurantList[index].Uwid = this.$route.query.uw_id ;   
                sessionStorage.setItem('updataModel',JSON.stringify(this.updataModel));                 
            }else{
                this.$set(this.updataModel.orderDetail.InsurantList[index],'Uwid',this.$route.query.uw_id);
                sessionStorage.setItem('updataModel',JSON.stringify(this.updataModel));
            }     
            
       
      }
      var arr = this.InsuranceUnder;
       for(var i = 0 ; i < arr.length ; i ++){
            if(this.flagUnderwriting == '' ){
                this.flagUnderwriting = arr[i].Index
                break;
            }
            if(this.flagUnderwriting == arr[i].Index && arr[i+1]){
                this.flagUnderwriting = arr[i+1].Index;
                break;
            }      
            if(this.flagUnderwriting == arr[i].Index && arr[i+1] == undefined){
                this.toPagetext = "核保完成,正在生成支付订单";
                this.getOrder();
                return;
            }      
        }
     this.Name = this.InsurantList[this.flagUnderwriting].Name;
      this.informationBtn();
  }
};
</script>
<style scoped>
.iColor{
    color:#d37338
}
</style>