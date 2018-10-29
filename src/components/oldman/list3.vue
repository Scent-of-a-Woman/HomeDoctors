<template>
	<div id="app">    
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
    <el-breadcrumb separator="/" style="line-height:50px">
      <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">老年人体检</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">体检预约失效</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>

  <div style="height:81px; background-color:white;width:100%;position:relative">   
    <div class="head_search">
      <div class="search">
        <input type="text" v-model="search" placeholder="姓名/常见疾病/手机号/社区医院">
        <span @click="Search">
          <img src="../../assets/images/search.png" >
        </span>
        <blurseach></blurseach>
      </div>
    </div>
    <blurseach></blurseach>
  </div>
  <div class="content">
   <div class="user_data" style="height:162px;margin-top:10px; width:100%;" v-for="(item,index) in data3">
    <div class="content_left">
      <i>{{index+1}}</i>
      <dl>
        <dt>体检人姓名</dt>
        <dd>{{item.peName}}</dd>
      </dl>
      <dl>  
       <dt>手机号</dt>
       <dd>{{item.pePhone}}</dd>
     </dl>
     <dl>    
       <dt>预约人姓名</dt>
       <dd>{{item.operatorName}}</dd>
     </dl>
     <dl>
       <dt>手机号</dt>
       <dd>{{item.operatorPhone}}</dd>
     </dl>    
   </div>
   <div class="content_right"> 
    <div class="content_border">
     <dl>
       <dt>常见疾病信息</dt>
       <dd>{{item.history}}</dd>
     </dl>
     <dl>
       <dt>预约失效时间</dt>
       <dd>{{item.updateTime}}</dd>
     </dl>
     <dl>
       <dt>社区医院</dt>
       <dd>{{item.hospitalName}}</dd>
     </dl>
   </div>
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
      v-if="total <= 5 ? false:true"
      :page-size="5"
      @current-change="handleCurrentChange"
      >
    </el-pagination>
  </div>
</template>
</div>
</div>
</div>
</template>
<script >
import {familyDoctor} from "./../../common/util.js"
import axios from "axios"
import bus from '../../bus'
import blurseach from "./../../common/blurseach.vue";
export default{
  data(){
   return{
    search:"",
     exportApi:{api:'/whjtys/physical/exportExcel/2',title:'失效'},
    total:0,
    loginId:"",
    token:"",
    data3:[],

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
 this.requestData()
},
methods:{
  //数据请求
  requestData:function(){
    let  _this=this
    let url = familyDoctor();
    axios.get(url+"/whjtys/physical/losetjManagement?loginId="+_this.loginId+"&token="+_this.token).then((response)=>{
     _this.data3=response.data.pagehelper.list
     _this.total=response.data.pagehelper.total
     bus.$emit('export',_this.exportApi)
   })
  },
      // 分页
      handleCurrentChange:function(val){
        let url = familyDoctor();
        let _this=this
        if(!_this.search){
         axios.get(url+"/whjtys/physical/losetjManagement?pageNum="+val+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
           _this.data3=response.data.pagehelper.list
         })
       }else{
         axios.get(url + "/whjtys/physical/losetjManagement?searchKey=" + _this.search+"&pageNum="+val+"&loginId="+_this.loginId+"&token="+_this.token)
         .then(function(response) {
          _this.total=response.data.pagehelper.total
          _this.data3 = response.data.pagehelper.list;
        });
       }
       
     },
        // 搜索
        Search:function(){
          let url = familyDoctor();
          let _this = this;
          axios.get(url + "/whjtys/physical/losetjManagement?searchKey=" + _this.search+"&loginId="+_this.loginId+"&token="+_this.token)
          .then(function(response) {
            _this.total=response.data.pagehelper.total
            _this.data3 = response.data.pagehelper.list;
          });
        }
      },
      components: {
        blurseach
      }
    }	

    </script><style scoped>
    dd{
      font-size: 14px;
    }
    .search{
      height:50px;
      width:341px;
      display:inline-block;
      margin-left: 380px;
      margin-top:16px;
      margin-right: 20px
    }
    .search input{
     outline:none;
     width:255px;
     height:48px;
     border:1px solid #49c7c4;
     padding:0 15px 0 15px;
     float:left;
     font-size: 15px;
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
  .content{
    width:100%;
    position:relative;
    margin-top: 10px;
  }
  .user_data{
    margin-top: 0;
  }
  .content_left{
    width:45%;
    height:162px;
    float:left;
    background-color:white;
  }
  .content_left i{
    display:block;
    float:left;
    height:172px;
    width:15%;
    text-align:center;
    line-height:172px;
  }
  .content_left dl{
    float:left;
    margin-top:22px;
  }
  .content_left dt,.content_right dt{
    color:#bbbbbb;
    font-size:14px;
  }
  .content_left dd,.content_right dd{
    color:#676767;
    overflow: hidden;
    height: 38px;
    line-height: 38px;
  }
  .content_left dl:first-of-type{
    width:30%;
    height:57px;
  }
  .content_left dl:nth-of-type(2){
    width:55%;
    height:57px;
  }
  .content_left dl:nth-of-type(3){
    width:30%;
    height:57px;
    margin-top: 22px;
  }
  .content_left dl:nth-of-type(even) dd,.content_right dl:nth-of-type(even) dd{
    height: 38px;
    line-height: 38px;
  }
  .content_left dl:last-of-type{
    margin-top:22px;
    height:57px;
    width:55%;
    margin-top: 22px;
  }
  .content_right{
    width:55%;
    height:162px;
    float:left;
    background-color:white;
  }
  .content_border{
    height: 125px;
    width: 95%;
    border-left:1px solid #ccc;
    margin-top: 23px;
    padding-left:5%;
  }
  .content_right dl:first-of-type{
   width:95%;
   height:57px;
   float: left;
 }
 .content_right dl:nth-of-type(2){
  height: 61px;
  width: 30%;
  float: left;
  margin-top: 22px;
  margin-left: 0px;
  margin-right: 3%
}
.content_right dl:nth-of-type(2) dd{
  line-height: 38px;
}
.content_right dl:last-of-type{
 width:60%;
 height:64px;
 margin-top: 22px;
 float: left;
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