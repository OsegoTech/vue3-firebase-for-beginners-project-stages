<script setup>
import { ref, computed } from "vue";
const basket = ref([]);
const allPizzas = ref([
  {
    name: "Margherita",
    description: "A delicious tomato based pizza topped with mozzarella",
    options: [
      { size: 9, price: 6.95 },
      { size: 12, price: 12.95 },
    ],
  },
  {
    name: "Pepperoni",
    description:
      "A delicious tomato based pizza topped with mozzarella & pepperoni",
    options: [
      { size: 9, price: 7.95 },
      { size: 12, price: 13.95 },
    ],
  },
]);

function addToBasket(item, option) {
  const pizzaExists = basket.value.find(function (pizza) {
    return pizza.name === item.name && pizza.size === option.size;
  });
  if (pizzaExists) {
    pizzaExists.quantity++;
    return;
  }

  basket.value.push({
    name: item.name,
    price: option.price,
    size: option.size,
    quantity: 1,
  });
}

function increaseQuantity(item) {
  item.quantity++;
}

function decreaseQuantity(item) {
  item.quantity--;
  if (item.quantity === 0) {
    removeFromBasket(item);
  }
}

function removeFromBasket(item) {
  basket.value.splice(basket.value.indexOf(item), 1);
}

const total = computed(function () {
  let totalCost = 0;
  basket.value.forEach(function (item) {
    totalCost += item.quantity * item.price;
  });
  return totalCost;
});
</script>

<template>
  <div class="menu_wrapper">
    <div class="menu">
      <h3>~ Authentic handmade pizza ~</h3>
      <table>
        <tbody v-for="(pizza, index) in allPizzas" :key="index">
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
          <tr v-for="(option, index) in pizza.options" :key="option[index]">
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
      <div>
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
        <button>Place order</button>
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
