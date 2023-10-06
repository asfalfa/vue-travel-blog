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
    category: '',
    author_name: '',
    date: '',
    covers: null,
    gallery: null,
    contentRules: [value => vm.checkContent(value)],
    timeout: null,
  }),
  methods: {    
    uploadGallery (event) {
      this.gallery = event.target.files
    },
    uploadCovers (event) {
      this.covers = event.target.files
    },
    async submit() {
      this.loading = true;
      const formData = new FormData();
      for (const i of Object.keys(this.gallery)) {
        formData.append('gallery', this.gallery[i])
      };
      for (const i of Object.keys(this.covers)) {
        formData.append('covers', this.covers[i])
      };
      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('category', this.category);
      formData.append('author_name', this.author_name);
      formData.append('date', this.date);

      addPost(formData).then(res => {
        if (res.data.valid == false) {
          this.failure = true;
        } else{
          this.failure = false;
          this.success = true;
          setTimeout(() => {
            const url = new URL('/admin/posts/edit', window.location.origin);
            window.location.href = url.toString();
            // router.push({ path: '/admin/posts/edit', prop: { plan: 'private' } })
          }, 5000)
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
        
      ></v-text-field>

      <v-text-field
        v-model="category"
        :rules="contentRules"
        label="Category (separate each category with a comma) Ex. 'city, europe, food'"
        
      ></v-text-field>

      <v-textarea
        v-model="content"
        :rules="contentRules"
        label="Content"
        
      ></v-textarea>      
      
      <v-text-field
        v-model="author_name"
        :rules="contentRules"
        label="Author Name"
        
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
          
        />

      </div>

      <label>Covers (max 2)</label>
      <input type="file" @change="uploadCovers" multiple />

      <label>Gallery (max 10)</label>
      <input type="file" @change="uploadGallery" multiple />

      <v-btn
        :loading="loading"
        type="submit"
        block
        class="mt-2"
        text="Submit"
      ></v-btn>
    </v-form>
    <v-card v-if="success">
      <v-card-title class="w-min mx-auto">Post successfully created.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">You will be redirected momentarily.</v-card-subtitle>
    </v-card>
    <v-card v-if="failure">
      <v-card-title class="w-min mx-auto">Something went wrong.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">Please try again.</v-card-subtitle>
    </v-card>
  </v-container>
</template>