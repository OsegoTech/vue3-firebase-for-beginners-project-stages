<script setup>
import useOrders from "../../composables/useOrders";
const { allOrders, deleteOrder, message } = useOrders();
</script>

<template>
  <section class="admin_section">
    <header class="admin_section_header">
      <h3>Current orders ({{ allOrders.length }})</h3>
    </header>
    <p v-if="message" class="error">{{ message }}</p>
    <table>
      <tr>
        <th>Item</th>
        <th>Size</th>
        <th>Quantity</th>
        <th>Price (total)</th>
      </tr>
      <template v-for="order in allOrders" :key="order.id">
        <tr>
          <td>
            <strong>Order number: {{ order.id }}</strong>
            <button
              @click="deleteOrder(order.id)"
              class="btn_remove"
              type="button"
            >
              &times;
            </button>
          </td>
        </tr>
        <tr
          v-for="orderItem in order.pizzas"
          :key="orderItem.name + orderItem.size"
        >
          <td>{{ orderItem.name }}</td>
          <td>{{ orderItem.size }} "</td>
          <td>{{ orderItem.quantity }}</td>
          <td>$ {{ orderItem.price * orderItem.quantity }}</td>
        </tr>
      </template>
    </table>
  </section>
</template>
