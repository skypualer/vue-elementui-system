<template>
 <el-container class="home_container">
  <el-header>
    <div>
      <img src="../assets/logo.png" width="80px" height="60px"/>
      <span>电商管理系统</span>
    </div>
    <div>
      <el-button type="primary" @click="loginOut">退出</el-button>
    </div>
  </el-header>
  <el-container>
    <!-- 侧边菜单栏 -->
    <el-aside width="200px" :width="isCollapse?'64px':'200px'">
      <!-- 收起菜单栏 -->
      <div style="color:#fff;background:rgb(74,80,100);cursor:pointer;" @click="isCollapse=!isCollapse">|||</div>
       <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="rgb(55,61,65)"
      text-color="#fff"
      active-text-color='#409EFF'
      unique-opened="true"
      :router="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      >
      <!-- 一级导航 -->
      <el-submenu index="item.id +''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <!-- 动态绑定图标:class="objIcon[item.id] -->
          <i :class="objIcon[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级导航 -->
            <el-menu-item :index="'/'+item2.path" v-for="item2 in item.children" :key="item2.id">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item2.authName}}</span>
      </el-menu-item>
      </el-submenu>
       </el-menu>
    </el-aside>
    <el-main>
      <!-- 路径渲染内容位置 -->
      <roter-view></roter-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
// 请求数据
export default {
data(){
  return{
menuList:[],
objIcon:{
  "125":"iconfont icon-icon_user",
  "103":"iconfont icon-shangpin",
  "101":"iconfont icon-danju",
  "102":"iconfont icon-tijikongjian",
  "145":"iconfont icon-baobiao"
},
isCollapse:false
  }
},
methods:{
//退出时清除token
loginOut(){
  window.sessionStorage.removeItem('token');
  this.$router.push('/')
},
getMenuList(){
  this.$http.get('menus').then(res=>{
    console.log(res);
    if(res.data.meta.status!==200) this.$message.error('请求导航菜单失败');
    // 若成功则直接赋值渲染
    this.menuList = res.data.data;

  }
  )
}
},
// 打开页面就调用方法获取
created(){
  this.getMenuList();
}
}
</script>

<style scoped>
.home_container{
  height: 100%;
}
.el-header{
  background:rgb(55,61,65);
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  color: #fff;
  font-size: 22px;
}
.el-header img {
  /* 对齐方式 */
vertical-align: middle;
}

.el-aside{
  background:rgb(55,61,65);
}
.el-main{
  background:rgb(55,61,65);
}
</style>