<template>
  <div class="home" style="background-color:#FFF">
    <mt-header fixed class="def-header cust-head" title="个人资料">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="wrap-content">
      <div class="my-info">
        <mt-cell class="mt-my-head" title="头像">
          <img class="my-head" :src="headImageUrl ? headImageUrl: avatar" alt="">
        </mt-cell>
        <mt-cell title="姓名">
          <span class="my-cell-gray">{{accountName}}</span>
        </mt-cell>
      </div>
      <div class="my-info">
        <mt-cell title="公司">
          <span class="my-cell-gray">{{sellerName=='undefined' ? '' : sellerName}}</span>
        </mt-cell>
        <mt-cell title="部门">
          <span class="my-cell-gray">{{sellerDeptName=='undefined' ? '' : sellerDeptName}}</span>
        </mt-cell>
      </div>
      <div class="my-info" @click="openModifyPWD">
        <mt-cell title="密码" is-link>
          <span style="color:#f94037;font-size:13px">修改</span>
        </mt-cell>
      </div>
      <mt-button class="btn-fixed" type="primary" size="large" @click="Signout">退出登录</mt-button>
      <van-dialog v-model="showModifyPWD" show-cancel-button :before-close="beforeClose" :overlay='overlay' :close-on-click-overlay='overlay' :show-confirm-button='btn' :showCancelButton='btn'>
        <div class="dialogs">
          <p style="color:#333;font-size:18px;font-weight:bold">修改密码</p>
          <div class="diaContent">
            <div style="margin-top:15px">
              <mt-field label="原密码" class="mint-formItm" v-model="oldPsw" type="password" placeholder="请输入原密码">
              </mt-field>
              <mt-field label="新密码" class="mint-formItm" v-model="newPsw" type="password" placeholder="请输入新密码">
              </mt-field>
              <mt-field label="确认密码" class="mint-formItm" v-model="confirmPsw" type="password" placeholder="请输入确认密码">
              </mt-field>
            </div>
            <div class="btns-hao" style="margin-top:30px">
              <span @click="cancel" style="font-size:14px">取消</span>
              <mt-button type="primary" @click="modifyPWD" size="large" style="font-size:12px;height:30px;width:85px">确定</mt-button>
            </div>
          </div>
        </div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { axiosGetAPI, axiosPostAPI, axiosPutAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
import router from './../../router';
import store from './../../store/store';
import * as types from './../../store/types';
import axios from 'axios';
import { dialog } from 'vant';
export default {
  name: 'home',
  data() {
    return {
      selected: '1',
      plante: 'quotationList',
      title: '报价单',
      accountName: '',
      sellerName: '',
      sellerDeptName: '',
      token: '',
      userId: '',
      hide: true,
      certification: '未认证',
      isSalesMan: false,
      isAgency: false,
      val: '',
      shows: false, //show
      overlay: true,
      btn: false,
      showModifyPWD: false,
      oldPsw: '',
      newPsw: '',
      confirmPsw: '',
      headImageUrl: '',
      avatar: this.src = require('../../assets/images/img-avatar.png'),
    }
  },
  created: function() {
    this.accountName = this.$route.query.accountName;
    this.sellerName = this.$route.query.sellerName;
    this.sellerDeptName = this.$route.query.sellerDeptName;
    var headImg = sessionStorage.getItem('headImageUrl');
    if (headImg != '' && headImg != null && headImg != 'undefined') {
      this.headImageUrl = headImg;
    }
  },
  methods: {
    beforeClose() {},
    openBack: function() {
      window.history.back();
    },
    Signout: function() {
      var self = this;
      store.commit(types.LOGOUT);
      sessionStorage.removeItem('userIds');
      sessionStorage.removeItem('nickName');
      sessionStorage.removeItem('referralCode');
      sessionStorage.removeItem('title');
      sessionStorage.removeItem('salesmanId');
      sessionStorage.removeItem('accountName');
      sessionStorage.removeItem("carInfoData");
      sessionStorage.removeItem('sellerOrgCode');
      sessionStorage.removeItem('sellerDeptCode');
      sessionStorage.removeItem('CarInformation');
      sessionStorage.removeItem('insCtiyCode');
      sessionStorage.removeItem('settleFeeIds');
      sessionStorage.removeItem('enquiryModel');
      localStorage.removeItem('token');
      this.$router.push({ path: "/login?appId=" + localStorage.getItem('appId') });
    },
    openModifyPWD: function() {
      this.showModifyPWD = true;
    },
    cancel: function() {
      this.showModifyPWD = false;
    },
    modifyPWD: function() {
      var me = this;
      if (!me.oldPsw) {
        Toast({
          message: '请输入原密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      if (!me.newPsw) {
        Toast({
          message: '请输入新密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      if (!me.confirmPsw) {
        Toast({
          message: '请输入确认密码',
          position: 'bottom',
          duration: 3000
        });
        return;
      };

      if (me.confirmPsw != me.newPsw) {
        me.confirmPsw = '';
        Toast({
          message: '两次输入的密码不一致，请重新输入',
          position: 'bottom',
          duration: 3000
        });
        return;
      };
      var putBody = { "password": "", "newPassword": "" };
      putBody.password = me.oldPsw;
      putBody.newPassword = me.newPsw
      var url = '/Users/Me/Password';
      axiosPutAPI(url, putBody).then((data) => {
        Indicator.close();
        if (data.status == 200) {
          Toast('密码修改成功，请重新登录');
          me.Signout();
        } else {
          Toast(res.errMsg);
        }
      });
    },
  }
}

</script>
<style scoped>
.my-head {
  display: inline-block;
  width: 54px;
  height: 54px;
  background-color: #eee;
  border-radius: 50%;
}

dialogs .title {
  font-size: 14px;
}

.dialogs {
  padding: 10px 20px;
  font-size: 12px;
}

.diaContent {
  padding: 0 0px;
}

.diaContent .imgcontent {
  text-align: center
}

.diaContent .imgcontent img {
  max-width: 130px;
}

.diaContent .tip {
  padding: 20px 0;
  color: #B1B9CE
}

.diaContent .tip span {
  vertical-align: text-bottom;
  margin-left: 5px
}

.diaContent .pos .pos-content {
  padding: 0 20px;
  margin-bottom: -10px;
}

.diaContent .pos .pos-content .tit {
  padding-bottom: 10px;
}

.diaContent .pos .pos-content .tit span {
  font-size: 20px
}

.btns-hao {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns-hao span {
  flex: 1;
  color: #357bfd;
  line-height: 40px;
}
.btn-fixed{
	background:#357bfd;
}

</style>
