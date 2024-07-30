<template>
  <div class="container mx-auto px-4 sm:px-0">
    <Transition name="fade">
      <div class="flex items-center min-h-screen justify-center" v-if="isShow">
        <div class="flex shadow-xl rounded-lg overflow-hidden">
          <div class="sm:flex-1 flex items-center p-8 w-full">
            <Form @submit="handleLogin" class="flex flex-col gap-4 w-full">
              <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  id="email"
                  v-model.trim="email"
                  class="input-control"
                  :rules="validateEmail"
                  required
                />
                <ErrorMessage name="email" class="text-sm text-pink-500" />
              </div>
              <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="*****"
                  id="password"
                  v-model="password"
                  class="input-control"
                  :rules="validatePassword"
                  required
                />
                <ErrorMessage name="password" class="text-sm text-pink-500" />
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button type="submit" class="btn-primary">Submit</button>
                <button type="reset" class="border-primary">Reset</button>
              </div>
              <span
                >Doesn't have an account?, please
                <button
                  @click="handleToggle"
                  class="underline-offset-2 text-cyan-600 underline hover:text-cyan-700 hover:bg-cyan-50"
                >
                  register
                </button></span
              >
            </Form>
          </div>
          <div class="hidden sm:block flex-1 overflow-hidden">
            <img
              src="@/assets/img/loginbg.webp"
              alt="typewritter login screen"
              class="object-cover"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import axiosInit from "@/api";

const email = ref("");
const password = ref("");

const emit = defineEmits(["toggleShow"]);

defineProps(["isShow"]);

const resetForm = () => {
  email.value = "";
  password.value = "";
};

const handleToggle = () => {
  emit("toggleShow");
};

const handleLogin = async () => {
  if (validateEmail === true && validatePassword === true) {
    const response = await axiosInit.post("/login", {
      email: email.value,
      password: password.value,
    });

    console.log(response);
    resetForm();
  } else {
    return "entry not valid";
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
</script>
