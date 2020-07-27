<script>
import verify from "./verify";
import cardType from './../assets/json/cardType.json';
var arro = ["51", "52", "53", "59", "11", "13", "19"],
  arre = ["91", "92", "93"];
export default {
  Public: {

    // 身份证号部分加密
    idCardEncryption:function(idNo){
    if(idNo.length == 15){
        return idNo.replace(/(\d{6})\d{6}(\d{3})/, "$1******$2");
      } else {
        return idNo.replace(/(\d{5})\d{6}(\d{6})/, "$1******$2");
      }
    },

/**
     * 获取证件类型text值
     */
    cardTypeChange: function(value1, value2) {
      var cardTypeData = cardType.result,
        idType = '',
        relationType = '';
      for (var i = 0; i < cardTypeData.length; i++) {
        var item = cardTypeData[i];
        if (item.parentType.display == value1) {
          idType = item.parentType.text;
        }
        var list = item.items;
        for (var j = 0; j < list.length; j++) {
          var listItem = list[j];
          if (listItem.display == value2) {
            relationType = listItem.text;
          }
        }
      }
      return [idType, relationType]
    },
    /**
     * 获取证件类型display值
     */
    cardTypeChangeTxt: function(value1, value2) {
      var cardTypeData = cardType.result,
        txt = '',
        idTypeTxt = '',
        relationTypeTxt = '';
      if (value1 == '' && value1 == 'Other' && value2 == '' && value2 == 'Other') {
        txt = '';
      } else {
        for (var i = 0; i < cardTypeData.length; i++) {
          var item = cardTypeData[i];
          if (item.parentType.text == value1) {
            idTypeTxt = item.parentType.display;
          }
          var list = item.items;
          for (var j = 0; j < list.length; j++) {
            var listItem = list[j];
            if (listItem.text == value2) {
              relationTypeTxt = listItem.display;
            }
          }
        }
        txt = idTypeTxt + ' - ' + relationTypeTxt
      }

      return txt;
    },
  // 计算相隔几天
  countData(startTime,endTime){
           var date1=new Date(startTime);
           var date2=new Date(endTime);
           var date=(date2.getTime()-date1.getTime())/(1000*60*60*24);/*不用考虑闰年否*/
           return date;
       },
    /**
     * 通过证件号来判断性别 出生日期
     */
    checkBirthday: function(thisVal) {
      var tmpStr = "",
        sexStr = "";
      var iIdNo = $.trim(thisVal); //$.trim()函数用于去除字符串两端的空白字符。
      if (verify.validate.IsIDCard(thisVal)) {
        if (iIdNo.length == 15) {
          tmpStr = iIdNo.substring(6, 12);
          tmpStr = "19" + tmpStr;
          tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
          sexStr = parseInt(iIdNo.substring(14, 1), 10) % 2 ? "Male" : "Female";
        } else {
          tmpStr = iIdNo.substring(6, 14);
          tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
          sexStr = parseInt(iIdNo.substring(17, 1), 10) % 2 ? "Male" : "Female";
        }
        return [sexStr, tmpStr]
      } else {
        return ['', ''];
      }
    },
    /**
     * 获取链接参数 解决汉字乱码问题
     * @param {String} name
     */
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var hrefIndex = window.location.href.indexOf("?");
      var r = window.location.href.substr(hrefIndex).substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    /**
     * 移除数组中指定值
     * @param {Array} arr
     * @param {String} val
     */
    removeByValue: function(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    /**
     * 深度拷贝
     */
    deepClone: function(obj) {
      var _tmp, result;
      _tmp = JSON.stringify(obj);
      result = JSON.parse(_tmp);
      return result;
    },
    // 获取当前日期
    GetDateStr: function(AddDayCount) { //定义时间点
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      var d = dd.getDate();
      if (m < 10) m = '0' + m;
      if (d < 10) d = '0' + d;
      return y + "-" + m + "-" + d;
    },
      // 获取当前完整时间
    GetDateTimeStr: function(AddDayCount) { //定义时间点
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      var d = dd.getDate();
      var h = dd.getHours();
      var min = dd.getMinutes() + 25;
      if(min >= 60){
        min = min - 60;
        h = h + 1;
        if(h >= 24){
          h = h - 24;
          d = d + 1;
        }
      }
      
      if (d < 10){ d = '0' + d};
      if(h < 10){ h = '0' + h};
      if(min < 10){ min = '0' + min};
      return y + "-" + m + "-" + d  + ' ' + h + ':'+ min + ':00';
    },
    // 中国标准时间转化成'2017-12-28'
    dateString: function(date) {
      date.setDate(date.getDate());
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m < 10) m = '0' + m;
      if (d < 10) d = '0' + d;
      return y + "-" + m + "-" + d;
    },
 datetimeString: function(date) {
      date.setDate(date.getDate());
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours(); //获取系统时，
      var min = date.getMinutes(); //分
      var s = date.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h != null && h < 10) {
        h = "0" + h;
      }
      if (min != null && min < 10) {
        min = "0" + min;
      }
      if(s != '' && s < 10){s = "0" + s}
        return y + "-" + m + "-" + d + " " + h + ":" + min + ":00";
    },

    //new一个Object 封装成json提交
    getArrayInfo: function(data, postParam, pre) {
      for (var i = 0; i < data.length; i++) {
        for (j in data[i]) {
          postParam[pre + "[" + i + "]." + j] = data[i][j];
        }
      }
    },
    /**
     * 实时校验证件号对应属性
     */
    judgeCarType: function($this, thisVal, orgName, cardType, relationPeopleType, carTypeUrl) {
      var isApiCheck = false,
        thisVal = thisVal.replace(/\s/g, "");

      function frontCodeFun(frontCode) {
        this.removeErr($this)
        if (arro.indexOf(frontCode) != -1) {
          if (!relationPeopleType == 'Enterprise') { //企业
            this.errShow($this, '输入的证件号码与选择类型不否，请检查');
            return
          }
        } else if (arre.indexOf(frontCode) != -1) { //组织
          if (!relationPeopleType == 'Organization') {
            this.errShow($this, '输入的证件号码与选择类型不否，请检查');
            return
          }
        }
      }
      if (!thisVal) {
        this.errShow($this, "请输入证件号");
      } else {
        if (cardType == 'IdCard') {
          if (verify.validate.IsIDCard(thisVal) == false) {
            this.errShow($this, '证件号无效，不是合法的证件号');
          } else {
            this.removeErr($this)
          }
        } else if (relationPeopleType == 'Enterprise' || relationPeopleType == 'Organization') {
          if (thisVal.length == 10 && verify.validate.isOrganizationCode(thisVal)) {
            if (isApiCheck == false) {
              $.ajax({
                async: false,
                type: "GET",
                data: { orgCode: thisVal.toLowerCase(), orgName: orgName },
                url: carTypeUrl,
                success: function(data) {
                  var data = data.result;
                  if (data) {
                    isApiCheck = true;
                    for (var i = 0; i < data.length; i++) {
                      var item = data[i];
                      if (item.orgCode == thisVal) {
                        var frontCode = item.creditCode.substring(0, 2);
                        frontCodeFun(frontCode);
                      }
                    }
                  }
                }
              });
            }
          } else if (thisVal.length == 18 && verify.validate.isOrganization(thisVal)) {
            var frontCode = thisVal.substring(0, 2);
            frontCodeFun(frontCode);
          } else {
            this.errShow($this, '证件号无效，不是合法的证件号');
          }
        } else if (cardType == 'MacHKerPassport' && cardType == 'TaiwanesePassport') {
          this.removeErr($this)
        }
      }
    },
     judgeIDCard: function(input) {
      // input = input.toUpperCase();
      //验证身份证号码格式 [一代身份证号码为15位的数字；二代身份证号码为18位的数字或17位的数字加字母X]  
      if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(input))) {
        return false;
      }
      //验证省份  
      var arrCity = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      };
      if (arrCity[parseInt(input.substr(0, 2))] == null) {
        // Toast('请输入有效的车主证件号');
        return false;
      }
      //验证出生日期  
      var regBirth, birthSplit, birth;
      var len = input.length;
      if (len == 15) {
        regBirth = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        birthSplit = input.match(regBirth);
        birth = new Date('19' + birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
        if (!(birth.getYear() == Number(birthSplit[2]) && (birth.getMonth() + 1) == Number(birthSplit[3]) && birth.getDate() == Number(birthSplit[4]))) {
        //  Toast('请输入有效的车主证件号');
         return false;
        }
        return true;
      } else if (len == 18) {
        regBirth = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i);
        birthSplit = input.match(regBirth);
        birth = new Date(birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
        if (!(birth.getFullYear() == Number(birthSplit[2]) && (birth.getMonth() + 1) == Number(birthSplit[3]) && birth.getDate() == Number(birthSplit[4]))) {
        
        return false;
        }
        //验证校验码  
        var valnum;
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0,
          i;
        for (i = 0; i < 17; i++) {
          nTemp += input.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != input.substr(17, 1)) {
          // Toast('请输入有效的车主证件号');
          return false;
        }
        return true;
      }
      return false;
    },


    errShow: function($this, txt) {
      $this.next('.mt-err-tip').show();
      $this.next('.mt-err-tip').text(txt);
      $this.focus();
      return false;
    },
    removeErr: function($this) {
      $this.next('.mt-err-tip').hide();
      $this.next('.mt-err-tip').text("");
      return true;
    }
  }
}

</script>