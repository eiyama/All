import Vue from 'vue';
import wx from 'weixin-js-sdk';
import { axiosGetAPI } from './../../common/Axios';
import { Indicator } from 'mint-ui';
//微信分享
const wxShare = (obj, callback) => {
  if (obj) {
    var title = obj.title == undefined || obj.title == null ? '' : obj.title;
    var shareLink = obj.shareLink == undefined || obj.shareLink == null ? window.location.href : obj.shareLink;
    var description = obj.description == undefined || obj.description == null ? '' : obj.description;
    var shareImg = obj.shareImg == undefined || obj.shareImg == null ? '' : obj.shareImg;
    var debug = obj.debug == true ? true : false;
  } else {
    // alert('请传分享参数');
  }
  //微信分享
  var wxUrl = window.location.href.split('#')[0];
  var url = '/Configurations?types=weixin&weixin_url=' + encodeURIComponent(wxUrl);
   Indicator.open('加载中...');
  axiosGetAPI(url).then((res) => {
     Indicator.close();
    if (res.status == 200 && res.result && res.result.weixin) {
      var weixin = res.result.weixin;
      wx.config({
        debug: false, // 开启调试模式,
        appId: weixin.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: weixin.timestamp, // 必填，生成签名的时间戳
        nonceStr: weixin.nonceStr, // 必填，生成签名的随机串
        signature: weixin.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData','closeWindow']
      });      
 
      wx.ready(function() { //通过ready接口处理成功验证
        // config信息验证成功后会执行ready方法
        wx.updateAppMessageShareData({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
        title: title, // 分享标题
        desc: description, // 分享描述
        link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareImg, // 分享图标
        success: function() {
            // 设置成功
        }
        });
        wx.updateTimelineShareData({ //分享朋友圈
        title: title, // 分享标题
        desc: description, // 分享描述
        link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareImg, // 分享图标
        success: function() {
            // 设置成功
        }
        });
    });
    wx.error(function(res) { //通过error接口处理失败验证
        // config信息验证失败会执行error函数
        // console.log(res);
        // alert(JSON.parse(res));
    });
    }
  });
 
}

export {
  wxShare
}
 