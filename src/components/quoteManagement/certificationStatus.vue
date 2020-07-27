<template>
  <div class="reg" style="background-color:#FFF">
    <mt-header fixed class="def-header" title="我是代理人">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="mint-content mint-region">
      <div class="h-content">
        <div class="imgs-content">
          <img :src="imgSrc" alt="">
        </div>
        <div class="status">
          <div class="textalign" v-show="status1">
            <span class="fontStauts">审批通过，</span>您现在已经升级为代理人，<br> 现在可以享受相当有人的下单奖励和更好的服务
          </div>
          <div class="textalign" v-show="status2">
            您的申请已经提交审核,我们会及时处理...
          </div>
          <div class="textalign" v-show="status3">
            审核时间：{{result.auditTime}}
            <p class="fontStauts" style="padding:10px 0">{{result.status}}</p>
            {{result.auditOpinion}}
          </div>
        </div>
        <!-- status1 -->
        <div class="jump" v-show="status1">
          <p class="">给客户下单，向财富进发</p>
          <mt-button class="btn-login" type="primary" @click="jumpIndex" size="large">去展业</mt-button>
        </div>
        <!-- status2 -->
        <div v-show="status2" class="textalign"><span>提交时间:{{result.createdTime}}</span></div>
        <!-- status3 -->
        <div v-show="status3" class="textalign" @click="jumpCer">
          <mt-button class="btn-login" type="primary" size="large">重新申请</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import * as types from './../../store/types';
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';

import ic_apply_failed from '../../assets/images/ic_apply_failed.png'
import ic_apply_pending from '../../assets/images/ic_apply_pending.png'
import ic_apply_successful from '../../assets/images/ic_apply_successful.png'

export default {
  name: 'reg',
  data() {
    return {
      title: '',
      status1: false,
      status2: false,
      status3: true,
      imgSrc: '',
      result: {
        auditOpinion: '',
        status: '',
        auditTime: '',
        createdTime: ''
      },
      isSalesMan: false
    }
  },
  created() {
    if (sessionStorage.getItem('userIds')) {
      this.isSalesMan = this.$route.query.isSalesMan;
      if (this.isSalesMan == 'false') {
        //var url = '/Users/' + sessionStorage.getItem('userIds') + '/Salesman'
        var url = '/vi/salesmans/' + sessionStorage.getItem('userIds') + '/latest';
        axiosGetAPI(url).then((d) => {
          if (d.status == 200) {
            if (d.result) {
              if (d.result.status == 'NotPass') {
                this.result.status = '审核未通过';
                this.imgSrc = ic_apply_failed;

                this.result.auditTime = d.result.auditTime;
                this.result.auditOpinion = d.result.auditOpinion;
              } else if (d.result.status == 'Auditing') {
                this.status1 = false;
                this.status2 = true;
                this.status3 = false;
                this.result.createdTime = d.result.createdTime;
                this.imgSrc = ic_apply_pending;
              } else {
                this.status1 = true;
                this.status2 = false;
                this.status3 = false;
                this.result.createdTime = d.result.createdTime;
                this.imgSrc = ic_apply_successful;
              }
            } else {
              this.$router.push({ path: "/certification" })
            }
          }
        })
      } else {
        this.status1 = true;
        this.status2 = false;
        this.status3 = false;

        this.imgSrc = ic_apply_successful;
      };

    } else {
      this.$router.push({ path: "/certification" })
    }

  },
  methods: {
    openBack() {
      if (this.status2) {
        this.$router.push({ path: "/myInfo/myIndex" });
      } else {
        window.history.back();
      }
    },
    jumpIndex() {
      this.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
    },
    jumpCer() {
      this.$router.push({ path: "/certification" })
    }
  }
}

</script>
<style scoped>
.h-content {
  padding: 20px
}

.h-content .imgs-content {
  text-align: center
}

.h-content .imgs-content img {
  width: 50%
}

.h-content .status {
  color: #A4A4A4;
  padding: 50px 0;
  font-size: 14px;
}

.h-content .status .fontStauts {
  color: #000
}

.h-content .jump {
  text-align: center;
  color: #A4A4A4
}

.h-content .jump p {
  padding: 15px
}

.h-content .textalign {
  text-align: center;
  color: #A4A4A4
}

</style>
