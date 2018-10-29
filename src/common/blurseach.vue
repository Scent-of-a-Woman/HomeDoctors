<template>
	<div id="app">
		<div class="excel_grid" @click="dateValue = !dateValue">导出EXCEL
		</div>
		<div class="export" v-if="dateValue">
			<div class="block" style="margin-right:30px;">
				<span class="demonstration">起始日期</span>
				<el-date-picker
					v-model="value1"
					type="date"
					placeholder="起始日期"
					>
				</el-date-picker>
			</div>
				<span>至</span>
			<div class="block">
				<span class="demonstration">截止日期</span>
				<el-date-picker
					v-model="value2"
					type="date"
					placeholder="截止日期">
				</el-date-picker>
			</div>
			<div class="export_but">
				<p>将导出此段时间内的<span>{{exportApi.title}}</span>数据</p>
				<el-button type="primary" @click="exportTable">确认</el-button>
				<el-button @click="dateValue = false" class="reset">取消</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import {familyDoctor,getLastDate} from './util.js'
import bus from '../bus'
import axios from 'axios'

export default{
	created:function(){
		let _this = this
		 _this.token = window.localStorage.getItem("token");
      _this.loginId = window.localStorage.getItem("loginId");
		bus.$off('export');
		bus.$on('export', (api) => {
			_this.exportApi = api;
		});
	},
	data (){
		return{
			dateValue:false,
			value1:"",  //  开始日期
			value2:"",  //  截止日期
			exportApi:{}, 
			token:"",
			loginId:""
		}  
	},
	methods:{
		 // 导出表格
		exportTable:function(){
			let _this =this;
			let begindate = getLastDate(this.value1);
			let enddate = getLastDate(this.value2);
			let url=familyDoctor() +_this.exportApi.api;
			let operator = this.exportApi.operator || ''
			if(this.value1 != "" && this.value2 != ""){
				console.log(url)
					axios.get(url + "?begindate="+begindate+"&enddate="+enddate+"&operator="+operator+"&store_id1="+this.exportApi.store_id1+"&token="+_this.token+"&loginId="+_this.loginId)
					.then(function(response){
						console.log(url)
					if(window.navigator.userAgent.indexOf('AppleWebKit') == 36) {
							window.open(response.config.url)
						}else{
							window.location.href = response.config.url
						}
					});
					this.$message({
					message: '加载中，请稍等！',
					type: 'success'
					});
					this.dateValue = false;
					return
			}else{
				this.dateValue = true;
				this.$message.error('请选择正确日期');
				return
			}
		}
	}
	
}
</script>


<style scoped>

/*搜索end*/
.search_grid{
	height:50px;
	/*width:338px;*/
	display:inline-block;
}

.search_grid input{
	outline:none;
	width:255px;
	height:48px;
	border:1px solid #49c7c4;
	float:left;
}
.search_grid span{
	display:inline-block;
	height:48px;
	width:50px;
	color:#fff;
	text-align:center;
	border:1px solid #49c7c4;
	float:left;
	cursor:pointer;
	position: absolute;
	right: -51px;
	top: 0;
}
.search_grid span img{
	margin-top:12px;
}
.excel_grid{
	width:100px;
	height:50px;
	background-color:#49c7c4;
	color:white;
	font-size:15px;
	text-align:center;
	line-height:50px;
	float:left;
	cursor:pointer;
	position: absolute;
	top: 16px;
    right: 30px;
}

/*搜索栏结束*/
/*日期样式*/ 
.export{
	width: 456px;
	height: 220px;
	position: absolute;
	top: 75px;
	right: 29px;
	background-color: #fff;
	border: 1px solid #49c7c4;
	z-index: 2;
	box-shadow:0px 0px 6px 3px #dadada;
	padding: 0 20px;
	box-sizing: border-box;
	font-size: 14px;
	line-height:50px;

}
.export>span{
	position: absolute;
	color: #000;
	font-size: 14px;
	top: 50px;
	left: 214px;
}

.export .block{
	width: 45%;
	text-align: left;
	height: 100px;
}
.export .block >div{
	line-height: 20px;
	width: 100%;
}
.export .block >div i{
	left: 0;
}
.export .block span{
	font-size: 14px;
	color: #6a6a6a;
}
.export .block div >input{
	width: 188px;
	padding: 10px 30px;
}
.export .export_but{
	width: 100%;
	text-align: center;
}
.export .export_but > button{
	width: 140px;
	height: 34px;
}
.export .export_but >p{
	color: #6a6a6a;
}
.export .export_but >p >span{
	color: #49c7c4;
}
.el-button{
	line-height: 0px;
}
.el-button:focus, .el-button:hover{
	border-color:#49c7c4;

}
.reset:hover{
		color: #49c7c4;
}
.el-button--primary:focus, .el-button--primary:hover,.el-button--primary{
	background-color:#49c7c4 ;
	border-color:#49c7c4;
}
/*日期样式end*/
</style>