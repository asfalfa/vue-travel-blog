<script setup>
import VueCookies from 'vue-cookies'
import { checkUser } from '../../../services/users'
import {
    onMounted,
    ref
} from 'vue'

const loggedIn = ref({});

function getCookies() {
  const id = VueCookies.get('tl-u');
  const token = VueCookies.get('tl-uref');
  if(id !== null && token !== null){
    loggedIn.value = true;
  } else{
    loggedIn.value = false;
  }
}

onMounted(() => {
  getCookies();
});

</script>

<script>
export default {
  data: vm => ({
    email: '',
    emailRules: [value => vm.checkEmail(value)],
    password: '',
    passwordRules: [value => vm.checkPwd(value)],
    loading: false,
    timeout: null,
  }),
  methods: {
    async submit() {
      this.loading = true;
      
      checkUser(this.email, this.password).then(res => {
        if (res.data.valid == false) {
          alert('Your email or password is incorrect.');
        } else{
          alert('Logged in.');
          VueCookies.remove('tl-u');
          VueCookies.remove('tl-uref');
          VueCookies.set('tl-u' , res.data.id, "1m") ;
          VueCookies.set('tl-uref' , res.data.token, "1m");
        }
      });

      this.loading = false;

    },

    async checkEmail(email) {
      return new Promise(resolve => {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            return resolve(true);
          }else {
            return resolve('Please enter a valid email.');
          }
        }, 1000);
      });
    },   

    async checkPwd(password) {
      return new Promise(resolve => {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          if (!password) return resolve('Please enter a password.');
          if (password) return resolve(true);
        }, 1000);
      });
    },
    
  },
}
</script>

<template>
  <v-container>
    <v-card v-if="loggedIn">You are already logged in.</v-card>
    <v-form v-if="!loggedIn" validate-on="submit lazy" @submit.prevent="submit">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
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
  </v-container>
</template>