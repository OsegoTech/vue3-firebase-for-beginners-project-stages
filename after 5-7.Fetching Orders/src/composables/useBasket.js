import { ref, computed } from "vue";
import { addDoc } from "firebase/firestore";
import { dbOrdersRef } from "../firebase";

export default function useBasket() {
  const basket = ref([]);
  const basketText = ref("Your basket is empty");

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

  async function addNewOrder() {
    try {
      const order = {
        createdAt: new Date(),
        pizzas: { ...basket.value },
      };
      await addDoc(dbOrdersRef, order);
      basket.value = [];
      basketText.value = "Thank you, your order has been placed!";
    } catch (error) {
      basketText.value =
        "There was an error placing your order, please try again...";
    }
  }

  return {
    basket,
    addToBasket,
    increaseQuantity,
    decreaseQuantity,
    total,
    addNewOrder,
    basketText,
  };
}
