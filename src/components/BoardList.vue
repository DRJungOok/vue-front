<script lang="js" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const posts = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 10;
const router = useRouter();
const currentUser = ref(localStorage.getItem('username') || '');

const isLoggedIn = ref(false);

const fetchPost = async () => {
  try {
    const res = await axios.get(`/api/posts?page=${currentPage.value}&size=${pageSize}`);
    posts.value = res.data.posts;
    totalPages.value = res.data.totalPages;
  } catch (e) {
    console.error('getting list error:', e);
    posts.value = [];
  }
};

const changePage = (page) => {
  currentPage.value = page;
  fetchPost();
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

console.log('비교 ::', posts.author, currentUser.value);

const goToWrite = () => {
  router.push('/write');
};

const gotoLogin = () => {
  router.push('/login');
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  alert('로그아웃 되었습니다.');
  isLoggedIn.value = false;
  router.push('/login');
};

const goToDetail = (id) => {
  router.push(`/post/${id}`);
};

const deletePost = async (id) => {
  if (!confirm('정말로 삭제하시겠습니까?')) return;
  try {
    await axios.delete(`/api/posts/${id}`);
    alert('게시글이 삭제되었습니다.');
    fetchPost();
  } catch (e) {
    console.error('Error deleting post:', e);
    alert('게시글 삭제에 실패했습니다.');
  }
};

onMounted(() => {
  fetchPost();
  isLoggedIn.value = !!localStorage.getItem('token');
});
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>📋 게시판</h1>
      <div class="button-group">
        <button v-if="isLoggedIn" @click="goToWrite">글쓰기</button>
        <button v-if="isLoggedIn" @click="logout">로그아웃</button>
        <button v-else @click="gotoLogin">로그인</button>
      </div>
    </div>

    <table class="post-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="post._id" @click="goToDetail(post._id)">
          <td>{{ index + 1 + (currentPage - 1) * pageSize }}</td>
          <td class="title">{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>{{ formatDate(post.createdAt) }}</td>
          <td>{{ post.views }}</td>
          <td>
            <button v-if="isLoggedIn && post.author === currentUser" @click.stop="deletePost(post._id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)"
        :class="{ active: currentPage === page }">
        {{ page }}
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.header button {
  padding: 0.5rem 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.header button:hover {
  background-color: #1565c0;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
}

.post-table th,
.post-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
}

.post-table th {
  background-color: #f0f0f0;
}

.post-table tr:hover {
  background-color: #fafafa;
  cursor: pointer;
}

.title {
  text-align: left;
}

.pagination {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.pagination button {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.active {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.post-table button {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.post-table button:hover {
  background-color: #c62828;
}
</style>
