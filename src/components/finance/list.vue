<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">对账管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">用户列表</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<!--右边侧栏 -->
		<div class="contain">
			<div class="content">
				<ul class="content_list">
					<li>医院名称</li>
					<li>操作员编码</li>
					<li>门店编码</li>
					<li>收费室</li>
				</ul>
				<ul v-for="item in searchData">
					<li class="title">{{item.sellerName}}</li>
					<li class="title">{{item.operatorId}}</li>
					<li class="title">{{item.storeId}}</li>
					<li class="title">{{item.shopName}}</li>
				</ul>
			</div>
			<div class="all" >
				

				<!-- 分页 -->
				<template>
					<div class="block" id="signlist1" style="margin-top:10px">
						<span>共&nbsp;<i style="font-style:normal">{{total}}</i>&nbsp;条</span>
						<div class="seting">
							<el-pagination
							layout="prev, pager, next"
							:total="total"
							v-if="total <= 12 ? false:true"
							:page-size="12"
							@current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</div>
			</template>
		</div>
	</div>
</div>
</template>
<script>
import {searchData,familyDoctor,getLastDate} from "./../../common/util.js"
import blurseach from "./../../common/blurseach.vue"
import axios from "axios"
import bus from '../../bus'
export  default{
	data(){
		return{
			dialogVisible: false,
			data3:[],
			total:"0",
			token:"",
      loginId:"",
            exportApi:'/whjtys/excel/exportExcelNewUser',  //导出api
        }
    },
    created:function(){
    	this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    	this.requestData()
	},
	watch: {
    $route() {
      this.$router.go(0)
    }
  },
    methods: {
		// 数据请求
		requestData:function(){
			let url=familyDoctor()
			axios.get(url+"/whjtys/user/userDetalis?pageSize="+10+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
				console.log(response)
				this.total=response.data.pagehelper.total
				this.data3=response.data.pagehelper.list
			})
		},
		// 分页
		handleCurrentChange:function(val){
			let url = familyDoctor();
			let _this=this     
			axios.get(url+"/whjtys/user/userDetalis/?pageNum="+val+"&pageSize="+10+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
			
				_this.data3=response.data.pagehelper.list
				this.requestData()
			})    
		},
	},
	computed: {
		searchData
	},
	components:{

	}
}
</script>
<style scoped>
.seting{
	margin:0 auto;
	height: 35px;
	position: relative;
	text-align: center;
	margin-top: 10px;
}
.title{
	font-size: 14px;
}
.search{
	height:50px;
	width:341px;
	display:inline-block;
	float:left;
	margin-top:16px;
	margin-left: 296px;
}
.f_more{
	float: left;
	width: 180px;
	height:81px;
	text-align: center;
	line-height: 81px;
}
.f_more img{
	vertical-align: text-bottom;
}
.f_more span{
	line-height: 81px;
	margin-left: 6px
}
.search input{
	outline:none;
	width:255px;
	height:48px;
	border:1px solid #49c7c4;
	padding:0 15px 0 15px;
	float:left
}
.search span{
	display:inline-block;
	height:48px;
	width:50px;
	color:white;
	text-align:center;
	border:1px solid #49c7c4;
	border-left:0;
	float:left;
	cursor:pointer;
}
.search span img{
	margin-top:12px;
}
.excel{
	width:115px;
	height:50px;
	background-color:#49c7c4;
	color:white;
	font-size:20px;
	text-align:center;
	line-height:50px;
	float:left;
	margin-left:10px;
	cursor:pointer;
	margin-top:16px;
}
.contain{
	width: 100%;
	height: 650px;
}
.content{
	width:100%;	
}
.content ul{
	width: 100%;
	height: 55px;
	margin-top: 10px;
	background-color: white;
}
#app > div.contain > div.content > ul.content_list{
	margin-top: 0;
}
.content ul li{
	float: left;
	height: 55px;
	text-align: center;
	line-height: 55px
}
.content ul li:first-of-type{
	width:30%;
}
.content ul li:nth-of-type(2){
	width:20%;
}
.content ul li:nth-of-type(3){
	width:20%;
}
.content ul li:nth-of-type(4){
	width:30%;
}
.el-button {
	border:none;
}
.fin_left{
	margin-left: 25px;
	float: left!important;
}
.fin_right{
	margin-right: 20px;
	float: right;
}
.all {
	width: 100%;
	float: left;
	line-height: 20px;
	margin-bottom: 25px;
	position: relative;
}
.all span {
	display: block;
	margin: auto;
	width: 10%;
	text-align: center;
}
.all  span i{
	color: #49c7c4;
}
.content_list li{
	color:  #49c7c4;
	font-size: 16px;
}
</style>