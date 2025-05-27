<script lang="js" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const post = ref(null);
const route = useRoute();

const fetchPost = async () => {
    try {
        const res = await axios.get(`/api/posts/${route.params.id}`);
        post.value = res.data;
        console.log('Post fetched:', res.data);
        console.log("get Post ::", post.value);
    } catch (e) {
        console.error('Error fetching post:', e);
    }
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

onMounted(() => {
    fetchPost();
})
</script>

<template lang="html">
    <div class="detail-container" v-if="post">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="meta">
            <span>작성자: {{ post.author }}</span>
            <span>조회수: {{ post.views }}</span>
            <span>작성일: {{ formatDate(post.createdAt) }}</span>
        </div>
        <div class="post-content">
            <p>{{ post.content }}</p>
        </div>
    </div>

    <div v-else class="no-post">
        <p>❌ 게시글을 불러올 수 없습니다.</p>
    </div>
</template>

<style lang="css" scoped>
.detail-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.post-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.meta {
    display: flex;
    gap: 1.5rem;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1.5rem;
}

.post-content {
    font-size: 1.1rem;
    line-height: 1.8;
    white-space: pre-wrap;
}

.no-post {
    text-align: center;
    padding: 3rem;
    color: #999;
    font-size: 1.2rem;
}
</style>