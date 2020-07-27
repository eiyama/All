<template>
  <div class="insureScheme" ref="insureScheme">
    <mt-header fixed class="def-header cust-head" :title="inquiryTitle">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <div slot="right" v-show="selectedIndex == '2'">
        <div class="btn_additem" @click="addCategoryItem">
          <van-icon name="plus" />
          <p style="margin-left:2px">添加产品</p>
        </div>
      </div>
    </mt-header>
    <div style="margin-top: 44px;">
      <mt-navbar v-model="selectedIndex">
        <mt-tab-item id="1" v-show="carInsurance && notcarInsurance">车险</mt-tab-item>
        <mt-tab-item id="2" v-show="carInsurance && notcarInsurance">非车险</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selectedIndex">
      <mt-tab-container-item v-show="carInsurance" id="1">
        <div style="padding-top:1px;background: #fff;">
          <div style="margin:10px 15px;">
            <van-radio-group v-model="carType" style="display:flex; align-items: center;">
              <van-radio style="margin-right:10px;" name="old">旧车</van-radio>
              <van-radio name="new">新车</van-radio>
            </van-radio-group>
          </div>
          <div v-for="item in carData">
            <div style="background: #fff;padding: 15px;" v-show="(carType=='new' && item.isNewCar) || (carType=='old' && !item.isNewCar)">
              <p>{{item.productName}}</p>
              <div v-if="item.basicInfo.basicInfoDetails.length > 0 && item.basicInfo.basicInfoDetails && item.basicInfo" v-for="(caritem, index) in item.basicInfo.basicInfoDetails">
                 <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="caritem.fieldType == 'text' || caritem.fieldType == 'number' ">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <van-field placeholder="请输入" :type="caritem.fieldType" v-model="caritem.uploadValue">
                    </van-field>
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
                <van-row style="padding: 6px 6px;" v-if="caritem.fieldType == 'option'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col  span="22" >{{caritem.fieldName}}</van-col>
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
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9; display: flex;align-items: center;" v-if="caritem.fieldType == 'file'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <!-- <input type="file" accept="text/plain," multiple="multiple" style="width: 100%" @change="handleFile('car',caritem.fieldName,index)" ref="carFilElem" class="hiddenInput" /> -->
                    <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,' />
                    <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" multiple  :name="index" :after-read="carafterRead" accept='.docx,.doc,.pdf,text/plain,' /> -->
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="caritem.fieldType == 'image'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <!-- <input type="file" accept="image/*" style="width: 100%" @change="handleImg('car',caritem.fieldName,index)" ref="carImgElem" class="hiddenInput" /> -->
                    <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept="image/*" />
                    <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" :max-count="1" :name="index"  multiple  :after-read="carafterimgRead" accept="image/*" /> -->
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
              </div>
              <div v-show="item.basicInfo.lastYearInfoDetails.length > 0" v-for="(caritem, index) in item.basicInfo.lastYearInfoDetails">
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="caritem.fieldType == 'text' || caritem.fieldType == 'number' ">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <van-field placeholder="请输入" :type="caritem.fieldType" v-model="caritem.uploadValue">
                    </van-field>
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
                <van-row style="padding: 6px 6px;" v-if="caritem.fieldType == 'option'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col  span="22" >{{caritem.fieldName}}</van-col>
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
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9; display: flex;align-items: center;" v-if="caritem.fieldType == 'file'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <!-- <input type="file" accept="text/plain," multiple="multiple" style="width: 100%" @change="handleFile('car',caritem.fieldName,index)" ref="carFilElem" class="hiddenInput" /> -->
                    <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,' />
                    <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" multiple  :name="index" :after-read="carafterRead" accept='.docx,.doc,.pdf,text/plain,' /> -->
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="caritem.fieldType == 'image'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <!-- <input type="file" accept="image/*" style="width: 100%" @change="handleImg('car',caritem.fieldName,index)" ref="carImgElem" class="hiddenInput" /> -->
                    <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept="image/*" />
                    <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" :max-count="1" :name="index"  multiple  :after-read="carafterimgRead" accept="image/*" /> -->
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
              </div>
              <div v-show="item.basicInfo.currYearInfoDetails.length > 0" v-for="(caritem, index) in item.basicInfo.currYearInfoDetails">
                 <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="caritem.fieldType == 'text' || caritem.fieldType == 'number' ">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <van-field placeholder="请输入" :type="caritem.fieldType" v-model="caritem.uploadValue">
                    </van-field>
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
                <van-row style="padding: 6px 6px;" v-if="caritem.fieldType == 'option'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col  span="22" >{{caritem.fieldName}}</van-col>
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
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9; display: flex;align-items: center;" v-if="caritem.fieldType == 'file'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <!-- <input type="file" accept="text/plain," multiple="multiple" style="width: 100%" @change="handleFile('car',caritem.fieldName,index)" ref="carFilElem" class="hiddenInput" /> -->
                    <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,' />
                    <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" multiple  :name="index" :after-read="carafterRead" accept='.docx,.doc,.pdf,text/plain,' /> -->
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="caritem.fieldType == 'image'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <!-- <input type="file" accept="image/*" style="width: 100%" @change="handleImg('car',caritem.fieldName,index)" ref="carImgElem" class="hiddenInput" /> -->
                    <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept="image/*" />
                    <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" :max-count="1" :name="index"  multiple  :after-read="carafterimgRead" accept="image/*" /> -->
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
              </div>
              <div v-for="(caritem, index) in item.details">
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="caritem.fieldType == 'text' || caritem.fieldType == 'number' ">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col  span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <van-field placeholder="请输入" :type="caritem.fieldType" v-model="caritem.uploadValue">
                    </van-field>
                  </van-col>
                  <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
                <van-row style="padding: 6px 6px;" v-if="caritem.fieldType == 'option'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
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
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9; display: flex;align-items: center;" v-if="caritem.fieldType == 'file'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <!-- <input type="file" accept="text/plain," multiple="multiple" style="width: 100%" @change="handleFile('car',caritem.fieldName,index)" ref="carFilElem" class="hiddenInput" /> -->
                    <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,' />
                    <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" multiple  :name="index" :after-read="carafterRead" accept='.docx,.doc,.pdf,text/plain,' /> -->
                  </van-col>
                   <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
                <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="caritem.fieldType == 'image'">
                  <van-col span="8" style="display: flex;align-items: center;height:44px">
                    <van-col span="2" v-show="caritem.required" style="color: #f44;">*</van-col>
                    <van-col span="22">{{caritem.fieldName}}</van-col>
                  </van-col>
                  <van-col span="14">
                    <!-- <input type="file" accept="image/*" style="width: 100%" @change="handleImg('car',caritem.fieldName,index)" ref="carImgElem" class="hiddenInput" /> -->
                    <van-uploader preview-size='60px' v-model="caritem.fileList" multiple accept="image/*" />
                    <!-- <van-uploader preview-size='60px' v-model="caritem.fileList" :max-count="1" :name="index"  multiple  :after-read="carafterimgRead" accept="image/*" /> -->
                  </van-col>
                   <van-col span="2" style="line-height: 41px; text-align: center;">
                    <van-icon name="question-o" v-show="caritem.remark" @click="$dialog({message:caritem.remark})"></van-icon>
                  </van-col>
                </van-row>
              </div>
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
                  <div :class="{active1: isActive6}" class="mint-cell-wrapper" id="wufa">
                    <span :class="{active1: isActive6}" id="sex">
                      无法找到第三方特约险
                    </span>
                    <label class="mint-checkitem freefree">
                      <!-- <input v-model="postdata.bsRiskKind.items[6].isDeductible"  class="dd" type="checkbox"><i>&#10004;</i> -->
                    </label>
                    <label id="labelone"><span id="icoone"></span><input :class="{active1: isActive6}" readonly="readonly" class="mint-input" id="thirdlys" type="text" @click="thirdlysTWO" v-model="threetian"></label>
                  </div>
                </div>
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
            <div class="picker-toolbar">
              <span @click="canceldamage" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span>
              <span @click="selectdamage" class="mint-datetime-action mint-datetime-confirm dumb">投保</span>
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
          <mt-popup v-model="glassVisible" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="cancelglass" class="mint-datetime-action mint-datetime-cancel dumb">不投保</span>
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
          <mt-popup v-model="scratchVisible" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="cancelscratch" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selectscratch" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="scratchDates" @change="scratchChange"></mt-picker>
          </mt-popup>
          <!--涉水-->
          <mt-popup v-model="wadeccVisible" position="bottom" popup-transition="popup-fade">
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
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div v-for="(categoryItem,categoryIndex) in categoryItems" :key="categoryIndex" style="margin-top: 15px;background: #fff;border-radius: 8px;padding: 10px;margin-left:10px;margin-right:10px" v-show="notcarInsurance">
          <p style="float: right;" @click="removeCategoryItem(categoryIndex)">
            <van-icon size="18" name="close" />
          </p>
          <van-field readonly required right-icon='arrow' clickable label="产品" :value="categoryItem.productName" placeholder=" 请选择" @click="chooseType(categoryIndex)" />
          <van-popup v-model="categoryType" position="bottom">
            <van-picker style="" show-toolbar :columns="category" v-show="categoryType && (currentCategoryIndex==categoryIndex)" @change="onChange" @cancel="onCancel(categoryIndex)" @confirm="onConfirm(categoryIndex)" />
          </van-popup>
          <div style="background: #fff">
            <div v-if="categoryItem.basicInfo.basicInfoDetails && categoryItem.basicInfo.basicInfoDetails.length > 0" v-for="(fieldItem, _index) in categoryItem.basicInfo.basicInfoDetails">
              <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
                <van-col span="8" style="display: flex;align-items: center;height:44px">
                  <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
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
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
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
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
                </van-col>
                <van-col span="14">
                  <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,'>
                  </van-uploader>
                </van-col>
                <van-col span="2" style="line-height: 41px; text-align: center;">
                  <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
                </van-col>
              </van-row>
              <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
                <van-col span="8" style="display: flex;align-items: center;height:44px">
                  <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
                </van-col>
                <van-col span="14">
                  <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
                </van-col>
                <van-col span="2" style="line-height: 41px; text-align: center;">
                  <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
                </van-col>
              </van-row>
            </div>
            <div v-if="categoryItem.basicInfo.lastYearInfoDetails && categoryItem.basicInfo.lastYearInfoDetails.length > 0" v-for="(fieldItem, _index) in categoryItem.basicInfo.lastYearInfoDetails">
              <!--   <van-row v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
                <van-field :required="fieldItem.required" :label="fieldItem.fieldName" placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.value"></van-field>
              </van-row> -->
              <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
                <van-col span="8" style="display: flex;align-items: center;height:44px">
                  <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
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
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
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
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
                </van-col>
                <van-col span="14">
                  <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,'>
                  </van-uploader>
                </van-col>
                <van-col span="2" style="line-height: 41px; text-align: center;">
                  <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
                </van-col>
              </van-row>
              <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
                <van-col span="8" style="display: flex;align-items: center;height:44px">
                  <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
                </van-col>
                <van-col span="14">
                  <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
                </van-col>
                <van-col span="2" style="line-height: 41px; text-align: center;">
                  <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
                </van-col>
              </van-row>
            </div>
            <div v-if=" categoryItem.basicInfo.currYearInfoDetails && categoryItem.basicInfo.currYearInfoDetails.length > 0" v-for="(fieldItem, _index) in categoryItem.basicInfo.currYearInfoDetails">
              <!--   <van-row v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
                <van-field :required="fieldItem.required" :label="fieldItem.fieldName" placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.value"></van-field>
              </van-row> -->
               <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
                <van-col span="8" style="display: flex;align-items: center;height:44px">
                  <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
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
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
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
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
                </van-col>
                <van-col span="14">
                  <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,'>
                  </van-uploader>
                </van-col>
                <van-col span="2" style="line-height: 41px; text-align: center;">
                  <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
                </van-col>
              </van-row>
              <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
                <van-col span="8" style="display: flex;align-items: center;height:44px">
                  <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
                </van-col>
                <van-col span="14">
                  <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
                </van-col>
                <van-col span="2" style="line-height: 41px; text-align: center;">
                  <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
                </van-col>
              </van-row>
            </div>
            <div v-for="(fieldItem, _index) in categoryItem.details">
              <!--   <van-row v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
                <van-field :required="fieldItem.required" :label="fieldItem.fieldName" placeholder="请输入" :type="fieldItem.fieldType" v-model="fieldItem.value"></van-field>
              </van-row> -->
              <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;" v-if="fieldItem.fieldType == 'text' || fieldItem.fieldType == 'number' ">
                <van-col span="8" style="display: flex;align-items: center;height:44px">
                  <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
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
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
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
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
                </van-col>
                <van-col span="14">
                  <!-- <input type="file" style="width: 100%" multiple="multiple" accept=".docx,.doc,.pdf,text/plain," @change="handleFile('noncar',fieldItem.fieldName,index)" ref="filElem" class="hiddenInput" /> -->
                  <!-- <van-uploader preview-size='60px' v-model="fieldItem.fileList" :name="_index" multiple :before-delete="deleteFile" :after-read="afterfileRead" accept='.docx,.doc,.pdf,text/plain,' > -->
                  <van-uploader preview-size='60px' v-model="fieldItem.fileList" multiple accept='.docx,.doc,.pdf,.zip,text/plain,'>
                  </van-uploader>
                </van-col>
                <van-col span="2" style="line-height: 41px; text-align: center;">
                  <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
                </van-col>
              </van-row>
              <van-row style="padding: 6px;border-bottom: 1px solid #F9F9F9;display: flex;align-items: center;" v-if="fieldItem.fieldType == 'image'">
                <van-col span="8" style="display: flex;align-items: center;height:44px">
                  <van-col span="2" v-show="fieldItem.required" style="color: #f44;">*</van-col>
                  <van-col span="22">{{fieldItem.fieldName}}</van-col>
                </van-col>
                <van-col span="14">
                  <!-- <input type="file" accept="image/*" style="width: 100%" @change="handleImg('noncar',fieldItem.fieldName,index)" ref="imgElem" class="hiddenInput" /> -->
                  <van-uploader preview-size='60px' v-model="fieldItem.fileList" accept="image/*" multiple />
                  <!-- <van-uploader preview-size='60px' v-model="fieldItem.fileList" :name=" _index"  :after-read="afterimgRead" accept="image/*"  multiple/> -->
                </van-col>
                <van-col span="2" style="line-height: 41px; text-align: center;">
                  <van-icon name="question-o" v-show="fieldItem.remark" @click="$dialog({message:fieldItem.remark})"></van-icon>
                </van-col>
              </van-row>
            </div>
            <div v-if="categoryItem.isTypeOfWork">
              <p style="font-size:14px;color:#333;line-height:35px">工种分类表：</p>
              <viewer v-show="categoryItem.typeOfWorkMediaUrl">
                <img style="height:80px;" :src="categoryItem.typeOfWorkMediaUrl" alt="">
              </viewer>
              <table class="workTable" cellspacing="0" cellpadding="0">
                <tr>
                  <th style="width: 25%;">工种</th>
                  <th style="width: 20%;">人数</th>
                  <th style="width: 25%;">有无高空</th>
                  <th style="width: 25%;">保额（元/人）</th>
                  <th style="width: 5%;"></th>
                </tr>
                <tr v-for="(workItem, workIndex) in categoryItem.typeOfWorks">
                  <td>
                    <van-dropdown-menu>
                      <van-dropdown-item v-model="workItem.valueWork" :options="workItem.optionWork" />
                    </van-dropdown-menu>
                  </td>
                  <td>
                    <van-field type="number" v-model="workItem.numberOfpeople"></van-field>
                  </td>
                  <td style="font-size: 14px;">
                    <van-dropdown-menu>
                      <van-dropdown-item v-model="workItem.valuekingHeight" :options="workItem.isWorkingAtHeights" />
                    </van-dropdown-menu>
                  </td>
                  <td>
                    <van-field type="number" v-model="workItem.coverage"></van-field>
                  </td>
                  <td>
                    <van-icon name="close" size="18px" color="#f44" @click="removeWorkitem(categoryIndex,workIndex)" />
                    <!-- <van-icon name="close" @click="removeWorkitem(categoryIndex,workIndex)" /> -->
                  </td>
                </tr>
              </table>
              <van-icon name="add-o" color="#67c23a" style="margin: 15px;" size="18px" @click="addworkItem(categoryIndex)" />
              <!-- <van-icon name="plus" @click="addworkItem(categoryIndex)" /> -->
            </div>
          </div>
        </div>
        <div v-show="categoryItems.length == 0">
          <div style="text-align: center;color: #999;font-size: 14px;padding: 45px;">
            <p>您还没有添加产品哦，点击下方按钮添加产品</p>
          </div>
          <div style="margin: 0 20px;background: #fff;padding: 10px 0;display: flex;justify-content: center;align-items: center;" @click="addCategoryItem">
            <van-icon name="plus" color="#f94037" />
            <p style="margin-left: 5px;color:#f94037;">添加</p>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="btn-Offer" @click="commitData" v-show="carInsurance || notcarInsurance">提交询价</div>
  </div>
</template>
<script>
import axios from 'axios'
import {
  Indicator,
  Toast,
  Navbar,
  TabItem
} from 'mint-ui';
import {
  axiosPostAPI,
  axiosGetAPI,
} from './../../common/Axios';
import event from './../../common/event';
import Vue from 'vue'
import Viewer from 'v-viewer'//放大查看图片
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});
import {
  RadioGroup,
  Radio,
  Popup
} from 'vant';
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
  name: 'insureScheme',
  data() {
    return {
      equallyApplicant:false,
      carType: 'old',
      inquiryTitle: '人工询价',
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
      editImg: (this.src = require("../../assets/images/ic-edit.png")),
      addDeviceImg: (this.src = require("../../assets/images/ic-add-device.png")),
      deleteImg: (this.src = require("../../assets/images/ic-delete.png")),
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
      hasCategoryVal: '',
      FieldName: [],
      imgName: [],
      carFieldName: [],
      carimgName: [],
      carfileList: [],
      fileList: [],
      carImgList: [],
      imgList: [],
      tempFeilds: [{ "name": "身份证正面", "imgList": [] }, { "name": "身份证反面", "imgList": [] }],
    };
  },
  created() {
    var self = this;
    this.enquiryModel = JSON.parse(sessionStorage.getItem("enquiryModel"));
    if (this.enquiryModel && this.enquiryModel.inquiryType) {
      if (this.enquiryModel.inquiryType.length > 1) {
        this.notcarInsurance = true;
        this.carInsurance = true;
        this.selectedIndex = '1'
        this.getEnquiryType("NonAuto");
        this.getEnquiryType("car");
        // console.log(this.getenquiryType("NonAuto"));
      } else {
        this.enquiryModel.inquiryType.map(item => {
          if (item == 'notCar') {
            this.notcarInsurance = true;
            this.carInsurance = false;
            this.selectedIndex = '2';
            this.getEnquiryType("NonAuto");
            this.inquiryTitle = '人工询价 - 非车险'
          }
          if (item == 'car') {
            this.notcarInsurance = false;
            this.carInsurance = true;
            this.selectedIndex = '1';
            this.getEnquiryType("car");
            this.inquiryTitle = '人工询价 - 车险'
          }
        })
      }
    }
    axiosGetAPI("vi/repairOrder/getWordBooks?moduleName=询价字典管理&type=人工询价工种").then(res => {
      if (res.result) {
        self.valueWork = res.result[0].value;
        res.result.map(item => {
          var obj = {};
          obj.value = item.value;
          obj.text = item.description;
          self.optionWork.push(obj);
        })
      }
    })
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
    this.canModifyCSX = false;
  },
  methods: {

    addworkItem(index) {
      var field = {
        optionWork: this.optionWork,
        numberOfpeople: '',
        isWorkingAtHeights: [{
          text: "有",
          value: true
        }, {
          text: "无",
          value: false
        }, ],
        coverage: "",
        valueWork: this.valueWork,
        valuekingHeight: false,
      };
      this.categoryItems[index].typeOfWorks.push(field);
    },
    removeWorkitem(categoryIndex, index) {
      this.categoryItems[categoryIndex].typeOfWorks.splice(index, 1);
    },
    getEnquiryType(type) {
      var self = this;
      axiosGetAPI('/enquiry/' + type + '/products').then(res => {
        if (res.result) {
          if (type == 'NonAuto') {
            self.feildData = res;
            // console.log(self.feildData);
            self.nonAuto = res.result;
            res.result.map(item => {
              self.category.push(item.productName);
            });
          }
          if (type == 'car') {
            self.carData = res.result;
            // res.result.map(item => {
            this.carFieldName = [];
            this.carimgName = [];
            for (var l = 0; l < self.carData.length; l++) {
              var item = self.carData[l];
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
                  this.$set(_item, 'uploadValue', '');
                }
                if (_item.fieldType == "file" || _item.fieldType == "image") {
                  this.$set(_item, 'uploadValue', '');
                  this.$set(_item, 'fileList', []);
                }
                if (_item.fieldType == "number" || _item.fieldType == "text") {
                  this.$set(_item, 'uploadValue', '');
                  if(_item.fieldName == "被保人"){
                    _item.uploadValue = this.enquiryModel.applicant;
                  }
                }
              };
              if(item.basicInfo){
                for (var key = 0; key < item.basicInfo.basicInfoDetails.length; key++) {
                  var lastYearItem = item.basicInfo.basicInfoDetails[key];
                  // var _item = item.details[k];
                  if (lastYearItem.fieldType == "option") {
                    lastYearItem.option = [];
                    var arr = lastYearItem.value.split(',');
                    for (var i = 0; i < arr.length; i++) {
                      var obj = {};
                      obj.text = arr[i];
                      obj.value = i;
                      lastYearItem.option.push(obj);
                    }
                    this.$set(lastYearItem, 'uploadValue', '');
                  }
                  if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                    this.$set(lastYearItem, 'uploadValue', '');
                    this.$set(lastYearItem, 'fileList', []);
                  }
                  if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                    this.$set(lastYearItem, 'uploadValue', '');
                    if(lastYearItem.fieldName == "被保人"){
                      lastYearItem.uploadValue = this.enquiryModel.applicant;
                    }
                  }
                }              
  
              for (var key = 0; key < item.basicInfo.lastYearInfoDetails.length; key++) {
                var lastYearItem = item.basicInfo.lastYearInfoDetails[key];
                // var _item = item.details[k];
                if (lastYearItem.fieldType == "option") {
                  lastYearItem.option = [];
                  var arr = lastYearItem.value.split(',');
                  for (var i = 0; i < arr.length; i++) {
                    var obj = {};
                    obj.text = arr[i];
                    obj.value = i;
                    lastYearItem.option.push(obj);
                  }
                  this.$set(lastYearItem, 'uploadValue', '');
                }
                if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                  this.$set(lastYearItem, 'uploadValue', '');
                  this.$set(lastYearItem, 'fileList', []);
                }
                if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                  this.$set(lastYearItem, 'uploadValue', '');
                   if(lastYearItem.fieldName == "被保人"){
                    lastYearItem.uploadValue = this.enquiryModel.applicant;
                  }
                }
              }

              for (var key = 0; key < item.basicInfo.currYearInfoDetails.length; key++) {
                var lastYearItem = item.basicInfo.currYearInfoDetails[key];
                // var _item = item.details[k];
                if (lastYearItem.fieldType == "option") {
                  lastYearItem.option = [];
                  var arr = lastYearItem.value.split(',');

                  for (var i = 0; i < arr.length; i++) {
                    var obj = {};
                    obj.text = arr[i];
                    obj.value = i;
                    lastYearItem.option.push(obj);
                  }
                  this.$set(lastYearItem, 'uploadValue', '');
                }
                if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                  this.$set(lastYearItem, 'uploadValue', '');
                  this.$set(lastYearItem, 'fileList', []);
                }
                if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                  this.$set(lastYearItem, 'uploadValue', '');
                   if(lastYearItem.fieldName == "被保人"){
                    lastYearItem.uploadValue = this.enquiryModel.applicant;
                  }
                }
              }

           }

            }
          }
        }
      })
    },
    setCarModel() {

      for (var k = 0; k < item.details.length; k++) {
        if (item.details[k].fieldType == 'file') {
          this.carFieldName.push(item.details[k].fieldName);
        }
        if (item.details[k].fieldType == 'image') {
          this.carimgName.push(item.details[k].fieldName);
        }
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
          this.$set(_item, 'uploadValue', '');
        }
        if (_item.fieldType == "file" || _item.fieldType == "image") {
          this.$set(_item, 'uploadValue', '');
          this.$set(_item, 'fileList', []);
        }
        if (_item.fieldType == "number" || _item.fieldType == "text") {
          this.$set(_item, 'uploadValue', '');
        }
      };
    },


    removeCategoryItem(index) {
      this.categoryItems.splice(index, 1);
    },
    addCategoryItem() {
      var field = {
        "productName": "",
        "details": [],
        "isTypeOfWork": false,
        "isEnable": false,
        "typeOfWorks": [],
        "basicInfo": {}
      };
      this.categoryItems.push(field);
    },
    onChange(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.categoryValue = value ? value : this.category[0];
      // this.hasCategoryVal = value ? value :  this.category[0];
      // console.log(`当前值：${value}, 当前索引：${index}`)
    },
    chooseType(index) {
      // console.log(index);
      this.currentCategoryIndex = index;
      this.categoryType = true;

    },
    onCancel(index) {
      if (this.currentCategoryIndex == index) {
        this.categoryType = false;
        this.categoryValue = '';
      }
    },
    onConfirm(index) {
      var self = this;
      if (this.currentCategoryIndex == index) {
        var hasAdd = false;
        for (var i = 0; i < this.categoryItems.length; i++) {
          if (this.categoryItems[i].productName == this.categoryValue && this.categoryItems[i].productName != "") {
            hasAdd = true;
            break;
          }
        }
        if (!hasAdd) {
          this.categoryItems[index].productName = this.categoryValue ? this.categoryValue : this.category[0];
          // this.feildData.result.map(item => {
          self.FieldName = [];
          self.imgName = [];
          for (var i = 0; i < this.feildData.result.length; i++) {
            var item = this.feildData.result[i];
            if (item.productName == this.categoryItems[index].productName) {
              // item.details.map(detailsItem => {
              for (var j = 0; j < item.details.length; j++) {
                var detailsItem = item.details[j];
                detailsItem.value = detailsItem.value ? detailsItem.value : '';
                if (detailsItem.fieldType == "option") {
                  detailsItem.option = [];
                  var arr = detailsItem.value.split(',');
                  for (var k = 0; k < arr.length; k++) {
                    var obj = {};
                    obj.text = arr[k];
                    obj.value = arr[k];
                    detailsItem.option.push(obj);
                  }
                  this.$set(item.details[j], 'uploadValue', '')
                }
                if (item.details[j].fieldType == "file" || item.details[j].fieldType == "image") {
                  this.$set(item.details[j], 'uploadValue', '');
                  this.$set(item.details[j], 'fileList', []);
                }
                if (item.details[j].fieldType == "number" || item.details[j].fieldType == "text") {
                  this.$set(item.details[j], 'uploadValue', '');
                   if(item.details[j].fieldName == "被保人"){
                    item.details[j].uploadValue = this.enquiryModel.applicant;
                  }
                }
              };
            if(item.basicInfo){
              for (var key = 0; key < item.basicInfo.basicInfoDetails.length; key++) {
                var lastYearItem = item.basicInfo.basicInfoDetails[key];
                // var _item = item.details[k];
                if (lastYearItem.fieldType == "option") {
                  lastYearItem.option = [];
                  var arr = lastYearItem.value.split(',');
                  for (var i = 0; i < arr.length; i++) {
                    var obj = {};
                    obj.text = arr[i];
                    obj.value = i;
                    lastYearItem.option.push(obj);
                  }
                  this.$set(lastYearItem, 'uploadValue', '');
                }
                if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                  this.$set(lastYearItem, 'uploadValue', '');
                  this.$set(lastYearItem, 'fileList', []);
                }
                if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                  this.$set(lastYearItem, 'uploadValue', '');
                   if(lastYearItem.fieldName == "被保人"){
                    lastYearItem.uploadValue = this.enquiryModel.applicant;
                  }
                }
              }
              for (var key = 0; key < item.basicInfo.lastYearInfoDetails.length; key++) {
                var lastYearItem = item.basicInfo.lastYearInfoDetails[key];
                // var _item = item.details[k];
                if (lastYearItem.fieldType == "option") {
                  lastYearItem.option = [];
                  var arr = lastYearItem.value.split(',');

                  for (var i = 0; i < arr.length; i++) {
                    var obj = {};
                    obj.text = arr[i];
                    obj.value = i;
                    lastYearItem.option.push(obj);
                  }
                  this.$set(lastYearItem, 'uploadValue', '');
                }
                if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                  this.$set(lastYearItem, 'uploadValue', '');
                  this.$set(lastYearItem, 'fileList', []);
                }
                if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                  this.$set(lastYearItem, 'uploadValue', '');
                   if(lastYearItem.fieldName == "被保人"){
                    lastYearItem.uploadValue = this.enquiryModel.applicant;
                  }
                }
              }
              for (var key = 0; key < item.basicInfo.currYearInfoDetails.length; key++) {
                var lastYearItem = item.basicInfo.currYearInfoDetails[key];
                // var _item = item.details[k];
                if (lastYearItem.fieldType == "option") {
                  lastYearItem.option = [];
                  var arr = lastYearItem.value.split(',');

                  for (var i = 0; i < arr.length; i++) {
                    var obj = {};
                    obj.text = arr[i];
                    obj.value = i;
                    lastYearItem.option.push(obj);
                  }
                  this.$set(lastYearItem, 'uploadValue', '');
                }
                if (lastYearItem.fieldType == "file" || lastYearItem.fieldType == "image") {
                  this.$set(lastYearItem, 'uploadValue', '');
                  this.$set(lastYearItem, 'fileList', []);
                }
                if (lastYearItem.fieldType == "number" || lastYearItem.fieldType == "text") {
                  this.$set(lastYearItem, 'uploadValue', '');
                   if(lastYearItem.fieldName == "被保人"){
                    lastYearItem.uploadValue = this.enquiryModel.applicant;
                  }
                }
              }
              }
              this.categoryItems[index].details = item.details;
              this.categoryItems[index].basicInfo = item.basicInfo;
              this.categoryItems[index].isTypeOfWork = item.isTypeOfWork;
              this.categoryItems[index].isEnable = item.isEnable;
              this.categoryItems[index].id = item.id;
              if (item.isTypeOfWork) {
                var field = {
                  optionWork: this.optionWork,
                  numberOfpeople: '',
                  isWorkingAtHeights: [{
                    text: "有",
                    value: true
                  }, {
                    text: "无",
                    value: false
                  }, ],
                  coverage: "",
                  valueWork: this.valueWork,
                  valuekingHeight: false,
                };
                if (this.categoryItems[index].typeOfWorks.length < 1) {
                  this.categoryItems[index].typeOfWorks.push(field);
                }
                this.categoryItems[index].typeOfWorkMediaUrl = item.typeOfWorkMediaUrl;
              }
            }
          }
          // )
        } else {
          Toast('该产品已经添加了，请选择其他产品');
        }
        this.categoryValue = '';
        this.categoryType = false;
      }
    },
    openBack() {
      this.$router.back();
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
      //  not allow to delete the first
      // if (index !== 0) {
      this.devices.splice(index, 1)
      // }
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

    async getCarsubmitData(data, enquiryInfo) {
      for (var k = 0; k < data.length; k++) {
        var _item = data[k];
        if (_item.fieldType == 'file') {
          var file = _item.fileList;
          let formData = new FormData();
          for (let _j = 0; _j < file.length; _j++) {
            formData.append("file" + (_j + 1), file[_j].file);
          }
          if (file.length > 0) {
            Indicator.open('请稍等...');
            await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
              Indicator.close();
              if (res.result.length > 0) {
                _item.uploadValue = ''
                for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                  if (_item.uploadValue != '') {
                    _item.uploadValue = _item.uploadValue + ',' + res.result[forDataIndex].id;
                  } else {
                    _item.uploadValue = res.result[forDataIndex].id;
                  }
                }
              }
            })
          }
        }
        if (_item.fieldType == 'image') {
          Indicator.open('请稍等...');
          _item.uploadValue = '';
          var _file = _item.fileList;
          var reader = new FileReader();
          if (_file.length > 0) {
            var fileModel = {};
            for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
              fileModel.dataURIString = _file[_indexImg].content;
              await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                Indicator.close();
                if (res.result) {
                  if (_item.uploadValue != '') {
                    _item.uploadValue = _item.uploadValue + ',' + res.result.id;
                  } else {
                    _item.uploadValue = '' + res.result.id;
                  }
                }
              })
            }
          }
        }
        var obj = {};
        obj.key = _item.fieldName;
        obj.value = _item.uploadValue ? _item.uploadValue : _item.value;
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
    },

    //提交数据
    async commitData() {

      // console.log( this.categoryItems);
      var self = this;
      var requestBody = [];
      if (self.carInsurance) {

        //车险
        if (carInsuranceData) {
          // Indicator.open('请稍等...');
          var enquiryInfo = [];
          var model = {
            "enquiryInfo": [],
            "productId": "",
            "applicantName": "",
            "businessLicenseImgId": "",
            "bzBeginDate": "",
            "bsBeginDate": "",
            "riskKinds": [],
          };
          // console.log(self.carData)
          var _carData;
          var upDataIndex = '';
          for (var index = 0; index < self.carData.length; index++) {
            if (self.carType == 'new' && self.carData[index].isNewCar) {
              _carData = self.carData[index];
              upDataIndex = index;
            }
            if (self.carType == 'old' && !self.carData[index].isNewCar) {
              _carData = self.carData[index];
              upDataIndex = index;
            }
          }
          // self.carData[0].details.map(_item => {
          //  self.getCarsubmitData(enquiryInfo,_carData.details);
          //  self.getCarsubmitData(enquiryInfo,_carData.basicInfo.currYearInfoDetails);
          //  self.getCarsubmitData(enquiryInfo,_carData.basicInfo.basicInfoDetails);
          //  self.getCarsubmitData(enquiryInfo,_carData.basicInfo.lastYearInfoDetails);
          if(_carData.basicInfo){
          for (var k = 0; k < _carData.basicInfo.basicInfoDetails.length; k++) {
            var _item = _carData.basicInfo.basicInfoDetails[k];
            if (_item.fieldType == 'file') {
              var file = _item.fileList;
              let formData = new FormData();
              for (let _j = 0; _j < file.length; _j++) {
                formData.append("file" + (_j + 1), file[_j].file);
              }
              if (file.length > 0) {
                Indicator.open('请稍等...');
                await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                  Indicator.close();
                  if (res.result.length > 0) {
                    _item.uploadValue = ''
                    for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                      if (_item.uploadValue != '') {
                        _item.uploadValue = _item.uploadValue + ',' + res.result[forDataIndex].id;
                      } else {
                        _item.uploadValue = res.result[forDataIndex].id;
                      }
                    }
                  }
                })
              }
            }
            if (_item.fieldType == 'image') {
              _item.uploadValue = '';
              var _file = _item.fileList;
              var reader = new FileReader();
              if (_file.length > 0) {
                Indicator.open('请稍等...');
                var fileModel = {};
                for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                  fileModel.dataURIString = _file[_indexImg].content;
                  await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                    Indicator.close();
                    if (res.result) {
                      if (_item.uploadValue != '') {
                        _item.uploadValue = _item.uploadValue + ',' + res.result.id;
                      } else {
                        _item.uploadValue = '' + res.result.id;
                      }
                    }
                  })
                }
              }
            }
            var obj = {};
            obj.key = _item.fieldName;
            obj.value = _item.uploadValue ? _item.uploadValue : _item.value;
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

          for (var k = 0; k < _carData.basicInfo.lastYearInfoDetails.length; k++) {
            var _item = _carData.basicInfo.lastYearInfoDetails[k];
            if (_item.fieldType == 'file') {
              var file = _item.fileList;
              let formData = new FormData();
              for (let _j = 0; _j < file.length; _j++) {
                formData.append("file" + (_j + 1), file[_j].file);
              }
              if (file.length > 0) {
                Indicator.open('请稍等...');
                await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                  Indicator.close();
                  if (res.result.length > 0) {
                    _item.uploadValue = ''
                    for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                      if (_item.uploadValue != '') {
                        _item.uploadValue = _item.uploadValue + ',' + res.result[forDataIndex].id;
                      } else {
                        _item.uploadValue = res.result[forDataIndex].id;
                      }
                    }
                  }
                })
              }
            }
            if (_item.fieldType == 'image') {
              _item.uploadValue = '';
              var _file = _item.fileList;
              var reader = new FileReader();
              if (_file.length > 0) {
                Indicator.open('请稍等...');
                var fileModel = {};
                for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                  fileModel.dataURIString = _file[_indexImg].content;
                  await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                    Indicator.close();
                    if (res.result) {
                      if (_item.uploadValue != '') {
                        _item.uploadValue = _item.uploadValue + ',' + res.result.id;
                      } else {
                        _item.uploadValue = '' + res.result.id;
                      }
                    }
                  })
                }
              }
            }
            var obj = {};
            obj.key = _item.fieldName;
            obj.value = _item.uploadValue ? _item.uploadValue : _item.value;
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

          for (var k = 0; k < _carData.basicInfo.currYearInfoDetails.length; k++) {
            var _item = _carData.basicInfo.currYearInfoDetails[k];
            if (_item.fieldType == 'file') {
              var file = _item.fileList;
              let formData = new FormData();
              for (let _j = 0; _j < file.length; _j++) {
                formData.append("file" + (_j + 1), file[_j].file);
              }
              if (file.length > 0) {
                Indicator.open('请稍等...');
                await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                  Indicator.close();
                  if (res.result.length > 0) {
                    _item.uploadValue = ''
                    for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                      if (_item.uploadValue != '') {
                        _item.uploadValue = _item.uploadValue + ',' + res.result[forDataIndex].id;
                      } else {
                        _item.uploadValue = res.result[forDataIndex].id;
                      }
                    }
                  }
                })
              }
            }
            if (_item.fieldType == 'image') {

              _item.uploadValue = '';
              var _file = _item.fileList;
              var reader = new FileReader();
              if (_file.length > 0) {
                Indicator.open('请稍等...');
                var fileModel = {};
                for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                  fileModel.dataURIString = _file[_indexImg].content;
                  await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                    Indicator.close();
                    if (res.result) {
                      if (_item.uploadValue != '') {
                        _item.uploadValue = _item.uploadValue + ',' + res.result.id;
                      } else {
                        _item.uploadValue = '' + res.result.id;
                      }
                    }
                  })
                }
              }
            }
            var obj = {};
            obj.key = _item.fieldName;
            obj.value = _item.uploadValue ? _item.uploadValue : _item.value;
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
          }
          for (var k = 0; k < _carData.details.length; k++) {
            var _item = _carData.details[k];
            if (_item.fieldType == 'file') {
              var file = _item.fileList;
              let formData = new FormData();
              for (let _j = 0; _j < file.length; _j++) {
                formData.append("file" + (_j + 1), file[_j].file);
              }
              if (file.length > 0) {
                Indicator.open('请稍等...');
                await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                  Indicator.close();
                  if (res.result.length > 0) {
                    _item.uploadValue = ''
                    for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                      if (_item.uploadValue != '') {
                        _item.uploadValue = _item.uploadValue + ',' + res.result[forDataIndex].id;
                      } else {
                        _item.uploadValue = res.result[forDataIndex].id;
                      }
                    }
                  }
                })
              }
            }
            if (_item.fieldType == 'image') {
              _item.uploadValue = '';
              var _file = _item.fileList;
              var reader = new FileReader();
              if (_file.length > 0) {
                Indicator.open('请稍等...');
                var fileModel = {};
                for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                  fileModel.dataURIString = _file[_indexImg].content;
                  await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                    Indicator.close();
                    if (res.result) {
                      if (_item.uploadValue != '') {
                        _item.uploadValue = _item.uploadValue + ',' + res.result.id;
                      } else {
                        _item.uploadValue = '' + res.result.id;
                      }
                    }
                  })
                }
              }
            }
            var obj = {};
            obj.key = _item.fieldName;
            obj.value = _item.uploadValue ? _item.uploadValue : _item.value;
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
            model.productId = self.carData[upDataIndex].id;
            model.applicantName = self.enquiryModel.applicant;
            model.businessLicenseImgId = self.enquiryModel.id;
            model.enquiryInfo = JSON.stringify(enquiryInfo);
            requestBody.push(model);
          } else {
            Indicator.close();
            return false;
          }
          // Indicator.close();
        }

      }

      if (self.notcarInsurance) {
        //非车险
        // this.categoryItems.map(item => {
        for (var j = 0; j < this.categoryItems.length; j++) {
          var item;
          item = this.categoryItems[j];
          var _enquiryInfo = [];
          var _model = {
            "enquiryInfo": [],
            "productId": "",
            "applicantName": "",
            "businessLicenseImgId": "",
            "typeOfWorks": [],
          }
          // item.details.map(_item => {
          if (item.id) {

            for (var i = 0; i < item.basicInfo.basicInfoDetails.length; i++) {
              var nonCarData = item.basicInfo.basicInfoDetails[i];
              if (nonCarData.fieldType == 'file') {
                var _file = nonCarData.fileList;
                let formData = new FormData();
                for (let _j = 0; _j < _file.length; _j++) {
                  formData.append("file" + (_j + 1), _file[_j].file);
                }
                if (_file.length > 0) {
                  Indicator.open('请稍等...');
                  nonCarData.uploadValue = '';
                  await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                    Indicator.close();
                    if (res.result.length > 0) {
                      for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                        if (nonCarData.uploadValue != '') {
                          nonCarData.uploadValue = nonCarData.uploadValue + ',' + res.result[forDataIndex].id;
                        } else {
                          nonCarData.uploadValue = '' + res.result[forDataIndex].id;
                        }
                      }
                    }
                  })
                }
              }
              if (nonCarData.fieldType == 'image') {
                nonCarData.uploadValue = '';
                var _file = nonCarData.fileList;
                var reader = new FileReader();
                if (_file.length > 0) {
                  Indicator.open('请稍等...');
                  var fileModel = {};
                  for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                    Indicator.close();
                    fileModel.dataURIString = _file[_indexImg].content;
                    await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                      if (res.result) {
                        if (nonCarData.uploadValue != '') {
                          nonCarData.uploadValue = nonCarData.uploadValue + ',' + res.result.id;
                        } else {
                          nonCarData.uploadValue = '' + res.result.id;
                        }
                      }
                    })
                  }
                }
              }
              if (nonCarData.uploadValue != '') {
                var obj = {};
                obj.key = nonCarData.fieldName;
                obj.type = nonCarData.fieldType;
                obj.value = nonCarData.uploadValue;
                _enquiryInfo.push(obj);
              }
              if (nonCarData.required) {
                if (nonCarData.uploadValue == '') {
                  Toast('请补充' + nonCarData.fieldName);
                  Indicator.close();
                  return false;
                }
              }
            }


            for (var i = 0; i < item.basicInfo.lastYearInfoDetails.length; i++) {
              var nonCarData = item.basicInfo.lastYearInfoDetails[i];
              if (nonCarData.fieldType == 'file') {
                var _file = nonCarData.fileList;
                let formData = new FormData();
                for (let _j = 0; _j < _file.length; _j++) {
                  formData.append("file" + (_j + 1), _file[_j].file);
                }
                if (_file.length > 0) {
                  Indicator.open('请稍等...');
                  nonCarData.uploadValue = '';
                  await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                    Indicator.close();
                    if (res.result.length > 0) {
                      for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                        if (nonCarData.uploadValue != '') {
                          nonCarData.uploadValue = nonCarData.uploadValue + ',' + res.result[forDataIndex].id;
                        } else {
                          nonCarData.uploadValue = '' + res.result[forDataIndex].id;
                        }
                      }
                    }
                  })
                }
              }
              if (nonCarData.fieldType == 'image') {
                nonCarData.uploadValue = '';
                var _file = nonCarData.fileList;
                var reader = new FileReader();
                if (_file.length > 0) {
                  Indicator.open('请稍等...');
                  var fileModel = {};
                  for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                    Indicator.close();
                    fileModel.dataURIString = _file[_indexImg].content;
                    await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                      if (res.result) {
                        if (nonCarData.uploadValue != '') {
                          nonCarData.uploadValue = nonCarData.uploadValue + ',' + res.result.id;
                        } else {
                          nonCarData.uploadValue = '' + res.result.id;
                        }
                      }
                    })
                  }
                }
              }
              if (nonCarData.uploadValue != '') {
                var obj = {};
                obj.key = nonCarData.fieldName;
                obj.type = nonCarData.fieldType;
                obj.value = nonCarData.uploadValue;
                _enquiryInfo.push(obj);
              }
              if (nonCarData.required) {
                if (nonCarData.uploadValue == '') {
                  Toast('请补充' + nonCarData.fieldName);
                  Indicator.close();
                  return false;
                }
              }
            }


            for (var i = 0; i < item.basicInfo.currYearInfoDetails.length; i++) {
              var nonCarData = item.basicInfo.currYearInfoDetails[i];
              if (nonCarData.fieldType == 'file') {
                var _file = nonCarData.fileList;
                let formData = new FormData();
                for (let _j = 0; _j < _file.length; _j++) {
                  formData.append("file" + (_j + 1), _file[_j].file);
                }
                if (_file.length > 0) {
                  Indicator.open('请稍等...');
                  nonCarData.uploadValue = '';
                  await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                    Indicator.close();
                    if (res.result.length > 0) {
                      for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                        if (nonCarData.uploadValue != '') {
                          nonCarData.uploadValue = nonCarData.uploadValue + ',' + res.result[forDataIndex].id;
                        } else {
                          nonCarData.uploadValue = '' + res.result[forDataIndex].id;
                        }
                      }
                    }
                  })
                }
              }
              if (nonCarData.fieldType == 'image') {
                nonCarData.uploadValue = '';
                var _file = nonCarData.fileList;
                var reader = new FileReader();
                if (_file.length > 0) {
                  Indicator.open('请稍等...');
                  var fileModel = {};
                  for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                    Indicator.close();
                    fileModel.dataURIString = _file[_indexImg].content;
                    await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                      if (res.result) {
                        if (nonCarData.uploadValue != '') {
                          nonCarData.uploadValue = nonCarData.uploadValue + ',' + res.result.id;
                        } else {
                          nonCarData.uploadValue = '' + res.result.id;
                        }
                      }
                    })
                  }
                }
              }
              var obj = {};
              obj.key = nonCarData.fieldName;
              obj.type = nonCarData.fieldType;
              obj.value = nonCarData.uploadValue;
              _enquiryInfo.push(obj);
              if (nonCarData.required) {
                if (nonCarData.uploadValue == '') {
                  Toast('请补充' + nonCarData.fieldName);
                  Indicator.close();
                  return false;
                }
              }
            }

            for (var i = 0; i < item.details.length; i++) {
              var nonCarData = self.categoryItems[j].details[i];
              if (nonCarData.fieldType == 'file') {
                var _file = nonCarData.fileList;
                let formData = new FormData();
                for (let _j = 0; _j < _file.length; _j++) {
                  formData.append("file" + (_j + 1), _file[_j].file);
                }
                if (_file.length > 0) {
                  Indicator.open('请稍等...');
                  nonCarData.uploadValue = '';
                  await axiosPostAPI("/Documents/EnquiryPolicy", formData).then(res => {
                    Indicator.close();
                    if (res.result.length > 0) {
                      for (var forDataIndex = 0; forDataIndex < res.result.length; forDataIndex++) {
                        if (nonCarData.uploadValue != '') {
                          nonCarData.uploadValue = nonCarData.uploadValue + ',' + res.result[forDataIndex].id;
                        } else {
                          nonCarData.uploadValue = '' + res.result[forDataIndex].id;
                        }
                      }
                    }
                  })
                }
              }
              if (nonCarData.fieldType == 'image') {
                nonCarData.uploadValue = '';
                var _file = nonCarData.fileList;
                var reader = new FileReader();
                if (_file.length > 0) {
                  Indicator.open('请稍等...');
                  var fileModel = {};
                  for (var _indexImg = 0; _indexImg < _file.length; _indexImg++) {
                    Indicator.close();
                    fileModel.dataURIString = _file[_indexImg].content;
                    await axiosPostAPI("/Documents?folderName=enquiry", fileModel).then(res => {
                      if (res.result) {
                        if (nonCarData.uploadValue != '') {
                          nonCarData.uploadValue = nonCarData.uploadValue + ',' + res.result.id;
                        } else {
                          nonCarData.uploadValue = '' + res.result.id;
                        }
                      }
                    })
                  }
                }
              }
              if (nonCarData.uploadValue != '') {
                var obj = {};
                obj.key = nonCarData.fieldName;
                obj.type = nonCarData.fieldType;
                obj.value = nonCarData.uploadValue;
                _enquiryInfo.push(obj);
              }
              if (nonCarData.required) {
                if (nonCarData.uploadValue == '') {
                  Toast('请补充' + nonCarData.fieldName);
                  Indicator.close();
                  return false;
                }
              }
            }

            _model.productId = item.id;
            if (item.isTypeOfWork) {
              // item.typeOfWorks.map(workItem => {
              for (var _index = 0; _index < item.typeOfWorks.length; _index++) {
                var workItem = item.typeOfWorks[_index]
                if (!workItem.coverage) {
                  Toast('请输入保额');
                  Indicator.close();
                  return false;
                }
                if (!workItem.numberOfpeople) {
                  Toast('请输入人数');
                  Indicator.close();
                  return false;
                }
                var typeOfWorks = {};
                typeOfWorks.workValue = workItem.valueWork;
                typeOfWorks.numberOfPeople = workItem.numberOfpeople;
                typeOfWorks.isWorkingAtHeights = workItem.valuekingHeight;
                typeOfWorks.coverage = workItem.coverage;
                _model.typeOfWorks.push(typeOfWorks);
              };
            }
            _model.applicantName = self.enquiryModel.applicant;
            _model.businessLicenseImgId = self.enquiryModel.id;
            _model.enquiryInfo = JSON.stringify(_enquiryInfo);
            requestBody.push(_model);
          } else {
            Toast('请完善询价信息');
            Indicator.close();
            return false;
          }
        }
      }
      if (self.notcarInsurance && this.categoryItems.length < 1) {
        Toast('请完善询价非车险信息');
        Indicator.close();
        return false;
      }
      console.log(requestBody);
      if (requestBody.length > 0) {
        Indicator.open('正在提交数据，请稍等...');
        axiosPostAPI('/enquiry/policies', requestBody).then(res => {
          Indicator.close();
          if (res.status == 200) {
            // Toast('询价提交成功，请稍后查看记录');
            sessionStorage.removeItem('enquiryModel');
            self.$router.push({
              path: 'inquiryRecord'
            });
          }
        })
      } else {
        Toast('请完善询价信息');
      }
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
              //item[i].coverage = '';
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
              //item[i].coverage = '';
            }
          }
        }
      }

      console.log(JSON.stringify(carInsuranceData));
      return true;
    }
  }
};

</script>
<style scoped>
.insureScheme {
  /* background-color: #F9F9F9; */
  padding-bottom: 65px;
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

.insureScheme #wufaone {
  padding-left: 4%;
  margin: 0 !important;
}

.insureScheme .cc {
  margin-left: 88px
}

.insureScheme #wufa {
  border: none;
  margin: 0 !important;
  display: flex;
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
  color: #f94037;
  border-right: 1px solid #eeeeee;
}

.btn-Nonecar {
  width: 30%;
  text-align: center;
  color: #f94037;
}

.btn-Offer {
  background: #f94037;
  text-align: center;
  color: #ffffff;
  line-height: 44px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
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

.btn_additem {
  display: flex;
  color: #f94037;
  text-align: center;
  font-size: 14px;
  justify-content: flex-end;
}

.workTable tr th,
.workTable tr td {
  margin: 0;
  border: 1px solid #EEEEEE;
}

.workTable tr th {
  font-size: 12px;
  font-weight: normal;
  color: #999999;
  border: 1px solid #eee;
  padding: 10px 0;
}

.workTable tr td {
  font-size: 12px;
  font-weight: normal;
  color: #333;
  border: 1px solid #eee;
}

</style>
