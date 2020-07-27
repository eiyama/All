<template>
    <div>
        <!-- 家政责任险 -->
          <div class="orderDetail" v-if="resultList.orderDetail && resultList.orderDetail.ApplicantList.length ">
                    <p>投保人信息</p>
                    <ul>
                        <li>
                            <span>企业</span>
                            <span>{{resultList.applicantName}}</span>
                        </li>
                        <li>
                            <span>证件类型：</span>                            
                            <span>{{resultList.orderDetail.ApplicantList[0].CertificateName}}</span>
                        </li>
                        <li>
                            <span>证件号码</span>
                            <span>{{resultList.orderDetail.ApplicantList[0].CertificateNo}}</span>
                        </li>                       
                        <li>
                            <span>手机号码 </span>
                            <span>{{resultList.orderDetail.ApplicantList[0].MobileTelephone}}</span>
                        </li>  
                        <li>
                            <span>电子邮箱 </span>
                            <span>{{resultList.orderDetail.ApplicantList[0].Email}}</span>
                        </li>  
                        <li v-if="resultList.orderDetail.ApplicantList[0].Address">
                            <span>投保地区</span>
                            <span>{{resultList.orderDetail.ApplicantList[0].Address}}</span>
                        </li>            
                    </ul>                            
                </div>   
                 <div class="orderDetail" v-if="resultList.orderDetail.otherTargetObjectList.length">
                    <p>标的信息</p>
                    <ul v-for=" item in resultList.orderDetail.otherTargetObjectList">
                        <li v-if="item.Name == 'Ppublicspec'">
                            <span>家政服务人员种类</span>
                            <span>{{item.Items[0].timetyres}}</span>
                        </li>
                        <div v-if="item.Name == 'Employees'" v-for="_item in item.Items">
                            <li >
                                <span>姓名</span>                            
                                <span>{{_item.isrdName}}</span>
                            </li>      
                            <li>
                                <span>证件号</span>
                                <span>{{_item.isrdCretCode}}</span>
                            </li>                        
                        </div>
                        
                    </ul>                            
                </div> 
    </div>
</template>
<script>
import "./../../assets/css/pingan.scss";
export default {
    data(){
        return{
           typeCode:[{name:'居民身份证',code:'IdCard'},{name:'统一社会信用代码',code:'CreditCode'},{name:'港澳居民来往内地通行证',code:'MacHKerPassport'},{name:'台胞证',code:'TaiwanesePassport'},{name:'士兵证/军官证/警官证',code:'Soldier'},{name:'中国护照',code:'ChinaPassPort'},
			{name:'港澳身份证',code:'GAIdCard'},{name:'外国人永久居留身份证',code:'ForeignForeverIdCard'},{name:'机构代码',code:'Organization'},{name:'其他',code:'Other'}],
        }
    },
    props:["resultList"],
    mounted(){
          if(this.resultList.orderDetail.ApplicantList instanceof Array){
                this.resultList.orderDetail.ApplicantList.map(item=>{
                    this.typeCode.map(_item=>{
                        if(_item.code == item.CertificateType){
                            this.$set(item,'CertificateName',_item.name); 
                        }
                    })
                    })
            }    
        // console.log(this.orderRes);
    }

}
</script>
<style scoped >
 .orderStatus{
    padding:0.3rem ;
    background: #ffffff;
    min-height: 1rem;
 }
 .orderStatus h3{
    font-size: 14px;
 }
 .orderStatus span{
    color: #999;
    font-size: 12px;
 }
 .orderStatus .display{
    float: left;
    margin-left: 0.2rem;
    max-width: 80%; 
 }
 .orderStatus .display p{
     color: #999;
     font-size: 12px;
 } 
 .orderDetail{
    background: #ffffff;
    margin-top: 0.2rem;
    padding:0.3rem;
 }
  .orderDetail p{
    font-size: .32rem;
    font-weight: 700;
    display: inline-block;
    /* height: .9rem; */
    color: #222;
    font-family: PingFangSC-Semibold;
  }
  .orderDetail ul{
      margin-top: 0.2rem;
  }
  .orderDetail ul:nth-child(1){
      margin-top: 0;
  }

 .orderDetail ul li{ 
    font-size: 14px;   
    color: #333333;
    line-height: 0.5rem;    
 }
 .orderDetail ul li span:nth-child(2){ 
    color: #999999;
 }
 .orderDetail ul li span{
     display: inline-block;
 }
 .orderDetail ul li span:nth-child(1){ 
    width: 1.8rem;
 }
 .orderDetail ul li span:nth-child(2){ 
    color: #999999;
 }
 .checkInform{
    border-top: 1px solid #eee;
    padding-top: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;    
    background: #fff;
    padding-bottom: 10px;
 }
 .footer_btn{
    padding: 10px;
    border: 1px solid #eee;
    margin-right: 5px;
    border-radius: 5px;
 }
 .orderDetail h4{
     line-height: 0.6rem;
 }
 
 
</style>