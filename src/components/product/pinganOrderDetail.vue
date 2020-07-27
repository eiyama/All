<template>
    <div>
        <!-- 店家保 -->
            <div v-if=" orderRes.productCode == 'PAIC-HK-DJB'" >
                <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            
                            投保商户（被保人）
                        </span>   
                </div>
                <div  >                   
                    <div class="cell-container">
                        <span class="fl">店铺名称</span>
                        <span class="fr">{{orderRes.orderDetail.Insurant.Name}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">证件号</span>
                        <span class="fr">{{orderRes.orderDetail.Insurant.CertificateNo}}</span>
                    </div>
                     <div class="cell-container">
                        <span class="fl">详细地址</span>
                        <span class="fr">{{orderRes.orderDetail.AreaName + orderRes.orderDetail.Insurant.Address}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">联系人</span>
                        <span class="fr">{{orderRes.orderDetail.Insurant.LinkManName}}</span>
                    </div>
                      <div class="cell-container">
                        <span class="fl">手机号</span>
                        <span class="fr">{{orderRes.orderDetail.Insurant.MobileTelephone}}</span>
                    </div>
                      <div class="cell-container">
                        <span class="fl">邮箱</span>
                        <span class="fr">{{orderRes.orderDetail.Insurant.Email}}</span>
                    </div>
                      <div class="cell-container">
                        <span class="fl">保障人数</span>
                        <span class="fr">{{orderRes.orderDetail.TargetObject.AccidentInsuranceNum}}</span>
                    </div>        
                </div>
            </div>
             <div class="m20" style="padding-bottom:0;">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            
                            投保人
                        </span>
                        <div class="_scheme-detail" v-show="orderRes.orderDetail.Insurant.CertificateNo == orderRes.orderDetail.Applicant.CertificateNo">
                            <p style=" font-size: .28rem;color: #666">同被保人</p>
                        </div>
                </div>
                 <div  v-show="orderRes.orderDetail.Insurant.CertificateNo != orderRes.orderDetail.Applicant.CertificateNo">
                    <div class="cell-container">
                        <span class="fl">名称</span>
                        <span class="fr">{{orderRes.orderDetail.Applicant.Name}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">证件号</span>
                        <span class="fr">{{orderRes.orderDetail.Applicant.CertificateNo}}</span>
                    </div>
                     <div class="cell-container">
                        <span class="fl">详细地址</span>
                        <span class="fr">{{ orderRes.orderDetail.Applicant.Address}}</span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">联系人</span>
                        <span class="fr">{{orderRes.orderDetail.Applicant.LinkManName}}</span>
                    </div>
                      <div class="cell-container">
                        <span class="fl">手机号</span>
                        <span class="fr">{{orderRes.orderDetail.Applicant.MobileTelephone}}</span>
                    </div>
                      <div class="cell-container">
                        <span class="fl">邮箱</span>
                        <span class="fr">{{orderRes.orderDetail.Applicant.Email}}</span>
                    </div>      
                </div>
            </div>

            <div class="m20" style="padding-bottom:0;">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            
                            受益人
                        </span>                        
                </div>
                <div class="cell-container">
                            <p style=" font-size: .28rem;color: #666">同被保人</p>
                        </div>
            </div>
             <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            
                           发票
                        </span>
                </div>
                <div class="cell-container">
                    <span class="fl">发票类型</span>
                    <span class="fr">{{orderRes.orderDetail.Invoice.PrintType == '03' ? '电子发票/增值税专用发票' : '不开发票' }}</span>
                </div>
                <div class="cell-container" v-show="orderRes.orderDetail.Invoice.PrintType == '03'" >
                    <span class="fl">纳税人识别码</span>
                    <span class="fr">{{orderRes.orderDetail.Invoice.TaxPayerNo}}</span>
                </div>
             </div>
             <div class="m20" style="margin-bottom: 0;">
                    <div class="product-title">
                        <span class="cell-title title-bold">                            
                            保障人员清单
                        </span>
                    </div>
                   <div class="cell-container">
                        <span class="fl">姓名</span>
                        <span class="fr">身份证号</span>
                    </div>
                     <div class="cell-container" v-for="item in orderRes.orderDetail.TargetObject.AcplPersonnels">
                        <span class="fl">{{item.Name}}</span>
                        <span class="fr">{{item.CertificateNo}}</span>
                    </div>                     
             </div> 
            </div>  
            <!-- 车主、货运无忧 -->   
            <div v-else>
                 <div class="m20">
                    <div class="product-title">
                            <span class="cell-title title-bold">
                                
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
                                
                                受益人
                            </span>                                                 
                    </div>
                    <div class="cell-container">
                            <p style=" font-size: .28rem;color: #666">同被保人</p>
                    </div>  
                </div>
                <div class="m20">
                    <div class="product-title">
                            <span class="cell-title title-bold">
                                
                            发票
                            </span>
                    </div>
                    <div class="cell-container">
                        <span class="fl">发票类型</span>
                        <span class="fr">{{orderRes.orderDetail.Invoice.PrintType == '03' ? '电子发票' :  '不开发票' }}</span>
                    </div>
                    <div class="cell-container" v-show="orderRes.orderDetail.Invoice.PrintType == '03'" >
                        <span class="fl">纳税人识别码</span>
                        <span class="fr">{{orderRes.orderDetail.Invoice.TaxPayerNo}}</span>
                    </div>

                </div>
                <div class="m20" style="margin-bottom: 0;">
                        <div class="product-title">
                            <span class="cell-title title-bold">
                                
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
            </div>  
    </div>
</template>
<script>
import "./../../assets/css/pingan.scss";
export default {
    data(){
        return{
           
        }
    },
    props:["orderRes"],
    mounted(){
        // console.log(this.orderRes);
    }

}
</script>
<style scoped >
.m20{
    margin-bottom: .2rem;
    background: #ffffff;
    padding-bottom: 0.2rem;
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
.cell-container {
    font-size: .28rem;
    background: #FFF;
    line-height: .56rem;
    color: #666666;
    height: 0.56rem;
    padding: 0 0.3rem;
}
.title-bold {
    font-size: .3rem;
    font-weight: 700;
    display: inline-block;
    height: .9rem;
    color: #222;
    font-family: PingFangSC-Semibold;
}
 
</style>