<template>
    <div class="page-container" style="padding-bottom: 0.9rem;">
          <div class="m20">
                    <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            保障计划
                        </span>
                    </div>
                <div class="lyBox" style="background: none;border: 0;margin: 0;">
                    <div class="htabscroll"> 
                        <div class="ly-tab-list">
                            <div class="ly-tab-item-label" v-for="(item,index) in projectListArr" :key="index" @click="changeProject(item,index)" :class="{projectActive:index == projectIndex}">
                             <span class="wd">{{item.PackageName}}</span>
                          </div>
                        </div>
                    </div>
                </div>
                 <ul class="plan-info-list" v-if="PackagesList.length > 0">
                    <li v-for="(item ,index) in PackagesList[projectIndex].planInfos" :key="index" >
                        <div class="plan-info-title">
                               <div>{{item.planName}}</div>
                        </div>
                        <ul  v-for="(_item ,_index) in item.dutyInfos" :key="_index">
                            <li  class="duty-item" > 
                                <p class="insured-detail">{{_item.dutyName}}</p>
                                <p class="insured-amount">{{_item.insuredAmount  + _item.insuredAmountUnit }}</p>
                            </li> 
                        </ul>
                    </li>
                </ul>
                    <div class="m20-schemeDetail" @click="pinganDetailBtn">
                        保障详情
                    </div>
             </div>

             <div class="m20">
                    <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            投保商户
                        </span>
                        <span class="cell-sub-title sub-title-bold sub-title-">
                            (被保人)
                        </span>
                    </div>
                    <div class="common-cell none-line show-all">
                        <div class="common-cell-container">
                                <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                    <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                    <span data-v-29da0c6c="" class="cell-title">行业选择</span>
                                </div>
                                <div class="cell-right"  @click="isVocation = true">
                                    <div class="cell-right-content">
                                        <span class="placeholder-text" v-show="vocation == ''" >{{vocation ? vocation : "请选择"}}</span>    
                                        <span class="placeholder-address" v-show="vocation">{{vocation}}</span>
                                    </div>
                                    <i class="cell-icon cell-icon-" style="display:none"></i>       
                                    <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="arrow-right"></i>
                                </div>
                            </div>
                    </div>
                    <van-field v-model="shopName" @focus="showSeachOrgCode" label="店铺名称"  placeholder="请输入营业执照上的店铺名称" />
                    <div class="common-cell none-line show-all">
                      <div class="common-cell-container">
                            <div data-v-29da0c6c="" class="cell-left" style="min-width:1.8rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                <label for="" class="applicantCard"  @click="applicantcardTypeBtn">
                                    <span class="cell-title" >{{applicantcardType}}</span>
                                    <van-icon name="arrow-down" />
                                </label>
                                
                            </div>
                            <div class="cell-right" >
                                <div class="cell-right-content">
                                   <input type="text" v-model="applicantType" placeholder="请输入证件号" >
                                </div>
                                <i class="cell-icon cell-icon-" style="display:none"></i>       
                                <!-- <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="arrow-right"></i> -->
                            </div>
                        </div>
                    </div>
                    <div class="common-cell none-line show-all">
                        <div class="common-cell-container" >
                            <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;">
                                </i> <span data-v-29da0c6c="" class="cell-title">所在城市</span>
                            </div>
                            <div class="cell-right"  @click="toAddress">
                                <div class="cell-right-content">
                                    <span class="placeholder-text" v-show="cityValue == ''" >{{cityValue ? cityValue : "请选择"}}</span>    
                                    <span class="placeholder-address" v-show="cityValue">{{cityValue}}</span>
                                </div>
                                <i class="cell-icon cell-icon-" style="display:none"></i>       
                                <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="arrow-right"></i>
                            </div>
                        </div>
                    </div>
                     <van-field v-model="addressDetail" label="详细地址"  placeholder="如道路、门牌号、小区、楼栋号、单元室等" />   
                    <div class="">
                        <van-field  v-model="Contact.name" label="联系人"  placeholder="请输入联系人姓名" />
                        <van-field  v-model="Contact.phone" oninput="if(value.length>11)value=value.slice(0,11)"  type="tel" label="联系电话"  placeholder="请输入手机号码" />
                        <van-field  v-model="Contact.email" type="email" label="邮箱"  placeholder="用于接收电子保单" />
                        <van-field  v-model="insureNum" type="email" label="保障人数"  placeholder="温馨版3人,财神版3-6人" />
                    </div>
             </div>

             <div class="m20">
                    <div class="common-cell none-line show-all">
                        <div class="common-cell-container">
                                <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                    <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                    <span data-v-29da0c6c="" class="cell-title">保险期限</span>
                                </div>
                                <div class="cell-right"  @click="isVocation = true">
                                    <div class="cell-right-content">
                                        <span class="placeholder-address" >1年</span>    
                                    </div>
                                    <i class="cell-icon cell-icon-" style="display:none"></i>       
                                </div>
                            </div>
                    </div>
                    <div class="common-cell none-line show-all">
                        <div class="common-cell-container">
                                <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                    <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                    <span data-v-29da0c6c="" class="cell-title">保险起期</span>
                                </div>
                                <div class="cell-right"  @click="selInsuredBirthday">
                                <div class="cell-right-content">
                                        
                                    <span class="placeholder-address" v-show="startTime">{{startTime}}</span>
                                </div>
                                <i class="cell-icon cell-icon-" style="display:none"></i>       
                                <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="begin-slot-right"></i>
                            </div>
                            </div>
                    </div>
                    <div class="common-cell none-line show-all">
                        <div class="common-cell-container">
                                <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                    <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                    <span data-v-29da0c6c="" class="cell-title">保险止期</span>
                                </div>
                                <div class="cell-right" >
                                <div class="cell-right-content">
                                    <span class="placeholder-address" >{{endTime}}</span>
                                </div>
                                <i class="cell-icon cell-icon-" style="display:none"></i>       
                            </div>
                            </div>
                    </div>
             </div>

              <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            投保人
                        </span>
                        <div class="scheme-detail" style="display: flex;align-items: center;">
                            <p style=" font-size: .28rem;color: #666;margin-right: 0.1rem;">同被保人</p>
                            <van-switch  size="16px" v-model="InsureChecked" active-color="#ffa03b" inactive-color="#e5e5e5" />
                        </div>
                </div>
                <div  v-show="!InsureChecked" >
                    <van-field v-model="applicant.Name"  label="名称"  placeholder="请输入您的名称" />
                    <div class="common-cell none-line show-all">
                      <div class="common-cell-container">
                            <div data-v-29da0c6c="" class="cell-left" style="min-width:1.8rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                <label for="" class="applicantCard"  @click="isCard = true">
                                    <span class="cell-title" >{{applicant.CertificateType}}</span>
                                    <van-icon name="arrow-down" />
                                </label>  
                            </div>
                            <div class="cell-right" >
                                <div class="cell-right-content">
                                   <input type="text" v-model="applicant.CertificateNo" placeholder="请输入证件号" >
                                </div>
                                <i class="cell-icon cell-icon-" style="display:none"></i>                                   
                            </div>
                        </div>
                    </div>
                    <div class="common-cell none-line show-all">
                        <div class="common-cell-container" >
                            <div data-v-29da0c6c="" class="cell-left" style="width:1.8rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;">
                                </i> <span data-v-29da0c6c="" class="cell-title">所在城市</span>
                            </div>
                            <div class="cell-right"  @click="isApplicantShow = true">
                                <div class="cell-right-content">
                                    <span class="placeholder-text" v-show="applicant.cityValue == ''" >{{applicant.cityValue ? applicant.cityValue : "请选择"}}</span>    
                                    <span class="placeholder-address" v-show="applicant.cityValue">{{applicant.cityValue}}</span>
                                </div>
                                <i class="cell-icon cell-icon-" style="display:none"></i>       
                                <i style="padding-top: 0.24rem;padding-bottom: 0.24rem;" class="arrow-right"></i>
                            </div>
                        </div>
                    </div>
                     <van-field v-model="applicant.addressDetail" label="详细地址"  placeholder="如道路、门牌号、小区、楼栋号、单元室等" />   
                    <div class="">
                        <van-field  v-model="applicant.ContactName" label="联系人"  placeholder="请输入联系人姓名" />
                        <van-field  v-model="applicant.phone" oninput="if(value.length>11)value=value.slice(0,11)"  type="tel" label="联系电话"  placeholder="请输入手机号码" />
                        <van-field  v-model="applicant.email" type="email" label="邮箱"  placeholder="用于接收电子保单" />
                    </div>
                     
                </div>
            </div>
            <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                            受益人
                        </span>
                        <div class="scheme-detail">
                            <p style=" font-size: .28rem;color: #666">同被保人</p>
                        </div>
                </div>                
            </div>

        <div class="m20">
                <div class="product-title">
                        <span class="cell-title title-bold">
                            <i class="cell-title-left-icon"></i>
                           发票
                        </span>
                </div>
                <div class="invoice-cell">
                     <div class="invoice-block" v-for="(item,index) in invoiceList" :key = index @click="invoiceBtn(item,index)">
                         <i :class="{'invoice-check': invoiceIndex == index }" class="invoice-radio"></i>
                         <span class="invoive-title">{{item.name}}</span>
                    </div>
                </div>
                 <div class="common-cell none-line show-all" v-show="invoiceIndex == 0" style="border-top: 0.01rem solid #f7f7f7;">
                      <div class="common-cell-container">
                            <div data-v-29da0c6c="" class="cell-left" style="width:2rem">
                                <i data-v-29da0c6c="" class="cell-icon left-icon-" style="display: none;"></i>
                                <span data-v-29da0c6c="" class="cell-title">纳税人识别码</span>
                            </div>
                            <div class="cell-right"  >
                                <input type="text" v-model="taxpayerNum"  @keyup="taxpayerChange"  placeholder="请输入纳税人识别号"  >
                            </div>
                        </div>
                </div>     
             </div>

              <div class="bottom-fixed" >
                    <div class="read-area bottom-fixed">
                            <span class="checkbox-icon" :class="{active:isCheckBox}" @click="showCheckBox"></span>
                            <div class="item-wrapper-list">
                                <label for="">我已阅读</label>
                                <span @click="informationBtn">《投保须知》</span>
                                <span @click="showInsuranceList = true">《保险条款》</span>
                                <span @click="showSolvency = true" >《偿付能力披露》</span>
                                <span @click="showIvoice = true">《发票说明》</span>
                            </div>
                    </div>
             </div>

            <div class="page-footer bottom-fixed">
                 <div class="money-text foot-premium"  v-if="amount != ''">{{'￥' + amount}}</div>
                <div class="money-text foot-premium" style="color:#a0a0a0;font-size:0.32rem;" v-else>{{tip}}</div>
                <div class="footer-btn" @click="toProductMicro">立即投保</div>
            </div>

        <mt-datetime-picker  @touchmove.native.stop.prevent ref="insuredBirthday" v-model="insuredBirthday" type="date" :startDate="startDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="insuredBirthConfirm">
		</mt-datetime-picker>

        <!--  地址选择 -->
        <mt-popup position="bottom" v-model="isShow">
			  <!-- <div class="picker-toolbar headerClose">
					<span @click="isShow = false">取消</span>
					<span >请选择省市区</span> 
					<span @click="selAddress">确定</span>
			</div>
				<mt-picker :slots="myAddressSlots"  valueKey="name" :visibleItemCount="5" @change="addressChange"
					:itemHeight="40"></mt-picker> -->
            <selectAddress v-on:addressList="addressList" v-on:closeAddress="closeAddress"   ></selectAddress>
		</mt-popup>

        <!-- 被投保人 -->
         <mt-popup position="bottom" v-model="isApplicantShow">
			  <div class="picker-toolbar headerClose">
					<span @click="isApplicantShow = false">取消</span>
					<span >请选择省市区</span> 
					<span @click="selApplicantAddress">确定</span>
			</div>
				<mt-picker :slots="myAddressSlots"  valueKey="name" :visibleItemCount="5" @change="addressApplicantChange"
					:itemHeight="40"></mt-picker>
                <!-- <selectAddress v-on:addressList="addressList" v-on:closeAddress="closeAddress"   ></selectAddress> -->
		</mt-popup>

        <!-- 行业选择 -->
        <van-popup position="bottom" v-model="isVocation">
				<van-picker show-toolbar :columns="vocationColums" @confirm="vocationChange"  @cancel="isVocation = false" />
		</van-popup>
        <!-- 机构搜索 -->
        <van-popup v-model="isSeachOrgCode" class="mint-popup-full" style="height:100%;width:100%;background:rgb(241,241,241);">
          <!-- <div class="information-search-container">
              <div class="searchbar">
                <div class="backIcon" @click="closeSeach"></div>
                <div class="searchbar-inner">
                    <i class="icon-search"></i>
                    <i class="icon-close" v-show="OrgCode != ''" @click="emptyInput"></i>
                    <input type="text" v-model="OrgCode" ref="inputOrg"  placeholder="您可以根据输入机构名称，检索组织机构信息" style="width: 100%;">
                </div>
                <div class="searchbar-confirm" @click="closeSeach">完成</div>
              </div>
              <div class="org-info-box" v-show="orgCodeResult.length > 0">
                  <div v-for="(item,index) in orgCodeResult" :key="index" @click="closeSeach(item,index)">
                    <div class="org-info">
                            <div class="clientName">
                                {{item.name}}
                            </div>
                            <div class="code">
                               社会统一信用代码：{{item.creditCode}}
                            </div>
                            <div class="code">
                                组织机构代码：{{item.orgCode}}
                            </div>
                    </div>  
                  </div>
              </div>
          </div> -->
          <searchCompany  v-on:orgCodeList="orgCodeList"></searchCompany>
        </van-popup>
    <!-- 被投保人证件选择 -->
        <van-popup position="bottom" v-model="isApplicant">
				<van-picker show-toolbar :columns="typeResult" @confirm="ApplicantChange"  @cancel="isApplicant = false" />
		</van-popup>
    <!-- 投保人证件选择  -->
        <van-popup position="bottom" v-model="isCard">
				<van-picker show-toolbar :columns="typeResult" @confirm="cardChange"  @cancel="isCard" />
		</van-popup>

        <van-popup v-model="showpinganDetail" style="width:100%;height:100%">
            <div class="_closedPopupBtn" style="background: #fff;">    
                    责任详情
                <div class="header-right" @click="showpinganDetail = false">
                    <i  class="close-icon"></i>
                 </div>
            </div>
            <div class="_scheme-detail" v-if="PackagesList.length > 0">
                <div class="scheme-box">
                    <div  v-for="(item,index) in PackagesList[projectIndex].planInfos" :key="index">  
                        <div class="plan-name">
                                <div>{{item.planName}}</div>
                            </div>
                        <div v-for="(_item ,_index) in item.dutyInfos" :key="_index">
                            <table width="100%" cellspacing="0">
                                <tr>
                                    <td :rowspan="_item.dutyAttributeInfos.length + 1" width="50%" class="content-item br">
                                        <div>{{_item.dutyName}}</div>
                                    </td>
                                </tr>
                                <tr v-for="(item_1,index_1) in _item.dutyAttributeInfos" :key="index_1"> 
                                    <td width="50%" class="content-item " v-if="item_1.dutyAttrAmountValue != ''">
                                        <div>{{item_1.dutyAttributeName + item_1.dutyAttrAmountValue + item_1.dutyAttributeUnit}}</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="total-indemnity">  
                        合计赔偿限额：{{PackagesList[projectIndex].totalCompensationMaxAmount / 10000 }}万元
                    </div>

                </div>
            </div>
        </van-popup>

        
        <van-popup v-model="showInformation" :close-on-click-overlay="false"  style="height:80%" position="bottom">
            <div>
                <div class="_closedPopupBtn" >
                        投保须知
                    <div class="header-right" >
                        <span v-show="isTimeout" style="color:#333">{{timeOut}}</span>
                        <span v-show="!isTimeout" @click="showInformationBtn"> 已阅读 </span>
                    </div>
                </div>
                <storeInsuranceDe></storeInsuranceDe>
            </div>
		</van-popup>

        
        <van-popup v-model="showSolvency" :close-on-click-overlay="false"  style="height:45%" position="bottom">
            <div class="_closedPopupBtn" >
                    偿付能力披露
                <div class="header-right" @click="showSolvency = false">
                    <i  class="close-icon"></i>
                 </div>
            </div>
            <div class="solvency">
                 <p>截至2019年四季度,我公司综合偿付能力充足率为259.17%,满足监管要求;我公司最近一期的风险综合评级结果为B类</p>
            </div>
		</van-popup>

        <van-popup v-model="showPayInfor" :close-on-click-overlay="false"  style="height:65%" position="bottom">
            <div class="_closedPopupBtn" >
                    确认购买信息
                <div class="header-right" @click="showPayInfor = false">
                    <i  class="close-icon"></i>
                 </div>
            </div>
            <div class="solvency">
               <ul class="plan-info-list" v-if="PackagesList.length > 0">
                    <li v-for="(item ,index) in PackagesList[projectIndex].planInfos" :key="index" >
                        <div class="plan-info-title">
                               <div>{{item.planName}}</div>
                        </div>
                        <ul  v-for="(_item ,_index) in item.dutyInfos" :key="_index">
                            <li  class="duty-item" > 
                                <p class="insured-detail">{{_item.dutyName}}</p>
                                <p class="insured-amount">{{_item.insuredAmount  + _item.insuredAmountUnit }}</p>
                            </li> 
                        </ul>
                    </li>
                </ul>
            </div>
		</van-popup>

         <van-popup v-model="showIvoice" :close-on-click-overlay="false"  style="height:85%" position="bottom">
           <div>
                <div class="_closedPopupBtn" >    
                        发票说明
                    <div class="header-right" @click="showIvoice = false">
                        <i  class="close-icon"></i>
                    </div>
                </div>
                <div class="clause-txt">
                    <p>
                        温馨提示：为践行绿色环保的生活理念，推荐您使用电子发票。电子发票法律效力等同于纸质普通发票，且支持随时随地查看。承保成功后将以短信和邮件的形式发送至您的手机和邮箱。如您需要纸质发票可到就近平安门店打印纸质发票。发票抬头信息即为您填写的投保人信息，请根据实际财务报销需求填写投保人信息。
                    </p>
                </div>                    
           </div>
		</van-popup>

        <van-popup v-model="showInsuranceList" :close-on-click-overlay="false"  style="height:85%" position="bottom">
            <div class="_closedPopupBtn" >    
                    保险条款
                <div class="header-right" @click="closeBtn">
                    <i  class="close-icon"></i>
                 </div>
            </div>
            <div style="height:100%" class="h-100p">
            <ul  class="clause-list" v-show="showList">
                <li data-v-eebe785a="" @click="showFJABtn">《平安公众责任保险》</li>
                <li data-v-eebe785a="" @click="showZRABtn" >《平安团体意外伤害保险》</li>
                <li data-v-eebe785a="" @click="showFJCRBBtn" >《财产综合险》</li>
                <li data-v-eebe785a="" @click="showFDCRBBtn">《平安法定传染病身故保险》</li>
                <li  @click="showFJYWBtn">《平安附加意外伤害医疗保险》</li>                
            </ul>
            <div style="height:100%">
                <iframe  v-if="showFJA"  src="http://emcs.pa18.com/lib/pdf-viewer/viewer.html?pdfUrl=https%3A%2F%2Femcs.pa18.com%2Fterm%2FT0368414%2F%E5%B9%B3%E5%AE%89%E5%85%AC%E4%BC%97%E8%B4%A3%E4%BB%BB%E4%BF%9D%E9%99%A9.pdf" class="clause-iframe"></iframe>
                <iframe  v-if="showZRA"  src="http://emcs.pa18.com/lib/pdf-viewer/viewer.html?pdfUrl=https%3A%2F%2Femcs.pa18.com%2Fterm%2FT0326120%2F%E5%B9%B3%E5%AE%89%E5%9B%A2%E4%BD%93%E6%84%8F%E5%A4%96%E4%BC%A4%E5%AE%B3%E4%BF%9D%E9%99%A9.pdf" class="clause-iframe"></iframe>
                <iframe  v-if="showFJCRB"  src="http://emcs.pa18.com/lib/pdf-viewer/viewer.html?pdfUrl=https%3A%2F%2Femcs.pa18.com%2Fterm%2FT0000250%2F%E8%B4%A2%E4%BA%A7%E7%BB%BC%E5%90%88%E9%99%A9.pdf" class="clause-iframe"></iframe>
                <iframe  v-if="showFDCRB"  src="http://emcs.pa18.com/lib/pdf-viewer/viewer.html?pdfUrl=https%3A%2F%2Femcs.pa18.com%2Fterm%2FTA023230%2F%E5%B9%B3%E5%AE%89%E6%B3%95%E5%AE%9A%E4%BC%A0%E6%9F%93%E7%97%85%E8%BA%AB%E6%95%85%E4%BF%9D%E9%99%A9.pdf" class="clause-iframe"></iframe>
                <iframe  v-if="showFJYW"  src="http://emcs.pa18.com/lib/pdf-viewer/viewer.html?pdfUrl=https%3A%2F%2Femcs.pa18.com%2Fterm%2FT0359705%2F%E5%B9%B3%E5%AE%89%E9%99%84%E5%8A%A0%E6%84%8F%E5%A4%96%E4%BC%A4%E5%AE%B3%E5%8C%BB%E7%96%97%E4%BF%9D%E9%99%A9.pdf" class="clause-iframe"></iframe>
            </div>
            </div>
		</van-popup>  


    </div>
</template>
<script>
import "./../../assets/css/pingan.scss";
import "./../../assets/js/rem.js";
import shopBao from './../../assets/json/shopBao.json';//保障赔付条款
import storeInsuranceDe from './storeInsuranceDe.vue';
import searchCompany from './../common/searchCompany.vue'; //公司搜索
import { zmGetProvincesArr,zmGetCitiesArr,zmGetAreaArr } from '../../assets/js/zmRegion';
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import selectAddress from "./../common/selectAddress.vue"; //共用组件地址选择器
import { Indicator,Toast } from 'mint-ui';
import { dialog } from 'vant';
    export default {
        data(){
            return{
                projectListArr:[],
                projectIndex:0,
                isCard:false,
                PackagesList:[],
                showPayInfor:false,
                addressDetail:'',
                isVocation:false,
                applicantcardType:'统一社会信用代码',
                diffProductCode:'',
                vocation:'',
                vocationColums:['教育','卫生、社会保障和社会福利业',' 居民服务和其他服务业',],
                vocationColumsCode:[],
                vocationIndex:0,
                showpinganDetail:false,
                shopName:'',  
                amount:'',
                tip:'--',              
                applicant:{
                    "Name": "",
                    "CertificateType": "统一社会信用代码",
                    "CertificateNo": "",
                    "addressDetail":"",
                    "phone":"",
                    "Email": "",
                    
                    "ContactName": "",
                    "address":"",
                    "province": '广东省',//省
                    "city": '深圳市',//市
                    "area": '罗湖区',//县
                    "provinceCode": '',//省级代码
                    "cityCode": '', //市级代码
                    "areaCode": '440303',//县级代码
                    "cityValue":'',
                },
                shopSchema:[],
                isSeachOrgCode:false,
                OrgCode:'',
                isApplicantShow:false,
                orgCodeResult:[],
                insureNum:'',
                InsureChecked:true,
                startTime:'',
                endTime:'',
                insuredBirthday: new Date(this.Common.Public.GetDateStr(1)),
                startDate: new Date(this.Common.Public.GetDateStr(1)),
                isApplicant:false,
                applicantType:'',
                invoiceList:[
                    {name:"电子发票（增值税普通发票）",value:'03'},
                    {name:"纸质发票",value:'11'},
                ],
                invoiceIndex:0,
                Contact:{name:'',phone:'',email:''},
                typeResult : ['居民身份证','统一社会信用代码', '港澳居民来往内地通行证', '台胞证','士兵证/军官证/警官证','中国护照','港澳身份证','外国人永久居留身份证','机构代码','其他'],
                typeCode:[{name:'居民身份证',code:'IdCard'},{name:'统一社会信用代码',code:'CreditCode'},{name:'港澳居民来往内地通行证',code:'MacHKerPassport'},{name:'台胞证',code:'TaiwanesePassport'},{name:'士兵证/军官证/警官证',code:'Soldier'},{name:'中国护照',code:'ChinaPassPort'},
                {name:'港澳身份证',code:'GAIdCard'},{name:'外国人永久居留身份证',code:'ForeignForeverIdCard'},{name:'机构代码',code:'Organization'},{name:'其他',code:'Other'}],
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
                address:"",
                province: '广东省',//省
                city: '深圳市',//市
                area: '罗湖区',//县
                provinceCode: '',//省级代码
                cityCode: '', //市级代码
                areaCode: '440303',//县级代码
                cityValue:'',
                isShow:false,
                startTime:'',
                endTime:'',
                ProductCode:'',
                projectList:[],
                schemeCode:'',
                isCheckBox:false,
                showInformation:false,
                showSolvency:false,
                showIvoice:false,
                isTimeout:true,
                showList:true,//责任条款
                showFJA:false,//附加A
                showZRA:false,//雇主责任保险A
                showFJCRB:false,
                timeOut:10,
                showInsuranceList:false,
                showFJYW:false,
                showFDCRB:false,
                taxpayerNum:'',
                distributorCode:''
            }
        },
        watch:{
            OrgCode(curVal, oldVal) {
                // 实现input连续输入，只发一次请求
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                this.searchOrgCode(curVal,oldVal);
                }, 300);
            },
        },
    components:{
        storeInsuranceDe,
        searchCompany,
        selectAddress
    },
    methods: {
        invoiceBtn(item,index){
            this.invoiceIndex = index;
            
        },
        pinganDetailBtn(){
                this.showpinganDetail = true;
                // this.
            },
         closeBtn(){
                if(this.openNext > 0){
                    this.showList = true;
                    this.showFJA = false;
                    this.showZRA = false;
                    this.showFJCRB=false;
                    this.showFJYW=false;
                    this.showFDCRB=false;
                    this.openNext = 0;
                }else{
                    this.showInsuranceList = false;
                    //  this.showList = true;
                }
          },
        showFJABtn(){
            this.showList = false;
            this.showFJA = true;
            this.openNext = 1;
        },
        showZRABtn(){
            this.showList = false;
             this.showZRA = true;
            this.openNext = 1;
        },
        showFJCRBBtn(){
            this.showList = false;
            this.showFJCRB = true;
            this.openNext = 1;
        },
        showFDCRBBtn(){
            this.showList = false;
            this.showFJYW = true;
            this.openNext = 1;
        },
        showFJYWBtn(){
            this.showList = false;
            this.showFDCRB = true;
            this.openNext = 1;
        },
        taxpayerChange(){
            if(this.taxpayerNum == ''){
                this.isTaxpayer = true;
                this.invaldText = '不能为空'
            }
            else if(!this.taxpayer(this.taxpayerNum)){
                 this.isTaxpayer = true;
                this.invaldText = '请输入正确的纳税人识别号,15~18位字母或数字!'
            }
            else{
                this.isTaxpayer = false;
            }
            
        },
        getAmountfun(){
                var model = {
                "DistributorCode": this.distributorCode,
                "ProductCode": "PAIC-HK-DJB",
                "StartDate": "",
                "EndDate": "",
                "OrderDetail": {
                    "MarketProductCode": "",
                    "PackageCode": "",
                    "AreaCode": "",
                    "AreaName": "",
                }
            };
            model.StartDate = this.startTime + ' 00:00:00';
            model.EndDate = this.endTime + ' 23:59:59';
            model.ProductCode = this.diffProductCode;
            model.OrderDetail.MarketProductCode = this.ProductCode;
            model.OrderDetail.PackageCode = this.projectListArr[this.projectIndex].PackageCode;
            model.OrderDetail.AreaName =   this.cityValue;
            model.OrderDetail.AreaCode =  this.areaCode;
            this.tip = '保费计算中...';
            this.amount = '';
            this.getAmount = model;
            axiosPostAPI('PropertyProducts/' +  this.diffProductCode + '/QuotedPrice',model).then(res=>{
                if(res.status == 200){
                    this.amount = res.result;
                     this.getAmount.Amount = this.amount;
                }
            })
            // console.log(model);
        },
        toProductMicro(){
            if(this.isCheckBox){
            if(this.amount == null || this.amount == undefined || this.amount == ''){
                Toast('正在计算投保金额，请稍等')
                return 
            }
            if(this.cityValue == ''){
                Toast('请选择投保地区');
                return;
            }
            if(this.shopName==''){
                Toast('请输入被保店铺名称')
                return;
            }
             if(this.vocation == ''){
                Toast('请输入选择行业')
                return;
            }
            if(this.applicantType == ''){
                Toast('请输入被保人证件号')
                return;
            }
            if(this.addressDetail == ''){
                Toast('请输入被保人详细地址')
                return;
            }
            if(this.Contact.name == ''){
                Toast('请输入被保人联系人姓名')
                return;
            }
            if(this.Contact.phone == ''){
                Toast('请输入被保人联系电话')
                return;
            }
            if(this.Contact.email == ''){
                Toast('请输入被保人邮箱')
                return;
            }
            if(this.insureNum == ''){
                Toast('请输入保障人数')
                return;
            }
           
            var updataModel  =   {
            "DistributorCode": this.distributorCode,
            "ProductCode": "PAIC-HK-DJB",
            "StartDate": this.startTime + ' 00:00:00',
            "EndDate": this.endTime + ' 23:59:59',
            "Amount": this.amount,
            "ApplicantName": "",
            "InsurantName": this.shopName,
            "OrderDetail": {
                "AreaCode": this.areaCode,
                "AreaName": this.cityValue,
                "MarketProductCode": this.ProductCode,
                "PackageCode": this.projectListArr[this.projectIndex].PackageCode,
                "TargetObject": {
                    "AcplPersonnels": [
                        {
                            "Name": "",
                            "CertificateNo": ""
                        },
                        {
                            "Name": "",
                            "CertificateNo": ""
                        },
                        {
                            "Name": "",
                            "CertificateNo": ""
                        }
                    ],
                    "AccidentInsuranceNum": this.insureNum,
                    "IndustryCodeLevel1": this.vocationColumsCode[this.vocationIndex],
                },
                "Insurant": {//被保人
                    "Name": this.shopName,
                    "CertificateType": this.typeCode[this.applicantcardIndex].code,
                    "CertificateNo": this.applicantType,
                    "Address": this.addressDetail,
                    "LinkManName": this.Contact.name,
                    "Email": this.Contact.email,
                    "MobileTelephone": this.Contact.phone
                },
                "Applicant": {//投保人
                    "Name": "",
                    "CertificateType": '',
                    "CertificateNo": "",
                    "Address": "",
                    "LinkManName": "",
                    "Email": "",
                    "MobileTelephone": ""
                },
                "Invoice": {
                    "PrintType": this.invoiceList[this.invoiceIndex].value,
                    "TaxPayerNo": '',
                },
            },
            "DistributorAttach": "",
            "OrderSource": "WeiXin",
            "Properties": {
                "PayReturnUrl": "",
                "PayNotifyUrl": ""
            }
        };
            if(this.invoiceIndex == 0){
                if(this.taxpayerNum == ''){
                    Toast('请输入纳税人识别码');
                    return;
                }
                updataModel.OrderDetail.Invoice.TaxPayerNo = this.taxpayerNum;
            }
            var url = window.location.protocol + '//' + window.location.host + '/#' ;
            updataModel.Properties.PayReturnUrl = url + '/pingan/storeTreasure?appId=' + localStorage.getItem('appId') + '&ProductCode=' +  this.diffProductCode;
            updataModel.Properties.PayNotifyUrl = url + '/pingan/payResult?appId=' + localStorage.getItem('appId');
            if(!this.InsureChecked){
                if(this.applicant.Name == ''){
                     Toast('请输入投保人姓名')
                     return;
                }
                if(this.applicant.CertificateNo == ''){
                     Toast('请输入投保人证件号')
                     return;
                }
                if(this.applicant.cityValue == ''){
                     Toast('请选择投保人所在城市')
                     return;
                }
                if(this.applicant.addressDetail == ''){
                     Toast('请输入投保人详细地址')
                     return;
                }
                if(this.applicant.ContactName == ''){
                    Toast('请输入投保人联系人姓名')
                    return;
                }
                 if(this.applicant.phone == ''){
                    Toast('请输入投保人联系电话')
                    return;
                }
                if(this.applicant.email == ''){
                    Toast('请输入投保人邮箱')
                    return;
                }     
                updataModel.OrderDetail.Applicant.Name = this.applicant.Name;
                updataModel.OrderDetail.Applicant.CertificateType = this.typeCode[this.cardIndex].code;
                updataModel.OrderDetail.Applicant.CertificateNo = this.applicant.CertificateNo;
                updataModel.OrderDetail.Applicant.Address =this.applicant.cityValue + this.applicant.addressDetail;
                updataModel.OrderDetail.Applicant.LinkManName = this.applicant.ContactName;
                updataModel.OrderDetail.Applicant.Email = this.applicant.email;
                updataModel.OrderDetail.Applicant.MobileTelephone = this.applicant.phone;
                 updataModel.ApplicantName = this.applicant.Name;
        //         "Applicant": {
        //     "Name": "投保人姓名/公司名（同被保人时，Applicate节点可为空）",
        //     "CertificateType": 9,
        //     "CertificateNo": "投保人证件号",
        //     "Address": "投保人详细地址（XX省XX市XX区XXXXX路XX号）",
        //     "LinkManName": "投保人联系人姓名",
        //     "Email": "投保人邮箱",
        //     "MobileTelephone": "投保人联系人电话"
        // },
            }else{
                updataModel.ApplicantName = this.shopName;
                updataModel.OrderDetail.Applicant = updataModel.OrderDetail.Insurant;
            }
            sessionStorage.setItem('updataModel',JSON.stringify(updataModel));
            sessionStorage.setItem('vocationColumsCode',JSON.stringify(this.vocationColumsCode));
            sessionStorage.setItem('vocationColums',JSON.stringify(this.vocationColums));         
            sessionStorage.setItem('InsurantCard',this.applicantcardType);
            sessionStorage.setItem('applicantCard',this.applicant.CertificateType);
            sessionStorage.setItem('typeName',this.projectListArr[this.projectIndex].PackageName);
            // console.log(this.projectListArr[this.projectIndex].PackageName)
            this.$router.push({path:'/pingan/storeInsuranceNum?amount=' + this.amount});  

            }else{
                Toast('请先阅读投保须知')
            }
        },
          applicantcardTypeBtn(){
                    this.isApplicant = true;
            },
            changeProject(item,index){
                this.projectIndex = index;
                this.getVocation();
                 this.schemeCode = item.PackageCode;
                 this.getAmountfun();
            },
            vocationChange(value,index){
                this.vocation = value;
                this.vocationIndex = index;
                this.isVocation = false;
            },
        closeSeach(item){
            if(item){
                if(this.orgCodeResult.length > 0){
                    this.isSeachOrgCode = false;
                    this.shopName  = item.name;
                    this.applicantType = item.creditCode;
                    this.taxpayerNum = item.creditCode;
                    this.OrgCode = item.name;
                    this.applicantcardType = '统一社会信用代码';
                    this.applicantcardIndex = 1;
                }else{
                    this.isSeachOrgCode = false;
                    this.shopName = this.OrgCode; 
                }
            }else{
                this.isSeachOrgCode = false;
                this.shopName = this.OrgCode; 
            }
        },
        orgCodeList(data){                     
            if(typeof data == 'object'){
                this.orgCodeResult.push(data);
                this.closeSeach(data);
            }else if(typeof data == 'string'){
                this.orgCode = data;
                this.closeSeach();
            }            
        },
        closeAddress(data){
            // console.log(data);
            this.isShow = false;
        },
        addressList(data){
            this.address = data.address;
            this.areaCode = data.areaCode;
            this.cityCode = data.cityCode;
            this.provinceCode = data.provinceCode;
            this.selAddress();
            console.log(data);
        },
      emptyInput(){
          this.OrgCode = '';
        },
        searchOrgCode(curVal,oldVal) {
            var self = this;
            const param = {
                orgName: curVal || oldVal,
                orgCode:"",
            }
            Indicator.open('加载中...');
            axiosGetAPI('/vi/Enterprise', param).then((res) => {
                if (res.result) {
                  self.orgCodeResult = res.result;
                }
                Indicator.close();
            });
         },
       showInformationBtn(){
            this.showInformation = false;
            this.isCheckBox = true;
        },
        applicantshowSeachOrgCode(){
            var self = this;
            this.isSeachOrgCode = true;
            
            this.$nextTick((x)=>{   
                    this.$refs.inputOrg.focus();
            })

        },

        showSeachOrgCode() { //社会统一信用码查询
            var self = this;
            this.isSeachOrgCode = true;
                // this.$nextTick((x)=>{   
                //     this.$refs.inputOrg.focus();
                // })
            },

         selInsuredBirthday: function() { // 打开被保人生日日期层
				if (this.CommencementDateValuey) {
					this.insuredBirthday = new Date(this.CommencementDateValue);
				}
				this.$refs.insuredBirthday.open();
				},
		insuredBirthConfirm: function() { // 选择被保人生日日期
                this.startTime = this.Common.Public.dateString(this.insuredBirthday)
                 this.endTime = this.getNowFormatDate(this.startTime)
				this.$refs.insuredBirthday.close();
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

        ApplicantChange(value,index){
             this.applicantcardType = value;//滑动投保人
             this.applicantcardIndex = index;
             this.isApplicant = false;
        },
        
        cardChange(value,index){
            this.applicant.CertificateType = value;//保障信息车辆种类。（滑动）
            this.cardIndex = index;
            this.isCard = false;
        },

         toAddress(){
            this.isShow = true;
        },
        selApplicantAddress(){
             this.isApplicantShow = false;
                    if(this.applicant.address != ''){
                        this.applicant.cityValue = this.applicant.address;
                    }else{
                        this.applicant.cityValue = '广东省深圳市罗湖区'
                        this.applicant.areaCode = '440303';
                        this.applicant.cityCode = '4403';
                    }	
        },
         showCheckBox(){
            this.isCheckBox = !this.isCheckBox;
           this.informationBtn()
        },
        informationBtn(){
             this.showInformation = true;
                 if(this.timeOut > 1){
                  this.count = 10;
                // this.showTimer = false;
            this.timer = setInterval(() => {
                if (this.timeOut > 0) {
                    this.timeOut--;
                } else {
                    this.timeOut = 0;
                    clearInterval(this.timer);
                    this.timer = null;
                    this.isTimeout = false;    
                }
                }, 1000)
            }
        },
        async selAddress(){
                    this.isShow = false;
                    if(this.address != ''){
                        this.cityValue = this.address;
                    }else{
                        this.cityValue = '广东省深圳市罗湖区'
                        this.areaCode = '440303';
                        this.cityCode = '4403';
                    }					                    
                    var model = this.randerView(this.areaCode);
                  if(JSON.stringify(model) == "{}" || model == undefined ){
                      this.cityValue = '';
                      this.areaCode = '';
                      this.amount = '';
                      this.tip = '--';
                       this.$dialog.confirm({
                                title: '',
                                message: '该地区暂时不能投保请重新选择',
                                }).then(() => {
                        }).catch(() => {});
                  }else{
                        this.ProductCode = model.ProductCode;
                        this.projectList = model.Packages
                        this.PackagesList = model.Packages;
                        // model.RiskOptions.map(item=>{
                        //     if(item.code == 'UseAttribute'){
                        //         this.userTypeList = [];
                        //        for(var i = 0 ; i < item.options.length ; i ++){
                        //            if(item.options[i] == '01'){
                        //               var obj = {};
                        //               obj.code = item.options[i];
                        //               obj.name = '营业';
                        //               this.userTypeList.push(obj);
                        //            }
                        //            if(item.options[i] == '02'){
                        //               var obj = {};
                        //               obj.code = item.options[i];
                        //               obj.name = '非营业';
                        //               this.userTypeList.push(obj);
                        //            }
                        //        }  
                        //     }
                        // });
                        await this.filtration();
                        await this.getVocation();  
                        await this.getAmountfun();                      
                  } 
        },
         filtration(){
            this.projectListArr = []
            for(var i = 0; i < this.projectList.length ; i ++){
                var item = this.projectList[i];
                var model = {};
                model.PackageCode = item.packageCode;
                model.PackageName = item.packageName;
                this.projectListArr.push(model);
            }
        },
        getVocation(){//行业信息
             var tradeInfos = this.projectList[this.projectIndex].tradeInfos;
             this.vocationColums = [];
             this.vocationColumsCode = [];
             tradeInfos.map(item=>{
                            this.vocationColums.push(item.tradeName);
                            this.vocationColumsCode.push(item.tradeCode)
                            // vocationColums:['教育','卫生、社会保障和社会福利业',' 居民服务和其他服务业',],
                            // vocationColumsCode:['01','02','03'],
                        })
        },
        randerView(code){
            var Products =  this.shopSchema;
                 var model = {}; 
                  for(var i = 0 ; i < Products.length ; i++){
                    var item = Products[i];
                     if(item.cityCode.length > 6) {
                            var arr =  Products[i].cityCode.split(',');
                            var cityCode = code.substring(0,4) + '00';
                            var _cityCode = code.substring(0,2) + '0000';
                            if(arr.indexOf(cityCode) != -1 ){
                                       var model = {};
                                        model.ProductCode = item.productCode ;
                                        model.Packages = item.packages;
                                        model.RiskOptions = item.riskOptions;
                                        // model.tradeInfos = item.tradeInfos;
                                        return model;  
                            }
                            if(arr.indexOf(_cityCode) != -1 ){
                                       var model = {};
                                        model.ProductCode = item.productCode ;
                                        model.Packages = item.packages;
                                        model.RiskOptions = item.riskOptions;
                                        // model.tradeInfos = item.tradeInfos;
                                        return model;  
                            }
                      }else{
                        var cityCode1 = item.cityCode.substring(0,4);
                        var cityCode2 = item.cityCode.substring(0,2);
                         if(code.indexOf(cityCode1) != -1) {
                               var model = {};
                                        model.ProductCode = item.productCode ;
                                        model.Packages = item.packages;
                                        model.RiskOptions = item.riskOptions;
                                        // model.tradeInfos = item.tradeInfos;
                                        return model;  
                            }
                        else if(code.indexOf(cityCode2) != -1){
                                        var model = {};
                                        model.ProductCode = item.productCode ;
                                        model.Packages = item.packages;
                                        model.RiskOptions = item.riskOptions;
                                        // model.tradeInfos = item.tradeInfos;
                                        return model;  
                            }
                        }
                }              
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
            addressApplicantChange(picker, values) { //地区选择器
				if (this.regionInit) {
				//取值并赋值
				if (values[0] && values[1]  && values[2]) {
					this.applicant.address = values[0]["name"] + values[1]["name"] + values[2]["name"];
					this.applicant.province = values[0]["name"];
					this.applicant.city = values[1]["name"];
					this.applicant.area = values[2]["name"];
					this.applicant.provinceCode = values[0]["code"];
					this.applicant.cityCode = values[1]["code"];
					this.applicant.areaCode = values[2]["code"];
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
					this.$emit("getRegion", this.applicant.address)
				}else {
					// console.log("数据不全");
				}
				} else {
			    	this.regionInit = true;
				}
            },
        },
        mounted(){
            if(sessionStorage.getItem('distributorCode')){
                this.distributorCode = sessionStorage.getItem('distributorCode');
            }
            var self = this;
            var _appid = localStorage.getItem("appId");
            if(this.$route.query.appId && _appid == undefined){
                var appId = this.$route.query.appId;
                localStorage.setItem("appId",appId);
            }
            
            this.startTime =  this.Common.Public.dateString(this.startDate);
            this.endTime = this.getNowFormatDate(this.startTime);
            var ProductCode = this.$route.query.ProductCode;
            this.diffProductCode = ProductCode;
            Indicator.open('请稍等')
            axiosGetAPI('/PropertyProducts/' + ProductCode).then(res=>{
                Indicator.close();
                    if(res.status = 200){
                        self.shopSchema = res.result.schema.Products;
                        document.title =  res.result.name;
                        sessionStorage.setItem('title',res.result.name);
                        var showAddress = sessionStorage.getItem('showAddress');
                        if(showAddress == '' || showAddress == undefined || showAddress == true  ){
                                // sessionStorage.setItem('showAddress',false);
                                self.toAddress();
                            }
                    }
            })    
        }
    }
</script>
<style scoped>

.placeholder-text{
    font-size: .28rem;
    color: #969799;
    font-family: PingFangSC-Regular;
}
.placeholder-address{
    color: #333333;
    font-size: .28rem;
    font-family: PingFangSC-Regular;
}
.m20{
        margin-bottom: .2rem;
        background: #ffffff;
}
.common-cell.pl30-line>.common-cell-container {
    border-bottom: .005rem solid #eee;
    min-height: .445rem;
}
.common-radio {
    display: inline-block;
    line-height: .6rem;
    color: #666;
    text-align: center;
    min-width: 1.2rem;
    margin-right: .3rem;
    background: #fff;
    box-shadow: 0 0.03rem 0.09rem 0 hsla(0,0%,89%,.7);
    border-radius: .3rem;
    border-radius: 30px;
}
.insurance-time-container{
    /* width: 100%; */
    padding: .1rem .3rem .3rem;
    background: #fff;
    text-align: center;
    font-family: PingFangSC-Regular;
}
.insurance-time-container .lable-name {
    font-size: .26rem;
    color: #888;
    padding-bottom: .3rem;
}
.fl{
        float: left;
}
.fr{
    float: right;
}
.insurance-time-container .icon {
    display: inline-block;
    width: .3rem;
    height: .42rem;
    margin-left: .1rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAOAgMAAABFiESqAAAADFBMVEUAAABnZ2dmZmZnZ2f7tBJ5AAAABHRSTlMA5yjHR2NZBgAAAEZJREFUCNdjMGMAAc4DDKoNQBpEciaAGNMYGJgiGEAEhAMUBkuDMJgHEgXLgxBYB1gQrAhiFpAPVAJWFBXBAAFTIUqgpgAAefQNj0svmDwAAAAASUVORK5CYII=) 50% no-repeat;
    background-size: .25rem .1rem;
}

.insurance-time-container .time-info{
    font-size: .28rem;
    color: #4e4e4e;
}

.clear{
    clear: both;
}

.scheme-detail {
    margin-right: .3rem;
    line-height: .89rem;
    float: right;
    font-size: .3rem;
    color: #ff8727;
    text-align: right;
}
 .m20-schemeDetail {
    font-family: PingFangSC-Regular;
    font-size: .3rem;
    color: #ff8727;
    text-align: left;
    padding: 0 0 .3rem .3rem;
}

.htabscroll{
        position: relative;
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
}
.lyBox{
    overflow: hidden;
    padding: 0 .3rem;
}
.ly-tab-item-label{
    /* height: .9rem;
    border-radius: .08rem;
    border: .02rem solid #ffdbb6;
    background: #fff;
    color: #ff8727!important;
    box-shadow: none!important */
     height: .9rem;
    width: 2rem;
    line-height: 0.9rem;
    border-radius: .08rem;
    border: .02rem solid #ffdbb6;
    background: #fff;
    color: #ff8727!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    text-align: center;
    margin-right: 0.15rem;
}
.ly-tab-list{
   
        position: relative;
    box-sizing: border-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    min-width: 100%;
    height: auto;
    width: auto;
}
.projectActive{
    background: #ff8727;
    border: none;
    color: #fff!important;
    box-shadow: none!important;
}
.plan-info-list{
     padding: .3rem;
    font-size: .28rem;
    line-height: .4rem;
}
.plan-info-list li:first-child {
    padding-top: .08rem;
}
.duty-item{
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.duty-item p{
        color: #666;
    font-size: 0.3rem;
}
.plan-info-list  li:last-child {
    padding-top: .06rem;
}
 .duty-item .insured-detail {
    width: 5.12rem;
    line-height: .4rem;
}
.duty-item .insured-amount {
    white-space: nowrap;
}

._scheme-detail {
    background: #fff;
    padding: .3rem;
    min-height: 100vh;
}
.scheme-box {
    border: .01rem solid #ff8727;
    box-shadow: 0 0.01rem 0.08rem 0 rgba(255,135,39,.4);
    border-radius: .08rem;
    overflow: hidden;
}
.scheme-box .total-indemnity {
    font-family: PingFangSC-Medium;
    font-size: .3rem;
    color: #ff8727;
    line-height: .4rem;
    padding: .3rem .2rem;
}
.plan-name {
    background: #fff1e6;
    padding: .2rem;
    border-bottom: .01rem solid #e5e5e5;
}
.plan-name>div:first-child {
    /* font-family: PingFangSC-Medium; */
    font-size: .3rem;
    color: #ff8727;
    line-height: .4rem;
}
.content-item {
    padding: .2rem;
    font-family: PingFangSC-Regular;
    font-size: .26rem;
    color: #4e4e4e;
    line-height: .36rem;
    border-bottom: .01rem solid #e5e5e5;
}
.br {
    border-right: .01rem solid #e5e5e5;
}
.close-icon{
    display: inline-block;
    width: .42rem;
    height: .42rem;
    margin-top: .28rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAArCAMAAAA5QerMAAAAM1BMVEUAAACcnJycnJyjo6OcnJybm5udnZ2cnJydnZ26urqbm5ucnJycnJycnJycnJycnJybm5uW+F15AAAAEHRSTlMAas4ZEtk85EsF9cS2qHx3XWMJ1QAAAG5JREFUOMvt0DkOgDAQwMDlviH/fy004IJIriPF9VSOWpktc/zqxyw9UvOT7Zq1TXotMg1dqEWaRZpFmkWaRapFukWqnV5pXY8VySWemRxOs/zkr0n+usSaxKrEusSKdLshAzvn6Nh+ErsvUSuxG4pMBXcTNUT/AAAAAElFTkSuQmCC);
    background-size: .42rem;
}
 .money-text{
    font-size: .44rem;
    color: #ff8727;
    line-height: .9rem;
    /* margin-right: .08rem; */
    font-family: PingFangSC-Semibold;
}
.sub-title-bold {
    font-weight: 600;
    font-size: .28rem;
    color: #666;
}

.applicantCard {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.begin-slot-right{
    width: .32rem;
    height: 100%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAA/FBMVEUAAAD/aQj/jTn/izX/aAb/cBL/dxv/eyD/dBf/fyT/gij/eh7/jjr/awv/iTP/izX/ijT/jjn/iC//hSz/jTn/agn/ZgP/jzv/ZQL/fCL/bQ3/iDL/bQ7/bAv/jDf/aAX/cRP/ZQP/giv/cRP/jzv/bA3/eB3/dBj/gyv/eyX/mU3/jjr/jzz/jjr/hi//fib/eB3/iTT/hzD/hCv/cxf/cBL/jz3/ZQD/kD7/kjz/bAv/ZQH/ZAD/jzr/jzz/awr/ZAL/jjr/jDj/iTT/bAz/eh//hi//dxv/cxb/fSL/gCj/gyv/fyX/cRL/ZgT/YwD/dRn/aQj/aAb/bw+NM28rAAAAQHRSTlMATEwmZickTEwnTOZmJExm5iQMJPTm5sjIZl5ISPXMzMi9iYmEhGZmXhkFvebmyMjApqampqaJiV5DQ/PzvZmZXK+o9AAAAhRJREFUSMfNlQlT2kAUxx8loNhYC3ILKgri0cOzrfbabEIOQhLE7/9d+nY3YWMSh0mdcfgNM2SY/fF280/eg1dQGw5rkOb+zz1kM6R0mPE3dVqvZQtXun4FKYq6rhezhWvTvM4QTNN8Qbhx3ZsMwXXdpKC26rpumlPEnU5nM8dxJhPLsuZzG8FfPcMwHh/7bQUYZxeU6lxwnBkT0JgsBc9GXQiLhT84Q+E3X48GLnNkhQkT5ijg5VMk+AMAVaN0f+cDcmlZl1ucDcEmY4ylxgWGcuATokBLo/vnwLi17VtIUcFjVIBzfkBIG+oaVYFz53l3aaHkeV4JBAohP0HT6DvgjAxjlJF03+hHSRcICWJCbTSqQZqHvw+QLaymgKfOJxAhqEVJJUYpiRJuCT+UsqxN1w2TE7nZmLT3FMbm+yTACpGgI6HA1zMjLiy44MeEVAVewntWgYRbUqtIUbDLKD9je4mCRs7bmjcHkj+H4O22VG19+vwR+VIF2P36nnNYBigfNhqNZrPZ3k5s6Rt+87SPAI5mjsjtGOCYhebjwu+JCj8i4RTglHcBFLoAXZ4yCYJu8tB7qrqD7PHrTqdzcjLuAdJTOL3/fh/WLbj8D9/6BefnCG6d3wfZ7lejEPJLDpTViIEiRxayJdgI2YyIjyy4oFHfk42PByeb63IokoEYu1KYRp1SCmgYcuzKwc7Wv1xBDvZ/NyThV6c6w74AAAAASUVORK5CYII=) 0 no-repeat;
    background-size: contain;
}

.cell-left .cell-title {
    display: inline-block;
    height: .9rem;
    font-size: 0.28rem;
    line-height: .9rem;
    margin: 0;
    padding: 0;
    color: #323233;
    font-family: PingFangSC-Regular;
}

.read-area .active{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAWlBMVEUAAAD/iCj/iSr/iCj/hyj/iCf/iSf/iSf/hyf/////48z/lD//nk//iiz/+PP/9Ov/3MH/jTL/8eb/7uD/6tr/17f/xZf/tnv/qGP/jzb/5dD/0q//zqb/mEdoGAUsAAAACHRSTlMA8xts2babTk78UQYAAAC0SURBVCjPfVJXFoQgEKNLEOx1y/2vuYqwFp7mB17CMJlCAhiXglIhOSNHMKX/UAcpo/oAmkWe6wt4eK8T+BhGU4GuedSFrE21OFgCLrwzMMvBksxvlLnPL8/8gMKupyTixI/A5C+CrJ4qk2/8BIzBlxcMWq/YAkM07L+aX2i+WucNeh0giNy8o7R1B+OiIINdV6Ew6Oa9XbFA18MXEMH2lnxau/Pqtol3bX8eVDrax2W4XZ8fIZwPmYtTMbUAAAAASUVORK5CYII=)
}

.invoice-cell{
    height: .9rem;
    padding: 0 .3rem;
    display: flex;
    align-items: center;
    justify-content: space-between; 
}

.invoice-radio {
    display: inline-block;
    width: .28rem;
    height: .28rem;
    /* margin-top: .3rem; */
    position: relative;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAOVBMVEUAAADGxsbMzMzMzMzMzMzOzs7Ly8vMzMzMzMzMzMzOzs7Ly8vLy8vLy8vKysrLy8vLy8vLy8vMzMyyzQo3AAAAE3RSTlMADLNnQhSof3ZKJJKHVzgxHcAoLAT80gAAANpJREFUOMuVlUkWAyEIREvEsSf1/ofNJomxX2vgLxUFBQrcMeXi4+CrGCwxHMhvwdqweQo8t3aR9vTdNmmn6J5vtGTNYqmTfXRPjnzGDaYTj5zEGEi1YUKmNN7pMMVV/j2YsaD1beNPLDn95x9sxB+ifceyCrSb9CNzumNDBku6Ee8QsDOAkCAghe5fEEHxEOELrg0itgscICIwDgsR9lCYKgJQPEvxWYoUyBOrKBdFEcpLW9Ew8jbUNzcyNcwZFYXrSohGgUtzKWo1yUVTLsVygVeNDf0wUoy4F+XDBsWVyAPaAAAAAElFTkSuQmCC) 0 no-repeat;
    background-size: contain;
}
.invoice-check{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAAjVBMVEUAAAD/iCf/hyj/iyz/iCj/hyf/hyj/iCf/hyj/iCj/iCj/iCf/hyf/iCf/iCv/kjH/qiv/hyf/iCf/hyf/////iSv//vz/7+H//Pn/+fX/8eb/69v/l0P/kTr/jzX/0Kr/uYL/q2j/qGL/m0v/lD7/9/H/4cn/vor/rm3/pl7/5M//1LH/wZH/n1L/yJ2le92aAAAAE3RSTlMAwfMuLf3g3tmloY+IfB4VBvf4Rdy7ZAAAAWpJREFUOMuVlemugjAQhQuyr+oc4IqI+673/R9PAoK02Bq+f02+EM7MdMoEjNDVHF13NDc0mALDt6mH7cvsyDNJwPSiL+I0mNMXZsFUNGONJGgxb04skmJNOFMnBXrPjS1SYsVdIo1+oLXZAvpJ8K7nTCUVSV2zpr6eyvxHVrte3U1TYW4AHOq+GZXqK8xdCtypxq9UW27uj8Atec9OVX25WWZAvmpPExZKzeQELPbdMWSuVF0D6fZzdJm0U2cA537HmEMNz5I3tymwph4O09tvLK5c+AVwSrj5atU1OHeVA1lJnNr+QJEDf7su/A047onDaWKJ7h1Id+IgfopVZJXbFOcBYEMCbq8Fh9a9gAvftcAg3r3QswkvYnDjclgC6SYHluXAtIUhXFVuxbGgAX492qKbXoemaYgXpnKH4bsLw6I5N6SPy7fVFY243CNWxuhF9Hu9jVua41exesGPfTbGP0Zcvs8TJ6RhL1KjaYVrratmAAAAAElFTkSuQmCC) 0 no-repeat;
    background-size: contain;
}
.invoive-title{
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: .3rem;
    padding-left: .1rem;
    color: #4e4e4e;
}
.page-footer > div{
    width: 50%;
}

</style>