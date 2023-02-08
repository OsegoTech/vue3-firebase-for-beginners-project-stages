<script setup>
import { ref } from "vue";
import useAuth from "@/composables/useAuth";
const { signUp, errorMessage } = useAuth();
const userData = ref({
  email: "",
  password: "",
});
</script>

<template>
  <div class="modal">
    <div class="modal_content">
      <span class="close_modal">&#10060;</span>
      <p class="modal_text">Please login to continue</p>
      <span class="error_message">{{ errorMessage }}</span>
      <form>
        <div class="form_group">
          <label for="email"> Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            v-model="userData.email"
          />
        </div>
        <div class="form_group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            v-model="userData.password"
          />
        </div>
        <button type="button">Sign in</button>
        <button
          @click.prevent="signUp(userData.email, userData.password)"
          type="button"
        >
          Sign up
        </button>
      </form>
    </div>
  </div>
</template>
