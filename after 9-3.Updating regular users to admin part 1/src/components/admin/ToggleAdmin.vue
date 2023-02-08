<script setup>
import { ref } from "vue";
const showToggleAdmin = ref(true);
const email = ref("");
</script>
<template>
  <section class="admin_section">
    <header class="admin_section_header">
      <h3>Toggle Admin Priviledges</h3>
      <small class="toggleBtn" @click="showToggleAdmin = !showToggleAdmin">{{
        showToggleAdmin ? "hide" : "show"
      }}</small>
    </header>
    <div v-show="showToggleAdmin">
      <form>
        <div class="form_group">
          <label for="email">Find user by email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            v-model="email"
          />
        </div>
        <button type="button" @click.prevent="findUser(email)">
          Find user
        </button>
      </form>
    </div>
  </section>
</template>
