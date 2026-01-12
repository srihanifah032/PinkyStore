import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

const OrderService = {
  // ✅ CREATE ORDER
  createOrder: async (cart, totalPrice) => {
    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    await addDoc(collection(db, "orders"), {
      items: cart,
      totalItems,
      totalPrice,
      status: "paid",
      createdAt: serverTimestamp(),
    });
  },

  // ✅ REALTIME LISTENER (INI YANG KAMU PANGGIL)
  subscribeOrders: (callback) => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(orders);
    });
  },
};

export default OrderService;
