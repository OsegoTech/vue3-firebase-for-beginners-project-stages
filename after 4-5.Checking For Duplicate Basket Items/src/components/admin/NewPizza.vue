<script setup>
import { ref } from "vue";
const newPizza = ref({
  name: "Eg. Margherita",
  description: "Eg. A delicious tomato based pizza topped with mozzarella",
  options: [
    { size: 9, price: 6.95 },
    { size: 12, price: 12.95 },
  ],
});
</script>

<template>
  <section class="admin_section">
    <header class="admin_section_header">
      <h3>Add new pizza</h3>
    </header>
    <form>
      <div class="form_group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newPizza.name" />
      </div>
      <div class="form_group">
        <label for="description">Description</label>
        <textarea
          rows="5"
          id="description"
          v-model="newPizza.description"
        ></textarea>
      </div>
      <p>
        <strong>Option 1:</strong>
      </p>
      <div class="form_group">
        <label for="size1">Size (")</label>
        <input type="text" id="size1" v-model="newPizza.options[0].size" />
      </div>
      <div class="form_group">
        <label for="price1">Price</label>
        <input type="text" id="price1" v-model="newPizza.options[0].price" />
      </div>
      <p>
        <strong>Option 2:</strong>
      </p>
      <div class="form_group">
        <label for="size2">Size (")</label>
        <input type="text" id="size2" v-model="newPizza.options[1].size" />
      </div>
      <div class="form_group">
        <label for="price2">Price</label>
        <input type="text" id="price2" v-model="newPizza.options[1].price" />
      </div>
      <div class="form_group">
        <button>Add</button>
      </div>
    </form>
  </section>
</template>
