<template>
  <div class="home" style="background-color:#FFF">
    <mt-header fixed class="def-header cust-head" title="运营管控表">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
      <!-- <mt-button slot="right" @click="exportOut">导出</mt-button> -->
    </mt-header>
    <hr width="100%" color="#f5f5f5" size="1" style="padding-top:48px" />
    
    <div class="controlFrom">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">
               <span  @click="choesOrg">按机构统计</span>  
            </mt-tab-item>
            <mt-tab-item id="2">
               <span  @click="choesSaleman">按续保员统计</span> 
            </mt-tab-item>
        </mt-navbar>
        <div style="display:flex;font-size:12px;">
        <table class="controlFromTable">
           <tr>
              <td colspan="2">机构</td>
              <!-- <td v-for=" (item,index) in orgList" :key="index">{{item.name}}</td>  -->
              <!-- <td>宝昌宝马</td> -->
           </tr>
           <tr>
               <td colspan="2">日期</td>
               <!-- <td>2019-10-22</td> -->
           </tr>
           <tr>
              <td rowspan="8" style="width:30%;">摄像头进店数据（台数）</td> 
           </tr>
           <tr>
            <td style="width:30%;">当日进店</td>
            <!-- <td>{{orgList[0].name}}</td> -->
           </tr>
            <tr>
                <td>查询成功</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>未查询成功</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>到期数量</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>成功报价</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>成功转化</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>手工更新档案</td>
                <!-- <td></td> -->
            </tr>

             <tr>
                <td  rowspan="7">客户跟进情况（台数）</td>
            </tr>
             <tr>
                <td>到期客户</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>未联系客户</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>沟通中</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>无法联系</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>战败</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>成交</td>
                <!-- <td></td> -->
            </tr>

            <tr>
                <td  rowspan="8">新增客户数量（台数）</td>
            </tr>
             <tr>
                <td>新增客户合计</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>导入</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>报价录入</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>摄像头</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>人工录入</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>推修</td>
                <!-- <td></td> -->
            </tr>
            <tr>
                <td>电话呼入</td>
                <!-- <td></td> -->
            </tr>

            <tr>
                <td  rowspan="8">客户档案每日更新数量（台数）</td>
            </tr>
             <tr>
                <td>当日更新合计</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>导入</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>报价录入</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>摄像头</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>人工录入</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>推修</td>
                <!-- <td></td> -->
            </tr>
            <tr>
                <td>电话呼入</td>
                <!-- <td></td> -->
            </tr>

            <tr>
                <td  rowspan="4">机盘数据透视（台数）</td>
            </tr>
             <tr>
                <td>系统总机盘</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>车辆信息及保险信息正确</td>
                <!-- <td></td> -->
            </tr>
            <tr>
                <td>无车辆信息或已脱保</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td  rowspan="4">结果数据（台数）</td>
            </tr>
             <tr>
                <td>报价</td>
                <!-- <td></td> -->
            </tr>
             <tr>
                <td>核保</td>
                <!-- <td></td> -->
            </tr>
            <tr>
                <td>出单</td>
                <!-- <td></td> -->
            </tr>
            <tr></tr> 
        </table>
        <div style="overflow-x: scroll;display: flex;width: 50%;">
        <ul class="orgItem" v-for=" (item,index) in orgListItem" :key="index">
            <li>
               <p>
                    {{item.name}}
                </p>  
            </li>
            <li>
               <p>
                    {{item.date}}
                </p>  
            </li>
             <li>
               <p>
                    {{item.carInCount}}
                </p>  
            </li>
            
        </ul> 
        </div>
            
        </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';
import BScroll from 'better-scroll';
export default {
  name: 'home',
  data() {
    return {
        selected:'1',
        orgList:[],
        salesman:[],
        orgListItem:[]

    }
  },
  created: function() {
   var res = {
    "result":[
        {
            "name":"深圳分公司",
            "orgCode":".1.10.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"惠州分公司",
            "orgCode":".1.38.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"龙华分公司",
            "orgCode":".1.8.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"宝安分公司",
            "orgCode":".1.7.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"13",
            "customerNoContactCount":"13",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"东莞分公司",
            "orgCode":".1.11.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"邦德科技部门业务",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"14",
            "customerNoContactCount":"14",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"1",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"1",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"5",
            "verifiedCount":"0",
            "payCount":"0"
        }
    ],
    "page":null,
    "summaryData":null,
    "errCode":null,
    "errMsg":null,
    "status":200,
    "requestId":"191023032446310-7001c9d8",
    "more":null
};
    this.orgList = res.result;
    this.orgListItem = this.orgList;
    this.salesman = {
    "result":[
        {
            "name":"admin",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"13",
            "customerNoContactCount":"13",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"1",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"1",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"5",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"bandins",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"隔壁老李",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"Bem",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"潘晓枫",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"测试二",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"曾光3161",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"曾光3165",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"135枫",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"甄志丹",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"枫",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        },
        {
            "name":"未分配客户",
            "orgCode":".1.",
            "date":"2019-10-22",
            "carInCount":"0",
            "carInQuerySuc":"0",
            "carInQueryFail":"0",
            "expireCount":"0",
            "carInQuotationCount":"0",
            "carInPolicyCount":"0",
            "modifyCount":"0",
            "customerExpireCount":"0",
            "customerNoContactCount":"0",
            "wB6366708247452487940229":"0",
            "wB6366708256460297760125":"0",
            "wB6366708249164993040212":"0",
            "wB6366708251214985990019":"0",
            "wB6366708246185301270202":"0",
            "wB6366708251982175730110":"0",
            "newCustomerCount":"0",
            "importCustomerCount":"0",
            "quotedCustomerCount":"0",
            "cameraCustomerCount":"0",
            "manualCustomerCount":"0",
            "pushCustomerCount":"0",
            "phoneCustomerCount":"0",
            "updateCustomerCount":"0",
            "importUpdateCustomerCount":"0",
            "quotedUpdateCustomerCount":"0",
            "cameraUpdateCustomerCount":"0",
            "manualUpdateCustomerCount":"0",
            "pushUpdateCustomerCount":"0",
            "phoneUpdateCustomerCount":"0",
            "totalCustomer":"0",
            "validCustomerCount":"0",
            "invalidCustomerCount":"0",
            "quotationCount":"0",
            "verifiedCount":"0",
            "payCount":"0"
        }
    ],
    "page":null,
    "summaryData":null,
    "errCode":null,
    "errMsg":null,
    "status":200,
    "requestId":"191023062923514-1410b473",
    "more":null
}.result;
    // console.log(this.orgList);
  },
  methods: {
    choesOrg(){
        this.orgListItem = this.orgList;
    },
    choesSaleman(){
        this.orgListItem = this.salesman;
    },
   exportOut(){

   },
   openBack(){
       this.$router.back();
   },

  },
  mounted() {
   
  },
}

</script>
<style scoped>
    .controlFromTable{
        width: 50%;
    }
    .controlFromTable td{
        border: 1px solid #eee;
        padding: 5px ;
        text-align: center;
        
    }
    .controlFrom{
        /* padding:5px; */
    }
    .orgItem li{
        /* float: left; */
        min-width:100px;
        /* height:21px; */
        line-height: 18px;
    }
    .orgItem li{
    border: 1px solid #eee;
    padding: 5px;
    text-align: center;
    border-left: 0;
    border-bottom: 0;
    }
</style>
