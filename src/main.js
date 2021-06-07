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

// 配置基础地址
axios.default.baseURL = "http://127.0.0.1:8888/api/private/v1/";

Vue.prototype.$http = axios;

new Vue({
    router,
    store,

    render: h => h(App)
}).$mount('#app')