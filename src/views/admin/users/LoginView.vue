<script setup>
import { RouterView } from 'vue-router'
import VueCookies from 'vue-cookies'
import {
    onMounted,
} from 'vue'

//this should be after succesful login, generate a random token and send it to the db, the db will hash it and then save the hash and send it here, then it will be stored as a cookie
function setCookie(){
  VueCookies.set('tl-uref' , 'hello', "7d") 
}

onMounted(() => {
    setCookie();
});

</script>

<template>
  <RouterView class="absolute left-0 w-full top-7" />
</template>