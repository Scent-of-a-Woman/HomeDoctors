<template>
  <div id="app">
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
      <el-breadcrumb separator="/" style="line-height:50px">
        <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">计免疫苗</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">疫苗预约失效</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <div style="height:81px; background-color:white;width:100%;position:relative">   
       <el-select v-model="value1" placeholder="请选择疫苗类型" id="ertong">
            <el-option v-for="v in options" :key="v.value" :label="v.label" :value="v.value"></el-option>
          </el-select>
      <!-- <div class="head_search"> -->
        <div class="search">
          <input type="text" v-model="search" placeholder="姓名/疫苗名称/手机号/社区医院">
          <span @click="Search">
            <img src="../../assets/images/search.png" >
          </span>
        </div>
         
      <!-- </div> -->
      <blurseach></blurseach>
    </div>
    <div class="content">
      <div class="user_data" style="height:162px;margin-top:10px; width:100%;" v-for="(list,index) in data3">
       <div class="content_left">
        <i>{{index+1}}</i>
        <dl>
          <dt class="title">姓名</dt>
          <dd>{{list.babyName}}</dd>
        </dl>
        <dl>  
         <dt class="title">疫苗名称</dt>
         <dd>{{list.vaccineName}}</dd>
       </dl>
       <dl>    
         <dt class="title">监护人姓名</dt>
         <dd>{{list.operatorName}}</dd>
       </dl>
       <dl>
         <dt class="title">手机号</dt>
         <dd>{{list.operatorPhone}}</dd>
       </dl>    
     </div>
     <div class="content_right"> 
      <div class="content_border">
       <dl>
         <dt class="title">预约 失效时间</dt>
         <dd>{{list.updateTime}}</dd>
       </dl>
       <dl>
         <dt class="title">社区医院</dt>
         <dd>{{list.hospitalName}}</dd>
       </dl>
     </div> 
   </div>
 </div>
 <!-- 分页 -->
 <div class="all" >
  <span>共&nbsp;<i style="font-style:normal">{{total}}</i>&nbsp;条</span>
  
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
import bus from '../../bus'
import blurseach from "./../../common/blurseach.vue";
import {familyDoctor} from "./../../common/util.js"
export default {
  data() {
    return {
      total:0,
      search:'',
      data3:[],
      value1:'',
      exportApi:{api:'/whjtys/vaccine/exportExcel/2',title:'失效'},
      loginId:"",
      token:"",
      options:[
        {
          value:37,
          label:'儿童疫苗'
        },{
          value:38,
          label:'宫颈癌疫苗'
        },{
          value:39,
          label:'全部'
        }
      ]
    }
  },
  created:function(){
    this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.requestData()
  },
  watch:{
  value1:function(){
    let url = familyDoctor();
    axios.get(url + "/whjtys/vaccine/loseJMOrderManager?falg="+this.value1+"&searchKey=" + this.search+"&loginId="+this.loginId+"&token="+this.token).then(response=>{
      this.data3 = response.data.pagehelper.list
      this.total = response.data.pagehelper.total
    })
  },
    $route() {
      this.$router.go(0)
    }
},
  methods: {
   //数据交互
   requestData:function(){
    let _this=this
    let url = familyDoctor()
    axios.get(url+"/whjtys/vaccine/loseJMOrderManager?falg="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token
      ).then(function(response){
        let listArray=response.data.pagehelper.list
        _this.data3=listArray
        _this.total=response.data.pagehelper.total
        bus.$emit('export',_this.exportApi)
      })
    },
   // 分页
   handleCurrentChange:function(val){
    let url = familyDoctor();
    let _this=this
    if(!_this.search){
          axios.get(url+"/whjtys/vaccine/loseJMOrderManager?pageNum="+val+"&falg="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
     _this.data3=response.data.pagehelper.list
   })
      }else{
        axios.get(url + "/whjtys/vaccine/loseJMOrderManager?searchKey=" + _this.search+"&pageNum="+val+"&falg="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token)
       .then(function(response) {
        _this.data3 = response.data.pagehelper.list;
        _this.total=response.data.pagehelper.total
      });
     }
  
  },
       //搜索
       Search:function(){
         let url = familyDoctor();
         let _this=this
         axios.get(url+"/whjtys/vaccine/loseJMOrderManager?searchKey="+_this.search+"&falg="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
           _this.data3=response.data.pagehelper.list
           _this.total=response.data.pagehelper.total
         })
       } 
       
     },
     computed: {
      familyDoctor
    },
     components: {
    blurseach
  }
  }
  </script>
  
<style scoped>
  dd{
  font-size: 14px;
}
.title{
  font-size: 17px
}
.el-select {
  width: 45%;
  float: left;
}
  .search {
  height: 50px;
  width: 42%;
  display: inline-block;
  margin-top: 16px;
}
.search input {
  outline: none;
  width: 68%;
  height: 48px;
  border: 1px solid #49c7c4;
  padding: 0 15px 0 15px;
  float: left;
   font-size: 15px;
} .search span{
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
  width:60%;
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
  font-size: 14px;
}
.content_left dd,.content_right dd{
  padding-top:8px;
  color:#676767;
  font-size: 14px;
}
.content_left dl:first-of-type{
  width:30%;
  height:57px;
}
.content_left dl:nth-of-type(2){
  width:53%;
  height:57px;
}
.content_left dl:nth-of-type(3){
  width:30%;
  height:57px;
  margin-top: 15px;
}
.content_left dl:last-of-type{
  margin-top:22px;
  height:57px;
  width:55%;
  margin-top: 16px;
}
#app > div.content > div.user_data > div.content_left > dl > dd{
  height: 21px;
  line-height: 20px;
}
.content_right{
  width:40%;
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
 width:50%;
 height:57px;
 float: left;
}
.content_right dl:last-of-type{
 width:60%;
 height:64px;
 margin-top: 15px;
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
