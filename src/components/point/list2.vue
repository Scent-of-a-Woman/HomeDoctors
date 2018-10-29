<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">用户评价</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">评价详情</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div class="content">
			<div class="nav_point">
				<ul>
					<li>评价</li>
					<li>评价标签</li>
					<li>手写评价</li>
				</ul>
			</div>
			<div class="content_point">
				<ul v-for="(item,index) in data3" >
					<li v-if="item.isGoood==0?true:false">满意</li>
					<li v-if="item.isGoood==1?true:false">不满意</li>
					<li >
						<span v-for="(value,index) in item.label">{{value}}</span>
					</li>
					<li v-if="item.content==''?true:false">无</li>
					<li v-if="item.content==''?false:false">{{item.content}}</li>
				</ul>
			</div>

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
</template>
<script type="text/javascript">
	import axios from "axios";
	import {familyDoctor,getLastDate2} from "./../../common/util.js";	
	export default{
		data(){
			return{
				token:'',
				loginId:'',
				data3:[

				],
				hos_id:'',
				data:""
			}
		},
		created:function(){
			this.token = window.localStorage.getItem("token");
			this.loginId = window.localStorage.getItem("loginId");
			this.id=window.localStorage.getItem("id")
			if(this.$route.query.Id==undefined){
				this.$route.query.Id=window.localStorage.getItem("hospitalId")
				console.log(this.$route.query.Id)
			}
			this.request()
		
	},
	methods:{
		request:function(){
			let url = familyDoctor();
			axios.post(url + "/whjtys/comment/findComment?loginId="+this.loginId+"&token="+this.token+"&pageSize="+10+"&pageNum="+1+"&hospitaName="+this.$route.query.Id)
			.then(response=>{
				console.log(response)

				this.data3 = response.data.comment.list
				this.data=response.data.comment.list.label
				console.log(this.data)
				this.total = response.data.comment.total
				})
		},
	},
	computed:{

	}
}
</script>
</script>
<style type="text/css" scoped>
.nav_point ul{
	height: 60px;
	background-color:white;

}
.nav_point ul  li{
	float: left;
	line-height: 60px;
	text-align: center; 
	color: #49c7c4;
	margin-bottom: 10px;
}
.content_point ul li{
	float: left;
	line-height: 60px;
	text-align: center; 
	background-color: white;
	margin-bottom: 10px;
}
.nav_point ul  li:first-of-type{
	width: 10%;
}
.nav_point ul  li:nth-of-type(2){
	width: 50%;
}
.nav_point ul  li:last-of-type{
	width: 40%;
}
.content_point ul  li:first-of-type{
	width: 10%;
}
.content_point ul  li:nth-of-type(2){
	width: 50%;
}
.content_point ul  li:nth-of-type(2) span{
	margin-right: 5px;
}
.content_point ul  li:last-of-type{
	width: 40%;
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