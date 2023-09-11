<script setup>
import { useRoute } from 'vue-router';
import { getPostData } from '../../services/posts';
import Date from '../helpers/Date.vue';
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

onMounted(() => {
    getPost();
});
</script>

<template>
    <v-container class="px-2">
        <v-card className='mx-auto bg-neutral-200 hover:bg-white border-solid border-2 border-white w-full md:w-5/6'>
            <div className='overflow-hidden grid content-center'>
                <v-img v-if="post.covers" className='align-center w-full' :src="post.covers[0]"></v-img>
            </div>
            <div className='mx-2 p-2 text-center text-black/90 border-b-[1px] border-black'>
                <div>
                    <small>
                        <Date v-if="post.date" :date="post.date" /> | Category
                    </small>
                </div>
                <div className='font-semibold text-xl'>{{post.title}}</div>
                <div>
                    <small>
                        by {{post.author_name}}
                    </small>
                </div>
            </div>
            <div class="text-black/90 px-8 py-4 text-justify">
                {{ post.content }}
            </div>
            <div class="grid grid-cols-4">
                <v-img v-for="image in post.gallery" :src="image"></v-img>
            </div>
        </v-card >
    </v-container>
</template>