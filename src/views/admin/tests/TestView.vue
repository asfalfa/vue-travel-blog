<script setup>
import { fileUpload } from '../../../services/tests'
</script>

<script>
export default {
  data: vm => ({
    files: null,
  }),
  methods: {
    uploadFile (event) {
      this.files = event.target.files
      console.log(this.files);
    },
    async submit() {
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append('files', this.files[i])
      }
      console.log(formData);
      const response = await fileUpload(formData);
      console.log(response);
    },
    
  },
}
</script>

<template>
  <v-container class="relative">
    <v-form fast-fail validate-on="submit lazy" @submit.prevent="submit">
      <input type="file" @change="uploadFile" multiple />

      <v-btn
        :loading="loading"
        type="submit"
        block
        class="mt-2"
        text="Submit"
      ></v-btn>
    </v-form>
  </v-container>
</template>