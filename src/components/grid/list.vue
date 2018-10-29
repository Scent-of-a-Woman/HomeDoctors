<template>
	<div id='app'>
		<!-- 步骤条 -->
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">网格员</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">详情</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<!-- 头部 -->
		<div style="height:81px; background-color:white;width:100%;position: relative;">   
			<div id="head_search">
				<div class="search_left">
					<el-checkbox v-model="checkBox.checked" @change="checkedAll">全选</el-checkbox>
					<a href="javascript:;" @click="returnData">批量删除</a>
				</div>
				<div class="search_right"> 
					<input type="text" v-model="search" placeholder="姓名/手机号/邀请码">
					<span @click="searchskey">
						<img src="../../assets/images/search.png">
					</span>
				</div>
       <blurseach></blurseach>
     </div>
   </div>
   <!-- 内容 -->
   <div class="gridlist">
     <ul>
      <li>   </li>
      <li>网格姓名</li>
      <li>手机号码</li>
      <li>邀请码</li>
      <li>签约成功</li>
      <li>累计奖励金</li>
      <li id="new_grid" class="gridlist_first">
       <el-button type="text" @click="dialogVisible = true">
        <i></i>
        新增网格员
      </el-button>
      <el-dialog
      title="新增网格员"
      :visible.sync="dialogVisible"
      id="add_grid">
      <div>
        <div>姓名</div>
        <el-input v-model="addname" placeholder="请输入内容"></el-input>
        <div>手机号</div>
        <el-input v-model="addphone" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addPostAxios(addname,addphone);dialogVisible = false">确 定</el-button>
          <el-button @click="dialogVisible = false" class="reset">取 消</el-button>
        </span>
      </div>
      
    </el-dialog>
  </li>
</ul>
</div>
<div>
  <ul class="data_list">
   <li v-for="(item,index) in data3">
    <ul>
     <li>
      <el-checkbox  type='checkbox' @change="checkItem" ref="checkboxs" v-model='checkBox.items[index]'></el-checkbox>
    </li>
    <li>{{item.name }}</li>
    <li>{{item.phone}}</li>
    <li>{{item.code}}</li>
    <li>{{item.signNum}}</li>
    <li>{{item.signMoney}}</li>

    <li id="edit_grid">
      <a href="javascript:;" style="color:#999;" @click="edit(item);dialogVis = !dialogVis">编辑</a>
      <el-dialog
      title="修改网格员"
      :visible.sync="dialogVis"
      id="add_grid">
      <div style="text-align:left;color:#989898;">
       <div>姓名</div>
       <el-input v-model="editname" placeholder="请编辑内容"></el-input>
       <div>手机号</div>
       <el-input v-model="editphone" placeholder="请编辑内容"></el-input>
     </div>
     <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="editPutAxios(editname,editphone)">确 定</el-button>
      <el-button @click="dialogVis = false" class="reset">取 消</el-button>
    </div>
  </el-dialog>
  <a href="javascript:;" @click="removeData(item,index)">删除</a>
</li>
</ul>
</li>
</ul>
</div>
<!-- 统计 -->
<div class="count">
	<div>共&nbsp;<span class="count_num">{{total}}</span>&nbsp;条 &nbsp;奖励金累计共 <span class="count_money">{{sumPaid}}</span>&nbsp;元</div>
</div>
<!-- 分页 -->
<template>
	<div class="block" style="width:100%;text-align:center;">
		<el-pagination
		layout="prev, pager, next"
		:total="total"
		v-if="total <= 10 ? false:true"
		:page-size="10"
		@current-change="handleCurrentChange">
	</el-pagination>
</div>
</template>
</div>
</template>
<script>
import paging from "./../../common/paging.vue";
import blurseach from "./../../common/blurseach.vue";
import { familyDoctor,checobox } from "./../../common/util.js";
import axios from "axios";
import bus from "../../bus";

export default {
  data() {
    return {
      search: "",
      dialogVisible: false, // 新增
      dialogVis: false, // 编辑
      url: familyDoctor(), // urlApi
      addname: "", //新增姓名
      addphone: "", //新增手机
      editname: "", //编辑姓名
      editphone: "", //编辑手机
      id: "", //编辑功能ID
      data3: [], //源数据
      sumPaid: 0,
      total: 12,
      exportApi: { api: "/whjtys/agent/exportExcelAgentInfo", title: "网格员" }, //导出api
      checkBox: {
        checked: false,
        items: []
      }
    };
  },
  watch: {
    $route() {
      this.$router.go(0)
    }
  },
  methods: {
    //请求数据
    request: function() {
      let _this = this;
      axios.get(_this.url + "/whjtys/agent/pageAgent").then(response => {
        let listArray = response.data.pagehelper.list;
        console.log(response.data.sumPaid)
        _this.data3 = listArray;
        _this.total = response.data.pagehelper.total;
        this.sumPaid = response.data.sumPaid;
        bus.$emit("export", _this.exportApi);
      });
    },

    // 新增网格员
    addPostAxios: function(addname, addphone) {
     if(this.addname==""){
      this.$message("请输入正确的医生信息")
      dialogVisible=true
      return
    }
    let _this = this;
    let reg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
    if(reg.test( _this.addphone)&& _this.addname!=null){
      axios.post(_this.url +"/whjtys/agent/addAgent?name=" +addname +"&phone=" +addphone).then(function(response) {
        _this.$message(response.data.msg+"请刷新页面！")

        _this.request();
      })
    }else{
      this.$message("请输入正确的手机号码");
      dialogVisible=true
    }

    _this.addname = "";
    _this.addphone = "";
  },
    // 修改网格员
    edit: function(item) {
     this.id = item.id;
     this.editname = item.name
     this.editphone = item.phone
   },
   editPutAxios: function(editname, editphone) {

    let _this = this;
    let reg=/^(1[3584]\d{9})$/
      if( this.editname==""){
      this.$message("请输入正确的医生信息")
      return
    }
    if(reg.test(this.editphone)&&this.editphone!=null){
     axios.put(_this.url +"/whjtys/agent/updateAgent?id=" +this.id +"&name=" +editname +"&phone=" +editphone).then(function(response) {

       _this.$message({
        message: response.data.msg+"请刷新页面！",
        type: 'success'
      });
       _this.request();
     })
   }else{
    this.$message("请输入正确的手机号码");
    this.dialogVisible=true
  }

  _this.dialogVis = false;
  _this.editname = "";
  _this.editphone = "";
},
    //全选
    checkedAll() {
      var _this = this;
      this.data3.forEach(function(item, index) {
        _this.checkBox.items[index] = _this.checkBox.checked;
      });
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
    // 批量删除
    delAxios: function(ids) {
      var _this = this;
      this.$confirm("此操作将删除该网格员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios.delete(this.url + "/whjtys/agent/deleteAgents?ids=" + ids)
        .then(function(response) {
          for (let i = _this.data3.length; i >= 0; i--) {
            if (_this.checkBox.items[i] == true) {
              _this.data3.splice(i, 1);
              _this.checkBox.items.splice(i, 1);
            }
          }
          _this.request();
        })
        _this.request();
      })
    },
    returnData: function() {
      let ids = "";
      for (let i = this.data3.length; i >= 0; i--) {
        if (this.checkBox.items[i] == true) {
          ids += this.data3[i].id + "&ids=";
        }
        this.checkBox.items[i] = false
      }
      this.delAxios(ids);
      this.checkBox.checked = false;

    },
    //单个删除
    removeData: function(item, index) {
      let _this = this;
      this.$confirm("此操作将删除该网格员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        for (var i = this.data3.length - 1; i >= 0; i--) {
          if (i == index) {
            // 删除数据删除数据
            axios
            .delete(this.url + "/whjtys/agent/deletebyId/" + item.id)
            .then(function(response) {
              _this.$message({
                message: response.data.msg+"请刷新页面！",
                type: 'success'
              });
              _this.checkedAll();
              _this.request();
            })
          }
        }
        _this.request();
      });
    },
    // 分页
    handleCurrentChange: function(val) {
      let url = familyDoctor();
      let _this = this;
      axios.get(_this.url +"/whjtys/agent/pageAgent?searchKey=" +_this.search + "&pageNum=" +val
        ).then(response => {
          _this.data3 =  response.data.pagehelper.list;
          _this.total = response.data.pagehelper.total;
          _this.sumPaid = response.data.sumPaid;
        })
        let s = _this.$refs.checkboxs;
        checobox(s);
      },
    // 搜索关键字
    searchskey: function() {
      let _this = this;
      axios
      .get(_this.url + "/whjtys/agent/pageAgent?searchKey=" + _this.search)
      .then(response => {
        _this.data3 = response.data.pagehelper.list;
        _this.total = response.data.pagehelper.total;
        _this.sumPaid = response.data.sumPaid;
      })
      let s = _this.$refs.checkboxs;
      checobox(s);
    }
  },
  created: function() {
    this.request();
  },
  computed: {},
  components: {
    blurseach,
    paging
  }
};
</script>
<style scoped>
/*弹框样式*/
.reset:hover{
  color: #49c7c4;
  border-color:#49c7c4;
}
.gridlist .el-dialog {
  width: 30%;
  line-height: 20px;
}
.gridlist .el-dialog .el-dialog__header {
  padding: 20px 30px;
  text-align: left;
  font-size: 16px;
}
.el-dialog__header .el-dialog__title {
  color: #6b6b6b;
}
.gridlist .el-dialog .el-dialog__body {
  width: 90%;
  border-top: 1px solid #000;
  padding: 30px 0;
  margin: 0 auto;
  font-size: 16px;
}
.gridlist .el-dialog .el-dialog__body > div > div {
  text-align: left;
  color: #989898;
}
.gridlist .el-dialog .el-dialog__body > div > input {
  width: 100%;
  height: 30px;
  border: 1px solid #ebebeb;
  outline: none;
  padding-left: 10px;
}
.gridlist .el-dialog .el-dialog__footer {
  text-align: center;
}
.gridlist .el-dialog  button {
  width: 80px;
  height: 35px;
  margin-top:23px;
}
#add_grid > div > div.el-dialog__body > div{
  line-height: 20px;
  text-align: center;
}
#head_search {
  height: 65px;
}
.search_left {
  float: left;
  margin-left: 4%;
  margin-top: 30px;
  color: #999;
  font-size: 14px;
}
.search_left input {
  width: 15px;
  height: 15px;
  vertical-align: sub;
  margin-right: 10px;
  margin-top: 15px;
}
.search_left a {
  color: #f3a987;
  margin-left: 15px;
  font-size: 14px;
}
#head_search > .search_right {
  height: 50px;
  display: inline-block;
  float: right;
  margin-top: 16px;
  width: 38%;
  margin-right: 115px;
}

#head_search > .search_right > input {
  outline: none;
  width: 74%;
  height: 48px;
  border: 1px solid #49c7c4;
  float: left;
  font-size: 15px;
  padding-left: 15px;
}
#head_search > .search_right > span {
  display: inline-block;
  height: 48px;
  width: 50px;
  color: #fff;
  text-align: center;
  border: 1px solid #49c7c4;
  border-left: 0;
  float: left;
  cursor: pointer;
}
#head_search > .search_right > span > img {
  margin-top: 12px;
}
/*搜索栏结束*/
.gridlist {
  margin-top: 10px;
  height: 55px;
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
}
.gridlist ul {
  height: 100%;
  width: 100%;
  display: block;
}
.gridlist ul li {
  float: left;
  line-height: 55px;
  height: 55px;
  color: #49c7c4;
  position: relative;
  text-align: center;
  font-size: 16px;
}
.gridlist ul li:first-child {
  width: 10%;
}
.gridlist ul li:nth-of-type(2) {
  width: 10%;
}
.gridlist ul li:nth-of-type(3) {
  width: 15%;
}
.gridlist ul li:nth-of-type(4) {
  width: 10%;
}
.gridlist ul li:nth-of-type(5) {
  width: 15%;
}
.gridlist ul li:nth-of-type(6) {
  width: 15%;
}
.gridlist ul li:nth-of-type(7) {
  width: 25%;
}
.el-button--text {
  font-size: 16px;
  color: #49c7c4;
}
.el-button--text i {
  width: 22px;
  height: 19px;
  display: inline-block;
  background: url("../../assets/images/addition.png") 0 0 no-repeat;
  background-size: 100%;
  vertical-align: bottom;
}
.gridlist ul li:last-child {
  width: 200px;
}
.data_list {
  width: 100%;
}
.data_list > li {
  height: 55px;
  width: 100%;
  float: left;
  margin-bottom: 10px;
}
.data_list li > ul {
  float: left;
  height: 55px;
  width: 100%;
  font-size: 14px;
  background-color: white;
}
.data_list li > ul > li:nth-of-type(1) {
  float: left;
  height: 40px;
  width: 10%;
  text-align: center;
}
.data_list li > ul > li:nth-of-type(2) {
  width: 10%;
  text-align: center;
  float: left;
}
.data_list li > ul > li:nth-of-type(3) {
  width: 15%;
  float: left;
  text-align: center;
}
.data_list li > ul > li:nth-of-type(4) {
  width: 10%;
  float: left;
  text-align: center;
}
.data_list li > ul > li:nth-of-type(5) {
  width: 15%;
  float: left;
  text-align: center;
}
.data_list li > ul > li:nth-of-type(6) {
  width: 15%;
  float: left;
  text-align: center;
}
.data_list li > ul > li:nth-of-type(7) {
  width: 25%;
  float: left;
  text-align: center;
}
.data_list ul li:last-child a {
  color: #f3a987;
  margin: 0 5px;
}
.data_list li > ul > li {
  line-height: 55px;
}
.count {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  float: left;
  text-align: center;
}
.count div {
  margin: auto;
  width: 270px;
  height: 30px;
  line-height: 30px;
  margin-top: -15px;
}
.count_num,
.count_money {
  color: #49c7c4;
}
/* 编辑网格员 */

#add_grid > div div.el-dialog__body > div > div {
  line-height: 35px;
}

#edit_grid > div > div.el-dialog__footer {
  padding-left: 60px;
  padding-right: 50px;
}
#edit_grid
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--primary {
  float: left;
}
#edit_grid
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--default {
  float: right;
}
#add_grid > div > div.el-dialog__body > div.el-dialog__footer > div > button.el-button.el-button--primary,
#add_grid > div > div.el-dialog__body > div.el-dialog__footer > div > button.el-button.reset.el-button--default{
  width: 80px;
  text-align: center;
  margin-top: 30px;
}
</style>