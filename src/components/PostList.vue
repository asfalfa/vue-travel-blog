<script setup>
import { getSortedPostsData } from '../services/posts';
import Date from './helpers/Date.vue';
import {
    onMounted,
    ref,
    computed
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
    <v-container class="grid grid-cols-2 gap-4">
        <v-card v-for="post in posts" :key=post.title className='mx-auto bg-neutral-200 hover:bg-white border-solid border-2 border-white hover:border-black w-3/4 hover:saturate-150'>
            <RouterLink :to="'/posts/' + post.id" :key=post.title>
                <div v-if="post.covers && post.covers[0]" className='overflow-hidden grid content-center'>
                    <img className='h-[200px] md:h-[300px] align-center w-full' :src=post.covers[0] />
                </div>
                <div className='p-2 text-center'>
                    <div>
                        <small>
                            <Date :date="post.date" />
                            <div>
                                <RouterLink class="mx-[2px] px-[8px]" v-for="cat in post.category.slice(0, 4)" :to="'/tags/' + cat" :key=cat>{{cat.split('-').join(' ')}}</RouterLink>
                            </div>
                        </small>
                    </div>
                    <div className='font-semibold text-xl'>{{post.title}}</div>
                    <div>
                        <small>
                            by {{post.author_name}}
                        </small>
                    </div>
                </div>
                <div v-if="post.covers && post.covers[1]" className='overflow-hidden grid content-center'>
                    <!-- make the images clickable and expandable -->
                    <img className='h-[200px] md:h-[300px] align-center w-full' :src=post.covers[1] />
                </div>
            </RouterLink>
        </v-card >
    </v-container>
</template>