import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "pet_services";

// Create a pet service booking
export const addItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
    return { id: docRef.id, ...item };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Fetch all pet service bookings
export const fetchItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

// Update visit status or service details
export const updateItem = async (id, updatedData) => {
  try {
    const itemRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(itemRef, updatedData);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Delete a booking
export const deleteItem = async (id) => {
  try {
    const itemRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};