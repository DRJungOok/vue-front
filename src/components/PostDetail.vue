<script lang="js" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const post = ref(null);
const route = useRoute();

const fetchPost = async () => {
    const res = await axios.get(`/api/posts/${route.params.id}`);
}

onMounted(() => {
    fetchPost();
})
</script>

<template lang="html">
    <div v-if="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <small>작성자: {{ post.author }}</small>
    </div>
</template>

<style lang="css" scoped>
</style>