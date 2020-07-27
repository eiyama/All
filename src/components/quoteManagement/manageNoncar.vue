<template>
  <div>
    <mt-header fixed class="def-header" title="补充非车险">
      <div @click="closeNoncar()" slot="left">
        <img :src="closeImg" style="width: 18px;height: 18px;" />
      </div>
      <div @click="selectedNoncar()" slot="right">
        <p style="font-size:14px;color:#3963f9;">确认</p>
      </div>
    </mt-header>
    <div style="background:#f5f5f5;margin-top:48px">
      <div class="sendRepair_box">
        <div class="insuranceItem">
          <h4 style="font-size: 14px; color: #999;font-weight: normal;line-height:40px;margin-left:10px;">选择要投保非车险种的保险公司</h4>
          <div class="insuranceName" v-if="item.needShow" :class="{active:chooseAfterValue.indexOf(item.name)!=-1}" v-for="(item, index) in InsuranceAllInf" :key="index" @click="selectInsurance(item,index)">
            <img :src=item.imgage style="height:20px;" />
            <p>{{item.name}}</p>
          </div>
        </div>
        <div style="padding:0px 15px">
          <div class="CompaniesTypes" v-show="showCompaniesTypes">
            <div class="CompaniesTypes_title">
              <img :src="InsuranceAllInf[0].imgage" alt style="height:20px;" />
              <p>{{InsuranceAllInf[0].name != undefined ? InsuranceAllInf[0].name : '' }}</p>
            </div>
            <div class="CompaniesTypes_body">
              <van-checkbox checked-color="#5478f6" style="margin:10px" shape="square" icon-size=12 @change="controlProperty" v-model="radio">{{InsuranceTypes}}</van-checkbox>
              <!-- 复选框 -->
              <div v-show="propertyInsurance">
                <!-- <van-checkbox-group @change="selectInsuranceType" class="propertyInsRadio" v-model="result">
                  <van-checkbox icon-size="10px" v-for="item in typeOfpossession" :key="item.code" :name="item.code" shape="square" checked-color="#999" v-model="checkStatus">{{ item.name }}</van-checkbox>
                </van-checkbox-group>-->
                <div style="height: 35px; padding: 10px 5px;">
                  <div class="typeName" :class="{
                  isActive:typeAfterValue.indexOf( item.name )!=-1}" v-for="(item, index) in typeOfpossession" :key="index" @click="selectpossession(item,index)">
                    <p>{{item.name}}</p>
                  </div>
                </div>
                <div class="incroduceTitle">
                  <van-row>
                    <van-col span="11">档次</van-col>
                    <van-col span="5">份数</van-col>
                    <van-col span="5">保费</van-col>
                    <van-col span="2"></van-col>
                  </van-row>
                </div>
                <div class="selectType" v-show="code1">
                  <div class="incroduceBody">
                    <van-row>
                      <van-col span="11">
                        <div @click="InsuranceStatus = true" style="display:flex;padding-right: 10px;">
                          <p v-if="InsuranceValue == ''">选择套餐</p>
                          <p v-else>{{InsuranceValue}}</p>
                          <van-icon name="arrow-down" />
                        </div>
                        <van-popup v-model="InsuranceStatus" position="bottom">
                          <van-picker show-toolbar :columns="InsuranceName" @cancel="InsuranceStatus = false" @confirm="onInsurance" />
                        </van-popup>
                      </van-col>
                      <van-col span="5">
                        <div style="padding: 0px 10px;">
                          <p>{{selNumValue}}</p>
                          <p v-if="selNum.length > '1' " @click="selNumStatus = true">
                            <van-icon name="arrow-down" />
                          </p>
                        </div>
                        <van-popup v-model="selNumStatus" position="bottom">
                          <van-picker show-toolbar :columns="selNum" @cancel="selNumStatus = false" @confirm="onselNum" />
                        </van-popup>
                      </van-col>
                      <van-col span="5">
                        <p>{{insuredPrice}}</p>
                      </van-col>
                      <van-col span="2">
                        <div class="hintMessage" v-show="carInsuranceDetail != ''">
                          <van-icon @click="hintMessageshow = true " name="info-o" />
                        </div>
                        <van-dialog v-model="hintMessageshow" title="单份套餐保险金额及责任" show-cancel-button>
                          <div class="insuranceIntroduce">
                            <table>
                              <tr>
                                <th>险种</th>
                                <th>保险责任</th>
                                <th>保险金额(元)</th>
                              </tr>
                              <tr v-for="item in carInsuranceDetail">
                                <td>{{item.name}}</td>
                                <td>{{item.description}}</td>
                                <td>{{item.insuranceAmount}}</td>
                              </tr>
                            </table>
                          </div>
                        </van-dialog>
                        <!-- <van-popup v-model="show">内容</van-popup> -->
                      </van-col>
                    </van-row>
                  </div>
                </div>
                <div class="selectType" v-show="code2">
                  <div class="incroduceBody">
                    <van-row>
                      <van-col span="11">
                        <div @click="InsuranceCardStatus = true" style="display:flex;padding-right: 10px;">
                          <p v-if="InsuranceCardValue == ''">选择套餐</p>
                          <p v-else>{{InsuranceCardValue}}</p>
                          <van-icon name="arrow-down" />
                        </div>
                        <van-popup v-model="InsuranceCardStatus" position="bottom">
                          <van-picker show-toolbar :columns="InsuranceCard" @cancel="InsuranceCardStatus = false" @confirm="onInsuranceCard" />
                        </van-popup>
                      </van-col>
                      <van-col span="5">
                        <div style="padding: 0px 10px;display: flex; ">
                          <p>{{CardselNumValue}}</p>
                          <p v-if="CardselNum.length > '1' " @click="selNumStatus = true">
                            <van-icon name="arrow-down" />
                          </p>
                        </div>
                        <van-popup v-model="selNumStatus" position="bottom">
                          <van-picker show-toolbar :columns="CardselNum" @cancel="selNumStatus = false" @confirm="onCardselNum" />
                        </van-popup>
                      </van-col>
                      <van-col span="5">
                        <p>{{insuredCardPrice}}</p>
                      </van-col>
                      <van-col span="2">
                        <div class="hintMessage" v-show="cardInsuranceDetail != ''">
                          <van-icon @click="cardMessageshow = true " name="info-o" />
                        </div>
                        <van-dialog v-model="cardMessageshow" title="单份套餐保险金额及责任" show-cancel-button>
                          <div class="insuranceIntroduce">
                            <table>
                              <tr>
                                <th>险种</th>
                                <th>保险责任</th>
                                <th>保险金额(元)</th>
                              </tr>
                              <tr v-for="item in cardInsuranceDetail">
                                <td>{{item.name}}</td>
                                <td>{{item.description}}</td>
                                <td>{{item.insuranceAmount}}</td>
                              </tr>
                            </table>
                          </div>
                        </van-dialog>
                      </van-col>
                    </van-row>
                  </div>
                </div>
                <div class="selectType" v-show="code3">
                  <div class="incroduceBody">
                    <van-row>
                      <van-col span="11">
                        <div @click="InsuranceFamilyStatus = true" style="display:flex;padding-right: 10px;">
                          <p v-if="InsuranceFamilyValue == ''">选择套餐</p>
                          <p v-else>{{InsuranceFamilyValue}}</p>
                          <van-icon name="arrow-down" />
                        </div>
                        <van-popup v-model="InsuranceFamilyStatus" position="bottom">
                          <van-picker show-toolbar :columns="Insurancefamily" @cancel="InsuranceFamilyStatus = false" @confirm="onInsuranceFamily" />
                        </van-popup>
                      </van-col>
                      <van-col span="5">
                        <div style="padding: 0px 10px;display: flex; ">
                          <p>{{FamilyselNumValue}}</p>
                          <p v-if="familyselNum.length > '1' " @click="selNumStatus = true">
                            <van-icon name="arrow-down" />
                          </p>
                        </div>
                        <van-popup v-model="selNumStatus" position="bottom">
                          <van-picker show-toolbar :columns="familyselNum" @cancel="selNumStatus = false" @confirm="onfamilyselNum" />
                        </van-popup>
                      </van-col>
                      <van-col span="5">
                        <p>{{insuredFamilyPrice}}</p>
                      </van-col>
                      <van-col span="2">
                        <div class="hintMessage" v-show="familyInsuranceDetail != ''">
                          <van-icon @click="familyMessageshow = true" name="info-o" />
                        </div>
                        <van-dialog v-model="familyMessageshow" title="单份套餐保险金额及责任" show-cancel-button>
                          <div class="insuranceIntroduce">
                            <table>
                              <tr>
                                <th>险种</th>
                                <th>保险责任</th>
                                <th>保险金额(元)</th>
                              </tr>
                              <tr v-for="item in familyInsuranceDetail">
                                <td>{{item.name}}</td>
                                <td>{{item.description}}</td>
                                <td>{{item.insuranceAmount}}</td>
                              </tr>
                            </table>
                          </div>
                        </van-dialog>
                      </van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 驾意险 -->
          <div class="driveAccident" v-show="showCompaniesTypes">
            <van-checkbox style="margin:0 10px" checked-color="#5478f6" shape="square" icon-size=12 @change="controlDriveAccident" v-model="radio2">{{driveAccident}}</van-checkbox>
            <div v-show="showDriveAccident">
              <!-- <van-checkbox-group @change="selectDriveAccident" class="DriveAccident" v-model="Driveresult">
                <van-checkbox v-for="item in typeOfDrive" :key="item.code" :name="item.code" shape="square" checked-color="#999" v-model="checkStatus" style="margin:5px 0;">{{item.name}}</van-checkbox>
              </van-checkbox-group> -->
              <div style="min-height: 95px; padding: 10px 5px;">
                <div class="typeName" :class="{isActive:typedriveValue.indexOf( item.name )!=-1}" v-for="(item, index) in typeOfDrive" :key="index" @click="selectDriveAccident(item,index)">
                  <p>{{item.name}}</p>
                </div>
              </div>
              <div class="incroduceTitle">
                <van-row>
                  <van-col span="11">档次</van-col>
                  <van-col span="5">份数</van-col>
                  <van-col span="5">保费</van-col>
                  <van-col span="2"></van-col>
                </van-row>
              </div>
              <div class="selectType" v-show="possessionCode1">
                <div class="incroduceBody">
                  <van-row>
                    <van-col span="11">
                      <div @click="everyoneAccidentStatus = true" style="display:flex;padding-right: 10px;">
                        <p v-if="everyoneAccidentValue == ''">选择套餐</p>
                        <p v-else>{{everyoneAccidentValue}}</p>
                        <van-icon name="arrow-down" />
                      </div>
                      <van-popup v-model="everyoneAccidentStatus" position="bottom">
                        <van-picker show-toolbar :columns="everyoneAccidentType" @cancel="everyoneAccidentStatus = false" @confirm="oneveryoneAccident" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <div style="padding: 0px 10px;display: flex; ">
                        <p>{{everyoneselNumValue}}</p>
                        <p v-if="everyoneSelNum.length > '1' " @click="everyoneNumStatus = true">
                          <van-icon name="arrow-down" />
                        </p>
                      </div>
                      <van-popup v-model="everyoneNumStatus" position="bottom">
                        <van-picker show-toolbar :columns="everyoneSelNum" @cancel="everyoneNumStatus = false" @confirm="oneveryoneSelNum" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <p>{{everyonePrice}}</p>
                    </van-col>
                    <van-col span="2">
                      <div class="hintMessage" v-show="everyoneDetail != '' ">
                        <van-icon @click="everyMessageshow = true" name="info-o" />
                      </div>
                      <van-dialog v-model="everyMessageshow" title="单份套餐保险金额及责任" show-cancel-button>
                        <div class="insuranceIntroduce">
                          <table>
                            <tr>
                              <th>险种</th>
                              <th>保险责任</th>
                              <th>保险金额(元)</th>
                            </tr>
                            <tr v-for="item in everyoneDetail">
                              <td>{{item.name}}</td>
                              <td>{{item.description}}</td>
                              <td>{{item.insuranceAmount}}</td>
                            </tr>
                          </table>
                        </div>
                      </van-dialog>
                    </van-col>
                  </van-row>
                </div>
              </div>
              <div class="selectType" v-show="possessionCode2">
                <div class="incroduceBody">
                  <van-row>
                    <van-col span="11">
                      <div @click="driverAccidentStatus = true" style="display:flex;padding-right: 10px;">
                        <p v-if="driverAccidentValue == ''">选择套餐</p>
                        <p v-else>{{driverAccidentValue}}</p>
                        <van-icon name="arrow-down" />
                      </div>
                      <van-popup v-model="driverAccidentStatus" position="bottom">
                        <van-picker show-toolbar :columns="driverAccidentType" @cancel="driverAccidentStatus = false" @confirm="onedriverAccident" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <div style="padding: 0px 10px;display: flex; ">
                        <p>{{driverselNumValue}}</p>
                        <p v-if="driverSelNum.length > '1' " @click="driverNumStatus = true">
                          <van-icon name="arrow-down" />
                        </p>
                      </div>
                      <van-popup v-model="driverNumStatus" position="bottom">
                        <van-picker show-toolbar :columns="driverSelNum" @cancel="driverNumStatus = false" @confirm="ondriverSelNum" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <p>{{driverPrice}}</p>
                    </van-col>
                    <van-col span="2">
                      <div class="hintMessage" v-show="driverDetail != ''">
                        <van-icon @click="derverMessageshow = true" name="info-o" />
                      </div>
                      <van-dialog v-model="derverMessageshow" title="单份套餐保险金额及责任" show-cancel-button>
                        <div class="insuranceIntroduce">
                          <table>
                            <tr>
                              <th>险种</th>
                              <th>保险责任</th>
                              <th>保险金额(元)</th>
                            </tr>
                            <tr v-for="item in driverDetail">
                              <td>{{item.name}}</td>
                              <td>{{item.description}}</td>
                              <td>{{item.insuranceAmount}}</td>
                            </tr>
                          </table>
                        </div>
                      </van-dialog>
                    </van-col>
                  </van-row>
                </div>
              </div>
              <div class="selectType" v-show="possessionCode3">
                <div class="incroduceBody">
                  <van-row>
                    <van-col span="11">
                      <div @click="newAccidentStatus = true" style="display:flex;padding-right: 10px;">
                        <p v-if="newAccidentValue == ''">选择套餐</p>
                        <p v-else>{{newAccidentValue}}</p>
                        <van-icon name="arrow-down" />
                      </div>
                      <van-popup v-model="newAccidentStatus" position="bottom">
                        <van-picker show-toolbar :columns="newAccidentType" @cancel="newAccidentStatus = false" @confirm="onnewAccident" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <div style="padding: 0px 10px;display: flex; ">
                        <p>{{newselNumValue}}</p>
                        <p v-if="newSelNum.length > '1' " @click="newNumStatus = true">
                          <van-icon name="arrow-down" />
                        </p>
                      </div>
                      <van-popup v-model="newNumStatus" position="bottom">
                        <van-picker show-toolbar :columns="newSelNum" @cancel="newNumStatus = false" @confirm="onnewSelNum" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <p>{{newPrice}}</p>
                    </van-col>
                    <van-col span="2">
                      <div class="hintMessage" v-show="newDetail != ''">
                        <van-icon @click="newMessageshow = true" name="info-o" />
                      </div>
                      <van-dialog v-model="newMessageshow" title="单份套餐保险金额及责任" show-cancel-button>
                        <div class="insuranceIntroduce">
                          <table>
                            <tr>
                              <th>险种</th>
                              <th>保险责任</th>
                              <th>保险金额(元)</th>
                            </tr>
                            <tr v-for="item in newDetail">
                              <td>{{item.name}}</td>
                              <td>{{item.description}}</td>
                              <td>{{item.insuranceAmount}}</td>
                            </tr>
                          </table>
                        </div>
                      </van-dialog>
                    </van-col>
                  </van-row>
                </div>
              </div>
              <div class="selectType" v-show="possessionCode4">
                <div class="incroduceBody">
                  <van-row>
                    <van-col span="11">
                      <div @click="renewalAccidentStatus = true" style="display:flex;padding-right: 10px;">
                        <p v-if="renewalAccidentValue == ''">选择套餐</p>
                        <p v-else>{{renewalAccidentValue}}</p>
                        <van-icon name="arrow-down" />
                      </div>
                      <van-popup v-model="renewalAccidentStatus" position="bottom">
                        <van-picker show-toolbar :columns="renewalAccidentType" @cancel="renewalAccidentStatus = false" @confirm="onerenewalAccident" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <div style="padding: 0px 10px;display: flex; ">
                        <p>{{renewalselNumValue}}</p>
                        <p v-if="renewalSelNum.length > '1' " @click="renewalNumStatus = true">
                          <van-icon name="arrow-down" />
                        </p>
                      </div>
                      <van-popup v-model="renewalNumStatus" position="bottom">
                        <van-picker show-toolbar :columns="renewalSelNum" @cancel="renewalNumStatus = false" @confirm="onrenewalSelNum" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <p>{{renewalPrice}}</p>
                    </van-col>
                    <van-col span="2">
                      <div class="hintMessage" v-show="renewalDetail != '' ">
                        <van-icon @click="renewalMessageshow = true" name="info-o" />
                      </div>
                      <van-dialog v-model="renewalMessageshow" title="单份套餐保险金额及责任" show-cancel-button>
                        <div class="insuranceIntroduce">
                          <table>
                            <tr>
                              <th>险种</th>
                              <th>保险责任</th>
                              <th>保险金额(元)</th>
                            </tr>
                            <tr v-for="item in renewalDetail">
                              <td>{{item.name}}</td>
                              <td>{{item.description}}</td>
                              <td>{{item.insuranceAmount}}</td>
                            </tr>
                          </table>
                        </div>
                      </van-dialog>
                    </van-col>
                  </van-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="color: #999999;" v-show="pinganhasData">平安财险：暂无数据，请稍后再试</div>
        <div style="padding:10px 15px">
          <div class="cpicBox" v-if="InsuranceAllInf[1] != ''" v-show="cpicShow">
            <div class="CompaniesTypes_title">
              <img :src="InsuranceAllInf[1].imgage" alt style="height:20px;" />
              <p>{{InsuranceAllInf[1].name != undefined ? InsuranceAllInf[1].name : ''}}</p>
            </div>
            <van-checkbox style="margin:10px;" checked-color="#5478f6" shape="square" icon-size=12 @change="controlcpicAccident" v-model="cpicRadio">{{cpicAccident}}</van-checkbox>
            <div v-show="cpicAccidentShow">
              <van-radio-group v-model="cpicAccidentType" class="cpicAccidentRadio" @change="selectcpicAccident">
                <van-radio style="margin:10px;" checked-color="#5478f6" icon-size="11" v-for="item in typeOfAccident" :key="item.code" :name="item.code">{{item.name}}</van-radio>
              </van-radio-group>
              <div class="incroduceTitle">
                <van-row>
                  <van-col span="11">档次</van-col>
                  <van-col span="5">份数</van-col>
                  <van-col span="5">保费</van-col>
                  <van-col span="2"></van-col>
                </van-row>
              </div>
              <div class="selectType" v-show="cpicAccidentCode1">
                <div class="incroduceBody">
                  <van-row>
                    <van-col span="11">
                      <div @click="cpicAccidentStatus = true" style="display:flex;padding-right: 10px;">
                        <p v-if="cpicAccidentValue == ''">选择套餐</p>
                        <p v-else>{{cpicAccidentValue}}</p>
                        <van-icon name="arrow-down" />
                      </div>
                      <van-popup v-model="cpicAccidentStatus" position="bottom">
                        <van-picker show-toolbar :columns="cpicAccidentName" @cancel="cpicAccidentStatus = false" @confirm="oncpicAccident" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <div style="padding: 0px 10px;display: flex; ">
                        <p>{{cpicselNumValue}}</p>
                        <p v-if="cpicselNum.length > '1' " @click="cpicNumStatus = true">
                          <van-icon name="arrow-down" />
                        </p>
                      </div>
                      <van-popup v-model="cpicNumStatus" position="bottom">
                        <van-picker show-toolbar :columns="cpicselNum" @cancel="cpicNumStatus = false" @confirm="oncpicselNum" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <p>{{cpicAccidentPrice}}</p>
                    </van-col>
                    <van-col span="2">
                      <div class="hintMessage" v-show="cpicguarantees != ''">
                        <van-icon @click.stop="cpicMessageshow = true" name="info-o" />
                      </div>
                      <van-dialog v-model="cpicMessageshow" title="单份套餐保险金额及责任" overlay>
                        <div class="insuranceIntroduce">
                          <table>
                            <tr>
                              <th>险种</th>
                              <!-- <th>保险责任</th> -->
                              <th>保险金额(元)</th>
                            </tr>
                            <tr v-for="item in cpicguarantees">
                              <td>{{item.name}}</td>
                              <td>{{item.insuranceAmount}}</td>
                            </tr>
                          </table>
                        </div>
                      </van-dialog>
                    </van-col>
                  </van-row>
                </div>
              </div>
              <div class="selectType" v-show="cpicAccidentCode2">
                <div class="incroduceBody">
                  <van-row>
                    <van-col span="11">
                      <div @click="cpicRWXStatus = true" style="display:flex;padding-right: 10px;">
                        <p v-if="cpicRWXValue == ''">选择套餐</p>
                        <p v-else>{{cpicRWXValue}}</p>
                        <van-icon name="arrow-down" />
                      </div>
                      <van-popup v-model="cpicRWXStatus" position="bottom">
                        <van-picker show-toolbar :columns="cpicRWXName" @cancel="cpicRWXStatus = false" @confirm="oncpicRWX" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <div style="padding: 0px 10px;display: flex; ">
                        <p>{{cpicRWXselNumValue}}</p>
                        <p v-if="cpicRWXselNum.length > '1' " @click="cpicRWXNumStatus = true">
                          <van-icon name="arrow-down" />
                        </p>
                      </div>
                      <van-popup v-model="cpicRWXNumStatus" position="bottom">
                        <van-picker show-toolbar :columns="cpicRWXselNum" @cancel="cpicRWXNumStatus = false" @confirm="oncpicRWXselNum" />
                      </van-popup>
                    </van-col>
                    <van-col span="5">
                      <p>{{cpicRWXPrice}}</p>
                    </van-col>
                    <van-col span="2">
                      <div class="hintMessage" v-show="cpicRWXguarantees != ''">
                        <van-icon @click.stop="cpicRWXMessageshow = true" name="info-o" />
                      </div>
                      <van-dialog v-model="cpicRWXMessageshow" title="单份套餐保险金额及责任">
                        <div class="insuranceIntroduce">
                          <table>
                            <tr>
                              <th>险种</th>
                              <!-- <th>保险责任</th> -->
                              <th>保险金额(元)</th>
                            </tr>
                            <tr v-for="item in cpicRWXguarantees">
                              <td>{{item.name}}</td>
                              <!-- <td>{{item.description}}</td> -->
                              <td>{{item.insuranceAmount}}</td>
                            </tr>
                          </table>
                        </div>
                      </van-dialog>
                    </van-col>
                  </van-row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="color: #999999;" v-show="cpichasData">太平洋财险：暂无数据,请稍后再试</div>
      </div>
       <van-popup v-model="showLoading" style="background-color:rgba(255, 255, 255, 0)" closeable>
        <div class="loadingBox">
          <img class="loadingImg" src="../../assets/images/icon-loading-circle-white.png" alt="" srcset="">
        </div>
        <span style="color:#FFF;font-size:15px" >请稍后...</span>
      </van-popup>
      <!-- <div class="showLoading" v-show="showLoading"><img class="loadingImg" style="height:48px" src="../../assets/images/loading.png" alt=""></div> -->
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from "./../../common/Axios";
import { Toast, Indicator } from "mint-ui";
import { Collapse, CollapseItem } from "vant";
// import pingan from "../../../static/pingan.json";
// import taibao from "../../../static/taibao.json";
// import pinganDetail from "../../../static/pinganDetail.json";
import { error } from 'util';
export default {
  data() {
    return {
      pinganhasData: false,
      cpichasData: false,
      carAllInsuranceDetail: [],
      cardAllInsuranceDetail: [],
      familyAllInsuranceDetail: [],
      carInsuranceDetail: [],
      cardInsuranceDetail: [],
      familyInsuranceDetail: [],
      allInsuranceDetail: [],
      driverPrice: "",
      driverAccidentStatus: false,
      driverAccidentType: [],
      driverAccidentValue: "",
      driverselNumValue: "1",
      driverNumStatus: false,
      driverSelNum: [],
      showLoading: false,
      newPrice: "",
      newAccidentStatus: false,
      newAccidentType: [],
      newAccidentValue: "",
      newselNumValue: "1",
      newNumStatus: false,
      newSelNum: [],

      renewalPrice: "",
      renewalAccidentStatus: false,
      renewalAccidentType: [],
      renewalAccidentValue: "",
      renewalselNumValue: "1",
      renewalNumStatus: false,
      renewalSelNum: [],

      closeImg: (this.src = require("../../assets/images/ico-close.png")),
      Istrue: true,
      CompaniesValue: "",
      InsuranceAllInf: [{
          name: "平安财险",
          imgage: (this.src = require("../../assets/images/companys/pingan.png")),
          code: "pingan",
          needShow: false,
        },
        {
          name: "太平洋财险",
          imgage: (this.src = require("../../assets/images/companys/cpic.png")),
          code: "cpic",
          needShow: false,
        },
        // {
        //   name: "人保财险",
        //   imgage: (this.src = require("../../assets/images/companys/picc.png")),
        //   code: "picc"
        // }
      ],
      CompaniesStatus: false,
      model: {},
      selNumStatus: false,
      selNumValue: "1",
      CardselNumValue: "1",
      CardselNum: [],
      message: "",
      selNum: ["1"],
      showCompaniesTypes: false,
      radio: "1",
      typeOfpossession: [],
      // result: ["ZS02000001"],
      Driveresult: [],
      InsuranceStatus: false,
      InsuranceValue: "",
      checkStatus: "",
      code1: false,
      code2: false,
      code3: false,
      possessionCode1: false,
      possessionCode2: false,
      possessionCode3: false,
      possessionCode4: false,
      InsuranceTypes: "",
      driveAccident: "",
      InsuranceName: [],
      InsuranceCard: [],
      InsuranceAllName: [],
      saveDate: [],
      personInsurances: [],
      insuredPrice: "",
      activeNames: [""],
      personInsuranceDetail: [],
      propertyInsurance: true,
      InsuranceCardValue: "",
      InsuranceCardStatus: false,
      InsuranceCardNum: [],
      insuredCardPrice: "",
      showDriveAccident: false,
      typeOfDrive: [],
      radio2: "",
      everyoneAccidentValue: "",
      everyoneAccidentStatus: false,
      everyoneAccidentType: [],
      personDriveAccident: [],
      DriveAccidentAllName: [], //驾意险套餐名
      everyonePrice: "",
      chooseAfterValue: [],
      typeAfterValue: [],

      hintMessageshow: false,
      cardMessageshow: false,
      familyMessageshow: false,
      everyMessageshow: false,
      derverMessageshow: false,
      newMessageshow: false,
      cpicMessageshow: false,
      renewalMessageshow: false,
      cpicRWXMessageshow: false,

      InsuranceFamilyValue: "",
      InsuranceFamilyStatus: false,
      Insurancefamily: [],
      insuredFamilyPrice: "",
      familyselNum: [],
      FamilyselNumValue: "1",
      everyoneNumStatus: false,
      everyoneselNumValue: "1",
      everyoneSelNum: [],
      cpicShow: false,
      cpicRadio: "1",
      cpicAccident: "",
      typeOfAccident: [],
      cpicAccidentType: "1",
      cpicAccidentShow: true,
      cpicAccidentAllName: [],
      cpicAccidentCode1: true,
      cpicAccidentCode2: false,
      cpicAccidentName: [],
      cpicAccidentStatus: false,
      cpicAccidentValue: "",
      cpicselNumValue: "1",
      cpicNumStatus: false,
      cpicselNum: [],
      cpicAccidentPer: [], //cpicAccidentpersonInsurances
      cpicAccidentPrice: "",
      cpicRWXStatus: false,
      cpicRWXValue: "",
      cpicRWXName: [],
      cpicRWXselNumValue: "1",
      cpicRWXNumStatus: false,
      cpicRWXselNum: [],
      cpicRWXPrice: "",
      cpicRWXAllName: [],
      cpicRWXValue: "",
      carInfoData: "",
      pinganData: {},
      Allcpicguarantees: [],
      cpicguarantees: [],
      AllcpicRWXguarantees: [],
      cpicRWXguarantees: [],
      insCorpCode: [],
      model: [],
      carAllData: { buyCount: '1' }, //传给报价页面的数据
      cardAllData: { buyCount: '1' },
      familyAllData: { buyCount: '1' },
      everyoneAllData: { buyCount: '1' },
      driverAllData: { buyCount: '1' },
      newAllData: { buyCount: '1' },
      renewalAllData: { buyCount: '1' },
      cpicAllData: { buyCount: '1' },
      cpicRWXAllData: { buyCount: '1' },
      additionals: [],
      savecpicDate: [],
      saveRWXDate: [],
      accidentInsurances: {},
      insCtiyCode: "",
      personDriveAcccident: [],
      driveAllsaveDate: [], //平安意驾险所有数据
      personAllsaveDate: [], //平安财险所有数据
      driverAllInsuranceDetail: [],
      personAllInsuranceDetail: [],
      renewalDetail: [],
      newDetail: [],
      driverDetail: [],
      everyoneDetail: [],
      typedriveValue: [], //pingan 驾意险
      insuranceRes: [],

    };
  },
  created() {
    if (sessionStorage.getItem("insCtiyCode")) {
      this.insCtiyCode = sessionStorage.getItem("insCtiyCode");
    }
    if (sessionStorage.getItem("insuranceNameCode") && sessionStorage.getItem("insuranceNameCode") != undefined) {
      this.insuranceRes = JSON.parse(sessionStorage.getItem("insuranceNameCode"));
      // console.log(this.insuranceRes)
      for (var i = 0; i < this.insuranceRes.length; i++) {
        if (this.insCtiyCode == this.insuranceRes[i].insCityCode) {


          if (this.insuranceRes[i].insCorpCode == 'pingan') {

            var obj = {};
            obj.code = this.insuranceRes[i].insCorpCode;
            obj.name = this.insuranceRes[i].insCorpShortName;
            this.InsuranceAllInf[0] = obj;
            this.InsuranceAllInf[0].needShow = true;
          }
          if (this.insuranceRes[i].insCorpCode == 'cpic') {

            var _obj = {};
            _obj.code = this.insuranceRes[i].insCorpCode;
            _obj.name = this.insuranceRes[i].insCorpShortName;
            this.InsuranceAllInf[1] = _obj;
            this.InsuranceAllInf[1].needShow = true;
          }
          // console.log(12)
          // this.InsuranceAllInf.code = this.insuranceRes[i].insCityCode;
          // this.InsuranceAllInf.name =  this.insuranceRes[i].insCorpShortName;
        }
      }
      // console.log(this.InsuranceAllInf);
      this.InsuranceAllInf.map(item => {
        if (item.code != null && item.code != '') {
          item.imgage = require(`@/assets/images/companys/${item.code}.png`);

        };
      })

    }
    if (sessionStorage.getItem("carInfoData")) {
      this.carInfoData = JSON.parse(sessionStorage.getItem("carInfoData")).car;
    }
  },
  computed: {},
  methods: {
    // 公有方法存储套餐名称和code（财险）
    savePersonInsurance: function(_res, key, typeOfpossession, personInsurances, type, saveDate, _guarantees) {
      // _guarantees = [];
      // type = [];
      // saveDate = [];
      // personInsurances = [];
      // typeOfpossession = [];//置空防止多次点击重复给值；
      for (var i = 0; i < _res.result[key].types.length; i++) {
        var res = _res.result[key].types[i];
        var obj = { name: "", code: "" };
        obj.name = res.name;
        obj.code = res.code;
        typeOfpossession.push(obj);
        personInsurances.push(res.items);
        if (res.items != "") {
          var arr = [""];
          var arr2 = [];
          var arr3 = [];
          for (var j = 0; j < res.items.length; j++) {
            var obj1 = { name: "", code: "" };
            obj1.name = res.items[j].name;
            obj1.code = res.items[j].code;
            arr.push(res.items[j].name);
            arr2.push(obj1);
            arr3.push(res.items[j].guarantees);
          }
          _guarantees.push(arr3);
          type.push(arr); //将套餐类型名称保存为一个对象，即每一次都有一个包含所有套餐的名称对象
          saveDate.push(arr2); //将套餐类型name及code 一起保存到saveDate中，同type原理
        }
      }
    },
    // 公用方法获取保险险种
    getcpicAccidentType: function(name, _type, Insurances) {
      for (var i = 0; i < name.types.length; i++) {
        var res = name.types[i];
        var obj = { name: "", code: "" };
        obj.name = res.name;
        obj.code = res.code;
        _type.push(obj);
        Insurances.push(res.items);
      }
    },
    // 公有方法存储套餐名称
    getpersonInsurance: function(index, name, guarantees, saveDate) {
      var res = name.types[index].items;
      if (res != "") {
        var arr = [""];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < res.length; i++) {
          var obj = { name: "", code: "" };
          obj.name = res[i].name;
          obj.code = res[i].code;
          arr.push(res[i].name);
          arr2.push(obj);
          arr3.push(res[i].guarantees);
        }
        guarantees.push(arr3);

        if (index == 0) {
          this.cpicAccidentName = arr; //将套餐类型名称保存为一个对象，即每一次都有一个包含所有套餐的名称对象
        }
        if (index == 1) {
          this.cpicRWXName = arr;
        }
        saveDate.push(arr2); //将套餐类型name及code 一起保存到saveDate中，同type原理
      }
    },
    //银行卡
    onInsuranceCard: function(value) {
      this.InsuranceCardStatus = false;
      this.InsuranceCardValue = value;
      this.CardselNumValue = '1'
      if (value != '') {
        var obj = this.saveModelCount(
          value,
          1,
          this.personInsurances,
          this.personAllInsuranceDetail,
          this.personAllsaveDate[1]
        );
        this.insuredCardPrice = this.countPrice(obj);
        this.CardselNum = obj.selNum;
        this.cardInsuranceDetail = obj.guarantees;
        // this.cardAllData = obj.model;
        this.copyValue(this.cardAllData, obj.model);
      } else {
        this.insuredCardPrice = '';
        this.CardselNum = [];
        this.cardInsuranceDetail = [];
      }
    },
    // 公用方法计算价格及份数(暂时不用)
    getPriceSelNum: function(value, key, price, selNum, personInsurances) {
      var _value = value;
      if (personInsurances != "") {
        var res = personInsurances[key];
      }
      for (var i = 0; i < res.length; i++) {
        if (_value == res[i].name) {
          price = res[i].premium;
          selNum = res[i].buyCopies;
        }
      }
      return { price, selNum };
    },
    // 非车随车物品
    onInsurance: function(value) {
      this.InsuranceStatus = false;
      this.InsuranceValue = value;
      var key = 0;
      if (value != '') {
        var obj = this.saveModelCount(
          value,
          0,
          this.personInsurances,
          this.personAllInsuranceDetail,
          this.personAllsaveDate[0]
        );
        this.insuredPrice = this.countPrice(obj);
        this.selNum = obj.selNum;
        this.carInsuranceDetail = obj.guarantees;
        // this.carAllData = obj.model;
        this.copyValue(this.carAllData, obj.model);
      } else {
        this.insuredPrice = '';
        this.selNum = [];
        this.carInsuranceDetail = [];
      }


    },
    //平安意驾险全车人弹层确认事件
    oneveryoneAccident: function(value) {
      this.everyoneselNumValue = "1"
      this.everyoneAccidentStatus = false;
      this.everyoneAccidentValue = value;
      if (value != '') {
        var obj = this.saveModelCount(value, 0, this.personDriveAccident, this.driverAllInsuranceDetail, this.driveAllsaveDate[0]);
        this.everyoneSelNum = obj.selNum;
        this.everyonePrice = this.countPrice(obj)
        this.everyoneDetail = obj.guarantees;
        this.copyValue(this.everyoneAllData, obj.model);
      } else {
        this.everyonePrice = '';
        this.everyoneSelNum = [];
        this.everyoneDetail = [];

      }

      // for (var i = 0; i < this.personDriveAccident[0].length; i++) {
      //   if (value == this.personDriveAccident[0][i].name) {
      //     this.everyonePrice = this.personDriveAccident[0][i].premium;
      //     this.everyoneSelNum = this.personDriveAccident[0][i].buyCopies;
      //   }
      // }
    },
    oneveryoneSelNum: function(value) {
      this.everyoneselNumValue = value;
      this.everyoneNumStatus = false;
      this.everyoneAllData.buyCount = value;
      for (var i = 0; i < this.personDriveAccident[0].length; i++) {
        if (this.everyoneAccidentValue == this.personDriveAccident[0][i].name) {
          var Price = this.personDriveAccident[0][i].premium;
          // this.everyonePrice = value * Price;
          if (this.personDriveAccident[0][i].includedPassengerCapacityCalculate) {
            this.everyonePrice = value * Price * this.carInfoData.passengerCapacity;
          } else {
            this.everyonePrice = value * Price;
          }
          this.everyoneAllData.premium = this.everyonePrice;
        }
      }
    },
    countPrice(obj) {
      var price;
      if (obj.includedPas) {
        price = obj.Price * this.carInfoData.passengerCapacity;
      } else {
        price = obj.Price;
      }
      return price;
    },
    // 平安意驾险驾驶人弹层确认事件
    onedriverAccident: function(value) {
      this.driverselNumValue = "1";
      this.driverAccidentStatus = false;
      this.driverAccidentValue = value;
      if (value != '') {
        var obj = this.saveModelCount(value, 1, this.personDriveAccident, this.driverAllInsuranceDetail, this.driveAllsaveDate[1]);
        this.driverSelNum = obj.selNum;
        this.everyoneSelNum = obj.selNum;
        this.driverPrice = this.countPrice(obj)
        this.driverDetail = obj.guarantees;
        this.copyValue(this.driverAllData, obj.model);
      } else {
        this.driverPrice = '';
        this.driverSelNum = [];
        this.driverDetail = [];
      }
    },
    // 平安意驾险驾驶人份数弹层确认事件
    ondriverSelNum: function(value) {
      this.driverAllData.buyCount = value;
      this.driverselNumValue = value;
      this.driverNumStatus = false;
      for (var i = 0; i < this.personDriveAccident[1].length; i++) {
        if (this.driverAccidentValue == this.personDriveAccident[1][i].name) {
          var Price = this.personDriveAccident[1][i].premium;
          if (this.personDriveAccident[1][i].includedPassengerCapacityCalculate) {
            this.driverPrice = value * Price * this.carInfoData.passengerCapacity;
          } else {
            this.driverPrice = value * Price;
          }
          this.driverAllData.premium = this.driverPrice;

        }
      }
    },
    // 平安意驾险创意险弹层确认事件
    onnewAccident: function(value) {
      this.newselNumValue = "1";
      this.newAccidentStatus = false;
      this.newAccidentValue = value;
      if (value != '') {
        var obj = this.saveModelCount(value, 2, this.personDriveAccident, this.driverAllInsuranceDetail, this.driveAllsaveDate[2]);
        this.newSelNum = obj.selNum;
        this.newPrice = this.countPrice(obj);
        this.newDetail = obj.guarantees;
        // this.newAllData = obj.model
        this.copyValue(this.newAllData, obj.model)
      } else {
        this.newPrice = '';
        this.newSelNum = [];
        this.newDetail = [];
      }
      // for (var i = 0; i < this.personDriveAccident[2].length; i++) {
      //   if (value == this.personDriveAccident[2][i].name) {
      //     this.newPrice = this.personDriveAccident[2][i].premium;
      //     this.newSelNum = this.personDriveAccident[2][i].buyCopies;
      //   }
      // }
    },
    // 平安意驾险创意险份数弹层确认事件
    onnewSelNum: function(value) {
      this.newAllData.buyCount = value;
      this.newselNumValue = value;
      this.newNumStatus = false;
      for (var i = 0; i < this.personDriveAccident[2].length; i++) {
        if (this.driverAccidentValue == this.personDriveAccident[2][i].name) {
          var Price = this.personDriveAccident[2][i].premium;
          if (this.personDriveAccident[2][i].includedPassengerCapacityCalculate) {
            this.newPrice = value * Price * this.carInfoData.passengerCapacity;
          } else {
            this.newPrice = value * Price;
          }
          this.newAllData.premium = this.newPrice
        }
      }
    },
    // onrenewalSelNum续保
    onerenewalAccident: function(value) {
      this.renewalselNumValue = "1";
      this.renewalAccidentStatus = false;
      this.renewalAccidentValue = value;
      if (value != '') {
        var obj = this.saveModelCount(value, 3, this.personDriveAccident, this.driverAllInsuranceDetail, this.driveAllsaveDate[3]);
        this.renewalPrice = this.countPrice(obj)
        this.renewalSelNum = obj.selNum;
        this.renewalDetail = obj.guarantees;
        // this.renewalAllData = obj.model;
        this.copyValue(this.renewalAllData, obj.model);
      } else {
        this.renewalPrice = '';
        this.renewalSelNum = [];
        this.renewalDetail = [];
      }
    },
    copyValue: function(renewalAllData, model) {
      renewalAllData.buyCopies = model.buyCopies;
      renewalAllData.code = model.code;
      renewalAllData.discount = model.discount;
      renewalAllData.guarantees = model.guarantees;
      renewalAllData.isIncludedPeoplesCalculate = model.isIncludedPeoplesCalculate;
      renewalAllData.maxAcceptInsureAge = model.maxAcceptInsureAge;
      renewalAllData.name = model.name;
      if (model.includedPassengerCapacityCalculate) {
        renewalAllData.premium = model.premium * this.carInfoData.passengerCapacity;
      } else {
        renewalAllData.premium = model.premium;
      }
      renewalAllData.webDicParams = model.webDicParams;
    },
    // 财险家庭险弹框套餐
    onInsuranceFamily: function(value) {
      this.InsuranceFamilyStatus = false;
      this.InsuranceFamilyValue = value;
      this.FamilyselNumValue = '1';
      if (value != '') {
        var obj = this.saveModelCount(value, 2, this.personInsurances, this.personAllInsuranceDetail, this.personAllsaveDate[2]);
        this.insuredFamilyPrice = this.countPrice(obj);
        this.familyselNum = obj.selNum;
        this.familyInsuranceDetail = obj.guarantees;
        // this.familyAllData = obj.model;
        this.copyValue(this.familyAllData, obj.model);
      } else {
        this.insuredFamilyPrice = '';
        this.familyselNum = [];
        this.familyInsuranceDetail = [];
      }
    },

    // 财险家庭险弹框数量
    onfamilyselNum: function(value) {
      this.familyAllData.buyCount = value;
      this.selNumStatus = false;
      this.FamilyselNumValue = value;

      for (var i = 0; i < this.personInsurances[2].length; i++) {
        if (this.InsuranceCardValue == this.personInsurances[2][i].name) {
          var Price = this.personInsurances[2][i].premium;
          if (this.personInsurances[2][i].includedPassengerCapacityCalculate) {
            this.insuredFamilyPrice = value * Price * this.carInfoData.passengerCapacity;
          } else {
            this.insuredFamilyPrice = value * Price;
          }
          this.familyAllData.premium = this.insuredFamilyPrice
        }
      }
    },
    // 平安意驾险xubaofenshu弹层确认事件
    onrenewalSelNum: function(value) {
      this.renewalAllData.buyCount = value;
      this.renewalselNumValue = value;

      this.renewalNumStatus = false;
      for (var i = 0; i < this.personDriveAccident[3].length; i++) {
        if (this.driverAccidentValue == this.personDriveAccident[3][i].name) {
          var Price = this.personDriveAccident[3][i].premium;
          if (this.personDriveAccident[3][i].includedPassengerCapacityCalculate) {
            this.renewalPrice = value * Price * this.carInfoData.passengerCapacity;
          } else {
            this.renewalPrice = value * Price;
          }
          this.renewalAllData.premium = this.renewalAllData
        }
      }
    },
    controlProperty: function(value) {
      if (value == "") {
        this.propertyInsurance = false;
      } else {
        this.propertyInsurance = true;
      }
    },
    controlcpicAccident: function(value) {
      if (value == "") {
        this.cpicAccidentShow = false;
      } else {
        this.cpicAccidentShow = true;
      }
    },
    // 保险公司选择（顶部选中状态控制）
    selectInsurance: function(item, index) {
      // this.getAPI(item.code);
      if (this.chooseAfterValue.indexOf(item.name) != -1) {
        this.chooseAfterValue.splice(this.chooseAfterValue.indexOf(item.name), 1);
        if (index == 0) {
          this.showCompaniesTypes = false;
          this.insCorpCode.splice(this.insCorpCode.indexOf(item.code), 1);
          this.removePinganData();
        }
        if (index == 1) {
          this.cpicShow = false;
          this.insCorpCode.splice(this.insCorpCode.indexOf(item.code), 1);
          this.removecpicData();
        }
      } else {
        this.chooseAfterValue.push(item.name);
        var self = this;
        if (item.code == 'pingan') {
          this.insCorpCode.push(item.code);
          this.showLoading = true;
          axiosGetAPI(
            "/vi/insurePolicies/" +
            item.code +
            "/AccidentInsurances?insCtiyCode=" +
            this.insCtiyCode +
            "&insCityCode=" + 
            this.insCtiyCode +
            "&vin=" +
            this.carInfoData.vin +
            "&model=" +
            this.carInfoData.model +
            "&passengerCapacity=" +
            this.carInfoData.passengerCapacity +
            "&makerModel=" +
            this.carInfoData.makerModel
          ).then(res => {
            this.showLoading = false;
            if (res.result.length > 0) {
              this.pinganhasData = false;
              this.showCompaniesTypes = true;
              this.InsuranceTypes = res.result[0].name;
              this.driveAccident = res.result[1].name;
              for (var key = 0; key < res.result.length; key++) {
                if (key == 0) {
                  this.savePersonInsurance(
                    res,
                    key,
                    this.typeOfpossession,
                    this.personInsurances,
                    this.InsuranceAllName,
                    this.personAllsaveDate,
                    this.personAllInsuranceDetail,
                  );
                }
                if (key == 1) {
                  this.savePersonInsurance(
                    res,
                    key,
                    this.typeOfDrive,
                    this.personDriveAccident,
                    this.DriveAccidentAllName,
                    this.driveAllsaveDate,
                    this.driverAllInsuranceDetail
                  );
                  //  this.cardInsuranceDetail = this.allInsuranceDetail[key];
                }
              }
              if (this.InsuranceAllName != "") {
                //将每个保险类型的套餐分离出来
                this.InsuranceName = this.InsuranceAllName[0];
                this.InsuranceCard = this.InsuranceAllName[1];
                this.Insurancefamily = this.InsuranceAllName[2];
              }
              if (this.DriveAccidentAllName != "") {
                this.everyoneAccidentType = this.DriveAccidentAllName[0];
                this.driverAccidentType = this.DriveAccidentAllName[1];
                this.newAccidentType = this.DriveAccidentAllName[2];
                this.renewalAccidentType = this.DriveAccidentAllName[3];
              }
            } else {
              this.pinganhasData = true;
            }
          }).catch(function(error) {
            self.showLoading = false;
            console.log(error)
          });
        }
        if (item.code == 'cpic') {

          this.showLoading = true;
          this.insCorpCode.push(item.code);
          // if (this.cpicAccident == "") {
          axiosGetAPI(
            "/vi/insurePolicies/" +
            item.code +
            "/AccidentInsurances?insCtiyCode=" +
            this.insCtiyCode +
            "&insCityCode=" + 
            this.insCtiyCode +
            "&vin=" +
            this.carInfoData.vin +
            "&model=" +
            this.carInfoData.model +
            "&passengerCapacity=" +
            this.carInfoData.passengerCapacity +
            "&makerModel=" +
            this.carInfoData.makerModel
          ).then(res => {
            this.showLoading = false;
            if (res.result.length > 0) {
              this.cpichasData = false;
              this.cpicShow = true;
              this.pinganData = res.result[0];
              this.cpicAccident = res.result[0].name;
              this.accidentInsurances.categoryName = this.cpicAccident;
              this.getcpicAccidentType(
                res.result[0],
                this.typeOfAccident,
                this.cpicAccidentPer
              );
              this.getpersonInsurance(
                "0",
                res.result[0],
                this.Allcpicguarantees,
                this.savecpicDate
              );
              this.getpersonInsurance(
                "1",
                res.result[0],
                this.AllcpicRWXguarantees,
                this.saveRWXDate
              );
              this.accidentInsurances.typeName = this.typeOfAccident[0].name;
              this.accidentInsurances.typeCode = this.typeOfAccident[0].code;
            } else {
              this.cpichasData = true;
            }
          }).catch(function(error) {
            self.showLoading = false;
            console.log(error)
          });
        }
      }
    },
    // 清空数据
    removePinganData() {
      this.typeOfpossession = [];
      this.personInsurances = [];
      this.InsuranceAllName = [];
      this.personAllsaveDate = [];
      this.personAllInsuranceDetail = [];
      this.typeOfDrive = [];
      this.personDriveAccident = [];
      this.DriveAccidentAllName = [];
      this.driveAllsaveDate = [];
      this.driverAllInsuranceDetail = [];

      this.InsuranceName = [];
      this.InsuranceCard = [];
      this.Insurancefamily = [];

      this.everyoneAccidentType = [];
      this.driverAccidentType = [];
      this.newAccidentType = [];
      this.renewalAccidentType = [];

      this.radio2 = false;
      this.typedriveValue = [];

      this.InsuranceValue = '';
      this.InsuranceCardValue = '';
      this.InsuranceFamilyValue = '';
      this.driverAccidentValue = '';
      this.everyoneAccidentValue = '';
      this.newAccidentValue = '';
      this.renewalAccidentValue = '';

      this.insuredFamilyPrice = '';
      this.insuredCardPrice = '';
      this.insuredPrice = '';
      this.driverPrice = '';
      this.everyonePrice = '';
      this.newPrice = '';
      this.renewalPrice = '';

      this.selNum = [];
      this.CardselNum = [];
      this.familyselNum = [];
      this.everyoneSelNum = [];
      this.driverSelNum = [];
      this.newSelNum = [];
      this.renewalSelNum = [];

      this.carInsuranceDetail = [];
      this.cardInsuranceDetail = [];
      this.familyInsuranceDetail = [];
      this.everyoneDetail = [];
      this.driverDetail = [];
      this.newDetail = [];
      this.renewalDetail = [];

      this.typeAfterValue = []; //pingan财险分类（随车物品等）
      this.typeOfDrive = [];
      this.Driveresult = [];

      this.code1 = false;
      this.code2 = false;
      this.code3 = false;
      this.possessionCode1 = false;
      this.possessionCode2 = false;
      this.possessionCode3 = false;
      this.possessionCode1 = false;

      this.carAllData = { buyCount: '1' }; //传给报价页面的数据
      this.cardAllData = { buyCount: '1' };
      this.familyAllData = { buyCount: '1' };
      this.everyoneAllData = { buyCount: '1' };
      this.driverAllData = { buyCount: '1' };
      this.newAllData = { buyCount: '1' };
      this.renewalAllData = { buyCount: '1' };


      this.pinganhasData = false;
    },

    removecpicData() {

      // this.cpicselNumValue = '1';
      this.cpicselNum = [];
      this.cpicguarantees = [];
      this.cpicAccidentName = [];
      this.cpicAccidentValue = '';
      this.cpicAccidentPrice = '';
      this.typeOfAccident = [];

      this.cpicRWXValue = '';
      // this.cpicRWXselNumValue = '1';
      this.cpicRWXPrice = '';
      this.cpicRWXselNum = [];
      this.cpicRWXguarantees = [];
      this.cpicRWXName = [];

      this.accidentInsurances = { buyCount: '1' }

      this.cpichasData = false;

    },
    // 套餐（档次）选择
    selectpossession: function(item, index) {
      if (this.typeAfterValue.indexOf(item.name) != -1) {
        this.typeAfterValue.splice(this.typeAfterValue.indexOf(item.name), 1);
        if (index == '0') {
          this.code1 = false;
          this.InsuranceValue = '';
          this.insuredPrice = '';
          this.carInsuranceDetail = [];
          this.selNumValue = '1';
          this.selNum = [];
          this.carAllData = { buyCount: '1' }; //传给报价页面的数据


        }
        if (index == '1') {
          this.code2 = false;
          this.InsuranceCardValue = '';
          this.insuredCardPrice = '';
          this.cardInsuranceDetail = [];
          this.CardselNumValue = '1';
          this.CardselNum = [];
          this.cardAllData = { buyCount: '1' };


        }
        if (index == '2') {
          this.code3 = false;
          this.InsuranceFamilyValue = '';
          this.insuredFamilyPrice = '';
          this.familyInsuranceDetail = [];
          this.FamilyselNumValue = '1';
          this.FamilyselNum = [];
          this.familyAllData = { buyCount: '1' };
        }
      } else {
        this.typeAfterValue.push(item.name);
        if (index == '0') {
          this.carAllData.typeCode = item.code;
          this.carAllData.typeName = item.name;
          this.carAllData.categoryName = this.InsuranceTypes;
          this.code1 = true;
        }
        if (index == '1') {
          this.code2 = true;
          this.cardAllData.typeCode = item.code;
          this.cardAllData.typeName = item.name;
          this.cardAllData.categoryName = this.InsuranceTypes;
        }
        if (index == '2') {
          this.code3 = true;
          this.familyAllData.typeCode = item.code;
          this.familyAllData.typeName = item.name;
          this.familyAllData.categoryName = this.InsuranceTypes;
        }
      }
    },

    // 公有方法，点击弹层确认事件
    onconfirm: function(value, status, Isvalue, dataPrice, dataSelNum, index) {
      status = false;
      Isvalue = value;
      // this.getPriceSelNum(value,1,this.insuredCardPrice,this.InsuranceCard);
      for (var i = 0; i < this.personInsurances[index].length; i++) {
        if (value == this.personInsurances[index][i].name) {
          var price = this.personInsurances[index][i].premium;
          dataPrice = this.CardselNumValue * price;
          dataSelNum = this.personInsurances[index][i].buyCopies;
        }
      }
      // this.countPriceSelNum(value,this.personInsurances[1],this.insuredCardPrice,this.CardselNum);
    },


    // 非车险种类（复选框和对应显示item）
    selectInsuranceType: function(value) {
      this.code1 = false;
      this.code2 = false;
      this.code3 = false;
      for (var i = 0; i < value.length; i++) {
        if (value[i] == "ZS02000001") {
          this.code1 = true;
        }
        if (value[i] == "ZS02000002") {
          this.code2 = true;
        }
        if (value[i] == "ZS02000003") {
          this.code3 = true;
        }
      }
    },
    // 份数确认
    onselNum: function(value) {
      this.carAllData.buyCount = value;
      this.selNumStatus = false;
      this.selNumValue = value;
      for (var i = 0; i < this.personDriveAcccident[0].length; i++) {
        if (this.InsuranceCardValue == this.personInsurances[0][i].name) {
          var Price = this.personInsurances[0][i].premium;
          if (this.personInsurances[0][i].includedPassengerCapacityCalculate) {
            this.insuredPrice = value * Price * this.carInfoData.passengerCapacity;
          } else {
            this.insuredPrice = value * Price;
          }
          this.carAllData.premium = this.insuredPrice
        }
      }
    },

    // 非车险银行卡盗刷计算总金额事件
    onCardselNum: function(value) {
      this.cardAllData.buyCount = value;
      this.selNumStatus = false;
      this.CardselNumValue = value;
      for (var i = 0; i < this.personInsurances[1].length; i++) {
        if (this.InsuranceCardValue == this.personInsurances[1][i].name) {
          var Price = this.personInsurances[1][i].premium;
          if (this.personInsurances[1][i].includedPassengerCapacityCalculate) {
            this.insuredCardPrice = value * Price * this.carInfoData.passengerCapacity;
          } else {
            this.insuredCardPrice = value * Price;
          }
          this.cardAllData.premium = this.insuredCardPrice
        }
      }

    },
    // 控制驾意险的种类事件（即每个复选框对应的页面）
    selectDriveAccident: function(item, index) {
      if (this.typedriveValue.indexOf(item.name) != -1) {
        this.typedriveValue.splice(this.typedriveValue.indexOf(item.name), 1);
        if (index == '0') {
          this.possessionCode1 = false;
          this.everyoneAccidentValue = '';
          this.everyonePrice = '';
          this.everyoneselNumValue = '1';
          this.everyoneDetail = [];
          this.everyoneSelNum = [];
          this.everyoneAllData = { buyCount: '1' }; //传给报价页面的数据


        }
        if (index == '1') {
          this.possessionCode2 = false;
          this.driverAccidentValue = '';
          this.driverPrice = '';
          this.driverselNumValue = '1';
          this.driverSelNum = [];
          this.driverDetail = [];
          this.driverAllData = { buyCount: '1' };

        }
        if (index == '2') {
          this.possessionCode3 = false;
          this.newAccidentValue = '';
          this.newPrice = '';
          this.newselNumValue = '1';
          this.newSelNum = [];
          this.newAllData = { buyCount: '1' };
          this.newDetail = [];
        }
        if (index == '3') {
          this.possessionCode4 = false;
          this.renewalAccidentValue = '';
          this.renewalPrice = '';
          this.renewalselNumValue = '1';
          this.renewalSelNum = [];
          this.renewalAllData = { buyCount: '1' };
          this.renewalDetail = [];
        }
      } else {
        this.typedriveValue.push(item.name);
        if (index == '0') {
          this.everyoneAllData.typeCode = item.code;
          this.everyoneAllData.categoryName = this.driveAccident;
          this.everyoneAllData.typeName = item.name;
          this.possessionCode1 = true;
        }
        if (index == '1') {
          this.possessionCode2 = true;
          this.driverAllData.typeCode = item.code;
          this.driverAllData.typeName = item.name;
          this.driverAllData.categoryName = this.driveAccident;
        }
        if (index == '2') {
          this.possessionCode3 = true;
          this.newAllData.typeCode = item.code;
          this.newAllData.typeName = item.name;
          this.newAllData.categoryName = this.driveAccident;
        }
        if (index == '3') {
          this.possessionCode4 = true;
          this.renewalAllData.typeCode = item.code;
          this.renewalAllData.typeName = item.name;
          this.renewalAllData.categoryName = this.driveAccident;
        }
      }
    },
    // 控制驾意险显示事件
    controlDriveAccident: function(value) {
      if (value == "") {
        this.showDriveAccident = false;
      } else {
        this.showDriveAccident = true;
      }
    },

    selectcpicAccident: function(value) {
      this.accidentInsurances = { buyCount: "1" };
      this.cpicAccidentCode1 = false;
      this.cpicAccidentCode2 = false;
      if (value == "1") {
        this.cpicAccidentCode1 = true;
        this.accidentInsurances.typeName = this.typeOfAccident[0].name;
        this.accidentInsurances.typeCode = this.typeOfAccident[0].code;
      }
      if (value == "2") {
        this.cpicAccidentCode2 = true;
        this.accidentInsurances.typeName = this.typeOfAccident[1].name;
        this.accidentInsurances.typeCode = this.typeOfAccident[1].code;
      }
    },
    saveModelCount: function(value, index, cpicAccidentPer, Allguarantees, saveDate) {
      //保存accidentInsurances和计算价格份数等
      var guarantees, Price, selNum, includedPas;
      for (var i = 0; i < cpicAccidentPer[index].length; i++) {
        if (value == cpicAccidentPer[index][i].name) {
          Price = cpicAccidentPer[index][i].premium;
          selNum = cpicAccidentPer[index][i].buyCopies;
          guarantees = cpicAccidentPer[index][i].guarantees;
          // this.accidentInsurances.code = saveDate[i].code;
          // this.accidentInsurances.name = saveDate[i].name;
          includedPas = cpicAccidentPer[index][i].includedPassengerCapacityCalculate
          var model = cpicAccidentPer[index][i];
          return { guarantees, Price, selNum, model, includedPas };
        }
      }
    },
    oncpicAccident: function(value) {
      this.cpicselNumValue = '1';
      this.cpicAccidentStatus = false;
      this.cpicAccidentValue = value;
      if (value != '') {
        var obj = this.saveModelCount(
          value,
          0,
          this.cpicAccidentPer,
          this.Allcpicguarantees,
          this.savecpicDate
        );
        this.cpicAccidentPrice = this.countPrice(obj);

        this.cpicselNum = obj.selNum;
        this.cpicguarantees = obj.guarantees;
        // this.accidentInsurances = obj.model;
        this.copyValue(this.accidentInsurances, obj.model);
      } else {
        this.cpicAccidentPrice = '';
        this.cpicselNum = [];
        this.cpicguarantees = [];
      }

    },
    oncpicRWX: function(value) {

      this.cpicRWXStatus = false;
      this.cpicRWXValue = value;
      if (value != '') {
        var obj = this.saveModelCount(
          value,
          1,
          this.cpicAccidentPer,
          this.AllcpicRWXguarantees,
          this.saveRWXDate
        );
        this.cpicRWXPrice = this.countPrice(obj);
        this.cpicRWXselNum = obj.selNum;
        this.cpicRWXguarantees = obj.guarantees;
        // this.accidentInsurances = obj.model;
        this.copyValue(this.accidentInsurances, obj.model);
      } else {
        this.cpicRWXPrice = '';
        this.cpicRWXselNum = [];
        this.cpicRWXguarantees = [];
      }
    },
    oncpicRWXselNum: function(value) {
      this.accidentInsurances.buyCount = value;
      this.cpicRWXselNumValue = value;
      this.cpicRWXPrice = value * this.cpicRWXPrice;
      //  for (var i = 0; i < this.personInsurances[1].length; i++) {
      //   if (this.InsuranceCardValue == this.personInsurances[1][i].name) {
      //     var price = this.personInsurances[1][i].premium;
      //       if(this.personInsurances[1][i].includedPassengerCapacityCalculate){
      //       this.insuredCardPrice = value * Price * this.carInfoData.passengerCapacity;
      //     }
      //     else{
      //       this.insuredCardPrice = value * Price;
      //     }
      //     this.cardAllData.premium = this.newPrice
      //   }
      // }
    },
    oncpicselNum: function(value) {
      this.accidentInsurances.buyCount = value;
      this.cpicselNumValue = value;
      this.cpicAccidentPrice = value * this.cpicAccidentPrice;
      //    for (var i = 0; i < this.personInsurances[1].length; i++) {
      //   if (this.InsuranceCardValue == this.personInsurances[1][i].name) {
      //     var price = this.personInsurances[1][i].premium;
      //     this.insuredCardPrice = value * price;
      //   }
      // }
    },
    selectedNoncar: function() {
      this.additionals = [];

      var additionals = { accidentInsurances: [], insCorpCode: '' },
        additionals2 = { accidentInsurances: [], insCorpCode: '' };

      for (var i = 0; i < this.insCorpCode.length; i++) {
        if (this.insCorpCode[i] == 'pingan') {

          if (this.code1 && this.carAllData.code != undefined) {
            additionals.accidentInsurances.push(this.carAllData);
          }
          if (this.code2 && this.cardAllData.code != undefined) {
            additionals.accidentInsurances.push(this.cardAllData);
          }
          if (this.code3 && this.familyAllData.code != undefined) {
            additionals.accidentInsurances.push(this.familyAllData);
          }
          if (this.radio2) {
            if (this.possessionCode1 && this.everyoneAllData.code != undefined) {
              additionals.accidentInsurances.push(this.everyoneAllData);
            }
            if (this.possessionCode2 && this.driverAllData.code != undefined) {
              additionals.accidentInsurances.push(this.driverAllData);
            }
            if (this.possessionCode3 && this.newAllData.code != undefined) {
              additionals.accidentInsurances.push(this.newAllData);
            }
            if (this.possessionCode4 && this.renewalAllData.code != undefined) {
              additionals.accidentInsurances.push(this.renewalAllData);
            }
          }
          if (additionals.accidentInsurances != '') {
            additionals.insCorpCode = this.insCorpCode[i];
            this.additionals.push(additionals);
          }

        }
        if (this.insCorpCode[i] == 'cpic') {
          if (this.accidentInsurances.code != undefined) {

            additionals2.accidentInsurances.push(this.accidentInsurances);
            if (additionals2.accidentInsurances != '') {
              additionals2.insCorpCode = this.insCorpCode[i];
              this.additionals.push(additionals2);
            }

          }
        }
      }
      // console.log(this.additionals);
      // console.log(this.additionals)
      //  this.accidentInsurances = {};
      //  this.insCorpCode = [];
      //  this.carAllData.buyCount = '1'; //传给报价页面的数据
      //  this.cardAllData.buyCount = '1';
      //  this.familyAllData.buyCount = '1';
      //  this.everyoneAllData.buyCount = '1';
      //  this.driverAllData.buyCount = '1';
      //  this.newAllData.buyCount = '1';
      //  this.renewalAllData.buyCount = '1';

      // this.removePinganData();
      // this.removecpicData();
      // this.chooseAfterValue = [];
      // this.showCompaniesTypes = false;
      // this.cpicShow = false;
      this.$emit("selectedNoncar", this.additionals);
      this.$emit("closeNoncar");
      // this.typedriveValue = [];
      // this.radio2 = false;
    },
    closeNoncar: function() {
      // this.additionals = [];
      // this.accidentInsurances = {};
      // this.insCorpCode = [];
      // this.carAllData.buyCount = '1'; //传给报价页面的数据
      // this.cardAllData.buyCount = '1';
      // this.familyAllData.buyCount = '1';
      // this.everyoneAllData.buyCount = '1';
      // this.driverAllData.buyCount = '1';
      // this.newAllData.buyCount = '1';
      // this.renewalAllData.buyCount = '1';

      this.showLoading = false;
      this.$emit("closeNoncar");
      // this.removePinganData();
      // this.removecpicData();
      // this.chooseAfterValue = [];
      // this.showCompaniesTypes = false;
      // this.cpicShow = false;
    },

  }
};

</script>
<style scoped>
.sendRepair_box {
  margin: 0px 10px;
  height: 100%;
}

.CompaniesTypes {
  margin: 10px 0;
  background: #fff;
  padding: 15px 0px;
  border-radius: 5px 5px 0 0;
}

.CompaniesTypes_title {
  font-size: 14px;
  color: #333;
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
  margin: 10px;
}

/* .CompaniesTypes_body {
  min-height: 120px;
  margin: 0 10px;
} */

.propertyInsRadio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40px;
  margin-top: 10px;
}

.btn_search {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn_search p {
  width: 100%;
  background: #0079fe;
  font-size: 14px;
  color: #ffffff;
  margin: 0 20px;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  height: 40px;
}

.DriveAccident {
  margin: 10px 20px;
}

.insuranceItem {
  background: #fff;
  min-height: 90px;
  padding: 1px;
}

.insuranceName {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  padding: 5px 10px;
  float: left;
  border-radius: 5px;
  margin-left: 10px;
}

.typeName {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  padding: 5px 15px;
  float: left;
  border-radius: 5px;
  /* margin-left: 10px; */
  margin: 5px;
}

.active {
  border: 1px solid #5478f6;
}

.isActive {
  background: #5478f6;
  color: #fff;
}

.incroduceTitle {
  margin: 10px 0;
  padding: 5px 10px;
  background: #f9f9f9;
}

.incroduceBody {
  margin: 10px 0;
  padding: 5px 0;
}

.driveAccident {
  min-height: 30px;
  margin: 10px 0;
  background: #fff;
  padding: 15px 0px;
  border-radius: 0 0 5px 5px;
}

.cpicBox {
  min-height: 100px;
  margin: 10px 0;
  background: #fff;
  padding: 15px 0px;
  border-radius: 5px;
}

.cpicAccidentRadio {
  display: flex;
  align-items: center;
  margin: 10px;
}

.insuranceIntroduce table {
  width: 100%;
  font-size: 12px;
  color: #333;
  text-align: center;
}

.insuranceIntroduce table tr:nth-child(1) {
  background: #f2f2f2;
  /* padding: 20px; */
  height: 40px;
  font-size: 12px;
  color: #333;
}

.insuranceIntroduce table tr {
  height: 40px;
  font-size: 12px;
  color: #333;
  height: 30px;
}

.popupBox {
  width: 90%;
  border-radius: 5px;
  padding: 10px;
}

.selectType {
  padding: 0px 10px;
}

.showLoading {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .4);
  display: flex;
  align-items: center;
  justify-content: center;
  /* opacity: 0.8; */
}

</style>
