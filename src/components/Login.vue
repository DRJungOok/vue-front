<script lang="js" setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');

const router = useRouter();

const login = async () => {

    try{
        const res = await axios.post('/api/auth/login', {
        username: username.value,
        password: password.value
    })

    console.log(username.value, password.value);

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('username', res.data.username);
    console.log('로그인 성공:', res.data.username);
    alert(`${username.value}님, 환영합니다!`);
    router.push('/');
    } catch (error) {
        console.error('로그인 실패:', error);
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
}
</script>

<template lang="html">
     <div class="form-container">
    <h2>로그인</h2>
    <form @submit.prevent="login" class="form-box">
      <label>아이디</label>
      <input v-model="username" placeholder="아이디" required />
      
      <label>비밀번호</label>
      <input type="password" v-model="password" placeholder="비밀번호" required />

      <button type="submit">로그인</button>
      <button type="button" @click="$router.push('/register')">회원가입</button>
    </form>
  </div>
</template>

<style lang="css" scoped>
.form-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fafafa;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 0.7rem;
  background-color: #2c7be5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #1a5fc8;
}
</style>