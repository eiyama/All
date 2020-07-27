<template>
	<div style="background:#F5F5F5;">
         <div class="nweInsuranceBg" v-show="isFDKJ"></div>
         <div class="nweInsuranceBg_1" v-show="isZXJJ"></div>
        <div class="nweInsuranceColumn">
            <div style="padding-left:.3rem">
                <h4 class="nweInsuranceTitle" style="display: flex;align-items: center;">
                    <span>居家险投保面积</span>
                    <p style="font-size: 0.24rem;font-weight: 400;color: rgba(153,153,153,1);">(主险必选)</p>
                    <a @click="isCover = true" style="margin-top:0;margin-left: 0.2rem;" class="InTextMsgBtn" href="javascript:void(0)"  data-text=''></a>
                </h4>
                <div v-show="isCover" id="inpoTextMsgBox2" @click="isCover = false"></div>
                <div v-show="isCover" class="inpoTextMsgBox2" style="margin-top: -0.1rem;">
                    <span class="s1" style="left:3.45rem"></span>
                    <span class="s2" style="left:3.45rem"></span>
                    <div>
                          <table class="nweInsuranceTab_2">
                            <tr>
                                <th  rowspan="2"  style="border: 0; width: 1.32rem;">保障内容</th>
                                <th rowspan="2" style="width: 1.7rem;">保险责任</th>
                                <th rowspan="2" style=" width: 0.8rem;" >保额(元)</th>
                                <th  colspan="3" style="width: 2.76rem;border-bottom: 1px solid #fff;">保费</th>
                            </tr>
                            <tr>
                                <th  style="background:#FFE877">房屋面积≤35㎡</th>
                                <th style="background:#FFE877" >35㎡≤房屋面积≤80㎡</th>
                                <th style="background:#FFE877">80㎡≤<br>房屋面积<br>≤130㎡</th>
                            </tr>
                            <tr>
                                <td rowspan="3">居家责任保险(含高空抛物责任) </td>
                                <td>累计责任限额</td>
                                <td  class="">50万</td>
                                <td  rowspan="6">26元/户/3个月；50元/户/6个月； 99元/户/年</td>
                                <td  rowspan="6">51元/户/3个月；100元/户/6个月；199元/户/年</td>
                                <td  rowspan="6">76元/户/3个月； 150元/户/6个月； 299元/户/年</td>
                            </tr>
                            <tr>
                                <td>每次事故责任限额</td>
                                <td class="">50万</td>
                            </tr>
                            <tr>
                                <td>每次事故每人责任限额</td>
                                <td class="">10万</td>
                            </tr>
                            <tr>
                                    <td rowspan="3">家庭财产损失赔偿责任 </td>
                                    <td>房屋及其室内附属设施</td>
                                    <td class="">10万</td>
                                </tr>
                                <tr>
                                    <td>室内装潢</td>
                                    <td class="">2万</td>
                                </tr>
                                <tr>
                                    <td>室内财产</td>
                                    <td class="">2万</td>
                                </tr> 
                        </table>
                         <p style="color:rgba(51,51,51,1);font-size:0.24rem;">*必须按照对应的面积区间进行投保，否则将视为不足额投保，对于所有保障内容将按照投保方案上限面积数/实际面积的比例进行赔付。</p>
                    </div>
                </div>

                <div class="insuranceSetBox " id="setArea_1">
                	 <a @click="setArea(item,index)" :data-area="item.value" :class="{current: index == areaIndex}" v-for="(item,index) in areaList" :key="index">{{item.name}}</a>
                </div>
                <!-- <p class="newInFont">必须按照对应的面积区间进行投保，否则将视为不足额投保，对于所有保障内容将按照投保方案上限面积数/实际面积的比例进行赔付。</p> -->
                <h4 class="nweInsuranceTitle">
                	<span>选择保险期限</span>
                </h4>
                <div class="insuranceSetBox" id="setPackage_1">
                	 <a @click="setTancan(_item,_index)" :class="{current: _index == tancanIndex}" v-for="(_item,_index) in TancanList" :key="_index">{{_item.name}}</a>
                </div>
                
                <div class="insuranceColumn" >
                        <h4 class="nweInsuranceTitle" style="display: flex;justify-content: space-between;">
                            <span>扩展保障</span>
                            <p @click="showGuarantee = true" class="nweInsuranceLookfw">查看保障范围 <van-icon name="arrow" color="#0080FF" /></p>
                        </h4>
                        <ul class="newInsuranceTextList">
                                <li class="cb pr"  > 
                                    <span style="display: flex;align-items: center;">监护人责任险</span> <a class="InTextMsgBtn" href="javascript:void(0)"  @click="isGuardian = true" ></a>
                                    <div class="setQuantityBox">
                                      <span class="bg_redio" :class="{current : tancanTypeIndex.indexOf(1) != -1}" @click="setRadio(1)"></span>
                                    </div>
                                </li>
                                <div v-show="isGuardian" id="inpoTextMsgBox2" @click="isGuardian = false"></div>
                                <div v-show="isGuardian" class="inpoTextMsgBox2">
                                    <span class="s1" style="left: 1.8rem;"></span>
                                    <span class="s2" style="left: 1.8rem;"></span>
                                    <div>
                                        <table class="nweInsuranceTab_2">
                                            <tr>
                                                <th   style="border: 0; width: 1.32rem;">保障内容</th>
                                                <th  style="width: 1.7rem;">保险责任</th>
                                                <th  style=" width: 0.8rem;" >保额(元)</th>
                                                <th  style="width: 2.76rem;border-bottom: 1px solid #fff;">标准保费(元)</th>
                                            </tr>
                                            <tr>
                                                <td rowspan="3">监护人责任保险 </td>
                                                <td>累计责任限额 </td>
                                                <td >10万</td>
                                                <td rowspan="3"> 13元/人/3个月25元/人/6个月49元/人/年</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故责任限额</td>
                                                <td class="">10万</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故每人责任限额</td>
                                                <td class="">5万</td>
                                            </tr>  
                                        </table>
                                    </div>
                                </div>
                                <li class="cb pr"  > 
                                    <span style="display: flex;align-items: center;">宠物责任险</span> <a class="InTextMsgBtn" @click="isPet = true" href="javascript:void(0)" ></a>
                                    <div class="setQuantityBox">
                                        <span class="bg_redio" :class="{current : tancanTypeIndex.indexOf(3) != -1}" @click="setRadio(3)"></span>   
                                    </div>
                                </li>
                                <div v-show="isPet" id="inpoTextMsgBox2" @click="isPet = false"></div>
                                <div v-show="isPet" class="inpoTextMsgBox2">
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
                                                <td rowspan="3">动物饲养责任保险(宠物责任保险) </td>
                                                <td>累计责任限额 </td>
                                                <td >5万</td>
                                                <td rowspan="3"> 6元/只/3个月<br>
                                                    10元/只/6个月<br>
                                                    19元/只/年</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故责任限额</td>
                                                <td class="">5万</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故每人责任限额</td>
                                                <td class="">1万</td>
                                            </tr>  
                                        </table>
                                    </div>
                                </div>
                                 <li class="cb pr"  > 
                                    <span style="display: flex;align-items: center;">电动自行车第三者责任险</span> <a  class="InTextMsgBtn" href="javascript:void(0)" @click="isCar = true" data-text='正在报备'></a>
                                    <div class="setQuantityBox">
                                           <span class="bg_redio" :class="{current : tancanTypeIndex.indexOf(2) != -1}" @click="setRadio(2)"></span>      
                                    </div>
                                </li>
                                <div v-show="isCar" id="inpoTextMsgBox2" @click="isCar = false"></div>
                                <div v-show="isCar" class="inpoTextMsgBox2">
                                    <span class="s1" style="left: 3.2rem;"></span>
                                    <span class="s2" style="left: 3.2rem;"></span>
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
                                                <td >50万</td>
                                                <td rowspan="3"> 46元/台/3个月<br>90元/台/6个月<br>179元/台/年</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故责任限额</td>
                                                <td class="">25万</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故每人责任限额</td>
                                                <td class="">10万</td>
                                            </tr>  
                                            <tr>
                                               <td  colspan="3">
                                                   <p>投保说明：</p> 
                                                   <p>  1.本保险单适用《中国人民财产保险股份有限公司电动自行车第三者责任保险条款》。</p>
                                                   <p> 2.本保险承保符合国家GB 17761-2018《电动自行车安全技术规范》规定的家用电动自行车，不包含商业运营车辆。</p>
                                               </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <li class="cb pr"  > 
                                    <span style="display: flex;align-items: center;">燃气责任险</span> <a class="InTextMsgBtn" @click="isGas = true" href="javascript:void(0)"  data-text='正在报备'></a>
                                    <div class="setQuantityBox">
                                        <span class="bg_redio" :class="{current : tancanTypeIndex.indexOf(4) != -1}" @click="setRadio(4)"></span>  
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
                                                <td >50万</td>
                                                <td rowspan="3" style="text-align: left;height:4.76rem"> ①瓶装：<br>
                                                    21元/户/3个月<br>
                                                    管道：<br>
                                                    18元/户/3个月<br>
                                                    ②
                                                    瓶装：<br>
                                                    40元/户/6个月<br>
                                                    管道：<br>
                                                    35元/户/6个月<br>
                                                    ③
                                                    瓶装：<br>
                                                    79元/户/年<br>
                                                    管道：<br>
                                                    69元/户/年</td>
                                            </tr>
                                            <tr>
                                                <td>每次事故责任限额</td>
                                                <td class="">50万</td>
                                            </tr>  
                                             <tr>
                                                <td>每次事故每人责任限额</td>
                                                <td class="">5万</td>
                                            </tr> 
                                            <tr>
                                                <td colspan="3">
                                                  投保说明：仅适用于居民用户。
                                                </td>
                                            </tr> 
                                        </table>
                                    </div>
                                </div>
                                <div class="InsuranceDate" style="border-bottom:1px solid #eee;padding-left: 0;" v-show="tancanTypeIndex.indexOf(4) != -1">
                                    <p style="margin-top: 0.3rem;">选择燃气类型</p>
                                    <div class="insuranceSetBox newWidth" id="setPackage_1">
                                        <a @click="setGas(_item,_index)" :class="{current: _index == gasIndex}" v-for="(_item,_index) in gasTypeList" :key="_index">{{_item}}</a>
                                    </div>
                                </div>
                            </ul>
                    </div>
                
                <div class="insuranceTextBottom cb">
					<!-- <a href="javascript:void(0)" onClick="insuredOperate.showInsured('text')">《保险条款》</a>
					<a href="投保须知.html" >《投保须知》</a> -->
                    <span><i class="totalAmount">{{account}}</i>元/户/{{tancanIndex == 0 ? '3' : tancanIndex == 1 ? '6' : '12' }}个月</span>
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
                <div class="iTag_1" v-show="isTage_1 && isFDKJ " style="">
                        <div class="iImgsBox_4">
                    	<div style="padding-top:5.1rem;">
                        	<div style="width:6.3rem; height:2.88rem; margin:0 auto;">
                                <div class="slide cb" id="slideBanner">
                                     <van-swipe :autoplay="3000" style="height: 2.78rem;" show-indicators indicator-color="#CCCCCC" >
                                             <van-swipe-item><img style="width:100%" src="../../assets/images/insurance/example_1.jpg"></van-swipe-item>
                                            <van-swipe-item><img style="width:100%" src="../../assets/images/insurance/example_2.jpg"></van-swipe-item>
                                        </van-swipe>
                                    <div class="dot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="iTag_1" v-show="isTage_1 && isZXJJ" style="">
                        <div class="iImgsBox_4_1"  style="position:relative">
                            <div style="padding-top:5.5rem;">
                                <div style="width:6.3rem; height:2.88rem; margin:0 auto;">
                                    <div class="slide cb" id="slideBanner">
                                        <van-swipe :autoplay="3000" style="height: 2.78rem;" show-indicators indicator-color="#CCCCCC" >
                                                <van-swipe-item><img style="width:100%" src="../../assets/images/insurance/example_1.jpg"></van-swipe-item>
                                                <van-swipe-item><img style="width:100%" src="../../assets/images/insurance/example_2.jpg"></van-swipe-item>
                                            </van-swipe>
                                        <div class="dot"></div>
                                    </div>
                                </div>
                            </div>
                       </div>
                        <div class="iImgs_Footer">	
                                <p>·【房东保-租客险】（本产品）系由北京中兴保险经纪有限公司（简称中兴保险经纪，保险专业中介机构机构编码：260875000000800）代理销售，并负责客户服务。 </p>
                                <!-- <p>· 本产品的服务主体是中国人民财产保险股份有限公司深圳市分公司或中国太平洋财产保险股份有限公司深圳分公司（投保人可选择任一保险公司出单），并由出单承保保险公司负责理赔服务。</p> -->
                                <p>· 本产品的服务主体是中国人民财产保险股份有限公司深圳市分公司，并由出单承保保险公司负责理赔服务。</p>
                                <p v-show="distributorCode == 'CCWY'">· 深圳市长藤科技有限公司-业主卡（公众号）平台保险产品系由北京中兴保险经纪有限公司授权展示。</p>
					    </div>
                </div>
                <div class="iTag_2" v-show="isTage_2" >
                    <div class="insuranceTextBox">
                        <p>1.每次事故财产损失免赔300元或和核定损失金额的10%，两者以高者为准。</p>
                        <p>2.本保单仅承保住宅房屋，经营性质场所不在保障范围内。</p>
                        <p>3.必须按照对应的面积区间进行投保，否则将视为不足额投保，对于所有保障内容将按照投保方案上限面积数/实际面积的比例进行赔付。</p>
                        <p>4.如投保人投保多个地址，须单独进行投保，不可合计面积进行选择，否则本保单不承担保险责任。
                        具体保险责任和细则，以条款为准。</p>
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
                        <div class="insuranceTextBox">
                        	<p class="">事故发生后，首先请保护现场并采取必要的紧急施救措施，然后请按以下步骤进行理赔：</p>
                            <p class="">1.【拨打报案电话】请立即拨打保险公司报案电话95518(中国人保)/95500(中国太平洋保险)或有条件的情况下通过传真等方式向保险公司报案，保险公司理赔服务人员将向您询问出险情况，协助安排救助，告知后续理赔处理流程并指导您拨打报警电话，紧急情况下请您先拨打报警电话。</p>
                            <p class="">2.【事故勘察和损失确认】在您的协助下，保险公司理赔人员或委托的公估机构、技术鉴定机构、海外代理人到事故现场勘察事故经过，了解涉及的损失情况，查阅和初步收集与事故性质、原因和损失情况等有关的证据和资料，确认事故是否属于保险责任，必要时委托专门的技术鉴定部门或科研机构提供专业技术支持。保险公司将指导您填写出险通知书（索赔申请书），向您出具索赔须知。与您共同对保险财产的损失范围、损失数量、损失程度、损失金额等损失内容、涉及的人身伤亡损害赔偿内容、施救和其他相关费用进行确认，确定受损财产的修复方式和费用，必要时委托具备资质的第三方损失鉴定评估机构提供专业技术支持。</p>
                            <p class="">3.【提交索赔材料】请根据保险公司书面告知您的索赔须知内容提交索赔所需的全部材料，保险公司及时对您提交的索赔材料的真实性和完备性进行审核确认，索赔材料不完整的情况下保险公司将及时通知您补充提供有关材料，对索赔材料真实性存在疑问的情况下保险公司将及时进行调查核实。</p>
                            <p class="">4.【赔款计算和审核】在您提交的索赔材料真实齐全的情况下，保险公司根据保险合同的约定和相关的法律法规进行保险赔款的准确计算和赔案的内部审核工作，并与您达成最终的赔偿协议。</p>
                            <p class="">5.【领取赔款】：保险公司根据与您商定的赔款支付方式和保险合同的约定向您支付赔款。</p>
                            <p class="">补充说明：因第三者对保险标的的损害而造成保险事故的，在保险公司根据保险合同的约定和相关的法律法规向您支付赔款后请您签署权益转让书并协助保险公司向第三方进行追偿工作。
                            具体保险责任和细则，以条款为准。</p>
                        </div>
                    </div>
               	</div>
            </div>
        </div>
        <van-popup v-model="showGuarantee" style="height:100%;width:101%" >
			<mt-header fixed class="def-header cust-head" title="保障范围">
				<div slot="left" @click="showGuarantee = false">
					<van-icon name="arrow-left" size="18px" />
				</div>
			</mt-header>
			<div style="padding-right:.3rem;margin-top: 1.1rem;padding-left: 0.3rem;">
				<div >
                        <table class="nweInsuranceTab">
                            <tr>
                                <th style="border: 0;">基本保障内容</th>
                                <th>赔偿限额</th>
                                <th>保障</th>
                            </tr>
                            <tr>
                                <td rowspan="3">第三者人身伤亡赔偿责任（水管爆裂责任 、高空抛物责任） </td>
                                <td>累计责任限额</td>
                                <td style="width:25%;" class="">50万</td>
                            </tr>
                            <tr>
                                <td>每次事故责任限额</td>
                                <td class="">50万</td>
                            </tr>
                            <tr>
                                <td>每次事故每人责任限额</td>
                                <td class="">10万</td>
                            </tr>
                            <tr>
                                    <td rowspan="3">家庭财产损失
                                            赔偿责任  </td>
                                    <td>房屋及其室内附属设施</td>
                                    <td style="width:25%;" class="">10万</td>
                                </tr>
                                <tr>
                                    <td>室内装潢</td>
                                    <td class="">2万</td>
                                </tr>
                                <tr>
                                    <td>室内财产</td>
                                    <td class="">2万</td>
                                </tr>   
                        </table>
                </div>
                <div style="margin-top:0.2rem;padding-bottom:0.2rem;">
                        <table class="nweInsuranceTab">
                            <tr>
                                <th style="border: 0;">基本保障内容</th>
                                <th>赔偿限额</th>
                                <th>保障</th>
                            </tr>
                            <tr>
                                <td rowspan="3">监护人责任 </td>
                                <td>累计责任限额</td>
                                <td style="width:25%;" class="">10万</td>
                            </tr>
                            <tr>
                                <td>每次事故责任限额</td>
                                <td class="">10万</td>
                            </tr>
                            <tr>
                                <td>每次事故每人责任限额</td>
                                <td class="">5万</td>
                            </tr>
                            <tr>
                                    <td rowspan="3">宠物责任 </td>
                                    <td>累计责任限额</td>
                                    <td style="width:25%;" class="">5万</td>
                                </tr>
                                <tr>
                                    <td>每次事故责任限额</td>
                                    <td class="">5万</td>
                                </tr>
                                <tr>
                                    <td>每次事故每人责任限额</td>
                                    <td class="">1万</td>
                                </tr>
                                <tr>
                                    <td rowspan="3">电动自行车<br>第三者责任 </td>
                                        <td>累计责任限额</td>
                                        <td style="width:25%;" class="">50万</td>
                                    </tr>
                                    <tr>
                                        <td>每次事故责任限额</td>
                                        <td class="">25万</td>
                                    </tr>
                                    <tr>
                                        <td>每次事故每人责任限额</td>
                                        <td class="">10万</td>
                                 </tr>
                                 <tr>
                                        <td rowspan="3">燃气安全 </td>
                                            <td>累计责任限额</td>
                                            <td style="width:25%;" class="">50万</td>
                                        </tr>
                                        <tr>
                                            <td>每次事故责任限额</td>
                                            <td class="">50万</td>
                                        </tr>
                                        <tr>
                                            <td>每次事故每人责任限额</td>
                                            <td class="">10万</td>
                                     </tr>
                        </table>
                
                </div>
			</div>
		</van-popup>
        <div class="insuranceBttomBtnBox">
        	<div class="cb">
            	<span><i class="totalAmount">{{account}}</i>元/户/{{tancanIndex == 0 ? '3' : tancanIndex == 1 ? '6' : '12' }}个月</span>
				<!-- <a href="javascript:void(0)" @click="showInsured('text')">《保险条款》</a> -->
                <a class="insuranceBttomBtn" href="javascript:void(0)" @click="insuredOperate">立即投保</a>
            </div>
        </div>
        </div>
        <!--同意协议并投保 end-->
</template>
  <script >
   import "./../../assets/css/zxfd/base.scss";
   import "./../../assets/js/rem.js";
    import { dialog } from 'vant';
//    import "./../../assets/js/rem.js";
//    import tenantJJZRList from "./tenantJJZRList.vue";
//    import jjzrList from "./jjzrList.vue";
//    import jtcczhList from "./jtcczhList.vue";
//    import tenantDDZXC from "./tenantDDZXC.vue"; 
//    import sanzexianList from "./sanzexianList.vue";
//    import tenantJHRList from "./tenantJHRList.vue"; 
//    import tenantRQZRList from "./tenantRQZRList.vue"; 
//    import TenantDwsyzrList from "./TenantDwsyzrList.vue";
	import { Toast } from 'vant';
	import { axiosGetAPI ,axiosPostAPI } from '../../common/Axios';
	import store from './../../store/store'
	import * as types from './../../store/types';
		var moneyData = [
			[2000,3000,4000,5500], //标准版
			[3000,4000,5000,6500], //豪华版
			[5000,6000,7000,8500], //尊享无忧版
			[298,698,998,1198]	 //温馨版
		]
		
		var iAmountData = [
			[300,300,150,20,5,50,10,10,10],
			[600,600,200,25,5,100,20,20,20],
			[1000,1000,200,30,5,150,30,30,30],
			[300,300,150,20,5,50,10,10,10]
        ];
        var areaAmountList = [
            [26,51,76],
            [50,100,150],
            [99,199,299]
        ];
        var otherAmountList = [
            [46,90,179],
            [6,10,19],
            [13,25,49]
        ];
        var gasAmountList = [
            [21,40,79],
            [18,35,69]
        ];
		//console.log(moneyData[0][3])
		//带出去数据
		var boothArea = ""; //投保总面积
		var securityLimit = ""; //保障额度
		var iPackage = ""; //套餐
		var insuranceFee = 0;
		
		var insurance_type; //投保方式：1-按栋，2-按户
		var insurance_set; //套餐类型：1-标准，2-豪华，3-尊享，4-温馨版
		var booth_area; //面积代码
		var lift_liability; //电梯责任保障
		var rent_money; //租金损失保障
		var reputational_risk; //声誉损失保障
        //选择扩展保份数
 export default {
    data(){
        return{
                showGuarantee:false,
                isCover:false,
                isGuardian:false,
                isCar:false,
                isPet:false,
                isGas:false,
				account:26,
				newInsuranceItem:[{name:'按栋投保',value:'allhouse'},{name:'按户投保',value:'house'}],
				currentIndex:0,
				TancanList:[{name:'3个月',value:'0'},{name:'6个月',value:'1'},{name:'12个月',value:'2'}],
				tancanIndex:0,		
				tancanValue:'',
				areaList:[{name:'1~35㎡',value:'1-35'},{name:'36~80㎡',value:'36-80'},{name:'81~130㎡',value:'81-130'}],
				areaIndex:0,
                areaValue:'1~35㎡',
                gasTypeList:['燃气罐','燃气管道'],
				moneyData : [
					[2000,3000,4000,5500], //标准版
					[3000,4000,5000,6500], //豪华版
					[5000,6000,7000,8500], //尊享无忧版
					[298,698,998,1198]	 //温馨版
				],
				// areaWenxList:[{name:'1~50㎡',value:'1~50'},{name:'51~90㎡',value:'51~90'},{name:'91~130㎡',value:'91~130'},{name:'131~200㎡',value:'131~200'}],
				// areaWenxIndex:0,
				// areaWenxValue:'1~50㎡',
				elevatorInsurance:0, //电梯责任保障
				hireLossInsurance:0, //租金损失保障
				reputationInsureance:0, //租房声誉损失津贴保障
				cutoverTagList:['特别约定','产品特色','理赔服务'],
				tagIndex:1,
				isTage_1:true,
				isTage_2:false,
				isTage_3:false,
				falg:true,
				textFalg:false,
				premiumList:[300,300,150,20,5,50,10,10,10],
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
                areaAmount:0,
                carAmount:0,
                gasIndex:0,
                isFDKJ:true,
                isZXJJ:false,
                regulatoryfilings:false,
        }
	},
	components:{
		// fwczrList,
		// jjzrList,
		// jtcczhList,
        // sanzexianList,
        // tenantJHRList,
        // tenantRQZRList,
        // tenantJJZRList,
        // TenantDwsyzrList,
        // tenantDDZXC
	},
    methods :{
		closeFwczrList(){
			this.showFwczrList = false;
		},
		tofwczList(){
			this.showFwczrList = true;
		},
	  setGas(item,index){
        if(index != this.gasIndex){
                this.guardianAmount = 0;
                this.carAmount = 0;
                this.petAmount = 0;
                this.gasAmount = 0;
                this.gasIndex = index;
                for(var i = 0 ; i < this.tancanTypeIndex.length; i++){
                    if(i==0){
                        this.areaAmount = areaAmountList[this.tancanIndex][this.areaIndex];
                    }
                   this.setAmount(this.tancanTypeIndex[i]);
                }
                // this.gasAmount = gasAmountList[index][this.tancanIndex];
                this.account = this.areaAmount + this.guardianAmount + this.carAmount + this.petAmount + this.gasAmount;
            }else{
                return;
            } 	
        },
         setRadio(index){ 
				var i = index;
            if (this.tancanTypeIndex.indexOf(index) != -1) {
				this.tancanTypeIndex.splice(this.tancanTypeIndex.indexOf(index), 1);
						 if(i==1){ //监护人责任险
								this.account = this.account *1 - this.guardianAmount;
							}else if(i == 2){ //电动自行车
								this.account = this.account *1 - this.carAmount;
							}else if( i == 3){ //宠物险
								this.account = this.account *1 - this.petAmount;
							}else if(i == 4){ //燃气险
								this.account = this.account *1 - this.gasAmount;	
							}
            } else {
                this.tancanTypeIndex.push(index);
                
                         this.setAmount(index);
                         if(i==1){ //监护人责任险
                                // this.guardianAmount = otherAmountList[0][this.areaIndex];
								this.account = this.account *1 + this.guardianAmount;
                            }else if(i == 2){ //电动自行车
                                // this.carAmount = otherAmountList[1][this.areaIndex];
								this.account = this.account *1 + this.carAmount;
                            }else if( i == 3){ //宠物险
                                // this.petAmount = otherAmountList[2][this.areaIndex];
								this.account = this.account *1 + this.petAmount;
                            }else if(i == 4){ //燃气险
                                // this.gasAmount = otherAmountList[3][this.areaIndex];
								this.account = this.account *1 + this.gasAmount;	
							}
			} 
        },
        setAmount(i){
           
             if(i==1){this.guardianAmount = otherAmountList[2][this.tancanIndex];}
             if(i == 2){this.carAmount = otherAmountList[0][this.tancanIndex];}
             if(i == 3){this.petAmount = otherAmountList[1][this.tancanIndex];}
             if(i == 4){this.gasAmount = gasAmountList[this.gasIndex][this.tancanIndex]};
        },
		setTancan(item,index){ //月份
			if(index == this.tancanIndex){
				return false;					
			}
			else{
                this.guardianAmount = 0;
                this.carAmount = 0;
                this.petAmount = 0;
                this.gasAmount = 0;
                this.tancanIndex = index;
                // this.month = index;
                for(var i = 0 ; i < this.tancanTypeIndex.length; i++){
                    if(i==0){
                        this.areaAmount = areaAmountList[index][this.areaIndex];
                    }
                   this.setAmount(this.tancanTypeIndex[i]);
                }
                this.account = this.areaAmount + this.guardianAmount + this.carAmount + this.petAmount + this.gasAmount;
			}
			this.tancanValue = item.value;
		},
		setArea(item,index){ //按动面积选择
			if(index == this.areaIndex){
				return false;					
			}
			else{
                this.areaIndex = index;
                // this.account = areaAmountList[this.tancanIndex][index];
                this.areaAmount = areaAmountList[this.tancanIndex][index];
                this.account = this.areaAmount + this.guardianAmount + this.carAmount + this.petAmount + this.gasAmount;
				// this.account = this.moneyData[this.tancanIndex][index] + this.elevatorInsurance *80 + this.hireLossInsurance * 100 + this.reputationInsureance * 100 ;
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
                                attach:this.distributorAttach,
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
                model.tancanTypeIndex = this.tancanTypeIndex;//套餐类型
				model.account = this.account //总金额
                model.areaIndex = this.areaIndex;
                model.tancanIndex = this.tancanIndex;
                model.gasIndex = this.gasIndex;
				sessionStorage.setItem('tenantsData',JSON.stringify(model));
				this.$router.push({path:'/zxfdPage/tenantInsurance'});
				this.cancelEvent();
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
            sessionStorage.setItem('productCode','FDZ001');
            var self = this;
            var appId = this.$route.query.appId;
            localStorage.setItem('appId',appId);
            if(self.$route.query.regulatoryfilings){
				this.regulatoryfilings = true;
			}
			document.title = "中国人保-租房无忧";
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
			if(self.$route.query.orderNo){
				var orderNo = self.$route.query.orderNo;
                sessionStorage.setItem('orderNo',orderNo);
                // FDZ001
				axiosGetAPI('/PropertyProducts/FDZ001/PrepareOrder/' + orderNo).then(res=>{
					if(res.status == '200'){
						self.distributorCode = res.result.distributorCode;
						self.distributorAttach = res.result.distributorAttach;
						sessionStorage.setItem('distributorAttach',self.distributorAttach);
						sessionStorage.setItem('distributorCode',self.distributorCode);
					}
				})
			};
			sessionStorage.setItem('title','中国人保-租房无忧');
            if(this.distributorCode == 'SZFDKJ'){
					this.isFDKJ = true;
					this.isZXJJ = false;
			}else{
				this.isFDKJ = false;
				this.isZXJJ = true;
			}
		axiosGetAPI('/apis/apps/' + appId + "/H5").then((res) => {
					// console.log(res)
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