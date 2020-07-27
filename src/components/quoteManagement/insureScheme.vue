<template>
  <div class="insureScheme" ref="insureScheme">
    <hr width="100%" color="#f5f5f5" size="1">
    <van-tabs v-model="planType"  style="" type="card" @click="onClickTab">
      <van-tab title="续保方案" name="1"></van-tab>
      <van-tab title="推荐方案" name="2"></van-tab>
    </van-tabs>
    <hr width="100%" color="#f5f5f5" size="1">
    <div class="mint-region first">
      <mt-field style="padding-left: 4%;" class="field-title" label="交强险" readonly="readonly">
        <mt-switch v-model='compulsory' @change='jqx'></mt-switch>
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field style="padding-left: 4%;" class="mint-dateItm ico-date last" label="生效日期" type="text" :disabled="true" v-show='compulsory && !bzImmediate'>
        <i></i>
        <label><input class="mint-input" type="text" readonly="readonly" v-model="postdata.bzRiskKind.beginDate" @click="selRegisterDate" placeholder="请输入生效日期"><i class="ico-arrow"></i></label>
      </mt-field>
      <van-row style="margin:10px;background-color:#FFF;padding-left:5px;height: 30px;" type="flex" justify="end" v-show="compulsory && bzImmediate">
        <van-col span="2" style="display:flex;justify-content: center;align-items: center">
          <img :src="dateImg" style="width:18px;">
        </van-col>
        <van-col span="10" style="display:flex;align-items: center">
          <p style="color:#333;font-size:12px;">生效日期</p>
        </van-col>
        <van-col span="12" style="display:flex;justify-content: center;align-items: center;border:1px solid #eee">
          <div @click="selRegisterDate" style="display:flex;justify-content: space-between;align-items: center;width: 75%;">
            {{postdata.bzRiskKind.beginDate}}
            <van-icon name="arrow-down" />
          </div>
        </van-col>
        <van-col span="4" style="display:flex;justify-content: center;align-items: center;border:1px solid #eee;margin-left:2px;margin-right:2px">
          <div @click="selHour('BZ')" style="display:flex;justify-content: space-between;align-items: center;width: 75%;">
            <p>{{currentBzHour}}</p>
            <van-icon name="arrow-down" />
          </div>
        </van-col>
        <van-col span="4" style="display:flex;justify-content: center;align-items: center;border:1px solid #eee">
          <div @click="selMin('BZ')" style="display:flex;justify-content: space-between;align-items: center;width: 75%;">
            <p>{{currentBzMin}}</p>
            <van-icon name="arrow-down" />
          </div>
        </van-col>
      </van-row>
      <label class="mt-err-tip"></label>
      <mt-datetime-picker ref="picker" v-model="pickerValue" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
    <div class="mint-region first">
      <mt-field style="padding-left: 4%;" class="field-title" label="完税车" readonly="readonly">
        <mt-switch v-model='taxStatus'></mt-switch>
      </mt-field>
      <hr width="100%" v-show="taxStatus" color="#f5f5f5" size="1">
      <mt-field style="padding-left: 4%;" v-show="taxStatus" class="mint-formItm" label="完税凭证号" :disabled="true">
        <input class="mint-input" type="text" v-model="TaxInfo.taxVoucherNo" placeholder="输入完税凭证号">
      </mt-field>
      <hr width="100%" v-show="taxStatus" color="#f5f5f5" size="1">
      <mt-field style="padding-left: 4%;" v-show="taxStatus" class="mint-formItm" label="税务机关名称" :disabled="true">
        <input class="mint-input" type="text" v-model="TaxInfo.taxBureauName " placeholder="请输入税务机关名称">
      </mt-field>
    </div>
    <div class="mint-region">
      <mt-field style="padding-left: 4%;" class="field-title" label="商业险" readonly="readonly">
        <mt-switch v-model='business'></mt-switch>
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field style="padding-left: 4%;" class="mint-dateItm ico-date" label="生效日期" type="text" :disabled="true" v-if='business && !bsImmediate'>
        <label><input class="mint-input" readonly="readonly" @click="selRegisterDateTWO" type="text" v-model="postdata.bsRiskKind.beginDate" placeholder="请输入生效日期"><i class="ico-arrow"></i></label>
      </mt-field>
      <van-row style="margin:10px;background-color:#FFF;padding-left:5px;height: 30px;" type="flex" justify="end" v-show="business && bsImmediate">
        <van-col span="2" style="display:flex;justify-content: center;align-items: center">
          <img :src="dateImg" style="width:18px;">
        </van-col>
        <van-col span="10" style="display:flex;align-items: center">
          <p style="color:#333;font-size:12px;">生效日期</p>
        </van-col>
        <van-col span="12" style="display:flex;justify-content: center;align-items: center;border:1px solid #eee">
          <div @click="selRegisterDateTWO" style="display:flex;justify-content: space-between;align-items: center;width: 75%;">
            {{postdata.bsRiskKind.beginDate}}
            <van-icon name="arrow-down" />
          </div>
        </van-col>
        <van-col span="4" style="display:flex;justify-content: center;align-items: center;border:1px solid #eee;margin-left:2px;margin-right:2px">
          <div @click="selHourTWO('BS')" style="display:flex;justify-content: space-between;align-items: center;width: 75%;">
            <p>{{currentBsHour}}</p>
            <van-icon name="arrow-down" />
          </div>
        </van-col>
        <van-col span="4" style="display:flex;justify-content: center;align-items: center;border:1px solid #eee">
          <div @click="selMinTWO('BS')" style="display:flex;justify-content: space-between;align-items: center;width: 75%;">
            <p>{{currentBsMin}}</p>
            <van-icon name="arrow-down" />
          </div>
        </van-col>
      </van-row>
      <label class="mt-err-tip"></label>
      <mt-datetime-picker ref="pickerTWO" v-model="pickerValueTWO" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirmTWO">
      </mt-datetime-picker>
      <!--车损-->
      <div class="showbus" v-if='business'>
        <hr width="100%" color="#f5f5f5" size="1">
        <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
          <label  class="mint-checkitem">
            <input v-model="hasDamageVisible" class="dd" readonly="readonly" type="checkbox" @click="checkModifyCSXPop"><i>&#10004;</i>
          </label>
          <mt-field style="flex:1;" :class="{active1: isActive1}" class="mint-insList" label="车辆损失险" type="text" :disabled="true">
            <label :class="{active1: isActive1}" v-if="damagevalue =='不投保'" class="mint-checkitemduty">
              <!-- <input v-model="postdata.bsRiskKind.items[0].isDeductible" readonly="readonly" class="dd" type="checkbox"> -->
              <i v-model="postdata.bsRiskKind.items[0].isDeductible">&#10004;</i>不计免赔</label>
              <label :class="{active2: postdata.bsRiskKind.items[0].isDeductible}" v-if="damagevalue !='不投保'" class="mint-checkitemduty">
              <input readonly="readonly" v-model="postdata.bsRiskKind.items[0].isDeductible" class="dd" type="checkbox"><i v-model="postdata.bsRiskKind.items[0].isDeductible">&#10004;</i>不计免赔</label>
            <!--<label :class="{active1: isActive1}" v-else-if="damagevalue ！='不投保'"  class="mint-checkitem"><input v-model="postdata.bsRiskKind.items[0].isDeductible"  class="dd" type="checkbox"><i v-model="postdata.bsRiskKind.items[0].isDeductible">&#10004;</i>不计免赔</label>-->
            <!--<label class="mint-checkitem"><input v-model="showdd" @change="changeshow" class="dd"   type="checkbox"><i id="damage">&#10004;</i></label>-->
            <!-- 以下是后面展示投保与不投保 -->
             <!-- <label v-show="!canModifyCSX"><input class="mint-input" :class="{active1: isActive1}" type="text" readonly="readonly" v-model="damagevalue" @click="damageDate"></label>
             <label style="position:absolute;right:5%" v-show="canModifyCSX && tianshow"><img :src="editImg" style="width:24px;height:24px" @click="showModifyCSXPop">{{csxAmount}}</label>
            <i class="ico-arrow" @click="damageDate"></i> -->
          </mt-field>
        </div>
        <!--第三者@change="threeFoo"-->
        <hr width="100%" color="#f5f5f5" size="1">
        <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
            <label  class="mint-checkitem">
              <input v-model="hasThreeFoo" class="dd" readonly="readonly" type="checkbox" @click="checkthreeparty"><i>&#10004;</i>
            </label>
            <mt-field style="flex:1;" :class="{active1: isActive2}" class="mint-insList" label="第三者责任险" type="text" :disabled="true">
              <label :class="{active1: isActive2}" class="mint-checkitemduty" v-if="postdata.bsRiskKind.items[1].coverage =='不投保'">
                <!-- <input v-model="postdata.bsRiskKind.items[1].isDeductible" class="dd" readonly="readonly" type="checkbox"> -->
                <i>&#10004;</i>不计免赔</label>
              <label :class="{active2: postdata.bsRiskKind.items[1].isDeductible}" class="mint-checkitemduty" v-if="postdata.bsRiskKind.items[1].coverage !='不投保'">
                <input v-model="postdata.bsRiskKind.items[1].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
              <label><input :class="{active1: isActive2}" class="mint-input" readonly="readonly" @click="threeparty" type="text" v-model="postdata.bsRiskKind.items[1].coverage == '不投保' ? '' : postdata.bsRiskKind.items[1].coverage "><i class="ico-arrow"></i></label>
              <!--threepartydata-->
            </mt-field>    
        </div>
        <!--司机 @change="changeFoo"-->
        <hr width="100%" color="#f5f5f5" size="1">
        <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
          <label  class="mint-checkitem">
            <input v-model="hasDriver" class="dd" readonly="readonly" type="checkbox" @click="checkDriverDate"><i>&#10004;</i>
          </label>
        <mt-field style="flex:1;" :class="{active1: isActive3}" class="mint-insList" label="司机责任险" type="text" :disabled="true">
          <label :class="{active1: isActive3}" class="mint-checkitemduty" v-if="postdata.bsRiskKind.items[2].coverage =='不投保'">
            <!-- <input v-model="postdata.bsRiskKind.items[2].isDeductible" class="dd" readonly="readonly" type="checkbox"> -->
            <i>&#10004;</i>不计免赔</label>
          <label :class="{active2: postdata.bsRiskKind.items[2].isDeductible}" class="mint-checkitemduty" v-if="postdata.bsRiskKind.items[2].coverage !='不投保'"><input v-model="postdata.bsRiskKind.items[2].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
          <label><input :class="{active1: isActive3}" class="mint-input" type="text" readonly="readonly" v-model="postdata.bsRiskKind.items[2].coverage  == '不投保' ? '' : postdata.bsRiskKind.items[2].coverage " @click="driverDate"><i class="ico-arrow"></i></label>
        </mt-field>
        </div>
        <!--乘客 @change="changeFoos"-->
        <hr width="100%" color="#f5f5f5" size="1">
        <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
          <label  class="mint-checkitem">
            <input v-model="hasPassenger" class="dd" readonly="readonly" type="checkbox" @click="checkPassenger"><i>&#10004;</i>
          </label>
        <mt-field style="flex:1;" :class="{active1: isActive4}" class="mint-insList" label="乘客责任险" type="text" :disabled="true">
          <label :class="{active1: isActive4}" class="mint-checkitemduty" v-if="postdata.bsRiskKind.items[3].coverage =='不投保'">
            <!-- <input v-model="postdata.bsRiskKind.items[3].isDeductible" class="dd" readonly="readonly" type="checkbox"> -->
            <i>&#10004;</i>不计免赔</label>
          <label :class="{active2: postdata.bsRiskKind.items[3].isDeductible}" class="mint-checkitemduty" v-if="postdata.bsRiskKind.items[3].coverage !='不投保'"><input v-model="postdata.bsRiskKind.items[3].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
          <label><input :class="{active1: isActive4}" class="mint-input" type="text" readonly="readonly" v-model="postdata.bsRiskKind.items[3].coverage == '不投保' ? '' : postdata.bsRiskKind.items[3].coverage + '/座'" @click="passengerDate"><i class="ico-arrow"></i>
          </label>
        </mt-field>
        </div>
        <!--全车盗抢险-->
        <hr width="100%" color="#f5f5f5" size="1">
        <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
          <label  class="mint-checkitem">
            <input v-model="hasDumb" class="dd" readonly="readonly" type="checkbox" @click="checkDumb"><i>&#10004;</i>
          </label>
        <mt-field style="flex:1;" :class="{active1: isActive5}" class="mint-insList" label="全车盗抢险" type="text" :disabled="true">
          <label :class="{active1: isActive5}" class="mint-checkitemduty" v-if="Dumb =='不投保'">
            <!-- <input v-model="postdata.bsRiskKind.items[4].isDeductible" class="dd" readonly="readonly" @change="changeFoo" type="checkbox"> -->
            <i>&#10004;</i>不计免赔</label>
          <label :class="{active2: postdata.bsRiskKind.items[4].isDeductible}" class="mint-checkitemduty" v-if="Dumb !='不投保'"><input v-model="postdata.bsRiskKind.items[4].isDeductible" class="dd" readonly="readonly" @change="changeFoo" type="checkbox"><i>&#10004;</i>不计免赔</label>
          <!-- 投保不投保 -->
          <!-- <label><input :class="{active1: isActive5}" class="mint-input" type="text" readonly="readonly" v-model="Dumb" @click="DumbDate"><i class="ico-arrow"></i></label> -->
        </mt-field>
        </div>
        <!--无法找到第三方-->
        <hr width="100%" color="#f5f5f5" size="1">
        <div id="isshowss" v-show="tianshow">
        <!-- <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;"> -->
          <div id="wufaone" style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;height:40px;">
            <label  class="mint-checkitem">
              <input v-model="hasThirdlys" class="dd" readonly="readonly" type="checkbox" @click="checkThirdlys"><i>&#10004;</i>
            </label>
            <div :class="{active1: isActive6}" class="mint-cell-wrapper" id="wufa">
              <span :class="{active1: isActive6}" id="sex">
                无法找到第三方特约险
              </span>
              <label class="mint-checkitem freefree">
              </label>
              <!-- <label id="labelone"><span id="icoone"></span><input :class="{active1: isActive6}" readonly="readonly" class="mint-input" id="thirdlys" type="text" @click="thirdlysTWO" v-model="threetian"></label> -->
            </div>
          </div>
        <!-- </div> -->
          <div class="mint-region">
            <!--玻璃  @change="boli"-->
            <hr width="100%" color="#f5f5f5" size="1">
          <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
          <label  class="mint-checkitem">
            <input v-model="hasGlass" class="dd" readonly="readonly" type="checkbox" @click="checkGlass"><i>&#10004;</i>
          </label>
            <mt-field style="flex:1;" :class="{active1: isActive7}" class="mint-insList" label="玻璃单独破损险" type="text" :disabled="true">
              <!--     <label :class="{active1: isActive7}" class="mint-checkitem"><input v-model="postdata.bsRiskKind.items[5].isDeductible" class="dd" type="checkbox"><i>&#10004;</i>不计免赔</label>-->
              <label for=""> <input :class="{active1: isActive7}" readonly="readonly" class="mint-input" type="text" v-model="glass" @click="glassDate"><i class="ico-arrow"></i></label>
            </mt-field>
          </div>
            <!--自燃险-->
            <hr width="100%" color="#f5f5f5" size="1">
            <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
            <label  class="mint-checkitem">
              <input v-model="hasSelfignite" class="dd" readonly="readonly" type="checkbox" @click="checkSelfignite"><i>&#10004;</i>
            </label>
            <mt-field style="flex:1;" :class="{active1: isActive8}" class="mint-insList" label="自燃损失险" type="text" :disabled="true">
              <label :class="{active1: isActive8}" class="mint-checkitemduty" v-if="selfignite =='不投保'">
                <!-- <input v-model="postdata.bsRiskKind.items[7].isDeductible" readonly="readonly" class="dd" type="checkbox"> -->
                <i>&#10004;</i>不计免赔</label>
              <label :class="{active2: postdata.bsRiskKind.items[7].isDeductible}" class="mint-checkitemduty" v-if="selfignite !='不投保'"><input v-model="postdata.bsRiskKind.items[7].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
              <!--<label class="mint-checkitem"><input v-model="postdata.bsRiskKind.items[7].isDeductible" class="dd" type="checkbox"><i class="cc">&#10004;</i></label>-->
              <!-- <label><input :class="{active1: isActive8}" class="mint-input" readonly="readonly" type="text" v-model="selfignite" @click="selfDate"><i class="ico-arrow"></i></label> -->
            </mt-field>
            </div>
            <!--划痕险-->
            <hr width="100%" color="#f5f5f5" size="1">
            <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
            <label  class="mint-checkitem">
              <input v-model="hasScratchONE" class="dd" readonly="readonly" type="checkbox" @click="checkScratchONE"><i>&#10004;</i>
            </label>
            <mt-field style="flex:1;" :class="{active1: isActive9}" class="mint-insList" label="划痕险" type="text" :disabled="true">
              <label :class="{active1: isActive9}" class="mint-checkitemduty" v-if="scratchONE ==''">
                <!-- <input v-model="postdata.bsRiskKind.items[8].isDeductible" readonly="readonly" class="dd" type="checkbox"> -->
                <i>&#10004;</i>不计免赔</label>
              <label :class="{active2: postdata.bsRiskKind.items[8].isDeductible}" class="mint-checkitemduty" readonly="readonly" v-if="scratchONE !=''"><input v-model="postdata.bsRiskKind.items[8].isDeductible" class="dd" type="checkbox"><i>&#10004;</i>不计免赔</label>
              <label><input :class="{active1: isActive9}" class="mint-input" readonly="readonly" type="text" v-model="scratchONE" @click="scratchDate"><i class="ico-arrow"></i></label>
            </mt-field>
            </div>
            <!--涉水险-->
            <hr width="100%" color="#f5f5f5" size="1">
            <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
            <label  class="mint-checkitem">
              <input v-model="hasWadecc" class="dd" readonly="readonly" type="checkbox" @click="checkWadecc"><i>&#10004;</i>
            </label>
            <mt-field style="flex:1" :class="{active1: isActive0}" class="mint-insList" label="涉水险" type="text" :disabled="true">
              <label :class="{active1: isActive0}" class="mint-checkitemduty" v-if="wadecc =='不投保'">
                <!-- <input v-model="postdata.bsRiskKind.items[9].isDeductible" class="dd" readonly="readonly" type="checkbox"> -->
                <i>&#10004;</i>不计免赔</label>
              <label :class="{active2: postdata.bsRiskKind.items[9].isDeductible}" class="mint-checkitemduty" readonly="readonly" v-if="wadecc !='不投保'"><input v-model="postdata.bsRiskKind.items[9].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
              <!--<label class="mint-checkitem"><input v-model="postdata.bsRiskKind.items[9].isDeductible" class="dd" type="checkbox"><i class="cc">&#10004;</i></label>-->
             
              <!-- <label><input :class="{active1: isActive0}" class="mint-input" type="text" v-model="wadecc" @click="wadeinfo"><i class="ico-arrow"></i></label> -->
            </mt-field>
            </div>
            <!--指定修理厂险-->
            <hr width="100%" color="#f5f5f5" size="1">
            <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
            <label  class="mint-checkitem">
              <input v-model="haszdxlcValue" class="dd" readonly="readonly" type="checkbox" @click="checkzdxlcValue"><i>&#10004;</i>
            </label>
            <mt-field style="flex:1" :class="{active1: isActive10}" class="mint-insList" label="指定修理厂险" v-model="showZDXLC" type="text" :disabled="true">
              <label><input readonly="readonly" :class="{active1: isActive10}" class="mint-input" type="text" v-model="zdxlcValue" @click="showZDXLCPop"><i class="ico-arrow"></i></label>
            </mt-field>
            </div>
             <!--新增设备损失险-->
            <hr width="100%" color="#f5f5f5" size="1">
            <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
            <label  class="mint-checkitem">
              <input v-model="hasxzsbssValue" class="dd" readonly="readonly" type="checkbox" @click="checkxzsbssValue"><i>&#10004;</i>
            </label>
            <mt-field style="flex:1" :class="{active1: isActive11}" class="mint-insList" label="新增设备损失险" v-model="showXZSBSS" type="text" :disabled="true">
              <label><input readonly="readonly" :class="{active1: isActive11}" class="mint-input" type="text" v-model="xzsbssValue" @click="showXZSBSSPop"><i class="ico-arrow"></i></label>
            </mt-field>
            </div>
            <!--车上货物责任险-->
            <hr width="100%" color="#f5f5f5" size="1">
            <div v-show="hasSzx">
            <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
            <label  class="mint-checkitem">
              <input v-model="hascshwzrxValue" class="dd" readonly="readonly" type="checkbox" @click="checkcshwzrxValue"><i>&#10004;</i>
            </label>
              <mt-field style="flex:1" :class="{active1: isActive11}" class="mint-insList" label="车上货物责任险" v-model="showCSHWZRX" type="text" :disabled="true">
                <label :class="{active1: isActive11}" class="mint-checkitemduty" v-if="cshwzrxValue ==''">
                  <i>&#10004;</i>不计免赔</label>
                <label :class="{active2: postdata.bsRiskKind.items[12].isDeductible}" class="mint-checkitemduty" readonly="readonly" v-if="cshwzrxValue !=''"><input v-model="postdata.bsRiskKind.items[12].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
                <label><input readonly="readonly" :class="{active1: isActive11}" class="mint-input" type="text" v-model="cshwzrxValue" @click="showCSHWZRXPop"><i class="ico-arrow"></i></label>
              </mt-field> 
            </div>        
            <!--法定节假日翻倍险-->
              <hr width="100%" color="#f5f5f5" size="1">
              <div style="display:flex;justify-content: space-between;align-items: center; margin-left: 4%;">
              <label  class="mint-checkitem">
                <input v-model="hasfdjjrfbxValue" class="dd" readonly="readonly" type="checkbox" @click="checkfdjjrfbxValue"><i>&#10004;</i>
              </label>
              <mt-field style="flex:1" :class="{active1: isActive12}" class="mint-insList tooLong-insList" label="法定节假日翻倍险" type="text" :disabled="true">
                <!-- <label><input :class="{active1: isActive12}" class="mint-input" type="text" v-model="fdjjrfbxValue" @click="showFdjjrfbxPop"><i class="ico-arrow"></i></label> -->
              </mt-field>
              </div>
              <hr width="100%" color="#f5f5f5" size="1">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--车损险弹框-->
    <mt-popup v-model="damageVisible"  position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="canceldamage" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span>
        <span @click="selectdamage" class="mint-datetime-action mint-datetime-confirm dumb">投保</span>
      </div>
    </mt-popup>
    <!--第三者弹框-->
    <mt-popup v-model="popSeatVisible"  :closeOnClickModal="false" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="cancelSeatBox" class="mint-datetime-action mint-datetime-cancel">取消</span>
        <span @click="selectSeatNum" class="mint-datetime-action mint-datetime-confirm">确定</span>
      </div>
      <mt-picker :slots="optionCoverages" @change="onSeatsChange"></mt-picker>
    </mt-popup>
    <!--司机责任险弹框-->
    <mt-popup v-model="driverVisible"  :closeOnClickModal="false" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="canceldriver" class="mint-datetime-action mint-datetime-cancel">取消</span>
        <span @click="selectdriver" class="mint-datetime-action mint-datetime-confirm">确定</span>
      </div>
      <mt-picker :slots="driverDates" @change="driverChange"></mt-picker>
    </mt-popup>
    <!--乘客责任险弹框-->
    <mt-popup v-model="passengerVisible"  :closeOnClickModal="false" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="cancelpassenger" class="mint-datetime-action mint-datetime-cancel">取消</span>
        <span @click="selectpassenger" class="mint-datetime-action mint-datetime-confirm">确定</span>
      </div>
      <mt-picker :slots="driverDates" @change="passengerChange"></mt-picker>
    </mt-popup>
    <!--全车盗抢险-->
    <mt-popup v-model="DumbVisible" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="cancelDumb" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span>
        <span @click="selectDumb" class="mint-datetime-action mint-datetime-confirm dumb">投保</span>
      </div>
    </mt-popup>
    <!--无法-->
    <mt-popup v-model="thirdlyVisible" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="cancelthirdly" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span>
        <span @click="selectthirdly" class="mint-datetime-action mint-datetime-confirm dumb">投保</span>
      </div>
    </mt-popup>
    <!--玻璃-->
    <mt-popup v-model="glassVisible" :closeOnClickModal="false"  position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <!-- <span @click="cancelglass" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span> -->
        <span @click="selectglass" class="mint-datetime-action mint-datetime-confirm dumb">国产</span>
        <span @click="selectglassTOW" class="mint-datetime-action mint-datetime-confirm dumb">进口</span>
      </div>
    </mt-popup>
    <!--自燃-->
    <mt-popup v-model="selfVisible" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="cancelself" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span>
        <span @click="selectself" class="mint-datetime-action mint-datetime-confirm dumb">投保</span>
      </div>
    </mt-popup>
    <!--划痕险弹框-->
    <mt-popup v-model="scratchVisible" :closeOnClickModal="false"  position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="cancelscratch" class="mint-datetime-action mint-datetime-cancel">取消</span>
        <span @click="selectscratch" class="mint-datetime-action mint-datetime-confirm">确定</span>
      </div>
      <mt-picker :slots="scratchDates" @change="scratchChange"></mt-picker>
    </mt-popup>
    <!-- 送修厂 -->
    <van-popup v-model="showRepair" position="bottom">
      <sendRepair v-on:selectedRepair="selectedRepair" v-on:closeRepair="closeRepair"></sendRepair>
    </van-popup>
    <!-- 非车财险 -->
    <van-popup class="Noncar" v-model="showNonecar" position="bottom">
      <manageNoncar v-on:selectedNoncar="selectedNoncar" v-on:closeNoncar="closeNoncar"></manageNoncar>
    </van-popup>
    <div class="Footerfixed">
      <div class="btn-repair" @click="openRepair" type="primary" v-show="hasRepair">送修厂</div>
      <div class="btn-Nonecar" @click="openNonecar" type="primary" v-show="hasNonCar">非车财险</div>
      <div class="btn-Offer" @click="Offerone">立即报价</div>
    </div>
    <!--涉水-->
    <mt-popup v-model="wadeccVisible"  position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="cancelwadecc" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span>
        <span @click="selectwadecc" class="mint-datetime-action mint-datetime-confirm dumb">投保</span>
      </div>
    </mt-popup>
    <!--翻倍险-->
    <mt-popup v-model="showFdjjrfbx" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span @click="cancelFdjjrfbx" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span>
        <span @click="selectFdjjrfbx" class="mint-datetime-action mint-datetime-confirm dumb">投保</span>
      </div>
    </mt-popup>
    <!--车损金额修改-->
    <mt-popup v-model="showModifyCSX" position="bottom" popup-transition="popup-fade">
      <div class="mint-region" style="color:#FC3738;padding:10px">
        <p style="color:#333;font-weight:bold;margin-left:5px;line-height:30px;font-size:18px">车辆损失险保额调整</p>
        <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin-top:5px" />
        <mt-field class="mint-formItm" label="保险金额" :disabled="true">
          <input class="mint-input" type="number" v-model="csxAmount" placeholder="输入保额">
        </mt-field>
        <p style="color:#888;font-size:12px;margin-left:15px">车身价调整范围: <span style="color:red;font-size:10px">{{purchasePriceTips}}</span></p>
        <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
      </div>
      <div class="picker-toolbar">
        <span @click="cancelModifyCSXPop" class="mint-datetime-action mint-datetime-cancel">取消</span>
        <span @click="modifyCSXAmount" class="mint-datetime-action mint-datetime-confirm">确定</span>
      </div>
    </mt-popup>
    <!--指定修理厂-->
    <mt-popup v-model="showZDXLC" :closeOnClickModal="false" position="bottom" popup-transition="popup-fade">
      <!-- <mt-header fixed class="def-header" title="添加跟进状态">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header> -->
      <div class="mint-region" style="color:#FC3738;padding:10px">
        <p style="color:#333;font-weight:bold;margin-left:5px;line-height:30px;font-size:18px">指定修理厂险调整</p>
        <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
        <div style="display: flex;height:45px;align-items:center;">
          <span style="float:left;color:#333;margin-left:15px;width:100px;display:inline-block">类型：</span>
          <van-radio-group v-model="zdxlcValue" style="float:left;display: inline-flex">
            <van-radio name="国产">国产</van-radio>
            <van-radio name="进口" style="padding-left:20px">进口</van-radio>
          </van-radio-group>
        </div>
        <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin-top:5px" />
        <mt-field class="mint-formItm" label="浮动比率(%)" :disabled="true">
          <input class="mint-input" type="number" v-model="zdxlcRate" placeholder="输入比率">
        </mt-field>
        <p style="color:#888;font-size:12px;margin-left:15px;margin-bottom:15px;">浮动比率调整范围:
          <span style="color:red;font-size:10px">{{zdxlcValue == "国产" ? "(10%~30%)" : (zdxlcValue == "进口" ? "(15%~60%)" : "")}}</span>
        </p>
        <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
      </div>
      <div class="picker-toolbar">
        <span @click="cancelZDXLCPop" class="mint-datetime-action mint-datetime-cancel">取消</span>
        <span @click="modifyZDXLCAmount" class="mint-datetime-action mint-datetime-confirm">确定</span>
      </div>
    </mt-popup>
    <!--新增设备损失险-->
    <van-popup v-model="showXZSBSS"  :close-on-click-overlay="false"  position="bottom" popup-transition="popup-fade">
      <div class="mint-region" style="background-color:#F5F5F5">
        <mt-header class="def-header" title="">
          <div slot="left">
            <p style="color:#333;font-weight:bold;margin-left:5px;line-height:30px;font-size:18px;float:left">新增设备损失险调整</p>
          </div>
          <div slot="right" style="display:flex;height:30px">
            <van-button icon="add-o" style="color:#0070D3;font-size:12px" type="default" size="small" @click="addDevice" plain>新增</van-button>
          </div>
        </mt-header>
        <div style="padding-bottom:10px">
          <div style="margin:10px;border:1px solid #F9F9F9;border-radius:5px;background-color:#FFF;" v-for="(deviceInfo,index) in devices" :key="index">
            <p style="padding:10px">
              <span style="font-size:16px;font-weight:bold">设备{{index + 1}}</span>
              <img :src="deleteImg" style="width:24px;height:24px;position:absolute;left:90%" @click="delDevice(index)">
            </p>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
            <mt-field class="mint-formItm fromItem-Margin" label="设备名称：" :disabled="true">
              <input class="mint-input" type="text" v-model="deviceInfo.name" placeholder="输入名称">
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
            <div style="display: flex;height:45px;align-items:center;">
              <span style="float:left;color:#333;margin-left:15px;width:100px;">设备产地：</span>
              <van-radio-group v-model="deviceInfo.origin" style="float:left;display: inline-flex">
                <van-radio name="Home">国产</van-radio>
                <van-radio name="Import" style="padding-left:20px">进口</van-radio>
              </van-radio-group>
            </div>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin-top:5px" />
            <mt-field class="mint-formItm fromItem-Margin" label="设备数量：" :disabled="true">
              <input class="mint-input" type="number" v-model="deviceInfo.count" placeholder="输入数量">
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin-top:5px" />
            <mt-field class="mint-formItm fromItem-Margin" label="设备金额：" :disabled="true">
              <input class="mint-input" type="number" v-model="deviceInfo.price" placeholder="输入金额">
            </mt-field>
            <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
            <mt-field class="mint-formItm fromItem-Margin" label="购买日期" :disabled="true" type="text">
              <span @click="selPurchaseDate(index)"><input class="mint-input" type="text" readonly="readonly" v-model="deviceInfo.purchaseDate" placeholder="请输入购买日期"><i class="ico-arrow"></i></span>
            </mt-field>
            <van-datetime-picker v-show="showPurchaseDate && (currentIndex == index)" v-model="purchaseDate" type="date" @cancel="purchaseDateConcel(index)" @confirm="purchaseDateConfirm(index)" :min-date="minDate" :max-date="maxDate" />
          </div>
        </div>
      </div>
      <div class="picker-toolbar">
        <span @click="cancelXZSBSSPop" class="mint-datetime-action mint-datetime-cancel">取消</span>
        <span @click="modifyXZSBSSAmount" class="mint-datetime-action mint-datetime-confirm">确定</span>
      </div>
    </van-popup>
    <!--车上货物责任险-->
    <mt-popup v-model="showCSHWZRX" position="bottom" :closeOnClickModal="false" popup-transition="popup-fade">
      <div class="mint-region" style="color:#FC3738;padding:10px">
        <p style="color:#333;font-weight:bold;margin-left:15px;line-height:30px;font-size:18px">车上货物责任险调整</p>
        <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin-top:5px" />
        <mt-field class="mint-formItm" label="保险金额" :disabled="true">
          <input class="mint-input" type="number" v-model="cshwzrxAmount" placeholder="输入保额">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
      </div>
      <div class="picker-toolbar">
        <span @click="cancelCSHWZRXPop" class="mint-datetime-action mint-datetime-cancel">取消</span>
        <span @click="modifyCSHWZRXAmount" class="mint-datetime-action mint-datetime-confirm">确定</span>
      </div>
    </mt-popup>
    <van-popup v-model="showHoursPop" position="bottom">
      <van-picker show-toolbar :columns="hourData" @cancel="showHoursPop = false" @confirm="onHourConfirm" />
    </van-popup>
    <van-popup v-model="showMinsPop" position="bottom">
      <van-picker show-toolbar :columns="minData" @cancel="showMinsPop = false" @confirm="onMinConfirm" />
    </van-popup>
  </div>
</template>
<script>
import insuranceJson from '../../assets/json/insurance.json'
import axios from 'axios'
import { Toast } from 'mint-ui';
import { axiosPostAPI } from './../../common/Axios';
import event from './../../common/event';
import { RadioGroup, Radio, Popup } from 'vant';
import sendRepair from "./../quoteManagement/sendRepair";
import manageNoncar from "./../quoteManagement/manageNoncar";
var ressdata = {
  bzRiskKind: { beginDate: "", endDate:"", suggestRenewalDate:""},
  bsRiskKind: { beginDate: "", endDate:"", suggestRenewalDate:"", items: [] },
  insCity: '',
  car: {},
  applicant: '',
  insured: '',
  insCorp: {},
  receivingEmail: '',
};
export default {
  name: 'insureScheme',
  data() {
    return {
      showNonecar: false,
      repairRes: [],
      additionals: [],
      noncarItems: [],
      showRepair: false,
      showPurchaseDate: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      purchaseDate: new Date(),
      rightImg: this.src = require('../../assets/images/right.png'),
      dateImg: (this.src = require("../../assets/images/date.png")),
      editImg: (this.src = require("../../assets/images/ic-edit.png")),
      addDeviceImg: (this.src = require("../../assets/images/ic-add-device.png")),
      deleteImg: (this.src = require("../../assets/images/ic-delete.png")),
      deviceInfo: { name: "", count: "", price: "", purchaseDate: "", origin: "" },
      devices: [],
      isRenewalScheme: false,
      isActive1: true,
      isActive2: true,
      isActive3: true,
      isActive4: true,
      isActive5: true,
      isActive6: true,
      isActive7: true,
      isActive8: true,
      isActive9: true,
      isActive0: true,
      isActive10: true,
      isActive11: true,
      isActive12: true,
      postdata: {
        bzRiskKind: {
          beginDate: ""
        },
        bsRiskKind: {
          beginDate: "",
          items: [
            { coverage: "不投保", riskKindItemCode: "CSX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "SZX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "SJZRX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "CKZRX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "DQX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "BLX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "WFZDDSF", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "ZRX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "HHX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "SSX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "ZDXLC", isDeductible: false, rate: 0 },
            { coverage: "不投保", riskKindItemCode: "XZSBSS", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "CSHWZRX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "FDJJRFBX", isDeductible: false },
          ],
        },
      },
       taxStatus:false,
       TaxInfo: {
          taxStatus:'',
          taxBureauName:'',
          taxVoucherNo:'',
          // taxStatus (string, optional): 车船税缴税状态 = ['Normal', 'Less', 'Absolve', 'Done', 'Rejected', 'Reported', 'Other'],
          // taxBureauCode (string, optional): 税务机关代码 ,
          // taxBureauName (string, optional): 税务机关名称 ,
          // taxVoucherNo (string, optional): 完税凭证号（减免税凭证号）
        },
      historyData: {
        "bzRiskKind": {
          "beginDate": ""
        },
        "bsRiskKind": {
          "items": [],
          "beginDate": ""
        }
      },
      recommendData: {
        bzRiskKind: {
          beginDate: ""
        },
        bsRiskKind: {
          beginDate: "",
          items: [
            { coverage: "", riskKindItemCode: "CSX", isDeductible: true },
            { coverage: "1000000", riskKindItemCode: "SZX", isDeductible: true },
            { coverage: "50000", riskKindItemCode: "SJZRX", isDeductible: true },
            { coverage: "50000", riskKindItemCode: "CKZRX", isDeductible: true },
            { coverage: "不投保", riskKindItemCode: "DQX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "BLX", isDeductible: false },
            { coverage: "投保", riskKindItemCode: "WFZDDSF", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "ZRX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "HHX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "SSX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "ZDXLC", isDeductible: false, rate: 0 },
            { coverage: "不投保", riskKindItemCode: "XZSBSS", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "CSHWZRX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "FDJJRFBX", isDeductible: false },
          ],
        },
      },
      compulsory: true,
      business: true,
      tianshow: false,
      popupVisible: false,
      driverVisible: false,
      passengerVisible: false,
      popSeatVisible: false,
      DumbVisible: false,
      glassVisible: false,
      scratchVisible: false,
      damageVisible: false,
      thirdlyVisible: false,
      selfVisible: false,
      wadeccVisible: false,
      showModifyCSX: false,
      csxAmount: "",
      canModifyCSX: false,
      purchasePriceTips: "",
      zdxlcRate: 20,
      cshwzrxAmount: "",
      showZDXLC: false,
      showXZSBSS: false,
      showCSHWZRX: false,
      showFdjjrfbx: false,
      showdd: true,
      foo: true,
      isshow: true,
      footwo: true,
      driverfo: true,
      foofree: true,
      foofour: true,
      foosfour: true,
      freefree: false,
      autoignition: false,
      autoignitionONE: false,
      wade: false,
      wadeONE: false,
      scratch: false,
      hasSzx: false,
      beginDate: '',
      // startDate:new Date(),
      startDate: new Date(this.Common.Public.GetDateStr(0)),
      endDate: new Date(this.Common.Public.GetDateStr(90)),
      registerDate: '2017-12-27',
      pickerValue: '',
      pickerValueTWO: '',
      selected: '1',
      zdxlcValue: "",
      xzsbssValue: "",
      fdjjrfbxValue: "不投保",
      cshwzrxValue: "",
      scratchONE: '',
      threepartydata: '不投保',
      passengerPicker: '不投保',
      passengerPickerss: '不投保',
      driverPicker: '不投保',
      driverduty: '不投保',
      passenger: '不投保',
      threetian: '不投保',
      Dumb: "不投保",
      glass: '',
      damagevalue: '不投保',
      selfignite: '不投保',
      wadecc: '不投保',
      optionCoverages: [{ flex: 1, defaultIndex: 0, values: ['50000', '100000', '150000', '200000', '300000', '500000', '1000000', '1500000', '2000000'], className: 'slot0' }],
      driverDates: [{ flex: 1, defaultIndex: 0, values: ['10000', '20000', '30000', '50000', '100000', '200000', '300000'], className: 'slot0' }],
      scratchDates: [{ flex: 1, defaultIndex: 0, values: [ '2000', '5000', '10000', '20000'], className: 'slot0' }],
      hasRepair: false,
      hasNonCar: false,
      currentIndex: 0,
      planType: "1",
      hourData: [],
      minData: ["00", "30"],
      bzImmediate: false,
      bsImmediate: false,
      showHoursPop: false,
      showMinsPop: false,
      currentBzHour: '',
      currentBsHour: '',
      currentBzMin: '',
      currentBsMin: '',
      currentType: '',
      hasDamageVisible:false,//控制车损险前面的复选框
      hasThreeFoo:false,//控制三者险前面的复选框
      hasDriver:false,
      hasPassenger:false,
      hasDumb:false,
      hasThirdlys:false,
      hasGlass:false,
      hasSelfignite:false,
      hasScratchONE:false,
      hasWadecc:false,
      haszdxlcValue:false,
      hasxzsbssValue:false,
      hascshwzrxValue:false,
      hasfdjjrfbxValue:false,

    };
  },
  components: {
    sendRepair,
    manageNoncar
  },

  mounted() {
    var curDate = new Date();
    var preDate = new Date(curDate.getTime() + 24 * 60 * 60 * 1000);
    var year = preDate.getFullYear();
    var month = preDate.getMonth() + 1;
    var day = preDate.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    this.pickerValue = year + '-' + month + '-' + day;
    this.pickerValueTWO = year + '-' + month + '-' + day;
    this.postdata.bzRiskKind.beginDate = year + '-' + month + '-' + day;
    this.postdata.bsRiskKind.beginDate = year + '-' + month + '-' + day;
    this.recommendData.bzRiskKind.beginDate = year + '-' + month + '-' + day;
    this.recommendData.bsRiskKind.beginDate = year + '-' + month + '-' + day;
    this.canModifyCSX = false;
    var insureInfoApp = localStorage.getItem('insureInfoApp')
    if (insureInfoApp) {
      var resultData = JSON.parse(insureInfoApp);
      this.showHistoryScheme(resultData)
    } else {
      this.$event.$on('handle-event', (res) => {
        this.showHistoryScheme(res)
      })
    }

    if (this.damagevalue == '不投保') this.tianshow = false;
    if (this.damagevalue == '投保') this.tianshow = true;
    if (this.damagevalue == '不投保') {
      this.postdata.bsRiskKind.items[0].coverage = '不投保'
    }

    var oHeight = $(window).height(); //浏览器当前的高度
    $(window).resize(function() {
      if ($(window).height() < oHeight) {
        $(".mint-button").hide();
      } else {
        $(".mint-button").show();
      }
    });
  },

  methods: {
    onHourConfirm(value) {
      if (this.currentType == 'BS') {
        this.currentBsHour = value;
      } else {
        this.currentBzHour = value;
      }
      this.showHoursPop = false;
    },
    onMinConfirm(value) {
      if (this.currentType == 'BS') {
        this.currentBsMin = value;
      } else {
        this.currentBzMin = value;
      }
      this.showMinsPop = false;
    },
    getCurrtentHours() {
      var curDate = new Date();
      var hour = curDate.getHours();
      var minutes = curDate.getMinutes();
      var tempArr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
        "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
      ];
      this.hourData = [];
      for (var i = 0; i < 24; i++) {
        var item = tempArr[i];
        if (item >= hour) {
          this.hourData.push(tempArr[i]);
        }
      }
      if (minutes > 30) {
        this.hourData.splice(0, 1);
      }
    },
    selHour: function(type) {
      this.getCurrtentHours();
      this.currentType = type;
      this.showHoursPop = true;
    },
    selHourTWO: function(type) {
      this.getCurrtentHours();
      this.currentType = type;
      this.showHoursPop = true;
    },
    selMin: function(type) {
      this.currentType = type;
      this.showMinsPop = true;
    },
    selMinTWO: function(type) {
      this.currentType = type;
      this.showMinsPop = true;
    },
    onClickTab: function() {
      this.postdata.bzRiskKind = {};
      this.postdata.bsRiskKind = {};

      if (this.planType == "2") {
        this.postdata.bzRiskKind = this.recommendData.bzRiskKind;
        this.postdata.bsRiskKind = this.recommendData.bsRiskKind;

        if (this.historyData && this.historyData.bzRiskKind && this.historyData.bzRiskKind.beginDate) {
          this.postdata.bzRiskKind.beginDate = this.historyData.bzRiskKind.beginDate;
        }

        if (this.historyData && this.historyData.bsRiskKind && this.historyData.bsRiskKind.beginDate) {
          this.postdata.bsRiskKind.beginDate = this.historyData.bsRiskKind.beginDate;
        }
      // hasDamageVisible:false,//控制车损险前面的复选框
      // hasThreeFoo:false,//控制三者险前面的复选框
      // hasDriver:false,
      // hasPassenger:false,
      // hasDumb:false,
      // hasThirdlys:false,
      // hasGlass:false,
      // hasSelfignite:false,
      // hasScratchONE:false,
      // hasWadecc:false,
      // haszdxlcValue:false,
      // hasxzsbssValue:false,
      // hascshwzrxValue:false,
      // hasfdjjrfbxValue:false,
        this.tianshow = true;
        this.hasDamageVisible = true;
        this.hasThreeFoo = true;
        this.hasDriver = true;
        this.hasPassenger = true;
        this.hasThirdlys = true;
        this.hasDumb = false;
        this.hasGlass = false;
        this.hasSelfignite = false;
        this.hasScratchONE = false;
        this.hasWadecc = false;
        this.haszdxlcValue = false;
        this.hasxzsbssValue = false;
        this.hascshwzrxValue = false;
        this.hasfdjjrfbxValue = false;
        this.xzsbssValue = "";
        this.cshwzrxValue = "";
        this.fdjjrfbxValue = "不投保";
        this.Dumb = '不投保';
        this.glass = '';
        this.threetian = '投保';
        this.selfignite = '不投保';
        this.wadecc = '不投保';
        this.scratchONE = '';
        this.damagevalue = '投保';
        // console.log("推荐方案： " + JSON.stringify(this.postdata));
      } else {
        this.hasDamageVisible = false;
        this.hasThreeFoo = false;
        this.hasDriver = false;
        this.hasPassenger = false;
        this.hasThirdlys = false;
        this.hasDumb = false;
        this.hasGlass = false;
        this.hasSelfignite = false;
        this.hasScratchONE = false;
        this.hasWadecc = false;
        this.haszdxlcValue = false;
        this.hasxzsbssValue = false;
        this.hascshwzrxValue = false;
        this.hasfdjjrfbxValue = false;

        this.zdxlcValue = '';
        this.xzsbssValue = '';
        this.fdjjrfbxValue = '不投保';
        this.cshwzrxValue = '';
        this.scratchONE = '';
        this.threepartydata = '不投保';
        this.passengerPicker = '不投保';
        this.passengerPickerss = '不投保';
        this.driverPicker = '不投保';
        this.driverduty = '不投保';
        this.passenger = '不投保';
        this.threetian = '不投保';
        this.Dumb = '不投保';
        this.glass = '';
        this.damagevalue = '不投保';
        this.selfignite = '不投保';
        this.wadecc = '不投保';

        this.postdata.bzRiskKind = this.historyData.bzRiskKind;
        this.postdata.bsRiskKind = {
          beginDate: "",
          items: [
            { coverage: "不投保", riskKindItemCode: "CSX", isDeductible: true },
            { coverage: "不投保", riskKindItemCode: "SZX", isDeductible: true },
            { coverage: "不投保", riskKindItemCode: "SJZRX", isDeductible: true },
            { coverage: "不投保", riskKindItemCode: "CKZRX", isDeductible: true },
            { coverage: "不投保", riskKindItemCode: "DQX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "BLX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "WFZDDSF", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "ZRX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "HHX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "SSX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "ZDXLC", isDeductible: false, rate: 0 },
            { coverage: "不投保", riskKindItemCode: "XZSBSS", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "CSHWZRX", isDeductible: false },
            { coverage: "不投保", riskKindItemCode: "FDJJRFBX", isDeductible: false },
          ],
        }
        // console.log("历史续保" + JSON.stringify(this.historyData));

        this.postdata.bsRiskKind.beginDate = this.historyData.bsRiskKind.beginDate;
        var arr3 = this.historyData.bsRiskKind.items;
        var arr4 = this.postdata.bsRiskKind.items;
        for (var i = 0; i < arr3.length; i++) {
          for (var j = 0; j < arr4.length; j++) {
            if (arr3[i].riskKindItemCode != 'ZDXLC' && arr3[i].riskKindItemCode == arr4[j].riskKindItemCode) {
              if (arr3[i].coverage > -1) {
                this.postdata.bsRiskKind.items[j].coverage = parseInt(arr3[i].coverage);
              } else {
                this.postdata.bsRiskKind.items[j].coverage = arr3[i].coverage;
              }
              if (arr3[i].rate) {
                this.postdata.bsRiskKind.items[j].rate = arr3[i].rate;
              }
              this.postdata.bsRiskKind.items[j].isDeductible = arr3[i].isDeductible;
            }
          }
        }
        for (var i = 0; i < arr3.length; i++) {
          //车辆损失
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[0].riskKindItemCode) {
            this.damagevalue = '投保';
            this.postdata.bsRiskKind.items[0].coverage = '';
            this.tianshow = true;
            this.isActive1 = false;
            this.hasDamageVisible = true;
          }
          //第三者
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[1].riskKindItemCode) {
            this.isActive2 = false;
            this.hasSzx = true;
            this.hasThreeFoo = true; //
            this.passengerPicker = '50000';
          }
          //司机
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[2].riskKindItemCode) {
            this.isActive3 = false;
             this.hasDriver = true;
             this.driverPicker = '10000';
          }
          //乘客
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[3].riskKindItemCode) {
            this.isActive4 = false;
            this.hasPassenger = true;
            this.passengerPickerss = '10000';
          }
          //全车盗抢
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[4].riskKindItemCode) {
            this.postdata.bsRiskKind.items[4].coverage = '';
            this.Dumb = '投保';
            this.isActive5 = false;
            this.hasDumb = true;
          }
          //无法三
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[6].riskKindItemCode) {
            this.threetian = '投保';
            this.postdata.bsRiskKind.items[6].coverage = '';
            this.isActive6 = false;
             this.hasThirdlys = true;
          }
          //玻璃
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[5].riskKindItemCode) {
            if (this.postdata.bsRiskKind.items[5].coverage == 'Import') this.glass = '进口';
            if (this.postdata.bsRiskKind.items[5].coverage == 'Home') this.glass = '国产';
            this.isActive7 = false;
            this.hasGlass = true;
          }
          //自燃
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[7].riskKindItemCode) {
            this.selfignite = '投保'
            this.postdata.bsRiskKind.items[7].coverage = '';
            this.isActive8 = false;
            this.hasSelfignite = true;
          }
          //划痕
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[8].riskKindItemCode) {
            this.scratchONE = this.postdata.bsRiskKind.items[8].coverage;
            this.isActive9 = false;
            this.hasScratchONE = true;
          }
          //涉水
          if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[9].riskKindItemCode) {
            this.wadecc = '投保';
            this.postdata.bsRiskKind.items[9].coverage == '';
            this.isActive0 = false;
            this.hasWadecc = true;
          }
        }
        // console.log("选择的方案" + JSON.stringify(this.postdata));
      }
    },
    selPurchaseDate: function(index) { // 打开
      if (this.devices[index].purchaseDate) {
        this.purchaseDate = new Date(this.devices[index].purchaseDate);
      }
      this.currentIndex = index;
      this.showPurchaseDate = true;
    },
    purchaseDateConfirm: function(index) { // 选择日期
      if (this.currentIndex == index) {
        this.showPurchaseDate = false;
        this.devices[index].purchaseDate = this.Common.Public.dateString(this.purchaseDate);
      }
    },
    purchaseDateConcel: function(index) {
      if (this.currentIndex == index) {
        this.showPurchaseDate = false;
        this.purchaseDate = '';
      }
    },
    addDevice: function() {
      this.purchaseDate = new Date(this.Common.Public.GetDateStr(0));
      var deviceInfo = { name: "", count: "", price: "", purchaseDate: "", origin: "" };
      this.devices.push(deviceInfo);
    },
    delDevice: function(index) {
      //  not allow to delete the first
      // if (index !== 0) {
      this.devices.splice(index, 1)
      // }
    },
    selectedRepair: function(searchResult) {
      this.repairRes = searchResult;
      // console.log(searchResult);
    },
    closeRepair: function() {
      this.showRepair = false
    },
    openRepair: function() {
      this.showRepair = true;
    },
    selectedNoncar: function(result) {
      this.noncarItems = result;
      // console.log(result);
    },
    closeNoncar: function() {
      this.showNonecar = false;
    },
    openNonecar: function() {
      this.showNonecar = true;
    },
    showHistoryScheme: function(res) {
      if (res != '') {
        this.isRenewalScheme = true
      }

      var insuranceData = JSON.parse(sessionStorage.getItem('insuranceNameCode'));
      var insCtiyCode = JSON.parse(sessionStorage.getItem('insCtiyCode'));
      if (insuranceData) {
        for (var i = 0; i < insuranceData.length; i++) {
          if (insCtiyCode == insuranceData[i].insCityCode) {
            if (insuranceData[i].insCorpCode == 'pingan' || insuranceData[i].insCorpCode == 'cpic') {
              this.hasNonCar = true;
            }
            if (insuranceData[i].insCorpCode == 'picc') {
              this.hasRepair = true;
            }
          }
        }
      }
      ressdata.receivingEmail = res.receivingEmail;
      ressdata.insCorp = res.insCorp;
      ressdata.insCity = res.insCity;
      var cityCode = ressdata.insCity ? ressdata.insCity.code : '';
      if (cityCode != '' && cityCode != undefined) {
        sessionStorage.setItem('insCtiyCode', cityCode);
      }
      ressdata.car = res.car;
      ressdata.applicant = res.applicant;
      ressdata.insured = res.insured;
      if (ressdata.car) {
        if (ressdata.car.registerDate) {
          var mydate = new Date();
          var today = '';
          var mm = mydate.getMonth() + 1;
          var dd = mydate.getDate();
          if (mm < 10) {
            mm = '0' + mm;
          }
          if (dd < 10) {
            dd = '0' + dd;
          }
          today = "" + mydate.getFullYear() + "-" + mm + "-" + dd;
          var registerDate = ressdata.car.registerDate;
          if (registerDate.indexOf(' ') >= 0) {
            var arr1 = ressdata.car.registerDate.split(' ')
            registerDate = arr1[0];
          }
          
          // start = Date.parse(new Date(ressdata.car.registerDate));
          // end = Date.parse(new Date(today));
          // time = (end - start) / 1000 / 3600 / 24;
          if (today == registerDate) {
            this.canModifyCSX = true;
          } else {
            this.canModifyCSX = false;
          }
        } else {
          this.canModifyCSX = false;
        }

        var purchasePrice = ressdata.car.purchasePrice;
        this.csxAmount = purchasePrice;
        this.purchasePriceTips = (purchasePrice * 0.7).toFixed(2) + ' ~ ' + (purchasePrice * 1.3).toFixed(2);
      }
      var hasBzRisk = false;
      if (res.bzRiskKind) {
        if (res.bzRiskKind.suggestRenewalDate) {
          hasBzRisk = true;
          if (res.bzRiskKind.suggestRenewalDate != '') {
            var arr1 = res.bzRiskKind.suggestRenewalDate.split(' ')
            if (res.bzRiskKind.suggestRenewalDate) {
              var date = new Date(arr1[0]);
              var currDate = new Date();
              if (currDate.getTime() < date.getTime()) {
                this.postdata.bzRiskKind.beginDate = arr1[0];
                this.historyData.bzRiskKind.beginDate = arr1[0];
              }
            };
            this.compulsory = true;
          } else if (res.bzRiskKind.suggestRenewalDate == '') {
            this.compulsory = false;
          }
        }
      }
      var hasBsRisk = false;
      if (res.bsRiskKind) {
        if (res.bsRiskKind.suggestRenewalDate) {
          hasBsRisk = true;
          if (res.bsRiskKind.suggestRenewalDate != '') {
            var arr2 = res.bsRiskKind.suggestRenewalDate.split(' ')
            if (res.bsRiskKind.suggestRenewalDate) {
              var date = new Date(arr2[0]);
              var currDate = new Date();
              if (currDate.getTime() < date.getTime()) {
                this.postdata.bsRiskKind.beginDate = arr2[0];
                this.historyData.bsRiskKind.beginDate = arr2[0];
              }
            };
            this.business = true;
          } else if (res.bsRiskKind.suggestRenewalDate == '') {
            this.business = false;
          }
        }
        if (ressdata.bsRiskKind.xzsbxItems) {
          this.devices = ressdata.bsRiskKind.xzsbxItems;
          if (this.devices && this.devices.length > 0) {
            this.xzsbssValue = "投保";
          } else {
            this.xzsbssValue = "";
          }
        }

        if (ressdata.additionals) {
          // this.additionals = ressdata.additionals;
          this.additionals = null;
        }

        var arr3 = res.bsRiskKind.items
        if (arr3) {
          this.historyData.bsRiskKind.items = arr3;
          var arr4 = this.postdata.bsRiskKind.items;
          for (var i = 0; i < arr3.length; i++) {
            for (var j = 0; j < arr4.length; j++) {
              if (arr3[i].riskKindItemCode != 'ZDXLC' && arr3[i].riskKindItemCode == arr4[j].riskKindItemCode) {
                if (arr3[i].coverage > -1) {
                  this.postdata.bsRiskKind.items[j].coverage = parseInt(arr3[i].coverage);
                } else {
                  this.postdata.bsRiskKind.items[j].coverage = arr3[i].coverage;
                }
                if (arr3[i].rate) {
                  this.postdata.bsRiskKind.items[j].rate = arr3[i].rate;
                }
                this.postdata.bsRiskKind.items[j].isDeductible = arr3[i].isDeductible;
              }
            }
          }
          // console.log(JSON.stringify(this.postdata));
          for (var i = 0; i < arr3.length; i++) {
            //车辆损失
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[0].riskKindItemCode) {
              this.damagevalue = '投保';
              this.postdata.bsRiskKind.items[0].coverage = '';
              this.tianshow = true;
              this.isActive1 = false;
              this.hasDamageVisible = true;
            }
            //第三者
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[1].riskKindItemCode) {
              this.isActive2 = false;
              this.hasSzx = true;
              this.hasThreeFoo = true; //
            }
            //司机
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[2].riskKindItemCode) {
              this.isActive3 = false;
              this.hasDriver = true;
            }
            //乘客
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[3].riskKindItemCode) {
              this.isActive4 = false;
              this.hasPassenger = true;
            }
            //全车盗抢
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[4].riskKindItemCode) {
              this.postdata.bsRiskKind.items[4].coverage = '';
              this.Dumb = '投保';
              this.isActive5 = false;
              this.hasDumb = true;
            }
            //无法三
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[6].riskKindItemCode) {
              this.threetian = '投保';
              this.postdata.bsRiskKind.items[6].coverage = '';
              this.isActive6 = false;
              this.hasThirdlys = true;
            }
            //玻璃
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[5].riskKindItemCode) {
              if (this.postdata.bsRiskKind.items[5].coverage == 'Import') this.glass = '进口';
              if (this.postdata.bsRiskKind.items[5].coverage == 'Home') this.glass = '国产';
              this.isActive7 = false;
              this.hasGlass = true;
            }
            //自燃
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[7].riskKindItemCode) {
              this.selfignite = '投保'
              this.postdata.bsRiskKind.items[7].coverage = '';
              this.isActive8 = false;
              this.hasSelfignite = true;
            }
            //划痕
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[8].riskKindItemCode) {
              this.scratchONE = this.postdata.bsRiskKind.items[8].coverage;
              this.isActive9 = false;
              this.hasScratchONE = true;
            }
            //涉水
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[9].riskKindItemCode) {
              this.wadecc = '投保';
              this.postdata.bsRiskKind.items[9].coverage == '';
              this.isActive0 = false;
              this.hasWadecc = true;
            }
            /*//指定修理厂
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[10].riskKindItemCode) {
              if (this.postdata.bsRiskKind.items[10].coverage == 'Import') this.zdxlcValue = '进口';
              if (this.postdata.bsRiskKind.items[10].coverage == 'Home') this.zdxlcValue = '国产';
              this.zdxlcRate = this.postdata.bsRiskKind.items[10].rate * 100;
              this.postdata.bsRiskKind.items[10].isDeductible = false;
              this.isActive10 = false;
            }
            //新增设备险
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[11].riskKindItemCode) {
              this.xzsbssValue = '投保';
              this.isActive11 = false;
            }
            //车上货物
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[12].riskKindItemCode) {
              this.cshwzrxValue = '投保';
              this.isActive11 = false;
            }
            //假日翻倍险
            if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[13].riskKindItemCode) {
              this.fdjjrfbxValue = '投保';
              this.postdata.bsRiskKind.items[13].isDeductible = false;
              this.isActive12 = false;
            }*/

          }
        }
        if (!hasBzRisk && !hasBsRisk) {
          this.planType = "2"; 
        } else{
          this.planType = "1"; 
        }
        this.onClickTab();
      }
    },
    changeFoo: function(e) {
      this.isshow = !this.isshow;
    },
    jqx: function() {
      if (this.compulsory == false) {
        this.postdata.bzRiskKind.beginDate = '';
      }
    },
    wsc(){

    },
    //强交险生效日期
    selRegisterDate: function() {
      this.$refs.picker.open();
    },
    handleConfirm: function() {
      // if (this.pickerValue != '') this.postdata.bzRiskKind.beginDate = this.Common.Public.datetimeString(this.pickerValue);
      var date = new Date();
      var d = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      if (this.pickerValue.getDate() == d) {
        this.bzImmediate = true;
        if (m > 30) {
          h = h + 1;
        }
        this.currentBzHour = (h < 10 ? ("0" + h) : h);
        this.currentBzMin = (m > 30 ? "00" : "30");
      } else {
        this.currentBzHour = '';
        this.currentBzMin = '';
        this.bzImmediate = false;
      }
      this.postdata.bzRiskKind.beginDate = this.Common.Public.dateString(this.pickerValue)
      this.$refs.picker.close();
    },
    //商业险生效日期
    selRegisterDateTWO: function() {
      this.$refs.pickerTWO.open();
    },
    handleConfirmTWO: function(value) {
      // if (this.pickerValueTWO != '') this.postdata.bsRiskKind.beginDate = this.Common.Public.datetimeString (this.pickerValueTWO)
      var date = new Date();
      var d = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      if (this.pickerValueTWO.getDate() == d) {
        this.bsImmediate = true;
        if (m > 30) {
          h = h + 1;
        }
        this.currentBsHour = (h < 10 ? ("0" + h) : h);
        this.currentBsMin = (m > 30 ? "00" : "30");
      } else {
        this.currentBsHour = '';
        this.currentBsMin = '';
        this.bsImmediate = false;
      }
      this.postdata.bsRiskKind.beginDate = this.Common.Public.dateString(this.pickerValueTWO)
      this.$refs.pickerTWO.close();
    },
    //车损damageDate
    damageDate: function() {
      this.damageVisible = true;
    },
    checkModifyCSXPop(){
      if(this.hasDamageVisible){
        this.canceldamage();
      }else{
        this.selectdamage();
      }
    },
    canceldamage: function() {
      this.hasDamageVisible = false;
      this.damageVisible = false;
      this.isActive1 = true;
      this.damagevalue = '不投保';
      this.postdata.bsRiskKind.items[0].coverage = '不投保'
      this.postdata.bsRiskKind.items[0].isDeductible = false;
      this.tianshow = false;
      this.postdata.bsRiskKind.items[5].coverage = '不投保';
      this.postdata.bsRiskKind.items[6].coverage = '不投保';
      this.postdata.bsRiskKind.items[6].isDeductible = false;
      this.postdata.bsRiskKind.items[7].coverage = '不投保';
      this.postdata.bsRiskKind.items[7].isDeductible = false;
      this.postdata.bsRiskKind.items[8].coverage = '不投保';
      this.postdata.bsRiskKind.items[8].isDeductible = false;
      this.postdata.bsRiskKind.items[9].coverage = '不投保';
      this.postdata.bsRiskKind.items[9].isDeductible = false;
    },
    selectdamage: function() {
      this.hasDamageVisible = true;
      this.damageVisible = false;
      this.isActive1 = false;
      this.damagevalue = '投保';
      this.postdata.bsRiskKind.items[0].isDeductible = true;
      this.tianshow = true;
      this.postdata.bsRiskKind.items[0].coverage = '投保'
    },
    //车损修改
    showModifyCSXPop: function() {
      this.showModifyCSX = true;
    },
    cancelModifyCSXPop: function() {
      this.csxAmount = ressdata.car.purchasePrice;
      this.showModifyCSX = false;
    },
    modifyCSXAmount: function() {
      var purchasePrice = ressdata.car.purchasePrice;
      if (this.csxAmount > 0) {
        if (this.csxAmount < (purchasePrice * 0.7) || this.csxAmount > (purchasePrice * 1.3)) {
          Toast('请输入有效车身价');
          this.csxAmount = purchasePrice;
          return false;
        }
        this.showModifyCSX = false;
        this.postdata.bsRiskKind.items[0].coverage = this.csxAmount;
      } else {
        this.csxAmount = purchasePrice;
        Toast('请输入有效车身价');
      }
    },
    //指定修理厂
    showZDXLCPop: function() {
      this.showZDXLC = true;
    },
    checkzdxlcValue(){
      if(!this.haszdxlcValue){
        this.showZDXLC = true;
      }else{
      this.showZDXLC = false;
      this.zdxlcRate = "";
      this.zdxlcValue = "";
      this.postdata.bsRiskKind.items[10].coverage = '不投保';
      this.postdata.bsRiskKind.items[10].isDeductible = false;      
      }
    },
    cancelZDXLCPop: function() {
      this.showZDXLC = false;
      // this.zdxlcRate = "";
      // this.zdxlcValue = "";
      // this.postdata.bsRiskKind.items[10].coverage = '不投保';
      // this.postdata.bsRiskKind.items[10].isDeductible = false;
      if(this.postdata.bsRiskKind.items[10].coverage == '不投保'){
           this.haszdxlcValue = false;
      }
     
    },
    modifyZDXLCAmount: function() {
      if (this.zdxlcValue) {
        var zdxl = (this.zdxlcValue == "国产" ? "Home" : "Import");
        if (this.zdxlcRate) {
          if (this.zdxlcValue == "国产" && (this.zdxlcRate < 10 || this.zdxlcRate > 30)) {
            Toast('请输入有效的浮动比率');
            this.zdxlcRate = "";
            this.zdxlcValue = "";
            return false;
          } else if (this.zdxlcValue == "进口" && (this.zdxlcRate < 15 || this.zdxlcRate > 60)) {
            Toast('请输入有效的浮动比率');
            this.zdxlcRate = "";
            this.zdxlcValue = "";
            return false;
          }
        } else {
          Toast('请输入有效的浮动比率');
          this.zdxlcRate = "";
          this.zdxlcValue = "";
          return false;
        }
        this.showZDXLC = false;
        this.postdata.bsRiskKind.items[10].rate = (this.zdxlcRate / 100);
        this.postdata.bsRiskKind.items[10].coverage = zdxl;
        this.postdata.bsRiskKind.items[10].isDeductible = false;
        this.haszdxlcValue = true;
      } else {
        this.postdata.bsRiskKind.items[10].coverage = '';
        this.postdata.bsRiskKind.items[10].rate = 0;
        this.postdata.bsRiskKind.items[10].isDeductible = false;
        Toast('请选择修理厂类型');
        return false;
      }
    },
    //新增设备损失险
    showXZSBSSPop: function() {
      this.showXZSBSS = true;
    },
    checkxzsbssValue(){
      if(!this.hasxzsbssValue){
        this.showXZSBSS = true;
      }else{
        this.showXZSBSS = false;
        this.xzsbssValue = "";
        this.devices = [];
      }
    },
    cancelXZSBSSPop: function() {
      this.showXZSBSS = false;
      // this.xzsbssValue = "";
      // this.devices = [];
      if(this.xzsbssValue == ""){
          this.hasxzsbssValue = false;
      }
      
    },
    modifyXZSBSSAmount: function() {
      this.showXZSBSS = false;
      if (this.devices && this.devices.length > 0) {
        for (var i = 0; i < this.devices.length; i++) {
          var device = this.devices[i];
          //var deviceInfo = { name: "", count: "", price: "", purchaseDate: "", origin: "" };
          if (!device.name || !device.origin || !device.count ||
            !device.price || !device.purchaseDate) {
            this.devices.splice(i);
          }
        }
        if (this.devices && this.devices.length > 0) {
          this.xzsbssValue = "投保";
          this.postdata.bsRiskKind.items[11].coverage = '投保';
          this.postdata.bsRiskKind.items[11].isDeductible = true;
          this.hasxzsbssValue = true;
        } else {
          this.xzsbssValue = "";
          this.postdata.bsRiskKind.items[11].coverage = '不投保';
          this.postdata.bsRiskKind.items[11].isDeductible = false;
          this.hasxzsbssValue = false;
        }
      } else {
        this.showXZSBSS = false;
        this.xzsbssValue = "";
        this.postdata.bsRiskKind.items[11].coverage = '不投保';
        this.postdata.bsRiskKind.items[11].isDeductible = false;
        this.hasxzsbssValue = false;
      }
    },
    //车上货物责任险
    showCSHWZRXPop: function() {
      this.showCSHWZRX = true;
    },
    checkcshwzrxValue(){
      if(!this.hascshwzrxValue){
          this.showCSHWZRX = true;
      }else{
        this.showCSHWZRX = false;
        this.cshwzrxValue = "";
        this.cshwzrxAmount = "";
        this.postdata.bsRiskKind.items[12].coverage = '不投保';
        this.postdata.bsRiskKind.items[12].isDeductible = false;   
      }
    },
    cancelCSHWZRXPop: function() {
      this.showCSHWZRX = false;
      if(this.postdata.bsRiskKind.items[12].coverage == '不投保' ){
        this.hascshwzrxValue = false;
      }
      // this.cshwzrxValue = "";
      // this.cshwzrxAmount = "";
      // this.postdata.bsRiskKind.items[12].coverage = '不投保';
      // this.postdata.bsRiskKind.items[12].isDeductible = false;
      // this.hascshwzrxValue = false;
    },
    modifyCSHWZRXAmount: function() {
      if (this.cshwzrxAmount && this.cshwzrxAmount > 0) {
        this.showCSHWZRX = false;
        this.cshwzrxValue = this.cshwzrxAmount;
        this.postdata.bsRiskKind.items[12].coverage = this.cshwzrxAmount;
        this.postdata.bsRiskKind.items[12].isDeductible = true;
        this.hascshwzrxValue = true;
      } else {
        Toast('请输入有效的保额');
        this.postdata.bsRiskKind.items[12].coverage = '不投保';
        this.postdata.bsRiskKind.items[12].isDeductible = false;
        return false;
        this.hascshwzrxValue = false;
      }
    },
    onSeatsChange(picker, values) {
        this.passengerPicker = values[0];
    },
    //三者
    threeparty: function() {
      this.popSeatVisible = true;
    },
    checkthreeparty(){
      if(!this.hasThreeFoo){
        this.popSeatVisible = true;
      }else{
        this.postdata.bsRiskKind.items[1].coverage = '不投保';
        this.postdata.bsRiskKind.items[1].isDeductible = false;
        this.isActive2 = true;
        this.hasSzx = false;
      }
    },
    cancelSeatBox: function() {
      this.popSeatVisible = false;
      if(this.postdata.bsRiskKind.items[1].coverage == '不投保'){
        this.hasThreeFoo = false;
      }
      // this.hasThreeFoo = false;
      // this.hasSzx = false;
      // this.postdata.bsRiskKind.items[1].coverage = '不投保';
      // this.postdata.bsRiskKind.items[1].isDeductible = false;
      // this.postdata.bsRiskKind.items[12].coverage = '不投保';
      // this.postdata.bsRiskKind.items[12].isDeductible = false;
      // this.postdata.bsRiskKind.items[13].coverage = '不投保';
      // this.postdata.bsRiskKind.items[13].isDeductible = false;
    },
    selectSeatNum: function() {
      this.popSeatVisible = false;
      this.hasThreeFoo = true;
      this.hasSzx = true;
      this.isActive2 = false;
      this.postdata.bsRiskKind.items[1].isDeductible = true;
      if (this.passengerPicker == '不投保') {
        // this.hasThreeFoo = false;
        // this.postdata.bsRiskKind.items[1].coverage = '不投保';
        // this.postdata.bsRiskKind.items[1].isDeductible = false;
        // this.isActive2 = true;
        // this.hasSzx = false;
        this.postdata.bsRiskKind.items[1].coverage = "50000"
      } else {
        this.postdata.bsRiskKind.items[1].coverage = this.passengerPicker
      }
    },
    //司机
    driverChange(picker, values) {
      this.driverPicker = values[0];
    },
    driverDate: function() {
      this.driverVisible = true;
    },
    checkDriverDate(){
       if(!this.hasDriver){
        this.driverVisible = true;
      }else{
        this.postdata.bsRiskKind.items[2].coverage = '不投保';
        this.isActive3 = true
        this.postdata.bsRiskKind.items[2].isDeductible = false
      }
    },
    canceldriver: function() {
      this.driverVisible = false;
      if(this.postdata.bsRiskKind.items[2].coverage == '不投保'){
        this.hasDriver = false;
      }
      
    },
    selectdriver: function() {
      this.driverVisible = false;
       this.hasDriver = true;
        this.isActive3 = false;
        this.postdata.bsRiskKind.items[2].isDeductible = true;
        if(this.driverPicker == '不投保'){
          this.postdata.bsRiskKind.items[2].coverage = "10000"
        }else{
          this.postdata.bsRiskKind.items[2].coverage = this.driverPicker
        }
      // if (this.driverPicker == '不投保') {
      //   //this.postdata.bsRiskKind.items[2].coverag = '';
      //   this.postdata.bsRiskKind.items[2].coverage = '不投保';
      //   this.isActive3 = true
      //   this.postdata.bsRiskKind.items[2].isDeductible = false;
      //   this.hasDriver = false;
      // } else {
      //   this.hasDriver = true;
      //   this.isActive3 = false;
      //   this.postdata.bsRiskKind.items[2].isDeductible = true;
      //   this.postdata.bsRiskKind.items[2].coverage = this.driverPicker
      // }
    },
    //乘客
    passengerChange(picker, values) {
      this.passengerPickerss = values[0];
    },
    passengerDate: function() {
      this.passengerVisible = true;
    },
    cancelpassenger: function() {
      this.passengerVisible = false;
      if(this.postdata.bsRiskKind.items[3].coverage == '不投保'){
        this.hasPassenger = false;
      }
    },
    checkPassenger(){
      if(!this.hasPassenger){
        this.passengerVisible = true;
      }else{
        this.isActive4 = true;
        this.postdata.bsRiskKind.items[3].coverage = '不投保';
        this.postdata.bsRiskKind.items[3].isDeductible = false
      }
    },
    selectpassenger: function() {
      this.passengerVisible = false;
      this.hasPassenger = true;
      this.isActive4 = false;
      this.postdata.bsRiskKind.items[3].isDeductible = true;
      if (this.passengerPickerss == '不投保') {
        this.passengerPickerss = "10000"
      }
     this.postdata.bsRiskKind.items[3].coverage = this.passengerPickerss
     // if (this.passengerPickerss == '不投保') {
      //   this.isActive4 = true;
      //   this.postdata.bsRiskKind.items[3].coverage = '不投保';
      //   this.postdata.bsRiskKind.items[3].isDeductible = false;
      //   this.hasPassenger = false;
      // } else {
      //   this.hasPassenger = true;
      //   this.isActive4 = false;
      //   this.postdata.bsRiskKind.items[3].isDeductible = true;
      //   this.postdata.bsRiskKind.items[3].coverage = this.passengerPickerss
      // }
    },
    DumbDate: function() { //全车强盗
      this.DumbVisible = true;
    },
    checkDumb(){
      if(this.hasDumb){
        this.cancelDumb();
      }else{
        this.selectDumb();
      }
    },
    cancelDumb: function() {
      this.hasDumb = false;
      this.DumbVisible = false;
      this.Dumb = '不投保';
      this.foofour = false;
      this.postdata.bsRiskKind.items[4].isDeductible = false;
      this.postdata.bsRiskKind.items[4].coverage = '不投保';
      this.isActive5 = true;
    },
    selectDumb: function() {
      this.hasDumb = true;
      this.DumbVisible = false;
      this.Dumb = '投保';
      this.foofour = true;
      this.postdata.bsRiskKind.items[4].isDeductible = true
      this.postdata.bsRiskKind.items[4].coverage = '';
      this.isActive5 = false;
    },
    //无法找第三方
    thirdlysTWO() {
      this.thirdlyVisible = true;
    },
    checkThirdlys(){
      if(this.hasThirdlys){
        this.cancelthirdly()
      }else{
        this.selectthirdly()
      }
    },
    cancelthirdly() {
      this.hasThirdlys = false;
      this.thirdlyVisible = false;
      this.postdata.bsRiskKind.items[6].isDeductible = false;
      this.threetian = '不投保';
      this.postdata.bsRiskKind.items[6].coverage = '不投保';
      this.isActive6 = true;
    },
    selectthirdly() {
      this.hasThirdlys = true;
      this.isActive6 = false;
      this.thirdlyVisible = false;
      this.postdata.bsRiskKind.items[6].isDeductible = true;
      this.threetian = '投保';
      this.postdata.bsRiskKind.items[6].coverage = ''
    },
    glassDate: function() { //玻璃
      this.glassVisible = true;
    },
    checkGlass(){
      if( !this.hasGlass){
        this.glassVisible = true;
      }else{
        this.cancelglass();
      }
    },
    cancelglass: function() {
      this.isActive7 = true;
      this.glassVisible = false;
      this.glass = '';
      this.foosfour = false;
      this.postdata.bsRiskKind.items[5].coverage = '不投保';
      this.postdata.bsRiskKind.items[5].isDeductible = false;
      this.hasGlass = false;
    },
    selectglass: function() {
      this.glassVisible = false;
      this.glass = '国产';
      this.isActive7 = false;
      this.postdata.bsRiskKind.items[5].coverage = 'Home';
      this.postdata.bsRiskKind.items[5].isDeductible = true;
      this.hasGlass = true;
    },
    selectglassTOW: function() {
      this.glassVisible = false;
      this.isActive7 = false;
      this.glass = '进口';
      this.postdata.bsRiskKind.items[5].coverage = 'Import';
      this.postdata.bsRiskKind.items[5].isDeductible = true;
      this.hasGlass = true;
    },
    selfDate: function() { //自燃
      this.selfVisible = true;
    },
    checkSelfignite(){
      if(this.hasSelfignite){
        this.cancelself();
      }else{
        this.selectself();
      }
    },
    cancelself: function() {
      this.selfVisible = false;
      this.selfignite = '不投保';
      this.isActive8 = true;
      this.postdata.bsRiskKind.items[7].isDeductible = false;
      this.postdata.bsRiskKind.items[7].coverage = '不投保';
      this.hasSelfignite = false;
    },
    selectself: function() {
      this.hasSelfignite = true;
      this.selfVisible = false;
      this.selfignite = '投保';
      this.isActive8 = false;
      this.postdata.bsRiskKind.items[7].isDeductible = true;
      this.postdata.bsRiskKind.items[7].coverage = '';
    },
    scratchChange(picker, values) {
      this.scratchPicker = values[0];
    },
    scratchDate: function() { //划痕
      this.scratchVisible = true;
    },
    checkScratchONE(){
      if( !this.hasScratchONE){
        this.scratchVisible = true;
      }else{
        this.postdata.bsRiskKind.items[8].coverage = '不投保';
        this.scratchONE = '';
        this.isActive9 = true;
        this.postdata.bsRiskKind.items[8].isDeductible = false
      }
    },
    cancelscratch: function() {
      this.scratchVisible = false;
      if(this.postdata.bsRiskKind.items[8].coverage == '不投保'){ 
        this.hasScratchONE = false;
      }
    },
    selectscratch: function() {
      this.scratchONE = this.scratchPicker;
      this.scratchVisible = false;
      if (this.scratchPicker == '不投保') {
        this.postdata.bsRiskKind.items[8].coverage = '不投保';
        this.scratchONE = '';
        this.isActive9 = true;
        this.postdata.bsRiskKind.items[8].isDeductible = false;
        this.hasScratchONE = false;
      } else {
        this.postdata.bsRiskKind.items[8].coverage = this.scratchPicker
        this.postdata.bsRiskKind.items[8].isDeductible = true;
        this.isActive9 = false;
        this.hasScratchONE = true;
      }
    },
    wadeinfo: function() { //涉水
      this.wadeccVisible = true;
    },
    checkWadecc(){
      if(this.hasWadecc){
        this.cancelwadecc();
      }else{
        this.selectwadecc();
      }
    },
    cancelwadecc: function() {
      this.wadeccVisible = false;
      this.postdata.bsRiskKind.items[9].isDeductible = false;
      this.postdata.bsRiskKind.items[9].coverage = '不投保';
      this.wadecc = '不投保';
      this.isActive0 = true;
      this.hasWadecc = false;
    },
    selectwadecc: function() {
      this.wadeccVisible = false;
      this.postdata.bsRiskKind.items[9].isDeductible = true;
      this.postdata.bsRiskKind.items[9].coverage = '';
      this.wadecc = '投保';
      this.isActive0 = false;
      this.hasWadecc = true;
    },
    showFdjjrfbxPop: function() { //法定节假日翻倍险
      this.showFdjjrfbx = true;
    },
    checkfdjjrfbxValue(){
      if(this.hasfdjjrfbxValue){
        this.cancelFdjjrfbx()
      }else{
          this.selectFdjjrfbx() 
      }
    },
    cancelFdjjrfbx: function() {
      this.showFdjjrfbx = false;
      this.postdata.bsRiskKind.items[13].isDeductible = false;
      this.postdata.bsRiskKind.items[13].coverage = '不投保';
      this.fdjjrfbxValue = '不投保';
      this.isActive0 = true;
      this.hasfdjjrfbxValue = false;
    },
    selectFdjjrfbx: function() {
      this.showFdjjrfbx = false;
      this.postdata.bsRiskKind.items[13].isDeductible = false;
      this.postdata.bsRiskKind.items[13].coverage = this.postdata.bsRiskKind.items[1].coverage;
      this.fdjjrfbxValue = '投保';
      this.isActive0 = false;
      this.hasfdjjrfbxValue = true;
    },
    Offerone: function() {
      if (ressdata.car.busType == "非营业") {
        ressdata.car.useCharacter = "FeiYingYe"
        ressdata.car.busType = ""
      }
      if (ressdata.car.busType == "营业-出租租赁") {
        ressdata.car.busType = "ChuZuZuLing"
        ressdata.car.useCharacter = "YingYe"
      }
      if (ressdata.car.busType == "营业-城市公交") {
        ressdata.car.busType = "ChengShiGongJiao"
        ressdata.car.useCharacter = "YingYe"
      }
      if (ressdata.car.busType == "营业-公路客运") {
        ressdata.car.busType = "GongluKeYun"
        ressdata.car.useCharacter = "YingYe"
      }
      if (ressdata.car.busType == "营业-旅游客运") {
        ressdata.car.busType = "LvYouKeYun"
        ressdata.car.useCharacter = "YingYe"
      }
      ressdata.car.vin = ressdata.car.vin.toUpperCase();
      if (this.postdata.bzRiskKind.beginDate) {
        var time = parseInt(this.Verify.validate.IsLessThanTomorrow(this.postdata.bzRiskKind.beginDate))
      }
      if (this.postdata.bsRiskKind.beginDate) {
        var timeTOW = parseInt(this.Verify.validate.IsLessThanTomorrow(this.postdata.bsRiskKind.beginDate))
      }

      if (this.compulsory == false && this.business == false) { Toast('请勾选交强险/车船税和商业险'); return false; }
      if (this.compulsory == false) {
        delete ressdata.bzRiskKind;
      }
      var limitTime = sessionStorage.getItem("daysOfEarlyRenewal");
      if (limitTime == '' || limitTime == undefined) {
        limitTime = 90;
      }
      if (this.compulsory == true) {

        if (time < 0 && !this.bzImmediate) {
          Toast('交强险生效日期必须大于当天日期');
          return false;
        }
        if (time > limitTime) {
          Toast('您最早可在车险到期前' + limitTime + '天来投保');
          return false;
        }
        if (this.postdata.bzRiskKind.beginDate == '') {
          Toast('请输入交强险生效时间');
          return false;
        }

        ressdata.bzRiskKind = {}
        if (this.bzImmediate) {
          ressdata.bzRiskKind.beginDate = this.postdata.bzRiskKind.beginDate + " " + this.currentBzHour + ":" + this.currentBzMin + ":00";
        } else {
          ressdata.bzRiskKind.beginDate = this.postdata.bzRiskKind.beginDate;
        }
         
      }
      if(this.taxStatus){
        if(this.TaxInfo.taxVoucherNo == ''){
          Toast('请输入完税凭证号');
          return;
        }
        this.TaxInfo.taxStatus = 'Done';
         ressdata.bzRiskKind.tax = this.TaxInfo;
      }
      if (this.business == false) {
        delete ressdata.bsRiskKind;
      }
      if (this.business == true) {
        if (this.postdata.bsRiskKind.beginDate == '') { Toast('请输入商业险生效时间'); return false; }
        if (timeTOW < 0 && !this.bsImmediate) {
          Toast('商业险生效日期必须大于当天日期');
          return false;
        }
        if (timeTOW > limitTime) {
          Toast('您最早可在车险到期前' + limitTime + '天来投保');
          return false;
        }

        var dataitem = []
        this.postdata.bsRiskKind.items.map(item => {
          if (item.coverage == '' && item.isDeductible == false) {
            dataitem.push(1)
          }
        })

        if (ressdata.bsRiskKind) {
          if (ressdata.bsRiskKind.beginDate) {
            if (this.bsImmediate) {
              ressdata.bsRiskKind.beginDate = this.postdata.bsRiskKind.beginDate + " " + this.currentBsHour + ":" + this.currentBsMin + ":00";
            } else {
              ressdata.bsRiskKind.beginDate = this.postdata.bsRiskKind.beginDate;
            }
          }
        }
        if (this.postdata.bsRiskKind.beginDate != '') {
          var itemArr = [];
          this.postdata.bsRiskKind.items.map(item => {
            if (item.coverage != '不投保') {
              itemArr.push(item);
            }
          })
          ressdata.bsRiskKind = {},
            ressdata.bsRiskKind.items = []
          ressdata.bsRiskKind.beginDate = ''
          if (this.bsImmediate) {
            ressdata.bsRiskKind.beginDate = this.postdata.bsRiskKind.beginDate + " " + this.currentBsHour + ":" + this.currentBsMin + ":00";
          } else {
            ressdata.bsRiskKind.beginDate = this.postdata.bsRiskKind.beginDate;
          }
          if (this.devices && this.devices.length > 0) {
            ressdata.bsRiskKind.xzsbxItems = this.devices;
          } else {
            ressdata.bsRiskKind.xzsbxItems = null;
          }

          if (ressdata.bsRiskKind.items) {
            ressdata.bsRiskKind.items = itemArr
          }

        }
        if (this.business == true) {
          if (itemArr.length < 1) {
            Toast('请勾选商业险险种');
            return false;
          }
        }

        localStorage.setItem("insureInfoApp", JSON.stringify(ressdata));
        //判断coverage中有没有投保
        if (ressdata.bsRiskKind.items && ressdata.bsRiskKind) {
          var item = ressdata.bsRiskKind.items
          for (var i = 0; i < item.length; i++) {
            if (item[i].coverage == '投保') {
              item[i].coverage = '';
            }
            if (item[i].riskKindItemCode == "WFZDDSF") {
              item[i].isDeductible = false;
            }
            if (item[i].riskKindItemCode == "BLX") {
              item[i].isDeductible = false;
            }
            if (item[i].riskKindItemCode == "DQX") {
              item[i].coverage = this.postdata.bsRiskKind.items[0].coverage;
            }
            if (item[i].riskKindItemCode == "ZRX") {
              item[i].coverage = this.postdata.bsRiskKind.items[0].coverage;
            }
            if (item[i].riskKindItemCode == "ZDXLC") {
              item[i].isDeductible = false;
              if (item[i].rate && item[i].rate > 1) {
                item[i].rate = item[i].rate / 100;
              };
              // item[i].glassMadeInChina = (item[i].coverage == "Home");
              // item[i].coverage = '';
            }
          }
        }
      }

      if (this.repairRes && this.repairRes.length > 0) {
        this.additionals = this.repairRes;
        if (this.noncarItems && this.noncarItems.length > 0) {
          for (var i = 0; i < this.noncarItems.length; i++) {
            var item = this.noncarItems[i];
            for (var j = 0; j < this.additionals.length; j++) {
              var additional = this.additionals[j];
              if (item.insCorpCode == additional.insCorpCode) {
                additional.accidentInsurances = item.accidentInsurances;
              } else {
                this.additionals.push(item);
              }
            }
          }
        }
      } else if (this.noncarItems && this.noncarItems.length > 0) {
        this.additionals = this.noncarItems;
      } else {
        this.additionals = null;
      }
      ressdata.car.vin = ressdata.car.vin.toUpperCase();
      if (this.additionals && this.additionals.length > 0) {
        ressdata.additionals = this.additionals;
      } else {
        ressdata.additionals = null;
      }

      // console.log(JSON.stringify(ressdata));
      this.$event.$emit('quoteInfo', ressdata);
      var rCode = ressdata.insCorp ? ressdata.insCorp.code : '';
      var cityCode = ressdata.insCity ? ressdata.insCity.code : '';
      var cityName = ressdata.insCity ? ressdata.insCity.shortName : '';
      var emitFather = { num: '3', size: 1, isResult: false, isSelectIns: false, renewalCode: rCode, cityCode: cityCode, cityName: cityName }
      this.$emit('child-scheme', emitFather);
      this.$event.$emit('child-scheme', emitFather);
      localStorage.removeItem('selIns');
    }
  }
};

</script>
<style scoped>
.insureScheme {
  background-color: #F9F9F9;
}

.insureScheme .mint-region.first {
  border-bottom: 1px solid #eee;
}

.insureScheme .mint-region {
  margin-bottom: 0;
}

.insureScheme .popup li {
  height: 30px;
  text-align: center;
  line-height: 30px
}

.insureScheme .mint-cell-text {
  width: 150px
}

.insureScheme .dumb {
  width: 100%
}

.insureScheme .freedd {
  width: 140px
}

.insureScheme .freefree {
  margin-left: 34px
}

.insureScheme #sex {
  flex: 1;
  color: #333333;
  font-size: 12px;
}

/* .insureScheme #wufaone {
  padding-left: 4%;
  margin: 0 !important;
} */

.insureScheme .cc {
  margin-left: 88px
}

.insureScheme #wufa {
  border: none;
  margin: 0 !important;
  display: flex;
   /* padding-left: 4%; */
}

.insureScheme #damage {
  margin-left: 86px
}

.insureScheme #thirdlys {
  float: right !important;
  text-align: right;
  line-height: 40px;
  font-size: 12px;
  color: #666;
  border: none;
  padding-right: 3%;
  width: 100px !important;
}

.Footerfixed {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  background: #fff;
  border-top: 1px solid #eee;
  height: 44px;
}

.Footerfixed .btn-repair {
  width: 30%;
  text-align: center;
  color: #ee0a24;
  border-right: 1px solid #eeeeee;
}

.btn-Nonecar {
  width: 30%;
  text-align: center;
  color: #ee0a24;
}

.btn-Offer {
  flex: 1;
  background: #ee0a24;
  text-align: center;
  color: #ffffff;
  line-height: 44px;
  height: 100%;
}

.insureScheme #icoone {
  float: right;
  right: 0;
  width: 5px;
  height: 5px;
  border: solid 2px #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  line-height: 40px;
  display: inline-block;
  -webkit-transform: rotate(45deg);
  transform: translateY(226%) rotate(45deg);

}

.Noncar {
  position: fixed;
  top: 0;
  background: #f5f5f5;
}

.insureScheme #labelone {
  float: right !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 120px;
}

.el-dateItm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

}

.el-dateItm-picker .el-input__inner {
  border: 0 !important;
}

.van-tabs--card {
  padding-top: 8px;
  padding-bottom: 5px;
}

.mint-region .mint-cell{
  padding-left:0%;
}

.fromItem-Margin{
  padding-left:4% !important;
}

</style>
