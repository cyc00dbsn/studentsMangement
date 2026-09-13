<template>
  <Form class="mx-auto w-1/3 mt-30 shadow-2xl shadow-blue-300 rounded-box" @submit="onSubmit" :validation-schema="validationSchema">
    <h1 class="text-4xl text-center"> Sunshine</h1>
    <div class="w-1/2 mx-auto">
      <label class="input validator my-2">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <Field
          name="email"
          type="text"
          required
          placeholder="Email"
          v-model="email"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minlength="3"
          maxlength="30"
          title="Only letters, numbers or dash"
        />
        <ErrorMessage
        name="email"
        />
      </label>
      <label class="input validator my-2">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
            ></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <Field
          name="password"
          type="password"
          v-model="password"
          required
          placeholder="Password"
          minlength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
        />
        <ErrorMessage
        name="password"
        />
      </label>
      <fieldset class="fieldset">
        <label class="label justify-center gap-1">
          <Field name="rememberMe" type="checkbox" checked="checked" class="checkbox mx-1" />
          <span class="text-1xl">Remember me</span>
          <button class="btn btn-link mx-10">Forgetten password?</button>
        </label>
      </fieldset>
    </div>
    <div class="text-center">
      <button class="btn btn-primary mx-2 my-2">Login</button>
      <button class="btn btn-secondary mx-2 my-2" @click="router.push({name:'sinup'})">Sinup</button>
    </div>
   
  </Form>

</template>

<script setup>
import { Form, Field,ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import {getLogin} from'@/services/apiAuth.js'
import {useRouter} from 'vue-router'

const email = ref('');
const password = ref('');
const router = useRouter();
const validationSchema = {
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
};
async function onSubmit(){
  const data = await getLogin(email.value,password.value );
  if(data){
    router.push('/');
  }
 }
</script>