<template>
	<div style="background:#F5F5F5;">
        <div class="nweInsuranceBg2" v-show="isFDKJ"></div>
		 <div class="nweInsuranceBg2_1" v-show="isZXJJ"></div>
        <div class="nweInsuranceColumn">
        	<div class="nweInsuranceTagBox cb">
            	<!--current-->
				<a href="javascript:void(0)" :class="{current: index == currentIndex}" v-for=" (item , index) in newInsuranceItem" :key="index"  @click="nweInsuranceTag(item,index)">
					{{item.name}}
				</a>
            	<!-- <a class="current" href="javascript:void(0)" @click="nweInsuranceTag($event)">按栋投保</a>
                <a class="" href="javascript:void(0)" @click="nweInsuranceTag($event)">按户投保</a> -->
            </div>
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

                <div class="insuranceSetBox newWidth" id="setArea_1">
                	 <a @click="setArea(item,index)" :data-area="item.value" :class="{current: index == areaIndex}" v-for="(item,index) in areaList" :key="index">{{item.name}}</a>
                </div>
                <div class="insuranceSetBox newWidth" id="setArea_2" style="display:none;">
					 <a @click="setWenxArea(item,index)" :data-area="item.value" :class="{current: index == areaWenxIndex}" v-for="(item,index) in areaWenxList" :key="index">{{item.name}}</a>
                </div>
				
				 <h4 class="nweInsuranceTitle" style="display: flex;justify-content: space-between;">
                	<span>选择套餐</span>
					<p @click="showGuarantee = true" class="nweInsuranceLookfw">查看保障范围 <van-icon name="arrow" color="#0080FF" /></p>
                </h4>
					
                <div class="insuranceSetBox_1" id="setPackage_1">
                	 <a @click="setTancan(_item,_index)" :class="{current: _index == tancanIndex}" v-for="(_item,_index) in TancanList" :key="_index">
						<label for="aRadio_4">{{_item.name}}</label>
						<p style="font-size:0.20rem;"> {{_index == 0 ? '300' : _index == 1 ? '600' : '1000'  }}万保额</p>
					</a>
			    </div>
                <div class="insuranceSetBox_1" id="setPackage_2" style="display:none;">
                    <a  class="current"><input name="package" type="radio" value="3" id="aRadio_4">
					<label for="aRadio_4">温馨版</label>
					<p style="font-size:0.20rem;"> 300万保额</p>
					</a>
                </div>
				
                <h4 class="nweInsuranceTitle">
                	<span>选填保障</span>
                </h4>
                <ul class="newInsuranceTextList">
                    <li class="cb">
                    	<span>租金损失保障</span> <a class="InTextMsgBtn" href="javascript:void(0)" data-text='因发生主险内保险事故导致该房屋无法继续出租的，赔偿至可正常出租前的实际租金损失。'></a>
                        <div class="setQuantityBox">
                        	<a class="iNreduceBtn" :class="{opacityBtn : hireLossInsurance == 0 }" href="javascript:void(0)" @click="hireLossSub"></a>
                            <span>{{hireLossInsurance}}份</span><input name="rent" type="hidden" value="0">
                            <a class="iNaddToBtn" :class="{opacityBtn : hireLossInsurance == 1 }" href="javascript:void(0)" @click="hireLossAdd"></a>
                        </div>
                    </li>
                    <li class="cb">
                    	<span>租房声誉损失津贴保障</span> <a class="InTextMsgBtn" href="javascript:void(0)" data-text='因自杀、犯罪行为发生人身死亡事件，赔偿租房声誉损失。'></a>
                        <div class="setQuantityBox">
                        	<a class="iNreduceBtn" :class="{opacityBtn : reputationInsureance == 0 }" href="javascript:void(0)" @click="reputationSub"></a>
                            <span>{{reputationInsureance}}份</span><input name="reputation" type="hidden" value="0">
                            <a class="iNaddToBtn" :class="{opacityBtn : reputationInsureance == 1 }" href="javascript:void(0)" @click="reputationAdd"></a>
                        </div>
                    </li>
                </ul>
                <!-- <h4 class="nweInsuranceTitle">
                	<span>保障内容</span>
                </h4> -->
                
                <div class="insuranceTextBottom cb">
                    <span><i class="totalAmount">{{account}}</i>元/年</span>
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
            	<div class="iTag_1" v-show="isTage_1 && isFDKJ" style="">
					<div class="iImgsBox_3">
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
               
				<div class="iTag_1" v-show="isTage_1 && isZXJJ" style="position: relative;">
					<div class="iImgsBox_3_1">
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
							<p>·【房{{productDiff}}保-房东出租险】（本产品）系由北京中兴保险经纪有限公司（简称中兴保险经纪，保险专业中介机构机构编码：260875000000800）代理销售，并负责客户服务。</p>
							<!-- <p>· 本产品的服务主体是中国人民财产保险股份有限公司深圳市分公司或中国太平洋财产保险股份有限公司深圳分公司（投保人可选择任一保险公司出单），并由出单承保保险公司负责理赔服务。</p> -->
							<p>· 本产品的服务主体是中国人民财产保险股份有限公司深圳市分公司，并由出单承保保险公司负责理赔服务。</p>
							<p v-show="distributorCode == 'CCWY'">· 深圳市长藤科技有限公司-业主卡（公众号）平台保险产品系由北京中兴保险经纪有限公司授权展示。</p>
						</div>
                </div>

                <div class="iTag_2" v-show="isTage_2" >
                	<h4 class="insuranceTitle" style="border-bottom:1px solid #eee; padding-left:.3rem;">
                        <span>特别约定</span>
                    </h4>
                    <div class="insuranceTextBox">
                        <p>1.投保人/被保险人：房屋出租人（房东、二手房东）</p>
                        <p>2.房屋类型：城中村（按栋/户）、农民房（按栋/户）、商品房（按户）</p>
                        <p>3.保险期限：一年</p>
                        <p><b>约定内容</b></p>
                        <p>1.出租人已与各承租人签订房屋租赁合同的，保险人认可该出租人作为本保险单的被保险人；出租人已与转租人签订房屋承包租赁合同且转租人已与各承租人签订房屋租赁合同的，保险人认可该出租人及转租人作为本保险单的共同被保险人。</p>
                        <p>2.第三者财产损失及出租人家庭财产损失每次事故财产损失免赔300元或和核定损失金额的5%，两者以高者为准；第三者人身伤亡每次事故医疗费用免赔100元或核定损失金额的5%，两者以高者为准。</p>
                        <p>3.本保险单载明地址的房屋在保险期限内发生高空坠物、水管爆裂意外事故，造成第三者人身伤亡或财产损失，依法应由被保险人承担的损害赔偿责任，保险人在本保险单载明限额内承担赔偿责任。</p>
                        <p>4.本保险单扩展承保在本保险单载明地址的房屋内因斗殴、吸毒、自杀、疾病或治安刑事案件等原因导致第三者人身伤亡，依法应由被保险人应支付的医疗费用、丧葬费用以及其他费用，每套房屋累计责任限额5万元。</p>
                        <!-- <p>5.兹经双方同意，本保险扩展承保本保险单明细表中列明的地点范围内的电梯、升降机在正常使用过程中发生意外事故造成第三者人身伤亡或财产损失时依法应由被保险人承担的经济赔偿责任。被保险人应持有有关政府部门颁发的电梯、升降机合格证书,并保证对电梯、升降机有合格的技术人员定期进行检查和维修。</p>
                        <p>但以下情况本保单不负责赔偿：</p>
                        <p>（一） 由于自然灾害和意外事故等原因造成电梯本身的损坏；</p>
                        <p>（二） 劳动管理部门对影响安全的有关问题提出限期整改后仍未改正的；</p>
                        <p>（三） 保险责任事故发生后引起的各种间接损失；</p>
                        <p>（四） 因电梯超载引起的损失和费用。</p>
                        <p>本项扩展责任累计赔偿责任限额50万元/份。</p> -->
                        <p>5. 在保险期间内，保险单载明地址的出租房屋因发生主险列明的保险事故导致该房屋无法继续出租的，保险人对被保险人所遭受的在受损房屋合理恢复至可居住状态（不好于受损前的实际状态）前的实际租金损失负责赔偿。</p>
                        <p>保险人按出险前 30 日保险房屋的有效租约约定的租金计算每日租金，并以此作为日租金赔偿金额。</p>
                        <p>赔偿天数为保险事故发生后受损房屋的实际修复天数扣除本保险单列明的每次事故绝 对免赔天数。</p>
                        <p>租金损失赔偿金额 ＝日租金赔偿金额 X 赔偿天数，但最高不超过设置的累计赔偿限额。</p>
                        <p>日租金赔偿金额最高赔偿标准：500元/天</p>
                        <p>最高赔偿期限：100天</p>
                        <p>相对免赔天数5天，即无法继续出租天数少于5天，本保单不予以赔偿，超过5天，按照实际无法继续出租天数赔偿，但最长不超过最高赔偿期限。</p>
                        <p>租金损失赔偿金额累计赔偿限额5万元/份。</p>
                        <p>6. 保险期限内，本保险单载明的的出租住宅房屋内因自杀、犯罪行为发生人身死亡事件，保险人按照保险单载明的金额向被保险人承担赔偿责任。索赔时需提供公安机关提供的案件证明。租房声誉损失津贴保障金额5万元份。</p>
                        <p>7.本保单仅承保住宅房屋，经营性质场所不在保障范围内。</p>
                        <p>8.必须按照对应的面积区间进行投保，否则将视为不足额投保，对于所有保障内容将按照投保方案上限面积数/实际面积的比例进行赔付。</p>
                        <p>9.如投保人投保多个地址，须单独进行投保，不可合计面积进行选择，否则本保单不承担保险责任。</p>
                        <p>10.发生保险事故，如被保险人无法提供房屋所有权证或不动产权证书，街道办等政府部门能够出具房屋或土地权属证明的，保险人按照保单约定承担赔偿责任。</p>
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
				<div  class="iTag_4" v-show="isTage_4">
					<ul class="iTag_4Box">
						<li>
							<span class="question1">
								<p>Q1</p>
								<p>房子是我父母的，我可以作为投保人投保吗？</p>
								<p></p>
							</span>
							<span class="question2">
								<p>A</p>
								<p>可以。对投保标的具有保险利益的家庭成员均可作为投保人投保，如房子所有人本人、其父母、子女、配偶等均可。</p>
								<p></p>
							</span>
						</li>
						<li>
							<span class="question1">
								<p>Q2</p>
								<p>我是二手房东，可以购买房{{productDiff}}保吗？</p>
								
							</span>
							<span class="question2">
								<p>A</p>
								<p>可以。出租人已与各承租人签订房屋租赁合同的，保险人认可该出租人作为本保险单的被保险人；出租人已与转租人签订房屋承包租赁合同且转租人已与各承租人签订房屋租赁合同的，保险人认可该出租人及转租人作为本保险单的共同被保险人。</p>
								
							</span>
						</li>
						<li>
							<span class="question1">
								<p>Q3</p>
								<p>如果我的房子是1100平，我按1000平投保，会影响赔付吗？</p>
							</span>
							<span class="question2">
								<p>A</p>
								<p>如果理赔时发现投保面积小于实际房屋面积，保险公司将视为不足额投保，则实际赔付金额=应赔付金额*投保上限面积/实际房屋面积。如题案例，应赔付金额为100万时，实际赔付金额=100万*1000平/1100平=90.9万。</p>
							</span>
						</li>
						<li>
							<span class="question1">
								<p>Q4</p>
								<p>经营性场所、商业办公楼、工业园区可以购买房{{productDiff}}保吗？</p>
								<p></p>
							</span>
							<span class="question2">
								<p>A</p>
								<p>房{{productDiff}}保目前仅支持住宅房屋投保，暂不支持经营性场所、商业办公楼或工业园区投保。如果有需要可以联系房{{productDiff}}科技，我们可以和保险公司单独申报出方案。</p>
								<p></p>
							</span>
						</li>
						<li>
							<span class="question1">
								<p>Q5</p>
								<p>城中村的房子大部分都没有不动产证明，会影响理赔吗？</p>
								<p></p>
							</span>
							<span class="question2">
								<p>A</p>
								<p>发生保险事故，如被保险人无法提供房屋所有权证或不动产权证书，街道办等政府部门能够出具房屋或土地权属证明的，保险人按照保单约定承担赔偿责任。</p>
								<p></p>
							</span>
						</li>
						<li>
							<span class="question1">
								<p>Q6</p>
								<p>如果被保险人因自有出租物业发生意外事故导致自身伤亡，房{{productDiff}}保能否赔偿？</p>
								<p></p>
							</span>
							<span class="question2">
								<p>A</p>
								<p>不能。房{{productDiff}}保主要保障房屋出租人责任，即被保险出租住宅房屋因保险合同载明的原因造成第三者人身伤亡，依法应由被保险人承担的经济赔偿责任，保险人按照保险合同约定负责赔偿。这里第三者是指除保险人、被保险人及其家庭成员以外的人。对于被保险人及其家庭成员的人身伤亡，不在房{{productDiff}}保保障范围内，保险公司亦不负责赔偿。</p>
								<p></p>
							</span>
						</li>
						<li>
							<span class="question1">
								<p>Q7</p>
								<p>投保标的对楼龄或其他条件有没有限制？</p>
								<p></p>
							</span>
							<span class="question2">
								<p>A</p>
								<p>房{{productDiff}}保对房屋楼龄无限制，投保人仅需提供投保标的的详细地址及房屋面积信息即可投保。</p>
								<p></p>
							</span>
						</li>
						<li>
							<span class="question1">
								<p>Q8</p>
								<p>对于城中村楼房中顶楼违建的情况，是否可以投保？</p>
								<p></p>
							</span>
							<span class="question2">
								<p>A</p>
								<p>可以投保，投保人应将违建部分房屋面积计入总面积进行投保。</p>
								<p></p>
							</span>
						</li>
					</ul>
				</div>
            </div>
        </div>
        <div class="insuranceBttomBtnBox">
        	<div class="cb">
            	<span><i class="totalAmount">{{account}}</i>元/{{currentIndex == 0 ? "栋" : "户"}}/年</span>
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
				<div v-if="currentIndex == 1">
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
					</table>
                </div>
				<div v-if="currentIndex == 0">
					<table class="nweInsuranceTab">
						<tr >
							<th style="border: 0;">基本保障内容</th>
							<th style="width:1.5rem;">赔偿限额</th>
							<th>标准版</th>
							<th>豪华版</th>
							<th>尊享<br>无忧版</th>
						</tr>
						<tr>
							<td rowspan="5">第三者(含租客)人身伤亡及财产损失赔偿责任(含水管爆裂责任、高空抛物责任)  </td>
							<td>累计责任限额</td>
							<td class="">300万</td>
							<td class="">600万</td>
							<td class="">1000万</td>
						</tr>
						<tr>
							<td>每次事故责任限额</td>
							<td class="">300万</td>
							<td class="">600万</td>
							<td class="">1000万</td>
						</tr>
						<tr>
							<td>每次事故每人伤亡责任限额</td>
							<td class="">150万</td>
							<td class="">200万</td>
							<td class="">200万</td>
						</tr>
						<tr>
							<td>每次事故财产损失责任限额</td>
							<td class="">20万</td>
							<td class="">25万</td>
							<td class="">30万</td>
						</tr>
						<tr>
							<td>法律费用累计责任限额</td>
							<td class="">5万</td>
							<td class="">5万</td>
							<td class="">5万</td>
						</tr>
						<tr>
							<td rowspan="4">出租人(房东)家庭财产损失赔偿责任</td>
							<td>房屋主体、附属建筑物</td>
								<td class="">50万</td>
							<td class="">50万</td>
							<td class="">50万</td>
						</tr>
						<tr>
							<td>室内附属设施</td>
							<td class="">10万</td>
							<td class="">10万</td>
							<td class="">10万</td>
						</tr>
						<tr>
							<td>室内装潢</td>
							<td class="">10万</td>
							<td class="">10万</td>
							<td class="">10万</td>
						</tr>
						<tr>
							<td>室内财产</td>
							<td class="">10万</td>
							<td class="">10万</td>
							<td class="">10万</td>
						</tr>
					</table>
                </div>
                <div style="margin-top:0.2rem;">
                	<table class="nweInsuranceTab">
					<tr>
						<th style="border: 0;">选填保障</th>
						<th>保险责任</th>
						<th>限额(元)</th>
					</tr>
          
                    <tr>
                    	<td>租金损失赔偿责任</td>
                    	<td>最高赔偿限额</td>
                        <td class="">5万</td>
                    </tr>
                    <tr>
                    	<td>租房声誉损失津贴</td>
                    	<td>每次事故赔偿限额</td>
                        <td class="">5万</td>
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
   import { dialog } from 'vant';
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
		]
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
				amountGuarantee:300,
				showGuarantee:false,
				account:'2000',
				newInsuranceItem:[{name:'按栋投保',value:'allhouse'},{name:'按户投保',value:'house'}],
				currentIndex:0,
				TancanList:[{name:'标准版',value:'0'},{name:'豪华版',value:'1'},{name:'尊享无忧版',value:'2'}],
				tancanIndex:0,		
				tancanValue:'',
				areaList:[{name:'500~1000㎡',value:'500-1000'},{name:'1001~2000㎡',value:'1001-2000'},{name:'2001~3000㎡',value:'2001-3000'},{name:'3001~5000㎡',value:'3001-5000'}],
				areaIndex:0,
				areaValue:'500~1000㎡',
				moneyData : [
					[2000,3000,4000,5500], //标准版
					[3000,4000,5000,6500], //豪华版
					[5000,6000,7000,8500], //尊享无忧版
					[298,698,998,1198]	 //温馨版
				],
				areaWenxList:[{name:'1~50㎡',value:'1~50'},{name:'51~90㎡',value:'51~90'},{name:'91~130㎡',value:'91~130'},{name:'131~200㎡',value:'131~200'}],
				areaWenxIndex:0,
				areaWenxValue:'1~50㎡',
				elevatorInsurance:0, //电梯责任保障
				hireLossInsurance:0, //租金损失保障
				reputationInsureance:0, //租房声誉损失津贴保障
				cutoverTagList:['产品特色','特别约定','常见问题','理赔服务'],
				tagIndex:0,
				isTage_1:true,
				isTage_2:false,
				isTage_3:false,
				isTage_4:false,
				falg:true,
				textFalg:false,
				premiumList:[300,300,150,20,5,50,10,10,10],
				extendPremium:[0,0,0],
				showFwczrList:false,
				showDszssList:false,
				showJtcczhList:false,
				showJjzrList:false,
				distributorCode:'',
				distributorAttach:'',
				isMessage:false,
				isFDKJ:true,
				isZXJJ:false,
				productDiff:'咚',
				regulatoryfilings:false,//判断是否为报备
				showRegulatory:false,
        }
	},
	components:{
		// fwczrList,
		// jjzrList,
		// jtcczhList,
		// sanzexianList,
	},
    methods :{
		closeFwczrList(){
			this.showFwczrList = false;
		},
		tofwczList(){
			this.showFwczrList = true;
		},
		//选择按栋按户
		 nweInsuranceTag(item,index){
			 var $_setPackage_1 = $("#setPackage_1");
			var $_setPackage_2 = $("#setPackage_2");
			var $_setArea_1 = $("#setArea_1");
			var $_setArea_2 = $("#setArea_2");
			if(index == this.currentIndex){
				return false;					
			}
			else{
				this.currentIndex = index;
			}
			if(index == 0){		
				this.account = this.moneyData[this.tancanIndex][this.areaIndex]	+ this.elevatorInsurance *80 + this.hireLossInsurance * 100 + this.reputationInsureance * 100 ;	
				this.premiumList = iAmountData[this.tancanIndex];
				$_setPackage_1.show();
				$_setPackage_2.hide();
				$_setArea_1.show();
				$_setArea_2.hide();
			}else{
				this.account = this.moneyData[3][this.areaWenxIndex] + this.elevatorInsurance *80 + this.hireLossInsurance * 100 + this.reputationInsureance * 100 ;
				this.premiumList = iAmountData[3];		
				$_setPackage_1.hide();
				$_setPackage_2.show();
				$_setArea_1.hide();
				$_setArea_2.show();
			}
		},

		setTancan(item,index){ //按动套餐选择
			if(index == this.tancanIndex){
				return false;					
			}
			else{
				this.tancanIndex = index;
				this.account = this.moneyData[index][this.areaIndex] + this.elevatorInsurance *80 + this.hireLossInsurance * 100 + this.reputationInsureance * 100 ;
				this.premiumList = iAmountData[index];
			}
			this.tancanValue = item.value;
		},
		setArea(item,index){ //按动面积选择
			if(index == this.areaIndex){
				return false;					
			}
			else{
				this.areaIndex = index;
				this.account = this.moneyData[this.tancanIndex][index] + this.elevatorInsurance *80 + this.hireLossInsurance * 100 + this.reputationInsureance * 100 ;
			}
			this.areaValue = item.name;
		},
		setWenxArea(item,index){ //温馨版面积选择
			if(index == this.areaWenxIndex){
				return false;					
			}
			else{
				this.areaWenxIndex = index;
				this.account = this.moneyData[3][index] + this.elevatorInsurance *80 + this.hireLossInsurance * 100 + this.reputationInsureance * 100 ;
			}
			this.areaWenxValue = item.name;
		},
		elevatorSub(){ //电梯责任险减
			if(this.elevatorInsurance > 0){
				this.elevatorInsurance = this.elevatorInsurance - 1;
				this.extendPremium[0] =  50 * this.elevatorInsurance;
				this.account = this.account * 1 - 80;
			}else{
				return
			}
		},
		elevatorAdd(){ //电梯责任加
			if(this.elevatorInsurance < 1){
				this.elevatorInsurance = this.elevatorInsurance + 1;
				this.extendPremium[0] =  50 * this.elevatorInsurance;
				this.account = this.account * 1 + 80;
			}else{
				return
			}
		},
		hireLossSub(){ //租金损失保障减
			if(this.hireLossInsurance > 0){
				this.hireLossInsurance = this.hireLossInsurance - 1;
				this.extendPremium[1] =  5 * this.hireLossInsurance;
				this.account = this.account * 1 - 100;
			}else{
				return
			}
		},
		hireLossAdd(){ //租金损失保障加
			if(this.hireLossInsurance < 1){
				this.hireLossInsurance = this.hireLossInsurance + 1;
				this.extendPremium[1] = 5 * this.hireLossInsurance;
				this.account = this.account * 1 + 100;
			}else{
				return
			}
		},
		reputationSub(){ //租金损失保障减
			if(this.reputationInsureance > 0){
				this.reputationInsureance = this.reputationInsureance - 1;
				this.extendPremium[2] =  5 * this.reputationInsureance;
				this.account = this.account * 1 - 100;
			}else{
				return
			}
		},
		reputationAdd(){ //租金损失保障加
			if(this.reputationInsureance < 1){
				this.reputationInsureance = this.reputationInsureance + 1;
				this.extendPremium[2] = 5 * this.reputationInsureance;
				this.account = this.account * 1 + 100;
			}else{
				return
			}
		},
		 cutoverTag(item,index){ //切换tag
			if(index == this.tagIndex){return};
			this.tagIndex = index;
			if(index == 0){
				this.isTage_1 = true;
				this.isTage_2 = false;
				this.isTage_3 = false;
				this.isTage_4 = false;
			}else if(index == 1){
				this.isTage_1 = false;
				this.isTage_2 = true;
				this.isTage_3 = false;
				this.isTage_4 = false;
			}else if(index == 3){
				this.isTage_1 = false;
				this.isTage_2 = false;
				this.isTage_3 = true;
				this.isTage_4 = false;
			}else{
				this.isTage_1 = false;
				this.isTage_2 = false;
				this.isTage_3 = false;
				this.isTage_4 = true;
			}	
		},
		calculate(){
				var lift = $("input[name = lift]").val();
				var rent = $("input[name = rent]").val();
				var reputation = $("input[name = reputation]").val();
				console.log(lift*80 + rent*100 + reputation*100 + insuranceFee)
				$(".totalAmount").text(lift*80 + rent*100 + reputation*100 + insuranceFee)
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
			showDszssListBtn(){
				this.showDszssList = true;
				this.cancelEvent()
				},
			showJtcczhListBtn(){
				this.showJtcczhList = true;
				this.cancelEvent()
				},
			showJjzrListBtn(){
				this.showJjzrList = true;
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
				return;
			}
			
			if(this.currentIndex == 0){ //按栋投保
				var model = {};
				model.packageType = this.tancanIndex //套餐类型
				model.currentIndex = this.currentIndex;
				// this.areaIndex //投保面积
				model.area = this.areaValue ;
				model.areaIndex = this.areaIndex ;
				model.elevatorInsurance = this.elevatorInsurance; //电梯险
				model.hireLossInsurance = this.hireLossInsurance; //租金损失
				model.reputationInsureance = this.reputationInsureance ;//房屋声誉损失
				model.account = this.account ;//总金额
				model.premiumList = this.premiumList; // 保障金额
				model.extendPremium =this.extendPremium ;//电梯险等附加险金额
			}else if(this.currentIndex == 1){
				var model = {};
				model.packageType = 3 ;//套餐类型
				model.area = this.areaWenxValue; 
				model.areaIndex = this.areaWenxIndex;
				model.elevatorInsurance = this.elevatorInsurance; //电梯险
				model.hireLossInsurance = this.hireLossInsurance ;//租金损失
				model.reputationInsureance = this.reputationInsureance ;//房屋声誉损失
				model.account = this.account //总金额
				model.premiumList = this.premiumList // 保障金额
				model.extendPremium =this.extendPremium //电梯险等附加险金额
				model.currentIndex = this.currentIndex;
			}
				sessionStorage.setItem('fdInsuranceData',JSON.stringify(model));
				this.$router.push({path:'/zxfdPage/orderInformation'});
				this.cancelEvent();
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
		 	 sessionStorage.setItem('productCode','FDD001');
			var self = this;
			var appId = this.$route.query.appId;
			if(self.$route.query.regulatoryfilings){
				this.regulatoryfilings = true;
			}
            localStorage.setItem('appId',appId);
			document.title = "中国人保-出租无忧";
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
				// /PropertyProducts/FDD001/PrepareOrder/{prepareOrderNo}
				axiosGetAPI('/PropertyProducts/FDD001/PrepareOrder/' + orderNo).then(res=>{
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
			sessionStorage.setItem('title','中国人保-出租无忧');
			// var appId = this.$route.query.appId;
			if(this.distributorCode == 'SZFDKJ'){
					this.isFDKJ = true;
					this.isZXJJ = false;
					this.productDiff = '咚'
			}else{
				this.isFDKJ = false;
				this.isZXJJ = true;
				this.productDiff = '东'
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
			// localStorage.setItem('appId',appId);
			// document.title = "出租无忧";
			},	
			mounted(){
				
				$(document.body).on("click", "#inpoTextMsgBox", function(e){
						$("#inpoTextMsgBox").remove();
						$(".inpoTextMsgBox").remove();
					});		
					//展示黄色图标内容
				$(".InTextMsgBtn").click(function(){
					$(document.body).append('<div id="inpoTextMsgBox"></div><div class="inpoTextMsgBox"><span class="s1"></span><span class="s2"></span><p></p></div>');
					var $_mgsBox = $(".inpoTextMsgBox");
					var $_mgsp = $(".inpoTextMsgBox>p");
					var $_idBox =$("#inpoTextMsgBox")
					var $_this = $(this);
					$_mgsp.html($_this.data("text"));
					var lt_1=$_mgsBox.width();
					var lt_2=$_this.offset().left;
					var tops=$_this.offset().top + $_this.height()*1.5;
					if(lt_1>=lt_2){
						$_mgsBox.css({"top":+tops+"px","left":+lt_2+"px"});
						$(".inpoTextMsgBox>span").css({"left":"3px","right":""});
						//$_mgsBox.width(lt_2);
					}else{
						var tt= $(window).width()-lt_2-$(this).width();
						$_mgsBox.css({"top":+tops+"px","right":+tt+"px","left":""});
						$(".inpoTextMsgBox>span").css({"left":"","right":"3px"});
					}
				});

			}
        }
        </script>
		<style scoped>
		.base_msg_box>div>a.sbtn{ color:#333; background:linear-gradient(90deg,rgba(255,226,59,1) 0%,rgba(255,213,0,1) 100%);box-shadow:0px 2px 5px 0px rgba(255,192,0,0.7); border-radius: .8rem; width:80%; margin:.3rem auto;padding: .2rem;}
		.base_msg_box>h3{ padding-top:.45rem; font-size:.36rem;}
		.insuranceSetBox, .insuranceTextBottom { padding-right:.3rem;}
		.insuranceTextBottom { border:none;}
		</style>