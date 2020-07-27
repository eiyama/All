<template>
  <div class="reg">
    <mt-header fixed class="def-header" title="上传影像资料">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="mint-content mint-region">
      <div class="h-content">
        <div class="h-form">
          <p class="tip">身份证正,反面照片；工作证或者执业证照片等其他资料</p>
          <form enctype="multipart/form-data" id='uploadForm' v-show="false"></form>
          <div class="poto">
            <div class="plist">
              <div class="pItem" v-for="(item,index) in plist" :key='index' @click="del(index)"><img :src="item.srcs" alt=""></div>
            </div>
            <div class="potoAdd">
              <van-uploader :after-read="onRead">
                <van-icon name="photograph" />
              </van-uploader>
            </div>
          </div>
        </div>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <div style="background:#F5F5F5; height: 10px"></div>
        <hr width="100%" color="#f5f5f5" size="1">
        </hr>
        <div style="margin-left: 30px; margin-right: 30px; margin-top: 50px">
          <mt-button @click="upload" type="primary" size="large" plain>确定</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Dialog } from 'vant';
import * as types from './../../store/types';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
var formData = new FormData(document.getElementById('uploadForm'));
export default {
  name: 'reg',
  data() {
    return {
      objs: {},
      fileInfos: [],
      fileInfo: { "label": "", "fileName": "" },
      plist: [],
      index: 1
    }
  },
  methods: {
    openBack() {
      window.history.back();
    },
    upload() {
      console.log(this.obj);

      var model = JSON.stringify(this.fileInfos);
      this.objs.delete('fileInfos');
      this.objs.append('fileInfos', model);

      var pcid = this.$route.query.pcid;
      var url = '/PotentialCustomers/' + pcid + '/Images'
      Indicator.open('正在上传...');
      axiosPostAPI(url, this.objs).then((res) => {
        Indicator.close();
        if (res.status == 200) {
          Toast({
            message: '上传成功',
            position: 'bottom',
            duration: 2000
          });
          window.history.back();
        }
      })
    },
    onRead(data) {
      var allowed = "jpg|gif|png|jpeg|";
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
      if (data.file.size > 1024 * 1024 * 2) {
        Toast({
          message: '上传的图片不能超过2MB',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }

      var file = 'file' + this.index
      formData.delete(file);
      formData.append(file, data.file);
      this.index++

      this.fileInfo.label = '';
      this.fileInfo.fileName = data.file.name;
      this.fileInfos.push(this.fileInfo);

      this.plist.push({ srcs: data.content })

      this.objs = formData
      console.log(data);
    },
    del(index) {
      Dialog.confirm({
        title: '提示',
        message: '是否删除图片？'
      }).then(() => {
        document.getElementsByClassName('pItem')[index].style.display = 'none';
        formData.delete('file' + (index + 1))
        this.fileInfos.splice(index, 1);
      }).catch(() => {});

    }
  }
}

</script>
<style scoped>
.h-content h3 {
  font-size: 12px;
  padding: 10px;
  font-weight: 100;
  color: #A4A4A4
}

.h-content .tip {
  font-size: 14px;
  padding: 10px;
  color: #949494
}

.mint-content {
  padding-left: 0;
  padding-right: 0
}

.mint-region .mint-cell {
  padding-top: 0
}

.mt20 {
  margin: 50px 20px;
}

.poto {
  padding: 10px;
  font-size: 1.5em;
  color: #4b4b4b
}

.poto .potoAdd {
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #A4A4A4;
  display: inline-block
}

.plist {
  overflow: hidden;
}

.plist .pItem {
  float: left;
  width: 31.3333%;
  padding-right: 5px;
}

.plist .pItem img {
  width: 100%;
  height: 75px;
}

</style>
