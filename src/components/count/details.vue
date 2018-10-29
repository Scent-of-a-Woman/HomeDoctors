
<template>
  <div id="app">
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
    <el-breadcrumb separator="/" style="line-height:50px">
      <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">数据统计</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">详情</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
      <div class="viewMore_top">    
        <el-button type="primary" style="margin-left:20px;border-radius:0" @click="timeSearch">查询</el-button>
        <div class="block">
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="截止日期"
            >
          </el-date-picker>
        </div>
        <div class="block" style="width:25px;line-height:35px;font-size:14px;">
          至
        </div>  
        <div class="block">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="起始日期"
          >
        </el-date-picker>
      </div>
      </div>
      <div class="viewMore_body">
        <ul>
          <li>排序</li>
          <li>医院名称</li>
          <li>提交签约</li>
          <li>签约成功</li>
          <li>疫苗预约</li>
          <li>体检预约</li>
        </ul>
        <ul v-for="(items,index) in data3" class="project">
          <li class="title">{{index+1}}</li>
          <li class="title">{{items.hospitalName}}</li>
          <li class="title">{{items.sumbitCount}}</li>
          <li class="title">{{items.downCount}}</li>
          <li class="title">{{items.vaccinCount}}</li>
          <li class="title">{{items.testCount}}</li>
        </ul>
      </div>
   <div class="all" >
      <span>共<i style="font-style: normal;">{{total}}</i>条</span>
    <template>
      <div class="block">
        <el-pagination
        layout="prev, pager, next"
        :total="total"
        v-if="total <= 13 ? false:true"
        :page-size="13"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
    </div>
  </template>
</div>
</div>
</template>
<script>
import { familyDoctor,getLastDate ,axiosGet} from "./../../common/util.js";
import axios from "axios";
export default {
  data() {
    return {
      data3: [],
       token:"",
      loginId:"",
      total: 0,
      value1:'',  //开始日期
      value2:'',   //截止日期
    };
  },
  methods: {
    requestData: function() {
      let _this = this;
      axiosGet("/whjtys/data/hospitalDeatiles?loginId="+_this.loginId+"&token="+_this.token).then((response)=>{
        let data =response.data
        _this.data3 = data.list;
        _this.total = data.pagehelper.total;
      })
    },
    // 分页
    handleCurrentChange: function(val) {
      let url = familyDoctor();
      let _this = this;
      let begindate = getLastDate(this.value1);
      let enddate = getLastDate(this.value2);
      if(begindate){
        axios.get(url + "/whjtys/data/hospitalDeatiles?pageNum=" + val+"&pagesize="+13+"&enddate="+enddate+"&begindate="+begindate+"&loginId="+_this.loginId+"&token="+_this.token)
        .then(function(response) {
          _this.data3 = response.data.list;
          _this.total = response.data.pagehelper.total;
        });
      }else{
        axios.get(url + "/whjtys/data/hospitalDeatiles?pageNum=" + val+"&pagesize="+13+"&loginId="+_this.loginId+"&token="+_this.token)
        .then(function(response) {
          console.log(response)
          _this.data3 = response.data.list;
          _this.total = response.data.pagehelper.total;
        });
      }
      
    },
   timeSearch:function(){
      let _this =this
      let begindate = getLastDate(this.value1);
      let enddate = getLastDate(this.value2);
      if(begindate.length==0&&enddate.length==0){
        this.$message("日期不能为空")
        return
      }
      let url=familyDoctor()
          axios.get(url +"/whjtys/data/hospitalDeatiles?begindate="+begindate+"&enddate="+enddate+"&loginId="+_this.loginId+"&token="+_this.token)
          .then(function(response){
            console.log(response)
            _this.data3=response.data.list;
            _this.total = response.data.pagehelper.total;
            _this.$message("查询成功")
          })
    }
  },
  watch: {
    $route() {
      this.$router.go(0)
    }
  },
  created: function() {
     this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.requestData();
  },
  computed: {
    familyDoctor
  }
};
</script>
 <style scoped>
 .title{
  font-size: 14px;
 }
.viewMore_top {
  width: 100%;
  height: 80px;
  padding-top: 23px;
  padding-right: 25px;
  background-color: #fff;
  box-sizing: border-box;
}
.viewMore_top > button {
  background-color: #49c7c4;
  float: right;
  padding: 11px 40px;
  outline: none;
  border: none;
  color: #fff;
  height: 36px;
}
.viewMore_top .block{
  float: right;
  width:200px;
  height:50px;
  margin-bottom: 10px;
}
.viewMore_top > .block > div > input{
  height: 50px;
}
.viewMore_body {
  width: 100%;
  overflow: hidden;
}
.viewMore_body > ul {
  width: 100%;
  height: 55px;
  line-height: 55px;
  background-color: #fff;
  margin-top: 10px;
}
.viewMore_body > ul:nth-of-type(1) > li{
     color: #49c7c4;
     width: 7%;
     font-size:16px;
} 
.viewMore_body > ul > li {
  float: left;
  text-align: center;
}
.viewMore_body > ul > li:nth-of-type(2) {
  width: 30%;
}
.viewMore_body > ul > li:nth-of-type(3),.viewMore_body > ul > li:nth-of-type(4),.viewMore_body > ul > li:nth-of-type(5),.viewMore_body > ul > li:nth-of-type(6) {
  width: 15%;
}
.project{
   width: 100%
}
.project li:nth-of-type(1){
 width: 7%
}
.project li:nth-of-type(2){
    width: 30%;
}
.project li:nth-of-type(3),.project li:nth-of-type(4),.project li:nth-of-type(5),.project li:nth-of-type(6){
   width: 15% 
}
.viewMore_footer {
  width: 100%;
  height: 150px;
  text-align: center;
  margin-top: 30px;
}
.viewMore_footer > p {
  margin: 20px 0;
}
  .block{
    text-align: center;
  }
  .el-button{
    color: white;
    line-height: 0;
  }
.all {
  width: 100%;
  float: left;
  line-height: 30px;
  margin-top: 10px;
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