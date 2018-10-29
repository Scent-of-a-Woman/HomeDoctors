 <template>
  <div id="app">
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
    <el-breadcrumb separator="/" style="line-height:50px">
      <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">签约</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">驳回</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
  <div style="height:81px; background-color:white;width:100%;position: relative;">   
    <div class="head_search">
      <div class="search">
        <input type="text" v-model="search" placeholder="姓名/社区医院/手机号/身份证号/常见疾病">
        <span @click="Search">
          <img src="../../assets/images/search.png"  >
        </span>
      </div>
     <blurseach></blurseach>
    </div>
  </div>

  <div class="content">
   <div class="user_data" v-for='(item,index) in data3'>
     <div class="content_left">
       <i>{{index+1}}</i>
       <dl>
        <dt>姓名</dt>
        <dd>{{item.username}}</dd>
      </dl>
      <dl>
        <dt>性别</dt>
         <dd v-if="item.gender==1">男</dd>
            <dd v-if="item.gender==0">女</dd>
      </dl>
      <dl>    
       <dt>身份证号</dt>
       <dd>{{item.idcard}}</dd>
     </dl>
      <dl>
        <dt>医生团队</dt>
        <dd>{{item.doctorName}}</dd>
      </dl>
     <dl>  
       <dt>手机号</dt>
       <dd>{{item.phone}}</dd>
     </dl> 
     <dl>  
       <dt>地址</dt>
       <dd>{{item.address}}</dd>
     </dl> 
   </div>
   <div class="content_right"> 
    <div class="content_border">
     <dl>
       <dt>常见疾病信息</dt>
       <dd>{{item.medical_history}}</dd>
     </dl>
     <dl>
       <dt>驳回时间</dt>
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
      :page-size="5"
      v-if="total <= 5 ? false:true"
      @current-change="handleCurrentChange"
      >
        </el-pagination>
      </div>
</template>
</div>
</div>
 </div>
</template>
<script>
import axios from 'axios'
import {familyDoctor} from "./../../common/util.js"
import blurseach from "./../../common/blurseach.vue"
import bus from '../../bus'

export default {
  data () {
    return {
      search:'',
      data3:[],
      total:0,
       token:"",
      loginId:"",
      exportApi:{api:'/whjtys/excel/exportExcelCancelUser',title:'驳回'},
    }
  },
  created(){
    this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.requesrt()
  },
watch: {
    $route() {
      this.$router.go(0)
    }
  },
  methods: {
 // 请求数据
 requesrt:function(){
  let _this=this;
  let url = familyDoctor();
  axios.get(url+"/whjtys/signed/backManager?loginId="+_this.loginId+"&token="+_this.token).then(function(response){
      let listArray=response.data.pagehelper.list
      _this.data3=listArray
      _this.total=response.data.pagehelper.total
      bus.$emit('export',_this.exportApi)
      })
  },
    // 分页
   handleCurrentChange:function(val){
        let url = familyDoctor()
        let _this=this
       if(!_this.search){
         axios.get(url+"/whjtys/signed/backManager?pageNum="+val+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
         
         _this.data3=response.data.pagehelper.list
        })
       }else{
         axios.get(url+"/whjtys/signed/backManager?searchKey="+_this.search+"&pageNum="+val+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
         _this.data3=response.data.pagehelper.list
         _this.total=response.data.pagehelper.total
        })
       }
      },
      // 搜索
      Search:function(){
        let url = familyDoctor();
        let _this=this
        axios.get(url+"/whjtys/signed/backManager?searchKey="+_this.search+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
         _this.data3=response.data.pagehelper.list
         _this.total=response.data.pagehelper.total
        })
      },
},
computed: {
  familyDoctor
},
   components:{
    blurseach
  }
}

</script>
<style lang="css" scoped>
.head_search{
  width:49%;
  height:81px;
  float: right;
  margin-right: 85px;
}
.search{
  height:50px;
  width:100%;
  display:inline-block;
  float:right;
  margin-top:16px;
}
.search input{
 outline:none;
 width:68%;
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
  width:15%;
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
.user_data{
  margin-top: 10px;
  padding-top: 30px;
  height:142px;
  background: #fff;
  width:100%;
}
.content_left{
  width:56%;
  height:142px;
  float:left;
}

.content_left i{
  display:block;
  float:left;
  width:12%;
  height: 142px;
  text-align:center;
  line-height:112px;
}
.content_left dl,.content_right dl{
  float:left;
}
.content_left dt,.content_right dt{
  color:#bbbbbb;
  font-size:14px;
}
.content_left dd,.content_right dd{
  color:#676767;
  font-size: 14px;
  padding-top: 8px;
}
.content_left dl:first-of-type{
  width:20%;
  height:65px;
}
.content_left dl:nth-of-type(2){
  width:15%;
  height:65px;
}
.content_left dl:nth-of-type(3){
  width:35%;
  height:65px;
}
.content_left dl:nth-of-type(4){
  width:15%;
  height:65px;
  margin-left: 2%;
}
.content_left dl:nth-of-type(5){
  width:20%;
  height:82px;
}
.content_left dl:last-of-type{
  height:82px;
  width:66%;
  margin-left: 2%;
}
.content_right{
  position: relative;
  width:42%;
  float:left;
  padding-left:2%;
}
.content_border{
  height:130px;
  width:335px;
  width: 95%;
  border-left:1px solid #ccc;
  padding-left:5%;
}
.content_right dl:first-of-type{
 width:96%;
 height:65px;
}
.content_right dl:nth-of-type(2){
 width:40%;
 position: relative;
}
.content_right dl:nth-of-type(2) dd{
 position: relative;
 left: 0;
 line-height: 20px;
}
.content_right dl:last-of-type{
 width:60%;
 height:74px;
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
  margin-top: 10px;
  text-align: center;
}
.all  span i{
  color: #49c7c4;
}
</style>