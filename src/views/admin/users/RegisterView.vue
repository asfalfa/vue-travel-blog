<script setup>
import { addUser, checkUser } from '../../../services/users'
</script>

<script>
export default {
  data: vm => ({
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
    async submit() {
      this.loading = true;
      
      addUser(this.email, this.password).then(res => {
        if (res.data.valid == false) {
          this.failure = true;
        } else{
          this.failure = false;
          this.success = true;
          setTimeout(() => {
            this.$router.push({ name: 'Home', query: { redirect: '/' } });
          }, 5000);
        }
      })
      checkUser(this.email, this.password).then(res => {
        if (res.data.valid == false) {
          alert('Your email or password is incorrect.');
        } else{
          this.success = true;
          VueCookies.remove('tl-u');
          VueCookies.remove('tl-uref');
          VueCookies.set('tl-u' , res.data.id, "7d") ;
          VueCookies.set('tl-uref' , res.data.token, "7d");
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
    <v-form v-if="!success" fast-fail validate-on="submit lazy" @submit.prevent="submit">
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
    <v-card v-if="success">
      <v-card-title class="w-min mx-auto">User successfully created.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">You will be redirected momentarily.</v-card-subtitle>
    </v-card>
    <v-card v-if="failure">
      <v-card-title class="w-min mx-auto">Something went wrong.</v-card-title>
      <v-card-subtitle class="w-min mx-auto">Please try again.</v-card-subtitle>
    </v-card>
  </v-container>
</template>