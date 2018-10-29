		<!-- 分页 -->
<template>
	<div id="app">
		<template>
		<!-- 分页 -->
			<div class="block">
			<el-pagination
			layout="prev, pager, next"
			:total="total> 35 ? total:35"
			:page-size="5"
			@current-change="handleCurrentChange"
			>
				</el-pagination>
			</div>
		</template>
	</div>
</template>

<script>
import axios from 'axios'
import {familyDoctor} from './util.js'
import bus from '../bus.js'
export default{
	data (){
		return{
			total:''
		}
	},
	methods: {
		//分页
		handleCurrentChange: function(val) {
			let url = familyDoctor();
			let _this = this;
			// console.log(val)
			// console.log(parseInt(_this.total / 5))
		if(parseInt(_this.total / 5) >= val){
			axios.get(url + "/whjtys/vaccine/newJMOrder?pageNum=" + val)
			.then(function(response) {
			_this.data3 = response.data.pagehelper.list;
			});
			console.log("测试成功")
		}
		}
    },
    created:function(){
		let _this = this
		bus.$off('pcountNumber');
		bus.$on('pcountNumber', (paging) => {
			console.log(paging)
			_this.total = paging;
		});
	}
}
</script>

<style scoped>



</style>