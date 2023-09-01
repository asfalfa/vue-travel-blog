<script setup>
import { getSortedPostsData } from '../../../services/posts';
import Date from '../../../components/helpers/Date.vue'
import {
    onMounted,
    ref,
} from 'vue'

const posts = ref([]);

function getPosts() {
    try {
        const response = getSortedPostsData();
        posts.value = response;
    } catch (err) {
        if (err.response) {
            console.log("Server Error:", err);
        }
    }
}

onMounted(() => {
    getPosts();
});
</script>

<template>
  <v-container  class="relative">
    <v-card v-for="post in posts" :key=post.title className='mx-auto bg-neutral-200 hover:bg-white border-solid border-2 border-white hover:border-black w-3/4 hover:saturate-150'>
      <RouterLink :to="'/admin/posts/edit/' + post.id" :key=post.title>
          <div className='p-2 text-center'>
              <div>
                  <small>
                      <Date :date="post.date" /> | Category
                  </small>
              </div>
              <div className='font-semibold text-xl'>{{post.title}}</div>
              <div>
                  <small>
                      by {{post.author_name}}
                  </small>
              </div>
          </div>
      </RouterLink>
    </v-card >
  </v-container>
</template>