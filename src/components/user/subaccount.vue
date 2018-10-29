<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">子账户</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<!-- 导航栏 -->
		<div class="contain">
			<div class="content">
				<ul class="content_list">
					<li>角色</li>
					<li>账户</li>
					<li>密码</li>
					<li>姓名</li>
					<li>电话号码</li>
					<li>操作</li>
				</ul>
				<ul v-for="item in data3">
					<li class="title">{{item.role_name}}</li>
					<li class="title">{{item.account}}</li>
					<li class="title">{{item.password}}</li>
					<li class="title">{{item.name}}</li>
					<li class="title">{{item.phone}}</li>
					<li>
						<!-- <el-button  style="color:#6a6a6a" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
						<el-button style="color:#f09267"  @click="deleteRow(item.id)" v-if="item.role_name == '院长'?false:true" size="small">删除</el-button>
					</li>
				</ul>
			</div>
		</div>
		<div class="all" >
			<span>共<i style="font-style:normal">{{total}}</i>条</span>

			<!-- 分页 -->
			<template>
				<div class="block" id="signlist1">
					<el-pagination
					layout="prev, pager, next"
					:total="total"
					v-if="total <= 12 ? false:true"
					:page-size="12"
					@current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</template>
	</div>
</div>
</template>
<script>
import axios from "axios"
import {familyDoctor} from "../../common/util.js"
export  default{
	data(){
		return{
			dialogVisible: false,
			search:'',
			total:'0',
			data3:[],
			token:"",
			loginId:"",
			select_id:'',  // 卫计委id
			options: [{
				value: '选项1',
				label: '社区院长'
			}, {
				value: '选项2',
				label: '财务'
			}, {
				value: '选项3',
				label: '团队长'
			}, {
				value: '选项4',
				label: '计勉'
			}, {
				value: '选项5',
				label: '体检'
			}, {
				value: '选项5',
				label: '队员'
			}
			],
			value1: '',
			value4: '',
			value2: '',
			value3: '',
		}
	},
	created:function(){
		 this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
		this.requestData()
		this.select_id=window.localStorage.getItem("id")
	},
watch: {
    $route() {
      this.$router.go(0)
    }
  },
	methods: {
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {});
		},
		requestData:function(){
			let url=familyDoctor()
			let hospitalId=window.localStorage.getItem("hospitalId")
			axios.get(url+"/whjtys/planning/personal?loginId="+this.loginId+"&token="+this.token).then((response)=>{
				let data = response.data.pagehelper
				this.total= data.total
				this.data3= data.list
				for (var i = this.data3.length - 1; i >= 0; i--) {
					this.data3 = this.data3
				}
			})
		},
		// 删除
		deleteRow:function(id){
			let url=familyDoctor()
			this.$confirm('此操作将删除该账户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				axios.post(url+"/whjtys/planning/deleteAccountById/"+id+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
				this.$message(response.data.msg+"请刷新页面！");
				this.requestData()
				})
			}).catch(() => {
			})
		},
		// 分页
		handleCurrentChange:function(val){
			let url = familyDoctor();
			let _this=this
			axios.get(url+"/whjtys/planning/personal/?pageNum="+val+"&pagesize="+12+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
				let data = response.data.pagehelper.list
				_this.data3 = data
			})
		},
	},
}
</script>
<style scoped>
.title{
	font-size: 14px;
}
.search{
	height:50px;
	width:338px;
	display:inline-block;
	float:left;
	margin-top:16px;
	margin-left: 296px;
}
.f_more{
	float: left;
	width: 200px;
	height:50px;
	text-align: center;
	padding-top: 31px;
}
.f_more img{
	vertical-align: text-bottom;
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
.contain,.content{
	width: 100%;
}
.content ul{
	width: 100%;
	height: 55px;
	margin-top: 10px;
	background-color: white;
}
.content ul li{
	float: left;
	height: 55px;
	text-align: center;
	line-height: 55px;

}
.content .content_list{
	margin-top: 0;
}
.content_list li{
	color:#49c7c4;
	font-size: 16px;
}
.content ul li:first-of-type{
	width:16%;
}
.content ul li:nth-of-type(2){
	width:15%;
}
.content ul li:nth-of-type(3){
	width:17%;
}
.content ul li:nth-of-type(4){
	width:15%;
}
.content ul li:nth-of-type(5){
	width:20%;
}
.content ul li:last-of-type{
	width:16%;
}
.el-button {
	border:none;
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
.all  span i{
	color: #49c7c4;
}
</style>