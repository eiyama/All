<script>
import Vue from "vue";
import verify from "vue-verify-plugin";

var myRules = {
    isRequired: {
      test: function(val) {
        if (val == '') return false
        return true;
      },
      message: '是必填项'
    },
    plateNo: {
      test: function(val) {
        if (!new RegExp(/^[A-Za-z\u4e00-\u9fa5]{1}[\u4E00-\u9FA5\w\d]{5,9}$/g).test(val.toUpperCase())) return false
        return true;
      },
      message: '车牌号格式不正确'
    },
    phone: {
      test: /^1[34578]\d{9}$/,
      message: "手机号格式不正确"
    }
  },
  arro = ["51", "52", "53", "59", "11", "13", "19"],
  arre = ["91", "92", "93"];

Vue.use(verify, {
  rules: myRules,
  blur: true
});

export default {
  validate: {
    plateNo: function(plateNo) { /*验证手机号码*/
      var bool = /^[A-Za-z\u4e00-\u9fa5]{1}[\u4E00-\u9FA5\w\d]{5,9}$/.test(plateNo.toUpperCase());
      if (bool) {
        return true
      } else {
        return false
      }
    },
    //验证字符串非空  
    IsNotEmpty: function(input) {
      if (input != '') {
        return true;
      } else {
        return false;
      }
    },
    //验证数字(double类型) [可以包含负号和小数点]  
    IsNumber: function(input) {
      var regex = /^-?\d+$|^(-?\d+)(\.\d+)?$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证整数  
    IsInteger: function(input) {
      var regex = /^-?\d+$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证非负整数  
    IsIntegerNotNagtive: function(input) {
      var regex = /^\d+$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证正整数  
    IsIntegerPositive: function(input) {
      var regex = /^[0-9]*[1-9][0-9]*$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证小数  
    IsDecimal: function(input) {
      var regex = /^([-+]?[1-9]\d*\.\d+|-?0\.\d*[1-9]\d*)$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证只包含英文字母  
    IsEnglishCharacter: function(input) {
      var regex = /^[A-Za-z]+$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证只包含数字和英文字母  
    IsIntegerAndEnglishCharacter: function(input) {
      var regex = /^[0-9A-Za-z]+$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证只包含汉字  
    IsChineseCharacter: function(input) {
      var regex = /^[\u4e00-\u9fa5]+$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证数字长度范围（数字前端的0计长度）[若要验证固定长度，可传入相同的两个长度数值]  
    IsIntegerLength: function(input, lengthBegin, lengthEnd) {
      var pattern = '^\\d{' + lengthBegin + ',' + lengthEnd + '}$';
      var regex = new RegExp(pattern);
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    isOrganization: function(input) { // 企业车主组织机构 证件号校验
      var arr = ['51', '52', '53', '59', '11', '12', '13', '19', '91', '92', '93'];
      var regex = /^[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$/;
      if (input.match(regex) && arr.indexOf(input.substring(0, 2)) != -1) {
        return true;
      } else {
        return false;
      }
    },
    isOrganizationCode: function(input) { //十位数证件号校验
      var regex = /^([a-zA-Z0-9]{8}-[a-zA-Z0-9])$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证字符串包含内容  
    IsStringInclude: function(input, withEnglishCharacter, withNumber, withChineseCharacter) {
      if (!Boolean(withEnglishCharacter) && !Boolean(withNumber) && !Boolean(withChineseCharacter)) {
        return false; //如果英文字母、数字和汉字都没有，则返回false  
      }
      var pattern = '^[';
      if (Boolean(withEnglishCharacter)) {
        pattern += 'a-zA-Z';
      }
      if (Boolean(withNumber)) {
        pattern += '0-9';
      }
      if (Boolean(withChineseCharacter)) {
        pattern += '\\u4E00-\\u9FA5';
      }
      pattern += ']+$';
      var regex = new RegExp(pattern);
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证字符串长度范围 [若要验证固定长度，可传入相同的两个长度数值]  
    IsStringLength: function(input, LengthBegin, LengthEnd) {
      var pattern = '^.{' + lengthBegin + ',' + lengthEnd + '}$';
      var regex = new RegExp(pattern);
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证字符串长度范围（字符串内只包含数字和/或英文字母）[若要验证固定长度，可传入相同的两个长度数值]  
    IsStringLengthOnlyNumberAndEnglishCharacter: function(input, LengthBegin, LengthEnd) {
      var pattern = '^[0-9a-zA-z]{' + lengthBegin + ',' + lengthEnd + '}$';
      var regex = new RegExp(pattern);
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证字符串长度范围 [若要验证固定长度，可传入相同的两个长度数值]  
    IsStringLengthByInclude: function(input, withEnglishCharacter, withNumber, withChineseCharacter, lengthBegin, lengthEnd) {
      if (!withEnglishCharacter && !withNumber && !withChineseCharacter) {
        return false; //如果英文字母、数字和汉字都没有，则返回false  
      }
      var pattern = '^[';
      if (Boolean(withEnglishCharacter))
        pattern += 'a-zA-Z';
      if (Boolean(withNumber))
        pattern += '0-9';
      if (Boolean(withChineseCharacter))
        pattern += '\\u4E00-\\u9FA5';
      pattern += ']{' + lengthBegin + ',' + lengthEnd + '}$';
      var regex = new RegExp(pattern);
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证字符串字节数长度范围 [若要验证固定长度，可传入相同的两个长度数值；每个汉字为两个字节长度]  
    IsStringByteLength: function(input, lengthBegin, lengthEnd) {
      var regex = /[^\x00-\xff]/g;
      var byteLength = input.replace(regex, 'ok').length;
      if (byteLength >= lengthBegin && byteLength <= lengthEnd) {
        return true;
      } else {
        return false;
      }
    },
    //验证日期 [只能验证日期，不能验证时间]  
    IsDateTime: function(input) {
      var regex = /((19|20)[0-9]{2})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
      if (regex.test(input)) {
        var ymd = input.match(/(\d{4})-(\d+)-(\d+).*/);
        var year = parseInt(ymd[1]);
        var month = parseInt(ymd[2]);
        var day = parseInt(ymd[3]);
        if (day > 28) {
          //获取当月的最后一天
          var lastDay = new Date(year, month, 0).getDate();
          return (lastDay >= day);
        }
        return true;
      } else {
        return false;
      }
    },
    //验证固定电话号码 [3位或4位区号；区号可以用小括号括起来；区号可以省略；区号与本地号间可以用减号或空格隔开；可以有3位数的分机号，分机号前要加减号]  
    IsTelePhoneNumber: function(input) {
      var regex = /^(((0\d2|0\d{2})[- ]?)?\d{8}|((0\d3|0\d{3})[- ]?)?\d{7})(-\d{3})?$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证电话号码和手机号（可以是固定电话号码或手机号码） 
    IsTeleMobilePNumber: function(input) {
      var rege = /^\d{3,4}\-\d{7,8}$/;
      var regex = /^((\+)?86|((\+)?86)?)0?1[34578]\d{9}$/;
      if (input.match(rege) || input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证手机号码 [可匹配"(+86)013325656352"，括号可以省略，+号可以省略，(+86)可以省略，11位手机号前的0可以省略；11位手机号第二位数可以是3、4、5、8中的任意一个]  
    IsMobilePhoneNumber: function(input) {
      var regex = /^((\+)?86|((\+)?86)?)0?1[34578]\d{9}$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证电话号码（可以是固定电话号码或手机号码）  
    IsPhoneNumber: function(input) {
      var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$|^(((0\d2|0\d{2})[- ]?)?\d{8}|((0\d3|0\d{3})[- ]?)?\d{7})(-\d{3})?$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证邮政编码  
    IsZipCode: function(input) {
      var regex = /^\d{6}$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证电子邮箱 [@字符前可以包含字母、数字、下划线和点号；@字符后可以包含字母、数字、下划线和点号；@字符后至少包含一个点号且点号不能是最后一个字符；最后一个点号后只能是字母或数字]  
    IsEmail: function(input) {
      ////邮箱名以数字或字母开头；邮箱名可由字母、数字、点号、减号、下划线组成；邮箱名（@前的字符）长度为3～18个字符；邮箱名不能以点号、减号或下划线结尾；不能出现连续两个或两个以上的点号、减号。  
      //var regex = /^[a-zA-Z0-9]((?<!(\.\.|--))[a-zA-Z0-9\._-]){1,16}[a-zA-Z0-9]@([0-9a-zA-Z][0-9a-zA-Z-]{0,62}\.)+([0-9a-zA-Z][0-9a-zA-Z-]{0,62})\.?|((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;  
      var regex = /^([\w-\.]+)@([\w-\.]+)(\.[a-zA-Z0-9]+)$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证网址（可以匹配IPv4地址但没对IPv4地址进行格式验证；IPv6暂时没做匹配）[允许省略"://"；可以添加端口号；允许层级；允许传参；域名中至少一个点号且此点号前要有内容]  
    IsURL: function(input) {
      ////每级域名由字母、数字和减号构成（第一个字母不能是减号），不区分大小写，单个域长度不超过63，完整的域名全长不超过256个字符。在DNS系统中，全名是以一个点“.”来结束的，例如“www.nit.edu.cn.”。没有最后的那个点则表示一个相对地址。   
      ////没有例如"http://"的前缀，没有传参的匹配  
      //var regex = /^([0-9a-zA-Z][0-9a-zA-Z-]{0,62}\.)+([0-9a-zA-Z][0-9a-zA-Z-]{0,62})\.?$/;  

      //var regex = /^(((file|gopher|news|nntp|telnet|http|ftp|https|ftps|sftp)://)|(www\.))+(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(/[a-zA-Z0-9\&%_\./-~-]*)?$/;  
      var regex = /^([a-zA-Z]+:\/\/)?([\w-\.]+)(\.[a-zA-Z0-9]+)(:\d{0,5})?\/?([\w-\/]*)\.?([a-zA-Z]*)\??(([\w-]*=[\w%]*&?)*)$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证IPv4地址 [第一位和最后一位数字不能是0或255；允许用0补位]  
    IsIPv4: function(input) {
      var regex = /^(25[0-4]|2[0-4]\d]|[01]?\d{2}|[1-9])\.(25[0-5]|2[0-4]\d]|[01]?\d?\d)\.(25[0-5]|2[0-4]\d]|[01]?\d?\d)\.(25[0-4]|2[0-4]\d]|[01]?\d{2}|[1-9])$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证IPv6地址 [可用于匹配任何一个合法的IPv6地址]  
    IsIPv6: function(input) {
      var regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },

    luhnCheck: function(bankno) {
      var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）

      var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
      var newArr = new Array();
      for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
      }
      var arrJiShu = new Array(); //奇数位*2的积 <9
      var arrJiShu2 = new Array(); //奇数位*2的积 >9

      var arrOuShu = new Array(); //偶数位数组
      for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
          if (parseInt(newArr[j]) * 2 < 9)
            arrJiShu.push(parseInt(newArr[j]) * 2);
          else
            arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
          arrOuShu.push(newArr[j]);
      }

      var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
      var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
      for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
      }

      var sumJiShu = 0; //奇数位*2 < 9 的数组之和
      var sumOuShu = 0; //偶数位数组之和
      var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
      var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
      var sumTotal = 0;
      for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
      }

      for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
      }

      for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
      }
      //计算总和
      sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

      //计算luhn值
      var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
      var luhn = 10 - k;

      if (lastNum == luhn) {
        console.log("验证通过");
        return true;
      } else {
        console.log("银行卡号必须符合luhn校验");
        return false;
      }
    },

    //检查银行卡号
    CheckBankNo: function(bankno) {
      var bankno = bankno.replace(/\s/g, '');
      if (bankno == "") {
        console.log("请填写银行卡号");
        return false;
      }
      if (bankno.length < 16 || bankno.length > 19) {
        console.log("银行卡号长度必须在16到19之间");
        return false;
      }
      var num = /^\d*$/; //全数字
      if (!num.exec(bankno)) {
        console.log("银行卡号必须全为数字");
        return false;
      }
      //开头6位
      var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
      if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
        console.log("银行卡号开头6位不符合规范");
        return false;
      }
      //Luhn校验
      if (!validator.luhnCheck(bankno)) {
        return false;
      }
      return true;
    },
    //验证证件号
    checkIdCard: function(val, idType, relationType) {
      var frontCode = val.substring(0, 2);
      if (val.length == 10) {
        if (!this.isOrganizationCode(val)) return false
      } else if (val.length > 10) {
        if (idType == 'IdCard') {
          if (!this.IsIDCard(val)) return false
        }
        if (relationType == 'Enterprise') {
          if (arro.indexOf(frontCode) != -1 && !this.isOrganization(val)) return false
        }
        if (relationType == 'Organization') {
          if (arre.indexOf(frontCode) != -1 && !this.isOrganization(val)) return false
        }
      } else {
        return false
      }
      return true;
    },
    //验证身份证号 [可验证一代或二代身份证]  
    IsIDCard: function(input) {
      input = input.toUpperCase();
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
          return false;
        }
        return true;
      }
      return false;
    },
    //验证经度  
    IsLongitude: function(input) {
      var regex = /^[-\+]?((1[0-7]\d{1}|0?\d{1,2})\.\d{1,5}|180\.0{1,5})$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证纬度  
    IsLatitude: function(input) {
      var regex = /^[-\+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    //验证时间大于明天
    IsLessThanTomorrow: function(day) {
      var mydate = new Date();
      var str = "" + mydate.getFullYear() + "-";
      str += (mydate.getMonth() + 1) + "-";
      str += mydate.getDate();

      var tody = str,
        start = Date.parse(new Date(day)),
        end = Date.parse(new Date(tody));
      return (start - end) / 1000 / 3600 / 24;
    }
  }
}

</script>