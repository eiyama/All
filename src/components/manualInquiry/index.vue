<template>
  <div class="home" style="">
    <mt-header fixed class="def-header cust-head" title="人工询价">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div style="margin-top:48px;padding-top:5px;padding-bottom:5px;">
      <div style="margin: 10px; border-radius: 5px;">
        <div style="border: 1px solid #EEEEEE; border-radius: 8px;background: #fff;    padding: 10px;margin: 10px 0;">
          <van-checkbox-group v-model="inquiryType" class="checkBox">
            <van-checkbox shape="square" style="margin: 10px;" v-for="(item, index) in list" :key="item.key" :name="item.key">
              {{ item.name }}
            </van-checkbox>
          </van-checkbox-group>
          <van-cell-group style="margin: 10px 0;">
            <van-field v-model="applicant" required clearable label="投保人" placeholder="请输入" />
          </van-cell-group>
        </div>
        <div style="border: 1px solid #EEEEEE; border-radius: 8px;background: #fff;padding: 15px;">
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <span style="display: flex;">
              <p style="color:#f44">*</p>
              <p style="font-size: 14px;color: #333;">营业执照</p>
            </span>
            <p style="color:#999;font-size: 12px;">点击图片可更换哟~</p>
          </div>
          <div>
            <div class="addImg" v-show="upImg" @click="uploadHeadImg">
              <van-icon name="plus" color="#f94037" />
              <p style="margin-left: 5px;color:#f94037;">立即添加</p>
            </div>
            <img class="ico-head" :src="headImageUrl ? headImageUrl: avatar" style="height: 180px;" alt="" @click="uploadHeadImg">
            <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
          </div>
        </div>
        <!-- <van-uploader v-model="fileList" multiple /> -->
        <mt-button style="margin-top: 20px;" type="primary" size="large" @click="nextOne">下一步</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  axiosGetAPI,
  axiosPostAPI
} from './../../common/Axios';
import {
  Indicator,
  Toast
} from 'mint-ui';
import store from './../../store/store';
import * as types from './../../store/types';

export default {
  data() {
    return {
      headImageUrl: '',
      enquiryModel: {},
      photoId: '',
      avatar: '',
      applicant: '',
      list: [{
        name: '车险',
        key: 'car'
      }, {
        name: '非车险',
        key: 'notCar'
      }],
      inquiryType: [],
      upImg: true,
      fileModel: { "dataURIString": "" },
    }
  },
  created: function() {
    var localData = sessionStorage.getItem('enquiryModel');
    if (localData) {
      this.enquiryModel = JSON.parse(localData);
      if (this.enquiryModel) {
        this.avatar = this.enquiryModel.dataURIString;
        this.fileModel.dataURIString = this.avatar;
        this.applicant = this.enquiryModel.applicant;
        this.inquiryType = this.enquiryModel.inquiryType;
        this.upImg = false;
      }
    }

  },
  methods: {
    openBack: function() {
      window.history.back();
      sessionStorage.removeItem('enquiryModel');
    },
    // 打开图片上传
    uploadHeadImg: function() {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile: function(e) {
      var self = this;
      var $target = e.target || e.srcElement;
      var file = $target.files[0];
      var reader = new FileReader();
      if (file) {
        reader.onload = (data) => {
          var res = data.target || data.srcElement;
          self.avatar = res.result;
          var img = new Image,
            width = 800, //image resize   压缩后的宽
            quality = 0.8, //image quality  压缩质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          img.src = self.avatar;
          self.upImg = false;
          img.onload = function() {
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            //上传
            var base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            var fileModel = {
              "extension": "",
              "image": ""
            };
            fileModel.extension = "jpg";
            fileModel.image = base64;
            // console.log(base64);
            self.fileModel.dataURIString = base64;
            self.enquiryModel.dataURIString = base64;
            // Indicator.open('正在上传...');
            // var salesmanId = sessionStorage.getItem('salesmanId');
          }
        }
        reader.readAsDataURL(file);
      };
    },
    nextOne() {
      var self = this;
      if (this.inquiryType.length < 1) {
        Toast('请选择投保类型');
        return
      }
      if (this.applicant == '') {
        Toast('请输入投保人');
        return
      }
      // console.log(this.inquiryType)
      if (this.fileModel.dataURIString == '') {
        Toast('请上传营业执照');
        return
      }
      console.log(self.fileModel);
      self.enquiryModel.applicant = self.applicant;
      self.enquiryModel.inquiryType = self.inquiryType;
      var model = JSON.stringify(self.enquiryModel);
      sessionStorage.setItem('enquiryModel', model);

      Indicator.open('加载中...');
      axiosPostAPI("/Documents?folderName=enquiry", self.fileModel)
        .then((res) => {
          Indicator.close();
          if (res.status == 200) {
            self.enquiryModel.id = res.result.id;
            var model = JSON.stringify(self.enquiryModel);
            sessionStorage.setItem('enquiryModel', model);
            this.$router.push({ path: '/manualInquiry/selectRiskKinds' })
          } else {
            Toast(res.errMsg);
          }
        });
    },
  }
}

</script>
<style scoped>
.checkBox {
  display: flex;
}

.addImg {
  height: 180px;
  margin-top: 10px;
  /* margin: 0 20px; */
  /* padding: 10px 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #EEEEEE;
  border-radius: 5px;
}

.ico-head {
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;

}

.hiddenInput {
  display: none;
}

</style>
