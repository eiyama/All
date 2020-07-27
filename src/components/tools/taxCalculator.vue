<template>
  <div style="background-color:#FFF;height:820px">
    <mt-header fixed class="def-header" title="计税器">
      <div slot="left">
        <mt-button icon="back" @click="openBack" v-show="false"></mt-button>
      </div>
      <div slot="right" @click="closeHome">
        <img :src="closeImg" style="width: 18px;height: 18px;" >
      </div>
    </mt-header>
    <div style="padding-top:48px">
      <van-cell-group>
        <van-field v-model="income" center clearable type="number" label="收入" placeholder="请输入金额" >
          <van-button slot="button" size="small" type="danger" round @click="calculator">计算</van-button>
        </van-field>
        <van-field v-model="afterTaxIncome" center type="number" label="税后工资" input-align="right" readonly />
        <van-field v-model="excludingTaxIncome" center type="number" label="不含税收入" input-align="right" readonly/>
        <span style="padding-left:15px;font-size:10px;color:#999">*不含税收入=收入/1.03</span>
        <hr width="100%" color="#f5f5f5" size="1" style="margin-left:15px" />
        <van-field v-model="addedValueTax" center type="number" label="增值税" input-align="right" readonly />
        <span style="padding-left:15px;font-size:10px;color:#999">*不含税收入<=3万，免征增值税; >3万计征3%</span>
        <hr width="100%" color="#f5f5f5" size="1" style="margin-left:15px" />
        <van-field v-model="vatTax" center type="number" label="增值税附加" input-align="right" icon="question-o" @click-icon="openVatTax" readonly />
        <van-field v-model="personalTax" center type="number" label="个人所得税" input-align="right" icon="question-o" @click-icon="openPersonalTax" readonly />
        <van-field v-model="totalTax" center type="number" label="纳税合计" input-align="right" readonly />
      </van-cell-group>
      <div style="margin-top:30px;padding:10px;background-color:#f5f5f5">
        <span style="font-size:15px;">税率表</span>
        <table class="mint-table" cellpadding="0" cellspacing="0" style="margin-top:10px">
          <tr style="background-color:white;">
            <td>级数</td>
            <td>每次应纳税所得额<br>（含税级距）</td>
            <td>不含税级距</td>
            <td>税率</td>
            <td>速算扣除数</td>
          </tr>
          <tr style="background-color:white;">
            <td>1</td>
            <td>不超过20000元的</td>
            <td>不超过16000元的</td>
            <td>20%</td>
            <td>0</td>
          </tr>
          <tr style="background-color:white;">
            <td>2</td>
            <td>超过20000元至50000元的部分</td>
            <td>超过16000元至37000元的部分</td>
            <td>30%</td>
            <td>2000</td>
          </tr>
          <tr style="background-color:white;">
            <td>3</td>
            <td>超过50000元的部分</td>
            <td>超过37000元的部分</td>
            <td>40%</td>
            <td>7000</td>
          </tr>
        </table>
      </div>
      <mt-popup v-model="showVatTax" position="middle" popup-transition="popup-fade" style="width:90%;height:40%;border-radius:5px">
        <div class="taxmessagecc">
          <mt-header fixed class="def-header" title="增值税附加"  style="border-radius:5px">
            <div slot="right" @click="closeVatTax">
              <img :src="closeImg" style="width: 18px;height: 18px;" >
            </div>
          </mt-header>
          <div style="padding-top:48px;padding-left:15px;padding-right:15px">
            <hr width="100%" color="#f5f5f5" size="1" style="margin-bottom:10px" />
            <p style="font-size:15px;color:#333">城建税</p>
            <p style="font-size:12px;color:#999;">增值税 * 7%</p>
            <hr width="100%" color="#f5f5f5" size="1" style="margin-top:10px;margin-bottom:10px" />
            <p style="font-size:15px;color:#333">教育费附加</p>
            <p style="font-size:12px;color:#999;">不含税收入<= 10万免, 大于10万征收增值税*3%</p>
            <hr width="100%" color="#f5f5f5" size="1" style="margin-top:10px;margin-bottom:10px" />
            <p style="font-size:15px;color:#333">地方教育费附加</p>
            <p style="font-size:12px;color:#999;">不含税收入<= 10万免, 大于10万征收增值税*2%</p>
            <hr width="100%" color="white" size="1" style="margin-top:10px" />
          </div>
        </div>
      </mt-popup>
      <mt-popup v-model="showPersonalTax" position="middle" popup-transition="popup-fade" style="width:90%;height:50%;border-radius:5px">
        <div class="taxmessagecc">
          <mt-header fixed class="def-header" title="个人所得税"  style="border-radius:5px">
            <div slot="right" @click="closePersonalTax">
              <img :src="closeImg" style="width: 18px;height: 18px;" >
            </div>
          </mt-header>
          <div style="padding-top:48px;padding-left:15px;padding-right:15px">
            <hr width="100%" color="#f5f5f5" size="1" style="margin-bottom:10px" />
            <p style="font-size:15px;color:#333">扣除40%展业成本，应税所得</p>
            <p style="font-size:12px;color:#999;">(不含税收入 - 增值税附加) * ( 1 - 40%)</p>
            <hr width="100%" color="#f5f5f5" size="1" style="margin-top:10px;margin-bottom:10px" />
            <p style="font-size:15px;color:#333">扣除40%展业成本，应税所得</p>
            <p style="font-size:12px;color:#999;">1. 应税所得<=4000, 减除800</p>
            <p style="font-size:12px;color:#999;">2. >4000, 减除20%</p>
            <hr width="100%" color="#f5f5f5" size="1" style="margin-top:10px;margin-bottom:10px" />
            <p style="font-size:15px;color:#333">个人所得税应税收入</p>
            <p style="font-size:15px;color:#333">个人所得税税率(%)</p>
            <p style="font-size:15px;color:#333">速算扣除数</p>
            <p style="font-size:12px;color:#999;">1. 应税所得<=4000;</p>
            <p style="font-size:12px;color:#999;">所得税=(应税所得-800)*20%</p>
            <p style="font-size:12px;color:#999;">2. 应税所得>4000;</p>
            <p style="font-size:12px;color:#999;"> 所得税= 应税所得*(1-20%)*适用税率-速算扣除数</p>
            <p style="font-size:12px;color:#999;">(1)应税收入<=2万, 适用税率20%,速算扣除数0;</p>
            <p style="font-size:12px;color:#999;">(2)5万=>应税收入>2万, 适用税率30%,速算扣除数2000;</p>
            <p style="font-size:12px;color:#999;">(3)应税收入>5万, 适用税率40%,速算扣除数7000;</p>
            <hr width="100%" color="white" size="1" style="margin-top:10px" />
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  name: 'defaultPage',
  data() {
    return {
      defaultImg: this.src = require('../../assets/images/img-comingsoon.png'),
      closeImg: this.src = require('../../assets/images/ico-close.png'),
      income: '',
      excludingTaxIncome: 0.00,
      addedValueTax: 0.00,
      vatTax: 0.00,
      totalTax: 0.00,
      personalTax: 0.00,
      showVatTax:false,
      showPersonalTax:false,
      afterTaxIncome:0.00,
      taxableIncome:0.00
    }
  },
  methods: {
    onBlur: function() {

    },
    openBack: function() {
      window.history.back();
    },
    closeHome: function() {
      window.history.back();
    },
    openVatTax: function() {
      this.showVatTax = true;
    },
    closeVatTax: function() {
      this.showVatTax = false;
    },
    openPersonalTax: function() {
      this.showPersonalTax = true;
    },
    closePersonalTax: function() {
      this.showPersonalTax = false;
    },
    calculator:function(){
      if (this.income == null || this.income == '') {
        Toast('请输入金额');
        return;
      };

      //不含税收入
      var eTaxIncome = this.income/1.03;
      this.excludingTaxIncome = this.numFilter(eTaxIncome);
      //增值税
      if (eTaxIncome > 30000) {
        this.addedValueTax = this.numFilter(eTaxIncome * 0.03);
      }else{
        this.addedValueTax = 0.00;
      }

      //增值税附加
      this.vatTax = this.numFilter(this.addedValueTax * 0.07);
      if (eTaxIncome > 100000) {
         this.vatTax += eTaxIncome * 0.05;
      }
      this.vatTax = this.numFilter(this.vatTax);

      //个人所得税
      this.taxableIncome = (this.income - this.addedValueTax - this.vatTax) * 0.6;
      var tempIncome;
      if (this.taxableIncome <= 4000 && this.taxableIncome >= 800) {
        tempIncome = this.taxableIncome - 800;
      } else if(this.taxableIncome > 4000){
        tempIncome = this.taxableIncome * 0.8;
      }
      this.personalTax = this.numFilter(0.00);
      if (this.taxableIncome <= 4000 && this.taxableIncome >= 800) {
        this.personalTax = tempIncome * 0.2;
      } else if(this.taxableIncome > 4000){
        if (this.income > 30000) {
          if(this.income <= 50000){
            this.personalTax = tempIncome * 0.3 - 2000;
          } else{
            if(this.taxableIncome <= 20000){
              this.personalTax = tempIncome * 0.2;
            } else if(this.taxableIncome > 20000 && this.taxableIncome <= 50000){
              this.personalTax = tempIncome * 0.3 - 2000;
            } else if(this.taxableIncome > 50000){
              this.personalTax = tempIncome * 0.4 - 7000;
            }
          }
        } else{
          if(this.taxableIncome <= 20000){
            this.personalTax = tempIncome * 0.2;
          } else {
            this.personalTax = tempIncome * 0.3 - 2000;
          }
        }
        
      }
      
      this.totalTax = this.numFilter(this.addedValueTax + this.vatTax + this.personalTax);
      this.personalTax = this.numFilter(this.personalTax);
      this.afterTaxIncome = this.numFilter(this.income - this.totalTax);
    },
    numFilter:function(value) {
      var realVal = parseFloat(value).toFixed(2)
      // num.toFixed(2)获取的是字符串
      return parseFloat(realVal)
    }
  },
  mounted: function() {}
}

</script>
<style scoped>
.taxmessagecc {
  height: 100%;
  width: 100%;
}

</style>
