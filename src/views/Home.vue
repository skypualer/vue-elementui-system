<template>
  <div >
      <h3>home界面</h3>
      <button @click="loginOut">退出</button>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
data(){
  return{

  }
},
methods:{
//退出时清除token
loginOut(){
  window.sessionStorage.removeItem('token');
  this.$router.push('/')
}
}
}
</script>
