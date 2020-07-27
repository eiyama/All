<template>
    <div>
        <div class="picker-toolbar headerClose">
			<span @click="hideAddress">取消</span>
			<span >请选择省市区</span> 
			<span @click="selAddress">确定</span>
		</div>
		<mt-picker :slots="myAddressSlots"  valueKey="name" :visibleItemCount="5" @change="addressChange" :itemHeight="40">
        </mt-picker>
    </div>
</template>
<script>
import { zmGetProvincesArr,zmGetCitiesArr,zmGetAreaArr , zmGetstreetsArr } from '../../assets/js/zmRegion';
export default {
    data(){
        return{
            regionInit: false,//禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
            address:"",
            province: '',//省
            city: '',//市
            area: '',//县
            provinceCode: '',//省级代码
            cityCode: '', //市级代码
            areaCode: '',//县级代码
            myAddressSlots: [//省
                {
                    flex: 1,
                    values: zmGetProvincesArr(), //省份数组
                    className: 'slot1',
                    textAlign: 'center'
                },
                //分隔符
                {
                    divider: true,
                    content: '',
                    className: 'slot2'
                },
                //市
                {
                    flex: 1,
                    values: zmGetCitiesArr('44'),
                    className: 'slot3',
                    textAlign: 'center'
                },
                {
                    divider: true,
                    content: '',
                    className: 'slot4'
                },
                //县
                {
                    flex: 1,
                    values: zmGetAreaArr('4403'),
                    className: 'slot5',
                    textAlign: 'center'
                }
                ],
        }
    },
methods:{
    addressChange(picker, values) { //地区选择器
		if (this.regionInit) {
				//取值并赋值
				if (values[0] && values[1]  && values[2]) {
					this.address = values[0]["name"] + values[1]["name"] + values[2]["name"];
					this.province = values[0]["name"];
					this.city = values[1]["name"];
					this.area = values[2]["name"];
					this.provinceCode = values[0]["code"];
					this.cityCode = values[1]["code"];
                    this.areaCode = values[2]["code"];
                    // console.log(zmGetstreetsArr(this.areaCode));
					//给市、县赋值
					    let area = "";
						if (values[0].name == "北京市") {
							this.area  = "1101";
						} else if (values[0].name == "天津市") {
							this.area  = "1201";
						} else {
							this.area  = values[1]["code"];
						}
					picker.setSlotValues(1, zmGetCitiesArr(values[0]["code"]));
					picker.setSlotValues(2, zmGetAreaArr(values[1]["code"]));
					this.$emit("getRegion", this.address)
				}else {
					// console.log("数据不全");
				}
				} else {
			    	this.regionInit = true;
				}
    },
    selAddress(){
        var obj = {};
        obj.address = this.address;
        obj.areaCode = this.areaCode;
        obj.cityCode = this.cityCode;
        obj.provinceCode = this.provinceCode;
        this.$emit('addressList', obj);  
        this.hideAddress();
    },

    hideAddress(){
        var closeAddress = false;
        this.$emit('closeAddress',closeAddress)
    }
    // this.$emit('orgCodeList', item);  
}
      


}
</script>
<style scoped>

</style>