<script setup>
import { ref } from "vue";
import usePizzas from "../../composables/usePizzas";
const { allPizzas, deletePizza, message } = usePizzas();
const showMenu = ref(true);
</script>
<template>
  <section class="admin_section">
    <header class="admin_section_header">
      <h3>Menu</h3>
      <small class="toggleBtn" @click="showMenu = !showMenu">{{
        showMenu ? "hide" : "show"
      }}</small>
    </header>
    <p class="error" v-if="message">{{ message }}</p>
    <table v-show="showMenu">
      <thead>
        <tr>
          <th>Pizza</th>
          <th>Remove from menu</th>
        </tr>
      </thead>
      <tbody v-for="pizza in allPizzas" :key="pizza.id">
        <tr>
          <td>{{ pizza.name }}</td>
          <td>
            <button
              @click="deletePizza(pizza.id)"
              type="button"
              class="btn_remove"
            >
              &times;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style>
.error {
  color: rgb(180, 67, 67);
  border: 1px solid;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
}
</style>
