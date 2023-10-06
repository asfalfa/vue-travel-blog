<script setup>
import { getPostsByTag } from '../services/posts';
import Date from '../components/helpers/Date.vue';
import {
    onMounted,
    ref
} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const posts = ref([]);

function getTag(tag) {
    try {
        const response = getPostsByTag(tag);
        console.log(response)
        posts.value = response;
    } catch (err) {
        if (err.response) {
            console.log("Server Error:", err);
        }
    }
}

onMounted(() => {
    getTag(route.params.tag);
});
</script>

<template>
    <v-container class="grid grid-cols-2 gap-4">
        <v-card v-for="post in posts" :key=post.title className='mx-auto bg-neutral-200 hover:bg-white border-solid border-2 border-white hover:border-black w-3/4 hover:saturate-150'>
            <RouterLink :to="'/posts/' + post.id" :key=post.title>
                <div className='overflow-hidden grid content-center'>
                    <img className='h-[200px] md:h-[300px] align-center w-full' :src=post.covers[0] />
                </div>
                <div className='p-2 text-center'>
                    <div>
                        <small>
                            <Date :date="post.date" />
                            <div>
                                <RouterLink class="mx-[2px] px-[8px]" v-for="cat in post.category" :to="'/tags/' + cat" :key=cat>{{cat}}</RouterLink>
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
                <div className='overflow-hidden grid content-center'>
                    <img className='h-[200px] md:h-[300px] align-center w-full' :src=post.covers[1] />
                </div>
            </RouterLink>
        </v-card>
    </v-container>
</template>
