import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../components/LoginPage.vue'
import Booking from '../components/BookingForm.vue'
import AdminDash from '../components/AdminDashboard.vue'
import Feedback from '../components/Feedback.vue'
import UserDash from '../components/UserDashboard.vue'
import WorkerDash from '../components/WorkerDashboard.vue'
import SignUp from '../components/SignUp.vue'
import Logoutpage from '../components/Logoutpage.vue'
import AdminLoginPage from '../components/AdminLogin.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Login',
        name: LoginPage,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/LoginPage.vue')



    },
    {
        path: '/AdminLogin',
        name: AdminLoginPage,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/AdminLogin.vue')



    },
    {
        path: '/Logout',
        name: Logoutpage,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/Logoutpage.vue')



    },
    {
        path: '/Booking',
        name: Booking,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/BookingForm.vue')
    },
    {
        path: '/AdminDash',
        name: AdminDash,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/AdminDashboard.vue')
    },
    {
        path: '/Feedback',
        name: Feedback,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/Feedback.vue')
    },
    {
        path: '/WorkerDash',
        name: WorkerDash,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/WorkerDashboard.vue')
    },
    {
        path: '/UserDash',
        name: UserDash,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/UserDashboard.vue')
    },
    {
        path: '/SignUp',
        name: SignUp,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/SignUp.vue')


    }
]

const router = new VueRouter({
    routes
})

export default router