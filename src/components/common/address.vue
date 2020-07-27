<template>
    <div>             
        <div class="addresSelectVal">
            <div class="picker-toolbar headerClose">
                <span @click="hideAddress">取消</span>
                <span >请选择居住地址</span> 
                <span @click="selAddress">确定</span>
            </div>
            <ul>
                <li
                v-for="(item,index) of addressVal"
                :key="index"
                :class="{'select':addressIndex == index}"
                @click="selectType(index)"
                >{{item.name}}</li>
                <li
                :class="{'select':selectState == addressIndex}"
                v-show="addressList[0].subAddress.length"
                @click="selectType(selectState)"
                >请选择</li>
            </ul>
        </div>
            <div class="addresBox" ref="scroll">
            <ul>
                <li
                v-for="(item,index) of addressList"
                :key="index"
                :class="{'select':addressVal.length > addressIndex && item.objId == addressVal[addressIndex].objId}"
                @click="selectClick(item)"
                >{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import addressJson from '../../../static/addressNew';
import { Indicator,Toast } from 'mint-ui';
export default { 
    data(){
        return{
           Provinces:'',
           Cities:'',
           Area:'',
           streets:'',
           streets2:'',
           ProvincesCode:'',
           CitiesCode:'',
           AreaCode:'',
           streetsCode:'',
           streets2Code:'',
           columns:[],
           //选出的值
           addressVal: [],
            //当前选择
           addressIndex: 0,
            //选择的值
            addressList: [],
            //请选择的显示
            selectState: 0,
            addressList2:[],           
            addressList3:[],
            addressList4:[],
            addressList5:[],
            code:'',
            address:'',
            showContent:false,            
        }
    },
    // props:['addressJson'],
  watch: {
    data(val) {
    //   this.addressVal = val;
    //   this.selectState = val.length;
    }
  },
   created() {
     this.addressList = addressJson.result;
  },
methods:{
    getRegion(code,name) {
      //请求数据
      this.addressList.map(item=>{
          if(code == item.code && name == item.name){
              this.addressList = item.subAddress;
          }
      })              
      this.$refs.scroll.scrollTop = "0px";
    }, 
    getRegionSelect(code,name,addressList){
        addressList.map(item=>{
          if( code == item.code && name == item.name){
              this.addressList = item.subAddress;
          }
      })              
      this.$refs.scroll.scrollTop = "0px";
    },
    selectType(index) {
      this.addressIndex = index;
     if (this.addressIndex == 0) {
        this.addressVal = [];
      } else {
        this.addressVal.splice(this.addressIndex, this.addressVal.length - 1);
      }
      var len = this.addressVal.length;
      switch (this.addressIndex){
            case 0 :
                this.addressList = addressJson.result;
                break;
            case 1 :                 
                this.getRegionSelect(this.ProvincesCode,this.Provinces,this.addressList2);                
                break;
            case 2 : 
                this.getRegionSelect(this.CitiesCode,this.Cities,this.addressList3);              
                break;
            case 3 : 
                this.getRegionSelect(this.AreaCode,this.Area,this.addressList4);           
                break;
            case 4 :
                this.getRegionSelect(this.streetsCode,this.streets,this.addressList5);               
                break;
            default:
                break;
        }           
    },   
    //选择
    selectClick(item) {
      if (this.addressIndex == 0) {
        this.addressVal = [];
      } else {
        this.addressVal.splice(this.addressIndex, this.addressVal.length - 1);
      }
      switch (this.addressIndex){
            case 0 :
                this.Provinces = item.name;
                this.ProvincesCode = item.code;
                this.addressList2 = JSON.parse(JSON.stringify(this.addressList));
                break;
            case 1 : 
                this.Cities = item.name;
                this.CitiesCode = item.code;
                this.addressList3 = JSON.parse(JSON.stringify(this.addressList));
                // this.getRegion(this.Cities);                
                break;
            case 2 : 
                this.Area = item.name;
                this.AreaCode = item.code;
                this.addressList4 = JSON.parse(JSON.stringify(this.addressList));
                // this.getRegion(this.Area);              
                break;
            case 3 : 
                this.streets = item.name;
                this.streetsCode = item.code;
                this.addressList5 = JSON.parse(JSON.stringify(this.addressList));
                // this.getRegion(this.streets);           
                break;
            case 4 :
                this.streets2 = item.name;   
                this.streets2Code = item.name;             
                // this.getRegion(this.streets2);               
                break;
            default:
                break;
        }  
      this.addressVal.push(item);
      if (item.subAddress.length ) {
        this.getRegion(item.code,item.name);
        this.addressIndex++;
        this.showContent = false;
      }else{
          this.showContent = true;
          this.code = item.code;
          this.address = item.name;
          this.selAddress()
      //   console.log(this.code);
        //   this.addressList = [];
      }  
      this.selectState = this.addressVal.length;
    },

      selAddress(){
        if(!this.showContent){
            Toast('请选择完整地址')
            return;            
        }
        var obj = {};
        obj.code = this.code;
        var str = '';
        this.addressVal.map(item=>{           
            str = str + ' ' + item.name;
        })
        obj.name = str;
        this.$emit('addressObj', obj);  
        this.hideAddress();
    },

    hideAddress(){
        var closeAddress = false;
        this.$emit('closeAddress',closeAddress)
    }
    // this.$emit('orgCodeList', item);  
},
mounted(){
    // this.addressList = addressJson.result;
    // this.$refs.scroll.scrollTop = "0px";
    // this.columns = [];
    // addressJson.result.map(item=>{
    //     this.columns.push(item.name);     
    // })
    //  = addressJson.result
}
      


}
</script>
<style scoped lang="scss">

.addresSelectVal {
  padding: 0px 10px;
  border-bottom: 1px solid #ebebeb;
  box-sizing: border-box;
  background-color: #fff;
}
.addresSelectVal ul {
  display: flex;
  flex-wrap: wrap;
}
.addresSelectVal ul li {
  margin-left:0.2rem;
  padding: 0px 0.10rem;
  height: 0.72rem;
  line-height: 0.72rem;
  border-bottom: 2px solid #fff;
  box-sizing: border-box;
  font-size: 0.28rem;
}
.addresSelectVal ul li:first-child {
  margin-left: 0px;
}
.addresBox {
  padding: 0px 0.2rem;
  height: 7.2rem;
  overflow-y: auto;
  background-color: #fff;
}
.addresBox ul li {
  height: 0.72rem;
  line-height: 0.72rem;
  font-size: 0.28rem;
}

.headerClose{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
 
</style>