<template>
  <form @submit.prevent="handleRegister">
    <div class="mb-6">
      <label for="username" class="label-control">Username</label>
      <input
        type="text"
        class="input-control"
        placeholder="Username"
        id="username"
        v-model="username"
        required
      />
    </div>
    <div class="mb-6">
      <label for="email" class="label-control">Email</label>
      <input
        v-model="email"
        type="email"
        class="input-control"
        placeholder="email"
        id="email"
        required
      />
    </div>
    <div class="mb-6">
      <label for="password" class="label-control">Password</label>
      <input
        v-model="password"
        type="password"
        class="input-control"
        placeholder="******"
        id="password"
        required
      />
    </div>
    <button class="btn-primary" type="submit">Submit</button>
  </form>
</template>

<script setup>
import axiosInit from "@/api";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const email = ref("");

const resetForm = () => {
  email.value = "";
  password.value = "";
};

const handleRegister = async () => {
  const response = await axiosInit.post("/register", {
    name: username.value,
    email: email.value,
    password: password.value,
  });

  resetForm();
  console.log(response);
};
</script>
