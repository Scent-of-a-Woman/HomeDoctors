<template>
  <div id="app">
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
    <el-breadcrumb separator="/" style="line-height:50px">
      <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">计免疫苗</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">计免预约</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
  <div style="height:81px; background-color:white;width:100%;position:relative">
    <div class="head_search">
      <div class="inoc">
       <span class="vaccine_com">
         <el-button type="text" @click="centerDialogVisible = true" style="font-size:15px;color:#49c7c4" v-show="this.id == 3 || this.id == 4 ? false:true">接种完成</el-button>
         <el-dialog  title="接种信息" :visible.sync="centerDialogVisible" center>
          <div>
           <span class="title">姓名</span>
           <input type="text" name="" v-model="data4.name" readonly="readonly">
         </div>
         <div>
           <span class="title">疫苗名称</span>
           <template>
              <el-select v-model="value" placeholder="请选择疫苗类型" multiple :multiple-limit='5' collapse-tags collapse-tags="true">
                <el-option v-for="v in data5" :key="v.id" :label="v.vaccineName" :value="v.id"></el-option>
              </el-select>
            </template>
        </div>
        <div>
         <span class="title">社区医院</span>
         <input type="text" name="" v-model="data4.hospitals" readonly="readonly">
       </div>
       <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureData">确 定</el-button>
        <el-button @click="centerDialogVisible = false" id="cancel">取 消</el-button>
      </span>
    </el-dialog>
  </span>
  <span class="vaccine_abate"><el-button type="text" @click="returnData"  style="font-size:15px;color:#eb6100" v-show="this.id == 3 || this.id == 4 ? false:true">预约失效</el-button></span>
  <el-select v-model="value1" placeholder="请选择疫苗类型" id="gongjing">
    <el-option v-for="v in options" :key="v.value" :label="v.label" :value="v.value"></el-option>
  </el-select>
</div>
<div class="search">
  <input type="text" v-model='search' placeholder="姓名/疫苗名称/手机号/社区医院">
  <span @click="Search">
    <img src="../../assets/images/search.png" >
  </span>
</div>
  
</div>
<blurseach></blurseach>
</div>
<div class="content">
 <div class="user_data" style="height:162px;margin-top:10px; width:100%;" 
 v-for="(item,index) in data3" :key="item.id">
 <div class="content_left">
  <i>{{index+1}}</i>
  <dl>
    <dt class="title">姓名</dt>
    <dd>{{item.babyName}}</dd>
  </dl>
  <dl>
   <dt class="title">疫苗名称</dt>
   <dd>{{item.vaccineName}}</dd>
 </dl>
 <dl>    
   <dt class="title">监护人姓名</dt>
   <dd>{{item.operatorName}}</dd>
 </dl>
 <dl>
   <dt class="title">手机号</dt>
   <dd>{{item.operatorPhone}}</dd>
 </dl>
</div>
<div class="content_right">
  <div class="content_border" >
   <dl>
     <dt class="title">预约接种时间</dt>
     <dd>{{item.orderTime}}</dd>
   </dl>
   <dl>
     <dt class="title">社区医院</dt>
     <dd>{{item.hospitalName}}</dd>
   </dl>
   <span style="display:block;margin-top:-15px;float:left">
    <el-checkbox type="checked" @change="checkedRadio(item,$event,index)" ref='checkboxs' v-show="id == 3 || id == 4 ? false:true"></el-checkbox>
  </span>
</div>
</div>
</div>
<!-- 分页 -->
<div class="all" >
  <span>共&nbsp;<i style="font-style: normal;">{{total}}</i>&nbsp;条</span>
  <template>
    <!-- 分页 -->
    <div class="block" id="vaccine_list1">
      <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      v-if="total<=5?false:true"
      ref = "fenye">
    </el-pagination>
  </div>
</template>
</div>
</div>
</div>
</template>
<script>
import axios from "axios"
import bus from '../../bus'
import blurseach from "./../../common/blurseach.vue";
import {familyDoctor,checobox} from "./../../common/util.js"
export default {
  data() {
    return {
      centerDialogVisible: false,
      search: "",
      value: [],
      id:"",
      disabled:false,
      total: "",    //总页数
      isShow: false,
      data3: [],
      loginId:"",
      token:"",
      data4: {}, //接种后信息的转移
      data5:[],  // 疫苗种类
      value1:[],
      currentPage:1,
      exportApi:{api:'/whjtys/vaccine/exportExcel/0',title:'预约'},
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
    };
  },
  watch:{
    value1:function(){
      let url = familyDoctor();
      axios.get(url + "/whjtys/vaccine/newJMOrder?falg="+this.value1+"&searchKey=" + this.search+"&loginId="+this.loginId+"&token="+this.token).then(response=>{
        this.data3 = response.data.pagehelper.list
        this.total = response.data.pagehelper.total

      })},
      centerDialogVisible:function(){
      let _this = this
      if(this.centerDialogVisible == true){
        let check = this.$refs.checkboxs
        for (var i = 0; i < check.length; i++) {
          if (check[i].model) {
            break
          }else{
            if(i ==check.length-1){
              this.$message("请勾选再点击")
              this.centerDialogVisible =false
              return
            }
            continue
          }
        }
      }
    },
    $route() {
      this.$router.go(0)
    }

},
  created: function() {
     this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.id=window.localStorage.getItem("id")
    this.requestData();
  },
  methods: {
    //数据交互
    requestData: function() {
      let _this = this;
      let url = familyDoctor();
      axios.get(url + "/whjtys/vaccine/newJMOrder/?falg="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response) {
        let listArray = response.data.pagehelper.list;
        _this.data3 = listArray;
        _this.total = response.data.pagehelper.total;
        bus.$emit('export',_this.exportApi)
      })
      axios.get(url + "/whjtys/vaccine/findAllVaccineInfo?loginId="+_this.loginId+"&token="+_this.token).then(response=>{
        this.data5 = response.data.list
      })
    },
    // 添加疫苗信息
    checkedRadio: function(item, event,index) {
      let checoboxs = this.$refs.checkboxs;
      let _this = this;
      checoboxs.forEach(function(v, i) {
          if(index == i){
            v.model = v.model
          }else{
            v.model = false
          }
      })
      for(var key in _this.data4){
        delete _this.data4[key]
      }
      if (event.currentTarget.checked) {
        //成功勾选
        this.value = []
        _this.data4.name = item.babyName; //姓名
        let data5 = this.data5
        let id = item.vaccineId.split(",")
        for(var i = 0; i < data5.length; i++){
            var obj = data5[i];
            for(var j = 0; j < id.length; j++){
                var aj = id[j];
                if(obj.id == aj){           
                    this.value.push(obj.id);                  
                    break;
                }
            }
        }
        _this.data4.hospitals = item.hospitalName; //社区医院
      }else{
        this.value = []
      }
    },
    // 完成
    sureData: function() {
      let _this = this;
      let url = familyDoctor();
      let checoboxs = _this.$refs.checkboxs;
      for (var i = checoboxs.length - 1; i >= 0; i--) {
        if (checoboxs[i].model) {
          axios.post(url + "/whjtys/vaccine/updataJMStatue?id="+_this.data3[i].id+"&vaccineid="+_this.value+"&loginId="+_this.loginId+"&token="+_this.token
            ).then(response=>{
              _this.$message({
                message: response.data.msg,
                type: 'success'
              });
              this.centerDialogVisible = false;
              this.requestData()
            })
            this.requestData()
            let checoboxs = this.$refs.checkboxs;
            checobox(checoboxs)
        }
      }
      for(var key in _this.data4){
        delete _this.data4[key]
      }
    },
    //失效
    returnData: function() {
      let _this = this;
      let url = familyDoctor();
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
      this.$confirm('确定预约失效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          for (var i = checoboxs.length - 1; i >= 0; i--) {
            if (checoboxs[i].model) {
              axios.post(url + "/whjtys/vaccine/loseJMStatue?id="+_this.data3[i].id+"&loginId="+_this.loginId+"&token="+_this.token).then(response=>{
                this.requestData()
                 _this.$message({
                message: response.data.msg,
                type: 'success'
              });
              })
            }
          }
          checobox(checoboxs)
        })
      for(var key in _this.data4){
        delete _this.data4[key];
      }
    },
    //分页
    handleCurrentChange: function(val) {
      let url = familyDoctor();
      let _this = this;
      if(!_this.search){
        axios.get(url + "/whjtys/vaccine/newJMOrder?pageNum=" + val+"&falg="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token)
        .then(function(response) {
          _this.data3 = response.data.pagehelper.list;
        });
      }else{
        axios.get(url + "/whjtys/vaccine/newJMOrder?searchKey=" + _this.search+"&pageNum="+val+"&falg="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token)
       .then(function(response) {
        _this.data3 = response.data.pagehelper.list;
        _this.total=response.data.pagehelper.total;
      });
     }

   },
    // 搜索
    Search: function() {
      let url = familyDoctor();
      let _this = this;
      axios.get(url + "/whjtys/vaccine/newJMOrder?searchKey=" + _this.search+"&falg="+this.value1+"&loginId="+_this.loginId+"&token="+_this.token)
      .then(function(response) {
        _this.data3 = response.data.pagehelper.list;
        _this.total=response.data.pagehelper.total
      });
    }
  },
  computed: {
  },
   components: {
    blurseach
  }
};
</script>
<style scoped>
.el-button.is-disabled,el-button.is-disabled:focus, .el-button.is-disabled:hover,{
  color: #20a0ff
}
dd{
  font-size: 14px;
}


.title{
  font-size: 17px
}
.head_search {
  padding: 0 0 0 0px;
  width: 100%;
  height: 81px;
  background-color: white;
}
.inoc {
  height: 66px;
  /*margin-right: 455px;*/
  width: 40%;
  padding-left: 3px;
  float: left;
  padding-top: 15px;
}
#app > div:nth-child(2) > div > div.inoc > span.vaccine_com {
  line-height: 52px;
  margin-right: 18px;
}
#bombox1 > .el-dialog--small {
  height: 471px !important;
  width: 441px !important;
  margin-bottom: 0;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body {
  height: 304px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__footer {
  height: 98px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__header {
  height: 67px !important;
  width: 441px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_abate
> button
> span
> a {
  color: #e67947;
}
.search {
  height: 50px;
  width: 42%;
  display: inline-block;
  margin-left: 30px;
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
  width: 60%;
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
  padding-top: 8px;
  color: #676767;
  overflow: hidden;
}
.content_left dl:first-of-type {
  width: 30%;
  height: 57px;
}
.content_left dl:nth-of-type(2) {
  width: 55%;
  height: 57px;
}
.content > div.user_data > div.content_left > dl > dd{
  height: 21px;
  line-height: 23px
}
.content_left dl:nth-of-type(3) {
  width: 30%;
  height: 57px;
  margin-top: 15px;
}
.content_left dl:last-of-type {
  margin-top: 22px;
  height: 57px;
  width: 50%;
  margin-top: 16px;
}
.content_right {
  width: 40%;
  height: 162px;
  float: left;
  background-color: white;
}
.content_border {
  height: 125px;
  width: 90%;
  border-left: 1px solid #ccc;
  margin-top: 23px;
  padding-left: 5%;
}
.content_right dl:first-of-type {
  width: 80%;
  height: 57px;
  float: left;

}
.content_right dl:last-of-type {
  width:82%;
  height: 64px;
  margin-top: 15px;
  float: left;
}
.vaccine_select {
  width: 320px;
  height: 35px;
  float: left;
  padding-left: 10px;
  border-radius: 7px;
  border: none;
  outline: none;
  border: 1px solid #ccc;
}
.vaccine_option {
  height: 35px;
  display: block;
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
.dialog-footer{
  display: block;
  width: 100%;
  height: 100%;
}
</style>
