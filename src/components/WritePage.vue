<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('');
const content = ref('');
const router = useRouter();

const submitPost = async () => {
  const userName = localStorage.getItem('username') || 'Anonymous';
    await axios.post('/api/posts', {
        title: title.value,
        content: content.value,
        author: userName
    });
    router.push('/');
};
</script>
<template>
 <div class="container">
    <h2>글쓰기</h2>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label>제목</label>
        <input type="text" v-model="title" required />
      </div>
      <div class="form-group">
        <label>내용</label>
        <textarea v-model="content" required></textarea>
      </div>
      <button type="submit">작성 완료</button>
    </form>
  </div>
</template>

<style lang="css" scoped>
.container {
  max-width: 700px;
  margin: 2rem auto;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

input, textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>