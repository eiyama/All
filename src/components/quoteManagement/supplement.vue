<template>
  <div class="uwResult" style="background-color:#FFF">
    <mt-header fixed class="def-header" title="待补充信息">
      <div slot="left">
        <mt-button @click="openBack" icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="underwriting">
      <div class="underwriting-top">
        <p>请添加要提交的资料类别</p>
        <div class="jia" @click="openTypeBox"></div>
      </div>
    </div>
    <div class="Certificates-left" v-show="btnText1">
      <label class="mint-checkitem" v-for="item in type.subTypes" @click.prevent="openType(item)">
        <input readonly="readonly" type="checkbox">
        <i>&#10004;</i>{{item.name}}</label>
    </div>
    <div class="Certificates-right" v-show="btnText2">
      <label class="mint-checkitem" v-for="item in typee.subTypes" @click.prevent="Subtype(item)">
        <input readonly="readonly" type="checkbox">
        <i>&#10004;</i>{{item.name}}</label>
    </div>
    <!-- 添加类型 -->
    <div class="underwriting-license" v-for="item in newitems">
      <p class="underwriting-p">{{item.name1}}--{{item.name2}}</p>
      <!-- <li v-for="items in itemImgs" v-if="items.name=='驾驶证'"  class="img"  > -->
      <li v-for="img in items">
        <img :src="img">
      </li>
      <!-- </li> -->
      <li style="position:relative" v-if="imgs.length>=6 ? false : true" class="btn-add">
        <input type="file" name="file" id="imgFile" class="imgfile" multiple="multiple" value="" accept="image/jpg,image/jpeg,image/png,image/bmp" @change="add_img" />
      </li>
    </div>
    <label class="mt-err-tip"></label>
    <button class="btn-bottom">提交资料</button>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
export default {
  name: "supplement",
  data() {
    return {
      newitems: [],
      popTypeVisible: false,
      ownerIdType: '',
      name1: '',
      name3: '',
      items: [],
      btnText1: false,
      btnText2: false,
      itemImgs: [],
      imgs: [],
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg',
      },
      car: {
        insBatchNo: '',
        insCorpCode: '',
      },
      carr: {
        insBatchNo: '',
        insCorpCode: '',
        attachmentTypeCode: '',
      },
      ownerIdTypeVal: '',
      type: {
        insCorpCode: "",
        type: {
          seqId: "",
          code: "",
          name: "",
          requriedExpiredTime: "",
          dedscription: ""
        },
        subTypes: [{
          seqId: "",
          code: "",
          name: "",
          requriedExpiredTime: "",
          dedscription: ""
        }]
      },
      typee: {
        insCorpCode: "",
        type: {
          seqId: "",
          code: "",
          name: "",
          requriedExpiredTime: "",
          dedscription: ""
        },
        subTypes: [{
          seqId: "",
          code: "",
          name: "",
          requriedExpiredTime: "",
          dedscription: ""
        }]
      },
      carInfoData: {
        insCity: { shortName: "", code: "" },
        car: {
          owner: {
            name: "",
            phone: "",
            idNo: "",
            idType: "",
            relationType: "",
            birthday: "",
            gender: ""
          },
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
          changedOwnerDate: "",
          aliasName: "",
          fullPriceModel: ""
        },
        applicant: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" },
        insured: { name: "", phone: "", idNo: "", idType: "", relationType: "", birthday: "", gender: "" }
      },
    }
  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    add_img: function(event) {
      var reader = new FileReader();
      var img1 = event.target.files[0];
      var type = img1.type; //文件的类型，判断是否是图片  
      var size = img1.size; //文件的大小，判断图片的大小  
      if (this.imgData.accept.indexOf(type) == -1) {
        alert('请选择我们支持的图片格式！');
        return false;
      }
      if (size > 3145728) {
        alert('请选择3M以内的图片！');
        return false;
      }
      var self = this
      var uri = ''
      var file = event.target.files[0]
      var form = new FormData();
      form.append('file', img1, img1.name);
      // for (var i = 0; i < self.itemImgs.length; i++) {

      //  }; 
      self.items.push(event.target.files[0].name)
      // form.append('file',img1,img1.name);  
      // this.$http.post('/file/upload',form,{  
      //     headers:{'Content-Type':'multipart/form-data'}  
      // }).then(response => {  
      //     console.log(response.data)  
      //     uri = response.data.url  
      //     reader.readAsDataURL(img1);  
      //     var that=this;  
      //     reader.onloadend=function(){  
      //         that.imgs.push(uri);  
      //     }  
      // }).catch(error => {  
      //     alert('上传图片出错！');  
      // })      
    },
    openTypeBox: function() { //打开车主证件类型选择层
      var self = this;
      self.popTypeVisible = true;
      self.popTypeVisible = true;
      self.car.insCorpCode = self.$route.query.insCorpCode;
      self.car.insBatchNo = self.$route.query.insBatchNo;
      var url = "/vi/insurePolicies/" + self.car.insCorpCode + '/' + self.car.insBatchNo + '/' + "attachmenttypes"
      var car = self.car
      axiosGetAPI(url, car).then((res) => {
        self.type.subTypes = res.result.subTypes
      })
      self.btnText1 = true;
    },
    openType: function(item) {
      var self = this;
      self.carr.insCorpCode = self.$route.query.insCorpCode;
      self.carr.insBatchNo = self.$route.query.insBatchNo;
      self.carr.attachmentTypeCode = item.code;
      var url = "/vi/insurePolicies/" + self.carr.insCorpCode + '/' + self.carr.insBatchNo + '/' + "attachmenttypes";
      var carr = self.carr;
      axiosGetAPI(url, carr).then(res => {
        var self = this;
        self.typee = res.result;
        self.typee.subTypes = res.result.subTypes;
      });
      self.btnText2 = true;
      self.name1 = item.name
    },
    Subtype: function(item) {
      var self = this;
      self.btnText1 = false;
      self.btnText2 = false;
      self.name2 = item.name
      var obj1 = {
        name1: this.name1,
        name2: item.name
      }
      // var obj2={
      //    name:item.name,
      //    imgs: []
      // }
      self.newitems.push(obj1)
      // self.itemImgs.push(obj2)
    }
  }
}

</script>
<style scoped>
.underwriting-bttom {
  height: 250px;
  width: 100%;
  background: #ffff;
  padding-top: 3%;
  margin-top: 3%;
}

.underwriting {
  margin-top: 44px;
  background: #F9F9F9;
  overflow: hidden;
}

.underwriting-top {
  width: 100%;
  height: 45px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.underwriting-top p {
  float: left;
  margin-left: 15px;
  font-size: 14px;
  color: #666666;
  margin-top: 15px;
}

.underwriting-license {
  width: 100%;
  height: 160px;
  background: #ffff;
  padding-top: 3%;
  margin-top: 3%;
}

.underwriting-p {
  font-size: 14px;
  color: #333333;
  margin-left: 5%;
  margin-bottom: 2%;
  overflow: hidden;
}

.btn-add {
  float: left;
  position: relative;
  width: 95px;
  height: 66px;
  margin: 0 10px 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: url(../../assets/images/ico-add.png) no-repeat center;
  ;
  background-size: 26px 26px;
  margin-left: 15px
}

.btn-add input {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.underwriting-left {
  width: 115px;
  height: 115px;
  float: left;
  margin-left: 5%;
}

.underwriting-left p {
  font-size: 10px;
  color: #999999;
  margin-bottom: 0;
  float: left;
}

.btnn-add {
  margin: 0 10px 10px 0;
  width: 95px;
  height: 66px;
  display: block;
}

.underwriting-rgin p {
  font-size: 10px;
  color: #999999;
  float: left;
  margin-bottom: 0;
}

.underwriting-rgin {
  width: 115px;
  height: 115px;
  float: left;
  margin-left: 5%;
}

.btn-bottom {
  width: 100%;
  height: 45px;
  text-align: center;
  font-size: 16px;
  color: #ffff;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #f94037;
}

.btnn-add img {
  width: 95px;
  height: 66px;
}

.jia {
  width: 36px;
  height: 36px;
  background: url(../../assets/images/jia.png) no-repeat center;
  background-size: 35px 35px;
  margin-right: 6%;
}

.Certificates-left {
  width: 50%;
  height: 86%;
  background: #f8f8f8;
  position: absolute;
  top: 7%;
  z-index: 100
}

.mint-checkitem {
  display: block;
  margin-top: 20px;
  margin-left: 15%;
}

.Certificates-right {
  width: 50%;
  height: 90%;
  background: #F2F2F2;
  position: absolute;
  top: 7%;
  right: 0;
  float: right;
}

.uwResult {
  background: #FAFAFA;
}

.img {
  float: left;
}

</style>
