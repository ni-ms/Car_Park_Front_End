import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Login',
        name: 'LoginPage',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/LoginPage.vue')
    },
    {
        path: '/AdminLogin',
        name: 'AdminLoginPage',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/AdminLogin.vue')
    },
    {
        path: '/Adminsignup',
        name: 'AdminSignUp',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/AdminSignUp.vue')
    },
    {
        path: '/Logout',
        name: 'Logoutpage',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/Logoutpage.vue')
    },
    {
        path: '/Booking',
        name: 'Booking',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/BookingForm.vue')
    },
    {
        path: '/AdminDash',
        name: 'AdminDash',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/AdminDashboard.vue')
    },
    {
        path: '/Feedback',
        name: 'Feedback',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/Feedback.vue')
    },
    {
        path: '/WorkerDash',
        name: 'WorkerDash',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/WorkerDashboard.vue')
    },
    {
        path: '/UserDash',
        name: 'UserDash',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/UserDashboard.vue')
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/SignUp.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
