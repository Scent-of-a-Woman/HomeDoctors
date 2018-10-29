<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">社区医院</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">团队详情</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<template>
			<el-tabs v-model="activeName"  id="team_tab">
				<el-tab-pane label="团队人员" name="first">
					<div class="contain">
						<div class="content">
							<ul class="list_info" v-for='(item,index) in data3'>
								<li>{{item.leaderName}}</li>
								<li>
									<ul class="doctor_info">
										<li><img :src="item.img_url=='null'||item.img_url== null ? iniTimg:item.img_url" alt="加载中"></li>
										<li>{{item.doctor_name}}</li>
										<li>{{item.doctor_typename}}</li>
									</ul>
								</li>
								<li>{{item.phone}}</li>
								<li>
									<el-button style="color:#6a6a6a" type="text"  :disabled="select_id==3||select_id==4?true:false" @click="dialogVisible = true;Doctorinfo(item.id)">编辑</el-button>
									<el-dialog
									title="修改信息"
									id="team_people"
									:visible.sync="dialogVisible"
									size="tiny">

									<div class="img_info" style="height:197px;text-align:center;">
										<div style="height:110px;">
											<img :src="data4.img_url==undefined ? iniTimg:data4.img_url" height="90" width="90" style="border-radius:50%; ">
										</div>
										<div style="margin-top:5px;">
											<el-upload
											class="upload-demo"
											action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=1"
											accept=".jpg, .png"
											:on-success="handlePreview"
											:show-file-list= "false"
											list-type="picture">
											<el-button size="small" type="primary">点击上传</el-button>
											<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
										</el-upload>
									</div>
								</div>
								<div style="width:100%;margin:auto;text-align:center;">
									<div style="margin-bottom:15px;">
										<p class="set_infor font_color">姓名</p>
										<input class="set_people" type="text" v-model="data4.doctor_name" readonly="readonly">
									</div>
									<div style="margin-bottom:15px;">
										<p class="set_infor font_color" >职务</p>
										<el-select  v-model="value">
											<el-option
											v-for="items in options"
											:key="items.value"
											:label="items.label"
											:value="items.value">
										</el-option>
									</el-select>
								</div>
								<div style="margin-bottom:15px;">
									<p class="set_infor font_color">手机</p>
									<input class="set_people" type="text" v-model="data4.phone" >
								</div>

								<span slot="footer" id="set_informatin" class="dialog-footer clear">
									<el-button type="primary" @click="makeDoctor">确 定</el-button>
									<el-button @click="dialogVisible = false">取 消</el-button>
								</span>
							</div>

						</el-dialog>
						<el-button style="color:#f09267;background-color:white" @click="removeData(item,index)" v-if="item.leaderName == '团队长'&&select_id == 5?false:true" :disabled="select_id==3||select_id==4?true:false">删除</el-button>
					</li>
				</ul>
			</div>
		</div>
	</el-tab-pane>
	<el-tab-pane label="服务范围" name="second">
		<div class="team_range">
			<ul class="range_select" >
				<li>服务社区</li>
				<li>
					<ul class="select_rangeing" v-for="item in community_name">
						<li>{{item.community_name}}</li>	
					</ul>
				</li>
				<li>编辑服务范围</li>
				<li>
					<textarea v-model="area" maxlength="150" :disabled="select_id==3||select_id==4?true:false"></textarea>
				</li>
				<li>
					<span class="range_submit" @click="Makearea">保存</span>
				</li>
			</ul>
		</div>
	</el-tab-pane>
	<el-tab-pane label="添加成员" name="three">
		<div class="add_img">
			<ul class="add_people">
				<li>
					<div class="content_left" style="float:none;padding-left:0;">
						<img :src="addPeople.imgs==''?iniTimg : addPeople.imgs" style="width:100px;height:100px;border-radius:50%;margin-bottom:15px;">
						<el-upload
						class="upload-demo"
						action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=1"
						accept=".jpg, .png"
						:on-success="handlePreview1"
						:show-file-list= "false"
						list-type="picture">
						<el-button size="small" type="primary" :disabled="select_id==3||select_id==4?true:false">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
					</el-upload>
				</div>
			</li>
			<li>姓名&nbsp;<input type="" v-model="addPeople.name" :disabled="select_id==3||select_id==4?true:false"></li>
			<li>手机&nbsp;<input type="" v-model="addPeople.phone" :disabled="select_id==3||select_id==4?true:false"></li>
			<li>类型&nbsp;<el-select  v-model="typevalue" style="width: 100%;max-width: 207px;" :disabled="select_id==3||select_id==4?true:false">
				<el-option
				v-for="items in options"
				:key="items.value"
				:label="items.label"
				:value="items.value">
			</el-option>
		</el-select>
	</li>	
	<li @click="AddPeople" >提交</li>
</ul>
</div>
</el-tab-pane>
</el-tabs>
</template>
</div>
</template>
<script>
import axios from 'axios'
import {familyDoctor} from "../../common/util.js"
import iniTimg from '../../assets/images/image.png'
export default{
	data(){
		return{
			iniTimg:iniTimg,	//默认图片
			activeName: 'first',
			search:'',
			dialogVisible: false,
			data3:[],
			id:"",
			select_id:"",
			  token:"",
      loginId:"",
			itemId:"",
			doctorId:'', 	// 医生id
			options: [{
				value: 0,
				label: '全科医师'
			}, {
				value: 1,
				label: '护士'
			}, {
				value: 2,
				label: '保健医师'
			}, {
				value: 3,
				label: '中医师'
			}, {
				value: 4,
				label: '口腔医师'
			},{
				value: 5,
				label: '妇科医生'
			},{
				value: 6,
				label: '家庭医生'
			},{
				value: 7,
				label: '其他医护'
			},{
				value: 8,
				label: '主任医师'
			}],
			value: '',
			typevalue:"",
			doctor_type:'',
			data4:{},
			community_name:[],//社区明细
			area:"",		// 范围
			addPeople:{
				name:"",
				phone:"",
				type:"",
				imgs:"",
			},
		}
	},
	created: function() {
		 this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
		this.select_id=window.localStorage.getItem("id")
		this.id=this.$route.query.itemId || window.localStorage.getItem("doctorGroupId");
		this.requestData();
	
	},
	watch: {
		$route() {
			this.$router.go(0)
		}
	},
	methods:{
		//  正则
		judge:function(val){
			let reg=/^1\d{10}$/
			if(reg.test(val)&&val!=null){
				return
			}else{
				this.$message("请输入正确的手机号码");
			}
		},
		// 数据请求
		requestData:function(){
			let url=familyDoctor()
			axios.get(url+"/whjtys/planning/finTeamByGroupId/"+this.id+"?loginId="+this.loginId+"&token="+this.token).then((response)=>{
				this.data3=response.data.doctorAll
			});
			axios.get(url+"/whjtys/planning/findcommunity/?doctorGroupId="+this.id+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
				this.community_name=response.data.community
			})
			axios.get(url+"/whjtys/planning/findserviceScope/?doctorGroupId="+this.id+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
				this.area=response.data.serviceScope
			})
		},
		
		
		// 医生信息
		Doctorinfo:function(id){
			let url=familyDoctor()
			axios.get(url+"/whjtys/planning/findDoctorById/?id="+id+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
				this.data4 = response.data.doctor
				this.value = this.data4.doctor_typename
			})
		},
		//编辑医生信息 上传头像
		handlePreview:function(response){
			this.data4.img_url = response.url
		},
		makeDoctor:function(){
			let _this = this
			let url=familyDoctor()
			let id = _this.data4.id
			let phone
			for (var i = 0; i < _this.options.length; i++) {
				var element = _this.options[i]
				if(_this.value == element.value |_this.value == element.label){
					_this.doctor_type= element.value
					break
				}
			}
			let reg=/^1\d{10}$/
			if(reg.test(this.data4.phone)&&this.data4.phone!=null){
				axios.post(url+"/whjtys/planning/updateDoctorById/?id="+id+"&doctor_type="+_this.doctor_type+"&doctor_name="+_this.data4.doctor_name+"&phone="+_this.data4.phone+"&img_url="+_this.data4.img_url+"&loginId="+_this.loginId+"&token="+_this.token).then((response)=>{
					this.$message({
						message: response.data.msg,
						type: 'success'
					});
					this.requestData()
				})
				this.dialogVisible = false
			}else{
				this.$message("请输入正确的手机号码");
			}
			
		},
		// 删除医生信息
		removeData: function(item, index) {
			let url=familyDoctor()
			let _this = this
			//删除数据删除数据
			this.$confirm('此操作将删除团队成员, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				axios.post(url + "/whjtys/planning/deleteDoctorById/" + item.id+"?loginId="+_this.loginId+"&token="+_this.token).then(function(response) {
					_this.$message({
					message: response.data.msg,
					type: 'success'
				});
					_this.requestData()
				})
			}).catch(() => {
				this.request()            
			})
			
		},
		// 修改服务范围
		Makearea:function(){
			let url=familyDoctor()
			if(this.select_id==3 || this.select_id==4){
				this.$message("暂无权限")
				return;
			}
			axios.post(url+"/whjtys/planning/updateServiceScope?doctorGroupId="+this.id+"&serviceScope="+this.area+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
				this.$message({
					message: response.data.msg,
					type: 'success'
				});
			})
		},
		// 添加成员上传头像
		handlePreview1:function(response){
			this.addPeople.imgs = response.url
		},
		AddPeople:function(){
			let url=familyDoctor()
			if(this.select_id==3||this.select_id==4){
				this.$message("暂无权限")
				return;
			}
			if(this.addPeople.name==""){
				this.$message("请输入正确的医生信息")
				return
			}
			let reg=/^1[0-9][0-9]\d{4,8}$/
			if(!reg.test(this.addPeople.phone)){
				this.$message("请输入正确的手机号")
				return
			}
			if(this.typevalue===""){
				this.$message("请输入正确的医生类型")
				return
			}
			axios.post(url+"/whjtys/planning/CreateDoctor?doctorGroupid="+this.id+"&doctor_type="+this.typevalue+"&name="+this.addPeople.name+"&phone="+this.addPeople.phone+"&img_url="+this.addPeople.imgs+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
				this.$message(response.data.msg);
				this.requestData()
				this.typevalue = ''
				this.addPeople.name = ''
				this.addPeople.phone = ''
				this.addPeople.imgs = ''
			})
		}
	}
}
</script>
<style scoped>
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
	height:81px;
	text-align: center;
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
.list_info{
	margin-top: 10px;
	background-color: white;
	height: 80px;
	width: 100%
}
.list_info>li{
	float: left
}
.list_info>li:nth-of-type(1){
	width: 20%;
	height: 80px;
	text-align: center;
	line-height: 80px;
	font-size: 14px;
}
.list_info>li:nth-of-type(2){
	width: 34%;
	height: 65px;
	padding-left: 22px;
	padding-top: 10px;
}
.list_info>li:nth-of-type(3){
	width: 30%;
	height: 80px;
	text-align: left;
	line-height: 80px
}
.list_info>li:nth-of-type(4){
	width: 13%;
	height: 56px;
	padding-top: 24px;
}
.list_info .doctor_info{
	width:170px;
	height: 65px;
}
.doctor_info li{
	float: left
}
.list_info .doctor_info li:nth-of-type(1){
	width: 60px;
	height: 60px;
	border-radius: 50%;
	overflow: hidden;
}
.list_info .doctor_info li:nth-of-type(1) img {
	height:100%;
	width: 100%;
	display: block;
}
.list_info .doctor_info li:nth-of-type(2),.list_info .doctor_info li:nth-of-type(3){
	width: 90px;
	height: 23px;
	padding: 0;
	float: right;
	text-align: center;
}
.doctor_info li:nth-of-type(3){
	border:1px solid #80c269;
	color: #80c269;
	width: 88px;
	border-radius: 15px;
	line-height: 23px;
	font-size: 14px;
}
.doctor_info li:nth-of-type(2){
	margin-top: 5px;
	font-size: 14px;
}
.el-button {
	border:none;
}
#team_tab{
	height: 100%;
}
.team_range{
	background-color: white;
	width: 100%;
	padding: 58px 75px 15px 75px;
	box-sizing: border-box;
}
.range_select>li:nth-of-type(1){
	height: 40px;
	margin-left: 13px;
	width: 100%;
	font-size: 16px;
}
.range_select>li:nth-of-type(2){
	height: 160px;
	width: 100%;
	border-bottom: 1px solid #ccc;
}
.select_rangeing{
	color: white;
	margin-left: 13px;
}
.select_rangeing>li{
	float: left;
	padding: 0 11px 0 11px;
	height: 35px;
	line-height: 35px;
	border: 1px solid #49c7c4;
	border-radius:15px;
	margin-right: 8px;
	background-color: #49c7c4;
}
.range_select>li:nth-of-type(3){
	margin-top: 27px;
	height: 55px;
	line-height: 55px;
}
.range_select>li:nth-of-type(4) textarea{
	width: 100%;
	height: 130px;
	resize: none;
	padding-left: 5px;
	font-size: 16px;
	padding: 5px;
}
.range_select>li:nth-of-type(5){
	margin-top: 20px;
}
.range_submit{
	height: 40px;
	line-height: 40px;
	background-color: #49c7c4;
	color: white;
	width: 107px;
	display: block;
	margin:auto;
	text-align: center;
	font-size: 16px;
	cursor: pointer;
}
.set_people{
	/* width: 310px!important; */
	padding-left: 8px;
}
.set_img{
	width: 66px;
	height: 26px;
	line-height: 26px;
	display: block;
	margin: auto;
	margin-top: 5px;
	border-radius: 5px;
	background-color: #0094ff;
	color: white
}
.add_img{
	width: 100%;
	padding-bottom: 50px;
	text-align: center;
	background-color: white
}
.content_left{
	width: 100%;
	display: inline-block;
}
.add_people{
	width: 800px;
	margin: 0 auto;
}
.add_people li:nth-of-type(1){
	padding-top: 60px;
	margin-bottom: 38px;
	text-align: center;
	border-bottom: 1px solid #ccc;
}
.add_people li{
	margin-bottom: 20px;
}
.add_people input{
	height: 30px;
	width: 200px;
	padding-left: 5px;
	font-size: 16px;
	border: none;
	border: 1px solid #bfcbd9
}
.add_people li:nth-of-type(5){
	height: 40px;
	width: 90px;
	line-height: 40px;
	color: white;
	text-align: center;
	margin: auto;
	background-color:#49c7c4;
	cursor: pointer;
}
.el-upload__tip{
	padding: 14px;
}
#team_tab > div.el-tabs__content > div:nth-child(3) > div > ul > li:nth-child(1){
	/*margin-bottom: 38px;*/
}
</style>
