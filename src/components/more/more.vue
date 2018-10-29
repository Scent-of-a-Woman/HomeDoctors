<template>
  <div id="app">
   <el-col :span="24" class="warp-breadcrum" style="height:50px;width:92%;margin:0px; position: absolute;top:0px;left:8%;line-height:50px;color:red">
      <el-breadcrumb separator="/" style="line-height:50px">
        <el-breadcrumb-item :to="{ path: '' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">学习课堂</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">观看视频</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <!-- 内容 -->
    <div class="content">
    <div class="banner">
      <img src="../../assets/images/shiping.png">
    </div>
    <div class="title">
       <ul>
         <li class="now">正在播放</li>
         <li >{{msg}}</li> 
       </ul>
    </div>
    <div class="video">
       <video :src="myvideo" controls="controls" height="600px" width="300px"></video>
    </div>

    <div class="video-tab">
       <ul class="tab">
         <li @click="player_one">
           <div class="img">
             <img src="../../assets/images/video-1.png">
           </div>
           <div>第一讲 救急与急救</div>
         </li>
         <li  @click="player_two">
           <div class="img">
             <img src="../../assets/images/video-2.png">
           </div>
           <div>第二讲 心肺复苏神器的救命技术</div>
         </li>
         <li  @click="player_three">
           <div class="img">
             <img src="../../assets/images/video-3.png">
           </div>
           <div>第三讲 创伤急救基本技术</div>
         </li>
         <li  @click="player_four">
           <div class="img">
             <img src="../../assets/images/video-4.png">
           </div>
           <div>第四讲 窒息-气道异物梗阻</div>
         </li>
         <li  @click="player_five">
           <div class="img">
             <img src="../../assets/images/video-5.png" >
           </div>
           <div>第五讲 呼吸困难常见急症及现场救援</div>
         </li>
         <li  @click="player_six">
           <div class="img">
             <img src="../../assets/images/video-6.png">
           </div>
           <div>第六讲 昏迷</div>
         </li>
       </ul>
    </div>
    </div>
    
</div>
</template>
<script>
export default {
  data() {
    return {
        msg:"第一讲 救急与急救",
        myvideo:"https://whjtys-oss.oss-cn-shanghai.aliyuncs.com/sp/%E7%AC%AC%E4%B8%80%E8%AE%B2",
      }
    },
  methods:{
     player_two:function(){
         this.msg="第二讲 心肺复苏神器的救命技术"
         this.myvideo="https://whjtys-oss.oss-cn-shanghai.aliyuncs.com/sp/%E7%AC%AC%E4%BA%8C%E8%AE%B2"
     },
     player_one:function(){
         this.msg="第一讲 救急与急救"
         this.myvideo="https://whjtys-oss.oss-cn-shanghai.aliyuncs.com/sp/%E7%AC%AC%E4%B8%80%E8%AE%B2"
     },
     player_three:function(){
         this.msg="第三讲 创伤急救基本技术"
         this.myvideo="https://whjtys-oss.oss-cn-shanghai.aliyuncs.com/sp/%E7%AC%AC3%E8%AE%B2"
     },
     player_four:function(){
         this.msg="第四讲 窒息-气道异物梗阻"
         this.myvideo="https://whjtys-oss.oss-cn-shanghai.aliyuncs.com/sp/%E7%AC%AC4%E8%AE%B2"
     },
     player_five:function(){
         this.msg="第五讲 呼吸困难常见急症及现场救援"
         this.myvideo="https://whjtys-oss.oss-cn-shanghai.aliyuncs.com/sp/%E7%AC%AC%E4%BA%94%E8%AE%B2"
     },
      player_six:function(){
         this.msg="第六讲 昏迷"
         this.myvideo="https://whjtys-oss.oss-cn-shanghai.aliyuncs.com/sp/%E7%AC%AC6%E8%AE%B2"
     }
  }
}
</script>
<style scoped>
.content{
  width: 100%;
  background-color: white;
}
.banner{ 
    height: 100px;
    width: 100%;  
    margin-bottom:30px;
  }
.banner img{
    height: 100px;
    width: 90%;
    display: block;
     margin: auto;
     border-bottom: 1px solid #ccc;
  }
.title{
    width: 90%;
    height: 20px;
    margin:auto;
    margin-bottom: 20px;
    }
.title ul li{
  height: 20px;
      float: left;
    }
.title ul li.now{
      color: #ababab;
    }
.title ul li:last-of-type{
      color: #49c7c4;
      margin-left:5px;
    }
.video{
      height: 420px;
      width: 90%;
      margin: auto;
    }
.video video{
      height: 420px;
      width: 100%;
    }
   .video-tab{
    width: 90%;
    margin: auto;
    margin-top:30px; 
   } 
.tab{
  height: 150px;
  width: 100%;
  display: flex;
  overflow: hidden;
}  
.tab li{
  flex: 1;
  height: 180px;
}
.tab li .img{
  float: left;
  width: 95%;
  height: 100px;
/*  box-sizing: border-box;*/
}
.tab li .img img{
  height: 100%;
  width: 100%;
}
.tab li .img:hover{
  border:3px solid #eb6100;
  cursor: pointer;
} 
.tab li:hover{
  color: #ec6941;
  cursor: pointer;
}
.tab li div{
  float: left;
} 
.tab li div:nth-of-type(2){
  margin-top: 10px;
  height: 50px;
  width:100%;
  text-align: center;
  font-size: 14px;
} 
</style>