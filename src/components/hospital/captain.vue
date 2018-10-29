<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">社区医院</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">团队概况</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div class="contain">
			<div class="content">
				<div class="top">
					<div class="team_left">
						<div>
							<div><img :src="up_img=='null'||up_img== null ? iniTimg:up_img"  height="112" width="112" ></div>
							<span class="titel_name">院长</span>
						</div>
						<ul>
							<li>{{name}}</li>
              <li >{{hospitalName}}</li>
				  </ul>
			</div>
			<div class="team_right">
				<ul>
					<li>
						<div><img src="../../assets/images/签约.png" height="83" width="69"></div>
						<div>
							<span>签约</span>
							<i>{{allSigningSuccessCount}}</i>
						</div>
					</li>
					<li>
						<div><img src="../../assets/images/驳回.png" height="83" width="69"></div>
						<div>
							<span>驳回</span>
							<i>{{allRebutCount}}</i>
						</div>
					</li>
					<li>
						<div><img src="../../assets/images/计勉.png" height="83" width="70"></div>
						<div>
							<span>疫苗</span>
							<i>{{allvaccineCount}}</i>
						</div>
					</li>
					<li>
						<div><img src="../../assets/images/宫颈癌.png" height="83" width="69"></div>
						<div>
							<span>宫颈癌</span>
							<i>{{allGjaVaccine}}</i>
						</div>
					</li>
					<li>
						<div><img src="../../assets/images/体检.png" height="83" width="69"></div>
						<div>
							<span>体检</span>
							<i>{{allpeCount}}</i>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="down">
			<div class="navbar">
				<template>
					<el-tabs id="nav_tab" v-model="activeName">
						<el-tab-pane label="家医" name="first">
							<ul class="doctor_list" >
                <li v-for="item in data_jy">   
					<router-link  :to="{path:'/team/teamdetails',query:{itemId:item.doctorGroupId}}">
						<div class="list">
						<div>{{item.name}}</div>
						<div>查看</div>
					</div>
					</router-link>
                </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="财务" name="second">
           <ul class="doctor_list">
            <li v-for="item in data_cw">        
              <div class="list">
               <div>{{item.name}}</div>
             </div>        
         </li>	
       </ul>	
     </el-tab-pane>
     <el-tab-pane label="疫苗" name="third">
       <ul class="doctor_list">
        <li v-for="item in data_ym">       
          <div class="list">
           <div>{{item.name}}</div>
         </div>  
     </li>	
   </ul>	
 </el-tab-pane>
 <el-tab-pane label="体检" name="fourth">
   <ul class="doctor_list">
    <li v-for="item in data_tj">
      <div class="list">
       <div>{{item.name}}</div>
     </div>
 </li>	
</ul>	
</el-tab-pane>
</el-tabs>
</template>
</div>
<div class="nav_content"></div>
</div>
</div>
</div>

</div>
</template>
<script>
import axios from "axios"
import {familyDoctor} from "./../../common/util.js"
import vm from '../../bus.js'    //引用相同文件
import iniTimg from '../../assets/images/image.png'

export default{
	data(){
		return{
			iniTimg:iniTimg,	//默认图片
			activeName: 'first',
			search:'',		//搜索
			dialogVisible: false,  // 详情弹窗
			name:"", 
      token:"",
      loginId:"",   
			up_img:"",
			poValue:'',   //职位
			hos_id:"",
			hospitalName:"",
			allSigningSuccessCount:"",
			allvaccineCount:"",
			allGjaVaccine:"",
			allRebutCount:"",
			allpeCount:"", 
  			data_jy:[],	//userlist_cw    userlist_jy   userlist_tj   userlist_ym
  			data_cw:[],
  			data_tj:[],
  			data_ym:[],
  		}
  },
  watch: {
    $route() {
      this.$router.go(0)
    }
  },
  	methods:{
  		requestData:function(){
  			let url=familyDoctor()
       axios.get(url+"/whjtys/planning/finTeamByHospitalId/"+this.hos_id+"?loginId="+this.loginId+"&token="+this.token).then((response)=>{ 	
        this.data_jy = response.data.userlist_jy
        this.data_cw = response.data.userlist_cw
        this.data_tj = response.data.userlist_tj
        this.data_ym = response.data.userlist_ym
      })
       axios.get(url+"/whjtys/data/allDetalis/?hospitalId="+this.hos_id+"&loginId="+this.loginId+"&token="+this.token).then((response)=>{
         this.allGjaVaccine=response.data.allGjaVaccine
         this.allvaccineCount=response.data.allvaccineCount
         this.allSigningSuccessCount=response.data.allSigningSuccessCount
         this.allRebutCount=response.data.allRebutCount
         this.allpeCount=response.data.allpeCount
       })
       axios.get(url+"/whjtys/planning/findPresidentByHospitalId/"+this.hos_id+"?loginId="+this.loginId+"&token="+this.token).then((response)=>{
          this.hospitalName=response.data.hospitalName
          this.name=response.data.name
          this.up_img=response.data.img
        
       })
     },
    },
    created:function(){
       this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
      this.hos_id=this.$route.query.itemid;
      if(this.hos_id==undefined){
          this.hos_id=window.localStorage.getItem("hospitalId")
      }
        this.requestData()
      }
  }
  </script>
  <style scoped>
  /*个人信息*/
  #app #information{
  	height: 744px;
  	margin-top: -100px;
  	width: 350px;
  	top: -100px;
  	position: absolute;
  	left: 400px;
  	padding: 31px 20px 54px 20px;
  	text-align: center;
  }
  #app #information > .el-dialog--tiny{
  	width: 100%;

  	/*height: 60%;*/
  }
  #app #information > .el-dialog{

  }
  #app #information > div > div.el-dialog__header{
  	width: 100%;
  	padding: 0;
  	padding: 0 20px;
  	box-sizing: border-box;
  }
  #information > div > div.el-dialog__header > span{
  	display: block;
  	line-height: 60px;
  	text-align: left;
  	border-bottom: 1px solid #ccc;
  	padding-left: 15px;
  }
  #information > div > div.el-dialog__header > button{
  	display: none;
  }
  #app #information > div > div.el-dialog__body{
  	padding: 0;
  	padding-top:20px; 
  }
  #app #information > div > div.el-dialog__body> div > div:nth-child(2){
  	margin-top: 6px;
  }
  #app #information > div > div.el-dialog__body > div > div:nth-child(2)>span{
  	display: block;
  	height: 24px;
  	width: 74px;
  	color: white;
  	background-color: #49c7c4;
  	line-height: 24px;
  	margin: auto;
  	border-radius: 5px;
  }
  #app #information > div > div.el-dialog__body> div > div:nth-child(3) > span{
  	display: block;
  	height: 24px;
  }
  #app #information > div > div.el-dialog__body > div:nth-child(2)  .set_people{
  	border: none;
  	width:330px;
  	height: 33px;
  	border: 1px solid #ccc;
  }
  #app #information > div > div.el-dialog__body > div:nth-child(2)  .set_infor{
  	height:25px;
  	line-height:25px;
  	display:block;
  	text-align:left;
  	font-size:16px
  }
  #information > div > div.el-dialog__body > div:nth-child(2) > div:nth-child(2) > div{
  	width: 330px;
  }
  #information > div > div.el-dialog__body > div:nth-child(2) > div:nth-child(2) > div{
  	width: 330px;
  }
  #app #information .el-dialog__footer{
  	padding: 0;
  	text-align: center;
  	margin: 20px 0;
  }
  .contain{
  	width: 100%;
  }
  .content{
  	width: 100%;
  }
  .content .top{
  	height: 259px;
  	width: 95%;
  	padding: 61px 0  0  5%;
  	background-color: white;
  }
  .team_left,.team_right{
  	height: 320px;
  	float: left;
  }
  .team_left{
  	width: 40%;
  	height: 199px;
  	border-right:1px solid #ccc;
  }
  .team_left>div{
  	width: 112px;
  	height: 173px;
  	float: left;
  	margin-top: 26px;
  	text-align: center;
  }
  .team_left>div>div{
  	width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-left: 15px;
  }
  .team_left>div>div img{
  	width: 100%;
  	height: 100%;
    border-radius: 50%;
  }
  .team_left>div>span{
  	margin-top: 15px;
  	display: block;
  	height: 24px;
  	width: 87px;
  	text-align: center;
  	line-height: 24px;
  	float: left;
    color: white;
  	/*border: 1px solid #80c269;*/
  	border-radius: 20px;
  	margin-left: 12px;
      background-color: #49c7c4;
  }
  .team_left ul{
  	height: 155px;
  	width: 145px;
  	float: left;
  	padding: 44px 0 0 31px;
  }
  .team_left ul li:nth-of-type(2){
  	margin-top: 22px;
  	margin-bottom: 14px;
  }
  .team_right{
  	width: 54%;
  	height: 164px;
  	padding: 35px 0 0 5%;
  }
  .team_right ul li{
  	float: left;
  	width: 19%;
  	height: 129px;
  	text-align: center;
  	margin-right: 1%;
  }
  .team_right ul li span{
  	height: 30px;
  	display: block;
  	line-height: 30px;
  }
  .team_right ul li i{
  	height: 16px;
  	display: block;
  }
  .down{
  	margin-top: 10px;
  	height: 730px;
  	width: 100%;
  }
  .down .navbar {
  	height: 60px;
  	background-color: white;
  	width: 100%;
  }
  .down .navbar ul{
  	width: 100%;
  }
  .down .navbar>ul li{
  	float: left;
  	height: 86px;
  	width: 25%;

  }
  .el-tabs{
    width: 100%;
  	height: 60px;
  }
  .down .doctor_list{
  	width: 100%!important;
  	/*height: 630px;*/
  	margin-top: 5px;
  	overflow:auto;
  	background-color: #f5f5f5
  }
  .down .doctor_list li{
  	width: 91.6%;
  	padding: 0 5% 0 3%;
  	line-height: 50px;
  	height: 50px;
  	background-color: white;
  	margin-bottom: 5px;
	border: 1px solid #fff;
	  
  }
  .down .doctor_list li:hover{
	  border: 1px solid #49c7c4;
  }
  .down .doctor_list .list{
  	width: 100%;
  	height: 50px;
  }
  .down .doctor_list .list div:nth-of-type(2){
  	text-align: right;
  	color: #6a6e73
  }
  .down .doctor_list .list div{
  	color: black;
  	float: left;
  	width: 50%;
  }
  </style>