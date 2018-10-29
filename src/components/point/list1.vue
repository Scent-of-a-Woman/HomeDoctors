<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">用户评价</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">评价列表</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div class="content">
			<div class="nav_point">
				<ul>
					<li>排名</li>
					<li>医院名称</li>
					<li>总好评/总评价</li>
					<li>好评率</li>
					<li>评价</li>
				</ul>
			</div>
			<div class="content_point">
				<ul v-for="(item,index) in data3">
					<li>{{startRow+index}}</li>
					<li>{{item.hospitalName}}</li>
					<li>{{item.highPraise}}/{{item.evaluation}}</li>
					<li>{{item.percentage}}</li>
					<li><router-link :to="{path:'/point/list2',query:{Id:item.hospitalName}}">查看详情</router-link></li>
				</ul>
			</div>
			<!-- 分页 -->
			<div class="all" >
				<span>共&nbsp;<i>{{total}}</i>&nbsp;条</span>
				<template>
					<!-- 分页 -->
					<div class="block">
						<el-pagination
						layout="prev, pager, next"
						:total="total"
						:page-size="10"
						v-if="total <= 10 ? false:true"
						@current-change="handleCurrentChange">
					</el-pagination>
				</div>
			</template>
		</div>
	</div>
</div>
</template>
<script type="text/javascript">
	import axios from "axios";
	import {familyDoctor,getLastDate2,checobox} from "./../../common/util.js";	
	export default{
		data(){
			return{
				token:'',
				loginId:'',
				data3:[],
				total:'',
				startRow:""
			}
		},
		created:function(){
			this.token = window.localStorage.getItem("token");
			this.loginId = window.localStorage.getItem("loginId");
			this.id=window.localStorage.getItem("id")
			this.request();		
		},
		methods:{
			request:function(){
				let url = familyDoctor();
				axios.post(url + "/whjtys/comment/commentRanking?loginId="+this.loginId+"&token="+this.token+"&pageSize="+10+"&pageNum="+1)
				.then(response=>{
					console.log(response)
					this.startRow = response.data.comment.startRow
					this.data3 = response.data.comment.list
					this.total = response.data.comment.total
				})
			},
			handleCurrentChange: function(val) {
				let _this = this;
				let url = familyDoctor();
				axios.post(url + "/whjtys/comment/commentRanking?loginId="+this.loginId+"&token="+this.token+"&pageNum="+val+"&pageSize="+10)
				.then(function(response) {
					console.log(response)
					_this.data3 = response.data.comment.list
					_this.startRow = response.data.comment.startRow
					_this.total = response.data.comment.total
				})
				
			}
		}
	}
</script>
<style type="text/css" scoped>
.nav_point ul{
	height: 60px;
	background-color: white;
}
.content_point ul{
	height: 60px;
}
.nav_point >ul >li{
	line-height: 60px;
	float: left;
	color: #49c7c4;
	text-align: center;
}
.content_point ul li{
	line-height: 60px;
	float: left;
	font-size: 15px;
	text-align: center;
	background-color: white;
	margin-right: 0.2%;
}

.nav_point >ul >li:first-of-type{
	width: 10%;
}
.nav_point >ul >li:nth-of-type(2){
	width: 35%;
}
.nav_point >ul >li:nth-of-type(3){
	width: 20%;
}
.nav_point >ul >li:nth-of-type(4){
	width: 15%;
}
.nav_point >ul >li:last-of-type{
	width: 20%;
}
.content_point ul{
	margin-top: 10px;
}
.content_point >ul >li:first-of-type{
	width: 10%;
}
.content_point >ul >li:nth-of-type(2){
	width: 34%;
}
.content_point >ul >li:nth-of-type(3){
	width: 20%;
}
.content_point >ul >li:nth-of-type(4){
	width: 15%;
}
.content_point >ul >li:last-of-type{
	width: 20.2%;
	margin-right: 0;
	cursor: pointer;
	color:#49c7c4;
}
.content_point >ul >li:last-of-type a{
	color:#49c7c4;
}
.all {
	width: 100%;
	float: left;
	line-height: 30px;
	margin-top: 10px;
	text-align: center;
}
.all span {
	display: block;
	margin: auto;
	width: 70%;
	text-align: center;
}
.all span i {
	color: #49c7c4;
}
#make > div{
	margin-left: 39px;
	margin-top: 22px;
	position: absolute;
}
.tick{
	height: 162px;
	width: 5%;
	margin-left: 1%;
	float: left;
	background-color: white;
	text-align: center;
}
</style>