<template>
  <div class="flex items-center min-h-screen justify-center bg-gray-50">
    <div
      class="shadow-xl rounded-lg overflow-hidden border border-gray-500 my-8 p-12 bg-white"
    >
      <div class="flex flex-col gap-2 w-full">
        <h1 class="text-xl font-bold">Profile Setting</h1>
        <p class="text-sm text-gray-400">
          Complete about yourself. So people can get to know you more
          intimately. Or maybe you can meet a long lost relative.
        </p>
      </div>
      <div class="mt-8">
        <Form class="flex flex-col gap-4 w-full max-w-[75%]">
          <div class="relative my-6 flex flex-col">
            <img
              :src="profileStore.defaultPhoto"
              alt="default_foto"
              class="reset-flex max-w-[150px]"
            />
            <button type="button" class="border-tertiary block mt-4 reset-flex">
              change photo
            </button>
          </div>
          <div class="flex flex-col gap-2">
            <label for="name">Name</label>
            <Field
              class="input-control"
              name="name"
              type="text"
              placehoder="Name"
              v-model="name"
              id="name"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="address">Address</label>
            <Field
              name="address"
              class="input-control"
              type="text"
              placeholder="Address"
              v-model="address"
              id="address"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="dob">Day of Birth</label>
            <Field
              class="input-control"
              type="date"
              name="dob"
              v-model.defer="dob"
              id="dob"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="relation">Relationship</label>
            <Field
              class="input-control"
              type="text"
              name="relation"
              v-model="relation"
              placeholder="relation"
              id="relation"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="gender">Gender</label>
            <select name="gender" id="gender" v-model="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="flex gap-5">
            <button
              type="submit"
              @click.prevent="methodTest"
              :disabled="setButton"
              class="btn-primary"
            >
              Edit Profile
            </button>
            <button type="reset" class="border-primary">Reset</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { useProfileStore } from "@/stores/ProfileStore";
import { computed, ref } from "vue";

const name = ref("");
const address = ref("");
const dob = ref("");
const relation = ref("");
const gender = ref("");
const profileStore = useProfileStore();

console.log(profileStore.defaultPhoto);

const collectData = {
  name: name.value,
  address: address.value,
  dob: dob.value,
  relation: relation.value,
  gender: gender.value,
};

const handleReset = () => {
  name.value = "";
  address.value = "";
  dob.value = "";
  relation.value = "";
  gender.value = "";
};

const methodTest = () => {
  console.log("button is clicked");
  console.log(collectData.address);
};

const setButton = computed(() => {
  return (
    name.value.trim() === "" &&
    address.value.trim() === "" &&
    relation.value.trim() === "" &&
    dob.value === "" &&
    gender.value === ""
  );
});
</script>
