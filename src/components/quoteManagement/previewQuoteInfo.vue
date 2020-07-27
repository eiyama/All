<template>
  <div ref="imageWrapper" style="background-color:#FFF;padding-bottom:0px">
    <mt-header class="def-header" title="车险报价单">
      <!-- <div slot="right"   @click="toImage" >
          <img src="../../assets/images/share-icon.png"  alt="">
      </div> -->
    </mt-header>
    <div class="quotedetail" style="padding-bottom:5px">
      <div class="home-carnum bigbox fn-clear homeMargin">
        <ul style="margin-top: 5px;">
          <li class="header-left">
            <img style="float: left;" slot="icon" class="ico-ins" :src="imgages ? imgages : defaultImg">
            <span style="float: left;font-size: 16px;font-weight:600;color:#333;margin-left:5px">{{quoteData.insCorp.shortName}}</span></li>
          <!-- <li style="display: none;"></li>
          <li class="header-right" v-show="isNeedManual">投保状态: <span style="color: red;font-weight:400">人工核保中</span></li> -->
        </ul>
      </div>
      <!-- <div style="background-color:#F9F9F9;" v-show="isNeedManual">
        <div style="padding:10px;" v-show="isNeedManual">
          <p style="color:#333;font-size:15px;font-weight:400">转人工核保原因:</p>
          <p style="color: red;margin-top:10px" v-html="quoteData.remark"></p>
        </div>
      </div> -->
      <div class="home-carnum  fn-clear homeMargin">
        <ul @click="openone">
          <!-- <li class="header-left" id="lala1">投保基本信息 </li>
          <li class="header-right">
            <span style="color:#4192E8">{{quoteData.car.plateNo}}</span>
            <img style="float: right;" slot="icon" :src="require(`@/assets/images/right.png`)">
          </li> -->
          <li style="display:flex;color:#666;align-items: center;">投保信息：<span style="color:#4A66FE">{{quoteData.car.plateNo}}</span><img style="margin:0;height:28px;" slot="icon" :src="require(`@/assets/images/right.png`)"> </li>
        </ul>
      </div>
      <div class="home-carnum  fn-clear homeMargin" id="citys">
        <ul>
          <!-- <li class="header-left" id="lala2">投保地区</li>
          <li></li>
          <li class="header-right"><span style="background: #FFFFFF;">{{quoteData.insCity.shortName}}</span></li> -->
           <li style="display:flex;color:#666">投保地区：<span style="background: #FFFFFF;color:#333">{{quoteData.insCity.shortName}}</span></li>
        </ul>
      </div>
      <div v-if="showPay||isInsured">
        <div class="middlebox fn-clear" v-show='quoteData.bzRiskKind&&quoteData.bzRiskKind.insureNo'>
          <span class="detail-row-left header-left">{{jsRiskNames.jqNoName}}</span>
          <span class="detail-row-right header-right">{{jsRiskNames.jqNo}}</span>
        </div>
        <div class="middlebox fn-clear" v-show='quoteData.bsRiskKind&&quoteData.bsRiskKind.insureNo'>
          <span class="detail-row-left header-left">{{jsRiskNames.syNoName}}</span>
          <span class="detail-row-right header-right">{{jsRiskNames.syNo}}</span>
        </div>
        <div style="height:10px;background-color:#f5f5f5;margin-top:5px"></div>
      </div>
      <!-- <div class="toubaoBox" style="background:#f7f7f7;">
        <p style="line-height: 40px;">投保方案</p>
        <span @click="showInformation" class="fsInfor" ><img style="height:16px;margin-right:5px;" src="../../assets/images/fsInformation-icon.png" alt="" srcset="">
        <p>附属信息</p>
        </span>
    </div> -->
    <div class="toubaoBox" style="background:#f7f7f7;">
        <p style="line-height: 40px;">投保方案</p>
        <span @click="showInformation" class="fsInfor" ><img style="height:16px;margin-right:5px;" src="../../assets/images/fsInformation-icon.png" alt="" srcset=""><p>附属信息</p> </span>
    </div>
      <!-- <div v-if="jiaoq">
        <div class="middlebox fn-clear">
          <span class="detail-row-left header-left">交强险</span>
          <span class="detail-row-right header-right">￥{{quoteData.bzRiskKind.premium}}</span>
        </div>
        <div class="detail-row">
          <span class="smallboxone">交强险生效时间: <span style="color: #151515;">{{quoteData.bzRiskKind.beginDate}}</span> </span>
        </div>
        <div class="middlebox buttomone" style="margin-bottom: 0;">
          <span class="detail-row-left header-left">车船税</span>
          <span class="smallboxone">(代缴)</span>
          <span class="detail-row-right header-right">￥{{quoteData.bzRiskKind.vehicleTax?quoteData.bzRiskKind.vehicleTax.totalTax:0}}</span>
        </div>
        <div class="detail-row">
          <span class="smallboxone">当年应缴: ¥{{quoteData.bzRiskKind.vehicleTax?quoteData.bzRiskKind.vehicleTax.tax:0}}</span>
        </div>
        <div class="detail-row" v-show="qianjiao">
          <span class="smallboxone">往年欠缴：¥ {{quoteData.bzRiskKind.vehicleTax?quoteData.bzRiskKind.vehicleTax.preTax:0}}+滞纳金¥{{quoteData.bzRiskKind.vehicleTax?quoteData.bzRiskKind.vehicleTax.lateFeesOfTax:0}}</span>
        </div>
        <div class="detail-row buss">
          <span class="smallboxone" style="color: #0070D3;">交强险折扣系数: <span style="color: #0070D3;">{{quoteData.bzRiskKind.insDiscount}}</span> </span>
        </div>
      </div> -->
    <div class="homeMargin" v-if="jiaoq">
      <div class="middlebox fn-clear">
        <span class="detail-row-left header-left" style="font-weight: bold;">交强险</span>
        <span class="detail-row-right header-right" >￥{{quoteData.bzRiskKind.premium}}</span>
      </div>
      <div class="detail-row">
        <span class="smallboxone" style="color:#666">生效时间：{{quoteData.bzRiskKind.beginDate ? quoteData.bzRiskKind.beginDate.substring(0,13)  : '--'}}时 </span>
      </div>
      <div class="middlebox buttomone" style="margin-bottom: 0;">
        <span class="detail-row-left header-left">车船税</span>
        <span class="smallboxone">(代缴)</span>
        <span class="detail-row-right header-right">￥{{quoteData.bzRiskKind.vehicleTax?quoteData.bzRiskKind.vehicleTax.totalTax:0}}</span>
      </div>
      <div class="detail-row">
        <span class="smallboxone">当年应缴: ¥{{quoteData.bzRiskKind.vehicleTax?quoteData.bzRiskKind.vehicleTax.tax:0}}</span>
      </div>
      <div class="detail-row" v-show="qianjiao">
        <span class="smallboxone">往年欠缴：¥ {{quoteData.bzRiskKind.vehicleTax?quoteData.bzRiskKind.vehicleTax.preTax:0}}+滞纳金¥{{quoteData.bzRiskKind.vehicleTax?quoteData.bzRiskKind.vehicleTax.lateFeesOfTax:0}}</span>
      </div>
    </div>
      <!-- <div v-if="shangye" class="fn-clear">
        <div class="middlebox fn-clear">
          <span class="header-left">商业险</span>
          <span class="header-right">￥{{quoteData.bsRiskKind.premium}}</span>
        </div>
        <div class="detail-row buss">
          <span class="smalltwo">商业险生效时间:<span style="color: #151515;">{{quoteData.bsRiskKind.beginDate}}</span> </span>
        </div>
        <div class="detail-row buss">
          <span class="smalltwo" style="color: #0070D3;">商业险总折扣系数: <span style="color: #0070D3;">{{quoteData.bsRiskKind.insDiscount}}</span> </span>
        </div>
        <div class="detail-row-three">
          <ul style="font-size: 14px;color: #333333">
            <li class="detail-row-three-left">险种</li>
            <li class="detail-row-three-center">保费(￥)</li>
            <li class="detail-row-three-right">不计免赔(￥)</li>
          </ul>
        </div>
        <div class="detail-row-three" v-for="item in quoteData.bsRiskKind.items">
          <ul>
            <li class="detail-row-three-left" style="color:#666">
              <span>{{item.riskKindItemName}}</span>
              <span v-if="item.coverage=='国产'">(国产)</span>
              <span v-else-if="item.coverage=='进口'">(进口)</span>
              <span v-else-if="item.riskKindItemName=='乘客责任险' ">({{item.coverage}}元*{{quoteData.car.passengerCapacity-1}})</span>
              <span v-else-if="item.coverage>0">({{item.coverage}}元)</span>
            </li>
            <li class="detail-row-three-center"><span>{{item.premium}}</span></li>
            <li class="detail-row-three-right" v-if='item.deductiblePremium>0'>{{item.deductiblePremium}}</li>
          </ul>
        </div>
      </div> -->
      <hr color="#eee" size="1" style="margin:25px 0px 25px 15px " v-if="shangye">
    <div v-if="shangye" class="fn-clear homeMargin" >
      <div class="middlebox fn-clear">
        <span class="header-left" style="font-weight: bold;">商业险</span>
        <span class="header-right">￥{{quoteData.bsRiskKind.premium}}</span>
      </div>
      <div style="margin-bottom: 20px;">
        <span class="smalltwo" style="color:#666">生效时间：{{quoteData.bsRiskKind.beginDate ? quoteData.bsRiskKind.beginDate.substring(0,13)  : '--'}}时</span>
      </div>
      <div class="detail-row-three detail-row-title">
        <ul style="font-size: 14px;color: #999;">
          <li class="detail-row-three-left" >险种</li>
          <li class="detail-row-three-center" >保费(￥)</li>
          <li class="detail-row-three-right" style="text-align:center">不计免赔(￥)</li>
        </ul>
      </div>
      <div class="detail-row-three" v-for="item in quoteData.bsRiskKind.items">
        <ul>
          <li class="detail-row-three-left" >
            <span>{{item.riskKindItemName}}</span>
            <span v-if="item.coverage=='国产'">(国产)</span>
            <span v-else-if="item.coverage=='进口'">(进口)</span>
            <span v-else-if="item.riskKindItemName=='乘客责任险' ">({{item.coverage}}元*{{quoteData.car.passengerCapacity-1}})</span>
            <span v-else-if="item.coverage>0">({{item.coverage}}元)</span>
          </li>
          <li class="detail-row-three-center"><span>{{item.premium}}</span></li>
          <li class="detail-row-three-right" v-if='item.deductiblePremium>0'>{{item.deductiblePremium}}</li>
        </ul>
      </div>
    </div>
    <hr  color="#eee" size="1" style="margin:25px 0px 25px 15px "  v-show="hasNewDevice">
      <div class="equipmentInsurance" v-show="hasNewDevice">
        <h3>新增设备险</h3>
        <table>
          <tr style="background-color:#F3F3F3;color:#333">
            <th>设备名称</th>
            <th>产地</th>
            <th>金额</th>
            <th>日期</th>
            <th>数量</th>
          </tr>
          <tr v-for="item in quoteData.insuredRiskKindsXZSBSSX" style="color:#666;">
            <td>{{item.name}}</td>
            <td>{{item.origin =="Home" ? "国产" : "进口"}}</td>
            <td>{{item.price}}</td>
            <td>{{item.purchaseDate}}</td>
            <td>{{item.count}}</td>
          </tr>
        </table>
      </div>
       <hr  color="#eee" size="1" style="margin:25px 0px 25px 15px "  v-show="hasNonCar">
      <div class="accidentInsurance" v-show="hasNonCar">
        <h3>非车险</h3>
        <table>
          <tr style="background-color:#F3F3F3;color:#333">
            <th>险种</th>
            <th>档次</th>
            <th>份数</th>
            <th>保费</th>
          </tr>
          <tr v-for="item in quoteData.personInsurances" style="color:#666;">
            <td>{{item.categoryName}}</td>
            <td>{{item.insuranceName}}</td>
            <td>{{item.buyNumber}}</td>
            <td>{{item.amount}}</td>
          </tr>
        </table>
      </div>

           <van-popup  v-model="isInfomation" position="bottom" style="height:100%">
       <div>
       <mt-header fixed class="def-header" title="附属信息">
          <div slot="left" >
            <van-icon name="cross" @click="closeInfor" />
          </div>
        </mt-header>
        <div style="padding:10px 0; margin-top: 49px; ">
          <div class="detail-row buss addMargin" v-if="quoteData.bzRiskKind"  >
            <p class="smalltwo" >交强险折扣系数：<span style="color:#333">{{quoteData.bzRiskKind.insDiscount ? quoteData.bzRiskKind.insDiscount : '--'}}</span></p> 
            <p class="smalltwo" >交强险出险次数：<span style="color:#333">{{quoteData.extend.indangerBzQuantity ? quoteData.extend.indangerBzQuantity  : '--' }}</span></p>
            <p class="smalltwo" v-show="quoteData.insCorp.code == 'pingan'">评分：<span style="color:#333">{{quoteData.extend.score ? quoteData.extend.score  : '--' }}</span></p>
          </div>
          <div class="addMargin" style="border-radius: 5px;" v-show="quoteData.extend.indangerBzQuantity">
            <p style="font-size: 14px; color:#999;">交强险出险详情：</p>
            <table style="width:100%;border: 1px solid #eee;">
              <tr class="extendTable" style="font-size:12px;background:#f0f0f0;padding:2px 0;">
                <td>出险时间</td>
                <td>结案时间</td>
                <td>赔付金额（￥）</td>
                <td>保险公司</td>
              </tr>
              <tr class="extendTable" v-for="extendItem in quoteData.extend.bziClaims" style="font-size:12px;color:#333">
                <td>{{extendItem.accidentTime}}</td>
                <td>{{extendItem.endCaseDate}}</td>
                <td>{{extendItem.claimAmount}}</td>
                <td>{{extendItem.insuranceCompanyName}}</td>
              </tr>
            </table>
          </div>
          <hr  color="#eee" size="1" style="margin:10px 0px 10px 15px"  v-if="quoteData.bzRiskKind" >
          <div class="detail-row buss addMargin" v-if="quoteData.bsRiskKind " >
            <p class="smalltwo" >商业险总折扣系数：<span style="color: #333;">{{quoteData.bsRiskKind.insDiscount ? quoteData.bsRiskKind.insDiscount : '--'}}</span> </p>
            <p class="smalltwo" >商业险出险次数：<span style="color: #333;">{{quoteData.extend.indangerBsQuantity ? quoteData.extend.indangerBsQuantity  : '--' }}</span></p>
          </div>
        <div class="addMargin" style="margin-bottom:15px; border-radius: 5px;" v-show="quoteData.extend.indangerBsQuantity ">
        <p style="font-size:14px; color:#999;">商业险出险详情：</p>
        <table style="width:100%;border: 1px solid #eee;">
          <tr class="extendTable" style="font-size:12px;background:#f0f0f0;padding:2px 0;">
            <td>出险时间</td>
            <td>结案时间</td>
            <td>赔付金额（￥）</td>
            <td>保险公司</td>
          </tr>
          <tr class="extendTable" v-for="extendItem in quoteData.extend.bsiClaims" style="font-size:12px;color:#333">
            <td>{{extendItem.accidentTime}}</td>
            <td>{{extendItem.endCaseDate}}</td>
            <td>{{extendItem.claimAmount}}</td>
            <td>{{extendItem.insuranceCompanyName}}</td>
          </tr>
        </table>
      </div>
       <hr   color="#eee" size="1" style="margin:10px 0px 10px 15px" v-show="quoteData.extend.extrasJson && quoteData.extend.extrasJson.pageFields && quoteData.extend.extrasJson.pageFields.length > 0">
          <div class="addMargin" style="border-radius: 5px;" v-show="quoteData.extend.extrasJson && quoteData.extend.extrasJson.pageFields && quoteData.extend.extrasJson.pageFields.length > 0">
          <!-- <p style="font-size: 12px; color: rgb(0, 112, 211);line-height:30px" @click="showPageFields">附属信息：
          <span><van-icon :name="isDown ? 'arrow-up' : 'arrow-down'"></van-icon></span>
          </p> -->
          <table style="width:100%;">
            <tr class="extendTable" style="font-size:12px;background:#f0f0f0;padding:2px 0;">
              <td>名称</td>
              <td>值</td>
            </tr>
            <tr class="extendTable" v-for="extendItem in quoteData.extend.extrasJson.pageFields" style="font-size:12px;color:#333">
              <td>{{extendItem.describe}}</td>
              <td>{{extendItem.value}}</td>
            </tr>
          </table>
        </div>
        </div>
       </div>
     </van-popup>

    <van-popup v-model="shareinsuranImg" style="width:72%;">
        <div>
              <van-icon @click="shareinsuranImg = false" style="float:right;margin:10px 10px 0 0 ;" size="18" name="close" />
            <img style="width:100%" :src="shareImgUrl" alt="">
              <p style="text-align:center;color:#f44">长按保存或分享给好友</p>
        </div>
    </van-popup>

      <mt-popup v-model="messageone" position="bottom" popup-transition="popup-fade" class='lili'>
        <div class="messagecc">
          <mt-header fixed class="def-header" title="投保基本信息">
            <div slot="left" @click="closeone">
              <img src="../../assets/images/ico-close.png" style="width: 18px;height: 18px;">
            </div>
          </mt-header>
          <ul>
            <li style="margin-top: 44px;">
              <p> <span class="mesleft">车主名</span> <span class="mesright">{{quoteData.car.owner.name}}</span> </p>
              <p> <span class="mesleft">车主证件号</span> <span class="mesright">{{quoteData.car.owner.idNo}}</span> </p>
            </li>
            <li>
              <p> <span class="mesleft">车牌号</span> <span class="mesright">{{quoteData.car.plateNo}}</span> </p>
              <p> <span class="mesleft">车架号</span> <span class="mesright">{{quoteData.car.vin}}</span> </p>
              <p> <span class="mesleft">发动机号</span> <span class="mesright">{{quoteData.car.engineNo}}</span> </p>
              <p> <span class="mesleft">厂牌型号</span> <span class="mesright">{{quoteData.car.model}}</span> </p>
            </li>
            <li>
              <p> <span class="mesleft">车型价格</span> <span class="mesright">{{quoteData.car.purchasePrice}}</span> </p>
              <p> <span class="mesleft">座位数</span> <span class="mesright">{{quoteData.car.passengerCapacity}}</span> </p>
            </li>
            <li>
              <p> <span class="mesleft">注册日期</span> <span class="mesright">{{quoteData.car.registerDate}}</span> </p>
              <p> <span class="mesleft">过户车</span> <span class="mesright">{{changedOwner}}</span></p>
            </li>
            <li class="lastone">
              <p> <span class="mesleft">投保人</span> <span class="mesright">{{quoteData.applicant.name}}</span> </p>
              <p> <span class="mesleft">投保人证件号</span> <span class="mesright">{{quoteData.applicant.idNo}}</span> </p>
              <div style="height: 10px;"></div>
              <p> <span class="mesleft">被保人</span> <span class="mesright">{{quoteData.insured.name}}</span> </p>
              <p> <span class="mesleft">被保人证件号</span> <span class="mesright">{{quoteData.insured.idNo}}</span> </p>
            </li>
          </ul>
        </div>
      </mt-popup>
      <div class="footone" style="display: flex;justify-content: flex-end;align-items: center;margin-top:15px;margin-right: 15px;">
        <p class="smallboxone">总保费￥:<span class="bigreds">{{quoteData.premium}}</span></p>
      </div>
    </div>
    <div style="position:absolute">
      <img src="../../assets/images/bg-paper.png" style="width:100%;">
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import axios from 'axios';
import { Button } from 'vant';
import html2canvas from 'html2canvas'

export default {
  name: 'quotedetail',
  data() {
    return {
      isInfomation:false,
      appId: '',
      token: '',
      title: '',
      defaultImg: this.src = require('../../assets/images/companys/defaultImg.png'),
      jiaoq: true,
      shangye: true,
      show: true,
      qianjiao: true,
      messageone: false,
      whether: '',
      showPay: false,
      isInsured: false,
      isShare: false,
      loading: true,
      imgages: '',
      quoteData: {
        payAmount: '',
        orderNo: '',
        insCity: { shortName: "" },
        insBatchNo: "",
        quotationNo: "",
        premium: "",
        insCorpCode: '',
        insureStatus: "",
        insCorp: { shortName: "", code: "" },
        car: { owner: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" }, plateNo: "", vin: "", engineNo: "", model: "", makerModel: "", purchasePrice: "", analogyCarPrice: "", year: "", passengerCapacity: "", registerDate: "", remark: "", exhaustMeasure: "", isChangedOwner: "", aliasName: "" },
        applicant: { name: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
        insured: { name: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
        bzRiskKind: { vehicleTax: { totalTax: "", tax: "", preTax: "", lateFeesOfTax: "" }, beginDate: "", endDate: "", premium: "", insDiscount: "" },
        bsRiskKind: { items: [{ coverage: "", riskKindItemCode: "", riskKindItemName: "", premium: "", isDeductible: "", deductiblePremium: "" }], beginDate: "", endDate: "", premium: "", insDiscount: "" },
        insuredRiskKindsXZSBSSX: [{
          name: "",
          origin: "",
          price: "",
          purchaseDate: "",
          count: ""
        }],
        personInsurances: [{
          categoryName: "",
          insuranceName: "",
          amount: "",
          buyNumber: ""
        }],

      },
      jsRiskNames: {
        jqNoName: '',
        syNoName: '',
        jqNo: '',
        syNo: ''
      },
      changedOwner: '否',
      hasNonCar: false,
      hasNewDevice: false,
      isNeedManual: false,
      isNeedShuanglu: false,
      shareinsuranImg:false,
      shareImgUrl:'',
      flag:true,
    }
  },
  props: ['fromFather'],
  created() {
    this.getPolicyDetail();
    
  },
  mounted(){
      //  if(this.fromFather){
      //     this.toImage()
      //   }
  },
  methods: {
     toImage() {
        if(this.flag){
         this.flag = false;
         window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        // setTimeout(() => {
              html2canvas(document.body).then(canvas => {
                let dataURL = canvas.toDataURL("image/png");
                this.shareImgUrl = dataURL;
                if (this.imgUrl !== "") {
                  this.shareinsuranImg = true;
                }
              });
        // }, 5000);
       

        }
        
      },
      //  dataURLToBlob(dataurl) {//ie 图片转格式
      //   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      //   bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      //   while (n--) {
      //   u8arr[n] = bstr.charCodeAt(n);
      //   }
      //   return new Blob([u8arr], {type: mime})
      // },
      // downloadResult(name) {
      //   let canvasID = document.body
      //   let a = document.createElement('a');
      //   html2canvas(canvasID).then(canvas => {
      //   let dom = document.body.appendChild(canvas);
      //   dom.style.display = "none";
      //   a.style.display = "none";
      //   document.body.removeChild(dom);
      //   let blob = this.dataURLToBlob(dom.toDataURL("image/png"));
      //   a.setAttribute("href", URL.createObjectURL(blob));
      //   a.setAttribute("download", name + ".png")
      //   document.body.appendChild(a);
      //   a.click();
      //   URL.revokeObjectURL(blob);
      //   document.body.removeChild(a);
      //   });
      // },
      // printOut(name) {
      //   // 个人观察只是截取可见范围以及以下的区域，所以先将滚动条置顶
      //   $(window).scrollTop(0); // jQuery 的方法
      //   document.body.scrollTop = 0; // IE的
      //   document.documentElement.scrollTop = 0; // 其他
      //   this.downloadResult(name)
      // },



     closeInfor(){
       this.isInfomation = false;
    },
     showInformation(){
        this.isInfomation = true;
    },
    getPolicyDetail() {
      Indicator.open('加载中...');
      //GET /vi/insurePolicies/{insBatchNo}/{insCorpCode}/Preview
      var urlone = '/vi/insurePolicies/' + this.$route.query.insBatchNo + '/' + this.$route.query.insCorpCode + '/Preview';

      var appId = this.$route.query.appId;
      if (appId) {
        localStorage.setItem("appId", appId);
      };
      axiosGetAPI(urlone).then((res) => {
        Indicator.close();
        this.loading = false;
        if (res.result && res.result.bsRiskKind && res.result.bsRiskKind.items) {
          res.result.bsRiskKind.items.map(item => {
            item.premium = Math.round(parseFloat(item.premium) * 100) / 100
          })
        }
        this.quoteData = res.result;
        console.log(this.quoteData)
        if (res.result.bzRiskKind) { this.jiaoq = true; } else { this.jiaoq = false; }
        if (res.result.bsRiskKind) { this.shangye = true } else(this.shangye = false)
        if (this.quoteData.bzRiskKind) {
          if (this.quoteData.bzRiskKind.vehicleTax && this.quoteData.bzRiskKind.vehicleTax.preTax == 0) {
            this.qianjiao = false;
          }
        }
        this.imgages = require(`@/assets/images/companys/${res.result.insCorp.code}.png`)
        var sTitle = '';
        if (this.quoteData.car) {
          if (this.quoteData.car.isChangedOwner == true) {
            //this.quoteData.car.isChangedOwner='是'
            this.quoteData.car.isChangedOwner = "false"
          } else {
            //this.quoteData.car.isChangedOwner='否'
            this.quoteData.car.isChangedOwner = 'false'
          }
          if (this.quoteData.car.owner) {
            var plateNo = this.quoteData.car.plateNo;
            var vin = this.quoteData.car.vin;
            if (plateNo != null && plateNo != '' && plateNo != '未上牌') {
              sTitle = plateNo + '车险报价单';
            } else {
              sTitle = vin + '车险报价单';
            }
            document.title = sTitle;
          };
        };

        this.hasNonCar = (this.quoteData.personInsurances && this.quoteData.personInsurances.length > 0);
        this.hasNewDevice = (this.quoteData.insuredRiskKindsXZSBSSX && this.quoteData.insuredRiskKindsXZSBSSX.length > 0);

        if (res.result) {
          this.payParams.riskName = '';
          this.isInsured = (res.result.insureStatus == 'Insured');
          this.title = this.isInsured ? '投保单详情' : (this.isNeedManual ? '核保详情' : '报价详情');

          if (res.result.bzRiskKind) {
            this.payParams.riskName = '交强险';
            this.jsRiskNames.jqNoName = this.isInsured ? '交强险保单号' : '交强险投保单号';
            this.jsRiskNames.jqNo = this.isInsured ? res.result.bzRiskKind.policyNo : res.result.bzRiskKind.insureNo;
            if (res.result.bzRiskKind.vehicleTax) {
              this.payParams.riskName = '交强险+车船税';
            };
            if (res.result.bsRiskKind) {
              this.payParams.riskName += '+商业险';
              this.jsRiskNames.syNoName = this.isInsured ? '商业险保单号' : '商业险投保单号';
              this.jsRiskNames.syNo = this.isInsured ? res.result.bsRiskKind.policyNo : res.result.bsRiskKind.insureNo;
            };
          } else if (res.result.bsRiskKind) {
            this.payParams.riskName = '商业险';
            this.jsRiskNames.syNoName = this.isInsured ? '商业险保单号' : '商业险投保单号';
            this.jsRiskNames.syNo = this.isInsured ? res.result.bsRiskKind.policyNo : res.result.bsRiskKind.insureNo;
          };
          this.changedOwner = res.result.car.isChangedOwner == true ? '是' : '否';
        };

      });
    },
    refreshOrder() {
      this.getPolicyDetail();
    },
    //弹层
    closeone: function() {
      this.messageone = false
    },
    openone: function() {
      this.messageone = true
    },
  }
}

</script>
<style scoped>
.quotedetail{
  padding: 0;
}

.homeMargin{
  margin:0 4%;
}

.quotedetail #promptly {
  height: 50px;
}

.quotedetail #promptly .footone {
  color: #B1C4DB;
  height: 60px;
  text-align: left;
  padding-left: 4%;
  float: left;
  width: 63%;
  background: #FFFFFF;
  border: none;
}

.quotedetail #promptly .foottwo {
  line-height: 50px;
}

.quotedetail .home-carnum img {
  width: 24px;
  height: 26px;
  margin-top: 8px;
}

.quotedetail #btnss {
  color: #0070D3;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  width: 90px;
  height: 22px;
  line-height: 22px;
  background: #FFFFFF;
}

.quotedetail #citys {
  /* border-bottom: 10px solid #F9F9F9; */
  margin-bottom: 25px;
}

.quotedetail .buttomone {
  margin-bottom: 10px;
}

/* .quotedetail .buss {
  margin-bottom: 5px;
} */

.quotedetail .bigreds {
  color: #FC3738;
  font-size: 18px;
}

.quotedetail .messagecc {
  height: 100%;
  width: 100%;
}

.quotedetail .lili {
  bottom: 0;
  top: 0;
}

.quotedetail .quoteDatau {
  border: 0;
  padding: 0 4%;
}

.quotedetail .quoteDatau img {}

.quotedetail .lastone {
  border: none;
}

.quotedetail .lineh {
  line-height: 45px;
}

.quotedetail .Reduction {
  background: #F6F6F6;
  border: 1px solid #E0E0E0;
  width: 60px;
  height: 18px;
  font-size: 12px;
  color: #888888;
  display: inline-block;
  text-align: center;
  border-radius: 4px;
}

.btnItem {
  display: flex;
  height: 100%;
  float: right;
  vertical-align: middle;
  text-align: center;
 
}

.btnItem button {
  /* flex: 1; */
  /* width: 75%; */
  height: 100%;
}

.accidentInsurance {
  margin: 20px 4%;
}

.accidentInsurance h3 {
  font-size: 14px;
  color: #333333;
  font-weight: normal;
  text-align: left;
  font-weight: bold;
}

.accidentInsurance table {
  width: 100%;
 text-align: left;
}

.accidentInsurance table tr:nth-child(1) th {
  height:30px;
  font-size: 14px;
  font-weight: normal;
  color: #999;
  padding-left: 5px;
}


.accidentInsurance table td {
  font-size: 12px;
  font-weight: normal;
  color: #333;
  padding-left: 5px;
}

.accidentInsurance table td:nth-child(1) {
  width: 20%;
}

.accidentInsurance table td:nth-child(2) {
  width: 50%;
}

.accidentInsurance table td:nth-child(3) {
  width: 15%;
}

.accidentInsurance table td:nth-child(4) {
  width: 15%;
}

.equipmentInsurance {
  margin: 20px 4%;
}

.equipmentInsurance h3 {
  font-size: 14px;
  color: #333333;
  font-weight: normal;
  text-align: left;
  font-weight: bold;
}

.equipmentInsurance table {
  width: 100%;
  text-align: center;
}

.equipmentInsurance table tr:nth-child(1) th {
  font-size: 14px;
  font-weight: normal;
  color: #333;
}

.equipmentInsurance table td {
  font-size: 12px;
  font-weight: normal;
  color: #666;
}

.extendTable{border: 1px solid #eee;}

.extendTable td{
  padding: 5px;
  
}


.toubaoBox{
    background: rgb(247, 247, 247);
    height: 50px;
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    /* line-height: 85px; */
    /* padding-top: 10px; */
    border-bottom: 1px solid #f0f0f0;
    border-top: 1px solid #f0f0f0;
    align-items: center;
}

.quotedetail .smalltwo{
  font-size: 12px;
  color:#999999;
}

.addMargin{
  margin: 0 15px;
}

.fsInfor{
    color: rgb(74, 102, 254);
    text-align: center;
    border: 1px solid #eee;
    height: 28px;
    font-size: 12px;
    line-height: 24px;
    width: 90px;
    border-radius: 6px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}

.header-right img{
  height:25px;
}


</style>
