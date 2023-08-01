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
    <v-container class="grid grid-cols-2 gap-4">
        <v-card className='mx-auto bg-neutral-200 hover:bg-white border-solid border-2 border-white hover:border-black w-3/4 hover:saturate-150'>
            <div className='overflow-hidden grid content-center'>
                <img className='h-[200px] md:h-[300px] align-center w-full' :src="post.top_image_url" />
            </div>
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
            <div className='overflow-hidden grid content-center'>
                <img className='h-[200px] md:h-[300px] align-center w-full' :src="post.bottom_image_url" />
            </div>
        </v-card >
    </v-container>
</template>