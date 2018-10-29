<template>
  <el-row class="container" >
    <!--头部-->
    <div class="header">
      <div class="nav">
        <div class="logo">
          <div class="logo_img">
            <img src="../assets/images/homepage.png" height="50" width="50">
          </div>
          <div class="company_name">
             <span style="font-size:16px;">家庭医生后台管理系统</span>
            <p>whjtys.ealipay.com</p>
          </div>
        </div>
        <div class="info">
          <div class="info_img">
            <img :src="user_img=='null'||user_img== null ? iniTimg:user_img">
          </div>
          <div class="info_name">
            {{user_name}}&nbsp;
            <span>{{user_hospital}}</span>
            <img  @click="logout" src="../assets/images/3.png" height="20" width="20">
          </div>
        </div>
      </div>
    </div>
    <!--中间-->
    <div class="page_content">
      <el-col  class="main" style="width:86%">
        <!--左侧导航--> 
        <aside :class="{showSidebar:!collapsed}">
          <!--导航菜单-->
          <el-menu :default-active="routerPath" router :collapse="collapsed" >
            <template v-for="(item,index) in $router.options.routes" ref="reference" v-if="item.menuShow.indexOf(markId)>=0" >
              <el-submenu v-if="true" :index="(index+1)+''">
                <template slot="title">
                  <img :src="item.iconCls=='null'||item.iconCls== null ? iniTimg:item.iconCls"  height="30" width="30">
                  <span slot="title" style="margin-left:20px">{{item.name}}</span>
                </template>
                <el-menu-item v-for="(term,index1) in item.children"
                :index="term.path"
                v-if="term.menuShow.indexOf(markId)>=0"
                :class="$route.path==term.path?'is-active':''"
                @click="fresh(term.path)">
                <span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </div>
  <!-- 底部 -->
  <div class="footer">
    <div>Powered by premier</div>
  </div>
</el-row>
</template>
<script>
import bus from "../bus";
import iniTimg from "../assets/images/image.png";

export default {
  name: "home",
  data() {
    return {
      iniTimg: iniTimg, //默认图片
      collapsed: false,
      markId: "666",
      user_img: "",
      user_name: "",
      user_hospital: "",
      doctorGroupId: "",
      data3: [],
      routerPath:'',
    };
  },
  created: function() {
    this.saveMark();
    this.routerPath = this.$route.path
  },
  methods: {
    saveMark() {
      this.markId = window.localStorage.getItem("id");
      this.user_name = window.localStorage.getItem("user_name");
      this.user_hospital = window.localStorage.getItem("user_hospital");
      this.user_img = window.localStorage.getItem("user_img");
      this.doctorGroupId = window.localStorage.getItem("doctorGroupId");
      if (this.markId == 3 || this.markId == 11) {
        this.user_hospital = "武昌卫计委";
      }else if(this.markId == 2 ){
        this.user_hospital = "";
      } else {
        this.user_hospital = window.localStorage.getItem("user_hospital");
      }
    },
    
    //折叠导航栏
    showMenu(i, status){
      // this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
    },
    // 注销登录
    logout() {
      var _this = this;
      this.$alert("确认退出吗?", "提示", {})
      .then(() => {
        sessionStorage.removeItem("access-user");
        _this.$router.push("/login");
      })
      .catch(() => {});
    },
    // 侧边栏刷新
    fresh: function(a) {
      let b = Math.floor(Math.random() * (100 - 1) + 1);
      this.routerPath = this.$route.path
      this.$router.push({ path: a, query: { s: b } })
    }
  }
};
</script>
<style>
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #bfcbd9!important; 
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:#bfcbd9!important;
}

input:-ms-input-placeholder{
  color: #bfcbd9!important;
}

input::-webkit-input-placeholder{
  color: #bfcbd9!important;
}

* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑"!important;
}
.font_color{
  color: #989898;
  font-size: 15px;
}
a {
  text-decoration: none;
}
i {
  font-style: normal;
}
ul,
li {
  list-style: none;
}
.el-input__inner {
  font-size: 14px!important;
}
body,
html {
  width: 100%;
  background-color: #f5f5f5;
}
html {
  overflow: scroll;
}
#app > div.warp-breadcrum.el-col.el-col-24 > div {
  font-size: 14px;
}
.el-tabs__item.is-active{
  color: #49c7c4!important;
}
.el-tabs__active-bar{
  background-color: #49c7c4!important;
}
.el-dialog__header{
  width: 85%;
  margin: auto;
  padding: 25px 0 10px 0!important;
  border-bottom: 1px solid #ccc;

}
.el-dialog__title{
  float: left;
  display: block;
  margin-bottom: 5px;
  color: #ccc!important
}
.el-dialog__headerbtn{
  display: none;
}
.header {
  width: 100%;
  height: 75px;
  background-color: #49c7c4;
  padding-top:20px;
}
.nav {
  height: 100%;
  width: 84%;
  margin: auto;
  clear: both;
  position: relative;
  background-color: #49c7c4;
}
.logo {
      margin-top: 3px;
  width: 400px;
  float: left;
}
.logo_img {
  width: 50px;
  height: 50px;
  display: inline-block;
  float: left;
}
.logo_img > img{
  display: block;
  width: 100%;
  height: 100%;
}
.company_name {
  width: 181px;
  float: left;
  font-size: 16px;
  text-align: right;
  color: white
}
.company_name > p {
  font-size: 14px;
}
.info {
  height: 100%;
  float: right;
  line-height: 60px;
}
.info_img {
  float: left;
  margin-right: 10px;
  width: 50px;
  height: 50px;
  margin-top: 5px;
}
.info_img > img {
  height: 100%;
  width: 100%;
  display: block;
  border-radius: 50%;
}
.info_name{
  display: inline-block;
  font-size: 16px;
  margin-right: 35px;
    color: white;
}
.info_name > span{
  font-size: 14px;
}
.info_name >img{
  cursor: pointer;
    height: 20px;
  width: 20px;
  right: 0;
  top: 19px;  

  position: absolute;
}
.page_content {
  width: 100%;
  margin: 0px auto;
  position: relative;
}
.el-submenu__title{
  font-size: 16px;
}
.el-menu .el-menu-item,
.el-submenu .el-submenu__title {
  height: 60px !important;
  line-height: 60px !important;
  width: 100%;
}
.el-submenu__icon-arrow {
  /*right: 10px !important;*/
  top: 55% !important;
}
/*.el-icon-arrow-down:before {
  margin-right: 15px!important;
}*/
.container aside .el-submenu .el-menu-item {
  height: 60px;
  line-height: 60px;
  width: 100%;
  padding-right: 0px;
  padding-left: 74px !important;
  background-color: #696969;
}
.el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
  background-color: #49c7c4 !important;
}
.footer {
  width: 100%;
  height: 90px;
  line-height: 90px;
  float: left;
  background-color: white;
  text-align: center;
  margin-top: 10px;
  color: #b7b7b7;  
}

#app > div:nth-child(2) > div > div.el-dialog__wrapper > div {
  height: 460px;
  width: 400px;
  margin-bottom: 0px;
  padding: 0px 30px;
  box-sizing: border-box;
}
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__header {
  height: 50px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  line-height: 50px;
}
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__header
> span {
  color: #989898;
}
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body {
 width: 100%;
 box-sizing: border-box;
 padding: 0px;
 margin: 15px 0px;
}
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(1),
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(2),
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(3) {
  height: 62px;
  margin-bottom: 19px;
}
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(1)
> div:nth-child(1),
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(2)
> div:nth-child(1),
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(3)
> div:nth-child(1),
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(4)
> div:nth-child(1) {
  height: 27px;
  text-align: left;
  color: #989898;
}
.fin_top {
  line-height: 27px;
}
#fin_select .fin_content .fin_down {
  width: 330px;
  height: 35px;
}
#fin_select .fin_content .fin_down input {
  width: 330px;
  height: 33px;
  float: left;
  padding-left: 5px;
}

#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(1)
> div.block
> div,
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(2)
> div.block
> div,
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(3)
> div.el-select,
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__body
> div:nth-child(4)
> div.el-select {
  width:100%;
}
#app
> div:nth-child(2)
> div
> div.el-dialog__wrapper
> div
> div.el-dialog__footer {
  display: inline-block;
  width: 100%;
  text-align: center;
}
#term_select .el-dialog__headerbtn {
  margin-top: 17px;
}
#term_select > div > div.el-dialog__body {
  padding: 15px 14px 20px 14px;
}
/*网格员*/
#add_grid > div {
  height: 285px;
  width: 350px;
}
#add_grid > div > div.el-dialog__body {
  width:85%;
}
#add_grid
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--primary {
  float: left;
}
#add_grid
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--default {
  float: right;
}
#add_grid > div > div.el-dialog__header > button {
  margin-top: 15px;
}
#add_grid > div > div.el-dialog__footer > div{
  width: 71%;
}
/*个人中心*/
#app > div.content > div.userpwd > div:nth-child(3) > div {
  width: 442px;
  height: 480px;
  border: none;
  padding: 0;
  overflow: visible;
  margin: auto;
}
.el-dialog__wrapper {
  overflow: visible !important;
  position: fixed;
  top: 20%;
  left: 35%;
}
#app > div.content > div.userpwd > div:nth-child(3) > div > div {
  width: 442px;
  height: 480px;
  margin: 0;
  padding: 31px 20px 79px 20px;
  top: 20%;
  left: 300px;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__header {
  height: 36px;
  width: 402px;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__header
> span {
  text-align: left;
  display: block;
  float: left;
  width: 300px;
  line-height: 15px;
  color: #ccc;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body {
  width: 330px;
  height: 257px;
  padding: 41px 36px 0px 36px;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(1) {
  height: 59px;
  width: 330px;
  padding: 0;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(1)
> div:nth-child(1),
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div:nth-child(1) {
  height: 24px;
  width: 402px;
  padding: 0;
  text-align: left;
  font-size: 15px;
  color: #ccc;
  line-height: 24px;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(1)
> div.block {
  height: 33px;
  width: 328px;
  padding: 0;
  margin: 0;
  border: none;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(1)
> div.block
> input[type="text"],
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div.block
> input[type="password"] {
  height: 33px;
  width: 323px;
  border: none;
  padding-left: 5px;
  border: 1px solid #ccc;
}

#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(2) {
  height: 114px;
  width: 330px;
  padding: 0;
  border: none;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div.block {
  padding: 0;
  margin-top: 0;
  width: 330px;
  border: none;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div:nth-child(3) {
  margin-top: 19px;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--default {
  float: left;
  margin-left: 20px;
}
#app
> div.content
> div.userpwd
> div:nth-child(3)
> div
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--primary {
  float: right;
  margin-right: 18px;
}
/*计勉*/
/*#app > div:nth-child(2) > div > div.inoc > span.vaccine_com > div > div {
  padding: 20px 20px 10px 20px;
}*/
#app > div:nth-child(2) > div > div.inoc > span.vaccine_com > div > div {
  margin-bottom: 0;
  width: 400px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__header {
  border-bottom: 1px solid #ccc;
  padding: 0;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__header
> button {
  margin-top: 17px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body {
  width: 319px;
  height: 220px;
  padding: 20px 36px 10px 40px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(1) {
  height: 61px;
  margin-bottom: 21px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(1)
> span {
  display: block;
  float: left;
  height: 26px;
  width: 190px;
  font-size: 14px;
  line-height: 26px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(1)
> input[type="text"] {
  height: 33px;
  width: 310px;
  border: 1px solid #ccc;
  float: left;
  outline: none;
  font-size: 14px;
  padding-left: 10px;
  /*border-radius: 6px;*/
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(2) {
  width: 330px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> span,
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(3)
> span {
  height: 26px;
  width: 330px;
  display: block;
  line-height: 26px;
  float: left;
  font-size: 14px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div
> div.el-select__tags {
  transform: translateY(0);
  top: 3px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div
> div.el-input {
  display: inline-block;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div
> div.el-input
> input {
  width: 320px;
  max-height: 120px;
  float: left;
  padding-left: 10px;
  /*border-radius: 6px !important;*/
  border-color: #ccc;
  overflow: hidden;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div
> div.el-input
> i {
  top: 50%;
  right: 10px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(3) {
  height: 61px;
  width: 330px;
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__body
> div:nth-child(3)
> input[type="text"] {
  height: 33px;
  width: 310px;
  border: 1px solid #ccc;
  float: left;
  font-size: 14px;
  outline: none;
  padding-left: 10px;
  /*border-radius: 6px;*/
}
#app
> div:nth-child(2)
> div
> div.inoc
> span.vaccine_com
> div
> div
> div.el-dialog__footer {
  padding-left: 47px;
  padding-right: 46px;
  text-align: center;
}
.vaccine_option {
  height: 35px !important;
  display: block;
}
/*date*/
#app > div:nth-child(2) > div > div.block > div {
  z-index: 10000;
}
#app > div:nth-child(2) > div > div.block > div > input {
  width: 340px;
}
/*团队成员编辑*/
#app > div.contain > div > ul:nth-child(4) > li:nth-child(4) > div > div {
  height: 846px;
  width: 442px;
  padding: 31px 20px 54px 20px;
}
#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__header {
  width: 402px;
  height: 41px;
  padding: 0;
  position: relative;
}

#team_people .set_people {
  height: 35px !important;
  border: none;
  width: 220px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
#team_people .el-select {
  height: 35px !important;
  width: 230px;
  box-sizing: border-box;
}
#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__header
> span {
  display: block;
  width: 400px;
  height: 40px;
  float: left;
  line-height: 40px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__header
> button {
  position: absolute;
  top: 10px;
  right: 0;
}
#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__body {
  padding: 0;
  height: 227px;
  padding-top: 57px;
}
#team_people > div > div.el-dialog__body p {
  text-align: center;
  width: 35px;
  float: left;
  text-align: left;
  line-height: 35px;
}
#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__body
> div
> div:nth-child(2) {
  margin-top: 6px;
}
#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__body
> div
> div:nth-child(2)
> span {
  display: block;
  height: 24px;
  width: 74px;
  color: white;
  background-color: #49c7c4;
  line-height: 24px;
  margin: auto;
  border-radius: 5px;
}
#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__body
> div
> div:nth-child(3)
> span {
  display: block;
  height: 24px;
}

#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__body
> div:nth-child(2)
.set_infor {
  height: 25px;
  line-height: 25px;
  display: block;
  text-align: left;
  font-size: 16px;
}
#app
> div.contain
> div
> ul:nth-child(4)
> li:nth-child(4)
> div
> div
> div.el-dialog__body
> div:nth-child(2)
> div:nth-child(2)
> div {
  width: 330px;
}
.el-button--primary{
  background-color: #49c7c4!important;
  border-color: #49c7c4!important;
}
#set_informatin {
  padding: 0;
  width: 200px;
  display: block;
  margin: auto;
}
#set_informatin > button.el-button.el-button--primary {
  float: left;
}
#set_informatin > button.el-button.el-button--default {
  border: 1px solid #ccc;
}
/*修改个人信息*/
#app #information {
  margin-top: 0;
  width: 350px;
  top: -200px;
  position: absolute;
  left: 400px;
  padding: 31px 20px 54px 20px;
  text-align: center;
}
#app #information > .el-dialog--tiny {
  width: 100%;
}
#app #information > div > div.el-dialog__header {
  width: 100%;
  padding: 0;
  padding: 0 20px;
  box-sizing: border-box;
}
#information > div > div.el-dialog__header > span {
  display: block;
  line-height: 60px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  padding-left: 15px;
}
#information > div > div.el-dialog__header > button {
  display: none;
}
#app #information > div > div.el-dialog__body {
  padding: 0;
  padding-top: 20px;
}
#app #information > div > div.el-dialog__body > div > div:nth-child(2) {
  margin-top: 6px;
}
#app #information > div > div.el-dialog__body > div > div:nth-child(2) > span {
  display: block;
  height: 24px;
  width: 74px;
  color: white;
  background-color: #49c7c4;
  line-height: 24px;
  margin: auto;
  border-radius: 5px;
}
#app #information > div > div.el-dialog__body > div > div:nth-child(3) > span {
  display: block;
  height: 24px;
}
#app #information > div > div.el-dialog__body > div:nth-child(2) .set_people {
  border: none;
  width: 330px;
  height: 33px;
  border: 1px solid #ccc;
}
#app #information > div > div.el-dialog__body > div:nth-child(2) .set_infor {
  height: 25px;
  line-height: 25px;
  display: block;
  text-align: left;
  font-size: 16px;
}
#information
> div
> div.el-dialog__body
> div:nth-child(2)
> div:nth-child(2)
> div {
  width: 330px;
}
#information
> div
> div.el-dialog__body
> div:nth-child(2)
> div:nth-child(2)
> div {
  width: 330px;
}
#app #information .el-dialog__footer {
  padding: 0;
  text-align: center;
  margin: 20px 0;
}
/*分页*/
.block {
  width: 100%;
  height: 35px;
  float: left;
  /*margin-top: 10px;*/
}
.block .el-pagination {
  padding: 0;
  height: 55px;
  margin: auto;
  margin-bottom: 20px;
}
.all{
  margin-bottom: 10px;
}
.block .el-pagination .el-pager li {
  height: 35px;
  width: 35px;
  padding: 0;
  line-height: 35px;
}
.el-pagination .btn-prev,
.el-pagination .btn-next {
  height: 35px;
  width: 35px;
}

/*老年人*/
#tick > div {
  width: 350px;
}
body > div.el-picker-panel.el-date-picker.has-time {
  min-width: 254px;
  left: 522px;
}
#set_time > input {
  height: 27px;
  line-height: 27px;
}
#tick > div > div.el-dialog__footer {
  margin-top: -20px;
  padding: 25px 87px 15px;
}

/*注销登录*/
body .el-message-box__wrapper .el-message-box {
  height: 171px;
}
/*确认签约信息*/
#sure_info > div {
  height: 570px;
  width: 402px;
  margin-bottom: 0;
  /*padding:0px 15px 5px 15px;*/
  top: 5% !important;
  font-size: 12px;
}
#sure_info > div > div.el-dialog__header {
  height: 36px;
  width: 402px;
  border-bottom: 1px solid #ccc;
  padding: 0;
  display: none;
}
#sure_info > div > div.el-dialog__header > span {
  height: 36px;
  display: block;
  text-align: left;
  width: 360px;
  float: left;
  line-height: 25px !important;
}
#sure_info > div > div.el-dialog__body {
  width: 333px;
  padding: 12px 36px 10px 36px;
  line-height: 0;
}
#sure_info > div > div.el-dialog__footer {
  width: 402px;
  height: 35px;
  padding: 0 95px 0 95px;
  line-height: 0;
}
#sure_info > div > div.el-dialog__body > .patient_info {
  width: 330px;
  height: 55px;
  margin-bottom: 5px;
}
#sure_info > div > div.el-dialog__body > .patient_info > div:nth-child(1) {
  width: 161px;
  height: 51px;
  float: left;
}
#sure_info > div > div.el-dialog__body > .patient_info > div:nth-child(1) span,
#sure_info
> div
> div.el-dialog__body
> .patient_info
> .sex
span:first-of-type {
  display: block;
  width: 160px;
  height: 25px;
  line-height: 25px;
  text-align: left;
}
#sure_info
> div
> div.el-dialog__body
> .patient_info
> div:nth-child(1)
input {
  width: 153px;
  height: 25px;
  outline: none;
  border: 1px solid #bfcbd9;
  padding-left: 5px;
  font-size: 14px;
}
#sure_info > div > div.el-dialog__body > .patient_info > .sex {
  margin-left: 8px;
  width: 161px;
  height: 51px;
  float: left;
}
#sure_info .sex span:nth-of-type(2),
#sure_info
> div
> div.el-dialog__body
> .patient_info
> .sex
span:nth-of-type(3) {
  display: block;
  width: 80px;
  height: 27px;
  float: left;
  line-height: 27px;
  color: white;
}
.man_color {
  background-color: #49c7c4;
  width: 80px;
  height: 35px;
}
.women_color {
  background-color: #ccc;
  width: 80px;
  height: 35px;
}
#sure_info
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--primary {
  float: left;
}
#sure_info > div > div.el-dialog__body .idcard,
#sure_info > div > div.el-dialog__body .phone,
#sure_info > div > div.el-dialog__body .adress,
#sure_info > div > div.el-dialog__body .doctorteam,
#sure_info > div > div.el-dialog__body .illness {
  font-size: 14px;
  width: 330px;
}
#sure_info > div > div.el-dialog__body .com_hospital {
  height: 61px;
  width: 330px;
}
#sure_info > div > div.el-dialog__body .idcard span,
#sure_info > div > div.el-dialog__body .phone span,
#sure_info > div > div.el-dialog__body .adress span,
#sure_info > div > div.el-dialog__body .doctorteam span,
#sure_info > div > div.el-dialog__body .illness span,
#sure_info > div > div.el-dialog__body .com_hospital span {
  display: block;
  width: 330px;
  height: 26px;
  line-height: 26px;
  text-align: left;
}
#sure_info > div > div.el-dialog__body .adress,
#sure_info > div > div.el-dialog__body .illness {
  margin-bottom: 5px;
}
#sure_info > div > div.el-dialog__body .idcard input,
#sure_info > div > div.el-dialog__body .phone input,
#sure_info > div > div.el-dialog__body .doctorteam input,
#sure_info > div > div.el-dialog__body .com_hospital input {
  height: 24px;
  width: 332px;
  border: 1px solid #bfcbd9;
  outline: none;
  padding-left: 5px;
  font-size: 14px!important
}
#sure_info > div > div.el-dialog__body > div.idcard > input[type="text"],
#sure_info > div > div.el-dialog__body > div.phone > input[type="text"] {
  width: 322px;
}
.el-input__inner {
  border-radius: 0 !important;
  border-color: #bfcbd9;
}
.el-input{
  width: 99%;
}
#team_people > div > div.el-dialog__body > div:nth-child(2) > div:nth-child(2) > div > div.el-input > input{
  border-radius: 4px!important;
  border-color: #ccc ;
  width: 240px;
}
#team_people > div > div.el-dialog__body > div:nth-child(2) > div:nth-child(2) > div{
  width: 240px!important;
}
#options > input{
  border-radius: 5px !important;
  height: 33px;
}
#sure_info > div > div.el-dialog__body > div {
  margin-bottom: 5px;
}
#sure_info > div > div.el-dialog__body .doctorteam {
  margin-bottom: 5px;
  height: 50px;
}
#sure_info > div > div.el-dialog__body .adress textarea {
  width: 318px;
  height: 35px;
  resize: none;
  padding:5px;
  font-size: 14px;
  border:1px solid #bfcbd9;
}
#sure_info > div > div.el-dialog__body .illness textarea {
  height: 35px;
  padding: 5px;
  width: 318px;
  resize: none;
  font-size: 14px;
  border:1px solid #bfcbd9;
}
/*上传*/
#upload > div {
    width: 358px;
    height: 360px;
    padding: 0px 20px 0px 20px;
    margin: 0;
}
#upload > div > div.el-dialog__header {
  padding: 0;
  width: 100%;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
#upload > div > div.el-dialog__header > span{
  color: #979797;

}
#upload > div > div.el-dialog__body {
  width: 100%;
  padding: 20px 0 0 0;
}
#upload > div > div.el-dialog__body > .up_img {
  width: 220px;
  height: 190px;
  margin: auto;
  text-align: center;
  position: relative;
}
#upload > div > div.el-dialog__body > .up_img > img {
  width: 220px;
  height: 200px;
  display: block;
  border: 1px solid #49c7c4;
  margin-bottom: 10px;
}
#upload > div > div.el-dialog__body > .up_text {
  width: 250px;
  margin: auto;
  margin-top: 20px;
  height: 20px;
}
#upload > div > div.el-dialog__body > .up_text > span {
  text-align: center;
  display: block;
  line-height: 20px;
}
#upload > div > div.el-dialog__footer{
  padding: 10px 80px 15px 0;
}
/*选项卡*/
#nav_tab .el-tabs__header,
#nav_tab .el-tabs__header > div,
#nav_tab > div.el-tabs__header > div > div.el-tabs__nav-scroll,
#nav_tab > div.el-tabs__header > div > div.el-tabs__nav-scroll > div {
  height: 59px;
  margin: 0;
  width: 100%;
  padding: 0;
  margin-bottom: 10px;
  border: none;
}
#nav_tab .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item {
  height: 60px;
  width: 25%;
  text-align: center;
  line-height:60px;
  font-size: 16px;
}
#nav_tab > div.el-tabs__content{
  margin-top: 10px;
}
/*数据里面的切换*/
#app > div.toggle > div > div.el-tabs__header > div,
#app > div.toggle > div > div.el-tabs__header > div > div.el-tabs__nav-scroll,
#app
> div.toggle
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div {
  height: 60px;
}
#app
> div.toggle
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div {
  width: 100%;
}
#app
> div.toggle
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div
> div.el-tabs__item {
  width: 33.3%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: white;
  font-size: 15px;
}
.el-tabs__nav-wrap.is-scrollable {
  padding: 0;
}
/* 个人账户样式 */
#app
> div
> div
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div {
  width: 100%;
}
#app
> div
> div
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div
> div:nth-child(2),
#app
> div
> div
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div
> div:nth-child(3) {
  width: 50%;
  height: 60px;
  font-size: 17px;
  text-align: center;
  line-height: 60px;
}
#top_tab
> div
> div
> div.el-tabs__content
> div:nth-child(2)
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div {
  width: 100%;
}
#top_tab
> div
> div
> div.el-tabs__content
> div:nth-child(2)
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div
> div.el-tabs__item {
  width: 20%;
  text-align: center;
  background-color: #fff;
}
#top_tab
> div
> div
> div.el-tabs__content
> div:nth-child(2)
> div
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll {
  height: 40px;
}
#top_tab > div > div > div.el-tabs__content > div:nth-child(2) {
  height: 815px;
}
#top_tab
> div
> div
> div.el-tabs__content
> div:nth-child(2)
> div
> div.el-tabs__content {
  height: 720px;
  padding-top: 10px;
  background: #fff;
}
#app
#tab_tab
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div
> div.el-tabs__item {
  width: 50%;
}
.el-tabs__content {
  overflow: visible !important;
}
#wjw .el-tabs__item {
  width: 50% !important;
}
/*社区医院*/
#nav_hospital
> div
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div {
  height: 80px;
  background-color: white;
}
#nav_hospital > div > div.el-tabs__header > div > .el-tabs__nav-scroll > div {
  width: 100%;
}
#nav_hospital > div > div.el-tabs__header > div {
  padding: 0;
}
#nav_hospital
> div
> div.el-tabs__header
> div
> .el-tabs__nav-scroll
> div
> .el-tabs__item {
  height: 80px;
  line-height: 80px;
  width: 50%;
  text-align: center;
  font-size: 16px;
}
/*社区医院*/

#nav_hospital #service_date {
  width: 137px;
}
#nav_hospital
> div
> div.el-tabs__content
> div:nth-child(2)
> div
> ul
> li:nth-child(2)
> div:nth-child(3)
> div:nth-child(1),
#nav_hospital
> div
> div.el-tabs__content
> div:nth-child(2)
> div
> ul
> li:nth-child(2)
> div:nth-child(3)
> div:nth-child(2),
#nav_hospital
> div
> div.el-tabs__content
> div:nth-child(2)
> div
> ul
> li:nth-child(3)
> div:nth-child(3)
> div:nth-child(1),
#nav_hospital
> div
> div.el-tabs__content
> div:nth-child(2)
> div
> ul
> li:nth-child(3)
> div:nth-child(3)
> div:nth-child(2) {
  width: 40%;
  height: 40px;
}
#nav_hospital > div,
#nav_hospital > div > div.el-tabs__content {
  height: 100%;
}
#people_dialog > div {
  position: fixed;
  height: 230px;
  width: 480px;
  padding: 0 20px 0 20px;
}
#people_dialog > div > div.el-dialog__header {
  display: none;
}
#people_dialog > div > div.el-dialog__body {
  padding: 0;
}
#selecting > div {
  margin-top: 30px;
}
#people_dialog > div > div.el-dialog__footer {
  width: 340px;
}
#people_dialog
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--primary {
  float: left;
  margin-left: 100px;
}
#people_dialog
> div
> div.el-dialog__footer
> span
> button.el-button.el-button--default {
  float: right;
}
/*团队详情*/
#team_people > div > div.el-dialog__header > span{
  display: block;
  float: left;
  color: #ccc;
  font-size: 16px;
}
#team_people > div > div.el-dialog__header > button > i{
  font-size: 15px;
}
#team_people > div > div.el-dialog__header{
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  width: 85%;
  margin: auto;
  padding: 20px 0px 0 0;
}
#team_tab > div.el-tabs__header,
#team_tab > div.el-tabs__header > div > div.el-tabs__nav-scroll > div {
  height: 80px;
  width: 100%;
}

#team_tab
> div.el-tabs__header
> div
> div.el-tabs__nav-scroll
> div
> .el-tabs__item {
  height: 80px;
  width: 33.33%;
  line-height: 80px;
  text-align: center;
  background-color: white;
  font-size: 16px;
}
#set_informatin > button.el-button.el-button--default{
  float: right
}
#team_people > div > div.el-dialog__body{
  padding: 30px 26px;
}
#team_people .set_people{
  width: 230px;
}
/*  宫颈癌样式 */
#gongjing {
  width: 160px;
  margin-left: 18px;
}
#ertong {
  width: 160px;
  margin: 24px 0 0 39px;
}
/* 上传体检报告 */
#upload > div > div.el-dialog__body > div > div:nth-child(1) > div,
#upload > div > div.el-dialog__body > div > div:nth-child(1) > ul {
  position: absolute;
  top: 20px;
  left: 40px;
}
#upload > div > div.el-dialog__body > div > div:nth-child(1) > ul {
  z-index: 2;
}
#make > div > div.el-input > input {
  width: 160px;
}
#optionss,
#options {
  width: 210px;
}
#team_people > div {
  top: 3% !important;
  width: 340px;
}
.el-checkbox__input.is-checked .el-checkbox__inner{
  background-color: #49c7c4!important;
}
.el-pager li.active{
  background-color:#49c7c4!important;
  color: white;
  border-color: #49c7c4!important;
}
.el-pager li{
  background-color:#545454!important;
  color: white;
  margin-left: 5px!important;
  margin-right: 5px!important;
}
.el-pager li:hover{
  color: white!important
}
.btn-prev{
  margin-right: 5px!important;
  color: white!important;
  background-color:#545454!important;
}
.btn-next{
  margin-left: 5px!important;
  color: white!important;
  background-color:#545454!important;
}
.el-menu-item:hover,
.el-submenu .el-menu-item:hover,
.el-submenu__title:hover {
  background-color: #49c7c4!important;
}
#add_grid > div > div.el-dialog__body{
  padding: 10px 28px 0 28px;
}

#tick > div > div.el-dialog__body{
  padding: 20px 20px
}

.el-icon-warning:before{
  font-size: 18px;
}
.el-message-box__status.el-icon-warning{
  float: left;
  margin-right: 5px;
  margin-top: 10px;
    position: static!important;
  top: 0;
  transform: translateY(0);
  font-size: 16px!important;
}
body > div.el-message-box__wrapper > div > div.el-message-box__content > div.el-message-box__message{
  margin-left: 0px!important;
  float: left;
  margin-top: 10px;
}
.el-message__group{
  text-align: center!important
}

#top_tab > div > div > div.el-tabs__content > div:nth-child(2) > div:nth-child(1) > div.el-tabs__content > div:nth-child(1) > div > div.content_cent > div:nth-child(2) > div > div.el-input > input{
  height: 32px!important
}
body > div.el-message-box__wrapper > div > div.el-message-box__btns{
  padding: 30px 20px 15px 15px;
}
body > div.el-message-box__wrapper > div > div.el-message-box__content{
  padding: 15px 20px
}
body > div.el-message-box__wrapper > div > div.el-message-box__header > div{
  border-bottom: 1px solid #ccc;
  height: 30px;
}
/*通知函*/
#notice > div{
  width:30%;
  height: 290px;
}
#notice > div > div.el-dialog__header > span{
  width: 100%;
  text-align: center;
}
#notice > div > div.el-dialog__body{
  padding: 10px 30px 15px 30px;
  font-size: 16px;
  font-family: "微软雅黑";
  text-align: justify;
}
#notice > div > div.el-dialog__footer{
  text-align: center;
}
#notice > div > div.el-dialog__footer{
  padding:0 
}
</style>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;
  }
  .main {
    width: 85%;
    margin-left: 8%;
    margin-top: 50px;
  }

  aside {
    float: left;
    width: 18%;
    &::-webkit-scrollbar {
      display: none;
    }
    .showSidebar {
      width: 10%;
    }
    .el-menu {
      height: 100%; /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px);
      height: -webkit-calc(100% - 80px);
      height: calc(100% - 80px);
      border-radius: 0px;
      background-color: #535353;
    }
    .el-submenu .el-menu-item {
      min-width: 100%;
    }
    .el-menu {
      width: 100%;
      float: left;
    }
    .el-menu--collapse {
      min-width: 100%;
    }
    .el-menu-item:hover,
    .el-submenu .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: #49c7c4!important;
    }
  }
  .content-container {
    float: left;
    width: 79%;
    margin-left: 10px;
  }
}
</style>
