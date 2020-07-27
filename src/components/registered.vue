<template>
  <div class="register" style="background-color:#FFF">
    <div class="van-hairline--bottom van-doc-nav-bar van-nav-bar" style="z-index: 1;">
      <div class="van-nav-bar__left" v-show='false'><i class="van-icon van-icon-arrow van-nav-bar__arrow" onclick="history.go(-1)">
          <!----></i>
        <!---->
      </div>
      <div class="van-ellipsis van-nav-bar__title">加入{{title}}</div>
      <div class="van-nav-bar__right"></div>
    </div>
    <div class="register_content">
      <div class="invitation">
        <div class="invitation_name">
          <span class="name">{{nickName}}</span>&nbsp; 邀你,
        </div>
        <div class="tips">
          跟全国志同道合的朋友一起 <br>
          实现财富梦~
        </div>
      </div>
      <div class="form">
        <van-cell-group>
          <van-field van-field__control required clearable v-model='users_value' label="用户名" placeholder="请输入用户名" maxlength='30' :error-message='users' :error='users_err' />
          <van-field van-field__control required clearable v-model='password_value' label="密码" placeholder="请输入6~12位密码" maxlength='12' type="password" :error-message="password" :error='password_err' />
          <van-field van-field__control required clearable v-model='again_value' label="确认密码" placeholder="请输入确认密码" maxlength='12' type="password" :error-message="again" :error='again_err' />
        </van-cell-group>
        <van-button @click='join' size="large" type="primary">立即加入</van-button>
        <div class="ps">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../common/Axios';
import { Toast } from 'vant';
export default {
  data() {
    return {
      appId: '',
      title: '',
      users_value: '',
      password_value: '',
      again_value: '',
      nickName: '', //邀请人
      users: '',
      readonly: true,
      users_err: false,
      password: '',
      password_err: false,
      again: '',
      again_err: false,
      referralCode: '',
      downloadUrl: ''
    }
  },
  created() {
    this.referralCode = this.$route.query.referralCode;
    this.nickName = this.$route.query.nickName;
    this.title = this.$route.query.title;
    this.downloadUrl = this.$route.query.downloadUrl;
    this.appId = this.$route.query.appId;
    localStorage.setItem('appId', this.appId);
  },
  methods: {
    join() {
      var me = this;
      if (this.users_value == '') {
        Toast('用户名不能为空');
        return;
      }

      if (this.password_value == '') {
        Toast('密码不能为空');
        return;
      }

      if (this.password_value.length < 6) {
        Toast('请输入6~12位密码');
        return;
      };

      if (this.again_value == '') {
        Toast('确认密码不能为空');
        return;
      }

      if (me.password_value != me.again_value) {
        Toast('两次密码不一样');
        return;
      }

      var datas = {
        userName: me.users_value,
        password: me.password_value,
        referralCode: me.referralCode,
        channelSource: 'H5'
      }
      axiosPostAPI('/vi/members', datas).then((d) => {
        if (d.status == 200) {
          Toast.success('注册成功！');
          setTimeout(() => {
            me.$router.push({ path: '/success', query: { title: me.$route.query.title, downloadUrl: me.$route.query.downloadUrl, appId: me.$route.query.appId } })
          }, 1000)
        } else {
          Toast.fail(d.errMsg);
        }

      });
    }
  }
}

</script>
<style>
.register {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 480px;
  font-size: 10px;
  background-size: cover;
  background-repeat: no-repeat;
}

.register .van-nav-bar {
  background-color: #0066FF;
  color: #fff
}

.register .van-icon-arrow::before {
  color: #fff
}

.register .van-button--primary {
  background: #0066FF;
  border: #0066FF;
  margin: 5px 0;
  margin-top: 40px;
  height: 42px;
}

.register .register_content {
  padding: 30px
}

.register .van-field__control {
  padding-left: 5px;
}

.register .register_content .invitation_name {
  font-size: 1.5em;
  margin-bottom: 15px
}

.register .register_content .tips {
  font-size: 14px;
}

.register .register_content .form {
  margin-top: 30px;
}

.register .register_content .ps {
  font-size: 12px;
}

</style>
