<script setup>
import useOrders from "../../composables/useOrders";
const { allOrders } = useOrders();
</script>

<template>
  <section class="admin_section">
    <header class="admin_section_header">
      <h3>Current orders (5)</h3>
    </header>
    <table>
      <tr>
        <th>Item</th>
        <th>Size</th>
        <th>Quantity</th>
        <th>Price (total)</th>
      </tr>
      <tr>
        <td>
          <strong>Order number: 1</strong>
          <button class="btn_remove" type="button">&times;</button>
        </td>
      </tr>
      <tr>
        <td>Margherita</td>
        <td>9 "</td>
        <td>2</td>
        <td>$ 15.90</td>
      </tr>
    </table>
  </section>
</template>
