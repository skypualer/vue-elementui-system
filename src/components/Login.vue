<template>
<div class="login">
<div class="login_context">
<!-- 头部图片 -->
<div class="login_logo">
  <img src="../assets/logo.png" alt="">
</div>
<!-- form表单 -->
<el-form :model="loginForm" :rules="loginFormRul" ref="loginFormRel"  class="login-box">
  <el-form-item  prop="username" >
    <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
  </el-form-item>

  
  <el-form-item    prop="password">
    <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
  </el-form-item>
  <el-form-item   class="btns" >
  <!-- <el-buuton type="primary">登录</el-buuton>
  <el-buuton type="info">重置</el-buuton> -->
   
    <el-button type="primary" @click="login">登录</el-button>
    <el-button type="info">重置</el-button>
  
  </el-form-item>
</el-form>
</div>
</div>
</template>
<script lang="ts">
export default ({
    data(){
        return{
            //表单请求数据
            loginForm:{
                username:'admin',
                password:'123456'
            },
            //表单验证规则
            loginFormRul :{
               username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],

            }
        }
    },
    methods:{
      // 登录
      login(){
        // 登录之前规则校验，成功允许登录
// 一般来讲，获取DOM元素，需document.querySelector（".input1"）获取这个dom节点，然后在获取input1的值。

// 但是用ref绑定之后，我们就不需要在获取dom节点了，直接在上面的input上绑定input1，然后$refs里面调用就行。

// 然后在javascript里面这样调用：this.$refs.input1 这样就可以减少获取dom节点的消耗了
// validate()表单验证方法
        this.$refs.loginFormRel.validate(vaild=>{
          // 为假直接返回
          if(!vaild) return;
          this.$http.post("login",this.loginForm).then(res=>{
            console.log(res);
            if(res.data.meta.status!==200) this.$message.error('登录失败')
            this.$message.success('登录成功')
            // 成功时存取token
            window.sessionStorage.setItem('token',res.data.data.token);
            //登录成功进行跳转Home
            this.$router.push('/home')
          })
        })
      }
    }
})
</script>


<style scoped='scoped'>
.login {
    height: 100%;
    background:rgb(43,75,107) ;
}
.login_context{
width: 450px;
height: 300px;
background: #fff;
/* 垂直居中 */
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
box-shadow: 0 0 5px 2px #ddd;
}
.login_logo{
width: 150px;
height: 150px;
position: absolute;
top: -75px;
left: 50%;
margin-left: -80px;
border-radius: 50%;
background: #fff;
padding: 10px;
box-shadow: 0 0 3px 2px #fff;
}
.login_logo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
   background:rgb(238,238,238) 
  
}
.login-box{
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  
  box-sizing: border-box;
}
.btns{
  display: flex;
  /* flex主轴右侧排列方式 */
  justify-content: flex-end;
}
</style>