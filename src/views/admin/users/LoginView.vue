<script setup>
import VueCookies from 'vue-cookies'
import { checkUser } from '../../../services/users'

//this should be after succesful login, generate a random token and send it to the db, the db will hash it and then save the hash and send it here, then it will be stored as a cookie
function setCookies(id, token){
  VueCookies.set('tl-u' , id, "7d") 
  VueCookies.set('tl-uref' , token, "7d") 
}

</script>

<script>
export default {
  data: vm => ({
    loading: false,
    emailRules: [value => vm.checkEmail(value)],
    timeout: null,
    email: '',
  }),
  methods: {
    async submit (event) {
      this.loading = true

      const results = await event
      console.log(results)
      
      checkUser(email, password).then(res =>{

      })
      this.loading = false

      alert(JSON.stringify(results, null, 2))
    },

    async checkEmail (email) {
      return new Promise(resolve => {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          if (!email) return resolve('Please enter a valid email.')
          if (email) return resolve(true)
        }, 1000)
      })
    },
    
  },
}
</script>

<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :loading="loading"
      type="submit"
      block
      class="mt-2"
      text="Submit"
    ></v-btn>
  </v-form>
</template>