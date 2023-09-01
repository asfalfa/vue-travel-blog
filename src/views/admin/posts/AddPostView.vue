<script setup>
import { addPost } from '../../../services/posts'
</script>

<script>
export default {
  data: vm => ({
    success: false,
    failure: false,
    loading: false,
    title: '',
    content: '',
    author_name: '',
    date: '',
    top_image_url: '',
    bottom_image_url: '',
    contentRules: [value => vm.checkContent(value)],
    timeout: null,
  }),
  methods: {
    async submit() {
      this.loading = true;
      
      addPost(this.title, this.content).then(res => {
        if (res.data.valid == false) {
          this.failure = true;
        } else{
          this.failure = false;
          this.success = true;
        }
      })

      this.loading = false;

    },

    async checkContent(content) {
      return new Promise(resolve => {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          if (!content) return resolve('Please fill all fields about your post.');
          if (content) return resolve(true);
        }, 1000);
      });
    },
    
  },
}
</script>

<template>
  <v-container class="relative">
    <v-form v-if="!success" fast-fail validate-on="submit lazy" @submit.prevent="submit">
      <v-text-field
        v-model="title"
        :rules="contentRules"
        label="Title"
        required
      ></v-text-field>
  
      <v-textarea
        v-model="content"
        :rules="contentRules"
        label="Content"
        required
      ></v-textarea>      
      
      <v-text-field
        v-model="author_name"
        :rules="contentRules"
        label="Author Name"
        required
      ></v-text-field>

      <div 
      class="px-5 py-3 bg-neutral-800/30 hover:bg-neutral-800 mb-5 border-b-[1px] border-white/40">
        <label class="mr-10 text-white/40">Date</label>
        <input
        class="p-2"
          type="date"
          v-model="date"
          :rules="contentRules"
          label="Date"
          required
        />

      </div>

      <v-text-field
        v-model="top_image_url"
        :rules="contentRules"
        label="Top Image"
        required
      ></v-text-field>

      <v-text-field
        v-model="bottom_image_url"
        :rules="contentRules"
        label="Bottom Image"
        required
      ></v-text-field>

      <v-btn
        :loading="loading"
        type="submit"
        block
        class="mt-2"
        text="Submit"
      ></v-btn>
    </v-form>
    <v-card v-if="success">
      <v-card-title class="w-min mx-auto">User successfully created.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">You will be redirected momentarily.</v-card-subtitle>
    </v-card>
    <v-card v-if="failure">
      <v-card-title class="w-min mx-auto">Something went wrong.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">Please try again.</v-card-subtitle>
    </v-card>
  </v-container>
</template>