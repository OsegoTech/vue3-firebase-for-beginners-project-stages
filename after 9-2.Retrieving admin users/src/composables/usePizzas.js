import { ref, onMounted } from "vue";
import { getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { dbPizzasRef } from "../firebase";

export default function usePizzas() {
  const allPizzas = ref([]);
  const message = ref("");
  async function getPizzas() {
    try {
      message.value = "";
      onSnapshot(dbPizzasRef, function (docs) {
        allPizzas.value = [];
        docs.forEach(function (doc) {
          const pizza = {
            id: doc.id,
            ...doc.data(),
          };
          allPizzas.value.push(pizza);
        });
      });
      // const docs = await getDocs(dbPizzasRef);
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
