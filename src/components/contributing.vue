<template>
  <div class="contributing" style="background-color:#FFF">
    <mt-header fixed class="def-header" title="添加特约">
      <div slot="left">
        <mt-button @click="openBack" icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="container">
      <div class="con-header">
        <div style="height:15px;background:#f9f9f9"></div>
        <div class="insurance">
          <span class="color">保险公司：</span><span>{{insCorpName}}</span>
        </div>
        <!-- <mt-field label="保险公司：" placeholder="" v-model="insCorpName" disabled></mt-field> -->
        <div class="selected">
          <div class="tit color">险种类别</div>
          <div class="chooes" @click="riskTypes">
            <span  style="color:#999" v-if="chooes == '请选择'" >{{chooes}}</span>
            <span style="color:#333" v-else>{{chooes}} </span>
          </div>
        </div>
      </div>
      <div class="tipBox">
          <p class="tip">请在输入框中输入特约条款进行检索，然后完整填写条款内容</p>
      </div>
      <div class="con-body">
        <p class="tip" style="color:red" v-show="insCorpCode=='picc'">自定义特约代码：000038</p>
        <p class="tip" style="color:red" v-show="insCorpCode=='cpic' && shortName == 'BZ'">交强险自定义特约代码：BZZDY</p>
        <p class="tip" style="color:red" v-show="insCorpCode=='cpic' && shortName == 'BS'">交强险自定义特约代码：BSZDY</p>
        <div class="searchContent">
          <label style="line-height:39px;width: 70px;">特约码</label>
          <div class="sl">
            <input class="search" type="text" v-model="searchText" placeholder="请输入特约条款代码" />
            <!-- <div class="searchr" :style="isStyle" @click="searchAll"> <span :class="{iconup:!listShow}" class="iconDonw"></span></div> -->
           <div class="searchr">
             <van-icon  :style="isStyle" color="#D2D2D2" name="arrow" @click="searchAll" />
          </div> 
            <div class="asb" v-show="listShow">
              <div class="asbList">
                <div class="asbItem" v-for="item in lists" @click="searchCode(item.code)">
                  {{item.code}}
                </div>
              </div>
            </div>
          </div>
          <div class="sr" @click="searchCode('')"><i style="font-size:18px;color:#4A66FE;font-weight: bold;" class="mintui mintui-search"></i></div>
        </div>
      </div>
      <div class="getDataCentent" v-show="special&&isadd">
        <!-- special&&isadd -->
        <p class="title">{{specialAgreementName}}</p>
        <h4 class="cont">特约内容：</h4>
        <div name="" id="" class="textarea" v-html="textareas"></div>
        <button  @click="addbtn" type="button" class="btn">增加</button>
      </div>
      <div class="list" v-show="!isadd">
        <div class="item" v-for='(items,index)  in listAdd' :key="index">
          {{'[' + items.code + ']' + items.name}}
          <p class="cont">特约内容:</p>
          <div class="content" v-text="items.newContent ? items.newContent : items.content">
          </div>
          <bottom class="btns" type="button" @click="del(index, items)">删除</bottom>
        </div>
      </div>
    </div>
    
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
    <mt-button class="btn-fixed" type="primary" size="large" @click="saveAndCommit">{{btnText}}</mt-button>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI, axiosPutAPI, axiosDeleteAPI } from './../common/Axios';
import { Toast, Indicator } from 'mint-ui';
export default {
  data() {
    return {
      value: '123',
      isadd: true,
      special: false,
      searchText: '',
      specialAgreementName: '',
      specialAgreementCode: '',
      textareas: '以上或全损，车辆被盗的客户办理%12%理赔时，需要梅赛德斯-奔驰%5%租赁有限公司出具还款明细。',
      textareasContent: "",
      lists: [],
      listShow: false,
      isStyle: {},
      sheetVisible: false,
      shortName: '',
      chooes: '请选择',
      actions: [],
      listAdd: [],
      pushContent: [],
      agArr: [], //存放特约内容
      agNum: [], //存放特约input里的长度
      insCorpName: '',
      insCorpCode: '',
      insBatchNo: '',
      from: '',
      btnText: "重新核保",
      RiskValue:'',
      specialCode:[],
    }
  },
  created() {
    this.insCorpName = this.$route.query.insCorpName;
    this.insCorpCode = this.$route.query.insCorpCode;
    this.insBatchNo = this.$route.query.insBatchNo;
    if(sessionStorage.getItem('RiskValue')){
        this.RiskValue = sessionStorage.getItem('RiskValue');
        this.chooes = this.RiskValue;
        if(this.chooes == '商业险'){
          this.shortName = 'BS'
        }
        if(this.chooes == '交强险'){
          this.shortName = 'BZ'
        }
      //      this.shortName = type;
      // if (type == 'BZ') {
      //   this.chooes = '交强险'
      // } else {
      //   this.chooes = '商业险'
      // }
    }
    
    this.from = this.$route.query.from;
    if (this.from == 'detail') {
      this.btnText = '保存';
    }
    //获取已经添加的特约
    var url = '/vi/insurePolicies' + '/' + this.insBatchNo + '/' + this.insCorpCode + '/specialAgreements';
    axiosGetAPI(url).then((res) => {
      // console.log(res);
      if (res.status == 200) {
        if (res.result && res.result.length > 0) {
          var obj = res.result;
          this.listAdd = obj;
          this.isadd = false;
        } else {
          this.listAdd = [];
          this.isadd = true;
          if(sessionStorage.getItem('specialCode')){
              this.specialCode = JSON.parse(sessionStorage.getItem('specialCode'));
              for(var i = 0;i < this.specialCode.length ; i++){
                this.setSpefialList(this.specialCode[i]);
              }
          }
        }
      } else {
        this.listAdd = [];
        this.isadd = true;
      }
    });
  },
  methods: {
    setSpefialList(code){
      var self = this;
     var url = '/vi/insurePolicies/' + this.insBatchNo + '/' + this.insCorpCode + '/specialAgreements/schema?searchType='+ this.shortName + '&searchKey=' + code;
    //  self.listAdd = [];
     axiosGetAPI(url).then(res=>{
       if(res.result.length > 0){
         for(var i = 0 ; i < res.result.length ; i ++ ){
           var item = res.result[i];
             var obj = {
            code: item.code,
            name: item.name,
            content: item.content,
            // newContent: self.textareas,
            type: self.shortName,
            // parameters: self.pushContent, //self.pushContent
            id: 0,
            editable: false
          }
         self.listAdd.push(obj);
          //  self.listAdd.push(res.result[i]) 
         }
         self.isadd = false;
       }
      //  console.log(self.listAdd); 
     })

    },
    riskTypeName(type) {
      this.shortName = type;
      if (type == 'BZ') {
        this.chooes = '交强险'
      } else {
        this.chooes = '商业险'
      }
    },
    riskTypes: function() {
      var self = this;
      self.sheetVisible = !self.sheetVisible;
      self.actions = [{
          name: '交强险',
          method: function() {
            self.riskTypeName('BZ');
          }
        },
        {
          name: '商业险',
          method: function() {
            self.riskTypeName('BS');
          }
        }
      ]
    },
    //点击查询条款代码
    searchCode(code) {
      var self = this;
      var pUrl = code == 'up' ? '' : ('&searchKey=' + (code || self.searchText));
      if ((!self.searchText) && pUrl && self.lists.length == 0) {
        self.$toast('请输入条款代码！');
        return;
      }
      if (!self.shortName) {
        self.$toast('请选择险种类别');
        return;
      }
      if (self.listShow && code == 'up') {
        self.isStyle = {
          top: '5px'
        }
        return;
      } else {
        self.isStyle = {
          top: '3px'
        }
      }

      //console.log(this.lists.length);
      Indicator.open();
      self.isadd = true;
      var url = '/vi/insurePolicies' + '/' + self.insBatchNo + '/' + self.insCorpCode + '/specialAgreements/schema?searchType=' + self.shortName + pUrl;
      axiosGetAPI(url).then((res) => {
        self.$nextTick(() => {

          if (res.result.length >= 1) {
            //this.listShow = !this.listShow;
            if (code) {
              self.listShow = !self.listShow;
              self.searchText = code;
            }

            if (res.result.length == 1) {
              self.special = true;
              self.textareas = res.result[0].content;
              self.textareasContent = res.result[0].content;
              var str = self.textareas;

              self.specialAgreementName = res.result[0].name;
              self.specialAgreementCode = res.result[0].code;
              /* var num = str.match(/%(\S*)%/)[1];
              if(num){
                  var input = `<input type="text" class='inp' maxLength=${num}}>`;
                  self.textareas = str.replace(/%.*?%/ig,input);
              } */
              var input = `<input type="text" class='inp' style="width:120px">`;
              if (res.result[0].editable && self.textareas == "%500%") {
                input = `<textarea type="text" class='inp' style="width:98%;height:120px">`;
              }
              var str2 = self.textareas.split('%'),
                agArr = [];

              for (var g = 0; g < str2.length; g++) {
                var itemStr = str2[g];
                if (isNaN(itemStr) || itemStr == '') {
                  agArr.push(itemStr);
                } else {
                  //数字
                  self.agNum.push(itemStr);
                }
              }

              self.agArr = agArr.toString();
              self.textareas = self.agArr.replace(/,/ig, input);
            } else {
              self.listShow = true;
              self.lists = res.result;
            }

          } else {
            self.$toast('暂无数据');
            //self.searchText = '';
          }
        })
        Indicator.close();
      });
    },
    searchAll() {
      var self = this;
      if (!self.shortName) {
        self.$toast('请选择险种类别');
        return;
      }
      //var pUrl = code == 'up'? '' : ('&searchText='+(code||this.searchText));
      if (self.listShow) {
        self.isStyle = {
          top: '5px'
        }
      } else {
        self.isStyle = {
          top: '0px'
        }
      }
      if (self.lists.length > 0) {
        self.listShow = !self.listShow;
        return;
      }
      Indicator.open();
      //this.isadd = true;
      var url = '/vi/insurePolicies' + '/' + self.insBatchNo + '/' + self.insCorpCode + '/specialAgreements?searchType=' + self.shortName;
      axiosGetAPI(url).then((res) => {
        self.$nextTick(() => {
          if (res.result.length >= 1) {
            //点击下拉
            self.listShow = true;
            self.lists = res.result;
            self.listShow = !self.listShow;
          } else {
            self.$toast('暂无数据');
            //self.searchText = '';
          }
        })
        Indicator.close();
      });
    },
    addbtn() {
      var self = this;
      var inp = document.getElementsByClassName('inp');
      self.pushContent = [];
      for (var i = 0; i < inp.length; i++) {
        if (inp[i].value == '') {
          self.$toast('可输入内容不能为空！');
          return;
        }
        self.pushContent.push(inp[i].value);
        var newp = document.createElement("span"); //创建新的节点 p
        newp.innerHTML = inp[i].value; //给新创建的节点p 添加内容

        document.getElementsByClassName('textarea')[0].insertBefore(newp, inp[i])
        inp[i].style.display = 'none';
      }

      self.textareas = document.getElementsByClassName('textarea')[0].innerText;
      var obj = {
        code: self.specialAgreementCode,
        name: self.specialAgreementName,
        content: self.textareasContent,
        newContent: self.textareas,
        type: self.shortName,
        parameters: self.pushContent, //self.pushContent
        id: 0,
        editable: false
      }
      self.listAdd.push(obj);
      self.isadd = !self.isadd;
    },
    del(d, item) {
      this.listAdd.splice(d, 1);
      //DELETE /vi/insurePolicies/{insBatchNo}/{insCorpCode}/specialAgreements/{specialAgreementId}
      if (item.id > 0) {
        var url = '/vi/insurePolicies' + '/' + this.insBatchNo + '/' + this.insCorpCode + '/specialAgreements' + '/' + item.id;
        axiosDeleteAPI(url).then((res) => {
          console.log(res);
        });
      } else {
        if (this.pushContent && this.pushContent.length > 0) {
          this.pushContent.splice(d, 1);
        }
      }
    },
    openBack() {
      window.history.back();
    },
    saveAndCommit() {
      var self = this;
      console.log(self.listAdd)
      if (self.listAdd && self.listAdd.length > 0) {
        Indicator.open('正在保存特约，请稍候');
        var url = '/vi/insurePolicies' + '/' + self.insBatchNo + '/' + self.insCorpCode + '/specialAgreements';
        axiosPostAPI(url, self.listAdd).then((res) => {
          self.$nextTick(() => {
            Indicator.close();
            if (res.status == 200) {
              if (self.from == 'detail') {
                window.history.back();
              } else {
                var url = '/vi/insurePolicies' + '/' + self.insBatchNo + '/' + self.insCorpCode;
                axiosPutAPI(url).then((ress) => {
                  Indicator.close();
                  self.$nextTick(() => {
                    window.history.back();
                  })
                });
              }
            }
          })
        });
      } else{
        Toast('请添加特约');
        return false;
      }
    },
  }
}

</script>
<style>
.btns {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px 12px;
  border: 1px solid #4A66FE;
  border-radius: 5px;
  color: #4A66FE;
}

.color {
  /* color: #b0afaf */
  color: #333;

}

.container {
  padding-top: 44px;
}

.container .con-header {
  /* display: flex; */
  font-size: 14px;
  /* padding: 15px; */
  
  margin-top: 5px;
}

.container .con-header>div,
.container .con-header .selected>div {
  flex: 1
}

.container .con-header .selected {
  display: flex;
  padding:14px 0;
  margin-left: 15px;
}

.container .con-header .selected .chooes::after {
  position: absolute;
  right: 15px;
  top: 5px;
  content: '';
  width: 7px;
  height: 7px;
  border: 1px solid #D2D2D2;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  border-left-color: transparent;
  border-bottom-color: transparent;
}

.container .con-header .selected .chooes,
.sl {
  position: relative;
}

.container .con-header .selected .tit {
  flex: 0 0 70px;
}


.container .con-body {
  padding-left: 15px;
  
}

.container .con-body .searchContent {
  display: flex;
  /* padding: 5px 0; */
  align-items: center;
  height: 48px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.container .con-body .tip {
  color: #686868;
  margin: 10px 0;
}

.container .con-body .searchContent .sr {
  flex: 0 0 20px;
  /* border-radius: 5px; */
  padding: 0px 10px;
  border-left: 1px solid #eee;
  height:48px;
  line-height: 48px;
}

.container .con-body .searchContent .sl {
  flex: 1;
  position: relative;
  margin-right: 10px;
  /* border: 1px solid #eeeeee; */
  border-radius: 5px;
}

.container .con-body .searchContent .sl .search {
  display: inline-block;
  height: 100%;
  width: 100%;
  /* padding: 0 10px; */
}

.container .con-body .searchContent .sl .asb {
  position: absolute;
  top: 33px;
  left: -1px;
  width: 100%;
  background: #fff;
  border: 1px solid #b0afaf;
  border-radius: 2px;
  z-index: 10;
  max-height: 300px;
  overflow: auto
}

.container .con-body .searchContent .sl .asbList {
  padding: 0 10px;
}

.container .con-body .searchContent .sl .asbItem {
  padding: 5px;
  border-bottom: 1px solid #D2D2D2
}

.container .con-body .searchContent .sl .asbItem:last-child {
  border: none
}

.searchr {
  position: absolute;
  right: 0px;
  top: 2px;
  /* padding: 5px 10px; */

}

.container .con-body .searchContent .iconDonw {
  display: inline-block;
  content: '';
  width: 8px;
  height: 8px;
  border: 2px solid #D2D2D2;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  border-left-color: transparent;
  border-bottom-color: transparent;
}

.container .con-body .searchContent .iconup {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
}

.tipBox{
    height: 40px;
    background: #f0f0f0;
    color: #999;
    line-height: 50px;
    font-size: 12px;
    padding-left: 15px;
}

.getDataCentent {
  margin: 0 10px;
  padding-bottom: 15px;
}

.cont {
  margin: 10px 0;
  /* font-weight: 200 */
}

.getDataCentent .textarea {
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 1px solid #dadada
}

.getDataCentent .textarea input {
  border: 1px solid #F5F5F5;
  text-align: left;
  vertical-align: top;
  border-radius: 5px;
  margin: 2px;
}

.getDataCentent .btn {
  margin: 20px 0 0 50%;
  transform: translateX(-30px);
  padding: 4px 15px;
  border: 1px solid #123889;
  background-color: transparent;
  color: #123889;
  border-radius: 5px;
}

.container .list {
  padding: 0 20px 50px 20px
}

.container .list .item {
  position: relative;
  padding: 15px 0;
  border-bottom: 1px solid #D2D2D2
}

.container .list .item:last-child {
  border: none
}

.insurance{
  padding: 14px 0;
    border-bottom: 1px solid #eee;
    margin-left: 15px;
}

</style>
