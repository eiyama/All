<template>
  <div>
       <div class="information-search-container">
              <div class="searchbar">
                <div class="backIcon" @click="closeSeach"></div>
                <div class="searchbar-inner">
                    <i class="icon-search"></i>
                    <i class="icon-close" v-show="OrgCode != ''" @click="emptyInput"></i>
                    <input type="text" v-model="OrgCode" ref="inputOrg"  placeholder="您可以根据输入机构名称，检索组织机构信息" style="width: 100%;">
                </div>
                <div class="searchbar-confirm" @click="closeSeach">完成</div>
              </div>
              <div class="org-info-box" v-show="orgCodeResult.length > 0">
                  <div v-for="(item,index) in orgCodeResult" :key="index" @click="closeSeach(item,index)">
                    <div class="org-info">
                            <div class="clientName">
                                {{item.name}}
                            </div>
                            <div class="code">
                               社会统一信用代码：{{item.creditCode}}
                            </div>
                            <div class="code">
                                组织机构代码：{{item.orgCode}}
                            </div>
                    </div>  
                  </div>
              </div>
          </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator,Toast } from 'mint-ui';
export default {
  name: 'searchCompany',
  props: {
    showfocus: ''
  },
  data() {
    return {
      appId: '',
      OrgCode:'',
      orgCodeResult:[],

    }
  },
  mounted: function() {
    // this.browserRedirect();
   this.$nextTick((x)=>{   
         this.$refs.inputOrg.focus();
    })
    
  },
  watch:{
        OrgCode(curVal, oldVal) {
                // 实现input连续输入，只发一次请求
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                this.searchOrgCode(curVal,oldVal);
                }, 300);
            },
    },
  methods: {
    emptyInput(){
          this.OrgCode = '';
    },
   closeSeach(item,index){
        if(item){
            if(this.orgCodeResult.length > 0){
                // this.isSeachOrgCode = false;
                // this.shopName  = item.name;
                // this.applicantType = item.creditCode;
                // this.taxpayerNum = item.creditCode;
                // this.OrgCode = item.name;
                // this.applicantcardType = '统一社会信用代码';
                // this.applicantcardIndex = 1; 
                this.$emit('orgCodeList', item);                  
           }else{
            //    this.isSeachOrgCode = false;
            //    this.shopName = this.OrgCode; 
            this.$emit('orgCodeList', this.OrgCode);     
           }
        }else{
            // this.isSeachOrgCode = false;
            // this.shopName = this.OrgCode; 
            this.$emit('orgCodeList', this.OrgCode);     
        } 
              
    },
    searchOrgCode(curVal,oldVal) {
        var self = this;
        const param = {
            orgName: curVal || oldVal,
            orgCode:"",
        }
        Indicator.open('加载中...');
        axiosGetAPI('/vi/Enterprise', param).then((res) => {
            Indicator.close();
            if (res.result) {
                self.orgCodeResult = res.result;                
            }            
        });
    },

  }
}

</script>
<style scoped>

</style>
