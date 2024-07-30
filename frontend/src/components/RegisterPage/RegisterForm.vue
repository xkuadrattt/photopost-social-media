<template>
  <div class="container mx-auto px-4 sm:px-0">
    <Transition name="fade">
      <div class="flex items-center min-h-screen justify-center" v-if="isShow">
        <div class="flex flex-row-reverse shadow-xl rounded-lg overflow-hidden">
          <div class="sm:flex-1 flex items-center p-4 w-full">
            <Form @submit="handleRegister" class="flex flex-col gap-4 w-full">
              <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  class="input-control"
                  placeholder="Username"
                  id="username"
                  v-model.trim="username"
                  :rules="validateUsername"
                  required
                />
                <ErrorMessage name="username" class="text-sm text-pink-500" />
              </div>
              <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <Field
                  name="email"
                  v-model.trim="email"
                  type="email"
                  class="input-control"
                  placeholder="email"
                  id="email"
                  :rules="validateEmail"
                  required
                />
                <ErrorMessage name="email" class="text-sm text-pink-500" />
              </div>
              <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <Field
                  name="password"
                  v-model="password"
                  type="password"
                  class="input-control"
                  placeholder="******"
                  id="password"
                  :rules="validatePassword"
                  required
                />
                <ErrorMessage name="password" class="text-sm text-pink-500" />
              </div>
              <div class="flex">
                <button class="btn-primary" type="submit">Submit</button>
              </div>
              <label for="toLogin" class="block mt-2 text-sm"
                >Already an account?, please
                <button
                  @click="handleToggle"
                  class="underline underline-offset-2 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                >
                  login
                </button>
              </label>
            </Form>
          </div>
          <div class="hidden sm:block flex-1 overflow-hidden">
            <img
              src="@/assets/img/loginbg.webp"
              alt="typewritter login screen"
              class="object-cover h-full"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import axiosInit from "@/api";
import { ref } from "vue";

defineProps(["isShow"]);

const emit = defineEmits(["toggleShow"]);

const username = ref("");
const password = ref("");
const email = ref("");

const handleToggle = () => {
  emit("toggleShow");
};

const resetForm = () => {
  email.value = "";
  password.value = "";
};

const handleRegister = async () => {
  if (validateEmail === true && validatePassword === true) {
    const response = await axiosInit.post("/register", {
      name: username.value,
      email: email.value,
      password: password.value,
    });

    resetForm();
    console.log(response);
  } else {
    return;
  }
};

const validateEmail = (value) => {
  if (!value) {
    return "This field is required";
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }
  return true;
};

const validatePassword = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

const validateUsername = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
