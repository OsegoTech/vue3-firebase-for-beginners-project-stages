<script setup>
import useBasket from "@/composables/useBasket";
import usePizzas from "../composables/usePizzas";

const { allPizzas } = usePizzas();
const {
  basketText,
  addNewOrder,
  basket,
  increaseQuantity,
  decreaseQuantity,
  addToBasket,
  total,
} = useBasket();
</script>

<template>
  <div class="menu_wrapper">
    <div class="menu">
      <h3>~ Authentic handmade pizza ~</h3>
      <table>
        <tbody v-for="pizza in allPizzas" :key="pizza.id">
          <tr>
            <td>
              <strong>~ {{ pizza.name }} ~</strong>
            </td>
          </tr>
          <tr>
            <td>
              <small>
                {{ pizza.description }}
              </small>
            </td>
          </tr>
          <tr v-for="option in pizza.options" :key="pizza.id + option.size">
            <td>{{ option.size }}"</td>
            <td>$ {{ option.price }}</td>
            <td>
              <button type="button" @click="addToBasket(pizza, option)">
                &#43;
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="basket">
      <h3>~ Basket ~</h3>
      <div v-if="basket.length > 0">
        <table>
          <tbody v-for="(item, index) in basket" :key="index">
            <tr>
              <td>
                <button
                  @click="decreaseQuantity(item)"
                  class="quantity_btn"
                  type="button"
                >
                  &#8722;
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  @click="increaseQuantity(item)"
                  class="quantity_btn"
                  type="button"
                >
                  &#43;
                </button>
              </td>
              <td>{{ item.name }} {{ item.size }}"</td>
              <td>{{ item.price * item.quantity }}</td>
            </tr>
          </tbody>
        </table>
        <p>Order total: ${{ total }}</p>
        <button @click="addNewOrder">Place order</button>
      </div>
      <div v-else>
        <p>{{ basketText }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  text-align: center;
}
/* mobile layout */
.menu_wrapper {
  display: flex;
  flex-direction: column;
  color: rgb(80, 96, 112);
}

.menu,
.basket {
  background: #faf1e2;
  border-radius: 3px;
  height: 100vh;
  padding: 1rem;
}

.quantity_btn {
  border: none;
  padding: 0.4rem;
}

@media (min-width: 900px) {
  .menu_wrapper {
    flex-direction: row;
    justify-content: space-between;
  }
  .menu {
    flex: 2;
    border-right: 1px solid rgb(202, 202, 202);
  }

  .basket {
    flex: 1;
  }
}
</style>
