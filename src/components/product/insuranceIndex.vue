<template>
    <div class="page-container">
        <div class="slider">
            <div>
                <!-- <div class="hz-head clearfix" >
                    <span style="margin-left:0.3rem;" class="hz-radius fl js-history" @click="openBack">
                        <img src="../../assets/images/w-back.png" style="height: 16px;margin-top: 7px;" alt="">
                    </span>
                    <span class="hz-radius fr" style="margin-right:0.3rem;float:right;" >
                        <img src="../../assets/images/share_icon.png" style="height: 16px;margin-top: 7px;" alt="">                    
                    </span>
                </div> -->
            </div>            
            <img style="width:100%" :src="headeBanner" alt="">
        </div>
        <div style="background:#fff">
            <h1 class="base_title">{{productModel.productName}}</h1>
            <div class="base_bzqx">
                <template v-for="item in labelList"  >
                   <span>
                      {{item.title}} ：{{item.content}} <span class="inforIcon" v-show="item.remark" @click="isLabel= true">&nbsp;</span>
                      <div v-show="isLabel" id="inpoTextMsgBox2" @click="isLabel = false"></div>
                        <div v-show="isLabel" class="inpoTextMsgBox2">
                            <span class="s1" style="left: 2.9rem;"></span>
                            <span class="s2" style="left: 2.9rem;"></span>
                            <div>
                                {{item.remark}}           
                            </div>
                        </div>
                    </span>                                 
                </template>                   
            </div>            
            <div class="dl_wrap grey" style="padding-bottom:1rem" >
                <h3 class="bzxmH3" style="padding-bottom: 0;">保障项目</h3>
                <div class="bzxmZimg" @click="showSecurity = true" v-if="safeguardList && safeguardList.length > 0">
                    <img class="bzxmRightIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAh1BMVEVHcExmZmZmZmZ4eHhnZ2dmZmZmZmZmZmZnZ2dmZmZnZ2doaGihoaFnZ2dycnJpaWlsbGxnZ2dmZmZnZ2dpaWlnZ2dmZmZmZmZpaWlmZmZnZ2dnZ2dmZmZmZmZmZmZmZmZnZ2dpaWlsbGxnZ2dnZ2dnZ2dnZ2doaGhnZ2dqampoaGhmZmZmZmZw1yoFAAAALHRSTlMA8foG1aeEk/iWik4DxgowEGzf2Te00KAkwK5E47h9vcwpF1brYlNnPR5/W4qBzlMAAAITSURBVFjD7ZfbdoIwEEWHYAUFFQTxfq311v3/39cHUQMCndpXzxPMSrYyOTNJROQ4dfyX5EyPIiIj/qGZSMy/dJTe/wBT8YHMe0ktwBEAT15SB/DfgDegBBhkGu8Og1pApnO/068DOMr6OdcBPG391Sbxs63Q0X0b6Q1oBITf3avivjUqPHm9oe8k68vgN0Cnwq1uvH+YOPlsBljFtMuHzIfFOuhtmwCbR8Xmfo/NUy3PmxrKxjfGGGOSfNQln9X66HqzxfXZHPSr8Hmd4U2ur+kMAH+gBUx8gMT66vkeYNhXAmYAvajAXACsdIAUYLErBgc+4OxUgDFAUI6uAGININwDvadwf2/5rBFwsn+qtPYmUgC+Cg38oQBgoACsAFORmq2VmkaABywqABHAlwLQBpwKwBngWwGIAfo1yZ0rAEGlDXIjnBWAyADj53gGDFVOXANmUvnHPBXgC2BZNmICsLXytKkFhAlAuxgbAYzuDXNmhml9OR8A8EIrL0sA3/ouV6ShI40B2JzuHeraYVulxa0HuPlVIlsFaXro3hv0uq8ESLSuPuSsXSVAwk5pqr8EYOkqASJp4UY0muQnMZvw2+Y67+Q7QuJtH2e5kasGiMguDYJ0Z/ckm/D37f1KmLkvA3LCbZIDJB9qXaKbxW7t5q8Xz56IhGMgs6vuL4pEJOw62aBoebUqOu1hvGmpNSqflH4AYEHl+g4jIJsAAAAASUVORK5CYII=" alt="">
                    保障释义
                </div>
                <div class="bzxmZ">
                    赔偿限额最高为保险金额（人民币：元）
                </div>                      
                 <div class="guarantee-plan" v-show="plansList.length > 1">
                    <ul class="condition-slide">
                           <li class="slid-item" :class="{ detailPlansSelected:plantIndex == index }" @click="plantBtn(item,index)" v-for="(item,index) in plansList" :key="index" >
                               <!-- <span class="jt"></span> -->
                                <span class="wd">{{item.packageName}}</span>
                           </li>
                     </ul>
                </div>

                <div style="margin-top: 0.3rem;" v-if="packageList && packageList[plantIndex] &&  packageList[plantIndex].planInfos && packageList[plantIndex].planInfos.length > 0  ">
                    <div class="dl01 bzxm_dl ng-scope" v-for="(item,index) in packageList[plantIndex].planInfos" :key="index">                  
                        <div class="bzxm_dl_dt">
                            <p class="bzxm_b" v-html="item.planName"></p>                            
                        </div>
                        <div class="cell-container" v-show="showBasic" v-for="(_item,_index) in item.dutyInfos" :key="_index" >
                            <div class="listfl" v-html="_item.dutyName"></div>                            
                            <div class="listfr" v-show="_item.isContain == null && _item.isOptional == null">{{_item.insuredAmount + _item.insuredAmountUnit}}</div>
                            <div class="listfr" v-show="_item.isContain != null && _item.isOptional == null">{{_item.isContain ? '包含' : '不包含'}}</div>
                            <div class="listfr" v-show="_item.isContain == null && _item.isOptional != null">{{_item.isOptional ? '可选' : '不可选'}}</div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>             
                 <div class="dl01 bzxm_dl ng-scope" v-if=" packageList && packageList[plantIndex] &&  packageList[plantIndex].inFormList && packageList[plantIndex].inFormList.length > 0">
                    <ul class="uicss">
                            <li class="licss" v-for="(item,index) in packageList[plantIndex].inFormList" :key="index">
                                <font class="bzsycircles">●</font>
                                <span v-html="item"></span>
                            </li>
                    </ul>
                </div>
                <div class="tiaokuan" v-show="seePDFList.length>0">
                    <p>**以上信息仅供参考，详细信息以保险单及条款为准 </p>
                    <span>查看</span>
                    <a :href="item.url + ''"   target="_blank" v-for="(item,index) in seePDFList" :key="index">{{item.title}}</a>  
                </div>
                <div class="jiange"></div>
                <div class="tbts" v-show="specialRemarkList.length > 0" >
                    <h3>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAMAAABZAGpeAAAAh1BMVEVHcEzCzuPCzuLCzuLCzeLCzuLBzuLN2+/CzuL////F0ePP3erCz+PCzuLCzuLR2OzE0OTF0uPCzuLC0OPBzuHK1+bE0+bCzuLI0+nDz+LCzuHCzuLCzuHU7f/Dz+PCzuLD0OXDzuLDz+PCzuLCzuLCzuHCzuLE0+LCz+PDzeHBz+LBzuLBzeFun4hvAAAALHRSTlMAdsGAhcuhD+UCLQlc2+EMKSKLQ+gUG5MWcPnSvQVW7zWYTLG4xakRbGaE9LSnyH4AAAFfSURBVBgZzcHXYoJAAATAFTzh6N3eW8r+//cFQlCQo/iWGajtTAdv2fCKt2gUeItGgQESdRoF+mWeluJJo0Cd7sZoisl1igeNAjURGaFJ3sj1HRWNVzxFpJfhxfZMijv+LFdLPExJM0SLfSGFgT82Hr5IM4SCvSEjtMRkEkDJ1/iBX9vMWkiUDkwCdJAL5EJdMLfafBgohAb63OcrVvZLiSGBy7qLgX7Wnk1rA30WHl9dJHrM2PaJbhYVEh+d5lRx0BDo04JuAfCockYu0KcF3YLLkgtkVEqQc1nycGRpDhyoZgOYs3QEfKPgA4iptkDONwo+6iyqSXQwqOShk6DKDJ0mVDmhU7pn21qi25JtMXrIM19F6GULNt0k+jlsOmBAygZTYsiVdUcMmrDuhEHhN59cG8OCaFbRU/wLoTArGxsj7PhkYYStM6mcMFK2cxxnZ2CsbcKChtFuzK10qPwAb1llvzP95jwAAAAASUVORK5CYII=" alt="">
                        特别提示                                            
                        <template v-for="(item) in specialRemarkList"  >
                            <a :href="item.url + ''"   target="_blank"  v-html="item.title"></a>
                        </template>
                         
                    </h3>                    
                </div>
                <div class="jiange"></div>
                <!-- <van-sticky>  //产品介绍，理赔流程等
                    <div class="insuranceNavBox" style="height:1.02rem;">
                        <div class="insuranceNav" id="insuranceNav">
                            <a href="javascript:void(0)" @click="cutoverTag(item,index)" :class="{current : index == tagIndex}"  v-for="(item,index) in cutoverTagList " :key="index">{{item}}</a>
                        </div>	
                    </div>
                </van-sticky> -->            
                <div class="iTag_1" v-show="isTage_1" v-if="imageList && imageList.length">
                     <img   v-lazy="item.url" alt="" v-for="(item,index) in imageList"   style="width:100%">                     
                </div>
                            
                <!-- <div class="iTag_2" v-show="isTage_2" >
                	<h3 class="insuranceTitle" style=" padding-left:.3rem;">
                        理赔流程
                    </h3>
                      <div class="hotlineRed" style="margin: 0 .3rem .4rem;" v-for="(item,index) in claimProcessList "  :key="index">
                       <div class="hotlineRedContent">
                            <p v-html="item.title"></p>
                            <p class="content" v-html="item.infoList[0].content" ></p> 
                            <a :href="item.infoList[0].fileList[0].url" style="color:blue" v-if="item.infoList[0].fileList.length > 0">
                                {{item.infoList[0].fileList[0].title}}
                            </a>
                       </div>
                    </div>
                    
                </div>
                <div class="iTag_3" v-show="isTage_3" id="Question">
                	<h3 >
                        常见问题
                    </h3>
                    <dl class="qna" v-for="(item,index) in commonProblemList" :key="index">
                        <dt>
                            {{item.ask}}
                        </dt>
                        <dd>
                            {{item.answerList[0]}}
                        </dd>
                    </dl>                    
               	</div> -->
            </div>
            <!-- 分享页面才显示 -->
            <div class="introducerInformation" v-show="salesmanInfo.mobile">               
                 <span>客户经理：{{salesmanInfo.name}}</span>     
                 <div style="display: flex;justify-content: space-between;align-items: center;">
                        <a :href="'tel:' + salesmanInfo.mobile">
                            <img style="height:16px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADUElEQVRoQ9WaS6hOURTHf/9ioJh5DJgTYsAEkTshQl2lSF4TEgbyCBOkPDJRJAPluklSJG8mJG8lDFwZGZgxMPGcbK06tz5f33fO2ufsc25W3dH332ut315nn733Olf856Yy+YcQRgNjgHGSHpbxkWpMFEAIYSNgfzNaErgOnJZ0L1VSMX5cACGE9cDWtsTb42yQ1BcTPIW2ECCEcADY7wj2HZgt6Z1Dm0ySCxCR/GBC9yUtTJadw1FXgBDCEuCGw0e7ZLWkiyXGlRqSB2CLc2kJr7ckGXwjlgcQKmQwV9LjCuPdQ+sCOCJpnzuLCsK6APolrauQl3toHsAPYITb07/Cxt5GeQCfgfElARrb1PIA3gLTSgB8AqZKso2tdssDeADMj8zgK7BO0u3IcaXleQC7gWMRnt8AmyS9jBhTWZoHMAt46oxwUJKdmRq3orOQdyH3DNW9oAjgPLDWMa19kjY4dMklRQC9wFVn1FmSnju1yWSe+8AAMMkR8ZKkVQ5dUokH4DCw1xm1V9I1pzaJzAMwE3jljPZQUo9Tm0RWCGBRQgjexWzyzZLOJMnO4cQLYDuy7cwe+wDYgv7mEVfVuACyKlwBljsDHpB00KmtJIsBiL0jN3IidQNkVTiZ9Yc8s2b3iTmS7IxUm8UCjAOslejZFyzpAUmTa8seiALIqrAauBCR1B1JiyP0UdJogAziHGDtRq9tl3SikziEMBKwveappD9eh4O6sgD2KN2PvLH9c2INIawEtlk7MkvmZ+bTOhovvCClALIqLABiO9I7gNd28QEMoJNZFQzCdb8oDZBB7ASOe2crUndKklUo1yoBZBD9wJqiQCV/vyjJXhpdLQWA9Y4eZQuxZJ65w3K7fJUBsipMAN4Do+ogsCazpJudfCcByCCmA3XtujckLasVIIOwV+KTOqogqeNkJ6vAYNIhBDs6WCWGpwRpDCCrhEFcBqYkgvgoaWLtj1BrgKwSR0t+5WnP1T7jbmkUoOWR2gMcAoaVrMYXSWO7jU2+BjoFCiHMAwxkUSREYcOsEYCWaljfyD6YDx7guvHYfXqXpLNFwI0CtIDYUXwF0H5P+AXcBaxZ7NpThgSgBcT+YaT1TfVM0u+iWW/9fUgBYhLtpv0L0E78MW/Lz14AAAAASUVORK5CYII=" alt="">                    
                            <span style="margin-left: 0.1rem;color:#fff;">拨打电话</span>
                        </a>                        
                 </div>                 
            </div>
            <div class="new_footer">
                <!-- <img class="kufu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABoCAMAAAANbMR7AAAAilBMVEVHcEy8vLy+vr68vLy8vLzAwMDBwcHf39+8vLy8vLzGxsa8vLy8vLy8vLy8vLy8vLzNzc2+vr68vLy9vb28vLy8vLy8vLy8vLy+vr68vLy+vr69vb29vb28vLy8vLy9vb28vLy8vLy8vLy8vLy9vb28vLy9vb28vLy8vLy9vb29vb29vb28vLy7u7tJnyrIAAAALXRSTlMAWyP0+BgTA9r7DOnl7qC0ByrBOJeIzU0e0jBUgN/HP5CpaHRvrnikukNjR9W9F1XMAAAE0klEQVQYGb3BB2KiUAAE0KF+erX3XpLM/a+3mwgKfFRU9D08IRopk+VsOPVt3bV6SbDuqwLvJuaTmU2JFm5ivI/obzVe5XVGeAu16/GO4cZE2+Ilm9C6JtoUL9mU1jXRFmdh8wH+F9rxPeWDEhWvc/as8pPO5hgPTBEZ6qi/C3o2K/Q1XhVbLJtNUoEKp7+wWLZ18JKxxqLpZIAr0o7PIivGC7osmn3jFmc1ZYHWx9M6LJh9455o5fHCVvAcEfDCV9BE1LV58YVniCUv9iYaGvV4scITFjzTxmhOdHkxxsM2PLNiPGSsMaeneNCYZwcHD4qnzLkqHqJqzG0jPGxgMTeM8ADRY24v8ARjyNwCD+gyt8RzTIu5bzR2ZG4W4Umqy4xroqHIYsYy8bRUZyZAQztm9Bgv+GIuRSOGxswGL9kyM0MjATMhXmN6zChoIGbGN/CiPjNTgfs6zKzxspAZBXcZOk8sgZfFNk96uKvLTB8tWDBzxB2Rz5Me2mDoPAlxR58ZBa3o8MQ2cYMYpDOeTAVaETOzE7hCzDsuz9ZoyYEZtzMXqNG3WGSgJQovrD6q1JAlCdri6CwIVZSkPstWaM2SRX6Kgr7OCgOtUVii93E2t1lhoT0Gy+w5MobLqg5aZLHMNfBHJJQoaFHAikTgl0KZihatWKXgP2FRYgu06MgqSwBQKLPQpgElCoAZZSFapbNqBpg2ZR20ymKVbUJhjS5a1aNEQcAaE7QqoSTAgTU2aFVIyQE/rLFCq5aU/MBnjTUk8/XKxD1q4LqBiqqQEh86a0xQ4SQk9TFuUz3+56moSCjR4bHGAhVb/rLnuCXq8U+Aih4lHnqssUeZYfOPZ+KGLk9cVFiU9BCyRoiyETMhrvtmxkWFRkmILmsMUWbYzCxwTawxE6DMoKyLOWvYEcqWzG1QbzBlRo9RNqdsDuGzxghlhsvcDnVUj7kVKr4o8QWwZI0vVHzzbCEgmbvMhajqULIHMGKNDqq6PJupKBM7m7mpgaofSkb4b0tZD1ViyzN94qDgOOSZH6PKoGSLXyPWGKAqSnjhL0Y4Mb96vLCPkIwpGeHPhLINJOaQRX7Y6S72QxbpY8j2rJrgRBwoSSBzEt6mfUMWaaw4CGRMixIDsmjLW9wUNcassEycmTNWbVBno/Oqg4E6W5bNTBQ4ISumAnVGP6yn7wTqqDZLQgdliscyBbXEymWN/QD1FizyFEicicdfOk+GuMJZWyzTghGuMDVeeBMHtdJFMtVDZvq4Ku0MbWbc7ZeDqybMuMkixU2GzpMDbnHm49Vuo/RV3DLQefKD+zo8sU28bMnMF+5TbZ4M8Ko5M55AA3v+8SO8yJkys0ITqs9fa7wqYGYo0Eg6JLUdXqUwN0dTcRrhVSONmSU+yfCY8Qf4IGfI3Bgf5MyYC/BBZo85y8HnDH6Y82N8ztFlzj7ic9Y2zxR8jHrgxQ6fItY6L9ZoVzw5DK2CJBhH+DP+YcEKrTKWlHkKIMZDFtgKWpV6rBV0PRZ5KVo1cNlIYqBdCZuwuwLtOrKJXoq2BbxPXwu0bsp77M4Ab2DzNrszwDsIm7dMJwO8iccbugJvs+QNKt5nzOt6eCMx5FV9vNNI4xUB3quvsVYY4c1GPcq0icD79feWxgI32Rl40D8TTkbLut0HTwAAAABJRU5ErkJggg==" alt=""> -->
                <span class="footer_submit" @click="toNext">
                    立即购买
                </span>
                <span class="tip" v-show="amount == ''"> {{tip}} </span>
                <span class="footer_price ng-binding" v-show="amount != ''">￥{{amount}}</span>
                <span class="footer_text" v-show="amount != ''">起</span>
            </div>
        </div>
        <!-- 保障释义 -->
        <van-popup :lock-scroll="true" position="bottom"  v-model="showSecurity" style="height:100%;">
            <div class="read-content">
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="closeSecuity">关闭</span>
                    <h3 class="two_line">保障释义</h3>
                </div>
                <div class="bzsy_content_first bzsy_content" v-for="(item,index) in safeguardList" :key="index" >
                    <div class="jiange"></div>
                    <dt class="ng-binding" v-html="item.title">                        
                    </dt>
                    <dd  v-for="(_item,_index) in item.subItems" :key="_index">
                        <div class="clear"></div>
                        <div class="profitC">
                            <p>
                                <font>●</font>
                                <font v-html="_item.title"></font>
                            </p>
                        </div>
                        <span v-html="_item.content[0]"></span>
                    </dd>                                     
                </div>
            </div>
		</van-popup>
        <!-- 健康告知弹层 -->
        <van-popup :lock-scroll="true" position="bottom" v-model="showHealthTold" style="height:100%;" v-if="healthNoticeInfo != null && healthNoticeInfo != '' ">
            <div class="read-content">
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="showHealthTold = false">关闭</span>
                    <h3 class="two_line">健康告知</h3>
                </div>
                
                <div class=""  style="margin-top:1rem;margin-bottom:1.6rem;" v-if="healthOptions.length > 0" >
                    <div class="healthP" style="margin: 0.21rem 0.3rem 0.3rem;" v-if="healthNoticeInfo != null" v-html="healthNoticeInfo.title">
                        
                    </div>
                    <div style="margin:.21rem .3rem .3rem .3rem" v-for="(item,index) in healthOptions" :key="index">                        
                        <p class="healthP" style="margin-top: .1rem;" v-html="item.content">                            
                        </p>                      
                    </div>
                </div>               
            </div>
            <div class="new_footer" style="display:flex;justify-content: space-around;padding: 0.3rem 0px 0px;height: 1.4rem;">                               
                    <div class="healthSelect" @click="submitBuyBtn('nonNext')">
                        部分不符合
                    </div>
                    <div class="healthSelect" @click="submitBuyBtn('next')">
                        全部符合，继续投保
                    </div>                
            </div>
		</van-popup>
        <!-- 被投保出生日期选择 -->
        <mt-datetime-picker  @touchmove.native.stop.prevent   :closeOnClickModal="false" ref="applicantBrithday" v-model="applicantBrithday" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="applicantBirthConfirm">
		</mt-datetime-picker>
        <!-- 保险期间 日期选择 -->
        <mt-datetime-picker  @touchmove.native.stop.prevent  :closeOnClickModal="false" ref="insuredBirthday" v-model="insuredBirthday" type="date" :startDate="applicantStartDate"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="insuredBirthConfirm">
		</mt-datetime-picker>
         <!-- 保险期间 日期止期选择 -->
        <mt-datetime-picker  @touchmove.native.stop.prevent  :closeOnClickModal="false" ref="endinsuredBirthday" v-model="endinsuredBirthday" type="date" :startDate="applicantStartDate"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="insuredEndBirthConfirm">
		</mt-datetime-picker>
        <!-- 特别注意 -->
        <van-popup :lock-scroll="true" position="bottom" v-model="showSpecialList" style="height:100%;">
            <div class="read-content">
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="showSpecialList = false">关闭</span>
                    <h3 class="two_line">特别提示</h3>
                </div>
               <div class="bzsy_content_first bzsy_content" style="padding:.2rem .24rem .3rem .24rem" >
                   <div v-for="(item,index) in specialRemarkList" :key="index" >
                    <p style="margin: 0.2rem 0 0.2rem 0;font-size: 0.3rem; font-weight: 700;padding-left: .38rem;" v-html="item.title"> </p>                   
                    <ol style="padding-left: .38rem;" >
                        <li  v-for="(_item,_index) in item.content" :key="_index" >
                            <div class="clear"></div>
                            <div class="profitC">
                                <p>
                                    <font v-html="_item"></font>
                                </p>
                            </div>                          
                        </li>
                    </ol> 
                    <ol style="padding-left: .38rem;"   >
                        <li  v-for="(_item,_index) in item.subItems" :key="_index" >
                            <div class="clear"></div>
                            <div class="profitC">
                                <p>
                                    <font v-html="_item.title"></font>
                                </p>
                            </div>
                            <p v-for="(items,indexs) in _item.content" :key="indexs" v-html="items">                                
                            </p>                           
                        </li>
                    </ol>                    
                   </div>
                </div>
            </div>
		</van-popup>
        <!-- 计算保费 -->
        <div class="divBTM-new" id="divBFJS" style="opacity: 1; top: 0px;" v-show="isAmountPremium"> 
            <div class="popups_bfjs" style="bottom: 1rem;transition: all 0.3s ease-in 0s;">
                <div class="bzsy_popups_head">
                    <span class="head_right" @click="closeAmount">关闭</span>
                    <h3 class="two_line">保费计算</h3>
                </div>
                <div class="popups_content_bfjx">
                    <div class="time_box01 " style="margin-top: 0.85rem;">
                        <div v-if="showApplicantAge"> 
                            <div v-if="BirthdayOptions.length > 0">
                                    <div class="time_list">
                                        <p>{{applicantAgeList.content}} </p>                           
                                    </div>
                                    <div class="time_list">
                                        <div >
                                            <span class="timerSelect" :class="{timeerchecked:BirthdayOptionsIndex == index}" v-for="(item,index) in BirthdayOptions" @click="birthdayCheckBtn(item,index)" :key="index">
                                                {{item.name}}
                                            </span>
                                        </div>
                                        <p class="applicantTime" @click="selapplicantBirthday">
                                            <span>{{applicantDate}}</span>
                                            <i class="timeIcon"></i>
                                        </p>
                                    </div> 
                            </div>                           
                            <div v-else>
                                <div class="time_list">
                                        <p>{{applicantAgeList.content}} </p>    
                                         <p class="applicantTime" @click="selapplicantBirthday">
                                            <span>{{applicantDate}}</span>
                                            <i class="timeIcon"></i>
                                        </p>                       
                                </div>
                            </div>                         
                            <span class="ageRange" v-for="(item,index) in applicantAgeList.labelList" :key="index">{{item.title + '：' + item.content}}</span>
                        </div>
                        
                        <div v-if="insuranceDataList.styleType && insuranceDataList.styleType == 'InsurancePeriod' ">
                            <h4>{{insuranceDataList.content}} <span class="inforIcon" v-show="insuranceDataList.remark" @click="isShow = true">&nbsp;</span></h4>
                            <div v-show="isShow" id="inpoTextMsgBox2" @click="isShow = false"></div>
                            <div v-show="isShow" class="inpoTextMsgBox2">
                                        <span class="s1" style="left: 2.9rem;"></span>
                                        <span class="s2" style="left: 2.9rem;"></span>
                                        <div v-html="insuranceDataList.remark">                                                       
                                        </div>
                            </div>
                            <div v-if="insuranceDataList.options.length > 1">
                                <span class="timerSelect" :class="{timeerchecked:dataTypeIndex == index}" v-for="(item,index) in dataTypeOptons" @click="timerCheckBtn(item,index)" :key="index">
                                    {{item.name}}
                                </span>
                            </div>
                            <div style="margin-top:0.3rem">
                                <div>
                                    <span class="timeStart">起期</span>
                                    <span class="timeEnd">止期</span>
                                </div>
                                <div class="time ng-binding ng-pristine ng-valid" style="float:left" @click="selInsuredBirthday">
                                    <span>{{startTime}}</span> 
                                </div>
                                <div style="margin: 0 .4rem;float:left">至</div>
                                <div class="time ng-binding ng-pristine ng-valid" :style="setBackground" style="display: inline-block;cursor: default;" @click="selInsuredEndBirthday">
                                    <span>{{endTime}}</span> 
                                </div>
                            </div>
                        </div>
                        <div class="checkBoxList" v-for="(item,index) in insuranceInforList" :key="index">
                                <p class="CheckListdiscription">{{item.content}}</p>
                                <div style="float:right;" class="weui-switch"  >
                                    <p class="checkItem" v-for="(_item,_index) in item.options "  @click="socialBtn(item,_item,_index)" :key="_index" :class="{checkBoxActive:item.active == _index}">{{_item.text}}</p>
                                </div>    
                                <div class="clear"></div>                            
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./../../assets/css/product.scss";
import "./../../assets/js/rem.js";
import { dialog } from "vant";
// import anlian from './../../assets/json/alin.json';
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator,Toast } from 'mint-ui';
import wx from 'weixin-js-sdk';
export default {
    data(){
        return{
            isLabel:false,
            detailSelect:0,
            plansList:[],
            plantIndex:0,
            showBasic:true,
            showAddition:true,
            showSecurity:false,
            cutoverTagList:["产品详情","理赔流程","常见问题"],
            tagIndex:0,
            isTage_1:true,
            isTage_2:false,
            isTage_3:false,
            isAmountPremium:false,
            applicantBrithday:new Date(this.Common.Public.GetDateStr(1)),
            startTime: '',
            endTime:'',
            insuredBirthday: new Date(this.Common.Public.GetDateStr(1)),
            endinsuredBirthday: new Date(this.Common.Public.GetDateStr(1)),
            startDate: new Date('1949-01-01'),
            endDate: new Date(this.Common.Public.GetDateStr(0)),
            applicantDate:'',
            applicantValue:'',
            applicantStartDate:new Date(this.Common.Public.GetDateStr(1)),
            checked:true,
            socialSecurity:['有','无'],
            socialIndex:0,
            insuranceData:{
                InsuranceBirthday:'',
                startTime:'',
                endTime:'',
                otherTargetObjectList:[]
            },
            showHealthTold:false,
            genderList:[{
						"text": "是",
						"value": "true"
					}, {
						"text": "否",
						"value": "false"
					}],
            genderIndex:-1,
            productModel:{},
            bannerList:[],//头部banner
            labelList:{},//保障范围
            safeguardList:[],//保障释义
            seePDFList:[],//保险条款
            specialRemarkList:[],//特别提醒
            packageList:[],//保障计划及保障详情
            healthNoticeList:[],//健康告知
            healthOptions:[],//健康告知选项
            healthNoticeInfo:{},
            headeBanner:'',
            showSpecialList:false,
            amount:'',
            imageList:[],
            targetObjectList:[],
            SKUList:[],
            showApplicantAge:false,
            applicantAgeList:{},
            insuranceDataList:{},
            insuranceInforList:[],
            isShow:false,
            dataTypeOptons:[], //自选日期
            BirthdayOptions:[],
            dataTypeIndex:1, 
            BirthdayOptionsIndex:0,
            maxapplianceDate:'', //被保人出生日期最大时间，天
            minapplianceDate:'', //被保人出生日期最小时间，天
            maxapplianceYear:'', //被保人出生日期最大时间，年
            minapplianceYear:'', //被保人出生日期最小时间，年
            insuranceList:{}, //保险计划用于skucode   
            SKUCode:'',
            SKUOptions:'',
            tip:'',
            tradeInfos:'',
            tradeType:'',
            productCode:'',
            code:'',
            UnderwritingUrl:'',
            claimProcessList:[],
            commonProblemList:[],
            isSocialSecurity:false,
            SocialSecurityFlag:null,
            SmokeType:null,
            appId:'',
            distributorCode:'',
            restrictive:{},
            ReadPDFList:[],
            minInsuranceDate:'',//被保人投保日期最小时间,天
            minInsuranceYear:'',//被保人投保日期最小时间,年
            maxInsuranceDate:'',//被保人投保日期最大时间，天
            maxInsuranceYear:'',//被保人投保日期最大时间，年
            insuranceFixedDate:'',
            insuranceFixedYear:'',
            setBackground:{
                "color":'rgb(187, 187, 187)',
                "background": "none",
            },
            shareTitle:'',
            shareContent:'',
            shareLink:'',
            isWeixin:false,
            weixin:{},
            isFixed:true,
            insurantHidden:false,
            salesmanId:'',
            shareToken:'',
            salesmanInfo:{},
        }
    },
    mounted(){         
           var self = this;  
            // https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect 若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。           
            // self.redirectUri = window.location.href;
            var ua = navigator.userAgent.toLowerCase();
            var  isWeixin = ua.indexOf('micromessenger') != -1;
            if (isWeixin) {                                                   
            var wxUrl = window.location.href.split('#')[0];
            var url = '/Configurations?types=weixin&weixin_url=' + encodeURIComponent(wxUrl);
            axiosGetAPI(url).then((res) => {
                if (res.status == 200 && res.result && res.result.weixin) {
              var weixin = res.result.weixin;
                wx.config({
                    debug: false, // 开启调试模式,
                    appId: weixin.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: weixin.timestamp, // 必填，生成签名的时间戳
                    nonceStr: weixin.nonceStr, // 必填，生成签名的随机串
                    signature: weixin.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData','closeWindow'] 
                });                              
                }
            });
            }        
    },
  async  created(){      
        if(this.$route.query.appId){
            this.appId = this.$route.query.appId;
            localStorage.setItem('appId',this.appId);
        }
        if(this.$route.query.distributorCode){
            this.distributorCode = this.$route.query.distributorCode;
            sessionStorage.setItem('distributorCode',this.distributorCode);
        }
        if(sessionStorage.getItem('salesmanId')){
            this.salesmanId = sessionStorage.getItem('salesmanId');
        }
        if(this.$route.query.salesmanId){
             this.salesmanId = this.$route.query.salesmanId;
        }
        if(this.$route.query.shareToken){
            this.shareToken = this.$route.query.shareToken;
            sessionStorage.setItem('shareToken',this.$route.query.shareToken);
            var SalesmanModel = {};
            SalesmanModel.shareToken = this.shareToken;
            axiosPostAPI('/Share/Salesman',SalesmanModel).then(res=>{
                if(res.status == 200){
                    self.salesmanInfo = res.result;
                }
            })
        }   
        this.startTime =  this.Common.Public.dateString(this.applicantStartDate);  
        this.endTime = this.getNowFormatDate(this.startTime);             
        this.applicantDate = this.Common.Public.dateString(this.endDate);        
        if(this.$route.query.productCode){
            this.code = this.$route.query.productCode
        }       
        var self = this; 
        // 获取非车预订单
        if(self.$route.query.prepareOrderNo){ 
            var prepareOrderNo = self.$route.query.prepareOrderNo;
            sessionStorage.setItem('prepareOrderNo',prepareOrderNo);
            // /PropertyProducts/FDD001/PrepareOrder/{prepareOrderNo}
            if(!this.$route.query.distributorCode){
              await  axiosGetAPI('/PropertyProducts/'+ this.code +'/PrepareOrder/' + prepareOrderNo).then(res=>{
                    if(res.status == '200'){
                        self.distributorCode = res.result.distributorCode;
                        // self.distributorAttach = res.result.distributorAttach;
                        // sessionStorage.setItem('distributorAttach',self.distributorAttach);
                        sessionStorage.setItem('distributorCode',self.distributorCode);
                    }
                })
            }           
		}else{
            sessionStorage.removeItem('prepareOrderNo');
        }
        //再次投保
        if(self.$route.query.orderNo ){ 
            var orderNo = self.$route.query.orderNo;
            sessionStorage.setItem('orderNo',orderNo);
            // /PropertyProducts/FDD001/PrepareOrder/{prepareOrderNo}
            if(!this.$route.query.distributorCode){
               await  axiosGetAPI('/UsersOrder/AgainInsure?orderNo=' + orderNo).then(res=>{
                    if(res.status == '200'){
                        self.distributorCode = res.result.distributorCode;
                        // self.distributorAttach = res.result.distributorAttach;
                        // sessionStorage.setItem('distributorAttach',self.distributorAttach);
                        sessionStorage.setItem('distributorCode',self.distributorCode);
                    }
                })
            }
		}else{
            sessionStorage.removeItem('orderNo');
        }
        Indicator.open('加载中...');        
       axiosGetAPI('/PropertyProducts/' + this.code ).then(res=>{
            Indicator.close();
            if(res.status == 200){                
                var productModel = res.result.schema.productList[0];                
                sessionStorage.setItem('title',productModel.productName);
                if(sessionStorage.getItem("title")){
                    document.title = sessionStorage.getItem("title");
                }
                self.code = res.result.code;
                self.productModel = productModel; 
                self.shareTitle = res.result.name; 
                if(self.$route.query.id){
                    Indicator.open('加载中...'); 
                    //获取分享链接的图片、描述
                      axiosGetAPI('li/products/' + self.$route.query.id).then(res=>{
                        if(res.status == 200){
                            Indicator.close();
                            self.shareContent = res.result.description;                                                      
                            self.shareImg = res.result.coverUrl; 
                            var domain = '';
                            var currentUrl = document.location.toString();
                            if (currentUrl) {
                                var arrUrl = currentUrl.split("#");
                                domain = arrUrl[0];
                            };                                      
                            // 分享免登录 分享地址中必须包含appid，业务员id，渠道编号，产品编码，分享的token（当前业务员shareToken）                             
                            if(self.shareToken == ''){                                
                                self.shareLink = domain + '#/product/insuranceIndex?appId=' + localStorage.getItem('appId') +  '&productCode=' + self.code + '&distributorCode=' + self.distributorCode +"&salesmanId=" + self.salesmanId + '&id=' + self.$route.query.id;   
                                var model = {};
                                model.link = self.shareLink;
                                 Indicator.open('加载中...'); 
                                 //获取分享链接
                                axiosPostAPI('/Share/Links',model).then(res=>{ 
                                    if(res.status == 200){
                                         Indicator.close();
                                        self.shareLink = res.result.tokenLink;
                                        self.shareToken = res.result.shareToken;
                                        // 分享链接参数拼接                                       
                                        self.initWx(self.shareTitle, self.shareContent, self.shareImg , self.shareLink);                                                                                  
                                    }
                                })
                            }else{                    
                                self.shareLink = domain + '#/product/insuranceIndex?appId=' + localStorage.getItem('appId') +  '&productCode=' + self.code + '&distributorCode=' + self.distributorCode +"&salesmanId=" + self.salesmanId + "&shareToken=" + self.shareToken + '&id=' + self.$route.query.id;  
                                self.initWx(self.shareTitle, self.shareContent, self.shareImg , self.shareLink); 
                            }                        
                        }
                    })  
                }   

                if(productModel.bannerList > 1){
                    self.bannerList = productModel.bannerList;
                }else{
                    self.headeBanner = productModel.bannerList[0].url;
                }               
                self.labelList = productModel.labelList;
                // 保障释义
                self.safeguardList = productModel.safeguardList;
                // 查看保险条款
                self.seePDFList = productModel.seePDFList;
                // insurantHidden 是否展示被保人
                if(productModel.insurantHidden){
                    self.insurantHidden = productModel.insurantHidden;
                }              
                //   
                self.restrictive = productModel.restrictive;                 
                self.ReadPDFList = productModel.ReadPDFList || productModel.readPDFList;                
                if(productModel.otherTargetObjectList){
                    this.insuranceData.otherTargetObjectList = productModel.otherTargetObjectList;
                }
                self.specialRemarkList = productModel.specialRemarkList;
                self.healthNoticeInfo  = productModel.healthNoticeInfo;
                self.claimProcessList = productModel.claimProcessList;
                self.commonProblemList = productModel.commonProblemList;
                self.productCode = productModel.productCode;     
                if(productModel.healthNoticeInfo != null && productModel.healthNoticeInfo != ''){
                    self.healthNoticeList = productModel.healthNoticeInfo.healthNoticeList;
                      var url = window.location.protocol + '//' + window.location.host + '/#' ;                
                        var model = {
                                    "DistributorCode": this.distributorCode,
                                    "ProductCode":self.code,
                                    "orderDetail":{
                                        "schemaProductCode":self.productCode
                                    },
                                    "Properties":{
                                        "underwritingPassedUrl":url + '/product/presoalInformation?appId=' + localStorage.getItem('appId') + '&ProductCode=' +  this.code,
                                        "underwritingBackUrl":url + '/product/insuranceIndex?appId=' + localStorage.getItem('appId') + '&ProductCode=' +  this.code + '&distributorCode=' + this.distributorCode,
                                     }
                        };
                        if(this.code != 'ZHONGAN-AM98'){
                            // 获取智能核保链接（家庭版为多被保人，在下单时获取智能核保链接）
                             axiosPostAPI('/PropertyProducts/' + self.code + '/Underwriting',model).then(data=>{
                                if(data.status == 200){
                                    self.UnderwritingUrl = data.result
                                }
                            })  
                        }                      
                }                
                self.tradeInfos = productModel.tradeInfos;
                self.tradeType = productModel.tradeType;
                self.imageList = productModel.imageList;                                                  
                self.healthOptions = [];                
                for(var i = 0; i < self.healthNoticeList.length ; i ++){
                    var model = {};
                    if(self.healthNoticeList[i].optionsList.length > 0){
                        model.content = self.healthNoticeList[i].content
                        model.options = self.healthNoticeList[i].optionsList;
                        model.healthIndex = '';//判断是否选中
                        model.location = i;//判断是哪一个
                    }
                    self.healthOptions.push(model);
                }
                self.packageList = productModel.packageList;
                self.plansList = [];
                productModel.packageList.map(item=>{
                    var obj = {};
                    obj.packageName = item.packageName;
                    obj.packageCode = item.packageCode;
                    self.plansList.push(obj);
                });
                self.amount = productModel.packageList[self.plantIndex].minPrice;
                self.targetObjectList = productModel.targetObjectList;
                self.SKUList = productModel.skuList;
                self.insuranceInforList = [];               
                for(var i = 0 ; i < productModel.targetObjectList.length ; i ++){
                    let targetObject = productModel.targetObjectList[i];
                    // Age年龄value只有一个时
                    if(targetObject.styleType == 'Age'){                        
                        self.showApplicantAge = true;
                        self.applicantAgeList = targetObject; 
                        // self.endDate = new Date(self.countendBirthday());                                
                        self.applicantDate =  self.countendBirthday();                        
                        if(self.applicantAgeList.options.length > 1){
                            self.BirthdayOptions = [];
                            self.applicantAgeList.options.map(item=>{
                                var model = {};
                                model.name = item.text;
                                model.value = item.value; 
                                self.BirthdayOptions.push(model)
                            })
                        }                  
                        if(targetObject.options[0].periodLMTType== "NoFixed"){
                            if(targetObject.options[0].minPeriodType == 'Day'){
                                self.minapplianceDate = targetObject.options[0].minPeriodValue
                            }
                            if(targetObject.options[0].minPeriodType == 'Year'){
                                self.minapplianceYear = targetObject.options[0].minPeriodValue;
                            }
                            if(targetObject.options[0].maxPeriodType =='Day'){
                                self.maxapplianceDate = targetObject.options[0].maxPeriodValue
                            }
                            if(targetObject.options[0].maxPeriodType =="Year"){
                                self.maxapplianceYear = targetObject.options[0].maxPeriodValue;
                            }
                        }                        
                    }
                    if(targetObject.styleType == 'InsurancePeriod'){ //保险起止日期
                        self.insuranceDataList = targetObject;
                        for(var j = 0 ; j < targetObject.options.length ; j ++){
                            if(targetObject.options[j].periodLMTType == "NoFixed"){
                                if(targetObject.options[j].minPeriodType == 'Day'){
                                        self.minInsuranceDate = targetObject.options[j].minPeriodValue
                                    }
                                if(targetObject.options[j].minPeriodType == 'Year'){
                                        self.minInsuranceYear = targetObject.options[j].minPeriodValue;
                                    }
                                if(targetObject.options[j].maxPeriodType =='Day'){
                                        self.maxInsuranceDate = targetObject.options[j].maxPeriodValue
                                    }
                                if(targetObject.options[j].maxPeriodType =="Year"){
                                        self.maxInsuranceYear = targetObject.options[j].maxPeriodValue;
                                }  
                            } 
                            if(targetObject.options[j].periodLMTType == "Fixed"){
                                if(targetObject.options[j].periodSetType == 'Year'){
                                    self.insuranceFixedYear =  targetObject.options[j].periodSetValue;
                                }
                                if(targetObject.options[j].periodSetType == 'Day'){
                                    self.insuranceFixedDate =  targetObject.options[j].periodSetValue;
                                }                                      
                            }                                
                        } 
                        // 投保日期起止时间
                        if(self.insuranceDataList.options.length > 1){ 
                            self.dataTypeOptons = [];
                            self.insuranceDataList.options.map(item=>{
                                var model = {};
                                model.name = item.text;
                                model.value = item.value; 
                                model.minPeriodType = item.minPeriodType;
                                model.periodLMTType = item.periodLMTType;
                                self.dataTypeOptons.push(model)
                            }) 
                            self.dataTypeIndex = self.dataTypeOptons.length - 1 ;                                                    
                           }else{
                            if(self.insuranceDataList.options[0].periodLMTType == "NoFixed"){
                                this.isFixed = false;
                                self.endTime = self.getDateStr(self.startTime,2);
                                this.setBackground.color = "#333";
                                this.setBackground.background = '';
                            } if(self.insuranceDataList.options[0].periodLMTType == "Fixed"){
                                this.isFixed = true;
                                self.endTime = self.getNowFormatDate(self.startTime);
                            }
                        }                       
                    }
                    if(targetObject.styleType == 'Radio'){
                        var model = targetObject;                        
                        self.insuranceInforList.push(model);     
                        if(targetObject.code == "SocialSecurity"){
                            self.isSocialSecurity = true;
                            self.$set(model, "active", 0); //写入一个active标记初始状态（如有无社保初始值为有，其余选项初始值为无/否）
                        }else{
                            self.$set(model, "active", 1);                            
                        }
                    }
                    if(targetObject.styleType == 'Standard'){
                        self.insuranceList = targetObject;
                    }
                }                                         
            }
        });               
    },
    methods:{
        openBack(){
            this.$router.back();
            // this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
        },
        initWx: function(title, description, shareImg, shareLink) {
                wx.ready(function() { //通过ready接口处理成功验证
                    // config信息验证成功后会执行ready方法
                    wx.updateAppMessageShareData({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
                    title: title, // 分享标题
                    desc: description, // 分享描述
                    link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImg, // 分享图标
                    success: function() {
                        // 设置成功
                    }
                    });
                    wx.updateTimelineShareData({ //分享朋友圈
                    title: title, // 分享标题
                    desc: description, // 分享描述
                    link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImg, // 分享图标
                    success: function() {
                        // 设置成功
                    }
                    });
                });
                wx.error(function(res) { //通过error接口处理失败验证
                    // config信息验证失败会执行error函数
                    // console.log(res);
                    // alert(JSON.parse(res));
                });
        },
        birthdayCheckBtn(item,index){ //特殊处理出生日期选择，如乐享人生少儿幼儿版。
            this.BirthdayOptionsIndex = index;            
            this.verifyBrehday('');            
        },
        getMonthStr:function(start,AddDayCount) {   //获取n天后的日期
    　　　　var dd = new Date(start);  
    　　　　dd.setMonth(dd.getMonth() + AddDayCount );//获取AddDayCount天后的日期  
            dd.setDate(dd.getDate() - 1);
    　　　　var y = dd.getFullYear();   
    　　　　var m = (dd.getMonth()+1) < 10 ? "0" + (dd.getMonth()+1) : (dd.getMonth()+1);//获取当前月份的日期，不足10补0  
    　　　  var day = dd.getDate() ;
            var d = day < 10 ? "0" + day : day;//获取当前几号，不足10补0  
    　　　　return y +"-"+ m +"-"+ d;   
    　　},
        timerCheckBtn(item,index){ //起保日期多个时选择事件
            this.dataTypeIndex = index;
            if(item.minPeriodType == "Day"){
                  this.endTime = this.getDateStr(this.startTime,1);
                //   this.verifyDate();                
            }else if(item.minPeriodType == "Month"){
                 this.endTime = this.getMonthStr(this.startTime,1);
            }else{
                this.endTime = this.getNowFormatDate(this.startTime)                
            }
            this.getSKUCode();
            this.acountPremium();
            if(item.periodLMTType == 'Fixed'){
                this.setBackground.color = "#999";
                this.setBackground.background = 'none'; 
            }else{
                this.setBackground.color = "#333";
                this.setBackground.background = '';
            }                  
            // this.verifyDate()
        },
        verifyDate(){ //校验函数投保日期 暂时不使用
            if(this.insuranceDataList.options[0].maxPeriodType == "Day"){
             if(this.Common.Public.countData(this.startTime,this.endTime) + 1 >= this.minInsuranceDate  && this.Common.Public.countData(this.startTime,this.endTime) + 1 <= this.maxInsuranceDate){
                    this.getSKUCode();
                    this.acountPremium();
                }else{
                    this.$dialog.alert({
                        title: "",
                        message: this.insuranceDataList.remark
                        })
                        .then(() => {

                        })                   
                }
            }else if(this.insuranceDataList.options[0].maxPeriodType == "Year"){
                   if(this.Common.Public.countData(this.startTime,this.endTime) >= this.minInsuranceDate  && this.Common.Public.countData(this.startTime,this.endTime) <= this.maxInsuranceYear * 366){
                        this.getSKUCode();
                        this.acountPremium();
                        }else{
                            this.$dialog.alert({
                                title: "",
                                message: this.insuranceDataList.remark
                                })
                                .then(() => {
                                    
                                })                   
                        } 
            }            
        },
        closeAmount(){ //计算保费关闭按钮
            var insuranceData = {
                InsuranceBirthday:'',
                startTime:'',
                endTime:'',
            }
            this.insuranceData = insuranceData;
            this.isAmountPremium = false;
        },
             
        insuredEndBirthConfirm(){ // 选择被保人投保日期止期        
            if(this.code == 'CPIC-DCIS' && this.dataTypeIndex == 1){
                // var date = this.Common.Public.dateString(this.endinsuredBirthday);
                var _date = new Date(this.startTime);                
                var day = _date.getDate() - 1  ;
                var date = new Date(this.Common.Public.dateString(this.endinsuredBirthday));
                var month = date.getMonth();
                var year = date.getFullYear();
                // var countMonth = date.getMonth() - _date.getMonth();
                var newDate = new Date(year,month,day);                
                // var month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);                
                this.endTime = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
            }else{
                this.endTime = this.Common.Public.dateString(this.endinsuredBirthday)                         
            }     
            this.$refs.endinsuredBirthday.close();         
            this.getSKUCode();
            this.acountPremium();

        },
        selInsuredEndBirthday(){ // 打开被保人投保日期止期
            if(!this.isFixed || ((this.dataTypeIndex == 0 && this.insuranceDataList.options.length > 1 ) || ( this.dataTypeOptons.length &&  this.dataTypeOptons[this.dataTypeIndex].periodLMTType !='Fixed')) ){
                if (this.CommencementDateValuey) {
					this.endinsuredBirthday = new Date(this.CommencementDateValuey);
				}
				this.$refs.endinsuredBirthday.open();
            }            	
        },  
       getDateStr:function(start,AddDayCount) {   //获取n天后的日期
    　　　　var dd = new Date(start);  
    　　　　dd.setDate(dd.getDate() + AddDayCount - 1 );//获取AddDayCount天后的日期  
    　　　　var y = dd.getFullYear();   
    　　　　var m = (dd.getMonth()+1) < 10 ? "0" + (dd.getMonth()+1) : (dd.getMonth()+1);//获取当前月份的日期，不足10补0  
    　　　　var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0  
    　　　　return y +"-"+ m +"-"+ d;   
    　　},  

        insuredBirthConfirm: function() { // 选择被保人投保日期起期
                this.startTime = this.Common.Public.dateString(this.insuredBirthday)               
                if(this.insuranceDataList.options.length > 2){ // 太保产品单独处理
                    switch(this.dataTypeIndex){
                        case 0 : 
                            this.endTime = this.getDateStr(this.startTime,1);
                            break;
                        case 1 :
                            this.endTime = this.getMonthStr(this.startTime,1);
                            break;
                        case 2 :
                             this.endTime = this.getNowFormatDate(this.startTime);
                             break;  
                    }
                }else{
                    if(( this.insuranceDataList.options.length <= 1 && this.isFixed ) || (this.insuranceDataList.options.length > 1 && this.dataTypeIndex == 1) ){  //按年投保是计算终止日期
                        this.endTime = this.getNowFormatDate(this.startTime);
                    }
                    if((this.insuranceDataList.options.length > 1 && this.dataTypeIndex == 0) || !this.isFixed ){ //自选日期时，终止日期为第二天
                        this.endTime = this.getDateStr(this.startTime,1);
                    }
                }               
                this.$refs.insuredBirthday.close();
                if(this.showApplicantAge){
                    this.countendBirthday()
                }                
                this.getSKUCode();
                this.acountPremium()
        },         
        selInsuredBirthday: function() { // 打开被保人投保日期层
				if (this.CommencementDateValuey) {
					this.insuredBirthday = new Date(this.CommencementDateValuey);
				}
				this.$refs.insuredBirthday.open();
            },
        // 校验出身日期是否合规
        verifyBrehday:function(flag){            
              if(this.BirthdayOptionsIndex == 0){                        
                        var value = this.getInsuranceSKUcode(this.applicantDate);
                        if(this.BirthdayOptionsIndex != value){
                            this.$dialog.alert({
                                title: "",
                                message: this.applicantAgeList.remark,                             
                                })
                                .then(() => {                                  
                                })                                
                            return true
                        }                        
                        //    console.log(a)
                    }else{
                        var a = this.getInsuranceSKUcode(this.applicantDate);
                        if(this.BirthdayOptionsIndex != a){
                            this.$dialog.alert({
                                title: "",
                                message: this.applicantAgeList.remark,                               
                                })
                                .then(() => {                               
                                })                                 
                                return true
                        }                        
                    }
                    if(flag == ''){
                        this.getSKUCode();
                        this.acountPremium()
                    }                    
        },
        applicantBirthConfirm: function() { // 选择被保人出生日期
                this.applicantDate = this.Common.Public.dateString(this.applicantBrithday)               
                this.$refs.applicantBrithday.close();  
                if(this.applicantAgeList.options.length > 1){
                    this.verifyBrehday('');
                }else{
                    if(this.verifyApplianceDate(this.applicantDate)){
                        Toast('被保人出生日期不在承保范围')
                    }else{
                        this.getSKUCode();
                        this.acountPremium()
                    }
                }                     
            },

         selapplicantBirthday: function() { // 打开被保人生日日期层
				if (this.CommencementDateValuey) {
					this.applicantBrithday = new Date(this.CommencementDateValuey);
				}
				this.$refs.applicantBrithday.open();
            },
        
         getNowFormatDate(d){ //计算投保终止日期 按年投保        
			var date;
			if(typeof(d) == "undefined"){
				date = new Date();
			}else{
                date = new Date(d); 
                if(this.insuranceFixedYear){
                    date.setFullYear(date.getFullYear() + this.insuranceFixedYear); 
                }else{
                    date.setFullYear(date.getFullYear() + 1); 
                }        	
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
        verifyApplianceDate(bengin){//校验被保人出生日期
            var day1 = new Date(bengin);
            var day2 = new Date(this.startTime);          
            var year1 = day1.getFullYear();
            var year2 = day2.getFullYear();
            var month1 = day1.getMonth() + 1;
            var month2 = day2.getMonth() + 1;
            var date1 = day1.getDate();
            var date2 = day2.getDate();
            var flag = true;
            var code = '';
            for(var i = 0 ; i < this.applicantAgeList.options.length ; i++){
                var item = this.applicantAgeList.options[i];
            // this.applicantAgeList.options.map((item,index)=> {
                if(item.minPeriodType == "Day"){
                    if((day2 - day1) / (1000 * 60 * 60 * 24) <= item.minPeriodValue ){
                        flag = true; 
                        return flag;    
                    }else{
                        flag = false;
                    } 
                }
                if(item.minPeriodType == "Year"){
                    if(year2-year1 < item.minapplianceYear){
                        flag = true;   
                        return flag;       
                    }else if(year2-year1 == item.minPeriodValue){
                        if(month2 < month1){
                                flag = true;   
                                return flag;
                        }else if(month2 == month1){
                            if(date2 < date1){
                                flag = true;   
                                return flag;
                            }
                        }
                    }else{
                        flag = false;
                    }
                }
               if(item.maxPeriodType == "Day"){
                    if((day2 - day1) / (1000 * 60 * 60 * 24) >= item.maxPeriodValue){
                            flag = true;   
                            return flag;    
                    }else{
                        flag = false;
                    }
                }
                if(item.maxPeriodType == "Year"){
                    if(year2-year1 > item.maxPeriodValue){
                            flag = true;   
                            return flag;       
                    }else if(year2-year1 == item.maxPeriodValue){
                        if(month2 > month1){
                            flag = true;   
                                return flag;
                        }else if(month2 == month1){
                                if(date2 > date1){
                                    flag = true;   
                                    return flag;
                                }
                        }
                    }else{
                        flag = false;
                    }
                }                    
            }            
            // })
            return flag;        
        },
      // 计算可投保出生日期开始日期
        countstartBirthday:function(){            
            var date = new Date(this.startTime);
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
            if(this.applicantAgeList.options[this.BirthdayOptionsIndex].minPeriodType == 'Day'){
                var minDate = this.applicantAgeList.options[this.BirthdayOptionsIndex].minPeriodValue;
                var _minDate = 0 - minDate;
                startTime = this.getDateStr(date,_minDate);
                return startTime;
                // startTime = num1 - minDate;
            }else if(this.applicantAgeList.options[this.BirthdayOptionsIndex].minPeriodType == 'Year'){
                var minDate = this.applicantAgeList.options[this.BirthdayOptionsIndex].minPeriodValue + '' + '0000';
                startTime = num1 - minDate + '';
            }
            var year = startTime.substring(0,startTime.length - 4);
            var month =  startTime.substring(startTime.length - 4,startTime.length - 2);
            var day =  startTime.substring(startTime.length - 2,startTime.length);
            var time = year + '-' + month + '-' + day;            
            return time;           
        },
        // 计算可投保出生日期终止日期
         countendBirthday:function(){            
            var date = new Date(this.insuredBirthday);
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
            if(this.showApplicantAge){
                if(this.applicantAgeList.options[this.BirthdayOptionsIndex].minPeriodType == 'Day'){
                    var minDate = this.applicantAgeList.options[this.BirthdayOptionsIndex].minPeriodValue;
                    var _minDate = 0 - minDate;
                    startTime = this.getDateStr(date,_minDate);
                    return startTime;
                    // startTime = num1 - minDate;
                }else if(this.applicantAgeList.options[this.BirthdayOptionsIndex].minPeriodType == 'Year'){
                    var minDate = this.applicantAgeList.options[this.BirthdayOptionsIndex].minPeriodValue + '' + '0000';
                    startTime = num1 - minDate + '';
                }
            }          
            var year = startTime.substring(0,startTime.length - 4);
            var month =  startTime.substring(startTime.length - 4,startTime.length - 2);
            var day =  startTime.substring(startTime.length - 2,startTime.length);
            var time = year + '-' + month + '-' + day;            
            return time;           
        },
         getInsuranceSKUcode(bengin){//校验被保人出生日期
            var day1 = new Date(bengin);
            var day2 = new Date(this.startTime);           
            var year1 = day1.getFullYear();
            var year2 = day2.getFullYear();
            var month1 = day1.getMonth() + 1;
            var month2 = day2.getMonth() + 1;
            if(month2< 10 ){
                month2 = '0' + month2;
            }
            if(month1< 10 ){
                month1 = '0' + month1;
            }
            var date1 = day1.getDate();
            var date2 = day2.getDate();   
            if(date1 < 10){
                date1 = '0' + date1;
            }       
            if(date2 < 10){
                date2 = '0' + date2;
            }
            var code = '';
            var num2 = year2 + '' + month2 + date2;
            var num1 = year1 + '' + month1 + date1;
            var num = num2 - num1 + '';   //将日期转换成数字进行计算：如20200510 - 20181112 。得到的结果为数字。
            
            for(var i = 0 ; i < this.applicantAgeList.options.length ; i++){ 
                var item = this.applicantAgeList.options[i];  //此次运算取出生日期最大值（maxPeriodValue）运算，与最小值无关。通过取sku组合字符 最小值交给后台校验，
                if(num > 0){
                    if(item.maxPeriodType == 'Year'){ //最大值以年为单位时加4个0并换成number类型； 
                        var maxPeriodValue = item.maxPeriodValue + '0000' - 0;
                        if(num  <= maxPeriodValue){
                         return item.value;                                     
                        }
                    }    
                    if(item.maxPeriodType == 'Day'){ //最大值以天为单位时直接运算 
                        var maxPeriodValue = item.maxPeriodValue;
                        if(num  <= maxPeriodValue){
                         return item.value;                                     
                        }
                    }                 
                }                             
            }
              return code;               
        },

        acountPremium(){  //计算价格 skuCode 及 InsurantList为重要信息
            var model = {
                    "DistributorCode": this.distributorCode,
                    "ProductCode": this.code,
                    "StartDate": this.startTime + " " + "00:00:00",
                    "EndDate": this.endTime + ' ' + '23:59:59',
                    "Amount": 0,
                    "ApplicantName": "张三",
                    "InsurantName": "张三",
                    "OrderDetail": {                        
                        "SchemaProductCode":this.productCode,
                        "SKUCode": this.SKUCode,
                        "SKUOptions":this.SKUOptions,
                        "ApplicantList": [{
                            "Name": "张三",
                            "BirthDate": this.applicantDate
                        }
                        ],
                        "InsurantList": [{
                            "Name": "张三",
                            "BirthDate": this.applicantDate,
                            "SocialSecurityFlag":this.SocialSecurityFlag,
                            "SmokeType":this.SmokeType,
                        }
                        ]
                    }
                    }
            
            this.tip = '保费计算中...';
            this.amount = '';
                axiosPostAPI('/PropertyProducts/' + this.code + '/QuotedPrice',model).then(res=>{   
                    if( res.status == 200 ){
                        this.amount = res.result;
                    }
                })    
        },
        getSKUCode(){//通过targetObjectList中的options中的value组合匹配sku编码。           
            var str = '';          
            if(this.applicantAgeList.options ){
                if(this.applicantAgeList.options.length > 0 && this.applicantAgeList.options.length  <= 1){
                    str = str + this.applicantAgeList.options[0].value;
                }else{
                    str = str + this.getInsuranceSKUcode(this.applicantDate);
                }
            }            
            if(this.insuranceDataList.options.length > 0 && this.insuranceDataList.options.length  <= 1 ){
               str = str +  (str != '' ?  '-' +  this.insuranceDataList.options[0].value :this.insuranceDataList.options[0].value);
                // str = str + '-' + this.insuranceDataList.options[0].value;                 
            }else{
                str = str +  (str != '' ? '-' + this.insuranceDataList.options[this.dataTypeIndex].value : this.insuranceDataList.options[this.dataTypeIndex].value);
            }
            for(var i = 0 ; i < this.insuranceInforList.length ; i++ ){
                  var item = this.insuranceInforList[i];               
                 if(item.code == "SocialSecurity"){     //有无社保                 
                    if(item.active == 0){
                       this.SocialSecurityFlag = "Y";
                    }
                    if(item.active == 1){
                        this.SocialSecurityFlag = "N";
                    }
                }      
                if(item.code == "SmokeType"){           //有无吸烟史
                    if(item.active == 0){
                       this.SmokeType = "Y";
                    }
                    if(item.active == 1){
                        this.SmokeType = "N";
                    }
                }         
                str = str + '-' + item.options[item.active].value;                         
            }
            // console.log(str);
            if(this.insuranceList.options.length > 0 ){
                str = str + '-' + this.insuranceList.options[this.plantIndex].value;
            }
            
          for(var i =0; i < this.SKUList.length; i ++){                
                if(str == this.SKUList[i].options){
                    this.SKUCode = this.SKUList[i].code; 
                    this.SKUOptions = this.SKUList[i].options;
                    // console.log(this.SKUCode);                
                }
            }            
        },
        plantBtn(item,index){ //选择方案
            this.plantIndex = index;
            this.amount = this.packageList[this.plantIndex].minPrice;          
        },
        closeSecuity(){ 
            this.showSecurity = false
        },
        socialBtn(item,_item,_index){ //是否有社保等事件，item->有无社保整个 ;_item->是/否选项 ;_index->点击的位置；
            if(item.active != _index){
                item.active = _index;
            }else{
                if(item.active == _index && _index == 0){ //模拟swich效果。
                    item.active = 1;
                }
                if(item.active == _index && _index == 1){
                    item.active = 0;
                }
            }                                 
            if(item.code == '"SocialSecurity"'){  //有无社保未点击可能没有值
                if(item.active == 0){
                    this.SocialSecurityFlag = "Y";
                }
                if(item.active == 1){
                    this.SocialSecurityFlag = "N";
                }
            }  
            if(item.code == "SmokeType"){  //有无吸烟史
                if(item.active == 0){
                    this.SmokeType = "Y";
                }
                if(item.active == 1){
                    this.SmokeType = "N";
                }
            }           
            this.getSKUCode();
            this.acountPremium()
        },
        cutoverTag(item,index){
            if(index == this.tagIndex){return};
			this.tagIndex = index;
			if(index == 0){
				this.isTage_1 = true;
				this.isTage_2 = false;
				this.isTage_3 = false;
			}else if(index == 1){
				this.isTage_1 = false;
				this.isTage_2 = true;
				this.isTage_3 = false;
			}else{
				this.isTage_1 = false;
				this.isTage_2 = false;
				this.isTage_3 = true
			}	
        },
        setInsuranceData(){
                var insuranceData = {};
                var attach = {planName:'',dutyInfos:[]};
                attach.planName =  '已选附加条款'
                this.insuranceInforList.map(item=>{
                    if(item.code != "SocialSecurity" && item.code != "SmokeType"){
                        if(item.active == 0){
                            var obj = {};
                            obj.dutyName = item.content;
                            obj.insuredAmount = '已选';
                            obj.insuredAmountUnit = '';
                            attach.dutyInfos.push(obj);
                        }
                    }
                })
                if(this.productModel.addressType){
                    insuranceData.addressType = this.productModel.addressType;
                }
                insuranceData.startTime = this.startTime;
                insuranceData.endTime = this.endTime;
                insuranceData.SKUCode = this.SKUCode;
                insuranceData.SKUOptions = this.SKUOptions;
                insuranceData.amount = this.amount;
                insuranceData.tradeInfos = this.tradeInfos; 
                insuranceData.tradeType = this.tradeType;
                insuranceData.schemaProductCode = this.productCode;
                insuranceData.code = this.code;     
                insuranceData.productName = this.productModel.productName;
                insuranceData.plantName = this.plansList[this.plantIndex].packageName;    
                insuranceData.SocialSecurityFlag = this.SocialSecurityFlag; 
                insuranceData.SmokeType = this.SmokeType;
                insuranceData.restrictive = this.restrictive;
                insuranceData.readPDFList = this.ReadPDFList;
                insuranceData.healthOptions = this.healthOptions; 
                insuranceData.healthNoticeInfo = this.healthNoticeInfo; 
                insuranceData.insurantHidden = this.insurantHidden;
                insuranceData.otherTargetObjectList = this.insuranceData.otherTargetObjectList;
                if(this.showApplicantAge){
                    if(this.applicantAgeList.options.length > 1){
                        insuranceData.BirthdayOptionsIndex = this.BirthdayOptionsIndex;   
                        insuranceData.applicantAgeList = this.applicantAgeList;   
                    }  
                }                
                sessionStorage.setItem("insuranceData",JSON.stringify(insuranceData));
                var planInfos = this.packageList[this.plantIndex].planInfos;
                if(attach.dutyInfos.length){
                    planInfos.push(attach);
                }
                sessionStorage.setItem('planInfos',JSON.stringify(planInfos));
                
        },
        submitBuyBtn(name){   //健康告知next有进入下一个页面nonNext进入健康告知
            this.setInsuranceData();
            if(name == 'nonNext'){
                if(this.code == 'Allianz-ZB2019' || this.code == 'Allianz-CI' ){ //住院宝，乐享人生健康不能投保不符合健康要求投保人
                    this.$dialog.alert({
                         title: "",
                         message: "被保人不符合健康要求暂时无法投保本产品",                               
                        }).then(() => {    

                        }) 
                    return;
                }
                window.location.href = this.UnderwritingUrl;
            }
            if(name == 'next'){
                 this.$router.push({ path: '/product/presoalInformation' });   
            }
        //     var isTounderwriting = true;
        //    for(var i = 0 ; i < this.healthOptions.length ; i ++){
        //             // console.log(this.healthOptions[i]);
        //             if(this.healthOptions[i].healthIndex === ''){
        //                 Toast('请完成健康告知')
        //                 return;
        //             }
        //             if(this.healthOptions[i].healthIndex == 1){
        //                 isTounderwriting = false
        //             }
        //         }
        //     this.setInsuranceData();
        //    if(isTounderwriting){                     
        //         this.$router.push({ path: '/product/presoalInformation' });               
        //    }else{
        //      window.location.href = this.UnderwritingUrl;
        //    }                      
        },
        toNext(){                
            if(this.insuranceData.startTime != ''){//京东安联告知页面
                // this.$router.push({path:'/product/presoalInformation'});
                if(this.showApplicantAge){
                    if(this.applicantAgeList.options.length > 1){
                        if(this.verifyBrehday(1)){ //出生日期校验不通过则return；
                            return;
                        }                     
                    }else{
                        if(this.verifyApplianceDate(this.applicantDate)){
                            Toast('被保人出生日期不在承保范围')
                            return
                        }
                    }
                }                                
                if(this.amount == ''){
                    Toast('正在计算价格，请稍等')
                    return
                }
                if(this.healthNoticeList.length > 0 && this.code != "Allianz-ZAAMIP-F" && this.code != 'ZHONGAN-AM98'){                                          
                    this.closeAmount();
                    this.showHealthTold = true;
                }else{
                    this.setInsuranceData()
                    this.$router.push({ path: '/product/presoalInformation' }); 
                }                               
            }else{
                this.getSKUCode();
                this.acountPremium(); 
                this.isAmountPremium = true;                        
                sessionStorage.removeItem('insuranceData');
                this.insuranceData.startTime = this.startTime;
            } 
           
        }
    }

}
</script>

<style scoped>
  .bzsy_content_first{
      margin-top: .8rem;
  }
.jiange {
    height: 0.12rem;
    background-color: #F0F2F6;
}
.bzsy_content dt {
    line-height: 1rem;
    font-size: .32rem;
    color: #000000;
    font-weight: 100;
    border-bottom: 0.01rem solid #DDDDDD;
    border-top: 0.01rem solid #dddddd;
    font-weight: bold;
    padding: 0 .3rem;
}
.bzsy_content dd {
    padding-bottom: .1rem;
    padding: 0 .3rem;
}
.bzsy_content dd div.profitC {
    width: 100%;
    margin-top: .3rem;
}

.dl01 dd div.profitC {
    background: #FFF;
    line-height: .56rem;
    color: #666666;
    font-size: .28rem;
    width: 79%;
    float: left;
    margin-right: 0;
    letter-spacing: -.01rem;
}
.bzsy_content dd span {
    float: left;
    margin-right: 0;
    color: #666666;
    padding-bottom: 0.1rem;
    font-size: .28rem;
    line-height: .56rem;
    padding-bottom: 0.25rem;
    border-bottom: 0.01rem solid #ddd;
}
.bzsy_content dd div.profitC {
    background: #FFF;
    line-height: .56rem;
    color: #666666;
    font-size: .28rem;
    /* width: 79%; */
    float: left;
    margin-right: 0;
    letter-spacing: -.01rem;
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

.tip{
    float: left;
    margin-left: 0.1rem;
    color: #999;

}
/* .new_footer {
    height: 1rem;
    line-height: 1rem;
    background: #fff !important;
    position: fixed!important;
    bottom: 0px;
    width: 100%;
    max-width: 7.5rem;
  
    box-shadow: 0 0 0.15rem 0 rgba(32,51,67,0.08);
    z-index: 105;
    left: 50%;
    margin: 0 -3.75rem;
} */

</style>
