 
<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">社区医院</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">医院介绍</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div id="nav_hospital" class="down">
			<el-tabs v-model="activeName" style="height:100%;">
				<el-tab-pane label="医院设置" name="first" style="height:100%">
					<div class="nav_content">
						<div class="set_info clear">
							<div>
								<span>医院名称</span>
								<div>
									<input type="text" name="" v-model="hospitalInfo.name">
								</div>
							</div>
							<div>
								<span>医院电话</span>
								<div>
									<input type="text" name="" v-model="hospitalInfo.phone">
								</div>
							</div>
						</div>
						<div class="set_info1">
							<span>医院地址</span>
							<div>
								<input type="text" name="" v-model="hospitalInfo.site">
							</div>
						</div>
						<div class="set_info1">
							<span style="line-height:14px;">医院图片</span>
							<div style="width:100%;box-sizing:border-box;padding-left: 70px;">
								<el-upload
								action="http://114.215.16.82:8080/whjtys/uploadFile/uploadFile?id=2"
								list-type="picture-card"
								accept=".jpg, .png"
								:on-success="handlePreview"
								:beforeUpload="beforeAvatarUpload"
								:on-remove="beforeRemove"
								ref="upload"
								:file-list="hospitalInfo.fileList3"
								>
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible" size="tiny">
								<img width="100%" :src="dialogImageUrl=='null'||dialogImageUrl== null ? iniTimg:dialogImageUrl" alt="">
							</el-dialog>
							<span style="color:#ccc;font-size:14px">上传3张图片(第一张为医院门头照,支持jpg png格式)</span>
						</div>
					</div>
					<div class="set_info1">
						<span style="line-height:32px;">医院介绍</span>
						<div>
							<textarea maxlength="150" type="text" size="100%" v-model="hospitalInfo.description" @keyup="maxlength()"></textarea>
						</div>
					</div>
					<div class="set_info1">
						<span  style="line-height:32px;">医院公告</span>
						<div>
							<textarea maxlength="150" type="text" height="50" v-model="hospitalInfo.notice" @keyup="maxlength()"></textarea>
						</div>
					</div>
					<span class="sure_ok" 	 @click="setSeve()">保存</span>
				</div>
			</el-tab-pane>
			<el-tab-pane label="服务设置" name="second">
				<div class="service_content">
					<ul class="service">
						<li>
							<div class="top">
								<div>计免疫苗</div>
								<div>
									<ul class="week">
										<li v-for="(item,index) in weeks" @click="vacWeek(item)" v-bind:class="{ active: item.isActive }">
											{{item.num}}
										</li>
									</ul>
								</div>
								<div>
								<template>
										<el-time-select
										placeholder="起始时间"
										v-model="value2"
										:picker-options="{
											start: '07:30',
											step: '00:15',
											end: '18:30'
										}">
									</el-time-select>
									<el-time-select
									placeholder="结束时间"
									v-model="value3"										
									:picker-options="{
										start: '08:30',
										step: '00:15',
										end: '18:30',
										minTime: value2
									}">
									</el-time-select>
								</template>
							<input type="text" class="sever_num" v-model="value6" >
						</div>
					</div>
					<div class="down">
						<ul>
							<li style="width:10%;text-align:right;margin-right:3%;color:#ccc">已设置</li> 
							<li ><span style="color:#49c7c4;margin-right:10px;">{{top_day}}</span></li>
							<li style="margin-left:10px;color:#ccc">时间：<span style="color:#49c7c4">{{time.ep_order_time}}</span></li>
							<li style="margin-left:10px;color:#ccc">总数：<span style="color:#49c7c4">{{value66}}</span></li>
							<li class="remove" @click="removeOrder(1)">重置</li>
						</ul>
					</div>
				</li>
				<li>
					<div class="top">
						<div>老年人体检</div>
						<div>
							<ul class="week">
								<li v-for="(item,index) in week" @click="medWeek(item)" v-bind:class="{ active: item.isActive }">
									{{item.num}}
								</li>
							</ul>
						</div>
						<div>
							<template>
								<el-time-select
								placeholder="起始时间"
								v-model="value4"
								:picker-options="{
									start: '07:30',
									step: '00:30',
									end: '18:30'
								}">
							</el-time-select>
							至
							<el-time-select
							placeholder="结束时间"
							v-model="value5"									
							:picker-options="{
								start: '08:30',
								step: '00:15',
								end: '18:30',
								minTime: value4
							}">
						</el-time-select>
					</template>
					<input type="text" class="sever_num" v-model="value7">
				</div>
			</div>
			<div class="down">
				<ul>
					<li style="width:10%;text-align:right;margin-right:3%;color:#ccc">已设置</li>
					<li style="color:#49c7c4;margin-right:10px;">{{down_day}}</li>
					<li style="color:#ccc">时间：<span style="color:#49c7c4">{{time.pe_order_time}}</span></li>
					<li style="margin-left:10px;color:#ccc">总数：<span style="color:#49c7c4">{{value77}}</span></li>
					<li class="remove" @click="removeOrder(0)">重置</li>
				</ul>
			</div>
		</li>
		<li style="height:150px">
			<span class="service_sub" @click="serveSeve">保存</span>
		</li>


	</ul>
	<!-- 创建 -->
	<ul class="build_hospital">
		<li>
			<div>社区创建</div>
			<div><input type="text" name="" v-model="community_name" placeholder="输入创建社区名称" style="padding-left:5px;"></div>
			<div >
				<el-button type="text" @click="displaypeople" style="color:white;font-size:16px;height:40px;width:100%;display:block"> 创建</el-button>
				<el-dialog
				id="people_dialog"
				:visible.sync="dialogVisible">
				<div class="select_team">
					<span><i>{{data3.hospital_name}}</i>-选择医生团队</span>
				</div>
				<div id="selecting">
					<template>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="items in userlist_jy" :key="items.doctorGroupId" :value="items.doctorGroupId" :label="items.name">
							</el-option>
						</el-select>
					</template>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addHospital">确 定</el-button>
					<el-button @click="dialogVisible = false" class="reset">取 消</el-button>
				</span>
			</el-dialog>
		</div>
	</li>
	<li>
		<div style="float:left">已创建</div><span style="padding-top:1px;color:#6f7378;font-size:15px;height:20%;display:block;width:94%;margin-top:10px;float:left">(点击社区名称可删除该社区)</span>
		<ul class="many_people" v-for="items in Community">
			<li @click="removeName(items.id)" style="cursor: pointer;">
				{{items.community_name}}
			</li>

		</ul>
	</li>
</ul>
</div>
</el-tab-pane>
</el-tabs>
</div>	
</div>
</template>
<script>
import axios from 'axios'
import{familyDoctor,getLastDate} from "../../common/util.js"
import {MP} from "../../common/map.js"
import iniTimg from '../../assets/images/image.png'
export default{
	data(){
		return{
			iniTimg:iniTimg,
			Community:{},
			activeName: 'first',
			dialogImageUrl: '',
			userlist_jy:[],
			dialogVisible: false,
			value2:"",		//疫苗开始时间
			value3:"",		//疫苗结束时间
			value6:'',		//疫苗人数		
			value66:'0',
			value4:'',		//体检开始时间
			value5:'',		//体检结束时间
			value7:'',		// 体检人数
			value77:'0',
			top_day:[],   
			down_day:[], 
			token:"",
			loginId:"",
			time:{
				ep_order_time:"",//计勉时间
				pe_order_time:""//体检时间
			},
			hospitalInfo:{
				name:'',
				phone:'',
				site:'',
				description:'',
				notice:'',
				lat:'',
				lng:'',
				fileList3: []
			},
			value:'',
			data3:{},
			community_name:"",
			weeks:[{
				num:'一',
				isActive:false
			},{
				num:'二',
				isActive:false
			},{
				num:'三',
				isActive:false
			},{
				num:'四',
				isActive:false
			},{
				num:'五',
				isActive:false
			},{
				num:'六',
				isActive:false
			},{
				num:'日',
				isActive:false
			}],
			week:[{
				num:'一',
				isActive:false
			},{
				num:'二',
				isActive:false
			},{
				num:'三',
				isActive:false
			},{
				num:'四',
				isActive:false
			},{
				num:'五',
				isActive:false
			},{
				num:'六',
				isActive:false
			},{
				num:'日',
				isActive:false
			}],
			img:[],
			hospital_id:null,
		}
	},
	created:function(){
		 this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
		this.requestData()
		this.hospital_id = window.localStorage.getItem("hospitalId")	
	},
	watch: {
		$route() {
			this.$router.go(0)
		},
		value6:function(){
			if(this.value6 >= 100 || this.value6<-1){
				this.value6 = 100
			}
		},
		value7:function(){		
			if(this.value7 >= 100 || this.value7<-1){
				this.value7 = 100
			}
		}
	},
	methods:{
		maxlength:function(){
			if(this.hospitalInfo.description.length>=150){
				this.$message("输入文字数控制在150以内！")
			}
			if(this.hospitalInfo.notice.length>=150){
				this.$message("输入文字数控制在150以内！")
			}
		},
		// 删除社区
		removeName:function(a){
			this.$confirm("此操作将删除该社区, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				let url=familyDoctor()
				axios.post(url+"/whjtys/planning/deleteCommunityById/"+a+"?loginId="+this.loginId+"&token="+this.token).then((response)=>{
					this.$message(response.data.msg)
					this.requestData()
				})	
			})	
		},
		// 清除配置服务
		removeOrder:function(a){
			let url=familyDoctor()
			this.$confirm("此操作将清空该服务配置, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				axios.post(url+"/whjtys/planning/updateHospitalServer?cleanType="+a+"?loginId="+this.loginId+"&token="+this.token).then((response)=>{
					this.$message(response.data.msg)
					this.requestData()
				})
			})
			
		},
		// 经纬度获取
		long:function(){
			let _this = this
			let stie = _this.hospitalInfo.site
			MP("oGE2vseErZSNZRB4GDeOQ9bkyVjlzjOM").then(response=>{
				let map = new BMap.Map("l-map");
				// 创建地址解析器实例
				let myGeo = new BMap.Geocoder();
				myGeo.getPoint(stie, function(point){
					_this.hospitalInfo.lng = point.lng
					_this.hospitalInfo.lat = point.lat
				}, "武汉市")
			}).catch(error=>{
			})
		},
		//上传头像
		handlePreview:function(response,fileList,file){
			if(file.length <= 3){
				this.$refs.upload.disabled == false
				this.img.push(response.url)
				return
			}else{
				file.pop(file[3])
				this.$message.warning('只能上传三张图片')
			}
		},
		//删除头像
		beforeRemove(file, fileList){
			this.img.forEach((v,i)=>{
				if(v == file.url){
					this.img.splice(i,1)
				}
			})
		},
		// 上传前对文件的大小的判断
		beforeAvatarUpload (file) {
			const extension = file.name.split('.')[1] === 'jpg'
			const extension2 = file.name.split('.')[1] === 'png'
			const extension3 = file.name.split('.')[1] === 'JPG'
			const extension4 = file.name.split('.')[1] === 'PNG'
			const isLt2M = file.size / 1024 / 1024 < 2
			if (!extension && !extension2 && extension3 && extension4) {
				this.$message.warning('上传只能是 jpg、png 格式图片!')
			}
			if (!isLt2M) {
				this.$message.warning('上传模板大小不能超过 2MB!')
			}
			return extension || extension2  || extension3  || extension4 && isLt2M
		},
		
		// 星期获取
		vacWeek:function(item){
			item.isActive = !item.isActive
		},
		medWeek:function(item){
			item.isActive = !item.isActive
		},
		// 医院设置保存
		setSeve:function(){
			let url=familyDoctor()
			let _this = this
			if(_this.img[0] == undefined){
				this.$message("请至少上传一张门头照")
				return
			}
			let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
			if(reg.test(_this.hospitalInfo.phone)&&_this.hospitalInfo.phone!=null){
				
			}else{
				this.$message("请输入正确的手机号码");
				return
			}
			let img1 = _this.img[0] === undefined ? "":_this.img[0]
			let img2 = _this.img[1] === undefined ? "":_this.img[1]
			let img3 = _this.img[2] === undefined ? "":_this.img[2]		
			let data ="&hospital_name="+_this.hospitalInfo.name +"&phone="+_this.hospitalInfo.phone+"&img_url1="+img1+"&img_url2="+img2+"&img_url3="+img3+"&hospital_address="+_this.hospitalInfo.site+"&description="+_this.hospitalInfo.description+"&notice="+_this.hospitalInfo.notice+"&longitude="+_this.hospitalInfo.lng+"&latitude="+_this.hospitalInfo.lat+"&loginId="+_this.loginId+"&token="+_this.token
			axios.post(url+"/whjtys/planning/updateHospital?id="+_this.hospital_id+data).then((response)=>{
				_this.$message(response.data.msg)
				_this.requestData()

			})
		},
		// 医院服务保存
		serveSeve:function(){
			let epi_order_time = this.value2+"-"+this.value3
			let pe_order_time = this.value4+"-"+this.value5
			let epi_days = ""
			let pe_days=""
			this.weeks.forEach(function(item,i) {
				if(item.isActive){
					epi_days += item.num+","
				}
			});
			this.week.forEach(function(item,i) {
				if(item.isActive){
					pe_days += item.num+","
				}
			});
			epi_days = epi_days.substr(0,epi_days.length-1)
			pe_days = pe_days.substr(0,pe_days.length-1)
			let url = familyDoctor();
			if((this.value6 > 0 &&epi_order_time.length > 6 && epi_days!="")||(this.value7 > 0&&pe_order_time.length > 6 && pe_days!="")){
			}else{
				this.$message("请设置完整的服务条件！")
				return
			}
			axios.post(url+"/whjtys/planning/updateHospitalServer?epi_days="+epi_days+"&epi_order_time="+epi_order_time+"&epi_day_count="+this.value6+"&pe_days="+pe_days+"&pe_order_time="+pe_order_time+"&pe_day_count="+this.value7+"&loginId="+this.loginId+"&token="+this.token).then(response=>{
				this.$message(response.data.msg)
				this.requestData()
			})
		},
		requestData:function(){
			// 原始数据请求
			let url=familyDoctor()
			axios.get(url+"/whjtys/planning/findAllHospitalById?loginId="+this.loginId+"&token="+this.token).then((response)=>{
				let r = response.data.hospital
				console.log(response)
				this.data3 = response.data.hospital
				this.hospitalInfo.name = r.hospital_name
				this.hospitalInfo.phone = r.phone
				this.hospitalInfo.site = r.hospital_address
				this.hospitalInfo.description = r.description
				this.hospitalInfo.notice = r.notice
				this.top_day=r.epi_days
				this.down_day=r.pe_days
				if(response.data.hospital.img_url !== null){
					let img =response.data.hospital.img_url.split(",")
					let _this =this
					_this.hospitalInfo.fileList3 = []
					this.img = []
					img.forEach(function(v,i) {
						_this.hospitalInfo.fileList3.push({'url':img[i]})
						_this.img.push(img[i])
					});
				}
				this.long()
				//计免
				this.value66 = r.epi_day_count
				console.log(r.epi_day_count)
				let epi_time ,epi_days ,pe_order_time,pe_days
				this.time.pe_order_time=r.pe_order_time
				// console.log(this.time.pe_order_time)
				// 体检
				this.value77 = r.pe_day_count
				this.time.ep_order_time=r.epi_order_time
			})
			// 展示社区
			let hospital_id=window.localStorage.getItem("hospitalId")
			axios.get(url+"/whjtys/planning/findCommunityById/"+hospital_id+"?loginId="+this.loginId+"&token="+this.token).then((response)=>{
				this.Community=response.data.list
			}).catch(error=>{
				this.$message("请填写完整信息")
			})
		},
		// 添加社区
		addHospital:function(){
			let _this = this
			let url=familyDoctor()
			if(this.value.length<=0){
				this.$message("请选择医生团队！")
				this.dialogVisible = true
				return
			}else{
				axios.post(url+"/whjtys/planning/Addcommunity?community_name="+_this.community_name+"&hospital_id="+_this.hospital_id+"&doctor_group_id="+_this.value+"&loginId="+_this.loginId+"&token="+_this.token)
				.then((response)=>{
					this.community_name=""
					this.$message(response.data.msg);
					this.requestData()
					this.dialogVisible = false
				})
			}
			
		},
		// 展示团队
		displaypeople:function(){
			let _this = this
			let url = familyDoctor();
			let  reg=/^([\u4e00-\u9fa5]){2,7}$/; 
			if(!reg.test(this.community_name)){       
				this.$message("请输入正确的社区名称！")      
				return ;
			}     
			axios.get(url + "/whjtys/planning/findDoctorLeader/id=" + this.hospital_id+"&loginId="+_this.loginId+"&token="+_this.token).then(response=>{
				this.dialogVisible = true
				this.userlist_jy = response.data.userlist_jy
			})
		},
	}
}
</script>
<style scoped>

#nav_hospital > div > div.el-tabs__content > div:nth-child(2) > div > ul.build_hospital > li:nth-child(1) > div:nth-child(3) > button > span{
	display: block;
	height: 40px;
	width: 100%;
}
.reset:hover{
	color: #49c7c4;
	border-color:#49c7c4;

}
.active{
	background-color: #49c7c4;
	color: #fff!important;
}
#nav_hospital{
	width: 100%;
	height: 660px;
}
.nav_content{
	width: 100%;
	height: 96%;
	background-color: #fff;
	padding: 50px 100px;
	box-sizing: border-box;
}
.set_info > div:last-child{
	float: right;
	width: 35%;
}
.set_info > div:first-child{
	float: left;
	width: 60%;
}
.set_info > div > span,
.set_info1 > span{
	float: left;
	line-height: 35px;
	font-size: 15px;
}
.set_info > div > div{
	width: 100%;
	padding-left: 70px;
	box-sizing: border-box;
}
.set_info1 > div{
	width: 100%;
	padding-left: 70px;
	box-sizing: border-box;
	margin:20px 0 ;
}
.set_info > div > div > input,
.set_info1 > div > input{
	width: 100%;
	height: 33px;
	border: none;
	border: 1px solid #ccc;
	font-size: 15px;
	padding-left: 5px;
	box-sizing: border-box;
}
.set_info1:nth-of-type(4) > div > textarea,
.set_info1:nth-of-type(5) > div > textarea{
	width: 100.5%;
	height: 50px;
	resize: none;
	border: 1px solid #ccc;
	font-size: 15px;
	padding: 5px;
	box-sizing: border-box;
}

#nav_hospital > div > div.el-tabs__content > div:nth-child(1) > div > ul > li:nth-child(2) > div{
	height: 3%
}
/*服务设置*/
.service{
	width: 100%;
	padding:0 4%;
	box-sizing: border-box;
	background-color: white;
}
.service>li{
	height: 145px;
	width: 100%;

	background-color: white;
	border-bottom:1px solid #ccc;
}
.service>li:nth-of-type(3){
	border: none;
	height: 100px!important;
}
.service>li .top{
	height: 90px;
}
.service>li .down{
	height: 55px;
}
.down>ul{
	height: 55px;
	position: relative;
}
.down>ul li{
	float: left;
	height: 55px;
	line-height: 55px;
}
.service>li>div>div:nth-of-type(1){
	width: 10%;
	height: 76px;
	margin-right: 3%;
	line-height: 116px;
	float: left;
	text-align: right;
}
.service>li>div>div:nth-of-type(2){
	height: 76px;
	width: 45%;
	float: left;
}
.service>li>div>div:nth-of-type(3){
	height: 40px;
	width: 42%;
	float: left;
	padding-top: 35px;
	position: relative;
}
.service > li:nth-child(2) > div:nth-child(1){

}
.service>li .week{
	height: 40px;
	padding-top: 36px;
}
.service .week li{
	float: left;
	height: 34px;
	width: 11%;
	border-radius: 8px;
	border: 1px solid #49c7c4;
	text-align: center;
	margin-right: 2%;
	line-height: 35px;
	cursor: pointer;
	color: #49c7c4;
}
.service>li .week li:hover{
	background-color: #49c7c4;
	color: #fff;
}
.service .weeks,.service .peoples,.service  .time{
	height: 50px;
	border: none;
	color: #49c7c4;
	text-align: center;
	line-height: 50px;
	display: inline-block;
}
.service  .weeks{
	width: 65%;
	text-align: center;
}
.service  .peoples{
	padding-top: 0;
	width: 12%;
	text-align: right;
}
.service  .time{
	width: 23%;
}
.sever_num{
	display: block;
	height: 34px;
	line-height: 38px;
	text-align: center;
	border: 1px solid #ccc;
	width: 10%;
	position: absolute;
	right: 0;
	top: 47%;
}
.service>li:nth-of-type(4) .tip{
	width: 100%;
}
.service>li:nth-of-type(4) .tip ul{
	height: 150px;
	padding-top: 15px;
}
.service>li:nth-of-type(4) .tip ul>li{
	height: 75px;
	line-height: 75px;
	float: left;
}
.service>li:nth-of-type(4) .tip ul>li>ul{
	height: 75px;
	padding: 0;
}
.service>li:nth-of-type(4) .tip ul>li>ul li{
	float: left;

}
.service_sub{
	background-color: #49c7c4;
	width: 15%;
	height: 40px;
	display: block;
	line-height: 40px;
	text-align: center;
	color: white;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -7%;
	margin-top: -20px;
	cursor: pointer;
}
/**/
.build_hospital{
	margin-top: 10px; 
	width: 100%;
	padding: 0 4%;
	background-color: white;
	box-sizing: border-box;
}
.build_hospital>li:nth-of-type(1){
	border-bottom: 1px solid #ccc;
	height: 96px;
	width: 100%;
	position: relative;
} 
.build_hospital>li:nth-of-type(1)>div:nth-of-type(1){
	height: 96px;
	width: 80px;
	line-height: 96px;
	float: left;
	font-size:16px ;
}
.build_hospital>li:nth-of-type(1)>div:nth-of-type(2){
	float: left;
	width: 279px;
	height: 40px;
	position: absolute;
	top: 50%;
	left:90px;
	margin-top: -21px
}
.build_hospital>li:nth-of-type(1)>div:nth-of-type(2) input{
	height: 38px;
	width: 213px;
	border: 1px solid #ccc;
	padding-left: 2px;
	font-size: 16px;
}
.build_hospital>li:nth-of-type(1)>div:nth-of-type(3){
	background-color: #49c7c4;
	width: 110px;
	float: left;
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: white;
	position: absolute;
	top: 50%;
	left:350px;
	margin-top: -21px;
	cursor: pointer;
}
.build_hospital>li:nth-of-type(2){
	height: 150px;
	width: 100%;
}
.build_hospital>li:nth-of-type(2)>div{
	height:20%;
	margin-top:10px;
	width: 6%;
}
.many_people li{
	height: 13%;
	padding: 5px 9px 5px 9px;
	border: 1px solid #49c7c4;
	border-radius: 15px;
	float: left;
	margin-right: 10px;
	margin-top: 5px;
	background-color: #49c7c4;
	color: white;
	font-family: FZLTXHK!important;
}
#people_dialog .select_team{
	height: 68px;
	line-height: 68px;
	border-bottom: 1px solid #ccc;
}
#people_dialog .select_team span{
	width: 345px;
	height: 24px;
	display: block;
	margin: auto;
	text-align: center;
}
#people_dialog .select_team span>i{
	color: #49c7c4
}
#selecting{
	height: 89px;
}
/*清除*/
.service .remove_order,.service .remove{
	height: 36px!important;
	line-height: 36px!important;
	width: 78px;
	color: #49c7c4;
	text-align: center;
	margin-left: 15px;
	font-family: MicrosoftYaHei!important;
	font-size: 13px;
	cursor: pointer;
	position: absolute;
	right: 0;
	border:1px solid #49c7c4;
}
.el-date-editor.el-input {
	width: 130px;
}
.sure_ok{
	background-color: #49c7c4;
	width: 15%;
	height: 40px;
	display: block;
	line-height: 40px;
	text-align: center;
	color: white;
	position: absolute;
	bottom: 15%;
	left: 50%;
	margin-left: -7%;
	margin-top: -20px;
	cursor: pointer;
}
</style>

