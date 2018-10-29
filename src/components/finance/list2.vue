<template>
	<div id="app">
		<el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
			<el-breadcrumb separator="/" style="line-height:50px">
				<el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">对账管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '' }">收款信息</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<div style="height:81px; background-color:white;width:106%;position: relative;">   
			<div class="head_search">
				<!-- <span class="query">按条件查询</span> -->
				<el-button type="text" @click="dialogVisible = true" style="font-size:16px">条件查询</el-button>
				<el-dialog title="按条件查询" :visible.sync="dialogVisible" size="tiny" id="term_select" >
					<!--时间选择器  -->
					<!--开始 -->
					<div>
						<div>起始时间</div>
						<div class="block">
							<el-date-picker v-model="value1" 
              placeholder="选择日期时间"></el-date-picker>
            </div>
          </div>
          <!-- 结束 -->
          <div>
            <div>截至时间</div>
            <div class="block">
             <el-date-picker v-model="value2"  placeholder="选择日期时间"></el-date-picker>
           </div>
         </div>
         <!--body  选择器  -->
         <div>
          <div>社区医院</div>
          <el-select v-model="value3" clearable filterable placeholder="请选择"  :disabled="this.id==4||this.id==9||this.id==10||this.id==99?true:false">
           <el-option
           v-for="item in options" :key="item.id" :label="item.hospital_name" :value="item.id"></el-option>
         </el-select>
       </div>
       <!-- 操作员选择 -->
       <div>
        <div>操作员</div>
        <el-select v-model="value6" placeholder="请选择操作员" :disabled="this.id ==10?true:false" clearable style="border-color:#ccc">
          <el-option v-for="(v,index) in options6" :key="v" :label="v" :value="v"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false;getTerm(value1,value2,value3,value6)">确 定</el-button>
        <el-button @click="dialogVisible = false" class="reset">取 消</el-button>
      </span>
    </el-dialog>
    <div class="search">
      <blurseach></blurseach>
    </div>
  </div>
</div>

<div class="contain">
	<div class="content">
		<ul>
			<li>支付宝交易号</li>
			<li>交易金额</li>
			<li>退款金额</li>
			<li>支付宝账号</li>
			<li>支付时间</li>
			<li>门店信息</li>
			<li>收费窗口</li>
			<li>操作员</li>
		</ul>
		<ul v-for="item in data3">
			<li>{{item.trade_no}}</li>
			<li>{{item.receipt_amount}}</li>
			<li>{{item.send_back_fee}}</li>
			<li>{{item.buyer_logon_id}}</li>
			<li>{{item.gmt_payment}}</li>
			<li>{{item.seller_name}}</li>
			<li>{{item.shop_name}}</li>
			<li>{{item.operator}}</li>
		</ul>
	</div>
	<div class="total">
		<span>收款：<i>{{totalAmount}}</i>&nbsp;元</span>
		<span>退款：<i style="color:#eb6100;font-style:normal">{{RefundtotalAmount}}</i>&nbsp;元</span>
    <span>实收款：<i>{{money}}</i>&nbsp;元</span>
    <div>
      <span class="shou">收款：<i style="font-style:normal">{{CountSum}}</i>&nbsp;笔</span>
      <span class="tui">退款：<i style="color:#eb6100;font-style:normal">{{RefundPayCount}}</i>&nbsp;笔</span>   
    </div> 
  </div>
  <div class="all" >
    
    <template>
      <!-- 分页 -->
      <div class="block">
       <el-pagination
       layout="prev, pager, next"
       :total="total"
       v-if="total <= 10 ? false:true"
       :page-size="10"
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
import blurseach from "./../../common/blurseach.vue";
import axios from "axios";
import { familyDoctor, getLastDate } from "./../../common/util.js";
import bus from "../../bus";
export default {
  data() {
    return {
      dialogVisible: false,
      price: "12312",
      refund: "0.3",
      total: 0, //总页数
      RefundtotalAmount: "0", //退款
      totalAmount: "0", //总收款
      money:"0",
      options: [],     //社区医院数据
      value1: "",      //起始日期
      value2: "",      //截止日期
      value3: "",      //社区医院
      op_erator: "",   //操作员
      data3: [],       //展示数据
      url: familyDoctor(), // 统一api
      startTime:"",
      endTime:"",
      store_id1:"",
      id:"",
      token:"",
      loginId:"",           //院长id
      exportApi:{api:'/whjtys/account/exportExcelbill',title:'收款'},//导出api
      value6:'',
      options6:'',
      RefundPayCount:"0",// 退款笔数
      CountSum:"0",//交易笔数
    };
  },
  watch:{
    value3:function(){
      axios.get(this.url + "/whjtys/account/findOperatorById?hospitalId="+this.value3+"&loginId="+this.loginId+"&token="+this.token).then(response=>{
        this.options6 = response.data.operators
      })
    },
    $route() {
      this.$router.go(0)
    }
  },
  created: function() {
    this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.id=window.localStorage.getItem("id")
    this.requestData()
  },
  methods: {
    // 条件查询账单
    requestData: function() {
      let _this = this;
      axios.get(_this.url + "/whjtys/account/findAllbill?pageSize="+10+"&loginId="+_this.loginId+"&token="+_this.token)
      .then(response => {
        _this.data3 = response.data.pagehelper.list;
        _this.total = response.data.pagehelper.total;
        _this.RefundtotalAmount = response.data.RefundtotalAmount;
        _this.totalAmount = response.data.totalAmount;
        _this.money=  response.data.amount;
        this.CountSum=response.data.CountSum - response.data.RefundPayCount;
        _this.RefundPayCount=response.data.RefundPayCount;
        bus.$emit('export',this.exportApi)
      });
      axios.get(_this.url + "/whjtys/planning/findAllHospital?loginId="+_this.loginId+"&token="+_this.token)
      .then(function(response) {
        let bunbun = response.data.hosplist
        bunbun.forEach(function(value, i) {
          if (value.store_id !== null) {
            _this.options.push(value)
          }
        })
      });
        axios.get(this.url+"/whjtys/planning/findAllHospitalById?loginId="+_this.loginId+"&token="+_this.token).then(response=>{
          this.value3 =  response.data.hospital.id
          this.exportApi.store_id1 = response.data.hospital.store_id
      })
    },
    
    //条件查询
    getTerm: function() {
     let _this = this;
     _this.startTime = getLastDate(arguments[0])
     _this.endTime = getLastDate(arguments[1])
     _this.options.forEach((v,i)=>{
      if (v.id == arguments[2]) {
        _this.store_id1 = v.store_id
      }
    })
     _this.op_erator = arguments[3]
     this.exportApi.operator = arguments[3]
     this.exportApi.store_id1 = _this.store_id1
     if(_this.value3==""){
         axios.get(_this.url +
      "/whjtys/account/findAllbill?begindate=" +_this.startTime +"&enddate=" +_this.endTime +"&operator=" + _this.op_erator+"&loginId="+_this.loginId+"&token="+_this.token ).then(response => {
        _this.data3=response.data.pagehelper.list
        _this.total=response.data.pagehelper.total
        _this.RefundtotalAmount = response.data.RefundtotalAmount;
        _this.totalAmount = response.data.totalAmount;
        _this.money=  response.data.amount
        _this.CountSum=response.data.CountSum - response.data.RefundPayCount        
        _this.RefundPayCount=response.data.RefundPayCount
      })
      .catch(error => {
      });
     }else{
           axios.get(_this.url +
      "/whjtys/account/findAllbill?begindate=" +_this.startTime +"&enddate=" +_this.endTime +"&store_id1=" +
      _this.store_id1 +"&operator=" + _this.op_erator+"&loginId="+_this.loginId+"&token="+_this.token ).then(response => {
        _this.data3=response.data.pagehelper.list
        _this.total=response.data.pagehelper.total
        _this.RefundtotalAmount = response.data.RefundtotalAmount;
        _this.totalAmount = response.data.totalAmount;
        _this.money=  response.data.amount
        _this.CountSum=response.data.CountSum - response.data.RefundPayCount        
        _this.RefundPayCount=response.data.RefundPayCount
      })
      .catch(error => {
      });
    }
    },

    // 分页
    handleCurrentChange: function(val) {
      let url = familyDoctor();
      let _this = this;
      if(_this.startTime==""&_this.endTime==""&_this.op_erator==""&_this.store_id1==""){
       axios.get(url + "/whjtys/account/findAllbill?pageNum=" + val+"&pageSize="+10+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response) {
        _this.data3 = response.data.pagehelper.list;
      })
     }else{
      axios.get(url+"/whjtys/account/findAllbill?pageNum="+val+"&pageSize="+10+"&operator="+_this.op_erator+"&begindate="+_this.startTime+"&enddate="+_this.endTime +"&store_id1="+_this.store_id1+"&loginId="+_this.loginId+"&token="+_this.token).then((response)=>{
        _this.data3=response.data.pagehelper.list
      })
    }
    
  }
},
components: {
  blurseach
}
};
</script>
<style scoped>
.reset:hover{
		color: #49c7c4;
    border-color:#49c7c4;
}
#app > div:nth-child(2) > div > button{
  color: #49c7c4
}
.query {
  display: block;
  float: left;
  height: 81px;
  width: 150px;
  text-align: center;
  line-height: 81px;
  color: #85d6d4;
}
#app > div:nth-child(2) > div > button {
  height: 81px;
  width: 150px;
  float: left;
}
.excel {
  width: 15%;
  height: 50px;
  background-color: #49c7c4;
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  float: right;
  margin-right: 10px;
  cursor: pointer;
  margin-top: 16px;
}
.content ul {
  width: 110%;
  height: 55px;
  margin-top: 10px;
}
.content ul:nth-of-type(1) li{
  color:#49c7c4;
  font-size: 15px;
}
.content ul li {
  float: left;
  height: 55px;
  line-height: 55px;
  text-align: center;
  margin-right: 1px;
  background-color: white;
  font-size: 13px;
}
.content ul li:first-of-type {
  width: 22%;
}
.content ul li:nth-of-type(2) {
  width: 7%;
}
.content ul li:nth-of-type(3) {
  width: 7%;
}
.content ul li:nth-of-type(4) {
  width: 11%;
}
.content ul li:nth-of-type(5) {
  width: 14%;
}
.content ul li:nth-of-type(6) {
  width: 12%;
}
.content ul li:nth-of-type(7) {
  width: 17%;
}
.content ul li:nth-of-type(8) {
  width: 6%;
}
.total {
  margin:30px 0 10px 0;
  text-align: center;
  font-size: 15px;
}
.total span{
  margin: 0 20px;
}
.total span i {
  color: #49c7c4;
  font-style: normal;
}
.total > div{
  margin-top: 8px;
}
.all {
  width:100%;
  float: left;
  line-height: 30px;
  margin-top: 10px;
  text-align: center;
}
.all span {
  display: inline-block;
  margin: auto;
  width: 70%;
  text-align: center;
}
.all .shou,.all .tui{
  width: 15%;
}
.all .tui{
  margin-left: 2%
}
.all span i {
  color: #49c7c4;
}
#select_people{
  width: 320px;
  height: 33px;
  padding-left: 5px;
  border: 1px solid #bfcbd9
}
.search{
  float: right;
  margin-top: 15px;
  margin-right: 15px;
}
</style>