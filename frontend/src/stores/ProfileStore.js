import { defineStore } from "pinia";
import { ref } from "vue";
import photo from "@/assets/img/default_foto.png";

export const useProfileStore = defineStore("profile", () => {
  const defaultPhoto = ref(photo);

  return {
    defaultPhoto,
  };
});
