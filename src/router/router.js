import {createRouter, createWebHistory} from 'vue-router';
import BoardList from '@/components/BoardList.vue';
import WritePage from '@/components/WritePage.vue';

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
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;