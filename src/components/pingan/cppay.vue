<template>
    <div :style="wrppera">
       <div class="col_9">
           <span>支付信息</span>
       </div>
       <div class="payInfo bgFF">
           <div class="pad_l1">
               <p class="bor_bot pad_tb1 over_hid">
                   <span class="col_6 ver_al_t">
                       商品名称
                   </span>
                   <span class="flo_r pad_r1 col_3 max_wid70 dis_inlb">
                       {{orderRes.productName}}
                   </span>
               </p>
           </div>

            <div class="pad_l1">
               <p class="bor_bot pad_tb1 over_hid">
                   <span class="col_6 ver_al_t">
                       客户名称
                   </span>
                   <span class="flo_r pad_r1 col_3 max_wid70 dis_inlb">
                       {{orderRes.orderDetail.Insurant.Name}}
                   </span>
               </p>
           </div>

            <div class="pad_l1">
               <p class="bor_bot pad_tb1 over_hid">
                   <span class="col_6 ver_al_t">
                       支付订单号
                   </span>
                   <span class="flo_r pad_r1 col_3 max_wid70 dis_inlb">
                       {{orderNo}}
                   </span>
               </p>
           </div>

            <div class="pad_l1">
               <p class="bor_bot pad_tb1 over_hid">
                   <span class="col_6 ver_al_t">
                       应付金额
                   </span>
                   <span class="flo_r pad_r1 col_f8 max_wid70 dis_inlb">
                       {{'￥' + orderRes.amount}}
                   </span>
               </p>
           </div>
       </div>
       <div class="payTypeWrap">
           <div class=" col_9">
               <span >
                   请选择支付方式
               </span>
           </div>
           <div class="bgFF">
                <div id="btnWapWeixin" class="over_hid pad_l1">
                    <div class="dis_fl pad_tb6 bor_bot">
                        <div class="flo_l pay_img wx_pay"></div>
                        <div class="flex1">
                            <span>微信支付</span>
                            </div>
                            <span class="item_select cbx_cked"></span>
                        </div>
                </div>
                <!-- <div id="unpPayBtn" class="over_hid pad_l1">
                    <div class="dis_fl pad_tb6 bor_bot">
                        <div class="flo_l pay_img unp_pay"></div>
                        <div class="flex1">
                            <span>银联云闪付</span><br>
                            <span class="cloudPayAdvert hide" style="color:#FF2B2B;font-size:12px;">(云闪付<span class="cloudPayDiscount"></span>折,最高优惠<span class="cloudPayAmout"></span>元)</span>
                        </div>
                            <span class="item_select cbx_unck"></span>
                        </div>
                        </div> -->
           </div>

           <div class="btnContent" style="margin-top: 3rem;">
               <div class="nextBtn bgcol_f8" @click="topay">
                   下一步
               </div>
              <div class="text_c backBtn">
							<span id="backToDetail" class="backBtn_span">
								<span class="l_jian">
                                    <!-- <van-icon name="arrow-left" />  -->
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
								<span>返回</span>
							</span>
				</div>
           </div>
          
       </div>
    </div>
</template>
<script>
import "./../../assets/css/pingan.scss";
import "./../../assets/js/rem.js";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
export default {
    data(){
        return{
            wrppera:{
                "minHeight":"650px"
            },
            orderRes:{},
            orderNo:'',
            payUrl:''

        }
    },
    mounted(){
        var h = window.innerHeight;
        this.wrppera.minHeight = h  + 'px';
         var orderNo = this.$route.query.orderNo;
        this.orderNo = orderNo;
        axiosGetAPI('/PropertyProducts/PAIC-HK-CZWY/Order/' + orderNo).then(res=>{
           if(res.status == 200){
               this.orderRes = res.result;
           }
       })
       axiosGetAPI('/PropertyProducts/PAIC-HK-CZWY/Order/'+ orderNo + '/Payment').then(res=>{
           if(res.status == 200){
               this.payUrl = res.result.payUrl;
           }
       })
    //    GET /PropertyProducts/{productCode}/Order/{orderNo}/Payment
    },
    methods:{
        topay(){
            window.location.href = this.payUrl; 
        }
    }
    
}
</script>
<style scoped>
/* .header {
    font-size: 0.26rem;
    height: 0.75rem;
    line-height: 0.75rem;
} */
.col_9{
     color: #999999;
     padding-left: 0.3rem;
     background: #f2f2f2;
     font-size: 0.26rem;
    height: 0.75rem;
    line-height: 0.75rem;
}

.bgFF {
    background-color: #FFFFFF;
    font-size: 0.32rem;
}
.pad_tb1 {
    height: 1rem;
    line-height: 1rem;
}
.pad_l1 {
    padding-left: .3rem;
}
.bor_bot {
    border-bottom: 1px solid #EEEEEE;
}
.ver_al_t {
    vertical-align: top;
}
.col_6 {
    color: #666666;
}
.flo_r {
    float: right;
}
.dis_inlb {
    display: inline-block;
}
.max_wid70 {
    max-width: 70%;
}
.col_3 {
    color: #333333;
}
.pad_r1 {
    padding-right: .3rem;
}
.col_f8 {
    color: #FF8208;
}
.dis_fl {
    display: flex;
    align-items: center;
    position: relative;
}
.wx_pay {
    background: url(//epcis-nps.pingan.com.cn/epcis_nps/cpc/images/springImg.png) no-repeat center center;
    background-position: -142px 0px;
}
.pad_tb6 {
    padding: 0.2rem 0;
}
.pay_img {
    width: 37px;
    height: 37px;
    margin-right: 0.3rem;
    margin-left: 0.1rem;
    line-height: 1rem;
}
.flo_l {
    float: left;
}
.item_select {
    position: absolute;
    height: 0.33rem;
    width: 0.33rem;
    right: 0.33rem;
    top: 0.41rem;
}

.cbx_cked {
    background: url(//epcis-nps.pingan.com.cn/epcis_nps/cpc/images/springImg.png) no-repeat center center;
    background-position: -17px -177px;
}

.btnContent{
    padding: 0.33rem 0.33rem 0.67rem;
}

.bgcol_f8 {
    background-color: #FF8208;
}
.nextBtn {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    border-radius: 4px;
    text-align: center;
    font-size: 0.32rem;
    color: #fff;
    background-color: #FF8208
}
.backBtn {
    font-size: .32rem;
    height: 0.9rem;
    line-height: 0.9rem;
    margin-top: 0.33rem;
}
.backBtn_span {

    display: inline-block;
    padding: 0 0.15rem;
    box-sizing: border-box;

}
.l_jian{
        background: url('../../assets/images/pingan/l_jian.png') no-repeat center center;
}

.text_c {
    text-align: center;
}


</style>