import {createRouter, createWebHistory} from 'vue-router';
import BoardList from '@/components/BoardList.vue';
import WritePage from '@/components/WritePage.vue';
import PostDetail from '@/components/PostDetail.vue';

const routes = [
    {
        path: '/',
        name: 'BoardList',
        component: BoardList
    },
    {
        path: '/write',
        name: 'WritePage',
        component: WritePage
    },
    {
        path: '/post/:id',
        name: 'PoastDetail',
        component: PostDetail,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;