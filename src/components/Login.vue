<template>
<div class="log">
   <div class="homepage">
        <div style="border:1px solid #49c7c4;border-radius:10px;"><img src="../assets/images/homepage.png" height="50" width="50"></div>
        <div>家庭医生后台管理系统<p>whjtys.ealipay.com</p></div>
      </ul>
  </div>
  <div class="log_img">
     <img src="../assets/images/首页.png">
    <div class="into">
      <div>
        <input type="text" id = "username" v-model="username" auto-complete="off" placeholder="账号"Z>
        <input type="password" id="keydown" placeholder="密码" v-model="pwd" @keyup="show($event)">
      </div>
      <div >
        <el-checkbox class="fl">记住密码</el-checkbox>
        <el-checkbox class="fr" >自动登录</el-checkbox>
      </div>
        <el-button type="primary" class="remember" style="width:100%;background-color:#49c7c4;margin-top:20px"
         @click="handleLogin();dialogVisible=false" :loading="logining" >登&nbsp;&nbsp;录</el-button>
    </div>
  </div>
 <!--弹框限制  -->
 <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
<!--   <el-dialog
  id="notice"
  :title="c"
  :visible.sync="dialogVisible"
  width="30%">
      <div v-show="activee"><p style="font-size:15px;">
<i style="color:black">{{falg}}:</i></br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贵单位是支付宝重要合作伙伴,与我方合作支付宝家庭医生签约项目。其中,贵单位该项目产生了费用,费用截止日期2017年12月31日。因我司系统上线集团业务欠费强制关停功能,为了不影响贵单位正常使用该业务,现特请贵单位于2018年2月28日前缴清以上费用,避免欠费影响贵单位业务运营,感谢您的支持与配合。联系电话：027-88859766。</p></div>
  <div v-show="active"><p>
     <br>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于支付宝系统升级,自2018年3月1日起,还未开通支付宝线下支付的中心将无法继续使用支付宝家庭医生签约平台。现有后台系统将于2月28日关闭,为不影响正常使用,请贵中心尽快开通支付宝线下支付,感谢您的支持与配合。联系电话：027-88859766。</p>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="tip()" >我已知晓</el-button>
  </span>
</el-dialog> -->

<div class="foot">Powered by premier</div>
</div>
</template>
<script>
import axios from "axios";
import { familyDoctor } from "../common/util.js";
export default {
  data() {
    return {
      logining: false,
      checked: true,
      username: "",
      dialogVisible: false,
      pwd: "",
      falg: "",
      active:false,
      activee:true,
      a:true,
      b:"",
      c:"",
      // 未缴费
      // arrears:
      // ["珞珈山街武汉大学卫生服务中心","积玉桥街社区卫生服务中心","珞珈山街社区卫生服务中心","中南路街第二社区卫生服务中心","武汉理工大社区卫生服务中心","粮道街社区卫生服务中心","湖北大学社区卫生服务站","水果湖街省直社区卫生服务中心","白沙洲街社区卫生服务中心","紫阳街社区卫生服务中心","徐家棚武车社区卫生服务站","水岸星城社区卫生服务站","石洞街社区卫生服务中心","中南财经政法大学社区卫生服务站"],
      // // 未接poss机
      // poss:[
      //   "南湖街社区卫生服务中心","杨园街第二街社区卫生服务中心","黄鹤楼街社区卫生服务中心","杨园街第一社区卫生服务中心","中华路街社区卫生服务中心"
      // ]
    };
  },
  methods: {
    show: function(ev) {
      if (ev.keyCode == 13) {
        this.handleLogin();
      }
    },
    handleLogin(){
          let url = familyDoctor();
          let _this=this
          axios.post(url + "/whjtys/logins?account=" +this.username +"&pwd=" + this.pwd,
            {
              account: this.username,
              pwd: this.pwd
            }
          ).then(function(response){
              if(response.data.mess){
                _this.$message(response.data.mess);
                   return 
              }
              _this.falg=response.data.hospitalName
              window.localStorage.setItem("id", response.data.roleId);
                window.localStorage.setItem("doctorGroupId",response.data.user.doctorGroupId);
                window.localStorage.setItem("user_name",response.data.user.name);
                window.localStorage.setItem("user_hospital",response.data.hospitalName);
                window.sessionStorage.setItem("user", response.config.data);
                window.localStorage.setItem("user_img",response.data.user.user_img);
                window.localStorage.setItem("userID", response.data.user.id);
                window.localStorage.setItem("user_phone",response.data.user.phone);
                window.localStorage.setItem("hospitalId",response.data.user.hospitalId);
                window.sessionStorage.setItem("account",response.data.user.account);
                 window.localStorage.setItem("token",response.data.token);
                window.localStorage.setItem("loginId",response.data.loginId);
                var result = JSON.parse(sessionStorage.getItem("user"));
                let roleId = response.data.roleId;
                 _this.b=response.data.roleId
                   // for(var j = 0,len=_this.arrears.length; j < len; j++) {
                   //        if( response.data.hospitalName==_this.arrears[j]){
                   //              _this.dialogVisible=true
                   //              _this.active=false
                   //              _this.activee=true
                   //              _this.a=false
                   //              _this.c="温馨提示"
                   //              break
                   //        }
                   //  } 
                   // for(var i = 0,c=_this.poss.length; i < c; i++) {
                   //        if(response.data.hospitalName==_this.poss[i]){
                   //              _this.dialogVisible=true
                   //              _this.active=true
                   //              _this.activee=false
                   //              _this.a=false
                   //              _this.c="通知函"
                   //              break;
                   //        } 
                   //  }                
                if(_this.a){
                    switch (roleId) {
                  case 1:
                    _this.$router.push("sign/list1/");
                    break;
                  case 2:
                    _this.$router.push("report/list1/");
                    break;
                  case 3:
                    _this.$router.push("sign/list1/");
                    break;
                  case 4:
                    _this.$router.push("hospital/captain");
                    break;
                  case 5:
                    _this.$router.push("sign/list1/");
                    break;
                  case 6:
                    _this.$router.push("oldman/list1/");
                    break;
                  case 7:
                    _this.$router.push("vaccine/list1/");
                    break;
                  case 9:
                    _this.$router.push("finance/list/");
                    break;
                  case 10:
                    _this.$router.push("finance/list2/");
                    break;
                  case 11:
                    _this.$router.push("finance/list/");
                    break;
                     case 12:
                    _this.$router.push("sign/list1/");
                    break;
                     case 99:
                    _this.$router.push("finance/list2/");
                    break;
                }
                  }
         })
     },
     tip(){
      this.dialogVisible=false
      switch (this.b) {
                  case 1:
                    this.$router.push("sign/list1/");
                    break;
                  case 3:
                    this.$router.push("sign/list1/");
                    break;
                  case 4:
                    this.$router.push("hospital/captain");
                    break;
                  case 5:
                    this.$router.push("sign/list1/");
                    break;
                  case 6:
                    this.$router.push("oldman/list1/");
                    break;
                  case 7:
                    this.$router.push("vaccine/list1/");
                    break;
                  case 9:
                    this.$router.push("finance/list/");
                    break;
                  case 10:
                    this.$router.push("finance/list2/");
                    break;
                  case 11:
                    this.$router.push("finance/list/");
                    break;
                     case 12:
                    _this.$router.push("sign/list1/");
                    break;
                     case 99:
                    _this.$router.push("finance/list2/");
                    break;
                }
         
     }
  },
  computed: {
    familyDoctor
  }
};
</script>
<style >
body,
html {
  width: 100%;
  height: 100%;
}
#keydown,
#username {
  height: 30px;
  width: 100%;
  padding-left: 9px;
  border: none;
  border: 1px solid #c0b7b4;
  box-sizing: border-box;
  margin-bottom: 14px;
}
#keydown{
  margin-bottom: 11px;
}
.log {
  width: 100%;
  height: 100%;
}
.homepage {
  width: 100%;
  height: 70px;
  color: #7d7d7d;
  font-size: 16px;
  background-color: white;
  padding-left: 200px;
  box-sizing: border-box;
  font-weight: 600;
  padding-top: 15px;
}
.homepage >div{
  display: inline-block;
  height: 40px;
  text-align: right;
}
.homepage >div > p{
  font-weight: 100;
  font-size: 14px;
}
.homepage >div:first-of-type{
  width: 40px;
  vertical-align: bottom;
  margin-right: 10px;
}
.homepage > div > img{
  width: 100%;
  height: 100%;
  display: block;
}
.log_img {
  width:100%;
  height:calc(100% - 126px) ;
  position: relative;
}
.log_img > img {
  height: 100%;
  width: 100%;
  display: block;
}
.into {
  width: 318px;
  height: 254px;
  position: absolute;
  top: 50%;
  margin-top: -129px;
  right: 200px;
  background-color: rgba(255, 255, 255, 0.76);
  padding:65px 45px 0;
  text-align: center;
  box-sizing: border-box;
}
.into  > div{
  width: 100%;
}
.foot {
  padding: 20px 0 ;
  background-color: white;
  text-align: center;
  font-size: 12px;
  color: #7d7d7d;
}

#app > div > div.log_img > div > div:nth-child(2) > label.el-checkbox.fl > span.el-checkbox__label,
#app > div > div.log_img > div > div:nth-child(2) > label.el-checkbox.fr > span.el-checkbox__label{
  color: #7d7d7d;
  font-size: 12px;
}
 .remember {
    border-color: #49c7c4!important;
    font-weight: 600;
  }
</style>
