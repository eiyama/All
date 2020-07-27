<template>
  <div class="friends" style="background-color:#FFF">
    <mt-header fixed class="def-header" title="我的团队">
      <div slot="left" v-show='!isShare'>
        <mt-button @click="openBack" icon="back"></mt-button>
      </div>
    </mt-header>
    <!--字母列表-->
    <div class="letter">
      <ul>
        <li v-for="item in friends" @click="naver(item.letter)">{{item.letter}}</li>
      </ul>
    </div>
    <!--城市列表-->
    <div class="friend-content">
      <div class="friend">
        <div class="friend-list">
          <div v-for="item in friends">
            <div class="icon-letter"><a :id="item.letter">{{item.letter}}</a></div>
            <p v-for="friend in item.friendlist" v-html="friend.nickName"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="non-data" v-show="noData">
      <p>亲，您还没有好友哦，赶快去邀请吧!</p>
    </div>
    <mt-button class="btn-fixed" type="primary" size="large" @click="goInvite">邀请好友</mt-button>
    <div id="tipBox">{{tipString}}</div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from './../../common/Axios';
import { Toast, Indicator } from 'mint-ui';
import pinyin from '../../../static/lib/web-pinyin/bundle.js'
export default {
  name: 'friends',
  data() {
    return {
      appId: 0,
      show: false,
      friends: [],
      letter: [],
      tipString: '',
      noData: true,
      isShare: false
    }
  },
  methods: {
    openBack: function() {
      /*var appIdParam = {
          appId: this.appId
      }
      this.$router.push({path:"/",query:appIdParam});*/
      window.history.back();
    },
    buildLetter: function() { // 构建字母项
      this.letter = []
      for (var i = 0; i < 26; i++) {
        var obj = {}
        obj.letter = String.fromCharCode((65 + i))
        obj.friendlist = []
        this.letter.push(obj)
      }
    },
    friendData: function(data) {
      var self = this;
      if (data.status == 200) {
        if (data.result) {
          self.noData = false;
          /* 城市和城市代码去重*/
          var UserIds = [],
            NickNames = [];
          for (var i = 0; i < data.result.length; i++) {
            UserIds.push(data.result[i].userId);
            NickNames.push(data.result[i].nickName);
          }
          var qUserId = UserIds.unique(),
            qNickName = NickNames.unique(),
            arr = [];
          for (var j = 0; j < qNickName.length; j++) {
            var obj = {};
            obj.userId = qUserId[j];
            obj.nickName = qNickName[j];
            obj.appId = self.appId;
            arr.push(obj);
          }
          if (data.result.length > 0) {
            self.buildItem(arr)
          } else {
            self.noData = true;
          };
        } else {
          self.noData = true;
        }

      }
    },
    buildItem: function(friendNamesFilter) { // 构建城市
      var self = this,
        friendsArr = [];
      self.buildLetter()
      for (var i = 0; i < 26; i++) {
        self.letter[i].friendlist = []
      }
      for (var i = 0; i < friendNamesFilter.length; i++) {
        var _index = Number(self.getFirstLetter(friendNamesFilter[i].nickName).charCodeAt() - 65)
        if (_index >= 0 && _index < 26) {
          self.letter[_index].friendlist.push(friendNamesFilter[i])
        }
      }
      for (var i = 0; i < self.letter.length; i++) {
        var letterItem = self.letter[i];
        if (letterItem.friendlist.length > 0) {
          friendsArr.push(letterItem)
        }
      }
      self.friends = friendsArr;
    },
    getFirstLetter: function(str) { //  得到城市第一个字的首字母
      return pinyin.pinyin(str)[0][0].charAt(0).toUpperCase()
    },
    naver: function(id) { // 点击右边字母滚动
      this.tipString = id
      var obj = document.getElementById(id)
      var tip = document.getElementById('tipBox')
      tip.setAttribute('class', 'tipAppear')
      setTimeout(function() {
        tip.removeAttribute('class')
      }, 500)
      var oPos = obj.offsetTop
      return window.scrollTo(0, oPos - 36)
    },
    goInvite: function() {
      this.appId = localStorage.getItem('appId');
      this.nickName = sessionStorage.getItem('nickName');
      this.referralCode = sessionStorage.getItem('referralCode');
      this.title = sessionStorage.getItem('title');
      this.referrerMobile = sessionStorage.getItem('accountName');

      var localToken = localStorage.getItem('token');
      if (localToken) {
        localToken = localToken.replace(this.appId + '_', '');
      }
      var url = "/myInfo/myInviteQr?appId=" + this.appId + "&nickName=" + this.nickName + "&title=" + this.title +
        "&referrerMobile=" + this.referrerMobile + "&token=" + encodeURIComponent(localToken);
      this.$router.push({ path: url });
    }
  },
  mounted: function() {

    var len = window.history.length;
    if (len <= 2) {
      this.isShare = true;
    };

    var self = this;
    this.appId = localStorage.getItem('appId');
    /* 请求会员好友列表   */
    Indicator.open('加载中...');
    var userId = sessionStorage.getItem('userIds')
    axiosGetAPI('/Users/' + userId + '/Referrals').then((res) => {
      Indicator.close();
      self.friendData(res);
    });
  }
}

</script>
<style scoped>
.friends .friend-content {
  padding: 50px 4%;
  width: 88%;
}

.friends .letter {
  width: auto;
  position: fixed;
  top: 10%;
  right: 10px;
  text-align: center
}

.friends .letter ul li {
  text-decoration: none;
  color: #00C7C7;
  font-size: 18px
}

.friends .friend {
  width: 100%;
  overflow: hidden;
}

.friends .friend-list {
  width: 100%
}

.friends .friend-list .friend-letter {
  font-size: 20px;
  display: inline-block;
  padding-top: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e8ecf1;
  width: 100%
}

.friends .friend-list .icon-letter {
  margin-top: 20px;
}

.friends .friend-list p {
  color: #666666;
  width: 95%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e8ecf1;
  cursor: pointer
}

.friends .UISelect {
  margin-top: 5px
}

#tipBox {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #333333;
  width: 100px;
  height: 100px;
  z-index: 10;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
  opacity: 0;
}

.tipAppear {
  animation: appearTip 1 linear 0.5s;
}

@keyframes appearTip {
  0% {
    opacity: 1;
  }

  80% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

</style>
