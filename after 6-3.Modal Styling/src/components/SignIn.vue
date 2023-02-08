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

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal_content {
  background: whitesmoke;
  width: 80vw;
  padding: 1rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  color: rgb(76, 76, 76);
  text-shadow: none;
}

.modal_content button:first-of-type {
  margin-right: 1rem;
  background: rgb(163, 204, 163);
}

.modal_content button:hover {
  transform: scale(1.03);
}

.close_modal {
  align-self: flex-end;
  cursor: pointer;
}

.modal_text {
  align-self: center;
}

.error_message {
  margin-left: 1rem;
  color: rgb(255, 104, 104);
}

@media (min-width: 900px) {
  .modal_content {
    width: 40vw;
  }
}
</style>
