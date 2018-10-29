     <template>
      <div id="app">
       <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">         
        <el-breadcrumb separator="/" style="line-height:50px">
          <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '' }">签约</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '' }">已签约</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <div style="height:81px; background-color:white;width:100%;position: relative;">   
        <div class="head_search">
          <div class="search">
            <input type="text" v-model="search" placeholder="姓名/社区医院/手机号/身份证号/常见疾病">
            <span @click="Search">
              <img src="../../assets/images/search.png" >
            </span>
          </div>
          <blurseach></blurseach>
        </div>
      </div>
      <div class="content">
       <div class="user_data" style="height:172px;float:left;width:100%;" v-for="(item,index) in data3">
         <div class="content_left">
           <i>{{index+1}}</i>
           <dl>
            <dt>姓名</dt>
            <dd>{{item.username}}</dd>
          </dl>
          <dl>
            <dt>性别</dt>
            <dd v-if="item.gender==1"> 男</dd>
            <dd v-else="item.gender==0">女</dd>
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
        <dl v-show="item.address.length < 8 ? true:false">  
           <dt></dt>
           <dd style="color:#ff5b05">{{status}}&nbsp;{{item.successTime}}</dd>
        </dl>
       </div>
       <div class="content_right">
        <div class="content_border">
         <dl>
           <dt>常见疾病信息</dt>
           <dd>{{item.medical_history}}</dd>
         </dl>
         <dl>
           <dt>签约时间</dt>
           <dd>{{item.successTime}}</dd>
         </dl>
         <dl>
           <dt>社区医院</dt>
           <dd>{{item.hospitalName}}</dd>
         </dl>
       </div>
       <div class="edit">
        <el-button type="text" @click="addInfo(item)">
          <img src="../../assets/images/已签约.png" height="31" width="31" @change="checkedRadio(item,$event)">
        </el-button>
        <!-- 确认签约信息 -->
        <el-dialog
        :visible.sync="dialogVisible"
        id="sure_info">
        <div class="patient_info">
         <div>
           <span class="fontcolor">姓名</span>
           <input type="text" name="" v-show='true' maxlength="5"  v-model="data4.username" :disabled="id==3||id ==4?true:false">
         </div>
         <div class="sex">
           <span class="fontcolor">性别</span>
           <span :class="data4.gender=='1'?'man_color':'women_color'"  @click="enitSex(1)">男</span>
           <span :class="data4.gender=='0'?'man_color':'women_color'" @click="enitSex(0)">女</span>
         </div>
       </div>
       <div class="idcard">
        <span class="fontcolor">身份证号</span>
        <input type="text" maxlength="18" name="" :disabled="id==3||id ==4?true:false"  v-model="data4.idcard">
      </div>
      <div class="phone">
        <span class="fontcolor">手机号码</span>
        <input type="text" name="" maxlength="11" :disabled="id==3||id ==4?true:false" v-model="data4.phone">
      </div>
      <div class="adress">
        <span class="fontcolor">家庭地址</span>
        <textarea v-model="data4.address" :disabled="id==3||id ==4?true:false"  @keyup="maxlength" maxlength="40"></textarea>
      </div>

      <div class="illness">
       <span class="fontcolor">常见疾病</span>
       <textarea v-model="data4.illness" :disabled="id==3||id ==4?true:false" @keyup="maxlength" maxlength="40"></textarea>
     </div>
     <div class="doctorteam">
      <span class="fontcolor">社区医院</span>
      <el-select :disabled="id==3?false:true" v-model="value" placeholder="请选择社区医院" style="border-color:#ccc">
        <el-option v-for="v in options" :key="v.id" :label="v.hospital_name" :value="v.id"></el-option>
      </el-select>
    </div>
    <div class="doctorteam">
      <span class="fontcolor">社区</span>
      <el-select :disabled="id==4?false:true" v-model="value1" placeholder="请选择社区">
        <el-option v-for="v1 in options1" :key="v1.id" :label="v1.community_name" :value="v1.id"></el-option>
      </el-select>
    </div>
    <div class="doctorteam">
      <span class="fontcolor">医生团队</span>
      <el-select v-model="value2" placeholder="请选择团队" disabled>
      </el-select>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary"  @click="eitnInfo">确 定</el-button>
      <el-button  @click="remove()" class="reset">取 消</el-button>
    </span>
  </el-dialog>
</div>
</div>

</div>

<!-- 分页 -->
<div class="all">
  <span>共&nbsp;<i>{{total}}</i>&nbsp;条</span>
  <template>
    <!-- 分页 -->
    <div class="block" id="sign_page">
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
<script>
import axios from "axios"
import blurseach from "./../../common/blurseach.vue"
import {familyDoctor} from "./../../common/util.js"
import bus from '../../bus'
export default {
  data () {
    return {
      dialogVisible: false,
      search:'',
      id:"",
      valuee:"",
       token:"",
      loginId:"",
      data3:[],   // 数据源
      total:0,    // 总页数
      value:null, //社区医院
      options: [],
      value1:null,    //社区
      options1: [],
      value2:null,    //社区医院团队
      hospitalId:null,
      data4:{
        id:'',
        username:'',
        gender:'',
        idcard:'',
        phone:'',
        address:'',
        illness:''
      },  //接种后信息的转移
      exportApi:{api:'/whjtys/excel/exportExcelSucceedUser',title:'已签约'},  //导出api
      url:familyDoctor(),
      community_id:null,
      sos:false,
      status:"该用户信息不完善，系统已通知用户需完善信息"
    }
  },
  watch:{
   
    value:function(){  // 当前社区医院下的服务社区
      let _this = this
      axios.get(this.url+"/whjtys/planning/findCommunityById/"+this.value+"?loginId="+_this.loginId+"&token="+_this.token).then(response=>{
        let date = response.data.list
        console.log(response)
        this.options1 = date
        this.value1 = date[0].id
      })
    },
    community_id:function(){
      let _this = this
      setTimeout(()=>{
       this.options1.forEach((v,i)=> {
        if(v.id == _this.community_id){
          _this.value1 = v.id
        }
      })
     },4)
    },
    value1:function(){  // 通过团队id查询到团队长姓名
      let _this = this
      _this.options1.forEach(function(v,i){
        if(_this.value1 == v.id){
          _this.hospitalId = v.doctor_group_id
        }
      })
      axios.get(_this.url + "/whjtys/planning/findDoctorLeaderName/"+_this.hospitalId+"?loginId="+_this.loginId+"&token="+_this.token).then(response=>{
        _this.value2 = response.data.doctorLeaderName
      })
    },
    $route() {
      this.$router.go(0)
    }
  },
  created(){
    this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.id=window.localStorage.getItem("id")
    this.request()
  },
  methods: {
    remove:function(){

      this.dialogVisible = false
    },
    //改变性别
    enitSex:function(sex){
      if(this.id==3||this.id==4){
       return
     }else{
       this.data4.gender = sex
     }
   },
    // 请求数据
    request:function(){
      let _this=this;
      axios.get(_this.url+"/whjtys/signed/signingManager?loginId="+_this.loginId+"&token="+_this.token)
      .then(function(response){
         console.log(response)
        _this.data3 = response.data.pagehelper.list
        _this.total = response.data.pagehelper.total
        bus.$emit('export',_this.exportApi)
        
      })
    },
     maxlength:function(){
      if(this.data4.illness.length<40){
      }else{
        this.$message("请控制字数在40以内！")
      };
      if(this.data4.address.length<40){
      }else{
        this.$message("请控制字数在40以内！")
      }
    },
    // 添加信息
    addInfo:function(item){
      let _this = this
      _this.dialogVisible = true
      _this.data4.id = item.id
      _this.data4.username = item.username
      _this.data4.gender = item.gender
      _this.data4.idcard = item.idcard
      _this.data4.phone = item.phone
      _this.data4.address = item.address
      _this.data4.illness = item.medical_history
      _this.value = item.hospitalId
      _this.community_id = null
      setTimeout(()=>{
        _this.community_id = item.community_id
      },200)
      //所有社区医院
      axios.get(_this.url + "/whjtys/planning/findAllHospital?loginId="+_this.loginId+"&token="+_this.token).then(response=>{
        _this.options = response.data.hosplist
      })
    },
    //已签约修改信息
    eitnInfo:function(){
      let s = this.data4
      let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      if(reg.test( this.data4.idcard) == false){
        this.$message("请输入正确的身份证号码！")
        return
      }
      let regg=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      let data = "id="+s.id+"&name="+ s.username + "&gender=" + s.gender + "&phone=" + s.phone
      + "&idcard="+s.idcard+"&address="+s.address+"&medical_history="+s.illness
      +"&hospital_id="+this.value+"&community_id="+this.value1+"&doctor_group_id="+this.hospitalId
      if(regg.test(this.data4.phone)&&this.data4.phone!=null){
       axios.post(this.url+"/whjtys/planning/UpdateUserTeam?"+data+"&loginId="+this.loginId+"&token="+this.token).then(response=>{
         this.$message({
                message: response.data.msg,
                type: 'success'
              });
        this.request()
         this.dialogVisible = false
      })
     }else{
      this.dialogVisible=true
      this.$message("请输入正确的手机号码");
    }




  },
    // 分页
    handleCurrentChange:function(val){
      let url = familyDoctor();
      let _this = this;
      axios.get(url+"/whjtys/signed/signingManager?pageNum="+val+"&searchKey="+_this.search+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
        _this.data3=response.data.pagehelper.list
        _this.total = response.data.pagehelper.total

      })
    },
    // 搜索
    Search:function(){
      let url = familyDoctor();
      let _this = this
      axios.get(url+"/whjtys/signed/signingManager?searchKey="+_this.search+"&loginId="+_this.loginId+"&token="+_this.token).then(function(response){
        _this.data3=response.data.pagehelper.list
        _this.total = response.data.pagehelper.total

      })
    }
  },
  computed:{
    familyDoctor
  },
  components:{
    blurseach
  },
}
</script>
<style  scoped>
.reset:hover{
  color: #49c7c4;
  border-color:#49c7c4;
}
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
  float:left;
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
  width:25%;
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
}
.user_data{
  margin-top: 10px;
}
.content_left{
  width:57%;
  height:172px;
  float:left;
  background-color:white;
}

.content_left i{
  display:block;
  float:left;
  width:12%;
  height: 172px;
  text-align:center;
  line-height:172px;
}
.content_left dl,.content_right dl{
  float:left;
  margin-top:30px;
}
.content_left dt,.content_right dt{
  color:#bbbbbb;
  font-size:14px;
}
.content_left dd{
  width: 100%;
}
.content_left dd,.content_right dd{
  padding-top:8px;
  color:#676767;
  font-size: 14px;
}
.content_left dl:first-of-type{
  width:20%;
  height:67px;
}
.content_left dl:nth-of-type(2){
  width:14%;
  height:67px;
}
.content_left dl:nth-of-type(3){
  width:35%;
  height:67px;
  margin-top: 30px;
  position: relative;
}
.content_left dl:nth-of-type(4) {
  width: 13%;
  height: 67px;
  margin-top: 30px;
  margin-left: 2%;
  position: relative;
}

.content_left dl:nth-of-type(5){
  height:67px;
  width:20%;
  margin-top: 0;
  position: relative;
}
.content_left dl:nth-of-type(6){
  height:67px;
  width:36%;
  margin-top: 0;
  position: relative;
}
.content_left dl:last-of-type{
  margin-top:0px;
  height:74px;
  margin-left: 2%;
  width:30%;
}
.content_border{
  height:130px;
  width:335px;
}
.content_right{
  position: relative;
  width:42%;
  height:172px;
  float:left;
  padding-left: 1%;
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
 height:67px;
 overflow: hidden;
 margin-top: 5px!important
}
.content_right dl:nth-of-type(2){
 width:40%;
 height:74px;
 margin-top: 2px;
 position: relative;
}
.content_right dl:last-of-type{
 width:60%;
 height:74px;
 margin-top: 2px;
}
.edit{
  position: absolute; 
  top: 0;
  right:-50px;
  width:45px;
  height:172px;
  background-color:white;
  text-align:center;
  line-height:172px;
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
.content_left dl:nth-of-type(3) dd[data-v-2ee5e83b], .content_left dl:nth-of-type(4) dd[data-v-2ee5e83b]{
  height: 21px;
  line-height: 19px;
}
.sex span{
  cursor: pointer;
}
.doctorteam {
  height: 30px;
}
.fontcolor{
  color: #989898
}
</style>