<script setup>
import VueCookies from 'vue-cookies'
import { checkUser } from '../../../services/users'
</script>

<script>
export default {
  data: vm => ({
    loggedIn: false,
    success: false,
    failure: false,
    email: '',
    emailRules: [value => vm.checkEmail(value)],
    password: '',
    passwordRules: [value => vm.checkPwd(value)],
    loading: false,
    timeout: null,
  }),
  methods: {
    getCookies() {
      const id = VueCookies.get('tl-u');
      const token = VueCookies.get('tl-uref');
      if(id !== null && token !== null){
        this.loggedIn = true;
      } else{
        this.loggedIn = false;
      }
    },
    async submit() {
      this.loading = true;
      
      checkUser(this.email, this.password).then(res => {
        if (res.data.valid == false) {
          this.failure = true;
        } else{
          this.failure = false;
          this.success = true;
          VueCookies.remove('tl-u');
          VueCookies.remove('tl-uref');
          VueCookies.set('tl-u' , res.data.id, "7d") ;
          VueCookies.set('tl-uref' , res.data.token, "7d");
        }
      });

      this.loading = false;

      setTimeout(() => {
        this.$router.push({ name: 'Home', query: { redirect: '/' } });
      }, 5000);
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
    
    logOut(){
      VueCookies.remove('tl-u');
      VueCookies.remove('tl-uref');
    },

  },
  created() {
    this.getCookies();
  },
}
</script>

<template>
  <v-container>
    <v-form v-if="!loggedIn && !success" validate-on="submit lazy" @submit.prevent="submit">
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
    <v-card v-if="loggedIn">
      <v-card-title class="w-min mx-auto">You are already logged in.</v-card-title>
      <v-btn
      @click="logOut"
      block
      class="mt-2"
      text="Log out"
      ></v-btn>
    </v-card>
    <v-card v-if="success">
      <v-card-title class="w-min mx-auto">Successfully logged in.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">You will be redirected momentarily.</v-card-subtitle>
    </v-card>
    <v-card v-if="failure">
      <v-card-title class="w-min mx-auto">Your email or password is incorrect.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">Please try again.</v-card-subtitle>
    </v-card>
  </v-container>
</template>