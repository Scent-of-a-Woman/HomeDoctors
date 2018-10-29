
<template>
  <div id="app">
    <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
      <el-breadcrumb separator="/" style="line-height:50px">
        <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">数据统计</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">总览</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <!-- 顶部 -->
    <div class="total_nav">
      <div>
        总预约<i style="font-style: normal;">{{data3.allSigingOrderCount}}</i>  
      </div>
      <div>
        总提交<i style="font-style: normal;">{{data3.allSigningCount}}</i>
      </div>
      <div>
        总签约成功数<i style="font-style: normal;">{{data3.allSigningSuccessCount}}</i>
      </div>
    </div>
    <!-- 切换 -->
    <div class="toggle">
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="今天" name="first">
            <div class="toggle_data">
              <ul>
                <li>
                  <div class="data_img">
                    <img src="../../assets/images/总计签约.png">
                    <span>签约<br>{{data3.signingSuccessToday}}</span>
                  </div>
                  
                </li>
                <li>
                  <div class="data_img">
                    <img src="../../assets/images/总计驳回.png" >
                    <span>驳回 <br> {{data3.signingRebutToday}} </span>
                    <span></span>
                  </div>
                </li>
                <li>
                  <div class="data_img">
                    <img src="../../assets/images/总计计勉.png" height="82" width="82">
                  </div>
                  <div>儿童疫苗预约</div>
                  <div>{{data3.childVaccineToday}}</div>
                </li>
                <li>
                 <div class="data_img">
                   <img src="../../assets/images/总计宫颈癌.png">
                 </div>
                 <div>宫颈癌疫苗预约</div>
                 <div>{{data3.gjaVaccineToday}}</div>
               </li>
               <li>
                <div class="data_img">
                  <img src="../../assets/images/总计体检.png">
                </div>
                <div>体检预约</div>
                <div>{{data3.peToday}}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="昨天" name="second">
         <div class="toggle_data">
          <ul>
            <li>
                <div class="data_img">
                  <img src="../../assets/images/总计签约.png">
                  <span>签约<br>{{data3.signingSuccessYesterday}}</span>
                </div>
                
              </li>
              <li>
                <div class="data_img">
                  <img src="../../assets/images/总计驳回.png" >
                  <span>驳回 <br> {{data3.signingRebutYesterDay}} </span>
                  <span></span>
                </div>
              </li>
            <li>
              <div class="data_img">
                <img src="../../assets/images/总计计勉.png" height="82" width="82">
              </div>
              <div>儿童疫苗预约</div>
              <div>{{data3.childVaccineYesterday}}</div>
            </li>
            <li>
             <div class="data_img">
               <img src="../../assets/images/总计宫颈癌.png">
             </div>
             <div>宫颈癌疫苗预约</div>
             <div>{{data3.gjaVaccineYesterday}}</div>
           </li>
           <li>
            <div class="data_img">
              <img src="../../assets/images/总计体检.png">
            </div>
            <div>体检预约</div>
            <div>{{data3.peYesterday}}</div>
          </li>
        </ul>
      </div>
    </el-tab-pane>
    <el-tab-pane label="近30天" name="third">
      <div class="toggle_data">
        <ul>
            <li>
              <div class="data_img">
                <img src="../../assets/images/总计签约.png">
                <span>签约<br>{{data3.sigingSuccessThirty}}</span>
              </div>
              
            </li>
            <li>
              <div class="data_img">
                <img src="../../assets/images/总计驳回.png" >
                <span>驳回 <br> {{data3.signingRebutThirty}} </span>
                <span></span>
              </div>
            </li>
                
          <li>
            <div class="data_img data_img1">
              <img src="../../assets/images/总计计勉.png" height="82" width="82">
            </div>
            <div>儿童疫苗预约</div>
            <div>{{data3.childVaccineThirty}}</div>
          </li>
          <li>
           <div class="data_img">
             <img src="../../assets/images/总计宫颈癌.png">
           </div>
           <div>宫颈癌疫苗预约</div>
           <div>{{data3.gjaVaccineThirty}}</div>
         </li>
         <li>
          <div class="data_img">
            <img src="../../assets/images/总计体检.png">
          </div>
          <div>体检预约</div>
          <div>{{data3.peThirty}}</div>
        </li>
      </ul>
    </div>
  </el-tab-pane>
</el-tabs>
</template>
</div>
</div>
</template>
<script>
import axios from "axios"
import {familyDoctor} from "./../../common/util.js"
export default {
  data(){
    return{
      activeName:'first',
      data3:{},
       token:"",
      loginId:"",
    }
  },
  watch: {
    $route() {
      this.$router.go(0)
    }
  },
  created:function(){
     this.token = window.localStorage.getItem("token");
      this.loginId = window.localStorage.getItem("loginId");
    this.requestData()
  },
  methods:{       
    requestData:function(){
      let _this=this
      let url=familyDoctor()
        axios.get(url+"/whjtys/data/index?loginId="+_this.loginId+"&token="+_this.token).then((response)=>{
           _this.data3=response.data
        })
    }
  },
}
</script>
<style type="text/css" scoped>
.data_img > span{
  display:inline-block;
  height: 40px;
  margin-bottom: 12px;
}
.total_nav{
  height: 80px;
  width: 100%;
  background-color: white;
}
.total_nav div{
  width: 33.333%;
  line-height: 80px;
  text-align: center;
  float: left;
}
.total_nav div i{
  color: #49c7c4;
  margin-left: 5px;
}
.toggle{
  margin-top: 10px;
  height: 80px;
}
.toggle_data{
  margin-top: 5px;
}
.toggle_data ul li{
  float: left;
  background-color: white;
  position: relative;
}
.toggle_data > ul > li:nth-child(1), .toggle_data > ul > li:nth-child(2){
  width: 49.5%;
  height: 139px;
  padding: 70px 0 0 0;
  margin-right: 1%;
  border-bottom: 5px solid #f5f5f5
}
.toggle_data > ul > li:nth-child(2){
  margin-right: 0;
}
.toggle_data > ul > li:nth-child(1)>div,
.toggle_data > ul > li:nth-child(2)>div{
  text-align: center;
}
.toggle_data > ul > li:nth-child(1)>div:nth-child(3){
 position: absolute;
 top: 105px;
 left: 58%;
 color: black;
 font-weight: 700
}
.toggle_data > ul > li:nth-child(2)>div:nth-child(2){
  position: absolute;
  right: 35%;
  top: 80px;
}
.toggle_data > ul > li:nth-child(2)>div:nth-child(3){
  position: absolute;
  right: 35%;
  top: 105px;
  font-weight: 700
}
.toggle_data > ul > li:nth-child(3),.toggle_data > ul > li:nth-child(4),.toggle_data > ul > li:nth-child(5){
  width: 32.5%;
  height: 198px;
  padding-top: 70px;
  margin-right: 1.25%;
}
.toggle_data > ul > li:nth-child(5){
  margin-right: 0;
}
.toggle_data > ul > li:nth-child(3)>div:nth-child(1),.toggle_data > ul > li:nth-child(4)>div:nth-child(1),.toggle_data > ul > li:nth-child(5)>div:nth-child(1){
  text-align: center;
}
.toggle_data > ul > li:nth-child(3)>div:nth-child(2),.toggle_data > ul > li:nth-child(4)>div:nth-child(2),.toggle_data > ul > li:nth-child(5)>div:nth-child(2){
   height: 40px;
   text-align: center;
   line-height: 40px;
}
.toggle_data > ul > li:nth-child(3)>div:nth-child(3),.toggle_data > ul > li:nth-child(4)>div:nth-child(3),.toggle_data > ul > li:nth-child(5)>div:nth-child(3){
     text-align: center;
     font-weight: 700
}
.more_info{
  height: 64px;
  background-color: white;
  margin-top: 5px;
  line-height: 64px;
  text-align: center;
}
.more_info span{
  color: #49c7c4; 
}
img{
  width: 66px;
  height: 66px;
  vertical-align: bottom;
}
</style>  