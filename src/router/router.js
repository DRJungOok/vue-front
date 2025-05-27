import {createRouter, createWebHistory} from 'vue-router';
import BoardList from '@/components/BoardList.vue';
import WritePage from '@/components/WritePage.vue';
import PostDetail from '@/components/PostDetail.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';

const routes = [
    {
        path: '/',
        name: 'BoardList',
        component: BoardList
    },
    {
        path: '/write',
        name: 'WritePage',
        component: WritePage,
        beforeEnter: (next) => {
            const token = localStorage.getItem('token');
            if(!token) {
                alert('need login');
                next('/login');
            }
        }
    },
    {
        path: '/post/:id',
        name: 'PostDetail',
        component: PostDetail,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;