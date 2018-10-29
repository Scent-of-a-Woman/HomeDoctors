<template>
	<div id="app">
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
    <el-breadcrumb separator="/" style="line-height:50px">
      <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">基因检测</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">已完成</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
  <div style="height:81px; background-color:white;width:100%;position:relative">   
    <!--  <template >
      <el-select v-model="value1" placeholder="查看体检报告名单" >
        <el-option v-for="v in options1" :key="v.value" :label="v.label" :value="v.value"></el-option>
      </el-select>
    </template> -->
    <div class="search">
      <input type="text" v-model="search" placeholder="姓名/身份证号">
      <span @click="Search">
        <img src="../../assets/images/search.png" >
      </span>

  </div>
  <!-- <blurseach></blurseach> -->
</div>
<div class="content">
 <div class="user_data" v-for="(item,index) in data3">
  <div class="content_left">
    <i>{{index+1}}</i>
    <dl>
      <dt>姓名</dt>
      <dd>{{item.username}}</dd>
    </dl>
    <dl  v-show="ids==5?true:false">
     <dt>手机号</dt>
     <dd>{{item.mobile}}</dd>
   </dl>
   <dl>
     <dt>身份证号</dt>
     <dd>{{item.idcard}}</dd>
   </dl>
 </div>
 <div class="content_right">
  <div class="content_border">
<dl>
 <dt>完成时间</dt>
 <dd>{{item.updateTime}}</dd>
</dl>
   <span style="display:block;width:8%;height:20px;float:right;margin-top: 40px;">
      <a target="_blank" :href=item.img_url><img style="height:24px;width:24px" src="../../assets/images/report.png"></a>  
  </span>
<dl style="display: none">
 <dt>完成时间</dt>
 <dd>{{item.updateTime}}</dd>
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
import axios from "axios"
import bus from '../../bus'
import {familyDoctor} from "./../../common/util.js"
import blurseach from "./../../common/blurseach.vue";
export default{
  data(){
   return{
    dialogVisible: false,
    search:"",
    total:0,
    data3:[],
    id:'',
    loginId:"",
    token:"",
    dialogV:true,
     exportApi:{api:'/whjtys/physical/exportExcel/1',title:'完成'},
    ids:''
  }
},
created:function(){
   this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
  this.ids=window.localStorage.getItem("id")
  this.requestData()
},
watch:{
  value1:function(){
    let url = familyDoctor();
      axios.get(url + "/whjtys/physical/tjManagement&searchKey=" + this.search+"&loginId="+this.loginId+"&token="+this.token).then(response=>{
        let data = response.data.pagehelper
        this.data3 = data.list
        this.total = data.total
    })
  },
    $route() {
      this.$router.go(0)
    }
},
methods:{
  //数据交互
  requestData:function(){
    let _this=this;
    let url = familyDoctor();
    axios.get(url+"/whjtys/downScreening/findAll?loginId="+_this.loginId+"&token="+_this.token+"&status="+1+"&pageSize="+5).then(function(response){
      console.log(response)
        let listArray=response.data.pagehelper
        _this.data3=listArray.list
        _this.total=listArray.total
        bus.$emit('export',_this.exportApi)
      })
    },
  // 分页
  handleCurrentChange:function(val){
    let url = familyDoctor()
    let _this=this
    if(!_this.search){
      axios.get(url+"/whjtys/downScreening/findAll?pageNum="+val+"&loginId="+_this.loginId+"&token="+_this.token+"&status="+1+"&pageSize="+5).then(function(response){
        console.log(response)
      _this.data3=response.data.pagehelper.list
    })
    }else{
      axios.get(url + "/whjtys/downScreening/findAll?searchKey=" + _this.search+"&pageNum="+val+"&loginId="+"&status="+1+_this.loginId+"&token="+_this.token+"&pageSize="+5)
      .then(function(response) {
        console.log(response)
        let data = response.data.pagehelper
      _this.total=data.total
      _this.data3 = data.list
    });
    }
  },
    // 搜索
    Search:function(){
      let url = familyDoctor()
      let _this = this
      axios.get(url + "/whjtys/downScreening/findAll?searchKey=" + _this.search+"&loginId="+_this.loginId+"&token="+_this.token+"&status="+1+"&pageSize="+5)
      .then(function(response) {
        console.log(response)
        let data = response.data.pagehelper
        _this.total=data.total
        _this.data3 = data.list
      });
    }
  },
  components: {
    blurseach
  }
}	

</script>
 <style scoped>
  .search{
    height:50px;
    width:341px;
    display:inline-block;
    float: right;
    margin-top:16px;
    margin-right: 20px;
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
  height:162px;
  margin-top:10px;
  width:100%;
  background-color: #fff;
}
.content_left{
  width:45%;
  float:left;
  height: 162px;
}
.content_left i{
  display:block;
  float:left;
  width:15%;
  text-align:center;
  line-height:162px;
}
.content_left dl{
  float:left;
}
.content_left dt,.content_right dt{
  color:#bbbbbb;
  font-size:14px;
}
.content_left dd,.content_right dd{
  color:#676767;
  font-size: 14px;
  height: 33px;
    line-height: 33px;
}
.content_left dl:first-of-type{
  width:30%;
  height:57px;
}
.content_left dl:nth-of-type(2){
  width:50%;
  height:57px;
}
.content_left dl:nth-of-type(3){
  width:30%;
  height:57px;
}
.content_left dl:last-of-type{
  height:57px;
  width:50%;
}
.content_right{
  width:54%; 
  height: 162px;
  float:left;
}

.content_border{
  height: 125px;
  width: 95%;
  margin-top: 23px;
  padding-left:5%;
  border-left: 1px solid #ccc;
}
.content_right dl:first-of-type{
 width:90%;
 height:57px;
 float: left;
}
.content_right dl:nth-of-type(2){
width:31%;
 height:61px; 
 float: left;
 margin-top: 22px;
 margin-right: 3%;
}
.content_left dl{
  margin-top: 22px;
}
.content_right > div > dl:nth-child(3) > dd{
  width:100%;
}
.content_left dl:nth-of-type(even) dd{
  height: 38px;
  line-height: 38px;
}
.content_right dl:last-of-type{
 width:60%;
  margin-top: 18px;
 height:64px;
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
.el-select{
  margin-top: 22px;
  margin-left: 39px;
  float: left;
  margin-right: 20%;
}
.content_border > dl:nth-of-type(1) > dd:nth-of-type(1){
  line-height: 33px;
  overflow: hidden;
}
#upload > div > div.el-dialog__footer{
  text-align: center;
}
#upload > div > .el-dialog__header > .el-dialog__title{
  color: #979797 !important;
}
#upload > div > div.el-dialog__footer > span {
 text-align: center;
}
.el-select{
  width: 160px
}

</style>