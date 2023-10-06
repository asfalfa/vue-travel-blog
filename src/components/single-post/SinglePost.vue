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
const selectedImage = ref(null);

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

function selectImage(img){
    if (img == null) {
        selectedImage.value = null;
    } else{
        selectedImage.value = img;
    }
}

function browseImage(img, dir){
    const index = (post.value.gallery).findIndex((el) => el == img);

    if (dir == 0 && index != 0) {
        selectedImage.value = post.value.gallery[index - 1];
    } else if (dir == 1 && index != post.value.gallery.length -1){
        selectedImage.value = post.value.gallery[index + 1];
    }
}


onMounted(() => {
    getPost();
});
</script>

<template>
    <v-container class="px-2">
        <v-card className='mx-auto bg-neutral-200 hover:bg-white border-solid border-2 border-white w-full md:w-5/6'>
            <div v-if="post.covers && post.covers[0]" className='overflow-hidden grid content-center'>
                <v-img className='align-center w-full' :src="post.covers[0]"></v-img>
            </div>
            <div className='mx-2 p-2 text-center text-black/90 border-b-[1px] border-black/50'>
                <div>
                    <small>
                        <Date v-if="post.date" :date="post.date" />
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
            <div class="text-black/90 px-8 py-4 text-justify">
                {{ post.content }}
            </div>
            <div class="grid grid-cols-4 py-4">
                <v-img class="h-[250px] cursor-pointer" v-for="image in post.gallery" :src="image" @click="selectImage(image)"></v-img>
            </div>
        </v-card >
    </v-container>
    <v-overlay class="my-overlay bg-black/50" v-model="selectedImage">
        <v-btn @click="browseImage(selectedImage, 0)">Before</v-btn>
        <v-img
            @click="selectImage(null)"
            :src="selectedImage"
            >
        </v-img>
        <v-btn @click="browseImage(selectedImage, 1)">After</v-btn>
    </v-overlay>
</template>

<style scoped>
.my-overlay{
    display: flex;
    justify-content: center;
    align-items: center;
}
.my-overlay:deep(.v-overlay__content) {
    width: 80%;
    height: 80%;
    margin: auto;
  }
</style>