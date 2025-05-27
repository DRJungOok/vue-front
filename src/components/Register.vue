<script lang="js" setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/router';

const username = ref('');
const password = ref('');

const register = async () => {
    try {
        await axios.post('/api/auth/register', {
        username: username.value,
        password: password.value
    })
    console.log(username, password);
    alert('회원가입이 완료되었습니다.');
    router.push('/login');
    } catch(e) {
        if(e.response?.status === 400) {
            alert('이미 사용 중인 아이디입니다.');
        } else if(e.response?.status === 500) {
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else if(e.response?.status === 409) {
            alert('이미 가입된 아이디입니다. 다른 아이디를 사용해주세요.');
        }
        else {
            console.error('회원가입 실패:', e);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    }
}
</script>

<template lang="html">
  <div class="form-container">
    <h2>회원가입</h2>
    <form @submit.prevent="register" class="form-box">
      <label>아이디</label>
      <input type="text" v-model="username" required />
      
      <label>비밀번호</label>
      <input type="password" v-model="password" required />

      <button type="submit">회원가입</button>
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