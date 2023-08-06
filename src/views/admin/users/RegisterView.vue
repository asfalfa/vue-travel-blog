<script setup>
import { addUser } from '../../../services/users'
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
      
      addUser(this.email, this.password).then(res => {
        if (res.data.valid == false) {
          alert('This user already exists.');
        } else{
          alert('User created. Please proceed to log in.');
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
  <v-form validate-on="submit lazy" @submit.prevent="submit">
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
</template>