<template>
	<div style="background:#F5F5F5;">
         <div class="nweInsuranceBg3" v-show="isFDKJ"></div>
         <div class="nweInsuranceBg3_1" v-show="isZXJJ"></div>
        <div class="nweInsuranceColumn">
            <div style="padding-left:.3rem">
                 <div style="display:flex">
					<h4 class="nweInsuranceTitle" style="display:flex;">
						<span>投保面积(建筑面积)</span> 
					</h4>
					<a style=" margin-top: .48rem;margin-left: 0.1rem;" class="InTextMsgBtn_1" href="javascript:void(0)" @click="isMessage = true" data-text=''></a>
				</div>
				<div v-show="isMessage" id="inpoTextMsgBox2" @click="isMessage = false"></div>
				<div v-show="isMessage" style="left: 0.3rem;margin-top: -0.1rem;" class="inpoTextMsgBox2">
						<span class="s1" style="left:2.7rem"></span>
						<span class="s2" style="left:2.7rem"></span>     
						<div>
							<p style="font-size:12px;color:rgba(51,51,51,1)">
								必须按照对应的面积区间进行投保，否则将视为不足额投保，对于所有保障内容将按照投保方案上限面积数/实际面积的比例进行赔付。
							</p> 
						</div>
				</div>
                <div class="insuranceSetBox newWidth " id="setArea_1">
                	 <a @click="setArea(item,index)" :data-area="item.value" :class="{current: index == areaIndex}" v-for="(item,index) in areaList" :key="index">{{item.name}}</a>
                </div>
                <h4 class="nweInsuranceTitle" style="display: flex;justify-content: space-between;">
                	<span>选择套餐</span>
                    <p @click="showGuarantee = true" class="nweInsuranceLookfw">查看保障范围 <van-icon name="arrow" color="#0080FF" /></p>
                </h4>
                <div class="insuranceSetBox" id="setPackage_1">
                	 <a class="current">温馨版</a>
                </div>
           
                <div class="insuranceColumn">
                        <h4 class="nweInsuranceTitle">
                                <span>扩展保障</span>
                        </h4>
                        <ul class="newInsuranceTextList">
                                <li class="cb pr"  > 
                                    <span>监护人责任</span><span style="font-size:.24rem; color:#999;">(60元/份)</span><a  class="InTextMsgBtn" href="javascript:void(0)" @click="isGuardian = true" ></a>
                                    <div class="setQuantityBox">
                                        <a class="iNreduceBtn" :class="{opacityBtn : guardianAcount == 0 }" href="javascript:void(0)" @click="guardianSub('sub')"></a>
                                        <span>{{guardianAcount}}份</span><input name="rent" type="hidden" value="0">
                                        <a class="iNaddToBtn" :class="{opacityBtn : guardianAcount == 3 }" href="javascript:void(0)" @click="guardianSub('add')"></a>
                                    </div>
                                </li>
                                <div v-show="isGuardian" id="inpoTextMsgBox2" @click="isGuardian = false"></div>
                                <div v-show="isGuardian" class="inpoTextMsgBox2">
                                    <span class="s1" style="left: 2.7rem;"></span>
                                    <span class="s2" style="left: 2.7rem;"></span>
                                    <div>
                                        <table class="nweInsuranceTab_2">
                                            <tr>
                                                <th  style="border: 0; ">保障内容</th>
                                                <th  style="">保险责任</th>
                                                <th  style="" >赔偿限额(元)</th>
                                                <th  style="border-bottom: 1px solid #fff;">标准保费(元)</th>
                                            </tr>
                                            <tr>
                                                <td rowspan="3">监护人责任保险 </td>
                                                <td>累计责任限额 </td>
                                                <td >10万/份</td>
                                                <td rowspan="3"> 60元/份</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故责任限额</td>
                                                <td class="">5万/份</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故每人责任限额</td>
                                                <td class="">5万/份</td>
                                            </tr>  
                                        </table>
                                    </div>
                                </div>

                                <li class="cb pr"  > 
                                    <span>家政人员第三者责任</span> <span style="font-size:.24rem; color:#999;">(60元/份)</span><a  class="InTextMsgBtn" href="javascript:void(0)" @click="isHomemaking = true" ></a>
                                     <div class="setQuantityBox">
                                        <a class="iNreduceBtn" :class="{opacityBtn : homeMakAcount == 0 }" href="javascript:void(0)" @click="homeMakSub('sub')"></a>
                                        <span>{{homeMakAcount}}份</span><input name="rent" type="hidden" value="0">
                                        <a class="iNaddToBtn" :class="{opacityBtn : homeMakAcount == 3 }" href="javascript:void(0)" @click="homeMakSub('add')"></a>
                                    </div>
                                </li>
                               <div v-show="isHomemaking" id="inpoTextMsgBox2" @click="isHomemaking = false"></div>
                                <div v-show="isHomemaking" class="inpoTextMsgBox2">
                                    <span class="s1" style="left: 3.8rem;"></span>
                                    <span class="s2" style="left: 3.8rem;"></span>
                                    <div>
                                        <table class="nweInsuranceTab_2">
                                            <tr>
                                                <th  style="border: 0; width: 1.32rem;">保障内容</th>
                                                <th  style="width: 1.7rem;">保险责任</th>
                                                <th  style=" width: 0.8rem;" >保额(元)</th>
                                                <th  style="width: 2.76rem;border-bottom: 1px solid #fff;">标准保费(元)</th>
                                            </tr>
                                             <tr>
                                                <td rowspan="3">家政人员第三者责任 </td>
                                                <td>累计责任限额 </td>
                                                <td >10万/份</td>
                                                <td rowspan="3"> 60元/份</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故死亡伤残赔偿限额</td>
                                                <td class="">10万/份</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故医疗赔偿限额</td>
                                                <td class="">1万/份</td>
                                            </tr> 
                                        </table>
                                    </div>
                                </div>
                                <li class="cb pr"  > 
                                    <span >宠物责任险</span> <span style="font-size:.24rem; color:#999;">(60元/份)</span><a class="InTextMsgBtn" @click="isPet = true" href="javascript:void(0)" ></a>
                                    <div class="setQuantityBox">
                                        <a class="iNreduceBtn" :class="{opacityBtn : petAcount == 0 }" href="javascript:void(0)" @click="petSub('sub')"></a>
                                        <span>{{petAcount}}份</span><input name="rent" type="hidden" value="0">
                                        <a class="iNaddToBtn" :class="{opacityBtn : petAcount == 3 }" href="javascript:void(0)" @click="petSub('add')"></a>
                                    </div>
                                </li>
                                <div v-show="isPet" id="inpoTextMsgBox2" @click="isPet = false"></div>
                                <div v-show="isPet" class="inpoTextMsgBox2">
                                    <span class="s1" style="left: 2.7rem;"></span>
                                    <span class="s2" style="left: 2.7rem;"></span>
                                    <div>
                                        <table class="nweInsuranceTab_2">
                                            <tr>
                                                <th  style="border: 0; width: 1.32rem;">保障内容</th>
                                                <th  style="width: 1.7rem;">保险责任</th>
                                                <th  style=" width: 0.8rem;" >保额(元)</th>
                                                <th  style="width: 2.76rem;border-bottom: 1px solid #fff;">标准保费(元)</th>
                                            </tr>
                                            <tr>
                                                <td rowspan="3">动物饲养责任保险(宠物责任保险) </td>
                                                <td>累计责任限额 </td>
                                                <td >5万/份</td>
                                                <td rowspan="3"> 60元/份</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故责任限额</td>
                                                <td class="">2万/份</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故每人责任限额</td>
                                                <td class="">2万/份</td>
                                            </tr>  
                                        </table>
                                    </div>
                                </div>
                                <li class="cb pr"  > 
                                    <span>电动自行车第三者责任</span> <span style="font-size:.24rem; color:#999;">(60元/份)</span><a  class="InTextMsgBtn" href="javascript:void(0)" @click="isCar = true" data-text='正在报备'></a>
                                     <div class="setQuantityBox">
                                        <a class="iNreduceBtn" :class="{opacityBtn : carAcount == 0 }" href="javascript:void(0)" @click="carSub('sub')"></a>
                                        <span>{{carAcount}}份</span><input name="rent" type="hidden" value="0">
                                        <a class="iNaddToBtn" :class="{opacityBtn : carAcount == 3 }" href="javascript:void(0)" @click="carSub('add')"></a>
                                    </div>
                                </li>
                                <div v-show="isCar" id="inpoTextMsgBox2" @click="isCar = false"></div>
                                <div v-show="isCar" class="inpoTextMsgBox2">
                                    <span class="s1" style="left: 4.15rem;"></span>
                                    <span class="s2" style="left: 4.15rem;"></span>
                                    <div>
                                        <table class="nweInsuranceTab_2">
                                            <tr>
                                                <th   style="border: 0; width: 1.32rem;">保障内容</th>
                                                <th  style="width: 1.7rem;">保险责任</th>
                                                <th  style=" width: 0.8rem;" >保额(元)</th>
                                                <th  style="width: 2.76rem;border-bottom: 1px solid #fff;">标准保费(元)</th>
                                            </tr>
                                            <tr>
                                                <td rowspan="4">电动自行车<br>第三者责任保险</td>
                                                <td>累计责任限额 </td>
                                                <td >10万/份</td>
                                                <td rowspan="3">60元/份</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故责任限额</td>
                                                <td class="">5万</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故每人责任限额</td>
                                                <td class="">5万</td>
                                            </tr>  
                                            <tr>
                                               <td  colspan="3" style=" text-align: left;">
                                                   <p>投保说明：</p> 
                                                   <p>  1.本保险单适用《中国人民财产保险股份有限公司电动自行车第三者责任保险条款》。</p>
                                                   <p> 2.本保险承保符合国家GB 17761-2018《电动自行车安全技术规范》规定的家用电动自行车，不包含商业运营车辆。</p>
                                               </td> 
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <li class="cb pr" style="border: 0;" > 
                                    <span >燃气责任险</span><span style="font-size:.24rem; color:#999;"></span> <a class="InTextMsgBtn" @click="isGas = true" href="javascript:void(0)"  data-text='正在报备'></a>
                                    <div class="setQuantityBox">
                                        <a class="iNreduceBtn" :class="{opacityBtn : gasAcount == 0 }" href="javascript:void(0)" @click="gasSub('sub')"></a>
                                        <span>{{gasAcount}}份</span><input name="rent" type="hidden" value="0">
                                        <a class="iNaddToBtn" :class="{opacityBtn : gasAcount == 3 }" href="javascript:void(0)" @click="gasSub('add')"></a>
                                    </div>
                                </li> 
                                <div v-show="isGas" id="inpoTextMsgBox2" @click="isGas = false"></div>
                                <div v-show="isGas" class="inpoTextMsgBox2">
                                    <span class="s1" style="left: 1.55rem;"></span>
                                    <span class="s2" style="left: 1.55rem;"></span>
                                    <div>
                                        <table class="nweInsuranceTab_2">
                                            <tr>
                                                <th  style="border: 0; width: 1.32rem;">保障内容</th>
                                                <th  style="width: 1.7rem;">保险责任</th>
                                                <th  style=" width: 0.8rem;" >保额(元)</th>
                                                <th  style="width: 2.76rem;border-bottom: 1px solid #fff;">标准保费(元)</th>
                                            </tr>
                                            <tr>
                                                <td rowspan="4">燃气责任保险 </td>
                                                <td>累计责任限额 </td>
                                                <td >20万/份</td>
                                                <td rowspan="3" style="text-align: left;height:4.76rem"> 瓶装：60元/份<br>
                                                    管道：50/份</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故责任限额</td>
                                                <td class="">10万/份</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故每人责任限额</td>
                                                <td class="">10万/份</td>
                                            </tr> 
                                            <tr>
                                                <td colspan="3" style="text-align:left">
                                                  投保说明：<br>
                                                  1.仅适用于居民用户。<br>
                                                  2.由燃气事故导致的家庭成员人身伤亡及家庭财产损失也在保障范围内。
                                                </td>
                                            </tr> 
                                        </table>
                                    </div>
                                </div>
                                <div class="InsuranceDate" style="border-bottom:1px solid #eee;padding-left: 0;" v-show="gasAcount > 0">
                                    <div class="insuranceSetBox newWidth" id="setPackage_1">
                                        <a @click="setGas(_item,_index)" :class="{current: _index == gasIndex}" v-for="(_item,_index) in gasTypeList" :key="_index">{{_item}}</a>
                                    </div>
                                </div>
                            </ul>
                    </div>
               
                
                <div class="insuranceTextBottom cb">
                    <span><i class="totalAmount">{{account}}</i>元/年/户</span>
                </div>
            </div>
        </div>
        <div class="insuranceColumn" style="padding-bottom:1.36rem;border-top: .17rem solid #F5F5F5;">
		<van-sticky>
        	<div class="insuranceNavBox" style="height:1.02rem;">
            	<div class="insuranceNav" id="insuranceNav">
					<a href="javascript:void(0)" @click="cutoverTag(item,index)" :class="{current : index == tagIndex}"  v-for="(item,index) in cutoverTagList " :key="index">{{item}}</a>
			    </div>	
            </div>
			</van-sticky>
            <div class="insuranceTagBox">
                <div class="iTag_1" v-show="isTage_1 && isFDKJ" style="background: #fff1d4;">
                  <div class="iImgsBox_2" style="position:relative">
                    <div style="padding-top:5.1rem;">
                        	<div style="width:6.3rem; height:2.88rem; margin:0 auto;">
                                <div class="slide cb" id="slideBanner">
                                     <van-swipe :autoplay="3000" style="height: 2.78rem;" show-indicators indicator-color="#CCCCCC" >
                                            <van-swipe-item><img style="width:100%" src="../../assets/images/insurance_2/example_7.jpg"></van-swipe-item>
                                            <van-swipe-item><img style="width:100%" src="../../assets/images/insurance_2/example_8.jpg"></van-swipe-item>
                                        </van-swipe>
                                    <div class="dot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="iTag_1" v-show="isTage_1 && isZXJJ" style="background: #fff1d4;">
                  <div class="iImgsBox_2_1" style="position:relative">
                    <div style="padding-top:5.5rem;">
                        	<div style="width:6.3rem; height:2.88rem; margin:0 auto;">
                                <div class="slide cb" id="slideBanner">
                                     <van-swipe :autoplay="3000" style="height: 2.78rem;" show-indicators indicator-color="#CCCCCC" >
                                            <van-swipe-item><img style="width:100%" src="../../assets/images/insurance_2/example_7.jpg"></van-swipe-item>
                                            <van-swipe-item><img style="width:100%" src="../../assets/images/insurance_2/example_8.jpg"></van-swipe-item>
                                        </van-swipe>
                                    <div class="dot"></div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                     <div class="iImgs_Footer">	
							<p> ·【房东保-业主自住险】（本产品）系由北京中兴保险经纪有限公司（简称中兴保险经纪，保险专业中介机构机构编码：260875000000800）代理销售，并负责客户服务。</p>
							<!-- <p>· 本产品的服务主体是中国人民财产保险股份有限公司深圳市分公司或中国太平洋财产保险股份有限公司深圳分公司（投保人可选择任一保险公司出单），并由出单承保保险公司负责理赔服务。</p> -->
							<p>· 本产品的服务主体是中国人民财产保险股份有限公司深圳市分公司，并由出单承保保险公司负责理赔服务。</p>
                            <p v-show="distributorCode == 'CCWY'">· 深圳市长藤科技有限公司-业主卡（公众号）平台保险产品系由北京中兴保险经纪有限公司授权展示。</p>
					    </div>
                </div>

                <div class="iTag_2" v-show="isTage_2" >
                	<h4 class="insuranceTitle" style="border-bottom:1px solid #eee; padding-left:.3rem;">
                        <span>特别约定</span>
                    </h4>
                      <div class="insuranceTextBox" style="padding:.3rem;">
                        <p> 1、本保单每次事故财产损失免赔300元或和核定损失金额的10%，两者以高者为准。</p>
                        <p>2、本保单仅承保住宅房屋，经营性质场所不在保障范围内。</p>
                        <p>3、本保单主险需按照对应的面积区间进行投保，否则将视为不足额投保，对于主险保障内容将按照投保方案上限面积数/实际面积的比例进行赔付。一个地址的多套房屋可以合并计算面积，不同地址的多套房屋，需分开单独投保，不可合计面积进行选择，否则本保单不承担保险责任。</p>
                        <p>4、本保单居家责任保险（包括水管爆裂责任、高空抛物责任）项下累计责任限额300万，每次事故责任限额300万，每次事故每人伤亡责任限额150万，每次事故财产损失责任限额20万，法律费用累计责任限额5万。</p>
                        <p>5、本保单项下家政服务人员第三者责任保险每次事故医疗赔偿限额为1万元整。</p>
                        <p>6、若投保人扩展了电动自行车第三者责任险，需满足以下内容：</p>
                        <p>（1）仅承保符合国家GB 17761-2018《电动自行车安全技术规范》规定的家用电动自行车，不包括商业营运车辆；</p>
                        <p>（2）电动自行车需在标准充电桩充电，不在标准充电桩充电过程中发生的意外事故不属于本保单责任范围。</p>
                        <p>7、若投保人扩展了监护人责任险，被监护人仅限于正常的未成年人，精神病等特殊类型的被监护人不在本保单的保障范围内。</p>
                         <p> 8、若投保人扩展了燃气安全险，需满足以下内容：</p>
                         <p>（1）仅承保居民用户；</p>
                         <p>（2）附加被保险人家庭成员责任保险条款。在保险期间内，因发生主险合同约定的保险责任范围内的燃气事故，造成被保险人的家庭成员的人身伤亡、医疗费用以及财产损失，依法应由被保险人承担的经济赔偿责任，保险人按本附加险合同的约定也负责赔偿。</p>
                      <p>  具体保险责任和细则，以条款为准。</p>
                    </div>
                    
                </div>
                <div class="iTag_3" v-show="isTage_3">
                	<h4 class="insuranceTitle" style="border-bottom:1px solid #eee; padding-left:.3rem;">
                        <span>理赔流程</span>
                    </h4>
                    <ul class="claimProcessList">
                    	<li class="cb">
                        	<span style="background:#FFCC00;">1</span>
                        	<div>
                            	<i class="claimIcon_1"></i> 
                                <p style="font-size: .3rem;padding-left: .94rem;text-indent: 0;line-height: 120%;">拨打报案电话 <br>
									<span style="font-size:.28rem">95518(中国人保) | 95500(中国太保)</span>
								</p>
                            </div>
                        </li>
                        <li class="cb">
                        	<span style="background:#00CEFF;">2</span>
                        	<div>
                            	<i class="claimIcon_2"></i> 事故勘察和损失确认
                            </div>
                        </li>
                        <li class="cb">
                        	<span style="background:#25D200;">3</span>
                        	<div>
                            	<i class="claimIcon_3"></i> 提交索赔材料
                            </div>
                        </li>
                        <li class="cb">
                        	<span style="background:#CBCF03;">4</span>
                        	<div>
                            	<i class="claimIcon_4"></i> 赔款计算和审核
                            </div>
                        </li>
                        <li class="cb">
                        	<span style="background:#00D095;">5</span>
                        	<div>
                            	<i class="claimIcon_5"></i> 领取赔款
                            </div>
                        </li>
                    </ul>
                    <div style=" border-top:.17rem solid #F5F5F5">
                    	<h4 class="insuranceTitle" style="border-bottom:1px solid #eee; padding-left:.3rem;">
                            <span>了解详情</span>
                        </h4>
                        <div class="insuranceTextBox" style=" padding: .3rem;">
                        	<p class="">事故发生后，首先请保护现场并采取必要的紧急施救措施，然后请按以下步骤进行理赔：</p>
                            <p class="">1.【拨打报案电话】请立即拨打保险公司报案电话95518(中国人保)/95500(中国太平洋保险)或有条件的情况下通过传真等方式向保险公司报案，保险公司理赔服务人员将向您询问出险情况，协助安排救助，告知后续理赔处理流程并指导您拨打报警电话，紧急情况下请您先拨打报警电话。</p>
                            <p class="">2.【事故勘察和损失确认】在您的协助下，保险公司理赔人员或委托的公估机构、技术鉴定机构、海外代理人到事故现场勘察事故经过，了解涉及的损失情况，查阅和初步收集与事故性质、原因和损失情况等有关的证据和资料，确认事故是否属于保险责任，必要时委托专门的技术鉴定部门或科研机构提供专业技术支持。保险公司将指导您填写出险通知书（索赔申请书），向您出具索赔须知。与您共同对保险财产的损失范围、损失数量、损失程度、损失金额等损失内容、涉及的人身伤亡损害赔偿内容、施救和其他相关费用进行确认，确定受损财产的修复方式和费用，必要时委托具备资质的第三方损失鉴定评估机构提供专业技术支持。</p>
                            <p class="">3.【提交索赔材料】请根据保险公司书面告知您的索赔须知内容提交索赔所需的全部材料，保险公司及时对您提交的索赔材料的真实性和完备性进行审核确认，索赔材料不完整的情况下保险公司将及时通知您补充提供有关材料，对索赔材料真实性存在疑问的情况下保险公司将及时进行调查核实。</p>
                            <p class="">4.【赔款计算和审核】在您提交的索赔材料真实齐全的情况下，保险公司根据保险合同的约定和相关的法律法规进行保险赔款的准确计算和赔案的内部审核工作，并与您达成最终的赔偿协议。</p>
                            <p class="">5.【领取赔款】：保险公司根据与您商定的赔款支付方式和保险合同的约定向您支付赔款。</p>
                            <p class="">补充说明：因第三者对保险标的的损害而造成保险事故的，在保险公司根据保险合同的约定和相关的法律法规向您支付赔款后请您签署权益转让书并协助保险公司向第三方进行追偿工作。具体保险责任和细则，以条款为准。</p>
                        </div>
                    </div>
               	</div>
            </div>
        </div>
        <div class="insuranceBttomBtnBox">
        	<div class="cb">
            	<span><i class="totalAmount">{{account}}</i>元/年/户</span>
				<!-- <a href="javascript:void(0)" @click="showInsured('text')">《保险条款》</a> -->
                <a class="insuranceBttomBtn" href="javascript:void(0)" @click="insuredOperate">立即投保</a>
            </div>
        </div>

        <van-popup v-model="showGuarantee" style="height:100%;width:101%" >
			<mt-header fixed class="def-header cust-head" title="保障范围">
				<div slot="left" @click="showGuarantee = false">
					<van-icon name="arrow-left" size="18px" />
				</div>
			</mt-header>
			<div style="padding-right:.3rem;margin-top: 1.1rem;padding-left: 0.3rem;margin-bottom: 0.2rem;">
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
                            <td>房屋及室内附属设备</td>
                            <td>50万</td>
                        </tr>
                        <!-- <tr>
                            <td>室内附属设施</td>
                            <td>10万</td>
                        </tr> -->
                        <tr>
                            <td>室内装潢</td>
                            <td>10万</td>
                        </tr>
                        <tr>
                            <td>室内财产</td>
                            <td>10万</td>
                        </tr>
                    </table>
                
                <div style="margin-top:0.2rem;">
                	<table class="nweInsuranceTab">
                        <tr>
                            <th style=" width:33%;border: 0;">可扩展保障内容</th>
                            <th>保险责任</th>
                            <th>保障</th>
                        </tr>
                        <tr>
                            <td rowspan="3">监护人责任</td>
                            <td>累计责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故每人责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr>
                            <td rowspan="3">家政人员<br>第三者责任</td>
                            <td>累计责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故死亡伤残赔偿限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故医疗赔偿限额</td>
                            <td>1万/份</td>
                        </tr>
                        <tr>
                            <td rowspan="3">宠物责任</td>
                            <td>累计责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故责任限额</td>
                            <td>2万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故每人责任限额</td>
                            <td>2万/份</td>
                        </tr>
                        <tr>
                            <td rowspan="3">电动自行车<br>第三者责任</td>
                            <td>累计责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故每人责任限额</td>
                            <td>5万/份</td>
                        </tr>
                        <tr>
                            <td rowspan="3">燃气安全</td>
                            <td>累计责任限额</td>
                            <td>20万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        <tr>
                            <td>每次事故每人责任限额</td>
                            <td>10万/份</td>
                        </tr>
                        
                    </table>
                </div>
			</div>
		</van-popup>
        </div>
      
</template>
  <script >
   import "./../../assets/css/zxfd/base.scss";
    import "./../../assets/js/rem.js";
	import { Toast } from 'vant';
	import { axiosGetAPI ,axiosPostAPI } from '../../common/Axios';
    import store from './../../store/store';
     import { dialog } from 'vant';
	import * as types from './../../store/types';
	var iAmountData = [298,698,998,1198,1398];
    var otherAmountList = [60,60,60,60]
 export default {
    data(){
        return{
                showGuarantee:false,
                isMessage:false,
                isCover:false,
                isGuardian:false,
                isCar:false,
                isPet:false,
                isGas:false,
                isHomemaking:false,
                guardianAcount:0,
                petAcount:0,
                gasAcount:0,
                carAcount:0,
                homeMakAcount:0,
                account:298,
				newInsuranceItem:[{name:'按栋投保',value:'allhouse'},{name:'按户投保',value:'house'}],
				currentIndex:0,
				TancanList:[{name:'3个月',value:'0'},{name:'6个月',value:'1'},{name:'12个月',value:'2'}],
				tancanIndex:0,		
				tancanValue:'',
				areaList:[{name:'1～50平方米',value:'1-50'},{name:'51～90平方米',value:'51-90'},{name:'91～130平方米',value:'91-130'},{name:'131～200平方米',value:'131-200'},{name:'200平方米以上',value:'200'},],
				areaIndex:0,
                areaValue:'1～50平方米',
                gasTypeList:['燃气罐(60元/份)','燃气管道(50元/份)'],
				cutoverTagList:['特别约定','产品特色','理赔服务'],
				tagIndex:1,
				isTage_1:true,
				isTage_2:false,
				isTage_3:false,
				falg:true,
				textFalg:false,
				extendPremium:[0,0,0],
				showFwczrList:false,
                showDszssList:false,
                showJtcczhList:false,
                showJjzrList:false,
                showJHRList:false,
                showDwsyzr:false,
                showRQZRList:false,
                showSpecialAgreement:false,
                showInsuranceDec:false,
				distributorCode:'',
                distributorAttach:'',
                tancanTypeIndex:[0],
                month:3,
                gasAmount:0,
                petAmount:0,
                guardianAmount:0,
                areaAmount:298,
                carAmount:0,
                gasIndex:0,
                homemak:0,
                isFDKJ:true,
                isZXJJ:false,
                regulatoryfilings:false,
        }
	},
	components:{
	},
    methods :{
        guardianSub(judge){ //监护人份数加
            if(judge == 'sub'){
                if(this.guardianAcount > 0){
                    this.guardianAcount = this.guardianAcount - 1;
                    this.account = this.account * 1 - 60 ;
                }else{
                    return
                }
            }
            if(judge == 'add'){
                if(this.guardianAcount < 3){
                    this.guardianAcount = this.guardianAcount + 1;
                    // this.extendPremium[1] = 5 * this.hireLossInsurance;
                    this.account = this.account * 1 + 60;
                }else{
                    return
                }
            }
        },
        homeMakSub(judge){
            if(judge == 'sub'){
                if(this.homeMakAcount > 0){
                    this.homeMakAcount = this.homeMakAcount - 1;
                    this.account = this.account * 1 - 60 ;
                }else{
                    return
                }
            }
            if(judge == 'add'){
                if(this.homeMakAcount < 3){
                    this.homeMakAcount = this.homeMakAcount + 1;
                    this.account = this.account * 1 + 60;
                }else{
                    return
                }
            }
        },
        petSub(judge){
             if(judge == 'sub'){
                if(this.petAcount > 0){
                    this.petAcount = this.petAcount - 1;
                    this.account = this.account * 1 - 60 ;
                }else{
                    return
                }
            }
            if(judge == 'add'){
                if(this.petAcount < 3){
                    this.petAcount = this.petAcount + 1;
                    this.account = this.account * 1 + 60;
                }else{
                    return
                }
            }
        },
        carSub(judge){
             if(judge == 'sub'){
                if(this.carAcount > 0){
                    this.carAcount = this.carAcount - 1;
                    this.account = this.account * 1 - 60 ;
                }else{
                    return
                }
            }
            if(judge == 'add'){
                if(this.carAcount < 3){
                    this.carAcount = this.carAcount + 1;
                    this.account = this.account * 1 + 60;
                }else{
                    return
                }
            }
        },

        gasSub(judge){
            if(this.gasIndex == 0){
                 if(judge == 'sub'){
                    if(this.gasAcount > 0){
                        this.gasAcount = this.gasAcount - 1;
                        this.account = this.account * 1 - 60 ;
                    }else{
                        return
                    }
                 }
                if(judge == 'add'){
                    if(this.gasAcount < 3){
                        this.gasAcount = this.gasAcount + 1;
                        this.account = this.account * 1 + 60;
                    }else{
                        return
                    }
                }
            }else{
                if(judge == 'sub'){
                    if(this.gasAcount > 0){
                        this.gasAcount = this.gasAcount - 1;
                        this.account = this.account * 1 - 50 ;
                    }else{
                        return
                    }
                 }
                if(judge == 'add'){
                    if(this.gasAcount < 3){
                        this.gasAcount = this.gasAcount + 1;
                        this.account = this.account * 1 + 50;
                    }else{
                        return
                    }
                }
            }
            

        },
		closeFwczrList(){
			this.showFwczrList = false;
		},
		tofwczList(){
			this.showFwczrList = true;
		},
	  setGas(item,index){
        if(index != this.gasIndex){
                this.gasIndex = index;
                if(index == 0){
                    this.gasAmount = 60;
                }else if(index == 1){
                    this.gasAmount =  50;
                }
                this.account = this.areaAmount + 60 * (this.guardianAcount + this.carAcount +  this.petAcount +  this.homeMakAcount ) + this.gasAmount* this.gasAcount ;
            }else{
                return;
            } 
        },
		setArea(item,index){ //按动面积选择
			if(index == this.areaIndex){
				return false;					
			}
			else{
                this.areaIndex = index;
                this.areaAmount = iAmountData[index];
                this.account = this.areaAmount + 60 * (this.guardianAcount + this.carAcount +  this.petAcount +  this.homeMakAcount ) + this.gasAmount* this.gasAcount ;
			}
			this.areaValue = item.name;
		},

		 cutoverTag(item,index){ //切换tag
			if(index == this.tagIndex){return};
			this.tagIndex = index;
			if(index == 0){
				this.isTage_1 = false;
				this.isTage_2 = true;
				this.isTage_3 = false;
			}else if(index == 1){
				this.isTage_1 = true;
				this.isTage_2 = false;
				this.isTage_3 = false;
			}else{
				this.isTage_1 = false;
				this.isTage_2 = false;
				this.isTage_3 = true
			}	
		},
		calculate(){
				var lift = $("input[name = lift]").val();
				var rent = $("input[name = rent]").val();
				var reputation = $("input[name = reputation]").val();
				console.log(lift*80 + rent*100 + reputation*100 + insuranceFee)
				$(".totalAmount").text(lift*80 + rent*100 + reputation*100 + insuranceFee)
			},
			 //同意协议并投保
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
			showFwczrListBtn(){
					this.showFwczrList = true;
					this.cancelEvent()
			},
			showJtcczhListBtn(){
					this.showJtcczhList = true;
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

		insuredOperate(){
            if(this.regulatoryfilings){
				   this.$dialog.confirm({
					title: '',
					message: '您好，网站正在报备中，暂时无法投保',
					}).then(() => {}).catch(() => {});
				return
            }
			if(this.distributorCode == ''){
				this.cancelEvent();
				Toast('渠道编号错误，请联系管理员！');
				return
            }
            if(this.distributorCode == 'SZFDKJ'){
					var Time = new Date().getTime();
					$.ajax({
							type:"POST",
							url:"https://api.fangdongtech.com/fdym/notice/zxib/operationnotice", //请求URl
							data:{
								attach: this.distributorAttach,
								clickTime:Time,
								operation:'/H5/savebriefinsuranceinfo'
							},
							async:false,
							dataType: "json",
							success:function(data){
								
							},
							error:function(data){
								
							}
						}); 
				}
                var model = {};
                model.areaValue = this.areaValue;
                model.account = this.account //总金额
                model.guardianAcount = this.guardianAcount;//套餐类型
                model.petAcount = this.petAcount;
                model.gasAcount = this.gasAcount;
                model.carAcount = this.carAcount;
                model.homeMakAcount = this.homeMakAcount;
                if(this.gasAcount){
                    model.gasIndex = this.gasIndex;
                }
                model.areaIndex = this.areaIndex
				sessionStorage.setItem('proprietorData',JSON.stringify(model));
				this.$router.push({path:'/zxfdPage/proprietorInsuran'});
				// this.cancelEvent();
		},
		 getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
         },
		bodyScroll:function(event){
				event.preventDefault();
			},
            },
     created(){
            var self = this;
            if(self.$route.query.regulatoryfilings){
				this.regulatoryfilings = true;
            }
             sessionStorage.setItem('productCode','PICC-LDO');
            sessionStorage.setItem('title','中国人保-居家无忧');
            var appId = this.$route.query.appId;
            localStorage.setItem('appId',appId);
			document.title = "中国人保-居家无忧";
			if(self.$route.query.distributorCode || self.$route.query.DistributorCode){
				var distributorCode = self.$route.query.distributorCode || self.$route.query.DistributorCode;
				distributorCode = decodeURIComponent(distributorCode);
				this.distributorCode = distributorCode;
				sessionStorage.setItem('distributorCode',distributorCode);
            }
			if(self.$route.query.distributorAttach){
				var distributorAttach = self.$route.query.distributorAttach;
				distributorAttach = decodeURIComponent(distributorAttach);
				this.distributorAttach = distributorAttach;
				sessionStorage.setItem('distributorAttach',distributorAttach);
			}
			if(self.$route.query.orderNo || self.$route.query.OrderNo){
				var orderNo = self.$route.query.orderNo || self.$route.query.OrderNo;
				sessionStorage.setItem('orderNo',orderNo);
				axiosGetAPI('/PropertyProducts/PICC-LDO/PrepareOrder/' + orderNo).then(res=>{
					if(res.status == '200'){
						self.distributorCode = res.result.distributorCode;
						self.distributorAttach = res.result.distributorAttach;
						sessionStorage.setItem('distributorAttach',self.distributorAttach);
						sessionStorage.setItem('distributorCode',self.distributorCode);
					}
				})
			}
			// var appId = "cx7190761141531rzi";
			// localStorage.setItem("appId",appId);
			if(this.distributorCode == 'SZFDKJ'){
					this.isFDKJ = true;
					this.isZXJJ = false;
			}else{
				this.isFDKJ = false;
				this.isZXJJ = true;
			}
		axiosGetAPI('/apis/apps/' + appId + "/H5").then((res) => {
		if( res.result.authMode.text == "MultiUserMode"){//多用户	     
          var token = store.state.token || localStorage.getItem('token') || '' ;
          self.iSingleUserMode = false; 
          var ua = navigator.userAgent.toLowerCase();
          var isWeixin = ua.indexOf('micromessenger') != -1;
            if(isWeixin  && (token == '' || token == "null") ){ //在微信环境下未登录需要判断是否绑定账号
              // var url = window.location.href;
              var code = this.getUrlParam("code");
              const local = encodeURIComponent(window.location.href);
              if(code === '' || code === null ){
                var wxUrl = window.location.href.split('#')[0];
              var url = '/Configurations?types=weixin&weixin_url=' + encodeURIComponent(wxUrl);
              axiosGetAPI(url).then((res) => {
                if (res.status == 200 && res.result && res.result.weixin) {
                    var wxappId = res.result.weixin.appId;
                    var enableLogin =  res.result.weixin.enableLogin ||  false;
                    sessionStorage.setItem('enableLogin',enableLogin);
                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxappId + "&redirect_uri=" + local + "&response_type=code&scope=snsapi_base&state=yIwrleQfyqxdPHj#wechat_redirect"
                 } 
                })
                } else{  
                  var openId = sessionStorage.getItem("openId") || '';
                    // if(!openId){
                        axiosPostAPI('/Weixin/' + code + '/Token').then(dataRes=>{//微信免登陆，如果api返回了token则实现免登陆，否则去登陆。
                            if( dataRes.status == '200' && dataRes.result.bindUser != undefined && dataRes.result.bindUser.token != undefined){ //判断是否有token即是否绑定了账号，如果绑定了则免登陆，如果未绑定则重新登录
                              self.$store.commit(types.LOGIN, dataRes.result.bindUser.token);
                              localStorage.setItem('token',localStorage.getItem('appId') + '_' + dataRes.result.bindUser.token); 
                          }  
                        })
                    // }
                  }
              }
			}
			 })
			
			},	
			mounted(){

			}
        }
        </script>
		<style scoped>
		.base_msg_box>div>a.sbtn{ color:#333; background:linear-gradient(90deg,rgba(255,226,59,1) 0%,rgba(255,213,0,1) 100%);box-shadow:0px 2px 5px 0px rgba(255,192,0,0.7); border-radius: .8rem; width:80%; margin:.3rem auto;padding: .2rem;}
		.base_msg_box>h3{ padding-top:.45rem; font-size:.36rem;}
		.insuranceSetBox, .insuranceTextBottom { padding-right:.3rem;}
        .insuranceTextBottom { border:none;}
        .newInFont{    
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(153,153,153,1);
            line-height: 0.28rem;
            margin-top: 0.1rem;
            margin-bottom: 0.3rem;
            padding-right: .3rem;
            }
		</style>