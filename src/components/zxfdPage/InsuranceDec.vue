<template>
  <div style="background:#f5f5f5;">
    <div style="background:#fff;">
      <div class="insuranceTextBox">
        <h3 style="margin-top: 30px;">投保声明</h3>
        <p class="t52">1.本投保人兹声明各项投保内容填写属实，各项投保选项确认无误。</p>
        <p class="t52" >2.本投保人已阅读该产品详细条款，且本投保人已详细了解条款的各项具体内容，特别对该条款中有关免除保险人责任的条款（包括但不限于责任免除、投保人及保险人义务）及付费约定的内容，完全理解并同意投保。</p>
        <p class="t52" v-show="distributorCode == 'SZFDKJ'">3.本投保人清楚明白，本投保人系通过房咚科技公司（指深圳房咚科技有限公司）所有的房咚有米APP推荐，获得该产品相关资讯。</p>
        <p class="t52" v-show="distributorCode == 'CCWY'">3.本投保人清楚明白，本投保人系通过深圳市长藤科技有限公司所有的“业主卡（公众号）”推荐，获得该产品相关资讯。</p>

        <p class="t52">4.本人同意提供给{{companyName}}、产品承销方中兴保险经纪公司（指北京中兴保险经纪有限公司）、保险公司（产品提供方）的信息，及本人成功投保后的产品及服务信息（包括本单证签署之前提供和生产的），可用于{{companyName}}、中兴保险经纪公司及因服务必要而委托的第三方为本人提供服务及推荐产品，法律禁止的除外。{{companyName}}、中兴保险经纪公司及其委托的第三方对上述信息负有保密义务。</p>
<!-- 
        <p style="color:#999; padding-top:.3rem;">
          注：保险期间不足一个月的部分按一个月计收。
          <br />短期费率=年费率×保险期间对应的年费率的百分比
        </p> -->
      </div>
    </div>
  </div>
</template>
<script>
import "./../../assets/css/zxfd/base.scss";
export default {
      data(){
        return{
          isFDKJ:true,
          isZXZY:true,
          isCCWY:false,
          distributorCode:'',
          companyName:''
        }
      },
      created(){
        if(sessionStorage.getItem('distributorCode')){
            this.distributorCode =  sessionStorage.getItem('distributorCode');
            var distributorCode =  sessionStorage.getItem('distributorCode');
            if(distributorCode == 'SZFDKJ'){
              this.isFDKJ = true;
              this.isZXZY = false;
              this.isCCWY = false;
              this.companyName = '房咚科技公司'
            }else  if(distributorCode == 'CCWY'){
              this.isFDKJ = false;
              this.isZXZY = false;
              this.isCCWY = true;
              this.companyName = '长藤科技公司'
            }else if(distributorCode == 'ZXZY'){
              this.isFDKJ = false;
              this.isZXZY = true;
              this.isCCWY = false;
               this.companyName = ''
            }
        }
  
      }

};
</script>
   <style scoped>
.base_msg_box > div > a.sbtn {
  color: #333;
  background: linear-gradient(
    90deg,
    rgba(255, 226, 59, 1) 0%,
    rgba(255, 213, 0, 1) 100%
  );
  box-shadow: 0px 2px 5px 0px rgba(255, 192, 0, 0.7);
  border-radius: 0.8rem;
  width: 80%;
  margin: 0.3rem auto;
}
.base_msg_box > h3 {
  padding-top: 0.45rem;
  font-size: 0.36rem;
}
.insuranceTab tr td {
  width: 7.6%;
}
</style>
