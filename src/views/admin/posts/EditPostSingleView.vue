<script setup>
import { editPost } from '../../../services/posts'
import { useRoute } from 'vue-router';
import { getPostData , removePostImage, removePost, movePostImage } from '../../../services/posts';
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
let removeSuccess = ref(false);
let moveSuccess = ref(false);
let failure = ref(false);
let loading = ref(false); 
let contentRules = [value => checkContent(value)];
let timeout = null;
let covers = ref(null);
let gallery = ref(null);

function uploadGallery (event) {
  gallery.value = event.target.files
}
function uploadCovers (event) {
  covers.value = event.target.files
}

async function moveImageTo(image, type){
  try{
    const res = await movePostImage(image, type, route.params.id);    
    if (res.data.valid == true) {
      moveSuccess.value = true;
    }
  } catch (err){
      if(err.response){
        console.log("Server Error:", err);
      }
  }
}


async function removeImage(image, type){
  try{
    const res = await removePostImage(image, type, route.params.id);
    if (res.data.valid == true) {
      removeSuccess.value = true;
    }
  } catch (err){
      if(err.response){
        console.log("Server Error:", err);
      }
  }
}

async function remove(){
  try{
    const res = await removePost(route.params.id);
    if (res.data.valid == false) {
      failure.value = true;
    } else{
      failure.value = false;
      success.value = true;
      setTimeout(() => {
        const url = new URL('/admin/posts/edit', window.location.origin);
        window.location.href = url.toString();
        // router.push({ path: '/admin/posts/edit', prop: { plan: 'private' } })
      }, 5000)
    }
  } catch (err){
      if(err.response){
        console.log("Server Error:", err);
      }
  }
}

async function submit() {
    loading.value = true;

    const formData = new FormData();
    //Check if this works
    //Add functions to remove gallery and cover images
    if(gallery.value != null){
      for (const i of Object.keys(gallery.value)) {
        formData.append('gallery', gallery.value[i])
      };
    }
    
    if(covers.value != null){
      for (const i of Object.keys(covers.value)) {
        formData.append('covers', covers.value[i])
      };
    }

    formData.append('id', route.params.id);
    formData.append('title', post.value.title);
    formData.append('content', post.value.content);
    formData.append('category', post.value.category);
    formData.append('author_name', post.value.author_name);
    console.log(formData)
    editPost(formData).then(res => {
      if (res.data.valid == false) {
        failure.value = true;
      } else{
        failure.value = false;
        success.value = true;
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
  
      <v-text-field
        v-model="post.category"
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

      <label>Cover Images</label>
      <div class="grid grid-cols-6 mt-1 mb-5">
        <div v-for="image in post.covers" class="mr-2">
          <v-img :src="image"></v-img>
          <v-btn @click="moveImageTo(image, 'covers')" block rounded="0">To Gallery</v-btn>
          <v-btn @click="removeImage(image, 'covers')" block rounded="0">Remove</v-btn>
        </div>
        <div class="m-auto flex flex-col">
          <label>Add New Cover Images</label>
          <input type="file" @change="uploadCovers" multiple />
        </div>
      </div>

      <label>Gallery Images</label>
      <div class="grid grid-cols-6 mt-1">
        <div v-for="image in post.gallery" class="mr-2">
          <v-img :src="image"></v-img>
          <v-btn @click="moveImageTo(image, 'gallery')" block rounded="0">To Cover</v-btn>
          <v-btn @click="removeImage(image, 'gallery')" block rounded="0">Remove</v-btn>
        </div>
        <div class="m-auto flex flex-col">
          <label>Add New Gallery Images</label>
          <input type="file" @change="uploadGallery" multiple />
        </div>
      </div>

      <v-btn
        :loading="loading"
        type="submit"
        block
        rounded="0" 
        class="mt-2"
        text="Submit"
      ></v-btn>
    </v-form>
    <v-btn @click="remove()" color="red" rounded="0" class="mt-5">Remove Post</v-btn>
    
    <v-card v-if="removeSuccess">
      Image deleted.
    </v-card>

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