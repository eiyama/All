<template>
  <div class="home" :style="isHeight">
    <mt-header fixed class="def-header cust-head" title="业务员认证">
      <div slot="left" @click="openBack">
        <van-icon name="arrow-left" size="20px" />
        <!-- <img :src="closeImg" style="width: 18px;height: 18px;" > -->
      </div>
    </mt-header>
    <div class="main_header" :style="{'background':authStatus == 'PassAuth' ? 'rgba(239, 255, 250, 1)' : 'rgba(238, 246, 255, 1)'}">
        <div class="header_left" :style="{'background':authStatus == 'PassAuth' ? 'rgba(0, 196, 137, 1)' : 'rgba(0, 121, 254, 1)'}">
            <img :src="verified" alt="">
        </div>
        <div class="header_right">
            <p v-show="authStatus == 'PassAuth'" style="color:#00c489">已认证</p>
            <p v-show="authStatus == 'UnAuth'">业务员未认证</p>
            <p v-show="authStatus == 'Pending'">认证中...</p>
        </div>
    </div>
    <!-- <div class="main" v-show="showCertificaitonBody"> -->
      <div class="main" >
        <div class="Certification">
            <div class="CertificationTitle">
                  <span class="title">1</span>
                  <p>实名认证</p>
            </div>
            <div class="CertificationImg">
                <img v-if="certificationRes.certificationStatus != 'Passed' " :src="certificationImg" alt="">
                <img v-if="certificationRes.certificationStatus == 'Passed' " :src="certificationImgV" alt="">
                <p v-show="certificationRes.certificationStatus != 'Passed' ">未认证</p>
                <p v-show="certificationRes.certificationStatus == 'Passed' ">已认证</p>
            </div>
            <p style="margin-top:15px" v-show="certificationRes.certificationStatus != 'Passed' ">您还未进行实名认证，点击下方按钮开始认证</p>
            <p class="certificationBtn" @click="toZxcertification" v-show="certificationRes.certificationStatus != 'Passed' ">
              去认证
            </p>
            <ul class="certifitionInfor" v-if="certificationRes.certificationStatus == 'Passed' ">
              <li>姓&nbsp;&nbsp;名：{{certificationRes.name}}</li>
              <li>身份证号：{{certificationRes.idNo.replace(/(\d{5})\d{6}(\d{6})/, "$1******$2")}}</li>
              <li>银行卡号：{{certificationRes.bankCardNo.replace(/^(\d{4})\d+(\d{4})$/, "$1******$2")}}</li>
            </ul>
            <p class="certificationLine"></p>

        </div>

        <div class="Certification"  :style="{'opacity':certificationRes.certificationStatus != 'Passed' ? '0.6' : '1'}">
             <div class="CertificationTitle">
                  <span class="title">2</span>
                  <p>电子签名</p>
            </div>
            <div class="CertificationImg">
                <img :src="EsignatureImg" alt="">
                <p style="  margin-top: -5px;    margin-bottom: 15px; margin-left: -14px;" v-show="certificationRes.contractSignStatus != 'Passed'">待签名</p>
                <p style="  margin-top: -5px;    margin-bottom: 15px; margin-left: -14px;" v-show="certificationRes.contractSignStatus == 'Passed'">已签名</p>
            </div>
            <p  v-show=" certificationRes.contractSignStatus != 'Passed'" >实名认证通过后再进行电子签名</p>
            <p  class="certificationBtn" @click="toSignContract" v-show="certificationRes.certificationStatus == 'Passed' && certificationRes.contractSignStatus != 'Passed'">
              去签名
            </p>
            <a style=" color: #0079fe;font-size: 12px;" :href="signcontractFileUrl" v-show="signcontractFileUrl">点击查看或下载电子合同</a>
            <p class="certificationLine"></p>
        </div>

         <div class="Certification updataB" :style="{'opacity':certificationRes.contractSignStatus != 'Passed'  ? '0.6' : '1'}">
             <div class="CertificationTitle">
                  <span class="title">3</span>
                  <p>上传资料</p>
            </div>
           
            <p style="margin-top:15px" class="discrption">电子签名完成后需上传资料：</p>
            <p style="margin-top:6px" class="discrption">身份证正反面、学历证明、银行卡照片</p>

            <div class="fileUpdata">
              <div class="fileUpload">
                    <van-uploader  v-model="IDcardFront" :max-count="1" :disabled="isdisabledIdCardFront"  :deletable="!isdisabledIdCardFront" :preview-size=60   />
                    <p>身份证正面</p>
              </div>
              <div class="fileUpload"  >
                  <van-uploader  v-model="IDcardCont" :after-read="IdCardUpdata "   :max-count="1" :disabled="isdisabledIdCardCont" :deletable="isIdCardContdele" :preview-size=60 />
                  <p>身份证背面</p>
              </div>
              <div class="fileUpload">
                  <van-uploader  v-model="educationfile"  :max-count="1" :after-read="educationUpdata "  :deletable="isEducationDele"  :preview-size=60   />
                   <!--  :deletable="isEducationDele" :disabled="isdisabledXl  || certificationRes.auditStatus == 'InProgress' || certificationRes.contractSignStatus == 'Passed'" -->
                  <p>学历证明</p>
              </div>
              <div class="fileUpload">
                  <van-uploader  v-model="bankCardFile"  :max-count="1"  :deletable="isbankCardDele"  :after-read="backCardUpdata"  :preview-size=60   />
                  <!--  :disabled="isdisabledBankCard || certificationRes.auditStatus == 'InProgress' || certificationRes.contractSignStatus == 'Passed'" 
                   :deletable="isbankCardDele" -->
                  <p>银行卡正面</p>
              </div>
               <div class="fileUpload">
                  <van-uploader  v-model="photoFile"  :max-count="1"  :deletable="isphotoDele"  :after-read="photoUpdata"  :preview-size=60   />
                  <p>一寸白底照</p>
              </div>
            </div>
            <p style="margin-top:10px" class="discrption">可上传执业资格证照片或提供资格证号(非必填项)</p>
            <div class="operation">
                <div class="fileUpload" style=" margin-top: 15px;">
                  <van-uploader  v-model="operationfile"  :max-count="1"  :disabled="isdisabledZYZG " :preview-size=60   :deletable="!isdisabledZYZG" :after-read="operationUpdata" />                  
                  <p>执业资格证</p>
               </div>
              <div class="operationNumbox" >
                  <p>输入执业资格证号</p>
                  <van-field class="operationInp" v-model="operationNum" placeholder="请输入" />
              </div>
            </div>
              <div class="auditStatus" v-if=" certificationRes.auditStatus == 'Passed' "  style="background:rgba(239, 255, 250, 1)">
                  <img style="height: 35px;" :src="auditpass" alt="">
                  <div class="auditStatusBox">
                    <p style=" color: #00c489;">资料审核通过</p>
                  </div>
              </div>
              <div class="auditStatus" v-if=" certificationRes.auditStatus == 'Rejected' " style="background:rgba(255, 251, 241, 1)">
                  <img style="height: 35px;" :src="auditunpass" alt="">
                <div class="auditStatusBox" style="background:rgba(255, 251, 241, 1)">
                  <p style=" color: #f2aa00;">资料审核不通过</p>
                  <p>{{certificationRes.auditRemark}}</p>
                </div>
              </div>
              <div class="auditStatus" v-if=" certificationRes.auditStatus == 'InProgress' " style="background:rgba(238, 246, 255, 1)" >
                  <img style="height: 35px;" :src="auditpdding" alt="">
                <div class="auditStatusBox">
                    <p style=" color: #0079fe;">审核中...</p>
                    <p >通常情况下，3个工作日内完成审核</p>
                </div>
              </div>

             <p class="certificationBtn" style="padding-bottom:30px"  @click="upData" v-show="certificationRes.contractSignStatus == 'Passed' && (certificationRes.auditStatus == 'Initialized' || certificationRes.auditStatus == 'Rejected'  )">
                  提交审核
            </p>
        </div>

    </div>


  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import { dialog } from 'vant';
export default {
  data() {
    return {
     userName:'',
     isHeight:{
       'background':'#fff',
       'minHeight':'',
       'paddingBottom':'30px'
     },
      closeImg: (this.src = require("../../assets/images/ico-close.png")), 
      toCertificationcpage:'',
      salesmanId:'',
      // unverified:(this.src = require("../../assets/images/zxicon/unverified.png")), 
      verified:(this.src = require("../../assets/images/zxicon/verfied_icon.png")), 
      certificationImg:(this.src = require("../../assets/images/zxicon/unverified.png")),
      certificationImgV:(this.src = require("../../assets/images/zxicon/verified.png")),
      EsignatureImg:(this.src = require("../../assets/images/zxicon/Esignature_p.png")),
      auditpass:(this.src = require("../../assets/images/zxicon/auditpass.png")),
      auditpdding:(this.src = require("../../assets/images/zxicon/auditpdding.png")),
      auditunpass:(this.src = require("../../assets/images/zxicon/auditunpass.png")),
      IDcardFront:[],
      IDcardCont:[],
      educationfile:[],
      operationfile:[],
      bankCardFile:[],
      isdisabled:true,
      authStatus:'',
      showCertificaitonBody:true,//已认证且不需要认证流程。
      certificationRes:{},
      signcontractFileUrl:'',
      IdCardFrontFileurl:'',
      IdCardContraryFileurl:'',
      isdisabledIdCardFront:false,
      isdisabledIdCardCont:false,
      isdisabledXl:false,
      isdisabledZYZG:false,
      isdisabledBankCard:false,
      operationNum:'',
      imagesModel:{},
      isEducationDele:true,
      isIdCardContdele:true,
      isbankCardDele:true,
      isphotoDele:true,
      flushStatus:false,
      photoFile:[]
    }
  },
  created: function() {
   this.isHeight.minHeight = window.innerHeight  + 'px';
   this.salesmanId = sessionStorage.getItem('salesmanId');
    var url = window.location.protocol + '//' + window.location.host + '/#' + '/?appId=' + localStorage.getItem('appId');
    var callback = encodeURIComponent(url);
    Indicator.open('请稍后...');
    var salesmanId = sessionStorage.getItem('salesmanId');
    this.authStatus = sessionStorage.getItem('authStatus');
    var self = this;
    this.upDataStatue();
    // axiosGetAPI('/Certification/'+ salesmanId ).then(res=>{
    //     Indicator.close()
    //     if(res.status == '200'){
    //         if(res.result){
    //             this.certificationRes = res.result;
    //             this.showCertificaitonBody = true;
    //             if(res.result.attachments.length>0){
    //               res.result.attachments.map(item=>{
    //                 if(item.category=='Other' && item.name == "代理人协议"){
    //                   self.signcontractFileUrl = item.fileUrl;
                      
    //                 }
    //                 if(item.category == 'IdCardFront'){
    //                   self.IdCardFrontFileurl = item.fileUrl;
    //                   self.isdisabledIdCardFront = item.fixed;
    //                   var obj = {};
    //                   // obj.id = item.fileId;
    //                   // self.imagesModel[item.fileId] = item.fileUrl
    //                   obj.url = item.fileUrl;
    //                   self.IDcardFront.push(obj)
    //                 }
    //                 if(item.category == 'IdCardContrary'){
    //                   self.IdCardContraryFileurl = item.fileUrl;
    //                   self.isdisabledIdCardCont = item.fixed;
    //                   var obj = {};
    //                   // obj.id = item.fileId;
    //                   obj.url = item.fileUrl;
    //                   // self.imagesModel[item.fileId] = item.fileUrl
    //                   self.IDcardCont.push(obj);
    //                 }
    //               })
    //             }
    //           }else{
    //             this.showCertificaitonBody = false;
               
    //           }
    //     }
    //  })

  //  axiosGetAPI('/Salesmans/'+ this.salesmanId + '/Authentication?callback=' + callback).then(res=>{
  //    Indicator.close()
  //    if(res.status){
  //       this.toCertificationcpage = res.result;
  //    }
  //  })
  },
  mounted() {

      
  },
  methods: {
      IdCardUpdata(file){
            var fileModel = {};
            fileModel.dataURIString = file.content;
             Indicator.open('资料上传中')
           axiosPostAPI('/Documents?folderName=certification',fileModel).then(res=>{
             Indicator.close(); 
             if(res.result){
                var id = res.result.id;
                // var url = res.result.url;
                var name = '身份证背面';
                this.imagesModel[id] = name;
              
              }
          })

      },
      educationUpdata(file){
            var fileModel = {};
            fileModel.dataURIString = file.content;
            Indicator.open('资料上传中')
            axiosPostAPI('/Documents?folderName=certification',fileModel).then(res=>{
            Indicator.close(); 
              if(res.result){
                var id = res.result.id;
                // var url = res.result.url;
                var name = '学历证明';
                this.imagesModel[id] = name;
              
              }
          })
      },
      backCardUpdata(file){
         var fileModel = {};
          fileModel.dataURIString = file.content;
          Indicator.open('资料上传中')
          axiosPostAPI('/Documents?folderName=certification',fileModel).then(res=>{
             Indicator.close(); 
              if(res.result){
                var id = res.result.id;
                // var url = res.result.url;
                var name = '银行卡正面';
                this.imagesModel[id] = name;
              }
          })
      },
      photoUpdata(file){
        var fileModel = {};
          fileModel.dataURIString = file.content;
          Indicator.open('资料上传中')
          axiosPostAPI('/Documents?folderName=certification',fileModel).then(res=>{
             Indicator.close(); 
              if(res.result){
                var id = res.result.id;
                // var url = res.result.url;
                var name = '一寸白底证件照';
                this.imagesModel[id] = name;
              }
          })
      },
      operationUpdata(file){
          var fileModel = {};
          fileModel.dataURIString = file.content;
          Indicator.open('资料上传中')
          axiosPostAPI('/Documents?folderName=certification',fileModel).then(res=>{
            Indicator.close(); 
              if(res.result){
                var id = res.result.id;
                // var url = res.result.url;
                var name = '执业资格证';
                this.imagesModel[id] = name;
              }
          })
      },

   upData(){
       
        var model = {};
        model.licenseNo = this.operationNum;

        if(this.IDcardCont.length > 0){

        }else{
          Toast('请上传身份证背面');
          return;
        }
      if(this.educationfile.length > 0){

        }else{
          Toast('请上传学历证明');
          return;
        }
        if(this.bankCardFile.length > 0){

        }else{
           Toast('请上传银行卡');
          return;
        }
        this.$dialog.confirm({
                  title: '',
                   message: '您确定提交审核吗？',
                  }).then(() => {
                      Indicator.open('资料上传中')
                    model.images = this.imagesModel;
                    axiosPostAPI('/Certification/' + this.salesmanId,model).then(res=>{
                      Indicator.close()
                      if(res.status == 200){
                        this.upDataStatue()
                      }
                    })      
          }).catch(() => {});


         
    },

  upDataStatue(){
        var self = this;
        if(this.$route.query.appId){
          this.flushStatus = true;
        }
                axiosGetAPI('/Certification/'+  this.salesmanId + '?flushStatus=' + this.flushStatus).then(res=>{
                    Indicator.close()
                    if(res.status == '200'){
                      this.flushStatus = false;
                        if(res.result){
                            this.certificationRes = res.result;
                            this.showCertificaitonBody = true;
                            if(res.result.contractDownloadUrl){
                              this.signcontractFileUrl = res.result.contractDownloadUrl;
                            }
                            if(  res.result.auditStatus == 'InProgress' || res.result.auditStatus == 'Passed'){
                              this.isEducationDele = false;
                              this.isbankCardDele=false;
                              this.isphotoDele = false;
                            }
                           if(  res.result.auditStatus == 'Rejected' || res.result.auditStatus == 'Initialized'){
                              this.isEducationDele = true;
                              this.isbankCardDele = true;
                              this.isphotoDele = true;
                            }
                            if(res.result.attachments.length>0){
                              res.result.attachments.map(item=>{
                                // if(item.category=='Other' && item.name == "代理人协议"){
                                //   self.signcontractFileUrl = item.fileUrl;                       
                                // }
                                if(item.category == 'IdCardFront'){
                                  self.isdisabledIdCardFront = item.fixed;
                                  var obj = {};
                                  obj.url = item.fileUrl;
                                  if(self.IDcardFront.length < 1){
                                      self.IDcardFront.push(obj)
                                  }
                                  
                                }
                                if(item.category == 'IdCardContrary'){
                                  
                                  if(item.fileUrl){
                                  self.isdisabledIdCardCont = item.fixed;
                                  self.isIdCardContdele = !item.fixed;
                                  var obj = {};
                                  obj.url = item.fileUrl; 
                                  if(self.IDcardCont.length < 1){
                                      self.IDcardCont.push(obj);
                                  }
                                  }     
                                }
                            if(item.category == 'Other' && item.name == "身份证背面"){
                                  self.isdisabledIdCardCont = item.fixed;
                                  if( res.result.auditStatus == 'InProgress' || res.result.auditStatus == 'Passed'){
                                      this.isIdCardContdele = false;
                                  }
                                  var obj = {};
                                  obj.url = item.fileUrl;                              
                                  // self.educationfile.push(obj);
                                  if(self.IDcardCont.length < 1){
                                      self.IDcardCont.push(obj)
                                  } 
                                }

                              if(item.category == 'Other' && item.name == "学历证明"){
                                  self.isdisabledXl = item.fixed;
                                  if( res.result.auditStatus == 'InProgress' || res.result.auditStatus == 'Passed'){
                                      this.isEducationDele = false;                              
                                  }
                                  var obj = {};
                                  obj.url = item.fileUrl;                              
                                  // self.educationfile.push(obj);
                                  if(self.educationfile.length < 1){
                                      self.educationfile.push(obj)
                                  } 
                                }
                                if(item.category == 'Other' && item.name == "银行卡正面"){                             
                                  self.isdisabledBankCard = item.fixed;
                                  if( res.result.auditStatus == 'InProgress' || res.result.auditStatus == 'Passed'){
                                     this.isbankCardDele=false
                                  }
                                  var obj = {};
                                  obj.url = item.fileUrl;  
                                   if(self.bankCardFile.length < 1){
                                      self.bankCardFile.push(obj)
                                  }                           
                                  // self.bankCardFile.push(obj);
                                }
                                if(item.category == 'Other' && item.name == "一寸白底照"){                                                               
                                  if( res.result.auditStatus == 'InProgress' || res.result.auditStatus == 'Passed'){
                                     this.isphotoDele=false
                                  }
                                  var obj = {};
                                  obj.url = item.fileUrl;  
                                   if(self.photoFile.length < 1){
                                      self.photoFile.push(obj)
                                  }                           
                                  // self.bankCardFile.push(obj);
                                }
                                
                                 if(item.category == 'Other' && item.name == "执业资格证"){                                 
                                  self.isdisabledZYZG = item.fixed;
                                  var obj = {};
                                  obj.url = item.fileUrl;                              
                                  // self.operationfile.push(obj);
                                  if(self.operationfile.length < 1){
                                      self.operationfile.push(obj)
                                  }   
                                }

                              })
                            }
                          }else{
                            this.showCertificaitonBody = false;
                          
                          }
                    }
                })
  },
    openBack: function() {
      this.$router.push({path: '/myInfo/myIndex'});
    },
        async toZxcertification(){
          var _url = '';
         Indicator.open()
          this.salesmanId = sessionStorage.getItem('salesmanId');
         var url = window.location.protocol + '//' + window.location.host + '/#' + '/myInfo/zxCertification?appId=' + localStorage.getItem('appId');
      
         var model = {};
         model.returnUrl = url;
         await axiosPostAPI('/Certification/' + this.salesmanId + '/Authentication',model).then(res=>{
           Indicator.close();
            if(res.status){
                _url = res.result.redirectUrl;
                if(res.result.redirectUrl){
                   window.location.href =  res.result.redirectUrl;
                }
            }
          })
         
    },
  async  toSignContract(){
        var _url = '';
        this.salesmanId = sessionStorage.getItem('salesmanId');
         var url = window.location.protocol + '//' + window.location.host + '/#' + '/myInfo/zxCertification?appId=' + localStorage.getItem('appId');
        //  var callback = encodeURIComponent(url);
         var model = {};
         model.returnUrl = url;
         Indicator.open()
          axiosPostAPI('/Certification/' + this.salesmanId + '/SignContract',model).then(res=>{
            Indicator.close()
            if(res.status){
                _url = res.result.redirectUrl;
                 if(res.result.redirectUrl){
                   window.location.href =  res.result.redirectUrl;
                }
            }
          })
      
    }
   
  }
}

</script>
<style scoped>

.main_header{
  height:60px;
  margin: 15px;
  margin-top: 60px;
  background: rgba(238, 246, 255, 1);
  border-radius: 6px;
  display: flex;

}
.header_left{
  width: 60px;
  height: 60px;
  background: rgba(0, 121, 254, 1);
  border-radius: 6px 0 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header_left img{
  height: 31px;
}

.header_right{
  flex: 1;
}

.header_right p{
  font-size: 24px;
  color: #0079fe;
  line-height: 60px;
  text-align: center;
}

.main{
  margin: auto;
}

.Certification{
  margin-top: 20px;
  text-align: center;
}

.CertificationTitle{
    display: flex;
    justify-content: center;
    align-items: center;
}

.CertificationTitle .title{
    background: #333333;
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
}

.CertificationTitle p{
  font-size: 24px;
  font-weight: bold;
  color: #202020;
  margin-left: 10px;
}

.CertificationImg{
  margin-top:10px; 
}

.CertificationImg img{
  width: 60px;
}

.CertificationImg  p{
  margin-top: -10px;
  font-size: 12px;
}

.certificationBtn{
  font-size: 16px;
  color:#0079fe;
  margin-top: 15px
}

.certificationLine{
  /* width: 80%; */
  /* height: 2px; */
  border-top: 1px dashed #666;
  margin: auto;
  margin-top: 45px;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-right: 30px;
}

.certifitionInfor{
  width: 60%;
    background: rgb(249,249,249);
    font-size: 12px;
    text-align: left;
    margin: 15px auto;
    padding: 15px;
    border-radius: 8px;
}

.fileUpdata{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 20px;
}

.fileUpload p{
  color: #b0b0b0;
  font-size: 12px;
}

.operation{
  margin-top:5px;
  display: flex;
  align-items: center;
  margin: 15px 30px 30px 30px;
}

.updataB {
  margin-bottom: 30px;
}

.discrption{
  color: #a0a0a0;
}

.operationNumbox{
  margin-left: 20px;
  border-left: 1px dashed  #eee;
  padding-left: 20px;
}

.operationNumbox p{
  font-size: 12px;
  color: #a0a0a0;
  text-align: left;
  line-height: 40px;
}

.auditStatus{
    margin: 30px;
    display: flex;
    border-radius: 6px;
    padding: 15px 15px 25px;
    padding-bottom:30px
}

.auditStatusBox{
  text-align: left;
  margin-left: 10px;
  
}

.auditStatusBox p:nth-child(1){
  font-size: 14px;
 
}

.auditStatusBox p:nth-child(2) {
  font-size: 12px;
  color: #a0a0a0;
}

</style>
