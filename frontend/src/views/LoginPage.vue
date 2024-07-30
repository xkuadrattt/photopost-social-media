<template>
  <main class="min-h-screen">
    <div class="w-full overflow-hidden">
      <LoginForm :isShow="isShow" @toggle-show="isShow = !isShow" />
      <RegisterForm :isShow="!isShow" @toggle-show="isShow = !isShow" />
    </div>
  </main>
</template>

<script setup>
import LoginForm from "@/components/LoginPage/LoginForm.vue";
import RegisterForm from "@/components/RegisterPage/RegisterForm.vue";
import { ref } from "vue";

const isShow = ref(true);
</script>

<style>
.fade-enter-from,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
