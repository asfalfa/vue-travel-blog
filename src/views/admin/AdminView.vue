<script>

</script>

<template>
  <v-container class="flex flex-col">
    <div class="flex text-lg m-auto">
      <RouterLink class="p-5" to="/admin/posts/add">
        Add Post
      </RouterLink>   
      <span class="p-5">|</span>
      <RouterLink class="p-5" to="/admin/posts/edit">
        Edit Posts
      </RouterLink>
      <span class="p-5">|</span>
      <RouterLink class="p-5" to="/admin/users">
        View Users
      </RouterLink>
    </div>
    <hr class="mb-10" />
    <RouterView></RouterView>
  </v-container>
</template>