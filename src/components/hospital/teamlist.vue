<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">社区医院</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">医院列表</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div class="content">
			<ul>
				<li>社区医院</li>
				<li>院长</li>
				<li>联系方式</li>
				<li>地址</li>
			</ul>
			<ul v-for="item in data3" class="list">
				<li>{{item.hospital_name}}</li>
				<li>{{item.name}}</li>
				<li>{{item.phone}}</li>
				<li>{{item.hospital_address}}</li>
				<li><router-link :to="{path:'./captain',query:{itemid:item.id}}"  style="color:#49c7c4">查看</router-link></li>
			</ul>
		</div>	
		<!-- 分页 -->
		<div class="all" >
			<span>共<i>{{total}}</i>条</span>
		
		<template>
			<div class="block">
				<el-pagination
				layout="prev, pager, next"
				:total="total"
				v-if="total <= 12 ? false:true"
				:page-size="12"
				@current-change="handleCurrentChange"
				>
			</el-pagination>
		</div>
	</template>
</div>
</div>
</template>
<script>
import {familyDoctor} from './../../common/util.js'
import axios from	'axios'
export default{
	data(){
		return{
			dialogVisible: false,
			data3:[],
			total:"0",
			token:"",
			loginId:""
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
	methods:{
		requestData:function(){
			let url=familyDoctor()
			axios.get(url+"/whjtys/planning/findTeamlist?loginId="+this.loginId+"&token="+this.token).then((response)=>{
				
				this.data3=response.data.pagehelper.list
				this.total=response.data.pagehelper.total		
			})
		},
		 // 分页
		 handleCurrentChange:function(val){
		 	let url = familyDoctor();
		 	let _this=this
		 	axios.get(url+"/whjtys/planning/findTeamlist?pageNum="+val+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
		 		_this.data3=response.data.pagehelper.list
		 		
		 	})
		 },
		},
	}
	</script>
	<style scoped>
	.list li{
		font-size: 14px
	}
	.search{
		position: absolute;
		top: -113px;
		left:0;
		background-color: skyblue;
		height: 30px;
		width: 300px;
	}
	.content ul{
		height: 55px;
		padding-left: 5%;
		width: 95%;
		background-color: white;
		border: 1px solid #fff;
		box-sizing: border-box;		
	}
	.content .list{
		margin-top: 5px;
	}
	.content ul:nth-of-type(1){
		font-size: 17px;
	}
	.content ul li{
		float: left;
		line-height: 55px;
		text-align: left;
		height: 100%;
    	overflow: hidden;
	}
	.content ul:first-of-type{
		color: #85d6d4
	}
	.content ul:first-of-type li:last-of-type span{
		width: 30%;
		margin: 13px  29px 13px 0;
		background-color: #49c7c4;
		color: white;
		height: 29px;
		display: block;
		line-height: 29px
	}
	.content ul:first-of-type li:last-of-type span img{
		float: left;
		margin-top: 6px;
		margin-left: 1%
	}
	.content li:first-of-type{
		width: 35%;
	}
	.content li:nth-of-type(2){
		width: 14%;
	}
	.content li:nth-of-type(3){
		width: 17%;
	}
	.content li:nth-of-type(4){
		width: 28%;
	}
	.content li:nth-of-type(5){
		width: 5%;
	}
	.block{
		text-align: center;
	}
	.el-button{
		color: white;
		line-height: 0;
	}
.all{
  width: 100%;
  float: left;
  line-height: 30px;
  margin-top: 10px;
  text-align: center;
}
.all span{
  display: block;
  margin:auto;
  text-align: center;
}
.all  span i{
  color: #49c7c4;
}

.content ul:hover{
	border: 1px solid #49c7c4;
}
.content ul:first-of-type:hover{
		border: 1px solid #fff;
}
	</style>
