import { ref, onMounted } from "vue";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { dbPizzasRef } from "../firebase";

export default function usePizzas() {
  const allPizzas = ref([]);
  const message = ref("");
  async function getPizzas() {
    try {
      message.value = "";
      allPizzas.value = [];
      const docs = await getDocs(dbPizzasRef);
      docs.forEach(function (doc) {
        const pizza = {
          id: doc.id,
          ...doc.data(),
        };
        allPizzas.value.push(pizza);
      });
    } catch (error) {
      message.value =
        "There was an error fetching pizzas, please reload the page";
    }
  }
  onMounted(getPizzas);

  async function deletePizza(id) {
    try {
      message.value = "";
      const pizza = doc(dbPizzasRef, id);
      await deleteDoc(pizza);
      getPizzas();
    } catch (error) {
      message.value = "There was an error deleting the pizza, please try again";
    }
  }
  return {
    allPizzas,
    deletePizza,
    message,
  };
}
