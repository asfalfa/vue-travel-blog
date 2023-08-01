<script setup>
import { RouterView } from 'vue-router'
import NavbarMain from './components/navbar/NavbarMain.vue';
</script>

<template>
  <header>
    <NavbarMain />
  </header>
  <RouterView class="absolute left-0 w-full top-7" />
</template>