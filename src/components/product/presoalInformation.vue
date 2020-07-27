<template>
    <div class="page-container" id="pageContainer">
        <van-form @submit="toNext">
        <div  style="background:#fff ;position: relative;padding-bottom:1rem">
            <div class="title van-ellipsis">
                {{insutanceData.productName}} {{location}}
            </div>
            <dl class="view01 others">
                <dd>
                    <p> <strong> 保障期间：</strong>{{startTime}} 至 {{endTime}}</p>
                </dd>
                <dd>
                    <p> <strong> 投保计划：</strong> {{insutanceData.plantName}}</p>
                </dd>
                <dd>
                    <p> <strong> 受益人：</strong> 法定受益人&nbsp;  <span @click="showBeneficiary = true">&nbsp; </span>
                    </p>
                    <div v-show="showBeneficiary" id="inpoTextMsgBox2" @click="showBeneficiary = false"></div>
                    <div v-show="showBeneficiary" class="inpoTextMsgBox2" style="margin: 0;">
                            <div>
                                身故受益人是指保险合同中由被保险人或者投保人指定的享有身故保险金请求权的人。网上投保由于身故受益人指定无法得到被保险人的书面确认，所以只接受法定继承人作为身故受益人，法定继承人指法律直接规定可以依法继承被继承人遗产的公民。           
                            </div>
                    </div>
                </dd>
                <dd class="baozhang" style="height: .8rem;">
                    <i @click="showPlanInfos = true">
                        <img src="../../assets/images/baozhang-new.png" alt="">
                    </i>
                </dd>                
            </dl>
            <div class="jiange"></div>
            <div  >
                <div>
                    <p class="h3_02" style="margin-top: .2rem;margin-left:.3rem;"> 投保人资料&nbsp; <span class="inforIcon" @click="showInsurexplain = true">&nbsp;&nbsp;</span></p>
                    <div v-show="showInsurexplain" id="inpoTextMsgBox2" @click="showInsurexplain = false"></div>
                    <div v-show="showInsurexplain" class="inpoTextMsgBox2" style="margin: 0;">
                            <div>
                                投保人：应为具有完全民事行为能力的被保险人本人、对被保险人有保险利益的其他人。或应为对报保险人有保险利益的机关、企业、事业单位和社会团体。
                            </div>
                    </div>                                    
                </div>
                   <ul>
                    <!-- <el-row :gutter="10">
                        <el-col :xs="24" :sm="24"  :lg="8">
                            <li class="ng-scope" >
                                <div class="personnelName">
                                    <span class="labelTitle ng-binding ">姓名</span>
                                    <input type="text" v-model="ApplicantList.Name"  placeholder="请输入投保人姓名" >     
                                </div>
                            </li>  
                        </el-col>
                        <el-col :xs="24" :sm="24"  :lg="8">
                           <li class="ng-scope" >
                                <div class="personnelName cardType" style="border:0;width: 95%;" @click="isCard = true">
                                    <span class="labelTitle ng-binding ">证件类型</span>
                                    <input type="text" placeholder="请选择选择证件类型" name=""   readonly v-model="cardType">    
                                </div>
                           </li>  
                        </el-col>
                        <el-col :xs="24" :sm="24"  :lg="8">
                           <li class="ng-scope">
                                <div class="personnelName">
                                    <span class="labelTitle ng-binding ">证件号码</span>
                                    <input type="text"  v-model="ApplicantList.CertificateNo"  @keyup="ownerNoBirth" placeholder="请输入投保人证件号码" >     
                                </div>
                            </li>  
                        </el-col> 
                         <el-col :xs="24" :sm="24"  :lg="8">
                            <li class="ng-scope" >
                            <div class="dateInput" style="width: 95%;" @click="selapplicantBirthday">
                                <span class="labelTitle ng-binding ">出生日期</span>
                                <input type="text" readonly v-model="ApplicantList.BirthDate" placeholder="请选择投保人出生日期"  >
                            </div>
                        </li>   
                        </el-col>
                        <el-col :xs="24" :sm="24"  :lg="8">
                            <li class="ng-scope">
                            <div class="personnelName">
                                <span class="labelTitle ng-binding " style="float:left;">性别</span>
                                <div class="personSex ng-scope">
                                    <span class="radio" @click="genderBtn(item,index)" :class="{active: genderIndex== index}" v-for="(item,index) in genderList" :key="index" >
                                        {{item.name}}
                                    </span>
                                </div>
                            </div>
                        </li>    
                        </el-col>
                        <el-col :xs="24" :sm="24"  :lg="8">
                            <li class="ng-scope">
                                <div class="personnelName">
                                    <span class="labelTitle ng-binding ">手机号码</span>
                                    <input type="number" v-model="ApplicantList.MobileTelephone" placeholder="请输入投保人手机号码" oninput="if(value.length>11)value=value.slice(0,11)"  >     
                                </div>
                            </li> 
                        </el-col>  
                        <el-col :xs="24" :sm="24"  :lg="8">
                            <li class="ng-scope">
                                <div class="personnelName">
                                    <span class="labelTitle ng-binding ">电子邮箱</span>
                                    <input type="email" v-model="ApplicantList.Email" placeholder="请输入投保人电子邮箱" >     
                                </div>
                            </li>
                        </el-col>                       
                    </el-row> -->
                        <van-field
                             v-if="insutanceData.code == 'CPIC-DCIS'"
                            v-model="ApplicantList.Name"                           
                            label="企业名称"
                            placeholder="请输入企业名称"
                            :rules="[{ required: true, message: ' ' }]"
                        />
                        <van-field
                            v-else
                            v-model="ApplicantList.Name"                           
                            label="姓名"
                            placeholder="请输入投保人姓名"
                            :rules="[{ required: true, message: ' ' }]"
                        />
                        <van-field
                            v-model="cardType"                           
                            label="证件类型"
                            placeholder="请选择选择证件类型"
                            readonly 
                            :rules="[{ required: true, message: ' ' }]"
                            @click="openCard"                            
                            :is-link='canClick'
                        />
                        <van-field                            
                            v-model="ApplicantList.CertificateNo"                           
                            label="证件号码"
                            placeholder="请输入投保人证件号码" 
                            @keyup="ownerNoBirth"                             
                            :rules="[{ required: true, message: ' ' }]"
                        />
                        <van-field
                            v-if="insutanceData.code != 'CPIC-DCIS'"
                            v-model="ApplicantList.BirthDate"                           
                            label="出生日期"
                            placeholder="请选择投保人出生日期"
                            readonly 
                            :rules="[{ required: true, message: ' ' }]"
                            @click="selapplicantBirthday"
                             right-icon="arrow"
                        />
                       <li  v-if="insutanceData.code != 'CPIC-DCIS'" class="ng-scope" style="margin: 0px 0 0 16px;">
                            <div class="personnelName">
                                <span class="labelTitle ng-binding " style="float:left;width:90px;">性别</span>
                                <div class="personSex ng-scope" style="border: 0;">
                                    <span class="radio" @click="genderBtn(item,index)" :class="{active: ApplicantList.Gender== index}" v-for="(item,index) in genderList" :key="index" >
                                        {{item.name}}
                                    </span>
                                </div>
                            </div>
                        </li>  
                        <van-field
                            v-model="ApplicantList.MobileTelephone"                           
                            label="手机号码"
                            placeholder="请输入投保人手机号码"          
                            oninput="if(value.length>11)value=value.slice(0,11)"
                            type="tel"                 
                            :rules="[{ required: true, message: ' ' }]"
                        />
                        <van-field
                            v-model="ApplicantList.Email"                           
                            label="电子邮箱"
                            type="email"                        
                            placeholder="请输入投保人电子邮箱"                                                        
                            :rules="[{ required: true, message: ' ' }]"
                        />                        
                    </ul> 

            </div>
            <div class="jiange"></div>
            <!-- 被保人 -->
            <div class="ins_wrap"  v-if="!insurantHidden" >                        
                <div >
                    <dd style="width:50%;float:left;height: 0.6rem;line-height: 0.6rem;">
                        <p class="h3_02"> 被保人资料 <span class="inforIcon" @click="showappliexplain = true" >&nbsp;&nbsp;</span></p>
                        <div v-show="showappliexplain" id="inpoTextMsgBox2" @click="showappliexplain = false"></div>
                        <div v-show="showappliexplain" class="inpoTextMsgBox2" style="margin: 0;">
                                <div>
                                    投保人：应为具有完全民事行为能力的被保险人本人、对被保险人有保险利益的其他人。或应为对报保险人有保险利益的机关、企业、事业单位和社会团体。
                                </div>
                        </div> 
                        <p style="font-size: .24rem;color: #999999;">{{InsuranceText}}</p>
                    </dd>
                    <p style="text-align: right;line-height: 1.2rem;height: 1.2rem;" @click="addInsurance">
                        <a >
                            <img src="../../assets/images/add.png" style="width: .2rem;margin-right: 0.1rem;" alt="">
                            添加被保人
                        </a>
                    </p>                            
                </div>
                <div class="insurantInfo" v-for="(item,index) in InsurantArr" :key="index">
                    <p style="border-bottom: 1px solid #ddd;"></p>
                    <div class="view01" style="margin: .2rem 0 .2rem 0;padding:0;line-height: 1.2rem;height: 1.2rem;">
                        <dd style="width: 60%;float: left;">
                            <p style="font-weight: bold;font-size: .32rem;">{{item.Name}} <a >{{recognizee[item.RelationshipWithPolicyholder - 1]}}</a> </p>
                            <p style="font-size: .24rem;color: #999999;">证件号：{{item.CertificateNo}}</p>
                        </dd>
                        <!-- <div class="clear"></div> -->
                        <p style="text-align: right;">
                            <img  @click="changeInsurance(item,index)" src="../../assets/images/edit.png" style="padding: 0 .4rem;width: .36rem;border-right: 1px solid #E3E6EB;" alt="">
                            <img  @click="deleteInsurance(item,index)"  src="../../assets/images/del.png" style="margin: 0 .4rem;width: .36rem;" alt="">
                        </p>                        
                    </div>
                </div>                
            </div>
            <div class="jiange"></div>
            <div v-if="insutanceData.code == 'Allianz-AW'">
                <p class="h3_02" style="padding: 0 .3rem;margin-top: .2rem;" >标的信息</p>
                <van-field                            
                            v-model="ApplicantList.Address"                           
                            label="常住地"
                            placeholder="请选择"
                            readonly 
                            :rules="[{ required: true, message: ' ' }]"
                            @click="addressShow = true"
                            right-icon="arrow"
                        />   
                <p style="color:rgb(153, 153, 153);font-size:12px;margin: 0.1rem 0.3rem;">*常住地：被保险人投保前及投保后一年内需在承保地区居住满183天</p> 
            </div>            
            <!-- 扩展标的 -->  
        <div v-if="otherTargetObjectList && otherTargetObjectList.length ">
             <p class="h3_02" style="padding: 0 .3rem;margin-top: .2rem;">标的信息</p> 
             <div  v-show="item.isDisplay" v-for="(item,index) in otherTargetObjectList" :key="index">
                  <div v-if="item.limitMax > 1 || item.limitMax == null" class="ins_wrap">
                    <div >
                        <dd style="width:50%;float:left;height: 0.6rem;line-height: 0.6rem;">                            
                            <div>
                                <p>{{item.title}} &nbsp; <span class="inforIcon" @click="item.showRemark = true">&nbsp;&nbsp;</span></p>
                                <div v-show="item.showRemark" id="inpoTextMsgBox2" @click="item.showRemark = false"></div>
                                <div v-show="item.showRemark" class="inpoTextMsgBox2" style="margin: 0;">
                                        <div>
                                            {{item.remark}}
                                        </div>
                                </div>                                    
                            </div>                      
                            <p style="font-size: .24rem;color: #999999;" v-show="item.limitMax > 0">{{'*限添加' + item.limitMax + '人'}}</p>
                            <p style="font-size: .24rem;color: #999999;" v-show="item.limitMax == null">*至少添加1人</p>
                        </dd>
                        <p style="text-align: right;line-height: 1.2rem;height: 1.2rem;" @click="addotherTarget(item,index)">
                            <a >
                                <img src="../../assets/images/add.png" style="width: .2rem;margin-right: 0.1rem;" alt="">
                                添加
                            </a>
                        </p>                            
                    </div>
                    <div v-for="(item,index) in otherTarget.displayTarget" :key="index">
                        <p style="border-bottom: 1px solid #ddd;"></p>
                        <div class="view01" style="margin: .2rem 0 .2rem 0;padding:0;line-height: 1.2rem;height: 1.2rem;">
                            <dd style="width: 60%;float: left;">
                                <p  style="font-weight: bold;font-size: .32rem;">{{item.name}}  </p>
                                <p style="font-size: .24rem;color: #999999;">证件号：{{item.Idcard}}</p>
                            </dd>                        
                            <p style="text-align: right;">
                                <img  @click="changeOtherTarget(item,index)" src="../../assets/images/edit.png" style="padding: 0 .4rem;width: .36rem;border-right: 1px solid #E3E6EB;" alt="">
                                <img  @click="deleteOtherTarget(item,index)"  src="../../assets/images/del.png" style="margin: 0 .4rem;width: .36rem;" alt="">
                            </p>                        
                        </div>
                    </div> 
                </div> 
                <div  v-else >
                    <div>
                        <p class=""  style="margin-left:0.3rem;margin-top:0.1rem;">{{item.title}} &nbsp; <span class="inforIcon" @click="item.showRemark = true">&nbsp;&nbsp;</span></p>
                        <div v-show="item.showRemark" id="inpoTextMsgBox2" @click="item.showRemark = false"></div>
                        <div v-show="item.showRemark" class="inpoTextMsgBox2" style="margin: 0;">
                            <div>
                                {{item.remark}}
                            </div>
                        </div>                                    
                    </div>                
                    <div class="targetDetail" v-for="(_item,_index) in item.items" :key="_index">
                        <van-field
                            v-if="_item.inputType == 'Text'"
                            v-model="_item.value"                           
                            :label="_item.label"
                            :placeholder=" _item.label"
                            :rules="[{ required: _item.required, message: ' ' }]"
                        />                        
                        <van-field
                            v-if="_item.inputType == 'Select'"
                            v-model="_item.value"                           
                            :label="_item.label"
                            :placeholder=" _item.label"
                            :rules="[{ required: _item.required, message: ' ' }]"
                            @click="_item.showPopup=true"
                            readonly 
                            right-icon="arrow"
                        />
                        <van-popup v-if="_item.inputType == 'Select'" v-model="_item.showPopup" position="bottom">
                            <van-picker 
                                show-toolbar
                                :columns="_item.options"
                                @confirm="function(value,index){_item.showPopup=false; _item.value=value.value; }"
                                @cancel="_item.showPopup=false"
                            />
                        </van-popup>                                        
                    </div>
                </div>                
               
            </div>  
        </div>
            <div class="new_footer" id="pageContainer" >
                <!-- <img class="kufu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABoCAMAAAANbMR7AAAAilBMVEVHcEy8vLy+vr68vLy8vLzAwMDBwcHf39+8vLy8vLzGxsa8vLy8vLy8vLy8vLy8vLzNzc2+vr68vLy9vb28vLy8vLy8vLy8vLy+vr68vLy+vr69vb29vb28vLy8vLy9vb28vLy8vLy8vLy8vLy9vb28vLy9vb28vLy8vLy9vb29vb29vb28vLy7u7tJnyrIAAAALXRSTlMAWyP0+BgTA9r7DOnl7qC0ByrBOJeIzU0e0jBUgN/HP5CpaHRvrnikukNjR9W9F1XMAAAE0klEQVQYGb3BB2KiUAAE0KF+erX3XpLM/a+3mwgKfFRU9D08IRopk+VsOPVt3bV6SbDuqwLvJuaTmU2JFm5ivI/obzVe5XVGeAu16/GO4cZE2+Ilm9C6JtoUL9mU1jXRFmdh8wH+F9rxPeWDEhWvc/as8pPO5hgPTBEZ6qi/C3o2K/Q1XhVbLJtNUoEKp7+wWLZ18JKxxqLpZIAr0o7PIivGC7osmn3jFmc1ZYHWx9M6LJh9455o5fHCVvAcEfDCV9BE1LV58YVniCUv9iYaGvV4scITFjzTxmhOdHkxxsM2PLNiPGSsMaeneNCYZwcHD4qnzLkqHqJqzG0jPGxgMTeM8ADRY24v8ARjyNwCD+gyt8RzTIu5bzR2ZG4W4Umqy4xroqHIYsYy8bRUZyZAQztm9Bgv+GIuRSOGxswGL9kyM0MjATMhXmN6zChoIGbGN/CiPjNTgfs6zKzxspAZBXcZOk8sgZfFNk96uKvLTB8tWDBzxB2Rz5Me2mDoPAlxR58ZBa3o8MQ2cYMYpDOeTAVaETOzE7hCzDsuz9ZoyYEZtzMXqNG3WGSgJQovrD6q1JAlCdri6CwIVZSkPstWaM2SRX6Kgr7OCgOtUVii93E2t1lhoT0Gy+w5MobLqg5aZLHMNfBHJJQoaFHAikTgl0KZihatWKXgP2FRYgu06MgqSwBQKLPQpgElCoAZZSFapbNqBpg2ZR20ymKVbUJhjS5a1aNEQcAaE7QqoSTAgTU2aFVIyQE/rLFCq5aU/MBnjTUk8/XKxD1q4LqBiqqQEh86a0xQ4SQk9TFuUz3+56moSCjR4bHGAhVb/rLnuCXq8U+Aih4lHnqssUeZYfOPZ+KGLk9cVFiU9BCyRoiyETMhrvtmxkWFRkmILmsMUWbYzCxwTawxE6DMoKyLOWvYEcqWzG1QbzBlRo9RNqdsDuGzxghlhsvcDnVUj7kVKr4o8QWwZI0vVHzzbCEgmbvMhajqULIHMGKNDqq6PJupKBM7m7mpgaofSkb4b0tZD1ViyzN94qDgOOSZH6PKoGSLXyPWGKAqSnjhL0Y4Mb96vLCPkIwpGeHPhLINJOaQRX7Y6S72QxbpY8j2rJrgRBwoSSBzEt6mfUMWaaw4CGRMixIDsmjLW9wUNcassEycmTNWbVBno/Oqg4E6W5bNTBQ4ISumAnVGP6yn7wTqqDZLQgdliscyBbXEymWN/QD1FizyFEicicdfOk+GuMJZWyzTghGuMDVeeBMHtdJFMtVDZvq4Ku0MbWbc7ZeDqybMuMkixU2GzpMDbnHm49Vuo/RV3DLQefKD+zo8sU28bMnMF+5TbZ4M8Ko5M55AA3v+8SO8yJkys0ITqs9fa7wqYGYo0Eg6JLUdXqUwN0dTcRrhVSONmSU+yfCY8Qf4IGfI3Bgf5MyYC/BBZo85y8HnDH6Y82N8ztFlzj7ic9Y2zxR8jHrgxQ6fItY6L9ZoVzw5DK2CJBhH+DP+YcEKrTKWlHkKIMZDFtgKWpV6rBV0PRZ5KVo1cNlIYqBdCZuwuwLtOrKJXoq2BbxPXwu0bsp77M4Ab2DzNrszwDsIm7dMJwO8iccbugJvs+QNKt5nzOt6eCMx5FV9vNNI4xUB3quvsVYY4c1GPcq0icD79feWxgI32Rl40D8TTkbLut0HTwAAAABJRU5ErkJggg==" alt=""> -->                
                <van-button class="footer_submit" block type="danger" style="height: 100%;line-height: 1rem;width: 40%;border: 0;" native-type="submit">                   
                    立即购买
                </van-button>
                <span class="footer_price ng-binding">￥{{amount}}</span>
                <span class="footer_text">起</span>
            </div>
        </div>
    </van-form>
         <van-popup position="bottom" v-model="isCard">			
				<van-picker show-toolbar :columns="typeResult" @confirm="cardChange"  @cancel="isCard = false" />
		</van-popup>
        <mt-popup position="bottom" v-model="isInsuranceCard">			
				<van-picker show-toolbar :columns="typeResult" @confirm="InsuratChange"  @cancel="isInsuranceCard = false" />
		</mt-popup>
        <mt-datetime-picker   popup-transition="popup-fade" :closeOnClickModal="false" @touchmove.native.stop.prevent ref="insuredBirthday" v-model="insuredBirthday" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"  @confirm="insuredBirthConfirm">
		</mt-datetime-picker>
        <mt-datetime-picker  popup-transition="popup-fade" :closeOnClickModal="false"  @touchmove.native.stop.prevent ref="applicantBirthday" v-model="applicantBirthday" type="date" :startDate="new Date('1949-01-01')"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="applicantBirthConfirm">
		</mt-datetime-picker>
        <van-popup round  position="bottom" v-model="addressShow">			  
            <selectAddress v-on:addressObj="addressObj" :addressJson="addressJson" v-on:closeAddress="closeAddress"   ></selectAddress>
		</van-popup>
        <mt-popup v-model="showTrade" position="bottom" popup-transition="popup-fade">
          <van-picker show-toolbar title="" :columns="tradeColumns"    @cancel="showTrade = false" @confirm="tradeChange" />
        </mt-popup>
        <!-- 保障项目 -->
         <van-popup :lock-scroll="true" position="bottom" v-model="showPlanInfos" style="height:100%;">
            <div id="pageContainer" class="read-content page-container" style="overflow-y: scroll;height: 100%;font-size: 0.28rem">
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="showPlanInfos = false">关闭</span>
                    <h3 class="two_line">保障项目</h3>
                </div>
                <div style="margin-top:1.2rem">     
                    <div style="padding: .1rem .3rem;">
                        <h3 style="padding:0;">保障项目</h3>          
                        <div class="bzxmZ" style="background:#fff;padding:0.2rem 0;">
                            赔偿限额最高为保险金额（人民币：元）
                        </div>
                    </div>
                    <div class="fengexian"></div>
                    <div  v-if="planInfos.length > 0 && planInfos ">
                        <div class="dl01 bzxm_dl ng-scope" v-for="(item,index) in planInfos" :key="index">
                            <div class="bzxm_dl_dt">
                                <p class="bzxm_b" v-html="item.planName"></p>                           
                            </div>
                            <div class="cell-container" v-for="(_item,_index) in item.dutyInfos" :key="_index" >
                                <div class="listfl" v-html="_item.dutyName"></div>                            
                                <div class="listfr" v-show="_item.isContain == null && _item.isOptional == null">{{_item.insuredAmount + _item.insuredAmountUnit}}</div>
                                <div class="listfr" v-show="_item.isContain != null && _item.isOptional == null">{{_item.isContain ? '包含' : '不包含'}}</div>
                                <div class="listfr" v-show="_item.isContain == null && _item.isOptional != null">{{_item.isOptional ? '可选' : '不可选'}}</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>                 
                </div>
            </div>
		</van-popup>
        <!-- 添加被保人 -->
          <mt-popup :lock-scroll="true" position="bottom" v-model="showAddapplicant" style="height:100%;">
            <div class="read-content " >
               
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="showAddapplicant = false">关闭</span>
                    <h3 class="two_line">添加被保险人</h3>
                </div>
                <div class=""  style="margin-bottom:2rem;margin-top:1.38rem;">
                    <van-form @submit="addInsuranceList">
                            <div class="recognizeeRelation" style=" font-size: 0.28rem;margin-left: 16px;"  >
                                <span style="width: 1.4rem;display: inline-block;">为谁投保</span>
                                <span class="radio" @click="relationBtn(item,index)" :class="{active: RelationIndex == index}" v-for="(item,index) in recognizee" :key="index" >
                                    {{item}}
                                </span>    
                            </div>
                            <div class="fengexian"></div>
                            <ul>
                            <li v-if="isSocialSecurity" class="ng-scope"  style="margin-left:16px;padding-right:16px;">
                                <div class="checkBoxList" style="margin:0;padding:.3rem 0;">
                                    <p style="float:left;">有无社保</p>
                                    <div style="float:right;" class="weui-switch"  >
                                        <p class="checkItem" :class="{checkBoxActive:SocialSecurityIndex == 0}" @click="hasSocialSecurity(0)">有</p>
                                        <p class="checkItem" :class="{checkBoxActive:SocialSecurityIndex == 1}" @click="hasSocialSecurity(1)">无</p>
                                    </div>    
                                    <div class="clear"></div>                            
                            </div>
                            </li>
                            <li v-if="showSmokeType" class="ng-scope"  style="margin-left:16px;padding-right:16px;">
                                <div class="checkBoxList" style="margin:0;padding:.3rem 0;">
                                    <p style="float:left;">有无吸烟习惯/吸烟史</p>
                                    <div style="float:right;" class="weui-switch"  >
                                        <p class="checkItem" :class="{checkBoxActive:SmokeIndex == 0}" @click="hasSmokeHistory(0)">有</p>
                                        <p class="checkItem" :class="{checkBoxActive:SmokeIndex == 1}" @click="hasSmokeHistory(1)">无</p>
                                    </div>    
                                    <div class="clear"></div>                            
                            </div>
                            </li>
                            <van-field
                                v-model="InsurantList.Name"                           
                                label="姓名"
                                placeholder="请输入被保人姓名"
                                :rules="[{ required: true, message: ' ' }]"
                            />
                            <van-field
                                v-model="InsurantCardType"                           
                                label="证件类型"
                                placeholder="请选择被保人证件类型"
                                readonly 
                                :rules="[{ required: true, message: ' ' }]"
                                @click="isInsuranceCard = true"
                                right-icon="arrow"
                            />
                            <van-field                           
                                v-model="InsurantList.CertificateNo"                           
                                label="证件号码"                          
                                @keyup="appliNoBirth" 
                                placeholder="请输入被保人证件号码" 
                                :rules="[{ required: true, message: ' ' }]"
                            />
                            <van-field                           
                                v-model="InsurantList.BirthDate"                           
                                label="出生日期"
                                placeholder="请选择被保人出生日期"
                                readonly 
                                :rules="[{ required: true, message: ' ' }]"
                                @click="selInsuredBirthday"
                                right-icon="arrow"
                            />
                        <li class="ng-scope" style="margin-left:16px;padding-right:16px;">
                                <div class="personnelName">
                                    <span class="labelTitle ng-binding " style="float:left;width:90px;">性别</span>
                                    <div class="personSex ng-scope" style="border: 0;">
                                        <span class="radio" @click="InsurantGenderBtn(item,index)" :class="{active: InsurantList.Gender== index}" v-for="(item,index) in genderList" :key="index" >
                                            {{item.name}}
                                        </span>
                                    </div>
                                </div>
                            </li>  
                            <van-field
                                v-model="InsurantList.MobileTelephone"                           
                                label="手机号码"
                                placeholder="请输入被保人手机号码"          
                                oninput="if(value.length>11)value=value.slice(0,11)"
                                type="tel"                 
                                :rules="[{ required: true, message: ' ' }]"
                            />                        
                            <van-field
                            v-if="isTrade"
                                v-model="tradeName"                           
                                label="职业类别"
                                placeholder="请选择职业类别"
                                readonly 
                                :rules="[{ required: true, message: ' ' }]"
                                @click="showTrade = true"
                                right-icon="arrow"
                            />                                                
                        </ul> 
                        <div class="new_footer">
                            <van-button class="submitBuy" style="width: 6.9rem;    margin: 0 .3rem;" block type="danger" native-type="submit">                   
                                提交
                            </van-button>                             
                        </div>
                    </van-form>
                </div>                                 
            </div>
		</mt-popup>

        <!-- 添加标的 -->
          <van-popup  position="bottom" v-model="otherTarget.showTarget" style="height:60%;">
            <div class="read-content " >               
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="otherTarget.showTarget = false">关闭</span>
                    <h3 class="two_line">{{otherTarget.properties.title}}</h3>
                </div>
                <div class=""  style="margin-bottom:2rem;margin-top:1.38rem;">
                     <van-form @submit="submitOtherTarget">
                        <div  v-for="(item,index) in otherTarget.properties.items" :key="index">                       
                            <van-field
                                v-if="item.inputType == 'Text' && item.name  != 'isrdCretCode'"
                                v-model="item.value"                           
                                :label="item.label"
                                :placeholder=" item.label"
                                :rules="[{ required: item.required, message: ' ' }]"
                            />   
                            <van-field
                                v-if="item.inputType == 'Text' && item.name  == 'isrdCretCode' "
                                v-model="item.value"                           
                                :label="item.label"
                                :placeholder=" item.label"
                                :rules="[{  required: item.required, pattern, message: '请输入15或18位身份证号码' }]"
                            /> 
                      <!--   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  -->
                        </div> 
                    <div class="new_footer">
                            <van-button class="submitBuy" style="width: 6.9rem;    margin: 0 .3rem;" block type="danger" native-type="submit">                   
                                提交
                            </van-button>                             
                    </div>
                    </van-form>
                </div>                                 
            </div>
		</van-popup>
        <!-- 投保确认 -->
        <div class="divBTM-new" id="divBFJS" style="opacity: 1; top: 0px;max-height: 75%;" v-show="isInsuranceInfo"> 
            <div class="popups_bfjs" style="height: 100%;bottom: 1rem;transition: all 0.3s ease-in 0s;">
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="isInsuranceInfo = false">关闭</span>
                    <h3 class="two_line">投保信息预览</h3>
                </div>
                <div class="" >
                    <div class="time_box01 view01 " style="margin-top: 1.2rem">
                        <dl>
                            <dd>
                                <p>
                                    <strong> 保障期间：</strong>
                                    {{startTime}} 至 {{endTime}}
                                </p>
                            </dd>
                            <dd>
                                <p>
                                    <strong>投保计划：</strong>{{insutanceData.plantName}}
                                </p>
                            </dd>
                             <dd>
                                <p>
                                    <strong>投保产品：</strong>{{insutanceData.productName}}
                                </p>
                            </dd>
                        </dl>                        
                    </div>
                    <p class="fengexian"></p>
                    <div class="view01 time_box01">
                        <dl>    
                            <dd  style="margin-top:.2rem">
                                <p>投保人信息</p>
                            </dd>                     
                            <dd  v-if="insutanceData.code != 'CPIC-DCIS'">
                                <p>
                                    <strong> 姓名： </strong>
                                    {{ApplicantList.Name}}
                                </p>
                            </dd>
                            <dd  v-else>
                                <p>
                                    <strong> 企业名称： </strong>
                                    {{ApplicantList.Name}}
                                </p>
                            </dd>
                            
                            <dd v-if="insutanceData.code == 'CPIC-DCIS'">
                                <p>
                                    <strong> 证件号：</strong>
                                    {{ApplicantList.CertificateNo}}
                                </p>
                            </dd>                            
                            <dd>
                                <p>
                                    <strong> 电话号码：</strong>
                                    {{ApplicantList.MobileTelephone}}
                                </p>
                            </dd>
                            <dd>
                                <p>
                                    <strong> 电子邮件：</strong>
                                    {{ApplicantList.Email}}
                                </p>
                            </dd>
                        </dl>
                    </div>
                    <div class="insurantInfo" v-for="(item,index) in InsurantArr" :key="index" v-show="insutanceData.code != 'CPIC-DCIS'">
                        <p class="fengexian"></p>
                        <div class="view01 time_box01">
                            <dd style="margin-top:.2rem">
                                    <p>被保人信息</p>                                
                            </dd>
                            <dd>
                                <p>
                                    <strong> 姓名： </strong>
                                    {{item.Name}}
                                    <a v-show="item.RelationshipWithPolicyholder">{{recognizee[item.RelationshipWithPolicyholder - 1]}}</a>
                                </p>
                            </dd>
                            <dd>
                                <p>
                                    <strong> 证件号：</strong>
                                    {{item.CertificateNo}}
                                </p> 
                            </dd>
                            <dd>
                                <p>
                                    <strong> 电话号码：</strong>
                                    {{item.MobileTelephone}}
                                </p> 
                            </dd>
                        </div>
                    </div>
                <div class="bottom-fixed" style="border-top: 1px solid #eee;">
                    <div class="read-area bottom-fixed">
                            <span class="checkbox-icon" :class="{active:isCheckBox}" @click="showCheckBox"></span>
                            <div class="item-wrapper">
                                <label for="">我已阅读并同意</label>
                                <a v-for="(item,index) in readPDFList"  target="_blank"  :key="index"  :href="item.url"  @click="insuranceListBtn(item)">{{item.title}}</a>
                                <!-- <span @click="insuranceListBtn(0)">《投保须知》</span> -->
                            </div>
                        </div>
                </div>
                </div>
            </div>
        </div>
         <!-- 健康告知弹层 -->
        <van-popup position="bottom" v-model="showHealthTold" style="height:100%;" >
            <div class="read-content">
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="showHealthTold = false">关闭</span>
                    <h3 class="two_line">健康告知</h3>
                </div>
                <div class=""  style="margin-top:1rem;margin-bottom:2rem;" v-if="healthOptions.length > 0" >
                    <div class="healthP" style="margin: 0.21rem 0.3rem 0.3rem;color:#f44" v-if="healthNoticeInfo != null" v-html="healthNoticeInfo.title">
                            
                    </div>
                    <div style="margin:.21rem .3rem .3rem .3rem" v-for="(item,index) in healthOptions" :key="index">
                        <p class="healthP" style="margin-top: .1rem;" v-html="item.content">                            
                        </p>                      
                    </div>
                </div>               
            </div>
            <van-dialog v-model="showhealthRemark" title=""  @confirm="healthConfirm" show-cancel-button @cancel="showhealthRemark = false">
                <div style="text-align: center;padding: 0.2rem;">
                    <h3>请勾选有以上情况的家庭成员</h3>
                    <p style="color:#999;font-size:0.28rem">我们需要进一步了解他们的健康状况，以确认是否可以为您承保。</p>
                    <div class="" style="margin-top:0.3rem">
                            <div  style="border:0;">
                                <!-- <span class="labelTitle ng-binding ng-scope" style="float:left;">性别</span> -->
                                <div class="healthCheck ">
                                    <span class="healthSpan" @click="selectInsurance(item,index)" :class="{active: InsuranceValue.indexOf(item.Name)!=-1}" v-for="(item,index) in InsurantArr" :key="index" >
                                        {{item.Name}}
                                    </span>
                                </div>
                            </div>
                    </div>
                </div>                
            </van-dialog>
            <div class="new_footer" style="display:flex;justify-content: space-around;padding: 0.3rem 0px 0px; height: 1.4rem;" v-if="insutanceData.code != 'ZHONGAN-AM98'">                               
                    <div class="healthSelect" @click="submitBuyBtn('nonNext')">
                        部分不符合
                    </div>
                    <div class="healthSelect" @click="submitBuyBtn('next')">
                        全部符合，继续投保
                    </div>                
            </div>
            <div class="new_footer" style="display:flex;justify-content: space-around;padding: 0.3rem 0px 0px; height: 1.4rem;" v-else>                               
                    <div class="healthSelect" @click="submitBuyBtn('nonNext')">
                        部分为是
                    </div>
                    <div class="healthSelect" @click="submitBuyBtn('next')">
                        以上全为否，继续投保
                    </div>                
            </div>
		</van-popup>
            
      <van-popup v-model="showInsuranceList" :close-on-click-overlay="false"  style="height:100%" position="bottom">
            <div class="_closedPopupBtn" >    
                    保险条款
                <div class="header-right" @click="showInsuranceList = false">
                    <i  class="close-icon"></i>
                 </div>
            </div>
            <div style="height:100%" class="h-100p">
            <div style="height:100%">
                <iframe :src="iframeUrl"    class="clause-iframe"></iframe>                
            </div>
            </div>
		</van-popup> 
    </div>
</template>
<script>
import "./../../assets/css/product.scss";
// import "./../../assets/js/rem.js";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator,Toast } from 'mint-ui';
import { dialog } from "vant";
// import {  zmGetstreetsArr  } from '../../assets/js/zmRegion';
// import BMap from 'BMap'
import selectAddress from './../common/address.vue';
// import searchCompany from './../common/searchCompany.vue'; //公司搜索
// import selectAddress from "./../common/selectAddress.vue"; //共用组件地址选择器
export default {
    data(){
        return{
            otherTarget:{
                showTarget:false,
                otherTargetList:[],
                properties:[],
                displayTarget:[],
                targetSelectIndex:0,
                isChange:false, 
                otherInsuranceNum:'',          
            }, 
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,            
            otherTargetObjectList: [],
            address:"",
            province: '广东省',//省
			city: '深圳市',//市
			area: '罗湖区',//县
			provinceCode: '',//省级代码
			cityCode: '', //市级代码
			areaCode: '440303',//县级代码
            addressShow:false,
            startTime:'',
            endTime:'',
            cardType:'',
            amount:'',
            InsurantCardType:'',
            InsurantCardIndex:0,
            iframeUrl:'',
            isInsuranceCard:false,
            showInsuranceList:false,//投保须知
            isTBXZ:false,
            isInsurance:false,
            isFLSM:false,
            planInfos:[],
            showPlanInfos:false,
            isYMTK:false,
            typeResult : ['居民身份证','护照','其他'],
			typeCode:[{name:'居民身份证',code:'IdCard'},{name:'护照',code:'ChinaPassPort'},{name:'其他',code:'Other'}],
            isCard:false,
            insuranceBirthday:'',
            insuredBirthday: new Date(this.Common.Public.GetDateStr(0)),
            applicantBirthday:new Date(this.Common.Public.GetDateStr(0)),
            startDate: new Date('1919-01-01'),
            genderIndex:0,
            insurantGenderIndex:0,
            genderList:[{name:'男',code:'man'},{name:'女',code:'moman'}],
            recognizee:['本人','父母','子女','配偶'],
            RelationIndex:0,
            showBeneficiary:false,
            showAddapplicant:false,
            showInsurexplain:false,
            showappliexplain:false,
            insuranceArrIndex:0,
            isChange:false,
            InsuranceText:'',
            insutanceData:{},
            showTrade:false,
            isTrade:false,//职业是否必须传
            SKUCode:'', 
            SKUOptions:'',  
            tradeColumns:[],  
            Uwid:'', 
            endDate:new Date(),
            SocialSecurityIndex:0,  
            SmokeIndex:1,  
            canClick:true,//是否可点击             
            ApplicantList:{
                    "Name": "",
                    "CertificateType": '',
                    "CertificateNo": "",
                    "BirthDate": "",
                    "Address": "",
                    "Email": "",
                    "MobileTelephone": "",
                    "Gender":0,                                  
            },
            InsurantList:{
                    "Name": "",
                    "CertificateType": '',
                    "CertificateNo": "",
                    "BirthDate": "",
                    "Address": "",
                    "Email": "",
                    "MobileTelephone": "",  
                    "RelationshipWithPolicyholder": 1,
                    "OccupationCode": "",
                    "SocialSecurityFlag": null,
                    "SmokeType":null,
                    "Uwid":'',
                    "Gender":0,

            },
            InsurantArr:[],
            tradeList:[],
            tradeNameList:[],
            tradeName:'',
            otherMessage:[],
            isCheckBox:false,
            isInsuranceInfo:false,
            showSmokeType:false,
            SocialSecurityFlag:null,
            SmokeType:null,
            restrictive:{},
            readPDFList:[],
            isSocialSecurity:false,
            UnderwritingUrl:'',
            distributorCode:'',
            activeNames:['1'],
            updataModel:{
            "distributorCode": "",
            "productCode": "",
            "StartDate": "",
            "EndDate": "",
            "amount": 0,
            "applicantName": "",
            "insurantName": "",
            "orderDetail": {
                "otherTargetObjectList":[],
                "SchemaProductCode": "",
                "SKUCode": "",
                "SKUOptions":"",
                "ApplicantList": [
                                    {
                                        "Name": "",
                                        "CertificateType": 0,
                                        "CertificateNo": "",
                                        "BirthDate": "",
                                        "Address": "",
                                        "Email": "",
                                        "Gender":"",
                                        "MobileTelephone": ""
                                    }
                                ],
                "InsurantList": [
                                {
                                "BeneficaryList": [ //受益人可为空
                                        {
                                            "RelationShip": 0,
                                            "Percentage":0 ,
                                            "Name": "",
                                            "CertificateType": 0,
                                            "CertificateNo": "",
                                            "BirthDate": " ",
                                            "Address": "",
                                            "Email": "",
                                            "MobileTelephone": ""
                                        }
                                        ],
                                        "Name": "",
                                        "Uwid":'',
                                        "Gender":'',
                                        "CertificateType": 0,
                                        "CertificateNo": "",
                                        "BirthDate": "",
                                        "Address": "",
                                        "Email": "",
                                        "MobileTelephone": "",
                                        "RelationshipWithPolicyholder": 1,
                                        "OccupationCode": ""
                                    }
                                ],
                "ContactList": []
                },
                "DistributorAttach": "",
                "OrderSource": "WeiXin",
                "Properties": {
                    "PayResultUrl":'',
                    "FamilyQuestionnaireId":'',
                    "PayBackUrl":''

                }
            },
            showHealthTold:false,
            healthOptions:[],
            healthNoticeInfo:{},
            showhealthRemark:false,
            InsuranceValue:[],
            updataOtherTarget:[],//投保时其他信息，处理后的；
            insurantHidden:false,
            location:'',
            addressJson:{}
        }
    },
     components:{
        selectAddress,
        // searchCompany
    },  
    methods:{
        // addressList(data){ //地址选择器
        //     this.address = data.address;
        //     this.areaCode = data.areaCode;
        //     this.cityCode = data.cityCode;
        //     this.provinceCode = data.provinceCode;
        //     this.selAddress();
        //     // console.log(data);
        // },
        insuranceListBtn(item){   //  去阅读条款 
          this.setUpdataModel();           
        },
        showCheckBox(){ //阅读条款
            this.isCheckBox = !this.isCheckBox;
        },
    
        // 存储信息
        setUpdataModel(){ //目前只有多被保人去智能核保，或阅读条款时会存储数据
             var self = this;
            if(this.ApplicantList.BirthDate == ''){                                
                return ;
            }
            if(this.ApplicantList.MobileTelephone == ''){                             
                return ;
            }
            if(this.ApplicantList.CertificateNo == ''){          
                return ;
            }            
            var ApplicantList = {};
            ApplicantList = this.ApplicantList;
            ApplicantList.code = this.insutanceData.code;
            sessionStorage.setItem('ApplicantList',JSON.stringify(this.ApplicantList)); 
            if(this.InsurantArr.length > 0){
                sessionStorage.setItem('InsurantArr',JSON.stringify(this.InsurantArr)); 
            }else{
                sessionStorage.removeItem('updataModel');
                sessionStorage.removeItem('InsurantArr');
                sessionStorage.removeItem('tradeName');
                // sessionStorage.removeItem('ApplicantList');
                return;
            }
           var applicantModel =  {
                                    "Name": "张三",
                                    "CertificateType": 0,
                                    "CertificateNo": "",
                                    "BirthDate": "",
                                    "Address": "",
                                    "Email": "",
                                    "MobileTelephone": "",
                                    "Gender":0
            }                
            applicantModel.Name = this.ApplicantList.Name;
            applicantModel.CertificateType = this.ApplicantList.CertificateType;
            applicantModel.CertificateNo = this.ApplicantList.CertificateNo;
            applicantModel.BirthDate = this.ApplicantList.BirthDate;
            applicantModel.MobileTelephone = this.ApplicantList.MobileTelephone;
            applicantModel.Email = this.ApplicantList.Email;
            applicantModel.Gender = this.ApplicantList.Gender;
            this.updataModel.StartDate = this.startTime + ' ' + '00:00:00';
            this.updataModel.EndDate = this.endTime + ' ' + '23:59:59';
            this.updataModel.applicantName = this.ApplicantList.Name;
            this.updataModel.insurantName = this.InsurantList.Name;            
            this.updataModel.amount = this.amount;
            this.updataModel.orderDetail.SKUCode = this.insutanceData.SKUCode; 
            this.updataModel.orderDetail.SKUOptions = this.insutanceData.SKUOptions;          
            this.updataModel.orderDetail.ApplicantList[0] = applicantModel;
            this.updataModel.orderDetail.InsurantList = [];
            this.updataModel.productCode = this.insutanceData.code;
            this.updataModel.orderDetail.SchemaProductCode = this.insutanceData.schemaProductCode;
            for(var i = 0 ; i <this.InsurantArr.length ; i++ ){
                var InsurantList = this.InsurantArr[i];
                InsurantList.BeneficaryList = [];
                this.updataModel.orderDetail.InsurantList.push(InsurantList);                    
            }               
            var url = window.location.protocol + '//' + window.location.host + '/#' ;        
            this.updataModel.Properties.PayResultUrl = url + '/product/payResult?appId=' + localStorage.getItem('appId') +'&productCode=' + this.insutanceData.code;        
            this.updataModel.Properties.PayBackUrl = url + '/product/payPage?appId=' + localStorage.getItem('appId') +'&productCode=' + this.insutanceData.code;
            this.updataModel.OrderSource = this.isMobile();            
            sessionStorage.setItem('tradeName',this.tradeName);
            sessionStorage.setItem('updataModel',JSON.stringify(this.updataModel)); 
        },
        packageOtherTarget(){  //标的信息需要提交的数据组装
            var otherTargetObjectList = JSON.parse(JSON.stringify(this.otherTargetObjectList));
            var _otherTargetObjectList = otherTargetObjectList;
            var otherTargetArr = [];
            this.otherTarget.otherTargetList.map((item,index)=>{
                var moreotherTarget = {Name:'',Items:[]};                
                moreotherTarget.Name = item.name;
                var _moreotherTarget = {};
                item.items.map(_item=>{
                    _moreotherTarget[_item.name] = _item.value;
                }) 
                moreotherTarget.Items.push(_moreotherTarget);
                otherTargetArr.push(moreotherTarget);               
            })         
            var arr = [];                       
            for(var i = 0 ; i < this.otherTargetObjectList.length ; i++ ){
                var obj = {Name:'',Items:[]};
                var item = this.otherTargetObjectList[i];
                obj.Name = item.name;                              
                var _obj = {};
                for(var j = 0 ; j < item.items.length ; j ++){                    
                    var _item = item.items[j];
                    if(_item.value){
                        _obj[_item.name] = _item.value;
                    }else{
                        Toast("请完善" + _item.label);
                        return;
                    }               
                }                  
                obj.Items.push(_obj);   
                arr.push(obj);                                 
            }    
            arr.map(data=>{
                if(data.Name == otherTargetArr[0].Name){
                    data.Items = [];
                    otherTargetArr.map(_data=>{                                                        
                        data.Items.push(_data.Items[0]);                        
                    })
                }
            })
            this.updataOtherTarget = arr;    
        },
        toNext(){   // 下一步打开弹层确认信息，或打开智能核保，或下单时、数据组装
            // this.packageOtherTarget();
            if(this.insutanceData.code != 'CPIC-DCIS'){
                   if(this.restrictive.insuredQuantityMax == 0){
                        if(this.restrictive.insuredQuantityMin <= this.InsurantArr.length ){   
                    
                        }else{
                            Toast('请添加至少' + this.restrictive.insuredQuantityMin + '个被保人'  );
                            return
                        }
                    }else{
                        if(this.restrictive.insuredQuantityMin <=this.InsurantArr.length && this.InsurantArr.length <= this.restrictive.insuredQuantityMax  ){

                        }else{
                            Toast('请添加' + this.restrictive.insuredQuantityMin + '-'  +  this.restrictive.insuredQuantityMax + '个被保人'  );
                            return;
                        }
                    } 
            }else{
                this.InsurantArr = [];
                this.InsurantList = this.ApplicantList;
                this.InsurantArr.push(this.ApplicantList);
                if(this.otherTarget.otherTargetList.length){

                }else{
                    Toast("请完善标的信息");
                    return;
                }
            }                                         
            if(!this.isInsuranceInfo){
                this.isInsuranceInfo = true;
            }else{       
                if(!this.isCheckBox){
                    Toast('请阅读协议');
                    return;
                }            
            var applicantModel =  {
                                    "Name": "张三",
                                    "CertificateType": 0,
                                    "CertificateNo": "",
                                    "BirthDate": "",
                                    "Address": "",
                                    "Email": "",
                                    "MobileTelephone": "",
                                    "Gender":0
            }                
            applicantModel.Name = this.ApplicantList.Name;
            applicantModel.CertificateType = this.ApplicantList.CertificateType;
            applicantModel.CertificateNo = this.ApplicantList.CertificateNo;
            applicantModel.BirthDate = this.ApplicantList.BirthDate;
            applicantModel.MobileTelephone = this.ApplicantList.MobileTelephone;
            applicantModel.Email = this.ApplicantList.Email;
            applicantModel.Gender = this.ApplicantList.Gender;
            applicantModel.Address = this.ApplicantList.Address;
            this.updataModel.DistributorCode = this.distributorCode;
            this.updataModel.StartDate = this.startTime + ' ' + '00:00:00';
            this.updataModel.EndDate = this.endTime + ' ' + '23:59:59';
            this.updataModel.applicantName = this.ApplicantList.Name;
            this.updataModel.insurantName = this.InsurantList.Name;            
            this.updataModel.amount = this.amount;
            this.updataModel.orderDetail.SKUCode = this.insutanceData.SKUCode;
            this.updataModel.orderDetail.SKUOptions = this.insutanceData.SKUOptions; 
            if(this.updataOtherTarget.length){                              
                this.updataModel.orderDetail.otherTargetObjectList = this.updataOtherTarget;
            }else{
                 this.packageOtherTarget();        
                 this.updataModel.orderDetail.otherTargetObjectList = this.updataOtherTarget;
            }        
            // this.updataModel.orderDetail.SocialSecurityFlag = this.SocialSecurityFlag;
            this.updataModel.orderDetail.ApplicantList[0] = applicantModel;
            this.updataModel.orderDetail.InsurantList = [];
            this.updataModel.productCode = this.insutanceData.code;
            this.updataModel.orderDetail.SchemaProductCode = this.insutanceData.schemaProductCode;
            for(var i = 0 ; i <this.InsurantArr.length ; i++ ){
                var InsurantList = this.InsurantArr[i];
                // if(InsurantList.Address == ''){
                    InsurantList.Address = applicantModel.Address;
                // }
                InsurantList.BeneficaryList = [];
                this.updataModel.orderDetail.InsurantList.push(InsurantList);                    
            }    
            var self = this;
            var url = window.location.protocol + '//' + window.location.host + '/#' ;
            // this.updataModel.Properties.PayReturnUrl = url + '/product/insuranceIndex?appId=' + localStorage.getItem('appId') + '&ProductCode=' +  this.updataModel.productCode;
            this.updataModel.Properties.PayResultUrl = url + '/product/payResult?appId=' + localStorage.getItem('appId') +'&productCode=' + this.insutanceData.code;        
            this.updataModel.Properties.PayBackUrl = url + '/product/payResult?appId=' + localStorage.getItem('appId') +'&productCode=' + this.insutanceData.code;
            this.updataModel.OrderSource = this.isMobile();
            if(this.healthOptions.length > 0 && (this.insutanceData.code == 'Allianz-ZAAMIP-F' || this.insutanceData.code == 'ZHONGAN-AM98' ) ){              
                this.showHealthTold = true;
                return;
            }
                Indicator.open('下单中')
                axiosPostAPI('/PropertyProducts/' + this.insutanceData.code +'/Order',this.updataModel).then(res=>{
                    Indicator.close();
                    if(res.result){
                        var orderNo = res.result.orderNo                       
                         Indicator.open('加载中...');
                        axiosGetAPI('/PropertyProducts/' +  self.insutanceData.code +  '/Order/' + orderNo).then(data=>{
                            Indicator.close();
                            if(res.status == 200){                                
                                if(data.result.status == 'Cancel'){
                                self.$dialog.alert({
                                        title: "",
                                        message: data.result.remark
                                        })
                                        .then(() => {
                                            
                                        })                                        
                                }
                                else{
                                    if(this.insutanceData.code == "CPIC-DCIS"){
                                       window.location.href =  data.result.payUrl 
                                    }else{
                                        self.$router.push({ path: '/product/payPage?orderNo=' + orderNo });
                                    }
                                     
                                }
                            }
                        })
                    }
                }) 
            }
        },
        selectInsurance: function(item, index) { //多被保人核保时，勾选被保人
            // this.getAPI(item.code);
            if (this.InsuranceValue.indexOf(item.Name) != -1) {
                this.InsuranceValue.splice(this.InsuranceValue.indexOf(item.Name), 1);        
            } else {
                this.InsuranceValue.push(item.Name);
            }
        },
        submitBuyBtn(name){ // 智能核保弹层符合或者不符合
            var self = this;        
           if(name == 'next'){ 
               this.showHealthTold = false;
                Indicator.open('下单中')
                axiosPostAPI('/PropertyProducts/' + this.insutanceData.code +'/Order',this.updataModel).then(res=>{
                    Indicator.close();
                    if(res.result){
                        var orderNo = res.result.orderNo                       
                        Indicator.open('加载中...');
                        axiosGetAPI('/PropertyProducts/' +  self.insutanceData.code +  '/Order/' + orderNo).then(data=>{
                            Indicator.close();
                            if(res.status == 200){                                
                                if(data.result.status == 'Cancel'){
                                self.$dialog.alert({
                                        title: "",
                                        message: data.result.remark
                                        })
                                        .then(() => {
                                            
                                        });                                       
                                }
                                else{                                   
                                    if(self.insutanceData.code == 'ZHONGAN-AM98'){
                                        window.location.href = data.result.payUrl;
                                    }else{
                                        self.$router.push({ path: '/product/payPage?orderNo=' + orderNo });
                                    }
                                     
                                }
                            }
                        })
                    }
                })                                                  
                // this.$router.push({ path: '/product/presoalInformation' });               
           }else{               
                // this.$router.push({path:'./underwritingTrans'});
                //  window.location.href = this.UnderwritingUrl;
               this.showhealthRemark = true;
               return; 
           }                                  
        },
        placeOrder(){ //下单
            var self = this;
            this.showhealthRemark = false;
                Indicator.open('下单中')
                axiosPostAPI('/PropertyProducts/' + this.insutanceData.code +'/Order',this.updataModel).then(res=>{
                    Indicator.close();
                    if(res.result){
                        var orderNo = res.result.orderNo                       
                        Indicator.open('加载中...');
                        axiosGetAPI('/PropertyProducts/' +  self.insutanceData.code +  '/Order/' + orderNo).then(data=>{
                            Indicator.close();
                            if(res.status == 200){                                
                                if(data.result.status == 'Cancel'){
                                self.$dialog.alert({
                                        title: "",
                                        message: data.result.remark
                                        })
                                        .then(() => {
                                            
                                        });                                        
                                }
                                else{
                                     self.$router.push({ path: '/product/payPage?orderNo=' + orderNo });
                                }
                            }
                        })
                    }
                }) 
        },

        healthConfirm(){     //健康告知确认按钮  如果选择了某个或多个被保人则进入过渡页面，去京东安联智能核保     
            var arr = [];            
            for(var j = 0 ; j < this.InsurantArr.length ; j ++ ){
                for(var i = 0 ; i < this.InsuranceValue.length; i ++){
                    if(this.InsurantArr[j].Name == this.InsuranceValue[i]){
                        var model = {};
                        model.Name = this.InsuranceValue[i];
                        model.Index = j;
                        arr.push(model)
                    }
                }
            }            
            sessionStorage.setItem('updataModel',JSON.stringify(this.updataModel));                
            sessionStorage.setItem('InsuranceUnder',JSON.stringify(arr));            
            if(arr.length > 0){
                 if( this.insutanceData.code == 'ZHONGAN-AM98'){ //众安尊享e生多被保人一起核保。
                      this.$router.push({path:'./zhonganUnderwriting'});  
                }
                if(this.insutanceData.code == 'Allianz-ZAAMIP-F'){ //安联乐享人生家庭版多被保人核保为一个一个核保。
                    this.$router.push({path:'./underwritingTrans'+ "?flagUnderwriting=" + ''});
                }                
            }else{
                Toast("请选择至少一位需核保的被保人");
                return
            }            
            this.showHealthTold = false;                                 
        },
        hasSocialSecurity(index){ //有无社保
            this.SocialSecurityIndex = index;
            if(this.SocialSecurityIndex == 0){
                this.InsurantList.SocialSecurityFlag = 'Y';
            }else{                
                this.InsurantList.SocialSecurityFlag = 'N';            
            }            
        },
        hasSmokeHistory(index){ //有无吸烟史
            this.SmokeIndex = index;
            if(this.SmokeIndex == 0){
                this.InsurantList.SmokeType = "Y"
            }
             if(this.SmokeIndex == 1){
                this.InsurantList.SmokeType = "N"
            }
        },
        openCard(){ //证件选择
            if(this.canClick){
                this.isCard = true;
            }
        },
        cardChange(value,index){
            this.cardType = value;//投保人身份类型
            this.cardIndex = index;            
            this.ApplicantList.CertificateType = this.typeCode[index].code;            
            this.isCard = false;
        },
        InsuratChange(value,index){
            this.InsurantCardType = value;//被保人身份类型
            this.InsurantCardIndex = index;
            this.InsurantList.CertificateType = this.typeCode[index].code
            this.isInsuranceCard = false;
        },
        tradeChange(value,index){  //职业选择，三级联动时存储index数组至tradeIndex中用于取第三级职业编码。            
            this.tradeIndex = index;
            this.tradeName = value[0] + '-' + value[1] + '-' + value[2];
            this.showTrade = false;             
            this.InsurantList.OccupationCode = this.tradeColumns[index[0]].children[index[1]].children[index[2]].code;       
        },
        insuredBirthConfirm: function() { // 选择被保人生日日期
                this.InsurantList.BirthDate = this.Common.Public.dateString(this.insuredBirthday)
                this.$refs.insuredBirthday.close();
            },
        selInsuredBirthday: function() { // 打开被保人生日日期层
				this.$refs.insuredBirthday.open();
            },
        applicantBirthConfirm: function() { // 选择投保人生日日期
                this.ApplicantList.BirthDate = this.Common.Public.dateString(this.applicantBirthday)
                this.$refs.applicantBirthday.close();
                // console.log(this.Common.Public.checkBirthday())
            },
        selapplicantBirthday: function() { // 打开投保人生日日期层
				this.$refs.applicantBirthday.open();
            },
        genderBtn(item,index){ //投保人性别
                this.genderIndex = index;
                this.ApplicantList.Gender = index;
            },
        InsurantGenderBtn(item,index){ //被保人性别
                this.insurantGenderIndex = index;
                this.InsurantList.Gender = index;
        },
        acountPremium(){ //计算保费。
             var InsurantArr = [];
             this.InsurantArr.map(item=>{
                 var obj = {};
                 obj.Name = item.Name;
                 obj.BirthDate = item.BirthDate;
                 obj.SocialSecurityFlag = item.SocialSecurityFlag;
                 obj.SmokeType = item.SmokeType;
                if(this.isSocialSecurity && item.SocialSecurityFlag == null){
                    obj.SocialSecurityFlag = 'Y';
                }  
                if(this.showSmokeType && item.SmokeType == null){
                    obj.SmokeType = 'N';
                }
                
                 InsurantArr.push(obj);
             })
            var model = {
                    "DistributorCode": this.distributorCode,
                    "ProductCode": this.insutanceData.code,
                    "StartDate": this.startTime + " " + "00:00:00",
                    "EndDate": this.endTime + ' ' + '23:59:59',
                    "Amount": 0,
                    "ApplicantName": this.ApplicantList.Name,
                    "InsurantName": this.InsurantList.Name,
                    "OrderDetail": {                       
                        "SchemaProductCode":this.insutanceData.schemaProductCode,
                        "SKUCode": this.SKUCode,
                        "SKUOptions": this.insutanceData.SKUOptions, 
                        "otherTargetObjectList":this.updataOtherTarget,
                        "ApplicantList": [
                            {
                            "Name": this.ApplicantList.Name,
                            "BirthDate": this.ApplicantList.BirthDate,                            
                          }
                         ],
                        "InsurantList": this.InsurantArr,
                    }
                    }
            // this.tip = '保费计算中...';
            this.amount = '';
            axiosPostAPI('/PropertyProducts/' + this.insutanceData.code + '/QuotedPrice',model).then(res=>{
                    // console.log(res)
                    if( res.status == 200 ){
                        this.amount = res.result;
                    }
                })    
        },
        relationBtn(item,index){  //和被保人关系。['本人','父母','子女','配偶']对应1,2,3,4。本人时赋值同投保人
            this.RelationIndex = index;
            if(this.RelationIndex == 0){
                // this.InsurantList = this.ApplicantList; 
                var ApplicantList = JSON.parse(JSON.stringify(this.ApplicantList));
                this.InsurantList.Name = ApplicantList.Name;
                this.InsurantList.CertificateType = ApplicantList.CertificateType;
                this.InsurantList.CertificateNo = ApplicantList.CertificateNo;
                this.InsurantList.BirthDate = ApplicantList.BirthDate;
                this.InsurantList.Email = ApplicantList.Email;
                this.InsurantList.MobileTelephone = ApplicantList.MobileTelephone;
                this.InsurantList.Gender = ApplicantList.Gender;
                this.InsurantList.Address = ApplicantList.Address;
                if(this.Uwid){
                    this.InsurantList.Uwid  = this.Uwid;
                } else{
                    this.InsurantList.Uwid  = '';
                }                    
                this.InsurantList.RelationshipWithPolicyholder = this.RelationIndex + 1;                    
            }else{
                this.InsurantList = {
                    "Name": "",
                    "CertificateType": '',
                    "CertificateNo": "",
                    "BirthDate": "",
                    "Address": this.ApplicantList.Address,
                    "Email": "",
                    "MobileTelephone": "",  
                    "RelationshipWithPolicyholder": 1,
                    "OccupationCode": "",
                    "SocialSecurityFlag": null,
                    "SmokeType":null,
                    "Uwid":'',
                    "Gender":0
                }
            }
        },
        ownerNoBirth: function(e) { //投保人 证件号校验+通过证件号来判断性别 出生日期
                if(this.cardType == '') { Toast('请选择证件类型'); return false; }
                const idNo = this.ApplicantList.CertificateNo;
                if(this.typeCode[this.cardIndex].code =='IdCard'){                        
                        this.genderIndex = this.Common.Public.checkBirthday(idNo)[0] == "Male" ? 0  : 1;
                        this.ApplicantList.Gender = this.genderIndex;
                        this.ApplicantList.BirthDate = this.Common.Public.checkBirthday(idNo)[1];
                }          
            },
        appliNoBirth: function(e) { // 被保人 证件号校验+通过证件号来判断性别 出生日期
                if(this.InsurantCardType == '') { Toast('请选择证件类型'); return false; }
                const idNo = this.InsurantList.CertificateNo;
                if(this.typeCode[this.InsurantCardIndex].code =='IdCard'){
                        this.insurantGenderIndex = this.Common.Public.checkBirthday(idNo)[0] == "Male" ? 0  : 1;                        
                        this.InsurantList.Gender = this.insurantGenderIndex;
                        this.InsurantList.BirthDate = this.Common.Public.checkBirthday(idNo)[1];
                }          
            },
        changeInsurance(item,index){ //编辑被保人
            this.InsurantList = item;
            this.showAddapplicant = true;
            this.insuranceArrIndex = index;            
            this.RelationIndex = item.RelationshipWithPolicyholder - 1;
            this.insurantGenderIndex = item.Gender ;
            this.isChange = true;
        },
         deleteInsurance(item,index){ //删除被保人
            this.InsurantArr.splice(index,1);  
            if(this.InsurantArr.length  > 0){
                this.acountPremium();
            }          
        },
        addotherTarget(item,index){ //添加信息标的
            this.otherTarget.showTarget = true;
            this.otherTarget.properties = item; 
            this.otherTarget.properties.items.map(res=>{
                if(res.inputType == 'Text'){
                    res.value = null;
                }
            })  
                     
        },
        changeOtherTarget(item,index){ //修改标的（）
            this.otherTarget.properties =  this.otherTarget.otherTargetList[index];
            this.otherTarget.targetSelectIndex = index;
            this.otherTarget.isChange = true;
            this.otherTarget.showTarget = true;
            // this.packageOtherTarget(); 
            // this.acountPremium(); 
        },
        deleteOtherTarget(item,index){
            this.otherTarget.otherTargetList.splice(index,1);
            this.otherTarget.displayTarget.splice(index,1);
            this.packageOtherTarget(); 
            this.acountPremium(); 
        },
        submitOtherTarget(){            
            var obj = {};
            var properties = JSON.parse(JSON.stringify(this.otherTarget.properties));
           properties.items.map(item=>{
                if(item.name == 'isrdName'){
                    obj.name = item.value;
                }
                if(item.name == 'isrdCretCode'){
                    obj.Idcard = item.value;
                }
            })            
            if(this.otherTarget.isChange){
                this.otherTarget.otherTargetList.splice(this.otherTarget.targetSelectIndex,1,properties);
                this.otherTarget.displayTarget.splice(this.otherTarget.targetSelectIndex,1,obj)
                this.otherTarget.isChange = false;
            }else{
                this.otherTarget.otherTargetList.push(properties);    
                this.otherTarget.displayTarget.push(obj);           
            }
            this.packageOtherTarget(); 
            this.acountPremium();    
            this.otherTarget.showTarget = false;
        },
        addInsurance(){
            if( this.InsurantArr.length >= this.restrictive.insuredQuantityMax && this.restrictive.insuredQuantityMax != 0){
                Toast('最多添加' + this.restrictive.insuredQuantityMax + '个被保人')
                return;             
            }
            this.showAddapplicant = true;
            // console.log(this.ApplicantList);
            if(this.RelationIndex == 0){
                this.InsurantCardType = this.cardType;
                this.InsurantCardIndex = this.cardIndex;
                var model = this.ApplicantList;
                this.InsurantList = model;
                this.InsurantList.Uwid = this.Uwid;
                this.InsurantList.RelationshipWithPolicyholder = this.RelationIndex + 1;
            }else{
                this.InsurantList = {
                    "Name": "",
                    "CertificateType": '',
                    "CertificateNo": "",
                    "BirthDate": "",
                    "Address": "",
                    "Email": "",
                    "MobileTelephone": "",  
                    "RelationshipWithPolicyholder": 1,
                    "OccupationCode": "" ,
                    "SocialSecurityFlag": null,
                    "SmokeType":null,
                    "Gender":0,
                    "Uwid":''
                }
            }
        },
       
        addInsuranceList(){             
            this.InsurantList.CertificateType = this.typeCode[this.InsurantCardIndex].code
            this.InsurantList.RelationshipWithPolicyholder = this.RelationIndex + 1;
            // this.InsurantList.OccupationCode
            if(this.InsurantList.OccupationCode  == '' && this.isTrade){
                // console.log(this.tradeIndex);
                // this.tradeColumns[index[0]].children[index[1]].children[index[2]].code
                 this.InsurantList.OccupationCode = this.tradeColumns[this.tradeIndex[0]].children[this.tradeIndex[1]].children[this.tradeIndex[2]].code; 
            }           
            if(this.isSocialSecurity && this.InsurantList.SocialSecurityFlag == null){
                    this.InsurantList.SocialSecurityFlag = 'Y';
            }  
            if(this.showSmokeType && this.InsurantList.SmokeType == null ){
                this.InsurantList.SmokeType = "N"
            }
            if(this.isChange){
                this.InsurantArr.splice(this.insuranceArrIndex,1,this.InsurantList);
                this.isChange = false;
            }else{
                this.InsurantArr.push(this.InsurantList);                
            }
            this.acountPremium();
            this.showAddapplicant = false;            
        },
      isMobile(){
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if(isWeixin){
            return "WeiXin"
        }else{
            if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
                return 'H5';  // 移动端
            }else{
                return 'PC';  // PC端
            }
            }
        },
        
       getDateStr:function(start,AddDayCount) {   //获取n天后的日期
    　　　　var dd = new Date(start);  
    　　　　dd.setDate(dd.getDate() + AddDayCount - 1 );//获取AddDayCount天后的日期  
    　　　　var y = dd.getFullYear();   
    　　　　var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
    　　　　var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
    　　　　return y +"-"+ m +"-"+ d;   
    　　},  
       // 计算可投保出生日期开始日期
        countstartBirthday:function(endtime,value){            
            var date = new Date(endtime);
            var year1 = date.getFullYear();        
            var month1 = date.getMonth() + 1;            
            if(month1< 10 ){
                month1 = '0' + month1;
            }
            var day1 = date.getDate();          
            if(day1 < 10){
                day1 = '0' + day1;
            }       
            var num1 = year1 + '' + month1 + day1;
            var startTime = '';
          
            var minDate = value + '' + '0000';
            startTime = num1 - minDate + '';
            
            var year = startTime.substring(0,startTime.length - 4);
            var month =  startTime.substring(startTime.length - 4,startTime.length - 2);
            var day =  startTime.substring(startTime.length - 2,startTime.length);
            var time = year + '-' + month + '-' + day;            
            return time;           
        },
         getUnderwriting() {
            Indicator.open('正在处理');
            var self = this;
            var url = window.location.protocol + "//" + window.location.host + "/#";
            var model = {
                DistributorCode: this.distributorCode,
                ProductCode: this.insutanceData.code,
                orderDetail: this.updataModel.orderDetail,
                //  + '&InsuranceUnder=' +
                Properties: {
                    underwritingPassedUrl: url +"/product/zhonganUnderwriting?appId=" + localStorage.getItem("appId") + "&ProductCode=" +  this.insutanceData.code,
                    underwritingBackUrl: url + "/product/presoalInformation?appId=" + localStorage.getItem("appId")
                }
            };
            axiosPostAPI("/PropertyProducts/" + this.insutanceData.code + "/Underwriting", model ).then(data => {
                Indicator.close();
                if(data.status == 200) {
                    // window.location.href = data.result;
                }
            });
        },
         closeAddress(data){
            // console.log(data);
            this.addressShow = false;
        },
        addressObj(data){
            // this.address = data.address;
            // this.areaCode = data.areaCode;
            // this.cityCode = data.cityCode;
            // this.provinceCode = data.provinceCode;
            // this.selAddress();
            this.ApplicantList.Address = data.name;
            // console.log(data);
        },
         getCity(){
                let _this = this
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    if(r.accuracy==null){
                    alert('您已拒绝地理位置授权');
                    //用户决绝地理位置授权
                    return;
                }else{
                        const myGeo = new BMap.Geocoder()
                        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
                        if (data.addressComponents) {
                        const result = data.addressComponents
                        const location = {
                            creditLongitude: r.point.lat, // 经度
                            creditLatitude: r.point.lng, // 纬度
                            creditProvince: result.province || '', // 省
                            creditCity: result.city || '', // 市
                            creditArea: result.district || '', // 区
                            creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
                        }
                        _this.location = location;
                        _this.creditLongitude=location.creditLongitude;
                        _this.creditLatitude=location.creditLatitude;
                        _this.creditCity=location.creditCity;
                        // alert(this.getStatus());
                        }
                        })
                    }
                    }
                })
        }, 
        //订单赋值
        orderbindData(){
            var self = this;            
            var  orderNo =  sessionStorage.getItem('orderNo') || this.$route.query.orderNo ;
            if(orderNo){
                axiosGetAPI('/UsersOrder/AgainInsure?orderNo=' + orderNo).then(res=>{                
                    if(res.status == 200){
                        self.bindData(res.result); 
                    }
                })
            }
            var prepareOrderNo =  sessionStorage.getItem('prepareOrderNo');
            if(prepareOrderNo){
                axiosGetAPI('/PropertyProducts/'+  this.insutanceData.code +'/PrepareOrder/' + prepareOrderNo).then(res=>{
                    if(res.status == '200'){
                        self.bindData(res.result);
                    }
                })
            }
             
        },
        //赋值
        bindData(updataModel){
            // var updataModel = JSON.parse(sessionStorage.getItem('updataModel'));
            if(this.insutanceData.code == updataModel.productCode){
                    this.InsurantArr = updataModel.orderDetail.InsurantList;                  
                    var ApplicantList = updataModel.orderDetail.ApplicantList[0];
                    this.ApplicantList.Name = ApplicantList.Name;
                    this.ApplicantList.CertificateType = ApplicantList.CertificateType;
                    this.ApplicantList.CertificateNo = ApplicantList.CertificateNo;
                    this.ApplicantList.BirthDate = ApplicantList.BirthDate;
                    this.ApplicantList.MobileTelephone = ApplicantList.MobileTelephone;
                    this.ApplicantList.Email = ApplicantList.Email;
                    this.ApplicantList.Gender = ApplicantList.Gender;
                    this.updataModel.insurantName = updataModel.insurantName;
                    this.genderIndex = ApplicantList.Gender;
                    this.amount 
                    for(var i = 0 ; i < this.typeCode.length ; i ++){                    
                        var item  = this.typeCode[i];
                        if(item.code == ApplicantList.CertificateType){
                            this.cardType = item.name;
                            this.cardIndex = i
                        }  
                        if(item.code ==  updataModel.orderDetail.InsurantList[0].CertificateType){
                            this.InsurantCardType = item.name;
                            this.InsurantCardIndex = i;
                        }                      
                    }                                         
                    updataModel.orderDetail.InsurantList.map(item=>{
                        this.RelationIndex = item.RelationshipWithPolicyholder - 1;  
                        this.InsurantList = item;                          
                    })
                    // debugger;
                    this.typeCode.map(item=>{
                        if(item.code ==  updataModel.orderDetail.InsurantList[0].CertificateType){
                            this.InsurantCardType = item.name;
                        }
                    });
                    this.acountPremium();
            }
        },

    },
    mounted(){
       
        // this.getCity();
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
            // console.log(isiOS);
        }  
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let htmlDom = document.getElementsByTagName('html')[0];
        if(htmlWidth > 1024 ){          
            var pageContainer = document.getElementById("pageContainer");            
            // pageContainer.style.maxWidth = '1024px';
            // htmlDom.style.fontSize = '50px';
        }
        if(sessionStorage.getItem("title")){
            document.title = sessionStorage.getItem("title");
        }
        this.distributorCode = sessionStorage.getItem('distributorCode');
        if(sessionStorage.getItem('insuranceData')){
            var insutanceData = JSON.parse(sessionStorage.getItem('insuranceData'));
            this.insutanceData = insutanceData;
            this.startTime = insutanceData.startTime;
            this.endTime = insutanceData.endTime;
            this.amount = insutanceData.amount;
            this.SKUCode = insutanceData.SKUCode;
            this.SKUOptions = insutanceData.SKUOptions;
            this.SocialSecurityFlag = insutanceData.SocialSecurityFlag;
            this.SmokeType = insutanceData.SmokeType;
            this.restrictive = insutanceData.restrictive;
            if(insutanceData.otherTargetObjectList){
                this.otherTargetObjectList = insutanceData.otherTargetObjectList;
                insutanceData.otherTargetObjectList.map(item=>{   
                this.$set(item,'showRemark',false);            
                // console.log(item.limitMax > 1 || item.limitMax == null);
                item.items.map(_item=>{ //如果为选择框时，写入一个showPopup属性控制选择框显示隐藏                
                        if(_item.inputType == 'Select'){
                            this.$set(_item,'showPopup',false);
                        }
                    })
                })
            }            
            if(insutanceData.code == 'Allianz-ZHCAD'){ //投保类型只能为身份证
                this.cardType = '居民身份证';
                this.ApplicantList.CertificateType = "IdCard";
                this.typeResult = ['居民身份证'];
                this.typeCode = [{name:'居民身份证',code:'IdCard'}];
                this.canClick  = false; //不可点击
                this.cardIndex = 0;
            }
            if(insutanceData.code == 'ZHONGAN-AM98'){ //投保类型只能为身份证，出生证
                this.cardType = '居民身份证';
                this.canClick  = false;
                this.cardIndex = 0;
                this.ApplicantList.CertificateType = "IdCard";
                this.typeResult = ['居民身份证','出生证'];
                this.typeCode = [{name:'居民身份证',code:'IdCard'},{name:'出生证',code:'Other'}];               
            }
            if(insutanceData.code == 'CPIC-DCIS'){
                this.typeCode = [{name:'统一社会信用代码',code:'CreditCode'},{name:'机构代码',code:'Organization'}];
                this.cardType = '统一社会信用代码';
                this.ApplicantList.CertificateType = "CreditCode";
                this.typeResult = ['统一社会信用代码','机构代码'];                
                // this.canClick  = false; //不可点击
                this.cardIndex = 0;
            }
            this.insurantHidden = insutanceData.insurantHidden;
            if(insutanceData.restrictive.socialSecurity){
                this.isSocialSecurity = insutanceData.restrictive.socialSecurity; 
            }
            if(insutanceData.SmokeType){
                this.showSmokeType = true; 
            }
            
            if(insutanceData.healthOptions.length > 0){
                this.healthOptions = insutanceData.healthOptions;
            }
            if(insutanceData.healthNoticeInfo){
                this.healthNoticeInfo = insutanceData.healthNoticeInfo;
            }
            this.readPDFList = insutanceData.readPDFList;
            if(this.restrictive.insuredQuantityMin == this.restrictive.insuredQuantityMax){
                this.InsuranceText = '*被保险人限' + this.restrictive.insuredQuantityMin + '人';
            }
            if(this.restrictive.insuredQuantityMin < this.restrictive.insuredQuantityMax){
                this.InsuranceText = '*被保险人' + this.restrictive.insuredQuantityMin + '-' + this.restrictive.insuredQuantityMax + '人';
            }
            if(this.restrictive.insuredQuantityMax  == 0){
                this.InsuranceText = '*被保险人至少' + this.restrictive.insuredQuantityMin + '人';
            }
            
            if(insutanceData.applicantAgeList && insutanceData.applicantAgeList.options.length > 1){ //出生日期在不同年龄段产生不同产品时，限定被保人可投保出生日期。
                var startTime = insutanceData.startTime;
                var PeriodValue = insutanceData.applicantAgeList.options[insutanceData.BirthdayOptionsIndex];                
                    if(PeriodValue.minPeriodType == 'Day' ){
                       var minPeriodValue = 0 - PeriodValue.minPeriodValue;
                       this.endDate = new Date(this.getDateStr(startTime,minPeriodValue));                        
                    }
                    if(PeriodValue.minPeriodType == 'Year'){
                        this.endDate = new Date(this.countstartBirthday(startTime,PeriodValue.minPeriodValue));                          
                    }                    
                    if(PeriodValue.maxPeriodType == 'Day' ){
                        var maxPeriodValue = 0 - PeriodValue.maxPeriodValue 
                       this.startDate = new Date(this.getDateStr(startTime,maxPeriodValue));                        
                    }
                    if(PeriodValue.maxPeriodType == 'Year'){
                        this.startDate = new Date(this.countstartBirthday(startTime,PeriodValue.maxPeriodValue));                          
                    }                                
            }       
            // this.InsuranceText = this.InsuranceText + "被保人年龄区间" this.InsurantArr.InsuredQuantityAgeMin
            // {{restrictive.insuredQuantityMin}} - {{restrictive.insuredQuantityMax > 0 ? restrictive.insuredQuantityMax : ''}}
        }         
        if(sessionStorage.getItem('planInfos')){
            this.planInfos = JSON.parse(sessionStorage.getItem('planInfos'));
        }
        //缓存赋值
        if(JSON.parse(sessionStorage.getItem('ApplicantList'))){
            if(this.insutanceData.code != JSON.parse(sessionStorage.getItem('ApplicantList')).code){

            }else{
                var ApplicantList = JSON.parse(sessionStorage.getItem('ApplicantList'))
                delete ApplicantList.code;
                this.ApplicantList =  ApplicantList;
                // console.log(this.ApplicantList )
                for(var i = 0 ; i < this.typeCode.length ; i ++){                    
                            var item  = this.typeCode[i];
                            if(item.code == this.ApplicantList.CertificateType){
                                this.cardType = item.name;
                                this.cardIndex = i
                            }                                                  
                        } 
                this.genderIndex = ApplicantList.Gender;
                //缓存赋值
                if(JSON.parse(sessionStorage.getItem('InsurantArr'))){
                this.InsurantArr = JSON.parse(sessionStorage.getItem('InsurantArr'));
                    this.InsurantArr.map(item=>{
                            this.RelationIndex = item.RelationshipWithPolicyholder - 1;  
                            this.InsurantList = item;  
                        })
                    this.typeCode.map((item,index)=>{
                    if(item.code ==  this.InsurantList.CertificateType){
                            this.InsurantCardType = item.name;
                            this.InsurantCardIndex = index;
                        }
                    });
                    //缓存赋值
                    if(sessionStorage.getItem('tradeName')){
                        this.tradeName = sessionStorage.getItem('tradeName')
                    }   
                }
            }                
        }      
        this.orderbindData();
        //缓存赋值
        if(JSON.parse(sessionStorage.getItem('updataModel')) ){
            var updataModel = JSON.parse(sessionStorage.getItem('updataModel'));
            this.bindData(updataModel);
            this.amount = updataModel.amount;    
        }         
        if(this.$route.query.uw_id){
            this.Uwid = this.$route.query.uw_id;
        }   
        if(this.insutanceData.addressType){
            // Indicator.open()
            // /PropertyProducts/Allianz-AW/Address?addressType=AddressV1_2     
            // axiosGetAPI('/PropertyProducts/'+ this.insutanceData.code +'/Address?addressType=' + this.insutanceData.addressType).then(res=>{
            //     Indicator.close();
            //     if(res.status == 200){
            //         this.addressJson = res;
            //     }                
            // })
        }
        
        if(this.insutanceData.tradeInfos.split(',').indexOf("-1") == -1){ //职业编码级联选择。
            this.isTrade = true;
            axiosGetAPI('/PropertyProducts/' + this.insutanceData.code + '/Trades?tradeCategories=' + this.insutanceData.tradeInfos + '&tradeType='  + this.insutanceData.tradeType).then(res=>{ 
                 if(res.status == '200'){
                        // 变成colums ：[{ text:'1', children:[{  text:'11',   children:[]   }  ] }]                                                                     
                        this.tradeColumns = [];
                        var tradeName = '';        
                        for(var i = 0 ; i < res.result.length ; i++){ 
                            var item = res.result[i]; 
                            tradeName = item.tradeName;                    
                            var _obj = {text:'',code:'',children:[]};
                            _obj.text = item.tradeName;
                            var children = [];            
                           item.subTrades.map(_item=>{
                                var childrenObj = {text:'',code:'',children:[]};
                                childrenObj.text = _item.tradeName;
                                childrenObj.code = _item.tradeCode;                                
                                children.push(childrenObj);                                                             
                                var secondChildren = []; 
                                _item.subTrades.map(data=>{
                                    var secondChildrenObj = {};
                                    secondChildrenObj.text = data.tradeName;
                                    secondChildrenObj.code = data.tradeCode;
                                    secondChildren.push(secondChildrenObj);
                                    childrenObj.children = secondChildren;                                                                                                    
                                })               
                                 _obj.children.push(childrenObj); 
                           })                           
                           this.tradeColumns.push(_obj);                           
                        }    
                 }                                       
            })
        }       
    }
}
</script>
<style scoped>

.title{
    border-bottom: 0.01rem solid #DDDDDD;
    padding-left: .3rem;
    text-align: left;
    font-weight: bold;
    font-size: .32rem;
    line-height: 1.06rem;
}
.view01{
    padding-left: .3rem;
    margin: .2rem 0 .2rem 0;
}
.view01 dd {
    font-size: .28rem;
    display: block;
    border-bottom: 0;
    height: .56rem;
    line-height: .56rem;
    text-align: left;
}
.baozhang {
    position: absolute;
    right: 10%;
    top: 2rem;
    border-left: 0.01rem solid #d4d4d4;
    padding-left: .35rem;
}
.view01 dd>i img {
    width: 1rem;
}
.tiaokuang {
    position: absolute;
    right: 3%;
    top: 2.03rem;
}
 .view01 dd>p strong {
    color: #999999;
    display: inline-block;
    width: 1.52rem;
    font-weight: normal;
}

.bottom-fixed{
    margin-bottom: env(safe-area-inset-bottom);
}
.read-area {
    font-size: .24rem;
    font-family: PingFangSC-Light;
    color: #666;
    padding: .2rem .3rem;
    position: relative;
    white-space: normal;
}
.read-area .checkbox-icon {
    position: absolute;
    width: .3rem;
    height: .3rem;
    background: #f60;
    margin-top: .05rem;
    color: #a5a5a5;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAKlBMVEUAAADDw8PBwcHCwsLBwcHU1NTQ0NDBwcHCwsLCwsLCwsLr6+vk5OTd3d1i4ZWfAAAAC3RSTlMA9hpt8vn14r2eUIq7iTgAAAB3SURBVBjTYwACJotC8WYFIAPEnph7es81SQhvSfRuINjqBWIzy+wGg4MGQM7C0xDOHimgDp/dUHBEgYEzGsbZOoFBcTccCDGYITjJDL0Izg2GGgTnOIM0grMRmbMFRRmKAShGo1iK4hwUhyJ7Ac1zCG9jBggiqAAfZJqcRUCbwAAAAABJRU5ErkJggg==) 0 0 no-repeat;
    background-size: contain;
}

.item-wrapper {
    padding-left: .5rem;
}

.item-wrapper a{
    color: #546AAF;
    font-size: .24rem;
    line-height: .4rem;
    font-family: PingFangSC-Light;
    margin-left: 0.2rem;
    /* padding-bottom: 0.05rem;
    border-bottom: 0.01rem solid #546AAF; */
}

.close-icon{
    display: inline-block;
    width: .42rem;
    height: .42rem;
    margin-top: .28rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAArCAMAAAA5QerMAAAAM1BMVEUAAACcnJycnJyjo6OcnJybm5udnZ2cnJydnZ26urqbm5ucnJycnJycnJycnJycnJybm5uW+F15AAAAEHRSTlMAas4ZEtk85EsF9cS2qHx3XWMJ1QAAAG5JREFUOMvt0DkOgDAQwMDlviH/fy004IJIriPF9VSOWpktc/zqxyw9UvOT7Zq1TXotMg1dqEWaRZpFmkWaRapFukWqnV5pXY8VySWemRxOs/zkr0n+usSaxKrEusSKdLshAzvn6Nh+ErsvUSuxG4pMBXcTNUT/AAAAAElFTkSuQmCC);
    background-size: .42rem;
}

.read-area .active{
    background-image: url(data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAUVBMVEVHcExVbK9YcK9Ua7BXa7JVarBUa69Uaq9Va7BVbcJUa7FVarBVa7BVa7BWbrNUarBVa7FUaq/////4+fyAkcSZps9gdLTe4u+frNJXbLB8jcHqdHtrAAAAEXRSTlMAYyCFTOSw7dQKed+smzXCclXwAmUAAAFUSURBVEjHpdfbloIwDAXQeIGUO6c6IP7/h84DznBrShrPk7rYa4VQ2kgUSts3XcXTxFXX9C0pc68Zm3B9P1dFuVMfWxZxd8kgJLvEinSIxIkF33CSW/jucpwmD9zp1UERdz04hiq8k4WDMm5bbQ518qR+Cr29IynL83Rp0P2vMyTms/qKLBVmc2dLJKckIiJOh2xo6dLYWnvxtPpcJ1T6Mw6bWlut834tW+rVzj/ey/eeGr17rn5oqDM5dFRtLxl0DtWuqc/HS+XAtH46eD+8f2kcpi0cRn+QQYdpV+pRhh340JydFByqw+PYSsmhOy6AtRQdmsCSW6Ts0IcW+Z+MOLTB12qWMcfCizyM3vuIQy1tHbMU3bwnsyRlx5HtcRhl99kehQ15eJ9tyOYjwH7o2I8588FqP8rtw4N5XLEPSPaRzD4EfjF22gfdL0Zr+zCv/vvwC2gGpCad5uTMAAAAAElFTkSuQmCC)
}

.read-content {
    width: 100vw;
    max-width: 7.5rem;
    height: 100%;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    margin: auto;
    /* margin-top: .85rem; */
}
.healthCheck{
    font-size: .28rem;
    color: #333333;
    margin-top: 0.2rem;
}
.healthCheck .healthSpan{
    border-radius: .5rem;
    height: .56rem;
    line-height: .56rem;
    text-align: center;
    padding: 0.1rem 0.4rem;
    margin-right: .3rem;
    border: 1px solid #999999;
}
.healthCheck .active{
    border: .02rem solid #546AAF;
    font-size: .28rem;
    background: #546AAF;
    color: #fff;
}

</style>