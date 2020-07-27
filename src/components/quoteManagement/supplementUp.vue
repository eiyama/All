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
      </div>
    </div>
    <div class="Certificates">
      <div class="CertificatesSelcet">
        <div class="parent">
          <el-select v-model="value1" placeholder="请选择" @change="changes1()">
            <el-option v-for="item in options1" :key="item.code" :label="item.name" :value="item.code + '-' + item.name + '-' + item.requriedExpiredTime">
            </el-option>
          </el-select>
        </div>
        <div class="children">
          <el-select v-model="value2" placeholder="请选择" @change="changes2()" :disabled='value1 == ""'>
            <el-option v-for="item in options2" :key="item.code" :label="item.name" :value="item.code + '-' + item.name + '-' + item.requriedExpiredTime">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="CertificatesContent">
        <div class="CertificatesList">
          <div class="item" v-for="(value,$index) in fileInfos" :key="$index">
            <div class="itemTop">
              <div class="itemTitle">{{value.parentTypeName}}-{{value.attachmentTypeName}}</div>
              <div class="rt" @click="del($index)">
                <van-icon name="close" />
              </div>
            </div>
            <div class="upImg poto">
              <!-- <img :src="item.srcs" alt=""> -->
              <div class="imgslist"></div>
              <div class="potoAdd" @click="setIndex($index)">
                <van-uploader :after-read="onRead">
                  <van-icon name="photograph" />
                </van-uploader>
              </div>
            </div>
            <div class="itembottm">
              <div class="itemTitle" @click="openPicker($index)">有效期：<span class="sDate" style="color:#333;font-size:14px">请选择</span></div>
              <div class="rt">
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form enctype="multipart/form-data" id='uploadForm' v-show="false"></form>
    <mt-datetime-picker ref="picker" v-model="pickerValue" type="date" @confirm="handleConfirm" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :startDate="startDate" :endDate="endDate">
    </mt-datetime-picker>
    <button class="btn-bottom" @click="send">保存资料</button>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
import 'element-ui/lib/theme-chalk/index.css';
import { DatetimePicker, Popup, Picker, Toast, Indicator } from 'mint-ui';
import { Dialog } from 'vant';
var formData = new FormData();
export default {
  data() {
    return {
      car: {},
      carr: {},
      plist: [], //存放  flie
      options1: [],
      value1: '',
      value2: '',
      options2: [{
        value: '',
        label: ''
      }],
      children: false,
      items: [],
      fileInfos: [], //data数组
      uploadFiles: [],
      date: {
        insuredBirthConfirm: '',
        insuredBirthday: true,
        startDate: new Date('1990-01-01'),
      },
      pickerValue: '',
      sDate: '',
      thisIdex: 0,
      thisImgIndex: 0,
      objs: {},
      index: 1,
      startDate: new Date(this.Common.Public.GetDateStr(0)),
      endDate: new Date(this.Common.Public.GetDateStr(50 * 366)),
    }
  },
  created() {
    Indicator.open('加载中...');
    var self = this;
    self.car.insCorpCode = self.$route.query.insCorpCode;
    self.car.insBatchNo = self.$route.query.insBatchNo;
    self.sDate = this.Common.Public.GetDateStr(0);
    var url = "/vi/insurePolicies/" + self.car.insCorpCode + '/' + self.car.insBatchNo + '/' + "attachmenttypes"
    axiosGetAPI(url, self.car).then((res) => {
      this.options1 = res.result.subTypes;
      Indicator.close();
    })

  },
  methods: {
    openBack: function() {
      window.history.back();
    },
    handleConfirm: function() {
      if (this.pickerValue != '') this.sDate = this.Common.Public.dateString(this.pickerValue);
      this.$refs.picker.close();
      for (var i = 0; i < this.fileInfos.length; i++) {
        this.fileInfos[this.thisIdex].expiredTime = this.sDate
      }
      document.getElementsByClassName('sDate')[this.thisIdex].innerHTML = this.sDate;

      console.log(this.fileInfos)
    },
    openPicker(index) {
      this.$refs.picker.open()
      this.thisIdex = index
    },
    setIndex(index) {
      this.thisImgIndex = index
      //console.log(this.thisImgIndex);
    },
    //1级下拉选中
    changes1() {
      Indicator.open('加载中...');
      var self = this;
      self.carr.insCorpCode = self.$route.query.insCorpCode;
      self.carr.insBatchNo = self.$route.query.insBatchNo;
      self.carr.attachmentTypeCode = self.value1.split('-')[0];
      var url = "/vi/insurePolicies/" + self.carr.insCorpCode + '/' + self.carr.insBatchNo + '/' + "attachmenttypes";
      var carr = self.carr;
      axiosGetAPI(url, carr).then(res => {
        //self.typee=res.result;
        this.value2 = '';
        self.options2 = res.result.subTypes;

        Indicator.close();
      });
    },
    //2级下拉选中
    changes2() {
      //   for(var key in this.value2){
      //       this.value2[key+1] = this.value1[key]
      //   }
      var obj = {};
      obj.parentTypeCode = this.value1.split('-')[0];
      obj.attachmentTypeCode = this.value2.split('-')[0];
      obj.parentTypeName = this.value1.split('-')[1];
      obj.attachmentTypeName = this.value2.split('-')[1];
      this.fileInfos.push(obj);

    },
    onRead(data) {
      var allowed = "jpg|jpeg|";
      var url = data.file.name,
        _hz = url.substring(url.lastIndexOf(".") + 1).toLowerCase();

      if (allowed.indexOf(_hz + '|') == -1) {
        Toast({
          message: '不支持' + _hz + '格式',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      // if (data.file.size > 1024 * 1024 * 2) {
      //   Toast({
      //     message: '上传的图片不能超过2MB',
      //     position: 'bottom',
      //     duration: 2000
      //   });
      //   return false;
      // }

      var file = 'file' + this.index
      formData.delete(file);
      formData.append(file, data.file);
      this.index++

      //this.plist.push({srcs : data.content})
      var img = new Image();
      img.src = data.content;
      img.style.width = '75px';
      img.style.marginRight = '5px';
      document.getElementsByClassName('imgslist')[this.thisImgIndex].appendChild(img);

      this.objs = formData
    },
    send() {
      if (this.fileInfos.length == 0) {
        Toast('请添加要提交的资料');
        return;
      };
      this.uploadFiles = [];
      for (var i = 0; i < this.fileInfos.length; i++) {
        var imglist = document.getElementsByClassName('imgslist')[i];

        var count = imglist.childElementCount;
        console.log(count);
        if (count > 0) {
          for (var j = 0; j < imglist.childElementCount; j++) {
            var obj = {};
            obj.parentTypeCode = this.fileInfos[i].parentTypeCode;
            obj.attachmentTypeCode = this.fileInfos[i].attachmentTypeCode;
            obj.parentTypeName = this.fileInfos[i].parentTypeName;
            obj.attachmentTypeName = this.fileInfos[i].attachmentTypeName;
            this.uploadFiles.push(obj);
          };
        } else {
          Toast('请添加要提交的资料');
        }

      };

      var self = this;
      self.objs.insCorpCode = self.$route.query.insCorpCode;
      self.objs.insBatchNo = self.$route.query.insBatchNo;
      var model = JSON.stringify(this.uploadFiles);
      this.objs.delete('fileInfos');
      this.objs.append('fileInfos', model);
      console.log(this.objs)
      console.log(this.fileInfos)
      var url = "/vi/insurePolicies/" + self.objs.insBatchNo + '/' + self.objs.insCorpCode + '/' + "attachments";
      Indicator.open('正在提交资料...');
      axiosPostAPI(url, this.objs).then(res => {
        self.$nextTick(() => {
          if (res.status == 200) {
            Indicator.close();
            Indicator.open('正在重新核保...');
            var url = '/vi/insurePolicies' + '/' + self.objs.insBatchNo + '/' + self.objs.insCorpCode;
            axiosPutAPI(url).then((ress) => {
              Indicator.close();
              self.$nextTick(() => {
                window.history.back();
              })
            });
          } else {
            Indicator.close();
          }
        })
      });
    },
    del(index) {
      Dialog.confirm({
        title: '提示',
        message: '是否删除当前资料信息？'
      }).then(() => {
        //formData.delete('file'+(index+1))
        formData.delete('file' + (index + 1))
        this.fileInfos.splice(index, 1);
      }).catch(() => {
        // on cancel
      });

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

.Certificates .CertificatesSelcet {
  display: flex;
  margin-left: 5px;
  padding: 10px;
}

.Certificates .CertificatesSelcet div {
  flex: 1;
}

.Certificates .CertificatesSelcet div:first-child {
  margin-right: 5px;
}

.CertificatesContent .itemTop .rt {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 18px;
}

.CertificatesContent .itembottm .rt {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 14px;
  color: #ccc
}

.CertificatesContent .itembottm span {
  color: #ccc
}

.CertificatesContent {
  padding: 10px;
  background: #F5F5F5;
  height: 100%;
}

.CertificatesContent .item {
  position: relative;
  padding: 10px 20px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 10px
}

.CertificatesList {
  padding-bottom: 50px;
}

.poto {
  margin: 10px 0
}

.poto .potoAdd {
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #A4A4A4;
  display: inline-block
}

.imgslist img {
  width: 75px;
  height: 75px;
}

</style>
