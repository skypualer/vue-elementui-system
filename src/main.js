import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//导入样式
import './assets/css/global.css'

//导入字体文件
import './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'
import { config } from 'vue/types/umd'

// 配置基础地址
axios.default.baseURL = "http://127.0.0.1:8888/api/private/v1/";

Vue.prototype.$http = axios;
//请求拦截器 axios.interceptors.request.use固定写法不纠结
axios.interceptors.request.use(config => {
    // 发送请求头给服务器
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
})

new Vue({
    router,
    store,

    render: h => h(App)
}).$mount('#app')