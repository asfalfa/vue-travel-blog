<script setup>
import { editPost } from '../../../services/posts'
import { useRoute } from 'vue-router';
import { getPostData } from '../../../services/posts';
import {
    onMounted,
    ref
} from 'vue'
const route = useRoute();
const post = ref({});

async function getPost() {
    try {
        const response = await getPostData(route.params.id);
        post.value = response.data;
    } catch (err) {
        if (err.response) {
            console.log("Server Error:", err);
        }
    }
}

let success = ref(false);
let failure = ref(false);
let loading = ref(false); 
let contentRules = [value => checkContent(value)];
let timeout = null;

async function submit() {
    loading.value = true;

    let data = {
      id: route.params.id,
      title: post.value.title,
      content: post.value.content,
      author_name: post.value.author_name,
      top_image_url: post.value.top_image_url,
      bottom_image_url: post.value.bottom_image_url,
    }
    editPost(data).then(res => {
      if (res.data.valid == false) {
        failure.value = true;
      } else{
        failure.value = false;
        success.value = true;
        console.log(success.value)
        setTimeout(() => {
          const url = new URL('/admin/posts/edit', window.location.origin);
          window.location.href = url.toString();
          // router.push({ path: '/admin/posts/edit', prop: { plan: 'private' } })
        }, 5000)
      }
    })

    loading = false;
}

async function checkContent(content) {
    return new Promise(resolve => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        if (!content) return resolve('Please fill all fields about your post.');
        if (content) return resolve(true);
    }, 1000);
    });
}

onMounted(() => {
    getPost();
});
</script>

<template>
  <v-container class="relative">
    <v-form v-if="!success" fast-fail validate-on="submit lazy" @submit.prevent="submit">
      <v-text-field
        v-model="post.title"
        :rules="contentRules"
        label="Title"
        required
      ></v-text-field>
  
      <v-textarea
        clearable
        v-model="post.content"
        :rules="contentRules"
        label="Content"
        required
      ></v-textarea>      
      
      <v-text-field
        v-model="post.author_name"
        :rules="contentRules"
        label="Author Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="post.top_image_url"
        :rules="contentRules"
        label="Top Image"
        required
      ></v-text-field>

      <v-text-field
        v-model="post.bottom_image_url"
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
      <v-card-title class="w-min mx-auto">Post edited.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">You will be returned to the post list soon.</v-card-subtitle>
    </v-card>

    <v-card v-if="failure">
      <v-card-title class="w-min mx-auto">Something went wrong.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">Please try again.</v-card-subtitle>
    </v-card>
  </v-container>
</template>