<script setup>
import { ref } from "vue";
import useAuth from "@/composables/useAuth";
const showToggleAdmin = ref(true);
const email = ref("");
const { findUser, selectedUser, toggleAdminMessage, toggleAdmin } = useAuth();
</script>
<template>
  <section class="admin_section">
    <header class="admin_section_header">
      <h3>Toggle Admin Priviledges</h3>
      <small class="toggleBtn" @click="showToggleAdmin = !showToggleAdmin">{{
        showToggleAdmin ? "hide" : "show"
      }}</small>
    </header>
    <div v-if="showToggleAdmin">
      <form>
        <div class="form_group">
          <label for="email">Find user by email</label>
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
      <div v-if="selectedUser" class="selected_user">
        <p>{{ toggleAdminMessage }}</p>
        <p>
          User {{ selectedUser.email }} is currently set as
          {{ selectedUser.isAdmin ? "admin" : "not admin" }}
        </p>
        <button @click.prevent="toggleAdmin">
          Click here to toggle admin setting
        </button>
      </div>
    </div>
  </section>
</template>
