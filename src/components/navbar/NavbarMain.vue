<script setup>
import { getUserLoginStatus } from '../../services/users';
import {
    onMounted,
    ref,
} from 'vue'
import VueCookies from 'vue-cookies'

const user = ref();

function getCookies() {
    const id = VueCookies.get('tl-u');
    const token = VueCookies.get('tl-uref');
    if(id !== null && token !== null){
        getUserLoginStatus(id, token).then(res => {
            console.log(res.data)
            if(res.data.valid == true){
                user.value = res.data.user;
            } else{
                console.log('navbar getUserLoginStatus else triggered');
            }
        })
    } else{
        console.log('navbar id or token null');
    }
}

onMounted(() => {
    getCookies();
});
</script>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>

<template>
    <nav class="fixed left-0 top-0 h-7 bg-neutral-900 z-10 w-full flex flex-row">
        <div class="ml-5">
            <RouterLink to="/" class="text-neutral-300 hover:text-white font-weight-bold text-overline">
                A Travel Blog
            </RouterLink>
        </div>
        <div class="right-0 absolute mr-5">
            <RouterLink to="/" class="text-neutral-300 hover:text-white font-weight-bold text-overline">
                Archive
            </RouterLink>
            <span class="cursor-default">|</span>
            <RouterLink to="/" class="text-neutral-300 hover:text-white font-weight-bold text-overline">
                Contact
            </RouterLink>
        </div>
    </nav>
</template>