import { createContext, useContext, useState, useEffect } from "react";
import { collection, doc, updateDoc, increment, addDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      if (!currentUser) {
        setItems([])
        return
      }

      const unsubscribeSnapshot = onSnapshot(
        collection(db, "users", currentUser.uid, "items"),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          setItems(data)
        }
      )

      return () => unsubscribeSnapshot()
    })

    return () => unsubscribeAuth()
  }, [])

  // Context mein addItem
  const addItem = async (data) => {
    if (!user) return
    await addDoc(collection(db, "users", user.uid, "items"), data)
    // onSnapshot automatically update kar dega
  }

  const deleteItem = async (itemId) => {
    if (!user) return
    const itemRef = doc(db, "users", user.uid, "items", itemId)
    await deleteDoc(itemRef)
    // onSnapshot automatically UI update kar dega
  }

  // addMoney mein context mein
  const addMoney = async (itemId, amount) => {
    if (!user) return
    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) return

    const item = items.find(i => i.id === itemId)
    const newSaved = (item.savedAmount || 0) + numAmount
    const isCompleted = newSaved >= item.targetPrice

    const itemRef = doc(db, "users", user.uid, "items", itemId)

    await updateDoc(itemRef, {
      savedAmount: increment(numAmount),
      itemCompleted: isCompleted,
    })
  }

  return (
    <ItemsContext.Provider value={{ items, addItem, addMoney, deleteItem }}>
      {children}
    </ItemsContext.Provider>
  )
}

export const useItems = () => useContext(ItemsContext);