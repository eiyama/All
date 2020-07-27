<template>
  <div class="vehicleInfo" style="background-color:#FFF">
    <div class="mint-region">
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="投保地区" type="text" :disabled="true">
        <span @click="choiceCity">
          <input class="mint-input" readonly="readonly" type="text" placeholder="请选择" v-model="carInfoData.insCity.shortName">
          <i class="ico-arrow"></i>
        </span>
      </mt-field>
    </div>
    <hr width="100%" color="#f5f5f5" size="1">
    <div class="quote-row">
      以下信息请根据行驶证填写
      <mt-button v-show="showPolicy" style="float:right;font-size:14px;margin-left: 10px;height:25px;color: #f94037;border: 1px solid #f94037;" plain type="primary" @click="viewPolicy()">往年续保</mt-button>
      <img @click="showOccre" style="float: right;height: 30px;" src="../../assets/images/icon-Photo.png" v-show="showOcr&&canUseOcr"/>
    </div>
    <div class="mint-region">
      <hr width="100%" color="#f5f5f5" size="1">
      <!-- <div @click="openPlanteNoPop"> -->
        <mt-field label="车牌号" class="upper" type="text" :disabled="isNonPlateNo" placeholder="请输入车牌号" v-model="carInfoData.car.plateNo">
          <mt-switch @change="turn" v-model="isNonPlateNo">未上牌</mt-switch>
        </mt-field>
      <!-- </div> -->
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field label="车架号" class="upper" type="text" placeholder="请输入车架号" v-model="carInfoData.car.vin">
        <van-button size="small" style="color:#f94037;border:1px solid #f94037;margin-left:5px;border-radius:8px;" plain @click="openPriceModelBoxByVin">查车型</van-button>
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="发动机号" :disabled="true">
        <input class="mint-input" type="text" v-model="carInfoData.car.engineNo" placeholder="请输入发动机号">
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field label="品牌型号" type="text" placeholder="请输入品牌型号" v-model="carInfoData.car.model">
        <van-button size="small" style="color:#f94037;border:1px solid #f94037;margin-left:5px;border-radius:8px" plain @click="openPriceModelBoxBymodel">查车型</van-button>
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <div class="mint-region">
        <mt-field class="mint-formItm" label="车型/价格" :disabled="true" type="textarea">
          <span @click="openPriceModelBox"><textarea id="fullPriceModel" class="mint-input" readonly="readonly" type="textarea" name="fullPriceModel" v-model="carInfoData.car.fullPriceModel" placeholder="请选择车型/价格" rows="1"></textarea><i class="ico-arrow"></i></span>
        </mt-field>
        <mt-popup v-model="fullPriceModelBox" class="mint-popup-full" position="right" :modal="false">
          <mt-header fixed class="def-header" title="选择车型/价格">
            <div slot="left">
              <mt-button @click="fullPriceModelBox=false" icon="back"></mt-button>
            </div>
          </mt-header>
          <div class="mint-content">
            <div v-if="fullPriceSlots!=''">
              <span v-for="item in fullPriceSlots" @click="selFullPriceModel(item)">
                <mt-cell :title="item.fullPriceModel"></mt-cell>
                <hr width="100%" color="#f5f5f5" size="1">
              </span>
            </div>
            <div class="non-data" v-else>
              <img src="../../assets/images/icon-nothing.png">
            </div>
          </div>
        </mt-popup>
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-field class="mint-formItm last" label="座位数" :disabled="true" type="text">
          <span @click="openSeatBox"><input class="mint-input" type="text" readonly="readonly" v-model="carInfoData.car.passengerCapacity" placeholder="请选择座位数"><i class="ico-arrow"></i></span>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-popup v-model="popSeatVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="popSeatVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectSeatNum" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="seatSlots" @change="onSeatsChange"></mt-picker>
        </mt-popup>
      </div>
      <mt-field class="mint-formItm last" label="注册日期" type="text" :disabled="true">
        <span @click="selRegisterDate"><input class="mint-input" type="text" readonly="readonly" v-model="carInfoData.car.registerDate" placeholder="请输入注册日期"><i class="ico-arrow"></i></span>
      </mt-field>
      <mt-datetime-picker ref="registerDate" v-model="registerDate" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="registerDateConfirm">
      </mt-datetime-picker>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="号牌种类" type="text" :disabled="true">
        <span @click="openVehilots">
          <input class="mint-input" readonly="readonly" type="text" placeholder="请选择号牌型号" v-model="licenceType">
          <i class="ico-arrow"></i>
        </span>
      </mt-field>
      <mt-popup v-model="insuredVehilots" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="insuredVehilots=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="selInsureVehilots" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker :slots="Vehilots" @change="onVehicletype"></mt-picker>
      </mt-popup>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="行驶证车辆类型" type="text" :disabled="true">
        <span @click="openlicense">
          <input class="mint-input" readonly="readonly" type="text" placeholder="请选择行驶证车辆类型" v-model="licenseVehicleType">
          <i class="ico-arrow"></i>
        </span>
      </mt-field>
      <mt-popup v-model="insuredlicense" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="insuredlicense=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="selInsurelicense" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker :slots="Driving" @change="onlicense"></mt-picker>
      </mt-popup>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="使用性质" type="text" :disabled="true">
        <span @click="openproperty">
          <input class="mint-input" readonly="readonly" type="text" v-model="carInfoData.car.busType" placeholder="请选择使用性质">
          <i class="ico-arrow"></i>
        </span>
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="核定载质量(吨)：" :disabled="true">
        <input class="mint-input" type="text" v-model="carInfoData.car.weightCapacity" placeholder="核定载质量">
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="整备质量(吨)：" :disabled="true">
        <input class="mint-input" type="text" v-model="carInfoData.car.wholeWeight" placeholder="整备质量">
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="排量：" :disabled="true">
        <input class="mint-input" type="text" v-model="carInfoData.car.exhaustMeasure" placeholder="排量">
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-popup v-model="insuredproperty" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="insuredproperty=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="selInsureproperty" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker :slots="propertylost" @change="onproperty"></mt-picker>
      </mt-popup>
    </div>
    <div class="mint-region">
      <mt-field class="mint-formItm" label="车主名" :disabled="true">
        <input class="mint-input" type="text" v-model="carInfoData.car.owner.name" placeholder="请输入车主名">
      </mt-field>
      <hr width="100%" color="#f5f5f5" size="1">
      <div style="display: flex;align-items: center;">
        <mt-field style="flex: 1;" class="mint-formItm" label="证件类型" type="text" :disabled="true">
          <span @click="openTypeBox"><input class="mint-input" v-model="ownerIdType" readonly="readonly" type="text" placeholder="请选择证件类型"><i class="ico-arrow"></i></span>
        </mt-field>
        <mt-popup v-model="popTypeVisible" position="bottom" popup-transition="popup-fade">
          <div class="picker-toolbar">
            <span @click="popTypeVisible=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
            <span @click="selectTypeVal" class="mint-datetime-action mint-datetime-confirm">确定</span>
          </div>
          <mt-picker :slots="typeSlots" @change="onTypesChange"></mt-picker>
        </mt-popup>
        <van-button v-show="carInfoData.car.owner.relationType != 'Person'" size="small" style="margin-right: 15px;color:#f94037;border:1px solid #f94037;margin-left:5px;border-radius:8px" plain @click="showSeachOrgCode(carInfoData.car.owner.name,carInfoData.car.owner.idNo,'car')">机构代码查询</van-button>
        <!-- <mt-popup v-model="isSeachOrgCode" position="bottom" popup-transition="popup-fade"> -->
        <van-popup v-model="isSeachOrgCode" class="mint-popup-full" position="bottom">
          <mt-header fixed class="def-header" title="组织机构代码查询">
            <div slot="left">
              <van-icon name="cross" @click="isSeachOrgCode = false" />
              <!-- <mt-button icon="close"></mt-button> -->
            </div>
            <div slot="right">
              <p style="color:#357bfd;font-size:15px" @click="commitOrgCode">确定选择</p>
            </div>
          </mt-header>
          <div style="margin-top:50px;">
            <mt-field class="mint-formItm" label="机构名称" type="text" :disabled="true">
              <input class="mint-input" v-model="orgNameValue" type="text" placeholder="请输入">
            </mt-field>
            <mt-field class="mint-formItm" label="机构编码" type="text" :disabled="true">
              <input class="mint-input" v-model="orgCodeValue" type="text" placeholder="请输入">
            </mt-field>
            <div class="orgItemBox" v-for=" orgItem in orgCodeResult">
              <van-radio-group v-model="orgRadio">
                <van-radio :name="orgItem"></van-radio>
              </van-radio-group>
              <div style="flex:1">
                <span>
                  <p style="color:#333">{{orgItem.name}}</p>
                </span>
                <span>
                  <p>组织机构代码</p>
                  <p>{{orgItem.orgCode}}</p>
                </span>
                <span>
                  <p>统一社会信用代码</p>
                  <p>{{orgItem.creditCode}}</p>
                </span>
              </div>
            </div>
            <div v-show="showNoneData">
              <div class="non-data" v-show="showNoneData">
                <!-- <i class="ico-non-data"></i> -->
                <img src="../../assets/images/icon-nothing.png">
              </div>
            </div>
            <div class="searchBtnBox">
              <mt-button size="large" type="primary" @click="searchOrgCode">搜索</mt-button>
            </div>
          </div>
        </van-popup>
        <!-- </mt-popup> -->
      </div>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="车主证件号" type="text" :disabled="true">
        <input class="mint-input" @keyup="ownerNoBirth" v-model="carInfoData.car.owner.idNo" type="text" placeholder="请输入车主证件号">
      </mt-field>
      <div v-show="carInfoData.car.owner.relationType == 'Person'">
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-field class="mint-formItm" label="出生日期" :disabled="true" type="text">
          <span @click="selOwnerBirthday"><input class="mint-input ownerBirthday" type="text" readonly="readonly" v-model="carInfoData.car.owner.birthday" placeholder="请输入出生日期"><i class="ico-arrow"></i></span>
        </mt-field>
        <mt-datetime-picker ref="ownerBirthday" v-model="ownerBirthday" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="ownerBirthConfirm">
        </mt-datetime-picker>
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-field label="性别" type="text" :disabled="true">
          <span class="mint-plane fn-clear">
            <mt-radio v-model="carInfoData.car.owner.gender" :options="[{label: '男', value: 'Male'}, {label: '女', value: 'Female'}]"></mt-radio>
          </span>
        </mt-field>
      </div>
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field class="mint-formItm" label="车主手机号" type="number" :disabled="true">
        <input class="mint-input" oninput="if(value.length>11)value=value.slice(0,11)" v-model="carInfoData.car.owner.phone" type="number" placeholder="请输入车主手机号">
      </mt-field>
      <mt-field style="border-top: 1px solid #f0f0f0;" class="mint-formItm" label="电子邮箱" type="text" :disabled="true">
        <input class="mint-input" v-model="carInfoData.receivingEmail" type="email" placeholder="请输入电子邮箱">
      </mt-field>
    </div>
    <div class="mint-region">
      <hr width="100%" color="#f5f5f5" size="1">
      <mt-field label="是否过户车" type="text" :disabled="true">
        <span class="mint-plane fn-clear">
          <mt-radio v-model="carInfoData.car.isChangedOwner ? 'true' : 'false'" @change="isCarChangedOwner" :options="[{label: '是', value: 'true'}, {label: '否', value: 'false'}]"></mt-radio>
        </span>
      </mt-field>
      <div v-show="carInfoData.car.isChangedOwner">
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-field class="mint-formItm" label="过户日期" type="text" :disabled="true">
          <p @click="selChangedOwnerDate"><input class="mint-input changedOwnerDate" readonly="readonly" type="text" v-model="carInfoData.car.changedOwnerDate" placeholder="请输入过户日期"><i class="ico-arrow"></i></p>
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-datetime-picker ref="changedOwnerDate" v-model="changedOwnerDate" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="changedDateConfirm">
        </mt-datetime-picker>
        <hr width="100%" color="#f5f5f5" size="1">
      </div>
      <mt-field label="人保过户出单" type="text" :disabled="true" v-show="carInfoData.car.isChangedOwner">
        <span class="mint-plane fn-clear">
          <mt-radio v-model="changedOwnerCoverage" @change="ischangedOwnerCoverage" :options="[{label: '覆盖', value: 'Cover'}, {label: '临牌', value: 'Temporary'}, {label: '不覆盖', value: 'None'}]"></mt-radio>
        </span>
      </mt-field>
    </div>
    <hr width="100%" color="#f5f5f5" size="1">
    <div class="quote-row">投保人／被保人信息</div>
    <hr width="100%" color="#f5f5f5" size="1">
    <div class="mint-region">
      <mt-field label="投保人" :disabled="true">
        <mt-switch v-model="isApplicantSameOwner">同车主</mt-switch>
      </mt-field>
      <div v-show="!isApplicantSameOwner">
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-field class="mint-formItm" label="姓名" type="text" :disabled="true">
          <input class="mint-input" v-model="carInfoData.applicant.name" type="text" placeholder="请输入姓名">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        <div style="display: flex;align-items: center;">
          <mt-field style="flex: 1;" class="mint-formItm" label="证件类型" type="text" :disabled="true">
            <span @click="openApplicantTypeVis"><input class="mint-input" readonly="readonly" v-model="applicantIdType" type="text" placeholder="请选择证件类型"><i class="ico-arrow"></i></span>
          </mt-field>
          <mt-popup v-model="applicantTypeVis" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="applicantTypeVis=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selApplicantType" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="typeSlots" @change="changeApplicantTypes"></mt-picker>
          </mt-popup>
          <van-button v-show="carInfoData.applicant.relationType != 'Person'" size="small" style="margin-right: 15px;color:#f94037;border:1px solid #f94037;margin-left:5px;border-radius:8px" plain @click="showSeachOrgCode(carInfoData.applicant.name,carInfoData.applicant.idNo,'applicant') ">机构代码查询</van-button>
        </div>
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-field class="mint-formItm" label="证件号" type="text" :disabled="true">
          <input class="mint-input" @keyup="applicantNoBirth" v-model="carInfoData.applicant.idNo" type="text" placeholder="请输入证件号">
        </mt-field>
        <div v-show="carInfoData.applicant.relationType == 'Person'">
          <hr width="100%" color="#f5f5f5" size="1">
          <mt-field class="mint-formItm" label="出生日期" type="text" :disabled="true">
            <span @click="selApplicantBirthday"><input class="mint-input" readonly="readonly" type="text" v-model="carInfoData.applicant.birthday" placeholder="请输入出生日期"><i class="ico-arrow"></i></span>
          </mt-field>
          <mt-datetime-picker ref="applicantBirthday" v-model="applicantBirthday" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="applicantBirthConfirm">
          </mt-datetime-picker>
          <hr width="100%" color="#f5f5f5" size="1">
          <mt-field label="性别" type="text" :disabled="true">
            <span class="mint-plane fn-clear">
              <mt-radio v-model="carInfoData.applicant.gender" :options="[{label: '男', value: 'Male'}, {label: '女', value: 'Female'}]"></mt-radio>
            </span>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1">
          <mt-field class="mint-formItm" label="手机号" type="number" :disabled="true">
            <input class="mint-input" oninput="if(value.length>11)value=value.slice(0,11)" v-model="carInfoData.applicant.phone" type="number" placeholder="请输入手机号">
          </mt-field>
        </div>
      </div>
    </div>
    <div class="mint-region">
      <hr width="100%" color="#f5f5f5" size="1">
      <div class="isSameOwner" :disabled="true">
        <p style="font-size: 13px;color: #333;">被保人</p>
        <span>
          <mt-switch @change="changeApplicant" style="width: 50%; margin-right: 10px;" v-model="isInsuredSameApplicant">同投保人</mt-switch>
          <mt-switch @change="changeSameOwner" v-model="isInsuredSameOwner">同车主</mt-switch>
        </span>
      </div>
      <hr width="100%" color="#f5f5f5" size="1">
      <div v-show="!isInsuredSameOwner && !isInsuredSameApplicant">
        <mt-field class="mint-formItm" label="姓名" type="text" :disabled="true">
          <input class="mint-input" v-model="carInfoData.insured.name" type="text" placeholder="请输入姓名">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        <div style="display: flex;align-items: center;">
          <mt-field style="flex:1" class="mint-formItm" label="证件类型" type="text" :disabled="true">
            <span @click="openInsuredTypeVis"><input class="mint-input" readonly="readonly" v-model="insuredIdType" type="text" placeholder="请选择证件类型"><i class="ico-arrow"></i></span>
          </mt-field>
          <mt-popup v-model="insuredTypeVis" position="bottom" popup-transition="popup-fade">
            <div class="picker-toolbar">
              <span @click="insuredTypeVis=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
              <span @click="selInsuredType" class="mint-datetime-action mint-datetime-confirm">确定</span>
            </div>
            <mt-picker :slots="typeSlots" @change="changeInsuredTypes"></mt-picker>
          </mt-popup>
          <van-button v-show="carInfoData.insured.relationType != 'Person'" size="small" style="margin-right: 15px;color:#f94037;border:1px solid #f94037;margin-left:5px;border-radius:8px" plain @click="showSeachOrgCode(carInfoData.insured.name,carInfoData.insured.idNo,'insured')">机构代码查询</van-button>
        </div>
        <hr width="100%" color="#f5f5f5" size="1">
        <mt-field class="mint-formItm" label="证件号" type="text" :disabled="true">
          <input class="mint-input" @keyup="insuredNoBirth" v-model="carInfoData.insured.idNo" type="text" placeholder="请输入证件号">
        </mt-field>
        <hr width="100%" color="#f5f5f5" size="1">
        <div v-show="carInfoData.insured.relationType == 'Person'">
          <mt-field class="mint-formItm" label="出生日期" type="text" :disabled="true">
            <span @click="selInsuredBirthday"><input class="mint-input" readonly="readonly" type="text" v-model="carInfoData.insured.birthday" placeholder="请输入出生日期"><i class="ico-arrow"></i></span>
          </mt-field>
          <mt-datetime-picker ref="insuredBirthday" v-model="insuredBirthday" type="date" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="insuredBirthConfirm">
          </mt-datetime-picker>
          <hr width="100%" color="#f5f5f5" size="1">
          <mt-field label="性别" type="text" :disabled="true">
            <span class="mint-plane fn-clear">
              <mt-radio v-model="carInfoData.insured.gender" :options="[{label: '男', value: 'Male'}, {label: '女', value: 'Female'}]"></mt-radio>
            </span>
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1">
          <mt-field class="mint-formItm" label="手机号" type="number" :disabled="true">
            <input class="mint-input" oninput="if(value.length>11)value=value.slice(0,11)" v-model="carInfoData.insured.phone" type="number" placeholder="请输入手机号">
          </mt-field>
          <hr width="100%" color="#f5f5f5" size="1">
        </div>
      </div>
    </div>
    <van-popup v-model="messageone" position="bottom">
      <div class="messagecc">
        <mt-header class="def-header" title="交管车辆信息不一致">
          <div slot="left">
            <mt-button style="font-size:15px;color:#f94037" @click="closeone(false)">取消</mt-button>
          </div>
          <div slot="right">
            <mt-button style="font-size:15px;color:#f94037" @click="closeone(true)">更新</mt-button>
          </div>
        </mt-header>
        <table class="mint-table" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="30%">
            <col width="35%">
            <col width="35%">
          </colgroup>
          <tr style="background-color:#F3F3F3;">
            <th>车辆信息</th>
            <td>当前车辆信息</td>
            <td>交管车辆信息</td>
          </tr>
          <tr v-show="carInfoData.car.plateNo == officialData.plateNo">
            <th>车牌号</th>
            <td>{{carInfoData.car.plateNo}}</td>
            <td>{{officialData.plateNo}}</td>
          </tr>
          <tr v-show="carInfoData.car.plateNo != officialData.plateNo">
            <th>车牌号</th>
            <td style="background-color:#fbad19">{{carInfoData.car.plateNo}}</td>
            <td>{{officialData.plateNo}}</td>
          </tr>
          <tr v-show="carInfoData.car.engineNo == officialData.engineNo">
            <th>发动机号</th>
            <td>{{carInfoData.car.engineNo}}</td>
            <td>{{officialData.engineNo}}</td>
          </tr>
          <tr v-show="carInfoData.car.engineNo != officialData.engineNo">
            <th>发动机号</th>
            <td style="background-color:#fbad19">{{carInfoData.car.engineNo}}</td>
            <td>{{officialData.engineNo}}</td>
          </tr>
          <tr v-show="carInfoData.car.registerDate == officialData.registerDate">
            <th>注册日期</th>
            <td>{{carInfoData.car.registerDate}}</td>
            <td>{{officialData.registerDate}}</td>
          </tr>
          <tr v-show="carInfoData.car.registerDate != officialData.registerDate">
            <th>注册日期</th>
            <td style="background-color:#fbad19">{{carInfoData.car.registerDate}}</td>
            <td>{{officialData.registerDate}}</td>
          </tr>
          <tr v-show="carInfoData.car.changedOwnerDate == null || carInfoData.car.changedOwnerDate == officialData.transferDate">
            <th>过户日期</th>
            <td>{{carInfoData.car.changedOwnerDate}}</td>
            <td>{{officialData.transferDate}}</td>
          </tr>
          <tr v-show="carInfoData.car.changedOwnerDate != null && carInfoData.car.changedOwnerDate != officialData.transferDate">
            <th>过户日期</th>
            <td style="background-color:#fbad19">{{carInfoData.car.changedOwnerDate}}</td>
            <td>{{officialData.transferDate}}</td>
          </tr>
          <tr v-show="carInfoData.car.exhaustMeasure == officialData.exhaustMeasure">
            <th>排量</th>
            <td>{{carInfoData.car.exhaustMeasure}}</td>
            <td>{{officialData.exhaustMeasure}}</td>
          </tr>
          <tr v-show="carInfoData.car.exhaustMeasure != officialData.exhaustMeasure">
            <th>排量</th>
            <td style="background-color:#fbad19">{{carInfoData.car.exhaustMeasure}}</td>
            <td>{{officialData.exhaustMeasure}}</td>
          </tr>
          <tr v-show="carInfoData.car.passengerCapacity == officialData.passengerCapacity">
            <th>座位数</th>
            <td>{{carInfoData.car.passengerCapacity}}</td>
            <td>{{officialData.passengerCapacity}}</td>
          </tr>
          <tr v-show="carInfoData.car.passengerCapacity != officialData.passengerCapacity">
            <th>座位数</th>
            <td style="background-color:#fbad19">{{carInfoData.car.passengerCapacity}}</td>
            <td>{{officialData.passengerCapacity}}</td>
          </tr>
          <tr v-show="carInfoData.car.licenseVehicleType == officialData.licenseVehicleType">
            <th>行驶证车辆类型</th>
            <td>{{carInfoData.car.licenseVehicleType}}</td>
            <td>{{officialData.licenseVehicleType}}</td>
          </tr>
          <tr v-show="carInfoData.car.licenseVehicleType != officialData.licenseVehicleType">
            <th>行驶证车辆类型</th>
            <td style="background-color:#fbad19">{{carInfoData.car.licenseVehicleType}}</td>
            <td>{{officialData.licenseVehicleType}}</td>
          </tr>
          <tr v-show="carInfoData.car.licenceType == officialData.licenceType">
            <th>号牌种类</th>
            <td>{{carInfoData.car.licenceType}}</td>
            <td>{{officialData.licenceType}}</td>
          </tr>
          <tr v-show="carInfoData.car.licenceType != officialData.licenceType">
            <th>号牌种类</th>
            <td style="background-color:#fbad19">{{carInfoData.car.licenceType}}</td>
            <td>{{officialData.licenceType}}</td>
          </tr>
          <tr v-show="carInfoData.car.wholeWeight == officialData.wholeWeight">
            <th>整备质量(吨)</th>
            <td>{{carInfoData.car.wholeWeight}}</td>
            <td>{{officialData.wholeWeight}}</td>
          </tr>
          <tr v-show="carInfoData.car.wholeWeight != officialData.wholeWeight">
            <th>整备质量(吨)</th>
            <td style="background-color:#fbad19">{{carInfoData.car.wholeWeight}}</td>
            <td>{{officialData.wholeWeight}}</td>
          </tr>
          <tr v-show="carInfoData.car.weightCapacity == officialData.weightCapacity">
            <th>核定载质量(吨)</th>
            <td>{{carInfoData.car.weightCapacity}}</td>
            <td>{{officialData.weightCapacity}}</td>
          </tr>
          <tr v-show="carInfoData.car.weightCapacity != officialData.weightCapacity">
            <th>核定载质量(吨)</th>
            <td style="background-color:#fbad19">{{carInfoData.car.weightCapacity}}</td>
            <td>{{officialData.weightCapacity}}</td>
          </tr>
        </table>
        <div style="color:#FC3738;margin:10px;"><span>以上信息从交管局获得，点击“更新”将使用 交管车辆信息 替换 当前车辆信息</span></div>
      </div>
    </van-popup>
    <mt-popup v-show="inputPlateNo" position="bottom" popup-transition="popup-fade">
      <div id="dispense">
        <mt-header fixed class="def-header" title="车牌号">
          <div slot="left">
            <mt-button style="font-size:16px;color:#f94037" @click="closePlanteNoPop(false)">取消</mt-button>
          </div>
          <div slot="right">
            <mt-button style="font-size:16px;color:#f94037" @click="closePlanteNoPop(true)">确定</mt-button>
          </div>
        </mt-header>
        <div class="content-car-number">
          <div class="content-section">
            <div class="content-section-flex flex-card">
              <div class="content-section-flex flex-card-border">
                <button id="font" class="flex-btn" @click="btnClickYue" v-bind:class="{isClick: isYue }">
                  {{areaName}}
                </button>
                <span class="blank-border blank-border-first"></span>
                <button id='letter' class="flex-btn" @click="btnClickA" v-bind:class="{isClick: isA}">
                  {{areaLetter}}
                </button>
                <div class="flex-mid"><span></span></div>
                <div class="flex-btns">
                  <button id='numOne' @click="btnClickNum('one')" v-bind:class="{isNumClick: isNumOne }">{{numOne}}</button>
                  <span class="blank-border"></span>
                  <button id='numTwo' @click="btnClickNum('two')" v-bind:class="{isNumClick: isNumTwo }">{{numTwo}}</button>
                  <span class="blank-border"></span>
                  <button id='numThree' @click="btnClickNum('three')" v-bind:class="{isNumClick: isNumThree }">{{numThree}}
                  </button>
                  <span class="blank-border"></span>
                  <button id='numFour' @click="btnClickNum('four')" v-bind:class="{isNumClick: isNumFour }">{{numFour}}
                  </button>
                  <span class="blank-border"></span>
                  <button id='numFive' @click="btnClickNum('five')" v-bind:class="{isNumClick: isNumFive }">{{numFive}}
                  </button>
                  <span class="blank-border" v-if="checkbox"></span>
                  <button v-if="checkbox" id='numSix' @click="btnClickNum('six')" v-bind:class="{isNumClick: isNumSix }">{{numSix}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="keyboard" v-if="keyboardShow" :class='{animationDown:isDown,animationUp:isUp}'>
          <div v-if="keyboard == 'txt'">
            <div class="keyboard-row" v-for="(item,rows) in carTxt">
              <button class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
              </button>
            </div>
            <div class="keyboard-row">
              <!-- <div class="keyboard-row-items"> -->
              <button class="keyboard-row-item bottom" @click="btnBottomClick('新')">新</button>
              <button class="keyboard-row-item bottom" @click="btnBottomClick('临')">临</button>
              <button v-for="j in noneBottomtxt" class="none-botton">{{j}}</button>
              <div class="keyboard-row-item clear" @click="clearClick">
                <img src="../../assets/images/icon_input_delete.png" alt="删除">
              </div>
              <!-- </div> -->
            </div>
          </div>
          <div v-if="keyboard == 'num'">
            <div class="keyboard-row" v-for="(item,rows) in carNum">
              <button :disabled="!isSelectl?isDisable && i<10 :isDisable&& rows!=0 " class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
              </button>
            </div>
            <div class="keyboard-row">
              <!-- <div class="keyboard-row-bottom"> -->
              <button :disabled="isSelectl" v-for="item in carNumBottom" class="keyboard-row-item bottom" @click="btnBottomNumClick(item)">{{item}}
              </button>
              <button v-for="j in noneBottom" class="none-botton">{{j}}</button>
              <div class="keyboard-row-item clear" @click="clearClick">
                <img src="../../assets/images/icon_input_delete.png" alt="删除">
              </div>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
    <van-popup v-model="isOccre" position="bottom">
      <ScanOcrFile :scanType="scantype" scanTitle="车辆行驶证识别" v-on:getOcrresult="getOcrresult" v-on:closeOcr="closeOcr"></ScanOcrFile>
    </van-popup>
    <van-popup v-model="showHistory" style="height:100%" position="bottom">
      <vehiclePolicy v-on:closePolicy="closePolicy"></vehiclePolicy>
    </van-popup>
    <van-popup v-model="showCity" position="bottom">
      <selectCity v-on:selectedCity="selectedCity" v-on:closeCity="closeCity"></selectCity>
    </van-popup>
    <van-popup v-model="show" style="background-color:rgba(255, 255, 255, 0)" >
      <!-- <van-loading type="spinner" size="50px" vertical>
        <span style="color:#FFF;font-size:15px" v-show="showQueryCarInfo">正在查询车辆信息，请稍后...</span>
        <span style="color:#FFF;font-size:15px" v-show="showQueryRenewalpolicy">正在查询续保信息，请稍后...</span>
      </van-loading> -->
      <div class="loadingBox">
        <img class="loadingImg" src="../../assets/images/icon-loading-circle-white.png" alt="" srcset="">
       </div>
       <span style="color:#FFF;font-size:14px" v-show="showQueryCarInfo">正在查询车辆信息，请稍后...</span>
        <span style="color:#FFF;font-size:14px" v-show="showQueryRenewalpolicy">正在查询续保信息，请稍后...</span>
      <div style="display:block">
        <div  v-if="showQueryRenewalpolicy" style="margin-top: 5px;">
            <van-progress :percentage="count2" pivot-color="#4A66FE" :show-pivot="false" />
        </div>
        <p style="display:flex;justify-content: center;" v-show="showQueryRenewalpolicy" @click="show=false">
          <span style="color:#FFF;font-size:15px;margin-top:15px;line-height:30px;width:100px;border-radius:5px;border:1px solid #FFF;text-align:center;">取消</span>
        </p>
      </div>
    </van-popup>
    <mt-button class="btn-fixed" @click="openone" size="large" type="primary">开始报价</mt-button>
  </div>
</template>
<script>
var typeResult = {
    '个人': ['中华人民共和国身份证', '港澳居民来往内地通行证', '台胞证'],
    '企业单位': ['机构代码', '统一社会信用代码'],
    '机关单位': ['机构代码', '统一社会信用代码']
  },
  arro = ["51", "52", "53", "59", "11", "13", "19"],
  arre = ["91", "92", "93"];
var suredproperty = {
  "非营业": [],
  "营业": ["出租租赁", "城市公交", "公路客运", "旅游客运"]
}
import { Toast, Indicator } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import event from './../../common/event';
import Licenseplate from '../../assets/json/Vehicletype.json';
import Licenseplatee from '../../assets/json/Licenseplatee.json';
import Vehicletype from '../../assets/json/Licenseplate.json';
import Vehicletypee from '../../assets/json/Vehicletypee.json';
import pinyin from '../../../static/lib/web-pinyin/bundle.js';
import selectCity from "./../quoteManagement/city";
import vehiclePolicy from "./../quoteManagement/vehiclePolicyInfo";
import ScanOcrFile from './../quoteManagement/ScanOcrFile';
import axios from "axios";
const address = Vehicletype.result;
const Licens = Licenseplate.result;
const TIME_COUNT = 3000;
export default {
  name: 'vehicleInfo',
  data() {
    return {
      count2:0,
      show:false,
      showTimer: true,
      count: '',
      timer: null,
      orgRadio: '',
      scantype: '',
      orgNameValue: '',
      orgCodeValue: '',
      isOccre: false,
      Ocrresult: [],
      showCity: false,
      citys: [],
      letter: [],
      tipString: '',
      noData: true,
      showHistory: false,
      changedOwnerCoverage: "None",
      isNonPlateNo: false,
      ownerIdType: '',
      applicantIdType: '',
      insuredIdType: '',
      ownerIdTypeVal: '',
      applicantIdTypeVal: '',
      insuredIdTypeVal: '',
      carInfoData: {
        insCorp: {},
        insCity: { shortName: "", code: "" },
        car: {
          owner: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
          plateNo: "",
          vin: "",
          engineNo: "",
          brandName: "",
          model: "",
          makerModel: "",
          vehicleModelCode: "",
          purchasePrice: "",
          analogyCarPrice: "",
          year: "",
          passengerCapacity: "",
          registerDate: "",
          remark: "",
          exhaustMeasure: "",
          isChangedOwner: false,
          changedOwnerCoverage: "None",
          changedOwnerDate: "",
          aliasName: "",
          fullPriceModel: "",
          licenseVehicleType: "",
          licenceType: "",
          busType: '',
          useCharacter: "",
          weightCapacity: 0,
          wholeWeight: 0
        },
        applicant: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
        insured: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
        bzRiskKind: {},
        bsRiskKind: {},
        ownerIdType: "",
        receivingEmail: '',
      },
      startDate: new Date('1949-01-01'),
      endDate: new Date(this.Common.Public.GetDateStr(0)),
      registerDate: this.Common.Public.GetDateStr(0),
      fullPriceSlots: [],
      fullPriceModelBox: false,
      seatSlots: [{ flex: 1, defaultIndex: 0, values: [2, 3, 4, 5, 6, 7, 8, 9], className: 'slot1' }],
      popSeatVisible: false,
      passengerCapacity: 5,
      licenseVehicleType: 'K33',
      licenceType: 'SmallBus',
      busType: '非营业',
      Vehilots: [{ flex: 1, values: Object.values(address), className: 'slot1' }],
      Driving: [{ flex: 1, values: Object.values(Licens), className: 'slot1' }],
      propertylost: [{ flex: 1, values: Object.keys(suredproperty), className: 'slot1', textAlign: 'center' }, { divider: true, content: '-', className: 'slot2' }, { flex: 1, values: Object.values(suredproperty)[0], className: 'slot3', textAlign: 'center' }],
      typeSlots: [{ flex: 1, values: Object.keys(typeResult), className: 'slot1', textAlign: 'center' }, { divider: true, content: '-', className: 'slot2' }, { flex: 1, values: Object.values(typeResult)[0], className: 'slot3', textAlign: 'center' }],
      ownerBirthday: new Date(this.Common.Public.GetDateStr(0)),
      changedOwnerDate: new Date(this.Common.Public.GetDateStr(0)),
      applicantBirthday: new Date(this.Common.Public.GetDateStr(0)),
      insuredBirthday: new Date(this.Common.Public.GetDateStr(0)),
      popTypeVisible: false,
      applicantTypeVis: false,
      insuredTypeVis: false,
      isApplicantSameOwner: true,
      isInsuredSameOwner: true,
      isInsuredSameApplicant: false,
      insuredVehilots: false,
      insuredlicense: false,
      insuredproperty: false,
      phone: '',
      officialData: {
        registerDate: '',
        plateNo: '',
        engineNo: '',
        transferDate: '',
        weightCapacity: '',
        wholeWeight: '',
        exhaustMeasure: '',
        licenseVehicleType: '',
        licenceType: '',
        passengerCapacity: ''
      },
      messageone: false,
      update: false,
      inputPlateNo: false,
      checkbox: true,
      isDown: false,
      isUp: false,
      selected: null,
      isSelectx: false,
      isSelectl: false,
      key: 1,
      areaName: '',
      areaLetter: '',
      numOne: '',
      numTwo: '',
      numThree: '',
      numFour: '',
      numFive: '',
      numSix: '',
      isYue: false,
      keyboardShow: false,
      keyboard: false,
      isA: false,
      isNumOne: false,
      isNumTwo: false,
      isNumThree: false,
      isNumFour: false,
      isNumFive: false,
      isNumSix: false,
      isDisable: false,
      isOne: false,
      isTwo: false,
      isThree: false,
      isFour: false,
      isFive: false,
      isSix: false,
      isSeven: false,
      isEight: false,
      isOther: false,
      carTxt: [
        { name: ['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉', '黑'] },
        { name: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂'] },
        { name: ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'] }
      ],
      carNumBottom: ['W', 'X', 'Y', 'Z'],
      noneBottom: ['', '', '', ''],
      noneBottomtxt: ['', '', '', '', '', ''],
      carNum: [
        { name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
        { name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'] },
        { name: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'] }
      ],
      addedCarNum: '',
      customer: {},
      hasCustomer: false,
      showPolicy: false,
      showOcr: true,
      canUseOcr: false,
      isSeachOrgCode: false,
      isShowOrgBtn: true,
      orgCodeResult: [],
      orgCodeType: '',
      showNoneData: false,
      showQueryCarInfo:true,
      showQueryRenewalpolicy:false,
      carInfoParams:{}
    }
  },
  mounted() { // 获取续保信息
    var self = this,
    carInfoParams = {},
    insureInfoApp = localStorage.getItem('insureInfoApp');
    carInfoParams.insCityCode = self.$route.query.insCityCode;
    carInfoParams.plateNo = self.$route.query.plateNo;
    carInfoParams.vin = self.$route.query.vin;
    carInfoParams.engineNo = self.$route.query.engineNo;
    self.phone = self.$route.query.phone;
    var appId = localStorage.getItem('appId');
    // var appFeatures = JSON.parse(sessionStorage.getItem('appFeatures'));
    //   self.canUseOcr = appFeatures.indexOf('ORC') > 0;    
    self.canUseOcr = (appId == 'cxs190103104249iwe' || appId == 'cxa181211170855pxj' ||
      appId == 'cx8190110143618pyi' || appId == 'cx4180310190219bh6' || appId == 'cx91909x2101234uqc' || appId == 'cx118051y511426x5r'
       || appId == 'cx5190108195859o31' );
    if (self.$route.query.plateNo != '') carInfoParams.ownerIdCardNo = self.$route.query.ownerIdCardNo;
    if ((carInfoParams.plateNo && carInfoParams.plateNo.length >= 6) || carInfoParams.vin) {
      var querParam = '';
      if (carInfoParams.plateNo && carInfoParams.plateNo.length >= 6) {
        querParam = carInfoParams.plateNo;
      }
      if (carInfoParams.vin) {
        querParam = carInfoParams.vin;
      }
      // this.carInfoParams = carInfoParams;
      if(JSON.stringify(carInfoParams) != "{}"){
          sessionStorage.setItem("carInfoParams",JSON.stringify(carInfoParams));
      }
      // Indicator.open('正在查询车辆信息，请稍候...');
      self.showQueryCarInfo = true;
      self.show = self.showQueryCarInfo;
      axiosGetAPI('/vi/VehiceInfo?plateNoOrVin=' + querParam).then((res) => {
        // self.$nextTick(() => {
        // Indicator.close();
        self.showQueryCarInfo = false;
        self.show = self.showQueryCarInfo;
        if (res.result) {
          self.hasCustomer = true;
          self.customer = res.result;
          self.showHistoryInfo();
          self.showOcr = false;
        } else {
          self.showOcr = true;
        }
        self.getRenewalpolicy(carInfoParams);
        // })
      });
    } else {
      self.isNonPlateNo = true;
      self.carInfoData.car.plateNo = "未上牌";
    }
    // }
    self.initData();
    var oHeight = $(window).height(); //浏览器当前的高度
    $(window).resize(function() {
      if ($(window).height() < oHeight) {
        $(".mint-button").hide();
      } else {
        $(".mint-button").show();
      }
    });
  },
  components: {
    selectCity,
    vehiclePolicy,
    ScanOcrFile,
  },
  watch: {
    checkbox: function(val) {
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.yue
      const vm = this
      if (!val) { // 切换到普通车牌
        if (vm.numFour) {
          vm.isNumFive = true
          vm.key = 7
          // console.log(4, val)
        }
      } else { // 切换到新能源车牌
        if (vm.numFive) {
          vm.isNumSix = true
          vm.key = 8
          // console.log(3, val)
        }
      }
    }
  },
  methods: {
    IsIDCard: function(input) {
      // input = input.toUpperCase();
      //验证身份证号码格式 [一代身份证号码为15位的数字；二代身份证号码为18位的数字或17位的数字加字母X]  
      if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(input))) {
        return false;
      }
      //验证省份  
      var arrCity = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      };
      if (arrCity[parseInt(input.substr(0, 2))] == null) {
        // Toast('请输入有效的车主证件号');
        return false;
      }
      //验证出生日期  
      var regBirth, birthSplit, birth;
      var len = input.length;
      if (len == 15) {
        regBirth = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        birthSplit = input.match(regBirth);
        birth = new Date('19' + birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
        if (!(birth.getYear() == Number(birthSplit[2]) && (birth.getMonth() + 1) == Number(birthSplit[3]) && birth.getDate() == Number(birthSplit[4]))) {
        //  Toast('请输入有效的车主证件号');
         return false;
        }
        return true;
      } else if (len == 18) {
        regBirth = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i);
        birthSplit = input.match(regBirth);
        birth = new Date(birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
        if (!(birth.getFullYear() == Number(birthSplit[2]) && (birth.getMonth() + 1) == Number(birthSplit[3]) && birth.getDate() == Number(birthSplit[4]))) {
        
        return false;
        }
        //验证校验码  
        var valnum;
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0,
          i;
        for (i = 0; i < 17; i++) {
          nTemp += input.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != input.substr(17, 1)) {
          // Toast('请输入有效的车主证件号');
          return false;
        }
        return true;
      }
      return false;
    },
    changeRadio(value) {
      console.log(value)
    },
    showSeachOrgCode(name, idNo, type) {
      this.orgCodeType = type;
      var self = this;
      self.orgCodeResult = [];
      this.orgRadio = '';
      this.isSeachOrgCode = true;
      this.orgNameValue = name;
      this.orgCodeValue = idNo;
    },
    searchOrgCode() {
      var self = this;
      const orgName = '',
        orgCode = '';
      const param = {
        orgName: this.orgNameValue,
        orgCode: this.orgCodeValue
      }
      Indicator.open('加载中...');
      axiosGetAPI('/vi/Enterprise', param).then((res) => {
        if (res.result) {
          self.orgCodeResult = res.result;
          // self.fullPriceSlots = res.result;
          if (res.result.length == 0) {
            self.showNoneData = true;
          } else {
            self.showNoneData = false;
          }

        }

        Indicator.close();
      });
    },
    commitOrgCode() {
      var self = this;
      if (this.orgRadio != '') {
        if (this.orgCodeType == 'car') {
          this.carInfoData.car.owner.name = this.orgRadio.name;
          if (this.carInfoData.car.owner.idType == 'Organization') {
            this.carInfoData.car.owner.idNo = this.orgRadio.orgCode
          }
          if (this.carInfoData.car.owner.idType == 'CreditCode') {
            this.carInfoData.car.owner.idNo = this.orgRadio.creditCode
          }
        }
        if (this.orgCodeType == 'applicant') {
          self.carInfoData.applicant.name = this.orgRadio.name;
          if (self.carInfoData.applicant.idType == 'Organization') {
            self.carInfoData.applicant.idNo = this.orgRadio.orgCode
          }
          if (self.carInfoData.applicant.idType == 'CreditCode') {
            self.carInfoData.applicant.idNo = this.orgRadio.creditCode
          }
        }
        if (this.orgCodeType == 'insured') {
          self.carInfoData.insured.name = this.orgRadio.name;
          if (self.carInfoData.insured.idType == 'Organization') {
            self.carInfoData.insured.idNo = this.orgRadio.orgCode
          }
          if (self.carInfoData.insured.idType == 'CreditCode') {
            self.carInfoData.insured.idNo = this.orgRadio.creditCode
          }
        }
        this.isSeachOrgCode = false;
      } else {
        Toast('请选择机构');
      }
    },
    showOccre() {
      this.scantype = 'VehicleLicense'
      this.isOccre = true;
    },
    getOcrresult(Ocrresult) {
      this.isOccre = false;
      // console.log(Ocrresult)
      if (Ocrresult) {
        this.carInfoData.car = {
          owner: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
          plateNo: "",
          vin: "",
          engineNo: "",
          brandName: "",
          model: "",
          makerModel: "",
          vehicleModelCode: "",
          purchasePrice: "",
          analogyCarPrice: "",
          year: "",
          passengerCapacity: "",
          registerDate: "",
          remark: "",
          exhaustMeasure: "",
          isChangedOwner: false,
          changedOwnerCoverage: "None",
          changedOwnerDate: "",
          aliasName: "",
          fullPriceModel: "",
          licenseVehicleType: "",
          licenceType: "",
          busType: '',
          useCharacter: "",
          weightCapacity: 0,
          wholeWeight: 0
        };
        this.carInfoData.car.owner.name = Ocrresult.carOwnerName;
        this.carInfoData.car.plateNo = Ocrresult.plateNo;
        this.carInfoData.car.vin = Ocrresult.vin;
        this.carInfoData.car.engineNo = Ocrresult.engineNo;
        this.carInfoData.car.model = Ocrresult.model;
        // this.carInfoData.car.licenseVehicleType = Ocrresult.licenseVehicleType;
        for (var i = 0; i < Vehicletypee.result.length; i++) {
          if (Ocrresult.licenseVehicleType == "") {
            this.licenseVehicleType == "K33";
          }
          if (Ocrresult.licenseVehicleType == Vehicletypee.result[i].text) {
            this.licenseVehicleType = Vehicletypee.result[i].display;
          }
        }
        if (Ocrresult.useCharacter == '非营运') {
          this.carInfoData.car.busType = '非营业';
        }
        // this.carInfoData.car.useCharacter = Ocrresult.useCharacter;
        this.carInfoData.car.registerDate = Ocrresult.registerDate;
        // this.initData();
      }
    },
    closeOcr() {
      this.isOccre = false;
    },
    getRenewalpolicy: function(carInfoParams) {
      var self = this;
      // Indicator.open('正在查询续保信息，请稍候...');
      self.showQueryRenewalpolicy = true;
      self.show = self.showQueryRenewalpolicy;

      if (!this.timer) {
        // this.count2 = 40;
        this.count = 1;
        this.showTimer = false;
        this.timer = setInterval(() => {
          if (this.count < TIME_COUNT) {
            this.count++;
            if( this.count2 < 80){
                this.count2 = this.count2 + 0.3;
            } else if(this.count2 >=80 && this.count2 < 95){
              this.count2 = this.count2 + 0.05;
            } else if(this.count2 >=95 && this.count2 < 98){
              this.count2 = this.count2 + 0.01 ;
            }
            else{
                 this.count2 = 98;
            }
          } else {
            this.count2 = 100;
            this.showTimer = true;
            clearInterval(this.timer);
            this.timer = null;
            this.show = false;    
          }
        }, 50)
      }

      var root = process.env.API_ROOT;
      axios({
        method: "GET",
        // url: '/vi/policies/renewalpolicy',
        url:'/vi/InsureCustomer',
        data: null,
        params: carInfoParams,
        baseURL: root,
        withCredentials: false
      }).then(function(res) {
        if (res.data.status == 200 && res.data.result) {
          var data = res.data;
          self.showOcr = false;
          self.hasCustomer = false;
          self.showHistoryInfo(data.result)
          for (var i = 0; i < Vehicletypee.result.length; i++) {
            if (self.carInfoData.car.licenseVehicleType == "") {
              self.licenseVehicleType == "K33"
            };
            if (self.carInfoData.car.licenseVehicleType == Vehicletypee.result[i].text) {
              self.licenseVehicleType = Vehicletypee.result[i].display
            }
          };
          for (var i = 0; i < Licenseplatee.result.length; i++) {
            if (self.carInfoData.car.licenceType == "") {
              self.licenceType == "SmallBus"
            };
            if (self.carInfoData.car.licenceType == Licenseplatee.result[i].text) {
              self.licenceType = Licenseplatee.result[i].display
            }
          }
        } else {
          if (self.hasCustomer) {
            self.showOcr = false;
            self.showHistoryInfo();
          } else {
            Toast('未查询到续保数据，请填写报价资料')
            self.initData();
          }
        }
        self.showQueryRenewalpolicy = false;
        self.show = self.showQueryRenewalpolicy;
        // Indicator.close();
      }, err => {
        self.initData();
        reject(err);
      }).catch(function(error) {
        self.initData();
        console.log(error);
      });
    },
    initData: function() {
      var self = this;
      self.showOcr = true;
      self.licenseVehicleType = '轿车';
      self.licenceType = '小型汽车';
      self.carInfoData.insCity.shortName = self.$route.query.insCityShortName;
      self.carInfoData.insCity.code = self.$route.query.insCityCode;
      self.carInfoData.car.plateNo = self.$route.query.plateNo;
      self.carInfoData.car.vin = self.$route.query.vin;
      self.carInfoData.car.engineNo = self.$route.query.engineNo;
      self.phone = self.$route.query.phone;
      self.carInfoData.car.licenseVehicleType = 'K33';
      self.carInfoData.car.licenceType = 'SmallBus';
      self.carInfoData.car.busType = '非营业';
      self.isApplicantSameOwner = true;
      self.isInsuredSameOwner = true;
      var curDate = new Date();
      var year = curDate.getFullYear();
      var month = curDate.getMonth() + 1;
      var day = curDate.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      self.registerDate = year + '-' + month + '-' + day;
      self.ownerBirthday = year + '-' + month + '-' + day;
      self.applicantBirthday = year + '-' + month + '-' + day;
      self.insuredBirthday = year + '-' + month + '-' + day;
      self.changedOwnerDate = year + '-' + month + '-' + day;
    },
    changeApplicant: function() {
      // console.log(111)
      this.isInsuredSameOwner = false;
    },
    changeSameOwner: function() {
      this.isInsuredSameApplicant = false;
    },
    closeCity: function() {
      this.showCity = false;
    },
    selectedCity: function(cityCode, cityShortName) {
      this.showCity = false;
      sessionStorage.setItem('insCtiyCode', cityCode);
      this.carInfoData.insCity.code = cityCode;
      this.carInfoData.insCity.shortName = cityShortName;
    },

    ischangedOwnerCoverage: function(value) { // 人保过户出单
      console.log("value: " + value);
      this.changedOwnerCoverage = value;
      this.carInfoData.car.changedOwnerCoverage = this.changedOwnerCoverage;
    },
    viewPolicy: function() {
      this.showHistory = true;
    },
    closePolicy: function() {
      this.showHistory = false;
    },
    closePlanteNoPop: function(update) {
      var self = this;
      self.inputPlateNo = false;
      if (update) {
        self.addCar();
      };
    },
    openPlanteNoPop: function() {
      var self = this;
      if (!self.isNonPlateNo) {
        self.inputPlateNo = true;
        if (self.carInfoData.car.plateNo && self.carInfoData.car.plateNo != '未上牌') {
          var len = self.carInfoData.car.plateNo.length;
          if (len == 1) {
            self.areaName = self.carInfoData.car.plateNo.substring(0, 1);
          } else if (len == 2) {
            self.areaName = self.carInfoData.car.plateNo.substring(0, 1);
            self.areaLetter = self.carInfoData.car.plateNo.substring(1, 2);
          } else if (len == 3) {
            self.areaName = self.carInfoData.car.plateNo.substring(0, 1);
            self.areaLetter = self.carInfoData.car.plateNo.substring(1, 2);
            self.numOne = self.carInfoData.car.plateNo.substring(2, 3);
          } else if (len == 4) {
            self.areaName = self.carInfoData.car.plateNo.substring(0, 1);
            self.areaLetter = self.carInfoData.car.plateNo.substring(1, 2);
            self.numOne = self.carInfoData.car.plateNo.substring(2, 3);
            self.numTwo = self.carInfoData.car.plateNo.substring(3, 4);
          } else if (len == 5) {
            self.areaName = self.carInfoData.car.plateNo.substring(0, 1);
            self.areaLetter = self.carInfoData.car.plateNo.substring(1, 2);
            self.numOne = self.carInfoData.car.plateNo.substring(2, 3);
            self.numTwo = self.carInfoData.car.plateNo.substring(3, 4);
            self.numThree = self.carInfoData.car.plateNo.substring(4, 5);
          } else if (len == 6) {
            self.areaName = self.carInfoData.car.plateNo.substring(0, 1);
            self.areaLetter = self.carInfoData.car.plateNo.substring(1, 2);
            self.numOne = self.carInfoData.car.plateNo.substring(2, 3);
            self.numTwo = self.carInfoData.car.plateNo.substring(3, 4);
            self.numThree = self.carInfoData.car.plateNo.substring(4, 5);
            self.numFour = self.carInfoData.car.plateNo.substring(5, 6);
          } else if (len == 7) {
            self.areaName = self.carInfoData.car.plateNo.substring(0, 1);
            self.areaLetter = self.carInfoData.car.plateNo.substring(1, 2);
            self.numOne = self.carInfoData.car.plateNo.substring(2, 3);
            self.numTwo = self.carInfoData.car.plateNo.substring(3, 4);
            self.numThree = self.carInfoData.car.plateNo.substring(4, 5);
            self.numFour = self.carInfoData.car.plateNo.substring(5, 6);
            self.numFive = self.carInfoData.car.plateNo.substring(6, 7);
          } else if (len == 8) {
            self.areaName = self.carInfoData.car.plateNo.substring(0, 1);
            self.areaLetter = self.carInfoData.car.plateNo.substring(1, 2);
            self.numOne = self.carInfoData.car.plateNo.substring(2, 3);
            self.numTwo = self.carInfoData.car.plateNo.substring(3, 4);
            self.numThree = self.carInfoData.car.plateNo.substring(4, 5);
            self.numFour = self.carInfoData.car.plateNo.substring(5, 6);
            self.numFive = self.carInfoData.car.plateNo.substring(6, 7);
            self.numSix = self.carInfoData.car.plateNo.substring(7, 8);
            self.checkbox = true;
          }
        }
        self.btnClickYue();
      };
    },
    //弹层
    closeone: function(update) {
      var self = this;
      self.messageone = false;
      self.update = update;
      self.subCarInfo();
    },
    openone: function() {
      var self = this;

      if (self.checkInputValue()) {
        if (self.carInfoData.insCity.code && (self.carInfoData.insCity.code.indexOf("44") < 0 ||
            self.carInfoData.insCity.code.indexOf("4403") >= 0)) {
          self.messageone = false;
          self.update = false;
          self.subCarInfo();
        } else {
          var url = '/vi/vehicles/official?vin=' + self.carInfoData.car.vin + '&insCityCode=' + self.carInfoData.insCity.code;
          Indicator.open('加载中...');
          axiosGetAPI(url).then((res) => {
            Indicator.close();
            if (res.result) {
              self.officialData = res.result;
              if (self.officialData.plateNo == self.carInfoData.car.plateNo &&
                self.officialData.engineNo == self.carInfoData.car.engineNo &&
                self.officialData.registerDate == self.carInfoData.car.registerDate &&
                self.officialData.changedOwnerDate == self.carInfoData.car.transferDate &&
                self.officialData.exhaustMeasure == self.carInfoData.car.exhaustMeasure &&
                self.officialData.passengerCapacity == self.carInfoData.car.passengerCapacity &&
                self.officialData.licenseVehicleType == self.carInfoData.car.licenseVehicleType &&
                self.officialData.licenceType == self.carInfoData.car.licenceType &&
                self.officialData.wholeWeight == self.carInfoData.car.wholeWeight &&
                self.officialData.weightCapacity == self.carInfoData.car.weightCapacity) {
                self.messageone = false;
                self.update = false;
                self.subCarInfo();
              } else {
                self.messageone = true;
              }
            } else {
              self.messageone = false;
              self.update = false;
              self.subCarInfo();
            };
          });
        }
      }
    },
    showHistoryInfo: function(results) {
      // var self = this;
      //是否有客户数据
      if (this.hasCustomer) {
        if (this.customer.owner) {
          this.carInfoData.car.owner = this.customer.owner;
        }
        /*if (this.carInfoData.car.owner && this.carInfoData.car.owner.phone) {
          this.carInfoData.car.owner.phone = '';
        };*/
        if (this.phone) {
          this.carInfoData.car.owner.phone = this.phone;
        };
        if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
          var arr2 = this.carInfoData.car.owner.birthday.split(' ')
          if (arr2.length > 1) {
            this.carInfoData.car.owner.birthday = arr2[0];
          }
        };

        this.carInfoData.car.plateNo = this.customer.plateNo;
        this.carInfoData.car.vin = this.customer.vin;
        this.carInfoData.car.engineNo = this.customer.engineNo;
        this.carInfoData.car.brandName = this.customer.brandName;
        this.carInfoData.car.model = this.customer.model;
        this.carInfoData.car.makerModel = this.customer.makerModel;
        this.carInfoData.car.vehicleModelCode = this.customer.vehicleModelCode;
        this.carInfoData.car.purchasePrice = this.customer.purchasePrice;
        this.carInfoData.car.analogyCarPrice = this.customer.analogyCarPrice;
        this.carInfoData.car.year = (this.customer.year && this.customer.year > 0) ? this.customer.year : "";
        this.carInfoData.car.passengerCapacity = (this.customer.passengerCapacity && this.customer.passengerCapacity > 0) ? this.customer.passengerCapacity : "";
        this.carInfoData.car.registerDate = this.customer.registerDate;
        this.carInfoData.car.remark = this.customer.remark;
        this.carInfoData.car.exhaustMeasure = this.customer.exhaustMeasure;
        this.carInfoData.car.isChangedOwner = this.customer.isChangedOwner;
        this.carInfoData.car.changedOwnerDate = this.customer.changedOwnerDate;
        this.carInfoData.car.aliasName = this.customer.aliasName;
        if (this.carInfoData.car.makerModel || this.carInfoData.car.vehicleModelCode) {
          this.carInfoData.car.fullPriceModel = this.customer.fullPriceModel;
        } else {
          this.carInfoData.car.fullPriceModel = '';
        }
        if (this.carInfoData.car.fullPriceModel) {
          $("#fullPriceModel").each(function() {
            this.setAttribute('style', 'height:120px;overflow-y:hidden;');
          }).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
          });
        }
        if (this.customer.licenceTypeDisplay) {
          this.carInfoData.car.licenceTypeDisplay = this.customer.licenceTypeDisplay;
        }
        if (this.customer.busType) {
          this.carInfoData.car.busType = this.customer.busType;
        }
        if (this.customer.energyType) {
          this.carInfoData.car.energyType = this.customer.energyType;
        }
        if (this.customer.energyTypeDisplay) {
          this.carInfoData.car.energyTypeDisplay = this.customer.energyTypeDisplay;
        }
        if (this.customer.wholeWeight) {
          this.carInfoData.car.wholeWeight = this.customer.wholeWeight;
        }
        if (this.customer.weightCapacity) {
          this.carInfoData.car.weightCapacity = this.customer.weightCapacity;
        }
        if (this.customer.remark) {
          this.carInfoData.car.remark = this.customer.remark;
        }
        if (this.customer.owner) {
          this.ownerIdType = this.Common.Public.cardTypeChangeTxt(this.customer.owner.relationType, this.customer.owner.idType);
        }

        if (this.customer.plateNo == '' || this.customer.plateNo == '未上牌') {
          this.carInfoData.car.plateNo = '未上牌';
          this.isNonPlateNo = true;
        } else {
          this.carInfoData.car.plateNo = this.customer.plateNo;
          this.isNonPlateNo = false;
        }
        if (this.carInfoData.car.registerDate) {
          this.carInfoData.car.registerDate = this.carInfoData.car.registerDate.substring(0, 10)
        }
        if (this.carInfoData.car.changedOwnerDate) {
          this.carInfoData.car.changedOwnerDate = this.carInfoData.car.changedOwnerDate.substring(0, 10)
        }
        if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
          this.carInfoData.car.owner.birthday = this.carInfoData.car.owner.birthday.substring(0, 10);
        }
        if (this.customer.licenseVehicleType == '' || this.customer.licenseVehicleType == null) {
          this.carInfoData.car.licenseVehicleType = 'K33';
        } else {
          this.carInfoData.car.licenseVehicleType = this.customer.licenseVehicleType;
        };
        if (this.customer.licenceType == '' || this.customer.licenceType == null) {
          this.carInfoData.car.licenceType = 'SmallBus';
        } else {
          this.carInfoData.car.licenceType = this.customer.licenceType;
        };

        if (this.customer.busType == '' || this.customer.busType == null) {
          this.carInfoData.car.busType = '非营业';
        } else {
          if (this.customer.useCharacter == 'FeiYingYe') {
            this.carInfoData.car.busType = '非营业';
          } else {
            this.carInfoData.car.busType = this.customer.busType;
          }
        };

        for (var i = 0; i < Vehicletypee.result.length; i++) {
          if (this.carInfoData.car.licenseVehicleType == "") {
            this.licenseVehicleType == "K33"
          };
          if (this.carInfoData.car.licenseVehicleType == Vehicletypee.result[i].text) {
            this.licenseVehicleType = Vehicletypee.result[i].display
          }
        };
        for (var i = 0; i < Licenseplatee.result.length; i++) {
          if (this.carInfoData.car.licenceType == "") {
            this.licenceType == "SmallBus"
          };
          if (this.carInfoData.car.licenceType == Licenseplatee.result[i].text) {
            this.licenceType = Licenseplatee.result[i].display
          }
        }
      } else {
        if (results) {
          this.carInfoData.car = results.car;
          this.ownerIdType = this.Common.Public.cardTypeChangeTxt(results.car.owner.relationType, results.car.owner.idType);
          /*if (this.carInfoData.car.owner && this.carInfoData.car.owner.phone) {
            this.carInfoData.car.owner.phone = '';
          }*/

          if (this.phone) {
            this.carInfoData.car.owner.phone = this.phone;
          }
          if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
            var arr2 = this.carInfoData.car.owner.birthday.split(' ')
            if (arr2.length > 1) {
              this.carInfoData.car.owner.birthday = arr2[0];
            }
          }
          if (results.car.plateNo == '' || results.car.plateNo == '未上牌') {
            this.carInfoData.car.plateNo = '未上牌';
            this.isNonPlateNo = true;
          } else {
            this.carInfoData.car.plateNo = results.car.plateNo;
            this.isNonPlateNo = false;
          }
          if (this.carInfoData.car.registerDate) {
            this.carInfoData.car.registerDate = this.carInfoData.car.registerDate.substring(0, 10)
          }
          if (this.carInfoData.car.changedOwnerDate) {
            this.carInfoData.car.changedOwnerDate = this.carInfoData.car.changedOwnerDate.substring(0, 10)
          }
          if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
            this.carInfoData.car.owner.birthday = this.carInfoData.car.owner.birthday.substring(0, 10);
          }
          if (results.car.licenseVehicleType == '' || results.car.licenseVehicleType == null) {
            this.carInfoData.car.licenseVehicleType = 'K33';
          } else {
            this.carInfoData.car.licenseVehicleType = results.car.licenseVehicleType;
          }
          if (results.car.licenceType == '' || results.car.licenceType == null) {
            this.carInfoData.car.licenceType = 'SmallBus';
          } else {
            this.carInfoData.car.licenceType = results.car.licenceType;
          }

          if (results.car.busType == '' || results.car.busType == null) {
            this.carInfoData.car.busType = '非营业';
          } else {
            if (results.car.useCharacter == 'FeiYingYe') {
              this.carInfoData.car.busType = '非营业';
            } else {
              this.carInfoData.car.busType = results.car.busType;
            }
          }
          this.carInfoData.car.weightCapacity = results.car.weightCapacity;
          this.carInfoData.car.wholeWeight = results.car.wholeWeight;
          this.carInfoData.car.exhaustMeasure = results.car.exhaustMeasure;
          this.carInfoData.car.makerModel = results.car.makerModel;
          this.carInfoData.car.vehicleModelCode = results.car.vehicleModelCode;
          if (this.carInfoData.car.makerModel || this.carInfoData.car.vehicleModelCode) {
            this.carInfoData.car.fullPriceModel = results.car.fullPriceModel;
          } else {
            this.carInfoData.car.fullPriceModel = '';
          }
          if (this.carInfoData.car.fullPriceModel) {
            $("#fullPriceModel").each(function() {
              this.setAttribute('style', 'height:120px;overflow-y:hidden;');
            }).on('input', function() {
              this.style.height = 'auto';
              this.style.height = (this.scrollHeight) + 'px';
            });
          }

          if (results.car.owner.relationType == 'Person') {
            this.ownerNoBirth(false)
          }
        } else {
          self.initData();
        }
      }
      if (results) {
        this.carInfoData.car.owner = results.car.owner;
        /*if (this.carInfoData.car.owner && this.carInfoData.car.owner.phone) {
          this.carInfoData.car.owner.phone = '';
        };*/
        if (this.phone) {
          this.carInfoData.car.owner.phone = this.phone;
        };
        if (this.carInfoData.car.owner && this.carInfoData.car.owner.birthday) {
          var arr2 = this.carInfoData.car.owner.birthday.split(' ')
          if (arr2.length > 1) {
            this.carInfoData.car.owner.birthday = arr2[0];
          }
        }
        this.ownerIdType = this.Common.Public.cardTypeChangeTxt(results.car.owner.relationType, results.car.owner.idType);
        /*if (this.carInfoData.car.owner && this.carInfoData.car.owner.phone) {
          this.carInfoData.car.owner.phone = '';
        }*/

        if (this.phone) {
          this.carInfoData.car.owner.phone = this.phone;
        }
        if (results.applicant) {
          this.carInfoData.applicant = results.applicant;
          if (this.carInfoData.applicant && this.carInfoData.applicant.phone) {
            this.carInfoData.applicant.phone = '';
          }
          if (results.applicant.name == results.car.owner.name && results.applicant.relationType == results.car.owner.relationType && results.applicant.name == results.car.owner.name && results.applicant.idNo == results.car.owner.idNo) {
            this.isApplicantSameOwner = true;
          } else {
            this.isApplicantSameOwner = false;
          }
          if (this.carInfoData.applicant.birthday) {
            this.carInfoData.applicant.birthday = this.carInfoData.applicant.birthday.substring(0, 10)
          }
          this.applicantIdType = this.Common.Public.cardTypeChangeTxt(results.applicant.relationType, results.applicant.idType);
          if (results.applicant.relationType == 'Person') {
            this.applicantNoBirth(false)
          }
        } else {
          this.isApplicantSameOwner = true;
        }
        if (results.insured) {
          this.carInfoData.insured = results.insured;
          if (this.carInfoData.insured && this.carInfoData.insured.phone) {
            this.carInfoData.insured.phone = '';
          }
          if (results.insured.name == results.car.owner.name && results.insured.relationType == results.car.owner.relationType && results.insured.name == results.car.owner.name && results.insured.idNo == results.car.owner.idNo) {
            this.isInsuredSameOwner = true;
          } else {
            this.isInsuredSameOwner = false;
          }
          if (this.carInfoData.insured.birthday) {
            this.carInfoData.insured.birthday = this.carInfoData.insured.birthday.substring(0, 10)
          }
          this.insuredIdType = this.Common.Public.cardTypeChangeTxt(results.insured.relationType, results.insured.idType);
          if (results.insured.relationType == 'Person') {
            this.insuredNoBirth(false)
          }
        } else {
          this.isInsuredSameOwner = true;
        }
        if (results.bzRiskKind) {
          this.carInfoData.bzRiskKind = results.bzRiskKind;
          this.showPolicy = true;
        }
        if (results.bsRiskKind) {
          this.carInfoData.bsRiskKind = results.bsRiskKind;
          this.showPolicy = true;
        }
        if (results.insCorp) {
          this.carInfoData.insCorp = results.insCorp;
        }
        this.carInfoData.ownerIdType = this.ownerIdType;
      }
      sessionStorage.setItem("carInfoData", JSON.stringify(this.carInfoData));
      if (this.carInfoData.car.fullPriceModel) {
        $("#fullPriceModel").each(function() {
          this.setAttribute('style', 'height:120px;overflow-y:hidden;');
        }).on('input', function() {
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
        });
      }
      Indicator.close();
    },
    choiceCity: function() { // 点击切换城市
      var self = this;
      self.showCity = true;
    },
    ownerNoBirth: function(e) { // 车主证件号校验+通过证件号来判断性别 出生日期
      if (this.ownerIdType == '') { Toast('请选择车主证件类型'); return false; }
      const idNo = this.carInfoData.car.owner.idNo;
      if (e == false) {
        const $this = $(e.currentTarget).closest('.mint-field');
        this.Common.Public.judgeCarType($this, idNo, '', this.carInfoData.car.owner.idType, this.carInfoData.car.owner.relationType, '');
      }
      this.carInfoData.car.owner.gender = this.Common.Public.checkBirthday(idNo)[0];
      this.carInfoData.car.owner.birthday = this.Common.Public.checkBirthday(idNo)[1];
    },
    applicantNoBirth: function(e) { // 投保人证件号校验+通过证件号来判断性别 出生日期
      if (this.applicantIdType == '') { Toast('请选择投保人证件类型'); return false; }
      const idNo = this.carInfoData.applicant.idNo;
      if (e == false) {
        const $this = $(e.currentTarget).closest('.mint-field');
        this.Common.Public.judgeCarType($this, idNo, '', this.carInfoData.applicant.idType, this.carInfoData.applicant.relationType, '');
      }
      this.carInfoData.applicant.gender = this.Common.Public.checkBirthday(idNo)[0];
      this.carInfoData.applicant.birthday = this.Common.Public.checkBirthday(idNo)[1];
    },
    insuredNoBirth: function(e) { // 被保人证件号校验+通过证件号来判断性别 出生日期
      if (this.insuredIdType == '') { Toast('请选择被保人证件类型'); return false; }
      const idNo = this.carInfoData.insured.idNo;
      if (e == false) {
        const $this = $(e.currentTarget).closest('.mint-field');
        this.Common.Public.judgeCarType($this, idNo, '', this.carInfoData.insured.idType, this.carInfoData.insured.relationType, '');
      }
      this.carInfoData.insured.gender = this.Common.Public.checkBirthday(idNo)[0];
      this.carInfoData.insured.birthday = this.Common.Public.checkBirthday(idNo)[1];
    },
    selRegisterDate: function() { // 打开注册日期选择层
      if (this.carInfoData.car.registerDate) {
        this.registerDate = new Date(this.carInfoData.car.registerDate);
      }
      this.$refs.registerDate.open();
    },
    registerDateConfirm: function() { // 选择注册日期
      this.carInfoData.car.registerDate = this.Common.Public.dateString(this.registerDate)
      this.$refs.registerDate.close();
    },
    openPriceModelBoxByVin: function() { // 打开选择车型价格层
      var self = this;
      if (!self.carInfoData.car.vin) {
        Toast('请输入车架号');
        return false;
      }
      const param = {
        vin: self.carInfoData.car.vin
      }
      Indicator.open('加载中...');
      axiosGetAPI('/vi/vehicePrices', param).then((res) => {
        self.fullPriceModelBox = true;
        if (res.result) {
          self.fullPriceSlots = res.result;
        }
        Indicator.close();
      });
    },
    openPriceModelBoxBymodel: function() { // 打开选择车型价格层
      var self = this;
      if (!self.carInfoData.car.model) {
        Toast('请输入品牌型号');
        return false;
      }
      const param = {
        model: self.carInfoData.car.model
      }
      Indicator.open('加载中...');
      axiosGetAPI('/vi/vehicePrices', param).then((res) => {
        self.fullPriceModelBox = true;
        if (res.result) {
          self.fullPriceSlots = res.result;
        }
        Indicator.close();
      });
    },
    openPriceModelBox: function() { // 打开选择车型价格层
      var self = this;
      if (!self.carInfoData.car.vin) {
        Toast('请输入车架号');
        return false;
      }

      const param = {
        model: self.carInfoData.car.model,
        vin: self.carInfoData.car.vin
      }
      Indicator.open('加载中...');
      axiosGetAPI('/vi/vehicePrices', param).then((res) => {
        self.fullPriceModelBox = true;
        if (res.result) {
          self.fullPriceSlots = res.result;
        }
        Indicator.close();
      });
    },
    selFullPriceModel: function(item) { // 选择车型价格
      var self = this,
        results = item;
      self.carInfoData.car.brandName = results.brandName;
      self.carInfoData.car.model = results.model;
      self.carInfoData.car.makerModel = results.makerModel;
      self.carInfoData.car.purchasePrice = results.purchasePrice;
      self.carInfoData.car.year = results.year;
      self.carInfoData.car.remark = results.remark;
      self.carInfoData.car.exhaustMeasure = results.exhaustMeasure;
      self.carInfoData.car.passengerCapacity = results.passengerCapacity;
      self.carInfoData.car.aliasName = results.aliasName;
      self.carInfoData.car.seriesName = results.seriesName;
      self.carInfoData.car.analogyCarPrice = results.analogyCarPrice;
      self.carInfoData.car.vehicleModelCode = results.vehicleModelCode;
      self.carInfoData.car.fullPriceModel = results.fullPriceModel;
      self.carInfoData.car.licenceType = results.licenceType;
      self.carInfoData.car.licenseVehicleType = results.licenseVehicleType;

      for (var i = 0; i < Vehicletypee.result.length; i++) {
        if (self.carInfoData.car.licenseVehicleType == Vehicletypee.result[i].text) {
          self.licenseVehicleType = Vehicletypee.result[i].display;
        }
        if (self.licenseVehicleType == Vehicletypee.result[i].display) {
          self.carInfoData.car.licenseVehicleType = Vehicletypee.result[i].text;
        };
      }
      for (var i = 0; i < Licenseplatee.result.length; i++) {
        if (self.carInfoData.car.licenceType == Licenseplatee.result[i].text) {
          self.licenceType = Licenseplatee.result[i].display;
        }
        if (self.licenceType == Licenseplatee.result[i].display) {
          self.carInfoData.car.licenceType = Licenseplatee.result[i].text;
        };
      }

      self.fullPriceModelBox = false;
      $("#fullPriceModel").each(function() {
        this.setAttribute('style', 'height:120px;overflow-y:hidden;');
      }).on('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
    },
    onSeatsChange(picker, values) { //滑动座位数
      this.passengerCapacity = values[0];
    },
    openSeatBox: function() { // 打开座位数浮层
      this.popSeatVisible = true;
      this.passengerCapacity = this.carInfoData.car.passengerCapacity;
    },
    selectSeatNum: function() { //选择座位数
      this.carInfoData.car.passengerCapacity = this.passengerCapacity;
      this.popSeatVisible = false;
    },
    onVehicletype(picker, values) { //滑动号牌种类
      this.licenceType = values[0];
    },
    openVehilots: function() {
      this.insuredVehilots = true; //打开号牌种类选择层

    },
    selInsureVehilots: function() {
      this.insuredVehilots = false; //选择号牌类型
      this.carInfoData.car.licenceType = this.licenceType
      for (var i = 0; i < Licenseplatee.result.length; i++) {
        if (this.carInfoData.car.licenceType == Licenseplatee.result[i].text) {
          this.licenceType = Licenseplatee.result[i].display
        }
        if (this.licenceType == Licenseplatee.result[i].display) {
          this.carInfoData.car.licenceType = Licenseplatee.result[i].text
        };
      }
    },
    onlicense(picker, values) { //滑动行驶证车辆类型
      this.licenseVehicleType = values[0];
    },
    openlicense: function() {
      this.insuredlicense = true; //打开行驶证车辆类型
    },
    selInsurelicense: function() {
      this.insuredlicense = false; //选择行驶证车辆类型
      this.carInfoData.car.licenseVehicleType = this.licenseVehicleType;
      for (var i = 0; i < Vehicletypee.result.length; i++) {
        if (this.carInfoData.car.licenseVehicleType == Vehicletypee.result[i].text) {
          this.licenseVehicleType = Vehicletypee.result[i].display
        }
        if (this.licenseVehicleType == Vehicletypee.result[i].display) {
          this.carInfoData.car.licenseVehicleType = Vehicletypee.result[i].text
        };
      }
    },
    onproperty(picker, values) { //滑动车主证件类型
      picker.setSlotValues(1, suredproperty[values[0]]);
      this.busType = values;
      if (this.busType[0] == "营业") { this.busType = this.busType[0] + '-' + this.busType[1] }
      if (this.busType[0] == "非营业") { this.busType = this.busType[0] }
    },
    openproperty: function() {
      this.insuredproperty = true; //打开使用性质
      this.carInfoData.car.busType = "非营业"
    },
    selInsureproperty: function() {
      this.insuredproperty = false; //选择使用性质
      this.carInfoData.car.busType = this.busType;
    },

    onTypesChange(picker, values) { //滑动车主证件类型
      picker.setSlotValues(1, typeResult[values[0]]);
      this.ownerIdTypeVal = values;
    },
    openTypeBox: function() { //打开车主证件类型选择层
      this.popTypeVisible = true;
    },
    selectTypeVal: function() { //选择车主证件类型
      this.popTypeVisible = false;
      // this.carInfoData.car.owner.idNo = '';
      this.ownerIdType = this.ownerIdTypeVal[0] + ' - ' + this.ownerIdTypeVal[1];
      this.carInfoData.car.owner.relationType = this.Common.Public.cardTypeChange(this.ownerIdTypeVal[0], this.ownerIdTypeVal[1])[0];
      this.carInfoData.car.owner.idType = this.Common.Public.cardTypeChange(this.ownerIdTypeVal[0], this.ownerIdTypeVal[1])[1];
    },
    openApplicantTypeVis: function() { //打开投保人证件类型选择层
      this.applicantTypeVis = true;
    },
    changeApplicantTypes(picker, values) { //滑动投保人证件类型
      picker.setSlotValues(1, typeResult[values[0]]);
      this.applicantIdTypeVal = values;
    },
    selApplicantType: function() { //选择投保人证件类型
      this.applicantTypeVis = false;
      // this.carInfoData.applicant.idNo = '';
      this.applicantIdType = this.applicantIdTypeVal[0] + ' - ' + this.applicantIdTypeVal[1];
      this.carInfoData.applicant.relationType = this.Common.Public.cardTypeChange(this.applicantIdTypeVal[0], this.applicantIdTypeVal[1])[0];
      this.carInfoData.applicant.idType = this.Common.Public.cardTypeChange(this.applicantIdTypeVal[0], this.applicantIdTypeVal[1])[1];
    },
    openInsuredTypeVis: function() { //打开被保人证件类型选择层
      this.insuredTypeVis = true;
    },
    changeInsuredTypes(picker, values) { //滑动被保人证件类型
      picker.setSlotValues(1, typeResult[values[0]]);
      this.insuredIdTypeVal = values;
    },
    selInsuredType: function() { //选择被保人证件类型
      this.insuredTypeVis = false;
      // this.carInfoData.insured.idNo = '';
      this.insuredIdType = this.insuredIdTypeVal[0] + ' - ' + this.insuredIdTypeVal[1];
      this.carInfoData.insured.relationType = this.Common.Public.cardTypeChange(this.insuredIdTypeVal[0], this.insuredIdTypeVal[1])[0];
      this.carInfoData.insured.idType = this.Common.Public.cardTypeChange(this.insuredIdTypeVal[0], this.insuredIdTypeVal[1])[1];
    },
    selOwnerBirthday: function() { // 打开车主生日日期层
      if (this.carInfoData.car.owner.birthday) {
        this.ownerBirthday = new Date(this.carInfoData.car.owner.birthday);
      }
      this.$refs.ownerBirthday.open();
    },
    ownerBirthConfirm: function(e) { // 选择车主生日日期
      if (this.ownerBirthday) this.carInfoData.car.owner.birthday = this.Common.Public.dateString(this.ownerBirthday)
      $('.ownerBirthday').val(this.carInfoData.car.owner.birthday);
      this.$refs.registerDate.close();
    },
    isCarChangedOwner: function(value) { // 是否过户车
      if (value == 'true') this.carInfoData.car.isChangedOwner = true;
      if (value == 'false') this.carInfoData.car.isChangedOwner = false;
      this.carInfoData.car.changedOwnerDate = '';
    },
    selChangedOwnerDate: function(e) { // 打开过户车日期层
      if (this.carInfoData.car.changedOwnerDate) {
        this.changedOwnerDate = new Date(this.carInfoData.car.changedOwnerDate);
      }
      this.$refs.changedOwnerDate.open();
    },
    changedDateConfirm: function(e) { // 选择过户日期
      var self = this;
      self.carInfoData.car.changedOwnerDate = self.Common.Public.dateString(self.changedOwnerDate);
      $('.changedOwnerDate').val(self.carInfoData.car.changedOwnerDate);
      self.$refs.changedOwnerDate.close();
    },
    selApplicantBirthday: function() { // 打开投保人生日日期层
      if (this.carInfoData.applicant.birthday) {
        this.applicantBirthday = new Date(this.carInfoData.applicant.birthday);
      }
      this.$refs.applicantBirthday.open();
    },
    applicantBirthConfirm: function() { // 选择投保人生日日期
      this.carInfoData.applicant.birthday = this.Common.Public.dateString(this.applicantBirthday)
      this.$refs.applicantBirthday.close();
    },
    selInsuredBirthday: function() { // 打开被保人生日日期层
      if (this.carInfoData.insured.birthday) {
        this.insuredBirthday = new Date(this.carInfoData.insured.birthday);
      }

      this.$refs.insuredBirthday.open();
    },
    insuredBirthConfirm: function() { // 选择被保人生日日期
      this.carInfoData.insured.birthday = this.Common.Public.dateString(this.insuredBirthday)
      this.$refs.insuredBirthday.close();
    },
    turn: function() { // 是否未上牌
      var self = this;
      self.changeCard();
    },
    changeCard: function() { // 有无车牌处理函数
      var self = this;
      // self.inputPlateNo = !self.isNonPlateNo;
      if (!self.isNonPlateNo) {
        self.carInfoData.car.plateNo = self.carInfoData.car.plateNo;
      } else {
        self.carInfoData.car.plateNo = "未上牌";
      }
    },
    subCarInfo: function() { // 开始报价
      var self = this;
      if (self.officialData && self.update) {
        self.carInfoData.car.plateNo = self.officialData.plateNo;
        self.carInfoData.car.engineNo = self.officialData.engineNo;
        self.carInfoData.car.registerDate = self.officialData.registerDate;
        self.carInfoData.car.changedOwnerDate = self.officialData.transferDate;
        if (self.officialData.transferDate) {
          self.carInfoData.car.isChangedOwner = true;
        };
        self.carInfoData.car.exhaustMeasure = self.officialData.exhaustMeasure;
        self.carInfoData.car.passengerCapacity = self.officialData.passengerCapacity;
        self.carInfoData.car.licenseVehicleType = self.officialData.licenseVehicleType;
        self.carInfoData.car.licenceType = self.officialData.licenceType;
        self.carInfoData.car.wholeWeight = self.officialData.wholeWeight;
        self.carInfoData.car.weightCapacity = self.officialData.weightCapacity;
      };
      if (self.checkInputValue()) {
        const results = JSON.stringify(self.carInfoData);
        const resultsData = JSON.parse(results);
        if (self.isApplicantSameOwner == true) { resultsData.applicant = ''; }
        if (self.isInsuredSameOwner == true) { resultsData.insured = ''; }
        if (self.isInsuredSameApplicant == true) { resultsData.insured = resultsData.applicant; }
        var emitFather;
        emitFather = { num: '2', size: 33.33, isScheme: true }
        self.$emit('child-vehicle', emitFather);
        self.$event.$emit('handle-event', resultsData);
        localStorage.setItem("insureInfoApp", JSON.stringify(resultsData));
      }
    },
    carTypeChange(val) {
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      if (!val) { // 切换到普通车牌
        if (this.numFour) {
          this.isNumFive = true
          this.key = 7
        }
      } else { // 切换到新能源车牌
        if (this.numFive) {
          this.isNumSix = true
          this.key = 8
        }
      }
    },
    btnClickYue() {
      this.isYue = true
      this.isA = false
      this.isUp = true
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.keyboardShow = true
      this.keyboard = 'txt'
      this.key = 1
    },
    btnWordClick(rows, index, i) {
      this.selected = i
      if (this.key === 1) {
        if (this.areaName === '临') {
          this.areaLetter = ''
          this.numOne = ''
          this.numTwo = ''
          this.numThree = ''
          this.numFour = ''
          this.numFive = ''
          this.numSix = ''
        }
        this.areaName = i
        this.isSelectl = false
        document.getElementById('letter').click()
      } else if (this.key === 2) {
        this.areaLetter = i
        document.getElementById('numOne').click()
      } else if (this.key === 3) {
        this.numOne = i
        document.getElementById('numTwo').click()
      } else if (this.key === 4) {
        this.numTwo = i
        document.getElementById('numThree').click()
      } else if (this.key === 5) {
        this.numThree = i
        document.getElementById('numFour').click()
      } else if (this.key === 6) {
        this.numFour = i
        document.getElementById('numFive').click()
      } else if (this.key === 7) {
        this.numFive = i
        if (this.checkbox) {
          document.getElementById('numSix').click()
        }
      } else if (this.key === 8) {
        this.numSix = i
      }
      if (this.key === 7 || this.key === 8) {
        this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
        this.noneBottom = ['']
      } else if (this.key === 3 || this.key === 4 || this.key === 5 || this.key === 6) {
        this.carNumBottom = ['W', 'X', 'Y', 'Z']
        this.noneBottom = ['', '', '', '']
      }
    },
    btnBottomClick(val) {
      if (val === '新') {
        if (this.areaName === '临') {
          this.areaLetter = ''
          this.numOne = ''
          this.numTwo = ''
          this.numThree = ''
          this.numFour = ''
          this.numFive = ''
          this.numSix = ''
        }
        this.areaName = '新'
        this.isSelectx = true
        this.isSelectl = false
        document.getElementById('letter').click()
      } else if (val === '临') {
        this.areaName = '临'
        this.isSelectl = true
        this.isSelectx = false
        this.isDisable = true
        this.areaLetter = ''
        this.numOne = ''
        this.numTwo = ''
        this.numThree = ''
        this.numFour = ''
        this.numFive = ''
        this.numSix = ''
        document.getElementById('letter').click('isLin')
      }
    },
    btnBottomNumClick(i) {
      this.selected = i
      if (this.key === 2) {
        this.areaLetter = i
        document.getElementById('numOne').click()
      } else if (this.key === 3) {
        this.numOne = i
        document.getElementById('numTwo').click()
      } else if (this.key === 4) {
        this.numTwo = i
        document.getElementById('numThree').click()
      } else if (this.key === 5) {
        this.numThree = i
        document.getElementById('numFour').click()
      } else if (this.key === 6) {
        this.numFour = i
        document.getElementById('numFive').click()
      } else if (this.key === 7) {
        this.numFive = i
        if (this.checkbox) {
          document.getElementById('numSix').click()
        }
      } else if (this.key === 8) {
        this.numSix = i
      }
    },
    btnClickA() {
      this.isDisable = true
      this.isA = true
      this.isYue = false
      this.isUp = true
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.keyboardShow = true
      this.keyboard = 'num'
      this.key = 2
    },
    btnClickNum(name) {
      if (this.isSelectl) {
        this.isDisable = true
      } else {
        this.isDisable = false
      }
      this.keyboard = 'num'
      this.keyboardShow = true
      this.isYue = false
      this.isA = false
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.isUp = true
      if (name === 'one') {
        this.isNumOne = true
        this.key = 3
      } else if (name === 'two') {
        this.isNumTwo = true
        this.key = 4
      } else if (name === 'three') {
        this.isNumThree = true
        this.key = 5
      } else if (name === 'four') {
        this.isNumFour = true
        this.key = 6
      } else if (name === 'five') {
        this.isNumFive = true
        this.key = 7
      } else if (name === 'six') {
        this.isNumSix = true
        this.key = 8
      }
      if (name === 'five' || name === 'six') {
        this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
        this.noneBottom = ['']
      } else {
        this.carNumBottom = ['W', 'X', 'Y', 'Z']
        this.noneBottom = ['', '', '', '']
      }
    },
    completeClick() {
      this.isYue = false
      this.isA = false
      this.isNumOne = false
      this.isNumTwo = false
      this.isNumThree = false
      this.isNumFour = false
      this.isNumFive = false
      this.isNumSix = false
      this.isUp = false
      this.isDown = true
      this.keyboardShow = false
    },
    clearClick() {
      if (this.key === 1) {
        this.areaName = ''
      } else if (this.key === 2) {
        document.getElementById('font').click()
        this.areaLetter = ''
      } else if (this.key === 3) {
        document.getElementById('letter').click()
        this.numOne = ''
      } else if (this.key === 4) {
        document.getElementById('numOne').click()
        this.numTwo = ''
      } else if (this.key === 5) {
        document.getElementById('numTwo').click()
        this.numThree = ''
      } else if (this.key === 6) {
        document.getElementById('numThree').click()
        this.numFour = ''
      } else if (this.key === 7) {
        document.getElementById('numFour').click()
        this.numFive = ''
      } else if (this.key === 8) {
        document.getElementById('numFive').click()
        this.numSix = ''
      }
    },
    addCar() {
      var num
      if (!this.checkbox) {
        num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive
      } else if (this.checkbox) {
        num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive + this.numSix
      }
      if (num === '') {
        Toast("请输入车牌")
      } else if (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '') {
        Toast("请输入完整车牌")
      }
      this.carInfoData.car.plateNo = num;
    },
    checkInputValue: function() {
      var self = this;
      if (self.carInfoData.insCity.shortName == '' || self.carInfoData.insCity.shortName == undefined) {
        Toast('请选择投保地区');
        return false
      };
      if (self.carInfoData.car.plateNo == '' || self.carInfoData.car.plateNo == undefined) {
        Toast('请输入车牌号码');
        return false
      };
      if (self.carInfoData.car.vin == '' || self.carInfoData.car.vin == undefined) {
        Toast('请输入车架号');
        return false
      };
      if (self.carInfoData.car.engineNo == '' || self.carInfoData.car.engineNo == undefined) {
        Toast('请输入发动机号');
        return false
      };
      if (self.carInfoData.car.model == '' || self.carInfoData.car.model == undefined) {
        Toast('请输入品牌型号');
        return false
      };
      if (self.carInfoData.car.registerDate == '' || self.carInfoData.car.registerDate == undefined) {
        Toast('请选择注册日期');
        return false
      };
      if (self.carInfoData.car.licenceType == '' || self.carInfoData.car.licenceType == undefined) {
        Toast('请选择号牌种类');
        return false
      };

      if (self.carInfoData.car.licenseVehicleType == '' || self.carInfoData.car.licenseVehicleType == undefined) {
        Toast('请选择行驶证车辆类型');
        return false
      };

      if (self.carInfoData.car.busType == '' || self.carInfoData.car.busType == undefined) {
        Toast('请输选择使用性质');
        return false
      };

      if (self.carInfoData.car.fullPriceModel == '' || self.carInfoData.car.fullPriceModel == undefined ||
        self.carInfoData.car.fullPriceModel.length == 0) {
        Toast('请选择车型价格');
        return false
      };

      if (self.carInfoData.car.passengerCapacity == '' || self.carInfoData.car.passengerCapacity == undefined) {
        Toast('请选择座位数');
        return false
      };
      if (self.carInfoData.car.owner.name == '' || self.carInfoData.car.owner.name == undefined) {
        Toast('请输入车主名');
        return false;
      };
      if (self.carInfoData.car.owner.name.indexOf('*') >= 0) {
        Toast('车主名称不允许存在*号，请输入正确的车主姓名');
        return false;
      };
      if (self.carInfoData.car.owner.relationType == undefined || self.carInfoData.car.owner.idType == undefined) {
        Toast('请选择车主证件类型');
        return false;
      };
      if (self.carInfoData.car.owner.idNo == '' || self.carInfoData.car.owner.idNo == undefined) {
        Toast('请输入车主证件号');
        return false;
      };
      if (self.carInfoData.car.owner.idNo.indexOf('*') >= 0) {
        Toast('车主证件号不允许存在*号，请输入正确的车主证件号');
        return false;
      };
      if (self.carInfoData.car.owner.relationType == 'Person') {
     if (self.carInfoData.car.owner.idType == "IdCard") {
       var isNext =  this.IsIDCard(self.carInfoData.car.owner.idNo);
          if( !isNext ){
            Toast('请输入有效的车主证件号');
            return false;
          }
        };
        if (self.carInfoData.car.owner.birthday == undefined || self.carInfoData.car.owner.birthday == '') {
          Toast('请选择车主出生日期');
          return false
        };
        if (self.carInfoData.car.owner.gender == undefined || self.carInfoData.car.owner.gender == '') {
          Toast('请选择车主性别');
          return false
        };
      } else {
        self.carInfoData.car.owner.birthday = "";
        self.carInfoData.car.owner.gender = "";
      }

      if (self.carInfoData.car.owner.phone == '' || self.carInfoData.car.owner.phone == undefined) {
        Toast('请输入车主手机号');
        return false;
      };

      if (self.carInfoData.car.isChangedOwner &&
        (self.carInfoData.car.changedOwnerDate == '' || self.carInfoData.car.changedOwnerDate == undefined)) {
        Toast('请选择过户日期');
        return false
      };

      if (self.isApplicantSameOwner == false) {
        if (self.carInfoData.applicant.name == undefined || self.carInfoData.applicant.name == '') {
          Toast('请输入投保人姓名');
          return false
        };
        if (self.carInfoData.applicant.name.indexOf('*') >= 0) {
          Toast('投保人姓名不允许存在*号，请输入正确的投保人姓名');
          return false;
        };
        if (self.carInfoData.applicant.relationType == undefined || self.carInfoData.applicant.idType == undefined) {
          Toast('请选择投保人证件类型');
          return false
        };
        if (self.carInfoData.applicant.idNo == undefined || self.carInfoData.applicant.idNo == '') {
          Toast('请输入投保人证件号');
          return false
        };
        if (self.carInfoData.applicant.idNo.indexOf('*') >= 0) {
          Toast('投保人证件号不允许存在*号，请输入正确的投保人证件号');
          return false;
        };
        if (self.carInfoData.applicant.relationType == 'Person') {
           
          if (self.carInfoData.applicant.idType == "IdCard" ) {
             var isNext =  this.IsIDCard(self.carInfoData.applicant.idNo);
            if( !isNext){
              Toast('请输入有效的投保人证件号');
              return false;
            }
            // Toast('请输入有效的投保人证件号');
            // return false;
          };
          if (self.carInfoData.applicant.birthday == undefined || self.carInfoData.applicant.birthday == '') {
            Toast('请选择投保人出生日期');
            return false
          };
          if (self.carInfoData.applicant.gender == undefined || self.carInfoData.applicant.gender == '') {
            Toast('请选择投保人性别');
            return false
          };
          if (self.carInfoData.applicant.phone == undefined || self.carInfoData.applicant.phone == '') {
            Toast('请输入投保人手机号码');
            return false
          };
        } else {
          self.carInfoData.applicant.birthday = "";
          self.carInfoData.applicant.gender = "";
          self.carInfoData.applicant.phone = self.carInfoData.car.owner.phone
        }
      }

      if (self.isInsuredSameOwner == false && self.isInsuredSameApplicant == false) {
        if (self.carInfoData.insured.name == undefined || self.carInfoData.insured.name == '') {
          Toast('请输入被保人姓名');
          return false
        };
        if (self.carInfoData.insured.name.indexOf('*') >= 0) {
          Toast('被保人姓名不允许存在*号，请输入正确的被保人姓名');
          return false;
        };
        if (self.carInfoData.insured.relationType == undefined || self.carInfoData.insured.idType == undefined) {
          Toast('请选择被保人证件类型');
          return false
        };
        if (self.carInfoData.insured.idNo == undefined || self.carInfoData.insured.idNo == '') {
          Toast('请输入被保人证件号');
          return false
        };
        if (self.carInfoData.insured.idNo.indexOf('*') >= 0) {
          Toast('被保人证件号不允许存在*号，请输入正确的被保人证件号');
          return false;
        };
        if (self.carInfoData.insured.relationType == 'Person') {
         
          if (self.carInfoData.insured.idType == "IdCard") {
             var isNext =  this.IsIDCard(self.carInfoData.insured.idNo);
              if( !isNext){
                Toast('请输入有效的被保人证件号');
                return false;
              }
            // Toast('请输入有效的被保人证件号');
            // return false;
          };
          if (self.carInfoData.insured.birthday == undefined || self.carInfoData.insured.birthday == '') {
            Toast('请选择被保人出生日期');
            return false
          };
          if (self.carInfoData.insured.gender == undefined || self.carInfoData.insured.gender == '') {
            Toast('请选择被保人性别');
            return false
          };
          if (self.carInfoData.insured.phone == undefined || self.carInfoData.insured.phone == '') {
            Toast('请输入被保人手机号码');
            return false
          };
        } else {
          self.carInfoData.insured.birthday = "";
          self.carInfoData.insured.gender = "";
          self.carInfoData.insured.phone = self.carInfoData.car.owner.phone
        }
      }
      return true;
    },
  },
};

</script>
<style scoped rel="stylesheet/scss"  lang="scss">


.isSameOwner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
}

.isSameOwner span {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
}

.vehicleInfo {
  background-color: #F9F9F9;
}

.vehicleInfo .quote-row {
  // height: 44px;
  padding: 10px 4%;
  font-size: 12px;
  color: #999;
  line-height: 30px;
}

.vehicleInfo .vehicleInfo #fullPriceModel {
  min-height: 40px;
  line-height: 20px;
  white-space: inherit;
}

.vehicleInfo .plateNo-area .mint-input {
  float: left;
  width: 50%;
  margin-right: 2%;
  margin-top: 4px;
}

.vehicleInfo .plateNo-area .mint-switch {
  float: right;
  width: 100px;
  clear: none;
}

.vehicleInfo .messagecc {
  height: 100%;
  width: 100%;
}

.vehicleInfo .lili {
  bottom: 0;
  top: 200;
}

.picker.picker-items.picker-slot.picker-slot-wrapper.picker-item {
  text-align: center;
}

#dispense {
  .ze-checkbox>input[type=checkbox] {
    position: absolute;
    left: -9999em;
  }

  .ze-checkbox>input[type=checkbox]:checked+.ze-checkbox-icon {
    background-color: currentColor;
    border-color: #ffC400;
  }

  .ze-checkbox-icon {
    border: 1px solid #ccc;
    /*no*/
    border-radius: 2px;
    display: inline-block;
    position: relative;
    z-index: 10;
    vertical-align: bottom;
    pointer-events: none;

    >i {
      content: "";
      position: absolute;
      top: 45%;
      left: 50%;
      border: 3px solid #ffC400;
      /*no*/
      border-top: 0;
      border-left: 0;
      -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(0);
      transform: translate(-50%, -50%) rotate(45deg) scale(0);
    }
  }

  .ze-checkbox>input[type=checkbox]:checked+.ze-checkbox-icon>i {
    -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(1);
    transform: translate(-50%, -50%) rotate(45deg) scale(1);
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }

  background-color: #fff;
  height:385px;

  .content-car-number {
    padding: 56px 0 0;

    .car-content-title {
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      margin-bottom: 15px;

      span {
        font-size: 15px;
      }

      .ze-checkbox {
        display: flex;
        align-items: center;
      }

      .ze-radio-text {
        font-size: 15px;
      }

      .ze-checkbox-icon {
        color: #FFEDB1 !important;
        margin-right: 8px;
      }
    }

    .content-section {
      .content-section-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        margin-bottom: 10px;

        .blank-border {
          height: 44px;
          width: 1px;
          /*no*/
          border-right: 1px solid #ddd;
          /*no*/
          margin-top: 2px;
          float: left;
          margin-left: 0px;
          z-index: 1;

          &.blank-border-first {
            margin-top: 0px;
          }
        }

        &.flex-card {
          color: #000;

          .flex-btn {
            width: 40px;
            height: 48px;
            border: none;
            text-align: center;
            background: #fff;
            font-size: 18px;
            color: #000;
          }

          .flex-btns {
            text-align: center;
            background: #fff;
            width: fit-content;
            position: relative;
            height: 48px;

            button {
              width: 40px;
              height: 48px;
              border: none;
              font-size: 18px;
              color: #000;
              border-radius: 50%;
              background: transparent;
              float: left;
              margin-left: 0px;
              z-index: 2;
              position: relative;

              &:first-child {
                margin-left: 0;
              }
            }
          }

          .flex-mid {
            margin: 0 0.1rem;

            span {
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #ddd;
            }
          }

          .isClick {
            border: 1px solid #f94037;
            /*no*/
            z-index: 50;
            border-radius: 3px;
          }

          .isNumClick {
            border-radius: 8px !important;
            border: 1px solid #f94037 !important;
            /*no*/
            z-index: 10;
            background-color: #fff !important;
          }
        }

        .flex-card-border {
          border: 1px solid #ddd;
          /*no*/
          border-radius: 3px;
        }
      }
    }
  }

  .keyboard {
    width: 100%;
    height: 265px;
    position: fixed;
    bottom: -265px;
    background: #F9F9F9;
    z-index: 10;

    &.animationDown {
      animation: slide_dowms 0.3s ease-out;
      animation-fill-mode: forwards;
    }

    &.animationUp {
      animation: slide_ups 0.3s ease-out;
      animation-fill-mode: forwards;
    }

    .btn-complete {
      height: 42px;
      text-align: right;
      color: #ffc200;
      font-size: 18px;
      width: 100%;
      background: #fff;
      border: none;
      border-top: 1px solid #eee;
      margin-bottom: 15px;

      span {
        margin-right: 30px;
      }
    }

    .keyboard-row {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      padding: 0 8px;
      color: #333;

      &:first-child {
        margin-top: 0;
      }

      .keyboard-row-items {
        display: flex;
        justify-content: left;
      }

      .keyboard-row-bottom {
        display: flex;
        justify-content: space-between;
      }

      .keyboard-row-item {
        width: 45px;
        height: 45px;
        background: #fff;
        font-size: 20px;
        text-align: center;
        border: 1px solid #ccc;
        /*no*/
        border-radius: 8px;
        color: #333;

        &.bottom {
          height: 45px;
          width: 45px;
          line-height: 45px;
          background: #fff;
          color: #333;
          /*margin-right: 0.08rem;*/
        }

        &.clear {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 25px;
          }
        }
      }

      .none-botton {
        border: none;
        height: 80px;
        width: 66px;
        visibility: hidden;
      }
    }

    button {
      &:active {
        background: #f4f4f4 !important;
        color: #999 !important;
      }
    }
  }

  @keyframes slide_ups {
    from {
      bottom: -220px;
    }

    to {
      bottom: 0px;
    }
  }

  @keyframes slide_dowms {
    from {
      bottom: 0px;
    }

    to {
      bottom: -220px;
    }
  }

  button:disabled {
    background: #f4f4f4 !important;
    color: #8f8f8f !important;
  }

  .active {
    &:active {
      background: #f4f4f4 !important;
      color: #999 !important;
    }
  }
}

.btn-fixed {
  // background: #4A66FE;
}

.orgItemBox {
  margin: 10px;
  padding: 15px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  border-radius: 8px;
}

.orgItemBox span {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

.orgItemBox span p:nth-child(1) {
  color: #999;
}

.orgItemBox span p:nth-child(2) {
  color: #333;
}

.searchBtnBox {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 44px;
}

.vant-formItm{
  min-height: 48px;
}


.loadingImg{
      height: 45px;
     width: 45px;
  	-webkit-animation:rotateAni .8s linear infinite;
}

	@-webkit-keyframes rotateAni{
 
		0%{-webkit-transform:rotate(0deg);}
 
		25%{-webkit-transform:rotate(90deg);}
 
		50%{-webkit-transform:rotate(180deg);}
 
		75%{-webkit-transform:rotate(270deg);}
 
		100%{-webkit-transform:rotate(360deg);}
 
	}

</style>
