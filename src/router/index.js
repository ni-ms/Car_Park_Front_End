import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/LoginPage.vue'
import Booking from '../components/BookingForm.vue'
import AdminDash from '../components/AdminDashboard.vue'
import Feedback from '../components/Feedback.vue'
import UserDash from '../components/UserDashboard.vue'
import WorkerDash from '../components/WorkerDashboard.vue'
import LoginPage from '../components/LoginPage.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Login',
        name: Login,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/LoginPage.vue')
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
        name: LoginPage,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/SignUp.vue')


    }
]

const router = new VueRouter({
    routes
})

export default router