<template>
	<div style="background:#fff;">
        <header class="header_box" style="display:block;"  v-show="isWeixin">
        	<div class="header">
            	<div class="header_750 cb">
                	<a @click="go_back" class="go_back" href="javascript:void(0)">
                    	<span class="base_icon"></span>
                    </a>
                    <h2>投保资料填写</h2>
                </div>
            </div>
        </header>
        <div class="insuranceColumn" style="border-top:0px;">
        	<div class="insuranceColumnTop" style="display:flex;">
            	<h3 class="newCTitleBox_2">投保人信息<span class="newCTitle_explain">(保单购买者)</span></h3>
                <!-- <a style=" margin-top: .28rem;margin-left: 0.1rem;" class="InTextMsgBtn" href="javascript:void(0)" @click="isMessage = true" data-text=''></a> -->
            </div>
            <div v-show="isMessage" id="inpoTextMsgBox2" @click="isMessage = false"></div>
            <div v-show="isMessage" style="left: 0.3rem;margin-top: -0.1rem;" class="inpoTextMsgBox2">
                   <span class="s1" style="left:3.3rem"></span>
					<span class="s2" style="left:3.3rem"></span>      
					<div>
						<p style="font-size:12px;color:rgba(51,51,51,1)">
							投保人及被保险人需对投保标的具有法律上承认的利益（包括但不限于：房产所有人的子女作为投保人；与房产所有人签有转租或承包租赁合同的二房东作为投保人等。详见Q&A）。
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
                    <input name="applyIdNumber"  @blur="ownerBlur()" type="text" class="insuranceIpt_2" placeholder="请输入证件号"  v-model="upData.owner.IdentifyNumber" >
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
                    <input name="applyEmail" type="email" class="insuranceIpt_2" placeholder="用于接收电子版保单"  v-model="upData.owner.email" >
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
                    <input name="insuredIdNumber"  @blur="applicantBlur()"  type="text" class="insuranceIpt_2"  v-model="upData.applicant.IdentifyNumber" placeholder="请输入证件号" >
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
            <p class="dateAnnotation">注：投保人及被保险人需对投保标的具有法律上承认的利益</p>
        </div>
        

        <div style="background:#fff">   
             <div class="insuranceColumnTop" style="border-top: .17rem solid #F5F5F5;">
            	<h3 class="newCTitleBox_2">承保单位</h3>
            </div>
            <div style="padding:.3rem;">
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
                <li class="cb pr js_address_c1">投保房产地址<i>*</i>
                	<input name="address_1" type="hidden" value="" class="setIptValue" id="value1" readonly>  
                    <input name="address_text" type="text" :value="cityValue" class="insuranceIpt" placeholder="请选择省市区" id="demo1" @click="toAddress" readonly>
            	</li>

                <li class="cb pr js_address_c2" >
  					<input name="address_2" type="text" class="insuranceIpt_2_1" placeholder="请输入楼栋详细地址" v-model="DetailedAddress" >
            	</li>
                
             </ul>
             <ul class="annotation">
                 <li>1、本保单仅承保住宅房屋，经营性质场所不在保障范围内。</li>
                 <li>2、如投保人投保多个地址，须单独进行投保，不可合计面积进行选择，否则本保单不承担保险责任。</li>
				 <li>3、请准确填写房屋详细地址，否则可能影响到保险理赔（详细到门牌号）</li>
             </ul>
             <ul class="messageList">
               <li class="cb pr" style="border-top: 1px solid #eee">保险生效日期<i>*</i>
                	<input name="startDate" type="hidden" value="" class="setIptValue" readonly>  
                    <input name="" type="text" class="insuranceIpt" v-model="CommencementDateValue" placeholder="请选择" readonly @click="selInsuredBirthday" >
            	</li>
            </ul>
            <p class="dateAnnotation">将于下个工作日结束前完成审核出单，正式保险生效日期可能因出单时间顺延</p>
        </div> 
       <div style="padding-left:0.3rem">
                <ul class="messageList" style=" padding-left: 0;">
                    <li class="cb pr">保险期限
                    	<input name="deadline" type="text" class="insuranceIpt_2"  value="一年" readonly>
                    </li>
                    <li class="cb pr">选择套餐
                    	<input name="insurance_set" type="text" class="insuranceIpt_2"  value="温馨版" readonly>
                    </li>
                    <li class="cb pr">投保面积(建筑面积)
                    	<input name="tenantSetArea" type="text" class="insuranceIpt_2" data-premium=""  :value="areaValue" readonly>
                    </li>
                    <li v-if="guardianAcount > 0" class="cb pr js_guardian">监护人责任
                    	<input name="guardian" type="text" class="insuranceIpt_2"  :value="guardianAcount + '份'" data-premium="" readonly>
                    </li>
                    <li v-if="guardianAcount > 0" class="cb pr js_guardian"><span style="padding-left:.4rem;">被监护人姓名<i style="color:#FF1212">*</i></span>
                    	<input  type="text" class="insuranceIpt_2" placeholder="请输入姓名" v-model="guardianName">
                    </li>
                    <li v-if="homeMakAcount > 0" class="cb pr js_housekeeping">家政人员第三者责任
                    	<input name="housekeeping" type="text" class="insuranceIpt_2"  :value="homeMakAcount + '份'" data-premium="" readonly>
                    </li>
                    <li v-if="petAcount > 0" class="cb pr js_pet">宠物责任
                    	<input name="pet" type="text" class="insuranceIpt_2"  :value="petAcount + '份'" data-premium="" readonly>
                    </li>
                    <li v-if="petAcount > 0" class="cb pr js_pet"><span style="padding-left:.4rem;">宠物类型<i style="color:#FF1212">*</i></span>
                    	<input name="petType" type="text" class="insuranceIpt_2" placeholder="请输入宠物类型"  v-model="PetType">
                    </li>
                    <li v-if="petAcount > 0" class="cb js_pet"><span style="line-height:1.2rem; padding-left:.4rem;">与宠物合照<i style="color:#FF1212">*</i></span>
                        <div style="text-align: right;width:50%;float: right;font-size: .3rem; color: #333;">
							 <van-uploader  :max-count="1" :after-read="onRead"    preview-size='60px'  v-model="fileList" accept="image/*"  />
						  </div>
                	</li>
                    <li v-if="carAcount > 0" class="cb pr js_bike">电动自行车第三者责任
                    	<input name="bike" type="text" class="insuranceIpt_2"  :value="carAcount + '份'" data-premium="" readonly>
                    </li>
                    <li  v-if="carAcount > 0" class="cb pr js_bike"><span style="padding-left:.4rem;">车架号<i style="color:#FF1212">*</i></span>
                    	<input name="bikeId" type="text" class="insuranceIpt_2" placeholder="请输入车架号"  v-model="vin">
                    </li>
                    <li  v-if="gasAcount > 0" class="cb pr js_gas">燃气安全({{gasTypeList[gasIndex]}})
                    	<input name="gas" type="text" class="insuranceIpt_2"  :value="gasAcount + '份'" data-premium="" readonly>
                        <input name="gasType" type="text" style="display:none;">
                    </li>
                </ul>


        <h3 style="font-size:.3rem; color:#333; padding:.3rem 0;">保障内容</h3>
                <div style="padding-right:.3rem; padding-bottom:.3rem;">
                	<table class="nweInsuranceTab">
                        <tr>
                            <th style=" width:33%;">基本保障内容</th>
                            <th>赔偿限额</th>
                            <th>保障</th>
                        </tr>
                        <tr>
                            <td rowspan="5">第三者人身伤亡及财产损失赔偿责任（水管爆裂责任 、高空抛物责任）</td>
                            <td>累计责任限额</td>
                            <td>300万</td>
                        </tr>
                        <tr>
                            <td>每次事故责任限额</td>
                            <td>300万</td>
                        </tr>
                        <tr>
                            <td>每次事故每人伤亡责任限额</td>
                            <td>150万</td>
                        </tr>
                        <tr>
                            <td>每次事故财产损失责任限额</td>
                            <td>20万</td>
                        </tr>
                        <tr>
                            <td>法律费用累计责任限额</td>
                            <td>5万</td>
                        </tr>
                        <tr>
                            <td rowspan="4">家庭财产损失<br>赔偿责任 </td>
                            <td>房屋主体、附属建筑物</td>
                            <td>50万</td>
                        </tr>
                        <tr>
                            <td>室内附属设施</td>
                            <td>10万</td>
                        </tr>
                        <tr>
                            <td>室内装潢</td>
                            <td>10万</td>
                        </tr>
                        <tr>
                            <td>室内财产</td>
                            <td>10万</td>
                        </tr>
                        <tr v-show="guardianAcount">
                            <td rowspan="3">监护人责任</td>
                            <td>累计责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr v-show="guardianAcount">
                            <td>每次事故责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr v-show="guardianAcount">
                            <td>每次事故每人责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr v-show="homeMakAcount">
                            <td rowspan="3">家政人员<br>第三者责任</td>
                            <td>累计责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr v-show="homeMakAcount">
                            <td>每次事故死亡伤残赔偿限额</td>
                            <td>10万/份</td>
                        </tr >
                        <tr v-show="homeMakAcount">
                            <td>每次事故医疗赔偿限额</td>
                            <td>1万/份</td>
                        </tr>
                        <tr v-show="petAcount">
                            <td rowspan="3">宠物责任</td>
                            <td>累计责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr v-show="petAcount">
                            <td>每次事故责任限额</td>
                            <td>2万/份</td>
                        </tr>
                        <tr v-show="petAcount">
                            <td>每次事故每人责任限额</td>
                            <td>2万/份</td>
                        </tr>
                        <tr v-show="carAcount">
                            <td rowspan="3">电动自行车<br>第三者责任</td>
                            <td>累计责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr v-show="carAcount">
                            <td>每次事故责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr v-show="carAcount">
                            <td>每次事故每人责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr v-show="gasAcount">
                            <td rowspan="3">燃气安全</td>
                            <td>累计责任限额</td>
                            <td>20万/份</td>
                        </tr>
                        <tr v-show="gasAcount">
                            <td>每次事故责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr v-show="gasAcount">
                            <td>每次事故每人责任限额</td>
                            <td>10万/份</td>
                        </tr>
                    </table>
                </div>
            </div>

        <div style="height:1.5rem;">
        	<div class="insuranceBttomBtnBox">
                <div class="cb">
					<div >
                        <span><b style="color:#333; font-weight:500;">保险费用: </b><i class="totalAmount"> {{account}}</i> 元/户/年</span>
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
                	<a @click="showFwczrListBtn " style="font-weight:500;">《居家责任保险条款》</a>
					<a @click="showFJCCBtn " style="font-weight:500;">《附加家庭财产综合保险条款》</a>
					<a v-show="guardianAcount" @click="showJHRListBtn " style="font-weight:500;">《监护人责任保险条款》</a>
					<a v-show="homeMakAcount" @click="showJtcczhListBtn" style="font-weight:500;">《家政服务人员第三者责任附加保险条款》</a>
                    <a v-show="petAcount" @click="showDwsyzrBtn" style="font-weight:500;">《动物饲养责任保险条款》</a>
					<a v-show="carAcount" @click="showDszssListBtn " style="font-weight:500;">《电动自行车第三者责任保险条款》</a>
					<a v-show="gasAcount" @click="showRQZRListBtn " style="font-weight:500;">《燃气责任保险条款》</a>
                    <a @click="showSpecialAgreementBtn " style="font-weight:500;">《特别约定》</a>
					<a @click="showInsuranceDecBtn" style="font-weight:500;">《投保声明》</a>
                </div>
            	<div class="cb"><a class="sbtn" href="javascript:void(0)" @click="submitInsurance">同意协议并投保</a></div>
            </div>
        </div>

		<mt-popup position="bottom" v-model="isShow">
			  <div class="picker-toolbar headerClose">
					<span @click="isShow = false">取消</span>
					<span >请选择省市区</span> 
					<span @click="selAddress">确定</span>
			</div>
				<mt-picker :slots="myAddressSlots"  valueKey="name" :visibleItemCount="5" @change="addressChange"
					:itemHeight="40"></mt-picker>
		</mt-popup>

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
			<img style="width:100%" src="../../assets/images/insurance_2/eleInsurance.jpg" alt="">
		</van-popup>

        <mt-datetime-picker  @touchmove.native.stop.prevent ref="birthday" v-model="birthday" type="date"
		:startDate="birstartDate" :endData="birendDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="birthConfirm">
		</mt-datetime-picker>

        <mt-datetime-picker  @touchmove.native.stop.prevent ref="appbirthday" v-model="appbirthday" type="date"
			:startDate="birstartDate" :endData="birendDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="applicantbirthConfirm">
		</mt-datetime-picker>

        <mt-datetime-picker @touchmove.native.stop.prevent ref="insuredBirthday" v-model="insuredBirthday" type="date" :startDate="startDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="insuredBirthConfirm">
		</mt-datetime-picker>
		
		<van-popup v-model="showFwczrList" :close-on-click-overlay="false" round style="height:80%" position="bottom">
			<a class="closedPopupBtn" @click="closeFwczrList"><span></span></a>
			<jjzrList ></jjzrList> 
		</van-popup>
		
		<van-popup v-model="showDszssList" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<a class="closedPopupBtn" @click="closeDszssList"><span></span></a>
			<tenantDDZXC ></tenantDDZXC> 
		</van-popup>

		<van-popup v-model="showJtcczhList" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<a class="closedPopupBtn" @click="closeJtcczhList"><span></span></a>
			<proprietJZFW ></proprietJZFW> 
		</van-popup>

		<van-popup v-model="showSpecialAgreement" :close-on-click-overlay="false" round style="height:80%" position="bottom">
			<div class="closedPopupBtn" @click="closeSpecialAgreement"><span></span></div>
			<proprietorTY ></proprietorTY> 
		</van-popup>

		<van-popup v-model="showDwsyzr" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<div class="closedPopupBtn" @click="closeDwsyzr"><span></span></div>
			<TenantDwsyzrList ></TenantDwsyzrList> 
		</van-popup>

		<van-popup v-model="showRQZRList" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<div class="closedPopupBtn" @click="closeRQZRList"><span></span></div>
			<tenantRQZRList :isShow="isShowDetail" ></tenantRQZRList> 
		</van-popup>

		<van-popup v-model="showJHRList" :close-on-click-overlay="false" round style="height:80%" position="bottom">
			<div class="closedPopupBtn" @click="closeJHRList"><span></span></div>
			<tenantJHRList></tenantJHRList> 
		</van-popup>

		<van-popup v-model="showInsuranceDec" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<div class="closedPopupBtn" @click="closeInsuranceDec"><span></span></div>
			<InsuranceDec ></InsuranceDec> 
		</van-popup>

		<van-popup v-model="showFJCC" :close-on-click-overlay="false"  round style="height:80%" position="bottom">
			<div class="closedPopupBtn" @click="closeFJCC"><span></span></div>
			<jtcczhList ></jtcczhList> 
		</van-popup>

    </div>
</template>
  <script >
   import "./../../assets/css/zxfd/base.scss";
    import "./../../assets/js/rem.js";
   import jjzrList from "./jjzrList.vue";
   import jtcczhList from "./jtcczhList.vue";
   import proprietJZFW from "./proprietJZFW.vue";
   import tenantDDZXC from "./tenantDDZXC.vue"; 
   import proprietorTY from "./proprietorTY.vue";   
   import InsuranceDec from "./InsuranceDec.vue";
   import TenantDwsyzrList from "./TenantDwsyzrList.vue";
   import tenantJHRList from "./tenantJHRList.vue"; 
   import tenantRQZRList from "./tenantRQZRList.vue"; 
   import { zmGetProvincesArr,zmGetCitiesArr,zmGetAreaArr } from '../../assets/js/zmRegion'
   import { dialog } from 'vant';
   import { Toast ,Indicator } from 'mint-ui';
   import { axiosGetAPI, axiosPostAPI } from '../../common/Axios';
    const areaCodeList = ['BF001','BF002','BF003','BF004','BF005']
 export default {
    data(){
        return{
			isShowDetail:true,
            guardianAcount:0,
            petAcount:0,
            gasAcount:0,
            carAcount:0,
            homeMakAcount:0,
			isCover:false,
            isGuardian:false,
            isCar:false,
            isPet:false,
            isGas:false,			
			showtenantDetail:false,
            tancanTypeIndex:[0],
            sexIndex:'1',
            sexList:[{name:'男',value:'1'},{name:'女',value:'2'}],
            areaList:[{name:'1~35㎡',value:'1~35'},{name:'36~80㎡',value:'36~80'},{name:'81~130㎡',value:'81~130'},],
            areaIndex:'',
            qx:"一年",
            tancanIndex:0,
            isMessage:false,
            sameOwner:false,
            guardianName:'',
            showEleInsurance:false,
            vin:'',
            PetType:'',
            gasIndex:0,
			gasTypeList:['瓶装','管道'],
			DetailedAddress:'',
            upData:{
                owner: { InsuredName: "", PhoneNumber: "", IdentifyNumber: "", IdentifyType: "", InsuredAddress:"",email:"",IdentifyTypeName:"",birthday:''},
               applicant: { InsuredName: "", PhoneNumber: "", IdentifyNumber: "", IdentifyType: "", InsuredAddress:"",IdentifyTypeName:'',birthday:''},
			},	
			InsuredAddress:'深圳市',
            address:'广东省深圳市罗湖区',
			upDataList:{
                    "distributorCode": "",
                    "OrderSource":"",
					"productCode": "PICC-LDO", //string,产品编号
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
						"ProductType":1,
						"SchemeCode": "FA01",
						"PremiumCode": "",
						"Extendeds": {},
						"RelationPeoples": [],
						"Other": {
							"VIN":"",
							"MotorNumber":"",
							"PetType": "",
							"WardName": "",
							"PetPhoto": ""
						},
					},	
					"distributorAttach": ""
			},
			InsuranceCode:"PICC",              
			typeResult : ['居民身份证', '港澳居民来往内地通行证', '台胞证','士兵证/军官证/警官证','中国护照','港澳身份证','外国人永久居留身份证','其他'],
			typeCode:[{name:'居民身份证',code:'IdCard'},{name:'港澳居民来往内地通行证',code:'MacHKerPassport'},{name:'台胞证',code:'TaiwanesePassport'},{name:'士兵证/军官证/警官证',code:'Soldier'},{name:'中国护照',code:'ChinaPassPort'},
			{name:'港澳身份证',code:'GAIdCard'},{name:'外国人永久居留身份证',code:'ForeignForeverIdCard'},{name:'其他',code:'Other'}],
			hasidType:false,
			hasCommencementDate:false,
			CommencementDateValue:'',
			commencementDate:new Date(this.Common.Public.GetDateStr(0)),
			hasCity:false,
			mask:false,
			cityList:[],
			falg:true,
			fileList:[],
			textFalg:false,
			showFwczrList:false,
			showDszssList:false,
			showFJCC:false,
			showJtcczhList:false,
			showJjzrList:false,
			showJHRList:false,
			showDwsyzr:false,
			showRQZRList:false,
			showSpecialAgreement:false,
            showInsuranceDec:false,
            applicantSexIndex:'1',
            birthday: new Date(this.Common.Public.GetDateStr(0)),
            appbirthday: new Date(this.Common.Public.GetDateStr(0)),
			birstartDate: new Date('1949-01-01'),
      		birendDate: new Date(this.Common.Public.GetDateStr(0)),
			account:0,
			packageType:'',
			areaValue:'',
			insuranceMethod:'',
			setMeal:'',
			transmissionTitle:'',
			cityValue:"广东省深圳市福田区",
			hasApplicant:false,
			issomeHouse:false,
			startDate: new Date(this.Common.Public.GetDateStr(1)),
			detailRoom:'',
			falgUpdata:true,
			imgBase64:[],
			canVote:true,
			insuredBirthday: new Date(this.Common.Public.GetDateStr(1)),
			isWeixin:false,
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
		jtcczhList,
		jjzrList,
		proprietJZFW,
		InsuranceDec,
		proprietorTY,
		tenantDDZXC,
		TenantDwsyzrList,
		tenantJHRList,
		tenantRQZRList
	},
	created(){
				this.distributorCode = sessionStorage.getItem('distributorCode');
				if(sessionStorage.getItem('distributorAttach')){
					this.distributorAttach = sessionStorage.getItem('distributorAttach');
				}
                var model = JSON.parse(sessionStorage.getItem('proprietorData'));
                this.areaValue = model.areaValue;
                this.account = model.account   //总金额
                this.guardianAcount = model.guardianAcount ;//套餐类型
                this.petAcount = model.petAcount ;
                this.gasAcount = model.gasAcount ;
                this.carAcount = model.carAcount ;
                this.homeMakAcount = model.homeMakAcount ;
                this.areaIndex = model.areaIndex;
                this.gasIndex = model.gasIndex;
               
                // console.log(Extendeds);
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
        	sexChange(item,index){
			    this.sexIndex = item.value;
            },

            applicantSexChange(item,index){
				this.applicantSexIndex = item.value;
			},
			selAddress(){
					this.isShow = false;
					this.cityValue = this.address;
					this.upDataList.orderDetail.AreaCode = this.areaCode;
					this.upDataList.orderDetail.AreaAddress = this.cityValue;
					this.InsuredAddress = this.city;
            },
            selectBirthday: function() { // 
				if (this.upData.owner.birthday) {
					this.birthday = new Date(this.upData.owner.birthday);
				}
				this.$refs.birthday.open();
				},
			birthConfirm(){
					this.upData.owner.birthday = this.Common.Public.dateString(this.birthday)
					this.$refs.birthday.close();
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

			showFwczrListBtn(){
					this.showFwczrList = true;
					this.cancelEvent()
			},
			showJtcczhListBtn(){
					this.showJtcczhList = true;
					this.cancelEvent()
			},
			showFJCCBtn(){
					this.showFJCC = true;
					this.cancelEvent()
			},
			showDszssListBtn(){
					this.showDszssList = true;
					this.cancelEvent()
			},
			showDwsyzrBtn(){
					this.showDwsyzr = true;
					this.cancelEvent()
			},
			showJHRListBtn(){
					this.showJHRList = true;
					this.cancelEvent()
			},
			showRQZRListBtn(){
					this.showRQZRList = true;
					this.cancelEvent()
			},
			showSpecialAgreementBtn(){
					this.showSpecialAgreement = true;
					this.cancelEvent()
			},
			showInsuranceDecBtn(){
					this.showInsuranceDec = true;
					this.cancelEvent()
            },
			
			
			closeFJCC(){
					this.showFJCC = false;
					this.showInsured()
			},
            closeFwczrList(){
					this.showFwczrList = false;
					this.showInsured()
			},
			closeJtcczhList(){
					this.showJtcczhList = false;
					this.showInsured()
			},
			closeDszssList(){
					this.showDszssList = false;
					this.showInsured()
			},
			closeDwsyzr(){
					this.showDwsyzr = false;
					this.showInsured()
			},
			closeJHRList(){
					this.showJHRList = false;
					this.showInsured()
			},
			closeRQZRList(){
					this.showRQZRList = false;
					this.showInsured()
			},
			closeSpecialAgreement(){
					this.showSpecialAgreement = false;
					this.showInsured()
			},
			closeInsuranceDec(){
					this.showInsuranceDec = false;
					this.showInsured()
			},

			onRead(file){
					this.imgBase64 = [];
				    // 大于1.5MB的jpeg和png图片都缩小像素上传
					if(file.file.size>1500000) {
					// 创建Canvas对象(画布)
					let canvas =  document.createElement('canvas')  
					// 获取对应的CanvasRenderingContext2D对象(画笔)
					let context = canvas.getContext('2d') 
					// 创建新的图片对象 
					let img = new Image()
					// 指定图片的DataURL(图片的base64编码数据)
					img.src = file.content
					// 监听浏览器加载图片完成，然后进行进行绘制
					img.onload = () => {
						// 指定canvas画布大小，该大小为最后生成图片的大小
						canvas.width = 400
						canvas.height = 300
						/* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
						如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/ 
						context.drawImage(img, 0, 0, 400, 300)
						// 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
						file.content = canvas.toDataURL(file.file.type, 0.92) 
						// 最后将base64编码的图片保存到数组中，留待上传。
						if(this.imgBase64.length < 1) {
							this.imgBase64.push(file.content)
						}else{
						// alert("最多上传6张图片")
						}
					}                       
					}else{
					// 不做处理的jpg和png以及gif直接保存到数组
					if(this.imgBase64.length < 1) {
						this.imgBase64.push(file.content)
					}else{
						// alert("最多上传6张图片")
					}
					}
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
			},
			selected(data){
				if(data.area.code){
					this.mask =false;
					this.hasCity = false;
					this.InsuredAddress = data.city.value
					this.cityValue = data.province.value + data.city.value  + data.area.value;
					this.upDataList.orderDetail.AreaCode = data.area.code;
					this.upDataList.orderDetail.AreaAddress = this.cityValue;
				}
			},
			closeCitySelect(){
				this.isShow = false;
			},
        	 slideSwitch(){
               if(this.sameOwner == true){
                this.sameOwner = false;
                this.upData.applicant =  { InsuredName: "", PhoneNumber: "", IdentifyNumber: "", IdentifyType: "", InsuredAddress:"",IdentifyTypeName:'',birthday:''}
               }else{
                   this.sameOwner = true;
                   this.upData.applicant = this.upData.owner
               }  
			},
			someHouse(){
				this.issomeHouse = !this.issomeHouse;
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
            
			onCommencementDate(value){
				this.CommencementDateValue = this.Common.Public.dateString(value);
				this.hasCommencementDate = false;
			},
			
		 async submitInsurance(){
			 	this.cancelEvent();
				// if(this.falgUpdata)	{
				var owner = {} , applicant = {} ;
				if(this.CommencementDateValue){
					this.upDataList.startDate = this.CommencementDateValue;
					this.upDataList.endDate = this.getNowFormatDate(this.upDataList.startDate);
				}else{
					Toast("请选择起保日期。");
					return false;
				}
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
					Toast("请选择被投保人证件类型");  
					return false; 
				}
				
				if( this.upData.owner.IdentifyNumber){
					if(this.upData.owner.IdentifyType == "IdCard"){
						if(this.upData.owner.IdentifyNumber.length != 15 && this.upData.owner.IdentifyNumber.length != 18){
							Toast("投保人证件号错误");  
							return false; 
						}
                    }
                    // if(this.upData.owner.IdentifyType != 'IdCard' && this.upData.owner.IdentifyType != 'Organization' && this.upData.owner.IdentifyType != 'CreditCode'){
                    //     if(this.upData.owner.birthday == ""){
					// 			Toast("请选择投保人出生日期");
					// 			return false; 
					// 		}
                    // }  
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
						this.upDataList.orderDetail.DetailedAddress = this.DetailedAddress
					}
				}
				var imgUrl = '';
				if(this.fileList.length > 0){
                    Indicator.open('下单中...');
					var fileModel = {};
					fileModel.dataURIString = this.imgBase64[0];
                  await	 axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                      Indicator.close();
                           imgUrl = res.result.url;
                           
					   })
				}
                if(!this.canVote){
					 return
				 }
				 this.canVote = false;
				var other =	 {
							"VIN":"",
							"MotorNumber":"",
							"PetType": "",
							"WardName": "",
							"PetPhoto": ""
						};
				this.upDataList.orderDetail.Other = other;		
				this.upDataList.orderDetail.PremiumCode = "";
                 this.upDataList.orderDetail.PremiumCode += areaCodeList[this.areaIndex]
				            // if(this.homeMakAcount >= 0){ //家政人员责任险
							// 	this.upDataList.orderDetail.SchemeCode += "FJXZ06"
                            // }
                             if(this.guardianAcount > 0){ //监护人责任险
								// if(this.upDataList.orderDetail.SchemeCode.length > 0){
								// 	this.upDataList.orderDetail.SchemeCode += ",FJXZ02"
								// }else{
								// 	this.upDataList.orderDetail.SchemeCode += "FJXZ02"
								// }
								if(this.guardianName == ''){
									Toast('请输入监护人姓名');
									return
								}else{
									this.upDataList.orderDetail.Other.WardName = this.guardianName
								}
                            }
                             if(this.carAcount > 0){ //电动自行车
								// if(this.upDataList.orderDetail.SchemeCode.length > 0){
								// 	this.upDataList.orderDetail.SchemeCode += ",FJXZ01"
								// }else{
								// 	this.upDataList.orderDetail.SchemeCode += "FJXZ01"
								// }
								if(this.vin == ''){
									Toast('请输入车架号');
									return;
								}else{
									this.upDataList.orderDetail.Other.VIN = this.vin
								}	
                            }
                             if(this.petAcount > 0){ //宠物险
								// if(this.upDataList.orderDetail.SchemeCode.length > 0){
								// 	this.upDataList.orderDetail.SchemeCode += ",FA005"
								// }else{
								// 	this.upDataList.orderDetail.SchemeCode += "FA005"
                                // }
								if(this.PetType == ''){
									Toast('请输入宠物类型');
									return;
								}else{
									this.upDataList.orderDetail.Other.PetType = this.PetType
								}
								if(imgUrl == ''){
									Toast('请上传与宠物合照');
									return
								}else{
									this.upDataList.orderDetail.Other.PetPhoto = imgUrl ;
								}	
                            }

            
				
				owner.InsuredName = this.upData.owner.InsuredName
				owner.PhoneNumber = this.upData.owner.PhoneNumber;
				owner.IdentifyType = this.upData.owner.IdentifyType;
				owner.IdentifyNumber = this.upData.owner.IdentifyNumber;
				owner.InsuredAddress = this.InsuredAddress;
                owner.Email = this.upData.owner.email  || "1@123456789.com";
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
                if(this.sameOwner == true){
                    applicant.Birthday = this.upData.owner.birthday;
                    applicant.Sex = this.sexIndex;
                }else{
                  if(this.upData.applicant.IdentifyType != 'IdCard' && this.upData.applicant.IdentifyType != 'Organization' && this.upData.applicant.IdentifyType != 'CreditCode'){
                    if(this.upData.applicant.birthday == ""){
							Toast("请选择被投保人出生日期");
							return false; 
					}else{
							applicant.Birthday = this.upData.applicant.birthday;
							applicant.Sex = this.applicantSexIndex;
					}
                 }
                }
				applicant.SerialNo = '2';
               
				this.upDataList.distributorCode = this.distributorCode;
				this.upDataList.distributorAttach = this.distributorAttach;
                this.upDataList.orderDetail.InsCorpCode = this.InsuranceCode;	
               			
                
                var Extendeds = {};
				if(this.carAcount > 0){
					Extendeds.FJXZ01 = this.carAcount; 
				}
				if(this.guardianAcount > 0){
					Extendeds.FJXZ02 = this.guardianAcount;
                }
                if(this.gasAcount > 0){
                    if(this.gasIndex == 0){
					    Extendeds.FJXZ03_1 = this.gasAcount;
                    }else{
                        Extendeds.FJXZ03_2 = this.gasAcount;
                    }
                }
				if(this.petAcount > 0){
					Extendeds.FJXZ04 = this.petAcount;
                }
                if(this.homeMakAcount > 0){
					Extendeds.FJXZ05 = this.homeMakAcount;
                }
                
                
				this.upDataList.orderDetail.Extendeds = Extendeds;
				this.upDataList.orderDetail.RelationPeoples = [];
				this.upDataList.orderDetail.RelationPeoples.push(owner);
				this.upDataList.orderDetail.RelationPeoples.push(applicant);
				this.falgUpdata = false;
				var model = JSON.stringify(this.upDataList);
				sessionStorage.setItem('nonCarList',model);					
				var self = this;
				Indicator.open('下单中...');
				axiosPostAPI('/PropertyProducts/PICC-LDO/Order',this.upDataList).then(res=>{
				Indicator.close();
				this.canVote = true;
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
					if(res.status == 200){
						sessionStorage.setItem('orderNo',res.result.orderNo);
							 var hander , payurl;
							 var time = 20;
							 Indicator.open('出单中...');
								hander = setInterval(function() {
									time -- ;
									if(time > 0){
										axiosGetAPI('/PropertyProducts/PICC-LDO/Order/' + res.result.orderNo).then(Data=>{
										if(Data.result.status  == "PendingPayment" || Data.result.status  == 'Initialization'){
											payurl = Data.result.payUrl;  
											clearInterval(hander);
											Indicator.close();
											self.$router.push({path:"/zxfdPage/payPage?payurl="+ encodeURIComponent(payurl)});
										} else if(Data.result.status  !=  "OutOfOrder"){
											clearInterval(hander);
											Indicator.close();
											// Toast('出单失败，请重新提交信息');
											if(Data.result.remark){
												self.$dialog.confirm({
														title: '',
														message: Data.result.remark,
														}).then(() => {
													}).catch(() => {}); 
												}else{
												self.$dialog.confirm({
														title: '',
														message: "出单失败",
														}).then(() => {
													}).catch(() => {}); 
												}
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
				})
			},
			bodyScroll:function(event){
				event.preventDefault();
				event.stopPropagation()
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
				console.log(this.upDataList);	
				console.log(this.ownerModel);
				console.log(this.applicantModel);
			},
			go_back(){
				this.$router.back();
			},
            },	
		mounted(){
			// sessionStorage.setItem('title','出租无忧');
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
            this.isWeixin = isWeixin
			if(isWeixin){
					this.upDataList.OrderSource	 = "WeiXin";	
				}
			}
        }
        </script>
		<style scoped>
		.base_msg_box>div>a.sbtn{ color:#333; background:linear-gradient(90deg,rgba(255,226,59,1) 0%,rgba(255,213,0,1) 100%);box-shadow:0px 2px 5px 0px rgba(255,192,0,0.7); border-radius: .8rem; width:80%; margin:.3rem auto;padding:0.2rem}
		.base_msg_box>h3{ padding-top:.45rem; font-size:.36rem;}
		.insuranceSetBox, .insuranceTextBottom { padding-right:.3rem;}
		.insuranceTextBottom { border:none;}
		.insuranceBttomBtnBox>.cb>div{display: flex;flex-direction: column;float: left;}
		.insuranceBttomBtnBox>.cb>div>span{ float:left; font-size:.26rem; color:#FF1212; padding-top:.1rem;}
		.insuranceBttomBtnBox>.cb>div>span>i{ font-style:normal; font-size:.4rem;}
		/* .headerClose{height: 0.76rem; line-height: 45px;  position: fixed;  right: 0px; width: 100%; background: #fff; top: 40%;} */
		.headerClose{ padding: 0 0.32rem;height: 1rem;border-bottom: solid 1px #eee;display: flex;justify-content: space-between;align-items: center;}
		.headerClose span:nth-child(1){color: rgba(153,153,153,1);font-size: 0.32rem;}
		.headerClose span:nth-child(2){color: rgba(51,51,51,1);font-size: 0.32rem;}
		.headerClose span:nth-child(3){color:#FFD500;font-size: 0.32rem;}
		</style>