<template>
  <div id="app">
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
    <el-breadcrumb separator="/" style="line-height:50px">
      <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">老年人体检</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">体检预约</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
  <div style="height:81px; background-color:white;width:100%;position:relative">   
    <div class="head_search">
      <div class="inoc" id="make" >
        <span class="old_com" @click='sureData' v-show="this.id == 3 || this.id == 4 ? false:true">体检完成</span>
        <span class="old_abate" @click="returnData" v-show="this.id == 3 || this.id == 4 ? false:true">预约失效</span>
        <template>
          <el-select v-model="value1" placeholder="查看电话确认名单" >
            <el-option v-for="v in options1" :key="v.value" :label="v.label" :value="v.value"></el-option>
          </el-select>
        </template>
      </div>
      <div class="search">
        <input type="text" v-model="search" placeholder="姓名/常见疾病/手机号/社区医院">
        <span @click="Search">
          <img src="../../assets/images/search.png" >
        </span>
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
     <span style="display:block;width:20px;height:20px;float:left">
      <el-checkbox type="checked" ref="checkboxs"  @change="excCheckboxs($event,index)" v-show="id == 3 || id == 4 ? false:true"></el-checkbox>
    </span>
    <dl>
     <dt>预约时间</dt>
     <dd>{{item.peTime}}</dd>
   </dl>
   <dl>
     <dt>社区医院</dt>
     <dd>{{item.hospitalName}}</dd>
   </dl>
 </div> 
</div>
<div class="tick" v-show="id == 3 || id == 4 ? false:true">
 <el-button type="text" @click="historyFun(item)" style="line-height:142px;width:40px;width:100%" >编辑</el-button>
 <el-dialog
 title="编辑"
 id="tick"
 :visible.sync="dialogVisible">
 <div class="text_intro">
  <p class="font_color" style="line-height:27px">确认时间 </p>
  <el-date-picker
  v-model="history.tiem"
  type="datetime"
  id="set_time"
  format='yyyy-MM-dd HH:mm'
  :picker-options="pickerOptions1"
  placeholder="选择日期时间">
</el-date-picker>
</div>
<div class="text_intro">
  <p class="font_color">常见疾病</p>
  <textarea v-model="history.history"></textarea>
</div>
<div class="text_phone">
  <span class="font_color">
    确认联系
  </span>
  <el-radio-group v-model="radio">
    <el-radio label="1" >是</el-radio>
    <el-radio label="0" >否</el-radio>
  </el-radio-group>
</div>
<span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="historyDer">确 定</el-button>
  <el-button @click="dialogVisible = false">取 消</el-button>
</span>
</el-dialog>
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
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
</div>
</div>
</div>
</template>

<script >
import axios from "axios";
import bus from '../../bus'
import blurseach from "./../../common/blurseach.vue";
import {familyDoctor,getLastDate2,checobox} from "./../../common/util.js";
export default {
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      search: "",
      disabled:false,
      dialogVisible:false,
      url:familyDoctor(),
      data3: [],
      id:"",
      radio:'',
      exportApi:{api:'/whjtys/physical/exportExcel/0',title:'体检'},
      total: 0,   // 分页总数
      options1:[
      {
        value:0,
        label:'已确认'
      },{
        value:1,
        label:'未确认'
      },{
        value:2,
        label:'全部'
      }],
      value1:'',
      token:"",
      loginId:"",
      history:{
        tiem:'',
        id:'',
        history:''
      },
    };
  },
  created: function() {
    this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
   this.id=window.localStorage.getItem("id")
   this.request();
 },
 watch:{
  value1:function(){
    let url = familyDoctor();
    axios.get(url + "/whjtys/physical/TJOrder?orderStatus="+this.value1+"&searchKey=" + this.search+"&loginId="+this.loginId+"&token="+this.token).then(response=>{
      this.data3 = response.data.pagehelper.list
      this.total = response.data.pagehelper.total
    })
  },
  $route() {
    this.$router.go(0)
  },
  dialogVisible:function(){
    this.radio = ''
  }
},
methods: {
  excCheckboxs:function(event,index){
    let checoboxs = this.$refs.checkboxs;
    checoboxs.forEach(function(v, i) {
      if(index == i){
        v.model = v.model
      }else{
        v.model = false
      }
    })
  },
    //数据交互
    request: function() {
      let _this = this;
      axios.get(_this.url + "/whjtys/physical/TJOrder?loginId="+_this.loginId+"&token="+_this.token).then(function(response) {
        let listArray = response.data.pagehelper.list;
        _this.data3 = listArray;
        _this.total = response.data.pagehelper.total;
        _this.value1 = ''
          bus.$emit('export',_this.exportApi)
      });
    },
     // 编辑 确定
     historyFun:function(item){
      this.dialogVisible = true
      this.history.tiem = getLastDate2(item.peTime)
      this.history.history = item.history
      this.history.id = item.id
    },
    
    historyDer:function(){
      this.dialogVisible = true
      if(this.radio == ""){
        this.dialogVisible = true
        this.$message("请选择是否联系")
        return
      }
      if(this.history.history.length >= 120){
        this.dialogVisible = true
        this.$message("常见疾病字数过长")
        return
      }
      axios.post(this.url +"/whjtys/physical/updateTJOrder/?id="+this.history.id +"&date="+getLastDate2(this.history.tiem)+"&history="+this.history.history+"&orderStatus="+this.radio+"&loginId="+this.loginId+"&token="+this.token)
      .then(response=>{
        this.radio=""
        this.$message({
          message: response.data.msg,
          type: 'success'
        });
        this.request()
        this.dialogVisible = false
      })
    },
    // 体检完成
    sureData:function(){
      let _this = this
      let checoboxs = this.$refs.checkboxs;
      for (var i = 0; i < checoboxs.length; i++) {
        if (checoboxs[i].model) {
          break
        }else{
          if(i ==checoboxs.length-1){
            this.$message("请勾选再点击")
            return
          }
          continue
        }}
        for (var i = checoboxs.length-1; i >= 0; i--) {
          if (checoboxs[i].model){
            axios.post(_this.url+"/whjtys/physical/updataTJStatue?id="+_this.data3[i].id+"&loginId="+_this.loginId+"&token="+_this.token).then(response=>{
              this.$message({
                message: response.data.msg,
                type: 'success'
              });
              _this.request()
            })
          }
          checoboxs[i].model = false
        }
      },
    // 失效预约失效
    returnData:function(){
      let _this = this;
      let checoboxs = this.$refs.checkboxs;
      for (var i = 0; i < checoboxs.length; i++) {
        if (checoboxs[i].model) {
          break
        }else{
          if(i ==checoboxs.length-1){
            this.$message("请勾选再点击")
            return
          }
          continue
        }
      }
      this.$confirm('确认操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        for (var i = 0; i < checoboxs.length; i++) {
          console.log(checoboxs[i])
          if (checoboxs[i].model) {
            axios.post(_this.url+"/whjtys/physical/loesTJStatue/"+_this.data3[i].id+"&loginId="+_this.loginId+"&token="+_this.token).then(response=>{         
              this.$message({
                message: response.data.msg,
                type: 'success'
              });
              _this.request()
            })
          }
          checoboxs[i].model =false
        }
      })
    },
    // 分页
    handleCurrentChange: function(val) {
      let _this = this;
      axios.get(_this.url + "/whjtys/physical/TJOrder?searchKey=" + _this.search+"&pageNum="+val+"&orderStatus="+_this.value1+"&loginId="+_this.loginId+"&token="+_this.token)
      .then(function(response) {
        _this.total=response.data.pagehelper.total
        _this.data3 = response.data.pagehelper.list
      })
      let s = _this.$refs.checkboxs;
      checobox(s);
    },
    // 搜索
    Search:function(){
      let _this = this;
      axios.get(_this.url + "/whjtys/physical/TJOrder?searchKey=" + _this.search+"&orderStatus="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token)
      .then(function(response) {
        _this.total=response.data.pagehelper.total
        _this.data3 = response.data.pagehelper.list;
      });
      let s = _this.$refs.checkboxs;
      checobox(s);
    }
  },
  computed: {
    familyDoctor
  },
   components: {
    blurseach
  }
};
</script>
<style scoped>
.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
  color: #49c7c4

}
.inoc {
  position: relative;
}
.old_com {
  height: 81px;
  display: block;
  float: left;
  width: 10%;
  line-height: 81px;
  color: #49c7c4;
  margin-left: 3%;
  font-size: 15px;
  cursor: pointer;
}
.old_center {
  display: block;
  position: relative;
  top: 22px;
  left: -10px;
  height: 30px;
  width: 153px;
  float: left;

}
.old_center input {
  width: 153px;
}
.old_abate {
  height: 81px;
  display: block;
  float: left;
  width: 10%;
  text-align: left;
  line-height: 81px;
  cursor: pointer;
  font-size: 15px;
  color: #eb6100;
}
.old_abate a {
  color: #f79e7a !important;
}
.cintent_border {
  padding-left: 50px;
}
.content_right dl:nth-of-type(2) {
  height: 61px;
  width: 30%;
  float: left;
  margin-top: 22px;
  margin-left: 0px;
  margin-right: 3%;
}
.content_right dl:nth-of-type(3) {
  height: 61px;
  width: 243px;
  float: left;
  margin-top: 22px;
  margin-left: 30px;
  white-space: nowrap;
}
.search{
  height:50px;
  width:541px;
  display:inline-block;
  float:right;
  margin-top:16px;
  margin-right: 20px;
  position: relative;
}
.search input {
  outline: none;
  width: 255px;
  height: 48px;
  border: 1px solid #49c7c4;
  padding: 0 15px 0 15px;
  float: left;
   font-size: 15px;
}
.search span {
  display: inline-block;
  height: 48px;
  width: 50px;
  color: white;
  text-align: center;
  border: 1px solid #49c7c4;
  border-left: 0;
  float: left;
  cursor: pointer;
}
.search span img {
  margin-top: 12px;
}
.excel {
  width: 115px;
  height: 50px;
  background-color: #49c7c4;
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  float: left;
  margin-left: 10px;
  cursor: pointer;
  margin-top: 16px;
}
.content {
  width: 100%;
  position: relative;
  margin-top: 10px;
}
.user_data {
  margin-top: 0;
}
.content_left {
  width: 45%;
  height: 162px;
  float: left;
  background-color: white;
}
.content_left i {
  display: block;
  float: left;
  height: 172px;
  width: 15%;
  text-align: center;
  line-height: 172px;
}
.content_left dl {
  float: left;
  margin-top: 22px;
}
.content_left dt,
.content_right dt {
  color: #bbbbbb;
  font-size: 14px;
}
.content_left dd,
.content_right dd {
  color: #676767;
  height: 37px;
  font-size: 14px;
  overflow: hidden;
  line-height: 37px;
}
.content_left dl:first-of-type {
  width: 30%;
  height: 57px;
}
.content_left dl:nth-of-type(2) {
  width: 52%;
  height: 57px;
}
.content_left dl:nth-of-type(3) {
  width: 30%;
  height: 57px;
  margin-top: 22px;
}
.content_left dl:last-of-type {
  height: 57px;
  width: 55%;
  margin-top: 23px;
}
.content_right {
  width: 49%;
  height: 162px;
  float: left;
  background-color: white;
}
.content_border {
  height: 120px;
  width: 95%;
  border-left: 1px solid #ccc;
  margin-top: 23px;
  padding-left: 5%;
}
.content_right dl:first-of-type {
  width: 90%;
  height: 57px;
  float: left;
}
.content_right dl:last-of-type {
  width: 60%;
  height: 64px;
  margin-top: 22px;
  float: left;
}
.content_right dl:nth-of-type(2) dd{
  line-height: 11px;
  height: 37px;
  line-height: 37px;
}
.content_right dl:nth-of-type(3){
  margin-left:0;
  height: 38px;

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
.all span i {
  color: #49c7c4;
}
#make > div{
  margin-left: 39px;
  margin-top: 22px;
  position: absolute;
}
.tick{
  height: 162px;
  width: 5%;
  margin-left: 1%;
  float: left;
  background-color: white;
  text-align: center;
}
#set_time{
  width: 230px;
  height: 27px;
}

#tick > div > div.el-dialog__body > div:nth-child(2){
  margin-top: 20px
}
.text_phone{
  margin-top:20px;
  text-align: left;
}
.text_phone >span{
  margin-right: 10px;
  margin-left: 2px;
}
.text_intro p{
  width: 60.14px;
  float: left;
}
.text_intro p:last-of-type{
 line-height: 23px
}
.text_intro textarea{
  width: 208px;
  resize: none;
  padding: 3px 10px;
  border-color: #bfcbd9
}
.el-button--primary{
  float: left
}
</style>