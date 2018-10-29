<template>  
  <div id="app">   
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
    <el-breadcrumb separator="/" style="line-height:50px">
      <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">签约</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">新增</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
  <div style="height:81px; background-color:white;position: relative;">   
    <div class="head_search" style="padding:0!important;">
     <div class="choice" v-show="this.id== 3 || this.id ==4 ? false:true">
      <el-checkbox v-model="checkBox.checked" @change="checkedAll" >全选</el-checkbox>
      <span class="sign_sure"  @click="sureData">
        <el-tooltip content="签约成功" placement="top">
          <el-button>确定</el-button>
        </el-tooltip></span>
      </div>
      <div class="search" v-show="true">
        <input type="text" v-model="search" placeholder="姓名/社区医院/手机号/身份证号/常见疾病">
        <span @click="Serach">
          <img src="../../assets/images/search.png" >
        </span>
      </div>
    </div>
          <blurseach></blurseach>
  </div>
  <!--search end -->
  <div class="content">
   <div class="user_data" v-for="(item,index) in data3" style="background-color:#fff;height:172px;float:left; width:100%;  margin-bottom:10px;">
    <div class="content_left">
      <div class="selection_box" >
       <el-checkbox  class='input-checkbox input_one' @change="checkItem" v-model='checkBox.items[index]' ref="checkboxs" v-show="id == 3 || id == 4 ? false:true"></el-checkbox>
     </div>
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
     <dt>提交时间</dt>
     <dd>{{item.createTime}}</dd>
   </dl>
   <dl>
     <dt>社区医院</dt>
     <dd>{{item.hospitalName}}</dd>
   </dl>
 </div>
  <div class="content_bohui" v-show="id == 3 || id == 4 ? false:true">
      <span @click="returnData(item,index)">驳回</span>    
 </div>
</div>

</div>
<div class="all" >
  <span>共&nbsp;<i>{{total}}</i>&nbsp;条</span>

  <!-- 分页 -->
  <template>
    <div class="block" id="signlist1">
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
</div>      
</template>
<script>
import axios from "axios";
import paging from "./../../common/paging.vue";
import blurseach from "./../../common/blurseach.vue";
import { familyDoctor, getLastDate, checobox } from "./../../common/util.js";
import bus from "../../bus";
export default {
  data() {
    return {
      search: "",
      disabled: false,
      dateValue: false,
      data3: [],
      value2: "",
      total: 0,
      id: "",
      token:"",
      loginId:"",
      value1: "",
      checkBox: {
        checked: false,
        items: []
      },
      exportApi: { api: "/whjtys/excel/exportExcelNewUser", title: "新增" }
    };
  },
  watch: {
    $route() {
      this.$router.go(0)
    },

  },
  methods: {
    // 请求数据
    request: function() {
      let url = familyDoctor();
      let _this = this;
      axios.get(url + "/whjtys/signed/newSigning?loginId="+_this.loginId+"&token="+_this.token).then(function(response) {
        let listArray = response.data.pagehelper.list;
        _this.data3 = listArray;
        _this.total = response.data.pagehelper.total;
        bus.$emit("export", _this.exportApi);
      });
    },
    //确定已签约
    sureData: function(index) {
      let _this = this;
      let checoboxs = this.$refs.checkboxs;
      let url = familyDoctor();
      for (var i = checoboxs.length - 1; i >= 0; i--) {
        if (checoboxs[i].model) {
          axios
            .post(url + "/whjtys/signed/updateStatue/?ids=" + _this.data3[i].id+"&loginId="+_this.loginId+"&token="+_this.token)
            .then(response => {
              _this.request();
               _this.$message({
                message: response.data.msg,
                type: 'success'
              });
            })
            .catch(error => {
              _this.request();
               _this.$message({
                message: error.data.msg,
                type: 'warning'
              });
            });
        }
        _this.checkBox.items[i] = false;
        _this.checkBox.checked = false;
      }
    },
    //驳回
    returnData: function(item, index) {
      let _this = this;
      let url = familyDoctor();
      
      if ((this.id == 3) | (this.id == 4)) {
        this.$message("暂无权限");
        return;
      }
      this.$confirm("此操作将驳回该签约人, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          let checoboxs = this.$refs.checkboxs;
          checobox(checoboxs);
          axios.post(url + "/whjtys/signed/signingBack?id=" + item.id+"&loginId="+_this.loginId+"&token="+_this.token)
            .then(response => {
               this.$message({
                message: response.data.msg,
                type: 'success'
              });
              this.request();
            });
        }).catch(() => {
          this.request();
        });
    },
    //全选
    checkedAll() {
      var _this = this;
      this.data3.forEach(function(item, index) {
        _this.checkBox.items[index] = _this.checkBox.checked;
      });
      if (_this.checkBox.items.length <= 0) {
        _this.checkBox.checked = false;
      }
    },
    // 单选
    checkItem() {
      var unchecked = 0;
      var _this = this;
      _this.data3.forEach(function(item, index) {
        if (_this.checkBox.items[index]) {
          unchecked++;
        }
      });
      _this.checkBox.checked = unchecked >= _this.data3.length ? true : false;
    },

    // 分页
    handleCurrentChange: function(val) {
      let url = familyDoctor();
      let _this = this;
      if (!_this.search) {
        axios.get(url + "/whjtys/signed/newSigning?pageNum=" + val+"&loginId="+_this.loginId+"&token="+_this.token)
          .then(function(response) {
            _this.data3 = response.data.pagehelper.list;
          });
      } else {
        axios.get(url + "/whjtys/signed/newSigning?searchKey=" + _this.search + "&pageNum=" + val+"&loginId="+_this.loginId+"&token="+_this.token)
          .then(function(response) {
            _this.data3 = response.data.pagehelper.list;
            _this.total = response.data.pagehelper.total;
          });
      }
      let checoboxs = this.$refs.checkboxs;
      checobox(checoboxs);
    },
    // 搜索
    Serach: function() {
      let url = familyDoctor();
      let _this = this;
      axios.get(url + "/whjtys/signed/newSigning?searchKey=" + _this.search+"&loginId="+_this.loginId+"&token="+_this.token)
        .then(function(response) {
          _this.data3 = response.data.pagehelper.list;
          _this.total = response.data.pagehelper.total;
          _this.checkBox.checkBox = false;
          _this.checkBox.items = [];
        });
        let checoboxs = this.$refs.checkboxs;
        checobox(checoboxs);
    }

  },

  created: function() {
     this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.id = window.localStorage.getItem("id");
    this.request();
  },
  computed: {
    familyDoctor
  },
  components: {
    blurseach
  }
};
</script>
<style lang="css" scoped>
/*搜索end*/
.search_grid {
  height: 50px;
  /*width:338px;*/
  display: inline-block;
  float: left;
  position: relative;
  margin-left: 310px;
  margin-top: 15px;
}

.search_grid input {
  outline: none;
  width: 72%;
  height: 48px;
  border: 1px solid #49c7c4;
  float: left;
}
.search_grid span {
  display: inline-block;
  height: 48px;
  width: 50px;
  color: #fff;
  text-align: center;
  border: 1px solid #49c7c4;
  float: left;
  cursor: pointer;
  position: absolute;
  right: -51px;
  top: 0;
}
.search_grid span img {
  margin-top: 12px;
}
/*搜索栏结束*/
/*日期样式*/
.export {
  width: 456px;
  height: 220px;
  position: absolute;
  top: 70px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #49c7c4;
  z-index: 2;
  box-shadow: 0px 0px 6px 3px #dadada;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 50px;
}
.export > span {
  position: absolute;
  color: #000;
  font-size: 14px;
  top: 60px;
  left: 214px;
}

.export .block {
  width: 45%;
  text-align: left;
}
.export .block > div {
  line-height: 20px;
  width: 100%;
}
.export .block > div i {
  left: 0;
}
.export .block span {
  font-size: 14px;
  color: #6a6a6a;
}
.export .block div > input {
  width: 188px;
  padding: 10px 30px;
}
.export .export_but {
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -145px;
  text-align: center;
}
.export .export_but > button {
  width: 140px;
  height: 34px;
}
.export .export_but > p {
  color: #6a6a6a;
}
.export .export_but > p > span {
  color: #49c7c4;
}
.choice {
  width: 163px;
  height: 48px;
  float: left;
  margin: 23px 0px 0 25px;
}
.el-checkbox {
  height: 20px;
  width: 62px;
}

.el-checkbox__inner {
  height: 20px;
  width: 20px !important;
}
.el-checkbox__inner::after {
  height: 14px;
  left: 7px;
  width: 5px;
}
.sign_sure {
  color: #49c7c4;
  margin: 0 18px 0 6px;
}
.sign_return {
  color: #f09267;
  margin-right: 18px;
}
.search {
  height: 50px;
  width: 49%;
  display: inline-block;
  float: right;
  margin-top: 16px;
  margin-right: 85px;
}
.search input {
  outline: none;
  width: 68%;
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
  width: 25%;
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
/*search end*/
.content {
  width: 100%;
  margin-top: 10px;
  position: relative;
}
.content_left {
  width: 57%;
  height: 172px;
  float: left;
}
.selection_box {
  height: 172px;
  width: 12%;
  float: left;
  line-height: 172px;
}
.selection_box i {
  margin-left: 15px;
  font-style: normal;
}
.content_left i {
  width: 50px;
  line-height: 135px;
}
.content_left dl {
  float: left;
  margin-top: 30px;
}
.content_left dt,
.content_right dt {
  color: #bbbbbb;
  font-size: 14px;
}
.content_left dd,
.content_right dd {
  padding-top: 8px;
  color: #676767;
  width: 100%;
  font-size: 14px;
}
.content_left dl:first-of-type {
  width: 20%;
  height: 67px;
}
.content_left dl:nth-of-type(2) {
  width: 15%;
  height: 67px;
}
.content_left dl:nth-of-type(3) {
  width: 34%;
  height: 67px;
  margin-top: 30px;
  position: relative;
}
.content_left dl:nth-of-type(4) {
  width: 14%;
  height: 67px;
  margin-top: 30px;
  margin-left: 2%;
  position: relative;
}
.content_left dl:nth-of-type(5) {
  height: 67px;
  width: 20%;
  margin-top: 0;
  position: relative;
}
.content_left dl:last-of-type {
  margin-top: 0px;
  height: 74px;
  width: 63%;
  margin-left: 2%;
}
.content_right {
  width: 42%;
  height: 172px;
  float: left;
  padding-left: 1%;
  position: relative;
}
.content_right > .content_bohui {
  position: absolute;
  top: 0;
  right: -45px;
  width: 40px;
  height: 172px;
  background-color: #fff;
  color: #49c7c4;
  cursor: pointer;
}
.content_bohui:hover {
  color: #fff;
  background: #49c7c4;
}
.content_right > .content_bohui > span {
  display: block;
  width: 20px;
  margin: 60px 0 0 10px;
}
.content_border {
  height: 125px;
  width: 97%;
  border-left: 1px solid #ccc;
  margin-top: 23px;
  padding-left: 5%;
}
.content_right dl:first-of-type {
  width: 90%;
  height: 67px;
  padding-top: 6px;
}
.content_right dl:nth-of-type(2) {
  width: 40%;
  height: 74px;
  margin-top: 0px;
  float: left;
  position: relative;
}
.content_right dl:last-of-type {
  width: 60%;
  height: 74px;
  margin-top: 0px;
  float: left;
  font-size: 15px;
}
.content_right dl:nth-of-type(2) dd {
  position: absolute;
  left: 0;
}
#app > div.content > div:nth-child(5) {
  margin-bottom: 0 !important;
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
.input_one{
  margin-left: 24px
}
</style>