import { ref, onMounted } from "vue";
import { getDocs } from "firebase/firestore";
import { dbPizzasRef } from "../firebase";

export default function usePizzas() {
  const allPizzas = ref([]);
  async function getPizzas() {
    const docs = await getDocs(dbPizzasRef);
    docs.forEach(function (doc) {
      const pizza = {
        id: doc.id,
        ...doc.data(),
      };
      allPizzas.value.push(pizza);
    });
  }
  onMounted(getPizzas);
  return {
    allPizzas,
  };
}
