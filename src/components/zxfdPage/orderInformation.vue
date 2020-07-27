<template>
	<div style="background:#F5F5F5;">
        <header class="header_box" style="display:block;" v-show="isWeixin">
        	<div class="header">
            	<div class="header_750 cb">
                	<a @click="go_back" class="go_back" href="javascript:void(0)">
                    	<span class="base_icon"></span>
                    </a>
                    <h2>订单信息</h2>
                </div>
            </div>
        </header>
        <div class="insuranceColumn" style="border-top:0px;">
        	<div class="insuranceColumnTop" style="display:flex;">
            	<h3 class="newCTitleBox_2">投保人信息<span class="newCTitle_explain">(保单购买者)</span></h3>
				<a style=" margin-top: .28rem;margin-left: 0.1rem;" class="InTextMsgBtn" href="javascript:void(0)" @click="isMessage = true" data-text=''></a>
            </div>
            <div v-show="isMessage" id="inpoTextMsgBox2" @click="isMessage = false"></div>
            <div v-show="isMessage" style="left: 0.3rem;margin-top: -0.1rem;" class="inpoTextMsgBox2">
                    <span class="s1" style="left:3.3rem"></span>
					<span class="s2" style="left:3.3rem"></span>     
					<div>
						<p style="font-size:12px;color:rgba(51,51,51,1)">
							投保人及被保险人需对投保标的具有法律上承认的利益（包括但不限于：房产所有人；房产所有人的子女作为投保人；与房产所有人签有转租或承包租赁合同的二房东作为投保人等。详见Q&A）。
						</p> 
					</div>
            </div>
             <ul class="messageList">
             	<li class="cb pr">投保人 <i>*</i>
                    <input  type="text" class="insuranceIpt_2" placeholder="请输入姓名" v-model="upData.owner.InsuredName">
            	</li>
                <li class="cb pr">证件类型 <i>*</i>
                	<input name="applyIdType" type="hidden" value="01" class="setIptValue" readonly>  
                    <input name="" type="text" class="insuranceIpt" placeholder="请选择"  v-model="upData.owner.IdentifyTypeName" readonly @click="hasidType = true">
            	</li>
                <li class="cb pr">投保人证件号 <i>*</i>
                    <input name="applyIdNumber" @keyup="ownerBirth" type="text" @blur="ownerBlur()" class="insuranceIpt_2" placeholder="请输入证件号"  v-model="upData.owner.IdentifyNumber" >
            	</li>

				 <li v-show="upData.owner.IdentifyType != '' && upData.owner.IdentifyType != 'IdCard' && upData.owner.IdentifyType != 'Organization' && upData.owner.IdentifyType != 'CreditCode'" class="cb pr">出生日期 <i>*</i>
                    <input name="applyIdType" type="hidden" value="01" class="setIptValue" readonly>  
                    <input name="" type="text" class="insuranceIpt" placeholder="请选择"  v-model="upData.owner.birthday" readonly @click="selectBirthday">
            	</li>

                <li  v-show="upData.owner.IdentifyType != '' &&  upData.owner.IdentifyType != 'IdCard' && upData.owner.IdentifyType != 'Organization' && upData.owner.IdentifyType != 'CreditCode'" class="cb pr">性别 <i>*</i>
					<div class="sexOrdio">
						<span v-for="(item,index) in sexList"  :class="{current: sexIndex == item.value}"  :key="index" @click="sexChange(item,index)">{{item.name}}</span>
					</div>
            	</li>

                <li class="cb pr">投保人手机 <i>*</i>
                    <input name="applyMobile" type="number" oninput="if(value.length>11)value=value.slice(0,11)" class="insuranceIpt_2" placeholder="请输入手机"  v-model="upData.owner.PhoneNumber">
            	</li>
                <li class="cb pr">投保人邮箱
                    <input name="applyEmail" type="text" class="insuranceIpt_2" placeholder="用于接收电子版保单"  v-model="upData.owner.email" >
            	</li>
             </ul>
        </div>
        <div class="insuranceColumn">
            <div class="insuranceColumnTop">
            	<h3 class="newCTitleBox_2" >被保险人资料<span class="newCTitle_explain">(保障对象，赔款接收人)</span></h3>
            </div>
            <ul class="messageList">
            	<li class="cb pr">是否为投保人本人
                    <p class="slideBtn"  ><label for="check_1"  @click.stop="slideSwitch"><span :class="{current : sameOwner == true}"><!--current--><i></i></span></label></p>
            	</li>
            </ul>
            <ul class="messageList" v-show="!sameOwner">     
                <li class="cb pr">被保险人姓名 <i>*</i>
                    <input type="text" class="insuranceIpt_2" placeholder="请输入姓名"   v-model="upData.applicant.InsuredName" >
            	</li>
				<li class="cb pr">证件类型 <i>*</i>
                	<input name="applyIdType" type="hidden" value="01" class="setIptValue" readonly>  
                    <input name="" type="text" class="insuranceIpt" placeholder="请选择"  v-model="upData.applicant.IdentifyTypeName" readonly @click="hasApplicant = true">
            	</li>
                <li class="cb pr">被保险人证件号 <i>*</i>
                    <input name="insuredIdNumber"  @blur="applicantBlur()" type="text" class="insuranceIpt_2"  v-model="upData.applicant.IdentifyNumber" placeholder="请输入证件号" >
            	</li>

				<li v-show="upData.applicant.IdentifyType != '' && upData.applicant.IdentifyType != 'IdCard' " class="cb pr">出生日期 <i>*</i>
                    <input name="applyIdType" type="hidden" value="01" class="setIptValue" readonly>  
                    <input name="" type="text" class="insuranceIpt" placeholder="请选择"  v-model="upData.applicant.birthday" readonly @click="selectApplicantBirthday">
            	</li>

                <li  v-show="upData.applicant.IdentifyType != '' && upData.applicant.IdentifyType != 'IdCard' " class="cb pr">性别 <i>*</i>
					<div class="sexOrdio">
						<span v-for="(item,index) in sexList"  :class="{current: applicantSexIndex == item.value}"  :key="index" @click="applicantSexChange(item,index)">{{item.name}}</span>
					</div>
            	</li>
                <li class="cb pr">被保险人手机号 <i>*</i>
                    <input name="insuredMobile" type="number" oninput="if(value.length>11)value=value.slice(0,11)" class="insuranceIpt_2"  v-model="upData.applicant.PhoneNumber" placeholder="请输入手机" >
            	</li>
            </ul>
        </div>
        <div style="background:#fff">
            <div class="insuranceColumnTop" style="border-top: .17rem solid #F5F5F5;">
            	<h3 class="newCTitleBox_2" >承保单位</h3>
            </div>
            <div style="padding:.3rem; ">
            	<div class="nweInsuranceSetBox newWidth">
                    <a :class="{current: InsuranceCode == 'PICC'}" @click="setRadioIpt('PICC')"><input name="company" type="radio" value="PICC" id="sRadio_1"><label for="sRadio_1"><img style="height: 0.24rem;" src="../../assets/images/insurance/renbao.png" alt=""> 中国人保<br><i>（支持全国投保）</i></label></a>
                    <!-- <a :class="{current: InsuranceCode == 'CPIC'}" @click="setRadioIpt('CPIC')"><input name="company" type="radio" value="CPIC" id="sRadio_2"><label for="sRadio_2"><img style="height: 0.32rem;" src="../../assets/images/insurance/taibao.png" alt=""> 太平洋保险<br><i>（暂只支持深圳投保）</i></label></a> -->
					<!-- <a @click="cpicToase"><input name="company" type="radio" value="CPIC" id="sRadio_2"><label for="sRadio_2"><img style="height: 0.32rem;" src="../../assets/images/insurance/taibao.png" alt=""> 太平洋保险<br><i>（暂只支持深圳投保）</i></label></a> -->
               </div>
			   <div style="padding-left:0.5rem;padding-bottom:.15rem">
					<a style="color: #0080FF;" @click="showEleInsurance = true"> 《电子保单样本》</a>
				</div>
            </div>
            <div class="insuranceColumnTop" style="border-top: .17rem solid #F5F5F5;">
            	<h3 class="newCTitleBox_2" >订单信息</h3>
            </div>
            <ul class="messageList">
                <li class="cb pr js_address_c1">投保房产地址
                	<input name="address_1" type="hidden" value="" class="setIptValue" id="value1" readonly>  
                    <input name="address_text" type="text" :value="cityValue" class="insuranceIpt" placeholder="请选择省市区" id="demo1" @click="toAddress" readonly>
            	</li>

                <li class="cb pr js_address_c2" >
  					<input name="address_2" type="text" class="insuranceIpt_2_1" placeholder="请输入楼栋详细地址" v-model="DetailedAddress" >
            	</li>
                
            	<li class="cb pr">投保部分房间
                    <p class="slideBtn"  ><label for="check_1"  @click.stop="someHouse"><span :class="{current : issomeHouse == true}"><!--current--><i></i></span></label></p>
            	</li>
                 
             	<li class="cb pr">
                    <input style="width:100%;" name="address_3" type="text" v-model="detailRoom"  class="insuranceIpt_2" placeholder="请输入房间号，以“,”分隔" >
            	</li>
             </ul>
             <ul class="annotation">
                 <li>1、本保单仅承保住宅房屋，经营性质场所不在保障范围内。</li>
                 <li>2、如投保人投保多个地址，须单独进行投保，不可合计面积进行选择，否则本保单不承担保险责任。</li>
				 <li>3、请准确填写房屋详细地址，否则可能影响到保险理赔（详细到门牌号）</li>
             </ul>
             <ul class="messageList">
               <li class="cb pr" style="border-top: 1px solid #eee">生效日期<i>*</i>
                	<input name="startDate" type="hidden" value="" class="setIptValue" readonly>  
                    <input name="" type="text" class="insuranceIpt" v-model="CommencementDateValue" placeholder="请选择" readonly @click="selInsuredBirthday" >
            	</li>
            </ul>
              <p class="dateAnnotation">将于下个工作日结束前完成审核出单，正式保险生效日期可能因出单时间顺延</p>
        </div>
        <div style="background:#fff;">
            
          <ul class="messageList" >
                <li class="cb pr js_address_c1" style="border-top: 0.01rem solid #F5F5F5;" >保险期限
                	<input name="address_1" type="text" :value="qx" class="insuranceIpt_2" readonly>  
            	</li>
                <li class="cb pr js_address_c1" >投保方式
                	<input name="address_1" type="text" :value="insuranceMethod" class="insuranceIpt_2" readonly>  
            	</li>
                <li class="cb pr js_address_c1" >选择套餐
                	<input name="address_1" type="text" :value="setMeal" class="insuranceIpt_2" readonly>  
            	</li>
                <li class="cb pr js_address_c1" >投保面积(建筑面积)
                	<input name="address_1" type="text" :value="area" class="insuranceIpt_2" readonly>  
            	</li>
                <li v-show="hireLossInsurance" class="cb pr js_address_c1" >租金损失保障
                	<input name="address_1" type="text" :value="hireLossInsurance + '份'" class="insuranceIpt_2" readonly>  
            	</li>
                <li v-show="reputationInsureance" class="cb pr js_address_c1" >租房声誉损失津贴保障
                	<input name="address_1" type="text" :value="reputationInsureance + '份'" class="insuranceIpt_2" readonly>  
            	</li>
             </ul>  
              <h4 style="margin-top:0.34rem;margin-left:0.32rem;font-weight:400;">
                	<span style="color: rgba(51,51,51,1);font-size: 0.3rem;">保障内容</span>
                </h4> 
              <div style="margin: 0.32rem;">
                	<table class="nweInsuranceTab">
					<tr >
						<th style="border: 0;">基本保障内容</th>
						<th>赔偿限额</th>
						<th>保障</th>
					</tr>
                	<tr>
                    	<td rowspan="5">第三者(含租客)人身伤亡及财产损失赔偿责任(含水管爆裂责任、高空抛物责任)  </td>
                        <td>累计责任限额</td>
                        <td class="">{{premiumList[0]}}万</td>
                    </tr>
                    <tr>
                    	<td>每次事故责任限额</td>
                        <td class="">{{premiumList[1]}}万</td>
                    </tr>
                    <tr>
                    	<td>每次事故每人伤亡责任限额</td>
                        <td class="">{{premiumList[2]}}万</td>
                    </tr>
                    <tr>
                    	<td>每次事故财产损失责任限额</td>
                        <td class="">{{premiumList[3]}}万</td>
                    </tr>
                    <tr>
                    	<td>法律费用累计责任限额</td>
                        <td class="">{{premiumList[4]}}万</td>
                    </tr>
                    <tr>
                    	<td rowspan="4">出租人(房东)家庭财产损失赔偿责任</td>
                        <td>房屋主体、附属建筑物</td>
                        <td class="">{{premiumList[5]}}万</td>
                    </tr>
                    <tr>
                    	<td>室内附属设施</td>
                        <td class="">{{premiumList[6]}}万</td>
                    </tr>
                    <tr>
                    	<td>室内装潢</td>
                        <td class="">{{premiumList[7]}}万</td>
                    </tr>
                    <tr>
                    	<td>室内财产</td>
                        <td class="">{{premiumList[8]}}万</td>
                    </tr>
					 <!-- <tr >
                    	<td>出租人(房东)家庭财产损失赔偿责任</td>
                    	<td>每次事故每人伤亡责任限额</td>
                        <td class="">50万</td>
                    </tr> -->
                    <tr v-show="hireLossInsurance">
                    	<td>租金损失赔偿责任</td>
                    	<td>最高赔偿限额</td>
                        <td class="">5万</td>
                    </tr>
                    <tr v-show="reputationInsureance">
                    	<td>租房声誉损失津贴</td>
                    	<td>每次事故赔偿限额</td>
                        <td class="">5万</td>
                    </tr>
                </table>
                </div>  
        </div>
        <div style="height:1.5rem;">
        	<div class="insuranceBttomBtnBox">
                <div class="cb">
					<div >
						<span><b style="color:#333; font-weight:500;">保险费用: </b><i class="totalAmount"> {{account}}</i> 元</span>
						<a style="color:#0080FF" href="javascript:void(0)" @click="showInsured('text')">《保险条款》</a>
					</div>
                    <a style="margin-top: 15px;" class="insuranceBttomBtn" href="javascript:void(0)" @click="showInsured()">确认支付</a>
                </div>
            </div>
        </div>   
		<div class="black_box" style="display:none;">
            <div class="base_msg_box">
            	<a class="closedBtn" @click="cancelEvent()"><span></span></a>
            	<h3>请仔细阅读以下协议</h3>
            	<div class="base_msg_text" v-if="InsuranceCode == 'PICC'">
                	<a @click="showFwczrListBtn" style="font-weight:500;">《房屋出租人责任险条款》</a>
                    <a @click="showDszssListBtn" style="font-weight:500;">《附加第三者损失保险条款》</a>
                    <a @click="showJtcczhListBtn" style="font-weight:500;">《附加家庭财产综合保险条款》</a>
                    <a @click="showSpecialAgreementBtn " style="font-weight:500;">《特别约定》</a>
					<a @click="showInsuranceDecBtn " style="font-weight:500;">《投保声明》</a>
                </div>
            	<div class="cb"><a class="sbtn" href="javascript:void(0)" @click="submitInsurance">同意协议并投保</a></div>
            </div>
        </div>

		<van-popup v-model="hasApplicant" position="bottom">
			<van-picker
				show-toolbar
				:columns="typeResult"
				@cancel="hasApplicant = false"
				@confirm="onApplicantConfirm"
			/>
		</van-popup>

		<van-popup v-model="hasidType" position="bottom">
			<van-picker
				show-toolbar
				:columns="typeResult"
				@cancel="hasidType = false"
				@confirm="onidTypeConfirm"
			/>
		</van-popup>

		<mt-datetime-picker  @touchmove.native.stop.prevent ref="birthday" v-model="birthday" type="date"
		:startDate="birstartDate" :endData="birendDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="birthConfirm">
		</mt-datetime-picker>
		
		<mt-datetime-picker  @touchmove.native.stop.prevent ref="appbirthday" v-model="appbirthday" type="date"
			:startDate="birstartDate" :endData="birendDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="applicantbirthConfirm">
		</mt-datetime-picker>


		<mt-datetime-picker  @touchmove.native.stop.prevent ref="insuredBirthday" v-model="insuredBirthday" type="date" :startDate="startDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="insuredBirthConfirm">
		</mt-datetime-picker>

		 <van-popup style="width:100%;height: 100%;" v-model="showEleInsurance">
			<header class="header_box" style="display:block;"  >
				<div class="header">
					<div class="header_750 cb">
						<a @click="showEleInsurance = false" class="go_back" href="javascript:void(0)">
							<span class="base_icon"></span>
						</a>
						<h2>电子保单样本</h2>
					</div>
				</div>
			</header>
			<img style="width:100%" src="../../assets/images/insurance_2/insurance.jpg" alt="">
		</van-popup>


		<mt-popup position="bottom" @touchmove.native.stop.prevent v-model="isShow">
			  <div class="picker-toolbar headerClose">
					<span @click="cancelAddress">取消</span>
					<span >请选择省市区</span> 
					<span @click="selAddress">确定</span>
			</div>
				<mt-picker :slots="myAddressSlots"  valueKey="name" :visibleItemCount="5" @change="addressChange" :itemHeight="40"></mt-picker>
		</mt-popup>
		
		<van-popup v-model="showFwczrList" :close-on-click-overlay="false" round style="height:80%" position="bottom">
			<a class="closedPopupBtn" @click="closeFwczrList"><span></span></a>
			<fwczrList ></fwczrList> 
		</van-popup>
		
		<van-popup v-model="showDszssList" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<a class="closedPopupBtn" @click="closeDszssList"><span></span></a>
			<sanzexianList ></sanzexianList> 
		</van-popup>

		<van-popup v-model="showJtcczhList" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<a class="closedPopupBtn" @click="closeJtcczhList"><span></span></a>
			<jtcczhList ></jtcczhList> 
		</van-popup>

		<van-popup v-model="showSpecialAgreement" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<div class="closedPopupBtn" @click="closeSpecialAgreement"><span></span></div>
			<specialAgreement ></specialAgreement> 
		</van-popup>

		<van-popup v-model="showInsuranceDec" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<div class="closedPopupBtn" @click="closeInsuranceDec"><span></span></div>
			<InsuranceDec ></InsuranceDec> 
		</van-popup>

    </div>
</template>
  <script >
   import "./../../assets/css/zxfd/base.scss";
   import "./../../assets/js/rem.js";
   import fwczrList from "./fwczrList.vue";
   import jjzrList from "./jjzrList.vue";
   import jtcczhList from "./jtcczhList.vue";
   import sanzexianList from "./sanzexianList.vue"; 
   import specialAgreement from "./specialAgreement.vue";   
   import InsuranceDec from "./InsuranceDec.vue";
   import { dialog } from 'vant';
   import { zmGetProvincesArr,zmGetCitiesArr,zmGetAreaArr } from '../../assets/js/zmRegion'
   import { Toast ,Indicator } from 'mint-ui';
   import { axiosGetAPI, axiosPostAPI } from '../../common/Axios';
   const typeList = ['标准版','豪华版','尊享无忧版','温馨版'];
   const setMealCode = ['FA001','FA002','FA003','FA004','FA005'];// 套餐code
   const insuranceMethodList = ['按栋投保','按户投保'];
   const areaCodeList = ['BF001','BF002','BF003','BF004'];
	//    房东版=FDD001，租客版=FDZ001
 export default {
    data(){
        return{
			qx:"一年",
            premiumList:[300,300,150,20,5,50,10,10,10],
            extendPremium:[0,0,0],
			sameOwner:false,
			hasBirthday:false,
            upData:{
                owner: { InsuredName: "", PhoneNumber: "", IdentifyNumber: "", IdentifyType: "", InsuredAddress:"",email:"",IdentifyTypeName:"",birthday:''},
                applicant: { InsuredName: "", PhoneNumber: "", IdentifyNumber: "", IdentifyType: "", InsuredAddress:"",IdentifyTypeName:'',	birthday:'',},
			},	
			sexIndex:"1",
			distributorAttach:'',
			distributorCode:'',
			showEleInsurance:false,
			upDataList:{
					"distributorCode": "",
					"OrderSource":"",
					"productCode": "FDD001", //string,产品编号
					"startDate": "", //date-time,起保日期
					"endDate": "", //date-time,终保日期
					"amount": "", //double,订单金额
					"applicantName": "", //string,投保人
					"insurantName": "", //string,被保人
					"orderDetail": {
						"InsCorpCode": "",
						"AreaCode": "440304",
						"AreaAddress":"广东省深圳市福田区",
						"DetailedAddress": "",
						"ProductType": "",
						"SchemeCode": "",
						"PremiumCode": "",
						"Extendeds": {},
						"RelationPeoples": [],
					},
					"distributorAttach": ""
			},
			InsuranceCode:"PICC",              
			sexList:[{name:'男',value:'1'},{name:'女',value:'2'}],
			typeResult : ['居民身份证','统一社会信用代码', '港澳居民来往内地通行证', '台胞证','士兵证/军官证/警官证','中国护照','港澳身份证','外国人永久居留身份证','机构代码','其他'],
			typeCode:[{name:'居民身份证',code:'IdCard'},{name:'统一社会信用代码',code:'CreditCode'},{name:'港澳居民来往内地通行证',code:'MacHKerPassport'},{name:'台胞证',code:'TaiwanesePassport'},{name:'士兵证/军官证/警官证',code:'Soldier'},{name:'中国护照',code:'ChinaPassPort'},
			{name:'港澳身份证',code:'GAIdCard'},{name:'外国人永久居留身份证',code:'ForeignForeverIdCard'},{name:'机构代码',code:'Organization'},{name:'其他',code:'Other'}],
			hasidType:false,
			hasCommencementDate:false,
			CommencementDateValue:'',
			DetailedAddress:'',
			applicantSexIndex:'1',
			commencementDate:new Date(this.Common.Public.GetDateStr(0)),
			hasCity:false,
			mask:false,
			cityList:[],
			falg:true,
			birstartDate: new Date('1949-01-01'),
      		birendDate: new Date(this.Common.Public.GetDateStr(0)),
			textFalg:false,
			showFwczrList:false,
			showDszssList:false,
			showJtcczhList:false,
			showJjzrList:false,
			showSpecialAgreement:false,
			showInsuranceDec:false,
			account:'',
			area:'',
			startDate: new Date(this.Common.Public.GetDateStr(1)),
			insuredBirthday: new Date(this.Common.Public.GetDateStr(1)),
			birthday: new Date(this.Common.Public.GetDateStr(0)),
			appbirthday:new Date(this.Common.Public.GetDateStr(0)),
			packageType:'',
			areaValue:'',
			isMessage:false,
			elevatorInsurance:'',
			hireLossInsurance:'',
			reputationInsureance:'',
			insuranceMethod:'',
			setMeal:'',
			transmissionTitle:'',
			cityValue:"广东省深圳市福田区",
			hasApplicant:false,
			issomeHouse:false,
			detailRoom:'',
			InsuredAddress:'深圳市',
			isWeixin:false,
			canVote:true,
			address:'广东省深圳市罗湖区',
			province: '广东省',//省
			city: '深圳市',//市
			area: '福田区',//县
			provinceCode: '',//省级代码
			cityCode: '', //市级代码
			areaCode: '440303',//县级代码
			isShow:false,
			regionInit: false,//禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
			myAddressSlots: [//省
			{
				flex: 1,
				values: zmGetProvincesArr(), //省份数组
				className: 'slot1',
				textAlign: 'center'
			},
			//分隔符
			{
				divider: true,
				content: '',
				className: 'slot2'
			},
			//市
			{
				flex: 1,
				values: zmGetCitiesArr('44'),
				className: 'slot3',
				textAlign: 'center'
			},
			{
				divider: true,
				content: '',
				className: 'slot4'
			},
			//县
			{
				flex: 1,
				values: zmGetAreaArr('4403'),
				className: 'slot5',
				textAlign: 'center'
			}
			],

        }
	},
	components:{
		fwczrList,
		jjzrList,
		jtcczhList,
		InsuranceDec,
		specialAgreement,
		// VDistpicker, 
		sanzexianList
	},
	async created(){
			var orderNo = sessionStorage.getItem('orderNo');
				var model = {};
				model = sessionStorage.getItem('fdInsuranceData');
				model = JSON.parse(model);
				this.premiumList = model.premiumList;
				this.extendPremium = model.extendPremium;
				this.packageType = model.packageType; //套餐类型
				this.area = model.area;
				// this.elevatorInsurance = model.elevatorInsurance; //电梯险
				this.hireLossInsurance = model.hireLossInsurance ; //租金损失
				this.reputationInsureance = model.reputationInsureance ;//房屋声誉损失
				this.account =	model.account ;//总金额
				this.setMeal = typeList[model.packageType];
				this.insuranceMethod = insuranceMethodList[model.currentIndex];
				this.upDataList.orderDetail.SchemeCode = setMealCode[model.packageType];//套餐code
				this.upDataList.orderDetail.ProductType = model.currentIndex;
				this.upDataList.orderDetail.PremiumCode	= areaCodeList[model.areaIndex];
					 
			},
    methods :{
		ownerBlur(e){
			if(this.upData.owner.IdentifyType == 'IdCard'){
				var isTrue =  this.Common.Public.judgeIDCard(this.upData.owner.IdentifyNumber);
				if(isTrue){
				}else{
					Toast('投保人身份证号码错误');
				}
			}
		},
			applicantBlur(e){
				if(this.upData.applicant.IdentifyType == 'IdCard'){
					var isTrue =  this.Common.Public.judgeIDCard(this.upData.applicant.IdentifyNumber);
					if(isTrue){
					}else{
						Toast('被投保人身份证号码错误');
					}
				}
			},
		 ownerBirth: function(e) { // 车主证件号校验+通过证件号来判断性别 出生日期
			const idNo = this.upData.owner.IdentifyNumber;
		
			if(this.upData.owner.IdentifyType == 'IdCard'){
				var sex = this.Common.Public.checkBirthday(idNo)[0];
				if(sex == "Male"){
					this.sexIndex = '1';
				}
				if(sex ==  "Female"){
					this.sexIndex = '2';
				}
				this.upData.owner.birthday = this.Common.Public.checkBirthday(idNo)[1];	
			}
		},
		sexChange(item,index){
			this.sexIndex = item.value;
		},
		applicantSexChange(item,index){
				this.applicantSexIndex = item.value;
			},
		selAddress(){
					this.isShow = false;
					// console.log(this.areaCode);
					this.cityValue = this.address;
					this.upDataList.orderDetail.AreaCode = this.areaCode;
					this.upDataList.orderDetail.AreaAddress = this.cityValue;
					this.InsuredAddress = this.city;
			},
			cancelAddress(){
				this.isShow = false;
			},
			addressChange(picker, values) { //地区选择器
				if (this.regionInit) {
				//取值并赋值
				if (values[0] && values[1]  && values[2]) {
					this.address = values[0]["name"] + values[1]["name"] + values[2]["name"];
					this.province = values[0]["name"];
					this.city = values[1]["name"];
					this.area = values[2]["name"];
					this.provinceCode = values[0]["code"];
					this.cityCode = values[1]["code"];
					this.areaCode = values[2]["code"];
					//给市、县赋值
					    let area = "";
						if (values[0].name == "北京市") {
							this.area  = "1101";
						} else if (values[0].name == "天津市") {
							this.area  = "1201";
						} else {
							this.area  = values[1]["code"];
						}
					picker.setSlotValues(1, zmGetCitiesArr(values[0]["code"]));
					picker.setSlotValues(2, zmGetAreaArr(values[1]["code"]));
					this.$emit("getRegion", this.address)
				}else {
					// console.log("数据不全");
				}
				} else {
			    	this.regionInit = true;
				}
			},
		 getNowFormatDate(d){
			var date;
			if(typeof(d) == "undefined"){
				date = new Date();
			}else{
				date = new Date(d); 
            	date.setFullYear(date.getFullYear()+1); 
           		date.setDate(date.getDate()-1);
			}
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		},
			onApplicantConfirm(value){
				this.upData.applicant.IdentifyTypeName = value;
				this.hasApplicant = false;
				for(var i = 0 ; i < this.typeResult.length; i++){
					if(value == this.typeCode[i].name){
						this.upData.applicant.IdentifyType = this.typeCode[i].code;
					}
				}
			},
			toAddress(){
				this.isShow = true;
				// this.hasCity = true;
			    // this.mask = true;
			},
			selected(data){
				if(data.area.code){
					this.mask =false;
					this.hasCity = false;
					this.cityValue = data.province.value  + data.city.value  + data.area.value;
					this.upDataList.orderDetail.AreaCode = data.area.code;
					this.InsuredAddress = data.city.value;
					this.upDataList.orderDetail.AreaAddress = this.cityValue;
				}
			},
			closeCitySelect(){
				this.mask =false;
				this.hasCity = false;
			},
            slideSwitch(){
               if(this.sameOwner == true){
                this.sameOwner = false;
                this.upData.applicant =  { InsuredName: "", PhoneNumber: "", IdentifyNumber: "", IdentifyType: "", InsuredAddress:"",IdentifyTypeName:'',	birthday:'',};
               }else{
                   this.sameOwner = true;
                   this.upData.applicant = this.upData.owner
               }  
			},
			someHouse(){
				this.issomeHouse = !this.issomeHouse;
			},
			cpicToase(){
				Toast("产品上线中，敬请期待！");
				
			},

			showFwczrListBtn(){
				this.cancelEvent();
				this.showFwczrList = true;
			},
			showDszssListBtn(){
				this.cancelEvent();
				this.showDszssList = true;
			},
			showJtcczhListBtn(){
				this.cancelEvent();
				this.showJtcczhList = true;
			},
			showSpecialAgreementBtn(){
				this.cancelEvent();
				this.showSpecialAgreement = true;
			},
			showInsuranceDecBtn(){
				this.cancelEvent();
				this.showInsuranceDec = true;
			},

			
			closeFwczrList(){
				this.showInsured();
				this.showFwczrList = false;
			},
			closeDszssList(){
				this.showInsured();
				this.showDszssList = false;
			},
			closeJtcczhList(){
				this.showInsured();
				this.showJtcczhList = false;
			},
			closeSpecialAgreement(){
				this.showInsured();
				this.showSpecialAgreement = false;
			},
			closeInsuranceDec(){
				this.showInsured();
				this.showInsuranceDec = false;
			},


			setRadioIpt(code){
				this.InsuranceCode = code; 
				this.upDataList.orderDetail.InsCorpCode = code;
			},
			onidTypeConfirm(value){
				this.upData.owner.IdentifyTypeName = value;
				this.hasidType = false;
				for(var i = 0 ; i < this.typeResult.length; i++){
					if(value == this.typeCode[i].name){
							this.upData.owner.IdentifyType = this.typeCode[i].code;
					}
				}
			},
			    selInsuredBirthday: function() { // 打开被保人生日日期层
				if (this.CommencementDateValuey) {
					this.insuredBirthday = new Date(this.CommencementDateValue);
				}
				this.$refs.insuredBirthday.open();
				},
				insuredBirthConfirm: function() { // 选择被保人生日日期
				this.CommencementDateValue = this.Common.Public.dateString(this.insuredBirthday)
				this.$refs.insuredBirthday.close();
				},
				selectBirthday: function() { // 打开被保人生日日期层
				if (this.upData.owner.birthday) {
					this.birthday = new Date(this.upData.owner.birthday);
				}
				this.$refs.birthday.open();
				},
				birthConfirm(){
					this.upData.owner.birthday = this.Common.Public.dateString(this.birthday)
					this.$refs.birthday.close();
				},
				selectApplicantBirthday(){
					if (this.upData.applicant.birthday) {
						this.appbirthday = new Date(this.upData.applicant.birthday);
					}
					this.$refs.appbirthday.open();
				},
			applicantbirthConfirm(){
					this.upData.applicant.birthday = this.Common.Public.dateString(this.appbirthday)
					this.$refs.appbirthday.close();
				},
			submitInsurance(){
				this.cancelEvent();
				var owner = {} , applicant = {} ;
				if(this.CommencementDateValue){
					this.upDataList.startDate = this.CommencementDateValue;
					this.upDataList.endDate = this.getNowFormatDate(this.upDataList.startDate);
					// console.log(this.upDataList.endDate);
				}else{
					Toast("请选择起保日期。");
					return false;
				}
				// this.upDataList.amount = 0.01;
				this.upDataList.amount = this.account;
				if(this.upData.owner.InsuredName){
					this.upDataList.applicantName =	this.upData.owner.InsuredName;
				}else{
					Toast("请输入投保人");
					return false;
				}
				if(this.upData.applicant.InsuredName ){
					this.upDataList.insurantName = this.upData.applicant.InsuredName;
				}else{
					Toast("请输入被投保人");
					return false ;
				}
				if(this.upData.owner.PhoneNumber){
					if(!(/^1[3456789]\d{9}$/.test(this.upData.owner.PhoneNumber))){ 
						Toast("投保人手机号码有误，请重新输入");  
						return false; 
					}
				}else{
					Toast("请输入投保人手机号");  
					return false; 
				}
				if(this.upData.applicant.PhoneNumber){
					if(!(/^1[3456789]\d{9}$/.test(this.upData.applicant.PhoneNumber))){ 
					Toast("被投保人手机号码有误，请重新输入");  
					return false; 
					}
				}else{
					Toast("请输入被投保人手机号");  
					return false; 
				}
				if(this.upData.owner.IdentifyTypeName == ""){
					Toast("请选择投保人证件类型");  
					return false; 
				}
				if(this.upData.applicant.IdentifyTypeName == ""){
					Toast("请选择投保人证件类型");  
					return false; 
				}
				
				if( this.upData.owner.IdentifyNumber){
					if(this.upData.owner.IdentifyType == "IdCard"){
						if(this.upData.owner.IdentifyNumber.length != 15 && this.upData.owner.IdentifyNumber.length != 18){
							Toast("投保人证件号错误");  
							return false; 
						}
					}
				}else{
					Toast("请输入投保人证件号");  
					return false; 
				}
				if( this.upData.applicant.IdentifyNumber){
					if(this.upData.applicant.IdentifyType == "IdCard"){
						if(this.upData.applicant.IdentifyNumber.length != 15 && this.upData.applicant.IdentifyNumber.length != 18){
							Toast("被投保人证件号错误");  
							return false; 
						}
						
					}
				}else{
					Toast("请输入被投保人证件号");  
					return false; 
				}

				if(this.upDataList.orderDetail.AreaCode == ""){
					Toast("请选择投保城市");  
					return false; 
				}
				if(this.DetailedAddress == ""){
					Toast("请选择输入详细地址");  
					return false; 
				}else{
					if(!this.issomeHouse){
						this.upDataList.orderDetail.DetailedAddress = this.DetailedAddress; 
					}
				}
				
				if(this.issomeHouse && this.detailRoom != ''){
					this.upDataList.orderDetail.DetailedAddress = this.DetailedAddress + ',' + this.detailRoom;
				}
				if(!this.canVote){
					 return
				 }
				 this.canVote = false;

				owner.InsuredName = this.upData.owner.InsuredName
				owner.PhoneNumber = this.upData.owner.PhoneNumber;
				owner.IdentifyType = this.upData.owner.IdentifyType;
				owner.IdentifyNumber = this.upData.owner.IdentifyNumber;
				owner.InsuredAddress = this.InsuredAddress;
				owner.Email = this.upData.owner.email || "1@123456789.com";
				if(this.upData.owner.IdentifyType != 'IdCard' && this.upData.owner.IdentifyType != 'Organization' && this.upData.owner.IdentifyType != 'CreditCode'){
                    if(this.upData.owner.birthday == ""){
							Toast("请选择投保人出生日期");
							return false; 
					}else{
							owner.Birthday = this.upData.owner.birthday;
							owner.Sex = this.sexIndex;
					}
                }
				owner.SerialNo = '1';
				applicant.InsuredName = this.upData.applicant.InsuredName;
				applicant.IdentifyType = this.upData.applicant.IdentifyType;
				applicant.PhoneNumber = this.upData.applicant.PhoneNumber;
				applicant.InsuredAddress =  this.InsuredAddress;
				applicant.IdentifyNumber = this.upData.applicant.IdentifyNumber;
				applicant.Email = owner.Email;
				applicant.Birthday = this.upData.owner.birthday;
				applicant.Sex = this.sexIndex;
				applicant.SerialNo = '2';

				this.upDataList.distributorCode = this.distributorCode;
				this.upDataList.distributorAttach = this.distributorAttach;
				this.upDataList.orderDetail.InsCorpCode = this.InsuranceCode;

				var Extendeds = {};

				// if(this.elevatorInsurance > 0){
				// 	Extendeds.KCBZ001 = this.elevatorInsurance; 
				// }
				if(this.hireLossInsurance > 0){
					Extendeds.KCBZ002 = this.hireLossInsurance;
				}
				if(this.reputationInsureance > 0){
					Extendeds.KCBZ003 = this.reputationInsureance;
				}
				this.upDataList.orderDetail.Extendeds = Extendeds;
				this.upDataList.orderDetail.RelationPeoples = [];
				this.upDataList.orderDetail.RelationPeoples.push(owner);
				this.upDataList.orderDetail.RelationPeoples.push(applicant);
				var model = JSON.stringify(this.upDataList);
				sessionStorage.setItem('nonCarList',model);
				Indicator.open('下单中...');
				var self = this;
				
				axiosPostAPI('/PropertyProducts/FDD001/Order',this.upDataList).then(res=>{
					Indicator.close();
					this.canVote = true;
					if(res.status){
						if(res.result.orderNo){
							if(self.distributorCode == 'SZFDKJ'){
							var Time = new Date().getTime();
							$.ajax({
									type:"POST",
									url:"https://api.fangdongtech.com/fdym/notice/zxib/operationnotice", //请求URl
									data:{
										attach:self.distributorAttach,
										clickTime:Time,
										operation:'/H5/savebriefinsuranceinfo',
										orderNo:res.result.orderNo
									},
									async:false,
									dataType: "json",
									success:function(data){
										
									},
									error:function(data){
										
									}
								}); 
              				}
							sessionStorage.setItem('orderNo',res.result.orderNo);
							// this.orderNo = this.$route.query.orderNo;
							 var hander;
							 var time = 30;
							 Indicator.open('出单中...');
								hander = setInterval(function() {
									time -- ;
									if(time > 0){
										//  /PropertyProducts/{productCode}/Order/{orderNo}
										axiosGetAPI('/PropertyProducts/FDD001/Order/' + res.result.orderNo).then(Data=>{
										if(Data.result.status  == "PendingPayment" || Data.result.status  == 'Initialization'){
											var	payurl = Data.result.payUrl;  
											clearInterval(hander);
											Indicator.close();
											self.$router.push({path:"/zxfdPage/payPage?payurl=" + encodeURIComponent(payurl)});
										} else if(Data.result.status  == "IssueFailed"){
											clearInterval(hander);
											Indicator.close();
											// Toast('出单失败，请重新提交信息');
											self.$dialog.confirm({
														title: '',
														message: '出单失败',
														}).then(() => {
												}).catch(() => {}); 
											}
											else if(Data.result.status  ==  "SuccessfulRelease"){
											clearInterval(hander);
											Indicator.close();
											// Toast('出单失败，请重新提交信息');
											self.$dialog.confirm({
														title: '',
														message: '出单成功，订单号：' + Data.result.insCorpOrderId,
														}).then(() => {
												}).catch(() => {}); 
											}	  
										})
									}else{
										clearInterval(hander);
										Indicator.close();
										// Toast('出单失败，请重新提交信息');
										 self.$dialog.confirm({
													title: '',
													message: '出单失败',
													}).then(() => {
													
											}).catch(() => {}); 
									}
								}, 2000)
						}
						
					}
				})
				
			},
			showInsured:function(t){
				if(!this.falg){ return false;}
				this.falg = false;
				if(t == "text"){
					//console.log('123')
					this.textFalg = true;
					$(".base_msg_box").find("h3").text("保险条款");
					$(".base_msg_text").css({"border":"none"});
					$(".sbtn").hide();
				}
				var $_bg = $(".black_box");
				$_bg.show();
				var $_this = $(".base_msg_box");
				$_bg.height($(document).height());
				var animate_height = ($(window).height() - $_this.height())/2;
				$_this.animate({"margin-top":animate_height + "px","opacity":"1"},300);
				$_bg.on("touchmove",this.bodyScroll,false); //禁止页面滚动
				return;
			},
			cancelEvent:function(){
				var self = this;
				var $_this = $(".base_msg_box");
				var $_bg = $(".black_box");
				$_this.animate({"margin-top":"0px","opacity":"0"},300,
					function(){
						$_this.parent().hide();
						self.falg = true;
						$_bg.off("touchmove",self.bodyScroll,false);//恢复页面滚动
						if(self.textFalg){
							$(".base_msg_box").find("h3").text("请仔细阅读以下协议");
							$(".sbtn").show();
							$(".base_msg_text").css({"border-bottom":"1px solid #e5e5ec"});
						}
						return;
					}
				);
			},
			insuredOperate(){
				
			},
			go_back(){
				this.$router.back();
			},
            },	
		mounted(){
				this.distributorCode = sessionStorage.getItem('distributorCode');
				this.distributorAttach = sessionStorage.getItem('distributorAttach');
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				this.isWeixin = isWeixin;
				if(isWeixin){
					this.upDataList.OrderSource	 = "WeiXin";	
				}
			}
        }
        </script>
		<style scoped>
		.base_msg_box>div>a.sbtn{ color:#333; background:linear-gradient(90deg,rgba(255,226,59,1) 0%,rgba(255,213,0,1) 100%);box-shadow:0px 2px 5px 0px rgba(255,192,0,0.7); border-radius: .8rem; width:80%; margin:.3rem auto;    padding: .2rem;}
		.base_msg_box>h3{ padding-top:.45rem; font-size:.36rem;}
		.insuranceSetBox, .insuranceTextBottom { padding-right:.3rem;}
		.insuranceTextBottom { border:none;}
		.insuranceBttomBtnBox>.cb>div{display: flex;flex-direction: column;float: left;}
		.insuranceBttomBtnBox>.cb>div>span{ float:left; font-size:.26rem; color:#FF1212; padding-top:.1rem;}
		.insuranceBttomBtnBox>.cb>div>span>i{ font-style:normal; font-size:.4rem;}
		/* .headerClose{    height: 50px; line-height: 45px;  position: fixed;  right: 0px; width: 100%; background: #fff; top: 40%;} */
		.headerClose{ padding: 0 0.32rem;height: 1rem;border-bottom: solid 1px #eee;display: flex;justify-content: space-between;align-items: center;}
		.headerClose span:nth-child(1){color: rgba(153,153,153,1);font-size: 0.32rem;}
		.headerClose span:nth-child(2){color: rgba(51,51,51,1);font-size: 0.32rem;}
		.headerClose span:nth-child(3){color:#FFD500;font-size: 0.32rem;}
		</style>