import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (data) => {
  setItems((prev) => [...prev, data]);
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const snapshot = await getDocs(collection(db, "users", user.uid, "items"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, setItems, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);