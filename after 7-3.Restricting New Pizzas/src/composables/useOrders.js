import { onMounted, ref } from "vue";
import { query, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore";
import { dbOrdersRef } from "../firebase";

export default function useOrders() {
  const allOrders = ref([]);
  const message = ref("");

  async function getOrders() {
    try {
      const queryData = query(dbOrdersRef, orderBy("createdAt"));
      const docs = await getDocs(queryData);
      docs.forEach(function (doc) {
        const order = {
          id: doc.id,
          ...doc.data(),
        };
        allOrders.value.push(order);
      });
    } catch (error) {}
  }

  onMounted(getOrders);

  async function deleteOrder(id) {
    try {
      message.value = "";
      const order = doc(dbOrdersRef, id);
      await deleteDoc(order);
      getOrders();
    } catch (error) {
      message.value = "There was an error deleting the order, please try again";
    }
  }

  return { allOrders, deleteOrder, message };
}
