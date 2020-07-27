<template>
  <div style="padding: 0;">
    <mt-header fixed class="def-header cust-head" title="编辑询价单">
      <div slot="left">
        <img :src="closeImg" style="width: 18px;height: 18px;" @click="openBack">
      </div>
      <!-- <div slot="right">
        <mt-button @click="commitData" style="color:#f94037">重新提交</mt-button>
      </div> -->
    </mt-header>
    <div style="margin-top:48px;padding-top:2px;padding-bottom:45px;">
      <div style=" background: #FFFFFF;padding-left: 15px;padding-right: 15px;">
        <div class="divBox" style="padding-top:10px;">
          <p>询价单号：</p>
          <p style="color:#999">{{itemDetail.enquiryNo}}</p>
        </div>
        <div class="divBox">
          <p>状态：</p>
          <p style="color:#999">{{itemDetail.statusDisplay}}</p>
        </div>
        <div class="divBox" v-show="itemDetail.status == 'Reject'">
          <p>打回原因：</p>
          <p style="color:red">{{itemDetail.remark}}</p>
        </div>
        <div class="divBox">
          <p>险种：</p>
          <p style="color:#999">{{itemDetail.productTypeDisplay }}</p>
        </div>
        <div class="divBox">
          <p>投保人：</p>
          <p style="color:#999">{{itemDetail.applicantName}}</p>
        </div>
        <div class="divBox">
          <p>总保费：</p>
          <p style="color:#999">￥{{itemDetail.premium.toFixed(2)}}</p>
        </div>
        <div class="divBox" style="padding-bottom:10px">
          <p>营业执照：</p>
          <img :src="itemDetail.businessLicenseImgUrl" style="height:100px" alt="">
        </div>
      </div>
      <div style="background: #fff;padding-left: 15px;padding-right: 15px;padding-bottom: 15px;">
        <div v-for="item in carData">
          <div v-if="item.basicInfo && item.basicInfo.basicInfoDetails && item.basicInfo.basicInfoDetails.length > 0" v-for="(fieldItem, _index) in item.basicInfo.basicInfoDetails">
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-field placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.uploadValue">
                </van-field>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row v-if="fieldItem.fieldType == 'option'" style="padding: 6px;border-bottom: 1px solid #F9F9F9;">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14" style="line-height:35px">
                <el-select v-model="fieldItem.uploadValue" placeholder="请选择">
                  <el-option v-for="isitem in fieldItem.option" :key="isitem.value" :label="isitem.text" :value="isitem.text">
                  </el-option>
                </el-select>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'file'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,text/plain,'>
                </van-uploader>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
          </div>
          <div v-if="item.basicInfo && item.basicInfo.lastYearInfoDetails && item.basicInfo.lastYearInfoDetails.length > 0" v-for="(fieldItem, _index) in item.basicInfo.lastYearInfoDetails">
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-field placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.uploadValue">
                </van-field>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row v-if="fieldItem.fieldType == 'option'" style="padding: 6px;border-bottom: 1px solid #F9F9F9;">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14" style="line-height:35px">
                <el-select v-model="fieldItem.uploadValue" placeholder="请选择">
                  <el-option v-for="isitem in fieldItem.option" :key="isitem.value" :label="isitem.text" :value="isitem.text">
                  </el-option>
                </el-select>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'file'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,text/plain,'>
                </van-uploader>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
          </div>
          <div v-if="item.basicInfo && item.basicInfo.currYearInfoDetails && item.basicInfo.currYearInfoDetails.length > 0" v-for="(fieldItem, _index) in item.basicInfo.currYearInfoDetails">
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-field placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.uploadValue">
                </van-field>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row v-if="fieldItem.fieldType == 'option'" style="padding: 6px;border-bottom: 1px solid #F9F9F9;">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14" style="line-height:35px">
                <el-select v-model="fieldItem.uploadValue" placeholder="请选择">
                  <el-option v-for="isitem in fieldItem.option" :key="isitem.value" :label="isitem.text" :value="isitem.text">
                  </el-option>
                </el-select>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'file'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,text/plain,'>
                </van-uploader>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                <van-col>{{fieldItem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
              </van-col>
            </van-row>
          </div>
          <div v-for="(caritem, index) in item.details">
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="caritem.fieldType == 'text' || caritem.fieldType == 'number' ">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                <van-col style="color:#333">{{caritem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <van-field style="color:#333;border:1px solid #eee;width:88%" placeholder="请输入" :type="caritem.fieldType" v-model="caritem.uploadValue">
                </van-field>
              </van-col>
              <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px 6px;" v-if="caritem.fieldType == 'option'">
              <van-col span="8" style="line-height:35px;">
                <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                <van-col style="color:#333">{{caritem.fieldName}}</van-col>
              </van-col>
              <van-col span="14" style="line-height:35px">
                <el-select v-model="caritem.uploadValue" placeholder="请选择">
                  <el-option v-for="caritem in caritem.option" :key="caritem.value" :label="caritem.text" :value="caritem.text">
                  </el-option>
                </el-select>
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="caritem.fieldType == 'file'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                <van-col style="color:#333">{{caritem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <!-- <input type="file" style="width: 100%" accept="text/plain," multiple="multiple" @change="handleFile(caritem.fieldName,index)" ref="filElem" class="hiddenInput" /> -->
                <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" multiple  :after-read="carafterRead" accept='.docx,.doc,.pdf,text/plain,' /> -->
                <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept='.docx,.doc,.pdf,text/plain,' />
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
              </van-col>
            </van-row>
            <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="caritem.fieldType == 'image'">
              <van-col span="8" style="display: flex;align-items: center;height:44px">
                <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                <van-col style="color:#333">{{caritem.fieldName}}</van-col>
              </van-col>
              <van-col span="14">
                <!-- <input type="file" style="width: 100%" accept="image/*" @change="handleImg(caritem.fieldName,index)" ref="imgElem" class="hiddenInput" /> -->
                <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept="image/*" />
              </van-col>
               <van-col span="2" style="line-height: 41px; text-align: center;">
                <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
              </van-col>
            </van-row>
          </div>
        </div>
        <hr width="100%" color="#f5f5f5" size="1">
        <div class="mint-region first">
          <mt-field class="field-title" label="交强险／车船税">
            <mt-switch v-model='compulsory' @change='jqx'></mt-switch>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1">
          <mt-field class="mint-dateItm ico-date last" label="生效日期" v-model="registerDate" type="text" :disabled="true" v-show='compulsory'>
            <i></i>
            <label><input class="mint-input" type="text" readonly="readonly" v-model="postdata.bzRiskKind.beginDate" @click="selRegisterDate" placeholder="请输入生效日期"><i class="ico-arrow"></i></label>
          </mt-field>
          <label class="mt-err-tip"></label>
          <mt-datetime-picker ref="picker" v-model="pickerValue" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
          </mt-datetime-picker>
        </div>
        <div class="mint-region">
          <hr width="100%" color="#f5f5f5" size="1">
          <mt-field class="field-title" label="商业险">
            <mt-switch v-model='business'></mt-switch>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1">
          <mt-field class="mint-dateItm ico-date" label="生效日期" v-model="registerDate" type="text" :disabled="true" v-if='business'>
            <label><input class="mint-input" readonly="readonly" @click="selRegisterDateTWO" type="text" v-model="postdata.bsRiskKind.beginDate" placeholder="请输入生效日期"><i class="ico-arrow"></i></label>
          </mt-field>
          <label class="mt-err-tip"></label>
          <mt-datetime-picker ref="pickerTWO" v-model="pickerValueTWO" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirmTWO">
          </mt-datetime-picker>
          <!--车损-->
          <div class="showbus" v-if='business'>
            <hr width="100%" color="#f5f5f5" size="1">
            <mt-field :class="{active1: isActive1}" class="mint-insList" label="车辆损失险" v-model="registerDate" type="text" :disabled="true">
              <label :class="{active1: isActive1}" v-if="damagevalue =='不投保'" class="mint-checkitem">
                <!-- <input v-model="postdata.bsRiskKind.items[0].isDeductible" readonly="readonly" class="dd" type="checkbox"> -->
                <i v-model="postdata.bsRiskKind.items[0].isDeductible">&#10004;</i>不计免赔</label>
              <label :class="{active1: isActive1}" v-if="damagevalue !='不投保'" class="mint-checkitem">
                <input readonly="readonly" v-model="postdata.bsRiskKind.items[0].isDeductible" class="dd" type="checkbox"><i v-model="postdata.bsRiskKind.items[0].isDeductible">&#10004;</i>不计免赔</label>
              <!--<label :class="{active1: isActive1}" v-else-if="damagevalue ！='不投保'"  class="mint-checkitem"><input v-model="postdata.bsRiskKind.items[0].isDeductible"  class="dd" type="checkbox"><i v-model="postdata.bsRiskKind.items[0].isDeductible">&#10004;</i>不计免赔</label>-->
              <!--<label class="mint-checkitem"><input v-model="showdd" @change="changeshow" class="dd"   type="checkbox"><i id="damage">&#10004;</i></label>-->
              <label><input class="mint-input" :class="{active1: isActive1}" type="text" readonly="readonly" v-model="damagevalue" @click="damageDate"></label>
              <i class="ico-arrow" @click="damageDate"></i>
            </mt-field>
            <!--第三者@change="threeFoo"-->
            <hr width="100%" color="#f5f5f5" size="1">
            <mt-field :class="{active1: isActive2}" class="mint-insList" label="第三者责任险" v-model="registerDate" type="text" :disabled="true">
              <label :class="{active1: isActive2}" class="mint-checkitem" v-if="postdata.bsRiskKind.items[1].coverage =='不投保'">
                <!-- <input v-model="postdata.bsRiskKind.items[1].isDeductible" class="dd" readonly="readonly" type="checkbox"> -->
                <i>&#10004;</i>不计免赔</label>
              <label :class="{active1: isActive2}" class="mint-checkitem" v-if="postdata.bsRiskKind.items[1].coverage !='不投保'"><input v-model="postdata.bsRiskKind.items[1].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
              <label><input :class="{active1: isActive2}" class="mint-input" readonly="readonly" @click="threeparty" type="text" v-model="postdata.bsRiskKind.items[1].coverage"><i class="ico-arrow"></i></label>
              <!--threepartydata-->
            </mt-field>
            <!--司机 @change="changeFoo"-->
            <hr width="100%" color="#f5f5f5" size="1">
            <mt-field :class="{active1: isActive3}" class="mint-insList" label="司机责任险" v-model="registerDate" type="text" :disabled="true">
              <label :class="{active1: isActive3}" class="mint-checkitem" v-if="postdata.bsRiskKind.items[2].coverage =='不投保'">
                <!-- <input v-model="postdata.bsRiskKind.items[2].isDeductible" class="dd" readonly="readonly" type="checkbox"> -->
                <i>&#10004;</i>不计免赔</label>
              <label :class="{active1: isActive3}" class="mint-checkitem" v-if="postdata.bsRiskKind.items[2].coverage !='不投保'"><input v-model="postdata.bsRiskKind.items[2].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
              <label><input :class="{active1: isActive3}" class="mint-input" type="text" readonly="readonly" v-model="postdata.bsRiskKind.items[2].coverage" @click="driverDate"><i class="ico-arrow"></i></label>
            </mt-field>
            <!--乘客 @change="changeFoos"-->
            <hr width="100%" color="#f5f5f5" size="1">
            <mt-field :class="{active1: isActive4}" class="mint-insList" label="乘客责任险" v-model="registerDate" type="text" :disabled="true">
              <label :class="{active1: isActive4}" class="mint-checkitem" v-if="postdata.bsRiskKind.items[3].coverage =='不投保'">
                <!-- <input v-model="postdata.bsRiskKind.items[3].isDeductible" class="dd" readonly="readonly" type="checkbox"> -->
                <i>&#10004;</i>不计免赔</label>
              <label :class="{active1: isActive4}" class="mint-checkitem" v-if="postdata.bsRiskKind.items[3].coverage !='不投保'"><input v-model="postdata.bsRiskKind.items[3].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
              <label><input :class="{active1: isActive4}" class="mint-input" type="text" readonly="readonly" v-model="postdata.bsRiskKind.items[3].coverage == '不投保' ? postdata.bsRiskKind.items[3].coverage : postdata.bsRiskKind.items[3].coverage + '/座'" @click="passengerDate"><i class="ico-arrow"></i></label>
            </mt-field>
            <!--全车盗抢险-->
            <hr width="100%" color="#f5f5f5" size="1">
            <mt-field :class="{active1: isActive5}" class="mint-insList" label="全车盗抢险" v-model="registerDate" type="text" :disabled="true">
              <label :class="{active1: isActive5}" class="mint-checkitem" v-if="Dumb =='不投保'">
                <!-- <input v-model="postdata.bsRiskKind.items[4].isDeductible" class="dd" readonly="readonly" @change="changeFoo" type="checkbox"> -->
                <i>&#10004;</i>不计免赔</label>
              <label :class="{active1: isActive5}" class="mint-checkitem" v-if="Dumb !='不投保'"><input v-model="postdata.bsRiskKind.items[4].isDeductible" class="dd" readonly="readonly" @change="changeFoo" type="checkbox"><i>&#10004;</i>不计免赔</label>
              <label><input :class="{active1: isActive5}" class="mint-input" type="text" readonly="readonly" v-model="Dumb" @click="DumbDate"><i class="ico-arrow"></i></label>
            </mt-field>
            <!--无法找到第三方-->
            <hr width="100%" color="#f5f5f5" size="1">
            <div id="isshowss" v-show="tianshow">
              <div id="wufaone">
                <div :class="{active1: isActive6}" style="padding-left:4%;padding-right:4%;line-height:40px;display:flex;
                justify-content: space-between;font-size:12px;color:#333" id="wufa">
                  <span :class="{active1: isActive6}" id="sex" style="font-size:12px;color:#333">
                    无法找到第三方特约险
                  </span>
                  <label class="mint-checkitem freefree">
                  </label>
                  <label style="display: flex;align-items: center;"><input :class="{active1: isActive6}" readonly="readonly" class="mint-input" id="thirdlys" type="text" @click="thirdlysTWO" v-model="threetian" style="text-align:right;margin-right:-6px"><img :src="rightImg" style="width: 18px;height: 18px;margin-right:-6px"></label>
                </div>
              </div>
              <!-- <hr width="100%" color="#f5f5f5" size="1">
                <mt-field :class="{active1: isActive6}" class="mint-insList" label="无法找到第三方特约险" v-model="thirdlyVisible" type="text" :disabled="true">
                  <label><input :class="{active1: isActive6}" class="mint-input" type="text" @click="thirdlysTWO" v-model="threetian"><i class="ico-arrow"></i></label>
                </mt-field> -->
              <div class="mint-region">
                <!--玻璃  @change="boli"-->
                <hr width="100%" color="#f5f5f5" size="1">
                <mt-field :class="{active1: isActive7}" class="mint-insList" label="玻璃单独破损险" v-model="registerDate" type="text" :disabled="true">
                  <!--     <label :class="{active1: isActive7}" class="mint-checkitem"><input v-model="postdata.bsRiskKind.items[5].isDeductible" class="dd" type="checkbox"><i>&#10004;</i>不计免赔</label>-->
                  <label for=""> <input :class="{active1: isActive7}" readonly="readonly" class="mint-input" type="text" v-model="glass" @click="glassDate"><i class="ico-arrow"></i></label>
                </mt-field>
                <!--自燃险-->
                <hr width="100%" color="#f5f5f5" size="1">
                <mt-field :class="{active1: isActive8}" class="mint-insList" label="自燃损失险" v-model="registerDate" type="text" :disabled="true">
                  <label :class="{active1: isActive8}" class="mint-checkitem" v-if="selfignite =='不投保'">
                    <!-- <input v-model="postdata.bsRiskKind.items[7].isDeductible" readonly="readonly" class="dd" type="checkbox"> -->
                    <i>&#10004;</i>不计免赔</label>
                  <label :class="{active1: isActive8}" class="mint-checkitem" v-if="selfignite !='不投保'"><input v-model="postdata.bsRiskKind.items[7].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
                  <!--<label class="mint-checkitem"><input v-model="postdata.bsRiskKind.items[7].isDeductible" class="dd" type="checkbox"><i class="cc">&#10004;</i></label>-->
                  <label><input :class="{active1: isActive8}" class="mint-input" readonly="readonly" type="text" v-model="selfignite" @click="selfDate"><i class="ico-arrow"></i></label>
                </mt-field>
                <!--划痕险-->
                <hr width="100%" color="#f5f5f5" size="1">
                <mt-field :class="{active1: isActive9}" class="mint-insList" label="划痕险" v-model="registerDate" type="text" :disabled="true">
                  <label :class="{active1: isActive9}" class="mint-checkitem" v-if="scratchONE =='不投保'">
                    <!-- <input v-model="postdata.bsRiskKind.items[8].isDeductible" readonly="readonly" class="dd" type="checkbox"> -->
                    <i>&#10004;</i>不计免赔</label>
                  <label :class="{active1: isActive9}" class="mint-checkitem" readonly="readonly" v-if="scratchONE !='不投保'"><input v-model="postdata.bsRiskKind.items[8].isDeductible" class="dd" type="checkbox"><i>&#10004;</i>不计免赔</label>
                  <label><input :class="{active1: isActive9}" class="mint-input" readonly="readonly" type="text" v-model="scratchONE" @click="scratchDate"><i class="ico-arrow"></i></label>
                </mt-field>
                <!--涉水险-->
                <hr width="100%" color="#f5f5f5" size="1">
                <mt-field :class="{active1: isActive0}" class="mint-insList" label="涉水险" v-model="registerDate" type="text" :disabled="true">
                  <label :class="{active1: isActive0}" class="mint-checkitem" v-if="wadecc =='不投保'">
                    <!-- <input v-model="postdata.bsRiskKind.items[9].isDeductible" class="dd" readonly="readonly" type="checkbox"> -->
                    <i>&#10004;</i>不计免赔</label>
                  <label :class="{active1: isActive0}" class="mint-checkitem" readonly="readonly" v-if="wadecc !='不投保'"><input v-model="postdata.bsRiskKind.items[9].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
                  <!--<label class="mint-checkitem"><input v-model="postdata.bsRiskKind.items[9].isDeductible" class="dd" type="checkbox"><i class="cc">&#10004;</i></label>-->
                  <label><input :class="{active1: isActive0}" class="mint-input" type="text" v-model="wadecc" @click="wadeinfo"><i class="ico-arrow"></i></label>
                </mt-field>
                <!--指定修理厂险-->
                <!--新增设备损失险-->
                <!--车上货物责任险-->
                <!--法定节假日翻倍险-->
                <hr width="100%" color="#f5f5f5" size="1">
                <mt-field :class="{active1: isActive10}" class="mint-insList" label="指定修理厂险" v-model="showZDXLC" type="text" :disabled="true">
                  <label><input :class="{active1: isActive10}" class="mint-input" type="text" v-model="zdxlcValue" @click="showZDXLCPop"><i class="ico-arrow"></i></label>
                </mt-field>
                <hr width="100%" color="#f5f5f5" size="1">
                <mt-field :class="{active1: isActive11}" class="mint-insList" label="新增设备损失险" v-model="showXZSBSS" type="text" :disabled="true">
                  <label><input :class="{active1: isActive11}" class="mint-input" type="text" v-model="xzsbssValue" @click="showXZSBSSPop"><i class="ico-arrow"></i></label>
                </mt-field>
                <hr width="100%" color="#f5f5f5" size="1">
                <div v-show="hasSzx">
                  <mt-field :class="{active1: isActive11}" class="mint-insList" label="车上货物责任险" v-model="showCSHWZRX" type="text" :disabled="true">
                    <label :class="{active1: isActive11}" class="mint-checkitem" v-if="cshwzrxValue =='不投保'">
                      <i>&#10004;</i>不计免赔</label>
                    <label :class="{active1: isActive11}" class="mint-checkitem" readonly="readonly" v-if="cshwzrxValue !='不投保'"><input v-model="postdata.bsRiskKind.items[12].isDeductible" class="dd" readonly="readonly" type="checkbox"><i>&#10004;</i>不计免赔</label>
                    <label><input :class="{active1: isActive11}" class="mint-input" type="text" v-model="cshwzrxValue" @click="showCSHWZRXPop"><i class="ico-arrow"></i></label>
                  </mt-field>
                  <hr width="100%" color="#f5f5f5" size="1">
                  <mt-field :class="{active1: isActive12}" class="mint-insList" label="法定节假日翻倍险" type="text" :disabled="true">
                    <label><input :class="{active1: isActive12}" class="mint-input" type="text" v-model="fdjjrfbxValue" @click="showFdjjrfbxPop"><i class="ico-arrow"></i></label>
                  </mt-field>
                  <hr width="100%" color="#f5f5f5" size="1">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--车损险弹框-->
        <mt-popup v-model="damageVisible" position="bottom" popup-transition="popup-fade">
          <div>
            <p style="line-height:40px;width:100%;text-align: center;border-bottom: 1px solid #eee;"><span @click="canceldamage">不投保</span></p>
            <p style="line-height:40px;width:100%;text-align: center"><span @click="selectdamage">投保</span></p>
          </div>
        </mt-popup>
        <!--第三者弹框-->
        <mt-popup v-model="popSeatVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="cancelSeatBox" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectSeatNum" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="optionCoverages" @change="onSeatsChange"></mt-picker>
        </mt-popup>
        <!--司机责任险弹框-->
        <mt-popup v-model="driverVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="canceldriver" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectdriver" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="driverDates" @change="driverChange"></mt-picker>
        </mt-popup>
        <!--乘客责任险弹框-->
        <mt-popup v-model="passengerVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="cancelpassenger" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectpassenger" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="driverDates" @change="passengerChange"></mt-picker>
        </mt-popup>
        <!--全车盗抢险-->
        <mt-popup v-model="DumbVisible" position="bottom" popup-transition="popup-fade">
          <div>
            <p style="line-height:40px;width:100%;text-align: center;border-bottom: 1px solid #eee;"><span @click="cancelDumb">不投保</span></p>
            <p style="line-height:40px;width:100%;text-align: center"><span @click="selectDumb">投保</span></p>
          </div>
        </mt-popup>
        <!--无法-->
        <mt-popup v-model="thirdlyVisible" position="bottom" popup-transition="popup-fade">
          <div>
            <p style="line-height:40px;width:100%;text-align: center;border-bottom: 1px solid #eee;"><span @click="cancelthirdly">不投保</span></p>
            <p style="line-height:40px;width:100%;text-align: center"><span @click="selectthirdly">投保</span></p>
          </div>
        </mt-popup>
        <!--玻璃-->
        <mt-popup v-model="glassVisible" position="bottom" popup-transition="popup-fade">
          <div>
            <p style="line-height:40px;width:100%;text-align: center;border-bottom: 1px solid #eee;"><span @click="cancelglass">不投保</span></p>
            <p style="line-height:40px;width:100%;text-align: center;border-bottom: 1px solid #eee;"><span @click="selectglass">国产</span></p>
            <p style="line-height:40px;width:100%;text-align: center"><span @click="selectglassTOW">进口</span></p>
          </div>
        </mt-popup>
        <!--自燃-->
        <mt-popup v-model="selfVisible" position="bottom" popup-transition="popup-fade">
          <div>
            <p style="line-height:40px;width:100%;text-align: center;border-bottom: 1px solid #eee;"><span @click="cancelself">不投保</span></p>
            <p style="line-height:40px;width:100%;text-align: center"><span @click="selectself">投保</span></p>
          </div>
        </mt-popup>
        <!--划痕险弹框-->
        <mt-popup v-model="scratchVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="cancelscratch" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectscratch" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="scratchDates" @change="scratchChange"></mt-picker>
        </mt-popup>
        <!--涉水-->
        <mt-popup v-model="wadeccVisible" position="bottom" popup-transition="popup-fade">
          <div>
            <p style="line-height:40px;width:100%;text-align: center;border-bottom: 1px solid #eee;"><span @click="cancelwadecc">不投保</span></p>
            <p style="line-height:40px;width:100%;text-align: center"><span @click="selectwadecc">投保</span></p>
          </div>
        </mt-popup>
        <!--翻倍险-->
        <mt-popup v-model="showFdjjrfbx" position="bottom" popup-transition="popup-fade">
          <div>
            <p style="line-height:40px;width:100%;text-align: center;border-bottom: 1px solid #eee;"><span @click="cancelFdjjrfbx">不投保</span></p>
            <p style="line-height:40px;width:100%;text-align: center"><span @click="selectFdjjrfbx">投保</span></p>
          </div>
        </mt-popup>
        <!--指定修理厂-->
        <mt-popup v-model="showZDXLC" position="bottom" popup-transition="popup-fade">
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
            <p style="color:#888;font-size:12px;margin-left:15px">浮动比率调整范围:
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
        <van-popup v-model="showXZSBSS" position="bottom">
          <div class="mint-region" style="background-color:#F5F5F5">
            <mt-header class="def-header" title="">
              <div slot="left">
                <p style="color:#333;font-weight:bold;margin-left:5px;line-height:30px;font-size:18px;float:left">新增设备损失险调整</p>
              </div>
              <div slot="right" style="display:flex;height:30px">
                <van-button icon="add-o" style="color:#f94037;font-size:12px" type="default" size="small" @click="addDevice" plain>新增</van-button>
              </div>
            </mt-header>
            <div style="padding-bottom:10px">
              <div style="margin:10px;border:1px solid #F9F9F9;border-radius:5px;background-color:#FFF;" v-for="(deviceInfo,index) in devices" :key="index">
                <p style="padding:10px">
                  <span style="font-size:16px;font-weight:bold">设备{{index + 1}}</span>
                  <img :src="deleteImg" style="width:24px;height:24px;position:absolute;left:90%" @click="delDevice(index)">
                </p>
                <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
                <mt-field class="mint-formItm" label="设备名称：" :disabled="true">
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
                <mt-field class="mint-formItm" label="设备数量：" :disabled="true">
                  <input class="mint-input" type="number" v-model="deviceInfo.count" placeholder="输入数量">
                </mt-field>
                <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px;margin-top:5px" />
                <mt-field class="mint-formItm" label="设备金额：" :disabled="true">
                  <input class="mint-input" type="number" v-model="deviceInfo.price" placeholder="输入金额">
                </mt-field>
                <hr width="100%" color="#f5f5f5" size="1" style="padding-top:0.1px" />
                <mt-field class="mint-formItm" label="购买日期" :disabled="true" type="text">
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
        <mt-popup v-model="showCSHWZRX" position="bottom" popup-transition="popup-fade">
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
      </div>
      <p style="color: #333333;font-size: 14px;" v-show="itemDetail.images.length > 0">附件信息：</p>
      <div v-for="itemImg in itemDetail.images">
        <img :src="itemImg.filePath" style="width: 83%;" />
      </div>
    </div>
    <mt-button class="btn-fixed" @click="commitData" size="large" type="primary">确认更新</mt-button>
  </div>
</template>
<script>
import {
  axiosGetAPI,
  axiosPostAPI,
  axiosPutAPI
} from './../../common/Axios';
import {
  Indicator,
  Toast
} from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
var carInsuranceData = {
  bzBeginDate: "",
  bsBeginDate: "",
  riskKinds: [{
    "coverage": "",
    "riskKindItemCode": "",
    "isDeductible": "",
    "glassMadeInChina": "",
    "rate": ""
  }],
  xzsbxItems: [],
}
export default {
  data() {
    return {
      fieldName: [],
      imgName: [],
      causeOffailure: [],
      showcauseOffailure: false,
      enterList: false,
      listRadio: '1',
      isShowcause: false,
      itemDetail: {},
      id: '',
      statusDisplay: '',
      status: '',
      enquiryInfo: [],
      riskKinds: [],
      typeOfWorks: [],
      optionWork: [],
      valueWork: '',
      feildData: {},
      categoryItems: [],
      category: [],
      categoryType: false,
      categoryValue: '',
      selectedIndex: '1',
      notcarInsurance: false,
      carInsurance: false,
      showPurchaseDate: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      purchaseDate: new Date(),
      closeImg: (this.src = require("../../assets/images/ico-close.png")),
      editImg: (this.src = require("../../assets/images/ic-edit.png")),
      addDeviceImg: (this.src = require("../../assets/images/ic-add-device.png")),
      deleteImg: (this.src = require("../../assets/images/ic-delete.png")),
      rightImg: (this.src = require("../../assets/images/right.png")),
      deviceInfo: {
        name: "",
        count: "",
        price: "",
        purchaseDate: "",
        origin: ""
      },
      devices: [],
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
          items: [{
              coverage: "不投保",
              riskKindItemCode: "CSX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "SZX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "SJZRX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "CKZRX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "DQX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "BLX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "WFZDDSF",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "ZRX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "HHX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "SSX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "ZDXLC",
              isDeductible: false,
              rate: 0
            },
            {
              coverage: "不投保",
              riskKindItemCode: "XZSBSS",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "CSHWZRX",
              isDeductible: false
            },
            {
              coverage: "不投保",
              riskKindItemCode: "FDJJRFBX",
              isDeductible: false
            },
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
      zdxlcRate: 20,
      cshwzrxAmount: "",
      showZDXLC: false,
      showXZSBSS: false,
      showCSHWZRX: false,
      showFdjjrfbx: false,
      zdxlcValue: "不投保",
      xzsbssValue: "不投保",
      fdjjrfbxValue: "不投保",
      cshwzrxValue: "不投保",
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
      scratchONE: '不投保',
      beginDate: '',
      startDate: new Date(this.Common.Public.GetDateStr(1)),
      endDate: new Date(this.Common.Public.GetDateStr(91)),
      registerDate: '2017-12-27',
      pickerValue: '',
      pickerValueTWO: '',
      selected: '1',
      threepartydata: '不投保',
      passengerPicker: '不投保',
      passengerPickerss: '不投保',
      driverPicker: '不投保',
      driverduty: '不投保',
      passenger: '不投保',
      threetian: '不投保',
      Dumb: "不投保",
      glass: '不投保',
      damagevalue: '不投保',
      selfignite: '不投保',
      wadecc: '不投保',
      optionCoverages: [{
        flex: 1,
        defaultIndex: 0,
        values: ['不投保', '50000', '100000', '150000', '200000', '300000', '500000', '1000000', '1500000',
          '2000000'
        ],
        className: 'slot0'
      }],
      driverDates: [{
        flex: 1,
        defaultIndex: 0,
        values: ['不投保', '10000', '20000', '30000', '50000', '100000', '200000', '300000'],
        className: 'slot0'
      }],
      scratchDates: [{
        flex: 1,
        defaultIndex: 0,
        values: ['不投保', '2000', '5000', '10000', '20000'],
        className: 'slot0'
      }],
      hasRepair: false,
      hasNonCar: false,
      currentCategoryIndex: 0,
      nonAuto: [],
      carData: [],
      currentIndex: 0,
      detailIndex: 0,
      enquiryParameters: [],
      productName: ''
    }
  },
  created: function() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    this.bindVehicleData();
    // Indicator.open('加载中...');
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
    this.canModifyCSX = false;
  },
  methods: {
    bindVehicleData: function() {
      axiosGetAPI('/enquiry/policies/' + this.id).then(res => {
        Indicator.close();
        if (res.result) {
          this.itemDetail = res.result;
          this.enquiryInfo = JSON.parse(res.result.enquiryInfo);
          this.enquiryParameters = res.result.enquiryParameters;
          this.status = res.result.status;
          this.riskKinds = res.result.riskKinds;
          this.typeOfWorks = res.result.typeOfWorks;
          this.productName = res.result.productName;
          this.getEnquiryType("car");
        }
      })
    },
    bindRiskItems: function() {
      if (this.carData[0] && this.carData[0].details) {
        for (var k = 0; k < this.carData[0].details.length; k++) {
          var _item = this.carData[0].details[k];
          for (var m = 0; m < this.enquiryParameters.length; m++) {
            var parameter = this.enquiryParameters[m];
            if (_item.fieldName == parameter.key) {
              if (_item.fieldType == "option") {
                _item.text = parameter.value;
                _item.uploadValue = parameter.value;
                this.$set(_item, 'uploadValue', parameter.value);
              } else {
                _item.value = parameter.value;
              }
            }
          }
        }
      }

      this.zdxlcValue = '不投保';
      this.xzsbssValue = '不投保';
      this.fdjjrfbxValue = '不投保';
      this.cshwzrxValue = '不投保';
      this.scratchONE = '不投保';
      this.threepartydata = '不投保';
      this.passengerPicker = '不投保';
      this.passengerPickerss = '不投保';
      this.driverPicker = '不投保';
      this.driverduty = '不投保';
      this.passenger = '不投保';
      this.threetian = '不投保';
      this.Dumb = '不投保';
      this.glass = '不投保';
      this.damagevalue = '不投保';
      this.selfignite = '不投保';
      this.wadecc = '不投保';
      if (this.itemDetail.bzBeginDate) {
        var arr1 = this.itemDetail.bzBeginDate.split(' ')
        this.postdata.bzRiskKind.beginDate = arr1[0];
      }

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

      if (this.itemDetail.bsBeginDate) {
        var arr1 = this.itemDetail.bsBeginDate.split(' ')
        this.postdata.bsRiskKind.beginDate = arr1[0];
      }
      var arr3 = this.riskKinds;
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
        }
        //第三者
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[1].riskKindItemCode) {
          this.isActive2 = false;
          this.hasSzx = true;
        }
        //司机
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[2].riskKindItemCode) {
          this.isActive3 = false;
        }
        //乘客
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[3].riskKindItemCode) {
          this.isActive4 = false;
        }
        //全车盗抢
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[4].riskKindItemCode) {
          this.postdata.bsRiskKind.items[4].coverage = '';
          this.Dumb = '投保';
          this.isActive5 = false;
        }
        //无法三
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[6].riskKindItemCode) {
          this.threetian = '投保';
          this.postdata.bsRiskKind.items[6].coverage = '';
          this.isActive6 = false;
        }
        //玻璃
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[5].riskKindItemCode) {
          if (this.postdata.bsRiskKind.items[5].coverage == 'Import') this.glass = '进口';
          if (this.postdata.bsRiskKind.items[5].coverage == 'Home') this.glass = '国产';
          this.isActive7 = false;
        }
        //自燃
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[7].riskKindItemCode) {
          this.selfignite = '投保'
          this.postdata.bsRiskKind.items[7].coverage = '';
          this.isActive8 = false;
        }
        //划痕
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[8].riskKindItemCode) {
          this.scratchONE = this.postdata.bsRiskKind.items[8].coverage;
          this.isActive9 = false;
        }
        //涉水
        if (arr3[i].riskKindItemCode == this.postdata.bsRiskKind.items[9].riskKindItemCode) {
          this.wadecc = '投保';
          this.postdata.bsRiskKind.items[9].coverage == '';
          this.isActive0 = false;
        }
      }
      // console.log("选择的方案" + JSON.stringify(this.postdata));
    },
    openBack: function() {
      window.history.back();
    },
    getEnquiryType(type) {
      var self = this;
      axiosGetAPI('/enquiry/' + type + '/products').then(res => {
        if (res.result) {
          if (type == 'NonAuto') {
            self.feildData = res;
            self.nonAuto = res.result;
            res.result.map(item => {
              self.category.push(item.productName);
            });
          }
          if (type == 'car') {
            // res.result.map(item => {
            for (var l = 0; l < res.result.length; l++) {
              var item = res.result[l];
              if (item.productName == this.productName) { //判断车险类型
                this.fieldName = [];
                // item.details.map(_item => {
                for (var k = 0; k < item.details.length; k++) {
                  var _item = item.details[k];
                  if (_item.fieldType == "option") {
                    _item.option = [];
                    var arr = _item.value.split(',');
                    for (var i = 0; i < arr.length; i++) {
                      var obj = {};
                      obj.text = arr[i];
                      obj.value = i;
                      _item.option.push(obj);
                    }
                    for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (_item.fieldName == this.enquiryParameters[key].key) {
                        this.$set(_item, "uploadValue", this.enquiryParameters[key].value);
                      }
                    }
                  }
                  if (_item.fieldType == "file" || _item.fieldType == "image") {
                    var uploadValue = "";
                    var fileList = [];
                    for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (_item.fieldName == this.enquiryParameters[key].key) {
                        if (this.enquiryParameters[key].type == "file") {
                          var obj = {};
                          obj.url = this.enquiryParameters[key].fileName;
                          obj.value = this.enquiryParameters[key].value;
                          fileList.push(obj);
                        }
                        if (this.enquiryParameters[key].type == "image") {
                          var obj = {};
                          obj.url = this.enquiryParameters[key].filePath;
                          fileList.push(obj);
                        }
                      }
                    }
                    this.$set(_item, "uploadValue", "");
                    this.$set(_item, "fileList", fileList);
                  }
                  if (_item.fieldType == "text" || _item.fieldType == "number") {
                    for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (_item.fieldName == this.enquiryParameters[key].key) {
                        this.$set(_item, "uploadValue", this.enquiryParameters[key].value);
                      }
                    }
                  }
                }

                if (item.basicInfo) {
                  if (item.basicInfo.basicInfoDetails) {
                    for (var j = 0; j < item.basicInfo.basicInfoDetails.length; j++) {
                      var detailsItem = item.basicInfo.basicInfoDetails[j];
                      detailsItem.value = detailsItem.value ? detailsItem.value : "";
                      if (detailsItem.fieldType == "option") {
                        this.$set(detailsItem, "uploadValue", '');
                        detailsItem.option = [];
                        var arr = detailsItem.value.split(",");
                        for (var k = 0; k < arr.length; k++) {
                          var obj = {};
                          obj.text = arr[k];
                          obj.value = arr[k];
                          detailsItem.option.push(obj);
                        }
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                      if (detailsItem.fieldType == "file" || detailsItem.fieldType == "image") {
                        var uploadValue = "";
                        var fileList = [];
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            if (this.enquiryParameters[key].type == "file") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].fileName;
                              obj.value = this.enquiryParameters[key].value;
                              fileList.push(obj);
                            }
                            if (this.enquiryParameters[key].type == "image") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].filePath;
                              fileList.push(obj);
                            }
                          }
                        }
                        this.$set(detailsItem, "uploadValue", "");
                        this.$set(detailsItem, "fileList", fileList);
                      }
                      if (detailsItem.fieldType == "text" || detailsItem.fieldType == "number") {
                        this.$set(detailsItem, "uploadValue", "");
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                    }
                  }
                  if (item.basicInfo.lastYearInfoDetails) {
                    for (var j = 0; j < item.basicInfo.lastYearInfoDetails.length; j++) {
                      var detailsItem = item.basicInfo.lastYearInfoDetails[j];
                      detailsItem.value = detailsItem.value ? detailsItem.value : "";
                      if (detailsItem.fieldType == "option") {
                        this.$set(detailsItem, "uploadValue", '');
                        detailsItem.option = [];
                        var arr = detailsItem.value.split(",");
                        for (var k = 0; k < arr.length; k++) {
                          var obj = {};
                          obj.text = arr[k];
                          obj.value = arr[k];
                          detailsItem.option.push(obj);
                        }
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                      if (detailsItem.fieldType == "file" || detailsItem.fieldType == "image") {
                        var uploadValue = "";
                        var fileList = [];
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            if (this.enquiryParameters[key].type == "file") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].fileName;
                              obj.value = this.enquiryParameters[key].value;
                              fileList.push(obj);
                            }
                            if (this.enquiryParameters[key].type == "image") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].filePath;
                              fileList.push(obj);
                            }
                          }
                        }
                        this.$set(detailsItem, "uploadValue", "");
                        this.$set(detailsItem, "fileList", fileList);
                      }
                      if (detailsItem.fieldType == "text" || detailsItem.fieldType == "number") {
                        this.$set(detailsItem, "uploadValue", "");
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                    }
                  }

                  if (item.basicInfo.currYearInfoDetails) {
                    for (var j = 0; j < item.basicInfo.currYearInfoDetails.length; j++) {
                      var detailsItem = item.basicInfo.currYearInfoDetails[j];
                      detailsItem.value = detailsItem.value ? detailsItem.value : "";
                      if (detailsItem.fieldType == "option") {
                        this.$set(detailsItem, "uploadValue", '');
                        detailsItem.option = [];
                        var arr = detailsItem.value.split(",");
                        for (var k = 0; k < arr.length; k++) {
                          var obj = {};
                          obj.text = arr[k];
                          obj.value = arr[k];
                          detailsItem.option.push(obj);
                        }
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                      if (detailsItem.fieldType == "file" || detailsItem.fieldType == "image") {
                        var uploadValue = "";
                        var fileList = [];
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            if (this.enquiryParameters[key].type == "file") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].fileName;
                              obj.value = this.enquiryParameters[key].value;
                              fileList.push(obj);
                            }
                            if (this.enquiryParameters[key].type == "image") {
                              var obj = {};
                              obj.url = this.enquiryParameters[key].filePath;
                              fileList.push(obj);
                            }
                          }
                        }
                        this.$set(detailsItem, "uploadValue", "");
                        this.$set(detailsItem, "fileList", fileList);
                      }
                      if (detailsItem.fieldType == "text" || detailsItem.fieldType == "number") {
                        this.$set(detailsItem, "uploadValue", "");
                        for (var key = 0; key < this.enquiryParameters.length; key++) {
                          if (detailsItem.fieldName == this.enquiryParameters[key].key) {
                            detailsItem.uploadValue = this.enquiryParameters[key].value
                          }
                        }
                      }
                    }
                  }
                }
                self.carData.push(item);
              }
            }
            this.bindRiskItems();
          }
        }
      })
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
      var deviceInfo = {
        name: "",
        count: "",
        price: "",
        purchaseDate: "",
        origin: ""
      };
      this.devices.push(deviceInfo);
    },
    delDevice: function(index) {
      this.devices.splice(index, 1)
    },
    changeFoo: function(e) {
      this.isshow = !this.isshow;
    },
    jqx: function() {
      if (this.compulsory == false) {
        this.postdata.bzRiskKind.beginDate = '';
      }
    },
    //强交险生效日期
    selRegisterDate: function() {
      this.$refs.picker.open();
    },
    handleConfirm: function() {
      this.postdata.bzRiskKind.beginDate = this.Common.Public.dateString(this.pickerValue)
      this.$refs.picker.close();
    },
    //商业险生效日期
    selRegisterDateTWO: function() {
      this.$refs.pickerTWO.open();
    },
    handleConfirmTWO: function(value) {
      this.postdata.bsRiskKind.beginDate = this.Common.Public.dateString(this.pickerValueTWO)
      this.$refs.pickerTWO.close();
    },
    //车损damageDate
    damageDate: function() {
      this.damageVisible = true;
    },
    canceldamage: function() {
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
      this.damageVisible = false;
      this.isActive1 = false;
      this.damagevalue = '投保';
      this.postdata.bsRiskKind.items[0].isDeductible = true;
      this.tianshow = true;
      this.postdata.bsRiskKind.items[0].coverage = '投保'
    },
    //指定修理厂
    showZDXLCPop: function() {
      this.showZDXLC = true;
    },
    cancelZDXLCPop: function() {
      this.showZDXLC = false;
      this.zdxlcRate = "";
      this.zdxlcValue = "不投保";
      this.postdata.bsRiskKind.items[10].coverage = '不投保';
      this.postdata.bsRiskKind.items[10].isDeductible = false;
    },
    modifyZDXLCAmount: function() {
      if (this.zdxlcValue) {
        var zdxl = (this.zdxlcValue == "国产" ? "Home" : "Import");
        if (this.zdxlcRate) {
          if (this.zdxlcValue == "国产" && (this.zdxlcRate < 10 || this.zdxlcRate > 30)) {
            Toast('请输入有效的浮动比率');
            this.zdxlcRate = "";
            this.zdxlcValue = "不投保";
            return false;
          } else if (this.zdxlcValue == "进口" && (this.zdxlcRate < 15 || this.zdxlcRate > 60)) {
            Toast('请输入有效的浮动比率');
            this.zdxlcRate = "";
            this.zdxlcValue = "不投保";
            return false;
          }
        } else {
          Toast('请输入有效的浮动比率');
          this.zdxlcRate = "";
          this.zdxlcValue = "不投保";
          return false;
        }
        this.showZDXLC = false;
        this.postdata.bsRiskKind.items[10].rate = (this.zdxlcRate / 100);
        this.postdata.bsRiskKind.items[10].coverage = zdxl;
        this.postdata.bsRiskKind.items[10].isDeductible = false;
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
    cancelXZSBSSPop: function() {
      this.showXZSBSS = false;
      this.xzsbssValue = "不投保";
      this.devices = [];
    },
    modifyXZSBSSAmount: function() {
      this.showXZSBSS = false;
      if (this.devices && this.devices.length > 0) {
        for (var i = 0; i < this.devices.length; i++) {
          var device = this.devices[i];
          if (!device.name || !device.origin || !device.count ||
            !device.price || !device.purchaseDate) {
            this.devices.splice(i);
          }
        }
        if (this.devices && this.devices.length > 0) {
          this.xzsbssValue = "投保";
          this.postdata.bsRiskKind.items[11].coverage = '投保';
          this.postdata.bsRiskKind.items[11].isDeductible = true;
        } else {
          this.xzsbssValue = "不投保";
          this.postdata.bsRiskKind.items[11].coverage = '不投保';
          this.postdata.bsRiskKind.items[11].isDeductible = false;
        }
      } else {
        this.showXZSBSS = false;
        this.xzsbssValue = "不投保";
        this.postdata.bsRiskKind.items[11].coverage = '不投保';
        this.postdata.bsRiskKind.items[11].isDeductible = false;
      }
    },
    //车上货物责任险
    showCSHWZRXPop: function() {
      this.showCSHWZRX = true;
    },
    cancelCSHWZRXPop: function() {
      this.showCSHWZRX = false;
      this.cshwzrxValue = "不投保";
      this.cshwzrxAmount = "";
      this.postdata.bsRiskKind.items[12].coverage = '不投保';
      this.postdata.bsRiskKind.items[12].isDeductible = false;
    },
    modifyCSHWZRXAmount: function() {
      if (this.cshwzrxAmount && this.cshwzrxAmount > 0) {
        this.showCSHWZRX = false;
        this.cshwzrxValue = this.cshwzrxAmount;
        this.postdata.bsRiskKind.items[12].coverage = this.cshwzrxAmount;
        this.postdata.bsRiskKind.items[12].isDeductible = true;
      } else {
        Toast('请输入有效的保额');
        this.postdata.bsRiskKind.items[12].coverage = '不投保';
        this.postdata.bsRiskKind.items[12].isDeductible = false;
        return false;
      }
    },
    onSeatsChange(picker, values) {
      this.passengerPicker = values[0];
    },
    //三者
    threeparty: function() {
      this.popSeatVisible = true;
    },
    cancelSeatBox: function() {
      this.popSeatVisible = false;
      this.hasSzx = false;
      this.postdata.bsRiskKind.items[1].coverage = '不投保';
      this.postdata.bsRiskKind.items[1].isDeductible = false;
      this.postdata.bsRiskKind.items[12].coverage = '不投保';
      this.postdata.bsRiskKind.items[12].isDeductible = false;
      this.postdata.bsRiskKind.items[13].coverage = '不投保';
      this.postdata.bsRiskKind.items[13].isDeductible = false;
    },
    selectSeatNum: function() {
      this.popSeatVisible = false;
      if (this.passengerPicker == '不投保') {
        this.postdata.bsRiskKind.items[1].coverage = '不投保';
        this.postdata.bsRiskKind.items[1].isDeductible = false;
        this.isActive2 = true;
        this.hasSzx = false;
      } else {
        this.hasSzx = true;
        this.isActive2 = false;
        this.postdata.bsRiskKind.items[1].isDeductible = true;
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
    canceldriver: function() {
      this.driverVisible = false;
    },
    selectdriver: function() {
      this.driverVisible = false;
      if (this.driverPicker == '不投保') {
        //this.postdata.bsRiskKind.items[2].coverag = '';
        this.postdata.bsRiskKind.items[2].coverage = '不投保';
        this.isActive3 = true
        this.postdata.bsRiskKind.items[2].isDeductible = false
      } else {
        this.isActive3 = false;
        this.postdata.bsRiskKind.items[2].isDeductible = true;
        //this.postdata.bsRiskKind.items[2].coverage = this.driverPicker
        this.postdata.bsRiskKind.items[2].coverage = this.driverPicker
      }
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
    },
    selectpassenger: function() {
      this.passengerVisible = false;
      if (this.passengerPickerss == '不投保') {
        this.isActive4 = true;
        this.postdata.bsRiskKind.items[3].coverage = '不投保';
        this.postdata.bsRiskKind.items[3].isDeductible = false
      } else {
        this.isActive4 = false;
        this.postdata.bsRiskKind.items[3].isDeductible = true;
        this.postdata.bsRiskKind.items[3].coverage = this.passengerPickerss
      }
    },
    DumbDate: function() { //全车强盗
      this.DumbVisible = true;
    },
    cancelDumb: function() {
      this.DumbVisible = false;
      this.Dumb = '不投保';
      this.foofour = false;
      this.postdata.bsRiskKind.items[4].isDeductible = false;
      this.postdata.bsRiskKind.items[4].coverage = '不投保';
      this.isActive5 = true;
    },
    selectDumb: function() {
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
    cancelthirdly() {
      this.thirdlyVisible = false;
      this.postdata.bsRiskKind.items[6].isDeductible = false;
      this.threetian = '不投保';
      this.postdata.bsRiskKind.items[6].coverage = '不投保';
      this.isActive6 = true;
    },
    selectthirdly() {
      this.isActive6 = false;
      this.thirdlyVisible = false;
      this.postdata.bsRiskKind.items[6].isDeductible = true;
      this.threetian = '投保';
      this.postdata.bsRiskKind.items[6].coverage = ''
    },
    glassDate: function() { //玻璃
      this.glassVisible = true;
    },
    cancelglass: function() {
      this.isActive7 = true;
      this.glassVisible = false;
      this.glass = '不投保';
      this.foosfour = false;
      this.postdata.bsRiskKind.items[5].coverage = '不投保';
      this.postdata.bsRiskKind.items[5].isDeductible = false;
    },
    selectglass: function() {
      this.glassVisible = false;
      this.glass = '国产';
      this.isActive7 = false;
      this.postdata.bsRiskKind.items[5].coverage = 'Home';
      this.postdata.bsRiskKind.items[5].isDeductible = true;
    },
    selectglassTOW: function() {
      this.glassVisible = false;
      this.isActive7 = false;
      this.glass = '进口';
      this.postdata.bsRiskKind.items[5].coverage = 'Import';
      this.postdata.bsRiskKind.items[5].isDeductible = true;
    },
    selfDate: function() { //自燃
      this.selfVisible = true;
    },
    cancelself: function() {
      this.selfVisible = false;
      this.selfignite = '不投保';
      this.isActive8 = true;
      this.postdata.bsRiskKind.items[7].isDeductible = false;
      this.postdata.bsRiskKind.items[7].coverage = '不投保';
    },
    selectself: function() {
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
    cancelscratch: function() {
      this.scratchVisible = false;
    },
    selectscratch: function() {
      this.scratchONE = this.scratchPicker;
      this.scratchVisible = false;

      if (this.scratchPicker == '不投保') {
        this.postdata.bsRiskKind.items[8].coverage = '不投保';
        this.scratchONE = '不投保';
        this.isActive9 = true;
        this.postdata.bsRiskKind.items[8].isDeductible = false
      } else {
        this.postdata.bsRiskKind.items[8].coverage = this.scratchPicker
        this.postdata.bsRiskKind.items[8].isDeductible = true;
        this.isActive9 = false;
      }
    },
    wadeinfo: function() { //涉水
      this.wadeccVisible = true;
    },
    cancelwadecc: function() {
      this.wadeccVisible = false;
      this.postdata.bsRiskKind.items[9].isDeductible = false;
      this.postdata.bsRiskKind.items[9].coverage = '不投保';
      this.wadecc = '不投保';
      this.isActive0 = true;
    },
    selectwadecc: function() {
      this.wadeccVisible = false;
      this.postdata.bsRiskKind.items[9].isDeductible = true;
      this.postdata.bsRiskKind.items[9].coverage = '';
      this.wadecc = '投保';
      this.isActive0 = false;
    },
    showFdjjrfbxPop: function() { //涉水
      this.showFdjjrfbx = true;
    },
    cancelFdjjrfbx: function() {
      this.showFdjjrfbx = false;
      this.postdata.bsRiskKind.items[13].isDeductible = false;
      this.postdata.bsRiskKind.items[13].coverage = '不投保';
      this.fdjjrfbxValue = '不投保';
      this.isActive0 = true;
    },
    selectFdjjrfbx: function() {
      this.showFdjjrfbx = false;
      this.postdata.bsRiskKind.items[13].isDeductible = false;
      this.postdata.bsRiskKind.items[13].coverage = this.postdata.bsRiskKind.items[1].coverage;
      this.fdjjrfbxValue = '投保';
      this.isActive0 = false;
    },
    //提交数据
    async commitData() {
      // console.log( this.categoryItems);
      var self = this;
      var requestBody = {};
      //车险
      if (carInsuranceData) {
        var enquiryInfo = [];
        var model = {
          "enquiryInfo": "",
          "productId": "",
          "applicantName": "",
          "businessLicenseImgId": "",
          "bzBeginDate": "",
          "bsBeginDate": "",
          "riskKinds": [],
          "typeOfWorks": []
        }
        // self.carData[0].details.map(_item => {
        var _item;
        var _carData = self.carData[0];

        if (_carData.basicInfo) {
          if (_carData.basicInfo.basicInfoDetails) {
            for (var i = 0; i < _carData.basicInfo.basicInfoDetails.length; i++) {
              var nonCarData = _carData.basicInfo.basicInfoDetails[i];
              if (nonCarData.fieldType == "file") {
                nonCarData.uploadValue = ""
                var _file = [];
                for (var fileListIndex = 0; fileListIndex < nonCarData.fileList.length; fileListIndex++) {
                  if (nonCarData.fileList[fileListIndex].file) {
                    _file.push(nonCarData.fileList[fileListIndex]);
                  }
                  if (nonCarData.fileList[fileListIndex].url) {
                    if (nonCarData.uploadValue == "") {
                      nonCarData.uploadValue = nonCarData.fileList[fileListIndex].value;
                    } else {
                      nonCarData.uploadValue = nonCarData.uploadValue + "," + nonCarData.fileList[fileListIndex].value;
                    }
                  }
                }
                if (_file.length > 0) {
                  let formData = new FormData();
                  for (let _j = 0; _j < _file.length; _j++) {
                    formData.append("file" + (_j + 1), _file[_j].file);
                  }
                  Indicator.open("请稍等...");
                  await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(
                    res => {
                      Indicator.close();
                      if (res.result.length > 0) {
                        for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                          if (nonCarData.uploadValue != "") {
                            nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result[forDataIndex].id;
                          } else {
                            nonCarData.uploadValue = "" + res.result[forDataIndex].id;
                          }
                        }
                      }
                    }
                  );
                }
              }
              if (nonCarData.fieldType == "image") {
                nonCarData.uploadValue = "";
                var _file = [];
                for (var _fileListIndex = 0; _fileListIndex < nonCarData.fileList.length; _fileListIndex++) {
                  if (nonCarData.fileList[_fileListIndex].file) {
                    _file.push(nonCarData.fileList[_fileListIndex]);
                  }
                  if (nonCarData.fileList[_fileListIndex].url) {
                    for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (this.enquiryParameters[key].filePath == nonCarData.fileList[_fileListIndex].url) {
                        if (nonCarData.uploadValue == "") {
                          nonCarData.uploadValue = this.enquiryParameters[key].value;
                        } else {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + this.enquiryParameters[key].value;
                        }
                      }
                    }
                  }
                }
                var reader = new FileReader();
                if (_file.length > 0) {
                  Indicator.open("请稍等...");
                  var fileModel = {};
                  for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                    fileModel.dataURIString = _file[_indexImg].content;
                    await axiosPostAPI(
                      "/Documents?folderName=enquiry",
                      fileModel
                    ).then(res => {
                      Indicator.close();
                      if (res.result) {
                        if (nonCarData.uploadValue != "") {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result.id;
                        } else {
                          nonCarData.uploadValue = "" + res.result.id;
                        }
                      }
                    });
                  }
                }
              }
              var obj = {};
              obj.key = nonCarData.fieldName;
              obj.type = nonCarData.fieldType;
              obj.value = nonCarData.uploadValue;
              enquiryInfo.push(obj);
              if (nonCarData.required) {
                if (nonCarData.uploadValue == '') {
                  Toast('请补充' + nonCarData.fieldName);
                  Indicator.close();
                  return false;
                }
              }
            }
          }

          if (_carData.basicInfo.lastYearInfoDetails) {
            for (var i = 0; i < _carData.basicInfo.lastYearInfoDetails.length; i++) {
              var nonCarData = _carData.basicInfo.lastYearInfoDetails[i];
              if (nonCarData.fieldType == "file") {
                nonCarData.uploadValue = ""
                var _file = [];
                for (var fileListIndex = 0; fileListIndex < nonCarData.fileList.length; fileListIndex++) {
                  if (nonCarData.fileList[fileListIndex].file) {
                    _file.push(nonCarData.fileList[fileListIndex]);
                  }
                  if (nonCarData.fileList[fileListIndex].url) {
                    if (nonCarData.uploadValue == "") {
                      nonCarData.uploadValue = nonCarData.fileList[fileListIndex].value;
                    } else {
                      nonCarData.uploadValue = nonCarData.uploadValue + "," + nonCarData.fileList[fileListIndex].value;
                    }
                  }
                }
                if (_file.length > 0) {
                  let formData = new FormData();
                  for (let _j = 0; _j < _file.length; _j++) {
                    formData.append("file" + (_j + 1), _file[_j].file);
                  }
                  Indicator.open("请稍等...");
                  await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(
                    res => {
                      Indicator.close();
                      if (res.result.length > 0) {
                        for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                          if (nonCarData.uploadValue != "") {
                            nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result[forDataIndex].id;
                          } else {
                            nonCarData.uploadValue = "" + res.result[forDataIndex].id;
                          }
                        }
                      }
                    }
                  );
                }
              }
              if (nonCarData.fieldType == "image") {
                nonCarData.uploadValue = "";
                var _file = [];
                for (var _fileListIndex = 0; _fileListIndex < nonCarData.fileList.length; _fileListIndex++) {
                  if (nonCarData.fileList[_fileListIndex].file) {
                    _file.push(nonCarData.fileList[_fileListIndex]);
                  }
                  if (nonCarData.fileList[_fileListIndex].url) {
                    for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (this.enquiryParameters[key].filePath == nonCarData.fileList[_fileListIndex].url) {
                        if (nonCarData.uploadValue == "") {
                          nonCarData.uploadValue = this.enquiryParameters[key].value;
                        } else {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + this.enquiryParameters[key].value;
                        }
                      }
                    }
                  }
                }
                var reader = new FileReader();
                if (_file.length > 0) {
                  Indicator.open("请稍等...");
                  var fileModel = {};
                  for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                    fileModel.dataURIString = _file[_indexImg].content;
                    await axiosPostAPI(
                      "/Documents?folderName=enquiry",
                      fileModel
                    ).then(res => {
                      Indicator.close();
                      if (res.result) {
                        if (nonCarData.uploadValue != "") {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result.id;
                        } else {
                          nonCarData.uploadValue = "" + res.result.id;
                        }
                      }
                    });
                  }
                }
              }
              var obj = {};
              obj.key = nonCarData.fieldName;
              obj.type = nonCarData.fieldType;
              obj.value = nonCarData.uploadValue;
              enquiryInfo.push(obj);
              if (nonCarData.required) {
                if (nonCarData.uploadValue == '') {
                  Toast('请补充' + nonCarData.fieldName);
                  Indicator.close();
                  return false;
                }
              }
            }
          }
          if (_carData.basicInfo.currYearInfoDetails) {
            for (var i = 0; i < _carData.basicInfo.currYearInfoDetails.length; i++) {
              var nonCarData = _carData.basicInfo.currYearInfoDetails[i];
              if (nonCarData.fieldType == "file") {
                nonCarData.uploadValue = ""
                var _file = [];
                for (var fileListIndex = 0; fileListIndex < nonCarData.fileList.length; fileListIndex++) {
                  if (nonCarData.fileList[fileListIndex].file) {
                    _file.push(nonCarData.fileList[fileListIndex]);
                  }
                  if (nonCarData.fileList[fileListIndex].url) {
                    if (nonCarData.uploadValue == "") {
                      nonCarData.uploadValue = nonCarData.fileList[fileListIndex].value;
                    } else {
                      nonCarData.uploadValue = nonCarData.uploadValue + "," + nonCarData.fileList[fileListIndex].value;
                    }
                  }
                }
                if (_file.length > 0) {
                  let formData = new FormData();
                  for (let _j = 0; _j < _file.length; _j++) {
                    formData.append("file" + (_j + 1), _file[_j].file);
                  }
                  Indicator.open("请稍等...");
                  await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(
                    res => {
                      Indicator.close();
                      if (res.result.length > 0) {
                        for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                          if (nonCarData.uploadValue != "") {
                            nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result[forDataIndex].id;
                          } else {
                            nonCarData.uploadValue = "" + res.result[forDataIndex].id;
                          }
                        }
                      }
                    }
                  );
                }
              }
              if (nonCarData.fieldType == "image") {
                nonCarData.uploadValue = "";
                var _file = [];
                for (var _fileListIndex = 0; _fileListIndex < nonCarData.fileList.length; _fileListIndex++) {
                  if (nonCarData.fileList[_fileListIndex].file) {
                    _file.push(nonCarData.fileList[_fileListIndex]);
                  }
                  if (nonCarData.fileList[_fileListIndex].url) {
                    for (var key = 0; key < this.enquiryParameters.length; key++) {
                      if (this.enquiryParameters[key].filePath == nonCarData.fileList[_fileListIndex].url) {
                        if (nonCarData.uploadValue == "") {
                          nonCarData.uploadValue = this.enquiryParameters[key].value;
                        } else {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + this.enquiryParameters[key].value;
                        }
                      }
                    }
                  }
                }
                var reader = new FileReader();
                if (_file.length > 0) {
                  Indicator.open("请稍等...");
                  var fileModel = {};
                  for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                    fileModel.dataURIString = _file[_indexImg].content;
                    await axiosPostAPI(
                      "/Documents?folderName=enquiry",
                      fileModel
                    ).then(res => {
                      Indicator.close();
                      if (res.result) {
                        if (nonCarData.uploadValue != "") {
                          nonCarData.uploadValue = nonCarData.uploadValue + "," + res.result.id;
                        } else {
                          nonCarData.uploadValue = "" + res.result.id;
                        }
                      }
                    });
                  }
                }
              }
              var obj = {};
              obj.key = nonCarData.fieldName;
              obj.type = nonCarData.fieldType;
              obj.value = nonCarData.uploadValue;
              enquiryInfo.push(obj);
              if (nonCarData.required) {
                if (nonCarData.uploadValue == '') {
                  Toast('请补充' + nonCarData.fieldName);
                  Indicator.close();
                  return false;
                }
              }
            }
          }
        }
        for (var k = 0; k < self.carData[0].details.length; k++) {
          _item = self.carData[0].details[k];
          if (_item.fieldType == 'file') {
            self.carData[0].details[k].uploadValue = '';
            var _file = [];
            for (
              var fileListIndex = 0; fileListIndex < _item.fileList.length; fileListIndex++
            ) {
              if (_item.fileList[fileListIndex].file) {
                _file.push(_item.fileList[fileListIndex]);
              }
              if (_item.fileList[fileListIndex].url) {
                if (self.carData[0].details[k].uploadValue == "") {
                  self.carData[0].details[k].uploadValue = _item.fileList[fileListIndex].value;
                } else {
                  self.carData[0].details[k].uploadValue =
                    self.carData[0].details[k].uploadValue +
                    "," +
                    _item.fileList[fileListIndex].value;
                }
              }
            }
            let formData = new FormData();
            for (let _j = 0; _j < _file.length; _j++) {
              formData.append("file" + (_j + 1), _file[_j].file);
            }
            if (_file.length > 0) {
              Indicator.open('请稍等...');
              await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                Indicator.close();
                if (res.result.length > 0) {
                  for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                    if (self.carData[0].details[k].uploadValue != '') {
                      self.carData[0].details[k].uploadValue = self.carData[0].details[k].uploadValue + ',' + res.result[forDataIndex].id;
                    } else {
                      self.carData[0].details[k].uploadValue = res.result[forDataIndex].id;
                    }
                  }
                }
              })
            }
          }
          if (_item.fieldType == 'image') {
            self.carData[0].details[k].uploadValue = '';
            var _file = [];
            for (var _fileListIndex = 0; _fileListIndex < _item.fileList.length; _fileListIndex++) {
              if (_item.fileList[_fileListIndex].file) {
                _file.push(_item.fileList[_fileListIndex]);
              }
              if (_item.fileList[_fileListIndex].url) {
                for (var key = 0; key < this.enquiryParameters.length; key++) {
                  if (this.enquiryParameters[key].filePath == _item.fileList[_fileListIndex].url) {
                    if (self.carData[0].details[k].uploadValue == "") {
                      self.carData[0].details[k].uploadValue = this.enquiryParameters[key].value;
                    } else {
                      self.carData[0].details[k].uploadValue = self.carData[0].details[k].uploadValue + "," + this.enquiryParameters[key].value;
                    }
                  }
                }
              }
            }
            var reader = new FileReader();
            if (_file.length > 0) {
              Indicator.open('请稍等...');
              var fileModel = {};
              for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                fileModel.dataURIString = _file[_indexImg].content;
                await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                  Indicator.close();
                  if (res.result) {
                    if (self.carData[0].details[k].uploadValue != '') {
                      self.carData[0].details[k].uploadValue = self.carData[0].details[k].uploadValue + ',' + res.result.id;
                    } else {
                      self.carData[0].details[k].uploadValue = '' + res.result.id;
                    }
                  }
                })
              }
            }
          }
          var obj = {};
          obj.key = _item.fieldName;
          obj.value = _item.uploadValue;
          obj.type = _item.fieldType;
          enquiryInfo.push(obj);
          if (_item.required) {
            if (_item.uploadValue == '') {
              Toast('请补充' + _item.fieldName + '信息');
              Indicator.close();
              return false;
            }
          }
        }

        var canCommit = self.getCarInsuranceData();
        if (canCommit) {
          model.bzBeginDate = carInsuranceData.bzBeginDate;
          model.bsBeginDate = carInsuranceData.bsBeginDate;
          model.riskKinds = carInsuranceData.riskKinds;
          model.productId = self.carData[0].id;
          model.applicantName = self.itemDetail.applicantName;
          model.businessLicenseImgId = self.itemDetail.businessLicenseImgId;
          model.enquiryInfo = JSON.stringify(enquiryInfo);
          requestBody = model;
        } else {
          Indicator.close();
          return false;
        }

      }
      console.log(requestBody);
      Indicator.open('正在提交数据，请稍等...');
      axiosPutAPI('/enquiry/policies/' + self.itemDetail.id, requestBody).then(res => {
        console.log(res)
        Indicator.close();
        if (res.status == 200) {
          Toast('询价提交成功，请稍后查看记录');
          window.history.back();
        }
      })
    },
    getCarInsuranceData: function() {
      if (this.postdata.bzRiskKind.beginDate) {
        var time = parseInt(this.Verify.validate.IsLessThanTomorrow(this.postdata.bzRiskKind.beginDate))
      }
      if (this.postdata.bsRiskKind.beginDate) {
        var timeTOW = parseInt(this.Verify.validate.IsLessThanTomorrow(this.postdata.bsRiskKind.beginDate))
      }

      if (this.compulsory == false && this.business == false) {
        Toast('请勾选交强险/车船税和商业险');
        return false;
      }
      if (this.compulsory == false) {
        carInsuranceData.bzBeginDate = "";
      }
      var limitTime = sessionStorage.getItem("daysOfEarlyRenewal");
      if (limitTime == '' || limitTime == undefined) {
        limitTime = 90;
      }
      if (this.compulsory == true) {
        if (time < 0) {
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
        carInsuranceData.bzBeginDate = this.postdata.bzRiskKind.beginDate;
      }
      if (this.business == false) {
        carInsuranceData.bsBeginDate = "";
        carInsuranceData.riskKinds = null;
      }
      if (this.business == true) {
        if (this.postdata.bsRiskKind.beginDate == '') {
          Toast('请输入商业险生效时间');
          return false;
        }
        if (timeTOW < 0) {
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
        if (this.postdata.bsRiskKind.beginDate != '') {
          var itemArr = [];
          this.postdata.bsRiskKind.items.map(item => {
            if (item.coverage != '不投保') {
              itemArr.push(item);
            }
          })
          carInsuranceData.riskKinds = []
          carInsuranceData.bsBeginDate = this.postdata.bsRiskKind.beginDate;
          if (this.devices && this.devices.length > 0) {
            carInsuranceData.xzsbxItems = this.devices;
          } else {
            carInsuranceData.xzsbxItems = null;
          }

          if (carInsuranceData.riskKinds) {
            carInsuranceData.riskKinds = itemArr
          }
        }
        if (this.business == true) {
          if (itemArr.length < 1) {
            Toast('请勾选商业险险种');
            return false;
          }
        }
        //判断coverage中有没有投保
        if (carInsuranceData.riskKinds) {
          var item = carInsuranceData.riskKinds;
          for (var i = 0; i < item.length; i++) {
            if (item[i].coverage == '投保') {
              item[i].coverage = '';
            }
            if (item[i].riskKindItemCode == "WFZDDSF") {
              item[i].isDeductible = false;
            }
            if (item[i].riskKindItemCode == "BLX") {
              item[i].isDeductible = false;
              item[i].glassMadeInChina = (item[i].coverage == 'Home');
              // item[i].coverage = '';
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
              item[i].glassMadeInChina = (item[i].coverage == 'Home');
              // item[i].coverage = '';
            }
          }
        }
      }
      console.log(JSON.stringify(carInsuranceData));
      return true;
    }
  }
}

</script>
<style scoped>
.item_Detail {
  background: #FFFFFF;
  /* margin: 10px; */
  padding: 15px;
  border-radius: 8px
}

.vdumb {
  width: 100%;
  line-height: 46px;
}

.divBox {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.divBox h3 {
  font-size: 15px;
  color: #333;
  font-weight: 600;
}

.divBox p {
  font-size: 14px;
  color: #666;
  font-weight: normal;
}


.popupBtn p {
  width: 48%;
  height: 18px;
  padding: 12px 0;
  text-align: center;
  background: #f2f2f2;
  margin: 5px;
  border-radius: 5px;
  color: #f94037
}

.popupBtn p:hover {
  background: #f94037;
  color: #FFFFFF;
}

.isItem p:nth-child(1) {
  font-size: 14px;
  color: #333;
}

.isItem p:nth-child(2) {
  font-size: 14px;
  color: #999;
}

.spanBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.hasBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hasBtn .isItem {
  margin: 0;
}

.amendBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.enteringBtn {
  background: #0066FF;
  padding: 5px 10px;
  border-radius: 4px;
  color: #FFFFFF;
  font-size: 12px;
}

</style>
