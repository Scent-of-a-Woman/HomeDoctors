<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">账户管理</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div id="top_tab" class="down">
			<div class="navbar">
				<template>
					<el-tabs v-model="activeName">
						<el-tab-pane label="个人信息" name="first">
							<div class="content">
								<div class="content_top">
									<div class="content_left">
										<img :src="img.op0=='null'||img.op0== null ? iniTimg:img.op0" alt="">
										<el-upload
										class="upload-demo"
										action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=0"
										accept=".jpg, .png"
										:on-success="handlePreview"
										:show-file-list= "false"
										list-type="picture">
										<el-button size="small" type="primary">点击上传</el-button>
										<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
									</el-upload>
								</div>
								<div class="content_right">
								</div>
							</div>
							<div class="content_cent">
								<div>
									<div>
										<span class="line">用户姓名</span><input type="text" v-model="name" readonly="readonly">	
									</div>
								</div>
								<div><span class="line">手机号码</span><input type="text" v-model="phone" placeholder="修改手机号码"></div>
								<div><span class="line">登录帐号</span><input type="text" v-model="account" readonly="readonly"></div>
								<div><span class="line">登录密码</span><input type="password" v-model="admin" placeholder="修改密码"></div>
							</div>
							<div class="content_foot">
								<input type="button" value="保存" @click="upDate" class="font">
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="创建子账户" name="second" :disabled="select">
						<template >
							<!-- 院长账户 -->								
							<el-tabs v-model="activeNames" class="tab_tab" v-show="roledId !== '3'">
								<el-tab-pane label="队长" name="five">
									<div class="content">
										<div class="content_top">
											<div class="content_left" style="float:none;padding-left:0;">												
												<img :src="img.op1 == '' ? iniTimg:img.op1" alt="">
												<el-upload
												class="upload-demo"
												action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=0"
												accept=".jpg, .png"
												:on-success="handlePreview1"
												:show-file-list= "false"
												list-type="picture">
												<el-button size="small" type="primary">点击上传</el-button>
												<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
											</el-upload>
										</div>
									</div>
									<div class="content_cent">
										<div>
											<div>
												<span class="line">用户姓名</span><input type="text" placeholder="请输入用户姓名" v-model="yyData.yyleader.yyleader_name">	
											</div>
										</div>
										<div>
											<span class="line">医生类型</span><el-select  v-model="yyData.yyleader.yyleader_type" style="width: 100%;max-width: 210px;border-radius:10px;">
												<el-option
												v-for="item in options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>

									</div>
									<div><span class="line">手机号码</span><input type="text" placeholder="请输入用户手机号"  v-model="yyData.yyleader.yyleader_phone"
										></div>
										<div><span class="line">登录帐号</span><input type="text" placeholder="请输入用户账号" v-model="yyData.yyleader.yyleader_account"></div>
										<div><span class="line">登录密码</span><input type="text" placeholder="请输入用户密码" v-model="yyData.yyleader.yyleader_admin"></div>	
									</div>
									<div class="content_foot">
										<input type="button" value="保存" @click="upyyTeam" class="font">
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="财务">

								<div class="content">
									<div class="content_top">
										<div class="content_left" style="float:none;padding-left:0;">
											<img :src="img.op2=='' ? iniTimg:img.op2" alt="">
											<el-upload
											class="upload-demo"
											action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=0"
											accept=".jpg, .png"
											:on-success="handlePreview2"
											:show-file-list= "false"
											list-type="picture">
											<el-button size="small" type="primary">点击上传</el-button>
											<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
										</el-upload>
									</div>
								</div>
								<div class="content_cent">
									<div>
										<div >
											<span class="line">用户姓名</span><input type="text" placeholder="请输入用户姓名" v-model="yyData.yyfinance.yyfinance_name">	
										</div>	
									</div>
									<div><span class="line">手机号码</span><input type="text" placeholder="请输入用户手机号"  v-model="yyData.yyfinance.yyfinance_phone"></div>
									<div><span class="line">登录帐号</span><input type="text" placeholder="请输入用户账号" v-model="yyData.yyfinance.yyfinance_account"></div>
									<div><span class="line">登录密码</span><input type="text" placeholder="请输入用户密码" v-model="yyData.yyfinance.yyfinance_admin"></div>
								</div>
								<div class="content_foot">
									<input type="button" value="保存" @click="upyyFinance" class="font">
								</div>
							</div>
						</el-tab-pane>
						
						<el-tab-pane label="收银员">
							<div class="content">
								<div class="content_top">
									<div class="content_left" style="float:none;padding-left:0;">
										<img :src="img.op3=='' ? iniTimg:img.op3" alt="">										
										<el-upload
										class="upload-demo"
										action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=0"
										accept=".jpg, .png"
										:on-success="handlePreview3"
										:show-file-list= "false"
										list-type="picture">
										<el-button size="small" type="primary">点击上传</el-button>
										<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
									</el-upload>
								</div>
							</div>
							<div class="content_cent">
								<div>
									<div>
										<span class="line">用户姓名</span><input type="text" placeholder="请输入用户姓名" v-model="yyData.yymoney.yymoney_name">	
									</div>
								</div>
								<div><span class="line">手机号码</span><input type="text" placeholder="请输入用户手机号"  v-model="yyData.yymoney.yymoney_phone"></div>
								<div><span class="line">登录帐号</span><input type="text" placeholder="请输入用户账号" v-model="yyData.yymoney.yymoney_account"></div>
								<div>
									<span class="line">收银编号</span><el-select v-model="yyData.yymoney.yymoney_number" placeholder="请选择" id="options">
										<el-option
										v-for="item in optionss"
										id="optionss"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</div>
							<div><span class="line">登录密码</span><input type="text" placeholder="请输入用户密码" v-model="yyData.yymoney.yymoney_admin"></div>
						</div>
						<div class="content_foot">
							<input type="button" value="保存" @click="upyyMoney" class="font">
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="计免">
					<div class="content">
						<div class="content_top">
							<div class="content_left" style="float:none;padding-left:0;">
								<img :src="img.op4==''? iniTimg:img.op4" alt="">
								<el-upload
								class="upload-demo"
								action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=0"
								accept=".jpg, .png"
								:on-success="handlePreview4"
								:show-file-list= "false"
								list-type="picture">
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
							</el-upload>
						</div>
					</div>
					<div class="content_cent">
						<div>
							<div >
								<span class="line">用户姓名</span><input type="text" placeholder="请输入用户姓名" v-model="yyData.yyvicc.yy_name">	
							</div>
						</div>
						<div><span class="line">手机号码</span><input type="text" placeholder="请输入用户手机号"  v-model="yyData.yyvicc.yy_phone"></div>
						<div><span class="line">登录帐号</span><input type="text" placeholder="请输入用户账号" v-model="yyData.yyvicc.yy_account"></div>
						<div><span class="line">登录密码</span><input type="text" placeholder="请输入用户密码" v-model="yyData.yyvicc.yy_admin"></div>
					</div>
					<div class="content_foot">
						<input type="button" value="保存" @click="upyyvicc" class="font">
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="体检">
				<div class="content">
					<div class="content_top">
						<div class="content_left" style="float:none;padding-left:0;">
							<img :src="img.op5=='' ? iniTimg:img.op5" alt="">
							<el-upload
							class="upload-demo"
							action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=0"
							accept=".jpg, .png"
							:on-success="handlePreview5"
							:show-file-list= "false"
							list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m</div>
						</el-upload>
					</div>
				</div>
				<div class="content_cent">
					<div>
						<div >
							<span class="line">用户姓名</span><input type="text" placeholder="请输入用户姓名" v-model="yyData.yy.yy_name">	
						</div>
					</div>
					<div><span class="line">手机号码</span><input type="text" placeholder="请输入用户手机号"   v-model="yyData.yy.yy_phone"></div>
					<div><span class="line">登录帐号</span><input type="text" placeholder="请输入用户账号" v-model="yyData.yy.yy_account"></div>
					<div><span class="line">登录密码</span><input type="text" placeholder="请输入用户密码" v-model="yyData.yy.yy_admin"></div>
				</div>
				<div class="content_foot">
					<input type="button" value="保存" @click="upyyLeader" class="font">
				</div>
			</div>
		</el-tab-pane>
	</el-tabs>
	<!-- 卫计委账户 -->
	<el-tabs v-model="activeNames" class="tab_tab"  v-show="roledId == '3'" id="wjw">
		<el-tab-pane label="院长" name="five">
			<div class="content">
				<div class="content_top">
					<div class="content_left" style="float:none;padding-left:0;">
						<img :src="img.op6=='' ? iniTimg:img.op6" alt="">
						<el-upload
						class="upload-demo"
						action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=0"
						accept=".jpg, .png"
						:on-success="handlePreview6"
						:show-file-list= "false"
						list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m(没有可以不用上传)</div>
					</el-upload>
				</div>
			</div>
			<div class="content_cent">
				<div>
					<div >
						<span class="line">用户姓名</span><input type="text" placeholder="请输入用户姓名" @blur="checkeName(wjwData.wjwleader.wjwleader_name)" v-model="wjwData.wjwleader.wjwleader_name">	
					</div>
				</div>
				<div>
					<span class="line">医院名称</span><input type="text" name="" placeholder="添加社区医院"  v-model="wjwData.wjwleader.wjwleader_hospital">
				</div>
				<div>
					<span class="line">医院地址</span><input type="text" name=""  @change="long" placeholder="添加医院地址"v-model="wjwData.wjwleader.wjwleader_adress">
				</div>
				<div><span class="line">手机号码</span><input type="text" placeholder="请输入用户手机号"  v-model="wjwData.wjwleader.wjwleader_phone"></div>
				<div><span class="line">登录帐号</span><input type="text" placeholder="请输入用户账号" @blur="checkeName(wjwData.wjwleader.wjwleader_account)" v-model="wjwData.wjwleader.wjwleader_account"></div>
				<div><span class="line">登录密码</span><input type="text" placeholder="请输入用户密码" @blur="checkeName(wjwData.wjwleader.wjwleader_admin)" v-model="wjwData.wjwleader.wjwleader_admin"></div>
			</div>
			<div class="content_foot">
				<input type="button" value="保存" @click="upDean" class="font">
			</div>
		</div>
	</el-tab-pane>
	<el-tab-pane label="财务">
		<div class="content">
			<div class="content_top">
				<div class="content_left" style="float:none;padding-left:0;">
					<img :src="img.op7=='' ? iniTimg:img.op7" alt="">
					<el-upload
					class="upload-demo"
					action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=0"
					accept=".jpg, .png"
					:on-success="handlePreview7"
					:show-file-list= "false"
					list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2m(没有可以不用上传)</div>
				</el-upload>
			</div>
		</div>
		<div class="content_cent">
			<div>
				<div >
					<span class="line">用户姓名</span><input type="text" placeholder="请输入用户姓名" v-model="wjwData.wjwfinance.wjwfinance_name">	
				</div>
			</div>
			<div><span class="line">手机号码</span><input type="text" placeholder="请输入用户手机号" v-model="wjwData.wjwfinance.wjwfinance_phone"></div>
			<div><span class="line">登录帐号</span><input type="text" placeholder="请输入用户账号"  v-model="wjwData.wjwfinance.wjwfinance_account"></div>
			<div><span class="line">登录密码</span><input type="text" placeholder="请输入用户密码"  v-model="wjwData.wjwfinance.wjwfinance_admin"></div>
		</div>
		<div class="content_foot">
			<input type="button"  value="保存" @click="upWfinance" class="font">
		</div>
	</div>
</el-tab-pane>
</el-tabs>
</template>	
</el-tab-pane>	
</el-tabs>
</template>
</div>
</div>

</div>
</template>
<script>
import axios from 'axios'
import {MP} from '../../common/map.js'
import {familyDoctor,axoisPost,axoisPut} from "./../../common/util.js"
import iniTimg from '../../assets/images/image.png'
export default{
	data(){
		return{
			iniTimg:iniTimg,	//默认图片
			activeName: 'first',
			activeNames: 'five',
			dialogVisible: false,
			hospitalId:'',
			id:"",
			name:"",
			phone:"",
			roledId:"",
			token:"",
			loginId:"",
			account:"",
			user_name:"",
			admin:"******",
			select:true,
			checked:true,
			img:{
				op0:'',
				op1:'',
				op2:'',
				op3:'',
				op4:'',
				op5:'',
				op6:'',
				op7:'',
			},
			
			yyData:{
				yyleader:{
					yyleader_phone:"",
					yyleader_name:"",
					yyleader_admin:"",
					yyleader_img:"",
					yyleader_account:"",
					yyleader_type:"",
					yyleader_range:""
				},
				yyfinance:{
					yyfinance_phone:"",
					yyfinance_name:"",
					yyfinance_admin:"",
					yyfinance_account:"",
					yyfinance_img:"",
					yymoney_number:"",
				},
				yymoney:{
					yymoney_phone:"",
					yymoney_name:"",
					yymoney_admin:"",
					yymoney_img:"",
					yymoney_account:"",
				},
				yy:{
					yy_phone:"",
					yy_name:"",
					yy_account:"",
					yy_admin:"",
					yy_img:"",
				},
				yyvicc:{
					yy_phone:"",
					yy_name:"",
					yy_account:"",
					yy_admin:"",
					yy_img:"",
				}
			},
			wjwData:{
				wjwfinance:{
					wjwfinance_phone:"",
					wjwfinance_name:"",
					wjwfinance_admin:"",
					wjwfinance_img:"",
					wjwfinance_account:"",
				},
				wjwleader:{
					wjwleader_account:"",
					wjwleader_hospital:"",
					wjwleader_adress:"",
					wjwleader_name:"",
					wjwleader_phone:"",
					wjwleader_admin:"",
					wjwleader_img:"",
					lat:'',
					lng:'',
				}
			},
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
			optionss: [],
			value:"",
		}
	},
	methods:{
		//  正则
		judge:function(val){
			let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
			if(reg.test(val)&&val!=null){
				return
			}else{
				this.$message("请输入正确的手机号码");
			}
		},
		checkeName:function(name,admin,account){
			return name == ""|| admin == "" || account == ""
		},
		info:function(){
			this.user_name=window.localStorage.getItem("user_name")
		},
		// 经纬度获取
		long:function(){
			let _this = this
			let stie = _this.wjwData.wjwleader.wjwleader_adress
			MP("oGE2vseErZSNZRB4GDeOQ9bkyVjlzjOM").then(response=>{
				let map = new BMap.Map("l-map");
				// 创建地址解析器实例
				let myGeo = new BMap.Geocoder();
				myGeo.getPoint(stie, function(point){
					_this.wjwData.wjwleader.lng = point.lng
					_this.wjwData.wjwleader.lat = point.lat
				}, "武汉市")
			}).catch(error=>{

			})
		},
		// 请求数据
		requesrData:function(){
			let url = familyDoctor()
			let _this = this
			axios.get(url+"/whjtys/planning/findMyselfByid?account="+this.account+"&loginId="+_this.loginId+"&token="+_this.token).then((response)=>{
				this.phone=response.data.users.phone
				this.img.op0=response.data.users.user_img
				this.user_name=response.data.users.name
				this.account=response.data.users.account
			})
			axios.get(url+"/whjtys/user/userDetalis?loginId="+_this.loginId+"&token="+_this.token).then((response)=>{
				let sbb = response.data.pagehelper.list
				sbb.forEach(function(v,i) {
					_this.optionss.push({value:v.operatorId})
				});
			})
		},
		//上传头像
		handlePreview:function(response){
			this.img.op0 = response.url
		},
		handlePreview1:function(response){
			this.img.op1 = response.url
		},
		handlePreview2:function(response){
			this.img.op2 = response.url
		},
		handlePreview3:function(response){
			this.img.op3 = response.url
		},
		handlePreview4:function(response){
			this.img.op4 = response.url
		},
		handlePreview5:function(response){
			this.img.op5 = response.url
		},
		handlePreview6:function(response){
			this.img.op6 = response.url
		},
		handlePreview7:function(response){
			this.img.op7 = response.url
		},
		// 修改登陆人的信息
		upDate:function(){
			let url=familyDoctor()
			let images=window.sessionStorage.getItem("user_img")
			if(this.admin.length < 6){
				this.$message("密码不能低于六位数!")
				return
			}
			let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
			let data = {id:this.id,
				password:this.admin,
				phone:this.phone,
				img_url:this.img.op0,
				token:this.token,
				loginId:this.loginId
			}
			// put示例
			if(reg.test(this.phone)&&this.phone!=null){
				axoisPost("/whjtys/planning/updateMyself/",data).then(response=>{
					this.$message({
						message: response.data.msg,
						type: 'success'
					});
					localStorage.setItem("user_img", this.img.op0)
				})
			}else{
				this.dialogVisible=true
				this.$message("请输入正确的手机号码");
			}
		},
	   // 院长权限创建体检
	   upyyLeader:function(){
	   	let url=familyDoctor()
	   	if(this.checkeName(this.yyData.yy.yy_name,this.yyData.yy.yy_account,this.yyData.yy.yy_admin)){
	   		this.$message("请输入正确的信息");
	   		return
	   	}
	   	if(this.yyData.yy.yy_admin.length < 6){
	   		this.$message("密码不能低于六位数!")
	   		return
	   	}
	   	let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
		//    post示例
		if(reg.test(this.yyData.yy.yy_phone)&&this.yyData.yy.yy_phone!=null){
			let data = {
				roledId:6,
				name:this.yyData.yy.yy_name,
				account:this.yyData.yy.yy_account,
				phone:this.yyData.yy.yy_phone,
				pwd:this.yyData.yy.yy_admin,
				img:this.img.op5,
				token:this.token,
				loginId:this.loginId
			};
				axoisPost("/whjtys/planning/CreateUserJT/",data).then((response)=>{
					this.$message({
						message: response.data.msg,
						type: 'success'
					});
				})
			}else{
				this.$message("请输入正确的手机号码");
			}

		},
	   // 院长权限创建计勉
	   upyyvicc:function(){
	   	let url=familyDoctor()
	   	if(this.checkeName(this.yyData.yyvicc.yy_name,this.yyData.yyvicc.yy_account,this.yyData.yyvicc.yy_admin)){
	   		this.$message("请输入正确的信息");
	   		return
	   	}
	   	if(this.yyData.yyvicc.yy_admin.length < 6){
	   		this.$message("密码不能低于六位数!")
	   		return
	   	}
	   	let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
	   	if(reg.test(this.yyData.yyvicc.yy_phone)&&this.yyData.yyvicc.yy_phone!=null){
	   		axios.post(url+"/whjtys/planning/CreateUserJT/?roledId="+7+"&name="+this.yyData.yyvicc.yy_name+"&account="+this.yyData.yyvicc.yy_account+"&phone="+this.yyData.yyvicc.yy_phone+"&pwd="+this.yyData.yyvicc.yy_admin+"&img="+this.img.op4+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
	   			this.$message({
	   				message: response.data.msg,
	   				type: 'success'
	   			});
	   		})
	   	}else{
	   		this.$message("请输入正确的手机号码");
	   	}

	   },
	   // 院长创建社区医院收银员
	   upyyMoney:function(){
	   	let url=familyDoctor()
	   	if(this.checkeName(this.yyData.yymoney.yymoney_name,this.yyData.yymoney.yymoney_account,this.yyData.yymoney.yymoney_admin)){
	   		this.$message("请输入正确的信息");
	   		return
	   	}
	   	if(this.yyData.yymoney.yymoney_admin.length < 6){
	   		this.$message("密码不能低于六位数!")
	   		return
	   	}
	   	let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
	   	if(reg.test(this.yyData.yymoney.yymoney_phone)&&this.yyData.yymoney.yymoney_phone!=null){
	   		axios.post(url+"/whjtys/planning/CreateHospitalSyy/?name="+this.yyData.yymoney.yymoney_name+"&account="+this.yyData.yymoney.yymoney_account+"&phone="+this.yyData.yymoney.yymoney_phone+"&pwd="+this.yyData.yymoney.yymoney_admin+"&img="+this.img.op3+"&operator="+this.yyData.yymoney.yymoney_number+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
	   			if(response.data.msg.length<25){
	   				this.$message({
	   					message: response.data.msg,
	   					type: 'success'
	   				});
	   			}else{
	   				this.$alert('本中心还未开通支付宝线下收款功能，暂不支持创建该角色！如需开通请联系027-88859766。', '温馨提示', {
	   					confirmButtonText: '取消',
	   				});
	   			}
	   			
	   		})
	   	}else{
	   		this.$message("请输入正确的手机号码");
	   	}

	   },
	   // 院长创建社区医院财务
	   upyyFinance:function(){
	   	let url=familyDoctor()
	   	if(this.checkeName(this.yyData.yyfinance.yyfinance_name,this.yyData.yyfinance.yyfinance_account,this.yyData.yyfinance.yyfinance_admin)){
	   		this.$message("请输入正确的信息");
	   		return
	   	}
	   	if(this.yyData.yyfinance.yyfinance_admin.length < 6){
	   		this.$message("密码不能低于六位数!")
	   		return
	   	}
	   	let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
	   	if(reg.test(this.yyData.yyfinance.yyfinance_phone)&&this.yyData.yyfinance.yyfinance_phone!=null){
	   		axios.post(url+"/whjtys/planning/CreateBottomcw/?name="+this.yyData.yyfinance.yyfinance_name+"&account="+this.yyData.yyfinance.yyfinance_account+"&phone="+this.yyData.yyfinance.yyfinance_phone+"&pwd="+this.yyData.yyfinance.yyfinance_admin+"&img="+this.img.op2+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
	   			if(response.data.msg.length<25){
	   				this.$message({
	   					message: response.data.msg,
	   					type: 'success'
	   				});
	   			}else{
	   				this.$alert('本中心还未开通支付宝线下收款功能，暂不支持创建该角色！如需开通请联系027-88859766。', '温馨提示', {
	   					confirmButtonText: '取消',
	   				});
	   			}
	   		})
	   	}else{
	   		this.$message("请输入正确的手机号码");
	   	}

	   },
	   //院长创建社区医院队长
	   upyyTeam:function(){
	   	let url=familyDoctor()
	   	if(this.checkeName(this.yyData.yyleader.yyleader_name,this.yyData.yyleader.yyleader_account,this.yyData.yyleader.yyleader_admin)){
	   		this.$message("请输入正确的信息");
	   		return
	   	}
	   	if(this.yyData.yyleader.yyleader_admin.length < 6){
	   		this.$message("密码不能低于六位数!")
	   		return
	   	}
	   	if(this.yyData.yyleader.yyleader_type===""){
	   		this.$message("请输入正确的医生类型")
	   		return
	   	}
	   	let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
	   	if(reg.test(this.yyData.yyleader.yyleader_phone)&&this.yyData.yyleader.yyleader_phone!=null){
	   		axios.post(url+"/whjtys/planning/CreateUserLeader/?name="+this.yyData.yyleader.yyleader_name+"&account="+this.yyData.yyleader.yyleader_account+"&phone="+this.yyData.yyleader.yyleader_phone+"&pwd="+this.yyData.yyleader.yyleader_admin+"&img_url="+this.img.op1+"&doctor_type="+this.yyData.yyleader.yyleader_type+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
	   			this.$message({
	   				message: response.data.msg,
	   				type: 'success'
	   			});
	   		})
	   	}else{
	   		this.$message("请输入正确的手机号码");
	   	}

	   },
	   // 卫计委创建院长
	   upDean:function(){
	   	let url=familyDoctor()
	   	let _this=this
	   	if(this.checkeName(_this.wjwData.wjwleader.wjwleader_name,_this.wjwData.wjwleader.wjwleader_account,_this.wjwData.wjwleader.wjwleader_admin)){  
	   		this.$message("请输入正确的信息");
	   		return
	   	}
	   	if(_this.wjwData.wjwleader.wjwleader_admin.length < 6){
	   		this.$message("密码不能低于六位数!")
	   		return
	   	}
	   	let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
	   	if(reg.test(_this.wjwData.wjwleader.wjwleader_phone)&&_this.wjwData.wjwleader.wjwleader_phone!=null){
	   		axios.post(url+"/whjtys/planning/HospitalAdd/?name="+_this.wjwData.wjwleader.wjwleader_name+"&account="+_this.wjwData.wjwleader.wjwleader_account+"&password="+_this.wjwData.wjwleader.wjwleader_admin+"&phone="+_this.wjwData.wjwleader.wjwleader_phone+"&user_img="+_this.img.op6+"&hospital_name="+_this.wjwData.wjwleader.wjwleader_hospital+"&hospital_address="+_this.wjwData.wjwleader.wjwleader_adress+"&longitude="+_this.wjwData.wjwleader.lng+"&latitude="+_this.wjwData.wjwleader.lat+"&loginId="+_this.loginId+"&token="+_this.token).then((response)=>{
	   			this.$message({
	   				message: response.data.msg,
	   				type: 'success'
	   			});
	   		})
	   	}else{
	   		this.$message("请输入正确的手机号码");
	   	}

	   },
	   // 卫计委创建财务
	   upWfinance:function(){
	   	let url=familyDoctor()
	   	if(this.checkeName(this.wjwData.wjwfinance.wjwfinance_name,this.wjwData.wjwfinance.wjwfinance_account,this.wjwData.wjwfinance.wjwfinance_admin)){
	   		this.$message("请输入正确的信息");
	   		return
	   	}
	   	if(this.wjwData.wjwfinance.wjwfinance_admin.length < 6){
	   		this.$message("密码不能低于六位数!")
	   		return
	   	}
	   	let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
	   	if(reg.test(this.wjwData.wjwfinance.wjwfinance_phone)&&this.wjwData.wjwfinance.wjwfinance_phone!=null){
	   		axios.post(url+"/whjtys/planning/CreateTopcw/?name="+this.wjwData.wjwfinance.wjwfinance_name+"&account="+this.wjwData.wjwfinance.wjwfinance_account+"&pwd="+this.wjwData.wjwfinance.wjwfinance_admin+"&phone="+this.wjwData.wjwfinance.wjwfinance_phone+"&img="+this.img.op7+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
	   			this.$message({
	   				message: response.data.msg,
	   				type: 'success'
	   			});
	   		})
	   	}else{
	   		this.$message("请输入正确的手机号码");
	   	}
	   	
	   }
	},
	watch: {
		$route() {
			this.$router.go(0)
		}
	},
	created:function(){
		 this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
		this.hospitalId = window.localStorage.getItem('hospitalId')
		this.id=window.localStorage.getItem("userID")
		this.name=window.localStorage.getItem("user_name")
		this.account=window.sessionStorage.getItem("account")
		this.img.op0=window.localStorage.getItem("user_img")
		this.roledId=window.localStorage.getItem("id")
		if(this.roledId==4||this.roledId==1||this.roledId==3){
			this.select=false	
		}else{
			this.select=true	
		}
		this.requesrData()
	}
}
</script>
<style scoped>

.line{
	display: block;
	height: 32px;
	line-height: 32px;
	float: left;
	font-size: 14px;
	text-align: right;
}
.font{
	font-size: 17px;
	border-radius: 0px!important;
}
.down{
	height: 915px;
	width: 100%;
}
.down .navbar {
	height: 60px;
	background-color: white;
	width: 100%;
}
.content{
	width: 100%;
	background-color: #fff;
	text-align: center;
	margin-top: 10px;
	padding-top: 20px;
	padding-bottom: 40px
}
.content .content_cent{
	margin-top: 3%;
	margin: auto;
	width: 290px;
}
.content .content_right{
	margin: auto 0;
}
.content .content_right h2{
	line-height: 40px;
}
.content .content_right p{
	color: #a5d297;
}
.content .content_top{
	width: 80%;
	height: 20%;
	margin: 0 auto;
}
.content_top .content_left > img{
	width:90px;
	height: 90px;
	border-radius: 50%;
	display:inline-block;
	margin-bottom: 15px;
}
.content .content_cent > div{
	margin: 38px 0;
}

.content .content_cent > div input{
	width: 198px;
	height: 30px;
	padding-left: 10px;
	border: none;
	font-size: 14px!important;
	border: 1px solid #bfcbd9
}
.content .content_cent > div:first-child input{
	width: 198px;
}

.content .content_foot input{
	width: 140px;
	height: 40px;
	background-color: #49c7c4;
	color: #fff;
	border: none;
	line-height: 40px;
	cursor: pointer;
}
.content input {
	outline: none;
	/*border-radius: 4px;*/
}
.tab_tab{
	width: 100%;
	height: 50px;
	margin-bottom: 10px;
}
.el-upload__tip{
	padding:14px 0;
	border-bottom: 1px solid #e9e0e0;
}
input{
	font-size: 14px!important
}
</style>