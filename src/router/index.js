import { from } from 'core-js/core/array'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login',

    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../components/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
            path: '/user',
            name: 'User',
            component: () =>
                import ('../components/user/Users.vue')
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//路由全局守卫
router.beforeEach((to, form, next) => {
    if (to.path = '/') {
        next()

    } else {
        const token = window.sessionStorage.getItem("token");
        if (!token) {
            next("/login")
        } else {
            next()
        }
    }
})
export default router