<template>
    <div class="" style="    padding: 1rem 0 1.5rem 0;">
        <mt-header fixed class="def-header cust-head" title="订单详情">
            <div slot="left">
                <mt-button icon="back" @click="openBack"></mt-button>
            </div>             
        </mt-header> 
        <div  >
            <div>            
                <div class="orderStatus" v-show="resultList.status == 'SuccessfulRelease' || resultList.status == 'EPolicyGenerated'">
                    <img style="width:0.6rem;float:left;margin-top: 0.2rem;" src="../../assets/images/insurance_2/paySuccess.png" alt />
                    <div class="display">
                        <h3>{{resultList.statusDisplay}}</h3> 
                        <p>{{resultList.remark}}</p>
                        <p>订单编号：{{resultList.orderNo}}</p>                    
                    </div>    
                    <div class="clear"></div>            
                </div>
                <div class="orderStatus" v-show="resultList.status == 'PendingPayment'">
                    <img style="width:0.6rem;float:left;margin-top: 0.2rem;" src="../../assets/images/insurance/invalid_icon.png" alt />
                    <div class="display">
                        <h3>{{resultList.statusDisplay}}</h3>          
                        <p>{{resultList.remark}}</p>
                        <p>订单编号：{{resultList.orderNo}}</p>                             
                    </div>                
                    <div class="clear"></div>            
                </div>
                <div class="orderStatus" v-show="resultList.status  == 'Cancel' || resultList.status  == 'Expire'" >
                    <img style="width:0.6rem;float:left;margin-top: 0.2rem;" src="../../assets/images/insurance/lose-icon.png" alt />
                    <div class="display">
                        <h3>{{resultList.statusDisplay}}</h3>          
                        <p>{{resultList.remark}}</p> 
                        <p>订单编号：{{resultList.orderNo}}</p>                             
                    </div>                
                    <div class="clear"></div>            
                </div>              
            </div>          
            <div class="orderDetail">
                <p>保障详情</p>
                <ul>
                    <li style="display: flex;">
                        <span>产品</span>
                        <span class="van-ellipsis">{{resultList.productName}}</span>
                    </li>                  
                    <li>
                        <span>保险期间</span>
                        <span>{{duringTime}}</span>
                    </li>
                    <li>
                        <span>起保时间</span>
                        <span>{{resultList.startDate}}</span>
                    </li> 
                    <li>
                        <span>终止时间</span>
                        <span>{{resultList.endDate}}</span>
                    </li>
                    <li>
                        <span>合计保费 </span>
                        <span style="color:#f44">{{resultList.amount}}元</span>
                    </li>                    
                </ul>                            
            </div>
            <div  v-show="isExtend" v-if="resultList.insCorpCode == 'pingan'" style="margin-top:0.2rem">
                <!-- 平安产品投保模型不一样展示不一样 -->
                <pinganOrderDetail :orderRes="orderRes"></pinganOrderDetail>
            </div>
            <div  v-show="isExtend" v-else-if="resultList.insCorpCode == 'cpic'">
                    <cpicorderDetail :resultList="resultList"></cpicorderDetail>
            </div>
            <div v-else v-show="isExtend" >            
                <div class="orderDetail" v-if="resultList.orderDetail && resultList.orderDetail.ApplicantList.length ">
                    <p>投保人信息</p>
                    <ul>
                        <li>
                            <span>名称</span>
                            <span>{{resultList.applicantName}}</span>
                        </li>
                        <li>
                            <span>证件类型</span>                            
                            <span>{{resultList.orderDetail.ApplicantList[0].CertificateName}}</span>
                        </li>
                        <li>
                            <span>证件号码</span>
                            <span>{{resultList.orderDetail.ApplicantList[0].CertificateNo}}</span>
                        </li>
                        <li v-show="resultList.orderDetail.ApplicantList[0].BirthDate">
                            <span>出生日期</span>
                            <span>{{resultList.orderDetail.ApplicantList[0].BirthDate}}</span>
                        </li> 
                        <li>
                            <span>性别</span>
                            <span>{{resultList.orderDetail.ApplicantList[0].Gender == 0 ? '男' : '女'}}</span>
                        </li>
                        <li>
                            <span>手机号码 </span>
                            <span>{{resultList.orderDetail.ApplicantList[0].MobileTelephone}}</span>
                        </li>  
                        <!-- <li>
                            <span>电子邮箱 </span>
                            <span>{{resultList.orderDetail.ApplicantList[0].Email}}</span>
                        </li>   -->
                        <li v-if="resultList.orderDetail.ApplicantList[0].Address">
                            <span>居住地</span>
                            <span>{{resultList.orderDetail.ApplicantList[0].Address}}</span>
                        </li>            
                    </ul>                            
                </div>
                <div class="orderDetail"  v-if="resultList && resultList.orderDetail && resultList.orderDetail.InsurantList.length" >
                    <p>被保人信息</p>                
                    <ul v-for="item in resultList.orderDetail.InsurantList">
                        <li resultList.orderDetail.Insurant.RelationshipWithPolicyholder><span>与投保人关系</span> <span>{{item.RelationshipWithPolicyholder == 1 ? '本人' : item.RelationshipWithPolicyholder == 2 ? '父母' : item.RelationshipWithPolicyholder == 3 ? '子女' : '配偶' }}</span></li>
                        <li>
                            <span>名称</span>
                            <span>{{item.Name}}</span>
                        </li>
                        <li>
                            <span>证件类型</span>
                            <span>{{item.CertificateName}}</span>

                        </li>
                        <li>
                            <span>证件号码</span>
                            <span>{{item.CertificateNo}}</span>
                        </li>
                        <li v-show="item.BirthDate">
                            <span>出生日期</span>
                            <span>{{item.BirthDate}}</span>
                        </li> 
                        <li>
                            <span>性别</span>
                            <span>{{item.Gender == 0 ? '男' : '女'}}</span>
                        </li>
                        <li>
                            <span>手机号码 </span>
                            <span>{{item.MobileTelephone}}</span>
                        </li>  
                        <!-- <li v-if="item.Email">
                            <span>电子邮箱 </span>
                            <span>{{item.Email}}</span>
                        </li>                                 -->
                    </ul>                            
                </div>            
            </div>  
            
            <!--  -->
            <div class="checkInform" @click="isExtend = !isExtend">
                <span style="margin-right:0.1rem;">{{ isExtend ? "收起完整信息"  : "查看完整信息" }}</span>   
                <van-icon v-if="!isExtend" color="#999" name="arrow-down" />                            
                <van-icon v-if="isExtend" color="#999" name="arrow-up" />                            
            </div>  
          
        </div>
        <div class="new_footer" style="  text-align: right;">
            <span class="footer_btn" v-show="resultList.status == 'PendingPayment'" @click="toPay" >去付款</span>
            <span class="footer_btn" v-show="resultList.status == 'Cancel' || resultList.status == 'Expire' " @click="deleteOrder" >删除订单</span>
            <span class="footer_btn" v-show="resultList.status == 'Expire'" @click="toInsurance">再次投保</span>
        </div>
    </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI , axiosDeleteAPI } from "./../../common/Axios";
import pinganOrderDetail from "./pinganOrderDetail";
import cpicorderDetail from "./cpicorderDetail"
import { Toast, Indicator } from "mint-ui";
import "./../../assets/css/product.scss";
export default {
    data(){
        return{ 
            orderNo:'',
            resultList:[],
            isExtend:false,
            duringTime:'1年',
            isArray:false,
            orderRes:{},
            prodectArr:[],
            typeCode:[{name:'居民身份证',code:'IdCard'},{name:'统一社会信用代码',code:'CreditCode'},{name:'港澳居民来往内地通行证',code:'MacHKerPassport'},{name:'台胞证',code:'TaiwanesePassport'},{name:'士兵证/军官证/警官证',code:'Soldier'},{name:'中国护照',code:'ChinaPassPort'},
			{name:'港澳身份证',code:'GAIdCard'},{name:'外国人永久居留身份证',code:'ForeignForeverIdCard'},{name:'机构代码',code:'Organization'},{name:'其他',code:'Other'}],
        }
    },
    methods: {
     openBack(){
         this.$router.back();
     },
      toPay() {
        this.$router.push({ path:  "payPage?productCode=" + this.resultList.productCode + "&orderNo=" + this.resultList.orderNo });
    },
    deleteOrder(){
        axiosDeleteAPI('/UsersOrder/Delete?id=' + this.$route.query.id).then(res=>{
            if(res.status == 200){
                Toast('删除成功');
                this.openBack();
            }
        })
    },
    toInsurance(){
        var id = '';
        this.prodectArr.map(i=>{
            if(this.resultList.productCode == i.code){
                id = i.id;
            }
        })
        if(this.resultList.productCode == 'PAIC-HK-DJB'){
                this.$router.push({path:"/pingan/storeIndex?productCode=" + this.resultList.productCode + "&orderNo=" + this.resultList.orderNo + '&id=' + id  });
          }else if (this.resultList.productCode ==  'PAIC-HK-HYWY'){
              this.$router.push({path:"/pingan/freightIndex?productCode=" + this.resultList.productCode + "&orderNo=" + this.resultList.orderNo + '&id=' + id  });
          }else if (this.resultList.productCode ==  'PAIC-HK-CZWY'){
              this.$router.push({path:"/pingan/insureIndex?productCode=" + this.resultList.productCode + "&orderNo=" + this.resultList.orderNo + '&id=' + id  });
          }else{
                this.$router.push({path:"insuranceIndex?productCode=" + this.resultList.productCode + "&orderNo=" + this.resultList.orderNo + '&id=' + id  });
          }
    }
  },
  components:{
      pinganOrderDetail,
      cpicorderDetail
  },
  created() {
      var self = this;
      if(this.$route.query.orderNo){
          this.orderNo = this.$route.query.orderNo;
      }
        Indicator.open('加载中');
        axiosGetAPI('/UsersOrder/Detailed?orderNo=' + this.orderNo).then(res=>{
        Indicator.close();
            if(res.status == 200){
                this.resultList = res.result;
                var data = this.Common.Public.countData(res.result.startDateStr,res.result.endDateStr);
                if(data > 300){
                    this.duringTime = '1年'
                }else if(data > 30 && data < 364){
                    this.duringTime = parseInt(data / 30) + '个月';                     
                }else{
                    this.duringTime = data + 1 + '天'
                }
                this.orderRes = res.result;               
                if(res.result.orderDetail.ApplicantList instanceof Array){
                    self.resultList.orderDetail.ApplicantList.map(item=>{
                        self.typeCode.map(_item=>{
                            if(_item.code == item.CertificateType){
                                self.$set(item,'CertificateName',_item.name); 
                            }
                        })
                     })
                }                                
                if(res.result.orderDetail.InsurantList instanceof Array){
                  self.resultList.orderDetail.InsurantList.map(item=>{
                    self.typeCode.map(_item=>{
                        if(_item.code == item.CertificateType){
                            if(res.result.productCode == 'ZHONGAN-AM98' && item.CertificateType == 'Other'){
                                self.$set(item,'CertificateName',"出生证"); 
                            }else{
                                self.$set(item,'CertificateName',_item.name); 
                            }                                
                            }
                        })
                     })
                }
            }
        }) 
  },
  mounted() {
      var self = this;
    if(!sessionStorage.getItem('prodectArr')){
        Indicator.open('加载中...');
        axiosGetAPI('/li/products', param).then((res) => {
          Indicator.close();
          if (res.result) {      
            self.prodectArr = res.result;   
            sessionStorage.setItem('prodectArr',JSON.stringify(res.result));    
          }
        });
    }else{
        self.prodectArr = JSON.parse(sessionStorage.getItem('prodectArr'));   
    }
  }

}
</script>
<style scoped>
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
    font-size: .3rem;
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