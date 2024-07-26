<template>
  <div class="container mx-auto px-4 sm:px-0">
    <div class="w-max">
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            v-model="email"
            class="input-control"
            required
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Password</label>
          <input
            type="password"
            placeholder="*****"
            id="password"
            v-model="password"
            class="input-control"
            required
          />
        </div>
        <div class="flex gap-2 mt-2">
          <button type="submit" class="btn-primary">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axiosInit from "@/api";

const email = ref("");
const password = ref("");

const resetForm = () => {
  email.value = "";
  password.value = "";
};

const handleLogin = async () => {
  const response = await axiosInit.post("/login", {
    email: email.value,
    password: password.value,
  });

  console.log(response);
  resetForm();
};
</script>
