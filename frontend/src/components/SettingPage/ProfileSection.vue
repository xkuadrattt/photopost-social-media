<template>
  <div class="flex items-center min-h-screen justify-center">
    <div class="shadow-xl rounded-lg overflow-hidden">
      <div class="flex flex-col gap-2 w-full">
        <h1>Profile Setting</h1>
        <p>
          Complete about yourself. So people can get to know you more
          intimately. Or maybe you can meet a long lost relative.
        </p>
      </div>
      <div class="mt-8">
        <Form class="flex flex-col gap-4 w-full max-w-[75%]">
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
        {{ dob }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { computed, ref } from "vue";

const name = ref("");
const address = ref("");
const dob = ref("");
const relation = ref("");
const gender = ref("");

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
